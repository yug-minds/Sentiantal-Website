import clsx from "clsx";

/** Heading on the left, content on the right. Used for every long-form block. */
export function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id ?? title}-h`.replace(/\s+/g, "-")} className={clsx("border-t border-line", className)}>
      <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[1fr_2.3fr] lg:gap-14">
        <h2 id={`${id ?? title}-h`.replace(/\s+/g, "-")} className="h2 lg:sticky lg:top-28 lg:self-start">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** A list with a small rounded square for a bullet, echoing the logo's nodes. */
export function NodeList({ items, glow, cols = 2 }: { items: readonly string[]; glow?: string; cols?: 1 | 2 }) {
  return (
    <ul className={clsx("grid gap-x-10", cols === 2 && "md:grid-cols-2")}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 border-b border-line py-3.5">
          <span aria-hidden className="mt-2 size-2.5 shrink-0 rounded-[3px] bg-accent ring-1 ring-ink/25" style={glow ? { background: glow } : undefined} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
