# Emberline build status

Last audited: 2026-11-18. Source uses root `app/` and `components/` directories (not `src/`).

| Spec item | Status | Inventory / evidence |
| --- | --- | --- |
| Foundation / Next 15 / TypeScript / Tailwind | Complete | App Router, typed source, Tailwind 4, Yarn scripts and editorial layout are present. |
| Design tokens / light + dark themes | Complete | Required palette variables, `next-themes` toggle and dark overrides. |
| Lenis + ScrollTrigger | Complete | Dynamically loaded, wired to ScrollTrigger and GSAP ticker; disabled on touch/coarse pointers and reduced motion; prevent attributes on scroll overlays. |
| Header / responsive navigation | Complete | Edition metadata, categories, theme control, accessible mobile drawer. |
| Search | Complete | 300 ms debounce, AbortController, two-character minimum, grouped highlighted suggestions, recents, keyboard navigation, skeleton/empty/error states, mobile sheet, shortcut, API route and `/search`. |
| Logo / favicon / brand page | Complete | Custom folded-proof SVG in full/mark/stacked variants, dark/single-colour use, draw-in motion, generated favicon and `/brand`. |
| Data layer | Complete | Normalized types, service-only access, mock/API switch, isolated endpoints/mappers and typed search. |
| Mock content / 20 hero stories | Complete | Exactly 20 featured stories and at least three missing-image cases. |
| SafeImage / branded fallbacks | Complete | All editorial images use fixed-ratio SafeImage with failure handling, paper texture, mark and category. |
| Hero 3D cylinder | Complete | Twenty server-rendered links, full cards, counter/progress, pinned desktop cylinder, mobile snap row and reduced-motion row. |
| 02 Breaking bar | Complete | Pausable CSS 3D text drum with linked headlines and reduced-motion list. |
| 03 Latest grid | Complete | Asymmetric grid with pointer-only 3D tilt, glare and Z-raised copy. |
| 04 Trending top 10 | Complete | Ranked cards tilt/shrink and flip to summaries; static mobile/reduced-motion summaries. |
| 05 Editor's picks | Complete | Sticky scroll-driven card stack and responsive fallback. |
| 06 Category showcase | Complete | Tilted opposing scroll lanes with category links and fallback. |
| 07 Photo story | Complete | Scroll-rotated CSS 3D cube and stacked fallback. |
| 08 Live / stats | Complete | Split-flap headlines and in-view count-up statistics. |
| 09 Newsletter | Complete | In-view 3D envelope/letter reveal and accessible form presentation. |
| 10 Footer | Complete | Pointer-reactive extruded wordmark, depth layers, navigation and reused signature stamp. |
| Route transitions / section headings | Complete | Reduced-motion-aware curtain/3D route transition and perspective word reveals. |
| Article page | Complete | Sanitized Markdown/GFM, links, images/lists/bold, progress, share, related, breadcrumbs, metadata and NewsArticle JSON-LD. |
| Category / sports pages | Complete | Static category routes include the Sport desk; no separate sports product page is specified. |
| Loading / empty / error / 404 | Complete | Global/article skeletons and contextual empty, error and not-found states. |
| Markdown links | Complete | Internal Next links and safe external links with `noopener noreferrer`. |
| Responsiveness | Complete | Layouts cover 320–1440 px with mobile alternatives and responsive typography. |
| Accessibility / performance | Complete | Focus styles, skip link, labels, reduced motion, hover queries, dynamic GSAP imports, fixed image ratios and no render-time randomness. |
| Validation | Complete | `yarn lint` and `yarn build` both pass after replacing the incompatible SVG metadata route with `app/icon.tsx`. Production build generated 50 pages. |

## Broken / next action

- Nothing is currently broken or missing from the brief.

## Real API switch

Set `NEXT_PUBLIC_USE_MOCK=false` and `NEXT_PUBLIC_API_BASE_URL`. Adapt only `lib/api/endpoints.ts` and `lib/api/mappers.ts`.
