"use client";

import { useEffect, useState } from "react";
import { deskStats, flapLines } from "@/content/site.config";

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const [node, setNode] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1100);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [node, value]);

  return (
    <span ref={setNode} className="tabular-nums">
      {display}
    </span>
  );
}

function FlapLine({ text }: { text: string }) {
  return (
    <p className="flex flex-wrap gap-1" aria-label={text}>
      {text.split("").map((glyph, index) => (
        <span key={`${glyph}-${index}`} className="flap-cell text-[clamp(0.95rem,2.2vw,1.55rem)]" aria-hidden="true">
          <span className="flap-glyph" style={{ animationDelay: `${index * 24}ms` }}>
            {glyph === " " ? "\u00a0" : glyph}
          </span>
        </span>
      ))}
    </p>
  );
}

export default function LiveBoard() {
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setLine((current) => (current + 1) % flapLines.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-board py-16 text-board-ink sm:py-20">
      <div className="desk">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-saffron">08 — The board</p>
        <h2 className="section-title mt-3 max-w-[12ch] text-[clamp(2.6rem,6vw,5rem)] text-board-ink">
          {"Live from the desk.".split(" ").map((word, index) => (
            <span key={word} className="word-reveal" style={{ animationDelay: `${index * 70}ms` }}>
              {word}{" "}
            </span>
          ))}
        </h2>
        <div className="mt-8">
          <FlapLine key={flapLines[line]} text={flapLines[line]} />
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {deskStats.map((stat) => (
            <div key={stat.label} className="border-t border-white/20 pt-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-saffron">{stat.label}</dt>
              <dd className="display mt-2 text-5xl">
                <CountUp value={stat.value} />
                {"suffix" in stat ? stat.suffix : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
