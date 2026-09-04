import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query. Used to gate heavy 3D / cursor
 * interactions to larger, more capable viewports.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsTouchDevice = () =>
  useMediaQuery('(hover: none) and (pointer: coarse)');