"use client";

import { useEffect, useRef, useState } from "react";
import { ToggleGroup } from "radix-ui";
import { BellRing } from "lucide-react";
import { heartLevel, tempLevel, vitalsLevel } from "@/lib/status";
import { DemoFrame, LabelledSlider, LevelChip, useInView, usePrefersReducedMotion } from "./parts";

type Audience = "family" | "team";

/** One heartbeat as a sum of gaussians: P, Q, R, S, T. phase is 0 to 1. */
const g = (x: number, c: number, w: number, a: number) => a * Math.exp(-((x - c) ** 2) / (2 * w * w));
const beat = (p: number) =>
  g(p, 0.16, 0.025, 0.12) + g(p, 0.27, 0.008, -0.12) + g(p, 0.3, 0.009, 1) + g(p, 0.33, 0.01, -0.25) + g(p, 0.56, 0.04, 0.22);

function Trace({ bpm, level }: { bpm: number; level: "ok" | "watch" | "alert" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [wrap, inView] = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const bpmRef = useRef(bpm);
  const levelRef = useRef(level);
  useEffect(() => {
    bpmRef.current = bpm;
    levelRef.current = level;
  });

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const colour = () => {
      const s = getComputedStyle(c);
      return levelRef.current === "alert" ? "#e5584f" : levelRef.current === "watch" ? "#e8b23a" : s.getPropertyValue("--glow") || "#5c8de0";
    };

    const draw = (tNow: number) => {
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 2.5 * dpr;
      ctx.lineJoin = "round";
      ctx.strokeStyle = colour();
      ctx.beginPath();
      const speed = 160 * dpr; // pixels per second
      for (let x = 0; x <= W; x += 2) {
        const time = tNow / 1000 - (W - x) / speed;
        const phase = ((time * bpmRef.current) / 60) % 1;
        const y = H * 0.72 - beat((phase + 1) % 1) * H * 0.55;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    let id = 0;
    const loop = (t: number) => {
      draw(t);
      id = requestAnimationFrame(loop);
    };
    if (reduced || !inView) draw(2400);
    else id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [inView, reduced, bpm, level]);

  return (
    <div ref={wrap} className="relative overflow-hidden rounded-2xl border border-line bg-ground">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <canvas ref={ref} role="img" aria-label={`ECG trace at ${bpm} beats per minute`} className="relative block h-44 w-full" />
    </div>
  );
}

const todayBars = [62, 64, 70, 78, 74, 71, 68, 83, 90, 76, 70, 66];

export function EcgMonitor() {
  const [bpm, setBpm] = useState(72);
  const [temp, setTemp] = useState(36.8);
  const [who, setWho] = useState<Audience>("family");
  const level = vitalsLevel(bpm, temp);

  const message =
    level === "alert"
      ? who === "family"
        ? "Alert sent to your family contacts, with your last readings."
        : "Supervisor notified. A PDF report is saved to the dashboard."
      : level === "watch"
        ? "Outside your usual range. Suraaksha is watching and will alert if it keeps rising."
        : "Readings are in your usual range. No alert needed.";

  return (
    <DemoFrame title="Watch a live reading">
      <div className="mb-6">
        <p className="mb-2 font-display text-sm font-medium">Who gets the alert</p>
        <ToggleGroup.Root
          type="single"
          value={who}
          onValueChange={(v) => v && setWho(v as Audience)}
          className="inline-flex rounded-full border border-line p-1"
          aria-label="Who gets the alert"
        >
          {([["family", "You and family"], ["team", "Work team"]] as const).map(([k, label]) => (
            <ToggleGroup.Item
              key={k}
              value={k}
              className="rounded-full px-4 py-2 font-display text-sm font-medium transition-colors data-[state=on]:bg-accent data-[state=on]:text-on-accent"
            >
              {label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>

      <Trace bpm={bpm} level={level} />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <LabelledSlider label="Heart rate" unit="bpm" value={bpm} min={35} max={170} step={1} onChange={setBpm} level={heartLevel(bpm)} />
          <LabelledSlider label="Temperature" unit="°C" value={temp} min={34.5} max={40} step={0.1} digits={1} onChange={setTemp} level={tempLevel(temp)} />
          <div>
            <p className="mb-2 font-display text-sm font-medium">Today</p>
            <div className="flex h-16 items-end gap-1" role="img" aria-label="Heart rate across the day, between 62 and 90 beats per minute">
              {todayBars.map((b, i) => (
                <span key={i} className="flex-1 rounded-t bg-raised" style={{ height: `${((b - 50) / 45) * 100}%` }} />
              ))}
              <span className="flex-1 rounded-t bg-accent" style={{ height: `${Math.max(8, Math.min(100, ((bpm - 50) / 45) * 100))}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line p-5" aria-live="polite">
          <div className="mb-3 flex items-center gap-3">
            <BellRing aria-hidden size={20} />
            <h4 className="h3">Alert</h4>
            <LevelChip level={level} />
          </div>
          <p className="measure">{message}</p>
          <p className="mt-4 text-sm text-muted">Suraaksha supports early awareness. It does not replace a doctor.</p>
        </div>
      </div>
    </DemoFrame>
  );
}
