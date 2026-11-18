import { Logo } from "@/components/logo/Logo";
import { Stamp } from "@/components/stamp/Stamp";
import { site } from "@/content/site.config";

export const metadata = { title: "Brand" };

const swatches = [
  { name: "Cream paper", value: "#F5EDE0" },
  { name: "Ink", value: "#141210" },
  { name: "Ember", value: "#FF5B2E" },
  { name: "Saffron", value: "#FFB627" },
];

export default function BrandPage() {
  return (
    <div className="desk py-10 sm:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">The mark</p>
      <h1 className="display mt-3 text-[clamp(3rem,7vw,6rem)]">A folded proof.</h1>
      <p className="mt-4 max-w-2xl text-xl text-ink-soft">
        Emberline&apos;s mark is a page with the corner turned down. The small crosshair on the crease is a printer&apos;s register mark: the one detail that says this is a desk, not a logo from a kit. No gradient. One colour at a time.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-[var(--rule)] p-8">
          <Logo variant="full" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Full</p>
        </div>
        <div className="rounded-[1.75rem] border border-[var(--rule)] p-8">
          <Logo variant="stacked" />
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Stacked</p>
        </div>
        <div className="flex flex-col items-start rounded-[1.75rem] border border-[var(--rule)] p-8">
          <Logo variant="mark" className="h-16 w-16" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Mark</p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.75rem] bg-ink p-8 text-paper">
          <Logo variant="mark" className="h-14 w-14 text-paper" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em]">On ink</p>
        </div>
        <div className="rounded-[1.75rem] bg-ember p-8 text-white">
          <Logo variant="mark" className="h-14 w-14 text-white" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em]">Ember</p>
        </div>
        <div className="rounded-[1.75rem] bg-saffron p-8 text-ink">
          <Logo variant="mark" className="h-14 w-14" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em]">Saffron</p>
        </div>
        <div className="flex items-center justify-center rounded-[1.75rem] border border-[var(--rule)] p-8">
          <Stamp />
        </div>
      </div>
      <h2 className="display mt-14 text-4xl">Palette</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-4">
        {swatches.map((swatch) => (
          <li key={swatch.value} className="overflow-hidden rounded-[1.4rem] border border-[var(--rule)]">
            <div className="h-20" style={{ background: swatch.value }} />
            <p className="px-3 py-3 font-mono text-[11px] uppercase tracking-[0.14em]">
              {swatch.name}
              <span className="mt-1 block text-ink-soft">{swatch.value}</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-2xl text-ink-soft">
        {site.name} is set in Fraunces, Familjen Grotesk, and IBM Plex Mono. The stamp reads “{site.stamp.trim()}” and turns in the hero and the footer. The favicon is the same folded page, drawn heavier so it survives at 16 pixels.
      </p>
    </div>
  );
}
