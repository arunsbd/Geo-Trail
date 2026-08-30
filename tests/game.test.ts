import { describe, expect, it } from "vitest";
import { STATE_BORDERS } from "@/data/borders";
import { findState } from "@/data/states";
import {
  getDistanceFeedback,
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
  it("communicates distance in text as well as color", () => {
    expect(getDistanceFeedback(1)).toMatchObject({
      label: "Very hot",
      level: "very-hot",
    });
    expect(getDistanceFeedback(3).detail).toContain("3 borders away");
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
