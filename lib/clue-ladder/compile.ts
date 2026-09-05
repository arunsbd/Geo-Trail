import { createHash } from 'node:crypto';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { contentDigest } from './integrity';
import { DataError, ENGINE_VERSION, type Dataset } from './dataset';
import type { ClueRecord, PuzzleManifest, StateId } from './types';
import { validateDataset, validateLadder, validateManifest, minimumRung } from './validate';
export function cumulativeCandidates(clues: readonly ClueRecord[], universe: readonly StateId[]): number[] {
    let remaining = new Set(universe);
    return clues.map(c => { remaining = new Set([...remaining].filter(id => c.candidateSet.stateIds.includes(id))); return remaining.size; });
}
function freeze<T>(value: T): T {
    if (value && typeof value === 'object') {
        for (const child of Object.values(value))
            freeze(child);
        Object.freeze(value);
    }
    return value;
}
export function compileLadder(data: Dataset, answerStateId: StateId, seed: string, options: {
    length?: number;
    generatedAt?: string;
} = {}): Readonly<PuzzleManifest> {
    const diagnostics = validateDataset(data);
    const errors = diagnostics.filter(d => d.severity === 'error');
    if (errors.length)
        throw new DataError('DATASET_INVALID', errors.map(e => `${e.path}: ${e.message}`).join('\n'));
    if (!seed.trim())
        throw new DataError('SEED', 'A nonempty reproducible seed is required');
    const length = options.length ?? data.rules.length;
    if (!Number.isInteger(length) || (data.rules.profile === 'short-seven-v1' ? length !== 7 : (length < 8 || length > 10)))
        throw new DataError('LADDER_LENGTH', 'Length must be 8–10');
    const pool = data.clues.filter(c => c.answerStateId === answerStateId && c.review.status === 'approved').sort((a, b) => a.clueId < b.clueId ? -1 : 1);
    if (pool.length < (data.rules.profile === 'short-seven-v1' ? 7 : 14) || new Set(pool.map(c => c.category)).size < (data.rules.profile === 'short-seven-v1' ? 7 : 8))
        throw new DataError('POOL_NOT_PUBLISHABLE', `${answerStateId}: requires 14 approved clues in 8 categories; found ${pool.length}`);
    const tie = (c: ClueRecord) => createHash('sha256').update(`${seed}\0${c.clueId}`).digest('hex');
    const canPlace = (c: ClueRecord, selected: ClueRecord[]) => {
        const rung = selected.length + 1, p = c.ladderPolicy;
        if (rung < Math.max(p.earliestRung, minimumRung(c, data)) || rung > p.latestRung || selected.some(o => o.clueId === c.clueId))
            return false;
        if (p.requiresEarlierCategory && !selected.some(o => o.category === p.requiresEarlierCategory))
            return false;
        for (const [j, o] of selected.entries()) {
            if (o.ladderPolicy.dependencyGroup === p.dependencyGroup && !data.rules.allowedDependencyGroups.includes(p.dependencyGroup))
                return false;
            if (p.incompatibleClueIds?.includes(o.clueId) || o.ladderPolicy.incompatibleClueIds?.includes(c.clueId))
                return false;
            if (c.category === o.category && (rung <= 8 || data.rules.prohibitedDuplicateCategories.includes(c.category)))
                return false;
            if (['US-CO', 'US-RI'].includes(answerStateId) && new Set([c.category, o.category]).size === 2 && [c.category, o.category].every(k => ['cities', 'capital'].includes(k)) && !(rung > length - 2 && j + 1 > length - 2))
                return false;
        }
        if (rung < 6 && c.difficulty.directness === 'named_association' && c.candidateSet.count === 1 && selected.some(o => o.difficulty.directness === 'named_association' && o.candidateSet.count === 1))
            return false;
        return true;
    };
    const search = (selected: ClueRecord[]): ClueRecord[] | undefined => {
        if (selected.length === length)
            return validateLadder(selected, data).length === 0 && (length < 9 || selected.some(c => ['silhouette', 'map_position'].includes(c.category))) ? selected : undefined;
        const index = selected.length;
        const ideal = [5, 4, 4, 3, 3, 3, 2, 2, 1, 1][index];
        const penalty = (c: ClueRecord) => {
            const tier = Math.abs(c.difficulty.seedTier - ideal) * 10;
            const count = cumulativeCandidates([...selected, c], data.universe).at(-1)!;
            const target = data.rules.preferredEarlyCounts[index];
            const fairness = target ? (count < target[0] ? target[0] - count : count > target[1] ? count - target[1] : 0) : 0;
            return tier + fairness;
        };
        const choices = pool.filter(c => canPlace(c, selected)).sort((a, b) => penalty(a) - penalty(b) || (tie(a) < tie(b) ? -1 : 1));
        for (const clue of choices) {
            const result = search([...selected, clue]);
            if (result)
                return result;
        }
    };
    const ladder = search([]);
    if (!ladder)
        throw new DataError('NO_VALID_LADDER', `${answerStateId}: no ${length}-rung solution for approved pool, dependency groups, diversity, and windows`);
    const payload: Omit<PuzzleManifest, 'puzzleId'> = {
        dataContentSha256: contentDigest(data), mode: 'clue_ladder', answerStateId, orderedClueIds: ladder.map(c => c.clueId), dataSnapshotId: data.snapshot.snapshotId,
        clueSetVersion: data.snapshot.clueSetVersion, scoring: { maxByRung: ladder.map((_, i) => 1000 - i * 100), wrongGuessPenalty: 50 },
        seed, generatedAt: options.generatedAt ?? data.snapshot.createdAt, validatorVersion: ENGINE_VERSION,
    };
    const manifest: PuzzleManifest = { puzzleId: `cl-${createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 24)}`, ...payload };
    const invalid = validateManifest(manifest, data);
    if (invalid.length)
        throw new DataError('MANIFEST_INVALID', JSON.stringify(invalid));
    return freeze(manifest);
}
/** Exclusive creation. Same bytes may be re-published; existing puzzles cannot be overwritten. */
export function publishManifest(path: string, manifest: PuzzleManifest, data: Dataset) {
    const errors = [...validateDataset(data, true), ...validateManifest(manifest, data)].filter(d => d.severity === 'error');
    if (errors.length)
        throw new DataError('PUBLISH_INVALID', JSON.stringify(errors));
    const text = JSON.stringify(manifest, null, 2) + '\n';
    if (existsSync(path)) {
        if (!isDeepStrictEqual(JSON.parse(readFileSync(path, 'utf8')), manifest))
            throw new DataError('MANIFEST_IMMUTABLE', `Refusing to overwrite ${path}`);
        return;
    }
    writeFileSync(path, text, { flag: 'wx' });
}
