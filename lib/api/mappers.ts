import { getCategory } from "@/content/site.config";
import type { Article, SearchHit } from "@/lib/types";
import type { ApiArticle, ApiList, ApiMedia } from "@/lib/api/raw";

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Article mapper: missing ${field}`);
  }
  return value;
}

function mapMedia(media: ApiMedia | null): Article["image"] {
  if (!media) return null;
  return {
    src: requiredString(media.src, "media.src"),
    alt: requiredString(media.alt, "media.alt"),
    width: typeof media.width === "number" ? media.width : 1600,
    height: typeof media.height === "number" ? media.height : 1067,
    credit: media.credit || "Unsplash",
  };
}

/**
 * The only place that knows the wire format.
 * Switching APIs means editing this file and lib/api/endpoints.ts.
 */
export function mapApiArticle(raw: ApiArticle): Article {
  const slug = requiredString(raw.section_slug, "section_slug");
  const known = getCategory(slug);

  return {
    id: requiredString(raw.uuid, "uuid"),
    slug: requiredString(raw.slug, "slug"),
    title: requiredString(raw.headline, "headline"),
    dek: requiredString(raw.dek, "dek"),
    summary: requiredString(raw.summary, "summary"),
    body: requiredString(raw.body_markdown, "body_markdown"),
    category: slug,
    categoryLabel: known?.name ?? requiredString(raw.section_name, "section_name"),
    categoryNumeral: known?.numeral ?? "—",
    author: requiredString(raw.byline, "byline"),
    publishedAt: requiredString(raw.published_at, "published_at"),
    updatedAt: raw.updated_at || raw.published_at,
    image: mapMedia(raw.media),
    featured: Boolean(raw.flags?.featured),
    trendingRank: typeof raw.trending_rank === "number" ? raw.trending_rank : null,
    editorsPick: Boolean(raw.flags?.editors_pick),
    photoStory: Boolean(raw.flags?.photo_story),
    readingMinutes: typeof raw.reading_minutes === "number" ? raw.reading_minutes : 4,
    deskOrder: typeof raw.desk_order === "number" ? raw.desk_order : 0,
  };
}

export function mapApiArticleList(raw: ApiList): Article[] {
  if (!raw || !Array.isArray(raw.items)) {
    throw new Error("Article mapper: expected an items array");
  }
  return raw.items.map(mapApiArticle);
}

export function toSearchHit(article: Article): SearchHit {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category,
    categoryLabel: article.categoryLabel,
    publishedAt: article.publishedAt,
    imageSrc: article.image?.src ?? null,
    imageAlt: article.image?.alt ?? article.title,
  };
}
