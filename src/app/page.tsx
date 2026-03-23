"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TechMarquee from "@/components/TechMarquee";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroller from "@/components/SmoothScroller";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    workspace: "",
    contact: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6ULRaf3PYQGtwpF1Y_vJybqxHjV26yTOmcek9jWrHr828-A/formResponse";
    
    // Extracted Entry IDs
    const ENTRY_IDS = {
      name: "entry.260676864",
      workspace: "entry.1783311989",
      contact: "entry.625274846",
      email: "entry.1759379081",
      message: "entry.430857094"
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
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      setSuccess(true);
      setFormData({ name: "", workspace: "", contact: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <CustomCursor />
      
      {isLoaded && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Navigation />
          <ParticleBackground />

          <SmoothScroller>
            {/* HER0 SECTION */}
            <main id="home" className="relative z-10 w-full flex flex-col pt-32 pb-24 min-h-[90vh] overflow-hidden pointer-events-none">
              <div className="hero-radial-glow opacity-60" />

              <section className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center gap-10 lg:gap-14 mt-16 md:mt-24">
                <div className="flex flex-col gap-6 max-w-4xl">
                  {/* Status Pulse */}
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-text-secondary uppercase">
                      Systems Operational
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[1.1] md:leading-[1.1]">
                    <span className="overflow-hidden block py-1">
                      <motion.span 
                        initial={{ y: "110%" }} 
                        animate={{ y: 0 }} 
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
                        className="block"
                      >
                        Architecting
                      </motion.span>
                    </span>
                    <span className="overflow-hidden block py-1">
                      <motion.span 
                        initial={{ y: "110%" }} 
                        animate={{ y: 0 }} 
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} 
                        className="block"
                      >
                        Autonomy
                      </motion.span>
                    </span>
                    <span className="overflow-hidden block py-1">
                      <motion.span 
                        initial={{ y: "110%" }} 
                        animate={{ y: 0 }} 
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} 
                        className="block text-gradient pb-4"
                      >
                        at the Intelligent Edge.
                      </motion.span>
                    </span>
                  </h1>
                  
                  <div className="overflow-hidden">
                    <motion.p 
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      className="text-xl md:text-2xl text-text-secondary font-light max-w-2xl leading-relaxed mt-4"
                    >
                      Welcome to Blockframe Labs, the point of convergence where high-performance engineering meets autonomous creativity. Build tools, deploy AI swarms, and scale with machine-level velocity.
                    </motion.p>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="flex flex-wrap items-center gap-5 mt-8 pointer-events-auto"
                  >
                    <a 
                      href="#services" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                      className="relative inline-flex h-16 w-full md:w-auto overflow-hidden rounded-full p-[1px] focus:outline-none group shadow-[0_0_40px_rgba(0,240,255,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all duration-500"
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050507_0%,#00f0ff_50%,#050507_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-surface-light px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-3xl transition-all group-hover:bg-black/80 duration-500">
                        Explore Core Systems
                      </span>
                    </a>

                    <a 
                      href="#contact" 
                      onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                      className="button-secondary px-8 py-4 h-16 flex items-center text-sm font-semibold tracking-wide text-center cursor-pointer"
                    >
                      Reach Out
                    </a>
                  </motion.div>
                </div>
              </section>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-32 flex items-center justify-between pointer-events-none"
              >
                <div className="text-sm font-semibold tracking-widest text-text-muted uppercase">
                  Scroll to discover
                </div>
              </motion.div>
            </main>

            <TechMarquee />

            <section id="services" className="relative z-10 w-full py-24 md:py-32">
              <Services />
            </section>

            <section id="contact" className="relative z-10 w-full py-32 md:py-48 bg-background/40">
              <div className="w-full max-w-3xl mx-auto px-6 md:px-12 flex flex-col items-center">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                   className="text-center mb-16"
                >
                  <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">Initial Deployment</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Ready to integrate?</h3>
                  <p className="text-text-secondary mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                    Submit your operational parameters below and our agents will establish secure deployment contact.
                  </p>

                  <div className="flex justify-center mt-10 pointer-events-auto">
                    <a 
                      href="https://calendly.com/blockframemedia/30min" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative inline-flex h-14 w-full md:w-auto overflow-hidden rounded-full p-[1px] focus:outline-none group shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-500"
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050507_0%,#00f0ff_50%,#050507_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0a0a0e] px-8 py-4 text-sm font-bold tracking-widest text-white backdrop-blur-3xl transition-all group-hover:bg-black/90 duration-500 uppercase">
                        Book Initial Sync
                      </span>
                    </a>
                  </div>
                </motion.div>
                
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full flex flex-col gap-6 pointer-events-auto"
                  onSubmit={handleSubmit}
                >
                  {success ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-accent/10 border border-accent/30 rounded-2xl p-8 text-center"
                    >
                      <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Transmission Successful</h4>
                      <p className="text-text-secondary">Your operational parameters have been received. An agent will establish contact shortly.</p>
                      <button 
                        type="button"
                        onClick={() => setSuccess(false)}
                        className="text-accent text-sm font-semibold mt-6 hover:underline"
                      >
                        Send another request
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-text-secondary pl-1">Entity Name</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted" 
                            placeholder="Enter your full name" 
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-text-secondary pl-1">Workspace <span className="text-text-muted">(Optional)</span></label>
                          <input 
                            type="text" 
                            value={formData.workspace}
                            onChange={(e) => setFormData({...formData, workspace: e.target.value})}
                            className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted" 
                            placeholder="Company or project name" 
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-secondary pl-1">Quick Contact <span className="text-text-muted">(Optional)</span></label>
                        <input 
                          type="text" 
                          value={formData.contact}
                          onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted" 
                          placeholder="Telegram, Discord, or X (Twitter) handle..." 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-secondary pl-1">Secure Channel (Email)</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted" 
                          placeholder="director@entity.com" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-secondary pl-1">Operational Protocol (Request)</label>
                        <textarea 
                          rows={5} 
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted resize-none" 
                          placeholder="Describe the autonomous systems or high-performance engineering you require..." 
                        />
                      </div>
                      <button 
                        disabled={loading}
                        className="button-primary w-full py-4 mt-4 text-base font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Transmitting...
                          </span>
                        ) : "Initialize Connection"}
                      </button>
                    </>
                  )}
                </motion.form>
              </div>
            </section>

            <footer className="bg-background pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
              <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
                <div className="flex flex-col gap-6 max-w-sm">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white p-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <Image
                      src="/images/logo.png"
                      alt="BlockFrameLabs"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Pioneering the next iteration of intelligent, decentralized digital ecosystems with unprecedented scale and autonomy.
                  </p>
                </div>
                
                <div className="flex items-center gap-8 flex-wrap pointer-events-auto">
                  <a href="https://calendly.com/blockframemedia/30min" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-accent hover:text-white transition-colors duration-300">Book a Call</a>
                  <a href="https://x.com/blockframelabs" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">X</a>
                  <a href="#" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Discord</a>
                </div>
              </div>
              <div className="w-full max-w-7xl mx-auto mt-20 text-xs text-text-muted font-mono tracking-widest border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between gap-4">
                <span>SYS.LOG: SYSTEM.CORE.01</span>
                <span>© BLOCKFRAME LABS {new Date().getFullYear()}</span>
                <span>ROUTING: NOMINAL</span>
              </div>
            </footer>
          </SmoothScroller>
        </motion.div>
      )}
    </>
  );
}
