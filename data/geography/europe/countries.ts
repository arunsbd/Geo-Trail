import { EUROPE_COUNTRY_CODES, EUROPE_LAND_BORDERS, type EuropeCountryCode } from "./borders";
import type { GeographyDataset, GeographicPoint } from "@/lib/geography/types";

type CountryDefinition = {
  name: string;
  aliases: readonly string[];
  sourceCode: string;
  labelPoint: GeographicPoint;
  microstate?: boolean;
};

export const EUROPE_COUNTRY_DEFINITIONS: Readonly<Record<EuropeCountryCode, CountryDefinition>> = {
  ALB: { name: "Albania", aliases: ["AL", "ALB"], sourceCode: "AL", labelPoint: { longitude: 20, latitude: 41 } },
  AND: { name: "Andorra", aliases: ["AD", "AND"], sourceCode: "AD", labelPoint: { longitude: 1.58, latitude: 42.55 }, microstate: true },
  AUT: { name: "Austria", aliases: ["AT", "AUT"], sourceCode: "AT", labelPoint: { longitude: 14.2, latitude: 47.6 } },
  BLR: { name: "Belarus", aliases: ["BY", "BLR"], sourceCode: "BY", labelPoint: { longitude: 28, latitude: 53.5 } },
  BEL: { name: "Belgium", aliases: ["BE", "BEL"], sourceCode: "BE", labelPoint: { longitude: 4.6, latitude: 50.65 } },
  BIH: { name: "Bosnia and Herzegovina", aliases: ["BA", "BIH", "Bosnia", "Bosnia & Herzegovina"], sourceCode: "BA", labelPoint: { longitude: 17.8, latitude: 44.1 } },
  BGR: { name: "Bulgaria", aliases: ["BG", "BGR"], sourceCode: "BG", labelPoint: { longitude: 25.3, latitude: 42.75 } },
  HRV: { name: "Croatia", aliases: ["HR", "HRV"], sourceCode: "HR", labelPoint: { longitude: 16.4, latitude: 45.1 } },
  CZE: { name: "Czechia", aliases: ["CZ", "CZE", "Czech Republic"], sourceCode: "CZ", labelPoint: { longitude: 15.5, latitude: 49.8 } },
  DNK: { name: "Denmark", aliases: ["DK", "DNK"], sourceCode: "DK", labelPoint: { longitude: 9.3, latitude: 56 } },
  EST: { name: "Estonia", aliases: ["EE", "EST"], sourceCode: "EE", labelPoint: { longitude: 25.5, latitude: 58.6 } },
  FIN: { name: "Finland", aliases: ["FI", "FIN"], sourceCode: "FI", labelPoint: { longitude: 26, latitude: 64.5 } },
  FRA: { name: "France", aliases: ["FR", "FRA"], sourceCode: "FR", labelPoint: { longitude: 2, latitude: 46.4 } },
  DEU: { name: "Germany", aliases: ["DE", "DEU"], sourceCode: "DE", labelPoint: { longitude: 10.4, latitude: 51 } },
  GRC: { name: "Greece", aliases: ["GR", "GRC", "Hellas"], sourceCode: "EL", labelPoint: { longitude: 22.3, latitude: 39.2 } },
  VAT: { name: "Vatican City", aliases: ["VA", "VAT", "Holy See", "Vatican"], sourceCode: "VA", labelPoint: { longitude: 12.4534, latitude: 41.903 }, microstate: true },
  HUN: { name: "Hungary", aliases: ["HU", "HUN"], sourceCode: "HU", labelPoint: { longitude: 19.3, latitude: 47.2 } },
  ISL: { name: "Iceland", aliases: ["IS", "ISL"], sourceCode: "IS", labelPoint: { longitude: -18.6, latitude: 64.9 } },
  IRL: { name: "Ireland", aliases: ["IE", "IRL", "Republic of Ireland"], sourceCode: "IE", labelPoint: { longitude: -8, latitude: 53.2 } },
  ITA: { name: "Italy", aliases: ["IT", "ITA"], sourceCode: "IT", labelPoint: { longitude: 12.6, latitude: 42.8 } },
  LVA: { name: "Latvia", aliases: ["LV", "LVA"], sourceCode: "LV", labelPoint: { longitude: 24.6, latitude: 57 } },
  LIE: { name: "Liechtenstein", aliases: ["LI", "LIE"], sourceCode: "LI", labelPoint: { longitude: 9.55, latitude: 47.16 }, microstate: true },
  LTU: { name: "Lithuania", aliases: ["LT", "LTU"], sourceCode: "LT", labelPoint: { longitude: 23.9, latitude: 55.2 } },
  LUX: { name: "Luxembourg", aliases: ["LU", "LUX"], sourceCode: "LU", labelPoint: { longitude: 6.13, latitude: 49.78 } },
  MLT: { name: "Malta", aliases: ["MT", "MLT"], sourceCode: "MT", labelPoint: { longitude: 14.43, latitude: 35.89 } },
  MDA: { name: "Moldova", aliases: ["MD", "MDA", "Republic of Moldova"], sourceCode: "MD", labelPoint: { longitude: 28.5, latitude: 47.2 } },
  MCO: { name: "Monaco", aliases: ["MC", "MCO"], sourceCode: "MC", labelPoint: { longitude: 7.42, latitude: 43.74 }, microstate: true },
  MNE: { name: "Montenegro", aliases: ["ME", "MNE"], sourceCode: "ME", labelPoint: { longitude: 19.25, latitude: 42.75 } },
  NLD: { name: "Netherlands", aliases: ["NL", "NLD", "Holland"], sourceCode: "NL", labelPoint: { longitude: 5.4, latitude: 52.2 } },
  MKD: { name: "North Macedonia", aliases: ["MK", "MKD", "Macedonia"], sourceCode: "MK", labelPoint: { longitude: 21.7, latitude: 41.6 } },
  NOR: { name: "Norway", aliases: ["NO", "NOR"], sourceCode: "NO", labelPoint: { longitude: 9, latitude: 62 } },
  POL: { name: "Poland", aliases: ["PL", "POL"], sourceCode: "PL", labelPoint: { longitude: 19.2, latitude: 52 } },
  PRT: { name: "Portugal", aliases: ["PT", "PRT"], sourceCode: "PT", labelPoint: { longitude: -8, latitude: 39.7 } },
  ROU: { name: "Romania", aliases: ["RO", "ROU"], sourceCode: "RO", labelPoint: { longitude: 24.9, latitude: 45.8 } },
  RUS: { name: "Russia", aliases: ["RU", "RUS", "Russian Federation"], sourceCode: "RU", labelPoint: { longitude: 37, latitude: 56 } },
  SMR: { name: "San Marino", aliases: ["SM", "SMR"], sourceCode: "SM", labelPoint: { longitude: 12.46, latitude: 43.94 }, microstate: true },
  SRB: { name: "Serbia", aliases: ["RS", "SRB"], sourceCode: "RS", labelPoint: { longitude: 20.8, latitude: 44 } },
  SVK: { name: "Slovakia", aliases: ["SK", "SVK"], sourceCode: "SK", labelPoint: { longitude: 19.5, latitude: 48.7 } },
  SVN: { name: "Slovenia", aliases: ["SI", "SVN"], sourceCode: "SI", labelPoint: { longitude: 14.9, latitude: 46.1 } },
  ESP: { name: "Spain", aliases: ["ES", "ESP"], sourceCode: "ES", labelPoint: { longitude: -3.5, latitude: 40.2 } },
  SWE: { name: "Sweden", aliases: ["SE", "SWE"], sourceCode: "SE", labelPoint: { longitude: 16, latitude: 62 } },
  CHE: { name: "Switzerland", aliases: ["CH", "CHE", "Swiss Confederation"], sourceCode: "CH", labelPoint: { longitude: 8.2, latitude: 46.8 } },
  UKR: { name: "Ukraine", aliases: ["UA", "UKR"], sourceCode: "UA", labelPoint: { longitude: 31.3, latitude: 49 } },
  GBR: { name: "United Kingdom", aliases: ["GB", "GBR", "UK", "Great Britain", "Britain"], sourceCode: "UK", labelPoint: { longitude: -2.7, latitude: 54.4 } },
};

export const EUROPE_COUNTRIES_DATASET = {
  id: "europe-countries",
  version: "un-m49-gisco-2024-land-borders-v1",
  label: "Europe",
  placeKind: "country",
  places: EUROPE_COUNTRY_CODES.map((id) => ({
    id,
    name: EUROPE_COUNTRY_DEFINITIONS[id].name,
    aliases: EUROPE_COUNTRY_DEFINITIONS[id].aliases,
    polygon: { source: "GISCO Countries 2024", featureId: EUROPE_COUNTRY_DEFINITIONS[id].sourceCode },
    labelPoint: EUROPE_COUNTRY_DEFINITIONS[id].labelPoint,
    terrestrialNeighbors: EUROPE_LAND_BORDERS[id],
    gameRegion: "Europe" as const,
  })),
} satisfies GeographyDataset<EuropeCountryCode>;

export const EUROPE_COUNTRY_BY_CODE = new Map(EUROPE_COUNTRIES_DATASET.places.map((country) => [country.id, country] as const));
export const EUROPE_MICROSTATE_CODES = EUROPE_COUNTRY_CODES.filter((code) => EUROPE_COUNTRY_DEFINITIONS[code].microstate);

const EUROPE_COUNTRY_CODE_SET = new Set<string>(EUROPE_COUNTRY_CODES);
const EUROPE_COUNTRY_BY_INPUT = new Map<string, EuropeCountryCode>();
for (const country of EUROPE_COUNTRIES_DATASET.places) {
  for (const value of [country.name, country.id, ...country.aliases]) {
    EUROPE_COUNTRY_BY_INPUT.set(value.trim().replace(/\s+/g, " ").toLowerCase(), country.id);
  }
}

export function isEuropeCountryCode(value: string): value is EuropeCountryCode {
  return EUROPE_COUNTRY_CODE_SET.has(value);
}

export function findEuropeCountry(input: string) {
  const normalized = input.trim().replace(/\s+/g, " ").toLowerCase();
  const code = EUROPE_COUNTRY_BY_INPUT.get(normalized);
  return code ? EUROPE_COUNTRY_BY_CODE.get(code) ?? null : null;
}
