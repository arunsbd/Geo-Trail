import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Dataset, Diagnostic } from './dataset';
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validators = new Map<string, ReturnType<typeof ajv.compile>>();
export function validateSchema(name: string, value: unknown): Diagnostic[] {
    let check = validators.get(name);
    if (!check) {
        check = ajv.compile(JSON.parse(readFileSync(resolve('data/clue-ladder/schema', `${name}.schema.json`), 'utf8')));
        validators.set(name, check);
    }
    if (check(value))
        return [];
    return (check.errors ?? []).map(e => ({ severity: 'error', code: 'SCHEMA', path: `${name}${e.instancePath}`, message: `${e.message} ${JSON.stringify(e.params)}` }));
}
export function loadDataset(snapshotId: string): Dataset {
    if (!/^us-states-\d{4}-\d{2}-\d{2}-v\d+$/.test(snapshotId))
        throw new Error(`Snapshot must be an explicit version: ${snapshotId}`);
    const base = resolve('data/clue-ladder');
    const read = (file: string) => JSON.parse(readFileSync(resolve(base, file), 'utf8'));
    const snapshot = read('catalog/snapshots.json').find((s: {
        snapshotId: string;
    }) => s.snapshotId === snapshotId);
    if (!snapshot)
        throw new Error(`Unregistered snapshot: ${snapshotId}`);
    const context = read(snapshot.contextFile);
    return {
        ...context, snapshot,
        facts: readdirSync(resolve(base, 'snapshots', snapshotId)).filter(f => f.endsWith('.facts.json')).sort().flatMap(f => read(`snapshots/${snapshotId}/${f}`)),
        referenceTables: read(`snapshots/${snapshotId}/reference-tables.json`),
        clues: readdirSync(resolve(base, 'clues', snapshot.clueSetVersion)).filter(f => f.endsWith('.json')).sort().flatMap(f => read(`clues/${snapshot.clueSetVersion}/${f}`)),
    };
}
