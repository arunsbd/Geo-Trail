import { STATE_BORDERS } from "@/data/borders";
import { STATES, type StateCode } from "@/data/states";
import type { GeographyDataset } from "@/lib/geography/types";

export const US_STATES_DATASET = {
  id: "us-states",
  version: "census-2017-four-corners-v1",
  label: "U.S. States",
  placeKind: "state",
  places: STATES.map((state) => ({
    id: state.code,
    name: state.name,
    aliases: [state.code],
    polygon: {
      source: "us-atlas/states-albers-10m.json",
      featureId: state.code,
    },
    terrestrialNeighbors: STATE_BORDERS[state.code],
    gameRegion: "United States" as const,
  })),
} satisfies GeographyDataset<StateCode>;
