export const company = {
  name: "Sentiantal",
  legal: "Sentiantal Private Limited",
  tagline: "Transforming the Insights",
  email: "contact@sentiantal.com",
  website: "www.sentiantal.com",
  phoneIndia: "+91 9493690202",
  phoneGlobal: "+91 97056 90202",
  whatsapp: "919705690202",
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
      { label: "VaAIu", href: "/services/vaaiu", kind: "Project" },
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

/**
 * Director's message for the About page. DRAFT written from the company's own vision and mission text:
 * Dr. Purnachand must read and approve it before launch. Put a portrait path in `image` (for example
 * "/team/purnachand.jpg") and the placeholder on the page is replaced.
 */
export const directorMessage: { by: string; role: string; image: string; paragraphs: string[] } = {
  by: "Dr. Purnachand Kollapudi",
  role: "Co-Founder and CEO",
  image: "/team/director.png",
  paragraphs: [
    "We started Sentiantal because too many good ideas stop at a prototype. A farmer still waits days for a soil report. A family still finds out about a heart problem late. A student still practises for an interview alone. These are everyday problems, and technology can help with them now.",
    "So we build things people can pick up and use. A handheld soil tester that gives a report in two minutes. A wearable that raises an alert in time. A mock interview that gives feedback straight away. Each one is made by a small team that tests it in the field, with the people it is meant for, and changes it when they tell us what is not working.",
    "Our work spans agriculture, healthcare, education and industrial safety, and we also build custom AI and IoT systems for other teams. The aim is the same everywhere: reliable sensors, clear answers, and solutions that last.",
    "If you have a problem worth measuring, or you want to help take these products further, I would like to hear from you.",
  ],
};
