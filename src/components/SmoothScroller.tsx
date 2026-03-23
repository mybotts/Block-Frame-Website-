"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * Custom Inertia Scrolling using purely Framer Motion. 
 * This creates that 'Apple' feel where scrolling has momentum.
 */
export default function SmoothScroller({ children }: { children: ReactNode }) {
  const [contentHeight, setContentHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.1,
  });

  const transformY = useTransform(smoothY, (value) => -value);

  return (
    <>
      <div 
        style={{ height: contentHeight }} 
        className="w-full pointer-events-none" 
      />
      <motion.div
        ref={scrollRef}
        style={{ y: transformY }}
        className="fixed top-0 left-0 w-full flex flex-col will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
}
