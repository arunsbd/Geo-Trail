"use client";

import { useState } from "react";
import { EUROPE_COUNTRY_SHAPES, EUROPE_MAP_VIEWBOX } from "@/data/geography/europe/map";
import type { EuropeCountryCode } from "@/data/geography/europe/borders";
import { EUROPE_COUNTRY_BY_CODE, EUROPE_MICROSTATE_CODES } from "@/data/geography/europe/countries";
import { formatFeedbackText, getDistanceFeedback } from "@/lib/game";
import { getDifficultyDescription, type Difficulty } from "@/lib/difficulty";

type MapGuess = { code: EuropeCountryCode; distance: number | null };

export function EuropeMap({
  difficulty,
  guesses,
  revealedCountry,
  onSelectCountry,
  disabled,
}: {
  difficulty: Difficulty;
  guesses: readonly MapGuess[];
  revealedCountry: EuropeCountryCode | null;
  onSelectCountry?: (code: EuropeCountryCode) => void;
  disabled: boolean;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const guessByCountry = new Map(guesses.map((guess) => [guess.code, guess]));
  const canSelect = difficulty === "easy" && !disabled && Boolean(onSelectCountry);

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function select(code: EuropeCountryCode) {
    if (canSelect) onSelectCountry?.(code);
  }

  return (
    <div className="europe-map">
      <div aria-label="Europe map controls" className="map-controls" role="group">
        <button aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(value + 0.25, 2))} type="button">+</button>
        <button aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(value - 0.25, 1))} type="button">−</button>
        <button aria-label="Pan west" onClick={() => setPan((value) => ({ ...value, x: value.x + 55 }))} type="button">←</button>
        <button aria-label="Pan north" onClick={() => setPan((value) => ({ ...value, y: value.y + 45 }))} type="button">↑</button>
        <button aria-label="Pan south" onClick={() => setPan((value) => ({ ...value, y: value.y - 45 }))} type="button">↓</button>
        <button aria-label="Pan east" onClick={() => setPan((value) => ({ ...value, x: value.x - 55 }))} type="button">→</button>
        <button onClick={resetView} type="button">Reset</button>
      </div>
      <svg
        aria-labelledby="europe-map-title europe-map-description"
        className="europe-map__svg"
        role="group"
        viewBox={EUROPE_MAP_VIEWBOX}
      >
        <title id="europe-map-title">Europe Border Hunt beta map</title>
        <desc id="europe-map-description">
          {getDifficultyDescription(difficulty, "country")} Guessed countries are colored by land-border distance from the mystery country.
        </desc>
        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
          {EUROPE_COUNTRY_SHAPES.map(({ code, name, path, labelX, labelY, microstate }) => {
            const guess = guessByCountry.get(code);
            if (difficulty === "hard" && !guess && revealedCountry !== code) return null;
            const showName = difficulty === "easy" || Boolean(guess) || revealedCountry === code;
            const feedback = guess ? getDistanceFeedback(guess.distance, "country") : null;
            const level = feedback?.level ?? (revealedCountry === code ? "correct" : "unexplored");
            const detail = feedback ? formatFeedbackText(feedback) : revealedCountry === code ? "Mystery country" : "Not guessed";
            const label = showName ? `${name}: ${detail}` : undefined;
            const commonProps = {
              "aria-disabled": !canSelect,
              "aria-label": label,
              "aria-hidden": (!showName || undefined) as true | undefined,
              onClick: () => select(code),
              onKeyDown: (event: React.KeyboardEvent<SVGElement>) => {
                if (canSelect && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  select(code);
                }
              },
              role: canSelect ? "button" : "img",
              tabIndex: canSelect ? 0 : undefined,
            };

            return (
              <g data-country={code} key={code}>
                <path
                  {...(microstate ? { "aria-hidden": true } : commonProps)}
                  className={`state-shape state-shape--${level}`}
                  d={path}
                >
                  {showName ? <title>{label}</title> : null}
                </path>
                {microstate ? (
                  <circle
                    {...commonProps}
                    className={`microstate-target state-shape--${level}`}
                    cx={labelX}
                    cy={labelY}
                    r={difficulty === "easy" ? 9 : 6}
                  >
                    {showName ? <title>{label}</title> : null}
                  </circle>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
      {difficulty === "easy" ? (
        <div aria-label="Small country shortcuts" className="microstate-shortcuts" role="group">
          <span>Small countries</span>
          {EUROPE_MICROSTATE_CODES.map((code) => (
            <button
              disabled={!canSelect}
              key={code}
              onClick={() => select(code)}
              type="button"
            >
              {EUROPE_COUNTRY_BY_CODE.get(code)?.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
