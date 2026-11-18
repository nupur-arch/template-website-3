import { categories } from "@/content/site.config";
import { endpoints } from "@/lib/api/endpoints";
import { apiGet, useMockData } from "@/lib/api/client";
import { mapApiArticleList, toSearchHit } from "@/lib/api/mappers";
import type { ApiList } from "@/lib/api/raw";
import type { Article, SearchResponse } from "@/lib/types";
import { getAllArticles } from "@/services/articles";

function score(article: Article, query: string) {
  const haystack = `${article.title} ${article.dek} ${article.summary} ${article.author} ${article.categoryLabel}`.toLowerCase();
  const needle = query.toLowerCase();
  if (!haystack.includes(needle)) return 0;
  if (article.title.toLowerCase().startsWith(needle)) return 3;
  if (article.title.toLowerCase().includes(needle)) return 2;
  return 1;
}

function group(articles: Article[], query: string): SearchResponse {
  const ranked = articles
    .map((article) => ({ article, rank: score(article, query) }))
    .filter((item) => item.rank > 0)
    .sort((a, b) => b.rank - a.rank || a.article.deskOrder - b.article.deskOrder)
    .slice(0, 8)
    .map((item) => item.article);

  const groups = categories
    .map((category) => ({
      category: category.slug,
      categoryLabel: category.name,
      hits: ranked.filter((article) => article.category === category.slug).map(toSearchHit),
    }))
    .filter((groupItem) => groupItem.hits.length > 0);

  return { query, total: ranked.length, groups };
}

export async function searchArticles(query: string): Promise<SearchResponse> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return { query: trimmed, total: 0, groups: [] };

  if (useMockData()) {
    return group(await getAllArticles(), trimmed);
  }

  const payload = await apiGet<ApiList>(endpoints.search(trimmed));
  return group(mapApiArticleList(payload), trimmed);
}
