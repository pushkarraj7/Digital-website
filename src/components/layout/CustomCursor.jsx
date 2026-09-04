import { useEffect, useRef, useState } from 'react';
import { useIsTouchDevice } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * A restrained custom cursor: a small dot that smoothly trails the
 * pointer, gently expands over interactive elements, and disables
 * itself on touch devices and when reduced motion is requested.
 *
 * Elements can opt into the "interactive" state by adding the
 * `data-cursor="interactive"` attribute.
 */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target.closest?.('[data-cursor="interactive"]');
      setIsInteractive(Boolean(target));
    };

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion mix-blend-difference"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ion/50 transition-[width,height,opacity] duration-300 ease-out ${
          isInteractive ? 'h-10 w-10 opacity-100' : 'h-6 w-6 opacity-40'
        }`}
      />
    </>
  );
}