import { STATE_BORDERS } from "@/data/borders";
import { STATE_CODES, type StateCode } from "@/data/states";

export type HeatLevel =
  | "correct"
  | "very-hot"
  | "hot"
  | "warm"
  | "cool"
  | "cold"
  | "no-route";

export type DistanceFeedback = {
  label: string;
  detail: string;
  level: HeatLevel;
};

export const MYSTERY_STATE_CODES = STATE_CODES.filter(
  (code) => STATE_BORDERS[code].length > 0,
);

export function pickMysteryState(
  random: () => number = Math.random,
): StateCode {
  const index = Math.min(
    Math.floor(random() * MYSTERY_STATE_CODES.length),
    MYSTERY_STATE_CODES.length - 1,
  );

  return MYSTERY_STATE_CODES[index];
}

export function getDistanceFeedback(
  distance: number | null,
): DistanceFeedback {
  if (distance === null) {
    return {
      label: "Off the trail",
      detail: "There is no land-border route from this state.",
      level: "no-route",
    };
  }

  if (distance === 0) {
    return {
      label: "Trail found!",
      detail: "You found the mystery state.",
      level: "correct",
    };
  }

  const crossingText = `${distance} border${distance === 1 ? "" : "s"} away`;

  if (distance === 1) {
    return {
      label: "Very hot",
      detail: `${crossingText} — it directly borders the mystery state.`,
      level: "very-hot",
    };
  }

  if (distance === 2) {
    return { label: "Hot", detail: crossingText, level: "hot" };
  }

  if (distance === 3) {
    return { label: "Warm", detail: crossingText, level: "warm" };
  }

  if (distance === 4) {
    return { label: "Cool", detail: crossingText, level: "cool" };
  }

  return { label: "Cold", detail: crossingText, level: "cold" };
}
