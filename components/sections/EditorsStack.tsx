"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { EmptyState, SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { numeral } from "@/lib/format";
import { ensureSmoothScroll } from "@/lib/smooth-scroll";
import type { Article } from "@/lib/types";

export default function EditorsStack({ articles }: { articles: Article[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let dead = false;
    let revert: (() => void) | undefined;
    void (async () => {
      await ensureSmoothScroll();
      if (dead || !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-stack]"));
        cards.forEach((card, index) => {
          const next = cards[index + 1];
          if (!next) return;
          gsap.to(card, {
            rotateX: -16,
            y: -24,
            scale: 0.96,
            ease: "none",
            transformOrigin: "center top",
            scrollTrigger: {
              trigger: card,
              start: "top 14%",
              endTrigger: next,
              end: "top 14%",
              scrub: true,
            },
          });
        });
      }, root);
      revert = () => ctx.revert();
    })();
    return () => {
      dead = true;
      revert?.();
    };
  }, [articles.length]);

  return (
    <section className="desk py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-8 lg:self-start">
          <SectionHeading numeral="05" kicker="Editor's picks" title="Held back for the evening." aside="Five pieces the desk would not cut, even if the cylinder were full." />
        </div>
        <div ref={rootRef} className="stack-scene lg:col-span-8">
          {articles.length === 0 ? <EmptyState kicker="05" title="No picks tonight." body="The back bench is clear." /> : null}
          {articles.map((article, index) => (
            <article
              key={article.id}
              data-stack
              className="stack-card sticky mb-5 overflow-hidden rounded-[1.75rem] border border-[var(--rule)] bg-paper"
              style={{ top: `calc(4.5rem + ${index * 18}px)` }}
            >
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <SafeImage src={article.image?.src} alt={article.image?.alt || ""} category={article.categoryLabel} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 360px" />
                <div className="flex flex-col justify-between p-5 sm:p-7">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
                      {numeral(index + 1)} — {article.categoryLabel}
                    </p>
                    <h3 className="display mt-3 text-[clamp(1.8rem,3vw,2.8rem)]">{article.title}</h3>
                    <p className="mt-3 text-ink-soft">{article.dek}</p>
                  </div>
                  <Link href={`/article/${article.slug}`} className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                    Open the piece <Arrow />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
