"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import PremiumBackground from "@/components/PremiumBackground";
import Services from "@/components/Services";
import TechMarquee from "@/components/TechMarquee";
import Footer from "@/components/Footer";

const contentAreas = [
  {
    label: "Blogs",
    href: "/blogs",
    description: "Our own blog runs on the Blog OS we built — daily posts, zero manual effort. Proof that the system works.",
  },
  {
    label: "Videos",
    href: "/videos",
    description: "Video content produced by our team — from motion graphics to UGC-style explainers.",
  },
  {
    label: "Marketplace/Products",
    href: "/marketplace/products",
    description: "Productized systems you can buy and deploy — built on real client work, not theory.",
  },
];

const processSteps = [
  ["01", "Map the workflow", "We start by understanding your actual process — what breaks, what takes too long, and what should be automated."],
  ["02", "Build the system", "We construct the agent, tool, or platform around your specific needs. Narrow scope, fast delivery."],
  ["03", "Connect and test", "We wire it into your existing tools, test with real data, and fix what doesn't work."],
  ["04", "Hand off and support", "We document everything, train your team, and stay available when you need us."],
];

const projectMailHref = "mailto:contact@blockframe.cloud?subject=Project%20inquiry%20for%20BlockFrame%20Labs";
const callHref = "https://calendly.com/blockframemedia/30min";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    workspace: "",
    contact: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    const honeypot = (e.target as HTMLFormElement)._hp;
    if (honeypot && honeypot.value) {
      // Bot detected — silently accept but don't process
      setSuccess(true);
      return;
    }

    setLoading(true);

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6ULRaf3PYQGtwpF1Y_vJybqxHjV26yTOmcek9jWrHr828-A/formResponse";
    const ENTRY_IDS = {
      name: "entry.260676864",
      workspace: "entry.1783311989",
      contact: "entry.625274846",
      email: "entry.1759379081",
      message: "entry.430857094",
    };

    const formBody = new URLSearchParams();
    formBody.append(ENTRY_IDS.name, formData.name);
    formBody.append(ENTRY_IDS.workspace, formData.workspace);
    formBody.append(ENTRY_IDS.contact, formData.contact);
    formBody.append(ENTRY_IDS.email, formData.email);
    formBody.append(ENTRY_IDS.message, formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });
      setSuccess(true);
      setFormData({ name: "", workspace: "", contact: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-text-muted focus:border-primary/60 focus:ring-1 focus:ring-primary/50";

  return (
    <>
      <Navigation />
      <PremiumBackground />

      <main id="home" className="relative z-10 overflow-hidden pt-28">
          <section className="mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:px-12 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="section-kicker mb-5">AI agency for practical automation</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-white md:text-7xl lg:text-8xl">
                AI agents that do real work.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
                We build and deploy AI agents that handle support, content, and operations — so your team can focus on the decisions that actually need a human.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={projectMailHref} className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-primary-light">
                  Start a Project
                </a>
                <a href={callHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition hover:border-primary/60">
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
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl">
                <div className="relative h-[520px]">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=85&w=1800"
                    alt="Team reviewing a product workflow"
                    fill
                    priority
                    className="professional-image object-cover"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="grid gap-3 rounded-3xl border border-white/10 bg-black/55 p-4 backdrop-blur-md sm:grid-cols-3">
                      {["AI Agents", "Web Platforms", "Content Systems"].map((item) => (
                        <div key={item} className="rounded-2xl bg-white/[0.06] p-4">
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-light">{item}</span>
                          <p className="mt-2 text-sm text-text-secondary">Built and shipped</p>
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
                <a key={area.label} href={area.href} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-primary/50 hover:bg-white/[0.055]">
                  <p className="section-kicker mb-4">{area.label}</p>
                  <p className="text-base leading-7 text-text-secondary">{area.description}</p>
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
                  Understand. Build. Hand off.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                {processSteps.map(([number, title, text]) => (
                  <article key={number} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                    <span className="text-sm font-bold text-primary-light">{number}</span>
                    <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-4 text-sm leading-6 text-text-secondary">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <TechMarquee />

          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[360px]">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=85&w=1600"
                  alt="Consultation meeting"
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
                <p className="mt-5 text-lg leading-8 text-text-secondary">
                  No pitch. Just a conversation about your workflow, what's not working, and whether we can help.
                </p>
                <a
                  href={callHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-14 items-center rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-primary-light"
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
                  <div className="rounded-3xl border border-primary/30 bg-primary/10 p-8">
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
                      Quick contact
                      <input className={fieldClass} placeholder="Telegram, Discord, X, or phone" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-text-secondary">
                      What are you trying to automate?
                      <textarea required rows={5} className={`${fieldClass} resize-none`} placeholder="e.g. We spend 10 hours a week on customer support replies. We want an AI agent that handles the common questions and escalates the rest." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </label>
                    <button disabled={loading} className="min-h-14 rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60">
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
