import type { Metadata } from "next";
import Link from "next/link";
import { ProductsRail } from "@/components/products/rail";
import { btn } from "@/components/ui/button";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Ready-to-use devices and apps for farms, health, safety, homes and learning, from Sentiantal.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="wrap pb-10 pt-12 md:pt-16">
        <h1 className="display-xl">
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="hero-rise block">Products</span>
          </span>
        </h1>
        <p className="lead enter-copy mt-4 max-w-2xl text-muted">
          Ready-to-use devices and apps for farms, health, safety, homes and learning.
        </p>
      </section>

      <section className="wrap pb-16 md:pb-24" aria-label="Product list">
        <ProductsRail />
      </section>

      <section className="wrap pb-16 md:pb-24" aria-labelledby="glance-h">
        <h2 id="glance-h" className="h2 mb-6">At a glance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left md:min-w-[44rem] max-md:block">
            <thead className="max-md:sr-only">
              <tr className="border-b border-line font-display text-sm">
                {["Product", "Built for", "What you get", "Delivered as"].map((h) => (
                  <th key={h} scope="col" className="py-3 pr-6 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="max-md:block">
              {products.map((p) => (
                <tr
                  key={p.slug}
                  className="reveal border-b border-line/70 align-top transition-colors hover:bg-raised max-md:mb-4 max-md:block max-md:rounded-2xl max-md:border max-md:border-l-4 max-md:bg-surface max-md:p-5"
                  style={{ borderLeftColor: p.glow }}
                >
                  <th scope="row" className="py-4 pr-6 text-left font-normal max-md:block max-md:pb-3 max-md:pt-0 max-md:text-xl">
                    <Link href={`/products/${p.slug}`} className="font-display font-bold underline-offset-4 hover:underline" style={{ color: p.glow }}>
                      {p.name}
                    </Link>
                  </th>
                  <td data-label="Built for" className="py-4 pr-6 max-md:block max-md:py-2 before:mb-0.5 before:block before:text-sm before:text-muted before:content-[attr(data-label)] md:before:hidden">{p.glance.builtFor}</td>
                  <td data-label="What you get" className="py-4 pr-6 max-md:block max-md:py-2 before:mb-0.5 before:block before:text-sm before:text-muted before:content-[attr(data-label)] md:before:hidden">{p.glance.youGet}</td>
                  <td data-label="Delivered as" className="py-4 max-md:block max-md:py-2 before:mb-0.5 before:block before:text-sm before:text-muted before:content-[attr(data-label)] md:before:hidden">{p.glance.deliveredAs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="wrap reveal flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="h2">Need something that isn’t here?</h2>
            <p className="mt-2 text-muted">Our services team builds AI and IoT systems to your brief.</p>
          </div>
          <Link href="/services" className={btn("primary", "self-start")}>See our services</Link>
        </div>
      </section>
    </>
  );
}
