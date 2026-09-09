import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// import Lenis from "lenis";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Wraps the app with Lenis smooth-scroll. Skipped entirely when the user
 * has requested reduced motion, in which case native scroll is used.
 */
export function SmoothScroll({ children, enabled = true }) {
  const lenisRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (reducedMotion || !enabled) return;

    let lenis;
    let raf;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, [reducedMotion, enabled]);

  // Reset scroll to top on every route change.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children;
}
