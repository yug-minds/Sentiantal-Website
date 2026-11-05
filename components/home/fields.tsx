import Link from "next/link";
import { GraduationCap, HeartPulse, ShieldCheck, Sprout } from "lucide-react";
import { fields, type FieldKey } from "@/content/company";
import { ChainTabs } from "@/components/site/chain-tabs";

const icon: Record<FieldKey, React.ReactNode> = {
  agriculture: <Sprout aria-hidden size={24} />,
  healthcare: <HeartPulse aria-hidden size={24} />,
  education: <GraduationCap aria-hidden size={24} />,
  safety: <ShieldCheck aria-hidden size={24} />,
};

export function Fields() {
  return (
    <section className="wrap py-16 md:py-24" aria-labelledby="fields-h">
      <div className="mb-10 max-w-2xl">
        <h2 id="fields-h" className="display-l">We work in four fields.</h2>
        <p className="lead mt-4 text-muted">Pick one to see what we have built for it.</p>
      </div>
      <ChainTabs
        zigzag
        label="Fields"
        items={fields.map((f) => ({
          key: f.key,
          label: f.name,
          mark: icon[f.key],
          panel: (
            <div className="grid items-start gap-6 md:grid-cols-2">
              <p className="lead">{f.line}</p>
              <ul className="divide-y divide-line border-y border-line">
                {f.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-accent-ink">
                      <span className="font-display font-medium">{i.label}</span>
                      <span className="text-sm text-muted">{i.kind}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ),
        }))}
      />
    </section>
  );
}
