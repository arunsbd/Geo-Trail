import { loadDataset } from '../../lib/clue-ladder/load';
export const snapshotId = 'us-states-2026-09-05-v1';
export const dataset = loadDataset(snapshotId);
export const fresh = () => structuredClone(dataset);
export const clue = (id: string) => structuredClone(dataset.clues.find(c => c.clueId === id)!);
export const fact = (subject: string, metric: string) => dataset.facts.find(f => f.subjectId === subject && f.metricId === metric)!;
