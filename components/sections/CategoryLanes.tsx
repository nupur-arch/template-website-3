"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { categories } from "@/content/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { ensureSmoothScroll } from "@/lib/smooth-scroll";
import type { Article } from "@/lib/types";

export default function CategoryLanes({ articles }: { articles: Article[] }) {
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
        const columns = Array.from(root.querySelectorAll<HTMLElement>("[data-lane]"));
        const shifts = [-8, 10, -6];
        columns.forEach((column, index) => {
          gsap.to(column, {
            yPercent: shifts[index] ?? 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
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

  const lanes = [0, 1, 2].map((lane) => articles.filter((_, index) => index % 3 === lane).slice(0, 4));

  return (
    <section ref={rootRef} className="overflow-hidden border-y border-[var(--rule)] py-16 sm:py-20">
      <div className="desk">
        <SectionHeading numeral="06" kicker="Sections" title="Eight desks, three lanes." aside="The columns drift against each other. Pick a desk, or stay for the slant." />
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="rounded-full border border-[var(--rule)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]">
              {category.numeral} {category.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="lane-grid desk mt-10 grid gap-5 pb-12 pt-4 md:grid-cols-3 md:gap-6">
        {lanes.map((lane, index) => (
          <div key={index} data-lane className={`flex flex-col gap-5 ${index === 0 ? "lg:-rotate-[1.5deg]" : index === 1 ? "lg:translate-y-16 lg:rotate-[1deg]" : "lg:-rotate-[1deg]"}`}>
            {lane.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group overflow-hidden rounded-[1.6rem] border border-[var(--rule)] bg-paper shadow-[var(--shadow)]">
                <SafeImage src={article.image?.src} alt={article.image?.alt || ""} category={article.categoryLabel} ratio="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 30vw" />
                <span className="block p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember">
                    {article.categoryNumeral} {article.categoryLabel}
                  </span>
                  <span className="display mt-2 block text-[clamp(1.35rem,2vw,1.85rem)] leading-[1.02]">{article.title}</span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
