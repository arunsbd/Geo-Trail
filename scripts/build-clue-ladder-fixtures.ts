import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { STATES, STATE_CODES, type StateCode } from '../data/states';
import { STATE_BORDERS } from '../data/borders';
import { US_STATE_SHAPES } from '../data/map';
import { ENGINE_VERSION, UNIVERSE, type Dataset, type ReferenceTable } from '../lib/clue-ladder/dataset';
import type { AssetRecord, BoundaryRecord, ClueCategory, ClueRecord, FactRecord, FactValue, MetricDefinition, Predicate, SourceLocator, SourceRecord, StateId } from '../lib/clue-ladder/types';
import { recomputeDerived } from '../lib/clue-ladder/derive';
import { candidates, predicateMetrics } from '../lib/clue-ladder/predicates';
const base = resolve('data/clue-ladder');
const snapshotId = 'us-states-2026-09-05-v1', clueSetVersion = 'audited-examples-v1';
const dir = `snapshots/${snapshotId}`, raw = `${dir}/raw`;
const manifestsDir = resolve(base, 'ladders/manifests');
if (existsSync(manifestsDir) && readdirSync(manifestsDir).filter(f => f.endsWith('.json')).some(f => JSON.parse(readFileSync(resolve(manifestsDir, f), 'utf8')).dataSnapshotId === snapshotId))
    throw new Error('Snapshot is referenced by a manifest. Create a new snapshot and clue-set version; do not rebuild this one.');
const read = (p: string) => JSON.parse(readFileSync(resolve(base, p), 'utf8'));
const write = (p: string, v: unknown) => writeFileSync(resolve(base, p), JSON.stringify(v, null, 2) + '\n');
const sha = (bytes: string | Buffer) => createHash('sha256').update(bytes).digest('hex');
type ReferenceState = {
    name: string;
    fips: string;
    population: number;
    land: number;
    water: number;
    total: number;
    elevation: number;
    highpoint: string;
    admissionYear: number;
    gdp: number;
    manufacturing: number | {
        suppressed: string;
    };
    professional: number;
    educationHealth: number;
    formalParks: string[];
    zones: string[];
};
type Place = {
    state: StateCode;
    name: string;
    population: number | null;
    suppressionCode: string | null;
    row: number;
    column: string;
    sheet: string;
};
const reference = read(`${dir}/reference-inputs.json`) as {
    states: Record<StateCode, ReferenceState>;
    formalParks: {
        id: string;
        name: string;
        states: StateCode[];
        url: string;
        locationText: string;
    }[];
    places: Place[];
};
const audit = read('review/audited-examples.json') as {
    clues: {
        clueId: string;
        answerStateId: StateId;
        text: string;
        category: ClueCategory;
        expectedCount: number;
        tier: 1 | 2 | 3 | 4 | 5;
        earliest: number;
        latest: number;
    }[];
    sampleLadders: Record<string, string[]>;
    earlyCounts: Record<string, number[]>;
};
const id = (code: StateCode): StateId => `US-${code}`;
const universe = STATE_CODES.map(id);
const createdAt = new Date(Math.max(...['population.csv', 'SAGDP.zip', 'area.html', 'parks.html', 'elevation.html', 'history.html', 'time-zones.xml', 'places-01.xlsx', 'places-08.xlsx', 'places-44.xlsx'].map(f => statSync(resolve(base, raw, f)).mtimeMs))).toISOString();
const sources: SourceRecord[] = [], sourceFiles: Dataset['snapshot']['sourceFiles'] = [];
function source(sourceId: string, publisher: string, title: string, file: string, url: string, updateClass: SourceRecord['updateClass'], coverage: SourceRecord['coverage'], extras: Partial<SourceRecord> = {}) {
    const path = resolve(base, file), hash = sha(readFileSync(path));
    sources.push({ sourceId, publisher, title, landingPageUrl: url, downloadUrl: url, retrievedAt: statSync(path).mtime.toISOString(), coverage, authorityTier: 1, updateClass, sha256: hash, ...extras });
    sourceFiles.push({ sourceId, path: file, sha256: hash });
}
source('CEN-PEP-STATE-V2025', 'U.S. Census Bureau', 'Vintage 2025 state population', `${raw}/population.csv`, 'https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv', 'annual', { referenceDate: '2025-07-01' }, { datasetId: 'NST-EST2025-ALLDATA', editionOrVintage: 'Vintage 2025' });
source('BEA-SAGDP-2025', 'Bureau of Economic Analysis', 'Annual current-dollar GDP', `${raw}/SAGDP.zip`, 'https://apps.bea.gov/regional/zip/SAGDP.zip', 'annual', { startDate: '2025-01-01', endDate: '2025-12-31' }, { tableId: 'SAGDP1 / SAGDP2', releaseDate: '2026-04-09' });
source('CEN-AREA-2010', 'U.S. Census Bureau', '2010 state area measurements', `${raw}/area.html`, 'https://www.census.gov/geographies/reference-files/2010/geo/state-area.html', 'static', { boundaryDate: '2010-01-01' }, { notes: 'HTML rounds square miles to integers. RI research value 1,033.8 retained separately; both rank 50.' });
source('USGS-ELEV', 'U.S. Geological Survey', 'Highest and Lowest Elevations', `${raw}/elevation.html`, 'https://www.usgs.gov/educational-resources/highest-and-lowest-elevations', 'static', {}, { notes: 'Historical table elevations retained; footnote markers removed, not treated as digits. No modern datum substitutions.' });
source('NPS-SYSTEM-2026-09', 'National Park Service', 'Formal designation enumeration', `${raw}/parks.html`, 'https://www.nps.gov/aboutus/national-park-system.htm', 'event_driven', { referenceDate: '2026-09-05' }, { notes: 'Fresh September retrieval, not a July archive. All 63 formal units retained before filtering states.' });
source('CEN-STATEHOOD-2013', 'U.S. Census Bureau', 'Statehood years', `${raw}/history.html`, 'https://www.census.gov/dataviz/visualizations/048/508.php', 'static', {}, { releaseDate: '2013-02-21' });
source('DOT-TIME-2026', 'U.S. Department of Transportation / eCFR', '49 CFR Part 71', `${raw}/time-zones.xml`, 'https://www.ecfr.gov/api/versioner/v1/full/2026-08-30/title-49.xml?part=71', 'regulatory', { referenceDate: '2026-08-30' }, { notes: 'Legal standard zones; informal local observance and DST separate. Includes West Wendover, Nevada.' });
for (const code of ['AL', 'CO', 'RI'] as const) {
    const fips = reference.states[code].fips;
    source(`CEN-PEP-PLACE-V2025-${fips}`, 'U.S. Census Bureau', `Incorporated places: ${code}`, `${raw}/places-${fips}.xlsx`, `https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-${fips}.xlsx`, 'annual', { referenceDate: '2025-07-01' }, { datasetId: `SUB-IP-EST2025-POP-${fips}`, editionOrVintage: 'Vintage 2025' });
}
if (!existsSync(resolve(base, raw, 'states-albers-10m.json')))
    writeFileSync(resolve(base, raw, 'states-albers-10m.json'), readFileSync(resolve('node_modules/us-atlas/states-albers-10m.json')));
source('CEN-ATLAS-3.0.1', 'U.S. Census Bureau via us-atlas', 'Existing Border Hunt display geometry', `${raw}/states-albers-10m.json`, 'https://github.com/topojson/us-atlas/tree/v3.0.1', 'static', {}, { notes: 'Pinned existing display geometry; not 2025 TIGER legal geometry.' });
for (const [sourceId, publisher, title, url] of [
    ['CEN-GUIDE-2010', 'U.S. Census Bureau', 'State geography guides', 'https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010.html'],
    ['CEN-TIGER-2025', 'U.S. Census Bureau', '2025 TIGER/Line', 'https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html'],
    ['NPS-STATE-2026', 'National Park Service', 'State unit associations in supplied audit', 'https://www.nps.gov/state/index.htm'],
    ['USPS-PUB28-2024', 'U.S. Postal Service', 'Publication 28 Appendix B', 'https://pe.usps.com/text/pub28/28apb.htm'],
    ['NOAA-SCS-2022', 'NOAA/NESDIS', 'State Climate Summaries 2022', 'https://www.ncei.noaa.gov/news/noaa-addresses-climate-each-state'],
])
    sources.push({ sourceId, publisher, title, landingPageUrl: url, retrievedAt: createdAt, coverage: {}, authorityTier: 1, updateClass: 'static', notes: 'Source reference from supplied 2026-08-30 audit. retrievedAt records receipt of that reference, not an original source download. See specification.' });
const facts: FactRecord[] = [], metricMap = new Map<string, MetricDefinition>();
function metric(metricId: string, valueType: MetricDefinition['valueType'], unit: string | undefined, timeSensitive: boolean, categories: ClueCategory[], definition: string, rankable = false) {
    metricMap.set(metricId, { metricId, label: definition, definition, valueType, ...(unit ? { unit } : {}), defaultUniverse: UNIVERSE, preferredPublisher: metricId.startsWith('economy') ? 'Bureau of Economic Analysis' : metricId.startsWith('nps') ? 'National Park Service' : metricId.startsWith('physical') ? 'U.S. Geological Survey' : metricId.startsWith('time') ? 'U.S. Department of Transportation' : metricId.startsWith('climate') ? 'NOAA/NESDIS' : metricId === 'identity.postal_code' ? 'U.S. Postal Service' : 'U.S. Census Bureau', timeSensitive, rankable, ...(rankable ? { rankDirection: 'descending' as const } : {}), allowedClueCategories: categories });
}
metric('population.resident_estimate', 'number', 'persons', true, ['population'], 'July 1 resident estimate, Census Vintage 2025; 50 states.', true);
metric('population.state_rank', 'number', 'rank', true, ['population'], 'Descending competition rank among 50 states.');
for (const part of ['land', 'water', 'total'])
    metric(`area.${part}_sq_mi`, 'number', 'square_miles', false, ['area'], `Census 2010 ${part} area at HTML displayed precision.`, true);
metric('area.land_rank', 'number', 'rank', false, ['area'], 'Descending land-area competition rank.');
metric('economy.gdp_current_usd', 'number', 'USD', true, ['economy'], 'Annual current-dollar GDP; SAGDP1 line 3, not real/per-capita GDP.', true);
metric('economy.gdp_state_rank', 'number', 'rank', true, ['economy'], 'Descending current-dollar GDP competition rank.');
for (const industry of ['manufacturing', 'professional', 'education_health']) {
    metric(`economy.industry_value_added_current_usd.${industry}`, 'number', 'USD', true, ['industry'], `${industry} value added in annual current dollars.`);
    metric(`economy.industry_share_of_gdp.${industry}`, 'number', 'percent', true, ['industry'], `${industry} numerator / same-state annual current-dollar GDP * 100; unrounded.`);
}
metric('physical.highest_point', 'number', 'feet', false, ['physical_geography'], 'Highest-point elevation in cited historical USGS table.');
metric('history.admission_year', 'number', 'year', false, ['history'], 'Year of statehood.');
metric('history.admission_date', 'date', undefined, false, ['history'], 'Date of admission/ratification.');
metric('history.admission_order', 'number', 'rank', false, ['history'], 'Order of admission/ratification under current Constitution.');
metric('time.standard_zone', 'id_list', undefined, true, ['time_zone'], 'All legal standard zones intersecting a state under 49 CFR 71, excluding DST inference.');
metric('nps.formal_unit_ids', 'id_list', undefined, true, ['parks', 'landmark'], 'Complete formal National Park enumeration.');
metric('nps.formal_national_park_count', 'number', 'units', true, ['parks'], 'Count of distinct formal National Parks intersecting the state.');
metric('nps.associated_unit', 'id_list', undefined, false, ['landmark'], 'Membership only for the named landmark entities in the three-state audit; not all NPS sites.');
metric('identity.postal_code', 'string', undefined, false, ['abbreviation', 'silhouette', 'map_position'], 'USPS postal abbreviation.');
metric('identity.capital', 'string', undefined, false, ['capital'], 'Capital name.');
metric('place.population_estimate', 'number', 'persons', true, ['cities'], 'Incorporated-place July 1, 2025 population estimate.');
metric('place.within_state_rank', 'number', 'rank', true, ['cities'], 'Descending incorporated-place population rank among published 2025 estimates.');
metric('place.top_two', 'id_list', undefined, true, ['cities'], 'Two largest incorporated places with published 2025 estimates.');
metric('place.audit_membership', 'id_list', undefined, false, ['cities', 'capital'], 'Complete inverse assignment of entities in the AL/CO/RI Census place workbooks to their containing state; not nationwide city rankings.');
metric('boundary.shared_segments', 'id_list', undefined, false, ['borders', 'physical_geography'], 'Existing tested land/river shared-arc neighbors, point contacts excluded.');
metric('boundary.point_contacts', 'id_list', undefined, false, ['physical_geography'], 'Audited Four Corners point contacts.');
metric('boundary.audited_water', 'id_list', undefined, false, ['borders'], 'Restricted to RI–NY water-only relationship; other water boundaries outside scope.');
metric('climate.annual_precipitation_average', 'number', 'inches', false, ['climate'], 'NOAA 2022 summary research values; not approved for nationwide comparison.');
const fid = (subject: string, m: string) => `${snapshotId}:${subject}:${m}`;
const period = (year?: number): FactRecord['referencePeriod'] => year ? { kind: 'calendar_year', year } : { kind: 'static' };
function fact(subjectId: string, metricId: string, value: FactValue, sourceRefs: SourceLocator[], referencePeriod: FactRecord['referencePeriod'] = period(), universeName = UNIVERSE, extra: Partial<FactRecord> = {}) {
    const record: FactRecord = { factId: fid(subjectId, metricId), subjectId, metricId, value, ...(metricMap.get(metricId)?.unit ? { unit: metricMap.get(metricId)!.unit } : {}), referencePeriod, universe: universeName, sourceRefs, snapshotId, quality: { status: 'verified', verifiedAt: createdAt, ...(sourceRefs.some(ref => sources.find(s => s.sourceId === ref.sourceId)?.notes?.startsWith('Source reference from supplied')) ? { notes: 'Transcribed from the supplied audited specification; not independently re-retrieved.' } : { verificationMethod: 'automated_crosscheck' as const }) }, ...extra };
    facts.push(record);
    return record;
}
const loc = (sourceId: string, rowKey: string, column: string, table?: string): SourceLocator => ({ sourceId, rowKey, column, ...(table ? { table } : {}) });
for (const code of STATE_CODES) {
    const r = reference.states[code], subject = id(code);
    fact(subject, 'population.resident_estimate', r.population, [loc('CEN-PEP-STATE-V2025', `STATE=${r.fips};SUMLEV=040`, 'POPESTIMATE2025')], { kind: 'point_date', date: '2025-07-01' });
    for (const part of ['land', 'water', 'total'] as const)
        fact(subject, `area.${part}_sq_mi`, r[part], [loc('CEN-AREA-2010', r.name, `${part} area Sq. Mi.`)]);
    fact(subject, 'economy.gdp_current_usd', r.gdp, [loc('BEA-SAGDP-2025', `${r.fips}000;LineCode=3`, '2025', 'SAGDP1')], period(2025));
    for (const [name, key, line] of [['manufacturing', 'manufacturing', 12], ['professional', 'professional', 60], ['education_health', 'educationHealth', 68]] as const) {
        const value = r[key], m = `economy.industry_value_added_current_usd.${name}`;
        fact(subject, m, typeof value === 'number' ? value : null, [loc('BEA-SAGDP-2025', `${r.fips}000;LineCode=${line}`, '2025', 'SAGDP2')], period(2025), UNIVERSE, typeof value === 'number' ? {} : { suppressionCode: value.suppressed });
        if (typeof value === 'number')
            fact(subject, `economy.industry_share_of_gdp.${name}`, 0, [], period(2025), UNIVERSE, { derivation: { method: 'ratio', inputFactIds: [fid(subject, m), fid(subject, 'economy.gdp_current_usd')], parameters: { scale: 100 }, codeVersion: ENGINE_VERSION } });
    }
    fact(subject, 'physical.highest_point', r.elevation, [loc('USGS-ELEV', r.name, 'Highest point elevation feet')]);
    fact(subject, 'history.admission_year', r.admissionYear, [loc('CEN-STATEHOOD-2013', r.name, 'Year of statehood')]);
    fact(subject, 'time.standard_zone', r.zones, [{ sourceId: 'DOT-TIME-2026', section: '49 CFR 71.4–71.12', rowKey: r.name }], { kind: 'legal_effective', date: '2026-08-30' });
    fact(subject, 'nps.formal_unit_ids', r.formalParks, [{ sourceId: 'NPS-SYSTEM-2026-09', section: 'National Parks (63)', rowKey: r.name }], { kind: 'point_date', date: '2026-09-05' });
    fact(subject, 'nps.formal_national_park_count', 0, [], { kind: 'point_date', date: '2026-09-05' }, UNIVERSE, { derivation: { method: 'count', inputFactIds: [fid(subject, 'nps.formal_unit_ids')], parameters: { distinct: true }, codeVersion: ENGINE_VERSION } });
    fact(subject, 'identity.postal_code', code, [{ sourceId: 'USPS-PUB28-2024', section: 'Appendix B', rowKey: r.name }]);
    const points = ({ CO: ['AZ'], AZ: ['CO'], NM: ['UT'], UT: ['NM'] } as Partial<Record<StateCode, StateCode[]>>)[code] ?? [];
    fact(subject, 'boundary.shared_segments', STATE_BORDERS[code].filter(c => !points.includes(c)).map(id), [{ sourceId: 'CEN-ATLAS-3.0.1', featureId: r.fips, section: 'Tested shared-arc adjacency, excluding Four Corners contacts' }]);
    fact(subject, 'boundary.point_contacts', points.map(id), [{ sourceId: 'CEN-TIGER-2025', featureId: r.fips, section: 'Specification audited Four Corners contacts' }]);
    fact(subject, 'boundary.audited_water', code === 'RI' ? ['US-NY'] : code === 'NY' ? ['US-RI'] : [], [{ sourceId: 'CEN-TIGER-2025', section: 'Specification 13.1; restricted RI–NY relation' }]);
}
for (const [inputMetricId, outputMetricId] of [['population.resident_estimate', 'population.state_rank'], ['area.land_sq_mi', 'area.land_rank'], ['economy.gdp_current_usd', 'economy.gdp_state_rank']])
    for (const code of STATE_CODES) {
        const input = facts.find(f => f.factId === fid(id(code), inputMetricId))!;
        fact(id(code), outputMetricId, 0, [], input.referencePeriod, UNIVERSE, { derivation: { method: 'rank', inputFactIds: universe.map(s => fid(s, inputMetricId)), parameters: { subjectIds: universe, inputMetricId, direction: 'descending', tieMethod: 'competition' }, codeVersion: ENGINE_VERSION } });
    }
const placeId = (p: Place) => `place:${p.state}:${p.name.split(',')[0].toLowerCase().replace(/[^a-z]+/g, '-')}`;
for (const p of reference.places)
    fact(placeId(p), 'place.population_estimate', p.population, [{ sourceId: `CEN-PEP-PLACE-V2025-${reference.states[p.state].fips}`, sheet: p.sheet, rowKey: `${p.row}: ${p.name}`, column: p.column }], { kind: 'point_date', date: '2025-07-01' }, `incorporated-places-${p.state}-published-2025`, p.suppressionCode ? { suppressionCode: p.suppressionCode } : {});
const topPairs: Partial<Record<StateCode, string[]>> = {}, capitals = { AL: 'Montgomery', CO: 'Denver', RI: 'Providence' };
for (const code of ['AL', 'CO', 'RI'] as const) {
    const places = reference.places.filter(p => p.state === code && p.population !== null), ranked = [...places].sort((a, b) => b.population! - a.population! || placeId(a).localeCompare(placeId(b), 'en')), subjects = places.map(placeId);
    topPairs[code] = ranked.slice(0, 2).map(placeId);
    const derivation: NonNullable<FactRecord['derivation']> = { method: 'rank', inputFactIds: subjects.map(s => fid(s, 'place.population_estimate')), parameters: { subjectIds: subjects, inputMetricId: 'place.population_estimate', direction: 'descending', tieMethod: 'competition' }, codeVersion: ENGINE_VERSION };
    for (const p of ranked.slice(0, 4))
        fact(placeId(p), 'place.within_state_rank', 0, [], { kind: 'point_date', date: '2025-07-01' }, `incorporated-places-${code}-published-2025`, { derivation });
    fact(id(code), 'place.top_two', [], [], { kind: 'point_date', date: '2025-07-01' }, `incorporated-places-${code}-published-2025`, { derivation: { ...derivation, parameters: { ...derivation.parameters, output: 'top_k', k: 2 } } });
    fact(id(code), 'identity.capital', capitals[code], [{ sourceId: 'CEN-GUIDE-2010', section: `Supplied ${code} profile: capital` }]);
    fact(id(code), 'history.admission_date', ({ AL: '1819-12-14', CO: '1876-08-01', RI: '1790-05-29' })[code], [{ sourceId: 'CEN-GUIDE-2010', section: `Supplied ${code} profile: history` }]);
    fact(id(code), 'history.admission_order', ({ AL: 22, CO: 38, RI: 13 })[code], [{ sourceId: 'CEN-GUIDE-2010', section: `Supplied ${code} profile: admission order` }]);
    fact(id(code), 'climate.annual_precipitation_average', ({ AL: 55.4, CO: 18, RI: 46 })[code], [{ sourceId: 'NOAA-SCS-2022', section: `Supplied ${code} research fact` }], period(), UNIVERSE, { quality: { status: 'draft', notes: 'Report vintage 2022; averaging period not specified in supplied audit. No climate clue approved.' } });
}
for (const code of STATE_CODES)
    fact(id(code), 'place.audit_membership', reference.places.filter(p => p.state === code).map(placeId), ['01', '08', '44'].map(fips => ({ sourceId: `CEN-PEP-PLACE-V2025-${fips}`, section: 'Inverse membership for this closed set of place entities; containing state from row label' })));
const namedUnits = [
    { code: 'AL', name: 'Selma to Montgomery National Historic Trail', designation: 'National Historic Trail', relationship: 'trail_crosses' },
    { code: 'AL', name: 'Birmingham Civil Rights National Monument', designation: 'National Monument', relationship: 'inside' },
    { code: 'AL', name: 'Little River Canyon National Preserve', designation: 'National Preserve', relationship: 'inside' },
    { code: 'AL', name: 'Russell Cave National Monument', designation: 'National Monument', relationship: 'inside' },
    { code: 'RI', name: 'Touro Synagogue National Historic Site', designation: 'National Historic Site', relationship: 'inside' },
    { code: 'RI', name: 'Roger Williams National Memorial', designation: 'National Memorial', relationship: 'inside' },
    { code: 'RI', name: 'Blackstone River Valley National Historical Park', designation: 'National Historical Park', relationship: 'inside' },
] as const;
const parks: Dataset['parks'] = reference.formalParks.flatMap(p => p.states.filter(c => ['AL', 'CO', 'RI'].includes(c)).map(c => ({ associationId: `${c}:${p.id}`, stateId: id(c), npsUnitId: p.id, unitName: p.name, formalDesignation: 'National Park', isFormallyNationalPark: true, relationship: p.states.length > 1 ? 'partly_inside' as const : 'inside' as const, sourceRefs: [{ sourceId: 'NPS-SYSTEM-2026-09', section: 'National Parks (63)', rowKey: p.name }], snapshotId })));
for (const p of namedUnits)
    parks.push({ associationId: `${p.code}:${p.name}`, stateId: id(p.code), npsUnitId: p.name, unitName: p.name, formalDesignation: p.designation, isFormallyNationalPark: false, relationship: p.relationship, sourceRefs: [{ sourceId: 'NPS-STATE-2026', section: `Supplied ${p.code} example NPS units`, rowKey: p.name }], snapshotId });
for (const code of STATE_CODES)
    fact(id(code), 'nps.associated_unit', namedUnits.filter(p => p.code === code).map(p => p.name), [{ sourceId: 'NPS-STATE-2026', section: 'Closed set of named-unit entities in three audited profiles; no assertion about other NPS units' }]);
const derived = recomputeDerived(facts);
const boundaries: BoundaryRecord[] = [];
function addBoundary(a: StateCode, b: StateCode, topology: BoundaryRecord['topology'], medium: BoundaryRecord['medium']) {
    const [stateA, stateB] = [id(a), id(b)].sort(), ordinary = topology === 'segment' && medium !== 'lake_or_coastal_water';
    if (boundaries.some(r => r.stateA === stateA && r.stateB === stateB && r.topology === topology && r.medium === medium))
        return;
    boundaries.push({ boundaryId: `${stateA}:${stateB}:${topology}:${medium}`, stateA, stateB, topology, medium, clueBorderEligible: ordinary, borderHuntEdge: ordinary, sourceGeometryId: 'CEN-TIGER-2025', derivation: { method: 'spatial_intersection', toleranceMeters: 0, codeVersion: 'spec-audit-2026-08-30' }, reviewerNotes: 'Audited relation transcribed from specification. Intersection not rerun; zero tolerance denotes exact-topology convention, not a measured pipeline tolerance. Canonical coverage is limited to this audited subset.' });
}
for (const code of ['AL', 'CO', 'RI'] as const)
    for (const neighbor of STATE_BORDERS[code])
        if (!(code === 'CO' && neighbor === 'AZ'))
            addBoundary(code, neighbor, 'segment', 'land');
addBoundary('CO', 'AZ', 'point_contact', 'land');
addBoundary('NM', 'UT', 'point_contact', 'land');
addBoundary('RI', 'NY', 'segment', 'lake_or_coastal_water');
const assets: AssetRecord[] = [];
mkdirSync(resolve(base, 'stable/visuals'), { recursive: true });
for (const code of ['AL', 'CO', 'RI'] as const)
    for (const kind of ['silhouette', 'locator_map'] as const) {
        const shape = US_STATE_SHAPES.find(s => s.code === code)!;
        const content = kind === 'silhouette' ? `<path d="${shape.path}" fill="#163e32"/>` : US_STATE_SHAPES.map(s => `<path d="${s.path}" fill="${s.code === code ? '#163e32' : '#ecebe6'}" stroke="${s.code === code ? '#000' : '#888'}" stroke-width="${s.code === code ? '3' : '0.5'}"/>`).join('');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 975 610">${content}</svg>\n`, hash = sha(svg), filePath = `stable/visuals/${hash}.svg`;
        writeFileSync(resolve(base, filePath), svg);
        assets.push({ assetId: `asset-${hash.slice(0, 16)}`, kind, stateId: id(code), sourceGeometryId: 'CEN-ATLAS-3.0.1', projection: 'us-atlas Albers USA composite', simplificationTolerance: 0, viewBox: '0 0 975 610', filePath, sha256: hash, generatedAt: createdAt, transformVersion: 'existing-map-paths-1', accessibility: { preAnswerAlt: kind === 'silhouette' ? 'Mystery state shape' : 'Mystery state location', postAnswerAlt: `${reference.states[code].name} ${kind === 'silhouette' ? 'shape' : 'location'}` } });
    }
const stateRecords = (['AL', 'CO', 'RI'] as const).map(code => ({ stateId: id(code), name: reference.states[code].name, slug: reference.states[code].name.toLowerCase().replace(/ /g, '-'), postalCode: code, censusFips: reference.states[code].fips, censusRegion: ({ AL: 'South', CO: 'West', RI: 'Northeast' })[code], censusDivision: ({ AL: 'East South Central', CO: 'Mountain', RI: 'New England' })[code], mapAssetId: assets.find(a => a.stateId === id(code) && a.kind === 'locator_map')!.assetId, identitySourceRefs: [loc('CEN-PEP-STATE-V2025', reference.states[code].name, 'STATE,REGION,DIVISION'), { sourceId: 'USPS-PUB28-2024', section: 'Appendix B', rowKey: code }] }));
const between = (metricId: string, minInclusive: number, maxExclusive: number): Predicate => ({ metricId, op: 'between', minInclusive, maxExclusive });
const eq = (metricId: string, value: FactValue): Predicate => ({ metricId, op: 'eq', value });
const contains = (metricId: string, values: string[]): Predicate => ({ metricId, op: 'contains_all', values });
const pred: Record<string, Predicate> = {
    'al.park.formal-0': eq('nps.formal_national_park_count', 0), 'ri.park.formal-0': eq('nps.formal_national_park_count', 0), 'co.parks.formal-4': eq('nps.formal_national_park_count', 4),
    'al.industry.mfg-14-16': between('economy.industry_share_of_gdp.manufacturing', 14, 16), 'co.industry.pst-10-13': between('economy.industry_share_of_gdp.professional', 10, 13), 'ri.industry.edu-health-12-15': between('economy.industry_share_of_gdp.education_health', 12, 15),
    'al.gdp.300-400': between('economy.gdp_current_usd', 300e9, 400e9), 'co.gdp.500-650': between('economy.gdp_current_usd', 500e9, 650e9), 'ri.gdp.75-100': between('economy.gdp_current_usd', 75e9, 100e9),
    'al.population.5-6m': between('population.resident_estimate', 5e6, 6e6), 'co.population.5_5-6_5m': between('population.resident_estimate', 5.5e6, 6.5e6), 'ri.population.1-1_5m': between('population.resident_estimate', 1e6, 1.5e6),
    'al.area.rank-26-30': between('area.land_rank', 26, 31), 'co.area.rank-6-10': between('area.land_rank', 6, 11), 'ri.area.rank-46-50': between('area.land_rank', 46, 51),
    'al.highpoint.2000-2500': between('physical.highest_point', 2000, 2500), 'co.highpoint.14000-15000': between('physical.highest_point', 14000, 15000), 'ri.highpoint.under-1000': { metricId: 'physical.highest_point', op: 'lt', value: 1000 },
    'al.history.1810s': between('history.admission_year', 1810, 1820), 'co.history.1865-1880': between('history.admission_year', 1865, 1881), 'ri.history.13th': { all: [eq('history.admission_year', 1790), eq('history.admission_order', 13)] },
    'al.time.central-all': eq('time.standard_zone', ['Central']), 'co.time.mountain-all': eq('time.standard_zone', ['Mountain']), 'ri.time.eastern-all': eq('time.standard_zone', ['Eastern']),
    'al.landmark.selma-montgomery': contains('nps.associated_unit', ['Selma to Montgomery National Historic Trail']),
    'ri.landmark.touro-roger': contains('nps.associated_unit', ['Touro Synagogue National Historic Site', 'Roger Williams National Memorial']),
    'co.parks.named-pair': contains('nps.formal_unit_ids', ['black-canyon-of-the-gunnison-national-park', 'mesa-verde-national-park']),
    'co.point.arizona': { all: [contains('boundary.point_contacts', ['US-AZ']), eq('boundary.shared_segments', STATE_BORDERS.CO.filter(c => c !== 'AZ').map(id))] },
    'al.borders.segment-set': contains('boundary.shared_segments', ['US-FL', 'US-GA', 'US-MS', 'US-TN']),
    'co.borders.segment-set': contains('boundary.shared_segments', ['US-WY', 'US-NE', 'US-KS', 'US-OK', 'US-NM', 'US-UT']),
    'ri.borders.typed': { all: [contains('boundary.shared_segments', ['US-CT', 'US-MA']), contains('boundary.audited_water', ['US-NY'])] },
};
for (const code of ['AL', 'CO', 'RI'] as const) {
    const prefix = code.toLowerCase();
    pred[`${prefix}.cities.top2-2025`] = { all: [contains('place.audit_membership', topPairs[code]!), contains('place.top_two', topPairs[code]!)] };
    const capitalPlace = reference.places.find(p => p.state === code && p.name.startsWith(capitals[code] + ' city,'))!;
    pred[`${prefix}.capital.${capitals[code].toLowerCase()}`] = { all: [contains('place.audit_membership', [placeId(capitalPlace)]), eq('identity.capital', capitals[code])] };
    for (const suffix of ['postal', 'silhouette', 'locator'])
        pred[`${prefix}.${suffix}`] = eq('identity.postal_code', code);
}
const issues: unknown[] = [];
const clues: ClueRecord[] = audit.clues.map(row => {
    const predicate = pred[row.clueId];
    if (!predicate)
        throw new Error(`Unmapped predicate ${row.clueId}`);
    const selectedMetrics = predicateMetrics(predicate), factRefs = selectedMetrics.map(m => fid(row.answerStateId, m));
    const fresh = candidates(predicate, universe, derived, snapshotId), approved = fresh.complete && fresh.stateIds.length === row.expectedCount;
    if (!approved)
        issues.push({ clueId: row.clueId, expectedCount: row.expectedCount, knownMatches: fresh.stateIds, unknownStateIds: fresh.unknownStateIds, action: 'Draft; do not claim full candidate evaluation.' });
    const category = row.category, visual = ['silhouette', 'map_position'].includes(category), direct = ['abbreviation', 'silhouette', 'map_position'].includes(category), dynamic = selectedMetrics.some(m => metricMap.get(m)?.timeSensitive);
    let text = row.text.replace(/\*\*/g, '').replace(/\*\(/g, '(').replace(/\)\*/g, ')').replace('NPS snapshot: July 2026', 'NPS snapshot: September 5, 2026');
    if (category === 'time_zone')
        text += ' (49 CFR snapshot: August 30, 2026)';
    if (row.clueId === 'co.parks.named-pair')
        text += ' (NPS snapshot: September 5, 2026)';
    const baseTier = fresh.stateIds.length > 20 ? 5 : fresh.stateIds.length > 10 ? 4 : fresh.stateIds.length > 4 ? 3 : fresh.stateIds.length > 1 ? 2 : 1, adjustment = row.tier - baseTier;
    const prior = adjustment <= -1 ? 'iconic' : adjustment === 0 ? 'general' : adjustment === 1 ? 'specialized' : 'obscure';
    return { clueId: row.clueId, answerStateId: row.answerStateId, category,
        render: visual ? { kind: category === 'silhouette' ? 'image' : 'map', assetId: assets.find(a => a.stateId === row.answerStateId && a.kind === (category === 'silhouette' ? 'silhouette' : 'locator_map'))!.assetId } : { kind: 'text', text: { en: text } },
        factRefs, predicate, candidateSet: { snapshotId, stateIds: fresh.stateIds as StateId[], count: fresh.stateIds.length, computedAt: createdAt, evaluatorVersion: ENGINE_VERSION },
        difficulty: { seedTier: row.tier, knowledgePrior: prior, directness: direct ? 'direct_identifier' : ['capital', 'cities', 'landmark'].includes(category) ? 'named_association' : fresh.stateIds.length === 1 ? 'one_to_one' : 'indirect', calibrationStatus: 'editorial_seed' },
        ladderPolicy: { earliestRung: row.earliest, latestRung: row.latest, dependencyGroup: `${row.answerStateId}:${category}:2025`, ...(row.clueId === 'co.parks.formal-4' ? { incompatibleClueIds: ['co.parks.named-pair'] } : row.clueId === 'co.parks.named-pair' ? { incompatibleClueIds: ['co.parks.formal-4'] } : {}) },
        freshness: { class: dynamic ? category === 'time_zone' ? 'regulatory' : category === 'parks' || row.clueId === 'co.parks.named-pair' ? 'event_driven' : 'annual' : 'static', referenceLabelRequired: dynamic },
        review: { status: approved ? 'approved' : 'draft', evidenceChecked: approved, wordingChecked: true, fairnessChecked: true, notes: approved ? 'Supplied audited wording/tier/windows retained, candidate evaluation crosschecked. Prior and dependency group are editorial implementation metadata where the specimen omitted them.' : 'Nationwide evaluation incomplete; candidateSet lists known true states only. Original expected count remains in audited-examples.json.' } };
});
for (const [m, unit, cats] of [['economy.gdp_real_chained_usd', 'chained_USD', ['economy']], ['economy.industry_value_added_current_usd', 'USD', ['industry']], ['economy.industry_share_of_gdp', 'percent', ['industry']], ['transport.rail_line_miles', 'miles', ['transportation']], ['transport.interstate_miles', 'miles', ['transportation']]] as const)
    metric(m, 'number', unit, true, [...cats], `Reserved metric: ${m}; no invented observations.`);
const tables: ReferenceTable[] = [...new Set(derived.map(f => f.metricId))].map(metricId => {
    const records = derived.filter(f => f.metricId === metricId && universe.includes(f.subjectId as StateId));
    return { tableId: `${snapshotId}:${metricId}`, metricId, snapshotId, subjectIds: records.map(f => f.subjectId), universe: UNIVERSE, complete: records.length === 50 && records.every(f => f.value !== null && f.quality.status === 'verified'), factIds: records.map(f => f.factId) };
});
mkdirSync(resolve(base, 'clues', clueSetVersion), { recursive: true });
for (const code of ['AL', 'CO', 'RI'] as const)
    write(`clues/${clueSetVersion}/US-${code}.json`, clues.filter(c => c.answerStateId === id(code)));
write('stable/universe.json', STATES.map(s => ({ stateId: id(s.code), name: s.name, postalCode: s.code, censusFips: reference.states[s.code].fips })));
write('stable/states.json', stateRecords);
write('stable/assets.json', assets);
write('stable/boundaries.json', boundaries);
write('catalog/sources.json', sources);
write('catalog/metrics.json', [...metricMap.values()]);
write('catalog/snapshots.json', [{ snapshotId, createdAt, clueSetVersion, validatorVersion: ENGINE_VERSION, sourceFiles, contextFile: `${dir}/context.json` }]);
for (const category of [...new Set(derived.map(f => f.metricId.split('.')[0]))])
    write(`${dir}/${category}.facts.json`, derived.filter(f => f.metricId.startsWith(category + '.')));
write(`${dir}/parks.json`, parks);
write(`${dir}/reference-tables.json`, tables);
write('ladders/assembly-rules.json', { length: 10, allowedDependencyGroups: [], prohibitedDuplicateCategories: ['abbreviation', 'silhouette', 'map_position', 'population', 'area', 'cities', 'capital', 'borders', 'economy', 'industry', 'parks', 'history', 'time_zone', 'physical_geography', 'landmark'], preferredEarlyCounts: [[8, 30], [3, 15], [2, 8], [1, 5]] });
write('review/review-log.json', { snapshotId, issues, notes: [
        'NPS reference date explicitly updated to actual September 5 retrieval; original July wording retained in audited-examples.json.',
        'Alabama 2025 top incorporated places: Huntsville, Mobile, Birmingham, Montgomery.',
        'Census HTML RI area is rounded to 1,034 sq mi; original audit has 1,033.8. Both rank 50. No invented decimal precision.',
        'Climate remains draft: the supplied audit does not identify a verified averaging period.',
        'Suppressed source observations remain null with suppression codes; no imputation.',
        'Two direct clues at the end is a soft preference: RI specimen explicitly ends capital plus locator.',
        'Canonical boundary subset prepares the supplied audit; this milestone does not claim to have rerun legal GIS intersections.',
    ] });
write('review/rejected-clues.json', [
    { text: 'Birmingham is the largest city.', reason: 'Stale/undefined: Huntsville is the largest incorporated place in 2025.' },
    { text: 'Alabama has nine national parks.', reason: 'NPS-associated units are not formally designated National Parks.' },
    { text: 'Ranks 46th in economy according to the latest survey.', reason: 'Missing metric, universe, source, reference year.' },
]);
console.log(`Built ${stateRecords.length} researched states, ${derived.length} facts, ${clues.filter(c => c.review.status === 'approved').length} approved clues; ${issues.length} review issue(s).`);
write(`${dir}/context.json`, { universe, states: stateRecords, sources, metrics: [...metricMap.values()], boundaries, parks, assets, rules: read('ladders/assembly-rules.json') });
