import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Wraps the app with Lenis smooth-scroll. Skipped entirely when the user
 * has requested reduced motion, in which case native scroll is used.
 */
export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return children;
}