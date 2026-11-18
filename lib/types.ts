export type ArticleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  summary: string;
  body: string;
  category: string;
  categoryLabel: string;
  categoryNumeral: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: ArticleImage | null;
  featured: boolean;
  trendingRank: number | null;
  editorsPick: boolean;
  photoStory: boolean;
  readingMinutes: number;
  deskOrder: number;
};

export type SearchHit = {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  publishedAt: string;
  imageSrc: string | null;
  imageAlt: string;
};

export type SearchGroup = {
  category: string;
  categoryLabel: string;
  hits: SearchHit[];
};

export type SearchResponse = {
  query: string;
  total: number;
  groups: SearchGroup[];
};
