import Image from "next/image";
import { Camera } from "lucide-react";
import clsx from "clsx";
import type { GalleryItem } from "@/content/gallery";

const tint = { leaders: "#c73a7e", field: "#3f9d62", events: "#2c267e", recognition: "#e0902b" } as const;

/** The picture itself, or a neutral placeholder until a real photo is added. */
export function Photo({
  item,
  sizes,
  fit = "cover",
  className,
  priority,
}: {
  item: GalleryItem;
  sizes: string;
  fit?: "cover" | "contain";
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={clsx("relative overflow-hidden", className)} style={{ aspectRatio: item.ratio ?? "4 / 3" }}>
      {item.src ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={clsx("gal-img", fit === "cover" ? "object-cover" : "object-contain")}
        />
      ) : (
        <div
          role="img"
          aria-label={item.alt}
          className="absolute inset-0 grid place-items-center text-ink/40"
          style={{ background: `linear-gradient(150deg, color-mix(in srgb, ${tint[item.category]} 22%, var(--raised)), var(--raised))` }}
        >
          <Camera aria-hidden size={40} strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}
