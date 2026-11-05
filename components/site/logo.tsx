import Image from "next/image";

const logos = {
  magenta: { src: "/brand/logo-magenta.png", w: 1088, h: 363 },
  indigo: { src: "/brand/logo-indigo.png", w: 1119, h: 324 },
  white: { src: "/brand/logo-white.png", w: 1119, h: 324 },
} as const;

export type LogoVariant = keyof typeof logos;

export function Logo({ variant, height = 40, priority }: { variant: LogoVariant; height?: number; priority?: boolean }) {
  const l = logos[variant];
  return (
    <Image
      src={l.src}
      alt="Sentiantal, Transforming the Insights"
      width={l.w}
      height={l.h}
      priority={priority}
      style={{ height, width: "auto" }}
    />
  );
}

/** The head-and-shield mark on its own. 495 x 517 viewBox cropped from the brand SVGs. */
export function Mark({ colour, size = 64 }: { colour: "magenta" | "indigo"; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/brand/mark-${colour}.svg`} alt="" width={size} height={Math.round((size * 517) / 495)} />
  );
}
