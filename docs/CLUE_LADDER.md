# Clue Ladder data milestone

The original audited edition remains an offline data pipeline. The user-requested seven-round edition now powers the separate /clue-ladder/ practice game.
Border Hunt and its Four Corners convention are unchanged.

## Commands

```sh
pnpm test
pnpm build
pnpm clue-ladder:validate
pnpm clue-ladder:validate -- --json
pnpm clue-ladder:check-milestone
```

`clue-ladder:validate` reports loaded counts, schema/semantic diagnostics, compiled
ladders, and audited-sample status. `--json` gives structured output.
`--write-report` saves `data/clue-ladder/review/validation-report.json`.
`--write-manifests` writes three deterministic local example manifests. It does
not deploy them or expose a game screen.

**The strict milestone check intentionally exits nonzero until the Alabama
sample's nationwide manufacturing candidate set is supported by complete evidence.**
The normal validation command can succeed for the approved subset without
misrepresenting that research blocker as completed work.

## Data flow

1. Archived official inputs in `snapshots/us-states-2026-09-05-v1/raw/` are registered
   with retrieval timestamps, release/vintage metadata, and SHA-256 digests.
2. `scripts/extract-clue-ladder-references.py` uses Python 3's standard library to
   extract the archived CSV, ZIP, HTML, and XLSX values offline. It checks table
   headers, expected coverage, units, and the Census place year column. It never
   retrieves data or fills missing values.
3. `scripts/build-clue-ladder-fixtures.ts` turns those observations into metric-defined
   facts, computes ranks/ratios/counts, and evaluates the audited predicates.
4. Versioned clue records retain source fact references, candidate membership,
   reference labels, tier, prior, directness, dependencies, windows, and review status.
5. `validateDataset` checks schemas and semantic quality gates. `compileLadder`
   refuses invalid data and uses only approved clues.
6. `publishManifest` validates and exclusively creates the final JSON. Repeating
   identical publication is safe; replacing an existing puzzle is rejected.

The 50-state universe reuses `data/states.ts`. Only Alabama, Colorado, and Rhode
Island have researched `StateRecord` profiles and clue pools. Other states occur
only in the national comparison tables needed by those three pools. Place inputs
are limited to the three states' complete incorporated-place workbooks.

### Definitions and reproducibility

TypeScript contracts are in `lib/clue-ladder/types.ts`. Their individual JSON
Schemas are generated with `pnpm clue-ladder:schemas`; semantic constraints such
as reference-year labels and reverse boundaries are checked by the validator.

Two explicit contract refinements resolve gaps in the specification shorthand:

- `FactValue` permits `null`, with `FactRecord.suppressionCode`, as section 7.3
  requires. Suppression is never zero and is never imputed.
- Manifests add `dataContentSha256` so changed inputs under an unchanged snapshot
  identifier fail validation. Their seed is always populated by the compiler.

Ranks use exactly the declared universe, one metric, one snapshot and reference
period, descending values, and competition ties (1, 2, 2, 4). Each rank retains
all input fact IDs and the algorithm version. Incorporated-place top-two selection
uses the same rank method with `output: top_k`; tied places sort by stable entity
ID. Unpublished place estimates are retained as null observations and excluded
from the explicitly named published-estimate ranking universe.

Industry metric suffixes distinguish manufacturing, professional/scientific/
technical services, and education/health/social assistance. Shares retain the
numerator and denominator and evaluate unrounded percentages. Display rounding
never changes predicate boundaries.

The evaluator supports `eq`, numeric/date comparisons, half-open `between`,
`contains_all`, `all`, and `any`. Missing facts produce `unknown`. Conjunction can
still prove false from another known-false condition; disjunction can prove true
from another known-true condition. An approved clue requires a complete fresh
candidate evaluation. Stored candidate lists are checked against that evaluation.

For city and capital predicates, an explicitly closed entity-membership index
maps the named places in the three archived Census workbooks to their containing
states. A conjunction combines this index with the researched top-two/capital
fact. It can rule out another state without inventing that state's largest cities
or capital. This is a finite entity index, not a fabricated nationwide city table.
The selected landmark-unit membership metric has an equally explicit finite scope.

### Snapshot and manifest integrity

Each snapshot pins its own `context.json` containing identity, metric/source
catalogs, boundary policy inputs, park associations, asset metadata, and assembly
rules. Loading an old snapshot does not consult a mutable current catalog.
Clues are in `clues/<clueSetVersion>/US-*.json` so old wording is retained as well.
Visual filenames are content hashes, and their bytes are verified separately.

The compiler takes state, seed, and optional length (8–10) and generation timestamp.
It uses SHA-256 seed ordering plus deterministic backtracking. Difficulty and
candidate-count targets influence selection; rung windows, dependencies,
incompatibilities, direct identifiers, prerequisites, and category prohibitions
are hard constraints. An unsatisfiable pool returns an explicit error. Eight-rung
ladders omit visual clues, because standard visual clues cannot occur before rung 9.

By default, `generatedAt` is the frozen snapshot build timestamp. Supplying an
explicit timestamp records a new reproducible compilation context and changes
the puzzle ID. No wall-clock reads or `Math.random()` occur in compilation.
Manifest data is recursively frozen in memory and publication is write-once on disk.

Fixture extraction/build scripts refuse to rebuild a snapshot already referenced
by a saved manifest. Future refreshes must add a new snapshot and clue-set version,
retain old catalogs/context/clues, and append the new snapshot registration.
They must not overwrite the old registration or source files. Raw source hashes
and manifest input hashes detect tampering even when files are changed manually.

### Boundary integration

`BoundaryRecord` stores undirected relationships. Graph derivation creates both
arcs. Reverse duplicates and asymmetric fact tables fail validation.

- CO–AZ and NM–UT are `point_contact`, excluded by the canonical default policy.
- RI–NY is a `segment` in `lake_or_coastal_water`, excluded by that policy.
- Shared land/river segments are eligible under the ordinary policy.
- `LEGACY_BORDER_HUNT_POLICY` includes point contacts and excludes water-only edges.

The richer canonical records prepare the audited three-state subset and the two
Four Corners special pairs. They do **not** claim to be a complete national legal
boundary database. Their audit metadata is labeled as a supplied spatial audit;
this milestone has not rerun TIGER GIS intersections or classified every river
segment. The existing tested shared-arc reference graph remains separate.
A future Border Hunt migration needs complete reviewed canonical coverage, then
must compare the graph derived with its explicit legacy policy to today's graph.

### Research differences and remaining blocker

The original specification and `review/audited-examples.json` retain the original
wording, counts, tiers, windows, and sample ladders. `review-log.json` records these
implementation decisions:

- BEA's archived SAGDP2 2025 Hawaii manufacturing value is `(D)`. Alabama's
  manufacturing-share clue has seven known matches but an unknown Hawaii result.
  It remains draft, retaining its audited expected count. Its exact sample ladder
  is rejected; another approved Alabama ladder compiles. Complete authoritative
  evidence for that comparison is still needed to finish the original milestone.
- Colorado and Rhode Island's exact sample ladders reproduce 6→3→2→1 and
  19→4→2→1. Alabama's known intersections are 19→5→2→1, but these are explicitly
  not certified as a full standalone candidate evaluation for every clue.
- The NPS archive was retrieved September 5, 2026. Its formal enumeration matches
  the expected 0/4/0 counts and 19 zero-park states. Rendered reference labels use
  that actual date, rather than claiming possession of a July archive.
- Census's cited HTML rounds Rhode Island land area to 1,034 sq mi. The supplied
  audit's 1,033.8 is preserved in review notes; both derive rank 50. No decimal
  precision is invented in the normalized source observation.
- Huntsville, Mobile, Birmingham, and Montgomery are first through fourth in
  Alabama's 2025 incorporated-place table. The stale Birmingham clue is rejected.
- Colorado's source elevation remains 14,433 feet. Formal National Parks remain
  distinct from monuments, preserves, memorials, historic sites, and trails.
- Climate observations remain draft because the audit does not provide complete
  nationwide evidence or a fully specified averaging period.
- Knowledge priors and dependency-group identifiers were not supplied per row in
  the specimen. Their explicit implementation values are editorial seed metadata.
- The general two-direct-clues-at-the-end advice is treated as a preference:
  the specific Rhode Island example ends with capital plus locator map.

## Logical commits

1. `feat: add Clue Ladder contracts and source-backed three-state fixtures`
2. `feat: validate and compile deterministic Clue Ladder manifests`
3. `test: cover Clue Ladder provenance, topology, and snapshot integrity`

No Git commits or deployments are performed by the validation scripts.

## Seven-round playable preview

The September 5 playtest request supersedes the original UI restriction and 8–10
round requirement for this edition. The original v1 snapshot and manifests are
unchanged. Snapshot `us-states-2026-09-05-v2` pins the `short-seven-v1` clue set
and assembly profile, reusing the archived official source files by hash. It has
21 approved clues, seven per state. No GDP/industry clues or new trivia are used.

Wording is shorter while reference years, place definitions, predicates, candidate
sets, and source facts remain explicit. Visual/direct identifiers are reserved for
rungs 6–7; silhouettes appear at rung 7. These initial ladders have curated fixed
orders for feedback; random practice selection chooses a different state on replay.
The seeded compiler and source validation still run against the published manifests.

`app/clue-ladder/page.tsx` validates and loads the three saved manifests at build
time. Only the small playable projection reaches the browser; source archives and
validation code are not client dependencies. Silhouettes reuse audited polygons,
with their viewBox fitted to the card. Answers are present in static client data,
as in Border Hunt; this preview does not claim anti-cheat protection.

Each clue allows one valid guess or skip. A wrong guess advances the clue and
costs 50 points; revealing another clue reduces the maximum by 100. Invalid or
duplicate guesses do not consume a round. A win or the seventh attempt locks the
round. Restart clears all round state and avoids the immediately previous answer.
No daily scheduling, accounts, or persistence are included in this practice preview.

The old Alabama manufacturing sample remains blocked by source suppression; the
playable edition does not depend on that clue. Population/city clues retain 2025
and time-zone clues retain 2026. Huntsville and Mobile are preserved for Alabama.

Validation: 99 automated tests; browser checks for invalid input, wrong/correct
guesses, scoring, replay, seven-clue progression, final reveal, and a 390px mobile
silhouette. Both routes are checked in the GitHub Pages static export.
