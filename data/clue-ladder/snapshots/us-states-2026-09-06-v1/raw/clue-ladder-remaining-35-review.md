# GeoTrail Clue Ladder — remaining 35 states

Prepared 2026-09-06. Research review only; no repository snapshot, clue set, UI, or manifest was modified. The existing Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, and Rhode Island records are excluded.

## Scope and nationwide sources

Covered here: Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming.

Candidate evaluation uses all 50 states. Nationwide inputs are Census Vintage 2025 state and incorporated-place estimates, Census 2010 land area and state guides, USGS elevations, 49 CFR part 71, USPS abbreviations, the project's formal-National-Park table, and a same-day closed snapshot of all 50 NPS state pages. The companion JSON inventories all 150 new state-level source files with URLs and SHA-256 hashes, plus the reused repository tables.

Status: every clue remains `draft` pending human wording/fairness approval. Boundary and visual clues carry explicit publication blockers. No missing value is treated as false or zero.

## Florida (`US-FL`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Florida; FL; FIPS 12 | Census guide; USPS; static |

| Capital and admission | Tallahassee; March 3, 1845 (27th) | Census guide; static |

| Population | 23,462,518; rank 3 | Census Vintage 2025; 2025-07-01 |

| Land area | 53,625 sq mi; rank 26 | Census 2010; rank derived across 50 states |

| Highest point | Britton Hill; 345 ft | USGS; static |

| Standard time | Eastern, Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AL, GA; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 3; biscayne-national-park, dry-tortugas-national-park, everglades-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Jacksonville city, Florida 1,017,689; Miami city, Florida 489,812 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Everglades National Park is here. | https://www.nps.gov/ever/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `fl.population.20000000-35000000` | About 20 million–35 million people lived here in 2025. | population | `population.resident_estimate between [20000000,35000000)` | FL, NY, TX (3) | T3/general/indirect | 1–4 / `FL:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `fl.area.rank-26-30` | It ranks 26th–30th in land area. (2010 Census) | area | `area.land_rank between [26,31)` | AL, AR, FL, NC, NY (5) | T4/specialized/indirect | 1–4 / `FL:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `fl.highpoint.0-1000` | Its highest point is 0–1,000 feet high. | physical_geography | `physical.highest_point between [0,1000)` | DE, FL, LA, MS, RI (5) | T3/general/indirect | 2–5 / `FL:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `fl.time.eastern-central` | Parts use Eastern and Central Time. | time_zone | `time.standard_zone eq ["Eastern", "Central"]` | FL, IN, KY, MI, TN (5) | T4/general/indirect | 1–4 / `FL:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `fl.parks.formal-3` | It has 3 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 3` | AZ, FL, WA (3) | T4/specialized/indirect | 1–4 / `FL:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `fl.history.1840s` | It became a state in the 1840s. | history | `history.admission_year between [1840,1850)` | FL, IA, TX, WI (4) | T3/general/indirect | 1–4 / `FL:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/florida.html |

| `fl.history.order-21-30` | It joined the Union between the 21st and 30th states. | history | `history.admission_order between [21,31)` | AL, AR, FL, IA, IL, ME, MI, MO, TX, WI (10) | T4/specialized/indirect | 2–5 / `FL:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/florida.html |

| `fl.borders.segment-count-2` | It shares boundary segments with 2 states. | borders | `boundary.shared_segments count_eq 2` | FL, RI, SC, WA (4) | T3/general/indirect | 2–5 / `FL:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-FL |

| `fl.nps.everglades` | Everglades National Park is here. | landmark | `nps.associated_unit_path contains /ever/` | FL (1) | T2/general/one_to_one | 5–6 / `FL:nps:ever` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/ever/ |

| `fl.places.top-two-2025` | Jacksonville and Miami were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Jacksonville city, Florida", "Miami city, Florida"]` | FL (1) | T2/general/one_to_one | 5–6 / `FL:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-12.xlsx |

| `fl.capital.tallahassee` | Its capital is Tallahassee. | capital | `identity.capital eq "Tallahassee"` | FL (1) | T2/general/one_to_one | 5–6 / `FL:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/florida.html |

| `fl.postal` | Its postal abbreviation is FL. | abbreviation | `identity.postal_code eq "FL"` | FL (1) | T1/iconic/direct_identifier | 7–7 / `FL:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `fl.silhouette` | image | silhouette | `identity.postal_code eq "FL"` | FL (1) | T1/general/direct_identifier | 7–7 / `FL:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `fl.locator` | map | map_position | `identity.postal_code eq "FL"` | FL (1) | T1/general/direct_identifier | 7–7 / `FL:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `area.rank-26-30 → history.order-21-30 → population.20000000-35000000 → highpoint.0-1000 → nps.everglades → places.top-two-2025 → postal`. Cumulative candidates: **5 → 3 → 1 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.

## Georgia (`US-GA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Georgia; GA; FIPS 13 | Census guide; USPS; static |

| Capital and admission | Atlanta; January 2, 1788 (4th) | Census guide; static |

| Population | 11,302,748; rank 8 | Census Vintage 2025; 2025-07-01 |

| Land area | 57,513 sq mi; rank 21 | Census 2010; rank derived across 50 states |

| Highest point | Brasstown Bald; 4,784 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AL, FL, NC, SC, TN; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Atlanta city, Georgia 529,110; Columbus city, Georgia 202,171 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Martin Luther King, Jr. National Historical Park is here. | https://www.nps.gov/malu/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `ga.population.9000000-12000000` | About 9 million–12 million people lived here in 2025. | population | `population.resident_estimate between [9000000,12000000)` | GA, MI, NC, NJ, OH (5) | T3/general/indirect | 1–4 / `GA:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `ga.area.rank-21-25` | It ranks 21st–25th in land area. (2010 Census) | area | `area.land_rank between [21,26)` | GA, IA, IL, MI, WI (5) | T4/specialized/indirect | 1–4 / `GA:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `ga.highpoint.4500-5000` | Its highest point is 4,500–5,000 feet high. | physical_geography | `physical.highest_point between [4500,5000)` | GA, OK, WV (3) | T3/general/indirect | 2–5 / `GA:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `ga.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `GA:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `ga.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `GA:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `ga.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `GA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/georgia.html |

| `ga.history.order-1-10` | It joined the Union between the 1st and 10th states. | history | `history.admission_order between [1,11)` | CT, DE, GA, MA, MD, NH, NJ, PA, SC, VA (10) | T4/specialized/indirect | 2–5 / `GA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/georgia.html |

| `ga.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `GA:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-GA |

| `ga.nps.martin-luther-king-jr` | Martin Luther King, Jr. National Historical Park is here. | landmark | `nps.associated_unit_path contains /malu/` | GA (1) | T2/general/one_to_one | 5–6 / `GA:nps:malu` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/malu/ |

| `ga.places.top-two-2025` | Atlanta and Columbus were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Atlanta city, Georgia", "Columbus city, Georgia"]` | GA (1) | T2/general/one_to_one | 5–6 / `GA:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-13.xlsx |

| `ga.capital.atlanta` | Its capital is Atlanta. | capital | `identity.capital eq "Atlanta"` | GA (1) | T2/general/one_to_one | 5–6 / `GA:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/georgia.html |

| `ga.postal` | Its postal abbreviation is GA. | abbreviation | `identity.postal_code eq "GA"` | GA (1) | T1/iconic/direct_identifier | 7–7 / `GA:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `ga.silhouette` | image | silhouette | `identity.postal_code eq "GA"` | GA (1) | T1/general/direct_identifier | 7–7 / `GA:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `ga.locator` | map | map_position | `identity.postal_code eq "GA"` | GA (1) | T1/general/direct_identifier | 7–7 / `GA:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → history.1780s → population.9000000-12000000 → parks.formal-0 → nps.martin-luther-king-jr → places.top-two-2025 → postal`. Cumulative candidates: **17 → 12 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Hawaii (`US-HI`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Hawaii; HI; FIPS 15 | Census guide; USPS; static |

| Capital and admission | Honolulu; August 21, 1959 (50th) | Census guide; static |

| Population | 1,432,820; rank 40 | Census Vintage 2025; 2025-07-01 |

| Land area | 6,423 sq mi; rank 47 | Census 2010; rank derived across 50 states |

| Highest point | Pu'u Wēkiu, Mauna Kea; 13,796 ft | USGS; static |

| Standard time | Hawaii-Aleutian | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: none; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 2; haleakal-national-park, hawai-i-volcanoes-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | none; Hawaii has no incorporated places | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Pearl Harbor National Memorial is here. | https://www.nps.gov/valr/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `hi.population.1000000-1500000` | About 1 million–1.5 million people lived here in 2025. | population | `population.resident_estimate between [1000000,1500000)` | DE, HI, ME, MT, NH, RI (6) | T3/general/indirect | 1–4 / `HI:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `hi.area.rank-46-50` | It ranks 46th–50th in land area. (2010 Census) | area | `area.land_rank between [46,51)` | CT, DE, HI, NJ, RI (5) | T4/specialized/indirect | 1–4 / `HI:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `hi.highpoint.13500-14000` | Its highest point is 13,500–14,000 feet high. | physical_geography | `physical.highest_point between [13500,14000)` | HI, UT, WY (3) | T3/general/indirect | 2–5 / `HI:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `hi.time.hawaii-aleutian` | The whole state uses Hawaii-Aleutian Time. | time_zone | `time.standard_zone eq ["Hawaii-Aleutian"]` | HI (1) | T4/general/indirect | 1–4 / `HI:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `hi.parks.formal-2` | It has 2 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 2` | HI, MT, NM, NV, SD, TX, WY (7) | T4/specialized/indirect | 1–4 / `HI:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `hi.history.1950s` | It became a state in the 1950s. | history | `history.admission_year between [1950,1960)` | AK, HI (2) | T3/general/indirect | 1–4 / `HI:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/hawaii.html |

| `hi.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `HI:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/hawaii.html |

| `hi.borders.segment-count-0` | It shares boundary segments with 0 states. | borders | `boundary.shared_segments count_eq 0` | AK, HI (2) | T3/general/indirect | 2–5 / `HI:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-HI |

| `hi.nps.pearl-harbor` | Pearl Harbor National Memorial is here. | landmark | `nps.associated_unit_path contains /valr/` | HI (1) | T2/general/one_to_one | 5–6 / `HI:nps:valr` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/valr/ |

| `hi.places.none-incorporated` | Census reports no incorporated places in this state. | cities | `place.incorporated_place_count eq 0` | HI (1) | T2/general/one_to_one | 5–6 / `HI:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-15.xlsx |

| `hi.capital.honolulu` | Its capital is Honolulu. | capital | `identity.capital eq "Honolulu"` | HI (1) | T2/general/one_to_one | 5–6 / `HI:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/hawaii.html |

| `hi.postal` | Its postal abbreviation is HI. | abbreviation | `identity.postal_code eq "HI"` | HI (1) | T1/iconic/direct_identifier | 7–7 / `HI:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `hi.silhouette` | image | silhouette | `identity.postal_code eq "HI"` | HI (1) | T1/general/direct_identifier | 7–7 / `HI:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `hi.locator` | map | map_position | `identity.postal_code eq "HI"` | HI (1) | T1/general/direct_identifier | 7–7 / `HI:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-2 → history.order-41-50 → population.1000000-1500000 → area.rank-46-50 → nps.pearl-harbor → places.none-incorporated → postal`. Cumulative candidates: **7 → 4 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Do not rank Urban Honolulu CDP as an incorporated place; Hawaii has no incorporated places.

## Idaho (`US-ID`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Idaho; ID; FIPS 16 | Census guide; USPS; static |

| Capital and admission | Boise; July 3, 1890 (43rd) | Census guide; static |

| Population | 2,029,733; rank 37 | Census Vintage 2025; 2025-07-01 |

| Land area | 82,643 sq mi; rank 11 | Census 2010; rank derived across 50 states |

| Highest point | Borah Peak; 12,662 ft | USGS; static |

| Standard time | Mountain, Pacific | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: MT, NV, OR, UT, WA, WY; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; yellowstone-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Boise City city, Idaho 238,429; Meridian city, Idaho 142,988 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Craters Of The Moon National Monument & Preserve is here. | https://www.nps.gov/crmo/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `id.population.1500000-2500000` | About 1.5 million–2.5 million people lived here in 2025. | population | `population.resident_estimate between [1500000,2500000)` | ID, NE, NM, WV (4) | T3/general/indirect | 1–4 / `ID:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `id.area.rank-11-15` | It ranks 11th–15th in land area. (2010 Census) | area | `area.land_rank between [11,16)` | ID, KS, MN, NE, UT (5) | T4/specialized/indirect | 1–4 / `ID:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `id.highpoint.11000-13000` | Its highest point is 11,000–13,000 feet high. | physical_geography | `physical.highest_point between [11000,13000)` | AZ, ID, MT, OR (4) | T3/general/indirect | 2–5 / `ID:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `id.time.mountain-pacific` | Parts use Mountain and Pacific Time. | time_zone | `time.standard_zone eq ["Mountain", "Pacific"]` | ID, NV, OR (3) | T4/general/indirect | 1–4 / `ID:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `id.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `ID:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `id.history.1890s` | It became a state in the 1890s. | history | `history.admission_year between [1890,1900)` | ID, UT, WY (3) | T3/general/indirect | 1–4 / `ID:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/idaho.html |

| `id.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `ID:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/idaho.html |

| `id.borders.segment-count-6` | It shares boundary segments with 6 states. | borders | `boundary.shared_segments count_eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T3/general/indirect | 2–5 / `ID:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-ID |

| `id.nps.craters-of-the-moon` | Craters Of The Moon National Monument & Preserve is here. | landmark | `nps.associated_unit_path contains /crmo/` | ID (1) | T2/general/one_to_one | 5–6 / `ID:nps:crmo` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/crmo/ |

| `id.places.top-two-2025` | Boise and Meridian were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Boise City city, Idaho", "Meridian city, Idaho"]` | ID (1) | T2/general/one_to_one | 5–6 / `ID:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-16.xlsx |

| `id.capital.boise` | Its capital is Boise. | capital | `identity.capital eq "Boise"` | ID (1) | T2/general/one_to_one | 5–6 / `ID:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/idaho.html |

| `id.postal` | Its postal abbreviation is ID. | abbreviation | `identity.postal_code eq "ID"` | ID (1) | T1/iconic/direct_identifier | 7–7 / `ID:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `id.silhouette` | image | silhouette | `identity.postal_code eq "ID"` | ID (1) | T1/general/direct_identifier | 7–7 / `ID:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `id.locator` | map | map_position | `identity.postal_code eq "ID"` | ID (1) | T1/general/direct_identifier | 7–7 / `ID:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-1 → highpoint.11000-13000 → time.mountain-pacific → population.1500000-2500000 → nps.craters-of-the-moon → places.top-two-2025 → postal`. Cumulative candidates: **17 → 2 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.
- International boundaries are stored separately from state-to-state segments.

## Illinois (`US-IL`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Illinois; IL; FIPS 17 | Census guide; USPS; static |

| Capital and admission | Springfield; December 3, 1818 (21st) | Census guide; static |

| Population | 12,719,141; rank 6 | Census Vintage 2025; 2025-07-01 |

| Land area | 55,519 sq mi; rank 24 | Census 2010; rank derived across 50 states |

| Highest point | Charles Mound; 1,235 ft | USGS; static |

| Standard time | Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: IA, IN, KY, MO, WI; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; gateway-arch-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Chicago city, Illinois 2,731,585; Aurora city, Illinois 181,505 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Lincoln Home National Historic Site is here. | https://www.nps.gov/liho/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `il.population.10000000-13000000` | About 10 million–13 million people lived here in 2025. | population | `population.resident_estimate between [10000000,13000000)` | GA, IL, MI, NC, OH (5) | T3/general/indirect | 1–4 / `IL:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `il.area.rank-21-25` | It ranks 21st–25th in land area. (2010 Census) | area | `area.land_rank between [21,26)` | GA, IA, IL, MI, WI (5) | T4/specialized/indirect | 1–4 / `IL:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `il.highpoint.500-1500` | Its highest point is 500–1,500 feet high. | physical_geography | `physical.highest_point between [500,1500)` | IL, IN, LA, MS, RI (5) | T3/general/indirect | 2–5 / `IL:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `il.time.central` | The whole state uses Central Time. | time_zone | `time.standard_zone eq ["Central"]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 / `IL:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `il.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `IL:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `il.history.1810s` | It became a state in the 1810s. | history | `history.admission_year between [1810,1820)` | AL, IL, IN, LA, MS (5) | T3/general/indirect | 1–4 / `IL:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/illinois.html |

| `il.history.order-21-30` | It joined the Union between the 21st and 30th states. | history | `history.admission_order between [21,31)` | AL, AR, FL, IA, IL, ME, MI, MO, TX, WI (10) | T4/specialized/indirect | 2–5 / `IL:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/illinois.html |

| `il.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `IL:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-IL |

| `il.nps.lincoln-home` | Lincoln Home National Historic Site is here. | landmark | `nps.associated_unit_path contains /liho/` | IL (1) | T2/general/one_to_one | 5–6 / `IL:nps:liho` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/liho/ |

| `il.places.top-two-2025` | Chicago and Aurora were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Chicago city, Illinois", "Aurora city, Illinois"]` | IL (1) | T2/general/one_to_one | 5–6 / `IL:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-17.xlsx |

| `il.capital.springfield` | Its capital is Springfield. | capital | `identity.capital eq "Springfield"` | IL (1) | T2/general/one_to_one | 5–6 / `IL:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/illinois.html |

| `il.postal` | Its postal abbreviation is IL. | abbreviation | `identity.postal_code eq "IL"` | IL (1) | T1/iconic/direct_identifier | 7–7 / `IL:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `il.silhouette` | image | silhouette | `identity.postal_code eq "IL"` | IL (1) | T1/general/direct_identifier | 7–7 / `IL:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `il.locator` | map | map_position | `identity.postal_code eq "IL"` | IL (1) | T1/general/direct_identifier | 7–7 / `IL:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-1 → history.order-21-30 → population.10000000-13000000 → area.rank-21-25 → nps.lincoln-home → places.top-two-2025 → postal`. Cumulative candidates: **17 → 5 → 2 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Indiana (`US-IN`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Indiana; IN; FIPS 18 | Census guide; USPS; static |

| Capital and admission | Indianapolis; December 11, 1816 (19th) | Census guide; static |

| Population | 6,973,333; rank 17 | Census Vintage 2025; 2025-07-01 |

| Land area | 35,826 sq mi; rank 38 | Census 2010; rank derived across 50 states |

| Highest point | Hoosier Hill; 1,257 ft | USGS; static |

| Standard time | Eastern, Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: IL, KY, MI, OH; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; indiana-dunes-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Indianapolis city (balance), Indiana 901,116; Fort Wayne city, Indiana 275,203 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Indiana Dunes National Park is here. | https://www.nps.gov/indu/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `in.population.6000000-8000000` | About 6 million–8 million people lived here in 2025. | population | `population.resident_estimate between [6000000,8000000)` | AZ, CO, IN, MA, MD, MO, TN (7) | T3/general/indirect | 1–4 / `IN:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `in.area.rank-36-40` | It ranks 36th–40th in land area. (2010 Census) | area | `area.land_rank between [36,41)` | IN, KY, ME, SC, VA (5) | T4/specialized/indirect | 1–4 / `IN:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `in.highpoint.500-1500` | Its highest point is 500–1,500 feet high. | physical_geography | `physical.highest_point between [500,1500)` | IL, IN, LA, MS, RI (5) | T3/general/indirect | 2–5 / `IN:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `in.time.eastern-central` | Parts use Eastern and Central Time. | time_zone | `time.standard_zone eq ["Eastern", "Central"]` | FL, IN, KY, MI, TN (5) | T4/general/indirect | 1–4 / `IN:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `in.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `IN:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `in.history.1810s` | It became a state in the 1810s. | history | `history.admission_year between [1810,1820)` | AL, IL, IN, LA, MS (5) | T3/general/indirect | 1–4 / `IN:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/indiana.html |

| `in.history.order-11-20` | It joined the Union between the 11th and 20th states. | history | `history.admission_order between [11,21)` | IN, KY, LA, MS, NC, NY, OH, RI, TN, VT (10) | T4/specialized/indirect | 2–5 / `IN:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/indiana.html |

| `in.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `IN:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-IN |

| `in.nps.indiana-dunes` | Indiana Dunes National Park is here. | landmark | `nps.associated_unit_path contains /indu/` | IN (1) | T2/general/one_to_one | 5–6 / `IN:nps:indu` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/indu/ |

| `in.places.top-two-2025` | Indianapolis and Fort Wayne were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Indianapolis city (balance), Indiana", "Fort Wayne city, Indiana"]` | IN (1) | T2/general/one_to_one | 5–6 / `IN:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-18.xlsx |

| `in.capital.indianapolis` | Its capital is Indianapolis. | capital | `identity.capital eq "Indianapolis"` | IN (1) | T2/general/one_to_one | 5–6 / `IN:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/indiana.html |

| `in.postal` | Its postal abbreviation is IN. | abbreviation | `identity.postal_code eq "IN"` | IN (1) | T1/iconic/direct_identifier | 7–7 / `IN:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `in.silhouette` | image | silhouette | `identity.postal_code eq "IN"` | IN (1) | T1/general/direct_identifier | 7–7 / `IN:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `in.locator` | map | map_position | `identity.postal_code eq "IN"` | IN (1) | T1/general/direct_identifier | 7–7 / `IN:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-1 → history.order-11-20 → time.eastern-central → population.6000000-8000000 → nps.indiana-dunes → places.top-two-2025 → postal`. Cumulative candidates: **17 → 5 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.
- Keep consolidated-government legal labels in normalized place facts even when player wording is shortened.

## Massachusetts (`US-MA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Massachusetts; MA; FIPS 25 | Census guide; USPS; static |

| Capital and admission | Boston; February 6, 1788 (6th) | Census guide; static |

| Population | 7,154,084; rank 16 | Census Vintage 2025; 2025-07-01 |

| Land area | 7,800 sq mi; rank 45 | Census 2010; rank derived across 50 states |

| Highest point | Mount Greylock; 3,491 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: CT, NH, NY, RI, VT; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Boston city, Massachusetts 672,973; Worcester city, Massachusetts 213,862 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Minute Man National Historical Park is here. | https://www.nps.gov/mima/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `ma.population.7000000-9000000` | About 7 million–9 million people lived here in 2025. | population | `population.resident_estimate between [7000000,9000000)` | AZ, MA, TN, VA, WA (5) | T3/general/indirect | 1–4 / `MA:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `ma.area.rank-41-45` | It ranks 41st–45th in land area. (2010 Census) | area | `area.land_rank between [41,46)` | MA, MD, NH, VT, WV (5) | T4/specialized/indirect | 1–4 / `MA:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `ma.highpoint.2500-3500` | Its highest point is 2,500–3,500 feet high. | physical_geography | `physical.highest_point between [2500,3500)` | AR, MA, MD, PA (4) | T3/general/indirect | 2–5 / `MA:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `ma.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `MA:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `ma.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `MA:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `ma.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `MA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/massachusetts.html |

| `ma.history.order-1-10` | It joined the Union between the 1st and 10th states. | history | `history.admission_order between [1,11)` | CT, DE, GA, MA, MD, NH, NJ, PA, SC, VA (10) | T4/specialized/indirect | 2–5 / `MA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/massachusetts.html |

| `ma.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `MA:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-MA |

| `ma.nps.minute-man` | Minute Man National Historical Park is here. | landmark | `nps.associated_unit_path contains /mima/` | MA (1) | T2/general/one_to_one | 5–6 / `MA:nps:mima` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/mima/ |

| `ma.places.top-two-2025` | Boston and Worcester were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Boston city, Massachusetts", "Worcester city, Massachusetts"]` | MA (1) | T2/general/one_to_one | 5–6 / `MA:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-25.xlsx |

| `ma.capital.boston` | Its capital is Boston. | capital | `identity.capital eq "Boston"` | MA (1) | T2/general/one_to_one | 5–6 / `MA:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/massachusetts.html |

| `ma.postal` | Its postal abbreviation is MA. | abbreviation | `identity.postal_code eq "MA"` | MA (1) | T1/iconic/direct_identifier | 7–7 / `MA:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `ma.silhouette` | image | silhouette | `identity.postal_code eq "MA"` | MA (1) | T1/general/direct_identifier | 7–7 / `MA:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `ma.locator` | map | map_position | `identity.postal_code eq "MA"` | MA (1) | T1/general/direct_identifier | 7–7 / `MA:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-0 → history.order-1-10 → area.rank-41-45 → highpoint.2500-3500 → nps.minute-man → places.top-two-2025 → postal`. Cumulative candidates: **19 → 8 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Michigan (`US-MI`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Michigan; MI; FIPS 26 | Census guide; USPS; static |

| Capital and admission | Lansing; January 26, 1837 (26th) | Census guide; static |

| Population | 10,127,884; rank 10 | Census Vintage 2025; 2025-07-01 |

| Land area | 56,539 sq mi; rank 22 | Census 2010; rank derived across 50 states |

| Highest point | Mount Arvon; 1,979 ft | USGS; static |

| Standard time | Eastern, Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: IN, OH, WI; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; isle-royale-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Detroit city, Michigan 649,095; Grand Rapids city, Michigan 201,183 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Isle Royale National Park is here. | https://www.nps.gov/isro/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `mi.population.9000000-12000000` | About 9 million–12 million people lived here in 2025. | population | `population.resident_estimate between [9000000,12000000)` | GA, MI, NC, NJ, OH (5) | T3/general/indirect | 1–4 / `MI:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `mi.area.rank-21-25` | It ranks 21st–25th in land area. (2010 Census) | area | `area.land_rank between [21,26)` | GA, IA, IL, MI, WI (5) | T4/specialized/indirect | 1–4 / `MI:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `mi.highpoint.1500-2000` | Its highest point is 1,500–2,000 feet high. | physical_geography | `physical.highest_point between [1500,2000)` | IA, MI, MO, NJ, OH, WI (6) | T3/general/indirect | 2–5 / `MI:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `mi.time.eastern-central` | Parts use Eastern and Central Time. | time_zone | `time.standard_zone eq ["Eastern", "Central"]` | FL, IN, KY, MI, TN (5) | T4/general/indirect | 1–4 / `MI:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `mi.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `MI:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `mi.history.1830s` | It became a state in the 1830s. | history | `history.admission_year between [1830,1840)` | AR, MI (2) | T3/general/indirect | 1–4 / `MI:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/michigan.html |

| `mi.history.order-21-30` | It joined the Union between the 21st and 30th states. | history | `history.admission_order between [21,31)` | AL, AR, FL, IA, IL, ME, MI, MO, TX, WI (10) | T4/specialized/indirect | 2–5 / `MI:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/michigan.html |

| `mi.borders.segment-count-3` | It shares boundary segments with 3 states. | borders | `boundary.shared_segments count_eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T3/general/indirect | 2–5 / `MI:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-MI |

| `mi.nps.isle-royale` | Isle Royale National Park is here. | landmark | `nps.associated_unit_path contains /isro/` | MI (1) | T2/general/one_to_one | 5–6 / `MI:nps:isro` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/isro/ |

| `mi.places.top-two-2025` | Detroit and Grand Rapids were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Detroit city, Michigan", "Grand Rapids city, Michigan"]` | MI (1) | T2/general/one_to_one | 5–6 / `MI:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-26.xlsx |

| `mi.capital.lansing` | Its capital is Lansing. | capital | `identity.capital eq "Lansing"` | MI (1) | T2/general/one_to_one | 5–6 / `MI:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/michigan.html |

| `mi.postal` | Its postal abbreviation is MI. | abbreviation | `identity.postal_code eq "MI"` | MI (1) | T1/iconic/direct_identifier | 7–7 / `MI:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `mi.silhouette` | image | silhouette | `identity.postal_code eq "MI"` | MI (1) | T1/general/direct_identifier | 7–7 / `MI:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `mi.locator` | map | map_position | `identity.postal_code eq "MI"` | MI (1) | T1/general/direct_identifier | 7–7 / `MI:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-1 → history.order-21-30 → area.rank-21-25 → population.9000000-12000000 → nps.isle-royale → places.top-two-2025 → postal`. Cumulative candidates: **17 → 5 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.
- International boundaries are stored separately from state-to-state segments.

## Minnesota (`US-MN`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Minnesota; MN; FIPS 27 | Census guide; USPS; static |

| Capital and admission | St. Paul; May 11, 1858 (32nd) | Census guide; static |

| Population | 5,830,405; rank 22 | Census Vintage 2025; 2025-07-01 |

| Land area | 79,627 sq mi; rank 14 | Census 2010; rank derived across 50 states |

| Highest point | Eagle Mountain; 2,301 ft | USGS; static |

| Standard time | Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: IA, ND, SD, WI; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; voyageurs-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Minneapolis city, Minnesota 430,324; St. Paul city, Minnesota 306,684 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Voyageurs National Park is here. | https://www.nps.gov/voya/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `mn.population.5000000-6000000` | About 5 million–6 million people lived here in 2025. | population | `population.resident_estimate between [5000000,6000000)` | AL, MN, SC, WI (4) | T3/general/indirect | 1–4 / `MN:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `mn.area.rank-11-15` | It ranks 11th–15th in land area. (2010 Census) | area | `area.land_rank between [11,16)` | ID, KS, MN, NE, UT (5) | T4/specialized/indirect | 1–4 / `MN:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `mn.highpoint.2000-3000` | Its highest point is 2,000–3,000 feet high. | physical_geography | `physical.highest_point between [2000,3000)` | AL, AR, CT, MN (4) | T3/general/indirect | 2–5 / `MN:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `mn.time.central` | The whole state uses Central Time. | time_zone | `time.standard_zone eq ["Central"]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 / `MN:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `mn.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `MN:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `mn.history.1850s` | It became a state in the 1850s. | history | `history.admission_year between [1850,1860)` | CA, MN, OR (3) | T3/general/indirect | 1–4 / `MN:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/minnesota.html |

| `mn.history.order-31-40` | It joined the Union between the 31st and 40th states. | history | `history.admission_order between [31,41)` | CA, CO, KS, MN, ND, NE, NV, OR, SD, WV (10) | T4/specialized/indirect | 2–5 / `MN:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/minnesota.html |

| `mn.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `MN:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-MN |

| `mn.nps.voyageurs` | Voyageurs National Park is here. | landmark | `nps.associated_unit_path contains /voya/` | MN (1) | T2/general/one_to_one | 5–6 / `MN:nps:voya` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/voya/ |

| `mn.places.top-two-2025` | Minneapolis and St. Paul were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Minneapolis city, Minnesota", "St. Paul city, Minnesota"]` | MN (1) | T2/general/one_to_one | 5–6 / `MN:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-27.xlsx |

| `mn.capital.st-paul` | Its capital is St. Paul. | capital | `identity.capital eq "St. Paul"` | MN (1) | T2/general/one_to_one | 5–6 / `MN:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/minnesota.html |

| `mn.postal` | Its postal abbreviation is MN. | abbreviation | `identity.postal_code eq "MN"` | MN (1) | T1/iconic/direct_identifier | 7–7 / `MN:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `mn.silhouette` | image | silhouette | `identity.postal_code eq "MN"` | MN (1) | T1/general/direct_identifier | 7–7 / `MN:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `mn.locator` | map | map_position | `identity.postal_code eq "MN"` | MN (1) | T1/general/direct_identifier | 7–7 / `MN:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-1 → time.central → highpoint.2000-3000 → population.5000000-6000000 → nps.voyageurs → places.top-two-2025 → postal`. Cumulative candidates: **17 → 4 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- International boundaries are stored separately from state-to-state segments.

## Mississippi (`US-MS`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Mississippi; MS; FIPS 28 | Census guide; USPS; static |

| Capital and admission | Jackson; December 10, 1817 (20th) | Census guide; static |

| Population | 2,954,160; rank 35 | Census Vintage 2025; 2025-07-01 |

| Land area | 46,923 sq mi; rank 31 | Census 2010; rank derived across 50 states |

| Highest point | Woodall Mountain; 806 ft | USGS; static |

| Standard time | Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AL, AR, LA, TN; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Jackson city, Mississippi 141,196; Gulfport city, Mississippi 76,506 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Vicksburg National Military Park is here. | https://www.nps.gov/vick/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `ms.population.2000000-3000000` | About 2 million–3 million people lived here in 2025. | population | `population.resident_estimate between [2000000,3000000)` | ID, KS, MS, NE, NM (5) | T3/general/indirect | 1–4 / `MS:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `ms.area.rank-31-35` | It ranks 31st–35th in land area. (2010 Census) | area | `area.land_rank between [31,36)` | LA, MS, OH, PA, TN (5) | T4/specialized/indirect | 1–4 / `MS:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `ms.highpoint.500-1000` | Its highest point is 500–1,000 feet high. | physical_geography | `physical.highest_point between [500,1000)` | LA, MS, RI (3) | T3/general/indirect | 2–5 / `MS:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `ms.time.central` | The whole state uses Central Time. | time_zone | `time.standard_zone eq ["Central"]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 / `MS:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `ms.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `MS:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `ms.history.1810s` | It became a state in the 1810s. | history | `history.admission_year between [1810,1820)` | AL, IL, IN, LA, MS (5) | T3/general/indirect | 1–4 / `MS:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/mississippi.html |

| `ms.history.order-11-20` | It joined the Union between the 11th and 20th states. | history | `history.admission_order between [11,21)` | IN, KY, LA, MS, NC, NY, OH, RI, TN, VT (10) | T4/specialized/indirect | 2–5 / `MS:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/mississippi.html |

| `ms.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `MS:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-MS |

| `ms.nps.vicksburg` | Vicksburg National Military Park is here. | landmark | `nps.associated_unit_path contains /vick/` | LA, MS (2) | T2/general/named_association | 5–6 / `MS:nps:vick` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/vick/ |

| `ms.places.top-two-2025` | Jackson and Gulfport were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Jackson city, Mississippi", "Gulfport city, Mississippi"]` | MS (1) | T2/general/one_to_one | 5–6 / `MS:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-28.xlsx |

| `ms.capital.jackson` | Its capital is Jackson. | capital | `identity.capital eq "Jackson"` | MS (1) | T2/general/one_to_one | 5–6 / `MS:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/mississippi.html |

| `ms.postal` | Its postal abbreviation is MS. | abbreviation | `identity.postal_code eq "MS"` | MS (1) | T1/iconic/direct_identifier | 7–7 / `MS:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `ms.silhouette` | image | silhouette | `identity.postal_code eq "MS"` | MS (1) | T1/general/direct_identifier | 7–7 / `MS:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `ms.locator` | map | map_position | `identity.postal_code eq "MS"` | MS (1) | T1/general/direct_identifier | 7–7 / `MS:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-0 → time.central → history.1810s → area.rank-31-35 → nps.vicksburg → places.top-two-2025 → postal`. Cumulative candidates: **19 → 6 → 3 → 2 → 2 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Missouri (`US-MO`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Missouri; MO; FIPS 29 | Census guide; USPS; static |

| Capital and admission | Jefferson City; August 10, 1821 (24th) | Census guide; static |

| Population | 6,270,541; rank 18 | Census Vintage 2025; 2025-07-01 |

| Land area | 68,742 sq mi; rank 18 | Census 2010; rank derived across 50 states |

| Highest point | Taum Sauk Mountain; 1,772 ft | USGS; static |

| Standard time | Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AR, IA, IL, KS, KY, NE, OK, TN; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; gateway-arch-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Kansas City city, Missouri 521,220; St. Louis city, Missouri 278,144 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Ozark National Scenic Riverways is here. | https://www.nps.gov/ozar/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `mo.population.6000000-8000000` | About 6 million–8 million people lived here in 2025. | population | `population.resident_estimate between [6000000,8000000)` | AZ, CO, IN, MA, MD, MO, TN (7) | T3/general/indirect | 1–4 / `MO:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `mo.area.rank-16-20` | It ranks 16th–20th in land area. (2010 Census) | area | `area.land_rank between [16,21)` | MO, ND, OK, SD, WA (5) | T4/specialized/indirect | 1–4 / `MO:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `mo.highpoint.1500-2000` | Its highest point is 1,500–2,000 feet high. | physical_geography | `physical.highest_point between [1500,2000)` | IA, MI, MO, NJ, OH, WI (6) | T3/general/indirect | 2–5 / `MO:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `mo.time.central` | The whole state uses Central Time. | time_zone | `time.standard_zone eq ["Central"]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 / `MO:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `mo.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `MO:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `mo.history.1820s` | It became a state in the 1820s. | history | `history.admission_year between [1820,1830)` | ME, MO (2) | T3/general/indirect | 1–4 / `MO:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/missouri.html |

| `mo.history.order-21-30` | It joined the Union between the 21st and 30th states. | history | `history.admission_order between [21,31)` | AL, AR, FL, IA, IL, ME, MI, MO, TX, WI (10) | T4/specialized/indirect | 2–5 / `MO:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/missouri.html |

| `mo.borders.segment-count-8` | It shares boundary segments with 8 states. | borders | `boundary.shared_segments count_eq 8` | MO, TN (2) | T3/general/indirect | 2–5 / `MO:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-MO |

| `mo.nps.ozark` | Ozark National Scenic Riverways is here. | landmark | `nps.associated_unit_path contains /ozar/` | MO (1) | T2/general/one_to_one | 5–6 / `MO:nps:ozar` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/ozar/ |

| `mo.places.top-two-2025` | Kansas City and St. Louis were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Kansas City city, Missouri", "St. Louis city, Missouri"]` | MO (1) | T2/general/one_to_one | 5–6 / `MO:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-29.xlsx |

| `mo.capital.jefferson-city` | Its capital is Jefferson City. | capital | `identity.capital eq "Jefferson City"` | MO (1) | T2/general/one_to_one | 5–6 / `MO:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/missouri.html |

| `mo.postal` | Its postal abbreviation is MO. | abbreviation | `identity.postal_code eq "MO"` | MO (1) | T1/iconic/direct_identifier | 7–7 / `MO:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `mo.silhouette` | image | silhouette | `identity.postal_code eq "MO"` | MO (1) | T1/general/direct_identifier | 7–7 / `MO:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `mo.locator` | map | map_position | `identity.postal_code eq "MO"` | MO (1) | T1/general/direct_identifier | 7–7 / `MO:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-1 → history.order-21-30 → time.central → population.6000000-8000000 → nps.ozark → places.top-two-2025 → postal`. Cumulative candidates: **17 → 5 → 3 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Montana (`US-MT`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Montana; MT; FIPS 30 | Census guide; USPS; static |

| Capital and admission | Helena; November 8, 1889 (41st) | Census guide; static |

| Population | 1,144,694; rank 43 | Census Vintage 2025; 2025-07-01 |

| Land area | 145,546 sq mi; rank 4 | Census 2010; rank derived across 50 states |

| Highest point | Granite Peak; 12,799 ft | USGS; static |

| Standard time | Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: ID, ND, SD, WY; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 2; glacier-national-park, yellowstone-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Billings city, Montana 121,239; Missoula city, Montana 78,903 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Glacier National Park is here. | https://www.nps.gov/glac/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `mt.population.1000000-1500000` | About 1 million–1.5 million people lived here in 2025. | population | `population.resident_estimate between [1000000,1500000)` | DE, HI, ME, MT, NH, RI (6) | T3/general/indirect | 1–4 / `MT:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `mt.area.rank-1-5` | It ranks 1st–5th in land area. (2010 Census) | area | `area.land_rank between [1,6)` | AK, CA, MT, NM, TX (5) | T4/specialized/indirect | 1–4 / `MT:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `mt.highpoint.11000-13000` | Its highest point is 11,000–13,000 feet high. | physical_geography | `physical.highest_point between [11000,13000)` | AZ, ID, MT, OR (4) | T3/general/indirect | 2–5 / `MT:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `mt.time.mountain` | The whole state uses Mountain Time. | time_zone | `time.standard_zone eq ["Mountain"]` | AZ, CO, MT, NM, UT, WY (6) | T4/general/indirect | 1–4 / `MT:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `mt.parks.formal-2` | It has 2 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 2` | HI, MT, NM, NV, SD, TX, WY (7) | T4/specialized/indirect | 1–4 / `MT:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `mt.history.1880s` | It became a state in the 1880s. | history | `history.admission_year between [1880,1890)` | MT, ND, SD, WA (4) | T3/general/indirect | 1–4 / `MT:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/montana.html |

| `mt.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `MT:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/montana.html |

| `mt.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `MT:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-MT |

| `mt.nps.glacier` | Glacier National Park is here. | landmark | `nps.associated_unit_path contains /glac/` | MT (1) | T2/general/one_to_one | 5–6 / `MT:nps:glac` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/glac/ |

| `mt.places.top-two-2025` | Billings and Missoula were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Billings city, Montana", "Missoula city, Montana"]` | MT (1) | T2/general/one_to_one | 5–6 / `MT:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-30.xlsx |

| `mt.capital.helena` | Its capital is Helena. | capital | `identity.capital eq "Helena"` | MT (1) | T2/general/one_to_one | 5–6 / `MT:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/montana.html |

| `mt.postal` | Its postal abbreviation is MT. | abbreviation | `identity.postal_code eq "MT"` | MT (1) | T1/iconic/direct_identifier | 7–7 / `MT:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `mt.silhouette` | image | silhouette | `identity.postal_code eq "MT"` | MT (1) | T1/general/direct_identifier | 7–7 / `MT:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `mt.locator` | map | map_position | `identity.postal_code eq "MT"` | MT (1) | T1/general/direct_identifier | 7–7 / `MT:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-2 → history.order-41-50 → time.mountain → area.rank-1-5 → nps.glacier → places.top-two-2025 → postal`. Cumulative candidates: **7 → 4 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Nebraska (`US-NE`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Nebraska; NE; FIPS 31 | Census guide; USPS; static |

| Capital and admission | Lincoln; March 1, 1867 (37th) | Census guide; static |

| Population | 2,018,006; rank 38 | Census Vintage 2025; 2025-07-01 |

| Land area | 76,824 sq mi; rank 15 | Census 2010; rank derived across 50 states |

| Highest point | Panorama Point; 5,424 ft | USGS; static |

| Standard time | Central, Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: CO, IA, KS, MO, SD, WY; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Omaha city, Nebraska 488,797; Lincoln city, Nebraska 301,522 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Homestead National Historical Park is here. | https://www.nps.gov/home/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `ne.population.1500000-2500000` | About 1.5 million–2.5 million people lived here in 2025. | population | `population.resident_estimate between [1500000,2500000)` | ID, NE, NM, WV (4) | T3/general/indirect | 1–4 / `NE:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `ne.area.rank-11-15` | It ranks 11th–15th in land area. (2010 Census) | area | `area.land_rank between [11,16)` | ID, KS, MN, NE, UT (5) | T4/specialized/indirect | 1–4 / `NE:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `ne.highpoint.5000-6000` | Its highest point is 5,000–6,000 feet high. | physical_geography | `physical.highest_point between [5000,6000)` | ME, NE, NY, VA (4) | T3/general/indirect | 2–5 / `NE:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `ne.time.central-mountain` | Parts use Central and Mountain Time. | time_zone | `time.standard_zone eq ["Central", "Mountain"]` | KS, ND, NE, SD, TX (5) | T4/general/indirect | 1–4 / `NE:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `ne.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `NE:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `ne.history.1860s` | It became a state in the 1860s. | history | `history.admission_year between [1860,1870)` | KS, NE, NV, WV (4) | T3/general/indirect | 1–4 / `NE:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/nebraska.html |

| `ne.history.order-31-40` | It joined the Union between the 31st and 40th states. | history | `history.admission_order between [31,41)` | CA, CO, KS, MN, ND, NE, NV, OR, SD, WV (10) | T4/specialized/indirect | 2–5 / `NE:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/nebraska.html |

| `ne.borders.segment-count-6` | It shares boundary segments with 6 states. | borders | `boundary.shared_segments count_eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T3/general/indirect | 2–5 / `NE:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-NE |

| `ne.nps.homestead` | Homestead National Historical Park is here. | landmark | `nps.associated_unit_path contains /home/` | NE (1) | T2/general/one_to_one | 5–6 / `NE:nps:home` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/home/ |

| `ne.places.top-two-2025` | Omaha and Lincoln were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Omaha city, Nebraska", "Lincoln city, Nebraska"]` | NE (1) | T2/general/one_to_one | 5–6 / `NE:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-31.xlsx |

| `ne.capital.lincoln` | Its capital is Lincoln. | capital | `identity.capital eq "Lincoln"` | NE (1) | T2/general/one_to_one | 5–6 / `NE:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/nebraska.html |

| `ne.postal` | Its postal abbreviation is NE. | abbreviation | `identity.postal_code eq "NE"` | NE (1) | T1/iconic/direct_identifier | 7–7 / `NE:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `ne.silhouette` | image | silhouette | `identity.postal_code eq "NE"` | NE (1) | T1/general/direct_identifier | 7–7 / `NE:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `ne.locator` | map | map_position | `identity.postal_code eq "NE"` | NE (1) | T1/general/direct_identifier | 7–7 / `NE:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-0 → area.rank-11-15 → time.central-mountain → history.1860s → nps.homestead → places.top-two-2025 → postal`. Cumulative candidates: **19 → 2 → 2 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.

## Nevada (`US-NV`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Nevada; NV; FIPS 32 | Census guide; USPS; static |

| Capital and admission | Carson City; October 31, 1864 (36th) | Census guide; static |

| Population | 3,282,188; rank 31 | Census Vintage 2025; 2025-07-01 |

| Land area | 109,781 sq mi; rank 7 | Census 2010; rank derived across 50 states |

| Highest point | Boundary Peak; 13,140 ft | USGS; static |

| Standard time | Mountain, Pacific | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AZ, CA, ID, OR, UT; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 2; death-valley-national-park, great-basin-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Las Vegas city, Nevada 679,817; Henderson city, Nevada 353,289 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Lake Mead National Recreation Area is here. | https://www.nps.gov/lake/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `nv.population.2500000-3500000` | About 2.5 million–3.5 million people lived here in 2025. | population | `population.resident_estimate between [2500000,3500000)` | AR, IA, KS, MS, NV (5) | T3/general/indirect | 1–4 / `NV:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `nv.area.rank-6-10` | It ranks 6th–10th in land area. (2010 Census) | area | `area.land_rank between [6,11)` | AZ, CO, NV, OR, WY (5) | T4/specialized/indirect | 1–4 / `NV:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `nv.highpoint.12500-13500` | Its highest point is 12,500–13,500 feet high. | physical_geography | `physical.highest_point between [12500,13500)` | AZ, ID, MT, NM, NV (5) | T3/general/indirect | 2–5 / `NV:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `nv.time.mountain-pacific` | Parts use Mountain and Pacific Time. | time_zone | `time.standard_zone eq ["Mountain", "Pacific"]` | ID, NV, OR (3) | T4/general/indirect | 1–4 / `NV:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `nv.parks.formal-2` | It has 2 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 2` | HI, MT, NM, NV, SD, TX, WY (7) | T4/specialized/indirect | 1–4 / `NV:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `nv.history.1860s` | It became a state in the 1860s. | history | `history.admission_year between [1860,1870)` | KS, NE, NV, WV (4) | T3/general/indirect | 1–4 / `NV:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/nevada.html |

| `nv.history.order-31-40` | It joined the Union between the 31st and 40th states. | history | `history.admission_order between [31,41)` | CA, CO, KS, MN, ND, NE, NV, OR, SD, WV (10) | T4/specialized/indirect | 2–5 / `NV:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/nevada.html |

| `nv.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `NV:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-NV |

| `nv.nps.lake-mead` | Lake Mead National Recreation Area is here. | landmark | `nps.associated_unit_path contains /lake/` | AZ, NV (2) | T2/general/named_association | 5–6 / `NV:nps:lake` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/lake/ |

| `nv.places.top-two-2025` | Las Vegas and Henderson were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Las Vegas city, Nevada", "Henderson city, Nevada"]` | NV (1) | T2/general/one_to_one | 5–6 / `NV:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-32.xlsx |

| `nv.capital.carson-city` | Its capital is Carson City. | capital | `identity.capital eq "Carson City"` | NV (1) | T2/general/one_to_one | 5–6 / `NV:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/nevada.html |

| `nv.postal` | Its postal abbreviation is NV. | abbreviation | `identity.postal_code eq "NV"` | NV (1) | T1/iconic/direct_identifier | 7–7 / `NV:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `nv.silhouette` | image | silhouette | `identity.postal_code eq "NV"` | NV (1) | T1/general/direct_identifier | 7–7 / `NV:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `nv.locator` | map | map_position | `identity.postal_code eq "NV"` | NV (1) | T1/general/direct_identifier | 7–7 / `NV:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `area.rank-6-10 → history.order-31-40 → time.mountain-pacific → population.2500000-3500000 → nps.lake-mead → places.top-two-2025 → postal`. Cumulative candidates: **5 → 3 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.

## New Hampshire (`US-NH`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | New Hampshire; NH; FIPS 33 | Census guide; USPS; static |

| Capital and admission | Concord; June 21, 1788 (9th) | Census guide; static |

| Population | 1,415,342; rank 41 | Census Vintage 2025; 2025-07-01 |

| Land area | 8,953 sq mi; rank 44 | Census 2010; rank derived across 50 states |

| Highest point | Mount Washington; 6,288 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: MA, ME, VT; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Manchester city, New Hampshire 116,818; Nashua city, New Hampshire 92,435 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Saint-Gaudens National Historical Park is here. | https://www.nps.gov/saga/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `nh.population.1000000-1500000` | About 1 million–1.5 million people lived here in 2025. | population | `population.resident_estimate between [1000000,1500000)` | DE, HI, ME, MT, NH, RI (6) | T3/general/indirect | 1–4 / `NH:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `nh.area.rank-41-45` | It ranks 41st–45th in land area. (2010 Census) | area | `area.land_rank between [41,46)` | MA, MD, NH, VT, WV (5) | T4/specialized/indirect | 1–4 / `NH:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `nh.highpoint.6000-8000` | Its highest point is 6,000–8,000 feet high. | physical_geography | `physical.highest_point between [6000,8000)` | NC, NH, SD, TN (4) | T3/general/indirect | 2–5 / `NH:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `nh.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `NH:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `nh.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `NH:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `nh.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `NH:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-hampshire.html |

| `nh.history.order-1-10` | It joined the Union between the 1st and 10th states. | history | `history.admission_order between [1,11)` | CT, DE, GA, MA, MD, NH, NJ, PA, SC, VA (10) | T4/specialized/indirect | 2–5 / `NH:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-hampshire.html |

| `nh.borders.segment-count-3` | It shares boundary segments with 3 states. | borders | `boundary.shared_segments count_eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T3/general/indirect | 2–5 / `NH:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-NH |

| `nh.nps.saint-gaudens` | Saint-Gaudens National Historical Park is here. | landmark | `nps.associated_unit_path contains /saga/` | NH (1) | T2/general/one_to_one | 5–6 / `NH:nps:saga` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/saga/ |

| `nh.places.top-two-2025` | Manchester and Nashua were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Manchester city, New Hampshire", "Nashua city, New Hampshire"]` | NH (1) | T2/general/one_to_one | 5–6 / `NH:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-33.xlsx |

| `nh.capital.concord` | Its capital is Concord. | capital | `identity.capital eq "Concord"` | NH (1) | T2/general/one_to_one | 5–6 / `NH:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-hampshire.html |

| `nh.postal` | Its postal abbreviation is NH. | abbreviation | `identity.postal_code eq "NH"` | NH (1) | T1/iconic/direct_identifier | 7–7 / `NH:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `nh.silhouette` | image | silhouette | `identity.postal_code eq "NH"` | NH (1) | T1/general/direct_identifier | 7–7 / `NH:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `nh.locator` | map | map_position | `identity.postal_code eq "NH"` | NH (1) | T1/general/direct_identifier | 7–7 / `NH:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-0 → population.1000000-1500000 → history.1780s → nps.saint-gaudens → places.top-two-2025 → postal`. Cumulative candidates: **17 → 11 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- International boundaries are stored separately from state-to-state segments.

## New Jersey (`US-NJ`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | New Jersey; NJ; FIPS 34 | Census guide; USPS; static |

| Capital and admission | Trenton; December 18, 1787 (3rd) | Census guide; static |

| Population | 9,548,215; rank 11 | Census Vintage 2025; 2025-07-01 |

| Land area | 7,354 sq mi; rank 46 | Census 2010; rank derived across 50 states |

| Highest point | High Point; 1,803 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: DE, NY, PA; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Newark city, New Jersey 323,808; Jersey City city, New Jersey 302,013 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Thomas Edison National Historical Park is here. | https://www.nps.gov/edis/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `nj.population.8000000-10000000` | About 8 million–10 million people lived here in 2025. | population | `population.resident_estimate between [8000000,10000000)` | NJ, VA, WA (3) | T3/general/indirect | 1–4 / `NJ:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `nj.area.rank-46-50` | It ranks 46th–50th in land area. (2010 Census) | area | `area.land_rank between [46,51)` | CT, DE, HI, NJ, RI (5) | T4/specialized/indirect | 1–4 / `NJ:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `nj.highpoint.1500-2000` | Its highest point is 1,500–2,000 feet high. | physical_geography | `physical.highest_point between [1500,2000)` | IA, MI, MO, NJ, OH, WI (6) | T3/general/indirect | 2–5 / `NJ:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `nj.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `NJ:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `nj.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `NJ:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `nj.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `NJ:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-jersey.html |

| `nj.history.order-1-10` | It joined the Union between the 1st and 10th states. | history | `history.admission_order between [1,11)` | CT, DE, GA, MA, MD, NH, NJ, PA, SC, VA (10) | T4/specialized/indirect | 2–5 / `NJ:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-jersey.html |

| `nj.borders.segment-count-3` | It shares boundary segments with 3 states. | borders | `boundary.shared_segments count_eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T3/general/indirect | 2–5 / `NJ:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-NJ |

| `nj.nps.thomas-edison` | Thomas Edison National Historical Park is here. | landmark | `nps.associated_unit_path contains /edis/` | NJ (1) | T2/general/one_to_one | 5–6 / `NJ:nps:edis` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/edis/ |

| `nj.places.top-two-2025` | Newark and Jersey City were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Newark city, New Jersey", "Jersey City city, New Jersey"]` | NJ (1) | T2/general/one_to_one | 5–6 / `NJ:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-34.xlsx |

| `nj.capital.trenton` | Its capital is Trenton. | capital | `identity.capital eq "Trenton"` | NJ (1) | T2/general/one_to_one | 5–6 / `NJ:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-jersey.html |

| `nj.postal` | Its postal abbreviation is NJ. | abbreviation | `identity.postal_code eq "NJ"` | NJ (1) | T1/iconic/direct_identifier | 7–7 / `NJ:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `nj.silhouette` | image | silhouette | `identity.postal_code eq "NJ"` | NJ (1) | T1/general/direct_identifier | 7–7 / `NJ:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `nj.locator` | map | map_position | `identity.postal_code eq "NJ"` | NJ (1) | T1/general/direct_identifier | 7–7 / `NJ:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-0 → history.order-1-10 → area.rank-46-50 → time.eastern → nps.thomas-edison → places.top-two-2025 → postal`. Cumulative candidates: **19 → 8 → 3 → 3 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## New Mexico (`US-NM`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | New Mexico; NM; FIPS 35 | Census guide; USPS; static |

| Capital and admission | Santa Fe; January 6, 1912 (47th) | Census guide; static |

| Population | 2,125,498; rank 36 | Census Vintage 2025; 2025-07-01 |

| Land area | 121,298 sq mi; rank 5 | Census 2010; rank derived across 50 states |

| Highest point | Wheeler Peak; 13,161 ft | USGS; static |

| Standard time | Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AZ, CO, OK, TX; points: UT; water-only: none; international: Mexico | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 2; carlsbad-caverns-national-park, white-sands-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Albuquerque city, New Mexico 556,588; Las Cruces city, New Mexico 116,978 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Carlsbad Caverns National Park is here. | https://www.nps.gov/cave/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `nm.population.1500000-2500000` | About 1.5 million–2.5 million people lived here in 2025. | population | `population.resident_estimate between [1500000,2500000)` | ID, NE, NM, WV (4) | T3/general/indirect | 1–4 / `NM:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `nm.area.rank-1-5` | It ranks 1st–5th in land area. (2010 Census) | area | `area.land_rank between [1,6)` | AK, CA, MT, NM, TX (5) | T4/specialized/indirect | 1–4 / `NM:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `nm.highpoint.12500-13500` | Its highest point is 12,500–13,500 feet high. | physical_geography | `physical.highest_point between [12500,13500)` | AZ, ID, MT, NM, NV (5) | T3/general/indirect | 2–5 / `NM:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `nm.time.mountain` | The whole state uses Mountain Time. | time_zone | `time.standard_zone eq ["Mountain"]` | AZ, CO, MT, NM, UT, WY (6) | T4/general/indirect | 1–4 / `NM:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `nm.parks.formal-2` | It has 2 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 2` | HI, MT, NM, NV, SD, TX, WY (7) | T4/specialized/indirect | 1–4 / `NM:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `nm.history.1910s` | It became a state in the 1910s. | history | `history.admission_year between [1910,1920)` | AZ, NM (2) | T3/general/indirect | 1–4 / `NM:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-mexico.html |

| `nm.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `NM:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-mexico.html |

| `nm.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `NM:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-NM |

| `nm.nps.carlsbad-caverns` | Carlsbad Caverns National Park is here. | landmark | `nps.associated_unit_path contains /cave/` | NM (1) | T2/general/one_to_one | 5–6 / `NM:nps:cave` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/cave/ |

| `nm.places.top-two-2025` | Albuquerque and Las Cruces were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Albuquerque city, New Mexico", "Las Cruces city, New Mexico"]` | NM (1) | T2/general/one_to_one | 5–6 / `NM:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-35.xlsx |

| `nm.capital.santa-fe` | Its capital is Santa Fe. | capital | `identity.capital eq "Santa Fe"` | NM (1) | T2/general/one_to_one | 5–6 / `NM:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-mexico.html |

| `nm.postal` | Its postal abbreviation is NM. | abbreviation | `identity.postal_code eq "NM"` | NM (1) | T1/iconic/direct_identifier | 7–7 / `NM:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `nm.silhouette` | image | silhouette | `identity.postal_code eq "NM"` | NM (1) | T1/general/direct_identifier | 7–7 / `NM:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `nm.locator` | map | map_position | `identity.postal_code eq "NM"` | NM (1) | T1/general/direct_identifier | 7–7 / `NM:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-2 → history.order-41-50 → time.mountain → area.rank-1-5 → nps.carlsbad-caverns → places.top-two-2025 → postal`. Cumulative candidates: **7 → 4 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Point contacts remain separate from shared boundary segments and gameplay adjacency.
- International boundaries are stored separately from state-to-state segments.

## New York (`US-NY`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | New York; NY; FIPS 36 | Census guide; USPS; static |

| Capital and admission | Albany; July 26, 1788 (11th) | Census guide; static |

| Population | 20,002,427; rank 4 | Census Vintage 2025; 2025-07-01 |

| Land area | 47,126 sq mi; rank 30 | Census 2010; rank derived across 50 states |

| Highest point | Mount Marcy; 5,344 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: CT, MA, NJ, PA, VT; points: none; water-only: RI; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | New York city, New York 8,584,629; Buffalo city, New York 274,613 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Statue Of Liberty National Monument is here. | https://www.nps.gov/stli/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `ny.population.20000000-35000000` | About 20 million–35 million people lived here in 2025. | population | `population.resident_estimate between [20000000,35000000)` | FL, NY, TX (3) | T3/general/indirect | 1–4 / `NY:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `ny.area.rank-26-30` | It ranks 26th–30th in land area. (2010 Census) | area | `area.land_rank between [26,31)` | AL, AR, FL, NC, NY (5) | T4/specialized/indirect | 1–4 / `NY:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `ny.highpoint.5000-6000` | Its highest point is 5,000–6,000 feet high. | physical_geography | `physical.highest_point between [5000,6000)` | ME, NE, NY, VA (4) | T3/general/indirect | 2–5 / `NY:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `ny.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `NY:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `ny.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `NY:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `ny.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `NY:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-york.html |

| `ny.history.order-11-20` | It joined the Union between the 11th and 20th states. | history | `history.admission_order between [11,21)` | IN, KY, LA, MS, NC, NY, OH, RI, TN, VT (10) | T4/specialized/indirect | 2–5 / `NY:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-york.html |

| `ny.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `NY:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-NY |

| `ny.nps.statue-of-liberty` | Statue Of Liberty National Monument is here. | landmark | `nps.associated_unit_path contains /stli/` | NY (1) | T2/general/one_to_one | 5–6 / `NY:nps:stli` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/stli/ |

| `ny.places.top-two-2025` | New York City and Buffalo were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["New York city, New York", "Buffalo city, New York"]` | NY (1) | T2/general/one_to_one | 5–6 / `NY:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-36.xlsx |

| `ny.capital.albany` | Its capital is Albany. | capital | `identity.capital eq "Albany"` | NY (1) | T2/general/one_to_one | 5–6 / `NY:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/new-york.html |

| `ny.postal` | Its postal abbreviation is NY. | abbreviation | `identity.postal_code eq "NY"` | NY (1) | T1/iconic/direct_identifier | 7–7 / `NY:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `ny.silhouette` | image | silhouette | `identity.postal_code eq "NY"` | NY (1) | T1/general/direct_identifier | 7–7 / `NY:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `ny.locator` | map | map_position | `identity.postal_code eq "NY"` | NY (1) | T1/general/direct_identifier | 7–7 / `NY:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-0 → history.order-11-20 → population.20000000-35000000 → nps.statue-of-liberty → places.top-two-2025 → postal`. Cumulative candidates: **17 → 11 → 3 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Water-only boundaries remain separate from shared segments and gameplay adjacency.
- International boundaries are stored separately from state-to-state segments.

## North Carolina (`US-NC`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | North Carolina; NC; FIPS 37 | Census guide; USPS; static |

| Capital and admission | Raleigh; November 21, 1789 (12th) | Census guide; static |

| Population | 11,197,968; rank 9 | Census Vintage 2025; 2025-07-01 |

| Land area | 48,618 sq mi; rank 29 | Census 2010; rank derived across 50 states |

| Highest point | Mount Mitchell; 6,684 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: GA, SC, TN, VA; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; great-smoky-mountains-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Charlotte city, North Carolina 964,784; Raleigh city, North Carolina 506,306 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Wright Brothers National Memorial is here. | https://www.nps.gov/wrbr/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `nc.population.9000000-12000000` | About 9 million–12 million people lived here in 2025. | population | `population.resident_estimate between [9000000,12000000)` | GA, MI, NC, NJ, OH (5) | T3/general/indirect | 1–4 / `NC:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `nc.area.rank-26-30` | It ranks 26th–30th in land area. (2010 Census) | area | `area.land_rank between [26,31)` | AL, AR, FL, NC, NY (5) | T4/specialized/indirect | 1–4 / `NC:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `nc.highpoint.6000-8000` | Its highest point is 6,000–8,000 feet high. | physical_geography | `physical.highest_point between [6000,8000)` | NC, NH, SD, TN (4) | T3/general/indirect | 2–5 / `NC:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `nc.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `NC:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `nc.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `NC:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `nc.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `NC:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/north-carolina.html |

| `nc.history.order-11-20` | It joined the Union between the 11th and 20th states. | history | `history.admission_order between [11,21)` | IN, KY, LA, MS, NC, NY, OH, RI, TN, VT (10) | T4/specialized/indirect | 2–5 / `NC:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/north-carolina.html |

| `nc.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `NC:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-NC |

| `nc.nps.wright-brothers` | Wright Brothers National Memorial is here. | landmark | `nps.associated_unit_path contains /wrbr/` | NC (1) | T2/general/one_to_one | 5–6 / `NC:nps:wrbr` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/wrbr/ |

| `nc.places.top-two-2025` | Charlotte and Raleigh were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Charlotte city, North Carolina", "Raleigh city, North Carolina"]` | NC (1) | T2/general/one_to_one | 5–6 / `NC:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-37.xlsx |

| `nc.capital.raleigh` | Its capital is Raleigh. | capital | `identity.capital eq "Raleigh"` | NC (1) | T2/general/one_to_one | 5–6 / `NC:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/north-carolina.html |

| `nc.postal` | Its postal abbreviation is NC. | abbreviation | `identity.postal_code eq "NC"` | NC (1) | T1/iconic/direct_identifier | 7–7 / `NC:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `nc.silhouette` | image | silhouette | `identity.postal_code eq "NC"` | NC (1) | T1/general/direct_identifier | 7–7 / `NC:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `nc.locator` | map | map_position | `identity.postal_code eq "NC"` | NC (1) | T1/general/direct_identifier | 7–7 / `NC:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-1 → population.9000000-12000000 → history.order-11-20 → nps.wright-brothers → places.top-two-2025 → postal`. Cumulative candidates: **17 → 6 → 2 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## North Dakota (`US-ND`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | North Dakota; ND; FIPS 38 | Census guide; USPS; static |

| Capital and admission | Bismarck; November 2, 1889 (39th) | Census guide; static |

| Population | 799,358; rank 47 | Census Vintage 2025; 2025-07-01 |

| Land area | 69,001 sq mi; rank 17 | Census 2010; rank derived across 50 states |

| Highest point | White Butte; 3,506 ft | USGS; static |

| Standard time | Central, Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: MN, MT, SD; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; theodore-roosevelt-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Fargo city, North Dakota 136,275; Bismarck city, North Dakota 77,963 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Theodore Roosevelt National Park is here. | https://www.nps.gov/thro/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `nd.population.500000-1000000` | About 500,000–1 million people lived here in 2025. | population | `population.resident_estimate between [500000,1000000)` | AK, ND, SD, VT, WY (5) | T3/general/indirect | 1–4 / `ND:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `nd.area.rank-16-20` | It ranks 16th–20th in land area. (2010 Census) | area | `area.land_rank between [16,21)` | MO, ND, OK, SD, WA (5) | T4/specialized/indirect | 1–4 / `ND:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `nd.highpoint.3000-4000` | Its highest point is 3,000–4,000 feet high. | physical_geography | `physical.highest_point between [3000,4000)` | MA, MD, ND, PA, SC (5) | T3/general/indirect | 2–5 / `ND:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `nd.time.central-mountain` | Parts use Central and Mountain Time. | time_zone | `time.standard_zone eq ["Central", "Mountain"]` | KS, ND, NE, SD, TX (5) | T4/general/indirect | 1–4 / `ND:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `nd.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `ND:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `nd.history.1880s` | It became a state in the 1880s. | history | `history.admission_year between [1880,1890)` | MT, ND, SD, WA (4) | T3/general/indirect | 1–4 / `ND:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/north-dakota.html |

| `nd.history.order-31-40` | It joined the Union between the 31st and 40th states. | history | `history.admission_order between [31,41)` | CA, CO, KS, MN, ND, NE, NV, OR, SD, WV (10) | T4/specialized/indirect | 2–5 / `ND:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/north-dakota.html |

| `nd.borders.segment-count-3` | It shares boundary segments with 3 states. | borders | `boundary.shared_segments count_eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T3/general/indirect | 2–5 / `ND:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-ND |

| `nd.nps.theodore-roosevelt` | Theodore Roosevelt National Park is here. | landmark | `nps.associated_unit_path contains /thro/` | ND (1) | T2/general/one_to_one | 5–6 / `ND:nps:thro` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/thro/ |

| `nd.places.top-two-2025` | Fargo and Bismarck were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Fargo city, North Dakota", "Bismarck city, North Dakota"]` | ND (1) | T2/general/one_to_one | 5–6 / `ND:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-38.xlsx |

| `nd.capital.bismarck` | Its capital is Bismarck. | capital | `identity.capital eq "Bismarck"` | ND (1) | T2/general/one_to_one | 5–6 / `ND:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/north-dakota.html |

| `nd.postal` | Its postal abbreviation is ND. | abbreviation | `identity.postal_code eq "ND"` | ND (1) | T1/iconic/direct_identifier | 7–7 / `ND:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `nd.silhouette` | image | silhouette | `identity.postal_code eq "ND"` | ND (1) | T1/general/direct_identifier | 7–7 / `ND:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `nd.locator` | map | map_position | `identity.postal_code eq "ND"` | ND (1) | T1/general/direct_identifier | 7–7 / `ND:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.central-mountain → history.order-31-40 → population.500000-1000000 → area.rank-16-20 → nps.theodore-roosevelt → places.top-two-2025 → postal`. Cumulative candidates: **5 → 4 → 2 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.
- International boundaries are stored separately from state-to-state segments.

## Ohio (`US-OH`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Ohio; OH; FIPS 39 | Census guide; USPS; static |

| Capital and admission | Columbus; March 1, 1803 (17th) | Census guide; static |

| Population | 11,900,510; rank 7 | Census Vintage 2025; 2025-07-01 |

| Land area | 40,861 sq mi; rank 35 | Census 2010; rank derived across 50 states |

| Highest point | Campbell Hill; 1,550 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: IN, KY, MI, PA, WV; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; cuyahoga-valley-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Columbus city, Ohio 938,396; Cleveland city, Ohio 363,608 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Cuyahoga Valley National Park is here. | https://www.nps.gov/cuva/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `oh.population.9000000-12000000` | About 9 million–12 million people lived here in 2025. | population | `population.resident_estimate between [9000000,12000000)` | GA, MI, NC, NJ, OH (5) | T3/general/indirect | 1–4 / `OH:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `oh.area.rank-31-35` | It ranks 31st–35th in land area. (2010 Census) | area | `area.land_rank between [31,36)` | LA, MS, OH, PA, TN (5) | T4/specialized/indirect | 1–4 / `OH:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `oh.highpoint.1500-2000` | Its highest point is 1,500–2,000 feet high. | physical_geography | `physical.highest_point between [1500,2000)` | IA, MI, MO, NJ, OH, WI (6) | T3/general/indirect | 2–5 / `OH:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `oh.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `OH:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `oh.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `OH:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `oh.history.1800s` | It became a state in the 1800s. | history | `history.admission_year between [1800,1810)` | OH (1) | T3/general/indirect | 1–4 / `OH:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/ohio.html |

| `oh.history.order-11-20` | It joined the Union between the 11th and 20th states. | history | `history.admission_order between [11,21)` | IN, KY, LA, MS, NC, NY, OH, RI, TN, VT (10) | T4/specialized/indirect | 2–5 / `OH:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/ohio.html |

| `oh.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `OH:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-OH |

| `oh.nps.cuyahoga-valley` | Cuyahoga Valley National Park is here. | landmark | `nps.associated_unit_path contains /cuva/` | OH (1) | T2/general/one_to_one | 5–6 / `OH:nps:cuva` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/cuva/ |

| `oh.places.top-two-2025` | Columbus and Cleveland were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Columbus city, Ohio", "Cleveland city, Ohio"]` | OH (1) | T2/general/one_to_one | 5–6 / `OH:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-39.xlsx |

| `oh.capital.columbus` | Its capital is Columbus. | capital | `identity.capital eq "Columbus"` | OH (1) | T2/general/one_to_one | 5–6 / `OH:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/ohio.html |

| `oh.postal` | Its postal abbreviation is OH. | abbreviation | `identity.postal_code eq "OH"` | OH (1) | T1/iconic/direct_identifier | 7–7 / `OH:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `oh.silhouette` | image | silhouette | `identity.postal_code eq "OH"` | OH (1) | T1/general/direct_identifier | 7–7 / `OH:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `oh.locator` | map | map_position | `identity.postal_code eq "OH"` | OH (1) | T1/general/direct_identifier | 7–7 / `OH:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-1 → population.9000000-12000000 → history.order-11-20 → nps.cuyahoga-valley → places.top-two-2025 → postal`. Cumulative candidates: **17 → 6 → 2 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- International boundaries are stored separately from state-to-state segments.

## Oklahoma (`US-OK`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Oklahoma; OK; FIPS 40 | Census guide; USPS; static |

| Capital and admission | Oklahoma City; November 16, 1907 (46th) | Census guide; static |

| Population | 4,123,288; rank 28 | Census Vintage 2025; 2025-07-01 |

| Land area | 68,595 sq mi; rank 19 | Census 2010; rank derived across 50 states |

| Highest point | Black Mesa; 4,973 ft | USGS; static |

| Standard time | Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AR, CO, KS, MO, NM, TX; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Oklahoma City city, Oklahoma 719,849; Tulsa city, Oklahoma 416,209 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Chickasaw National Recreation Area is here. | https://www.nps.gov/chic/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `ok.population.3500000-4500000` | About 3.5 million–4.5 million people lived here in 2025. | population | `population.resident_estimate between [3500000,4500000)` | CT, OK, OR, UT (4) | T3/general/indirect | 1–4 / `OK:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `ok.area.rank-16-20` | It ranks 16th–20th in land area. (2010 Census) | area | `area.land_rank between [16,21)` | MO, ND, OK, SD, WA (5) | T4/specialized/indirect | 1–4 / `OK:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `ok.highpoint.4500-5000` | Its highest point is 4,500–5,000 feet high. | physical_geography | `physical.highest_point between [4500,5000)` | GA, OK, WV (3) | T3/general/indirect | 2–5 / `OK:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `ok.time.central` | The whole state uses Central Time. | time_zone | `time.standard_zone eq ["Central"]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 / `OK:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `ok.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `OK:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `ok.history.1900s` | It became a state in the 1900s. | history | `history.admission_year between [1900,1910)` | OK (1) | T3/general/indirect | 1–4 / `OK:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/oklahoma.html |

| `ok.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `OK:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/oklahoma.html |

| `ok.borders.segment-count-6` | It shares boundary segments with 6 states. | borders | `boundary.shared_segments count_eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T3/general/indirect | 2–5 / `OK:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-OK |

| `ok.nps.chickasaw` | Chickasaw National Recreation Area is here. | landmark | `nps.associated_unit_path contains /chic/` | OK (1) | T2/general/one_to_one | 5–6 / `OK:nps:chic` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/chic/ |

| `ok.places.top-two-2025` | Oklahoma City and Tulsa were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Oklahoma City city, Oklahoma", "Tulsa city, Oklahoma"]` | OK (1) | T2/general/one_to_one | 5–6 / `OK:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-40.xlsx |

| `ok.capital.oklahoma-city` | Its capital is Oklahoma City. | capital | `identity.capital eq "Oklahoma City"` | OK (1) | T2/general/one_to_one | 5–6 / `OK:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/oklahoma.html |

| `ok.postal` | Its postal abbreviation is OK. | abbreviation | `identity.postal_code eq "OK"` | OK (1) | T1/iconic/direct_identifier | 7–7 / `OK:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `ok.silhouette` | image | silhouette | `identity.postal_code eq "OK"` | OK (1) | T1/general/direct_identifier | 7–7 / `OK:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `ok.locator` | map | map_position | `identity.postal_code eq "OK"` | OK (1) | T1/general/direct_identifier | 7–7 / `OK:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-0 → time.central → population.3500000-4500000 → area.rank-16-20 → nps.chickasaw → places.top-two-2025 → postal`. Cumulative candidates: **19 → 6 → 1 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Oregon (`US-OR`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Oregon; OR; FIPS 41 | Census guide; USPS; static |

| Capital and admission | Salem; February 14, 1859 (33rd) | Census guide; static |

| Population | 4,273,586; rank 27 | Census Vintage 2025; 2025-07-01 |

| Land area | 95,988 sq mi; rank 10 | Census 2010; rank derived across 50 states |

| Highest point | Mount Hood; 11,239 ft | USGS; static |

| Standard time | Mountain, Pacific | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: CA, ID, NV, WA; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; crater-lake-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Portland city, Oregon 635,109; Salem city, Oregon 181,779 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Crater Lake National Park is here. | https://www.nps.gov/crla/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `or.population.3500000-4500000` | About 3.5 million–4.5 million people lived here in 2025. | population | `population.resident_estimate between [3500000,4500000)` | CT, OK, OR, UT (4) | T3/general/indirect | 1–4 / `OR:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `or.area.rank-6-10` | It ranks 6th–10th in land area. (2010 Census) | area | `area.land_rank between [6,11)` | AZ, CO, NV, OR, WY (5) | T4/specialized/indirect | 1–4 / `OR:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `or.highpoint.8000-12000` | Its highest point is 8,000–12,000 feet high. | physical_geography | `physical.highest_point between [8000,12000)` | OR, TX (2) | T3/general/indirect | 2–5 / `OR:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `or.time.mountain-pacific` | Parts use Mountain and Pacific Time. | time_zone | `time.standard_zone eq ["Mountain", "Pacific"]` | ID, NV, OR (3) | T4/general/indirect | 1–4 / `OR:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `or.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `OR:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `or.history.1850s` | It became a state in the 1850s. | history | `history.admission_year between [1850,1860)` | CA, MN, OR (3) | T3/general/indirect | 1–4 / `OR:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/oregon.html |

| `or.history.order-31-40` | It joined the Union between the 31st and 40th states. | history | `history.admission_order between [31,41)` | CA, CO, KS, MN, ND, NE, NV, OR, SD, WV (10) | T4/specialized/indirect | 2–5 / `OR:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/oregon.html |

| `or.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `OR:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-OR |

| `or.nps.crater-lake` | Crater Lake National Park is here. | landmark | `nps.associated_unit_path contains /crla/` | OR (1) | T2/general/one_to_one | 5–6 / `OR:nps:crla` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/crla/ |

| `or.places.top-two-2025` | Portland and Salem were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Portland city, Oregon", "Salem city, Oregon"]` | OR (1) | T2/general/one_to_one | 5–6 / `OR:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-41.xlsx |

| `or.capital.salem` | Its capital is Salem. | capital | `identity.capital eq "Salem"` | OR (1) | T2/general/one_to_one | 5–6 / `OR:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/oregon.html |

| `or.postal` | Its postal abbreviation is OR. | abbreviation | `identity.postal_code eq "OR"` | OR (1) | T1/iconic/direct_identifier | 7–7 / `OR:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `or.silhouette` | image | silhouette | `identity.postal_code eq "OR"` | OR (1) | T1/general/direct_identifier | 7–7 / `OR:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `or.locator` | map | map_position | `identity.postal_code eq "OR"` | OR (1) | T1/general/direct_identifier | 7–7 / `OR:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `area.rank-6-10 → history.order-31-40 → time.mountain-pacific → population.3500000-4500000 → nps.crater-lake → places.top-two-2025 → postal`. Cumulative candidates: **5 → 3 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.

## Pennsylvania (`US-PA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Pennsylvania; PA; FIPS 42 | Census guide; USPS; static |

| Capital and admission | Harrisburg; December 12, 1787 (2nd) | Census guide; static |

| Population | 13,059,432; rank 5 | Census Vintage 2025; 2025-07-01 |

| Land area | 44,743 sq mi; rank 32 | Census 2010; rank derived across 50 states |

| Highest point | Mount Davis; 3,213 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: DE, MD, NJ, NY, OH, WV; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Philadelphia city, Pennsylvania 1,574,281; Pittsburgh city, Pennsylvania 307,632 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Independence National Historical Park is here. | https://www.nps.gov/inde/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `pa.population.12000000-15000000` | About 12 million–15 million people lived here in 2025. | population | `population.resident_estimate between [12000000,15000000)` | IL, PA (2) | T3/general/indirect | 1–4 / `PA:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `pa.area.rank-31-35` | It ranks 31st–35th in land area. (2010 Census) | area | `area.land_rank between [31,36)` | LA, MS, OH, PA, TN (5) | T4/specialized/indirect | 1–4 / `PA:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `pa.highpoint.2500-3500` | Its highest point is 2,500–3,500 feet high. | physical_geography | `physical.highest_point between [2500,3500)` | AR, MA, MD, PA (4) | T3/general/indirect | 2–5 / `PA:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `pa.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `PA:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `pa.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `PA:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `pa.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `PA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/pennsylvania.html |

| `pa.history.order-1-10` | It joined the Union between the 1st and 10th states. | history | `history.admission_order between [1,11)` | CT, DE, GA, MA, MD, NH, NJ, PA, SC, VA (10) | T4/specialized/indirect | 2–5 / `PA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/pennsylvania.html |

| `pa.borders.segment-count-6` | It shares boundary segments with 6 states. | borders | `boundary.shared_segments count_eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T3/general/indirect | 2–5 / `PA:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-PA |

| `pa.nps.independence` | Independence National Historical Park is here. | landmark | `nps.associated_unit_path contains /inde/` | PA (1) | T2/general/one_to_one | 5–6 / `PA:nps:inde` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/inde/ |

| `pa.places.top-two-2025` | Philadelphia and Pittsburgh were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Philadelphia city, Pennsylvania", "Pittsburgh city, Pennsylvania"]` | PA (1) | T2/general/one_to_one | 5–6 / `PA:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-42.xlsx |

| `pa.capital.harrisburg` | Its capital is Harrisburg. | capital | `identity.capital eq "Harrisburg"` | PA (1) | T2/general/one_to_one | 5–6 / `PA:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/pennsylvania.html |

| `pa.postal` | Its postal abbreviation is PA. | abbreviation | `identity.postal_code eq "PA"` | PA (1) | T1/iconic/direct_identifier | 7–7 / `PA:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `pa.silhouette` | image | silhouette | `identity.postal_code eq "PA"` | PA (1) | T1/general/direct_identifier | 7–7 / `PA:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `pa.locator` | map | map_position | `identity.postal_code eq "PA"` | PA (1) | T1/general/direct_identifier | 7–7 / `PA:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-0 → history.order-1-10 → highpoint.2500-3500 → time.eastern → nps.independence → places.top-two-2025 → postal`. Cumulative candidates: **19 → 8 → 3 → 3 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- International boundaries are stored separately from state-to-state segments.

## South Carolina (`US-SC`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | South Carolina; SC; FIPS 45 | Census guide; USPS; static |

| Capital and admission | Columbia; May 23, 1788 (8th) | Census guide; static |

| Population | 5,570,274; rank 23 | Census Vintage 2025; 2025-07-01 |

| Land area | 30,061 sq mi; rank 40 | Census 2010; rank derived across 50 states |

| Highest point | Sassafras Mountain; 3,560 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: GA, NC; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; congaree-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Charleston city, South Carolina 159,423; Columbia city, South Carolina 147,035 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Congaree National Park is here. | https://www.nps.gov/cong/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `sc.population.5000000-6000000` | About 5 million–6 million people lived here in 2025. | population | `population.resident_estimate between [5000000,6000000)` | AL, MN, SC, WI (4) | T3/general/indirect | 1–4 / `SC:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `sc.area.rank-36-40` | It ranks 36th–40th in land area. (2010 Census) | area | `area.land_rank between [36,41)` | IN, KY, ME, SC, VA (5) | T4/specialized/indirect | 1–4 / `SC:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `sc.highpoint.3000-4000` | Its highest point is 3,000–4,000 feet high. | physical_geography | `physical.highest_point between [3000,4000)` | MA, MD, ND, PA, SC (5) | T3/general/indirect | 2–5 / `SC:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `sc.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `SC:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `sc.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `SC:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `sc.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `SC:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/south-carolina.html |

| `sc.history.order-1-10` | It joined the Union between the 1st and 10th states. | history | `history.admission_order between [1,11)` | CT, DE, GA, MA, MD, NH, NJ, PA, SC, VA (10) | T4/specialized/indirect | 2–5 / `SC:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/south-carolina.html |

| `sc.borders.segment-count-2` | It shares boundary segments with 2 states. | borders | `boundary.shared_segments count_eq 2` | FL, RI, SC, WA (4) | T3/general/indirect | 2–5 / `SC:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-SC |

| `sc.nps.congaree` | Congaree National Park is here. | landmark | `nps.associated_unit_path contains /cong/` | SC (1) | T2/general/one_to_one | 5–6 / `SC:nps:cong` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/cong/ |

| `sc.places.top-two-2025` | Charleston and Columbia were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Charleston city, South Carolina", "Columbia city, South Carolina"]` | SC (1) | T2/general/one_to_one | 5–6 / `SC:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-45.xlsx |

| `sc.capital.columbia` | Its capital is Columbia. | capital | `identity.capital eq "Columbia"` | SC (1) | T2/general/one_to_one | 5–6 / `SC:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/south-carolina.html |

| `sc.postal` | Its postal abbreviation is SC. | abbreviation | `identity.postal_code eq "SC"` | SC (1) | T1/iconic/direct_identifier | 7–7 / `SC:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `sc.silhouette` | image | silhouette | `identity.postal_code eq "SC"` | SC (1) | T1/general/direct_identifier | 7–7 / `SC:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `sc.locator` | map | map_position | `identity.postal_code eq "SC"` | SC (1) | T1/general/direct_identifier | 7–7 / `SC:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-1 → area.rank-36-40 → history.1780s → nps.congaree → places.top-two-2025 → postal`. Cumulative candidates: **17 → 6 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## South Dakota (`US-SD`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | South Dakota; SD; FIPS 46 | Census guide; USPS; static |

| Capital and admission | Pierre; November 2, 1889 (40th) | Census guide; static |

| Population | 935,094; rank 46 | Census Vintage 2025; 2025-07-01 |

| Land area | 75,811 sq mi; rank 16 | Census 2010; rank derived across 50 states |

| Highest point | Harney Peak; 7,242 ft | USGS; static |

| Standard time | Central, Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: IA, MN, MT, ND, NE, WY; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 2; badlands-national-park, wind-cave-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Sioux Falls city, South Dakota 213,748; Rapid City city, South Dakota 80,589 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Mount Rushmore National Memorial is here. | https://www.nps.gov/moru/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `sd.population.500000-1000000` | About 500,000–1 million people lived here in 2025. | population | `population.resident_estimate between [500000,1000000)` | AK, ND, SD, VT, WY (5) | T3/general/indirect | 1–4 / `SD:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `sd.area.rank-16-20` | It ranks 16th–20th in land area. (2010 Census) | area | `area.land_rank between [16,21)` | MO, ND, OK, SD, WA (5) | T4/specialized/indirect | 1–4 / `SD:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `sd.highpoint.6000-8000` | Its highest point is 6,000–8,000 feet high. | physical_geography | `physical.highest_point between [6000,8000)` | NC, NH, SD, TN (4) | T3/general/indirect | 2–5 / `SD:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `sd.time.central-mountain` | Parts use Central and Mountain Time. | time_zone | `time.standard_zone eq ["Central", "Mountain"]` | KS, ND, NE, SD, TX (5) | T4/general/indirect | 1–4 / `SD:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `sd.parks.formal-2` | It has 2 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 2` | HI, MT, NM, NV, SD, TX, WY (7) | T4/specialized/indirect | 1–4 / `SD:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `sd.history.1880s` | It became a state in the 1880s. | history | `history.admission_year between [1880,1890)` | MT, ND, SD, WA (4) | T3/general/indirect | 1–4 / `SD:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/south-dakota.html |

| `sd.history.order-31-40` | It joined the Union between the 31st and 40th states. | history | `history.admission_order between [31,41)` | CA, CO, KS, MN, ND, NE, NV, OR, SD, WV (10) | T4/specialized/indirect | 2–5 / `SD:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/south-dakota.html |

| `sd.borders.segment-count-6` | It shares boundary segments with 6 states. | borders | `boundary.shared_segments count_eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T3/general/indirect | 2–5 / `SD:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-SD |

| `sd.nps.mount-rushmore` | Mount Rushmore National Memorial is here. | landmark | `nps.associated_unit_path contains /moru/` | SD (1) | T2/general/one_to_one | 5–6 / `SD:nps:moru` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/moru/ |

| `sd.places.top-two-2025` | Sioux Falls and Rapid City were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Sioux Falls city, South Dakota", "Rapid City city, South Dakota"]` | SD (1) | T2/general/one_to_one | 5–6 / `SD:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-46.xlsx |

| `sd.capital.pierre` | Its capital is Pierre. | capital | `identity.capital eq "Pierre"` | SD (1) | T2/general/one_to_one | 5–6 / `SD:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/south-dakota.html |

| `sd.postal` | Its postal abbreviation is SD. | abbreviation | `identity.postal_code eq "SD"` | SD (1) | T1/iconic/direct_identifier | 7–7 / `SD:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `sd.silhouette` | image | silhouette | `identity.postal_code eq "SD"` | SD (1) | T1/general/direct_identifier | 7–7 / `SD:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `sd.locator` | map | map_position | `identity.postal_code eq "SD"` | SD (1) | T1/general/direct_identifier | 7–7 / `SD:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.central-mountain → history.order-31-40 → population.500000-1000000 → area.rank-16-20 → nps.mount-rushmore → places.top-two-2025 → postal`. Cumulative candidates: **5 → 4 → 2 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.

## Tennessee (`US-TN`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Tennessee; TN; FIPS 47 | Census guide; USPS; static |

| Capital and admission | Nashville; June 1, 1796 (16th) | Census guide; static |

| Population | 7,315,076; rank 15 | Census Vintage 2025; 2025-07-01 |

| Land area | 41,235 sq mi; rank 34 | Census 2010; rank derived across 50 states |

| Highest point | Clingmans Dome; 6,643 ft | USGS; static |

| Standard time | Eastern, Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AL, AR, GA, KY, MO, MS, NC, VA; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; great-smoky-mountains-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Nashville-Davidson metropolitan government (balance), Tennessee 721,074; Memphis city, Tennessee 609,647 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Great Smoky Mountains National Park is here. | https://www.nps.gov/grsm/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `tn.population.7000000-9000000` | About 7 million–9 million people lived here in 2025. | population | `population.resident_estimate between [7000000,9000000)` | AZ, MA, TN, VA, WA (5) | T3/general/indirect | 1–4 / `TN:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `tn.area.rank-31-35` | It ranks 31st–35th in land area. (2010 Census) | area | `area.land_rank between [31,36)` | LA, MS, OH, PA, TN (5) | T4/specialized/indirect | 1–4 / `TN:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `tn.highpoint.6000-8000` | Its highest point is 6,000–8,000 feet high. | physical_geography | `physical.highest_point between [6000,8000)` | NC, NH, SD, TN (4) | T3/general/indirect | 2–5 / `TN:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `tn.time.eastern-central` | Parts use Eastern and Central Time. | time_zone | `time.standard_zone eq ["Eastern", "Central"]` | FL, IN, KY, MI, TN (5) | T4/general/indirect | 1–4 / `TN:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `tn.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `TN:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `tn.history.1790s` | It became a state in the 1790s. | history | `history.admission_year between [1790,1800)` | KY, RI, TN, VT (4) | T3/general/indirect | 1–4 / `TN:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/tennessee.html |

| `tn.history.order-11-20` | It joined the Union between the 11th and 20th states. | history | `history.admission_order between [11,21)` | IN, KY, LA, MS, NC, NY, OH, RI, TN, VT (10) | T4/specialized/indirect | 2–5 / `TN:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/tennessee.html |

| `tn.borders.segment-count-8` | It shares boundary segments with 8 states. | borders | `boundary.shared_segments count_eq 8` | MO, TN (2) | T3/general/indirect | 2–5 / `TN:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-TN |

| `tn.nps.great-smoky-mountains` | Great Smoky Mountains National Park is here. | landmark | `nps.associated_unit_path contains /grsm/` | NC, TN (2) | T2/general/named_association | 5–6 / `TN:nps:grsm` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/grsm/ |

| `tn.places.top-two-2025` | Nashville-Davidson and Memphis were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Nashville-Davidson metropolitan government (balance), Tennessee", "Memphis city, Tennessee"]` | TN (1) | T2/general/one_to_one | 5–6 / `TN:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-47.xlsx |

| `tn.capital.nashville` | Its capital is Nashville. | capital | `identity.capital eq "Nashville"` | TN (1) | T2/general/one_to_one | 5–6 / `TN:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/tennessee.html |

| `tn.postal` | Its postal abbreviation is TN. | abbreviation | `identity.postal_code eq "TN"` | TN (1) | T1/iconic/direct_identifier | 7–7 / `TN:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `tn.silhouette` | image | silhouette | `identity.postal_code eq "TN"` | TN (1) | T1/general/direct_identifier | 7–7 / `TN:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `tn.locator` | map | map_position | `identity.postal_code eq "TN"` | TN (1) | T1/general/direct_identifier | 7–7 / `TN:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-1 → history.order-11-20 → time.eastern-central → population.7000000-9000000 → nps.great-smoky-mountains → places.top-two-2025 → postal`. Cumulative candidates: **17 → 5 → 3 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.
- Keep consolidated-government legal labels in normalized place facts even when player wording is shortened.

## Texas (`US-TX`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Texas; TX; FIPS 48 | Census guide; USPS; static |

| Capital and admission | Austin; December 29, 1845 (28th) | Census guide; static |

| Population | 31,709,821; rank 2 | Census Vintage 2025; 2025-07-01 |

| Land area | 261,232 sq mi; rank 2 | Census 2010; rank derived across 50 states |

| Highest point | Guadalupe Peak; 8,749 ft | USGS; static |

| Standard time | Central, Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AR, LA, NM, OK; points: none; water-only: none; international: Mexico | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 2; big-bend-national-park, guadalupe-mountains-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Houston city, Texas 2,397,315; San Antonio city, Texas 1,548,422 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Big Bend National Park is here. | https://www.nps.gov/bibe/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `tx.population.20000000-35000000` | About 20 million–35 million people lived here in 2025. | population | `population.resident_estimate between [20000000,35000000)` | FL, NY, TX (3) | T3/general/indirect | 1–4 / `TX:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `tx.area.rank-1-5` | It ranks 1st–5th in land area. (2010 Census) | area | `area.land_rank between [1,6)` | AK, CA, MT, NM, TX (5) | T4/specialized/indirect | 1–4 / `TX:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `tx.highpoint.6000-9000` | Its highest point is 6,000–9,000 feet high. | physical_geography | `physical.highest_point between [6000,9000)` | NC, NH, SD, TN, TX (5) | T3/general/indirect | 2–5 / `TX:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `tx.time.central-mountain` | Parts use Central and Mountain Time. | time_zone | `time.standard_zone eq ["Central", "Mountain"]` | KS, ND, NE, SD, TX (5) | T4/general/indirect | 1–4 / `TX:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `tx.parks.formal-2` | It has 2 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 2` | HI, MT, NM, NV, SD, TX, WY (7) | T4/specialized/indirect | 1–4 / `TX:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `tx.history.1840s` | It became a state in the 1840s. | history | `history.admission_year between [1840,1850)` | FL, IA, TX, WI (4) | T3/general/indirect | 1–4 / `TX:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/texas.html |

| `tx.history.order-21-30` | It joined the Union between the 21st and 30th states. | history | `history.admission_order between [21,31)` | AL, AR, FL, IA, IL, ME, MI, MO, TX, WI (10) | T4/specialized/indirect | 2–5 / `TX:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/texas.html |

| `tx.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `TX:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-TX |

| `tx.nps.big-bend` | Big Bend National Park is here. | landmark | `nps.associated_unit_path contains /bibe/` | TX (1) | T2/general/one_to_one | 5–6 / `TX:nps:bibe` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/bibe/ |

| `tx.places.top-two-2025` | Houston and San Antonio were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Houston city, Texas", "San Antonio city, Texas"]` | TX (1) | T2/general/one_to_one | 5–6 / `TX:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-48.xlsx |

| `tx.capital.austin` | Its capital is Austin. | capital | `identity.capital eq "Austin"` | TX (1) | T2/general/one_to_one | 5–6 / `TX:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/texas.html |

| `tx.postal` | Its postal abbreviation is TX. | abbreviation | `identity.postal_code eq "TX"` | TX (1) | T1/iconic/direct_identifier | 7–7 / `TX:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `tx.silhouette` | image | silhouette | `identity.postal_code eq "TX"` | TX (1) | T1/general/direct_identifier | 7–7 / `TX:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `tx.locator` | map | map_position | `identity.postal_code eq "TX"` | TX (1) | T1/general/direct_identifier | 7–7 / `TX:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-2 → highpoint.6000-9000 → time.central-mountain → population.20000000-35000000 → nps.big-bend → places.top-two-2025 → postal`. Cumulative candidates: **7 → 2 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Time-zone wording must retain split coverage; do not say the whole state uses one zone.
- International boundaries are stored separately from state-to-state segments.

## Utah (`US-UT`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Utah; UT; FIPS 49 | Census guide; USPS; static |

| Capital and admission | Salt Lake City; January 4, 1896 (45th) | Census guide; static |

| Population | 3,538,904; rank 30 | Census Vintage 2025; 2025-07-01 |

| Land area | 82,170 sq mi; rank 12 | Census 2010; rank derived across 50 states |

| Highest point | Kings Peak; 13,528 ft | USGS; static |

| Standard time | Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: AZ, CO, ID, NV, WY; points: NM; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 5; arches-national-park, bryce-canyon-national-park, canyonlands-national-park, capitol-reef-national-park, zion-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Salt Lake City city, Utah 218,428; West Valley City city, Utah 137,491 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Arches National Park is here. | https://www.nps.gov/arch/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `ut.population.3500000-4500000` | About 3.5 million–4.5 million people lived here in 2025. | population | `population.resident_estimate between [3500000,4500000)` | CT, OK, OR, UT (4) | T3/general/indirect | 1–4 / `UT:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `ut.area.rank-11-15` | It ranks 11th–15th in land area. (2010 Census) | area | `area.land_rank between [11,16)` | ID, KS, MN, NE, UT (5) | T4/specialized/indirect | 1–4 / `UT:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `ut.highpoint.13500-14000` | Its highest point is 13,500–14,000 feet high. | physical_geography | `physical.highest_point between [13500,14000)` | HI, UT, WY (3) | T3/general/indirect | 2–5 / `UT:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `ut.time.mountain` | The whole state uses Mountain Time. | time_zone | `time.standard_zone eq ["Mountain"]` | AZ, CO, MT, NM, UT, WY (6) | T4/general/indirect | 1–4 / `UT:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `ut.parks.formal-5` | It has 5 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 5` | UT (1) | T4/specialized/indirect | 1–4 / `UT:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `ut.history.1890s` | It became a state in the 1890s. | history | `history.admission_year between [1890,1900)` | ID, UT, WY (3) | T3/general/indirect | 1–4 / `UT:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/utah.html |

| `ut.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `UT:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/utah.html |

| `ut.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `UT:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-UT |

| `ut.nps.arches` | Arches National Park is here. | landmark | `nps.associated_unit_path contains /arch/` | UT (1) | T2/general/one_to_one | 5–6 / `UT:nps:arch` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/arch/ |

| `ut.places.top-two-2025` | Salt Lake City and West Valley City were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Salt Lake City city, Utah", "West Valley City city, Utah"]` | UT (1) | T2/general/one_to_one | 5–6 / `UT:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-49.xlsx |

| `ut.capital.salt-lake-city` | Its capital is Salt Lake City. | capital | `identity.capital eq "Salt Lake City"` | UT (1) | T2/general/one_to_one | 5–6 / `UT:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/utah.html |

| `ut.postal` | Its postal abbreviation is UT. | abbreviation | `identity.postal_code eq "UT"` | UT (1) | T1/iconic/direct_identifier | 7–7 / `UT:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `ut.silhouette` | image | silhouette | `identity.postal_code eq "UT"` | UT (1) | T1/general/direct_identifier | 7–7 / `UT:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `ut.locator` | map | map_position | `identity.postal_code eq "UT"` | UT (1) | T1/general/direct_identifier | 7–7 / `UT:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.mountain → history.order-41-50 → highpoint.13500-14000 → population.3500000-4500000 → nps.arches → places.top-two-2025 → postal`. Cumulative candidates: **6 → 5 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- Point contacts remain separate from shared boundary segments and gameplay adjacency.

## Vermont (`US-VT`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Vermont; VT; FIPS 50 | Census guide; USPS; static |

| Capital and admission | Montpelier; March 4, 1791 (14th) | Census guide; static |

| Population | 644,663; rank 49 | Census Vintage 2025; 2025-07-01 |

| Land area | 9,217 sq mi; rank 43 | Census 2010; rank derived across 50 states |

| Highest point | Mount Mansfield; 4,393 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: MA, NH, NY; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Burlington city, Vermont 44,019; South Burlington city, Vermont 21,394 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Marsh - Billings - Rockefeller National Historical Park is here. | https://www.nps.gov/mabi/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `vt.population.500000-1000000` | About 500,000–1 million people lived here in 2025. | population | `population.resident_estimate between [500000,1000000)` | AK, ND, SD, VT, WY (5) | T3/general/indirect | 1–4 / `VT:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `vt.area.rank-41-45` | It ranks 41st–45th in land area. (2010 Census) | area | `area.land_rank between [41,46)` | MA, MD, NH, VT, WV (5) | T4/specialized/indirect | 1–4 / `VT:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `vt.highpoint.4000-4500` | Its highest point is 4,000–4,500 feet high. | physical_geography | `physical.highest_point between [4000,4500)` | KS, KY, VT (3) | T3/general/indirect | 2–5 / `VT:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `vt.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `VT:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `vt.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `VT:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `vt.history.1790s` | It became a state in the 1790s. | history | `history.admission_year between [1790,1800)` | KY, RI, TN, VT (4) | T3/general/indirect | 1–4 / `VT:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/vermont.html |

| `vt.history.order-11-20` | It joined the Union between the 11th and 20th states. | history | `history.admission_order between [11,21)` | IN, KY, LA, MS, NC, NY, OH, RI, TN, VT (10) | T4/specialized/indirect | 2–5 / `VT:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/vermont.html |

| `vt.borders.segment-count-3` | It shares boundary segments with 3 states. | borders | `boundary.shared_segments count_eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T3/general/indirect | 2–5 / `VT:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-VT |

| `vt.nps.marsh-billings-rockefeller` | Marsh - Billings - Rockefeller National Historical Park is here. | landmark | `nps.associated_unit_path contains /mabi/` | VT (1) | T2/general/one_to_one | 5–6 / `VT:nps:mabi` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/mabi/ |

| `vt.places.top-two-2025` | Burlington and South Burlington were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Burlington city, Vermont", "South Burlington city, Vermont"]` | VT (1) | T2/general/one_to_one | 5–6 / `VT:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-50.xlsx |

| `vt.capital.montpelier` | Its capital is Montpelier. | capital | `identity.capital eq "Montpelier"` | VT (1) | T2/general/one_to_one | 5–6 / `VT:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/vermont.html |

| `vt.postal` | Its postal abbreviation is VT. | abbreviation | `identity.postal_code eq "VT"` | VT (1) | T1/iconic/direct_identifier | 7–7 / `VT:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `vt.silhouette` | image | silhouette | `identity.postal_code eq "VT"` | VT (1) | T1/general/direct_identifier | 7–7 / `VT:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `vt.locator` | map | map_position | `identity.postal_code eq "VT"` | VT (1) | T1/general/direct_identifier | 7–7 / `VT:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-0 → area.rank-41-45 → population.500000-1000000 → nps.marsh-billings-rockefeller → places.top-two-2025 → postal`. Cumulative candidates: **17 → 11 → 4 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- International boundaries are stored separately from state-to-state segments.

## Virginia (`US-VA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Virginia; VA; FIPS 51 | Census guide; USPS; static |

| Capital and admission | Richmond; June 25, 1788 (10th) | Census guide; static |

| Population | 8,880,107; rank 12 | Census Vintage 2025; 2025-07-01 |

| Land area | 39,490 sq mi; rank 36 | Census 2010; rank derived across 50 states |

| Highest point | Mount Rogers; 5,729 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: KY, MD, NC, TN, WV; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; shenandoah-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Virginia Beach city, Virginia 453,737; Chesapeake city, Virginia 255,332 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Shenandoah National Park is here. | https://www.nps.gov/shen/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `va.population.7000000-9000000` | About 7 million–9 million people lived here in 2025. | population | `population.resident_estimate between [7000000,9000000)` | AZ, MA, TN, VA, WA (5) | T3/general/indirect | 1–4 / `VA:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `va.area.rank-36-40` | It ranks 36th–40th in land area. (2010 Census) | area | `area.land_rank between [36,41)` | IN, KY, ME, SC, VA (5) | T4/specialized/indirect | 1–4 / `VA:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `va.highpoint.5000-6000` | Its highest point is 5,000–6,000 feet high. | physical_geography | `physical.highest_point between [5000,6000)` | ME, NE, NY, VA (4) | T3/general/indirect | 2–5 / `VA:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `va.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `VA:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `va.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `VA:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `va.history.1780s` | It became a state in the 1780s. | history | `history.admission_year between [1780,1790)` | CT, DE, GA, MA, MD, NC, NH, NJ, NY, PA, SC, VA (12) | T3/general/indirect | 1–4 / `VA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/virginia.html |

| `va.history.order-1-10` | It joined the Union between the 1st and 10th states. | history | `history.admission_order between [1,11)` | CT, DE, GA, MA, MD, NH, NJ, PA, SC, VA (10) | T4/specialized/indirect | 2–5 / `VA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/virginia.html |

| `va.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `VA:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-VA |

| `va.nps.shenandoah` | Shenandoah National Park is here. | landmark | `nps.associated_unit_path contains /shen/` | VA (1) | T2/general/one_to_one | 5–6 / `VA:nps:shen` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/shen/ |

| `va.places.top-two-2025` | Virginia Beach and Chesapeake were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Virginia Beach city, Virginia", "Chesapeake city, Virginia"]` | VA (1) | T2/general/one_to_one | 5–6 / `VA:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-51.xlsx |

| `va.capital.richmond` | Its capital is Richmond. | capital | `identity.capital eq "Richmond"` | VA (1) | T2/general/one_to_one | 5–6 / `VA:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/virginia.html |

| `va.postal` | Its postal abbreviation is VA. | abbreviation | `identity.postal_code eq "VA"` | VA (1) | T1/iconic/direct_identifier | 7–7 / `VA:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `va.silhouette` | image | silhouette | `identity.postal_code eq "VA"` | VA (1) | T1/general/direct_identifier | 7–7 / `VA:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `va.locator` | map | map_position | `identity.postal_code eq "VA"` | VA (1) | T1/general/direct_identifier | 7–7 / `VA:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-1 → area.rank-36-40 → highpoint.5000-6000 → nps.shenandoah → places.top-two-2025 → postal`. Cumulative candidates: **17 → 6 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Washington (`US-WA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Washington; WA; FIPS 53 | Census guide; USPS; static |

| Capital and admission | Olympia; November 11, 1889 (42nd) | Census guide; static |

| Population | 8,001,020; rank 13 | Census Vintage 2025; 2025-07-01 |

| Land area | 66,456 sq mi; rank 20 | Census 2010; rank derived across 50 states |

| Highest point | Mount Rainier; 14,411 ft | USGS; static |

| Standard time | Pacific | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: ID, OR; points: none; water-only: none; international: Canada | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 3; mount-rainier-national-park, north-cascades-national-park, olympic-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Seattle city, Washington 784,777; Spokane city, Washington 230,783 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Mount Rainier National Park is here. | https://www.nps.gov/mora/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `wa.population.7000000-9000000` | About 7 million–9 million people lived here in 2025. | population | `population.resident_estimate between [7000000,9000000)` | AZ, MA, TN, VA, WA (5) | T3/general/indirect | 1–4 / `WA:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `wa.area.rank-16-20` | It ranks 16th–20th in land area. (2010 Census) | area | `area.land_rank between [16,21)` | MO, ND, OK, SD, WA (5) | T4/specialized/indirect | 1–4 / `WA:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `wa.highpoint.14000-14500` | Its highest point is 14,000–14,500 feet high. | physical_geography | `physical.highest_point between [14000,14500)` | CA, CO, WA (3) | T3/general/indirect | 2–5 / `WA:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `wa.time.pacific` | The whole state uses Pacific Time. | time_zone | `time.standard_zone eq ["Pacific"]` | CA, WA (2) | T4/general/indirect | 1–4 / `WA:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `wa.parks.formal-3` | It has 3 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 3` | AZ, FL, WA (3) | T4/specialized/indirect | 1–4 / `WA:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `wa.history.1880s` | It became a state in the 1880s. | history | `history.admission_year between [1880,1890)` | MT, ND, SD, WA (4) | T3/general/indirect | 1–4 / `WA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/washington.html |

| `wa.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `WA:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/washington.html |

| `wa.borders.segment-count-2` | It shares boundary segments with 2 states. | borders | `boundary.shared_segments count_eq 2` | FL, RI, SC, WA (4) | T3/general/indirect | 2–5 / `WA:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-WA |

| `wa.nps.mount-rainier` | Mount Rainier National Park is here. | landmark | `nps.associated_unit_path contains /mora/` | WA (1) | T2/general/one_to_one | 5–6 / `WA:nps:mora` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/mora/ |

| `wa.places.top-two-2025` | Seattle and Spokane were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Seattle city, Washington", "Spokane city, Washington"]` | WA (1) | T2/general/one_to_one | 5–6 / `WA:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-53.xlsx |

| `wa.capital.olympia` | Its capital is Olympia. | capital | `identity.capital eq "Olympia"` | WA (1) | T2/general/one_to_one | 5–6 / `WA:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/washington.html |

| `wa.postal` | Its postal abbreviation is WA. | abbreviation | `identity.postal_code eq "WA"` | WA (1) | T1/iconic/direct_identifier | 7–7 / `WA:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `wa.silhouette` | image | silhouette | `identity.postal_code eq "WA"` | WA (1) | T1/general/direct_identifier | 7–7 / `WA:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `wa.locator` | map | map_position | `identity.postal_code eq "WA"` | WA (1) | T1/general/direct_identifier | 7–7 / `WA:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `population.7000000-9000000 → parks.formal-3 → history.order-41-50 → area.rank-16-20 → nps.mount-rainier → places.top-two-2025 → postal`. Cumulative candidates: **5 → 2 → 2 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.
- International boundaries are stored separately from state-to-state segments.

## West Virginia (`US-WV`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | West Virginia; WV; FIPS 54 | Census guide; USPS; static |

| Capital and admission | Charleston; June 20, 1863 (35th) | Census guide; static |

| Population | 1,766,147; rank 39 | Census Vintage 2025; 2025-07-01 |

| Land area | 24,038 sq mi; rank 41 | Census 2010; rank derived across 50 states |

| Highest point | Spruce Knob; 4,863 ft | USGS; static |

| Standard time | Eastern | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: KY, MD, OH, PA, VA; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 1; new-river-gorge-national-park-and-preserve | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Charleston city, West Virginia 46,117; Huntington city, West Virginia 44,815 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | New River Gorge National Park & Preserve is here. | https://www.nps.gov/neri/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `wv.population.1500000-2500000` | About 1.5 million–2.5 million people lived here in 2025. | population | `population.resident_estimate between [1500000,2500000)` | ID, NE, NM, WV (4) | T3/general/indirect | 1–4 / `WV:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `wv.area.rank-41-45` | It ranks 41st–45th in land area. (2010 Census) | area | `area.land_rank between [41,46)` | MA, MD, NH, VT, WV (5) | T4/specialized/indirect | 1–4 / `WV:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `wv.highpoint.4500-5000` | Its highest point is 4,500–5,000 feet high. | physical_geography | `physical.highest_point between [4500,5000)` | GA, OK, WV (3) | T3/general/indirect | 2–5 / `WV:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `wv.time.eastern` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq ["Eastern"]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 / `WV:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `wv.parks.formal-1` | It has 1 formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/specialized/indirect | 1–4 / `WV:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `wv.history.1860s` | It became a state in the 1860s. | history | `history.admission_year between [1860,1870)` | KS, NE, NV, WV (4) | T3/general/indirect | 1–4 / `WV:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/west-virginia.html |

| `wv.history.order-31-40` | It joined the Union between the 31st and 40th states. | history | `history.admission_order between [31,41)` | CA, CO, KS, MN, ND, NE, NV, OR, SD, WV (10) | T4/specialized/indirect | 2–5 / `WV:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/west-virginia.html |

| `wv.borders.segment-count-5` | It shares boundary segments with 5 states. | borders | `boundary.shared_segments count_eq 5` | GA, IL, MA, NV, NY, OH, UT, VA, WV (9) | T3/general/indirect | 2–5 / `WV:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-WV |

| `wv.nps.new-river-gorge` | New River Gorge National Park & Preserve is here. | landmark | `nps.associated_unit_path contains /neri/` | WV (1) | T2/general/one_to_one | 5–6 / `WV:nps:neri` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/neri/ |

| `wv.places.top-two-2025` | Charleston and Huntington were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Charleston city, West Virginia", "Huntington city, West Virginia"]` | WV (1) | T2/general/one_to_one | 5–6 / `WV:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-54.xlsx |

| `wv.capital.charleston` | Its capital is Charleston. | capital | `identity.capital eq "Charleston"` | WV (1) | T2/general/one_to_one | 5–6 / `WV:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/west-virginia.html |

| `wv.postal` | Its postal abbreviation is WV. | abbreviation | `identity.postal_code eq "WV"` | WV (1) | T1/iconic/direct_identifier | 7–7 / `WV:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `wv.silhouette` | image | silhouette | `identity.postal_code eq "WV"` | WV (1) | T1/general/direct_identifier | 7–7 / `WV:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `wv.locator` | map | map_position | `identity.postal_code eq "WV"` | WV (1) | T1/general/direct_identifier | 7–7 / `WV:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `time.eastern → parks.formal-1 → population.1500000-2500000 → area.rank-41-45 → nps.new-river-gorge → places.top-two-2025 → postal`. Cumulative candidates: **17 → 6 → 1 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Wisconsin (`US-WI`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Wisconsin; WI; FIPS 55 | Census guide; USPS; static |

| Capital and admission | Madison; May 29, 1848 (30th) | Census guide; static |

| Population | 5,972,787; rank 21 | Census Vintage 2025; 2025-07-01 |

| Land area | 54,158 sq mi; rank 25 | Census 2010; rank derived across 50 states |

| Highest point | Timms Hill; 1,951 ft | USGS; static |

| Standard time | Central | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: IA, IL, MI, MN; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 0; none | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Milwaukee city, Wisconsin 562,407; Madison city, Wisconsin 286,233 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Apostle Islands National Lakeshore is here. | https://www.nps.gov/apis/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `wi.population.5000000-6000000` | About 5 million–6 million people lived here in 2025. | population | `population.resident_estimate between [5000000,6000000)` | AL, MN, SC, WI (4) | T3/general/indirect | 1–4 / `WI:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `wi.area.rank-21-25` | It ranks 21st–25th in land area. (2010 Census) | area | `area.land_rank between [21,26)` | GA, IA, IL, MI, WI (5) | T4/specialized/indirect | 1–4 / `WI:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `wi.highpoint.1500-2000` | Its highest point is 1,500–2,000 feet high. | physical_geography | `physical.highest_point between [1500,2000)` | IA, MI, MO, NJ, OH, WI (6) | T3/general/indirect | 2–5 / `WI:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `wi.time.central` | The whole state uses Central Time. | time_zone | `time.standard_zone eq ["Central"]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 / `WI:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `wi.parks.formal-0` | It has no formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T4/specialized/indirect | 1–4 / `WI:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `wi.history.1840s` | It became a state in the 1840s. | history | `history.admission_year between [1840,1850)` | FL, IA, TX, WI (4) | T3/general/indirect | 1–4 / `WI:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/wisconsin.html |

| `wi.history.order-21-30` | It joined the Union between the 21st and 30th states. | history | `history.admission_order between [21,31)` | AL, AR, FL, IA, IL, ME, MI, MO, TX, WI (10) | T4/specialized/indirect | 2–5 / `WI:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/wisconsin.html |

| `wi.borders.segment-count-4` | It shares boundary segments with 4 states. | borders | `boundary.shared_segments count_eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T3/general/indirect | 2–5 / `WI:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-WI |

| `wi.nps.apostle-islands` | Apostle Islands National Lakeshore is here. | landmark | `nps.associated_unit_path contains /apis/` | WI (1) | T2/general/one_to_one | 5–6 / `WI:nps:apis` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/apis/ |

| `wi.places.top-two-2025` | Milwaukee and Madison were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Milwaukee city, Wisconsin", "Madison city, Wisconsin"]` | WI (1) | T2/general/one_to_one | 5–6 / `WI:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-55.xlsx |

| `wi.capital.madison` | Its capital is Madison. | capital | `identity.capital eq "Madison"` | WI (1) | T2/general/one_to_one | 5–6 / `WI:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/wisconsin.html |

| `wi.postal` | Its postal abbreviation is WI. | abbreviation | `identity.postal_code eq "WI"` | WI (1) | T1/iconic/direct_identifier | 7–7 / `WI:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `wi.silhouette` | image | silhouette | `identity.postal_code eq "WI"` | WI (1) | T1/general/direct_identifier | 7–7 / `WI:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `wi.locator` | map | map_position | `identity.postal_code eq "WI"` | WI (1) | T1/general/direct_identifier | 7–7 / `WI:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-0 → time.central → history.order-21-30 → population.5000000-6000000 → nps.apostle-islands → places.top-two-2025 → postal`. Cumulative candidates: **19 → 6 → 3 → 2 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Wyoming (`US-WY`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|

| Identity | Wyoming; WY; FIPS 56 | Census guide; USPS; static |

| Capital and admission | Cheyenne; July 10, 1890 (44th) | Census guide; static |

| Population | 588,753; rank 50 | Census Vintage 2025; 2025-07-01 |

| Land area | 97,093 sq mi; rank 9 | Census 2010; rank derived across 50 states |

| Highest point | Gannett Peak; 13,804 ft | USGS; static |

| Standard time | Mountain | 49 CFR part 71; checked 2026-09-06 |

| Boundaries | segments: CO, ID, MT, NE, SD, UT; points: none; water-only: none; international: none | Census guide + project topology; publication blocked pending audit |

| Formal National Parks | 2; grand-teton-national-park, yellowstone-national-park | nationwide formal-designation table; 2026 |

| Two largest incorporated places | Cheyenne city, Wyoming 66,507; Casper city, Wyoming 58,771 | Census Vintage 2025 workbook; 2025-07-01 |

| Distinctive NPS association | Yellowstone National Park is here. | https://www.nps.gov/yell/; checked 2026-09-06 |

| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidates | Difficulty | Window / dependency | Freshness | Review | Source |
|---|---|---|---|---|---|---|---|---|---|

| `wy.population.500000-1000000` | About 500,000–1 million people lived here in 2025. | population | `population.resident_estimate between [500000,1000000)` | AK, ND, SD, VT, WY (5) | T3/general/indirect | 1–4 / `WY:population:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv |

| `wy.area.rank-6-10` | It ranks 6th–10th in land area. (2010 Census) | area | `area.land_rank between [6,11)` | AZ, CO, NV, OR, WY (5) | T4/specialized/indirect | 1–4 / `WY:area:2010` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-area.html |

| `wy.highpoint.13500-14000` | Its highest point is 13,500–14,000 feet high. | physical_geography | `physical.highest_point between [13500,14000)` | HI, UT, WY (3) | T3/general/indirect | 2–5 / `WY:elevation` | static | draft; evidence checked, wording/fairness pending | https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html |

| `wy.time.mountain` | The whole state uses Mountain Time. | time_zone | `time.standard_zone eq ["Mountain"]` | AZ, CO, MT, NM, UT, WY (6) | T4/general/indirect | 1–4 / `WY:time:2026` | regulatory | draft; evidence checked, wording/fairness pending | https://www.ecfr.gov/current/title-49/subtitle-A/part-71 |

| `wy.parks.formal-2` | It has 2 formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 2` | HI, MT, NM, NV, SD, TX, WY (7) | T4/specialized/indirect | 1–4 / `WY:parks:formal:2026` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/aboutus/national-park-system.htm |

| `wy.history.1890s` | It became a state in the 1890s. | history | `history.admission_year between [1890,1900)` | ID, UT, WY (3) | T3/general/indirect | 1–4 / `WY:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/wyoming.html |

| `wy.history.order-41-50` | It joined the Union between the 41st and 50th states. | history | `history.admission_order between [41,51)` | AK, AZ, HI, ID, MT, NM, OK, UT, WA, WY (10) | T4/specialized/indirect | 2–5 / `WY:admission` | static | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/wyoming.html |

| `wy.borders.segment-count-6` | It shares boundary segments with 6 states. | borders | `boundary.shared_segments count_eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T3/general/indirect | 2–5 / `WY:boundaries` | event_driven | blocked; evidence checked, wording/fairness pending | GUIDE-WY |

| `wy.nps.yellowstone` | Yellowstone National Park is here. | landmark | `nps.associated_unit_path contains /yell/` | ID, MT, WY (3) | T2/general/named_association | 5–6 / `WY:nps:yell` | event_driven | draft; evidence checked, wording/fairness pending | https://www.nps.gov/yell/ |

| `wy.places.top-two-2025` | Cheyenne and Casper were its two largest incorporated places in 2025. | cities | `place.top_two_2025 eq ["Cheyenne city, Wyoming", "Casper city, Wyoming"]` | WY (1) | T2/general/one_to_one | 5–6 / `WY:places:2025` | annual | draft; evidence checked, wording/fairness pending | https://www2.census.gov/programs-surveys/popest/tables/2020-2025/cities/totals/SUB-IP-EST2025-POP-56.xlsx |

| `wy.capital.cheyenne` | Its capital is Cheyenne. | capital | `identity.capital eq "Cheyenne"` | WY (1) | T2/general/one_to_one | 5–6 / `WY:capital` | event_driven | draft; evidence checked, wording/fairness pending | https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/wyoming.html |

| `wy.postal` | Its postal abbreviation is WY. | abbreviation | `identity.postal_code eq "WY"` | WY (1) | T1/iconic/direct_identifier | 7–7 / `WY:postal` | static | draft; evidence checked, wording/fairness pending | https://pe.usps.com/text/pub28/28apb.htm |

| `wy.silhouette` | image | silhouette | `identity.postal_code eq "WY"` | WY (1) | T1/general/direct_identifier | 7–7 / `WY:silhouette` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |

| `wy.locator` | map | map_position | `identity.postal_code eq "WY"` | WY (1) | T1/general/direct_identifier | 7–7 / `WY:locator` | event_driven | blocked; evidence checked, wording/fairness pending | MAP |


Proposed ladder: `parks.formal-2 → history.order-41-50 → time.mountain → population.500000-1000000 → nps.yellowstone → places.top-two-2025 → postal`. Cumulative candidates: **7 → 4 → 3 → 1 → 1 → 1 → 1**.


Rejected/draft notes:

- GDP totals and industry-share clues are excluded from the playable edition.
- Boundary clues remain draft until the nationwide legal/TIGER audit closes.
- Silhouette and locator clues remain blocked until immutable assets exist.

## Required additions before integration

- Archive the 150 new Census/NPS files listed in `newSourceInventory` as immutable raw inputs with their recorded hashes.

- Normalize all 50 incorporated-place tables, capital/admission records, and NPS state-page memberships before approving dependent clues.

- Recompute every candidate set with the repository evaluator after the new snapshot is created.

- Complete the legal/TIGER boundary audit and keep segments, points, water-only, international, and other-jurisdiction relations distinct.

- Generate and visually verify content-hashed silhouette and locator assets.

- Create a new snapshot, clue-set version, and manifests by exclusive creation; never overwrite v1–v3 or existing manifests.

## Validation summary

- States: 35; clue records: 490; proposed ladders: 35.

- Every candidate set was computed over 50 unique state IDs; every clue contains its answer and every stored count matches membership.

- Every ladder has seven clues, ends at one state, uses six distinct dependency groups before the postal clue, and excludes boundary and visual blockers.

- GDP and industry-share clues are absent. Derived area ranks trace to the nationwide land-area values.

- Multi-state NPS units retain every state page on which they appear. Hawaii's lack of incorporated places is represented explicitly.
