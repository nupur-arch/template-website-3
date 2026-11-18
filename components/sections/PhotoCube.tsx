"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { EmptyState, SectionHeading } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { ensureSmoothScroll } from "@/lib/smooth-scroll";
import type { Article } from "@/lib/types";

const turns = [0, 90, 180, 270];

export default function PhotoCube({ articles }: { articles: Article[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let dead = false;
    let revert: (() => void) | undefined;

    void (async () => {
      await ensureSmoothScroll();
      if (dead || !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);
      const cube = section.querySelector<HTMLElement>("[data-cube]");
      const faces = Array.from(section.querySelectorAll<HTMLElement>("[data-face]"));
      if (!cube || faces.length < 2) return;

      const layout = () => {
        const depth = cube.offsetWidth / 2;
        faces.forEach((face, index) => {
          face.style.transform = `rotateY(${turns[index] ?? 0}deg) translateZ(${depth}px)`;
        });
      };

      const ctx = gsap.context(() => {
        layout();
        const spin = Math.max(faces.length - 1, 1) * 90;
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            cube.style.transform = `rotateY(${-self.progress * spin}deg)`;
          },
        });
        cube.dataset.ready = "true";
      }, section);

      const onResize = () => layout();
      window.addEventListener("resize", onResize);
      revert = () => {
        window.removeEventListener("resize", onResize);
        ctx.revert();
      };
    })();

    return () => {
      dead = true;
      revert?.();
    };
  }, [articles.length]);

  return (
    <section ref={sectionRef} className="photo-stage desk py-16 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
      <SectionHeading numeral="07" kicker="Photo story" title="Four faces, one turn." aside="Scroll the prism. Each face is a story with a plate." />
      {articles.length === 0 ? (
        <div className="mt-8">
          <EmptyState kicker="07" title="No plates in the cube." body="The photo desk has not filed a story." />
        </div>
      ) : (
        <div className="cube-scene mt-8 grid place-items-center">
          <div data-cube className="cube">
            {articles.slice(0, 4).map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} data-face className="cube-face border border-[var(--rule)] bg-paper">
                <SafeImage src={article.image?.src} alt={article.image?.alt || ""} category={article.categoryLabel} ratio="h-[46%] w-full" className="rounded-none" sizes="(max-width: 1024px) 100vw, 520px" />
                <span className="block p-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">{article.categoryLabel}</span>
                  <span className="display mt-2 block text-3xl">{article.title}</span>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                    Open <Arrow />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
