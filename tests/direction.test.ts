import { describe, expect, it } from "vitest";
import { bearingToCardinalDirection, getGeographicDirection, initialBearing } from "@/lib/geography/direction";
import { EUROPE_COUNTRY_CODES } from "@/data/geography/europe/borders";
import { EUROPE_COUNTRY_DEFINITIONS } from "@/data/geography/europe/countries";

describe("geography-aware Easy Mode directions", () => {
  it("computes initial great-circle bearings", () => {
    expect(initialBearing({ longitude: 0, latitude: 0 }, { longitude: 10, latitude: 0 })).toBeCloseTo(90);
    expect(initialBearing({ longitude: 0, latitude: 0 }, { longitude: 0, latitude: 10 })).toBeCloseTo(0);
  });

  it("quantizes bearings into eight compass directions", () => {
    expect(bearingToCardinalDirection(0)).toBe("N");
    expect(bearingToCardinalDirection(44)).toBe("NE");
    expect(bearingToCardinalDirection(91)).toBe("E");
    expect(bearingToCardinalDirection(359)).toBe("N");
  });

  it("returns readable guidance", () => {
    expect(getGeographicDirection(
      { longitude: -8, latitude: 39.7 },
      { longitude: 19.2, latitude: 52 },
    )).toEqual({ short: "NE", name: "northeast" });
  });

  it("returns a valid direction for every distinct Europe anchor pair", () => {
    const validDirections = new Set(["N", "NE", "E", "SE", "S", "SW", "W", "NW"]);
    for (const start of EUROPE_COUNTRY_CODES) {
      for (const target of EUROPE_COUNTRY_CODES) {
        if (start === target) continue;
        const direction = getGeographicDirection(
          EUROPE_COUNTRY_DEFINITIONS[start].labelPoint,
          EUROPE_COUNTRY_DEFINITIONS[target].labelPoint,
        );
        expect(validDirections.has(direction.short)).toBe(true);
      }
    }
  });
});
