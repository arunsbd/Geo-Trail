import { describe, expect, it } from 'vitest';
import { validateSchema } from '../../lib/clue-ladder/load';
import { dataset, clue, fact } from './helpers';
import type { Predicate, FactRecord, PuzzleManifest } from '../../lib/clue-ladder/types';
import { compileLadder } from '../../lib/clue-ladder/compile';
describe('logical contracts and generated schemas', () => {
    for (const [schema, records] of [['state', dataset.states], ['source', dataset.sources], ['metric', dataset.metrics], ['fact', dataset.facts], ['boundary', dataset.boundaries], ['park', dataset.parks], ['asset', dataset.assets], ['clue', dataset.clues]] as const) {
        it(`validates every ${schema} record`, () => { for (const record of records)
            expect(validateSchema(schema, record)).toEqual([]); });
    }
    it('rejects invalid state IDs, enum values, and extra fields', () => {
        expect(validateSchema('state', { ...dataset.states[0], stateId: 'US-DC' })).not.toEqual([]);
        expect(validateSchema('clue', { ...clue('al.postal'), category: 'trivia' })).not.toEqual([]);
        expect(validateSchema('fact', { ...fact('US-AL', 'population.resident_estimate'), unexplained: true })).not.toEqual([]);
    });
    it('supports nested predicate unions, but not unsupported operators', () => {
        const p: Predicate = { all: [{ any: [{ metricId: 'x', op: 'eq', value: true }] }, { metricId: 'y', op: 'between', minInclusive: 0, maxExclusive: 1 }] };
        expect(validateSchema('predicate', p)).toEqual([]);
        expect(validateSchema('predicate', { metricId: 'x', op: 'guess', value: true })).not.toEqual([]);
    });
    it('retains suppression required by section 7.3', () => {
        const suppressed: FactRecord = fact('US-HI', 'economy.industry_value_added_current_usd.manufacturing');
        expect(suppressed).toMatchObject({ value: null, suppressionCode: '(D)' });
        expect(validateSchema('fact', suppressed)).toEqual([]);
    });
    it('validates the extended immutable manifest contract', () => {
        const manifest: Readonly<PuzzleManifest> = compileLadder(dataset, 'US-RI', 'schema');
        expect(validateSchema('puzzle-manifest', manifest)).toEqual([]);
        const broken = { ...manifest, dataContentSha256: undefined };
        expect(validateSchema('puzzle-manifest', broken)).not.toEqual([]);
    });
});
