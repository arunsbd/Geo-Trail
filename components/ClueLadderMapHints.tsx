"use client";

import { useState } from "react";
import { projectToUSMap, US_MAP_VIEWBOX, US_STATE_SHAPES } from "@/data/map";
import { STATE_BY_CODE } from "@/data/states";
import {
  TIME_ZONE_ORDER,
  type ClueLadderHintData,
  type TimeZoneName,
} from "@/lib/clue-ladder/hint-types";
import { MAP_HINT_PENALTY } from "@/lib/clue-ladder/play";

const TIME_ZONE_COLORS: Record<TimeZoneName, string> = {
  "Hawaii-Aleutian": "#855e9c",
  Alaska: "#416f8a",
  Pacific: "#3d8f83",
  Mountain: "#79a94b",
  Central: "#d2a13e",
  Eastern: "#d46943",
};

export type MapHintId = "general" | "time-zones" | "parks";

type HintState = {
  clueRevealed: boolean;
  availableThisRound: boolean;
  revealed: boolean;
};

type ClueLadderMapHintsProps = {
  hints: ClueLadderHintData;
  generalRevealed: boolean;
  timeZones: HintState;
  parks: HintState;
  disabled: boolean;
  onReveal: (hint: MapHintId) => void;
};

function LockedLayer({ label, reason }: { label: string; reason: string }) {
  return (
    <section className="clue-map-hint clue-map-hint--locked">
      <div>
        <span aria-hidden="true" className="clue-map-hint__lock">🔒</span>
        <h3>{label}</h3>
      </div>
      <p>{reason}</p>
    </section>
  );
}

function UnlockLayer({ label, onReveal }: { label: string; onReveal: () => void }) {
  return (
    <button className="clue-map-hint clue-map-hint--reveal" onClick={onReveal} type="button">
      <span>Unlock {label}</span>
      <strong>−{MAP_HINT_PENALTY} points</strong>
    </button>
  );
}

function ToggleLayer({
  label,
  onToggle,
  visible,
}: {
  label: string;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <button
      aria-pressed={visible}
      className={`clue-map-hint clue-map-layer-toggle${visible ? " clue-map-layer-toggle--active" : ""}`}
      onClick={onToggle}
      type="button"
    >
      <span>{label}</span>
      <strong>{visible ? "On" : "Off"}</strong>
    </button>
  );
}

function layerLockReason({
  category,
  disabled,
  generalRevealed,
  hint,
}: {
  category: string;
  disabled: boolean;
  generalRevealed: boolean;
  hint: HintState;
}) {
  if (disabled) return "Round complete. Start a new state to unlock this layer.";
  if (!hint.availableThisRound) return `This ladder has no ${category} clue, so this layer stays locked.`;
  if (!hint.clueRevealed) return `Unlocks after the ${category} clue is revealed.`;
  if (!generalRevealed) return "Unlock the labeled states layer first.";
  return null;
}

function LayerControl({
  id,
  label,
  hint,
  reason,
  visible,
  onReveal,
  onToggle,
}: {
  id: MapHintId;
  label: string;
  hint: { revealed: boolean };
  reason: string | null;
  visible: boolean;
  onReveal: (id: MapHintId) => void;
  onToggle: (id: MapHintId) => void;
}) {
  if (hint.revealed) {
    return <ToggleLayer label={label} onToggle={() => onToggle(id)} visible={visible} />;
  }
  if (reason) return <LockedLayer label={label} reason={reason} />;
  return <UnlockLayer label={`${label} layer`} onReveal={() => onReveal(id)} />;
}

function LayeredUSMap({
  hints,
  showLabels,
  showParks,
  showTimeZones,
}: {
  hints: ClueLadderHintData;
  showLabels: boolean;
  showParks: boolean;
  showTimeZones: boolean;
}) {
  const zonesByState = new Map(hints.timeZones.map(item => [item.code, item.zones]));
  const projectedParks = hints.parks.map((park, index) => ({
    index: index + 1,
    park,
    point: projectToUSMap(park.longitude, park.latitude),
  }));
  const offMap = projectedParks.filter(item => !item.point);
  const activeLayers = [
    showLabels ? "state labels" : null,
    showTimeZones ? "time zones" : null,
    showParks ? "National Park locations" : null,
  ].filter(Boolean).join(", ");

  return (
    <div className="clue-layered-map">
      <svg
        aria-labelledby="layered-map-title layered-map-description"
        className="clue-hint-map"
        role="img"
        viewBox={US_MAP_VIEWBOX}
      >
        <title id="layered-map-title">Layered U.S. reference map</title>
        <desc id="layered-map-description">
          Nationwide map showing {activeLayers || "state outlines"}. No mystery state is identified or highlighted.
        </desc>
        {showTimeZones ? (
          <defs>
            {hints.timeZones.filter(item => item.zones.length > 1).map(item => (
              <pattern
                height="12"
                id={`time-zones-${item.code}`}
                key={item.code}
                patternTransform="rotate(35)"
                patternUnits="userSpaceOnUse"
                width="12"
              >
                {item.zones.map((zone, zoneIndex) => (
                  <rect
                    fill={TIME_ZONE_COLORS[zone]}
                    height="12"
                    key={zone}
                    width={12 / item.zones.length}
                    x={(12 / item.zones.length) * zoneIndex}
                  />
                ))}
              </pattern>
            ))}
          </defs>
        ) : null}
        {US_STATE_SHAPES.map(({ code, name, path, labelX, labelY }) => {
          const zones = zonesByState.get(code) ?? [];
          const fill = showTimeZones
            ? zones.length === 1
              ? TIME_ZONE_COLORS[zones[0]]
              : `url(#time-zones-${code})`
            : undefined;
          const zoneDescription = showTimeZones ? `: ${zones.join(" and ")} standard time` : "";
          return (
            <g key={code}>
              <path
                aria-label={`${name}${zoneDescription}`}
                className={`clue-hint-map__state${showTimeZones ? "" : " clue-hint-map__state--plain"}`}
                d={path}
                fill={fill}
              >
                <title>{`${name}${zoneDescription}`}</title>
              </path>
              {showLabels ? (
                <text aria-hidden="true" className="state-map-label" x={labelX} y={labelY}>
                  {code}
                </text>
              ) : null}
            </g>
          );
        })}
        {showParks ? projectedParks.map(({ index, park, point }) =>
          point ? (
            <g className="park-marker" key={park.id} transform={`translate(${point[0]} ${point[1]})`}>
              <circle r="9" />
              <text aria-hidden="true" y="3">{index}</text>
              <title>{`${index}. ${park.name}${park.states.length ? ` — ${park.states.join(", ")}` : ""}`}</title>
            </g>
          ) : null,
        ) : null}
      </svg>

      {showTimeZones ? (
        <section aria-labelledby="time-zone-layer-title" className="clue-map-layer-details">
          <h3 id="time-zone-layer-title">Time-zone layer</h3>
          <ul aria-label="Time-zone color key" className="clue-map-legend">
            {TIME_ZONE_ORDER.map(zone => (
              <li key={zone}>
                <span aria-hidden="true" style={{ background: TIME_ZONE_COLORS[zone] }} />
                {zone}
              </li>
            ))}
          </ul>
          <p className="clue-map-note">
            State-level legal-zone summary; striped states span multiple zones. Substate boundary lines are not shown. Source:{" "}
            <a href={hints.timeZoneSource.url}>{hints.timeZoneSource.label}</a>, effective {hints.timeZoneSource.effectiveDate}.
          </p>
        </section>
      ) : null}

      {showParks ? (
        <section aria-labelledby="parks-layer-title" className="clue-map-layer-details">
          <h3 id="parks-layer-title">National Park layer</h3>
          <details className="clue-map-data-details">
            <summary>View the labeled National Park location list</summary>
            <ol className="park-location-list">
              {projectedParks.map(({ park }) => (
                <li key={park.id}>
                  <a href={`https://www.nps.gov/${park.parkCode}/index.htm`}>{park.name}</a>
                  {park.states.length ? ` — ${park.states.map(code => STATE_BY_CODE.get(code)?.name).join(", ")}` : " — U.S. territory (outside the 50-state map)"}
                </li>
              ))}
            </ol>
          </details>
          {offMap.length ? (
            <p className="clue-map-note">
              The 50-state map has no territorial insets, so {offMap.map(item => item.park.name).join(" and ")} appear in the labeled list but not as map markers.
            </p>
          ) : null}
          <p className="clue-map-note">
            Formal designation: <a href={hints.parkSource.designationUrl}>National Park Service system list</a>. Locations:{" "}
            <a href={hints.parkSource.locationUrl}>NPS Data API</a>, retrieved {hints.parkSource.retrievedAt}.
          </p>
        </section>
      ) : null}
    </div>
  );
}

export function ClueLadderMapHints({
  hints,
  generalRevealed,
  timeZones,
  parks,
  disabled,
  onReveal,
}: ClueLadderMapHintsProps) {
  const [visibleLayers, setVisibleLayers] = useState<MapHintId[]>(() => [
    ...(generalRevealed ? ["general" as const] : []),
    ...(timeZones.revealed ? ["time-zones" as const] : []),
    ...(parks.revealed ? ["parks" as const] : []),
  ]);

  function revealLayer(id: MapHintId) {
    setVisibleLayers(current => current.includes(id) ? current : [...current, id]);
    onReveal(id);
  }

  function toggleLayer(id: MapHintId) {
    setVisibleLayers(current => current.includes(id)
      ? current.filter(layer => layer !== id)
      : [...current, id]);
  }

  function isLayerVisible(id: MapHintId) {
    const revealed = id === "general"
      ? generalRevealed
      : id === "time-zones"
        ? timeZones.revealed
        : parks.revealed;
    return revealed && visibleLayers.includes(id);
  }

  const timeZoneReason = layerLockReason({
    category: "time-zone",
    disabled,
    generalRevealed,
    hint: timeZones,
  });
  const parksReason = layerLockReason({
    category: "National Parks",
    disabled,
    generalRevealed,
    hint: parks,
  });

  return (
    <section aria-labelledby="map-reveals-title" className="clue-map-hints">
      <div className="clue-map-hints__heading">
        <div>
          <p className="eyebrow">Optional references</p>
          <h2 id="map-reveals-title">Map Layers</h2>
        </div>
        <p>Need some extra help? Unlock layers on one shared map. Each layer costs {MAP_HINT_PENALTY} points.</p>
      </div>

      <div aria-label="Map layers" className="clue-map-hints__grid" role="group">
        <LayerControl
          hint={{ revealed: generalRevealed }}
          id="general"
          label="Labeled states"
          onReveal={revealLayer}
          onToggle={toggleLayer}
          reason={disabled ? "Round complete. Start a new state to unlock this layer." : null}
          visible={isLayerVisible("general")}
        />
        <LayerControl
          hint={timeZones}
          id="time-zones"
          label="Time zones"
          onReveal={revealLayer}
          onToggle={toggleLayer}
          reason={timeZoneReason}
          visible={isLayerVisible("time-zones")}
        />
        <LayerControl
          hint={parks}
          id="parks"
          label="National Parks"
          onReveal={revealLayer}
          onToggle={toggleLayer}
          reason={parksReason}
          visible={isLayerVisible("parks")}
        />
      </div>

      {generalRevealed ? (
        <LayeredUSMap
          hints={hints}
          showLabels={isLayerVisible("general")}
          showParks={isLayerVisible("parks")}
          showTimeZones={isLayerVisible("time-zones")}
        />
      ) : (
        <p className="clue-map-empty">Unlock the labeled states layer to open the shared map.</p>
      )}
    </section>
  );
}
