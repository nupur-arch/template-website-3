import { categories } from "@/content/site.config";
import { endpoints } from "@/lib/api/endpoints";
import { apiGet, ContentError, useMockData } from "@/lib/api/client";
import { mapApiArticle, mapApiArticleList } from "@/lib/api/mappers";
import type { ApiArticle, ApiItem, ApiList } from "@/lib/api/raw";
import type { Article } from "@/lib/types";

async function fromMock(filter: (article: ApiArticle) => boolean) {
  const { mockApiArticles } = await import("@/mocks/articles");
  return mockApiArticles.filter(filter).map(mapApiArticle);
}

async function loadList(path: string, filter: (article: ApiArticle) => boolean) {
  try {
    if (useMockData()) return await fromMock(filter);
    return mapApiArticleList(await apiGet<ApiList>(path));
  } catch (error) {
    if (error instanceof ContentError) throw error;
    throw new ContentError(error instanceof Error ? error.message : "The desk could not be reached.");
  }
}

let cached: Promise<Article[]> | null = null;

export function getAllArticles() {
  if (!cached) {
    cached = loadList(endpoints.articles, () => true);
  }
  return cached;
}

export async function getFeaturedArticles() {
  const articles = useMockData()
    ? await loadList(endpoints.featured, (article) => article.flags.featured)
    : await loadList(endpoints.featured, () => true);
  const featured = articles
    .filter((article) => article.featured)
    .sort((a, b) => a.deskOrder - b.deskOrder)
    .slice(0, 20);
  if (useMockData() && featured.length !== 20) {
    throw new ContentError(`Expected 20 featured stories, found ${featured.length}.`);
  }
  return featured;
}

export async function getLatestArticles() {
  const articles = await loadList(endpoints.latest, () => true);
  return articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, 9);
}

export async function getTrendingArticles() {
  const articles = await loadList(endpoints.trending, (article) => article.trending_rank !== null);
  return articles
    .filter((article) => article.trendingRank !== null)
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0))
    .slice(0, 10);
}

export async function getEditorsPicks() {
  const articles = await loadList(endpoints.editors, (article) => article.flags.editors_pick);
  return articles
    .filter((article) => article.editorsPick)
    .sort((a, b) => a.deskOrder - b.deskOrder);
}

export async function getPhotoStories() {
  const articles = await loadList(endpoints.photos, (article) => article.flags.photo_story);
  return articles
    .filter((article) => article.photoStory)
    .sort((a, b) => a.deskOrder - b.deskOrder);
}

export async function getArticlesByCategory(slug: string) {
  const known = categories.some((category) => category.slug === slug);
  if (!known) return [];
  const articles = await loadList(endpoints.category(slug), (article) => article.section_slug === slug);
  return articles
    .filter((article) => article.category === slug)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getArticle(slug: string) {
  try {
    if (useMockData()) {
      const articles = await getAllArticles();
      return articles.find((article) => article.slug === slug) ?? null;
    }
    const payload = await apiGet<ApiItem>(endpoints.article(slug));
    return mapApiArticle(payload.item);
  } catch (error) {
    if (error instanceof ContentError && /404/.test(error.message)) return null;
    if (error instanceof ContentError) throw error;
    throw new ContentError(error instanceof Error ? error.message : "The story could not be opened.");
  }
}

export async function getRelatedArticles(article: Article) {
  if (!useMockData()) {
    try {
      const related = await loadList(endpoints.related(article.slug), () => false);
      return related.filter((item) => item.slug !== article.slug).slice(0, 3);
    } catch {
      // Fall through to a local match if the related endpoint is quiet.
    }
  }
  const articles = await getAllArticles();
  return articles
    .filter((item) => item.category === article.category && item.slug !== article.slug)
    .slice(0, 3);
}
