import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A soft field of drifting points that gently gravitates toward the
 * cursor. Deliberately avoids obvious spheres/orbits — points are
 * distributed in a flattened, elongated cloud so it reads as an abstract
 * "field" rather than a planet or globe.
 */
export function ParticleField({
  mouseRef,
  count = 1400,
  colors = ["#4E86FF"],
  activeZone,
  scrollRef,
}) {
  const pointsRef = useRef();
  const materialRef = useRef();

  const { positions, seeds, particleColors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const particleColors = new Float32Array(count * 3);
    const palette = colors.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Elongated, flattened cloud — wider than tall, subtle depth.
      const radius = Math.pow(Math.random(), 0.5) * 5.2;
      const theta = Math.random() * Math.PI * 2;
      positions[i3] = Math.cos(theta) * radius * 1.4;
      positions[i3 + 1] = Math.sin(theta) * radius * 0.6;
      positions[i3 + 2] = (Math.random() - 0.5) * 2.2;
      seeds[i] = Math.random() * Math.PI * 2;

      const tint = palette[i % palette.length];
      particleColors[i3] = tint.r;
      particleColors[i3 + 1] = tint.g;
      particleColors[i3 + 2] = tint.b;
    }
    return { positions, seeds, particleColors };
  }, [count, colors]);

  const basePositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const mouse = mouseRef?.current;
    // Field expands and drifts back as user scrolls down the page —
    // gives the 3D layer its own parallax depth, not just the DOM.
    const scroll = scrollRef?.current ?? 0;
    const spread = 1 + scroll * 0.6;
    pointsRef.current.position.z = -scroll * 1.5;
    if (mouse) {
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
    }

    const array = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = seeds[i];
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // Gentle organic drift.
      const drift = Math.sin(t * 0.4 + seed) * 0.12;

      // Traveling wave sweeping left -> right across the field, looping
      // continuously. bx (world x-position) drives the phase so the
      // crest visibly moves across the screen over time.
      const wave = Math.sin(bx * 0.6 - t * 0.8) * 0.25;

      // Subtle attraction toward cursor position, scaled down so the
      // effect stays calm rather than chasing the pointer.
      const mx = mouse ? mouse.x * 3.2 : 0;
      const my = mouse ? mouse.y * 2 : 0;
      const dx = mx - bx;
      const dy = my - by;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
      const pull = Math.min(1.1 / dist, 0.9);

      array[i3] = (bx + dx * pull * 0.35 + drift * 0.4) * spread;
      array[i3 + 1] = (by + dy * pull * 0.35 + drift + wave) * spread;
      array[i3 + 2] = bz + Math.sin(t * 0.3 + seed) * 0.15;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (materialRef.current) {
      const targetOpacity = activeZone ? 0.85 : 0.55;
      materialRef.current.opacity +=
        (targetOpacity - materialRef.current.opacity) * 0.06;
    }
  });

  return (
    <points ref={pointsRef} key={count}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        vertexColors
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
