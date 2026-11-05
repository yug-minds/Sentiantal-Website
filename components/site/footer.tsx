import Link from "next/link";
import { company } from "@/content/company";
import { products } from "@/content/products";
import { projects } from "@/content/services";
import { Logo, type LogoVariant } from "./logo";
import { BackToTop, HyderabadClock } from "./footer-live";
import type { Theme } from "./shell";

const logoFor: Record<Theme, LogoVariant> = { brand: "magenta", products: "white", services: "indigo" };

const list = "space-y-2 text-[0.95rem] text-muted";
const link = "flink hover:text-ink";

export function Footer({ theme }: { theme: Theme }) {
  return (
    <footer className="footer overflow-hidden border-t border-line bg-surface">
      <div className="footer-cols wrap grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo variant={logoFor[theme]} height={44} />
          <p className="measure text-[0.95rem] text-muted">
            AI and IoT products and projects from Hyderabad, for farms, health, safety, homes and learning.
          </p>
          <HyderabadClock />
        </div>

        <nav aria-label="Products">
          <h2 className="h3 mb-3">Products</h2>
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
          <h2 className="h3 mb-3">Services</h2>
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

        <div>
          <h2 className="h3 mb-3">Talk to us</h2>
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
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </li>
            <li className="flex gap-4 pt-2">
              <Link className={link} href="/about">
                About
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
