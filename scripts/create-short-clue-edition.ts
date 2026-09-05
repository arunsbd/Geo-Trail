import { loadDataset } from '../lib/clue-ladder/load';
import { validateDataset } from '../lib/clue-ladder/validate';
import { compileLadder, publishManifest } from '../lib/clue-ladder/compile';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import type { Dataset } from '../lib/clue-ladder/dataset';
const oldId = 'us-states-2026-09-05-v1', newId = 'us-states-2026-09-05-v2';
const base = 'data/clue-ladder';
if (existsSync(`${base}/snapshots/${newId}`)) throw new Error('Edition already exists; create a new version instead of overwriting.');
const original = loadDataset(oldId);
const data: Dataset = JSON.parse(JSON.stringify(original), (_key, value) =>
    typeof value === 'string' && (value === oldId || value.startsWith(oldId + ':')) ? value.replace(oldId, newId) : value);
data.snapshot.snapshotId = newId;
data.snapshot.contextFile = `snapshots/${newId}/context.json`;
data.snapshot.clueSetVersion = 'short-seven-v1';
data.rules.profile = 'short-seven-v1';
data.rules.length = 7;
const editions: Record<string, [string, string][]> = {
 'US-AL': [
 ['al.population.5-6m', 'About 5–6 million people lived here in 2025.'],
 ['al.history.1810s', 'It became a state in the 1810s.'],
 ['al.highpoint.2000-2500', 'Its highest point is 2,000–2,500 feet above sea level.'],
 ['al.time.central-all', 'The whole state uses Central Time. (2026 time-zone rules)'],
 ['al.borders.segment-set', 'It borders Florida, Georgia, Mississippi, and Tennessee.'],
 ['al.cities.top2-2025', 'Huntsville and Mobile were its two biggest cities in 2025 (incorporated places).'],
 ['al.silhouette', 'Which state has this shape?']],
 'US-CO': [
 ['co.population.5_5-6_5m', 'About 5.5–6.5 million people lived here in 2025.'],
 ['co.area.rank-6-10', 'It ranks 6th–10th among states by land area. (2010 Census)'],
 ['co.highpoint.14000-15000', 'Its highest point is 14,000–15,000 feet above sea level.'],
 ['co.time.mountain-all', 'The whole state uses Mountain Time. (2026 time-zone rules)'],
 ['co.parks.formal-4', 'It has four National Parks. (NPS, September 2026)'],
 ['co.cities.top2-2025', 'Denver and Colorado Springs were its two biggest cities in 2025 (incorporated places).'],
 ['co.silhouette', 'Which state has this shape?']],
 'US-RI': [
 ['ri.population.1-1_5m', 'About 1–1.5 million people lived here in 2025.'],
 ['ri.highpoint.under-1000', 'Its highest point is less than 1,000 feet above sea level.'],
 ['ri.time.eastern-all', 'The whole state uses Eastern Time. (2026 time-zone rules)'],
 ['ri.history.13th', 'It was the 13th state to join the Union.'],
 ['ri.borders.typed', 'It borders Connecticut and Massachusetts on land, and has a water boundary with New York.'],
 ['ri.capital.providence', 'Its capital is Providence.'],
 ['ri.silhouette', 'Which state has this shape?']]
};
for (const clue of data.clues) {
 const row = editions[clue.answerStateId]?.findIndex(([id]) => id === clue.clueId) ?? -1;
 if (row < 0) { clue.review.status = 'retired'; continue; }
 if (clue.review.status !== 'approved') throw new Error('Cannot promote unaudited clue');
 clue.render.text = { en: editions[clue.answerStateId][row][1] };
 clue.ladderPolicy.earliestRung = row + 1;
 clue.ladderPolicy.latestRung = row + 1;
 clue.review.notes += ' Simplified wording and seven-round window reviewed for the user-requested short edition; predicate and evidence unchanged.';
}
const errors = validateDataset(data, true).filter(d => d.severity === 'error');
if (errors.length) throw new Error(JSON.stringify(errors));
const save = (path: string, value: unknown) => writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
mkdirSync(`${base}/snapshots/${newId}`, {recursive:true});
mkdirSync(`${base}/clues/short-seven-v1`, {recursive:true});
const {snapshot, facts, referenceTables, clues, ...context} = data;
save(`${base}/${snapshot.contextFile}`, context);
save(`${base}/snapshots/${newId}/normalized.facts.json`, facts);
save(`${base}/snapshots/${newId}/reference-tables.json`, referenceTables);
for (const state of data.states) save(`${base}/clues/short-seven-v1/${state.stateId}.json`, clues.filter(c => c.answerStateId === state.stateId));
const registry = JSON.parse(readFileSync(`${base}/catalog/snapshots.json`, 'utf8'));
save(`${base}/catalog/snapshots.json`, [...registry, snapshot]);
for (const state of data.states) {
 const manifest = compileLadder(data, state.stateId, 'short-seven-v1');
 publishManifest(`${base}/ladders/manifests/${manifest.puzzleId}.json`, manifest, data);
}
console.log('Published three seven-clue manifests with 21 approved clues.');
