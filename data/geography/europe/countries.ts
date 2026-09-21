import generatedGeography from "./countries.generated.json";
import { EUROPE_COUNTRY_CODES, EUROPE_LAND_BORDERS, type EuropeCountryCode } from "./borders";
import type { GeographyDataset, GeographicPoint } from "@/lib/geography/types";

type CountryDetails = {
  name: string;
  aliases: readonly string[];
  microstate?: boolean;
};

type GeneratedCountryGeography = {
  featureId: string;
  sourceName: string;
  centroid: GeographicPoint;
  labelPoint: GeographicPoint;
};

type CountryDefinition = CountryDetails & GeneratedCountryGeography;

const COUNTRY_DETAILS: Readonly<Record<EuropeCountryCode, CountryDetails>> = {
  ALB: { name: "Albania", aliases: ["AL", "ALB"] },
  AND: { name: "Andorra", aliases: ["AD", "AND"], microstate: true },
  AUT: { name: "Austria", aliases: ["AT", "AUT"] },
  BLR: { name: "Belarus", aliases: ["BY", "BLR"] },
  BEL: { name: "Belgium", aliases: ["BE", "BEL"] },
  BIH: { name: "Bosnia and Herzegovina", aliases: ["BA", "BIH", "Bosnia", "Bosnia & Herzegovina"] },
  BGR: { name: "Bulgaria", aliases: ["BG", "BGR"] },
  HRV: { name: "Croatia", aliases: ["HR", "HRV"] },
  CZE: { name: "Czechia", aliases: ["CZ", "CZE", "Czech Republic"] },
  DNK: { name: "Denmark", aliases: ["DK", "DNK"] },
  EST: { name: "Estonia", aliases: ["EE", "EST"] },
  FIN: { name: "Finland", aliases: ["FI", "FIN"] },
  FRA: { name: "France", aliases: ["FR", "FRA"] },
  DEU: { name: "Germany", aliases: ["DE", "DEU"] },
  GRC: { name: "Greece", aliases: ["GR", "GRC", "Hellas"] },
  VAT: { name: "Vatican City", aliases: ["VA", "VAT", "Holy See", "Vatican"], microstate: true },
  HUN: { name: "Hungary", aliases: ["HU", "HUN"] },
  ISL: { name: "Iceland", aliases: ["IS", "ISL"] },
  IRL: { name: "Ireland", aliases: ["IE", "IRL", "Republic of Ireland"] },
  ITA: { name: "Italy", aliases: ["IT", "ITA"] },
  LVA: { name: "Latvia", aliases: ["LV", "LVA"] },
  LIE: { name: "Liechtenstein", aliases: ["LI", "LIE"], microstate: true },
  LTU: { name: "Lithuania", aliases: ["LT", "LTU"] },
  LUX: { name: "Luxembourg", aliases: ["LU", "LUX"] },
  MLT: { name: "Malta", aliases: ["MT", "MLT"] },
  MDA: { name: "Moldova", aliases: ["MD", "MDA", "Republic of Moldova"] },
  MCO: { name: "Monaco", aliases: ["MC", "MCO"], microstate: true },
  MNE: { name: "Montenegro", aliases: ["ME", "MNE"] },
  NLD: { name: "Netherlands", aliases: ["NL", "NLD", "Holland"] },
  MKD: { name: "North Macedonia", aliases: ["MK", "MKD", "Macedonia"] },
  NOR: { name: "Norway", aliases: ["NO", "NOR"] },
  POL: { name: "Poland", aliases: ["PL", "POL"] },
  PRT: { name: "Portugal", aliases: ["PT", "PRT"] },
  ROU: { name: "Romania", aliases: ["RO", "ROU"] },
  RUS: { name: "Russia", aliases: ["RU", "RUS", "Russian Federation"] },
  SMR: { name: "San Marino", aliases: ["SM", "SMR"], microstate: true },
  SRB: { name: "Serbia", aliases: ["RS", "SRB"] },
  SVK: { name: "Slovakia", aliases: ["SK", "SVK"] },
  SVN: { name: "Slovenia", aliases: ["SI", "SVN"] },
  ESP: { name: "Spain", aliases: ["ES", "ESP"] },
  SWE: { name: "Sweden", aliases: ["SE", "SWE"] },
  CHE: { name: "Switzerland", aliases: ["CH", "CHE", "Swiss Confederation"] },
  UKR: { name: "Ukraine", aliases: ["UA", "UKR"] },
  GBR: { name: "United Kingdom", aliases: ["GB", "GBR", "UK", "Great Britain", "Britain"] },
};

const GENERATED_COUNTRIES = generatedGeography.countries as Readonly<
  Record<EuropeCountryCode, GeneratedCountryGeography>
>;

export const EUROPE_COUNTRY_DEFINITIONS = Object.fromEntries(
  EUROPE_COUNTRY_CODES.map((code) => [
    code,
    { ...COUNTRY_DETAILS[code], ...GENERATED_COUNTRIES[code] },
  ]),
) as Readonly<Record<EuropeCountryCode, CountryDefinition>>;

export const EUROPE_COUNTRIES_DATASET = {
  id: "europe-countries",
  version: generatedGeography.datasetVersion,
  label: "Europe",
  placeKind: "country",
  places: EUROPE_COUNTRY_CODES.map((id) => ({
    id,
    name: EUROPE_COUNTRY_DEFINITIONS[id].name,
    aliases: EUROPE_COUNTRY_DEFINITIONS[id].aliases,
    polygon: {
      source: "Natural Earth Admin 0 Countries 1:10m v5.1.1",
      featureId: EUROPE_COUNTRY_DEFINITIONS[id].featureId,
    },
    centroid: EUROPE_COUNTRY_DEFINITIONS[id].centroid,
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
