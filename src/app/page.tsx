"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { marketplaceProducts } from "@/lib/data";

const projectMailHref =
  "mailto:contact@blockframe.cloud?subject=Project%20inquiry%20for%20BlockFrame%20Labs";
const callHref = "https://calendly.com/blockframemedia/30min";

const contentAreas = [
  {
    label: "Blogs",
    href: "/blogs",
    description:
      "Our own blog runs on Blog OS. Daily posts, zero manual effort. Proof that the system works.",
  },
  {
    label: "Videos",
    href: "/videos",
    description:
      "Video content produced by our team, from motion graphics to UGC-style explainers.",
  },
  {
    label: "Marketplace",
    href: "/marketplace/products",
    description:
      "Productized systems you can buy and deploy. Built on real client work, not theory.",
  },
];

const processSteps = [
  ["01", "Audit your workflow", "We map the work you are actually doing today. Where it breaks, where it takes too long, and which parts an automated system can handle without losing quality."],
  ["02", "Productize the solution", "We do not build one-off scripts. Every system is packaged as a repeatable product with clear inputs, outputs, and pricing."],
  ["03", "Deploy and validate", "We connect the system to your real tools and data. We test with actual workflows, measure results, and iterate until it performs reliably."],
  ["04", "Operate or hand off", "We run the system for you as a managed service, or document everything and hand it over. Either way, you own the outcome."],
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How BlockFrame Labs builds AI automation",
  description:
    "Our process for auditing, productizing, and deploying AI systems and services for your business.",
  step: processSteps.map(([number, title, text], idx) => ({
    "@type": "HowToStep",
    position: idx + 1,
    name: title,
    text: text,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.blockframe.cloud",
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.blockframe.cloud/#organization",
  name: "BlockFrame Labs",
  description:
    "AI agency for practical automation. AI systems and services that automate support, content, and operations.",
  url: "https://www.blockframe.cloud",
  logo: "https://www.blockframe.cloud/images/logo.png",
  email: "contact@blockframe.cloud",
  sameAs: [
    "https://twitter.com/blockframelabs",
    "https://linkedin.com/company/blockframelabs",
  ],
  knowsAbout: [
    "AI Systems",
    "AI Automation",
    "Web Engineering",
    "Content Automation",
    "Notion CMS",
    "Voice Agents",
    "Social Media Automation",
  ],
};

const terminalLines = [
  { text: "$ blog-os publish --daily", tone: "cmd" },
  { text: "[research] 3 topics pulled from trend feed", tone: "ok" },
  { text: "[draft] prompt-injection-explained.md", tone: "ok" },
  { text: "[review] queued for approval in Notion", tone: "dim" },
  { text: "[publish] /blog/prompt-injection-explained", tone: "ok" },
  { text: "[ping] indexnow 200 · rss.xml regenerated", tone: "ok" },
  { text: "done in 41s · manual edits: 0", tone: "done" },
];

const heroStats = [
  { value: "37", label: "posts in 90 days" },
  { value: "0", label: "manual edits" },
  { value: "15", label: "platforms reached" },
  { value: "24/7", label: "voice coverage" },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    workspace: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          workspace: formData.workspace,
          email: formData.email,
          message: formData.message,
          _hp: (e.target as HTMLFormElement)._hp?.value || "",
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", workspace: "", email: "", message: "" });
      } else {
        console.error("Submission failed:", res.status);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="noir-home">
        <Navigation />

        <main id="main-content" className="relative z-10 overflow-hidden">
          {/* ================= HERO ================= */}
          <section className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-6 pb-20 pt-36 md:px-12">
            {/* ambient glow */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-[#00f0ff]/[0.05] blur-[120px]" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[-10%] h-[380px] w-[380px] rounded-full bg-[#00f0ff]/[0.03] blur-[100px]" />

            <div className="grid w-full items-center gap-14 lg:grid-cols-12">
              <div className="z-10 space-y-8 lg:col-span-6">
                <div className="noir-panel inline-flex items-center gap-2 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00f0ff] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00f0ff]" />
                  </span>
                  <span className="noir-kicker">Systems running in production</span>
                </div>

                <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
                  Engineering
                  <br />
                  <span className="noir-text-gradient">Practical Intelligence</span>
                </h1>

                <p className="max-w-xl text-lg leading-8 text-[#b9cacb]">
                  AI systems and services that automate support, content, and operations.
                  We build on proof, not promises: everything we sell runs on our own business first.
                </p>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <a href={projectMailHref} className="noir-btn-primary">
                    Start a Project
                  </a>
                  <a href={callHref} target="_blank" rel="noopener noreferrer" className="noir-btn-outline">
                    Book a Call
                  </a>
                </div>
              </div>

              {/* Live artifact: terminal + stats */}
              <div className="relative lg:col-span-6">
                <div className="noir-hud absolute -top-6 left-1">SYS.ON // 0x4B</div>
                <div className="noir-hud absolute -bottom-6 right-1">UPTIME: 24/7</div>

                <div className="noir-panel noir-glow overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="noir-hud ml-3">blog-os // daily run</span>
                  </div>
                  <div className="space-y-2 px-5 py-5 font-mono text-[13px] leading-relaxed">
                    {terminalLines.map((line) => (
                      <p
                        key={line.text}
                        className={
                          line.tone === "cmd"
                            ? "text-white"
                            : line.tone === "done"
                              ? "text-[#00f0ff]"
                              : line.tone === "dim"
                                ? "text-white/40"
                                : "text-[#9fe8ee]"
                        }
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="noir-panel px-4 py-4 text-center">
                      <p className="text-2xl font-extrabold tracking-tight text-white">{stat.value}</p>
                      <p className="mt-1 text-xs leading-4 text-[#b9cacb]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= PROOF STRIP ================= */}
          <section className="border-y border-white/5 bg-white/[0.02] px-6 py-14 md:px-12">
            <div className="mx-auto grid w-full max-w-7xl gap-5 md:grid-cols-3">
              {contentAreas.map((area) => (
                <Link key={area.label} href={area.href} className="noir-panel noir-card-hover block p-6">
                  <p className="noir-kicker mb-3">{area.label}</p>
                  <p className="text-base leading-7 text-[#b9cacb]">{area.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ================= CAPABILITIES ================= */}
          <Services />

          {/* ================= DEPLOYABLE PRODUCTS (BENTO) ================= */}
          <section className="border-t border-white/5 px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-14 max-w-3xl">
                <p className="noir-kicker mb-4">Marketplace</p>
                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  Deployable Systems
                </h2>
                <p className="max-w-2xl text-base leading-7 text-[#b9cacb]">
                  Productized builds with clear tiers and pricing discussed on the call.
                  Each one first ran on our own operations.
                </p>
              </div>

              <div className="grid auto-rows-fr gap-6 md:grid-cols-12">
                {marketplaceProducts.map((product, idx) => {
                  const wide = idx === 0;
                  return (
                    <Link
                      key={product.id}
                      href={`/marketplace/products/${product.id}`}
                      className={`noir-panel noir-card-hover group flex flex-col justify-between overflow-hidden p-7 ${
                        wide ? "md:col-span-8" : "md:col-span-4"
                      }`}
                    >
                      <div>
                        <div className="mb-5 flex items-center justify-between gap-3">
                          <span className="noir-kicker">{product.category}</span>
                          {product.badge && (
                            <span className="rounded-sm border border-[#00f0ff]/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#00f0ff]">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
                          {product.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#b9cacb]">
                          {product.description}
                        </p>
                      </div>
                      <div className="mt-6">
                        {product.id === "blog-os-automated-notion-cms" && (
                          <div className="mb-5 grid grid-cols-3 gap-3">
                            {[
                              ["37", "posts"],
                              ["90", "days"],
                              ["0", "manual edits"],
                            ].map(([v, l]) => (
                              <div key={l} className="border border-white/10 px-3 py-2 text-center">
                                <p className="text-lg font-extrabold text-white">{v}</p>
                                <p className="text-[11px] uppercase tracking-wider text-[#849495]">{l}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        <span className="text-sm font-semibold text-[#00f0ff] transition-colors group-hover:text-white">
                          View system →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================= PROCESS ================= */}
          <section className="border-t border-white/5 bg-white/[0.02] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-14 max-w-3xl">
                <p className="noir-kicker mb-4">The Audit</p>
                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                  Audit. Productize. Deploy.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-[#b9cacb]">
                  A methodical approach to finding inefficiencies and turning them into
                  systems that run without you.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                {processSteps.map(([number, title, text]) => (
                  <article key={number} className="noir-panel noir-card-hover flex flex-col p-6">
                    <span className="noir-hud">{number}</span>
                    <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#b9cacb]">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ================= BOOK A CALL ================= */}
          <section className="border-t border-white/5 px-6 py-24 md:px-12 md:py-32">
            <div className="noir-panel noir-glow mx-auto grid w-full max-w-7xl overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[320px]">
                <Image
                  src="/images/book-a-call.png"
                  alt="Book a consultation call with BlockFrame Labs"
                  fill
                  className="object-cover opacity-80"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0c0e]/90 lg:to-[#0d0e0f]" />
              </div>
              <div className="p-8 md:p-12">
                <p className="noir-kicker mb-4">Book a call</p>
                <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  Talk through what you need before committing.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#b9cacb]">
                  No pitch. A conversation about your workflow, what is not working,
                  and whether we can help.
                </p>
                <a href={callHref} target="_blank" rel="noopener noreferrer" className="noir-btn-primary mt-8">
                  Book on Calendly
                </a>
              </div>
            </div>
          </section>

          {/* ================= CONTACT ================= */}
          <section id="contact" className="border-t border-white/5 px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="noir-kicker mb-4">Start here</p>
                <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  Tell us what you need.
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-[#b9cacb]">
                  Tell us what is slowing you down. We respond with a practical next step,
                  not a sales pitch.
                </p>
                <div className="noir-hud mt-10">RESPONSE TIME: &lt; 24H</div>
              </div>

              <form className="grid gap-5" onSubmit={handleSubmit}>
                {success ? (
                  <div className="noir-panel border-[#00f0ff]/30 p-8">
                    <h3 className="text-2xl font-bold text-white">Message received.</h3>
                    <p className="mt-3 text-[#b9cacb]">
                      We will review your request and get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="mt-6 text-sm font-semibold text-[#00f0ff]"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                      <label>
                        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-[#b9cacb]">
                        Name
                        <input
                          required
                          className="noir-input"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#b9cacb]">
                        Workspace
                        <input
                          className="noir-input"
                          placeholder="Company or project"
                          value={formData.workspace}
                          onChange={(e) => setFormData({ ...formData, workspace: e.target.value })}
                        />
                      </label>
                    </div>
                    <label className="grid gap-2 text-sm font-medium text-[#b9cacb]">
                      Email
                      <input
                        required
                        type="email"
                        className="noir-input"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-[#b9cacb]">
                      What is the biggest bottleneck in your business right now?
                      <textarea
                        required
                        rows={5}
                        className="noir-input resize-none"
                        placeholder="e.g. We miss 30% of inbound calls. Our blog has not been updated in months. We spend hours every day on repetitive support emails."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </label>
                    <button disabled={loading} className="noir-btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                      {loading ? "Sending..." : "Submit Project Request"}
                    </button>
                  </>
                )}
              </form>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
