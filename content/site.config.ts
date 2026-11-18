export const site = {
  name: "Emberline",
  desk: "Evening desk",
  tagline: "The wire, still warm.",
  description:
    "Emberline is an evening news desk: twenty stories on a cylinder, eight sections, and a register mark on the fold.",
  url: "https://emberline.example",
  edition: "Wednesday 18 November 2026",
  volume: "Vol. 01",
  stamp: "LIVE • 20 STORIES • LIVE • 20 STORIES • ",
} as const;

export const categories = [
  {
    slug: "world",
    name: "World",
    numeral: "01",
    description: "Ports, borders, night trains, and the hours in between.",
  },
  {
    slug: "politics",
    name: "Politics",
    numeral: "02",
    description: "Votes, mayors, and the clauses that survive the night.",
  },
  {
    slug: "business",
    name: "Business",
    numeral: "03",
    description: "Mills, markets, and the shops that refuse to vanish.",
  },
  {
    slug: "culture",
    name: "Culture",
    numeral: "04",
    description: "Scores, murals, kitchens, and the rooms that keep them.",
  },
  {
    slug: "science",
    name: "Science",
    numeral: "05",
    description: "Drills, moths, footnotes, and fields seen from above.",
  },
  {
    slug: "climate",
    name: "Climate",
    numeral: "06",
    description: "Heat, rivers, salt, and the plans written after August.",
  },
  {
    slug: "sport",
    name: "Sport",
    numeral: "07",
    description: "Marathons, velodromes, and the mail a keeper answers.",
  },
  {
    slug: "opinion",
    name: "Opinion",
    numeral: "08",
    description: "Arguments, letters, and a case for reading slower.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const breaking = [
  { text: "Strait reopens at dawn after nine silent days", slug: "ports-reopen-after-a-nine-day-halt" },
  { text: "Housing bill clears in a vote after midnight", slug: "the-late-night-vote-that-rewrote-housing" },
  { text: "Copper's quiet spike reaches the factory floor", slug: "coppers-quiet-spike" },
  { text: "Night trains return to a finished route", slug: "night-trains-return" },
  { text: "A street cooled without planting a tree", slug: "cooling-a-street-without-a-tree" },
  { text: "River towns redraw one flood line at a time", slug: "river-towns-redraw-the-map" },
  { text: "Lost film scores find a room of their own", slug: "lost-film-scores-find-a-room" },
  { text: "The glacier drill comes back with another century", slug: "the-glacier-drill-and-a-different-century" },
] as const;

export const deskStats = [
  { label: "Stories on the cylinder", value: 20 },
  { label: "Desks filing tonight", value: 8 },
  { label: "Correspondents", value: 36 },
  { label: "Hour wire", value: 24, suffix: "h" },
] as const;

export const flapLines = [
  "STRAIT REOPENS AT DAWN",
  "HOUSING BILL CLEARS",
  "COPPER HITS THE FLOOR",
  "NIGHT TRAINS RETURN",
] as const;

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}
