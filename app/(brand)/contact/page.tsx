import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { company } from "@/content/company";
import { btn } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Sentiantal about a product demo, a service project, or a partnership. Madhapur, Hyderabad.",
};

const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.mapQuery)}`;
const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

export default function ContactPage() {
  return (
    <section className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <div>
        <h1 className="display-xl">Talk to us.</h1>
        <p className="lead mt-4 max-w-xl text-muted">Tell us what you are working on, and we will get back to you.</p>
        {/* Phones: the fastest ways to reach us, before the form. */}
        <div className="mt-6 grid grid-cols-3 gap-2 lg:hidden">
          {[
            { href: tel(company.phoneIndia), label: "Call", icon: Phone },
            { href: `https://wa.me/${company.whatsapp}`, label: "WhatsApp", icon: MessageCircle },
            { href: `mailto:${company.email}`, label: "Email", icon: Mail },
          ].map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-surface py-3 font-display text-sm font-medium">
              <Icon aria-hidden size={20} className="text-accent-ink" />
              {label}
            </a>
          ))}
        </div>
        <p className="mt-8 font-display text-sm text-muted lg:hidden">Or send us a message</p>
        <div className="mt-2 lg:mt-10">
          <Suspense fallback={<div className="h-96 rounded-[1.75rem] bg-raised" aria-hidden />}>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>

      <aside className="grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-1 lg:border-0 lg:pt-4" aria-label="Contact details">
        <div>
          <h2 className="h3 mb-2">Email</h2>
          <a className="underline underline-offset-4" href={`mailto:${company.email}`}>{company.email}</a>
        </div>
        <div>
          <h2 className="h3 mb-2">Phone</h2>
          <p>India <a className="underline underline-offset-4" href={tel(company.phoneIndia)}>{company.phoneIndia}</a></p>
          <p>Global <a className="underline underline-offset-4" href={tel(company.phoneGlobal)}>{company.phoneGlobal}</a> (WhatsApp)</p>
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className={btn("ghost", "mt-4")}>
            Message us on WhatsApp
          </a>
        </div>
        <div>
          <h2 className="h3 mb-2">Visit</h2>
          <address className="not-italic">
            {company.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <a className="mt-2 inline-block underline underline-offset-4" href={mapHref} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
        <div>
          <h2 className="h3 mb-2">Web</h2>
          <p>{company.website}</p>
        </div>
      </aside>
    </section>
  );
}
