"use client";

import { useState } from "react";
import { ToggleGroup } from "radix-ui";
import { RotateCcw } from "lucide-react";
import { btn } from "@/components/ui/button";
import { coach, rounds, scoreAnswer, type RoundKey, type Scores } from "@/lib/interview";
import { DemoFrame } from "./parts";

const bars: { key: keyof Scores; label: string }[] = [
  { key: "clarity", label: "Clarity" },
  { key: "depth", label: "Depth" },
  { key: "confidence", label: "Confidence" },
];

export function MockInterview() {
  const [round, setRound] = useState<RoundKey>("hr");
  const [q, setQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [scores, setScores] = useState<Scores | null>(null);
  const [history, setHistory] = useState<Scores[]>([]);

  const questions = rounds[round].questions;
  const reset = (r: RoundKey = round) => {
    setRound(r);
    setQ(0);
    setAnswer("");
    setScores(null);
    setHistory([]);
  };
  const submit = () => {
    const s = scoreAnswer(answer);
    setScores(s);
    setHistory((h) => [...h, s]);
  };
  const next = () => {
    setQ((q + 1) % questions.length);
    setAnswer("");
    setScores(null);
  };
  const avg = history.length
    ? Math.round(history.reduce((a, s) => a + (s.clarity + s.depth + s.confidence) / 3, 0) / history.length)
    : null;

  return (
    <DemoFrame title="Answer a mock interview question" note="Sample feedback">
      <ToggleGroup.Root
        type="single"
        value={round}
        onValueChange={(v) => v && reset(v as RoundKey)}
        className="mb-6 flex gap-2"
        aria-label="Interview round"
      >
        {(Object.keys(rounds) as RoundKey[]).map((k) => (
          <ToggleGroup.Item
            key={k}
            value={k}
            className="rounded-full border border-line px-4 py-2 font-display text-sm font-medium transition-colors hover:bg-raised data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-on-accent"
          >
            {rounds[k].label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <p className="font-display text-sm text-muted">Question {q + 1} of {questions.length}</p>
          <p className="lead">{questions[q]}</p>
          <label htmlFor="answer" className="sr-only">Your answer</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            placeholder="Type your answer as you would say it in the interview."
            className="w-full rounded-2xl border border-line bg-ground p-4"
          />
          <div className="flex flex-wrap gap-3">
            <button type="button" className={btn("primary")} onClick={submit} disabled={answer.trim().length < 3}>
              Get feedback
            </button>
            {scores && (
              <button type="button" className={btn("ghost")} onClick={next}>
                Next question
              </button>
            )}
          </div>
        </div>

        <div aria-live="polite" className="space-y-5 rounded-2xl border border-line p-5">
          {scores ? (
            <>
              {bars.map((b) => (
                <div key={b.key}>
                  <div className="mb-1 flex justify-between font-display text-sm font-medium">
                    <span>{b.label}</span>
                    <span className="tabular-nums">{scores[b.key]}</span>
                  </div>
                  <div role="meter" aria-label={b.label} aria-valuenow={scores[b.key]} aria-valuemin={0} aria-valuemax={100} className="h-2 rounded-full bg-raised">
                    <div className="h-full rounded-full bg-glow transition-[width] duration-500" style={{ width: `${scores[b.key]}%` }} />
                  </div>
                </div>
              ))}
              <p className="measure">{coach(scores)}</p>
            </>
          ) : (
            <p className="text-muted">Your scores for clarity, depth and confidence appear here after you answer.</p>
          )}
          {avg !== null && (
            <p className="border-t border-line pt-4 text-sm text-muted">
              Progress: {history.length} answer{history.length === 1 ? "" : "s"}, average score <strong className="text-ink">{avg}</strong>.
            </p>
          )}
        </div>
      </div>
      {history.length > 0 && (
        <button type="button" className={btn("plain", "mt-6 text-sm")} onClick={() => reset()}>
          <RotateCcw aria-hidden size={14} /> Start over
        </button>
      )}
    </DemoFrame>
  );
}
