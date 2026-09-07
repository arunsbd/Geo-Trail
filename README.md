# GeoTrail

Explore U.S. geography with two guessing games: **Border Hunt** and **Clue Ladder**.

**[Play GeoTrail](https://arunsbd.github.io/Geo-Trail/)**

## Border Hunt

Find the mystery state using feedback from each guess. The number tells you the fewest state-border crossings between your guess and the answer. Zero means you found it!

Choose your difficulty:

- **Easy:** Explore the full map, hover for state names, and select a state to fill in your guess.
- **Intermediate:** Use the map shapes as clues, with unguessed state names hidden.
- **Hard:** Start with a blank map. Each guess reveals that state, and earlier guesses stay visible.

The state-name dropdown is available in every mode. Try to find the answer in as few guesses as possible, then play again with a new mystery state.

## Clue Ladder

Identify a mystery state through seven clues, with one guess or skip per clue. A wrong guess or a skip reveals the next clue. Guess early to earn more points!

- Start with a possible **1,000 points**.
- Each new clue reduces the maximum by **100 points**.
- Each wrong guess costs another **50 points**.
- Solve the state before you run out of clues, then play again to try another.

The current practice collection includes **all 50 U.S. states**, with seven clues per state. Difficulty levels apply only to Border Hunt.

## Geography conventions and sources

- The border graph counts shared land boundaries and Four Corners point contacts. New Mexico–Utah and Arizona–Colorado are each 1 crossing apart in both directions, even though those pairs meet only at a point.
- Alaska and Hawaii are included as isolated graph nodes, so practice targets currently come from the connected 48 states.
- Map geometry comes from the U.S. Census Bureau's 2017 cartographic boundaries, redistributed by the ISC-licensed `us-atlas` package.

Clue Ladder uses source-backed facts with reference years and definitions preserved in its clues and research records. Source references and archived evidence are included in the repository's `data/clue-ladder/` collection.
