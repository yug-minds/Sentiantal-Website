import { Gateway } from "@/components/home/gateway";
import { Fields } from "@/components/home/fields";
import { TryIt } from "@/components/home/try-it";
import { ServiceProjects, VisionMission, Partner } from "@/components/home/closing";

export default function Home() {
  return (
    <>
      <section className="wrap pb-10 pt-10 md:pt-14" aria-label="Introduction">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-14">
          <h1 className="display-xl">Sensors in the field. Answers on your phone.</h1>
          <p className="lead text-muted">
            Sentiantal builds AI and IoT products for farms, health, homes, workplaces and classrooms. We also build
            custom AI and IoT systems for other teams.
          </p>
        </div>
      </section>
      <Gateway />
      <Fields />
      <TryIt />
      <ServiceProjects />
      <VisionMission />
      <Partner />
    </>
  );
}
