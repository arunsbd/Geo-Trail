# GeoTrail

GeoTrail is a mobile-first geography game. The first playable mode is **Border Hunt — U.S. States**: guess the mystery state using the minimum number of state-border crossings as feedback.

## Local development

Requires Node.js 22 or newer and pnpm 11. This Codex session used its bundled Node.js runtime; install Node.js and pnpm separately if you want to run the commands from an ordinary terminal.

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Checks

```bash
pnpm test
pnpm lint
pnpm build
```

See [PLAN.md](./PLAN.md) for the product roadmap. The current implementation intentionally stays within the first Border Hunt milestone.

## Geography conventions and sources

- The border graph counts shared land boundaries and Four Corners point contacts. New Mexico–Utah and Arizona–Colorado are each 1 crossing apart in both directions, even though those pairs meet only at a point.
- Alaska and Hawaii are included as isolated graph nodes, so practice targets currently come from the connected 48 states.
- Map geometry comes from the U.S. Census Bureau's 2017 cartographic boundaries, redistributed by the ISC-licensed `us-atlas` package.
- A test checks the hand-maintained border graph against the independent shared-boundary topology plus exactly those two corner-contact exceptions, in addition to symmetry and known-distance tests.

## How the code fits together

- `data/states.ts`: the 50 state names, abbreviations, and guess lookup.
- `data/borders.ts`: land-border adjacency data, separate from the UI.
- `data/map.ts`: converts the local Census-derived topology to SVG paths.
- `lib/border-distance.ts`: breadth-first search for shortest border distance.
- `lib/game.ts`: random target selection and text/color feedback categories.
- `components/BorderHuntGame.tsx`: React state and the playable round.
- `components/USMap.tsx`: keyboard- and touch-selectable state shapes.

## First Git checkpoint

No commit has been created automatically. Start by inspecting what changed:

```bash
git status
git diff --stat
```

Because these are new files, use your editor's source-control view to review their contents. A suitable checkpoint message for this coherent first playable slice is:

```text
feat: add first playable US Border Hunt prototype
```

For later work, keep each commit focused on one small feature or fix. Scoring, daily puzzles, direction clues, and sharing are intentionally not implemented yet.
