"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";

/** On phones the rest of a long message sits behind a button. From md up it is always shown. */
export function ReadMore({ children, className }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div id="read-more" className={clsx(className, !open && "max-md:hidden")}>{children}</div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="read-more"
        className="mt-5 font-display font-medium text-accent-ink underline underline-offset-4 md:hidden"
      >
        {open ? "Show less" : "Read the full message"}
      </button>
    </>
  );
}
