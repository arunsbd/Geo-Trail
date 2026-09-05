"use client";

import Link from 'next/link';
import { useRef, useState, type FormEvent } from "react";
import { USMap } from "@/components/USMap";
import { findState, STATES, STATE_BY_CODE, type StateCode } from "@/data/states";
import { shortestBorderDistance } from "@/lib/border-distance";
import {
  getDistanceFeedback,
  pickMysteryState,
  type DistanceFeedback,
} from "@/lib/game";

type GuessResult = {
  code: StateCode;
  name: string;
  distance: number | null;
  feedback: DistanceFeedback;
};

function chooseNewMysteryState(previousState: StateCode): StateCode {
  let nextState = pickMysteryState();

  while (nextState === previousState) {
    nextState = pickMysteryState();
  }

  return nextState;
}

export function BorderHuntGame() {
  const [mysteryState, setMysteryState] = useState(pickMysteryState);
  const [guessInput, setGuessInput] = useState("");
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const latestGuess = guesses.at(-1) ?? null;
  const mysteryStateInfo = STATE_BY_CODE.get(mysteryState);

  function submitGuess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isComplete) return;
    setError(null);

    const guessedState = findState(guessInput);

    if (!guessedState) {
      setError("That isn't a U.S. state. Try a full name or postal abbreviation.");
      return;
    }

    if (guesses.some((guess) => guess.code === guessedState.code)) {
      setError(`You already guessed ${guessedState.name}. Try another trail.`);
      return;
    }

    const distance = shortestBorderDistance(guessedState.code, mysteryState);
    const result: GuessResult = {
      ...guessedState,
      distance,
      feedback: getDistanceFeedback(distance),
    };

    setGuesses((currentGuesses) => [...currentGuesses, result]);
    setGuessInput("");

    if (distance === 0) {
      setIsComplete(true);
    } else {
      inputRef.current?.focus();
    }
  }

  function selectMapState(code: StateCode) {
    setGuessInput(STATE_BY_CODE.get(code)?.name ?? code);
    setError(null);
    inputRef.current?.focus();
  }

  function startNewRound() {
    setMysteryState((currentState) => chooseNewMysteryState(currentState));
    setGuessInput("");
    setGuesses([]);
    setError(null);
    setIsComplete(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 pb-10 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="topographic-lines" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between border-b border-[var(--line)] py-4 sm:py-5">
        <a
          className="group flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--trail)]"
          href="#game"
        >
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>
            <span className="block font-display text-lg font-black tracking-[-0.04em]">
              GEOTRAIL
            </span>
            <span className="block text-[0.62rem] font-bold tracking-[0.22em] text-[var(--forest)] uppercase">
              Follow the borders
            </span>
          </span>
        </a>

        <Link href="/clue-ladder/" className="rounded-full border border-[var(--line)] bg-white/45 px-3 py-2 text-sm font-bold text-[var(--forest)]">
          Play Clue Ladder
        </Link>
      </header>

      <section className="relative mx-auto max-w-7xl pb-5 pt-7 sm:pb-8 sm:pt-10">
        <p className="eyebrow">Border Hunt · U.S. States</p>
        <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.6rem)] leading-[0.91] font-black tracking-[-0.07em] text-balance">
            Find the state.
            <span className="block text-[var(--trail)]">Count the borders.</span>
          </h1>
          <p className="max-w-md text-sm leading-6 font-semibold text-[color:var(--ink-soft)] sm:text-base">
            Guess any state. Each result reveals the fewest land borders you’d
            cross to reach this round’s mystery state.
          </p>
        </div>
      </section>

      <section
        className="relative mx-auto grid max-w-7xl gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.7fr)] lg:gap-5"
        id="game"
      >
        <div className="map-card order-1">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-4 py-3 sm:px-6">
            <div>
              <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--forest)] uppercase">
                The trail map
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[color:var(--ink-soft)]">
                Tap a state or type a name below
              </p>
            </div>
            <span className="map-key">
              <i aria-hidden="true" /> Guessed
            </span>
          </div>

          <div className="map-stage px-2 py-4 sm:px-6 sm:py-7">
            <USMap
              disabled={isComplete}
              guesses={guesses}
              onSelectState={selectMapState}
              revealedState={isComplete ? mysteryState : null}
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--line)] px-4 py-3 text-[0.68rem] font-extrabold tracking-[0.08em] text-[color:var(--ink-soft)] uppercase sm:px-6">
            <span className="legend legend--cold">Cold</span>
            <span className="legend legend--warm">Warm</span>
            <span className="legend legend--hot">Hot</span>
            <span className="legend legend--correct">Found</span>
          </div>
          <p className="border-t border-[var(--line)] px-4 py-3 text-xs leading-5 text-[color:var(--ink-soft)] sm:px-6">
            <strong className="font-extrabold text-[var(--forest)]">Four Corners counts:</strong>{" "}
            New Mexico–Utah and Arizona–Colorado are each 1 crossing apart.
          </p>
        </div>

        <aside className="game-card order-2" aria-label="Border Hunt controls">
          <div className="game-card__topline">
            <span>Round status</span>
            <strong>{isComplete ? "Complete" : `${guesses.length} guessed`}</strong>
          </div>

          <div className="flex flex-col px-5 pb-5 pt-6 sm:px-6">
            <div aria-atomic="true" aria-live="polite" className="order-2 mt-3 min-h-32">
              {isComplete ? (
                <div className="success-panel">
                  <p className="feedback-kicker">Destination reached</p>
                  <h2>{mysteryStateInfo?.name}</h2>
                  <p>
                    Trail found in {guesses.length} guess
                    {guesses.length === 1 ? "" : "es"}.
                  </p>
                </div>
              ) : latestGuess ? (
                <div className={`feedback-panel feedback-panel--${latestGuess.feedback.level}`}>
                  <div className="feedback-panel__pin" aria-hidden="true" />
                  <div>
                    <p className="feedback-kicker">{latestGuess.name}</p>
                    <h2>{latestGuess.feedback.label}</h2>
                    <p>{latestGuess.feedback.detail}</p>
                  </div>
                </div>
              ) : (
                <div className="welcome-panel">
                  <span className="welcome-panel__number">01</span>
                  <div>
                    <h2>Choose a starting point</h2>
                    <p>Use a full state name or its two-letter abbreviation.</p>
                  </div>
                </div>
              )}
            </div>

            <form className="order-1" onSubmit={submitGuess}>
              <label
                className="mb-2 block text-xs font-extrabold tracking-[0.12em] text-[var(--forest)] uppercase"
                htmlFor="state-guess"
              >
                Guess a state
              </label>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <input
                  aria-describedby={error ? "guess-error" : undefined}
                  aria-invalid={Boolean(error)}
                  autoComplete="off"
                  className="guess-input min-w-0 flex-1"
                  disabled={isComplete}
                  id="state-guess"
                  list="state-options"
                  onChange={(event) => setGuessInput(event.target.value)}
                  placeholder="e.g. Kentucky or KY"
                  ref={inputRef}
                  type="text"
                  value={guessInput}
                />
                <datalist id="state-options">
                  {STATES.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.code}
                    </option>
                  ))}
                </datalist>
                <button
                  className="primary-button"
                  disabled={isComplete || guessInput.trim().length === 0}
                  type="submit"
                >
                  Check trail
                </button>
              </div>
              <p
                className="mt-2 min-h-5 text-sm font-bold text-[var(--danger)]"
                id="guess-error"
                role={error ? "alert" : undefined}
              >
                {error}
              </p>
            </form>

            {isComplete ? (
              <button className="secondary-button order-3 mt-4 w-full" onClick={startNewRound} type="button">
                Start a new trail
              </button>
            ) : null}
          </div>

          <div className="border-t border-[var(--line)] px-5 py-5 sm:px-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-extrabold tracking-[0.12em] text-[var(--forest)] uppercase">
                Trail log
              </h2>
              <span className="text-xs font-bold text-[color:var(--ink-soft)]">
                {guesses.length}/50
              </span>
            </div>

            {guesses.length === 0 ? (
              <p className="rounded-lg border border-dashed border-[var(--line)] px-4 py-5 text-center text-sm font-semibold text-[color:var(--ink-soft)]">
                Your guesses will appear here.
              </p>
            ) : (
              <ol className="guess-list">
                {[...guesses].reverse().map((guess, reverseIndex) => (
                  <li key={guess.code}>
                    <span className="guess-list__number">
                      {guesses.length - reverseIndex}
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong>{guess.name}</strong>
                      <small>{guess.feedback.detail}</small>
                    </span>
                    <span
                      aria-label={guess.feedback.label}
                      className={`guess-list__dot guess-list__dot--${guess.feedback.level}`}
                      title={guess.feedback.label}
                    />
                  </li>
                ))}
              </ol>
            )}
          </div>
        </aside>
      </section>

      <footer className="relative mx-auto mt-5 flex max-w-7xl flex-col gap-2 border-t border-[var(--line)] pt-4 text-xs font-semibold text-[color:var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between">
        <p>Land borders + Four Corners · Practice targets use the connected 48 states</p>
        <p>Map boundaries: U.S. Census Bureau via us-atlas</p>
      </footer>
    </main>
  );
}
