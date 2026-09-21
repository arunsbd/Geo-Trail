import { describe, expect, it } from "vitest";
import countryGeoJson from "@/data/geography/europe/countries.geo.json";
import generatedGeography from "@/data/geography/europe/countries.generated.json";
import sources from "@/data/geography/europe/sources.json";
import { EUROPE_COUNTRY_SHAPES, EUROPE_MAP_BOUNDS } from "@/data/geography/europe/map";
import {
  EUROPE_ADJACENCY_PROVENANCE,
  EUROPE_COUNTRY_CODES,
  EUROPE_LAND_BORDERS,
  EUROPE_TARGET_COUNTRY_CODES,
} from "@/data/geography/europe/borders";
import {
  EUROPE_COUNTRY_DEFINITIONS,
  EUROPE_COUNTRIES_DATASET,
  EUROPE_MICROSTATE_CODES,
  findEuropeCountry,
} from "@/data/geography/europe/countries";
import { EUROPE_BETA_POLICY } from "@/data/geography/europe/policy";
import { pickMysteryPlace } from "@/lib/border-hunt/engine";
import {
  createConnectionGraph,
  shortestConnectionDistance,
  shortestConnectionPath,
} from "@/lib/geography/connection";
import { getDistanceFeedback, type HeatLevel } from "@/lib/game";

const EXPECTED_COUNTRY_NAMES = [
  "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
  "Bulgaria", "Croatia", "Czechia", "Denmark", "Estonia", "Finland", "France",
  "Germany", "Greece", "Vatican City", "Hungary", "Iceland", "Ireland", "Italy",
  "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco",
  "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal",
  "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain",
  "Sweden", "Switzerland", "Ukraine", "United Kingdom",
];

function expectedHeatLevel(distance: number): HeatLevel {
  if (distance === 0) return "correct";
  if (distance === 1) return "bordering";
  if (distance === 2) return "very-hot";
  if (distance === 3) return "hot";
  if (distance === 4) return "warm";
  if (distance === 5) return "mild";
  if (distance === 6) return "cool";
  if (distance === 7) return "cold";
  return "very-cold";
}

function componentFrom(start: (typeof EUROPE_COUNTRY_CODES)[number]) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const current = queue.shift()!;
    for (const neighbor of EUROPE_LAND_BORDERS[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}

describe("Europe Border Hunt beta geography", () => {
  const graph = createConnectionGraph(EUROPE_COUNTRIES_DATASET);

  it("has a unique 44-country M49-Europe roster and one polygon per country", () => {
    expect(EUROPE_COUNTRY_CODES).toHaveLength(44);
    expect(new Set(EUROPE_COUNTRY_CODES)).toHaveLength(44);
    expect(EUROPE_COUNTRIES_DATASET.places).toHaveLength(44);
    expect(EUROPE_COUNTRY_SHAPES).toHaveLength(44);
    expect(EUROPE_COUNTRIES_DATASET.places.map((country) => country.name)).toEqual(EXPECTED_COUNTRY_NAMES);
  });

  it("pins every generated geography artifact to Natural Earth 5.1.1", () => {
    const checksum = "239eec57ac17f100a11e2536cffc56752c318b50ae765b0918ff7aab4ce8f255";
    expect(sources.polygons.title).toBe("Natural Earth Admin 0 Countries, 1:10m");
    expect(sources.polygons.version).toBe("5.1.1");
    expect(sources.polygons.sha256).toBe(checksum);
    expect(sources.license.status).toBe("Public domain");
    expect(sources.license.commercialUse).toBe("Permitted");
    expect(generatedGeography.sourceSha256).toBe(checksum);
    expect(countryGeoJson.sourceSha256).toBe(checksum);
    expect(EUROPE_ADJACENCY_PROVENANCE.sourceSha256).toBe(checksum);
    expect(EUROPE_COUNTRIES_DATASET.version).toBe("europe-beta-natural-earth-5.1.1-v1");
    expect(EUROPE_COUNTRIES_DATASET.places.every((country) =>
      country.polygon.source === "Natural Earth Admin 0 Countries 1:10m v5.1.1" &&
      country.polygon.featureId === country.id
    )).toBe(true);
  });

  it("resolves every canonical name and approved alias without cross-country collisions", () => {
    const ownerByInput = new Map<string, string>();
    for (const country of EUROPE_COUNTRIES_DATASET.places) {
      for (const input of [country.name, country.id, ...country.aliases]) {
        const normalized = input.trim().replace(/\s+/g, " ").toLowerCase();
        const previousOwner = ownerByInput.get(normalized);
        expect(previousOwner === undefined || previousOwner === country.id).toBe(true);
        ownerByInput.set(normalized, country.id);
        expect(findEuropeCountry(`  ${input.toUpperCase()}  `)?.id).toBe(country.id);
      }
    }
  });

  it("keeps every reviewed edge symmetric, known, and self-edge-free", () => {
    const uniqueEdges = new Set<string>();
    for (const code of EUROPE_COUNTRY_CODES) {
      expect(EUROPE_LAND_BORDERS[code]).not.toContain(code);
      for (const neighbor of EUROPE_LAND_BORDERS[code]) {
        expect(EUROPE_COUNTRY_CODES).toContain(neighbor);
        expect(EUROPE_LAND_BORDERS[neighbor]).toContain(code);
        uniqueEdges.add([code, neighbor].sort().join("-"));
      }
    }
    expect(uniqueEdges).toHaveLength(81);
    expect(EUROPE_ADJACENCY_PROVENANCE.candidateEdges).toHaveLength(82);
    expect(EUROPE_ADJACENCY_PROVENANCE.includedEdges).toHaveLength(81);
    expect(EUROPE_ADJACENCY_PROVENANCE.policyRejectedEdges).toEqual(["ALB-SRB", "MKD-SRB"]);
    expect(EUROPE_ADJACENCY_PROVENANCE.excludedCandidateEdges).toEqual(["MKD-SRB"]);
  });

  it("uses the 40-country primary component for targets without gateways", () => {
    const mainComponent = componentFrom("ALB");
    expect(mainComponent.size).toBe(40);
    expect(new Set(EUROPE_TARGET_COUNTRY_CODES)).toEqual(mainComponent);
    expect(componentFrom("IRL")).toEqual(new Set(["IRL", "GBR"]));
    expect(componentFrom("ISL")).toEqual(new Set(["ISL"]));
    expect(componentFrom("MLT")).toEqual(new Set(["MLT"]));
    expect(EUROPE_BETA_POLICY.gateways).toEqual([]);
  });

  it("can select every mystery target across the full random interval", () => {
    const count = EUROPE_TARGET_COUNTRY_CODES.length;
    const selected = EUROPE_TARGET_COUNTRY_CODES.map((expected, index) => {
      const actual = pickMysteryPlace(EUROPE_TARGET_COUNTRY_CODES, () => (index + 0.5) / count);
      expect(actual).toBe(expected);
      return actual;
    });
    expect(new Set(selected)).toEqual(new Set(EUROPE_TARGET_COUNTRY_CODES));
    expect(pickMysteryPlace(EUROPE_TARGET_COUNTRY_CODES, () => 0)).toBe(EUROPE_TARGET_COUNTRY_CODES[0]);
    expect(pickMysteryPlace(EUROPE_TARGET_COUNTRY_CODES, () => 1)).toBe(EUROPE_TARGET_COUNTRY_CODES.at(-1));
  });

  it("keeps every mystery target mutually reachable with correct heat semantics", () => {
    const observedDistances = new Set<number>();
    for (const start of EUROPE_TARGET_COUNTRY_CODES) {
      for (const target of EUROPE_TARGET_COUNTRY_CODES) {
        const distance = shortestConnectionDistance(start, target, graph);
        expect(distance).not.toBeNull();
        observedDistances.add(distance!);
        expect(getDistanceFeedback(distance, "country").level).toBe(expectedHeatLevel(distance!));
      }
    }
    expect([...observedDistances].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("routes through the shared connection engine", () => {
    expect(shortestConnectionDistance("PRT", "ESP", graph)).toBe(1);
    expect(shortestConnectionDistance("PRT", "DEU", graph)).toBe(3);
    expect(shortestConnectionDistance("POL", "RUS", graph)).toBe(1);
    expect(shortestConnectionDistance("IRL", "FRA", graph)).toBeNull();
  });

  it("reconstructs a shortest reviewed route for post-game learning", () => {
    const graph = createConnectionGraph(EUROPE_COUNTRIES_DATASET);
    const path = shortestConnectionPath("DEU", "HRV", graph);

    expect(path).not.toBeNull();
    expect(path?.[0]).toBe("DEU");
    expect(path?.at(-1)).toBe("HRV");
    expect(path?.length).toBe((shortestConnectionDistance("DEU", "HRV", graph) ?? -1) + 1);
    expect(path?.every((country, index) => index === 0 || graph[path[index - 1]].includes(country))).toBe(true);
  });

  it("accepts authoritative names, common aliases, and codes", () => {
    expect(findEuropeCountry("Czech Republic")?.id).toBe("CZE");
    expect(findEuropeCountry("  north   macedonia ")?.id).toBe("MKD");
    expect(findEuropeCountry("UK")?.id).toBe("GBR");
    expect(findEuropeCountry("Holy See")?.id).toBe("VAT");
    expect(findEuropeCountry("Atlantis")).toBeNull();
  });

  it("enforces the documented transcontinental and disputed-territory policy", () => {
    expect(findEuropeCountry("Russia")?.id).toBe("RUS");
    for (const excluded of ["Turkey", "Türkiye", "TUR", "Cyprus", "CYP", "Kosovo", "XKX"]) {
      expect(findEuropeCountry(excluded)).toBeNull();
    }
    expect(EUROPE_LAND_BORDERS.RUS).toEqual(["BLR", "EST", "FIN", "LVA", "LTU", "NOR", "POL", "UKR"]);
    expect(EUROPE_LAND_BORDERS.SRB).not.toContain("ALB");
    expect(EUROPE_LAND_BORDERS.SRB).not.toContain("MKD");
    expect(EUROPE_LAND_BORDERS.MKD).not.toContain("SRB");
    expect(EUROPE_LAND_BORDERS.GRC).not.toContain("TUR");
    expect(EUROPE_LAND_BORDERS.BGR).not.toContain("TUR");
    expect(EUROPE_BETA_POLICY.excludedDisputedBoundaryCandidates).toEqual(["ALB-SRB", "MKD-SRB"]);
  });

  it("preserves enclave, exclave, island, and overseas-territory decisions", () => {
    expect(EUROPE_LAND_BORDERS.VAT).toEqual(["ITA"]);
    expect(EUROPE_LAND_BORDERS.SMR).toEqual(["ITA"]);
    expect(EUROPE_LAND_BORDERS.MCO).toEqual(["FRA"]);
    expect(EUROPE_LAND_BORDERS.LIE).toEqual(["AUT", "CHE"]);
    expect(EUROPE_LAND_BORDERS.AND).toEqual(["ESP", "FRA"]);
    expect(EUROPE_LAND_BORDERS.RUS).toContain("POL");
    expect(EUROPE_LAND_BORDERS.RUS).toContain("LTU");
    expect(EUROPE_LAND_BORDERS.ISL).toEqual([]);
    expect(EUROPE_LAND_BORDERS.MLT).toEqual([]);
    expect(EUROPE_LAND_BORDERS.IRL).toEqual(["GBR"]);
    expect(EUROPE_LAND_BORDERS.FRA).not.toContain("BRA" as never);
    expect(EUROPE_LAND_BORDERS.ESP).not.toContain("MAR" as never);
    expect(EUROPE_LAND_BORDERS.GBR).not.toContain("ESP");
  });

  it("regenerates finite centroids and direction anchors inside WGS84 bounds", () => {
    for (const code of EUROPE_COUNTRY_CODES) {
      for (const point of [
        EUROPE_COUNTRY_DEFINITIONS[code].centroid,
        EUROPE_COUNTRY_DEFINITIONS[code].labelPoint,
      ]) {
        expect(Number.isFinite(point.longitude)).toBe(true);
        expect(Number.isFinite(point.latitude)).toBe(true);
        expect(point.longitude).toBeGreaterThanOrEqual(-180);
        expect(point.longitude).toBeLessThanOrEqual(180);
        expect(point.latitude).toBeGreaterThanOrEqual(-90);
        expect(point.latitude).toBeLessThanOrEqual(90);
      }
    }
  });

  it("derives non-empty Europe map bounds from Natural Earth geometry", () => {
    expect(EUROPE_MAP_BOUNDS.west).toBeCloseTo(-24.539906);
    expect(EUROPE_MAP_BOUNDS.south).toBeCloseTo(35.002143);
    expect(EUROPE_MAP_BOUNDS.east).toBeCloseTo(44.966645);
    expect(EUROPE_MAP_BOUNDS.north).toBeCloseTo(71.180365);
    expect(EUROPE_MAP_BOUNDS.west).toBeLessThan(EUROPE_MAP_BOUNDS.east);
    expect(EUROPE_MAP_BOUNDS.south).toBeLessThan(EUROPE_MAP_BOUNDS.north);
  });

  it("defines enhanced hit targets for all five included microstates", () => {
    expect(EUROPE_MICROSTATE_CODES).toEqual(["AND", "VAT", "LIE", "MCO", "SMR"]);
  });
});
