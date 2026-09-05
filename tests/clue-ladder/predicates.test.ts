import { describe, expect, it } from 'vitest';
import { candidates, evaluate } from '../../lib/clue-ladder/predicates';
import { deriveValue, recomputeDerived } from '../../lib/clue-ladder/derive';
import { dataset, snapshotId, fact, clue } from './helpers';
import type { Predicate } from '../../lib/clue-ladder/types';
describe('deterministic predicates', () => {
    it.each(['eq', 'lt', 'lte', 'gt', 'gte'] as const)('evaluates %s without coercion', op => {
        const value = fact('US-AL', 'population.resident_estimate').value;
        const p: Predicate = { metricId: 'population.resident_estimate', op, value };
        expect(evaluate(p, 'US-AL', dataset.facts, snapshotId)).toBe(['eq', 'lte', 'gte'].includes(op));
    });
    it('uses half-open numeric intervals', () => {
        const f = fact('US-AL', 'population.resident_estimate');
        expect(evaluate({ metricId: f.metricId, op: 'between', minInclusive: f.value as number, maxExclusive: (f.value as number) + 1 }, f.subjectId, dataset.facts, snapshotId)).toBe(true);
        expect(evaluate({ metricId: f.metricId, op: 'between', minInclusive: 0, maxExclusive: f.value as number }, f.subjectId, dataset.facts, snapshotId)).toBe(false);
    });
    it('evaluates every approved answer and candidate set afresh', () => {
        for (const c of dataset.clues.filter(c => c.review.status === 'approved')) {
            expect(evaluate(c.predicate, c.answerStateId, dataset.facts, snapshotId), c.clueId).toBe(true);
            const result = candidates(c.predicate, dataset.universe, dataset.facts, snapshotId);
            expect(result.complete, c.clueId).toBe(true);
            expect(result.stateIds, c.clueId).toEqual(c.candidateSet.stateIds);
        }
    });
    it('never turns missing facts or suppression into false', () => {
        expect(evaluate({ metricId: 'missing', op: 'eq', value: 0 }, 'US-AL', dataset.facts, snapshotId)).toBe('unknown');
        const result = candidates(clue('al.industry.mfg-14-16').predicate, dataset.universe, dataset.facts, snapshotId);
        expect(result.unknownStateIds).toEqual(['US-HI']);
        expect(result.complete).toBe(false);
    });
    it('uses three-valued conjunction/disjunction, including finite entity membership evidence', () => {
        const unknown: Predicate = { metricId: 'unknown', op: 'eq', value: 1 };
        const known: Predicate = { metricId: 'identity.postal_code', op: 'eq', value: 'AL' };
        expect(evaluate({ any: [unknown, known] }, 'US-AL', dataset.facts, snapshotId)).toBe(true);
        expect(evaluate({ all: [unknown, known] }, 'US-CO', dataset.facts, snapshotId)).toBe(false);
        expect(evaluate({ all: [unknown, known] }, 'US-AL', dataset.facts, snapshotId)).toBe('unknown');
        expect(evaluate(clue('al.cities.top2-2025').predicate, 'US-HI', dataset.facts, snapshotId)).toBe(false);
    });
    it('rejects empty predicates, ambiguous observations and type coercion', () => {
        expect(() => evaluate({ all: [] }, 'US-AL', dataset.facts, snapshotId)).toThrow('EMPTY_PREDICATE');
        expect(() => evaluate(clue('al.population.5-6m').predicate, 'US-AL', [...dataset.facts, fact('US-AL', 'population.resident_estimate')], snapshotId)).toThrow('AMBIGUOUS_FACT');
        expect(() => evaluate({ metricId: 'population.resident_estimate', op: 'gt', value: '0' }, 'US-AL', dataset.facts, snapshotId)).toThrow('PREDICATE_TYPE');
    });
});
describe('reproducible derivation', () => {
    it.each([['US-AL', 24, 28, 26], ['US-CO', 20, 8, 17], ['US-RI', 44, 50, 44]] as const)('reproduces %s population/area/GDP ranks', (id, pop, area, gdp) => {
        for (const [metric, value] of [['population.state_rank', pop], ['area.land_rank', area], ['economy.gdp_state_rank', gdp]] as const) {
            const f = fact(id, metric);
            expect(deriveValue(f, dataset.facts)).toBe(value);
            expect(f.derivation?.inputFactIds).toHaveLength(50);
        }
    });
    it('uses numerator and denominator for industry share', () => {
        const f = fact('US-AL', 'economy.industry_share_of_gdp.manufacturing');
        expect(f.derivation?.inputFactIds).toHaveLength(2);
        expect(deriveValue(f, dataset.facts)).toBeCloseTo(14.97, 2);
    });
    it('derives Huntsville first from the complete published Alabama place table', () => {
        const f = dataset.facts.find(f => f.subjectId === 'place:AL:huntsville-city' && f.metricId === 'place.within_state_rank')!;
        expect(deriveValue(f, dataset.facts)).toBe(1);
        expect(deriveValue(fact('US-AL', 'place.top_two'), dataset.facts)).toEqual(['place:AL:huntsville-city', 'place:AL:mobile-city']);
    });
    it('rejects missing, mixed-vintage, duplicate and cyclic inputs', () => {
        const rank = structuredClone(fact('US-AL', 'population.state_rank'));
        rank.derivation!.inputFactIds.pop();
        expect(() => deriveValue(rank, dataset.facts)).toThrow('RANK_INPUTS');
        rank.derivation!.inputFactIds.push(rank.derivation!.inputFactIds[0]);
        expect(() => deriveValue(rank, dataset.facts)).toThrow('DERIVATION_INPUT');
        const mixed = structuredClone(dataset.facts);
        mixed.find(f => f.factId === rank.derivation!.inputFactIds[0])!.snapshotId = 'different';
        expect(() => deriveValue(fact('US-AL', 'population.state_rank'), mixed)).toThrow('DERIVATION_INPUT');
        const cycle = structuredClone(fact('US-AL', 'population.state_rank'));
        cycle.derivation!.inputFactIds = [cycle.factId];
        expect(() => recomputeDerived([cycle])).toThrow('DERIVATION_CYCLE');
    });
    it('uses competition ranks for tied values and rejects zero denominators', () => {
        const input = structuredClone(dataset.facts);
        const a = input.find(f => f.subjectId === 'US-AL' && f.metricId === 'population.resident_estimate')!;
        input.find(f => f.subjectId === 'US-CO' && f.metricId === 'population.resident_estimate')!.value = a.value;
        expect(deriveValue(fact('US-AL', 'population.state_rank'), input)).toBe(deriveValue(fact('US-CO', 'population.state_rank'), input));
        input.find(f => f.subjectId === 'US-AL' && f.metricId === 'economy.gdp_current_usd')!.value = 0;
        expect(() => deriveValue(fact('US-AL', 'economy.industry_share_of_gdp.manufacturing'), input)).toThrow('RATIO_INPUTS');
    });
});
