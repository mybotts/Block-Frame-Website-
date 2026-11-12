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
    "@id": "https://www.blockframe.cloud/portfolio#sergeo",
    name: "Sergeo",
    jobTitle: "Multi-Disciplinary Digital Specialist",
    worksFor: {
      "@type": "Organization",
      name: "BlockFrame Labs",
      url: "https://www.blockframe.cloud",
    },
    url: "https://www.blockframe.cloud/portfolio",
    image: "https://www.blockframe.cloud/images/headshot-sergeo.webp",
    email: "contactsergeo@gmail.com",
    sameAs: [
      "https://x.com/sergeo_n",
      "https://cert.efset.org/en/SdicSB",
    ],
    knowsAbout: [
      "Video Editing & Motion Graphics",
      "Web3 Community Operations",
      "Social Media Management",
      "Custom Discord Bot Development",
      "AI Systems & Workflow Automation",
      "Customer Support & Trust & Safety",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "EF SET English Certificate 73/100 (CEFR C2 Proficient)",
        credentialCategory: "certificate",
        educationalLevel: "CEFR C2 Proficient",
        url: "https://cert.efset.org/en/SdicSB",
        recognizedBy: {
          "@type": "Organization",
          name: "EF Standard English Test (EF SET)",
          url: "https://www.efset.org",
        },
      },
    ],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.blockframe.cloud/portfolio#profilepage",
    url: "https://www.blockframe.cloud/portfolio",
    name: "Sergeo | Video Editing, Community Operations, Discord Bots & AI Systems",
    description:
      "Multi-skilled digital operator and builder: high-impact video editing, Web3 community & social media operations, custom Discord bots, and autonomous AI automation.",
    mainEntity: {
      "@id": "https://www.blockframe.cloud/portfolio#sergeo",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "BlockFrame Labs",
      url: "https://www.blockframe.cloud",
    },
  };

  const videoSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "TinyFish AI — Commercial Launch Promo",
      description: "High-energy product trailer for TinyFish AI featuring real-time terminal UI capture, kinetic motion graphics, and audio sync.",
      thumbnailUrl: ["https://www.blockframe.cloud/images/poster-tinyfish-commercial.webp"],
      contentUrl: "https://www.blockframe.cloud/videos/tinyfish-commercial.mp4",
      uploadDate: "2024-09-01T00:00:00Z",
      publisher: {
        "@type": "Organization",
        name: "BlockFrame Labs",
        logo: {
          "@type": "ImageObject",
          url: "https://www.blockframe.cloud/images/logo.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Cambrian — Spatial & 3D Interactive Showcase",
      description: "Ultra-sleek hardware and software motion showcase highlighting 3D spatial UI, smooth camera zooms, and tactile interface sound design.",
      thumbnailUrl: ["https://www.blockframe.cloud/images/poster-cambrian-defi.webp"],
      contentUrl: "https://www.blockframe.cloud/videos/cambrian-defi-explainer.mp4",
      uploadDate: "2024-08-15T00:00:00Z",
      publisher: {
        "@type": "Organization",
        name: "BlockFrame Labs",
        logo: {
          "@type": "ImageObject",
          url: "https://www.blockframe.cloud/images/logo.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Lebrel AI — Autonomous Social Media Campaign Video",
      description: "High-velocity commercial edit for Lebrel AI highlighting autonomous social media management, organic engagement scaling, and cross-platform orchestration.",
      thumbnailUrl: ["https://www.blockframe.cloud/images/poster-lebrel-ai.webp"],
      contentUrl: "https://www.blockframe.cloud/videos/lebrel-ai-commercial.mp4",
      embedUrl: "https://x.com/sergeo_n/status/2119070670332076118",
      uploadDate: "2024-10-10T00:00:00Z",
      publisher: {
        "@type": "Organization",
        name: "BlockFrame Labs",
        logo: {
          "@type": "ImageObject",
          url: "https://www.blockframe.cloud/images/logo.png",
        },
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      {videoSchemas.map((v, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(v) }}
        />
      ))}
      <Navigation />
      <PremiumBackground />
      <main id="main-content">
        <PortfolioClient />
      </main>
      <Footer />
    </>
  );
}
