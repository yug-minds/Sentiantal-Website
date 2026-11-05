import { Shell } from "@/components/site/shell";

export default function ServicesLayout({ children }: LayoutProps<"/">) {
  return <Shell theme="services">{children}</Shell>;
}
