import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/products/product-page";
import { bySlug, products } from "@/content/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  return { title: p.name.split(" (")[0], description: `${p.headline} ${p.sub}` };
}

export default async function Page({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}
