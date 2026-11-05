import { Hero } from "@/components/home/hero";
import { Gateway } from "@/components/home/gateway";
import { Fields } from "@/components/home/fields";
import { TryIt } from "@/components/home/try-it";
import { ServiceProjects, VisionMission, Partner } from "@/components/home/closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Gateway />
      <Fields />
      <TryIt />
      <ServiceProjects />
      <VisionMission />
      <Partner />
    </>
  );
}
