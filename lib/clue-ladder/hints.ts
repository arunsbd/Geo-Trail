import {
  NATIONAL_PARK_LOCATIONS,
  NATIONAL_PARK_LOCATION_SOURCE,
} from "@/data/national-parks";
import { STATE_CODES } from "@/data/states";
import {
  TIME_ZONE_ORDER,
  type ClueLadderHintData,
  type TimeZoneName,
} from "./hint-types";
import { loadDataset } from "./load";

function isTimeZoneName(value: string): value is TimeZoneName {
  return (TIME_ZONE_ORDER as readonly string[]).includes(value);
}

export function loadClueLadderHintData(
  snapshotId = "us-states-2026-09-06-v1",
): ClueLadderHintData {
  const data = loadDataset(snapshotId);
  const timeZones = STATE_CODES.map(code => {
    const fact = data.facts.find(
      candidate =>
        candidate.subjectId === `US-${code}` &&
        candidate.metricId === "time.standard_zone",
    );
    const rawZones = fact?.value;
    const zones = Array.isArray(rawZones)
      ? rawZones.filter(
          (value): value is TimeZoneName =>
            typeof value === "string" && isTimeZoneName(value),
        )
      : [];

    if (!fact || !Array.isArray(rawZones) || zones.length !== rawZones.length || zones.length === 0) {
      throw new Error(`Missing verified legal standard-zone data for ${code}`);
    }

    return { code, zones };
  });

  return {
    timeZones,
    timeZoneSource: {
      label: "U.S. Department of Transportation / 49 CFR Part 71",
      url: "https://www.ecfr.gov/current/title-49/subtitle-A/part-71",
      effectiveDate: "2026-08-30",
    },
    parks: NATIONAL_PARK_LOCATIONS,
    parkSource: NATIONAL_PARK_LOCATION_SOURCE,
  };
}
