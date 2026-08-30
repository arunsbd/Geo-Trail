import { describe, expect, it } from "vitest";
import { neighbors } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import usAtlas from "us-atlas/states-albers-10m.json";
import { STATE_BORDERS } from "@/data/borders";
import { STATES, STATE_CODES, STATE_CODE_BY_NAME, type StateCode } from "@/data/states";

function stateCodeForGeometry(geometry: { properties?: unknown }) {
  const properties = geometry.properties;
  if (
    !properties ||
    typeof properties !== "object" ||
    !("name" in properties) ||
    typeof properties.name !== "string"
  ) {
    return undefined;
  }
  return STATE_CODE_BY_NAME.get(properties.name.toLowerCase());
}

describe("state geography data", () => {
  it("contains exactly 50 unique states", () => {
    expect(STATES).toHaveLength(50);
    expect(new Set(STATE_CODES).size).toBe(50);
    expect(new Set(STATES.map((state) => state.name)).size).toBe(50);
  });

  it("has one border-graph entry for every state", () => {
    expect(Object.keys(STATE_BORDERS).sort()).toEqual([...STATE_CODES].sort());
  });

  it("only references known states and never a state itself", () => {
    const validCodes = new Set<string>(STATE_CODES);

    for (const state of STATE_CODES) {
      const neighbors = STATE_BORDERS[state];
      expect(neighbors).not.toContain(state);
      expect(new Set(neighbors).size).toBe(neighbors.length);

      for (const neighbor of neighbors) {
        expect(validCodes.has(neighbor)).toBe(true);
      }
    }
  });

  it("stores every border relationship symmetrically", () => {
    for (const state of STATE_CODES) {
      for (const neighbor of STATE_BORDERS[state]) {
        expect(STATE_BORDERS[neighbor]).toContain(state);
      }
    }
  });

  it("treats all four Four Corners states as mutual neighbors", () => {
    const fourCornersStates = ["AZ", "CO", "NM", "UT"] as const;

    for (const state of fourCornersStates) {
      for (const neighbor of fourCornersStates) {
        if (state !== neighbor) {
          expect(STATE_BORDERS[state]).toContain(neighbor);
        }
      }
    }
  });

  it("keeps only Alaska and Hawaii isolated in the land-border graph", () => {
    const isolatedStates = STATE_CODES.filter(
      (state) => STATE_BORDERS[state].length === 0,
    );

    expect(isolatedStates).toEqual(["AK", "HI"]);
  });

  it("matches Census shared boundaries plus the two Four Corners point contacts", () => {
    // TopoJSON neighbors detects shared arcs, not point-only contact.
    // Keep these explicit game-rule exceptions independent of STATE_BORDERS.
    const pointContacts: Partial<Record<StateCode, readonly StateCode[]>> = {
      AZ: ["CO"],
      CO: ["AZ"],
      NM: ["UT"],
      UT: ["NM"],
    };
    const topology = usAtlas as unknown as Topology<{
      states: GeometryCollection<{ name: string }>;
    }>;
    const geometries = topology.objects.states.geometries;
    const adjacency = neighbors(geometries);

    geometries.forEach((geometry, index) => {
      const code = stateCodeForGeometry(geometry);
      if (!code) return; // The source also includes Washington, D.C.

      const expectedNeighbors = adjacency[index].flatMap((neighborIndex) => {
        const neighborCode = stateCodeForGeometry(geometries[neighborIndex]);
        return neighborCode ? [neighborCode] : [];
      });
      expectedNeighbors.push(...(pointContacts[code] ?? []));

      expect([...STATE_BORDERS[code]].sort()).toEqual(expectedNeighbors.sort());
    });
  });
});
