import Link from "next/link";
import { Shell } from "@/components/site/shell";
import { btn } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Shell theme="brand">
      <section className="wrap py-24">
        <h1 className="display-xl">That page isn’t here.</h1>
        <p className="lead mt-4 max-w-xl text-muted">The link may be old, or the address mistyped. Start from one of the wings.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className={btn("primary")}>Products</Link>
          <Link href="/services" className={btn("ghost")}>Services</Link>
          <Link href="/" className={btn("plain")}>Home</Link>
        </div>
      </section>
    </Shell>
  );
}
