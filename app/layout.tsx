import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import MotionFlag from "@/components/motion/MotionFlag";
import RevealEngine from "@/components/motion/RevealEngine";
import { profile } from "@/data/content";
import "@/styles/globals.scss";

// Neo-grotesk for structural typography
const grotesk = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-grotesk",
  display: "swap",
});

// Mono for project indices, micro labels and numeric stamps
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteTitle = `${profile.name} | Full Stack Developer`;
const siteDescription =
  "Full Stack Developer building AI-powered applications, scalable web experiences, and blockchain solutions using React, Next.js, Node.js, Python, and modern technologies.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: profile.name, url: profile.portfolio }],
  creator: profile.name,
  keywords: [
    "Kuldeep Mahto",
    "Full Stack Developer",
    "AI Engineer",
    "Software Engineer",
    "Next.js",
    "React.js",
    "Node.js",
    "Python",
    "Django",
    "PostgreSQL",
    "Solana",
    "Web3 Developer",
    "Portfolio",
  ],
  metadataBase: new URL("https://getninjaportfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    locale: "en_US",
    url: "https://getninjaportfolio.vercel.app",
    images: [
      {
        url: "/assets/deblo-hero.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Full Stack Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/deblo-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f0f0eb",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Full Stack Developer",
  url: "https://getninjaportfolio.vercel.app",
  email: profile.email,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greater Noida",
    addressCountry: "India",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Galgotias University",
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Web Development",
    "Full Stack Development",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "Generative AI",
    "Solana",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MotionFlag />
        <SmoothScroll>
          {children}
          {/* Mounted after the page so every reveal hook exists in the DOM. */}
          <RevealEngine />
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
