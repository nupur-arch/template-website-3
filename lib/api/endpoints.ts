export const endpoints = {
  articles: "/v1/articles",
  featured: "/v1/articles?featured=true&limit=20",
  latest: "/v1/articles?sort=published_at&limit=9",
  trending: "/v1/articles?trending=true&limit=10",
  editors: "/v1/articles?editors_pick=true",
  photos: "/v1/articles?photo_story=true",
  article: (slug: string) => `/v1/articles/${encodeURIComponent(slug)}`,
  category: (slug: string) => `/v1/sections/${encodeURIComponent(slug)}/articles`,
  related: (slug: string) => `/v1/articles/${encodeURIComponent(slug)}/related`,
  search: (query: string) => `/v1/search?q=${encodeURIComponent(query)}`,
} as const;
