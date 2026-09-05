import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { LightField } from "./LightField";
import { useMousePosition } from "./useMousePosition";
import { useIsDesktop } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * The interactive "Digital Growth Field" — the hero's central visual.
 * Renders a full WebGL field on desktop, a lighter particle count on
 * tablet, and is skipped entirely on touch/mobile or reduced-motion in
 * favour of the CSS fallback rendered by the caller.
 */
export function GrowthField({ activeZone, className = "" }) {
  const mouseRef = useMousePosition();
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

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
          <ParticleField
            mouseRef={mouseRef}
            count={count}
            colors={["#7FB4FF", "#7F5FFF", "#FF8B6B"]}
            activeZone={activeZone}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
