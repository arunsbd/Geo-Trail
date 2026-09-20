import { BORDER_HUNT_REGION_OPTIONS, type PlayableBorderHuntRegion } from "@/data/geography/regions";

export function RegionSelector({
  value,
  onChange,
}: {
  value: PlayableBorderHuntRegion;
  onChange: (value: PlayableBorderHuntRegion) => void;
}) {
  return (
    <fieldset className="region-selector">
      <legend>Map region</legend>
      <div className="region-selector__options">
        {BORDER_HUNT_REGION_OPTIONS.map((option) => (
          <label className="region-selector__option" key={option.id}>
            <input
              checked={value === option.id}
              disabled={option.disabled}
              name="border-hunt-region"
              onChange={() => {
                if (!option.disabled) onChange(option.id);
              }}
              type="radio"
              value={option.id}
            />
            <span>
              {option.label}
              {"badge" in option ? <small>{option.badge}</small> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
