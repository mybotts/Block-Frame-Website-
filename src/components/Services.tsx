"use client";

import Image from "next/image";
import { services } from "@/lib/data";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Individual extracted high-end 3D Service Card component
function ServiceCard({ service, index }: { service: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Motion Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth return-to-center physics
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse coordinates to rotation vectors (reduced slightly for premium subtlety)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Percentages (-0.5 to 0.5) calculating how far from dead center
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Physically snap orientation back to zero/flat seamlessly
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      // Apply the generated 3D rotation transforms here dynamically
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="glass-card rounded-3xl overflow-hidden relative group cursor-pointer flex flex-col h-[420px]"
    >
      {/* Dynamic Background Image Reveal */}
      <div className="absolute inset-0 z-0">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className={`object-cover transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
              isHovered ? "scale-105 opacity-40 mix-blend-screen" : "scale-100 opacity-0"
            }`}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
        )}
        
        {/* Base Gradient Overlay giving it depth unconditionally */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050507]/80 to-[#050507] pointer-events-none" />
        
        {/* Subtle Border Glow tracked by isHovered state cleanly */}
        <div className={`absolute inset-0 bg-accent/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10 pointer-events-none">
        {/* Top Content: Title & Icon */}
        <div>
          <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors duration-500">
            <div className="h-4 w-4 bg-white rounded-full group-hover:bg-accent transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-accent transition-colors duration-300">
            {service.title}
          </h4>
        </div>

        {/* Bottom Content: Description & Arrow */}
        <div className="flex flex-col gap-6">
          <p className="text-text-secondary text-base leading-relaxed line-clamp-3">
            {service.description}
          </p>
          
          <div className="flex items-center gap-3 text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
            <span>Explore Module</span>
            <svg 
              className={`w-4 h-4 transform transition-transform duration-500 ease-out ${isHovered ? "translate-x-2" : "translate-x-0"}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative w-full py-32 border-t border-white/5 bg-background/50">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl pr-4">
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">
              Core Competencies
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-2">
              Deep-tech infrastructure for the decentralized web.
            </h3>
          </div>
          <p className="text-text-secondary text-lg max-w-sm leading-relaxed pb-2">
            From local and cloud-based AI agents to fully autonomous systems, managed agent services, specialized agent development, and performance-driven social ad campaigns.
          </p>
        </div>

        {/* High-End Bento Grid Array leveraging the Custom 3D Component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
