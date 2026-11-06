"use client";

import { airBand } from "@/lib/status";
import { LevelChip, useJitter } from "@/components/demos/parts";
import { LocoSample } from "./loco";

/** A live-looking sample reading for a project. Values are simulated. */
export function Readout({ slug, small }: { slug: string; small?: boolean }) {
  const big = small ? "text-3xl" : "text-5xl";
  const [kw, pm, o2] = useJitter([2.12, 18, 6.1], [0.05, 2.5, 0.25]);
  if (slug === "solar-monitoring")
    return (
      <>
        <p className={`font-display font-bold tabular-nums ${big}`}>{kw.toFixed(2)} <span className="text-xl font-medium text-muted">kW</span></p>
        <p className="mt-2 text-muted">6 of 6 panels normal</p>
      </>
    );
  if (slug === "vaaiu") {
    const b = airBand(pm);
    return (
      <>
        <p className={`font-display font-bold tabular-nums ${big}`}>{pm.toFixed(0)} <span className="text-xl font-medium text-muted">µg/m³ PM2.5</span></p>
        <p className="mt-3"><LevelChip level={b.level} label={b.label} /></p>
      </>
    );
  }
  if (slug === "aquaai")
    return (
      <>
        <p className={`font-display font-bold tabular-nums ${big}`}>{o2.toFixed(1)} <span className="text-xl font-medium text-muted">mg/L oxygen</span></p>
        <p className="mt-3"><LevelChip level="ok" label="Green" /></p>
      </>
    );
  if (slug === "loco-pilot-data-device")
    return (
      <>
        <LocoSample className={small ? "w-52" : "w-72"} />
        <p className="mt-3 text-muted">Display while writing train data</p>
      </>
    );
  return <p className="font-display text-2xl font-bold">Details on request</p>;
}

