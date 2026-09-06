# GeoTrail Clue Ladder research — batch 01 review

Prepared 2026-09-05. This is a read-only research handoff; it does not modify either GeoTrail checkout. Existing Alabama, Colorado, and Rhode Island records are not repeated or changed.

## Scope and reuse decision

Current batch: Alaska, Arizona, Arkansas, California, Connecticut, and Delaware. Remaining queue: Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, and Wyoming.

Reusable nationwide inputs from `us-states-2026-09-05-v2`:

- Census Vintage 2025 state population values and derived 50-state ranks.
- Census 2010 land-area values and derived 50-state ranks.
- USGS highest-point elevations and names from the archived extraction input.
- Census statehood year table.
- 2026 standard-time-zone coverage from 49 CFR part 71.
- USPS postal codes.
- NPS formal National Park enumeration and derived state counts.
- Existing 50-state shared-arc, point-contact, and restricted water-relation facts for candidate calculation only.
- Existing all-state map geometry, from which new silhouette and locator assets can be derived.

Not reusable as publish-ready evidence: the current canonical boundary records cover only 15 audited relations and the docs explicitly say they are not a complete nationwide legal-boundary database; `nps.associated_unit` is intentionally limited to the original three states; capitals and exact admission dates/orders exist only for the original three state profiles; place workbooks exist only for those three; visual assets exist only for those three.

## Review and notation

- `R` = `review.status: draft`, evidence and wording checked, fairness pending reviewer sign-off; candidate evaluation is complete.
- `B` = draft and blocked from approval. The blocker is stated in the source/review column.
- Difficulty is `tier / prior / directness`; all calibration statuses are `editorial_seed`.
- Every proposed fact ID uses snapshot prefix `us-states-NEW:`. New integration must create a new immutable snapshot and clue-set version; `us-states-2026-09-05-v1/v2` must not be altered.
- Candidate sets were freshly evaluated against the 50-state universe for all existing metrics. Named-entity candidates come from an explicit source-provided state list and must be normalized into a closed, finite `association.named_entity` table before approval.
- City and capital predicates use a closed batch entity-membership index, as the existing three-state implementation does. The place entity IDs include Census state FIPS and therefore cannot match another state.

## Source registry additions and reused locators

| Code | Official source and locator |
|---|---|
| POP25 | [Census Vintage 2025 state totals](https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv), `SUMLEV=040`, `POPESTIMATE2025`, reference date 2025-07-01 |
| PLACE25 | [Census City and Town Population Totals, Vintage 2025](https://www.census.gov/data/tables/time-series/demo/popest/2020s-total-cities-and-towns.html), state workbook and row listed below, `2025` column |
| AREA10 | [Census state area measurements](https://www.census.gov/geographies/reference-files/2010/geo/state-area.html), land-area column, boundary basis 2010 |
| GUIDE | [Census Guide to 2010 State and Local Census Geography](https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010.html), state Basic Information/History section |
| ELEV | [USGS Highest and Lowest Elevations](https://www.usgs.gov/educational-resources/highest-and-lowest-elevations), state row, highest point/elevation columns |
| TIME26 | [49 CFR part 71](https://www.ecfr.gov/current/title-49/subtitle-A/part-71), legal snapshot 2026-08-30; [DOT overview](https://www.transportation.gov/regulations/time-act) |
| NPS26 | [NPS National Park System designation list](https://www.nps.gov/aboutus/national-park-system.htm), retrieved 2026-09-05 |
| USPS24 | [USPS Publication 28, Appendix B](https://pe.usps.com/text/pub28/28apb.htm), state row |
| MAP | Existing `states-albers-10m.json` / `CEN-ATLAS-3.0.1`, content-hashed derived asset |
| BOUND | Existing shared-arc reference graph for candidate calculation; approval blocked pending nationwide TIGER topology audit |
| GOOGLE | [Google, “Our story”](https://about.google/company-info/our-story/), Stanford origin and first Menlo Park office |

Downloaded batch PLACE25 inputs (temporary review copies only):

| State | File | SHA-256 |
|---|---|---|
| Alaska | `SUB-IP-EST2025-POP-02.xlsx` | `af35a8d584ecef77fe6d99d360abec2046050121c2bffe1e7163e4416ba1164` |
| Arizona | `SUB-IP-EST2025-POP-04.xlsx` | `67a5a9e24b1a7da32133397e9c8fe1c06cf291ed46452cc27cecd6889291c5e9` |
| Arkansas | `SUB-IP-EST2025-POP-05.xlsx` | `352bb4e164aca33214507cb57bce5d41aa2921fa4e6ffda8b4c4a711c8a6df0b` |
| California | `SUB-IP-EST2025-POP-06.xlsx` | `237d05133a1079469a2d6c2309eb3584bd2fe2400a1c586ce91d760d301c8f86` |
| Connecticut | `SUB-IP-EST2025-POP-09.xlsx` | `2bbd8c3f5c0fa0b842f1dcd0f4f9fbf4cd490f63f9dafead7d8c0ee2701b298b` |
| Delaware | `SUB-IP-EST2025-POP-10.xlsx` | `af90866a2d467b8ae20141406a468a9059aa9268d18a9cc22fe259fef6084637` |

## Alaska (`US-AK`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Alaska; `AK`; FIPS `02`; capital Juneau | GUIDE Alaska Basic Information; USPS24; static |
| Admission | January 3, 1959; 49th state | GUIDE Alaska Basic Information; static |
| Population | 737,270; rank 48 | POP25; 2025-07-01; rank derived from 50 values |
| Land area | 570,641 sq mi; rank 1 | AREA10; rank derived from 50 values |
| Highest point | Denali, 20,320 ft in the cited USGS table | ELEV; static |
| Standard time zones | Alaska and Hawaii–Aleutian | TIME26; legal snapshot 2026-08-30 |
| U.S. state boundaries | No shared state segment, point contact, or audited water-only state boundary | BOUND candidate table; legal-topology review still required |
| Formal National Parks | 8: Denali, Gates of the Arctic, Glacier Bay, Katmai, Kenai Fjords, Kobuk Valley, Lake Clark, Wrangell–St. Elias | NPS26; 2026-09-05 |
| Two largest incorporated places | Anchorage municipality 287,155; Juneau city and borough 31,609 | PLACE25 FIPS 02, rows 14 and 62; 2025-07-01 |
| Distinctive association | The United States acquired Alaska from Russia in 1867 | GUIDE Alaska History; static |
| Visuals | Silhouette and locator can be derived from existing geometry; Alaska needs non-comparable inset handling | MAP; new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `ak.population.0_5-1m` | About 500,000–1 million people lived here in 2025. | population | `population.resident_estimate between [500000,1000000)` | AK, ND, SD, VT, WY (5) | T3/general/indirect | 1–3 | `AK:population:2025` | POP25 / R |
| `ak.area.rank-1-5` | It ranks among the five largest states by land area. (2010 Census) | area | `area.land_rank between [1,6)` | AK, CA, MT, NM, TX (5) | T4/specialized/indirect | 1–4 | `AK:area:2010` | AREA10 / R |
| `ak.highpoint.15000-plus` | Its highest point is above 15,000 feet. | physical_geography | `physical.highest_point gte 15000` | AK (1) | T3/obscure/one_to_one | 3–6 | `AK:elevation` | ELEV / R |
| `ak.time.alaska-aleutian` | Parts use Alaska Time and parts use Hawaii–Aleutian Time. (2026 rules) | time_zone | `time.standard_zone eq [Alaska,Hawaii-Aleutian]` | AK (1) | T2/specialized/one_to_one | 3–6 | `AK:time:2026` | TIME26 / R |
| `ak.parks.formal-8` | It has eight formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 8` | AK (1) | T2/specialized/one_to_one | 4–6 | `AK:parks:2026` | NPS26 / R |
| `ak.history.1950s` | It became a state in the 1950s. | history | `history.admission_year between [1950,1960)` | AK, HI (2) | T3/specialized/indirect | 2–5 | `AK:admission` | GUIDE / R |
| `ak.borders.segment-count-0` | It shares no boundary segment with another state. | borders | `count(boundary.shared_segments) eq 0` | AK, HI (2) | T2/general/indirect | 2–5 | `AK:boundaries` | BOUND / B: nationwide legal classification incomplete |
| `ak.parks.denali-gates` | Denali and Gates of the Arctic National Parks are here. | landmark | `nps.formal_unit_ids contains_all [denali,gates-of-the-arctic]` | AK (1) | T2/general/named_association | 4–6 | `AK:parks:2026` | NPS26 / R; incompatible with park count |
| `ak.history.russia-purchase` | The United States bought this land from Russia in 1867. | history | `association.named_entity contains alaska-purchase-russia` | AK (1) | T2/general/named_association | 3–6 | `AK:history:russia` | GUIDE / R after closed entity table is derived |
| `ak.cities.top2-2025` | Anchorage and Juneau were its two largest incorporated places in 2025. | cities | `place.top_two contains_all [place:AK:anchorage-municipality,place:AK:juneau-city-and-borough]` | AK (1) | T2/general/one_to_one | 5–6 | `AK:places:2025` | PLACE25 / R after new facts are built |
| `ak.capital.juneau` | Its capital is Juneau. | capital | `place.batch_membership contains Juneau AND identity.capital eq Juneau` | AK (1) | T2/general/one_to_one | 5–6 | `AK:capital` | GUIDE / R after new facts are built |
| `ak.postal` | Its postal abbreviation is AK. | abbreviation | `identity.postal_code eq AK` | AK (1) | T1/iconic/direct_identifier | 7–7 | `AK:postal` | USPS24 / R |
| `ak.silhouette` | Which state has this shape? | silhouette | `identity.postal_code eq AK` | AK (1) | T1/general/direct_identifier | 7–7 | `AK:silhouette` | MAP / B: asset not generated |
| `ak.locator` | Which state is highlighted? | map_position | `identity.postal_code eq AK` | AK (1) | T1/general/direct_identifier | 7–7 | `AK:locator` | MAP / B: Alaska inset policy and asset missing |

Proposed seven clues: `population.0_5-1m → history.1950s → area.rank-1-5 → highpoint.15000-plus → time.alaska-aleutian → parks.formal-8 → postal`. Cumulative candidates: **5 → 1 → 1 → 1 → 1 → 1 → 1**. This early collapse is flagged for playtest; Alaska’s combination is inherently distinctive.

Rejected/draft notes: do not say “the whole state uses Alaska Time”; the Aleutian Islands create split coverage. Do not use Anchorage as an ordinary “city” without retaining the Census label “municipality.” Do not combine the eight-park count with named-park clues in one ladder.

## Arizona (`US-AZ`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Arizona; `AZ`; FIPS `04`; capital Phoenix | GUIDE Arizona; USPS24; static |
| Admission | February 14, 1912; 48th state | GUIDE Arizona; static |
| Population | 7,623,818; rank 14 | POP25; 2025-07-01 |
| Land area | 113,594 sq mi; rank 6 | AREA10 |
| Highest point | Humphreys Peak, 12,633 ft | ELEV |
| Standard time zone | Mountain | TIME26; 2026-08-30. This does not assert uniform daylight-saving observance. |
| Boundaries | Segments with CA, NM, NV, UT; point contact with CO; no audited water-only state boundary | BOUND; point contact kept distinct |
| Formal National Parks | 3: Grand Canyon, Petrified Forest, Saguaro | NPS26; 2026-09-05 |
| Two largest incorporated places | Phoenix 1,665,481; Tucson 548,371 | PLACE25 FIPS 04, rows 59 and 86; 2025-07-01 |
| Distinctive association | Arizona and New Mexico each include land acquired in the 1853 Gadsden Purchase | GUIDE Arizona and GUIDE New Mexico |
| Visuals | Derivable from MAP; new content-hashed records/files required | MAP |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `az.population.7-8m` | About 7–8 million people lived here in 2025. | population | `population.resident_estimate between [7000000,8000000)` | AZ, MA, TN (3) | T2/general/indirect | 1–3 | `AZ:population:2025` | POP25 / R |
| `az.area.rank-6-10` | It ranks 6th–10th among states by land area. (2010 Census) | area | `area.land_rank between [6,11)` | AZ, CO, NV, OR, WY (5) | T4/specialized/indirect | 1–4 | `AZ:area:2010` | AREA10 / R |
| `az.highpoint.12000-13000` | Its highest point is 12,000–13,000 feet high. | physical_geography | `physical.highest_point between [12000,13000)` | AZ, ID, MT (3) | T3/specialized/indirect | 2–5 | `AZ:elevation` | ELEV / R |
| `az.time.mountain-all` | The whole state is in the Mountain standard time zone. (2026 rules) | time_zone | `time.standard_zone eq [Mountain]` | AZ, CO, MT, NM, UT, WY (6) | T4/specialized/indirect | 1–4 | `AZ:time:2026` | TIME26 / R; daylight-saving behavior deliberately omitted |
| `az.parks.formal-3` | It has three formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 3` | AZ, FL, WA (3) | T3/general/indirect | 3–6 | `AZ:parks:2026` | NPS26 / R |
| `az.history.1900-1920` | It became a state between 1900 and 1920. | history | `history.admission_year between [1900,1920)` | AZ, NM, OK (3) | T3/specialized/indirect | 2–5 | `AZ:admission` | GUIDE / R |
| `az.borders.segment-count-4` | It shares boundary segments with four states. | borders | `count(boundary.shared_segments) eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NM, NC, OR, TX, WI (13) | T5/specialized/indirect | 1–4 | `AZ:boundaries` | BOUND / B: nationwide legal classification incomplete |
| `az.point.colorado` | It meets Colorado at a point, not along a boundary segment. | physical_geography | `boundary.point_contacts contains US-CO` | AZ (1) | T2/general/one_to_one | 4–6 | `AZ:point-contact` | supplied special-case audit / R |
| `az.parks.grand-canyon-saguaro` | Grand Canyon and Saguaro National Parks are here. | landmark | `nps.formal_unit_ids contains_all [grand-canyon,saguaro]` | AZ (1) | T2/iconic/named_association | 4–6 | `AZ:parks:2026` | NPS26 / R; incompatible with park count |
| `az.history.gadsden` | Part of this state came from the 1853 Gadsden Purchase. | history | `association.named_entity contains gadsden-purchase-land` | AZ, NM (2) | T3/specialized/named_association | 2–5 | `AZ:gadsden` | GUIDE AZ + NM / R after closed entity table is derived |
| `az.cities.top2-2025` | Phoenix and Tucson were its two largest incorporated places in 2025. | cities | `place.top_two contains_all [place:AZ:phoenix-city,place:AZ:tucson-city]` | AZ (1) | T2/general/one_to_one | 5–6 | `AZ:places:2025` | PLACE25 / R after facts are built |
| `az.capital.phoenix` | Its capital is Phoenix. | capital | `place.batch_membership contains Phoenix AND identity.capital eq Phoenix` | AZ (1) | T1/iconic/one_to_one | 6–6 | `AZ:capital` | GUIDE / R; incompatible with city pair before final rungs |
| `az.postal` | Its postal abbreviation is AZ. | abbreviation | `identity.postal_code eq AZ` | AZ (1) | T1/general/direct_identifier | 7–7 | `AZ:postal` | USPS24 / R |
| `az.silhouette` | Which state has this shape? | silhouette | `identity.postal_code eq AZ` | AZ (1) | T1/general/direct_identifier | 7–7 | `AZ:silhouette` | MAP / B: asset missing |

Proposed seven clues: `time.mountain-all → highpoint.12000-13000 → parks.formal-3 → history.1900-1920 → population.7-8m → cities.top2-2025 → postal`. Cumulative candidates: **6 → 2 → 1 → 1 → 1 → 1 → 1**.

Rejected/draft notes: do not say Arizona “does not observe daylight saving time” without a local-exception model for the Navajo Nation. Do not count Colorado as a shared segment. The Gadsden clue must retain New Mexico in its candidate set.

## Arkansas (`US-AR`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Arkansas; `AR`; FIPS `05`; capital Little Rock | GUIDE Arkansas; USPS24 |
| Admission | June 15, 1836; 25th state | GUIDE Arkansas |
| Population | 3,114,791; rank 33 | POP25; 2025-07-01 |
| Land area | 52,035 sq mi; rank 27 | AREA10 |
| Highest point | Magazine Mountain, 2,753 ft | ELEV |
| Standard time zone | Central | TIME26; 2026-08-30 |
| Boundaries | Segments with LA, MO, MS, OK, TN, TX; no point contact or audited water-only state boundary | BOUND |
| Formal National Parks | 1: Hot Springs | NPS26; 2026-09-05 |
| Other notable NPS unit | Little Rock Central High School National Historic Site | NPS Arkansas page / NPS26 |
| Two largest incorporated places | Little Rock 206,427; Fayetteville 106,623 | PLACE25 FIPS 05, rows 282 and 158; 2025-07-01 |
| Visuals | Derivable from MAP; new content-hashed records/files required | MAP |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `ar.population.3-3_5m` | About 3–3.5 million people lived here in 2025. | population | `population.resident_estimate between [3000000,3500000)` | AR, IA, NV (3) | T3/general/indirect | 1–3 | `AR:population:2025` | POP25 / R |
| `ar.area.rank-26-30` | It ranks 26th–30th among states by land area. (2010 Census) | area | `area.land_rank between [26,31)` | AL, AR, FL, NC, NY (5) | T4/specialized/indirect | 1–4 | `AR:area:2010` | AREA10 / R |
| `ar.highpoint.2500-3000` | Its highest point is 2,500–3,000 feet high. | physical_geography | `physical.highest_point between [2500,3000)` | AR (1) | T3/obscure/one_to_one | 3–6 | `AR:elevation` | ELEV / R |
| `ar.time.central-all` | The whole state uses Central Time. (2026 rules) | time_zone | `time.standard_zone eq [Central]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T3/general/indirect | 1–4 | `AR:time:2026` | TIME26 / R |
| `ar.parks.formal-1` | It has one formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T4/general/indirect | 1–3 | `AR:parks:2026` | NPS26 / R |
| `ar.history.1830s` | It became a state in the 1830s. | history | `history.admission_year between [1830,1840)` | AR, MI (2) | T3/specialized/indirect | 2–5 | `AR:admission` | GUIDE / R |
| `ar.borders.segment-count-6` | It shares boundary segments with six states. | borders | `count(boundary.shared_segments) eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T4/specialized/indirect | 1–4 | `AR:boundaries` | BOUND / B: nationwide legal classification incomplete |
| `ar.parks.hot-springs` | Hot Springs National Park is here. | landmark | `nps.formal_unit_ids contains hot-springs-national-park` | AR (1) | T2/general/named_association | 4–6 | `AR:parks:2026` | NPS26 / R; incompatible with park count |
| `ar.landmark.central-high` | Little Rock Central High School National Historic Site is here. | landmark | `association.named_entity contains little-rock-central-high-school-nhs` | AR (1) | T2/general/named_association | 4–6 | `AR:nps-landmark` | NPS26 / R after closed entity table is derived |
| `ar.cities.top2-2025` | Little Rock and Fayetteville were its two largest incorporated places in 2025. | cities | `place.top_two contains_all [place:AR:little-rock-city,place:AR:fayetteville-city]` | AR (1) | T2/general/one_to_one | 5–6 | `AR:places:2025` | PLACE25 / R after facts are built |
| `ar.capital.little-rock` | Its capital is Little Rock. | capital | `place.batch_membership contains Little Rock AND identity.capital eq Little Rock` | AR (1) | T1/iconic/one_to_one | 6–6 | `AR:capital` | GUIDE / R; incompatible with city pair before final rungs |
| `ar.postal` | Its postal abbreviation is AR. | abbreviation | `identity.postal_code eq AR` | AR (1) | T1/general/direct_identifier | 7–7 | `AR:postal` | USPS24 / R |
| `ar.silhouette` | Which state has this shape? | silhouette | `identity.postal_code eq AR` | AR (1) | T1/general/direct_identifier | 7–7 | `AR:silhouette` | MAP / B: asset missing |
| `ar.locator` | Which state is highlighted? | map_position | `identity.postal_code eq AR` | AR (1) | T1/general/direct_identifier | 7–7 | `AR:locator` | MAP / B: asset missing |

Proposed seven clues: `parks.formal-1 → time.central-all → population.3-3_5m → history.1830s → area.rank-26-30 → cities.top2-2025 → postal`. Cumulative candidates: **17 → 4 → 1 → 1 → 1 → 1 → 1**.

Rejected/draft notes: the NPS Arkansas page’s “7 National Parks” is a collective unit count and must not replace the formal count of one. Little Rock is both capital and largest incorporated place, so capital and city-pair clues should not share a ladder except at the end.

## California (`US-CA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | California; `CA`; FIPS `06`; capital Sacramento | GUIDE California; USPS24 |
| Admission | September 9, 1850; 31st state | GUIDE California |
| Population | 39,355,309; rank 1 | POP25; 2025-07-01 |
| Land area | 155,779 sq mi; rank 3 | AREA10 |
| Highest point | Mount Whitney, 14,494 ft in the cited USGS table | ELEV |
| Standard time zone | Pacific | TIME26; 2026-08-30 |
| Boundaries | Segments with AZ, NV, OR; no point contact or audited water-only state boundary | BOUND |
| Formal National Parks | 9: Channel Islands, Death Valley, Joshua Tree, Kings Canyon, Lassen Volcanic, Pinnacles, Redwood, Sequoia, Yosemite | NPS26; Death Valley is multi-state with Nevada |
| Two largest incorporated places | Los Angeles 3,869,089; San Diego 1,406,106 | PLACE25 FIPS 06, rows 245 and 375; 2025-07-01 |
| Distinctive association | Google’s story began at Stanford; its first office was a garage in Menlo Park, California | GOOGLE |
| Visuals | Derivable from MAP; new content-hashed records/files required | MAP |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `ca.population.30m-plus` | More than 30 million people lived here in 2025. | population | `population.resident_estimate gte 30000000` | CA, TX (2) | T2/general/indirect | 1–3 | `CA:population:2025` | POP25 / R |
| `ca.area.rank-1-5` | It ranks among the five largest states by land area. (2010 Census) | area | `area.land_rank between [1,6)` | AK, CA, MT, NM, TX (5) | T4/specialized/indirect | 1–4 | `CA:area:2010` | AREA10 / R |
| `ca.highpoint.14000-15000` | Its highest point is 14,000–15,000 feet high. | physical_geography | `physical.highest_point between [14000,15000)` | CA, CO, WA (3) | T2/general/indirect | 2–5 | `CA:elevation` | ELEV / R |
| `ca.time.pacific-all` | The whole state uses Pacific Time. (2026 rules) | time_zone | `time.standard_zone eq [Pacific]` | CA, WA (2) | T2/general/indirect | 2–5 | `CA:time:2026` | TIME26 / R |
| `ca.parks.formal-9` | It has nine formally designated National Parks. (NPS, 2026) | parks | `nps.formal_national_park_count eq 9` | CA (1) | T2/specialized/one_to_one | 4–6 | `CA:parks:2026` | NPS26 / R |
| `ca.history.1840-1860` | It became a state between 1840 and 1860. | history | `history.admission_year between [1840,1860)` | CA, FL, IA, MN, OR, TX, WI (7) | T4/specialized/indirect | 1–4 | `CA:admission` | GUIDE / R |
| `ca.borders.segment-count-3` | It shares boundary segments with three states. | borders | `count(boundary.shared_segments) eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T4/specialized/indirect | 1–4 | `CA:boundaries` | BOUND / B: nationwide legal classification incomplete |
| `ca.parks.yosemite-redwood` | Yosemite and Redwood National Parks are here. | landmark | `nps.formal_unit_ids contains_all [yosemite,redwood]` | CA (1) | T1/iconic/named_association | 4–6 | `CA:parks:2026` | NPS26 / R; incompatible with park count |
| `ca.business.google-first-office` | Google’s first office was a garage in Menlo Park. | landmark | `association.named_entity contains google-first-office-menlo-park` | CA (1) | T2/general/named_association | 4–6 | `CA:google` | GOOGLE / R after closed entity table is derived |
| `ca.cities.top2-2025` | Los Angeles and San Diego were its two largest incorporated places in 2025. | cities | `place.top_two contains_all [place:CA:los-angeles-city,place:CA:san-diego-city]` | CA (1) | T1/iconic/one_to_one | 5–6 | `CA:places:2025` | PLACE25 / R after facts are built |
| `ca.capital.sacramento` | Its capital is Sacramento. | capital | `place.batch_membership contains Sacramento AND identity.capital eq Sacramento` | CA (1) | T2/general/one_to_one | 5–6 | `CA:capital` | GUIDE / R after facts are built |
| `ca.postal` | Its postal abbreviation is CA. | abbreviation | `identity.postal_code eq CA` | CA (1) | T1/iconic/direct_identifier | 7–7 | `CA:postal` | USPS24 / R |
| `ca.silhouette` | Which state has this shape? | silhouette | `identity.postal_code eq CA` | CA (1) | T1/general/direct_identifier | 7–7 | `CA:silhouette` | MAP / B: asset missing |
| `ca.locator` | Which state is highlighted? | map_position | `identity.postal_code eq CA` | CA (1) | T1/general/direct_identifier | 7–7 | `CA:locator` | MAP / B: asset missing |

Proposed seven clues: `history.1840-1860 → area.rank-1-5 → population.30m-plus → time.pacific-all → highpoint.14000-15000 → capital.sacramento → postal`. Cumulative candidates: **7 → 2 → 2 → 1 → 1 → 1 → 1**.

Rejected/draft notes: use “first office was in Menlo Park,” not “founded in Menlo Park”; Google’s own history distinguishes the Stanford origin, incorporation, and first office. Death Valley must be stored as a multi-state park association with Nevada.

## Connecticut (`US-CT`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Connecticut; `CT`; FIPS `09`; capital Hartford | GUIDE Connecticut; USPS24 |
| Admission | January 9, 1788; 5th state | GUIDE Connecticut |
| Population | 3,688,496; rank 29 | POP25; 2025-07-01 |
| Land area | 4,842 sq mi; rank 48 | AREA10 |
| Highest point | South slope of Mount Frissell at the state line, 2,380 ft | ELEV |
| Standard time zone | Eastern | TIME26; 2026-08-30 |
| Boundaries | Segments with MA, NY, RI; no point contact or audited water-only state boundary | BOUND |
| Formal National Parks | 0 | NPS26; 2026-09-05 |
| Notable NPS units | Coltsville and Weir Farm National Historical Parks; Appalachian and New England National Scenic Trails | NPS Connecticut page / NPS26 |
| Two largest incorporated places | Bridgeport 152,273; Stamford 139,535 | PLACE25 FIPS 09, rows 7 and 29; 2025-07-01 |
| Distinctive association | Samuel Colt started his Hartford factory in 1847 | NPS Connecticut, Coltsville |
| Visuals | Derivable from MAP; new content-hashed records/files required | MAP |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `ct.population.3_5-4m` | About 3.5–4 million people lived here in 2025. | population | `population.resident_estimate between [3500000,4000000)` | CT, UT (2) | T2/general/indirect | 1–3 | `CT:population:2025` | POP25 / R |
| `ct.area.rank-46-50` | It ranks among the five smallest states by land area. (2010 Census) | area | `area.land_rank between [46,51)` | CT, DE, HI, NJ, RI (5) | T3/general/indirect | 1–4 | `CT:area:2010` | AREA10 / R |
| `ct.highpoint.2000-2500` | Its highest point is 2,000–2,500 feet high. | physical_geography | `physical.highest_point between [2000,2500)` | AL, CT, MN (3) | T3/specialized/indirect | 2–5 | `CT:elevation` | ELEV / R |
| `ct.time.eastern-all` | The whole state uses Eastern Time. (2026 rules) | time_zone | `time.standard_zone eq [Eastern]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 | `CT:time:2026` | TIME26 / R |
| `ct.parks.formal-0` | It has no formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T5/specialized/indirect | 1–3 | `CT:parks:2026` | NPS26 / R |
| `ct.history.1788` | It joined the Union in 1788. | history | `history.admission_year eq 1788` | CT, GA, MA, MD, NH, NY, SC, VA (8) | T4/specialized/indirect | 1–4 | `CT:admission` | GUIDE / R |
| `ct.borders.segment-count-3` | It shares boundary segments with three states. | borders | `count(boundary.shared_segments) eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T4/specialized/indirect | 1–4 | `CT:boundaries` | BOUND / B: nationwide legal classification incomplete |
| `ct.landmark.coltsville` | Coltsville National Historical Park is in Hartford. | landmark | `association.named_entity contains coltsville-nhp` | CT (1) | T2/general/named_association | 4–6 | `CT:nps-coltsville` | NPS26 / R after closed entity table is derived |
| `ct.landmark.weir-farm` | Weir Farm National Historical Park is here. | landmark | `association.named_entity contains weir-farm-nhp` | CT (1) | T2/specialized/named_association | 4–6 | `CT:nps-weir` | NPS26 / R; same category, use at most one |
| `ct.cities.top2-2025` | Bridgeport and Stamford were its two largest incorporated places in 2025. | cities | `place.top_two contains_all [place:CT:bridgeport-city,place:CT:stamford-city]` | CT (1) | T2/general/one_to_one | 5–6 | `CT:places:2025` | PLACE25 / R; do not substitute town populations |
| `ct.capital.hartford` | Its capital is Hartford. | capital | `place.batch_membership contains Hartford AND identity.capital eq Hartford` | CT (1) | T2/general/one_to_one | 5–6 | `CT:capital` | GUIDE / R after facts are built |
| `ct.postal` | Its postal abbreviation is CT. | abbreviation | `identity.postal_code eq CT` | CT (1) | T1/general/direct_identifier | 7–7 | `CT:postal` | USPS24 / R |
| `ct.silhouette` | Which state has this shape? | silhouette | `identity.postal_code eq CT` | CT (1) | T1/general/direct_identifier | 7–7 | `CT:silhouette` | MAP / B: asset missing |
| `ct.locator` | Which state is highlighted? | map_position | `identity.postal_code eq CT` | CT (1) | T1/general/direct_identifier | 7–7 | `CT:locator` | MAP / B: asset missing |

Proposed seven clues: `history.1788 → parks.formal-0 → time.eastern-all → area.rank-46-50 → highpoint.2000-2500 → cities.top2-2025 → postal`. Cumulative candidates: **8 → 6 → 6 → 1 → 1 → 1 → 1**.

Rejected/draft notes: “highest point is Mount Frissell” is imprecise; the USGS row says the south slope at the state line. Do not rank Connecticut towns against incorporated places; the workbook’s incorporated-place universe is intentional.

## Delaware (`US-DE`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Delaware; `DE`; FIPS `10`; capital Dover | GUIDE Delaware; USPS24 |
| Admission | December 7, 1787; 1st state | GUIDE Delaware |
| Population | 1,059,952; rank 45 | POP25; 2025-07-01 |
| Land area | 1,949 sq mi; rank 49 | AREA10 |
| Highest point | Ebright Road at the Delaware–Pennsylvania state line, 448 ft | ELEV |
| Standard time zone | Eastern | TIME26; 2026-08-30 |
| Boundaries | Segments with MD, NJ, PA; no point contact or audited water-only state boundary | BOUND |
| Formal National Parks | 0 | NPS26; 2026-09-05 |
| Notable NPS unit | First State National Historical Park; NPS state listing includes DE and PA | NPS Delaware page |
| Two largest incorporated places | Wilmington 73,512; Dover 40,592 | PLACE25 FIPS 10, rows 59 and 21; 2025-07-01 |
| Distinctive association | Its northern boundary with Pennsylvania is the Twelve-Mile Circle, centered on the New Castle courthouse cupola | GUIDE Delaware |
| Visuals | Derivable from MAP; new content-hashed records/files required | MAP |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `de.population.1-1_5m` | About 1–1.5 million people lived here in 2025. | population | `population.resident_estimate between [1000000,1500000)` | DE, HI, ME, MT, NH, RI (6) | T4/general/indirect | 1–3 | `DE:population:2025` | POP25 / R |
| `de.area.rank-46-50` | It ranks among the five smallest states by land area. (2010 Census) | area | `area.land_rank between [46,51)` | CT, DE, HI, NJ, RI (5) | T3/general/indirect | 1–4 | `DE:area:2010` | AREA10 / R |
| `de.highpoint.under-500` | Its highest point is below 500 feet. | physical_geography | `physical.highest_point lt 500` | DE, FL (2) | T3/specialized/indirect | 2–5 | `DE:elevation` | ELEV / R |
| `de.time.eastern-all` | The whole state uses Eastern Time. (2026 rules) | time_zone | `time.standard_zone eq [Eastern]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T4/general/indirect | 1–4 | `DE:time:2026` | TIME26 / R |
| `de.parks.formal-0` | It has no formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T5/specialized/indirect | 1–3 | `DE:parks:2026` | NPS26 / R |
| `de.history.1787` | It joined the Union in 1787. | history | `history.admission_year eq 1787` | DE, NJ, PA (3) | T3/specialized/indirect | 2–5 | `DE:admission` | GUIDE / R |
| `de.borders.segment-count-3` | It shares boundary segments with three states. | borders | `count(boundary.shared_segments) eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T4/specialized/indirect | 1–4 | `DE:boundaries` | BOUND / B: nationwide legal classification incomplete |
| `de.landmark.first-state` | First State National Historical Park has sites here. | landmark | `association.named_entity contains first-state-nhp` | DE, PA (2) | T2/general/named_association | 4–6 | `DE:nps-first-state` | NPS Delaware / R; preserve multi-state membership |
| `de.boundary.twelve-mile` | Its northern boundary with Pennsylvania is the Twelve-Mile Circle. | borders | `association.named_entity contains twelve-mile-circle-northern-boundary` | DE (1) | T2/specialized/named_association | 4–6 | `DE:twelve-mile-circle` | GUIDE Delaware / R after closed entity table is derived |
| `de.cities.top2-2025` | Wilmington and Dover were its two largest incorporated places in 2025. | cities | `place.top_two contains_all [place:DE:wilmington-city,place:DE:dover-city]` | DE (1) | T2/general/one_to_one | 5–6 | `DE:places:2025` | PLACE25 / R |
| `de.capital.dover` | Its capital is Dover. | capital | `place.batch_membership contains Dover AND identity.capital eq Dover` | DE (1) | T2/general/one_to_one | 5–6 | `DE:capital` | GUIDE / R; incompatible with city pair before final rungs |
| `de.postal` | Its postal abbreviation is DE. | abbreviation | `identity.postal_code eq DE` | DE (1) | T1/general/direct_identifier | 7–7 | `DE:postal` | USPS24 / R |
| `de.silhouette` | Which state has this shape? | silhouette | `identity.postal_code eq DE` | DE (1) | T1/general/direct_identifier | 7–7 | `DE:silhouette` | MAP / B: asset missing |
| `de.locator` | Which state is highlighted? | map_position | `identity.postal_code eq DE` | DE (1) | T1/general/direct_identifier | 7–7 | `DE:locator` | MAP / B: asset missing |

Proposed seven clues: `parks.formal-0 → population.1-1_5m → area.rank-46-50 → history.1787 → time.eastern-all → highpoint.under-500 → postal`. Cumulative candidates: **19 → 3 → 2 → 1 → 1 → 1 → 1**.

Rejected/draft notes: the NPS state page’s “1 National Park” is a collective label for First State National Historical Park, not a formally designated National Park. Dover is both the capital and second-largest incorporated place, so capital and city-pair clues should not share a ladder except at the end.

## New snapshot and nationwide tables required

1. Add a new immutable snapshot ID and clue-set version; do not edit `us-states-2026-09-05-v1`, `us-states-2026-09-05-v2`, `audited-examples-v1`, `short-seven-v1`, or saved manifests.
2. Archive all 47 missing Census Vintage 2025 incorporated-place workbooks, not only these six. Add verified `place.population_estimate`, `place.within_state_rank`, and `place.top_two` facts under one vintage. Preserve Alaska municipality/city-and-borough labels and Connecticut’s incorporated-place universe.
3. Archive all 50 Census state geography guides (or a single official table with equivalent fields) and build complete `identity.capital`, `history.admission_date`, and `history.admission_order` tables. Exact-order clues remain blocked until this is complete.
4. Archive the current NPS system enumeration and state/unit association data. Keep formal National Park counts separate from National Historical Parks, monuments, trails, preserves, and administrative associations. Preserve multi-state associations.
5. Build a finite `association.named_entity` reference table. Each entity row must carry an explicit official state list; directional per-state facts can then be complete without claiming the list contains every possible association.
6. Run a reproducible 2025 TIGER spatial topology pass for all state pairs. Emit distinct segment/point-contact/water-only records, source feature IDs, tolerance, and symmetric directional facts. Keep AZ–CO and NM–UT as point contacts and RI–NY as water-only. Until then, boundary-count clues above remain draft.
7. Generate 47 silhouettes and 47 locator assets from the existing geometry with the same projection/simplification policy. Use content-hashed filenames and generic pre-answer alt text. Treat Alaska and Hawaii with explicit inset/non-comparable-scale rules.
8. Add raw snapshots for each non-federal association source, including Google’s company history where used, with retrieval time and SHA-256 when downloaded.

Missing-state set for complete capitals/admission dates/orders and place top-two tables after this batch plus the existing three is integrated: **FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY** (41 states). Missing-state values must remain unknown, never false or zero.

## Validation summary

- Universe: 50 unique state IDs; D.C. and territories excluded.
- Existing nationwide candidate evaluations used exact normalized values, not guessed counts.
- Fresh candidate sets were computed for 47 reusable-metric clue variants in this batch; every listed answer is in its set.
- Proposed seven-clue cumulative counts were recomputed by set intersection. All six end at one state. Arizona, California, and Delaware show the cleanest early progression; Alaska and Arkansas identify early and need playtest calibration, not fabricated broadening.
- No GDP or industry-share clues appear.
- No missing value is treated as false or zero.
- Boundary types remain separate. No point contact or water-only relationship is silently counted as a shared segment.
- Formal National Parks remain separate from other NPS units. Multi-state units are retained as multi-state.
- Place wording consistently says “incorporated places” and preserves Census legal labels.
- Capital/city redundancy is called out for Arizona, Arkansas, and Delaware where the capital appears in the top-two clue.
- All new clue records remain draft until reviewer sign-off and new-snapshot integration. Boundary and visual clues carry explicit blockers. No puzzle manifest is proposed for publication yet.

## Integration recommendation after approval

Integrate this batch only after the nationwide capital/admission/place/NPS entity tables and boundary audit are available. Then build new normalized facts, recompute every candidate set with the repository evaluator, run schema and semantic validation, compile seven-rung ladders, and publish new immutable manifests by exclusive creation. Any discrepancy between this research handoff and fresh compiler output should fail the build rather than being manually overridden.
