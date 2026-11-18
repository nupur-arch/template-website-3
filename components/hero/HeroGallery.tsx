"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { Stamp } from "@/components/stamp/Stamp";
import { Arrow } from "@/components/ui/Arrow";
import { EmptyState } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { numeral } from "@/lib/format";
import { ensureSmoothScroll } from "@/lib/smooth-scroll";
import type { Article } from "@/lib/types";

const QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export default function HeroGallery({ articles }: { articles: Article[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const total = articles.length;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const rotor = rotorRef.current;
    if (!section || !scene || !rotor || total < 1) return;

    const cards = Array.from(rotor.querySelectorAll<HTMLAnchorElement>("[data-hero-card]"));
    let dead = false;
    let revert: (() => void) | undefined;

    const paint = (index: number, progress: number) => {
      const safe = Math.max(0, Math.min(total - 1, index));
      if (countRef.current) countRef.current.textContent = numeral(safe + 1);
      if (titleRef.current) titleRef.current.textContent = articles[safe]?.title ?? "";
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    const onRowScroll = () => {
      if (window.matchMedia(QUERY).matches) return;
      const max = scene.scrollWidth - scene.clientWidth;
      const progress = max <= 0 ? 0 : scene.scrollLeft / max;
      paint(Math.round(progress * (total - 1)), progress);
    };

    scene.addEventListener("scroll", onRowScroll, { passive: true });

    void (async () => {
      await ensureSmoothScroll();
      if (dead || !window.matchMedia(QUERY).matches) return;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);

      const apply = (progress: number) => {
        const active = progress * (total - 1);
        cards.forEach((card, index) => {
          const rel = index - active;
          const abs = Math.abs(rel);
          const x = rel * 54;
          const z = -Math.min(abs * 115, 520);
          const rotate = Math.max(-58, Math.min(58, rel * -16));
          const scale = Math.max(0.72, 1 - abs * 0.09);
          card.style.transform = `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`;
          card.style.opacity = abs > 4.2 ? "0" : String(Math.max(0.12, 1 - abs * 0.18));
          card.style.zIndex = String(100 - Math.round(abs * 10));
          if (abs > 1.4) card.setAttribute("inert", "");
          else card.removeAttribute("inert");
        });
        paint(Math.round(active), progress);
      };

      const ctx = gsap.context(() => {
        apply(0);
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=350%",
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => apply(self.progress),
        });
        apply(0);
        scene.dataset.ready = "true";
      }, section);

      revert = () => {
        ctx.revert();
      };
    })();

    return () => {
      dead = true;
      scene.removeEventListener("scroll", onRowScroll);
      revert?.();
    };
  }, [articles, total]);

  if (total === 0) {
    return (
      <section className="desk py-16">
        <EmptyState kicker="01 — Cylinder" title="The desk is empty." body="No featured stories are on the wire yet." />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="hero-section relative border-b border-[var(--rule)]" aria-roledescription="carousel">
      <div className="desk grid items-center gap-6 py-6 lg:h-full lg:grid-cols-[minmax(250px,0.86fr)_1.35fr] lg:py-8">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-4">
            <Stamp className="h-[4.5rem] w-[4.5rem]" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              01 — The cylinder
              <span className="mt-1 block tracking-[0.14em] text-ink">Twenty plates, one scroll</span>
            </p>
          </div>
          <h1 className="display mt-6 text-[clamp(3rem,6vw,5.6rem)]">The wire, still warm.</h1>
          <p ref={titleRef} className="mt-4 max-w-[18ch] text-xl text-ink-soft">
            {articles[0].title}
          </p>
          <div className="mt-6">
            <p className="font-mono text-sm tracking-[0.18em]">
              <span ref={countRef}>01</span>
              <span className="text-ink-soft"> / {numeral(total)}</span>
            </p>
            <div className="mt-3 h-px w-40 bg-[var(--rule)]">
              <span ref={progressRef} className="block h-px origin-left bg-ember" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
        <div ref={sceneRef} className="hero-scene" data-lenis-prevent>
          <div ref={rotorRef} className="hero-rotor">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                data-hero-card
                className="hero-card overflow-hidden border border-[var(--rule)]"
              >
                <SafeImage
                  src={article.image?.src}
                  alt={article.image?.alt || ""}
                  category={article.categoryLabel}
                  ratio="aspect-[4/5]"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 82vw, 390px"
                />
                <span className="flex items-start justify-between gap-3 p-4">
                  <span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
                      {numeral(index + 1)} {article.categoryLabel}
                    </span>
                    <span className="display mt-2 line-clamp-3 block text-[1.65rem]">{article.title}</span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--rule)]">
                    <Arrow />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
