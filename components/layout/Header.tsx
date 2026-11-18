import Link from "next/link";
import { categories, site } from "@/content/site.config";
import { Logo } from "@/components/logo/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SearchDialog } from "@/components/search/SearchDialog";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-[1380px] items-center gap-3 rounded-[1.35rem] border border-[var(--rule)] bg-paper/90 px-3 py-2 shadow-[var(--shadow)] backdrop-blur-xl sm:px-4">
        <Link href="/" aria-label="Emberline home" className="shrink-0 rounded-xl px-1 py-1">
          <Logo />
        </Link>
        <span className="hidden h-8 w-px bg-[var(--rule)] lg:block" />
        <p className="hidden min-w-0 items-center gap-2 text-sm lg:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-ember shadow-[0_0_0_4px_rgba(255,91,46,0.12)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">{site.volume} · Live edition</span>
        </p>
        <nav className="mx-auto hidden items-center rounded-full border border-[var(--rule)] bg-paper-deep/60 p-1 xl:flex" aria-label="Sections">
          {categories.slice(0, 5).map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="block rounded-full px-3 py-2 transition-colors hover:bg-paper">{category.name}</span>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchDialog />
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
