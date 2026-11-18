"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { ensureSmoothScroll } from "@/lib/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void ensureSmoothScroll();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
