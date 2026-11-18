"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToTop } from "@/lib/smooth-scroll";

let entered = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const play = entered && !reduce;

  useEffect(() => {
    entered = true;
    scrollToTop();
  }, [pathname]);

  if (!play) return children;

  return (
    <div style={{ perspective: "1400px" }}>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[100svh] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, rotateX: -8 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top center" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
