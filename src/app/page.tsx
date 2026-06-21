"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const contentAreas = [
  {
    label: "Blogs",
    href: "/blogs",
    description: "Our own blog runs on the Blog OS we built. Daily posts, zero manual effort. Proof that the system works.",
  },
  {
    label: "Videos",
    href: "/videos",
    description: "Video content produced by our team, from motion graphics to UGC-style explainers.",
  },
  {
    label: "Marketplace/Products",
    href: "/marketplace/products",
    description: "Productized systems you can buy and deploy. Built on real client work, not theory.",
  },
];

const processSteps = [
  ["01", "Audit your workflow", "We map the work you are actually doing today. Where it breaks, where it takes too long, and which parts can be handled by an automated system without losing quality."],
  ["02", "Productize the solution", "We do not build one-off scripts. Every system is packaged as a repeatable product with clear inputs, outputs, and pricing. You know exactly what you are getting."],
  ["03", "Deploy and validate", "We connect the system to your real tools and data. We test with actual workflows, measure the results, and iterate until it performs reliably."],
  ["04", "Operate or hand off", "You choose: we run the system for you as a managed service, or we document everything and hand it over. Either way, you own the outcome."],
];

const projectMailHref = "mailto:contact@blockframe.cloud?subject=Project%20inquiry%20for%20BlockFrame%20Labs";
const callHref = "https://calendly.com/blockframemedia/30min";

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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    workspace: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
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

  const fieldClass =
    "bg-white/[0.02] px-5 py-4 text-white outline-none transition placeholder:text-text-muted focus:border-primary/60 focus:ring-1 focus:ring-primary/50";

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
      <Navigation />
      <PremiumBackground />

      <main id="home" className="relative z-10 overflow-hidden pt-28">
          <section className="mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:px-12 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="section-kicker mb-5">AI agency for practical automation</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-white md:text-7xl lg:text-8xl">
                AI systems and services that do real work.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
                We build and deploy AI systems and services that handle support, content, and operations, so your team can focus on the decisions that actually need a human.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={projectMailHref} className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-semibold text-black transition hover:bg-primary-light">
                  Start a Project
                </a>
                <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center  px-7 text-sm font-semibold text-white transition hover:bg-white/[0.04]">
                  Book a Call
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="overflow-hidden bg-white/[0.02]">
                <div className="relative h-[520px]">
                  <Image
                    src="/images/hero-image.jpg"
                    alt="AI systems and services workflow dashboard on a dark home office setup"
                    fill
                    priority
                    className="professional-image object-cover"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="grid gap-3  bg-black/55 p-4 backdrop-blur-md sm:grid-cols-3">
                      {["AI Systems", "Web Platforms", "Content Systems"].map((item) => (
                        <div key={item} className="bg-white/[0.06] p-4">
                          <span className="text-sm font-semibold text-white">{item}</span>
                          <p className="mt-1 text-xs text-text-secondary">Built and deployed</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="relative border-y border-white/10 bg-[#080b10]/80 px-6 py-14 md:px-12">
            <div className="mx-auto grid w-full max-w-7xl gap-5 md:grid-cols-3">
              {contentAreas.map((area) => (
                <a key={area.label} href={area.href} className="bg-white/[0.02] p-6 transition hover:bg-white/[0.04] hover:bg-white/[0.055]">
                  <p className="section-kicker mb-4">{area.label}</p>
                  <p className="text-base leading-7 text-text-secondary italic">{area.description}</p>
                </a>
              ))}
            </div>
          </section>

          <Services />

          <section className="relative border-t border-white/10 bg-[#07090d] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-12 max-w-3xl">
                <p className="section-kicker mb-4">How we work</p>
                <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  Audit. Productize. Deploy.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                {processSteps.map(([number, title, text]) => (
                  <article key={number} className="bg-white/[0.02] p-6">
                    <span className="text-sm font-bold text-primary-light">{number}</span>
                    <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-4 text-sm leading-6 text-text-secondary italic">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid w-full max-w-7xl overflow-hidden bg-white/[0.02] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[360px]">
                <Image
                  src="/images/book-a-call.png"
                  alt="Book a consultation call"
                  fill
                  className="professional-image object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="p-8 md:p-12">
                <p className="section-kicker mb-4">Book a call</p>
                <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Talk through what you need before committing.
                </h2>
                <p className="mt-5 text-lg leading-8 text-text-secondary italic">
                  No pitch. Just a conversation about your workflow, what's not working, and whether we can help.
                </p>
                <a
                  href={callHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-14 items-center bg-white px-7 text-sm font-semibold text-black transition hover:bg-primary-light"
                >
                  Book on Calendly
                </a>
              </div>
            </div>
          </section>

          <section id="contact" className="relative border-t border-white/10 bg-[#07090d] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="section-kicker mb-4">Start here</p>
                <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  Tell us what you need.
                </h2>
                <p className="mt-6 text-lg leading-8 text-text-secondary">
                  Describe your workflow, what's breaking, and what you'd like to automate. We'll respond with a practical next step.
                </p>
              </div>

              <form className="grid gap-5" onSubmit={handleSubmit}>
                {success ? (
                  <div className="border border-primary/30 bg-primary/10 p-8">
                    <h3 className="text-2xl font-semibold text-white">Message received.</h3>
                    <p className="mt-3 text-text-secondary">We'll review your request and get back to you within 24 hours.</p>
                    <button type="button" onClick={() => setSuccess(false)} className="mt-6 text-sm font-semibold text-primary-light">
                      Send another request
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Honeypot field — hidden from real users */}
                    <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                      <label>
                        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-text-secondary">
                        Name
                        <input required className={fieldClass} placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-text-secondary">
                        Workspace
                        <input className={fieldClass} placeholder="Company or project" value={formData.workspace} onChange={(e) => setFormData({ ...formData, workspace: e.target.value })} />
                      </label>
                    </div>
                    <label className="grid gap-2 text-sm font-medium text-text-secondary">
                      Email
                      <input required type="email" className={fieldClass} placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-text-secondary">
                      What are you trying to automate?
                      <textarea required rows={5} className={`${fieldClass} resize-none`} placeholder="e.g. We spend 10 hours a week on customer support replies. We want an AI system that handles the common questions and escalates the rest." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </label>
                    <button disabled={loading} className="min-h-14 bg-white px-7 text-sm font-semibold text-black transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60">
                      {loading ? "Sending..." : "Submit Project Request"}
                    </button>
                  </>
                )}
              </form>
            </div>
          </section>
        </main>

        <Footer />
    </>
  );
}
