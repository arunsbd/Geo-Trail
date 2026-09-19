import type {
  NATIONAL_PARK_LOCATION_SOURCE,
  NationalParkLocation,
} from "@/data/national-parks";
import type { StateCode } from "@/data/states";

export const TIME_ZONE_ORDER = [
  "Hawaii-Aleutian",
  "Alaska",
  "Pacific",
  "Mountain",
  "Central",
  "Eastern",
] as const;

export type TimeZoneName = (typeof TIME_ZONE_ORDER)[number];

export type StateTimeZones = {
  code: StateCode;
  zones: readonly TimeZoneName[];
};

export type ClueLadderHintData = {
  timeZones: readonly StateTimeZones[];
  timeZoneSource: {
    label: string;
    url: string;
    effectiveDate: string;
  };
  parks: readonly NationalParkLocation[];
  parkSource: typeof NATIONAL_PARK_LOCATION_SOURCE;
};
