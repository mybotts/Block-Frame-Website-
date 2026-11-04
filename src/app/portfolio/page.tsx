import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Sergeo | Founder & AI Systems Architect",
  description:
    "Founder and Technical Lead at BlockFrame Labs. Architecting autonomous AI systems, conversational commerce engines (Groply), and resilient multi-agent cloud infrastructure.",
  alternates: {
    canonical: "https://www.blockframe.cloud/portfolio",
  },
  openGraph: {
    title: "Sergeo | Founder & AI Systems Architect | BlockFrame Labs",
    description:
      "Architecting autonomous AI systems, conversational commerce engines (Groply), and resilient multi-agent cloud infrastructure.",
    url: "https://www.blockframe.cloud/portfolio",
    siteName: "BlockFrame Labs",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Sergeo - Founder & AI Systems Architect",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergeo | Founder & AI Systems Architect",
    description:
      "Architecting autonomous AI systems, conversational commerce engines (Groply), and resilient multi-agent cloud infrastructure.",
    images: ["/images/og-preview.png"],
  },
};

export default function PortfolioPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sergeo",
    jobTitle: "Founder & AI Systems Architect",
    worksFor: {
      "@type": "Organization",
      name: "BlockFrame Labs",
      url: "https://www.blockframe.cloud",
    },
    url: "https://www.blockframe.cloud/portfolio",
    email: "sergeolisco@gmail.com",
    knowsAbout: [
      "Autonomous AI Systems",
      "Multi-Agent Fleet Orchestration",
      "Conversational Commerce",
      "WhatsApp Cloud API",
      "Next.js and Web Engineering",
      "Linux VPS & Docker Infrastructure",
      "Cybersecurity & Threat Defense",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navigation />
      <PremiumBackground />
      <main id="main-content">
        <PortfolioClient />
      </main>
      <Footer />
    </>
  );
}
