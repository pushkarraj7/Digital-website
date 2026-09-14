import { useEffect, useState, useRef } from 'react';

/**
 * Tracks 0-1 scroll progress of a section through the viewport.
 * Lightweight alternative to Framer Motion's useScroll when a component
 * only needs a single progress number and wants to avoid the extra
 * subscription overhead.
 */
export function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = null;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const next = Math.min(Math.max(traveled / total, 0), 1);
      setProgress(next);
      raf = null;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, progress];
}