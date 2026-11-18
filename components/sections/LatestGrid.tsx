"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { EmptyState, SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Article } from "@/lib/types";

function span(index: number) {
  if (index === 0) return "md:col-span-7";
  if (index === 1) return "md:col-span-5";
  if (index < 5) return "md:col-span-4";
  return "md:col-span-3";
}

function TiltCard({ article, className }: { article: Article; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);

  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const card = ref.current;
    if (!card) return;
    card.classList.remove("is-reset");
    const bounds = card.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    card.style.transform = `rotateX(${((0.5 - py) * 9).toFixed(2)}deg) rotateY(${((px - 0.5) * 11).toFixed(2)}deg)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.transform = `translate3d(${((px - 0.5) * 36).toFixed(1)}%, ${((py - 0.5) * 36).toFixed(1)}%, 48px)`;
    }
  }

  function leave() {
    const card = ref.current;
    if (!card) return;
    card.classList.add("is-reset");
    card.style.transform = "";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }

  return (
    <Link
      ref={ref}
      href={`/article/${article.slug}`}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`tilt-card relative block overflow-hidden rounded-[1.75rem] border border-[var(--rule)] bg-paper-deep ${className}`}
    >
      <span ref={glareRef} className="glare pointer-events-none absolute inset-0" />
      <SafeImage
        src={article.image?.src}
        alt={article.image?.alt || ""}
        category={article.categoryLabel}
        ratio={className.includes("col-span-7") ? "aspect-[16/11]" : "aspect-[16/10]"}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span className="tilt-pop block p-4">
        <span className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">{article.categoryLabel}</span>
          <Arrow />
        </span>
        <span className="display mt-2 block text-[clamp(1.4rem,2vw,2rem)] leading-[0.95]">{article.title}</span>
      </span>
    </Link>
  );
}

export default function LatestGrid({ articles }: { articles: Article[] }) {
  return (
    <section className="desk py-16 sm:py-20">
      <SectionHeading numeral="03" kicker="Latest" title="Just off the spike." aside="A loose grid. The first plate is the one the desk would not hold." />
      {articles.length === 0 ? (
        <div className="mt-8">
          <EmptyState kicker="03" title="No fresh copy." body="The latest file is empty. Check back after the next edition." />
        </div>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-12">
          {articles.map((article, index) => (
            <TiltCard key={article.id} article={article} className={span(index)} />
          ))}
        </div>
      )}
    </section>
  );
}
