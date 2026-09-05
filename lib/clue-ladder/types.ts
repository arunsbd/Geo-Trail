export type StateId = `US-${StateCode}`;
export type SourceId = string;
export type FactId = string;
export type ClueId = string;
export type AssetId = string;
export type StateRecord = {
    stateId: StateId; // "US-AL"
    name: string; // "Alabama"
    slug: string; // "alabama"
    postalCode: string; // "AL"
    censusFips: string; // "01"
    censusRegion: string; // "South"
    censusDivision: string; // "East South Central"
    mapAssetId: AssetId;
    identitySourceRefs: SourceLocator[];
};
export type SourceRecord = {
    sourceId: SourceId;
    publisher: string;
    title: string;
    landingPageUrl: string;
    downloadUrl?: string;
    datasetId?: string; // e.g. "NST-EST2025-POP"
    tableId?: string; // e.g. "SAGDP1"
    editionOrVintage?: string; // e.g. "Vintage 2025"
    releaseDate?: string; // ISO date
    retrievedAt: string; // ISO timestamp
    coverage: {
        referenceDate?: string;
        startDate?: string;
        endDate?: string;
        boundaryDate?: string;
    };
    authorityTier: 1 | 2 | 3;
    updateClass: "static" | "annual" | "quarterly" | "regulatory" | "event_driven";
    mimeType?: string;
    sha256?: string; // required for downloaded source files
    notes?: string;
};
export type SourceLocator = {
    sourceId: SourceId;
    sheet?: string;
    table?: string;
    rowKey?: string;
    column?: string;
    variableCode?: string;
    page?: number;
    section?: string;
    featureId?: string;
};
export type MetricDefinition = {
    metricId: string; // "population.resident_estimate"
    label: string;
    definition: string;
    valueType: "number" | "string" | "boolean" | "date" | "id_list" | "object";
    unit?: string;
    defaultUniverse?: string;
    preferredPublisher: string;
    timeSensitive: boolean;
    rankable: boolean;
    rankDirection?: "ascending" | "descending";
    allowedClueCategories: ClueCategory[];
    wordingRequirements?: string[];
};
export type FactValue = null | number | string | boolean | string[] | Record<string, unknown>;
export type FactRecord = {
    suppressionCode?: string; // Section 7.3: preserve suppressed observations without imputation.
    factId: FactId;
    subjectId: StateId | string; // state, place, park, or other entity ID
    metricId: string;
    value: FactValue;
    unit?: string;
    referencePeriod: {
        kind: "static" | "point_date" | "calendar_year" | "range" | "legal_effective";
        date?: string;
        year?: number;
        startDate?: string;
        endDate?: string;
    };
    universe?: string;
    sourceRefs: SourceLocator[];
    derivation?: {
        method: "rank" | "ratio" | "range_bucket" | "count" | "spatial_relation" | "manual_transcription";
        inputFactIds: FactId[];
        parameters: Record<string, unknown>;
        codeVersion: string;
    };
    snapshotId: string;
    quality: {
        status: "draft" | "verified" | "rejected" | "superseded";
        verifiedAt?: string;
        verificationMethod?: "second_reviewer" | "automated_crosscheck" | "both";
        notes?: string;
    };
};
export type BoundaryRecord = {
    boundaryId: string;
    stateA: StateId;
    stateB: StateId;
    topology: "segment" | "point_contact";
    medium: "land" | "river" | "lake_or_coastal_water";
    clueBorderEligible: boolean;
    borderHuntEdge: boolean;
    sourceGeometryId: SourceId;
    derivation: {
        method: "spatial_intersection";
        toleranceMeters: number;
        codeVersion: string;
    };
    reviewerNotes?: string;
};
export type ParkAssociation = {
    associationId: string;
    stateId: StateId;
    npsUnitId: string;
    unitName: string;
    formalDesignation: string;
    isFormallyNationalPark: boolean;
    relationship: "inside" | "partly_inside" | "trail_crosses" | "administrative_association";
    sourceRefs: SourceLocator[];
    snapshotId: string;
};
export type AssetRecord = {
    assetId: AssetId;
    kind: "silhouette" | "locator_map";
    stateId: StateId;
    sourceGeometryId: SourceId;
    projection: string;
    simplificationTolerance: number;
    viewBox: string;
    filePath: string;
    sha256: string;
    generatedAt: string;
    transformVersion: string;
    accessibility: {
        preAnswerAlt: "Mystery state shape" | "Mystery state location";
        postAnswerAlt: string;
    };
};
export type ClueCategory = "population" | "area" | "cities" | "capital" | "borders" | "economy" | "industry" | "transportation" | "parks" | "physical_geography" | "climate" | "landmark" | "history" | "time_zone" | "abbreviation" | "silhouette" | "map_position";
export type Predicate = {
    metricId: string;
    op: "eq" | "lt" | "lte" | "gt" | "gte";
    value: FactValue;
} | {
    metricId: string;
    op: "between";
    minInclusive: number;
    maxExclusive: number;
} | {
    metricId: string;
    op: "contains_all";
    values: string[];
} | {
    all: Predicate[];
} | {
    any: Predicate[];
};
export type ClueRecord = {
    clueId: ClueId;
    answerStateId: StateId;
    category: ClueCategory;
    render: {
        kind: "text" | "image" | "map";
        text?: {
            en: string;
        };
        assetId?: AssetId;
    };
    factRefs: FactId[];
    predicate: Predicate;
    candidateSet: {
        snapshotId: string;
        stateIds: StateId[];
        count: number;
        computedAt: string;
        evaluatorVersion: string;
    };
    difficulty: {
        seedTier: 1 | 2 | 3 | 4 | 5; // 1 giveaway; 5 very hard
        knowledgePrior: "iconic" | "general" | "specialized" | "obscure";
        directness: "indirect" | "named_association" | "one_to_one" | "direct_identifier";
        calibrationStatus: "editorial_seed" | "playtest_calibrated";
        standaloneSolveRate?: number;
        sampleSize?: number;
    };
    ladderPolicy: {
        earliestRung: number;
        latestRung: number;
        dependencyGroup: string;
        incompatibleClueIds?: ClueId[];
        requiresEarlierCategory?: ClueCategory;
    };
    freshness: {
        class: "static" | "annual" | "regulatory" | "event_driven";
        referenceLabelRequired: boolean;
        reviewBy?: string;
    };
    review: {
        status: "draft" | "approved" | "rejected" | "retired";
        evidenceChecked: boolean;
        wordingChecked: boolean;
        fairnessChecked: boolean;
        notes?: string;
    };
};
export type PuzzleManifest = {
    dataContentSha256: string; // Integrity of the exact inputs used by this manifest.
    puzzleId: string;
    mode: "clue_ladder";
    date?: string;
    answerStateId: StateId;
    orderedClueIds: ClueId[];
    dataSnapshotId: string;
    clueSetVersion: string;
    scoring: {
        maxByRung: number[]; // [1000, 900, ... 100]
        wrongGuessPenalty: number; // e.g. 50
    };
    seed?: string;
    generatedAt: string;
    validatorVersion: string;
};
import type { StateCode } from '../../data/states';
