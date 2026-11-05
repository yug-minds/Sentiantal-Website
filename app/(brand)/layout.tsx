import { Shell } from "@/components/site/shell";

export default function BrandLayout({ children }: LayoutProps<"/">) {
  return <Shell theme="brand">{children}</Shell>;
}
