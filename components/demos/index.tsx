import { SoilTest } from "./soil-test";
import { EcgMonitor } from "./ecg-monitor";
import { GestureAlert } from "./gesture-alert";
import { VisitorPass } from "./visitor-pass";
import { MockInterview } from "./mock-interview";
import { SolarArray } from "./solar-array";
import { AirQuality } from "./air-quality";
import { PondStatus } from "./pond-status";
import { LocoDemo } from "@/components/services/loco";

export { SoilTest, EcgMonitor, VisitorPass };

/** Demo for a product or project slug. */
export function demoFor(slug: string): React.ReactNode {
  switch (slug) {
    case "agrow-insights": return <SoilTest />;
    case "suraaksha": return <EcgMonitor />;
    case "wow": return <GestureAlert />;
    case "securein": return <VisitorPass />;
    case "upadyai": return <MockInterview />;
    case "solar-monitoring": return <SolarArray />;
    case "vaaiu": return <AirQuality />;
    case "aquaai": return <PondStatus />;
    case "loco-pilot-data-device": return <LocoDemo />;
    default: return null;
  }
}
