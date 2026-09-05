import { describe, expect, it } from 'vitest';
import { validateDataset, validateLadder } from '../../lib/clue-ladder/validate';
import { dataset, fresh, clue } from './helpers';
import { boundaryGraph, LEGACY_BORDER_HUNT_POLICY } from '../../lib/clue-ladder/boundaries';
import { STATE_BORDERS } from '../../data/borders';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { createHash } from 'node:crypto';
import type { Dataset } from '../../lib/clue-ladder/dataset';
const has = (data: Dataset, code: string) => validateDataset(data).some(d => d.code === code && d.severity === 'error');
describe('actionable quality gates', () => {
    it('validates approved data and reports incomplete research as warnings', () => {
        const issues = validateDataset(dataset, true);
        expect(issues.filter(d => d.severity === 'error')).toEqual([]);
        expect(issues.some(d => d.code === 'CANDIDATE_COVERAGE' && d.message.includes('US-HI'))).toBe(true);
    });
    it.each([
        ['DUPLICATE_ID', (d: Dataset) => { d.states.push(d.states[0]); }],
        ['STATE_UNIVERSE', (d: Dataset) => { d.universe.pop(); }],
        ['FACT_PROVENANCE', (d: Dataset) => { d.facts.find(f => f.metricId === 'population.resident_estimate')!.sourceRefs = []; }],
        ['SOURCE_RETRIEVAL', (d: Dataset) => { d.sources[0].retrievedAt = ''; }],
        ['FACT_REFERENCE_PERIOD', (d: Dataset) => { d.facts.find(f => f.metricId === 'population.resident_estimate')!.referencePeriod = { kind: 'static' }; }],
        ['DERIVED_VALUE', (d: Dataset) => { d.facts.find(f => f.metricId === 'population.state_rank')!.value = 99; }],
        ['CLUE_ANSWER', (d: Dataset) => { d.clues.find(c => c.clueId === 'al.postal')!.predicate = { metricId: 'identity.postal_code', op: 'eq', value: 'CO' }; }],
        ['CANDIDATE_STALE', (d: Dataset) => { d.clues.find(c => c.clueId === 'al.population.5-6m')!.candidateSet.stateIds.pop(); }],
        ['CANDIDATE_COVERAGE', (d: Dataset) => { const c = d.clues.find(c => c.clueId === 'al.industry.mfg-14-16')!; c.review = { ...c.review, status: 'approved', evidenceChecked: true }; }],
        ['CLUE_REFERENCE_LABEL', (d: Dataset) => { d.clues.find(c => c.clueId === 'al.population.5-6m')!.render.text = { en: 'Its population is between five and six million.' }; }],
        ['CLUE_RUNG_WINDOW', (d: Dataset) => { d.clues.find(c => c.clueId === 'al.postal')!.ladderPolicy.earliestRung = 3; }],
        ['PARK_TERMINOLOGY', (d: Dataset) => { d.parks.find(p => !p.isFormallyNationalPark)!.isFormallyNationalPark = true; }],
        ['PLACE_UNIVERSE', (d: Dataset) => { d.clues.find(c => c.clueId === 'al.cities.top2-2025')!.render.text = { en: 'Huntsville and Mobile are the biggest cities in 2025.' }; }],
        ['ASSET_LEAK', (d: Dataset) => { d.assets[0].filePath = 'stable/visuals/Alabama.svg'; }],
    ] as const)('detects %s', (code, mutate) => { const d = fresh(); mutate(d); expect(has(d, code)).toBe(true); });
    it('scans SVG titles and metadata in addition to file names', () => {
        const d = fresh(), a = d.assets[0], path = 'data/clue-ladder/stable/visuals/metadata-test.svg';
        const xml = '<svg xmlns="http://www.w3.org/2000/svg"><title>Alabama</title></svg>';
        a.filePath = 'stable/visuals/metadata-test.svg';
        a.sha256 = createHash('sha256').update(xml).digest('hex');
        try {
            writeFileSync(path, xml);
            expect(validateDataset(d, true).some(e => e.code === 'ASSET_LEAK')).toBe(true);
        }
        finally {
            unlinkSync(path);
        }
    });
});
describe('boundary policy and topology', () => {
    it.each([['US-CO', 'US-AZ', 'point_contact', 'land'], ['US-NM', 'US-UT', 'point_contact', 'land'], ['US-RI', 'US-NY', 'segment', 'lake_or_coastal_water']] as const)('preserves %s / %s as %s', (a, b, topology, medium) => {
        const record = dataset.boundaries.find(r => [r.stateA, r.stateB].includes(a) && [r.stateA, r.stateB].includes(b))!;
        expect(record).toMatchObject({ topology, medium, clueBorderEligible: false, borderHuntEdge: false });
        const graph = boundaryGraph(dataset.universe, dataset.boundaries);
        expect(graph[a]).not.toContain(b);
        expect(graph[b]).not.toContain(a);
    });
    it('makes legacy Four Corners policy explicit without altering current gameplay', () => {
        const graph = boundaryGraph(dataset.universe, dataset.boundaries, LEGACY_BORDER_HUNT_POLICY);
        expect(graph['US-CO']).toContain('US-AZ');
        expect(graph['US-NM']).toContain('US-UT');
        expect(graph['US-RI']).not.toContain('US-NY');
        expect(STATE_BORDERS.CO).toContain('AZ');
        expect(STATE_BORDERS.NM).toContain('UT');
        expect(STATE_BORDERS.RI).toEqual(['CT', 'MA']);
    });
    it('derives symmetric edges and rejects contradictory reversed records', () => {
        const graph = boundaryGraph(dataset.universe, dataset.boundaries, { includePointContacts: true, includeWaterOnly: true });
        for (const [a, neighbors] of Object.entries(graph))
            for (const b of neighbors)
                expect(graph[b]).toContain(a);
        const d = fresh(), b = d.boundaries[0];
        d.boundaries.push({ ...b, boundaryId: 'reversed', stateA: b.stateB, stateB: b.stateA, borderHuntEdge: !b.borderHuntEdge });
        expect(has(d, 'BOUNDARY_ASYMMETRY')).toBe(true);
    });
    it('detects asymmetric fact tables and misclassified canonical topology', () => {
        const d = fresh();
        const f = d.facts.find(f => f.subjectId === 'US-CO' && f.metricId === 'boundary.point_contacts')!;
        f.value = [];
        expect(has(d, 'BOUNDARY_ASYMMETRY')).toBe(true);
        expect(has(d, 'BOUNDARY_FACT_MISMATCH')).toBe(true);
    });
    it('rejects point/water default edges and ambiguous clue wording', () => {
        const d = fresh();
        d.boundaries.find(b => b.topology === 'point_contact')!.borderHuntEdge = true;
        expect(has(d, 'BOUNDARY_POLICY')).toBe(true);
        d.clues.find(c => c.clueId === 'ri.borders.typed')!.render.text = { en: 'It borders Connecticut, Massachusetts, and New York.' };
        expect(has(d, 'WATER_WORDING')).toBe(true);
    });
});
describe('ladder combination gates', () => {
    const sample = (code: string) => {
        const audit = JSON.parse(readFileSync('data/clue-ladder/review/audited-examples.json', 'utf8'));
        return (audit.sampleLadders[code] as string[]).map(clue);
    };
    it('rejects duplicate dependencies, prohibited categories and explicit incompatibilities', () => {
        const ladder = sample('CO');
        ladder[4].ladderPolicy.dependencyGroup = ladder[3].ladderPolicy.dependencyGroup;
        expect(validateLadder(ladder, dataset).some(e => e.code === 'LADDER_DEPENDENCY')).toBe(true);
        const d = fresh();
        d.rules.allowedDependencyGroups.push(ladder[3].ladderPolicy.dependencyGroup);
        expect(validateLadder(ladder, d).some(e => e.code === 'LADDER_DEPENDENCY')).toBe(false);
        ladder[4] = clue('co.parks.named-pair');
        expect(validateLadder(ladder, dataset).some(e => e.code === 'LADDER_INCOMPATIBLE')).toBe(true);
        ladder[4] = clue('co.point.arizona');
        expect(validateLadder(ladder, dataset).some(e => e.code === 'LADDER_CATEGORY')).toBe(true);
    });
    it('enforces city/capital overlap, earlier-category prerequisites and visual windows', () => {
        const ladder = sample('RI');
        ladder[7] = clue('ri.cities.top2-2025');
        expect(validateLadder(ladder, dataset).some(e => e.code === 'LADDER_CITY_CAPITAL')).toBe(true);
        ladder[1] = clue('ri.locator');
        expect(validateLadder(ladder, dataset).some(e => e.code === 'LADDER_RUNG')).toBe(true);
        ladder[0].ladderPolicy.requiresEarlierCategory = 'capital';
        expect(validateLadder(ladder, dataset).some(e => e.code === 'LADDER_PREREQUISITE')).toBe(true);
    });
});
