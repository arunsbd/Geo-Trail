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
