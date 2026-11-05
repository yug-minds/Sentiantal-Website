"use client";

import { useState } from "react";
import { ToggleGroup } from "radix-ui";
import clsx from "clsx";
import { airBand } from "@/lib/status";
import { DemoFrame, LevelChip, useJitter } from "./parts";

const scenes = {
  kitchen: { label: "Kitchen while cooking", pm1: 38, pm25: 74, pm10: 96, voc: 210, nox: 18, co2: 880, temp: 31, rh: 58,
    advice: "Particles and gases are up. Switch on the chimney or open a window." },
  road: { label: "Busy road", pm1: 52, pm25: 118, pm10: 175, voc: 160, nox: 85, co2: 520, temp: 33, rh: 46,
    advice: "Air is poor outdoors. Limit time outside, and keep windows facing the road shut." },
  office: { label: "Office, windows shut", pm1: 6, pm25: 14, pm10: 21, voc: 75, nox: 6, co2: 1280, temp: 25, rh: 42,
    advice: "Particles are low but CO2 is high. Let fresh air in between meetings." },
} as const;
type Scene = keyof typeof scenes;

const bands = ["Good", "Satisfactory", "Moderate", "Poor", "Very poor", "Severe"];
const bandColour = ["#2e9e6b", "#8bbf4c", "#e0c21b", "#e8892b", "#d2453d", "#8e2a2a"];

export function AirQuality() {
  const [scene, setScene] = useState<Scene>("kitchen");
  const s = scenes[scene];
  const [pm1, pm25, pm10, voc, nox, co2, temp, rh] = useJitter(
    [s.pm1, s.pm25, s.pm10, s.voc, s.nox, s.co2, s.temp, s.rh],
    [1.5, 3, 4, 6, 1.5, 15, 0.2, 1],
  );
  const band = airBand(pm25);
  // Marker position: each band is an equal segment, place within it by value.
  const edges = [0, 30, 60, 90, 120, 250, 350];
  const within = (pm25 - edges[band.index]) / (edges[band.index + 1] - edges[band.index]);
  const pos = ((band.index + Math.min(1, within)) / 6) * 100;

  const rows: [string, string, string][] = [
    ["PM1", pm1.toFixed(0), "µg/m³"],
    ["PM10", pm10.toFixed(0), "µg/m³"],
    ["VOC index", voc.toFixed(0), ""],
    ["NOx index", nox.toFixed(0), ""],
    ["Temperature", temp.toFixed(1), "°C"],
    ["Humidity", rh.toFixed(0), "%"],
  ];

  return (
    <DemoFrame title="Compare the air in three places">
      <ToggleGroup.Root
        type="single"
        value={scene}
        onValueChange={(v) => v && setScene(v as Scene)}
        className="mb-6 flex flex-wrap gap-2"
        aria-label="Place"
      >
        {(Object.keys(scenes) as Scene[]).map((k) => (
          <ToggleGroup.Item
            key={k}
            value={k}
            className="rounded-full border border-line px-4 py-2 font-display text-sm font-medium transition-colors hover:bg-raised data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent"
          >
            {scenes[k].label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm text-muted">PM2.5</p>
          <p className="font-display text-6xl font-bold tabular-nums leading-none">
            {pm25.toFixed(0)} <span className="text-lg font-medium text-muted">µg/m³</span>
          </p>
          <div className="mt-3 flex items-center gap-3" aria-live="polite">
            <LevelChip level={band.level} label={band.label} />
            <span className="text-sm text-muted">CO<sub>2</sub> {co2.toFixed(0)} ppm</span>
          </div>
          <div className="relative mt-6 h-3">
            <div className="flex h-full overflow-hidden rounded-full" role="img" aria-label={`PM2.5 sits in the ${band.label} band`}>
              {bandColour.map((c, i) => (
                <span key={c} className={clsx("flex-1", i === band.index ? "opacity-100" : "opacity-45")} style={{ background: c }} />
              ))}
            </div>
            <span aria-hidden className="absolute -top-1.5 size-6 -translate-x-1/2 rounded-full border-4 border-surface bg-ink transition-[left] duration-700" style={{ left: `${pos}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>{bands[0]}</span>
            <span>{bands[5]}</span>
          </div>
          <p className="measure mt-6" aria-live="polite">{s.advice}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-start">
          {rows.map(([k, v, u]) => (
            <div key={k} className="border-t border-line pt-3">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="font-display text-xl font-bold tabular-nums">{v} <span className="text-sm font-medium text-muted">{u}</span></dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-6 text-xs text-muted">PM2.5 bands follow India’s CPCB breakpoints. Readings here are sample values.</p>
    </DemoFrame>
  );
}
