import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-9 w-9", className)} fill="none" aria-hidden="true">
      <path
        className="logo-draw"
        pathLength={100}
        d="M14 12h26.5L50 21.5V50a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        className="logo-draw"
        pathLength={100}
        d="M40.5 12v8.2a1.6 1.6 0 0 0 1.6 1.6H50"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M43.2 16.2 47.2 20.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="45.2" cy="18.2" r="2.15" stroke="currentColor" strokeWidth="1.1" />
      <path d="M45.2 16.3v3.8M43.3 18.2h3.8" stroke="currentColor" strokeWidth="0.8" />
      <path d="M22 33h13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M22 39.5h20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M22 46h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M35.5 46h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  variant = "full",
  className,
}: {
  variant?: "full" | "mark" | "stacked";
  className?: string;
}) {
  if (variant === "mark") {
    return <Mark className={className} />;
  }

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center gap-2 text-ink", className)}>
        <Mark className="h-12 w-12" />
        <span className="display text-2xl">Emberline</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">Evening desk</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5 text-ink", className)}>
      <Mark />
      <span className="min-w-0">
        <span className="display block text-[1.35rem] leading-none">Emberline</span>
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-ink-soft">Evening desk</span>
      </span>
    </span>
  );
}
