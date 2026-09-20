# Europe Border Hunt beta

Status: local beta implementation. This document applies the existing `GeoTrail_Border_Hunt_World_Rules_v1.md` contract; it does not amend that contract.

## Authoritative roster

The playable roster is the intersection of:

1. GeoTrail's 195-country world roster (193 UN member states plus the Holy See and the State of Palestine), and
2. the United Nations Statistics Division M49 Europe region.

That produces 44 playable countries:

Albania, Andorra, Austria, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Vatican City (Holy See), Hungary, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Moldova, Monaco, Montenegro, Netherlands, North Macedonia, Norway, Poland, Portugal, Romania, Russia, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Ukraine, and the United Kingdom.

M49 places Russia in Europe. It places Armenia, Azerbaijan, Cyprus, Georgia, Kazakhstan, and Türkiye in Asia, so they are outside this Europe beta even where a land border touches a playable country.

## Playability and components

All 44 roster countries are accepted guesses and shown on the map. Mystery targets are limited to the 40-country primary terrestrial component so every round can be solved entirely by the existing shortest-connection engine.

- Iceland and Malta are isolated under a strict land-border rule.
- Ireland and the United Kingdom form a real two-country land component.
- Those four countries are guess-only during the beta. A guess from outside the target's component correctly reports that no continuous route exists.
- There are no reviewed gateway connections in this release, so none were added.

## Boundary and adjacency sources

- Roster classification: [UN Statistics Division M49](https://unstats.un.org/unsd/methodology/m49/).
- Display polygons: [Eurostat GISCO Countries 2024](https://gisco-services.ec.europa.eu/distribution/v2/countries/countries-2024-files.html), 1:10 million, WGS 84 / EPSG:4326.
- Adjacency basis: GISCO 2024 inland international boundaries, curated into a reviewed symmetric edge list. A polygon touch is never promoted automatically into a game connection.
- Secondary review reference: [EuroGeographics EuroGlobalMap](https://www.mapsforeurope.org/datasets/euro-global-map). It is a cross-check, not the roster authority, because its coverage differs from GeoTrail's world roster.

The reproducible polygon fetch lives in `scripts/build-europe-geography.mjs`. Source metadata lives in `data/geography/europe/sources.json`.

GISCO's administrative-boundary terms require visible attribution and restrict this downloaded dataset to non-commercial use. The beta map displays `© EuroGeographics for the administrative boundaries` beside the map and in the page footer. A commercial release requires an appropriate EuroGeographics licence or a replacement polygon source. The blocking technical/legal work and closure criteria are tracked in [`GISCO_COMMERCIAL_USE_FOLLOW_UP.md`](./GISCO_COMMERCIAL_USE_FOLLOW_UP.md).

## Edge-case policy

### Microstates

Andorra, Liechtenstein, Monaco, San Marino, and Vatican City are full playable countries and mystery targets. The map adds minimum-size interaction markers at their geographic label points so their tiny polygons remain keyboard- and pointer-accessible. Their land borders are ordinary graph edges.

### Islands and non-land-connected countries

Water crossings do not count. Iceland and Malta therefore have no edges. Ireland–United Kingdom is retained because it is a real land border, but that two-country component is not used for beta targets. No ferry, bridge, tunnel, or proximity gateway is inferred.

### Enclaves and exclaves

Real internationally recognized land boundaries count regardless of whether they belong to the main body of a country. Kaliningrad therefore gives Russia land edges with Lithuania and Poland. Enclaved microstates connect to their surrounding country. Overseas territories do not create an edge for the sovereign state in the European game graph: for example, there is no France–Brazil, Spain–Morocco, or United Kingdom–Spain edge.

### Disputed territories

The beta does not add separate playable disputed-territory nodes. Kosovo is not a roster node under this M49-based policy. GISCO's inland-boundary layer attributes Kosovo-derived external boundaries to Serbia, producing Serbia–Albania and Serbia–North Macedonia candidates; the beta explicitly excludes both rather than silently turning disputed geometry into game edges. Crimea and other disputed areas are not separate nodes and do not alter the curated sovereign-country adjacency list. The display polygons are source data, while the graph remains the reviewed game authority.

### Transcontinental countries

M49 placement controls roster membership rather than an ad hoc longitude rule. Russia is included. Türkiye, Cyprus, Armenia, Azerbaijan, Georgia, and Kazakhstan are excluded from this Europe roster. A border with an excluded country does not create a playable connection.

### Point contacts

A point-only contact is not a land-border edge. This matches the world-rules contract and prevents accidental connections produced by generalized polygons.

## Easy Mode direction

Europe Easy Mode computes the initial great-circle bearing from the selected country's maintained WGS84 gameplay anchor to the mystery country's anchor, then quantizes it to N, NE, E, SE, S, SW, W, or NW. This compass hint is additional feedback only: it does not change the border graph, shortest-path distance, heat scale, or bordering-country result.

The U.S. game intentionally does not receive directional hints in this milestone, so its established behavior remains unchanged.

## Data invariants

- 44 unique roster IDs.
- 40 mystery-target IDs in one connected component.
- 44 GISCO country features.
- Symmetric land-border adjacency with no unknown IDs or self edges.
- Five explicit microstate hit targets.
- No gateway edges.
