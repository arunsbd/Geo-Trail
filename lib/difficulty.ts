export const DIFFICULTIES = {
  easy: {
    label: "Easy",
    description: "Explore the full map. Hover for names or tap a state to guess.",
  },
  intermediate: {
    label: "Intermediate",
    description: "Use the map shapes as clues. State names are hidden; type your guess.",
  },
  hard: {
    label: "Hard",
    description: "Start with a blank map. Each guess reveals only that state; earlier guesses stay visible.",
  },
} as const;

export type Difficulty = keyof typeof DIFFICULTIES;

export function getDifficultyDescription(
  difficulty: Difficulty,
  placeKind: "state" | "country",
) {
  if (placeKind === "state") return DIFFICULTIES[difficulty].description;
  if (difficulty === "easy") return "Explore the full map. Hover for names or tap a country to guess; each result also points toward the target.";
  if (difficulty === "intermediate") return "Use the map shapes as clues. Country names are hidden; type your guess.";
  return "Start with a blank map. Each guess reveals only that country; earlier guesses stay visible.";
}
