import adjacency from "./adjacency.generated.json";

export const EUROPE_COUNTRY_CODES = [
  "ALB", "AND", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CZE", "DNK",
  "EST", "FIN", "FRA", "DEU", "GRC", "VAT", "HUN", "ISL", "IRL", "ITA",
  "LVA", "LIE", "LTU", "LUX", "MLT", "MDA", "MCO", "MNE", "NLD", "MKD",
  "NOR", "POL", "PRT", "ROU", "RUS", "SMR", "SRB", "SVK", "SVN", "ESP",
  "SWE", "CHE", "UKR", "GBR",
] as const;

export type EuropeCountryCode = (typeof EUROPE_COUNTRY_CODES)[number];

export const EUROPE_LAND_BORDERS = adjacency.neighbors as Readonly<
  Record<EuropeCountryCode, readonly EuropeCountryCode[]>
>;

export const EUROPE_ADJACENCY_PROVENANCE = {
  datasetVersion: adjacency.datasetVersion,
  sourceSha256: adjacency.sourceSha256,
  method: adjacency.method,
  candidateEdges: adjacency.candidateEdges,
  policyRejectedEdges: adjacency.policyRejectedEdges,
  excludedCandidateEdges: adjacency.excludedCandidateEdges,
  includedEdges: adjacency.includedEdges,
} as const;

export const EUROPE_TARGET_COUNTRY_CODES = EUROPE_COUNTRY_CODES.filter(
  (code) => !(["ISL", "IRL", "MLT", "GBR"] as const).includes(code as "ISL" | "IRL" | "MLT" | "GBR"),
);
