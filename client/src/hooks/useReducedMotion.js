import { useEffect, useState } from 'react';

/**
 * Mirrors `prefers-reduced-motion`. Every heavy animation / 3D / cursor
 * effect in the site should check this and fall back to a static or
 * minimal-motion presentation.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (event) => setReduced(event.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  return reduced;
}