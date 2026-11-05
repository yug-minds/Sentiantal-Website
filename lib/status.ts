// Thresholds used by the demos. All values are illustrative and shown as "Sample data" on the site.
// ponytail: fixed lookup tables. Swap for the real device calibration when Sentiantal supplies it.

export type Level = "ok" | "watch" | "alert";

const worst = (...ls: Level[]): Level => (ls.includes("alert") ? "alert" : ls.includes("watch") ? "watch" : "ok");

// ---------- Suraaksha ----------
export const heartLevel = (bpm: number): Level =>
  bpm < 45 || bpm > 130 ? "alert" : bpm < 55 || bpm > 110 ? "watch" : "ok";

export const tempLevel = (c: number): Level =>
  c >= 38.5 || c < 35.5 ? "alert" : c >= 37.8 || c < 36 ? "watch" : "ok";

export const vitalsLevel = (bpm: number, c: number): Level => worst(heartLevel(bpm), tempLevel(c));

// ---------- Agrow: SARAM soil report ----------
export type Crop = "sugarcane" | "tea" | "coffee";
export type SoilParam = "ph" | "ec" | "oc" | "n" | "p" | "k" | "zn" | "s";

export const soilSample: Record<SoilParam, number> = { ph: 6.1, ec: 0.8, oc: 0.42, n: 245, p: 18, k: 190, zn: 0.5, s: 14 };

const phRange: Record<Crop, [number, number]> = { sugarcane: [6.5, 7.5], tea: [4.5, 5.5], coffee: [6.0, 6.5] };

/** Inclusive "OK" range for a parameter. Only pH depends on the crop. */
export const soilRange = (param: SoilParam, crop: Crop): [number, number] => {
  switch (param) {
    case "ph": return phRange[crop];
    case "ec": return [0, 2];
    case "oc": return [0.5, 5];
    case "n": return [280, 560];
    case "p": return [11, 25];
    case "k": return [110, 280];
    case "zn": return [0.6, 5];
    case "s": return [10, 40];
  }
};

export const soilLevel = (param: SoilParam, value: number, crop: Crop): "ok" | "attention" => {
  const [lo, hi] = soilRange(param, crop);
  return value >= lo && value <= hi ? "ok" : "attention";
};

// ---------- Vaaiu: PM2.5 bands (India CPCB breakpoints) ----------
export const airBand = (pm25: number): { label: string; level: Level; index: number } => {
  if (pm25 <= 30) return { label: "Good", level: "ok", index: 0 };
  if (pm25 <= 60) return { label: "Satisfactory", level: "ok", index: 1 };
  if (pm25 <= 90) return { label: "Moderate", level: "watch", index: 2 };
  if (pm25 <= 120) return { label: "Poor", level: "alert", index: 3 };
  if (pm25 <= 250) return { label: "Very poor", level: "alert", index: 4 };
  return { label: "Severe", level: "alert", index: 5 };
};

// ---------- AquaAI: pond ----------
export interface Pond { oxygen: number; ph: number; temp: number; ammonia: number }

export const oxygenLevel = (mgL: number): Level => (mgL < 3 ? "alert" : mgL < 5 ? "watch" : "ok");
export const phLevel = (ph: number): Level => (ph < 6.5 || ph > 9 ? "alert" : ph < 7.5 || ph > 8.5 ? "watch" : "ok");
export const pondTempLevel = (c: number): Level => (c < 24 || c > 34 ? "alert" : c < 26 || c > 32 ? "watch" : "ok");
export const ammoniaLevel = (mgL: number): Level => (mgL > 0.1 ? "alert" : mgL > 0.05 ? "watch" : "ok");

export const pondLevel = (p: Pond): Level =>
  worst(oxygenLevel(p.oxygen), phLevel(p.ph), pondTempLevel(p.temp), ammoniaLevel(p.ammonia));

export const pondAdvice = (p: Pond): string => {
  if (oxygenLevel(p.oxygen) === "alert") return "Switch on aerators now and stop feeding until oxygen recovers.";
  if (ammoniaLevel(p.ammonia) === "alert") return "Ammonia is high. Stop feeding, aerate, and plan a partial water exchange.";
  if (pondTempLevel(p.temp) === "alert") return "Water temperature is outside the safe range. Run aerators and avoid feeding at midday.";
  if (phLevel(p.ph) === "alert") return "pH is outside the safe range. Check the pond before the next feed.";
  const l = pondLevel(p);
  if (l === "watch") return "Conditions are drifting. Aerate through the night and feed a little less.";
  return "Pond is healthy. Keep to the normal feeding plan.";
};

// ---------- Solar ----------
export const PANEL_NOMINAL = { volts: 38.4, amps: 9.2, temp: 41 };

/** shade is 0 to 1. Returns what the unit would read. */
export const panelReading = (shade: number) => ({
  volts: +(PANEL_NOMINAL.volts * (1 - 0.12 * shade)).toFixed(1),
  amps: +(PANEL_NOMINAL.amps * (1 - 0.75 * shade)).toFixed(1),
  temp: Math.round(PANEL_NOMINAL.temp + 9 * shade),
});

export const panelFault = (shade: number): boolean => panelReading(shade).amps < PANEL_NOMINAL.amps * 0.6;
