"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { EmptyState, SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { numeral } from "@/lib/format";
import { ensureSmoothScroll } from "@/lib/smooth-scroll";
import type { Article } from "@/lib/types";

export default function TrendingFlip({ articles }: { articles: Article[] }) {
  const rootRef = useRef<HTMLElement>(null);

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
        root.querySelectorAll<HTMLElement>("[data-trend]").forEach((card) => {
          const inner = card.querySelector<HTMLElement>("[data-flip]");
          gsap.fromTo(
            card,
            { rotateX: 14, scale: 0.92 },
            {
              rotateX: 0,
              scale: 1,
              ease: "none",
              transformOrigin: "center top",
              scrollTrigger: { trigger: card, start: "top 88%", end: "top 52%", scrub: true },
            },
          );
          if (inner) {
            gsap.to(inner, {
              rotateY: 180,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 48%", end: "top 12%", scrub: true },
            });
          }
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
    <section ref={rootRef} className="border-y border-[var(--rule)] bg-paper-deep/50 py-16 sm:py-20">
      <div className="desk">
        <SectionHeading numeral="04" kicker="Trending" title="Ten deep, then the turn." aside="Each card leans in with the scroll, then flips to the summary the desk would actually say out loud." />
        {articles.length === 0 ? (
          <div className="mt-8">
            <EmptyState kicker="04" title="Nothing is trending." body="The board is quiet. That is news of a sort." />
          </div>
        ) : (
          <ol className="mt-10 space-y-6">
            {articles.map((article) => (
              <li key={article.id} data-trend className="grid items-stretch gap-4 md:grid-cols-[7rem_1fr]">
                <p className="display text-6xl text-ember md:text-7xl">{numeral(article.trendingRank || 0)}</p>
                <div data-flip className="flip-card relative min-h-[240px]">
                  <div className="flip-face relative overflow-hidden rounded-[1.75rem] border border-[var(--rule)] bg-paper">
                    <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                      <SafeImage src={article.image?.src} alt={article.image?.alt || ""} category={article.categoryLabel} ratio="aspect-[4/3] md:aspect-auto md:h-full" sizes="220px" />
                      <div className="p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">{article.categoryLabel}</p>
                        <h3 className="display mt-2 text-3xl">{article.title}</h3>
                        <p className="summary-static mt-3 text-ink-soft">{article.summary}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border border-[var(--rule)] bg-ink p-6 text-paper">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-saffron">{article.categoryLabel}</p>
                    <p className="display text-3xl">{article.summary}</p>
                    <Link href={`/article/${article.slug}`} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-saffron">
                      Read the piece <Arrow />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
