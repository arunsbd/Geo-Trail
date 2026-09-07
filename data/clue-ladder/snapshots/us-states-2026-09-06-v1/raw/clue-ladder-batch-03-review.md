# GeoTrail Clue Ladder research — Batch 3

Prepared 2026-09-06. This is a research handoff outside the repository. It does not change the existing Alabama, Colorado, Rhode Island, or Batch 1 records, and it does not publish a snapshot or manifest.

## Scope

Batch 3 covers **Iowa, Kansas, Kentucky, Louisiana, Maine, and Maryland**. No Batch 2 artifact was present in the shared workspace, so this numbering assumes Batch 2 covers Florida, Georgia, Hawaii, Idaho, Illinois, and Indiana.

Reusable nationwide inputs from `us-states-2026-09-05-v3`:

- Census Vintage 2025 state populations and derived 50-state ranks.
- Census 2010 land areas and reproducibly derived ranks.
- USGS highest-point values and names.
- Statehood years, federal standard-time-zone coverage, USPS abbreviations, and exact formal-National-Park counts.
- The existing 50-state shared-segment graph for candidate calculation only; it remains blocked for publishing until the full legal/topological audit is complete.

New batch inputs are six Census Vintage 2025 incorporated-place workbooks and official Census/NPS state pages. State-guide URLs also support capital, admission date/order, FIPS, and terminology.

## Review notation

- `R`: evidence and 50-state candidate evaluation are ready for review.
- `D`: draft; the state claim is sourced, but a closed nationwide entity table is still required before approval.
- `B`: blocked; do not compile or publish.
- Numeric intervals are half-open: `[lower, upper)`.
- Direct identifiers stay at rung 7. Capital, city, named-landmark, and cultural clues stay late.

## Source registry

| Code | Authoritative source | Reference period / use |
|---|---|---|
| POP25 | [Census Vintage 2025 state totals](https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv) | `POPESTIMATE2025`, 2025-07-01 |
| PLACE25 | [Census 2020–2025 city and town estimates](https://www.census.gov/data/tables/time-series/demo/popest/2020s-total-cities-and-towns.html) | incorporated places, 2025-07-01 |
| AREA10 | [Census state area measurements](https://www.census.gov/geographies/reference-files/2010/geo/state-area.html) | MAF/TIGER boundaries as of 2010-01-01 |
| ELEV | [USGS Elevations and Distances](https://pubs.usgs.gov/gip/Elevations-Distances/elvadist.html) | static physical reference; archive version retained |
| TIME26 | [49 CFR Part 71](https://www.ecfr.gov/current/title-49/subtitle-A/part-71) | standard-zone rules checked 2026-09-06 |
| NPS-IA | [NPS Iowa](https://www.nps.gov/state/ia/index.htm) | units checked 2026-09-06 |
| NPS-KS | [NPS Kansas](https://www.nps.gov/state/ks/index.htm) | units checked 2026-09-06 |
| NPS-KY | [NPS Kentucky](https://www.nps.gov/state/ky/index.htm) | units checked 2026-09-06 |
| NPS-LA | [NPS Louisiana](https://www.nps.gov/state/la/index.htm) | units checked 2026-09-06 |
| NPS-ME | [NPS Maine](https://www.nps.gov/state/me/index.htm) | units checked 2026-09-06 |
| NPS-MD | [NPS Maryland](https://www.nps.gov/state/md/index.htm) | units checked 2026-09-06 |
| GUIDE-IA | [Census Iowa guide](https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/iowa.html) | capital, admission, boundaries, FIPS |
| GUIDE-KS | [Census Kansas guide](https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/kansas.html) | capital, admission, boundaries, FIPS |
| GUIDE-KY | [Census Kentucky guide](https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/kentucky.html) | capital, admission, boundaries, FIPS |
| GUIDE-LA | [Census Louisiana guide](https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/louisiana.html) | capital, admission, boundaries, FIPS |
| GUIDE-ME | [Census Maine guide](https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/maine.html) | capital, admission, boundaries, FIPS |
| GUIDE-MD | [Census Maryland guide](https://www.census.gov/geographies/reference-files/2010/geo/state-local-geo-guides-2010/maryland.html) | capital, admission, boundaries, FIPS |

Archived PLACE25 inputs and SHA-256 hashes:

| State | Workbook | SHA-256 |
|---|---|---|
| Iowa | `SUB-IP-EST2025-POP-19.xlsx` | `3ee976c87e94e163ac87e0989941c0f7280e4187b2010fb0ce1b82562b06fc20` |
| Kansas | `SUB-IP-EST2025-POP-20.xlsx` | `5919e01b8acc2f95319a3b4ebf6a5cded1a10f4b157c7425908b1c763458a238` |
| Kentucky | `SUB-IP-EST2025-POP-21.xlsx` | `962a4af3984131e56fc4cb073cef7fddc58615c14f5ce3ac86e4c99e3b87e0bd` |
| Louisiana | `SUB-IP-EST2025-POP-22.xlsx` | `d6b6136c44742512a4eea8bc601439737d34eccf6d1e716034bb0f04f721219e` |
| Maine | `SUB-IP-EST2025-POP-23.xlsx` | `87e484933d55048d583b5d363f4616c3992277a71aad1431f09056a659945a2e` |
| Maryland | `SUB-IP-EST2025-POP-24.xlsx` | `2f6c36d79aa6bd968c287be3595e06c9be5bdcb3636ea6f91730c14efd3b18d8` |

## Iowa (`US-IA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Iowa; IA; FIPS 19 | GUIDE-IA; USPS identity table |
| Capital | Des Moines | GUIDE-IA; static |
| Admission | 1846-12-28; 29th state | GUIDE-IA; static |
| Population | 3,238,387; rank 32 | POP25; 2025-07-01 |
| Land area | 55,857 sq mi; rank 23 | AREA10; derived 50-state rank |
| Highest point | Hawkeye Point; 1,670 ft | ELEV; static |
| Standard time | Central | TIME26; 2026 rules |
| State boundary segments | IL, MN, MO, NE, SD, WI (6); no point contacts or audited water-only relation | existing topology; publishing blocked pending audit |
| Formal National Parks | 0 | nationwide formal-designation table; 2026 |
| Other NPS units | Effigy Mounds National Monument; Herbert Hoover National Historic Site | NPS-IA; 2026 |
| Two largest incorporated places | Des Moines city 212,086; Cedar Rapids city 137,935 | PLACE25 sheet `SUB-IP-EST2025-POP-19`, rows 227 and 138 |
| Distinctive association | Herbert Hoover was born in West Branch, Iowa | [NPS Herbert Hoover](https://www.nps.gov/people/herbert-hoover.htm); static |
| Visuals | silhouette and locator derivable from existing map geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `ia.population.3-3_5m` | About 3–3.5 million people lived here in 2025. | population | `population.resident_estimate between [3000000,3500000)` | AR, IA, NV (3) | T3/general/indirect | 1–4 | `IA:population:2025` | POP25 / R |
| `ia.area.rank-21-25` | It ranks 21st–25th in land area. (2010 Census) | area | `area.land_rank between [21,26)` | GA, IA, IL, MI, WI (5) | T4/specialized/indirect | 2–5 | `IA:area:2010` | AREA10 / R |
| `ia.highpoint.1500-2000` | Its highest point is 1,500–2,000 feet high. | physical_geography | `physical.highest_point between [1500,2000)` | IA, MI, MO, NJ, OH, WI (6) | T3/general/indirect | 2–5 | `IA:elevation` | ELEV / R |
| `ia.time.central-all` | The whole state uses Central Time. | time_zone | `time.standard_zone eq [Central]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 | `IA:time:2026` | TIME26 / R |
| `ia.parks.formal-0` | It has no formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T5/specialized/indirect | 1–3 | `IA:parks:2026` | NPS nationwide / R |
| `ia.history.1840s` | It became a state in the 1840s. | history | `history.admission_year between [1840,1850)` | FL, IA, TX, WI (4) | T3/general/indirect | 2–5 | `IA:admission` | GUIDE-IA / R |
| `ia.borders.segment-count-6` | It shares boundary segments with six states. | borders | `count(boundary.shared_segments) eq 6` | AR, CO, IA, ID, NE, OK, PA, SD, WY (9) | T3/general/indirect | 2–5 | `IA:boundaries` | GUIDE-IA + topology / B: national legal audit incomplete |
| `ia.nps.effigy-mounds` | Effigy Mounds National Monument is here. | landmark | `nps.associated_unit contains effigy-mounds-national-monument` | IA (1 proposed) | T2/general/named_association | 5–6 | `IA:nps:effigy-mounds` | NPS-IA / D: nationwide associated-unit table incomplete |
| `ia.history.herbert-hoover` | President Herbert Hoover was born in this state. | history | `association.person_birthplace contains herbert-hoover` | IA (1 proposed) | T2/general/named_association | 5–6 | `IA:association:hoover` | NPS / D: closed person-association table needed |
| `ia.cities.top2-2025` | Des Moines and Cedar Rapids were its two largest incorporated places in 2025. | cities | `place.top_two eq [des-moines-city,cedar-rapids-city]` | IA (1 proposed) | T2/general/one_to_one | 5–6 | `IA:places:2025` | PLACE25 / D: nationwide place table incomplete |
| `ia.capital.des-moines` | Its capital is Des Moines. | capital | `identity.capital eq Des Moines` | IA (1 proposed) | T2/general/one_to_one | 5–6 | `IA:capital` | GUIDE-IA / D: nationwide capital table incomplete |
| `ia.postal` | Its postal abbreviation is IA. | abbreviation | `identity.postal_code eq IA` | IA (1) | T1/iconic/direct_identifier | 7–7 | `IA:postal` | USPS / R |
| `ia.silhouette` | Which state has this shape? | silhouette | `identity.state_id eq US-IA` | IA (1) | T1/general/direct_identifier | 7–7 | `IA:silhouette` | map geometry / B: asset missing |
| `ia.locator` | Which state is highlighted? | map_position | `identity.state_id eq US-IA` | IA (1) | T1/general/direct_identifier | 7–7 | `IA:locator` | map geometry / B: asset missing |

Proposed ladder: `parks.formal-0 → time.central-all → history.1840s → area.rank-21-25 → population.3-3_5m → highpoint.1500-2000 → postal`. Cumulative candidates: **19 → 6 → 2 → 2 → 1 → 1 → 1**.

Rejected/draft notes: “farm state” and “corn state” are vague without a closed nationwide agricultural table. Do not pair Des Moines as both capital and top-place clue. Effigy Mounds and Hoover remain drafts until nationwide entity predicates can return true, false, or unknown for every state.

## Kansas (`US-KS`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Kansas; KS; FIPS 20 | GUIDE-KS; USPS |
| Capital | Topeka | GUIDE-KS; static |
| Admission | 1861-01-29; 34th state | GUIDE-KS; static |
| Population | 2,977,220; rank 34 | POP25; 2025-07-01 |
| Land area | 81,759 sq mi; rank 13 | AREA10; derived rank |
| Highest point | Mount Sunflower; 4,039 ft | ELEV; static |
| Standard time | Central and Mountain | TIME26; 2026 rules |
| State boundary segments | CO, MO, NE, OK (4); no point contacts or audited water-only relation | existing topology; publishing blocked pending audit |
| Formal National Parks | 0 | nationwide formal-designation table; 2026 |
| Other NPS units | Brown v. Board of Education National Historical Park; Tallgrass Prairie National Preserve | NPS-KS; 2026 |
| Two largest incorporated places | Wichita city 400,987; Overland Park city 203,677 | PLACE25 sheet `SUB-IP-EST2025-POP-20`, rows 613 and 446 |
| Distinctive association | The Brown v. Board story is preserved at the former Monroe Elementary School in Topeka | [NPS Brown v. Board](https://www.nps.gov/brvb/); 2026 |
| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `ks.population.2_5-3m` | About 2.5–3 million people lived here in 2025. | population | `population.resident_estimate between [2500000,3000000)` | KS, MS (2) | T3/general/indirect | 2–5 | `KS:population:2025` | POP25 / R |
| `ks.area.rank-11-15` | It ranks 11th–15th in land area. (2010 Census) | area | `area.land_rank between [11,16)` | ID, KS, MN, NE, UT (5) | T4/specialized/indirect | 2–5 | `KS:area:2010` | AREA10 / R |
| `ks.highpoint.4000-4500` | Its highest point is 4,000–4,500 feet high. | physical_geography | `physical.highest_point between [4000,4500)` | KS, KY, VT (3) | T3/general/indirect | 3–5 | `KS:elevation` | ELEV / R |
| `ks.time.central-mountain` | Parts use Central Time and parts use Mountain Time. | time_zone | `time.standard_zone eq [Central,Mountain]` | KS, ND, NE, SD, TX (5) | T3/general/indirect | 2–5 | `KS:time:2026` | TIME26 / R |
| `ks.parks.formal-0` | It has no formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T5/specialized/indirect | 1–3 | `KS:parks:2026` | NPS nationwide / R |
| `ks.history.1860s` | It became a state in the 1860s. | history | `history.admission_year between [1860,1870)` | KS, NE, NV, WV (4) | T3/general/indirect | 2–5 | `KS:admission` | GUIDE-KS / R |
| `ks.borders.segment-count-4` | It shares boundary segments with four states. | borders | `count(boundary.shared_segments) eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T4/general/indirect | 1–4 | `KS:boundaries` | GUIDE-KS + topology / B |
| `ks.nps.brown-board` | A national park in Topeka tells the Brown v. Board story. | landmark | `nps.associated_unit contains brown-v-board-nhp` | KS (1 proposed) | T2/general/named_association | 5–6 | `KS:nps:brown` | NPS-KS / D: nationwide associated-unit table incomplete |
| `ks.history.louisiana-purchase` | This land was acquired in the Louisiana Purchase. | history | `association.territorial_origin contains louisiana-purchase` | AR, CO, IA, KS, LA, MN, MO, MT, ND, NE, NM, OK, SD, TX, WY (15 proposed) | T4/general/indirect | 1–4 | `KS:history:louisiana-purchase` | GUIDE-KS / D: closed territorial table needed |
| `ks.cities.top2-2025` | Wichita and Overland Park were its two largest incorporated places in 2025. | cities | `place.top_two eq [wichita-city,overland-park-city]` | KS (1 proposed) | T2/general/one_to_one | 5–6 | `KS:places:2025` | PLACE25 / D |
| `ks.capital.topeka` | Its capital is Topeka. | capital | `identity.capital eq Topeka` | KS (1 proposed) | T2/general/one_to_one | 5–6 | `KS:capital` | GUIDE-KS / D |
| `ks.postal` | Its postal abbreviation is KS. | abbreviation | `identity.postal_code eq KS` | KS (1) | T1/iconic/direct_identifier | 7–7 | `KS:postal` | USPS / R |
| `ks.silhouette` | Which state has this shape? | silhouette | `identity.state_id eq US-KS` | KS (1) | T1/general/direct_identifier | 7–7 | `KS:silhouette` | map geometry / B |
| `ks.locator` | Which state is highlighted? | map_position | `identity.state_id eq US-KS` | KS (1) | T1/general/direct_identifier | 7–7 | `KS:locator` | map geometry / B |

Proposed ladder: `parks.formal-0 → population.2_5-3m → area.rank-11-15 → time.central-mountain → history.1860s → highpoint.4000-4500 → postal`. Cumulative candidates: **19 → 2 → 1 → 1 → 1 → 1 → 1**. This avoids depending on the blocked boundary graph, although it identifies Kansas early.

Rejected/draft notes: “the geographic center of the contiguous U.S.” needs a precise center definition and nationwide entity model. “Wheat State” is not used. The Louisiana Purchase candidate set is provisional and must not be published before all territorial-origin facts are normalized.

## Kentucky (`US-KY`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Kentucky; KY; FIPS 21 | GUIDE-KY; USPS |
| Capital | Frankfort | GUIDE-KY; static |
| Admission | 1792-06-01; 15th state | GUIDE-KY; static |
| Population | 4,606,864; rank 26 | POP25; 2025-07-01 |
| Land area | 39,486 sq mi; rank 37 | AREA10; derived rank |
| Highest point | Black Mountain; 4,145 ft | ELEV; static |
| Standard time | Eastern and Central | TIME26; 2026 rules |
| State boundary segments | IL, IN, MO, OH, TN, VA, WV (7); no point contacts or audited water-only relation | existing topology; publishing blocked pending audit |
| Formal National Parks | 1: Mammoth Cave National Park | nationwide formal-unit table; 2026 |
| Other NPS units | Mill Springs Battlefield National Monument; Abraham Lincoln Birthplace National Historical Park | NPS-KY; 2026 |
| Two largest incorporated places | Louisville/Jefferson County metro government (balance) 641,962; Lexington-Fayette urban county 329,751 | PLACE25 sheet `SUB-IP-EST2025-POP-21`, rows 230 and 222 |
| Distinctive association | Mammoth Cave is the world’s longest known cave system | [NPS Mammoth Cave](https://www.nps.gov/articles/mammothcave.htm); current page |
| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `ky.population.4_5-5m` | About 4.5–5 million people lived here in 2025. | population | `population.resident_estimate between [4500000,5000000)` | KY, LA (2) | T3/general/indirect | 2–5 | `KY:population:2025` | POP25 / R |
| `ky.area.rank-36-40` | It ranks 36th–40th in land area. (2010 Census) | area | `area.land_rank between [36,41)` | IN, KY, ME, SC, VA (5) | T4/specialized/indirect | 2–5 | `KY:area:2010` | AREA10 / R |
| `ky.highpoint.4000-4500` | Its highest point is 4,000–4,500 feet high. | physical_geography | `physical.highest_point between [4000,4500)` | KS, KY, VT (3) | T3/general/indirect | 3–5 | `KY:elevation` | ELEV / R |
| `ky.time.eastern-central` | Parts use Eastern Time and parts use Central Time. | time_zone | `time.standard_zone eq [Eastern,Central]` | FL, IN, KY, MI, TN (5) | T3/general/indirect | 1–4 | `KY:time:2026` | TIME26 / R |
| `ky.parks.formal-1` | It has one formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T5/specialized/indirect | 1–3 | `KY:parks:2026` | NPS nationwide / R |
| `ky.history.1790s` | It became a state in the 1790s. | history | `history.admission_year between [1790,1800)` | KY, RI, TN, VT (4) | T3/general/indirect | 2–5 | `KY:admission` | GUIDE-KY / R |
| `ky.borders.segment-count-7` | It shares boundary segments with seven states. | borders | `count(boundary.shared_segments) eq 7` | KY (1) | T2/general/one_to_one | 4–6 | `KY:boundaries` | GUIDE-KY + topology / B |
| `ky.parks.mammoth-cave` | Mammoth Cave National Park is here. | landmark | `nps.formal_unit_ids contains mammoth-cave-national-park` | KY (1) | T2/general/named_association | 5–6 | `KY:parks:mammoth-cave` | NPS formal table / R |
| `ky.nps.mill-springs` | Mill Springs Battlefield National Monument is here. | landmark | `nps.associated_unit contains mill-springs-battlefield` | KY (1 proposed) | T3/general/named_association | 5–6 | `KY:nps:mill-springs` | NPS-KY / D |
| `ky.cities.top2-2025` | Louisville/Jefferson County and Lexington-Fayette were its two largest incorporated places in 2025. | cities | `place.top_two eq [louisville-jefferson-balance,lexington-fayette]` | KY (1 proposed) | T2/general/one_to_one | 5–6 | `KY:places:2025` | PLACE25 / D; retain Census legal labels |
| `ky.capital.frankfort` | Its capital is Frankfort. | capital | `identity.capital eq Frankfort` | KY (1 proposed) | T2/general/one_to_one | 5–6 | `KY:capital` | GUIDE-KY / D |
| `ky.postal` | Its postal abbreviation is KY. | abbreviation | `identity.postal_code eq KY` | KY (1) | T1/iconic/direct_identifier | 7–7 | `KY:postal` | USPS / R |
| `ky.silhouette` | Which state has this shape? | silhouette | `identity.state_id eq US-KY` | KY (1) | T1/general/direct_identifier | 7–7 | `KY:silhouette` | map geometry / B |
| `ky.locator` | Which state is highlighted? | map_position | `identity.state_id eq US-KY` | KY (1) | T1/general/direct_identifier | 7–7 | `KY:locator` | map geometry / B |

Proposed ladder: `parks.formal-1 → time.eastern-central → area.rank-36-40 → history.1790s → population.4_5-5m → highpoint.4000-4500 → postal`. Cumulative candidates: **17 → 4 → 2 → 1 → 1 → 1 → 1**.

Rejected/draft notes: do not shorten the top two places to ordinary city names in normalized data; both are consolidated-government Census entities. Do not pair the formal park count and Mammoth Cave name if the compiler treats them as the same dependency group; use population or elevation instead.

## Louisiana (`US-LA`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Louisiana; LA; FIPS 22 | GUIDE-LA; USPS |
| Capital | Baton Rouge | GUIDE-LA; static |
| Admission | 1812-04-30; 18th state | GUIDE-LA; static |
| Population | 4,618,189; rank 25 | POP25; 2025-07-01 |
| Land area | 43,204 sq mi; rank 33 | AREA10; derived rank |
| Highest point | Driskill Mountain; 535 ft | ELEV; static |
| Standard time | Central | TIME26; 2026 rules |
| State boundary segments | AR, MS, TX (3); no point contacts or audited water-only relation | existing topology; publishing blocked pending audit |
| Formal National Parks | 0 | nationwide formal-designation table; 2026 |
| Other NPS units | New Orleans Jazz National Historical Park; Jean Lafitte National Historical Park and Preserve; Poverty Point National Monument | NPS-LA; 2026 |
| Two largest incorporated places | New Orleans city 362,154; Baton Rouge city 222,795 | PLACE25 sheet `SUB-IP-EST2025-POP-22`, rows 208 and 24 |
| Distinctive association | New Orleans is identified by NPS as the birthplace of jazz | [NPS Jazz origins](https://www.nps.gov/jazz/learn/historyculture/history_early.htm); static history |
| Terminology | Louisiana county equivalents are called parishes; consolidated governments require care | GUIDE-LA; static |
| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `la.population.4_5-5m` | About 4.5–5 million people lived here in 2025. | population | `population.resident_estimate between [4500000,5000000)` | KY, LA (2) | T3/general/indirect | 2–5 | `LA:population:2025` | POP25 / R |
| `la.area.rank-31-35` | It ranks 31st–35th in land area. (2010 Census) | area | `area.land_rank between [31,36)` | LA, MS, OH, PA, TN (5) | T4/specialized/indirect | 2–5 | `LA:area:2010` | AREA10 / R |
| `la.highpoint.under-1000` | Its highest point is below 1,000 feet. | physical_geography | `physical.highest_point between [0,1000)` | DE, FL, LA, MS, RI (5) | T3/general/indirect | 3–5 | `LA:elevation` | ELEV / R |
| `la.time.central-all` | The whole state uses Central Time. | time_zone | `time.standard_zone eq [Central]` | AL, AR, IA, IL, LA, MN, MO, MS, OK, WI (10) | T4/general/indirect | 1–4 | `LA:time:2026` | TIME26 / R |
| `la.parks.formal-0` | It has no formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T5/specialized/indirect | 1–3 | `LA:parks:2026` | NPS nationwide / R |
| `la.history.1810s` | It became a state in the 1810s. | history | `history.admission_year between [1810,1820)` | AL, IL, IN, LA, MS (5) | T3/general/indirect | 2–5 | `LA:admission` | GUIDE-LA / R |
| `la.borders.segment-count-3` | It shares boundary segments with three states. | borders | `count(boundary.shared_segments) eq 3` | CA, CT, DE, LA, MI, ND, NH, NJ, VT (9) | T3/general/indirect | 2–5 | `LA:boundaries` | GUIDE-LA + topology / B |
| `la.culture.jazz-birthplace` | Jazz began in New Orleans in this state. | culture | `association.cultural_origin contains new-orleans-jazz` | LA (1 proposed) | T2/general/named_association | 5–6 | `LA:culture:jazz` | NPS Jazz / D: nationwide association table needed |
| `la.nps.jean-lafitte` | Jean Lafitte National Historical Park and Preserve is here. | landmark | `nps.associated_unit contains jean-lafitte` | LA (1 proposed) | T3/general/named_association | 5–6 | `LA:nps:jean-lafitte` | NPS-LA / D |
| `la.cities.top2-2025` | New Orleans and Baton Rouge were its two largest incorporated places in 2025. | cities | `place.top_two eq [new-orleans-city,baton-rouge-city]` | LA (1 proposed) | T2/general/one_to_one | 5–6 | `LA:places:2025` | PLACE25 / D |
| `la.capital.baton-rouge` | Its capital is Baton Rouge. | capital | `identity.capital eq Baton Rouge` | LA (1 proposed) | T2/general/one_to_one | 5–6 | `LA:capital` | GUIDE-LA / D; conflicts with top-two dependency |
| `la.postal` | Its postal abbreviation is LA. | abbreviation | `identity.postal_code eq LA` | LA (1) | T1/iconic/direct_identifier | 7–7 | `LA:postal` | USPS / R |
| `la.silhouette` | Which state has this shape? | silhouette | `identity.state_id eq US-LA` | LA (1) | T1/general/direct_identifier | 7–7 | `LA:silhouette` | map geometry / B |
| `la.locator` | Which state is highlighted? | map_position | `identity.state_id eq US-LA` | LA (1) | T1/general/direct_identifier | 7–7 | `LA:locator` | map geometry / B |

Proposed ladder: `parks.formal-0 → time.central-all → area.rank-31-35 → history.1810s → population.4_5-5m → highpoint.under-1000 → postal`. Cumulative candidates: **19 → 6 → 2 → 2 → 1 → 1 → 1**.

Rejected/draft notes: do not use “only state with parishes” until a closed nationwide county-equivalent terminology table exists. Jazz wording uses “began in New Orleans” only because the cited NPS history supports that origin relationship. Do not combine Baton Rouge capital and top-two clues.

## Maine (`US-ME`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Maine; ME; FIPS 23 | GUIDE-ME; USPS |
| Capital | Augusta | GUIDE-ME; static |
| Admission | 1820-03-15; 23rd state | GUIDE-ME; static |
| Population | 1,414,874; rank 42 | POP25; 2025-07-01 |
| Land area | 30,843 sq mi; rank 39 | AREA10; derived rank |
| Highest point | Mount Katahdin; 5,268 ft | ELEV; static |
| Standard time | Eastern | TIME26; 2026 rules |
| State boundary segments | NH (1); international boundary with Canada; no point contacts or audited interstate water-only relation | GUIDE-ME + topology; publishing blocked pending audit |
| Formal National Parks | 1: Acadia National Park | nationwide formal-unit table; 2026 |
| Other NPS units | Appalachian National Scenic Trail; Katahdin Woods and Waters National Monument | NPS-ME; 2026 |
| Two largest incorporated places | Portland city 69,911; Lewiston city 38,866 | PLACE25 sheet `SUB-IP-EST2025-POP-23`, rows 20 and 18 |
| Place caveat | Maine towns are county subdivisions, not incorporated places in this table | GUIDE-ME + PLACE25 |
| Distinctive association | Maine was formerly a district of Massachusetts before statehood | GUIDE-ME; static |
| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `me.population.1-1_5m` | About 1–1.5 million people lived here in 2025. | population | `population.resident_estimate between [1000000,1500000)` | DE, HI, ME, MT, NH, RI (6) | T3/general/indirect | 1–4 | `ME:population:2025` | POP25 / R |
| `me.area.rank-36-40` | It ranks 36th–40th in land area. (2010 Census) | area | `area.land_rank between [36,41)` | IN, KY, ME, SC, VA (5) | T4/specialized/indirect | 2–5 | `ME:area:2010` | AREA10 / R |
| `me.highpoint.5000-5500` | Its highest point is 5,000–5,500 feet high. | physical_geography | `physical.highest_point between [5000,5500)` | ME, NE, NY (3) | T3/general/indirect | 3–5 | `ME:elevation` | ELEV / R |
| `me.time.eastern-all` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq [Eastern]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T5/general/indirect | 1–3 | `ME:time:2026` | TIME26 / R |
| `me.parks.formal-1` | It has one formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 1` | AR, ID, IL, IN, KY, ME, MI, MN, MO, NC, ND, OH, OR, SC, TN, VA, WV (17) | T5/specialized/indirect | 1–3 | `ME:parks:2026` | NPS nationwide / R |
| `me.history.1820s` | It became a state in the 1820s. | history | `history.admission_year between [1820,1830)` | ME, MO (2) | T3/general/indirect | 2–5 | `ME:admission` | GUIDE-ME / R |
| `me.borders.segment-count-1` | It shares a state boundary segment with only one state. | borders | `count(boundary.shared_segments) eq 1` | ME (1) | T2/general/one_to_one | 4–6 | `ME:boundaries` | GUIDE-ME + topology / B |
| `me.parks.acadia` | Acadia National Park is here. | landmark | `nps.formal_unit_ids contains acadia-national-park` | ME (1) | T2/general/named_association | 5–6 | `ME:parks:acadia` | NPS formal table / R |
| `me.history.massachusetts-district` | It was once a district of Massachusetts. | history | `association.territorial_origin contains massachusetts-district` | ME (1 proposed) | T2/general/named_association | 4–6 | `ME:history:massachusetts` | GUIDE-ME / D: closed territorial table needed |
| `me.cities.top2-2025` | Portland and Lewiston were its two largest incorporated places in 2025. | cities | `place.top_two eq [portland-city,lewiston-city]` | ME (1 proposed) | T2/general/one_to_one | 5–6 | `ME:places:2025` | PLACE25 / D; towns excluded consistently |
| `me.capital.augusta` | Its capital is Augusta. | capital | `identity.capital eq Augusta` | ME (1 proposed) | T2/general/one_to_one | 5–6 | `ME:capital` | GUIDE-ME / D |
| `me.postal` | Its postal abbreviation is ME. | abbreviation | `identity.postal_code eq ME` | ME (1) | T1/iconic/direct_identifier | 7–7 | `ME:postal` | USPS / R |
| `me.silhouette` | Which state has this shape? | silhouette | `identity.state_id eq US-ME` | ME (1) | T1/general/direct_identifier | 7–7 | `ME:silhouette` | map geometry / B |
| `me.locator` | Which state is highlighted? | map_position | `identity.state_id eq US-ME` | ME (1) | T1/general/direct_identifier | 7–7 | `ME:locator` | map geometry / B |

Proposed ladder: `population.1-1_5m → time.eastern-all → area.rank-36-40 → history.1820s → highpoint.5000-5500 → parks.acadia → postal`. Cumulative candidates: **6 → 4 → 1 → 1 → 1 → 1 → 1**.

Rejected/draft notes: the one-state-border clue is blocked despite being confirmed by the Census guide because the project requires a complete nationwide legal classification before boundary publication. Do not mix Maine towns into the incorporated-place ranking. Avoid “easternmost state” until the longitude convention and Aleutian treatment are formally specified.

## Maryland (`US-MD`)

### Normalized factual profile

| Field | Value | Source / period |
|---|---|---|
| Identity | Maryland; MD; FIPS 24 | GUIDE-MD; USPS |
| Capital | Annapolis | GUIDE-MD; static |
| Admission | 1788-04-28; 7th state | GUIDE-MD; static |
| Population | 6,265,347; rank 19 | POP25; 2025-07-01 |
| Land area | 9,707 sq mi; rank 42 | AREA10; derived rank |
| Highest point | Hoye Crest; 3,360 ft | ELEV; static |
| Standard time | Eastern | TIME26; 2026 rules |
| State boundary segments | DE, PA, VA, WV (4), plus a boundary with the District of Columbia; no point contacts or audited interstate water-only relation | GUIDE-MD + topology; D.C. needs its own relation type outside the 50-state universe |
| Formal National Parks | 0 | nationwide formal-designation table; 2026 |
| Other NPS units | Fort McHenry National Monument and Historic Shrine; Antietam National Battlefield; Harriet Tubman Underground Railroad National Historical Park | NPS-MD; 2026 |
| Two largest incorporated places | Baltimore city 569,997; Frederick city 92,059 | PLACE25 sheet `SUB-IP-EST2025-POP-24`, rows 8 and 60 |
| Place caveat | Baltimore city is an independent city and county equivalent; Baltimore County is separate | GUIDE-MD; static |
| Distinctive association | Fort McHenry’s defense inspired the words that became the national anthem | [NPS Fort McHenry](https://www.nps.gov/places/fort-mchenry.htm); static history |
| Visuals | silhouette and locator derivable from existing geometry | new content-hashed assets required |

### Clue pool

| ID | Wording | Category | Predicate | Candidate states (count) | Difficulty | Window | Dependency | Source / review |
|---|---|---|---|---|---|---|---|---|
| `md.population.6-6_5m` | About 6–6.5 million people lived here in 2025. | population | `population.resident_estimate between [6000000,6500000)` | CO, MD, MO (3) | T3/general/indirect | 2–5 | `MD:population:2025` | POP25 / R |
| `md.area.rank-41-45` | It ranks 41st–45th in land area. (2010 Census) | area | `area.land_rank between [41,46)` | MA, MD, NH, VT, WV (5) | T4/specialized/indirect | 2–5 | `MD:area:2010` | AREA10 / R |
| `md.highpoint.3000-3500` | Its highest point is 3,000–3,500 feet high. | physical_geography | `physical.highest_point between [3000,3500)` | MA, MD, PA (3) | T3/general/indirect | 3–5 | `MD:elevation` | ELEV / R |
| `md.time.eastern-all` | The whole state uses Eastern Time. | time_zone | `time.standard_zone eq [Eastern]` | CT, DE, GA, MA, MD, ME, NC, NH, NJ, NY, OH, PA, RI, SC, VA, VT, WV (17) | T5/general/indirect | 1–3 | `MD:time:2026` | TIME26 / R |
| `md.parks.formal-0` | It has no formally designated National Park. (NPS, 2026) | parks | `nps.formal_national_park_count eq 0` | AL, CT, DE, GA, IA, KS, LA, MA, MD, MS, NE, NH, NJ, NY, OK, PA, RI, VT, WI (19) | T5/specialized/indirect | 1–3 | `MD:parks:2026` | NPS nationwide / R |
| `md.history.1788` | It joined the Union in 1788. | history | `history.admission_year eq 1788` | CT, GA, MA, MD, NH, NY, SC, VA (8) | T4/general/indirect | 2–5 | `MD:admission` | GUIDE-MD / R |
| `md.borders.segment-count-4` | It shares state boundary segments with four states. | borders | `count(boundary.shared_segments) eq 4` | AL, AZ, IN, KS, MD, MN, MS, MT, NC, NM, OR, TX, WI (13) | T4/general/indirect | 1–4 | `MD:boundaries` | GUIDE-MD + topology / B; D.C. stored separately |
| `md.history.fort-mchenry` | Fort McHenry inspired the words of the national anthem. | history | `association.event_site contains star-spangled-banner-fort-mchenry` | MD (1 proposed) | T2/general/named_association | 5–6 | `MD:history:fort-mchenry` | NPS Fort McHenry / D: nationwide association table needed |
| `md.nps.antietam` | Antietam National Battlefield is here. | landmark | `nps.associated_unit contains antietam-national-battlefield` | MD (1 proposed) | T2/general/named_association | 5–6 | `MD:nps:antietam` | NPS-MD / D |
| `md.cities.top2-2025` | Baltimore and Frederick were its two largest incorporated places in 2025. | cities | `place.top_two eq [baltimore-city,frederick-city]` | MD (1 proposed) | T2/general/one_to_one | 5–6 | `MD:places:2025` | PLACE25 / D; Baltimore independent-city status retained |
| `md.capital.annapolis` | Its capital is Annapolis. | capital | `identity.capital eq Annapolis` | MD (1 proposed) | T2/general/one_to_one | 5–6 | `MD:capital` | GUIDE-MD / D |
| `md.postal` | Its postal abbreviation is MD. | abbreviation | `identity.postal_code eq MD` | MD (1) | T1/iconic/direct_identifier | 7–7 | `MD:postal` | USPS / R |
| `md.silhouette` | Which state has this shape? | silhouette | `identity.state_id eq US-MD` | MD (1) | T1/general/direct_identifier | 7–7 | `MD:silhouette` | map geometry / B |
| `md.locator` | Which state is highlighted? | map_position | `identity.state_id eq US-MD` | MD (1) | T1/general/direct_identifier | 7–7 | `MD:locator` | map geometry / B |

Proposed ladder: `parks.formal-0 → time.eastern-all → history.1788 → area.rank-41-45 → population.6-6_5m → highpoint.3000-3500 → postal`. Cumulative candidates: **19 → 11 → 6 → 3 → 1 → 1 → 1**.

Rejected/draft notes: do not count D.C. as a state neighbor. Store it as an other-jurisdiction boundary relation. Do not treat Baltimore city and Baltimore County as the same entity. Fort McHenry and Antietam cannot both appear in one ladder because they draw on the same late named-landmark family.

## Required additions before integration

1. Archive the six PLACE25 workbooks as new immutable raw inputs; never replace v1–v3 files.
2. Add normalized place facts and within-state ranks for every published incorporated place in these six states, retaining Census legal names and entity types.
3. Extend the nationwide capital and exact admission-date/order tables. Keep completeness false until all 50 states are populated.
4. Build a closed nationwide NPS associated-unit table separate from the formal-National-Park table; represent multi-state units explicitly.
5. Build closed association tables for person birthplace, territorial origin, cultural origin, and historical-event site before approving those clues.
6. Finish the TIGER/legal boundary audit, retaining shared segments, point contacts, water-only boundaries, international boundaries, and non-state U.S. jurisdictions as distinct relation types. Convert symmetric state relations into directional facts only after validation.
7. Generate content-hashed silhouette and locator assets from existing geometry. Keep map projection and inset policy reproducible.
8. Create a new snapshot and clue-set version by exclusive creation only after review; do not mutate an existing snapshot or manifest.

## Validation summary

- Six states, six profiles, and 84 clue-pool records are included.
- Forty-four reusable-metric candidate sets were evaluated over 50 unique state IDs; every answer state belongs to every applicable set.
- Proposed ladders end at one candidate with cumulative counts: IA `19→6→2→2→1→1→1`; KS `19→2→1→1→1→1→1`; KY `17→4→2→1→1→1→1`; LA `19→6→2→2→1→1→1`; ME `6→4→1→1→1→1→1`; MD `19→11→6→3→1→1→1`.
- No GDP, industry-share, or unexplained rank clues are used.
- Population and place values carry a 2025 reference date; time and NPS statements carry a 2026 review period; static facts are labeled accordingly.
- Missing entity-table coverage remains unknown. Draft cultural, city, capital, and associated-unit clues are not eligible for manifests.
- Boundary clues remain blocked even when the state claim is independently sourced.
- Kentucky consolidated governments, Louisiana parishes, Maine towns, Maryland’s independent city, Maryland–D.C., and split time zones in Kansas and Kentucky are explicitly preserved.
