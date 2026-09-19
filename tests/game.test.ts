import { describe, expect, it } from "vitest";
import { STATE_BORDERS } from "@/data/borders";
import { findState } from "@/data/states";
import {
  getDistanceFeedback,
  LAND_DISTANCE_LEGEND,
  MYSTERY_STATE_CODES,
  pickMysteryState,
} from "@/lib/game";

describe("state guess normalization", () => {
  it("accepts full names and postal abbreviations without case sensitivity", () => {
    expect(findState("Kentucky")?.code).toBe("KY");
    expect(findState("ky")?.name).toBe("Kentucky");
    expect(findState("  new   york ")?.code).toBe("NY");
  });

  it("rejects unknown guesses", () => {
    expect(findState("Atlantis")).toBeNull();
    expect(findState("")).toBeNull();
  });
});

describe("game feedback", () => {
  it.each([
    [0, "FOUND IT", "correct"],
    [1, "BORDERING", "bordering"],
    [2, "Very hot", "very-hot"],
    [3, "Hot", "hot"],
    [4, "Warm", "warm"],
    [5, "Mild", "mild"],
    [6, "Cool", "cool"],
    [7, "Cold", "cold"],
    [8, "Very cold", "very-cold"],
    [12, "Very cold", "very-cold"],
  ] as const)("maps distance %s to %s", (distance, label, level) => {
    expect(getDistanceFeedback(distance)).toMatchObject({ label, level });
  });

  it("gives direct neighbors a fire label and explicit border explanation", () => {
    expect(getDistanceFeedback(1)).toMatchObject({
      icon: "🔥",
      label: "BORDERING",
      level: "bordering",
    });
    expect(getDistanceFeedback(1).detail).toContain("1 border away");
    expect(getDistanceFeedback(1).detail).toContain("directly borders");
  });

  it("reserves green/correct semantics for distance zero", () => {
    expect(getDistanceFeedback(0).level).toBe("correct");
    for (const distance of [1, 2, 3, 4, 5, 6, 7, 8]) {
      expect(getDistanceFeedback(distance).level).not.toBe("correct");
    }
  });

  it("builds the legend from the same semantic feedback used by results and history", () => {
    expect(LAND_DISTANCE_LEGEND).toEqual(
      [0, 1, 2, 3, 4, 5, 6, 7, 8].map(getDistanceFeedback),
    );
    expect(getDistanceFeedback(null).level).toBe("no-route");
  });

  it("selects mystery states from the connected land-border graph", () => {
    expect(MYSTERY_STATE_CODES).toHaveLength(48);
    expect(STATE_BORDERS[pickMysteryState(() => 0)].length).toBeGreaterThan(0);
    expect(STATE_BORDERS[pickMysteryState(() => 0.999999)].length).toBeGreaterThan(
      0,
    );
  });
});
