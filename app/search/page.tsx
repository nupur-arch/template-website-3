import Link from "next/link";
import { EmptyState } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatDateline } from "@/lib/format";
import { searchArticles } from "@/services/search";

export const metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const result = query.length >= 2 ? await searchArticles(query) : null;

  return (
    <div className="desk py-10 sm:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">Search the desk</p>
      <h1 className="display mt-3 text-[clamp(3rem,7vw,5.5rem)]">What are you looking for?</h1>
      <form action="/search" className="mt-6 flex max-w-xl gap-2">
        <label className="sr-only" htmlFor="q">
          Search
        </label>
        <input
          id="q"
          name="q"
          defaultValue={query}
          minLength={2}
          required
          placeholder="At least two letters"
          className="min-w-0 flex-1 border-b border-[var(--rule)] bg-transparent py-3 text-xl outline-none"
        />
        <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-paper">
          Search
        </button>
      </form>
      {query.length < 2 ? <p className="mt-8 text-ink-soft">Type at least two letters. The wire does not guess from a single mark.</p> : null}
      {result && result.total === 0 ? (
        <div className="mt-8">
          <EmptyState kicker="00" title={`Nothing for “${query}”.`} body="Try a desk name, a place, or a word from a headline." />
        </div>
      ) : null}
      {result && result.total > 0 ? (
        <div className="mt-10 space-y-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">{result.total} on the wire</p>
          {result.groups.map((group) => (
            <section key={group.category}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">{group.categoryLabel}</h2>
              <ul className="mt-3 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                {group.hits.map((hit) => (
                  <li key={hit.id}>
                    <Link href={`/article/${hit.slug}`} className="flex items-center gap-4 py-3">
                      <SafeImage src={hit.imageSrc} alt="" category={hit.categoryLabel} ratio="" className="h-16 w-24 shrink-0 rounded-xl" sizes="96px" />
                      <span>
                        <span className="display block text-2xl">{hit.title}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{formatDateline(hit.publishedAt)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
