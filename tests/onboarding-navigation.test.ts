import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GameNavigation } from "@/components/GameNavigation";
import { OnboardingCard } from "@/components/OnboardingCard";
import { shouldConfirmGameSwitch } from "@/lib/game-navigation";
import {
  hasSeenOnboarding,
  markOnboardingSeen,
  ONBOARDING,
} from "@/lib/onboarding";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}

describe("remembered onboarding", () => {
  it("distinguishes unseen and seen game introductions", () => {
    const storage = memoryStorage();
    expect(hasSeenOnboarding("border-hunt", storage)).toBe(false);
    markOnboardingSeen("border-hunt", storage);
    expect(hasSeenOnboarding("border-hunt", storage)).toBe(true);
    expect(hasSeenOnboarding("clue-ladder", storage)).toBe(false);
  });

  it("renders the locked objective and a keyboard-operable primary button", () => {
    const html = renderToStaticMarkup(
      createElement(OnboardingCard, {
        mode: "border-hunt",
        onStart: () => {},
      }),
    );
    expect(html).toContain(ONBOARDING["border-hunt"].title);
    expect(html).toContain("Start Border Hunt");
    expect(html).toContain("role=\"region\"");
    expect(html).toContain("<button");
  });
});

describe("game switching", () => {
  it("warns only when leaving a different game with progress", () => {
    expect(shouldConfirmGameSwitch("border-hunt", "clue-ladder", true)).toBe(true);
    expect(shouldConfirmGameSwitch("border-hunt", "clue-ladder", false)).toBe(false);
    expect(shouldConfirmGameSwitch("border-hunt", "border-hunt", true)).toBe(false);
  });

  it("renders labeled games, an active mode, and a visible Games control", () => {
    const html = renderToStaticMarkup(
      createElement(GameNavigation, {
        activeMode: "clue-ladder",
        hasProgress: false,
      }),
    );
    expect(html).toContain("aria-label=\"Games\"");
    expect(html).toContain("Border Hunt");
    expect(html).toContain("Clue Ladder");
    expect(html).toContain("Coming later");
    expect(html).toContain("aria-current=\"page\"");
  });
});
