// import { useMemo, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// /**
//  * A soft field of drifting points that gently gravitates toward the
//  * cursor. Deliberately avoids obvious spheres/orbits — points are
//  * distributed in a flattened, elongated cloud so it reads as an abstract
//  * "field" rather than a planet or globe.
//  */
// export function ParticleField({
//   mouseRef,
//   count = 1400,
//   colors = ["#4E86FF"],
//   activeZone,
//   scrollRef,
// }) {
//   const pointsRef = useRef();
//   const materialRef = useRef();

//   const { positions, seeds, particleColors } = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const seeds = new Float32Array(count);
//     const particleColors = new Float32Array(count * 3);
//     const palette = colors.map((c) => new THREE.Color(c));
//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;
//       // Elongated, flattened cloud — wider than tall, subtle depth.
//       const radius = Math.pow(Math.random(), 0.5) * 5.2;
//       const theta = Math.random() * Math.PI * 2;
//       positions[i3] = Math.cos(theta) * radius * 1.4;
//       positions[i3 + 1] = Math.sin(theta) * radius * 0.6;
//       positions[i3 + 2] = (Math.random() - 0.5) * 2.2;
//       seeds[i] = Math.random() * Math.PI * 2;

//       const tint = palette[i % palette.length];
//       particleColors[i3] = tint.r;
//       particleColors[i3 + 1] = tint.g;
//       particleColors[i3 + 2] = tint.b;
//     }
//     return { positions, seeds, particleColors };
//   }, [count, colors]);

//   const basePositions = useMemo(() => positions.slice(), [positions]);

//   useFrame((state) => {
//     if (!pointsRef.current) return;
//     const t = state.clock.getElapsedTime();
//     const mouse = mouseRef?.current;
//     // Field expands and drifts back as user scrolls down the page —
//     // gives the 3D layer its own parallax depth, not just the DOM.
//     const scroll = scrollRef?.current ?? 0;
//     const spread = 1 + scroll * 0.6;
//     pointsRef.current.position.z = -scroll * 1.5;
//     if (mouse) {
//       mouse.x += (mouse.targetX - mouse.x) * 0.04;
//       mouse.y += (mouse.targetY - mouse.y) * 0.04;
//     }

//     const array = pointsRef.current.geometry.attributes.position.array;
//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;
//       const seed = seeds[i];
//       const bx = basePositions[i3];
//       const by = basePositions[i3 + 1];
//       const bz = basePositions[i3 + 2];

//       // Gentle organic drift.
//       const drift = Math.sin(t * 0.4 + seed) * 0.12;

//       // Traveling wave sweeping left -> right across the field, looping
//       // continuously. bx (world x-position) drives the phase so the
//       // crest visibly moves across the screen over time.
//       const wave = Math.sin(bx * 0.6 - t * 0.8) * 0.25;

//       // Subtle attraction toward cursor position, scaled down so the
//       // effect stays calm rather than chasing the pointer.
//       const mx = mouse ? mouse.x * 3.2 : 0;
//       const my = mouse ? mouse.y * 2 : 0;
//       const dx = mx - bx;
//       const dy = my - by;
//       const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
//       const pull = Math.min(1.1 / dist, 0.9);

//       array[i3] = (bx + dx * pull * 0.35 + drift * 0.4) * spread;
//       array[i3 + 1] = (by + dy * pull * 0.35 + drift + wave) * spread;
//       array[i3 + 2] = bz + Math.sin(t * 0.3 + seed) * 0.15;
//     }
//     pointsRef.current.geometry.attributes.position.needsUpdate = true;

//     if (materialRef.current) {
//       const targetOpacity = activeZone ? 0.85 : 0.55;
//       materialRef.current.opacity +=
//         (targetOpacity - materialRef.current.opacity) * 0.06;
//     }
//   });

//   return (
//     <points ref={pointsRef} key={count}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={count}
//           array={particleColors}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         ref={materialRef}
//         vertexColors
//         size={0.028}
//         sizeAttenuation
//         transparent
//         opacity={0.55}
//         depthWrite={false}
//         blending={THREE.AdditiveBlending}
//       />
//     </points>
//   );
// }




import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Tune these two if the network looks too sparse or too busy once you
// see it rendered — CONNECT_DIST is in the same world units as the
// particle cloud's radius (~5.2 max), MAX_NEIGHBORS caps lines per point.
const MAX_NEIGHBORS = 2;
const CONNECT_DIST = 0.8;

export function ParticleField({
  mouseRef,
  count = 1400,
  colors = ["#4E86FF"],
  activeZone,
  scrollRef,
  connections = true,
}) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const linesRef = useRef();
  const lineMaterialRef = useRef();

  const { positions, seeds, particleColors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const particleColors = new Float32Array(count * 3);
    const palette = colors.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
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

  // One-time nearest-neighbor pass (NOT per-frame) — builds a fixed edge
  // list from the base layout so links stay stable while points drift,
  // instead of recomputing distances 1400x1400 times every frame.
  const edges = useMemo(() => {
    if (!connections) return new Uint32Array(0);
    const pairs = [];
    for (let i = 0; i < count; i++) {
      const ix = basePositions[i * 3];
      const iy = basePositions[i * 3 + 1];
      const iz = basePositions[i * 3 + 2];
      const candidates = [];
      for (let j = 0; j < count; j++) {
        if (j === i) continue;
        const dx = basePositions[j * 3] - ix;
        const dy = basePositions[j * 3 + 1] - iy;
        const dz = basePositions[j * 3 + 2] - iz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < CONNECT_DIST * CONNECT_DIST) candidates.push([d2, j]);
      }
      candidates.sort((a, b) => a[0] - b[0]);
      for (let k = 0; k < Math.min(MAX_NEIGHBORS, candidates.length); k++) {
        const j = candidates[k][1];
        if (j > i) pairs.push(i, j); // avoid duplicate i-j / j-i edges
      }
    }
    return new Uint32Array(pairs);
  }, [connections, count, basePositions]);

  const edgeCount = edges.length / 2;
  const linePositions = useMemo(
    () => new Float32Array(edgeCount * 2 * 3),
    [edgeCount],
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const mouse = mouseRef?.current;
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

      const drift = Math.sin(t * 0.4 + seed) * 0.12;
      const wave = Math.sin(bx * 0.6 - t * 0.8) * 0.25;

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

    // Constellation lines follow the same drifting points computed above —
    // just copying already-computed positions, no extra distance math per frame.
    if (connections && linesRef.current && edgeCount > 0) {
      for (let e = 0; e < edgeCount; e++) {
        const a = edges[e * 2];
        const b = edges[e * 2 + 1];
        const p6 = e * 6;
        linePositions[p6] = array[a * 3];
        linePositions[p6 + 1] = array[a * 3 + 1];
        linePositions[p6 + 2] = array[a * 3 + 2];
        linePositions[p6 + 3] = array[b * 3];
        linePositions[p6 + 4] = array[b * 3 + 1];
        linePositions[p6 + 5] = array[b * 3 + 2];
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;

      if (lineMaterialRef.current) {
        const targetOpacity = activeZone ? 0.22 : 0.1;
        lineMaterialRef.current.opacity +=
          (targetOpacity - lineMaterialRef.current.opacity) * 0.06;
      }
    }
  });

  return (
    <>
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

      {connections && edgeCount > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={edgeCount * 2}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            ref={lineMaterialRef}
            color={colors[1] || colors[0]}
            transparent
            opacity={0.1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
    </>
  );
}