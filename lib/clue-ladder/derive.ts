import { DataError, ENGINE_VERSION } from './dataset';
import type { FactRecord } from './types';
export function deriveValue(fact: FactRecord, facts: readonly FactRecord[], index = new Map(facts.map(f => [f.factId, f]))): FactRecord['value'] {
    const d = fact.derivation;
    if (!d || d.codeVersion !== ENGINE_VERSION)
        throw new DataError('DERIVATION_METHOD', `${fact.factId}: unsupported or missing derivation version`);
    if (new Set(d.inputFactIds).size !== d.inputFactIds.length)
        throw new DataError('DERIVATION_INPUT', `${fact.factId}: duplicate inputs`);
    const inputs = d.inputFactIds.map(id => {
        const f = index.get(id);
        if (!f || f.snapshotId !== fact.snapshotId || f.quality.status !== 'verified')
            throw new DataError('DERIVATION_INPUT', `${fact.factId}: missing, unverified, or cross-snapshot input ${id}`);
        return f;
    });
    const p = d.parameters;
    if (d.method === 'rank') {
        const universe = p.subjectIds;
        if (!Array.isArray(universe) || new Set(universe).size !== universe.length || universe.some(id => typeof id !== 'string'))
            throw new DataError('RANK_UNIVERSE', `${fact.factId}: missing explicit universe`);
        if (fact.universe === 'us-50-states' && universe.length !== 50)
            throw new DataError('RANK_UNIVERSE', `${fact.factId}: rank requires exactly 50 states`);
        if (inputs.length !== universe.length || new Set(inputs.map(f => f.subjectId)).size !== universe.length || inputs.some(f => !universe.includes(f.subjectId)))
            throw new DataError('RANK_INPUTS', `${fact.factId}: incomplete or duplicate ranking subjects`);
        if (inputs.some(f => f.metricId !== p.inputMetricId || typeof f.value !== 'number' || !Number.isFinite(f.value) || JSON.stringify(f.referencePeriod) !== JSON.stringify(inputs[0].referencePeriod)))
            throw new DataError('RANK_INPUTS', `${fact.factId}: mixed metrics, periods, or non-numeric values`);
        if (!['ascending', 'descending'].includes(String(p.direction)) || p.tieMethod !== 'competition')
            throw new DataError('RANK_METHOD', `${fact.factId}: define direction and competition ties`);
        if (p.output === 'top_k') {
            if (!Number.isInteger(p.k) || Number(p.k) < 1 || Number(p.k) > inputs.length)
                throw new DataError('RANK_METHOD', 'Invalid top-k selection');
            return [...inputs].sort((a, b) => (p.direction === 'ascending' ? (a.value as number) - (b.value as number) : (b.value as number) - (a.value as number)) || (a.subjectId < b.subjectId ? -1 : 1)).slice(0, Number(p.k)).map(f => f.subjectId);
        }
        const answer = inputs.find(f => f.subjectId === fact.subjectId);
        if (!answer)
            throw new DataError('RANK_ANSWER', `${fact.factId}: answer absent`);
        const values = inputs.map(f => f.value as number).sort((a, b) => p.direction === 'ascending' ? a - b : b - a);
        return values.indexOf(answer.value as number) + 1;
    }
    if (d.method === 'ratio') {
        if (inputs.length !== 2 || inputs.some(f => typeof f.value !== 'number') || inputs[1].value === 0 || inputs[0].subjectId !== inputs[1].subjectId || JSON.stringify(inputs[0].referencePeriod) !== JSON.stringify(inputs[1].referencePeriod))
            throw new DataError('RATIO_INPUTS', `${fact.factId}: ratio requires a matched numerator and nonzero denominator`);
        return (inputs[0].value as number) / (inputs[1].value as number) * Number(p.scale ?? 1);
    }
    if (d.method === 'count') {
        if (inputs.length !== 1 || !Array.isArray(inputs[0].value))
            throw new DataError('COUNT_INPUTS', `${fact.factId}: count requires an enumerated id list`);
        return new Set(inputs[0].value).size;
    }
    if (d.method === 'range_bucket') {
        if (inputs.length !== 1 || typeof inputs[0].value !== 'number' || typeof p.width !== 'number' || p.width <= 0)
            throw new DataError('BUCKET_INPUTS', `${fact.factId}: invalid bucket`);
        return Math.floor(inputs[0].value / p.width) * p.width;
    }
    throw new DataError('DERIVATION_METHOD', `${fact.factId}: method ${d.method} is not an executable numeric derivation`);
}
/** Topological sort, rejecting cycles rather than relying on file order. */
export function recomputeDerived(facts: readonly FactRecord[]): FactRecord[] {
    const done = facts.filter(f => !f.derivation).map(f => structuredClone(f));
    const factIndex = new Map(done.map(f => [f.factId, f]));
    const pending = facts.filter(f => f.derivation).map(f => structuredClone(f));
    while (pending.length) {
        const index = pending.findIndex(f => f.derivation!.inputFactIds.every(id => factIndex.has(id)));
        if (index < 0)
            throw new DataError('DERIVATION_CYCLE', `Unresolved inputs or cycle: ${pending.map(f => f.factId).join(', ')}`);
        const [fact] = pending.splice(index, 1);
        fact.value = deriveValue(fact, done, factIndex);
        done.push(fact);
        factIndex.set(fact.factId, fact);
    }
    return done.sort((a, b) => a.factId.localeCompare(b.factId, 'en'));
}
