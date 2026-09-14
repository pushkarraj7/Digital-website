// import { useEffect, useRef, useState } from 'react';
// import { useIsTouchDevice } from '../../hooks/useMediaQuery';
// import { useReducedMotion } from '../../hooks/useReducedMotion';

// /**
//  * A restrained custom cursor: a small dot that smoothly trails the
//  * pointer, gently expands over interactive elements, and disables
//  * itself on touch devices and when reduced motion is requested.
//  *
//  * Elements can opt into the "interactive" state by adding the
//  * `data-cursor="interactive"` attribute.
//  */
// export function CustomCursor() {
//   const dotRef = useRef(null);
//   const ringRef = useRef(null);
//   const isTouch = useIsTouchDevice();
//   const reducedMotion = useReducedMotion();
//   const [isInteractive, setIsInteractive] = useState(false);

//   useEffect(() => {
//     if (isTouch || reducedMotion) return;

//     const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
//     const ring = { x: pos.x, y: pos.y };
//     let raf;

//     const onMove = (e) => {
//       pos.x = e.clientX;
//       pos.y = e.clientY;
//       const target = e.target.closest?.('[data-cursor="interactive"]');
//       setIsInteractive(Boolean(target));
//     };

//     const tick = () => {
//       ring.x += (pos.x - ring.x) * 0.18;
//       ring.y += (pos.y - ring.y) * 0.18;
//       if (dotRef.current) {
//         dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
//       }
//       if (ringRef.current) {
//         ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
//       }
//       raf = requestAnimationFrame(tick);
//     };

//     window.addEventListener('pointermove', onMove, { passive: true });
//     raf = requestAnimationFrame(tick);
//     return () => {
//       window.removeEventListener('pointermove', onMove);
//       cancelAnimationFrame(raf);
//     };
//   }, [isTouch, reducedMotion]);

//   if (isTouch || reducedMotion) return null;

//   return (
//     <>
//       <div
//         ref={dotRef}
//         className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion mix-blend-difference"
//       />
//       <div
//         ref={ringRef}
//         className={`pointer-events-none fixed left-0 top-0 z-[998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ion/50 transition-[width,height,opacity] duration-300 ease-out ${
//           isInteractive ? 'h-10 w-10 opacity-100' : 'h-6 w-6 opacity-40'
//         }`}
//       />
//     </>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const TRAIL_COUNT = 5;

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const rippleLayerRef = useRef(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState({ interactive: false, label: null });

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({
      x: pos.x,
      y: pos.y,
    }));
    let lastPos = { x: pos.x, y: pos.y };
    let velocity = { x: 0, y: 0 };
    let raf;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target.closest?.('[data-cursor="interactive"]');
      setState({
        interactive: Boolean(target),
        label: target?.getAttribute("data-cursor-label") ?? null,
      });
    };

    const onClick = (e) => {
      const layer = rippleLayerRef.current;
      if (!layer) return;
      const burst = document.createElement("span");
      burst.className = "cc-ripple";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      layer.appendChild(burst);
      setTimeout(() => burst.remove(), 650);
    };

    const tick = () => {
      // Ring lags behind the raw pointer for a soft-follow feel.
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;

      // Velocity drives the ring's stretch — fast movement = elongated
      // ellipse angled along the direction of travel, like a motion blur.
      velocity.x = pos.x - lastPos.x;
      velocity.y = pos.y - lastPos.y;
      lastPos = { x: pos.x, y: pos.y };

      const speed = Math.min(
        Math.hypot(velocity.x, velocity.y),
        40,
      );
      const angle = (Math.atan2(velocity.y, velocity.x) * 180) / Math.PI;
      const stretch = 1 + speed * 0.045;
      const squash = Math.max(1 - speed * 0.014, 0.72);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) rotate(${angle}deg) scale(${stretch}, ${squash})`;
      }

      // Trail: each dot chases the one ahead of it, creating a cheap
      // comet effect with just a handful of transform-only elements.
      let prevX = pos.x;
      let prevY = pos.y;
      trail.forEach((t, i) => {
        t.x += (prevX - t.x) * (0.32 - i * 0.03);
        t.y += (prevY - t.y) * (0.32 - i * 0.03);
        prevX = t.x;
        prevY = t.y;
        const el = trailRefs.current[i];
        if (el) {
          const scale = 1 - i * 0.15;
          el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) scale(${scale})`;
          el.style.opacity = String(0.35 - i * 0.06);
        }
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  const hasLabel = Boolean(state.label);

  return (
    <>
      <style>{`
        .cc-ripple {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 997;
          width: 8px;
          height: 8px;
          margin-left: -4px;
          margin-top: -4px;
          border-radius: 9999px;
          border: 1px solid rgba(127, 180, 255, 0.7);
          pointer-events: none;
          animation: cc-ripple-out 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes cc-ripple-out {
          to {
            width: 64px;
            height: 64px;
            margin-left: -32px;
            margin-top: -32px;
            opacity: 0;
            border-color: rgba(127, 180, 255, 0);
          }
        }
      `}</style>

      {/* click ripple burst layer */}
      <div ref={rippleLayerRef} className="pointer-events-none fixed inset-0 z-[997]" />

      {/* comet trail, rendered behind the ring/dot */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="pointer-events-none fixed left-0 top-0 z-[996] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion"
          style={{ opacity: 0 }}
        />
      ))}

      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion mix-blend-difference transition-opacity duration-200"
        style={{ opacity: hasLabel ? 0 : 1 }}
      />

      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ion/50 bg-void/80 backdrop-blur-[2px] transition-[width,height,opacity,border-color] duration-300 ease-premium"
        style={{
          width: hasLabel ? "auto" : state.interactive ? 44 : 24,
          height: hasLabel ? 40 : state.interactive ? 44 : 24,
          padding: hasLabel ? "0 16px" : 0,
          opacity: state.interactive ? 1 : 0.4,
          borderColor: state.interactive
            ? "rgba(127,180,255,0.9)"
            : "rgba(127,180,255,0.5)",
          boxShadow: state.interactive
            ? "0 0 20px rgba(127,180,255,0.35)"
            : "none",
        }}
      >
        {hasLabel && (
          <span className="whitespace-nowrap text-xs font-medium text-ink">
            {state.label}
          </span>
        )}

        {/* orbiting dot — only visible over interactive elements */}
        {state.interactive && !hasLabel && (
          <span
            className="absolute inset-0 animate-[cc-orbit_2.2s_linear_infinite]"
            style={{ transformOrigin: "50% 50%" }}
          >
            <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-ion shadow-[0_0_6px_rgba(127,180,255,0.8)]" />
          </span>
        )}
      </div>

      <style>{`
        @keyframes cc-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}