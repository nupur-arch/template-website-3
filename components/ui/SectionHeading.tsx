export function SectionHeading({
  numeral,
  kicker,
  title,
  aside,
}: {
  numeral: string;
  kicker: string;
  title: string;
  aside?: string;
}) {
  const words = title.split(" ");
  return (
    <header className="max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
        {numeral}
        <span className="text-ink-soft"> — {kicker}</span>
      </p>
      <h2 className="section-title mt-3 text-[clamp(2.5rem,6.4vw,5.4rem)]">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="word-reveal" style={{ animationDelay: `${index * 70}ms` }}>
            {word}{" "}
          </span>
        ))}
      </h2>
      {aside ? <p className="mt-4 max-w-xl text-ink-soft">{aside}</p> : null}
    </header>
  );
}

export function EmptyState({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[var(--rule)] px-6 py-14 sm:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">{kicker}</p>
      <h2 className="display mt-3 text-4xl">{title}</h2>
      <p className="mt-3 max-w-md text-ink-soft">{body}</p>
    </div>
  );
}

export function StorySkeleton() {
  return (
    <div className="animate-pulse rounded-[1.75rem] border border-[var(--rule)] p-4">
      <div className="aspect-[16/10] rounded-[1.2rem] bg-paper-deep" />
      <div className="mt-4 h-3 w-24 rounded-full bg-paper-deep" />
      <div className="mt-3 h-8 w-4/5 rounded-full bg-paper-deep" />
      <div className="mt-2 h-8 w-2/3 rounded-full bg-paper-deep" />
    </div>
  );
}
