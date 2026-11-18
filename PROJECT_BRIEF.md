DESIGN: Ember. Palette: cream paper #F5EDE0, ink #141210, ember #FF5B2E, saffron #FFB627. Hero 3D effect: curved 3D cylinder gallery.

Build a complete, unique, premium news portal that a visitor remembers after one visit. It must not look AI-generated: editorial feel, big tight headlines, thin rules, numbered labels, asymmetric grids, large radii, one signature motif (e.g. a rotating circular-text stamp "LIVE • 20 STORIES •") reused in hero and footer. Warm palette from DESIGN as CSS tokens, light + dark mode. News categories in content/site.config.ts. Fully responsive 320-1440px.

STACK: Next.js 15 App Router, TypeScript, Tailwind, GSAP + ScrollTrigger (scroll-driven 3D), Framer Motion (UI/hover), `lenis` smooth scroll connected to ScrollTrigger (lenis.on('scroll', ScrollTrigger.update), gsap.ticker; native on touch; off for reduced-motion; data-lenis-prevent on dropdowns/drawer), next-themes, react-markdown + remark-gfm + rehype-sanitize, next/image, next/font. Yarn. CSS 3D transforms only, no Three.js/WebGL.

RESEARCH FIRST (if you can browse, otherwise skip): look at these for technique only, never copy code or branding verbatim:
https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/ (cylinder text)
https://tympanus.net/codrops/?p=93330 (on-scroll 3D carousel)
https://tympanus.net/codrops/2025/07/29/built-to-move-a-closer-look-at-the-animations-behind-eduard-bodaks-portfolio/ (flipping 3D cards, pointer-reactive card, circular card layout)
https://framer.university/resources/tilted-scrolling-website-animation (tilted scrolling)
https://tympanus.net/codrops/?p=103532 (infinite 3D carousel)
[optional: add my reference website link here]

HERO = exactly 20 news, the main wow: use the hero 3D effect from DESIGN, scroll-driven and pinned (about 350vh desktop, no dead zones; every scroll moves it), each card = big image + well-typeset title (line-clamp) + category + arrow link; counter 01/20 + progress line; after card 20 the pin releases into the next section. All 20 links server-rendered. Mobile: simplified (snap row or reduced 3D). Reduced-motion: native horizontal row.

ANIMATION MAP (each section gets its own effect):
1 Hero: as above.
2 Breaking bar: rotating 3D text drum (cylinder text), pauses on hover.
3 Latest news grid: pointer-driven 3D tilt + glare, title and category pop forward in Z (desktop hover only).
4 Trending top 10: cards shrink/tilt on scroll then flip in 3D to show a summary.
5 Editor's picks: sticky 3D card stack (cards tilt back with rotateX as they stack).
6 Category showcase: tilted-scroll columns moving in opposite directions, or 3D coverflow with drag.
7 Photo story: 3D cube/prism that rotates with scroll, each face a story.
8 Live/stats: split-flap (airport board) headlines and count-up numbers.
9 Newsletter: 3D envelope that opens (flap rotateX, letter slides out) when in view.
10 Footer: giant layered/extruded wordmark reacting to the pointer, depth parallax, plus the signature stamp. Route changes: 3D flip/curtain page transition. Section headings: perspective word reveal.

SEARCH: header search with debounce (300ms), AbortController, min 2 chars. Result rows like YouTube suggestions: thumbnail + title with highlighted match + category + time, grouped, recent searches, arrow-key navigation, Enter/Esc, Cmd/Ctrl+K, skeleton, empty state, full-screen sheet on mobile, plus a /search page.

ARTICLE PAGE: markdown body rendered with react-markdown: links are real clickable links (sanitized, external rel="noopener noreferrer"), plus bold, lists, images. Reading-progress bar, share, related, breadcrumbs, JSON-LD NewsArticle, generateMetadata.

DATA + IMAGES: UI uses normalized types only. services/* call lib/api/client.ts; NEXT_PUBLIC_USE_MOCK=true reads mocks/; otherwise NEXT_PUBLIC_API_BASE_URL through mappers (mapApiArticle...), so switching to the real API means editing only mappers/endpoints. Mock data uses REAL royalty-free photos (images.unsplash.com via next.config remotePatterns, mock only), exactly 20 featured articles, and at least 3 articles with no image to prove the fallback. Every image goes through a SafeImage with a beautiful branded fallback (warm paper texture, logo mark, category label, same aspect ratio) for missing or broken images. Loading, empty and error states everywhere.

LOGO: unique and relatable to news; one clear concept (headline column, folded corner, signal pulse, quote mark...) built as custom SVG with a distinctive detail; no clip-art, no gradients. <Logo variant="full | mark | stacked" />, favicon, light/dark/single-color, subtle draw-in. /brand page showing variants.

QUALITY: animate only transform/opacity; hover effects inside @media (hover: hover); focus-visible everywhere; prefers-reduced-motion respected; lazy-load GSAP sections with dynamic import; no layout shift; no Math.random() in render; 60fps on mid laptops; accessible.

PROCESS: build in this order: foundation (tokens, Lenis, header, search, logo, data layer), hero, then each section 2-10, then article page and other pages. Keep BUILD_STATUS.md updated, commit after each section, run yarn lint and yarn build at the end (both must pass). Final report in 8 lines max.