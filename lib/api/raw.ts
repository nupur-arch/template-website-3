export type ApiMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
};

export type ApiArticle = {
  uuid: string;
  slug: string;
  headline: string;
  dek: string;
  summary: string;
  body_markdown: string;
  section_slug: string;
  section_name: string;
  byline: string;
  published_at: string;
  updated_at: string;
  media: ApiMedia | null;
  flags: {
    featured: boolean;
    editors_pick: boolean;
    photo_story: boolean;
  };
  trending_rank: number | null;
  reading_minutes: number;
  desk_order: number;
};

export type ApiList = {
  items: ApiArticle[];
};

export type ApiItem = {
  item: ApiArticle;
};
