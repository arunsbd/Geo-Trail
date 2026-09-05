import { createHash } from 'node:crypto';
import type { Dataset } from './dataset';
function canonical(value: unknown): string {
    if (value === null || typeof value !== 'object')
        return JSON.stringify(value);
    if (Array.isArray(value))
        return `[${value.map(canonical).join(',')}]`;
    return `{${Object.entries(value).sort(([a], [b]) => a < b ? -1 : 1).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
}
export function contentDigest(data: Dataset): string {
    const normalized = { ...data };
    for (const key of ['states', 'sources', 'metrics', 'facts', 'referenceTables', 'boundaries', 'parks', 'assets', 'clues'] as const) {
        Object.assign(normalized, { [key]: [...data[key]].map(record => ({ record, key: canonical(record) })).sort((a, b) => a.key < b.key ? -1 : 1).map(entry => entry.record) });
    }
    return createHash('sha256').update(canonical(normalized)).digest('hex');
}
