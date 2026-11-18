"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/content/site.config";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="rounded-full border border-[var(--rule)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
        aria-expanded={open}
        aria-controls="section-drawer"
        onClick={() => setOpen(true)}
      >
        Sections
      </button>
      {open ? (
        <div className="fixed inset-0 z-[75] bg-ink/50" role="presentation">
          <button type="button" className="absolute inset-0" aria-label="Close sections" onClick={() => setOpen(false)} />
          <nav
            id="section-drawer"
            data-lenis-prevent
            aria-label="Sections"
            className="absolute right-0 top-0 flex h-full w-[min(100%,420px)] flex-col gap-2 overflow-y-auto bg-paper p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">08 desks</p>
              <button type="button" className="font-mono text-[11px] uppercase tracking-[0.16em]" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--rule)] py-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">{category.numeral}</span>
                <span className="display mt-1 block text-4xl">{category.name}</span>
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-3">
              <ThemeToggle />
              <Link href="/brand" onClick={() => setOpen(false)} className="font-mono text-[11px] uppercase tracking-[0.16em]">
                Brand
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
