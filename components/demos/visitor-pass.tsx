"use client";

import { useState } from "react";
import { Tabs } from "radix-ui";
import { Check, RotateCcw } from "lucide-react";
import clsx from "clsx";
import { btn } from "@/components/ui/button";
import { DemoFrame } from "./parts";

/** A decorative pattern. It is labelled "Sample pass" and does not scan. */
const CELLS = (() => {
  let s = 7;
  return Array.from({ length: 81 }, () => {
    s = (s * 48271) % 2147483647;
    return s % 3 !== 0;
  });
})();

function SamplePass() {
  return (
    <div className="inline-block rounded-2xl border border-line bg-white p-3 text-black">
      <div className="grid grid-cols-9 gap-[2px]" aria-hidden>
        {CELLS.map((on, i) => (
          <span key={i} className={clsx("size-3.5", on ? "bg-black" : "bg-white")} />
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-medium">Sample pass</p>
    </div>
  );
}

const slots = ["Clubhouse, 6 to 8 pm", "Clubhouse, 8 to 10 pm", "Terrace hall, 10 am to 1 pm", "Terrace hall, 4 to 7 pm"];

export function VisitorPass() {
  const [tab, setTab] = useState("resident");
  const [approved, setApproved] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [booked, setBooked] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState<string[]>([]);

  const reset = () => {
    setApproved(null);
    setScanned(false);
    setBooked([]);
    setNotice("");
    setNotices([]);
    setTab("resident");
  };
  const tabClass =
    "flex-1 rounded-full px-4 py-2 font-display text-sm font-medium transition-colors data-[state=active]:bg-accent data-[state=active]:text-on-accent";

  return (
    <DemoFrame title="Follow one visit across three roles" note="Sample pass and data">
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List aria-label="Role" className="mb-6 flex max-w-md rounded-full border border-line p-1">
          <Tabs.Trigger value="resident" className={tabClass}>Resident</Tabs.Trigger>
          <Tabs.Trigger value="guard" className={tabClass}>Guard</Tabs.Trigger>
          <Tabs.Trigger value="admin" className={tabClass}>Admin</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="resident" className="space-y-4" aria-live="polite">
          <p className="measure">
            <strong>Ravi Kumar, plumber,</strong> is at the gate asking for <strong>B-204</strong>.
          </p>
          {approved === null && (
            <div className="flex gap-3">
              <button type="button" className={btn("primary")} onClick={() => setApproved(true)}>Approve</button>
              <button type="button" className={btn("ghost")} onClick={() => setApproved(false)}>Decline</button>
            </div>
          )}
          {approved === true && (
            <div className="flex flex-wrap items-center gap-5">
              <SamplePass />
              <p className="max-w-xs text-muted">Pass sent to the guard. Valid for 2 hours. Open the Guard tab to scan it.</p>
            </div>
          )}
          {approved === false && <p className="text-muted">Declined. The guard sees the visitor was turned away.</p>}
        </Tabs.Content>

        <Tabs.Content value="guard" className="space-y-4" aria-live="polite">
          {approved !== true ? (
            <p className="measure text-muted">
              {approved === false ? "The resident declined this visit. Do not let the visitor in." : "Waiting for the resident to approve the visit. Open the Resident tab to answer."}
            </p>
          ) : !scanned ? (
            <>
              <p className="measure">Ravi Kumar shows the pass at the gate.</p>
              <button type="button" className={btn("primary")} onClick={() => setScanned(true)}>Scan pass</button>
            </>
          ) : (
            <p className="inline-flex items-center gap-2 rounded-full border border-good/40 bg-good/15 px-4 py-2 font-medium text-good">
              <Check aria-hidden size={16} /> Entry logged, B-204
            </p>
          )}
        </Tabs.Content>

        <Tabs.Content value="admin" className="grid gap-8 md:grid-cols-3" aria-live="polite">
          <div>
            <h4 className="h3 mb-3">Gate log</h4>
            {scanned ? (
              <p>Ravi Kumar, plumber, B-204. Approved by the resident, scanned at the gate.</p>
            ) : (
              <p className="text-muted">No entries yet.</p>
            )}
          </div>
          <div>
            <h4 className="h3 mb-3">Book a hall</h4>
            <ul className="space-y-2">
              {slots.map((s) => {
                const on = booked.includes(s);
                return (
                  <li key={s}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setBooked(on ? booked.filter((b) => b !== s) : [...booked, s])}
                      className={clsx(
                        "w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                        on ? "border-accent bg-accent text-on-accent" : "border-line hover:bg-raised",
                      )}
                    >
                      {s} {on && "(booked)"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="h3 mb-3">Post a notice</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (notice.trim()) {
                  setNotices([notice.trim(), ...notices]);
                  setNotice("");
                }
              }}
              className="space-y-2"
            >
              <label htmlFor="notice" className="sr-only">Notice text</label>
              <textarea
                id="notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                rows={2}
                placeholder="Water supply off 2 to 4 pm"
                className="w-full rounded-xl border border-line bg-ground p-3 text-sm"
              />
              <button type="submit" className={btn("ghost", "py-2")}>Post notice</button>
            </form>
            <ul className="mt-3 space-y-1 text-sm">
              {notices.map((n, i) => <li key={i} className="rounded-lg bg-raised px-3 py-2">{n}</li>)}
            </ul>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <button type="button" className={btn("plain", "mt-6 text-sm")} onClick={reset}>
        <RotateCcw aria-hidden size={14} /> Start over
      </button>
    </DemoFrame>
  );
}
