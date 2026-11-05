import clsx from "clsx";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[0.95rem] font-medium leading-none transition-[background-color,filter,color] duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-accent text-on-accent hover:brightness-110",
  ghost: "border border-line text-ink hover:bg-raised",
  plain: "px-0 py-0 text-accent-ink underline decoration-1 underline-offset-4 hover:decoration-2",
} as const;

/** Class helper so the same look works on <Link>, <a> and <button>. */
export const btn = (variant: keyof typeof variants = "primary", extra?: string) =>
  clsx(base, variants[variant], extra);
