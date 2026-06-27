import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import ShareButton from "@/components/ShareButton";
import { marketplaceProducts } from "@/lib/data";

const product = marketplaceProducts.find((item) => item.id === "voice-agent-24-7")!;

const emailHref =
  "mailto:contact@blockframe.cloud?subject=Voice%20Agent%20%E2%80%94%2024%2F7%20AI%20Phone%20Assistant%20%26%20Meeting%20Booker&body=Hi%20BlockFrame%20Labs%2C%0A%0AI%E2%80%99m%20interested%20in%20the%20Voice%20Agent%20for%20my%20business.%20Please%20send%20me%20the%20next%20steps.%0A%0ACompany%3A%0APhone%20number%20or%20website%3A%0ACurrent%20scheduling%20tool%20(e.g.%20Calendly%2C%20Google%20Calendar)%3A%0AHow%20you%20currently%20handle%20inbound%20calls%3A%0ABest%20way%20to%20reach%20me%3A%0A";

const callHref = "https://calendly.com/blockframemedia/30min";

const docs = [
  {
    title: "What you are buying",
    body: "A voice AI agent that we install for your business. It runs 24/7, learns your services and FAQs, answers inbound calls in a natural conversational voice, qualifies callers, and books meetings or sessions directly into your calendar. No more missed calls, no more back-and-forth scheduling emails.",
  },
  {
    title: "How it learns your business",
    body: "During onboarding, you provide your service descriptions, pricing, FAQs, tone preferences, and schedule. The agent builds a knowledge base from this and from your existing materials (website, docs, emails). It stays current: you can update its knowledge anytime, and managed-tier clients get regular refreshes from our team.",
  },
  {
    title: "Call handling and qualification",
    body: "When a call comes in, the agent answers immediately. It identifies the caller's needs, answers questions about your services, handles objections using your approved talking points, and qualifies the caller against your criteria. Unqualified callers get a polite close. Qualified callers get booked or escalated to you.",
  },
  {
    title: "Meeting and session booking",
    body: "The agent connects to your real calendar (Google Calendar, Calendly, or your existing scheduling tool). It checks real-time availability, offers open slots, confirms bookings, and sends calendar invites. You set the rules: which meeting types to offer, buffer times, max bookings per day, and blackout dates.",
  },
];

const implementationSteps = [
  "Discovery call: map your services, pricing, FAQs, call volume, current scheduling tool, and qualification criteria.",
  "Knowledge base build: we compile your business knowledge, tone guidelines, objection-handling scripts, and escalation rules into the agent's training data.",
  "Calendar and telephony setup: connect your scheduling tool (Google Calendar, Calendly, etc.) and configure the phone line or web voice widget.",
  "Call flow design: build the conversation flows for common call types (new inquiries, existing clients, support requests, wrong numbers).",
  "Testing and launch: run test calls, refine responses, set daily caps and escalation thresholds, and go live on a controlled rollout.",
  "Monitor and improve: review call recordings, booking rates, and caller feedback. Tune the knowledge base, conversation flows, and qualification criteria.",
];

export const metadata: Metadata = {
  title: "Voice Agent: 24/7 AI Phone Assistant, Call Handler & Meeting Booker",
  description:
    "A voice AI agent installed for your business that runs 24/7. It learns your services, answers inbound calls, qualifies callers, and books meetings directly into your calendar. Built by BlockFrame Labs.",
  alternates: { canonical: "/marketplace/products/voice-agent-24-7" },
  openGraph: {
    title: "Voice Agent: 24/7 AI Phone Assistant, Call Handler & Meeting Booker",
    description:
      "24/7 voice AI that answers calls, qualifies callers, and books meetings into your calendar. Never miss a lead again.",
    url: "https://www.blockframe.cloud/marketplace/products/voice-agent-24-7",
    siteName: "BlockFrame Labs",
    type: "website",
    images: [{ url: "/images/voice-agent-og.png", width: 1200, height: 630, alt: "Voice Agent by BlockFrame Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice Agent: 24/7 AI Phone Assistant & Meeting Booker",
    description: "Answer calls, qualify leads, and book meetings 24/7. Runs on your phone line or website.",
    images: ["/images/voice-agent-og.png"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: "https://www.blockframe.cloud/images/voice-agent-og.png",
  description:
    "24/7 voice AI agent that answers calls, qualifies callers, and books meetings into your calendar.",
  brand: { "@type": "Brand", name: "BlockFrame Labs" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.blockframe.cloud/marketplace/products/voice-agent-24-7",
  },
};

export default function VoiceAgent247Page() {
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
                <span className="category-pill border border-emerald-400/30 bg-emerald-50 text-emerald-700">{product.badge}</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-6xl">{product.title}</h1>
              <div className="mt-3">
                <ShareButton
                  url={`/marketplace/products/${product.id}`}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  variant="default"
                />
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary italic">{product.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-text-primary px-6 text-sm font-semibold text-background transition hover:opacity-85">
                  Book a Call
                </a>
                <a href={emailHref} className="inline-flex min-h-12 items-center justify-center border border-border px-6 text-sm font-semibold text-text-primary transition hover:border-primary-light hover:text-primary-light">
                  Start by Email
                </a>
              </div>

              <p className="mt-4 text-sm text-text-secondary">
                Tell us your current call volume, scheduling tool, and whether you want the blueprint, a build sprint, or monthly management. We will reply with pricing tailored to your setup.
              </p>
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
                <p className="mt-3 text-sm leading-7 text-text-secondary italic">{item.body}</p>
              </article>
            ))}
          </section>

          <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold text-text-primary">Engagement models</h2>
              <p className="mt-2 text-sm text-text-secondary">Three ways to work with us. Pricing is tailored to your call volume, stack, and complexity. Book a call to get a precise quote.</p>
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
            <h2 className="text-2xl font-semibold text-text-primary">Ready to answer every call, book every lead?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              Share your current call volume, scheduling tool, and whether you want the blueprint, a build sprint, or managed service. We will reply with a practical recommendation and pricing tailored to your setup.
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
