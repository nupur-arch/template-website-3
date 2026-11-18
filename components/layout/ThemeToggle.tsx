"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="rounded-full border border-[var(--rule)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="inline-flex items-center gap-2 dark:hidden"><MoonIcon /><span className="hidden lg:inline">Night desk</span></span>
      <span className="hidden items-center gap-2 dark:inline-flex"><SunIcon /><span className="hidden lg:inline">Day desk</span></span>
    </button>
  );
}
