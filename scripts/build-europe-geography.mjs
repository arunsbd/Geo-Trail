import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sourceByCountry = {
  ALB: "AL", AND: "AD", AUT: "AT", BLR: "BY", BEL: "BE", BIH: "BA", BGR: "BG",
  HRV: "HR", CZE: "CZ", DNK: "DK", EST: "EE", FIN: "FI", FRA: "FR", DEU: "DE",
  GRC: "EL", VAT: "VA", HUN: "HU", ISL: "IS", IRL: "IE", ITA: "IT", LVA: "LV",
  LIE: "LI", LTU: "LT", LUX: "LU", MLT: "MT", MDA: "MD", MCO: "MC", MNE: "ME",
  NLD: "NL", MKD: "MK", NOR: "NO", POL: "PL", PRT: "PT", ROU: "RO", RUS: "RU",
  SMR: "SM", SRB: "RS", SVK: "SK", SVN: "SI", ESP: "ES", SWE: "SE", CHE: "CH",
  UKR: "UA", GBR: "UK",
};

const here = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(here, "../data/geography/europe/countries.geo.json");
const baseUrl = "https://gisco-services.ec.europa.eu/distribution/v2/countries/distribution";

async function fetchCountry(countryCode, sourceCode) {
  const url = `${baseUrl}/${sourceCode}-region-10m-4326-2024.geojson`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);

  const collection = await response.json();
  if (collection.type !== "FeatureCollection" || collection.features.length === 0) {
    throw new Error(`Unexpected GISCO response for ${countryCode}`);
  }

  return collection.features.map((feature) => ({
    type: "Feature",
    id: countryCode,
    properties: {
      code: countryCode,
      sourceCode,
      sourceName: feature.properties?.NAME_ENGL ?? feature.properties?.CNTR_NAME ?? countryCode,
    },
    geometry: feature.geometry,
  }));
}

const featureGroups = await Promise.all(
  Object.entries(sourceByCountry).map(([countryCode, sourceCode]) => fetchCountry(countryCode, sourceCode)),
);

const output = {
  type: "FeatureCollection",
  source: "Eurostat GISCO Countries 2024, 1:10 million, EPSG:4326",
  sourceUrl: "https://gisco-services.ec.europa.eu/distribution/v2/countries/countries-2024-files.html",
  generatedAt: new Date().toISOString(),
  features: featureGroups.flat(),
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output)}\n`, "utf8");
console.log(`Wrote ${output.features.length} GISCO features to ${outputPath}`);
