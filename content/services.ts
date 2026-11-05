export const serviceLines = {
  ai: {
    title: "AI services",
    intro: "Models that read pictures, sensor streams and spoken or written answers, and turn them into a decision.",
    items: [
      { title: "Computer vision", body: "Gesture recognition on CCTV and pest detection from a photo." },
      { title: "Behaviour and emotion analysis", body: "Real-time emotion signals for interviews and training." },
      { title: "Language-model evaluation and tutoring", body: "Question generation, answer scoring and step-by-step teaching." },
      { title: "Voice assistants in local languages", body: "Farmers and field teams ask in their own language and hear the answer." },
      { title: "Early warnings and recommendations", body: "Models that read sensor data and say what to do next." },
    ],
  },
  iot: {
    title: "IoT services",
    intro: "From the first sensor to a device you can put in a customer's hand.",
    items: [
      { title: "Sensors and custom hardware", body: "Choosing the right sensors and designing the board around them." },
      { title: "Firmware and connectivity", body: "Bluetooth LE to the phone and cloud sync from there." },
      { title: "Enclosure design and pilot manufacturing", body: "OEM and ODM set-up for the first thousand units." },
      { title: "Dashboards and apps", body: "Cloud dashboards and mobile apps for customers and technicians." },
      { title: "Alerts and reports", body: "Instant alerts and one-tap PDF reports." },
      { title: "Pilot validation and certification", body: "Field pilots and the certifications you need before launch." },
    ],
  },
} as const;

export const pipeline = [
  {
    key: "sense",
    name: "Sense",
    body: "We pick sensors and write the firmware that reads them reliably in the field.",
    example: "VaAIu measures particles, gases, temperature and humidity in one small unit.",
  },
  {
    key: "connect",
    name: "Connect",
    body: "We link the device to the phone and the cloud so data arrives without setup.",
    example: "SARAM pairs with the farmer's phone and syncs the result straight away.",
  },
  {
    key: "understand",
    name: "Understand",
    body: "We train models and write the rules that turn readings into advice.",
    example: "Soil readings become a crop-wise fertilizer recommendation.",
  },
  {
    key: "act",
    name: "Act",
    body: "We build the alerts, dashboards and apps that put the answer in front of the right person.",
    example: "WOW sends family and police an alert within about two seconds.",
  },
] as const;

export const projectPath = [
  { name: "Scope", body: "We agree what the device or system must do, and how we will know it works." },
  { name: "Prototype", body: "We build a working version you can hold and test." },
  { name: "Pilot", body: "We run it in the field, measure it, and fix what we learn." },
  { name: "Production support", body: "We help you move to manufacturing and keep it running." },
] as const;

export interface Project {
  slug: string;
  name: string;
  sector: string;
  line: string;
  headline: string;
  sub: string;
  glow: string;
  /** Arch image from the product deck, where one exists */
  arch?: string;
  features: string[];
  why: string[];
  stub?: boolean;
}

export const projects: Project[] = [
  {
    slug: "solar-monitoring",
    name: "Solar Monitoring System",
    sector: "Energy",
    line: "Panel voltage, current and temperature, tracked across sites.",
    headline: "Real-time insights for every watt.",
    sub: "A field unit that measures panel voltage, current and temperature with clean, reliable sampling. Maintenance teams get fast, accurate data, and faults show up early.",
    glow: "#ef6a31",
    arch: "/products/arch-solar-monitoring.jpg",
    features: [
      "Real-time energy generation monitoring",
      "Fault detection and instant alerts",
      "Cloud dashboard for remote tracking",
      "Mobile app for customers and technicians",
      "Historical analytics and performance trends",
    ],
    why: [
      "Solar maintenance demand is growing.",
      "Field teams need quick diagnostics.",
      "Renewable installations keep expanding.",
      "Uptime and performance tracking matter more every year.",
    ],
  },
  {
    slug: "vaaiu",
    name: "VaAIu",
    sector: "Air quality",
    line: "A compact monitor for indoor and outdoor air.",
    headline: "See the air you breathe, as it changes.",
    sub: "VaAIu is a compact IoT device that measures particles from PM1 to PM10, VOCs, NOx, CO2, temperature and humidity. It gives accurate, real-time readings for indoor and outdoor air.",
    glow: "#b6d6f6",
    arch: "/products/arch-vaaiu.jpg",
    features: [
      "Multi-range particulate detection",
      "VOC and NOx gas sensing",
      "Real-time CO2 monitoring",
      "Temperature and humidity sensing in one unit",
      "Compact, IoT-enabled design",
      "Instant environmental insights",
    ],
    why: [
      "Demand for air-quality data is growing worldwide.",
      "Smart-city deployments are rising.",
      "More devices are joining IoT networks.",
      "People are paying more attention to health.",
      "Both commercial buildings and homes need it.",
    ],
  },
  {
    slug: "aquaai",
    name: "AquaAI",
    sector: "Aquaculture",
    line: "Keeps fish and prawn ponds healthy and cuts losses.",
    headline: "Know how your pond is doing before it costs you.",
    sub: "AquaAI pairs sensors with AI to keep fish and prawn ponds healthy and reduce losses. See pond status at a glance and get simple advice on feeding and aeration.",
    glow: "#2fa7b8",
    features: [
      "Live pond status with an easy red, amber and green view",
      "Early warnings for risky water conditions",
      "Simple advice on feeding and aeration",
    ],
    why: [
      "A bad night of low oxygen can wipe out a harvest.",
      "Farmers need warnings early enough to act.",
      "Clear advice beats raw numbers.",
    ],
  },
  {
    slug: "loco-pilot-data-device",
    name: "Loco-pilot data storage device",
    sector: "Rail",
    line: "A data storage device for locomotive pilots.",
    headline: "A data storage device for loco pilots.",
    sub: "Project details are available on request. Tell us what you need and we will share what we can.",
    glow: "#6b7a99",
    features: [],
    why: [],
    stub: true,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
