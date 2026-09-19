import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ClueLadderMapHints } from "@/components/ClueLadderMapHints";
import { NATIONAL_PARK_LOCATIONS } from "@/data/national-parks";
import { STATE_CODES } from "@/data/states";
import { TIME_ZONE_ORDER } from "@/lib/clue-ladder/hint-types";
import { loadClueLadderHintData } from "@/lib/clue-ladder/hints";

const hints = loadClueLadderHintData();
const onReveal = () => {};

describe("Clue Ladder nationwide map hints", () => {
  it("loads verified legal-zone data for all 50 states", () => {
    expect(hints.timeZones.map(item => item.code).sort()).toEqual([...STATE_CODES].sort());
    expect(hints.timeZones).toHaveLength(50);
    for (const item of hints.timeZones) {
      expect(item.zones.length).toBeGreaterThan(0);
      expect(item.zones.every(zone => TIME_ZONE_ORDER.includes(zone))).toBe(true);
    }
  });

  it("keeps the formal NPS list complete and every location authoritative", () => {
    const reference = JSON.parse(
      readFileSync(
        "data/clue-ladder/snapshots/us-states-2026-09-05-v1/reference-inputs.json",
        "utf8",
      ),
    ) as { formalParks: { id: string }[] };

    expect(NATIONAL_PARK_LOCATIONS).toHaveLength(63);
    expect(NATIONAL_PARK_LOCATIONS.map(park => park.id).sort()).toEqual(
      reference.formalParks.map(park => park.id).sort(),
    );
    for (const park of NATIONAL_PARK_LOCATIONS) {
      expect(park.parkCode).toMatch(/^[a-z]{4}$/);
      expect(Number.isFinite(park.latitude)).toBe(true);
      expect(Number.isFinite(park.longitude)).toBe(true);
    }
  });

  it("does not render locked data layers before their adjacent clue is revealed", () => {
    const html = renderToStaticMarkup(
      createElement(ClueLadderMapHints, {
        disabled: false,
        generalRevealed: true,
        hints,
        onReveal,
        parks: { availableThisRound: true, clueRevealed: false, revealed: false },
        timeZones: { availableThisRound: true, clueRevealed: false, revealed: false },
      }),
    );

    expect(html).toContain("Map Layers");
    expect(html).toContain("Unlock layers on one shared map. Each layer costs 150 points.");
    expect(html).not.toContain("Map hints");
    expect(html).toContain("Layered U.S. reference map");
    expect(html).toContain("Unlocks after the time-zone clue is revealed.");
    expect(html).toContain("Unlocks after the National Parks clue is revealed.");
    expect(html).not.toContain("Time-zone layer");
    expect(html).not.toContain("National Park layer");
    expect(html).not.toContain("state-shape--correct");
  });

  it("requires the labeled map before either data map can be revealed", () => {
    const html = renderToStaticMarkup(
      createElement(ClueLadderMapHints, {
        disabled: false,
        generalRevealed: false,
        hints,
        onReveal,
        parks: { availableThisRound: true, clueRevealed: true, revealed: false },
        timeZones: { availableThisRound: true, clueRevealed: true, revealed: false },
      }),
    );

    expect(html).toContain("Unlock Labeled states layer");
    expect(html.match(/Unlock the labeled states layer first\./g)).toHaveLength(2);
    expect(html).toContain("−150 points");
    expect(html).not.toContain("Layered U.S. reference map");
  });

  it("renders only nationwide, answer-neutral layers after both unlocks", () => {
    const html = renderToStaticMarkup(
      createElement(ClueLadderMapHints, {
        disabled: false,
        generalRevealed: true,
        hints,
        onReveal,
        parks: { availableThisRound: true, clueRevealed: true, revealed: true },
        timeZones: { availableThisRound: true, clueRevealed: true, revealed: true },
      }),
    );

    expect(html).toContain("Layered U.S. reference map");
    expect(html).toContain("Time-zone layer");
    expect(html).toContain("National Park layer");
    expect(html.match(/class="clue-hint-map"/g)).toHaveLength(1);
    expect(html.match(/class="park-marker"/g)).toHaveLength(61);
    expect(html).toContain("National Park of American Samoa");
    expect(html).toContain("Virgin Islands National Park");
    expect(html).not.toContain("state-shape--correct");
  });
});
