export type Fit = "farm" | "workplace" | "family" | "society" | "learning";

export const fitLabels: Record<Fit, string> = {
  farm: "Farm",
  workplace: "Workplace",
  family: "Family",
  society: "Housing society",
  learning: "Learning and hiring",
};

export interface Product {
  slug: string;
  name: string;
  /** Short line used on the arch rail */
  line: string;
  headlineFact: string;
  /** Page H1 */
  headline: string;
  tagline?: string;
  sub: string;
  /** Sub-brand light colour, drives the glow on the dark wing */
  glow: string;
  arch: string;
  facts: string[];
  problem: string[];
  features: string[];
  featureGroups?: { title: string; items: string[] }[];
  audience: string[];
  sets: string[];
  fits: Fit[];
  glance: { builtFor: string; youGet: string; deliveredAs: string };
  external?: { label: string; href: string };
}

export const products: Product[] = [
  {
    slug: "agrow-insights",
    name: "Agrow Insights",
    line: "SARAM, a handheld soil tester with a farmer app.",
    headlineFact: "2-minute soil test",
    headline: "Know your soil in two minutes.",
    tagline: "Smart soil. Better decisions. Higher yields.",
    sub: "SARAM is a handheld soil tester that pairs with your phone. Test the soil, read the result, and get crop-wise advice the same day.",
    glow: "#46a056",
    arch: "/products/arch-agrow-insights.jpg",
    facts: ["2 minutes per test", "20 soil parameters", "Handheld, pairs with your phone", "Fast charging"],
    problem: [
      "Lab results take days to come back.",
      "Fertilizer goes on without knowing what the soil needs.",
      "Nobody sees what is happening in the field as it happens.",
    ],
    features: [
      "Instant mobile-linked soil testing in 2 minutes",
      "Polygon farm-mapping dashboard",
      "Soil-based crop nutrition recommendations",
      "Real-time, weather-driven irrigation advice",
      "Photo-based pest diagnosis and treatment",
      "Agri-loan and subsidy workflows built in",
      "Voice assistant in your own language",
      "AI and expert recommendations",
    ],
    audience: [
      "Farmers, from small holdings to large estates",
      "Krishi Vigyan Kendras (KVKs)",
      "State agriculture departments",
      "Sugarcane, Tea and Coffee Boards",
      "Soil testing labs",
      "Farmer Producer Organizations (FPOs)",
      "NGOs and CSR programmes",
      "Agri-tech companies",
    ],
    sets: [
      "A handheld test you run in the field, not a sample you send away.",
      "Pest detection from a photo, inside the same app.",
      "Loan and relief workflows next to the soil data.",
      "A voice assistant that speaks the farmer's language.",
    ],
    fits: ["farm"],
    glance: {
      builtFor: "Farmers, KVKs, labs, FPOs",
      youGet: "20-parameter soil report in 2 minutes and crop advice",
      deliveredAs: "Handheld device and mobile app",
    },
  },
  {
    slug: "suraaksha",
    name: "Suraaksha",
    line: "A wearable and phone app that watches your health.",
    headlineFact: "ECG alerts to you or your supervisor",
    headline: "Watches your health. Warns early.",
    sub: "A wearable and phone app that tracks heart, oxygen and temperature, and alerts you or the people you choose.",
    glow: "#5c8de0",
    arch: "/products/arch-suraaksha.jpg",
    facts: ["Heart, oxygen and temperature", "Alerts to family or supervisors", "Daily trends and reminders"],
    problem: [
      "Warning signs go unnoticed until they become emergencies.",
      "Families and supervisors find out late, if at all.",
      "Health data sits in separate places, so trends are hard to see.",
    ],
    features: [],
    featureGroups: [
      {
        title: "For you and your family",
        items: [
          "Tracks heart, oxygen and temperature",
          "Sends alerts to you or to family",
          "Shows daily trends and reminders",
        ],
      },
      {
        title: "For work teams",
        items: [
          "Continuous medical-grade ECG monitoring",
          "Instant alerts for heart and stress",
          "One-tap cloud-synced PDF reports",
          "A central supervisor health dashboard in your regional language",
          "A rugged, quick-connect field device",
        ],
      },
    ],
    audience: [
      "Families who want early warning for a relative",
      "Industrial teams and site supervisors",
      "Safety officers who need audit-ready health reports",
    ],
    sets: [
      "Continuous ECG, not only occasional spot checks.",
      "Alerts and one-tap reports that reach the right person.",
      "A supervisor dashboard built for field teams.",
      "A device made for rough conditions, not only for the desk.",
    ],
    fits: ["workplace", "family"],
    glance: {
      builtFor: "Families and industrial work teams",
      youGet: "Vitals, trends and alerts to the right person",
      deliveredAs: "Wearable, phone app and supervisor dashboard",
    },
  },
  {
    slug: "wow",
    name: "WOW (Watch Our Women)",
    line: "Safety that responds when you can't.",
    headlineFact: "1.5 to 2.5 second alerts",
    headline: "Safety that responds when you can't.",
    sub: "WOW spots a distress gesture on CCTV you already have, or a press of a discreet SOS tag, and alerts family and police in seconds, even when your phone is out of reach.",
    glow: "#e2a23b",
    arch: "/products/arch-wow.jpg",
    facts: ["1.5 to 2.5 second alerts", "Works without a phone", "Uses existing CCTV"],
    problem: [
      "Safety apps fail when you cannot reach your phone.",
      "Help is slow when nobody knows something has gone wrong.",
      "Adding new hardware everywhere is costly and slow.",
    ],
    features: [
      "AI gesture recognition on existing CCTV",
      "Discreet alerts to family and police over several channels",
      "Works when the phone is out of reach",
      "SOS tags that fit a keychain or an ID card",
      "Safe-route navigation",
      "Travel mode that shares your location with emergency contacts",
      "Smart ID card, self-defence manual and a battery safety monitor in the app",
    ],
    audience: [
      "Smart-city CCTV programmes",
      "Corporate campuses",
      "Police and municipal pilots",
      "Universities and CSR programmes",
      "Can extend to elder and child safety",
    ],
    sets: [
      "Gesture alerts through CCTV that is already installed.",
      "A wearable tag for moments when a phone will not do.",
      "Routes planned around where crime is reported.",
      "Direct alerts to police as well as family.",
    ],
    fits: ["family", "workplace"],
    glance: {
      builtFor: "Women, campuses, cities and police teams",
      youGet: "Gesture and tag alerts to family and police",
      deliveredAs: "CCTV software, SOS tag and mobile app",
    },
  },
  {
    slug: "securein",
    name: "SecureIN",
    line: "One app for visitors, facilities and safety.",
    headlineFact: "QR visitor passes",
    headline: "Where smarter living begins.",
    sub: "One app for visitors, facilities and safety in your community. Residents, guards and admins work from the same records.",
    glow: "#3f83c6",
    arch: "/products/arch-securein.jpg",
    facts: ["QR visitor passes", "SOS for elders", "Built for 200 to 600 unit societies"],
    problem: [
      "Visitor entries live in paper registers and phone calls.",
      "Notices, bookings and complaints are scattered across chats.",
      "Elders have no quick way to call for help.",
    ],
    features: [
      "One-tap visitor passes and approvals",
      "QR-based secure visitor access",
      "Book community halls and share notices",
      "SOS for elders, with an SOS wristband",
      "Resident, vehicle and staff lists",
      "Role-based admin controls",
      "Digital complaint tracking",
      "Affordable pricing made for communities",
      "Customisable and ready to grow",
    ],
    audience: [
      "Gated communities and housing societies",
      "Mid-sized societies of 200 to 600 homes",
      "Builders adding digital amenities",
      "Residents' welfare associations",
    ],
    sets: [
      "Fast QR entry with instant approval updates.",
      "One central SOS, not a separate call tree.",
      "Delivery handling and complaint tracking in the same app.",
      "Pricing that mid-sized societies can afford.",
    ],
    fits: ["society", "family"],
    glance: {
      builtFor: "Gated communities and their admins",
      youGet: "Visitor passes, bookings, notices, SOS and records",
      deliveredAs: "Resident, guard and admin apps, plus an SOS wristband",
    },
  },
  {
    slug: "upadyai",
    name: "UpadyAI",
    line: "Your personal AI interview coach, available 24/7.",
    headlineFact: "An interview coach, 24/7",
    headline: "Your personal AI interview coach, available 24/7.",
    tagline: "Strengthen skills. Build confidence. Succeed.",
    sub: "Coding practice and realistic interviews in one place. Study with short lessons, practise with instant feedback, and see your progress.",
    glow: "#e8ab4c",
    arch: "/products/arch-upadyai.jpg",
    facts: ["HR, technical and DSA rounds in one flow", "Instant feedback", "Real-time emotion detection"],
    problem: [
      "Scattered tools",
      "Isolated practice",
      "Missing feedback",
      "Partial preparation",
      "Limited guidance",
      "Evaluation gaps",
    ],
    features: [
      "Coding and DSA training with hints",
      "HR and technical interview simulations",
      "Behaviour and communication check",
      "Performance analytics with strengths and gaps",
      "AI interview coaching, personal to each learner",
      "Step-by-step study plans and short lessons",
      "Multi-stage AI HR interview",
      "Hybrid coding validation",
      "Questions matched to your tech stack",
    ],
    audience: [
      "Students preparing for placements",
      "Professionals changing jobs",
      "Colleges and training institutes",
      "Hiring teams that want one consistent evaluation",
    ],
    sets: [
      "Real-time emotion detection during practice.",
      "HR, technical and DSA rounds in one flow.",
      "Coding checked by both AI and language-model review.",
      "Built to cost far less than separate assessment tools.",
    ],
    fits: ["learning", "workplace"],
    glance: {
      builtFor: "Students, job seekers, colleges and hiring teams",
      youGet: "Lessons, mock interviews, feedback and progress tracking",
      deliveredAs: "Web platform",
    },
    external: { label: "Visit upadyai.in", href: "https://www.upadyai.in" },
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

/** The SMART initials in the UpadyAI brochure. */
export const smart = [
  { letter: "S", text: "Structured preparation" },
  { letter: "M", text: "Measurable progress" },
  { letter: "A", text: "AI-powered assessment" },
  { letter: "R", text: "Real-world simulation" },
  { letter: "T", text: "Technical excellence" },
] as const;
