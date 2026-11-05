import Link from "next/link";
import Image from "next/image";
import { products } from "@/content/products";
import { projects } from "@/content/services";
import { btn } from "@/components/ui/button";
import { Mark } from "@/components/site/logo";

export function Gateway() {
  return (
    <section aria-label="Choose a wing" className="gateway">
      <div data-theme="products" className="wing wing-products bg-ground text-ink">
        <div className="wing-body">
          <h2 className="display-l">Products</h2>
          <p className="lead mt-3 max-w-[24ch] text-muted">Five ready-to-use devices and apps.</p>
          <Link href="/products" className={btn("primary", "mt-6")}>
            Browse products
          </Link>
          <ul className="mt-8 flex flex-wrap gap-2.5 lg:gap-3" aria-label="Products">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} aria-label={p.name} title={p.name} className="block">
                  <span
                    className="relative block h-20 w-12 overflow-hidden rounded-t-full transition-transform duration-300 hover:-translate-y-1 lg:h-24 lg:w-14"
                    style={{ boxShadow: `0 0 0 1px ${p.glow}, 0 0 24px -6px ${p.glow}` }}
                  >
                    <Image src={p.arch} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-theme="services" className="wing wing-services bg-ground text-ink">
        <div className="seam-badge" aria-hidden>
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
            <defs>
              <linearGradient id="seam-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#190910" />
                <stop offset="1" stopColor="#c73a7e" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="47" fill="none" stroke="url(#seam-grad)" strokeWidth="2.5" pathLength={1} />
          </svg>
          <Mark colour="magenta" size={64} />
        </div>
        <div className="wing-body w-full">
          <h2 className="display-l">Services</h2>
          <p className="lead mt-3 max-w-[24ch] text-muted">AI and IoT projects built to your brief.</p>
          <Link href="/services" className={btn("primary", "mt-6")}>
            See our services
          </Link>
          <ul className="mt-8 max-w-sm" aria-label="Service projects">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="flex items-center gap-3 border-b border-line py-2.5 transition-colors hover:text-accent-ink"
                >
                  <span aria-hidden className="size-2.5 shrink-0 rounded-[3px] ring-1 ring-ink/25" style={{ background: p.glow }} />
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
