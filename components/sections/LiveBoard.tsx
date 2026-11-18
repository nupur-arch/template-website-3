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
    <section className="live-board relative overflow-hidden bg-board py-16 text-board-ink sm:py-24">
      <div className="live-orbit" aria-hidden="true" />
      <div className="desk relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-saffron">08 — The board</p>
        <h2 className="section-title mt-4 max-w-[10ch] text-[clamp(3.2rem,7vw,6.8rem)] text-board-ink">
          {"Live from the desk.".split(" ").map((word, index) => (
            <span key={word} className="word-reveal" style={{ animationDelay: `${index * 70}ms` }}>
              {word}{" "}
            </span>
          ))}
        </h2>
        <div className="mt-10 rounded-[2rem] border border-white/15 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-sm sm:p-8">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-saffron">Now crossing the wire</p>
          <FlapLine key={flapLines[line]} text={flapLines[line]} />
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {deskStats.map((stat) => (
            <div key={stat.label} className="rounded-[1.4rem] border border-white/15 bg-white/[0.035] p-4 sm:p-5">
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
