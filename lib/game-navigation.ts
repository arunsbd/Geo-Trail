import type { GameMode } from "./onboarding";

export function shouldConfirmGameSwitch(
  activeMode: GameMode,
  targetMode: GameMode,
  hasProgress: boolean,
) {
  return activeMode !== targetMode && hasProgress;
}
