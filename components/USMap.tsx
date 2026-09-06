import { US_MAP_VIEWBOX, US_STATE_SHAPES } from "@/data/map";
import type { StateCode } from "@/data/states";
import { getDistanceFeedback } from "@/lib/game";
import { DIFFICULTIES, type Difficulty } from "@/lib/difficulty";

type MapGuess = {
  code: StateCode;
  distance: number | null;
};

type USMapProps = {
  difficulty: Difficulty;
  guesses: readonly MapGuess[];
  revealedState: StateCode | null;
  onSelectState: (code: StateCode) => void;
  disabled: boolean;
};

export function USMap({
  difficulty,
  guesses,
  revealedState,
  onSelectState,
  disabled,
}: USMapProps) {
  const guessByState = new Map(guesses.map((guess) => [guess.code, guess]));
  const canSelect = difficulty === "easy" && !disabled;

  return (
    <svg
      aria-labelledby="us-map-title us-map-description"
      className="h-auto w-full overflow-visible"
      role="group"
      viewBox={US_MAP_VIEWBOX}
    >
      <title id="us-map-title">United States Border Hunt map</title>
      <desc id="us-map-description">
        {DIFFICULTIES[difficulty].description} Guessed states are colored by their border distance from the mystery state.
      </desc>

      {US_STATE_SHAPES.map(({ code, name, path }) => {
        const guess = guessByState.get(code);
        if (difficulty === "hard" && !guess) return null;
        const showName = difficulty === "easy" || Boolean(guess);
        const level = guess
          ? getDistanceFeedback(guess.distance).level
          : revealedState === code
            ? "correct"
            : "unexplored";
        const description = guess
          ? getDistanceFeedback(guess.distance).detail
          : revealedState === code
            ? "Mystery state"
            : "Not guessed";

        return (
          <path
            aria-disabled={!canSelect}
            aria-label={showName ? `${name}: ${description}` : undefined}
            aria-hidden={!showName || undefined}
            className={`state-shape state-shape--${level}`}
            d={path}
            data-state={code}
            key={code}
            onClick={() => {
              if (canSelect) onSelectState(code);
            }}
            onKeyDown={(event) => {
              if (canSelect && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onSelectState(code);
              }
            }}
            role={difficulty === "easy" ? "button" : "img"}
            tabIndex={canSelect ? 0 : undefined}
          >
            {showName && <title>{`${name}: ${description}`}</title>}
          </path>
        );
      })}
    </svg>
  );
}
