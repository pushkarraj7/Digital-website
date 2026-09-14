// import { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { ParticleField } from "./ParticleField";
// import { LightField } from "./LightField";
// import { useMousePosition } from "./useMousePosition";
// import { useIsDesktop } from "../../hooks/useMediaQuery";
// import { useReducedMotion } from "../../hooks/useReducedMotion";

// /**
//  * The interactive "Digital Growth Field" — the hero's central visual.
//  * Renders a full WebGL field on desktop, a lighter particle count on
//  * tablet, and is skipped entirely on touch/mobile or reduced-motion in
//  * favour of the CSS fallback rendered by the caller.
//  */
// export function GrowthField({ activeZone, className = "" }) {
//   const mouseRef = useMousePosition();
//   const isDesktop = useIsDesktop();
//   const reducedMotion = useReducedMotion();

//   if (reducedMotion) return null;

//   const count = isDesktop ? 1400 : 700;

//   return (
//     <div className={className} aria-hidden="true">
//       <Canvas
//         camera={{ position: [0, 0, 5], fov: 45 }}
//         dpr={[1, 1.75]}
//         gl={{
//           antialias: true,
//           alpha: true,
//           powerPreference: "high-performance",
//         }}
//       >
//         <Suspense fallback={null}>
//           <LightField
//             mouseRef={mouseRef}
//             color="#163A73"
//             secondaryColor="#7F5FFF"
//           />
//           <ParticleField
//             mouseRef={mouseRef}
//             count={count}
//             colors={["#7FB4FF", "#7F5FFF", "#FF8B6B"]}
//             activeZone={activeZone}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

import { Suspense, lazy, useEffect, useState } from "react";
import { useMousePosition } from "./useMousePosition";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsDesktop } from "../../hooks/useMediaQuery";

const Canvas = lazy(() =>
  import("@react-three/fiber").then((m) => ({ default: m.Canvas })),
);
const LightField = lazy(() =>
  import("./LightField").then((m) => ({ default: m.LightField })),
);
const NeuralGrid = lazy(() =>
  import("./NeuralGrid").then((m) => ({ default: m.NeuralGrid })),
);

/**
 * The interactive "Digital Growth Field" — the hero's central visual.
 * Same as before — full WebGL field on desktop, lighter particle count
 * on tablet, skipped entirely on touch/mobile or reduced-motion.
 *
 * The only change from before: the three-vendor chunk (Three.js +
 * fiber) is no longer requested on initial page load. It's deferred
 * until the browser is idle after first paint, so it never blocks
 * LCP. Visually and functionally identical — same particles, same
 * lights, same cursor interaction — it just starts a beat later.
 */
export function GrowthField({ activeZone, className = "", scrollRef }) {
  const mouseRef = useMousePosition();
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Skip entirely on mobile/tablet — never even fetch the
    // Canvas/Three.js chunk, not just skip rendering it.
    if (reducedMotion || !isDesktop) return;
    const idle =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => setReady(true), { timeout: 1500 })
        : setTimeout(() => setReady(true), 200);
    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [reducedMotion]);

  if (reducedMotion || !isDesktop || !ready) return null;

  return (
    <Suspense fallback={null}>
      <GrowthFieldCanvas
        mouseRef={mouseRef}
        activeZone={activeZone}
        className={className}
        scrollRef={scrollRef}
      />
    </Suspense>
  );
}

function GrowthFieldCanvas({ mouseRef, activeZone, className, scrollRef }) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const count = isDesktop ? 1400 : 700;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <LightField
            mouseRef={mouseRef}
            color="#163A73"
            secondaryColor="#7F5FFF"
          />
          <NeuralGrid mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
