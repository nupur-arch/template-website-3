"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const story = document.getElementById("story");
      if (!story) return;
      const start = story.getBoundingClientRect().top + window.scrollY;
      const total = Math.max(story.offsetHeight - window.innerHeight * 0.4, 1);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start + 120) / total));
      bar.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-px bg-transparent" aria-hidden="true">
      <span ref={barRef} className="block h-px origin-left bg-ember" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
