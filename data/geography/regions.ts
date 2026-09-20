export const BORDER_HUNT_REGION_OPTIONS = [
  { id: "us-states", label: "U.S. States", disabled: false },
  { id: "europe", label: "Europe", badge: "Beta", disabled: false },
  { id: "world", label: "World", badge: "Coming later", disabled: true },
] as const;

export type PlayableBorderHuntRegion = "us-states" | "europe";
