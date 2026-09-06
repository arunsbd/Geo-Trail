import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { USMap } from "@/components/USMap";
import type { Difficulty } from "@/lib/difficulty";

function renderMap(difficulty: Difficulty, guessed = false) {
  return renderToStaticMarkup(createElement(USMap, {
    difficulty,
    guesses: guessed ? [{ code: "TX", distance: 2 }] : [],
    revealedState: null,
    disabled: false,
    onSelectState: () => {},
  }));
}

describe("difficulty map visibility", () => {
  it("keeps all 50 named, selectable states in easy", () => {
    const html = renderMap("easy");
    expect(html.match(/<path /g)).toHaveLength(50);
    expect(html).toContain("Texas: Not guessed");
    expect(html.match(/role="button"/g)).toHaveLength(50);
  });

  it("keeps intermediate shapes without revealing unguessed names or selection controls", () => {
    const html = renderMap("intermediate");
    expect(html.match(/<path /g)).toHaveLength(50);
    expect(html).not.toContain("Texas");
    expect(html).not.toContain('role="button"');
    expect(html).not.toContain('tabindex="0"');
  });

  it("renders no state shapes before a hard guess", () => {
    expect(renderMap("hard")).not.toContain("<path ");
  });

  it("reveals only the guessed state in hard", () => {
    const html = renderMap("hard", true);
    expect(html.match(/<path /g)).toHaveLength(1);
    expect(html).toContain('data-state="TX"');
    expect(html).toContain("Texas: 2 borders away");
  });
});
