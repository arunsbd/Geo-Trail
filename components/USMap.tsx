import { US_MAP_VIEWBOX, US_STATE_SHAPES } from "@/data/map";
import type { StateCode } from "@/data/states";
import { getDistanceFeedback } from "@/lib/game";

type MapGuess = {
  code: StateCode;
  distance: number | null;
};

type USMapProps = {
  guesses: readonly MapGuess[];
  revealedState: StateCode | null;
  onSelectState: (code: StateCode) => void;
  disabled: boolean;
};

export function USMap({
  guesses,
  revealedState,
  onSelectState,
  disabled,
}: USMapProps) {
  const guessByState = new Map(guesses.map((guess) => [guess.code, guess]));

  return (
    <svg
      aria-labelledby="us-map-title us-map-description"
      className="h-auto w-full overflow-visible"
      role="group"
      viewBox={US_MAP_VIEWBOX}
    >
      <title id="us-map-title">United States Border Hunt map</title>
      <desc id="us-map-description">
        All 50 U.S. states. Select a state to fill the guess input. Guessed states
        are colored by their border distance from the mystery state.
      </desc>

      {US_STATE_SHAPES.map(({ code, name, path }) => {
        const guess = guessByState.get(code);
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
            aria-disabled={disabled}
            aria-label={`${name}: ${description}`}
            className={`state-shape state-shape--${level}`}
            d={path}
            data-state={code}
            key={code}
            onClick={() => {
              if (!disabled) onSelectState(code);
            }}
            onKeyDown={(event) => {
              if (!disabled && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onSelectState(code);
              }
            }}
            role="button"
            tabIndex={disabled ? -1 : 0}
          >
            <title>{`${name}: ${description}`}</title>
          </path>
        );
      })}
    </svg>
  );
}
