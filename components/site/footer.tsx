import Link from "next/link";
import { company } from "@/content/company";
import { products } from "@/content/products";
import { projects } from "@/content/services";
import { Logo, type LogoVariant } from "./logo";
import { BackToTop, HyderabadClock } from "./footer-live";
import type { Theme } from "./shell";

const logoFor: Record<Theme, LogoVariant> = { brand: "magenta", products: "white", services: "indigo" };

const list = "space-y-2.5 text-[0.9rem] text-muted md:space-y-2 md:text-[0.95rem]";
const link = "flink hover:text-ink";

export function Footer({ theme }: { theme: Theme }) {
  return (
    <footer className="footer overflow-hidden border-t border-line bg-surface">
      <div className="footer-cols wrap grid grid-cols-2 gap-x-6 gap-y-9 py-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] md:gap-10 md:py-14">
        <div className="col-span-2 space-y-4 md:col-span-1">
          <Logo variant={logoFor[theme]} height={44} />
          <p className="measure text-[0.95rem] text-muted">
            AI and IoT products and projects from Hyderabad, for farms, health, safety, homes and learning.
          </p>
          <HyderabadClock />
        </div>

        <nav aria-label="Products">
          <h2 className="h3 mb-2 md:mb-3">Products</h2>
          <ul className={list}>
            {products.map((p) => (
              <li key={p.slug}>
                <Link className={link} href={`/products/${p.slug}`}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="h3 mb-2 md:mb-3">Services</h2>
          <ul className={list}>
            <li>
              <Link className={link} href="/services">
                AI and IoT services
              </Link>
            </li>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link className={link} href={`/services/${p.slug}`}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-1">
          <h2 className="h3 mb-2 md:mb-3">Talk to us</h2>
          <ul className={list}>
            <li>
              <a className={link} href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li>
              India{" "}
              <a className={link} href={`tel:${company.phoneIndia.replace(/\s/g, "")}`}>
                {company.phoneIndia}
              </a>
            </li>
            <li>
              Global (WhatsApp){" "}
              <a className={link} href={`tel:${company.phoneGlobal.replace(/\s/g, "")}`}>
                {company.phoneGlobal}
              </a>
            </li>
            <li>
              {company.address.lines.map((l) => (
                <span key={l} className="inline after:content-[',_'] last:after:content-none md:block md:after:content-none">
                  {l}
                </span>
              ))}
            </li>
            <li className="flex gap-5 pt-2 font-display text-ink">
              <Link className={link} href="/about">
                About
              </Link>
              <Link className={link} href="/gallery">
                Gallery
              </Link>
              <Link className={link} href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex items-center justify-between gap-4 py-5">
          <p className="text-sm text-muted">
            {company.legal}. {company.tagline}.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
