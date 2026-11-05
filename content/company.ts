export const company = {
  name: "Sentiantal",
  legal: "Sentiantal Private Limited",
  tagline: "Transforming the Insights",
  email: "contact@sentiantal.com",
  website: "www.sentiantal.com",
  phoneIndia: "+91 7382426562",
  phoneGlobal: "+91 9398472594",
  whatsapp: "919398472594",
  social: "@sentiantal",
  address: {
    lines: ["Unit #205, NEA Building", "Plot No: 470/471, Madhapur", "Hyderabad, Telangana 500081"],
    mapQuery: "Sentiantal, NEA Building, Plot 470/471, Madhapur, Hyderabad 500081",
  },
  vision:
    "To be a global leader in innovation, delivering cutting-edge solutions through continuous research and development that meet the evolving needs of businesses worldwide.",
  mission:
    "To harness advanced technologies like Artificial Intelligence (AI) to deliver scalable, sustainable, and impactful solutions in agriculture, healthcare, education and industrial safety, addressing real-world challenges and empowering communities globally.",
  weDo: "Sentiantal leads innovation through AI-powered solutions, transforming industries and solving real-world challenges across sectors.",
  vision2: [
    "Sentiantal Private Limited is at the forefront of technological innovation, offering bespoke solutions that drive business success across various sectors.",
    "Pioneering the future with cutting-edge solutions that redefine how we solve today's industrial, technological, and societal challenges.",
  ],
} as const;

export type FieldKey = "agriculture" | "healthcare" | "education" | "safety";

/** The logo's four nodes, one per field in the mission. */
export const fields: {
  key: FieldKey;
  name: string;
  line: string;
  items: { label: string; href: string; kind: "Product" | "Project" }[];
}[] = [
  {
    key: "agriculture",
    name: "Agriculture",
    line: "Soil that tells you what it needs, and ponds that warn you early.",
    items: [
      { label: "Agrow Insights", href: "/products/agrow-insights", kind: "Product" },
      { label: "AquaAI", href: "/services/aquaai", kind: "Project" },
    ],
  },
  {
    key: "healthcare",
    name: "Healthcare",
    line: "Wearables and monitors that catch problems before they grow.",
    items: [
      { label: "Suraaksha", href: "/products/suraaksha", kind: "Product" },
      { label: "Vaaiu", href: "/services/vaaiu", kind: "Project" },
    ],
  },
  {
    key: "education",
    name: "Education",
    line: "Practice that feels like the real interview, with feedback right away.",
    items: [{ label: "UpadyAI", href: "/products/upadyai", kind: "Product" }],
  },
  {
    key: "safety",
    name: "Safety and industry",
    line: "Alerts that reach the right people fast, at home, at work and on the rails.",
    items: [
      { label: "WOW", href: "/products/wow", kind: "Product" },
      { label: "SecureIN", href: "/products/securein", kind: "Product" },
      { label: "Solar Monitoring", href: "/services/solar-monitoring", kind: "Project" },
      { label: "Loco-pilot data device", href: "/services/loco-pilot-data-device", kind: "Project" },
    ],
  },
];

export const partnerTopics = [
  { key: "expansion", label: "Market expansion" },
  { key: "b2b-b2g", label: "B2B and government connections" },
  { key: "partnership", label: "Strategic partnerships" },
  { key: "consulting", label: "Consulting and contract projects" },
  { key: "investment", label: "Investment for growth" },
] as const;

export const team = [
  { name: "Mr. Naga Murali Indla", role: "Founder", focus: "Business administration" },
  { name: "Dr. Purnachand Kollapudi", role: "Co-Founder and CEO", focus: "Product development and scientific advice" },
  { name: "Mrs. K. Lavanya", role: "Director", focus: "Project management" },
  { name: "Mr. Amruth Kumar S", role: "Director, Business Development", focus: "Business development strategy" },
] as const;
