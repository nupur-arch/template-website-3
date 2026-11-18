import { site } from "@/content/site.config";
import { cn } from "@/lib/cn";

export function Stamp({ className }: { className?: string }) {
  return (
    <div className={cn("stamp-spin h-24 w-24 text-ember", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="ember-stamp" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
        </defs>
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <text fill="currentColor" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "8.2px", letterSpacing: "1.6px" }}>
          <textPath href="#ember-stamp">{site.stamp}</textPath>
        </text>
        <text
          x="50"
          y="53"
          textAnchor="middle"
          fill="currentColor"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "13px" }}
        >
          20
        </text>
      </svg>
    </div>
  );
}
