type SmoothScroll = {
  raf: (time: number) => void;
  on: (event: "scroll", callback: () => void) => void;
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
  destroy: () => void;
};

type SmoothState = {
  lenis: SmoothScroll | null;
  ready: Promise<void> | null;
};

const state: SmoothState = {
  lenis: null,
  ready: null,
};

function cinematicAllowed() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

export function allowCinematicMotion(minWidth = 1024) {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia(`(min-width: ${minWidth}px)`).matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

export function ensureSmoothScroll() {
  if (typeof window === "undefined") return Promise.resolve();
  if (state.ready) return state.ready;

  state.ready = (async () => {
    if (!cinematicAllowed()) return;

    const [{ default: gsap }, { ScrollTrigger }, lenisModule] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]);

    gsap.registerPlugin(ScrollTrigger);
    const Lenis = lenisModule.default;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    state.lenis = lenis;
  })();

  return state.ready;
}

export function scrollToTop() {
  if (typeof window === "undefined") return;
  if (state.lenis) {
    state.lenis.scrollTo(0, { immediate: true });
    return;
  }
  window.scrollTo(0, 0);
}
