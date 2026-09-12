import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GRID_SIZE = 42;
const GRID_SPAN = 16;
const PULSE_COUNT = 10;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vElevation;
  varying float vDepth;

  void main() {
    vec3 pos = position;

    float wave1 = sin(pos.x * 0.35 + uTime * 0.6) * 0.35;
    float wave2 = sin(pos.y * 0.5 - uTime * 0.4) * 0.25;

    // Wider, slower-decaying ripple — reads as liquid/intentional
    // instead of twitchy. Lower frequency + slower falloff (exp * 0.12
    // vs the old 0.25) means it spreads further and lingers longer.
    float mouseDist = distance(vec2(pos.x, pos.y), uMouse);
    float ripple = sin(mouseDist * 0.9 - uTime * 1.5) * exp(-mouseDist * 0.12) * 1.1;

    // Slow scan sweep — a soft band of extra elevation/glow that
    // travels across the grid on its own, independent of the cursor.
    float scanPos = mod(uTime * 0.12, 3.0) - 1.5;
    float scanDist = abs(pos.x - scanPos * (16.0 / 3.0));
    float scan = exp(-scanDist * scanDist * 0.15) * 0.5;

    float elevation = wave1 + wave2 + ripple + scan;
    pos.z += elevation;

    vElevation = elevation;
    vDepth = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColorHot;
  varying float vElevation;
  varying float vDepth;

  void main() {
    float glow = smoothstep(0.15, 0.9, vElevation);
    vec3 color = mix(uColor, uColorHot, glow);

    // Depth fog — lines/nodes farther from camera fade dimmer, giving
    // the grid real depth instead of uniform brightness everywhere.
    float fog = smoothstep(1.0, -1.0, vDepth);
    float alpha = (0.18 + glow * 0.35) * mix(0.35, 1.0, fog);

    gl_FragColor = vec4(color, alpha);
  }
`;

function NeuralGridMesh({ mouseRef }) {
  const materialRef = useRef();
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#1c3a73") },
      uColorHot: { value: new THREE.Color("#7FB4FF") },
    }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    uniforms.uTime.value = t;

    const mouse = mouseRef?.current;
    if (mouse) {
      const targetX = mouse.x * GRID_SPAN * 0.4;
      const targetY = mouse.y * GRID_SPAN * 0.25;
      uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.06;
      uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} position={[1.8, -0.8, -4]} rotation={[-0.55, 0.18, 0]}>
      <planeGeometry
        args={[GRID_SPAN, GRID_SPAN * 0.65, GRID_SIZE, GRID_SIZE]}
      />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Glowing "signal" points that travel across the grid like data packets.
function DataPulses() {
  const pointsRef = useRef();

  const { positions, params } = useMemo(() => {
    const positions = new Float32Array(PULSE_COUNT * 3);
    const params = Array.from({ length: PULSE_COUNT }, () => ({
      row: Math.floor(Math.random() * GRID_SIZE),
      speed: 0.15 + Math.random() * 0.25,
      offset: Math.random() * 10,
    }));
    return { positions, params };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const array = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < PULSE_COUNT; i++) {
      const i3 = i * 3;
      const { row, speed, offset } = params[i];
      const progress = ((t * speed + offset) % 10) / 10;

      const localX = (progress - 0.5) * GRID_SPAN;
      const localY = (row / GRID_SIZE - 0.5) * GRID_SPAN * 0.65;
      const wave1 = Math.sin(localX * 0.35 + t * 0.6) * 0.35;
      const wave2 = Math.sin(localY * 0.5 - t * 0.4) * 0.25;

      // Match the grid's own tilt/position so pulses sit on its surface.
      array[i3] = localX * Math.cos(0.18) + 1.8;
      array[i3 + 1] =
        localY * Math.cos(-0.55) - (wave1 + wave2) * Math.sin(-0.55) - 0.8;
      array[i3 + 2] =
        localY * Math.sin(-0.55) + (wave1 + wave2) * Math.cos(-0.55) - 4;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PULSE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#B8D4FF"
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function NeuralGrid({ mouseRef }) {
  return (
    <>
      <NeuralGridMesh mouseRef={mouseRef} />
      <DataPulses />
    </>
  );
}
