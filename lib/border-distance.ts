import { STATE_BORDERS, type BorderGraph } from "@/data/borders";
import type { StateCode } from "@/data/states";

export function shortestBorderDistance(
  start: StateCode,
  target: StateCode,
  graph: BorderGraph = STATE_BORDERS,
): number | null {
  if (start === target) {
    return 0;
  }

  const visited = new Set<StateCode>([start]);
  const queue: Array<{ state: StateCode; distance: number }> = [
    { state: start, distance: 0 },
  ];
  let nextIndex = 0;

  while (nextIndex < queue.length) {
    const current = queue[nextIndex];
    nextIndex += 1;

    for (const neighbor of graph[current.state]) {
      if (visited.has(neighbor)) {
        continue;
      }

      if (neighbor === target) {
        return current.distance + 1;
      }

      visited.add(neighbor);
      queue.push({ state: neighbor, distance: current.distance + 1 });
    }
  }

  return null;
}
