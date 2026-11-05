"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { btn } from "@/components/ui/button";
import { ammoniaLevel, oxygenLevel, phLevel, pondAdvice, pondLevel, pondTempLevel, type Level, type Pond } from "@/lib/status";
import { DemoFrame, LabelledSlider, LevelChip } from "./parts";

const healthy: Pond = { oxygen: 6.2, ph: 8, temp: 29, ammonia: 0.02 };
const lowOxygen: Pond = { oxygen: 2.6, ph: 7.9, temp: 31, ammonia: 0.04 };
const colour: Record<Level, string> = { ok: "#2e9e6b", watch: "#e0a21b", alert: "#d2453d" };
const word: Record<Level, string> = { ok: "Green", watch: "Amber", alert: "Red" };

export function PondStatus() {
  const [p, setP] = useState<Pond>(healthy);
  const level = pondLevel(p);
  const set = (k: keyof Pond) => (v: number) => setP({ ...p, [k]: v });

  return (
    <DemoFrame title="Set the water and read the pond">
      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" className={btn("ghost", "py-2")} onClick={() => setP(healthy)}>
          Healthy pond
        </button>
        <button type="button" className={btn("ghost", "py-2")} onClick={() => setP(lowOxygen)}>
          Low oxygen before dawn
        </button>
        <button type="button" className={btn("plain", "text-sm")} onClick={() => setP(healthy)}>
          <RotateCcw aria-hidden size={14} /> Reset
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <LabelledSlider label="Dissolved oxygen" unit="mg/L" value={p.oxygen} min={1} max={9} step={0.1} digits={1} onChange={set("oxygen")} level={oxygenLevel(p.oxygen)} />
          <LabelledSlider label="pH" unit="" value={p.ph} min={6} max={9.5} step={0.1} digits={1} onChange={set("ph")} level={phLevel(p.ph)} />
          <LabelledSlider label="Water temperature" unit="°C" value={p.temp} min={20} max={37} step={0.5} digits={1} onChange={set("temp")} level={pondTempLevel(p.temp)} />
          <LabelledSlider label="Ammonia" unit="mg/L" value={p.ammonia} min={0} max={0.25} step={0.01} digits={2} onChange={set("ammonia")} level={ammoniaLevel(p.ammonia)} />
        </div>

        <div className="space-y-4">
          <div className="relative grid place-items-center overflow-hidden rounded-2xl border border-line bg-ground py-8" role="img" aria-label={`Pond status: ${word[level]}`}>
            <svg viewBox="0 0 200 110" className="w-full max-w-sm">
              <ellipse cx="100" cy="58" rx="88" ry="44" fill={colour[level]} opacity="0.18" style={{ transition: "fill 400ms" }} />
              <ellipse cx="100" cy="58" rx="66" ry="32" fill="none" stroke={colour[level]} strokeWidth="1.5" opacity="0.5" style={{ transition: "stroke 400ms" }} />
              <ellipse cx="100" cy="58" rx="40" ry="19" fill="none" stroke={colour[level]} strokeWidth="1.5" opacity="0.7" style={{ transition: "stroke 400ms" }} />
              <circle cx="100" cy="58" r="9" fill={colour[level]} style={{ transition: "fill 400ms" }} />
            </svg>
            <p className="absolute left-4 top-4 flex items-center gap-2 font-display text-lg font-bold">
              <LevelChip level={level} label={word[level]} />
            </p>
          </div>
          <p className="measure text-lg" aria-live="polite">{pondAdvice(p)}</p>
        </div>
      </div>
      <p className="mt-6 text-xs text-muted">Thresholds here are sample values for illustration.</p>
    </DemoFrame>
  );
}
