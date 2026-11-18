import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { ShareRow } from "@/components/article/ShareRow";
import { SafeImage } from "@/components/ui/SafeImage";
import { site } from "@/content/site.config";
import { formatClock, formatDateline } from "@/lib/format";
import { getAllArticles, getArticle, getRelatedArticles } from "@/services/articles";

type Params = { slug: string };

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Story not found" };
  return {
    title: article.title,
    description: article.dek,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: article.image ? [{ url: article.image.src, alt: article.image.alt }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const related = await getRelatedArticles(article);
  const url = `${site.url}/article/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "NewsMediaOrganization", name: site.name, url: site.url },
    mainEntityOfPage: url,
    articleSection: article.categoryLabel,
    image: article.image?.src ? [article.image.src] : undefined,
  };

  return (
    <article className="desk py-8 sm:py-12">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/category/${article.category}`}>{article.categoryLabel}</Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{article.title}</span>
      </nav>
      <header className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
            {article.categoryNumeral} — {article.categoryLabel}
          </p>
          <h1 className="display mt-3 text-[clamp(2.8rem,7vw,6rem)]">{article.title}</h1>
          <p className="mt-5 max-w-2xl font-display text-2xl italic leading-snug text-ink-soft">{article.dek}</p>
        </div>
        <div className="lg:col-span-4 lg:pt-16">
          <p className="text-lg">{article.author}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {formatDateline(article.publishedAt)} · {formatClock(article.publishedAt)} UTC
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">{article.readingMinutes} min read</p>
          <div className="mt-4">
            <ShareRow title={article.title} slug={article.slug} />
          </div>
        </div>
      </header>
      <SafeImage
        src={article.image?.src}
        alt={article.image?.alt || article.title}
        category={article.categoryLabel}
        ratio="aspect-[16/9]"
        priority
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="mt-8 rounded-[1.75rem]"
      />
      {article.image ? <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Plate · {article.image.credit}</p> : null}
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <ArticleBody markdown={article.body} />
        </div>
      </div>
      <aside className="mt-16 border-t border-[var(--rule)] pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">Related on the desk</p>
        {related.length === 0 ? <p className="mt-4 text-ink-soft">No companion pieces in this section yet.</p> : null}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.id} href={`/article/${item.slug}`} className="rounded-[1.5rem] border border-[var(--rule)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember">{item.categoryLabel}</p>
              <p className="display mt-2 text-2xl">{item.title}</p>
            </Link>
          ))}
        </div>
      </aside>
    </article>
  );
}
