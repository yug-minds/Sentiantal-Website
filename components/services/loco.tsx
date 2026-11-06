"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { btn } from "@/components/ui/button";
import { DemoFrame } from "@/components/demos/parts";

const W = 16; // the device's display is 16 characters by 2 lines

/** The device's 16 x 2 character display, as photographed: white pixel text on blue. */
export function Lcd({ line1, line2, className }: { line1: string; line2: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Display: ${line1} ${line2}`}
      className={`lcd rounded-md border-2 border-black bg-[#1c5bff] px-2 py-1.5 ${className ?? ""}`}
    >
      <p aria-hidden className="lcd-text">{line1.padEnd(W)}</p>
      <p aria-hidden className="lcd-text">{line2.padEnd(W)}</p>
    </div>
  );
}

const bar = (n: number) => "█".repeat(n) + "░".repeat(W - n);
const WARNING = ["Dont Press Switc", "If Train Writing"] as const;

/** A looping sample of the display: the warning screen, then a progress bar filling. Simulated. */
export function LocoSample({ className }: { className?: string }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setT((x) => (x + 1) % 15), 450);
    return () => clearInterval(id);
  }, []);
  const writing = t >= 6;
  return writing ? (
    <Lcd line1="Writing data..." line2={bar(Math.min(W, (t - 5) * 2))} className={className} />
  ) : (
    <Lcd line1={WARNING[0]} line2={WARNING[1]} className={className} />
  );
}

type Phase = "idle" | "writing" | "done";

/** Press start and watch the display run through a write, the way the device does. Simulated. */
export function LocoDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [p, setP] = useState(0);
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const start = () => {
    setPhase("writing");
    setP(0);
    const t0 = performance.now();
    const tick = (now: number) => {
      const v = Math.min(1, (now - t0) / 4500);
      setP(v);
      if (v < 1) raf.current = requestAnimationFrame(tick);
      else setPhase("done");
    };
    raf.current = requestAnimationFrame(tick);
  };

  const lines: [string, string] =
    phase === "idle" ? ["Sentiantal", "Ready"] :
    phase === "writing" ? (p < 0.35 ? [WARNING[0], WARNING[1]] : ["Writing data...", bar(Math.round(p * W))]) :
    ["Data stored", "Safe to press"];

  return (
    <DemoFrame title="Watch the device write data">
      <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
        <div className="relative mx-auto w-48 sm:w-56">
          <Image src="/products/loco-pilot-device.png" alt="" width={480} height={958} sizes="224px" className="w-full drop-shadow-[0_20px_24px_rgba(25,9,16,0.25)]" />
          {/* The live display sits exactly over the photographed one. */}
          <Lcd line1={lines[0]} line2={lines[1]} className="lcd-over absolute left-[19%] top-[17.5%] w-[62%]" />
          <span aria-hidden className={`absolute right-[7%] top-[22.5%] size-3 rounded-full bg-sky-400 ${phase === "writing" ? "loco-led" : "opacity-40"}`} />
        </div>
        <div className="space-y-4">
          <p className="measure text-muted">
            Press start. The device shows a warning while it writes train data, then confirms when it is done. This is a simulation of the screen, not a real device.
          </p>
          <div className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-line" aria-hidden>
            <div className="h-full origin-left rounded-full bg-accent" style={{ transform: `scaleX(${phase === "idle" ? 0 : p})` }} />
          </div>
          <button type="button" className={btn("primary")} onClick={start} disabled={phase === "writing"}>
            <Play aria-hidden size={16} /> {phase === "done" ? "Run again" : "Start writing"}
          </button>
        </div>
      </div>
    </DemoFrame>
  );
}
