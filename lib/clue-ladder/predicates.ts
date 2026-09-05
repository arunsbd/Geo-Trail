import { isDeepStrictEqual } from 'node:util';
import { DataError } from './dataset';
import type { FactRecord, Predicate } from './types';
export type Truth = true | false | 'unknown';
export function predicateMetrics(predicate: Predicate): string[] {
    if ('all' in predicate)
        return [...new Set(predicate.all.flatMap(predicateMetrics))];
    if ('any' in predicate)
        return [...new Set(predicate.any.flatMap(predicateMetrics))];
    return [predicate.metricId];
}
/** Missing evidence is not false. Boolean compounds follow three-valued logic. */
export function evaluate(predicate: Predicate, subjectId: string, facts: readonly FactRecord[], snapshotId: string): Truth {
    if ('all' in predicate || 'any' in predicate) {
        const all = 'all' in predicate;
        const children = all ? predicate.all : predicate.any;
        if (!children.length)
            throw new DataError('EMPTY_PREDICATE', 'Boolean predicates require at least one child');
        const results = children.map(p => evaluate(p, subjectId, facts, snapshotId));
        if (all && results.includes(false))
            return false;
        if (!all && results.includes(true))
            return true;
        if (results.includes('unknown'))
            return 'unknown';
        return all;
    }
    const matches = facts.filter(f => f.subjectId === subjectId && f.metricId === predicate.metricId && f.snapshotId === snapshotId && f.quality.status === 'verified');
    if (!matches.length)
        return 'unknown';
    if (matches.length > 1)
        throw new DataError('AMBIGUOUS_FACT', `${subjectId}/${predicate.metricId}: ${matches.length} verified facts in ${snapshotId}`);
    const value = matches[0].value;
    if (value === null)
        return 'unknown';
    if (predicate.op === 'eq')
        return isDeepStrictEqual(value, predicate.value);
    if (predicate.op === 'contains_all') {
        if (!Array.isArray(value))
            throw new DataError('PREDICATE_TYPE', `${predicate.metricId} requires an id_list`);
        return predicate.values.every(v => value.includes(v));
    }
    if (predicate.op === 'between') {
        if (typeof value !== 'number' || !Number.isFinite(value) || !(predicate.minInclusive < predicate.maxExclusive))
            throw new DataError('PREDICATE_TYPE', 'between requires a finite numeric value and increasing bounds');
        return value >= predicate.minInclusive && value < predicate.maxExclusive;
    }
    if ((typeof value !== 'number' && typeof value !== 'string') || typeof predicate.value !== typeof value)
        throw new DataError('PREDICATE_TYPE', `${predicate.metricId}: incompatible comparison types`);
    const rhs = predicate.value as typeof value;
    switch (predicate.op) {
        case 'lt': return value < rhs;
        case 'lte': return value <= rhs;
        case 'gt': return value > rhs;
        case 'gte': return value >= rhs;
    }
}
export function candidates(predicate: Predicate, universe: readonly string[], facts: readonly FactRecord[], snapshotId: string) {
    const stateIds: string[] = [], unknownStateIds: string[] = [];
    for (const id of [...universe].sort()) {
        const result = evaluate(predicate, id, facts, snapshotId);
        if (result === true)
            stateIds.push(id);
        if (result === 'unknown')
            unknownStateIds.push(id);
    }
    return { stateIds, unknownStateIds, complete: unknownStateIds.length === 0 };
}
