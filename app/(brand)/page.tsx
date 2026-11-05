import { Hero } from "@/components/home/hero";
import { Gateway } from "@/components/home/gateway";
import { Fields } from "@/components/home/fields";
import { TryIt } from "@/components/home/try-it";
import { ServiceProjects } from "@/components/home/projects";
import { VisionMission } from "@/components/home/vision";
import { Partner } from "@/components/home/partner";

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
