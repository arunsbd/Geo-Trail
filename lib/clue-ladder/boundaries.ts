import type { BoundaryRecord, StateId } from './types';
export type BoundaryPolicy = {
    includePointContacts: boolean;
    includeWaterOnly: boolean;
};
export const DEFAULT_BOUNDARY_POLICY: BoundaryPolicy = { includePointContacts: false, includeWaterOnly: false };
export const LEGACY_BORDER_HUNT_POLICY: BoundaryPolicy = { includePointContacts: true, includeWaterOnly: false };
/** One undirected canonical record creates both directions by construction. */
export function boundaryGraph(universe: readonly StateId[], records: readonly BoundaryRecord[], policy = DEFAULT_BOUNDARY_POLICY) {
    const graph = Object.fromEntries(universe.map(id => [id, [] as StateId[]]));
    for (const b of records) {
        if (b.topology === 'point_contact' && !policy.includePointContacts)
            continue;
        if (b.medium === 'lake_or_coastal_water' && !policy.includeWaterOnly)
            continue;
        if (!graph[b.stateA] || !graph[b.stateB])
            throw new Error(`Unknown boundary endpoint: ${b.boundaryId}`);
        graph[b.stateA].push(b.stateB);
        graph[b.stateB].push(b.stateA);
    }
    for (const id of universe)
        graph[id] = [...new Set(graph[id])].sort();
    return graph;
}
