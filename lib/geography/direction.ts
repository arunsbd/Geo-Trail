import type { GeographicPoint } from "./types";

export const CARDINAL_DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
export type CardinalDirection = (typeof CARDINAL_DIRECTIONS)[number];

const DIRECTION_NAMES: Record<CardinalDirection, string> = {
  N: "north", NE: "northeast", E: "east", SE: "southeast",
  S: "south", SW: "southwest", W: "west", NW: "northwest",
};

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function initialBearing(from: GeographicPoint, to: GeographicPoint) {
  const fromLatitude = degreesToRadians(from.latitude);
  const toLatitude = degreesToRadians(to.latitude);
  const longitudeDelta = degreesToRadians(to.longitude - from.longitude);
  const y = Math.sin(longitudeDelta) * Math.cos(toLatitude);
  const x = Math.cos(fromLatitude) * Math.sin(toLatitude)
    - Math.sin(fromLatitude) * Math.cos(toLatitude) * Math.cos(longitudeDelta);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

export function bearingToCardinalDirection(bearing: number): CardinalDirection {
  return CARDINAL_DIRECTIONS[Math.round(bearing / 45) % CARDINAL_DIRECTIONS.length];
}

export function getGeographicDirection(from: GeographicPoint, to: GeographicPoint) {
  const short = bearingToCardinalDirection(initialBearing(from, to));
  return { short, name: DIRECTION_NAMES[short] };
}
