import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { projects } from "@/content/services";

const base = "https://www.sentiantal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    ...products.map((p) => `/products/${p.slug}`),
    "/services",
    ...projects.map((p) => `/services/${p.slug}`),
    "/about",
    "/contact",
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
