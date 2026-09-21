import { geoMercator, geoPath, type GeoPermissibleObjects } from "d3-geo";
import countryGeoJson from "./countries.geo.json";
import generatedGeography from "./countries.generated.json";
import { EUROPE_COUNTRY_BY_CODE, EUROPE_COUNTRY_DEFINITIONS, isEuropeCountryCode } from "./countries";

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { code: string }>;

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 700;
const MAP_PADDING = 24;
const { west, south, east, north } = generatedGeography.displayBounds;
const boundsFeature: GeoJSON.Feature<GeoJSON.MultiPoint> = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "MultiPoint",
    coordinates: [
      [west, south],
      [east, north],
    ],
  },
};

const projection = geoMercator()
  .fitExtent(
    [[MAP_PADDING, MAP_PADDING], [MAP_WIDTH - MAP_PADDING, MAP_HEIGHT - MAP_PADDING]],
    boundsFeature,
  )
  .clipExtent([[0, 0], [MAP_WIDTH, MAP_HEIGHT]]);
const pathGenerator = geoPath(projection);
const features = (countryGeoJson as GeoJSON.FeatureCollection<GeoJSON.Geometry, { code: string }>).features;

export const EUROPE_MAP_VIEWBOX = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`;
export const EUROPE_MAP_BOUNDS = generatedGeography.displayBounds;

export const EUROPE_COUNTRY_SHAPES = features.flatMap((feature) => {
  const code = feature.properties?.code;
  if (!code || !isEuropeCountryCode(code)) return [];
  const country = EUROPE_COUNTRY_BY_CODE.get(code);
  const path = pathGenerator(feature as CountryFeature as GeoPermissibleObjects);
  const point = projection([
    country?.labelPoint?.longitude ?? 0,
    country?.labelPoint?.latitude ?? 0,
  ]);

  return country && path && point
    ? [{
        code,
        name: country.name,
        path,
        labelX: point[0],
        labelY: point[1],
        microstate: Boolean(EUROPE_COUNTRY_DEFINITIONS[code].microstate),
      }]
    : [];
});

export function projectToEuropeMap(longitude: number, latitude: number) {
  return projection([longitude, latitude]);
}
