"use client";

import { useEffect, useRef, useState } from "react";
import { ToggleGroup } from "radix-ui";
import { Printer, RotateCcw, Play } from "lucide-react";
import clsx from "clsx";
import { btn } from "@/components/ui/button";
import { soilLevel, soilRange, soilSample, type Crop, type SoilParam } from "@/lib/status";
import { DemoFrame } from "./parts";

type Lang = "en" | "te" | "hi";

const t = {
  en: {
    start: "Start test", testing: "Testing", left: "left", report: "Soil report", ok: "OK", attention: "Needs attention",
    crop: "Crop", language: "Language", print: "Print report", again: "Test again", next: "What to do next",
    param: "Parameter", reading: "Reading", range: "Healthy range", status: "Status",
    crops: { sugarcane: "Sugarcane", tea: "Tea", coffee: "Coffee" },
    tips: {
      oc: "Add compost or farmyard manure.", n: "Split nitrogen into two or three doses.", zn: "Apply zinc sulphate.",
      ph: "Adjust soil pH for this crop.", p: "Match phosphorus to the crop plan.", k: "Match potassium to the crop plan.",
      s: "Add a sulphur source.", ec: "Check irrigation water and drainage for salts.", none: "All readings are in range. Keep to the current plan.",
    },
  },
  te: {
    start: "పరీక్ష ప్రారంభించండి", testing: "పరీక్షిస్తోంది", left: "మిగిలింది", report: "మట్టి నివేదిక", ok: "బాగుంది",
    attention: "శ్రద్ధ అవసరం", crop: "పంట", language: "భాష", print: "నివేదికను ముద్రించండి", again: "మళ్లీ పరీక్షించండి",
    next: "తర్వాత ఏమి చేయాలి", param: "అంశం", reading: "విలువ", range: "సరైన పరిధి", status: "స్థితి",
    crops: { sugarcane: "చెరకు", tea: "తేయాకు", coffee: "కాఫీ" },
    tips: {
      oc: "కంపోస్టు లేదా పశువుల ఎరువు వేయండి.", n: "నత్రజనిని 2–3 దఫాలుగా వేయండి.", zn: "జింక్ సల్ఫేట్ వేయండి.",
      ph: "పంటకు తగినట్లు నేల pH ని సరిచేయండి.", p: "P", k: "K", s: "S", ec: "EC", none: "అన్ని విలువలు సరైన పరిధిలో ఉన్నాయి.",
    },
  },
  hi: {
    start: "जांच शुरू करें", testing: "जांच हो रही है", left: "बाकी", report: "मिट्टी रिपोर्ट", ok: "ठीक है", attention: "ध्यान दें",
    crop: "फसल", language: "भाषा", print: "रिपोर्ट प्रिंट करें", again: "फिर से जांचें", next: "आगे क्या करें",
    param: "मापदंड", reading: "मान", range: "सही सीमा", status: "स्थिति",
    crops: { sugarcane: "गन्ना", tea: "चाय", coffee: "कॉफी" },
    tips: {
      oc: "कम्पोस्ट या गोबर की खाद डालें।", n: "नाइट्रोजन को 2–3 बार में डालें।", zn: "ज़िंक सल्फेट डालें।",
      ph: "फसल के अनुसार मिट्टी का pH ठीक करें।", p: "P", k: "K", s: "S", ec: "EC", none: "सभी मान सही सीमा में हैं।",
    },
  },
} as const;

const params: { key: SoilParam; label: string; unit: string }[] = [
  { key: "ph", label: "pH", unit: "" },
  { key: "ec", label: "EC", unit: "dS/m" },
  { key: "oc", label: "Organic carbon", unit: "%" },
  { key: "n", label: "Nitrogen (N)", unit: "kg/ha" },
  { key: "p", label: "Phosphorus (P)", unit: "kg/ha" },
  { key: "k", label: "Potassium (K)", unit: "kg/ha" },
  { key: "zn", label: "Zinc (Zn)", unit: "ppm" },
  { key: "s", label: "Sulphur (S)", unit: "ppm" },
];

const TEST_SECONDS = 120;
const toggleItem =
  "rounded-full border border-line px-4 py-2 font-display text-sm font-medium transition-colors hover:bg-raised data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent";

export function SoilTest() {
  const [phase, setPhase] = useState<"idle" | "testing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [crop, setCrop] = useState<Crop>("sugarcane");
  const [lang, setLang] = useState<Lang>("en");
  const raf = useRef<number>(0);
  const L = t[lang];

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const start = () => {
    setPhase("testing");
    setProgress(0);
    const t0 = performance.now();
    const tick = (now: number) => {
      // The real test takes 2 minutes. The demo plays it back in about 4 seconds.
      const p = Math.min(1, (now - t0) / 4000);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPhase("done");
    };
    raf.current = requestAnimationFrame(tick);
  };

  const rows = params.map((p) => {
    const value = soilSample[p.key];
    return { ...p, value, range: soilRange(p.key, crop), level: soilLevel(p.key, value, crop) };
  });
  const flagged = rows.filter((r) => r.level === "attention").map((r) => r.key);
  const tipKeys = flagged.filter((k) => ["oc", "n", "zn", "ph"].includes(k));
  const secsLeft = Math.ceil(TEST_SECONDS * (1 - progress));
  const mmss = `${Math.floor(secsLeft / 60)}:${String(secsLeft % 60).padStart(2, "0")}`;

  return (
    <DemoFrame title="Run a soil test">
      <div className="no-print mb-6 flex flex-wrap gap-x-8 gap-y-4">
        <div>
          <p className="mb-2 font-display text-sm font-medium">{L.crop}</p>
          <ToggleGroup.Root
            type="single"
            value={crop}
            onValueChange={(v) => v && setCrop(v as Crop)}
            className="flex flex-wrap gap-2"
            aria-label={L.crop}
          >
            {(Object.keys(L.crops) as Crop[]).map((c) => (
              <ToggleGroup.Item key={c} value={c} className={toggleItem}>
                {L.crops[c]}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div>
        <div>
          <p className="mb-2 font-display text-sm font-medium">{L.language}</p>
          <ToggleGroup.Root
            type="single"
            value={lang}
            onValueChange={(v) => v && setLang(v as Lang)}
            className="flex gap-2"
            aria-label={L.language}
          >
            {([["en", "English"], ["te", "తెలుగు"], ["hi", "हिन्दी"]] as const).map(([k, name]) => (
              <ToggleGroup.Item key={k} value={k} className={toggleItem} lang={k}>
                {name}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div>
      </div>

      {phase !== "done" ? (
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto size-48" role="img" aria-label={phase === "testing" ? `${mmss} ${L.left}` : "SARAM ready"}>
            <svg viewBox="0 0 120 120" className="size-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none" stroke="var(--glow)" strokeWidth="8" strokeLinecap="round"
                pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="font-display text-3xl font-bold tabular-nums">{phase === "testing" ? mmss : "2:00"}</p>
                <p className="text-sm text-muted">{phase === "testing" ? `${L.testing}…` : "SARAM"}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="measure text-muted" lang={lang}>
              {lang === "en"
                ? "Press start. The real test takes two minutes. This demo plays it back in a few seconds, then shows a sample report for the crop you picked."
                : L.report}
            </p>
            <button type="button" className={btn("primary")} onClick={start} disabled={phase === "testing"}>
              <Play aria-hidden size={16} /> <span lang={lang}>{L.start}</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="print-area" aria-live="polite">
            <h4 className="h3 mb-1" lang={lang}>
              {L.report}: {L.crops[crop]}
            </h4>
            <p className="mb-4 text-sm text-muted">Sentiantal Agrow Insights, SARAM. Sample report.</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[30rem] text-left text-[0.95rem]">
                <thead>
                  <tr className="border-b border-line font-display text-sm">
                    {[L.param, L.reading, L.range, L.status].map((h) => (
                      <th key={h} scope="col" className="py-2 pr-4 font-medium" lang={lang}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.key} className="border-b border-line/60">
                      <th scope="row" className="py-2.5 pr-4 font-normal">{r.label}</th>
                      <td className="py-2.5 pr-4 tabular-nums">{r.value} {r.unit}</td>
                      <td className="py-2.5 pr-4 tabular-nums text-muted">{r.range[0]} to {r.range[1]}</td>
                      <td className="py-2.5">
                        <span
                          lang={lang}
                          className={clsx(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm font-medium",
                            r.level === "ok" ? "border-good/40 bg-good/15 text-good" : "border-warn/50 bg-warn/15 text-warn",
                          )}
                        >
                          <span aria-hidden className="size-2 rounded-full bg-current" />
                          {r.level === "ok" ? L.ok : L.attention}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 className="h3 mb-2 mt-6" lang={lang}>{L.next}</h4>
            <ul className="list-disc space-y-1 pl-5" lang={lang}>
              {tipKeys.length === 0 ? <li>{L.tips.none}</li> : tipKeys.map((k) => <li key={k}>{L.tips[k as "oc" | "n" | "zn" | "ph"]}</li>)}
            </ul>
          </div>
          <div className="no-print mt-6 flex flex-wrap gap-3">
            <button type="button" className={btn("primary")} onClick={() => window.print()}>
              <Printer aria-hidden size={16} /> <span lang={lang}>{L.print}</span>
            </button>
            <button type="button" className={btn("ghost")} onClick={() => setPhase("idle")}>
              <RotateCcw aria-hidden size={16} /> <span lang={lang}>{L.again}</span>
            </button>
          </div>
        </div>
      )}
    </DemoFrame>
  );
}
