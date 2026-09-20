import { US_STATES_DATASET } from "@/data/geography/us-states";
import type { StateCode } from "@/data/states";

export type HeatLevel =
  | "correct"
  | "bordering"
  | "very-hot"
  | "hot"
  | "warm"
  | "mild"
  | "cool"
  | "cold"
  | "very-cold"
  | "no-route";

export type DistanceFeedback = {
  icon: string;
  label: string;
  detail: string;
  level: HeatLevel;
};

export const LAND_DISTANCE_LEGEND = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (distance) => getDistanceFeedback(distance),
);

export function formatFeedbackText(feedback: DistanceFeedback) {
  return `${feedback.icon} ${feedback.label}; ${feedback.detail}`;
}

export const MYSTERY_STATE_CODES = US_STATES_DATASET.places
  .filter((place) => place.terrestrialNeighbors.length > 0)
  .map((place) => place.id);

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
  placeKind: "state" | "country" | number = "state",
): DistanceFeedback {
  // Treat Array.map's numeric index argument as the historical state default.
  const normalizedPlaceKind = placeKind === "country" ? "country" : "state";
  const placeLabel = normalizedPlaceKind;
  if (distance === null) {
    return {
      icon: "◇",
      label: "Connection unknown",
      detail: normalizedPlaceKind === "state"
        ? "No continuous U.S. state-border trail is available."
        : "No continuous country land-border trail is available.",
      level: "no-route",
    };
  }

  if (distance === 0) {
    return {
      icon: "✓",
      label: "FOUND IT",
      detail: `You found the mystery ${placeLabel}.`,
      level: "correct",
    };
  }

  const crossingText = `${distance} border${distance === 1 ? "" : "s"} away`;

  if (distance === 1) {
    return {
      icon: "🔥",
      label: "BORDERING",
      detail: `${crossingText} — Your guess directly borders the mystery ${placeLabel}.`,
      level: "bordering",
    };
  }

  if (distance === 2) {
    return { icon: "●", label: "Very hot", detail: crossingText, level: "very-hot" };
  }

  if (distance === 3) {
    return { icon: "●", label: "Hot", detail: crossingText, level: "hot" };
  }

  if (distance === 4) {
    return { icon: "●", label: "Warm", detail: crossingText, level: "warm" };
  }

  if (distance === 5) {
    return { icon: "●", label: "Mild", detail: crossingText, level: "mild" };
  }

  if (distance === 6) {
    return { icon: "●", label: "Cool", detail: crossingText, level: "cool" };
  }

  if (distance === 7) {
    return { icon: "●", label: "Cold", detail: crossingText, level: "cold" };
  }

  return { icon: "●", label: "Very cold", detail: crossingText, level: "very-cold" };
}
