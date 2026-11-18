import Link from "next/link";
import { breaking } from "@/content/site.config";

const angle = 360 / breaking.length;
const radius = 72;

export function BreakingBar() {
  return (
    <section className="border-b border-[var(--rule)]" aria-label="Breaking">
      <div className="desk flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
        <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ember">02 — Breaking</p>
        <div className="drum-window min-w-0 flex-1">
          <div className="drum">
            {breaking.map((item, index) => (
              <p
                key={item.slug}
                style={{ transform: `rotateX(${index * angle}deg) translateZ(${radius}px)` }}
              >
                <Link href={`/article/${item.slug}`} className="truncate text-[clamp(1.05rem,2vw,1.45rem)]">
                  {item.text}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
