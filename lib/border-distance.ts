import { STATE_BORDERS, type BorderGraph } from "@/data/borders";
import type { StateCode } from "@/data/states";
import { shortestConnectionDistance } from "@/lib/geography/connection";

export function shortestBorderDistance(
  start: StateCode,
  target: StateCode,
  graph: BorderGraph = STATE_BORDERS,
): number | null {
  return shortestConnectionDistance(start, target, graph);
}
