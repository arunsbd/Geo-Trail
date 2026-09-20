import { geoMercator, geoPath, type GeoPermissibleObjects } from "d3-geo";
import countryGeoJson from "./countries.geo.json";
import { EUROPE_COUNTRY_BY_CODE, EUROPE_COUNTRY_DEFINITIONS, isEuropeCountryCode } from "./countries";

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { code: string }>;

const projection = geoMercator()
  .center([15, 54])
  .scale(620)
  .translate([500, 345]);
const pathGenerator = geoPath(projection);
const features = (countryGeoJson as GeoJSON.FeatureCollection<GeoJSON.Geometry, { code: string }>).features;

export const EUROPE_MAP_VIEWBOX = "0 0 1000 700";

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
