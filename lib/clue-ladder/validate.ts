import { isDeepStrictEqual } from 'node:util';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { contentDigest } from './integrity';
import { STATE_CODES } from '../../data/states';
import { DataError, ENGINE_VERSION, type Dataset, type Diagnostic } from './dataset';
import { evaluate, candidates, predicateMetrics } from './predicates';
import { recomputeDerived } from './derive';
import { validateSchema } from './load';
import type { ClueRecord, PuzzleManifest, SourceLocator } from './types';
const validDate = (s?: string) => Boolean(s && /^\d{4}-\d{2}-\d{2}(?:T.*Z)?$/.test(s) && Number.isFinite(Date.parse(s)));
const sameSet = (a: readonly string[], b: readonly string[]) => a.length === new Set(a).size && b.length === new Set(b).size && isDeepStrictEqual([...a].sort(), [...b].sort());
export function validateDataset(data: Dataset, checkFiles = false): Diagnostic[] {
    const out: Diagnostic[] = [];
    const issue = (code: string, path: string, message: string, severity: 'error' | 'warning' = 'error') => out.push({ severity, code, path, message });
    const schemaGroups = [['state', data.states], ['source', data.sources], ['metric', data.metrics], ['fact', data.facts], ['boundary', data.boundaries], ['park', data.parks], ['asset', data.assets], ['clue', data.clues]] as const;
    for (const [schema, records] of schemaGroups)
        for (const [i, record] of records.entries())
            out.push(...validateSchema(schema, record).map(e => ({ ...e, path: `${schema}[${i}]/${e.path}` })));
    if (out.some(e => e.code === 'SCHEMA'))
        return out; // dependent checks must never crash on malformed JSON
    for (const [kind, records, key] of [['state', data.states, 'stateId'], ['source', data.sources, 'sourceId'], ['metric', data.metrics, 'metricId'], ['fact', data.facts, 'factId'], ['clue', data.clues, 'clueId'], ['asset', data.assets, 'assetId'], ['boundary', data.boundaries, 'boundaryId']] as const) {
        const seen = new Set<string>();
        for (const record of records) {
            const id = String((record as unknown as Record<string, unknown>)[key]);
            if (seen.has(id))
                issue('DUPLICATE_ID', `${kind}/${id}`, 'Identifier must be unique');
            seen.add(id);
        }
    }
    if (!sameSet(data.universe, STATE_CODES.map(c => `US-${c}`)))
        issue('STATE_UNIVERSE', 'universe', 'Expected exactly the existing 50 U.S. states; no DC or territories');
    for (const key of ['postalCode', 'censusFips'] as const)
        if (new Set(data.states.map(s => s[key])).size !== data.states.length)
            issue('DUPLICATE_STATE_IDENTIFIER', key, 'Duplicate identity value');
    const sources = new Map(data.sources.map(s => [s.sourceId, s]));
    const facts = new Map(data.facts.map(f => [f.factId, f]));
    const metrics = new Map(data.metrics.map(m => [m.metricId, m]));
    const refs = (locators: SourceLocator[], path: string) => {
        for (const ref of locators) {
            if (!sources.has(ref.sourceId))
                issue('SOURCE_MISSING', path, `Unknown source ${ref.sourceId}`);
            if (!Object.keys(ref).some(k => k !== 'sourceId'))
                issue('SOURCE_LOCATOR', path, `Source ${ref.sourceId} needs a row, section, feature, or table locator`);
        }
    };
    for (const s of data.sources) {
        if (!validDate(s.retrievedAt))
            issue('SOURCE_RETRIEVAL', s.sourceId, 'Missing or invalid retrieval timestamp');
        if (s.downloadUrl && !/^[a-f0-9]{64}$/.test(s.sha256 ?? ''))
            issue('SOURCE_HASH', s.sourceId, 'Downloaded source requires SHA-256');
    }
    for (const state of data.states) {
        if (!data.universe.includes(state.stateId) || state.stateId !== `US-${state.postalCode}` || !/^\d{2}$/.test(state.censusFips))
            issue('STATE_IDENTITY', state.stateId, 'State ID, postal code, or FIPS mismatch');
        refs(state.identitySourceRefs, state.stateId);
        if (!data.assets.some(a => a.assetId === state.mapAssetId && a.stateId === state.stateId))
            issue('STATE_ASSET', state.stateId, 'Missing matching map asset');
    }
    for (const fact of data.facts) {
        const m = metrics.get(fact.metricId);
        const path = fact.factId;
        if (!m)
            issue('METRIC_MISSING', path, `Unknown metric ${fact.metricId}`);
        if (fact.snapshotId !== data.snapshot.snapshotId)
            issue('FACT_SNAPSHOT', path, 'Fact belongs to a different snapshot');
        if (!fact.derivation && !fact.sourceRefs.length)
            issue('FACT_PROVENANCE', path, 'Non-derived fact needs source evidence');
        refs(fact.sourceRefs, path);
        const period = fact.referencePeriod;
        if ((m?.timeSensitive && period.kind === 'static') || (period.kind === 'point_date' && !validDate(period.date)) || (period.kind === 'calendar_year' && (!Number.isInteger(period.year) || period.year! < 1700)) || (period.kind === 'range' && (!validDate(period.startDate) || !validDate(period.endDate) || period.startDate! > period.endDate!)) || (period.kind === 'legal_effective' && !validDate(period.date)))
            issue('FACT_REFERENCE_PERIOD', path, 'Metric needs a valid reference year/date/range');
        if (m?.timeSensitive && !fact.sourceRefs.length && !fact.derivation)
            issue('DYNAMIC_PROVENANCE', path, 'Dynamic fact requires source and reference period');
        const type = Array.isArray(fact.value) ? 'id_list' : typeof fact.value;
        if (m && fact.value !== null && (m.valueType === 'date' ? typeof fact.value !== 'string' || !validDate(fact.value) : m.valueType !== type))
            issue('FACT_VALUE_TYPE', path, `Expected ${m.valueType}, received ${type}`);
        if (fact.value === null && !fact.suppressionCode)
            issue('SUPPRESSION_CODE', path, 'Null observations require a source suppression code');
        if (fact.derivation?.method === 'rank') {
            const input = metrics.get(String(fact.derivation.parameters.inputMetricId));
            if (input?.rankDirection && input.rankDirection !== fact.derivation.parameters.direction)
                issue('RANK_DIRECTION', path, 'Derivation direction differs from metric definition');
        }
        if (fact.suppressionCode)
            issue('SUPPRESSED_VALUE', path, `Official value is ${fact.suppressionCode}; no imputation`, 'warning');
        if (m?.unit && fact.unit !== m.unit)
            issue('FACT_UNIT', path, `Expected ${m.unit}`);
    }
    try {
        for (const recomputed of recomputeDerived(data.facts))
            if (recomputed.derivation) {
                const original = facts.get(recomputed.factId)!;
                if (!isDeepStrictEqual(original.value, recomputed.value))
                    issue('DERIVED_VALUE', original.factId, `Stored ${JSON.stringify(original.value)}, recomputed ${JSON.stringify(recomputed.value)}`);
                if (original.derivation?.method === 'rank' && original.universe === 'us-50-states' && !sameSet(original.derivation.parameters.subjectIds as string[], data.universe))
                    issue('RANK_UNIVERSE', original.factId, 'Rank input universe differs from the canonical 50 states');
            }
    }
    catch (error) {
        issue(error instanceof DataError ? error.code : 'DERIVATION', 'facts', String(error));
    }
    const pairs = new Map<string, typeof data.boundaries[number]>();
    for (const b of data.boundaries) {
        if (!data.universe.includes(b.stateA) || !data.universe.includes(b.stateB) || b.stateA === b.stateB)
            issue('BOUNDARY_ENDPOINT', b.boundaryId, 'Unknown or self endpoint');
        const key = [b.stateA, b.stateB].sort().join('/') + '/' + b.topology + '/' + b.medium;
        if (pairs.has(key))
            issue('BOUNDARY_ASYMMETRY', b.boundaryId, 'Duplicate/reverse relationship; use one undirected canonical record');
        pairs.set(key, b);
        const ordinary = b.topology === 'segment' && b.medium !== 'lake_or_coastal_water';
        if (b.clueBorderEligible !== ordinary || b.borderHuntEdge !== ordinary)
            issue('BOUNDARY_POLICY', b.boundaryId, 'Point contacts and water-only boundaries cannot be default edges/ordinary borders');
        if (!sources.has(b.sourceGeometryId))
            issue('BOUNDARY_SOURCE', b.boundaryId, 'Unknown geometry source');
    }
    for (const metricId of ['boundary.shared_segments', 'boundary.point_contacts', 'boundary.audited_water']) {
        const rows = data.facts.filter(f => f.metricId === metricId);
        const lookup = new Map(rows.map(f => [f.subjectId, f.value]));
        for (const f of rows)
            if (Array.isArray(f.value)) {
                if (new Set(f.value).size !== f.value.length || f.value.includes(f.subjectId))
                    issue('BOUNDARY_ASYMMETRY', f.factId, 'Repeated neighbor or self-boundary');
                for (const neighbor of f.value) {
                    const reverse = lookup.get(neighbor);
                    if (!Array.isArray(reverse) || !reverse.includes(f.subjectId))
                        issue('BOUNDARY_ASYMMETRY', f.factId, `Missing reverse ${metricId} relation from ${neighbor}`);
                }
            }
    }
    for (const b of data.boundaries) {
        const metricId = b.topology === 'point_contact' ? 'boundary.point_contacts' : b.medium === 'lake_or_coastal_water' ? 'boundary.audited_water' : 'boundary.shared_segments';
        for (const [from, to] of [[b.stateA, b.stateB], [b.stateB, b.stateA]]) {
            const value = data.facts.find(f => f.subjectId === from && f.metricId === metricId)?.value;
            if (!Array.isArray(value) || !value.includes(to))
                issue('BOUNDARY_FACT_MISMATCH', b.boundaryId, `Canonical topology disagrees with ${from}/${metricId}`);
        }
    }
    for (const p of data.parks) {
        if (p.isFormallyNationalPark !== (p.formalDesignation === 'National Park'))
            issue('PARK_TERMINOLOGY', p.associationId, 'Formal National Park flag disagrees with designation');
        if (p.isFormallyNationalPark && !['inside', 'partly_inside'].includes(p.relationship))
            issue('PARK_RELATIONSHIP', p.associationId, 'A trail/administrative association does not establish a formal park inside a state');
        refs(p.sourceRefs, p.associationId);
    }
    for (const clue of data.clues) {
        const path = clue.clueId;
        const approved = clue.review.status === 'approved';
        if (!data.states.some(s => s.stateId === clue.answerStateId))
            issue('CLUE_STATE', path, 'No researched answer fixture');
        if (approved && (!clue.review.evidenceChecked || !clue.review.wordingChecked || !clue.review.fairnessChecked))
            issue('CLUE_REVIEW', path, 'All three review checks are required');
        const referenced = clue.factRefs.map(id => facts.get(id));
        if (!referenced.length || referenced.some(f => !f))
            issue('CLUE_FACT_REFS', path, 'Missing supporting facts');
        if (approved && referenced.some(f => f?.quality.status !== 'verified'))
            issue('CLUE_FACT_QUALITY', path, 'Approved clue uses unverified facts');
        const text = clue.render.text?.en ?? '';
        for (const metricId of predicateMetrics(clue.predicate)) {
            const metric = metrics.get(metricId);
            if (!metric || !metric.allowedClueCategories.includes(clue.category))
                issue('CLUE_METRIC', path, `Metric ${metricId} is not allowed in ${clue.category}`);
            if (!referenced.some(f => f?.subjectId === clue.answerStateId && f.metricId === metricId))
                issue('CLUE_PREDICATE_EVIDENCE', path, `No answer fact reference for ${metricId}`);
        }
        const dynamic = referenced.filter(f => f && metrics.get(f.metricId)?.timeSensitive);
        if (approved && (dynamic.length || clue.freshness.referenceLabelRequired)) {
            if (!clue.freshness.referenceLabelRequired || !/\b(?:19|20)\d{2}\b/.test(text))
                issue('CLUE_REFERENCE_LABEL', path, 'Dynamic clue must display a reference year/date');
            for (const f of dynamic) {
                const year = String(f!.referencePeriod.year ?? f!.referencePeriod.date?.slice(0, 4) ?? f!.referencePeriod.endDate?.slice(0, 4) ?? '');
                if (year && !text.includes(year))
                    issue('CLUE_REFERENCE_YEAR', path, `Clue omits fact reference year ${year}`);
            }
        }
        if (approved && /\b(latest|huge economy|famous|rainiest|wealthiest)\b/i.test(text))
            issue('VAGUE_WORDING', path, 'Undefined or mutable wording');
        if (clue.category === 'cities' && (!/incorporated places/i.test(text) || !referenced.some(f => f?.universe?.includes('incorporated'))))
            issue('PLACE_UNIVERSE', path, 'City clue must define incorporated-place universe');
        if (/national parks?/i.test(text) && !/formally designated|national historic|national monument|national memorial|national preserve/i.test(text) && !referenced.some(f => f && /^nps\.formal/.test(f.metricId)))
            issue('PARK_TERMINOLOGY', path, 'National Park wording needs formal designation evidence');
        if (clue.category === 'borders' && predicateMetrics(clue.predicate).some(m => m.includes('water')) && !/water boundary/i.test(text))
            issue('WATER_WORDING', path, 'Water relationship needs explicit wording');
        if (predicateMetrics(clue.predicate).some(m => m.includes('point_contact')) && !/point/i.test(text))
            issue('POINT_WORDING', path, 'Point contact needs explicit wording');
        const min = minimumRung(clue, data);
        if (!Number.isInteger(clue.ladderPolicy.earliestRung) || !Number.isInteger(clue.ladderPolicy.latestRung) || clue.ladderPolicy.earliestRung < min || clue.ladderPolicy.latestRung > 10 || clue.ladderPolicy.earliestRung > clue.ladderPolicy.latestRung)
            issue('CLUE_RUNG_WINDOW', path, `Invalid window; minimum permitted rung is ${min}`);
        if (clue.difficulty.directness === 'direct_identifier' && clue.difficulty.seedTier !== 1)
            issue('DIRECT_TIER', path, 'Direct identifiers are Tier 1');
        for (const incompatible of clue.ladderPolicy.incompatibleClueIds ?? [])
            if (!data.clues.some(c => c.clueId === incompatible))
                issue('INCOMPATIBLE_REF', path, `Unknown clue ${incompatible}`);
        try {
            const truth = evaluate(clue.predicate, clue.answerStateId, data.facts, data.snapshot.snapshotId);
            if (truth !== true)
                issue('CLUE_ANSWER', path, `Predicate is ${truth} for answer`, approved ? 'error' : 'warning');
            const fresh = candidates(clue.predicate, data.universe, data.facts, data.snapshot.snapshotId);
            if (!fresh.complete)
                issue('CANDIDATE_COVERAGE', path, `Missing nationwide evidence: ${fresh.unknownStateIds.join(', ')}`, approved ? 'error' : 'warning');
            if (!sameSet(clue.candidateSet.stateIds, fresh.stateIds) || clue.candidateSet.count !== fresh.stateIds.length)
                issue('CANDIDATE_STALE', path, `Stored ${clue.candidateSet.count}; fresh known matches ${fresh.stateIds.join(', ')}`);
            if (clue.candidateSet.snapshotId !== data.snapshot.snapshotId || clue.candidateSet.evaluatorVersion !== ENGINE_VERSION)
                issue('CANDIDATE_VERSION', path, 'Candidate set has the wrong snapshot or evaluator');
        }
        catch (error) {
            issue('PREDICATE', path, String(error));
        }
        if (clue.render.assetId && !data.assets.some(a => a.assetId === clue.render.assetId && a.stateId === clue.answerStateId))
            issue('CLUE_ASSET', path, 'Missing or wrong-state asset');
    }
    for (const a of data.assets) {
        const state = data.states.find(s => s.stateId === a.stateId);
        const visible = `${a.filePath} ${a.accessibility.preAnswerAlt}`;
        if (state && leaks(visible, state.name, state.postalCode, state.censusFips))
            issue('ASSET_LEAK', a.assetId, 'Answer in pre-answer asset filename or alt text');
        if (a.kind === 'silhouette' && a.accessibility.preAnswerAlt !== 'Mystery state shape' || a.kind === 'locator_map' && a.accessibility.preAnswerAlt !== 'Mystery state location')
            issue('ASSET_ALT', a.assetId, 'Wrong generic alt text');
        if (checkFiles) {
            const root = resolve('data/clue-ladder');
            const path = resolve(root, a.filePath);
            const rel = relative(root, path);
            if (rel.startsWith('..') || isAbsolute(rel)) {
                issue('ASSET_PATH', a.assetId, 'Asset must stay within the data directory');
                continue;
            }
            if (!existsSync(path)) {
                issue('ASSET_FILE', a.assetId, 'Missing visual asset');
                continue;
            }
            const bytes = readFileSync(path);
            const xml = bytes.toString('utf8');
            if (createHash('sha256').update(bytes).digest('hex') !== a.sha256)
                issue('ASSET_HASH', a.assetId, 'Asset differs from recorded digest');
            const metadata = xml.match(/<(?:title|desc|metadata)\b[^>]*>[\s\S]*?<\/(?:title|desc|metadata)>|(?:aria-label|data-name|id)="[^"]*"/gi)?.join(' ') ?? '';
            if (state && leaks(metadata, state.name, state.postalCode, state.censusFips))
                issue('ASSET_LEAK', a.assetId, 'Answer in SVG metadata');
        }
    }
    for (const table of data.referenceTables) {
        const actual = table.factIds.map(id => facts.get(id));
        if (actual.some(f => !f || f.metricId !== table.metricId || f.snapshotId !== table.snapshotId) || !sameSet(actual.filter(Boolean).map(f => f!.subjectId), table.subjectIds))
            issue('REFERENCE_TABLE', table.tableId, 'Table membership differs from its fact references');
        if (table.complete && table.universe === 'us-50-states' && !sameSet(table.subjectIds, data.universe))
            issue('REFERENCE_COVERAGE', table.tableId, 'Complete national table needs all 50 states');
    }
    if (checkFiles)
        for (const source of data.snapshot.sourceFiles) {
            const path = resolve('data/clue-ladder', source.path);
            if (!existsSync(path) || createHash('sha256').update(readFileSync(path)).digest('hex') !== source.sha256)
                issue('SNAPSHOT_SOURCE_HASH', source.path, 'Archived source is missing or changed');
        }
    return out;
}
function leaks(text: string, name: string, postal: string, fips: string) {
    return text.toLowerCase().includes(name.toLowerCase()) || new RegExp(`(?:^|[^a-z0-9])(?:${postal}|${fips})(?:$|[^a-z0-9])`, 'i').test(text);
}
export function minimumRung(clue: ClueRecord, data?: Dataset) {
    if (data?.rules.profile === 'short-seven-v1') {
        if (['silhouette', 'map_position', 'abbreviation'].includes(clue.category)) return 7;
        if (clue.difficulty.directness === 'direct_identifier' || clue.difficulty.seedTier === 1) return 6;
        return 1;
    }
    if (['silhouette', 'map_position'].includes(clue.category))
        return 9;
    if (clue.category === 'abbreviation')
        return 8;
    if (clue.difficulty.directness === 'direct_identifier' || clue.difficulty.seedTier === 1)
        return 7;
    return 1;
}
export function validateLadder(clues: readonly ClueRecord[], data: Dataset): Diagnostic[] {
    const out: Diagnostic[] = [];
    const issue = (code: string, path: string, message: string) => out.push({ severity: 'error', code, path, message });
    if (data.rules.profile === 'short-seven-v1' ? clues.length !== 7 : (clues.length < 8 || clues.length > 10))
        issue('LADDER_LENGTH', 'ladder', 'Requires seven clues for short edition, otherwise 8–10');
    if (new Set(clues.map(c => c.clueId)).size !== clues.length)
        issue('LADDER_DUPLICATE', 'ladder', 'Repeated clue');
    if (new Set(clues.map(c => c.answerStateId)).size !== 1)
        issue('LADDER_ANSWER', 'ladder', 'Mixed answer states');
    clues.forEach((c, i) => {
        const rung = i + 1, p = c.ladderPolicy;
        if (c.review.status !== 'approved')
            issue('LADDER_APPROVAL', c.clueId, 'Compiler accepts only approved clues');
        if (rung < Math.max(p.earliestRung, minimumRung(c, data)) || rung > p.latestRung)
            issue('LADDER_RUNG', c.clueId, `Not allowed at rung ${rung}`);
        if (p.requiresEarlierCategory && !clues.slice(0, i).some(other => other.category === p.requiresEarlierCategory))
            issue('LADDER_PREREQUISITE', c.clueId, `Requires earlier ${p.requiresEarlierCategory}`);
        for (let j = 0; j < i; j++) {
            const other = clues[j];
            if (other.ladderPolicy.dependencyGroup === p.dependencyGroup && !data.rules.allowedDependencyGroups.includes(p.dependencyGroup))
                issue('LADDER_DEPENDENCY', c.clueId, `Same dependency group as ${other.clueId}`);
            if (p.incompatibleClueIds?.includes(other.clueId) || other.ladderPolicy.incompatibleClueIds?.includes(c.clueId))
                issue('LADDER_INCOMPATIBLE', c.clueId, `Incompatible with ${other.clueId}`);
            if (c.category === other.category && (i < 8 || data.rules.prohibitedDuplicateCategories.includes(c.category)))
                issue('LADDER_CATEGORY', c.clueId, `Repeated ${c.category}`);
            if (['US-CO', 'US-RI'].includes(c.answerStateId) && new Set([c.category, other.category]).size === 2 && [c.category, other.category].every(k => ['cities', 'capital'].includes(k)) && !(i >= clues.length - 2 && j >= clues.length - 2))
                issue('LADDER_CITY_CAPITAL', c.clueId, 'Capital/largest-city overlap is allowed only in the final two rungs');
        }
    });
    if (clues.slice(0, 5).filter(c => c.difficulty.directness === 'named_association' && c.candidateSet.count === 1).length > 1)
        issue('LADDER_EARLY_NAMED', 'ladder', 'At most one unique named place before rung 6');
    if (!clues.slice(0, -3).some(c => !['population', 'area', 'economy', 'industry'].includes(c.category)))
        issue('LADDER_NON_STATISTICAL', 'ladder', 'Needs a non-statistical clue before the final three rungs');
    return out;
}
export function validateManifest(manifest: PuzzleManifest, data: Dataset): Diagnostic[] {
    const out = validateSchema('puzzle-manifest', manifest);
    if (out.length)
        return out;
    const issue = (code: string, message: string) => out.push({ severity: 'error', code, path: manifest.puzzleId, message });
    if (manifest.dataSnapshotId !== data.snapshot.snapshotId || !/^us-states-\d{4}-\d{2}-\d{2}-v\d+$/.test(manifest.dataSnapshotId))
        issue('MANIFEST_SNAPSHOT', 'Must reference the exact registered immutable snapshot');
    if (manifest.clueSetVersion !== data.snapshot.clueSetVersion || manifest.validatorVersion !== ENGINE_VERSION)
        issue('MANIFEST_VERSION', 'Clue/validator version mismatch');
    if (!manifest.seed || !validDate(manifest.generatedAt))
        issue('MANIFEST_METADATA', 'Seed and generated timestamp required');
    if (manifest.scoring.maxByRung.length !== manifest.orderedClueIds.length || manifest.scoring.maxByRung.some((s, i, a) => s < 0 || !Number.isFinite(s) || (i > 0 && s >= a[i - 1])) || manifest.scoring.wrongGuessPenalty < 0)
        issue('MANIFEST_SCORING', 'Invalid scoring schedule');
    if (manifest.dataContentSha256 !== contentDigest(data))
        issue('MANIFEST_INTEGRITY', 'Input content changed under this snapshot or clue-set version');
    const clues = manifest.orderedClueIds.map(id => data.clues.find(c => c.clueId === id));
    if (clues.some(c => !c || c.answerStateId !== manifest.answerStateId))
        issue('MANIFEST_CLUES', 'Missing clues or incorrect answer');
    else
        out.push(...validateLadder(clues as ClueRecord[], data));
    return out;
}
