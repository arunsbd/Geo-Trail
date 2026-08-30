import { describe, expect, it } from "vitest";
import { STATE_BORDERS } from "@/data/borders";
import { STATE_CODES } from "@/data/states";
import { shortestBorderDistance } from "@/lib/border-distance";

describe("shortestBorderDistance", () => {
  it("returns zero for the same state", () => {
    expect(shortestBorderDistance("KY", "KY")).toBe(0);
  });

  it("returns one for every neighboring pair", () => {
    for (const state of STATE_CODES) {
      for (const neighbor of STATE_BORDERS[state]) {
        expect(shortestBorderDistance(state, neighbor)).toBe(1);
      }
    }
  });

  it("finds the minimum number of crossings with BFS", () => {
    expect(shortestBorderDistance("ME", "VT")).toBe(2);
    expect(shortestBorderDistance("CA", "TX")).toBe(3);
    expect(shortestBorderDistance("CA", "TN")).toBe(5);
  });

  it.each([
    ["AZ", "CO"],
    ["CO", "AZ"],
    ["NM", "UT"],
    ["UT", "NM"],
  ] as const)("counts the %s to %s corner contact as one crossing", (start, target) => {
    expect(shortestBorderDistance(start, target)).toBe(1);
  });

  it("uses Four Corners connections in longer shortest paths", () => {
    // Arizona -> Colorado -> Nebraska, using the new corner-contact edge.
    expect(shortestBorderDistance("AZ", "NE")).toBe(2);
    expect(shortestBorderDistance("NE", "AZ")).toBe(2);
  });

  it("can reach all 48 contiguous states from the same starting point", () => {
    for (const state of STATE_CODES.filter((code) => code !== "AK" && code !== "HI")) {
      expect(shortestBorderDistance("AL", state)).not.toBeNull();
    }
  });

  it("returns null when no land-border route exists", () => {
    expect(shortestBorderDistance("AK", "CA")).toBeNull();
    expect(shortestBorderDistance("HI", "AK")).toBeNull();
  });
});
