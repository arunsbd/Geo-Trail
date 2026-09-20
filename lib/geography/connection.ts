import type { GeographyDataset } from "./types";

export function createConnectionGraph<PlaceId extends string>(
  dataset: GeographyDataset<PlaceId>,
): Readonly<Record<PlaceId, readonly PlaceId[]>> {
  return Object.fromEntries(
    dataset.places.map((place) => [place.id, place.terrestrialNeighbors]),
  ) as Readonly<Record<PlaceId, readonly PlaceId[]>>;
}

export function shortestConnectionDistance<PlaceId extends string>(
  start: PlaceId,
  target: PlaceId,
  graph: Readonly<Record<PlaceId, readonly PlaceId[]>>,
): number | null {
  if (start === target) return 0;

  const visited = new Set<PlaceId>([start]);
  const queue: Array<{ place: PlaceId; distance: number }> = [
    { place: start, distance: 0 },
  ];
  let nextIndex = 0;

  while (nextIndex < queue.length) {
    const current = queue[nextIndex];
    nextIndex += 1;

    for (const neighbor of graph[current.place] ?? []) {
      if (visited.has(neighbor)) continue;
      if (neighbor === target) return current.distance + 1;

      visited.add(neighbor);
      queue.push({ place: neighbor, distance: current.distance + 1 });
    }
  }

  return null;
}

export function shortestConnectionPath<PlaceId extends string>(
  start: PlaceId,
  target: PlaceId,
  graph: Readonly<Record<PlaceId, readonly PlaceId[]>>,
): PlaceId[] | null {
  if (start === target) return [start];

  const previous = new Map<PlaceId, PlaceId | null>([[start, null]]);
  const queue: PlaceId[] = [start];
  let nextIndex = 0;

  while (nextIndex < queue.length) {
    const current = queue[nextIndex];
    nextIndex += 1;

    for (const neighbor of graph[current] ?? []) {
      if (previous.has(neighbor)) continue;
      previous.set(neighbor, current);

      if (neighbor === target) {
        const path: PlaceId[] = [];
        let step: PlaceId | null = target;
        while (step !== null) {
          path.push(step);
          step = previous.get(step) ?? null;
        }
        return path.reverse();
      }

      queue.push(neighbor);
    }
  }

  return null;
}

export function filterPlaceIdsByRegion<PlaceId extends string>(
  dataset: GeographyDataset<PlaceId>,
  region: GeographyDataset<PlaceId>["places"][number]["gameRegion"],
): PlaceId[] {
  return dataset.places
    .filter((place) => place.gameRegion === region)
    .map((place) => place.id);
}
