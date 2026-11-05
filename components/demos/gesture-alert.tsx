"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Switch } from "radix-ui";
import { Check, RotateCcw, Hand } from "lucide-react";
import clsx from "clsx";
import { btn } from "@/components/ui/button";
import { DemoFrame } from "./parts";

// Milliseconds after the gesture. The real system alerts in 1.5 to 2.5 seconds.
const steps = [
  { at: 0, label: "Gesture seen on camera" },
  { at: 650, label: "AI confirms the gesture" },
  { at: 1350, label: "Family alerted" },
  { at: 1950, label: "Police alerted" },
] as const;
const TOTAL = steps[steps.length - 1].at;

export function GestureAlert() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [travel, setTravel] = useState(false);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const run = () => {
    setRunning(true);
    setElapsed(0);
    const t0 = performance.now();
    const tick = (now: number) => {
      const e = Math.min(TOTAL, now - t0);
      setElapsed(e);
      if (e < TOTAL) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  const reset = () => {
    cancelAnimationFrame(raf.current);
    setRunning(false);
    setElapsed(0);
  };

  const done = running && elapsed >= TOTAL;
  const gesture = running;

  return (
    <DemoFrame title="Send a distress alert" note="Simulation">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-[#0e1522]">
            <svg viewBox="0 0 320 180" className="size-full" role="img" aria-label={gesture ? "Camera view: a person raising an open hand, marked as detected" : "Camera view: a person standing"}>
              <defs>
                <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1a2437" />
                  <stop offset="1" stopColor="#0b101a" />
                </linearGradient>
              </defs>
              <rect width="320" height="180" fill="url(#floor)" />
              <path d="M0 120 L320 120 M0 150 L320 150 M60 120 L20 180 M160 120 L160 180 M260 120 L300 180" stroke="#25324a" strokeWidth="1" />
              {/* person */}
              <g stroke="#cdd7ea" strokeWidth="6" strokeLinecap="round" fill="none">
                <circle cx="160" cy="68" r="11" fill="#cdd7ea" stroke="none" />
                <path d="M160 82 L160 125" />
                <path d="M160 125 L148 160 M160 125 L172 160" />
                <path d="M160 92 L142 112" />
                <path d={gesture ? "M160 92 L180 62 L180 50" : "M160 92 L178 112"} style={{ transition: "d 300ms" }} />
              </g>
              {gesture && (
                <g>
                  <rect x="118" y="38" width="92" height="128" fill="none" stroke="#e2a23b" strokeWidth="2" strokeDasharray="6 4" />
                  <rect x="118" y="22" width="92" height="16" fill="#e2a23b" />
                  <text x="124" y="34" fontSize="10" fontWeight="700" fill="#190910">Gesture detected</text>
                </g>
              )}
              <circle cx="14" cy="14" r="4" fill="#e5584f" />
              <text x="24" y="18" fontSize="10" fill="#cdd7ea">CAM 03, Main gate</text>
            </svg>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" className={btn("primary")} onClick={run} disabled={running && !done}>
              <Hand aria-hidden size={16} /> Show the distress gesture
            </button>
            {running && (
              <button type="button" className={btn("ghost")} onClick={reset}>
                <RotateCcw aria-hidden size={16} /> Reset
              </button>
            )}
          </div>
        </div>

        <div>
          <ol className="space-y-3" aria-live="polite">
            {steps.map((s) => {
              const on = running && elapsed >= s.at;
              return (
                <li key={s.label} className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "grid size-8 shrink-0 place-items-center rounded-full border transition-colors",
                      on ? "border-glow bg-glow text-ground" : "border-line text-transparent",
                    )}
                  >
                    <Check aria-hidden size={16} />
                  </span>
                  <span className={clsx(on ? "text-ink" : "text-muted")}>{s.label}</span>
                  {on && <span className="ml-auto tabular-nums text-sm text-muted">{(s.at / 1000).toFixed(1)} s</span>}
                </li>
              );
            })}
          </ol>
          <p className="mt-5 font-display text-2xl font-bold tabular-nums" aria-live="polite">
            {done ? `Alert delivered in ${(TOTAL / 1000).toFixed(1)} s` : running ? `${(elapsed / 1000).toFixed(1)} s` : "Ready"}
          </p>
          <p className="mt-1 text-sm text-muted">Real alerts reach family and police in 1.5 to 2.5 seconds.</p>

          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-line p-4">
            <div className="relative h-44 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-line">
              <Image src="/field/wow-app.jpg" alt="W.O.W app showing travel mode, smart ID card and battery safety monitor" fill sizes="80px" className="object-cover object-top" />
            </div>
            <div className="space-y-3">
              <h4 className="h3">In the app</h4>
              <label className="flex items-center gap-3">
                <Switch.Root
                  checked={travel}
                  onCheckedChange={setTravel}
                  className="relative h-7 w-12 rounded-full border border-line bg-raised transition-colors data-[state=checked]:bg-accent"
                >
                  <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-ink transition-transform data-[state=checked]:translate-x-6 data-[state=checked]:bg-on-accent" />
                </Switch.Root>
                <span>Travel mode</span>
              </label>
              <p className="text-sm text-muted" aria-live="polite">
                {travel ? "Sharing your location with emergency contacts." : "Switch on when you travel, and your contacts can follow your trip."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
