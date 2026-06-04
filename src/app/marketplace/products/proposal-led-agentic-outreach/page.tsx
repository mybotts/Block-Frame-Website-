import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { marketplaceProducts } from "@/lib/data";

const product = marketplaceProducts.find((item) => item.id === "proposal-led-agentic-outreach")!;

const emailHref =
  "mailto:contact@blockframe.cloud?subject=Proposal-Led%20Agentic%20Outreach%20System&body=Hi%20BlockFrame%20Labs%2C%0A%0AI%27m%20interested%20in%20the%20Proposal-Led%20Agentic%20Outreach%20System.%20Please%20send%20me%20the%20next%20steps.%0A%0ACompany%3A%0AWebsite%3A%0ACurrent%20CRM%2Fmailbox%3A%0ABest%20way%20to%20reach%20me%3A%0A";

const callHref = "https://calendly.com/blockframemedia/30min";

const docs = [
  {
    title: "What you are buying",
    body:
      "A custom outbound workflow that researches qualified prospects, creates personalized sample assets, publishes private proposal pages, drafts outreach, and routes the campaign through your existing sales stack.",
  },
  {
    title: "Why it matters",
    body:
      "Most cold outreach asks strangers to trust a promise. This system leads with proof: a prospect-specific sample, a private preview link, and a message that shows the business was actually researched.",
  },
  {
    title: "How we adapt it",
    body:
      "Your version is built around the tools you already use. That can mean Gmail, Outlook, Hostinger, HubSpot, Airtable, Notion, GoHighLevel, manual CSV review, or a custom approval queue.",
  },
  {
    title: "Safety built in",
    body:
      "The workflow is designed with daily send limits, duplicate checks, suppression lists, preview URL validation, opt-out handling, and human-reviewable queues before sending.",
  },
];

const implementationSteps = [
  "Map your niche, offer, regions, lead sources, mailbox, CRM, and approval process.",
  "Build the prospect data model, qualification rules, sample-generation workflow, and proposal page format.",
  "Connect email drafting, queue review, daily caps, suppression checks, and reply tracking.",
  "Launch a controlled first campaign, review results, and tune the targeting, copy, and sample assets.",
];

export const metadata: Metadata = {
  title: "Proposal-Led Agentic Outreach System | BlockFrame Labs",
  description:
    "A custom BlockFrame Labs implementation for proposal-led prospecting, personalized sample assets, private preview pages, and controlled outreach workflows.",
  alternates: {
    canonical: "/marketplace/products/proposal-led-agentic-outreach",
  },
  openGraph: {
    title: "Proposal-Led Agentic Outreach System",
    description:
      "A custom growth workflow that researches prospects, creates personalized sample assets, publishes private proposal pages, and prepares controlled outreach.",
    url: "https://www.blockframe.cloud/marketplace/products/proposal-led-agentic-outreach",
    siteName: "BlockFrame Labs",
    type: "website",
    images: [
      {
        url: "/images/proposal-led-agentic-outreach-og.png",
        width: 1200,
        height: 630,
        alt: "Proposal-Led Agentic Outreach System by BlockFrame Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proposal-Led Agentic Outreach System",
    description:
      "Custom prospecting, proposal pages, email queues, and safety controls for proof-led outreach.",
    images: ["/images/proposal-led-agentic-outreach-og.png"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: "https://www.blockframe.cloud/images/proposal-led-agentic-outreach-og.png",
  description:
    "Custom implementation for prospect research, personalized sample assets, private proposal pages, controlled outreach queues, and safety checks.",
  brand: {
    "@type": "Brand",
    name: "BlockFrame Labs",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "1250",
    availability: "https://schema.org/InStock",
    url: "https://www.blockframe.cloud/marketplace/products/proposal-led-agentic-outreach",
  },
};

export default function ProposalLedAgenticOutreachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <CustomCursor />
      <Navigation />
      <PremiumBackground />

      <SmoothScroller>
        <main className="relative z-10 min-h-screen px-6 pb-24 pt-36 md:px-12">
          <div className="hero-radial-glow opacity-40 z-[-1]" />

          <div className="mx-auto w-full max-w-7xl">
            <Link href="/marketplace/products" className="nav-link inline-flex">
              Back to Marketplace/Products
            </Link>

            <section className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="category-pill bg-primary/15 text-primary-light">{product.category}</span>
                  <span className="category-pill border border-amber-300/30 bg-amber-300/10 text-amber-100">
                    {product.badge}
                  </span>
                </div>

                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                  {product.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
                  {product.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={emailHref}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-primary-light"
                  >
                    Start by Email
                  </a>
                  <a
                    href={callHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
                  >
                    Book a Call
                  </a>
                </div>

                <p className="mt-4 text-sm text-text-secondary">
                  Send us your current stack and goal. We respond as soon as possible with the best next step.
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  Pricing starts at the listed tier and scales with lead sources, integrations, approvals, and sending requirements.
                </p>
              </div>

              <div className="glass-card overflow-hidden">
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.gradient}`}>
                  <Image src={product.image} alt={product.title} fill className="object-cover opacity-90" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
                  <div className="absolute right-5 top-5 rounded-full bg-surface/90 px-4 py-2 text-sm font-bold text-primary-light">
                    {product.price}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-12 grid gap-4 md:grid-cols-2">
              {docs.map((item) => (
                <article key={item.title} className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-text-primary">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.body}</p>
                </article>
              ))}
            </section>

            <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-semibold text-text-primary">Pricing tiers</h2>
                <div className="mt-5 grid gap-3">
                  {product.tiers?.map((tier) => (
                    <div key={tier.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="font-semibold text-white">{tier.name}</h3>
                        <span className="text-sm font-semibold text-primary-light">{tier.price}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{tier.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-2xl font-semibold text-text-primary">Implementation outline</h2>
                <ol className="mt-5 space-y-4">
                  {implementationSteps.map((step, index) => (
                    <li key={step} className="flex gap-4 text-sm leading-7 text-text-secondary">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary-light" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="mt-12 glass-card p-6 text-center md:p-10">
              <h2 className="text-2xl font-semibold text-text-primary">Ready to see if it fits your business?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                Tell us your niche, website, current mailbox or CRM, and whether you want the blueprint, a build sprint,
                or monthly management. We will reply as soon as possible with a practical recommendation.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={emailHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-primary-light"
                >
                  Contact BlockFrame Labs
                </a>
                <a
                  href="https://www.instagram.com/blockframelabs?igsh=MWtwYWQycHR3cXJlYw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
                >
                  Message on Instagram
                </a>
                <a
                  href="https://x.com/blockframelabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
                >
                  Message on X
                </a>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </SmoothScroller>
    </>
  );
}
