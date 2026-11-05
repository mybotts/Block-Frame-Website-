import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Sergeo | Video Editing, Community Operations, Discord Bots & AI Systems",
  description:
    "Multi-skilled digital operator and builder: high-impact video editing, Web3 community & social media operations, custom Discord bots, and autonomous AI automation.",
  alternates: {
    canonical: "https://www.blockframe.cloud/portfolio",
  },
  openGraph: {
    title: "Sergeo | Video Editing, Community Operations, Discord Bots & AI Systems",
    description:
      "High-impact video editing, Web3 community & social media operations, custom Discord bots, and autonomous AI automation.",
    url: "https://www.blockframe.cloud/portfolio",
    siteName: "BlockFrame Labs",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Sergeo - Portfolio",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergeo | Video Editing, Community Operations, Discord Bots & AI Systems",
    description:
      "High-impact video editing, Web3 community & social media operations, custom Discord bots, and autonomous AI automation.",
    images: ["/images/og-preview.png"],
  },
};

export default function PortfolioPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sergeo",
    jobTitle: "Multi-Disciplinary Digital Specialist",
    worksFor: {
      "@type": "Organization",
      name: "BlockFrame Labs",
      url: "https://www.blockframe.cloud",
    },
    url: "https://www.blockframe.cloud/portfolio",
    email: "contactsergeo@gmail.com",
    knowsAbout: [
      "Video Editing & Motion Graphics",
      "Web3 Community Operations",
      "Social Media Management",
      "Custom Discord Bot Development",
      "AI Systems & Workflow Automation",
      "Customer Support & Trust & Safety",
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
