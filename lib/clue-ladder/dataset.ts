import type { AssetRecord, BoundaryRecord, ClueRecord, FactRecord, MetricDefinition, ParkAssociation, SourceRecord, StateId, StateRecord } from './types';
/** Coverage describes evidence, never presumed negative values for unresearched states. */
export type ReferenceTable = {
    tableId: string;
    metricId: string;
    snapshotId: string;
    subjectIds: string[];
    universe: string;
    complete: boolean;
    factIds: string[];
};
export type SnapshotRecord = {
    snapshotId: string;
    contextFile: string;
    createdAt: string;
    clueSetVersion: string;
    validatorVersion: string;
    sourceFiles: {
        sourceId: string;
        path: string;
        sha256: string;
    }[];
};
export type AssemblyRules = {
    profile?: 'short-seven-v1';
    length: number;
    allowedDependencyGroups: string[];
    prohibitedDuplicateCategories: string[];
    preferredEarlyCounts: [
        number,
        number
    ][];
};
export type Dataset = {
    snapshot: SnapshotRecord;
    universe: StateId[];
    states: StateRecord[];
    sources: SourceRecord[];
    metrics: MetricDefinition[];
    facts: FactRecord[];
    referenceTables: ReferenceTable[];
    boundaries: BoundaryRecord[];
    parks: ParkAssociation[];
    assets: AssetRecord[];
    clues: ClueRecord[];
    rules: AssemblyRules;
};
export type Diagnostic = {
    severity: 'error' | 'warning';
    code: string;
    path: string;
    message: string;
};
export const ENGINE_VERSION = 'clue-ladder-1';
export const UNIVERSE = 'us-50-states';
export class DataError extends Error {
    constructor(public code: string, message: string) { super(`${code}: ${message}`); }
}
