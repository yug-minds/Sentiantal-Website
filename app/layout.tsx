import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  Atkinson_Hyperlegible_Next,
  Noto_Sans_Devanagari,
  Noto_Sans_Telugu,
} from "next/font/google";
import "./globals.css";

const kallisto = localFont({
  src: [
    { path: "./fonts/Kallisto-Light.otf", weight: "300" },
    { path: "./fonts/Kallisto-Medium.otf", weight: "500" },
    { path: "./fonts/Kallisto-Bold.otf", weight: "700" },
    { path: "./fonts/Kallisto-Heavy.otf", weight: "900" },
  ],
  variable: "--font-kallisto",
  display: "swap",
});

const body = Atkinson_Hyperlegible_Next({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

// Only fetched when Telugu or Hindi text appears (the soil-report language switch).
const telugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  variable: "--font-telugu",
  display: "swap",
  preload: false,
});
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sentiantal.com"),
  title: {
    default: "Sentiantal | Transforming the Insights",
    template: "%s | Sentiantal",
  },
  description:
    "Sentiantal builds AI and IoT products for farms, health, homes, workplaces and classrooms, and builds custom AI and IoT systems for other teams. Hyderabad, India.",
  openGraph: {
    siteName: "Sentiantal",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#190910",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${kallisto.variable} ${body.variable} ${telugu.variable} ${devanagari.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
