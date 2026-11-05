import Image from "next/image";
import clsx from "clsx";

/** The deck's signature frame: a tall arch with the device lit in its own colour. */
export function Arch({
  src,
  alt,
  glow,
  art,
  className,
  sizes = "(min-width: 1024px) 420px, 80vw",
  priority,
}: {
  src?: string;
  alt: string;
  glow: string;
  art?: "pond" | "rail";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={clsx("relative aspect-[368/600] overflow-hidden rounded-t-[999px] bg-raised", className)}
      style={{ boxShadow: `0 0 90px -18px ${glow}, 0 0 0 1px color-mix(in srgb, ${glow} 45%, transparent)` }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <ArchArt kind={art ?? "pond"} glow={glow} label={alt} />
      )}
    </div>
  );
}

function ArchArt({ kind, glow, label }: { kind: "pond" | "rail"; glow: string; label: string }) {
  return (
    <svg viewBox="0 0 368 600" className="absolute inset-0 size-full" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sky-${kind}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={glow} stopOpacity="0.15" />
          <stop offset="1" stopColor={glow} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect width="368" height="600" fill="#0f1c2b" />
      <rect width="368" height="600" fill={`url(#sky-${kind})`} />
      {kind === "pond" ? (
        <g fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2">
          {[150, 112, 76, 44].map((rx, i) => (
            <ellipse key={rx} cx="184" cy="400" rx={rx} ry={rx * 0.34} strokeOpacity={0.25 + i * 0.18} />
          ))}
          <circle cx="184" cy="400" r="8" fill="#fff" stroke="none" />
          <path d="M40 520 q36 -18 72 0 t72 0 t72 0 t72 0" />
          <path d="M20 556 q36 -18 72 0 t72 0 t72 0 t72 0 t72 0" strokeOpacity="0.35" />
        </g>
      ) : (
        <g stroke="#fff" strokeWidth="3" strokeOpacity="0.6" fill="none">
          <path d="M150 250 L40 600 M218 250 L328 600" />
          <path d="M146 262 h76 M130 312 h108 M108 382 h152 M72 482 h224 M30 600 h308" strokeOpacity="0.35" />
          <circle cx="184" cy="226" r="22" fill="#fff" fillOpacity="0.85" stroke="none" />
        </g>
      )}
    </svg>
  );
}
