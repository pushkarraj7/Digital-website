import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

/**
 * A soft, low-opacity light source that drifts toward the cursor,
 * giving the particle field something to catch light from. Kept as a
 * single mesh — cheap to render, does the atmospheric heavy lifting.
 */
export function LightField({ mouseRef, color = "#0C2959" }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const mouse = mouseRef?.current;
    const t = state.clock.getElapsedTime();
    const targetX = mouse ? mouse.x * 2.4 : 0;
    const targetY = mouse ? mouse.y * 1.6 : 0;
    meshRef.current.position.x +=
      (targetX - meshRef.current.position.x) * 0.025;
    meshRef.current.position.y +=
      (targetY - meshRef.current.position.y) * 0.025;
    meshRef.current.rotation.z = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <planeGeometry args={[9, 6]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: 0.4 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uOpacity;
          varying vec2 vUv;
          void main() {
            float dist = distance(vUv, vec2(0.5));
            float falloff = smoothstep(0.5, 0.0, dist);
            gl_FragColor = vec4(uColor, falloff * uOpacity);
          }
        `}
      />
    </mesh>
  );
}
