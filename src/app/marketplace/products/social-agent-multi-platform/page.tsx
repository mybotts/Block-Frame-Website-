import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import { marketplaceProducts } from "@/lib/data";

const product = marketplaceProducts.find((item) => item.id === "social-agent-multi-platform")!;

const emailHref =
  "mailto:contact@blockframe.cloud?subject=Social%20Agent%20%E2%80%94%20Multi-Platform%20AI%20Posting%20%26%20Lead%20Qualification&body=Hi%20BlockFrame%20Labs%2C%0A%0AI%E2%80%99m%20interested%20in%20the%20Social%20Agent%20for%20multi-platform%20AI%20posting%2C%20engagement%2C%20and%20lead%20qualification.%20Please%20send%20me%20the%20next%20steps.%0A%0ACompany%3A%0AWebsite%3A%0ACurrent%20social%20platforms%3A%0ACRM%20or%20lead%20capture%20tools%3A%0ABest%20way%20to%20reach%20me%3A%0A";

const callHref = "https://calendly.com/blockframemedia/30min";

const docs = [
  {
    title: "What you are buying",
    body: "An AI agent that publishes your content across 15 social platforms, replies to comments and DMs in your brand voice, qualifies inbound leads, and routes them to your CRM or inbox. The same system BlockFrame Labs uses internally for its own distribution.",
  },
  {
    title: "How posting works",
    body: "You provide the core content strategy. The agent creates platform-native variations, schedules posts at optimal times, threads multi-part content, and adapts format for each platform: shorts for TikTok, carousels for LinkedIn, threads for X, and more.",
  },
  {
    title: "Engagement and replies",
    body: "The agent monitors comments, mentions, and direct messages across connected platforms. It replies with brand-voiced, context-aware responses, escalates complex queries to your team, and captures leads from inbound conversations.",
  },
  {
    title: "Lead qualification",
    body: "Inbound social interactions are scored against your criteria. High-intent leads are tagged, summarized, and pushed to your CRM, inbox, or approval queue for fast follow-up. No more manually tracking DMs and comment threads.",
  },
];

const implementationSteps = [
  "Map your brand voice, content types, target platforms, lead criteria, and existing stack (CRM, inbox, scheduling tools).",
  "Build the content repurposing rules, platform-specific posting formats, scheduling logic, and approval queues.",
  "Configure the reply engine: brand tone guidelines, escalation rules, lead-scoring criteria, and auto-reply guardrails.",
  "Connect CRM or inbox routing for qualified leads, set daily caps and suppression lists, and launch a controlled pilot across selected platforms.",
  "Review engagement metrics, reply quality, lead conversion data, and tune posting cadence, tone, and qualification rules.",
];

export const metadata: Metadata = {
  title: "Social Agent: AI Multi-Platform Posting, Engagement & Lead Qualification",
  description: "An AI agent that posts across 15 platforms, auto-replies to comments and DMs, qualifies inbound leads, and routes them to your CRM. Built by BlockFrame Labs.",
  alternates: { canonical: "/marketplace/products/social-agent-multi-platform" },
  openGraph: {
    title: "Social Agent: AI Multi-Platform Posting, Engagement & Lead Qualification",
    description: "Auto-posting, auto-reply, lead qualification across 15 social platforms. Built on the same systems BlockFrame Labs uses for its own distribution.",
    url: "https://www.blockframe.cloud/marketplace/products/social-agent-multi-platform",
    siteName: "BlockFrame Labs",
    type: "website",
    images: [{ url: "/images/social-agent-og.png", width: 1200, height: 630, alt: "Social Agent by BlockFrame Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Agent: AI Multi-Platform Posting & Lead Qualification",
    description: "Posting, engagement, and lead capture across 15 platforms. Safety controls included.",
    images: ["/images/social-agent-og.png"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: "https://www.blockframe.cloud/images/social-agent-og.png",
  description: "AI agent for multi-platform posting, auto-reply, lead qualification, and CRM routing across 15 social platforms.",
  brand: { "@type": "Brand", name: "BlockFrame Labs" },
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://www.blockframe.cloud/marketplace/products/social-agent-multi-platform" },
};

export default function SocialAgentMultiPlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Navigation />
      <PremiumBackground />

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
                <span className="category-pill border border-amber-400/30 bg-amber-50 text-amber-700">{product.badge}</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-6xl">{product.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">{product.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-text-primary px-6 text-sm font-semibold text-background transition hover:opacity-85">
                  Book a Call
                </a>
                <a href={emailHref} className="inline-flex min-h-12 items-center justify-center border border-border px-6 text-sm font-semibold text-text-primary transition hover:border-primary-light hover:text-primary-light">
                  Start by Email
                </a>
              </div>

              <p className="mt-4 text-sm text-text-secondary">Tell us your platforms, current workflow, and whether you want the blueprint, a build sprint, or monthly management. We will reply with pricing tailored to your setup.</p>
            </div>

            <div className="glass-card overflow-hidden">
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.gradient}`}>
                <Image src={product.image} alt={product.title} fill className="object-cover opacity-90" priority sizes="(min-width: 1024px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-card-bg/70 via-transparent to-transparent" />
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
              <h2 className="text-2xl font-semibold text-text-primary">Engagement models</h2>
              <p className="mt-2 text-sm text-text-secondary">Three ways to work with us. Pricing is tailored to your stack, platforms, and volume. Book a call to get a precise quote.</p>
              <div className="mt-5 grid gap-3">
                {product.tiers?.map((tier) => (
                  <div key={tier.name} className="bg-surface-light p-4">
                    <h3 className="font-semibold text-text-primary">{tier.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{tier.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold text-text-primary">Implementation outline</h2>
              <ol className="mt-5 space-y-4">
                {implementationSteps.map((step) => (
                  <li key={step} className="flex gap-4 text-sm leading-7 text-text-secondary">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded bg-primary-light" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="mt-12 glass-card p-6 text-center md:p-10">
            <h2 className="text-2xl font-semibold text-text-primary">Ready to automate your social engagement?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              Share your platforms, current content workflow, CRM, and whether you want the blueprint, a build sprint, or managed service. We will reply with a practical recommendation and pricing tailored to your setup.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-text-primary px-6 text-sm font-semibold text-background transition hover:opacity-85">
                Book a Call
              </a>
              <a href={emailHref} className="inline-flex min-h-12 items-center justify-center border border-border px-6 text-sm font-semibold text-text-primary transition hover:border-primary-light hover:text-primary-light">
                Start by Email
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
