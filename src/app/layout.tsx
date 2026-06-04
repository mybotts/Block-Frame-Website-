import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "BlockFrame Labs | Architecting Autonomy",
    template: "%s | BlockFrame Labs",
  },
  description:
    "We build AI agents, web platforms, and content systems. BlockFrame Labs deploys practical automation for teams that need results, not experiments.",
  keywords: [
    "AI Agents",
    "AI Automation",
    "OpenClaw",
    "LLM Systems",
    "Next.js",
    "Agency",
    "Autonomous Agents",
    "Blog OS",
    "Notion CMS Automation",
  ],
  authors: [{ name: "BlockFrame Labs" }],
  metadataBase: new URL("https://www.blockframe.cloud"),
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/images/logo.png" }
    ]
  },
  openGraph: {
    title: "BlockFrame Labs | Architecting Autonomy",
    description:
      "Practical AI agent systems and web engineering starting at $450. We build autonomous agents, support workflows, web platforms, and content systems with reliable pricing.",
    url: "https://blockframe.cloud",
    siteName: "BlockFrame Labs",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "BlockFrame Labs - Advanced AI Engineering"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockFrame Labs | Architecting Autonomy",
    description:
      "Practical AI agent systems, automation, and web engineering starting at $450. Reliable pricing. Real execution.",
    images: ["/images/og-preview.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BlockFrame Labs",
    url: "https://www.blockframe.cloud",
    logo: "https://www.blockframe.cloud/images/logo.png",
    sameAs: [
      "https://x.com/blockframelabs",
      "https://linkedin.com/company/blockframelabs",
      "https://github.com/blockframelabs"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@blockframe.cloud",
      contactType: "customer service"
    },
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Sergeo"
    },
    employeeCount: "2-10",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Blockframe Labs Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Agents Deployment"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.blockframe.cloud",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.blockframe.cloud/search?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema for Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} antialiased text-white bg-[#050507]`}>
        {children}
      </body>
    </html>
  );
}