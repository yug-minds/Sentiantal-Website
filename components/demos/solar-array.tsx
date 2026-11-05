"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import clsx from "clsx";
import { btn } from "@/components/ui/button";
import { PANEL_NOMINAL, panelFault, panelReading } from "@/lib/status";
import { DemoFrame } from "./parts";

const COUNT = 6;
const HISTORY = 24;
const kw = (s: number[]) => s.reduce((a, v) => a + (panelReading(v).volts * panelReading(v).amps) / 1000, 0);

export function SolarArray() {
  const [shade, setShade] = useState<number[]>(Array(COUNT).fill(0));
  const [sel, setSel] = useState(0);
  const [history, setHistory] = useState<number[]>(() => Array(HISTORY).fill(kw(Array(COUNT).fill(0))));

  // One new point a second, with a little noise so the line reads as live.
  useEffect(() => {
    const id = setInterval(() => {
      setHistory((h) => [...h.slice(1), kw(shade) * (1 + (Math.random() - 0.5) * 0.02)]);
    }, 1000);
    return () => clearInterval(id);
  }, [shade]);

  const toggle = (i: number) => {
    setSel(i);
    setShade(shade.map((v, j) => (j === i ? (v > 0 ? 0 : 0.85) : v)));
  };
  const faults = shade.map((v, i) => (panelFault(v) ? i : -1)).filter((i) => i >= 0);
  const r = panelReading(shade[sel]);
  const max = kw(Array(COUNT).fill(0)) * 1.05;
  const pts = history.map((v, i) => `${(i / (HISTORY - 1)) * 100},${36 - (v / max) * 32}`).join(" ");

  return (
    <DemoFrame title="Shade a panel and watch the fault appear">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-3 text-sm text-muted">Select a panel to shade it. Select it again to clear it.</p>
          <div className="grid grid-cols-3 gap-3">
            {shade.map((v, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={v > 0}
                aria-label={`Panel ${i + 1}${v > 0 ? ", shaded" : ""}`}
                onClick={() => toggle(i)}
                className={clsx(
                  "relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors",
                  sel === i ? "border-glow" : "border-line",
                )}
                style={{ background: "linear-gradient(135deg,#1c2a52,#0f1733)" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 grid grid-cols-6 grid-rows-4"
                  style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)", backgroundSize: "16.66% 25%" }}
                />
                <span aria-hidden className="absolute inset-0 bg-black transition-opacity duration-500" style={{ opacity: v * 0.7 }} />
                <span className="absolute bottom-1.5 left-2 font-display text-xs font-medium text-white">P{i + 1}</span>
              </button>
            ))}
          </div>
          <button type="button" className={btn("plain", "mt-4 text-sm")} onClick={() => { setShade(Array(COUNT).fill(0)); }}>
            <RotateCcw aria-hidden size={14} /> Clear all shade
          </button>
        </div>

        <div className="space-y-5">
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              ["Voltage", r.volts, "V", PANEL_NOMINAL.volts],
              ["Current", r.amps, "A", PANEL_NOMINAL.amps],
              ["Temperature", r.temp, "°C", PANEL_NOMINAL.temp],
            ].map(([label, val, unit, nominal]) => (
              <div key={label as string} className="rounded-xl border border-line p-3">
                <dt className="text-sm text-muted">{label as string}, P{sel + 1}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums">
                  {val as number} <span className="text-base font-medium text-muted">{unit as string}</span>
                </dd>
                <p className="text-xs text-muted">Normal {nominal as number}</p>
              </div>
            ))}
          </dl>

          <div>
            <div className="mb-1 flex items-baseline justify-between">
              <h4 className="h3">Array output</h4>
              <span className="tabular-nums">{history[HISTORY - 1].toFixed(2)} kW</span>
            </div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-24 w-full rounded-lg bg-raised" role="img" aria-label="Array output over the last 24 seconds">
              <polyline points={pts} fill="none" stroke="var(--glow)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <div aria-live="polite" className="space-y-2">
            {faults.length === 0 ? (
              <p className="text-muted">All panels are producing as expected.</p>
            ) : (
              faults.map((i) => (
                <p key={i} className="flex items-start gap-2 rounded-xl border border-bad/50 bg-bad/10 p-3 text-bad">
                  <AlertTriangle aria-hidden size={18} className="mt-0.5 shrink-0" />
                  <span>
                    <strong>Panel {i + 1} fault.</strong> Current is {panelReading(shade[i]).amps} A, below 60% of normal. Check for shade or dirt.
                  </span>
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
