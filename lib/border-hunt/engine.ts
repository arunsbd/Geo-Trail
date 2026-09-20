import type { GeographyDataset, GeographyPlace } from "@/lib/geography/types";
import { createConnectionGraph, shortestConnectionDistance } from "@/lib/geography/connection";

function normalizePlaceInput(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function findGeographyPlace<PlaceId extends string>(
  dataset: GeographyDataset<PlaceId>,
  input: string,
): GeographyPlace<PlaceId> | null {
  const normalized = normalizePlaceInput(input);
  return dataset.places.find((place) =>
    [place.id, place.name, ...place.aliases].some((value) => normalizePlaceInput(value) === normalized),
  ) ?? null;
}

export function pickMysteryPlace<PlaceId extends string>(
  targetIds: readonly PlaceId[],
  random: () => number = Math.random,
): PlaceId {
  if (targetIds.length === 0) throw new Error("Border Hunt needs at least one mystery target.");
  const index = Math.min(Math.floor(random() * targetIds.length), targetIds.length - 1);
  return targetIds[index];
}

export function distanceWithinDataset<PlaceId extends string>(
  dataset: GeographyDataset<PlaceId>,
  start: PlaceId,
  target: PlaceId,
) {
  return shortestConnectionDistance(start, target, createConnectionGraph(dataset));
}
