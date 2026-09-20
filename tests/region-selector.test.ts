import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EuropeMap } from "@/components/EuropeMap";
import { RegionSelector } from "@/components/RegionSelector";

describe("Border Hunt region selector", () => {
  it("offers two playable regions and a disabled World placeholder", () => {
    const html = renderToStaticMarkup(createElement(RegionSelector, { value: "us-states", onChange: () => {} }));
    expect(html).toContain("U.S. States");
    expect(html).toContain("Europe");
    expect(html).toContain("Beta");
    expect(html).toContain("World");
    expect(html).toContain("Coming later");
    expect(html.match(/disabled=""/g)).toHaveLength(1);
  });

  it("renders every Europe shape and five enlarged microstate targets in Easy Mode", () => {
    const html = renderToStaticMarkup(createElement(EuropeMap, {
      difficulty: "easy",
      guesses: [],
      revealedCountry: null,
      disabled: false,
      onSelectCountry: () => {},
    }));
    expect(html.match(/data-country=/g)).toHaveLength(44);
    expect(html.match(/microstate-target/g)).toHaveLength(5);
    expect(html).toContain('aria-label="Small country shortcuts"');
    expect(html.match(/<button/g)).toHaveLength(12);
    expect(html).toContain("Vatican City: Not guessed");
    expect(html).not.toContain("state-shape--correct");
    expect(html).not.toContain("Mystery country");
  });

  it("keeps the Europe map blank before a Hard Mode guess", () => {
    const html = renderToStaticMarkup(createElement(EuropeMap, {
      difficulty: "hard",
      guesses: [],
      revealedCountry: null,
      disabled: false,
    }));
    expect(html).not.toContain("data-country=");
  });

  it("uses country wording for an accessible winning map result", () => {
    const html = renderToStaticMarkup(createElement(EuropeMap, {
      difficulty: "easy",
      guesses: [{ code: "BIH", distance: 0 }],
      revealedCountry: "BIH",
      disabled: true,
    }));

    expect(html).toContain("You found the mystery country.");
    expect(html).not.toContain("You found the mystery state.");
  });
});
