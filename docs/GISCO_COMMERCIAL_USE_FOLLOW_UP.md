# GISCO commercial-use follow-up

Status: **Open — blocks GeoTrail monetization and commercial distribution**

This is a technical release gate and provenance record, not legal advice. It must be resolved before GeoTrail, Europe Border Hunt, or any bundle containing the Europe map is monetized or distributed commercially.

## Why this follow-up exists

Europe Border Hunt currently uses country polygons downloaded from Eurostat GISCO Countries 2024 and adjacency decisions reviewed against GISCO inland international boundaries.

The official GISCO administrative-units page states that downloaded data may not be used for commercial purposes, requires visible source acknowledgement, and directs prospective commercial users to EuroGeographics for licence information:

- Usage and copyright terms: <https://ec.europa.eu/eurostat/web/gisco/geodata/administrative-units>
- Countries 2024 distribution: <https://gisco-services.ec.europa.eu/distribution/v2/countries/countries-2024-files.html>
- EuroGeographics: <https://eurogeographics.org/>

The current beta includes the required visible `© EuroGeographics for the administrative boundaries` acknowledgement. Attribution alone does not grant commercial-use permission.

## Affected repository artifacts

Treat the following as GISCO-derived or GISCO-reviewed until a replacement or written commercial permission is documented:

- `data/geography/europe/countries.geo.json`
- `data/geography/europe/map.ts`
- `data/geography/europe/borders.ts`
- `data/geography/europe/sources.json`
- `scripts/build-europe-geography.mjs`
- rendered Europe boundary shapes and static-export assets produced from those files

The UN M49 roster policy and the generic typed geography/connection engine are separate from the GISCO polygon licence, but any regenerated dataset must preserve their tested contracts.

## Required resolution before commercial use

Complete one of these paths:

### Option A — verify and obtain commercial permission

Obtain written confirmation or a licence from EuroGeographics that covers GeoTrail's intended use, including:

- an interactive web game;
- embedded, simplified, or otherwise derived vector geometry;
- client-side delivery and static-export redistribution;
- the intended countries and distribution territories;
- the intended business model, such as advertising, subscriptions, sponsorship, paid access, or bundling.

Record the licence owner, covered product/version, effective dates, attribution requirements, redistribution constraints, and where the signed evidence is retained. Do not commit confidential licence documents to this public repository.

### Option B — replace the GISCO-derived material

Choose a boundary and adjacency source whose licence has been reviewed for the intended commercial use. Then:

1. replace the downloaded geometry and generated map paths;
2. independently rebuild or re-verify every land-border edge, including disputed-boundary overrides;
3. update `sources.json`, the build script, visible attribution, and Europe beta documentation;
4. rerun roster, alias, symmetry, connectivity, heat-distance, direction, microstate, and browser regression checks;
5. confirm that no GISCO-derived geometry remains in shipped source files, generated files, caches, or static-export assets.

## Closure criteria

This follow-up may be marked resolved only when all of the following are recorded in a reviewed change:

- the chosen licence or replacement source and its exact version;
- confirmation that commercial web delivery and redistribution are permitted;
- an updated artifact-level provenance inventory;
- required attribution and notice text in the product and documentation;
- regenerated outputs where applicable;
- passing tests, type-check, lint, production build, static-export checks, and Europe/U.S./Clue Ladder browser regressions;
- an explicit product/legal approval to remove the commercial-release block.

Until then, Europe Border Hunt may be treated only as a non-commercial beta under the documented GISCO conditions.
