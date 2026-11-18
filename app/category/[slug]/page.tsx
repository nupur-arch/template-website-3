import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/content/site.config";
import { EmptyState } from "@/components/ui/SectionHeading";
import { SafeImage } from "@/components/ui/SafeImage";
import { getArticlesByCategory } from "@/services/articles";

type Params = { slug: string };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Section" };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const articles = await getArticlesByCategory(slug);

  return (
    <div className="desk py-10 sm:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">{category.numeral} — Section</p>
      <h1 className="display mt-3 text-[clamp(3.2rem,8vw,6.4rem)]">{category.name}</h1>
      <p className="mt-4 max-w-xl text-xl text-ink-soft">{category.description}</p>
      {articles.length === 0 ? (
        <div className="mt-10">
          <EmptyState kicker={category.numeral} title="This desk is quiet." body="No stories are filed in this section yet." />
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className={`overflow-hidden rounded-[1.75rem] border border-[var(--rule)] ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <SafeImage
                src={article.image?.src}
                alt={article.image?.alt || ""}
                category={article.categoryLabel}
                ratio={index === 0 ? "aspect-[16/8]" : "aspect-[16/10]"}
                sizes={index === 0 ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 40vw"}
              />
              <span className="block p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ember">{article.author}</span>
                <span className="display mt-2 block text-[clamp(1.7rem,3vw,2.6rem)]">{article.title}</span>
                <span className="mt-2 block max-w-2xl text-ink-soft">{article.dek}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
