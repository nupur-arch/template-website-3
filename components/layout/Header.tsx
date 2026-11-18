import Link from "next/link";
import { categories, site } from "@/content/site.config";
import { Logo } from "@/components/logo/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SearchDialog } from "@/components/search/SearchDialog";

export function Header() {
  return (
    <header className="relative z-40 border-b border-[var(--rule)] bg-paper/90 backdrop-blur-md">
      <div className="desk flex items-center gap-3 py-3 lg:gap-5">
        <Link href="/" aria-label="Emberline home" className="shrink-0 rounded-sm">
          <Logo />
        </Link>
        <p className="hidden min-w-0 text-sm xl:block">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">{site.volume}</span>
          <span className="px-2 text-ink-soft">/</span>
          <span>{site.edition}</span>
        </p>
        <nav className="ml-auto hidden items-center gap-4 xl:flex" aria-label="Sections">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="font-mono text-[11px] uppercase tracking-[0.14em]">
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-0">
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
