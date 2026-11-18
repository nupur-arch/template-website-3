"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { categories, site } from "@/content/site.config";
import { Logo } from "@/components/logo/Logo";
import { Stamp } from "@/components/stamp/Stamp";

export function Footer() {
  const stageRef = useRef<HTMLDivElement>(null);

  function move(event: MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
    stage.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      layer.style.transform = `translate3d(${(x * depth * 14).toFixed(2)}px, ${(y * depth * 10).toFixed(2)}px, 0)`;
    });
  }

  function leave() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.transform = "";
    stage.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      layer.style.transform = `translate3d(${depth * 5}px, ${depth * 6}px, 0)`;
    });
  }

  return (
    <footer className="overflow-hidden border-t border-[var(--rule)]">
      <div className="desk py-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Logo />
          <Stamp className="h-28 w-28" />
        </div>
        <div
          ref={stageRef}
          onMouseMove={move}
          onMouseLeave={leave}
          className="wordmark-stage relative mt-10"
          aria-hidden="true"
        >
          <p data-depth="2" className="wordmark absolute left-0 top-0 text-saffron opacity-80" style={{ transform: "translate3d(10px, 12px, 0)" }}>
            Emberline
          </p>
          <p data-depth="1" className="wordmark absolute left-0 top-0 text-ember" style={{ transform: "translate3d(5px, 6px, 0)" }}>
            Emberline
          </p>
          <p data-depth="0" className="wordmark relative text-ink">
            Emberline
          </p>
        </div>
        <p className="sr-only">Emberline</p>
        <div className="mt-10 grid gap-8 border-t border-[var(--rule)] pt-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-3xl">{site.tagline}</p>
            <p className="mt-3 max-w-sm text-ink-soft">
              {site.volume} · {site.edition}. A folded proof, a register mark, and twenty stories on the cylinder.
            </p>
          </div>
          <nav aria-label="Footer sections" className="grid grid-cols-2 gap-x-4 gap-y-2">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="font-mono text-[11px] uppercase tracking-[0.14em]">
                {category.numeral} {category.name}
              </Link>
            ))}
          </nav>
          <nav aria-label="Desk" className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            <Link href="/search">Search</Link>
            <Link href="/about">About the desk</Link>
            <Link href="/brand">Brand</Link>
            <Link href="/#evening-list">Evening list</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
