import { readFileSync, readdirSync } from 'node:fs';
import { loadDataset } from './load';
import { validateDataset, validateManifest } from './validate';
import type { PuzzleManifest } from './types';
import type { PlayablePuzzle } from './play';
import { findState } from '../../data/states';
export function loadPlayablePuzzles(): PlayablePuzzle[] {
 const data = loadDataset('us-states-2026-09-05-v2');
 const errors = validateDataset(data, true).filter(d => d.severity === 'error');
 if (errors.length) throw new Error(JSON.stringify(errors));
 const directory = 'data/clue-ladder/ladders/manifests';
 const manifests: PuzzleManifest[] = readdirSync(directory).sort().map(f => JSON.parse(readFileSync(directory + '/' + f, 'utf8'))).filter(m => m.dataSnapshotId === data.snapshot.snapshotId);
 if (manifests.length !== 3 || new Set(manifests.map(m => m.answerStateId)).size !== 3) throw new Error('Expected three distinct playtest puzzles');
 return manifests.map(manifest => {
  const invalid = validateManifest(manifest, data);
  if (invalid.length) throw new Error(JSON.stringify(invalid));
  const state = findState(manifest.answerStateId.slice(3))!;
  return {id: manifest.puzzleId, answer: state.code, name: state.name, maxByRung: manifest.scoring.maxByRung, wrongGuessPenalty: manifest.scoring.wrongGuessPenalty,
   clues: manifest.orderedClueIds.map(id => {
    const clue = data.clues.find(c => c.clueId === id)!;
    let image: string | undefined;
    if (clue.render.assetId) {
     const asset = data.assets.find(a => a.assetId === clue.render.assetId)!;
     let svg = readFileSync('data/clue-ladder/' + asset.filePath, 'utf8');
     // Fit the existing audited polygon to the card; coordinates and shape stay unchanged.
     const d = / d="([^"]+)"/.exec(svg)![1];
     if (/[a-kno-y]/i.test(d)) throw new Error('Unsupported silhouette path command');
     const pairs = [...d.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)];
     const xs = pairs.map(p => Number(p[1])), ys = pairs.map(p => Number(p[2]));
     const x = Math.min(...xs), y = Math.min(...ys), w = Math.max(...xs) - x, h = Math.max(...ys) - y;
     const pad = Math.max(w, h) * .08;
     svg = svg.replace(/viewBox="[^"]+"/, `viewBox="${x-pad} ${y-pad} ${w+2*pad} ${h+2*pad}"`);
     image = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
    }
    return {text: clue.render.text?.en ?? 'Which state has this shape?', ...(image ? {image} : {})};
   })};
 });
}
