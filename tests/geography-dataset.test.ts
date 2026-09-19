import { describe, expect, it } from "vitest";
import { US_STATES_DATASET } from "@/data/geography/us-states";
import {
  createConnectionGraph,
  filterPlaceIdsByRegion,
  shortestConnectionDistance,
} from "@/lib/geography/connection";

describe("dataset-driven geography", () => {
  const graph = createConnectionGraph(US_STATES_DATASET);

  it("describes every current place through the generic dataset boundary", () => {
    expect(US_STATES_DATASET.places).toHaveLength(50);
    expect(filterPlaceIdsByRegion(US_STATES_DATASET, "United States")).toHaveLength(50);
    expect(US_STATES_DATASET.places.every((place) => place.polygon.featureId)).toBe(true);
  });

  it("keeps terrestrial relationships symmetric and self-edge-free", () => {
    for (const place of US_STATES_DATASET.places) {
      expect(place.terrestrialNeighbors).not.toContain(place.id);
      for (const neighbor of place.terrestrialNeighbors) {
        expect(graph[neighbor]).toContain(place.id);
      }
    }
  });

  it("runs the current U.S. rules through the generic connection engine", () => {
    expect(shortestConnectionDistance("KY", "KY", graph)).toBe(0);
    expect(shortestConnectionDistance("AZ", "CO", graph)).toBe(1);
    expect(shortestConnectionDistance("CA", "TX", graph)).toBe(3);
    expect(shortestConnectionDistance("CA", "TN", graph)).toBe(5);
    expect(shortestConnectionDistance("AK", "HI", graph)).toBeNull();
  });
});
