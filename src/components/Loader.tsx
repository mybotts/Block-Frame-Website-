"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050507] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent blur-3xl opacity-30" />
      
      <div className="relative flex flex-col items-center gap-12 max-w-sm w-full px-12">
        {/* Logo container with pulsing glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 20px rgba(255,255,255,0.05)",
              "0 0 40px rgba(0,240,255,0.15)",
              "0 0 20px rgba(255,255,255,0.05)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-24 w-24 rounded-3xl bg-white p-4 shadow-xl overflow-hidden"
        >
          <Image
            src="/images/logo.png"
            alt="BlockFrame Labs"
            fill
            className="object-contain p-2"
          />
        </motion.div>

        {/* Progress System */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
                System Core Loading
              </span>
              <span className="text-xs font-medium text-text-secondary">
                {percent < 100 ? `Initializing Protocols...` : "System Nominal."}
              </span>
            </div>
            <span className="text-2xl font-mono text-white tracking-widest leading-none">
              {percent}%
            </span>
          </div>

          {/* Minimalist Tech Progress Bar */}
          <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Moving bit highlight */}
            <motion.div 
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-[9px] font-normal tracking-[0.3em] text-text-muted uppercase mt-4">
          <span>BlockFrame Labs</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>v.2.0.4</span>
        </div>
      </div>
    </motion.div>
  );
}
