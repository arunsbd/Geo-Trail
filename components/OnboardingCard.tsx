import { ONBOARDING, type GameMode } from "@/lib/onboarding";

export function OnboardingCard({
  mode,
  onStart,
  onClose,
}: {
  mode: GameMode;
  onStart: () => void;
  onClose?: () => void;
}) {
  const content = ONBOARDING[mode];

  return (
    <section
      aria-labelledby={`${mode}-intro-title`}
      className="onboarding-card"
      role="region"
    >
      <p className="eyebrow">How to play</p>
      <h2 id={`${mode}-intro-title`}>{content.title}</h2>
      <p>{content.body}</p>
      <div className="onboarding-card__actions">
        <button className="primary-button" onClick={onStart} type="button">
          {content.action}
        </button>
        {onClose ? (
          <button className="secondary-button" onClick={onClose} type="button">
            Back to game
          </button>
        ) : null}
      </div>
    </section>
  );
}
