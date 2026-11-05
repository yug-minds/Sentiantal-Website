// Run: node --test lib/status.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  heartLevel, tempLevel, vitalsLevel, soilLevel, airBand, pondLevel, pondAdvice, panelFault, panelReading,
  soilSample,
} from "./status.ts";
import { coach, scoreAnswer } from "./interview.ts";

test("heart rate bands", () => {
  assert.equal(heartLevel(72), "ok");
  assert.equal(heartLevel(120), "watch");
  assert.equal(heartLevel(150), "alert");
  assert.equal(heartLevel(40), "alert");
});

test("vitals take the worst of heart and temperature", () => {
  assert.equal(vitalsLevel(72, 36.8), "ok");
  assert.equal(vitalsLevel(72, 38.9), "alert");
  assert.equal(tempLevel(37.9), "watch");
});

test("soil pH depends on the crop, other parameters do not", () => {
  assert.equal(soilLevel("ph", soilSample.ph, "coffee"), "ok");
  assert.equal(soilLevel("ph", soilSample.ph, "tea"), "attention");
  assert.equal(soilLevel("ph", soilSample.ph, "sugarcane"), "attention");
  assert.equal(soilLevel("p", soilSample.p, "tea"), "ok");
  assert.equal(soilLevel("n", soilSample.n, "tea"), "attention");
});

test("PM2.5 bands follow CPCB breakpoints", () => {
  assert.equal(airBand(18).label, "Good");
  assert.equal(airBand(61).label, "Moderate");
  assert.equal(airBand(121).label, "Very poor");
  assert.equal(airBand(300).label, "Severe");
});

test("pond status is the worst parameter, and advice follows it", () => {
  const healthy = { oxygen: 6, ph: 8, temp: 29, ammonia: 0.02 };
  assert.equal(pondLevel(healthy), "ok");
  const lowO2 = { ...healthy, oxygen: 2.4 };
  assert.equal(pondLevel(lowO2), "alert");
  assert.match(pondAdvice(lowO2), /aerators/);
});

test("interview scoring rewards structure and punishes hedging", () => {
  assert.deepEqual(scoreAnswer(""), { clarity: 0, depth: 0, confidence: 0 });
  const good = scoreAnswer("I led a small team because our old process was slow. For example, we cut invoice time by 40 percent and I learned to plan around user feedback.");
  const hedgy = scoreAnswer("Maybe I think it was kind of okay, I guess, not sure.");
  assert.ok(good.depth > hedgy.depth);
  assert.ok(good.confidence > hedgy.confidence);
  assert.match(coach(hedgy), /hedging|sentences|example/);
});

test("shading a panel past the threshold raises a fault", () => {
  assert.equal(panelFault(0), false);
  assert.equal(panelFault(0.3), false);
  assert.equal(panelFault(0.8), true);
  assert.ok(panelReading(0.8).amps < panelReading(0).amps);
});
