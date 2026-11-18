"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="rounded-full border border-[var(--rule)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="dark:hidden">Night desk</span>
      <span className="hidden dark:inline">Day desk</span>
    </button>
  );
}
