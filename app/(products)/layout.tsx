import { Shell } from "@/components/site/shell";

export default function ProductsLayout({ children }: LayoutProps<"/">) {
  return <Shell theme="brand">{children}</Shell>;
}
