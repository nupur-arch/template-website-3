# Emberline build status

Palette: cream paper `#F5EDE0`, ink `#141210`, ember `#FF5B2E`, saffron `#FFB627`.
Hero: scroll-pinned 3D cylinder of 20 stories. Signature stamp: `LIVE • 20 STORIES •`.

## Done

- Foundation: tokens, Lenis + ScrollTrigger, header, search, logo, mock/API data layer.
- Hero cylinder, breaking drum, latest tilt, trending flip, editor stack, category lanes, photo cube, live board, envelope, footer wordmark.
- Article pages (markdown, progress, share, related, JSON-LD), category, search, brand, about.
- `yarn lint` and `yarn build` pass.

## Switch to a real API

Set `NEXT_PUBLIC_USE_MOCK=false` and `NEXT_PUBLIC_API_BASE_URL`. Edit only `lib/api/endpoints.ts` and `lib/api/mappers.ts`.
