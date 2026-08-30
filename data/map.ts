import { geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import usAtlas from "us-atlas/states-albers-10m.json";
import { STATE_CODE_BY_NAME } from "@/data/states";

type StateProperties = {
  name: string;
};

const topology = usAtlas as unknown as Topology<{
  states: GeometryCollection<StateProperties>;
}>;
const pathGenerator = geoPath();

export const US_MAP_VIEWBOX = "0 0 975 610";

export const US_STATE_SHAPES = feature(
  topology,
  topology.objects.states,
).features.flatMap((stateFeature) => {
  const name = stateFeature.properties?.name;
  const code = name ? STATE_CODE_BY_NAME.get(name.toLowerCase()) : undefined;
  const path = pathGenerator(stateFeature);

  return code && name && path ? [{ code, name, path }] : [];
});
