import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Footer from "@/components/Footer";
import { marketplaceProducts } from "@/lib/data";

const product = marketplaceProducts.find((item) => item.id === "blog-os-automated-notion-cms")!;

const emailHref =
  "mailto:contact@blockframe.cloud?subject=Blog%20OS%20-%20Automated%20Notion%20CMS%20Publishing&body=Hi%20BlockFrame%20Labs%2C%0A%0AI%27m%20interested%20in%20the%20Blog%20OS%20automated%20publishing%20system.%20Please%20send%20me%20the%20next%20steps.%0A%0ACompany%3A%0AWebsite%3A%0ACurrent%20CMS%2Fstack%3A%0ABest%20way%20to%20reach%20me%3A%0A";

const callHref = "https://calendly.com/blockframemedia/30min";

const docs = [
  {
    title: "What you are buying",
    body: "A managed blog operating system that turns research, drafting, approvals, and publishing into a repeatable pipeline running on top of Notion and your existing website stack.",
  },
  {
    title: "Why it matters",
    body: "Most blogs die from inconsistent publishing, missing editorial structure, and too much manual coordination. This system makes content production systematic instead of heroic.",
  },
  {
    title: "How we adapt it",
    body: "Your Blog OS is configured for your niche, brand voice, website stack, internal approvals, and metrics. Whether you use Next.js, WordPress, or another CMS, we map Notion as the editorial control plane.",
  },
  {
    title: "Safety built in",
    body: "Every post passes through distinct stages: idea, brief, draft, review, approved, scheduled, published. Duplicate-topic checks and scheduling controls prevent accidental overlap.",
  },
];

const implementationSteps = [
  "Map your topics, audience, website stack, CMS constraints, SEO priorities, and current publishing rhythm.",
  "Build the Notion editorial schema, agent prompts, research checks, drafting templates, and approval rules.",
  "Implement the publish hook from Notion to your website, including metadata, slugs, redirects, and error handling.",
  "Launch an initial content program, review output quality, then handoff runbooks, role assignments, and operational cadence.",
];

export const metadata: Metadata = {
  title: "Blog OS — Automated Notion-CMS Blog Publishing System",
  description: "A BlockFrame Labs system that researches topics, drafts posts, manages approvals, and publishes finished blog content automatically via Notion CMS.",
  alternates: { canonical: "/marketplace/products/blog-os-automated-notion-cms" },
  openGraph: {
    title: "Blog OS — Automated Notion-CMS Blog Publishing System",
    description: "A managed, Notion-backed editorial system that researches topics, drafts posts, manages approvals, and publishes finished content to your website on a reliable schedule.",
    url: "https://www.blockframe.cloud/marketplace/products/blog-os-automated-notion-cms",
    siteName: "BlockFrame Labs",
    type: "website",
    images: [{ url: "/images/cms-content-pipelines.png", width: 1200, height: 630, alt: "Blog OS — Automated Notion-CMS Blog Publishing System by BlockFrame Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog OS — Automated Notion-CMS Blog Publishing System",
    description: "Managed blog OS: research, drafting, approval workflow, and automated publishing through Notion CMS.",
    images: ["/images/cms-content-pipelines.png"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: "https://www.blockframe.cloud/images/cms-content-pipelines.png",
  description: "A managed Notion-backed editorial system that researches topics, drafts posts, manages approvals, and publishes finished content to your website on a reliable schedule.",
  brand: { "@type": "Brand", name: "BlockFrame Labs" },
  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://www.blockframe.cloud/marketplace/products/blog-os-automated-notion-cms" },
};

export default function BlogOsProductPage() {
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

          <section className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="category-pill bg-primary/15 text-primary-light">{product.category}</span>
                <span className="category-pill border border-amber-300/30 bg-amber-300/10 text-amber-100">{product.badge}</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">{product.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">{product.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-primary-light">
                  Book a Call
                </a>
                <a href={emailHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light">
                  Start by Email
                </a>
              </div>

              <p className="mt-4 text-sm text-text-secondary">Use this as a sellable system for clients who want consistent publishing without hiring in-house editors. We will reply with a practical recommendation and pricing tailored to your setup.</p>
            </div>

            <div className="glass-card overflow-hidden">
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.gradient}`}>
                <Image src={product.image} alt={product.title} fill className="object-cover opacity-90" priority sizes="(min-width: 1024px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
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
              <p className="mt-2 text-sm text-text-secondary">Three ways to work with us. Pricing is tailored to your stack, authors, and publishing volume. Book a call to get a precise quote.</p>
              <div className="mt-5 grid gap-3">
                {(product.tiers ?? []).map((tier) => (
                  <div key={tier.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="font-semibold text-white">{tier.name}</h3>
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
              Tell us your website stack, publishing goals, number of authors, whether you want the blueprint, build sprint, or managed operation. We will reply with a concrete recommendation and pricing tailored to your setup.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-primary-light">
                Book a Call
              </a>
              <a href={emailHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-primary-light hover:text-primary-light">
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
