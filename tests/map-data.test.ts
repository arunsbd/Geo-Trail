import { describe, expect, it } from "vitest";
import { US_STATE_SHAPES } from "@/data/map";
import { STATE_CODES } from "@/data/states";

describe("U.S. SVG map data", () => {
  it("contains one nonempty SVG path for each of the 50 states", () => {
    expect(US_STATE_SHAPES).toHaveLength(50);
    expect(US_STATE_SHAPES.map((state) => state.code).sort()).toEqual(
      [...STATE_CODES].sort(),
    );
    expect(US_STATE_SHAPES.every((state) => state.path.length > 0)).toBe(true);
  });
});
