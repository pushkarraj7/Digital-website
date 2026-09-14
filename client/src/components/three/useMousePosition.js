import { useEffect, useRef } from 'react';

/**
 * Tracks normalized pointer position (-1 to 1 on both axes, origin center)
 * in a ref so R3F components can read it inside useFrame without causing
 * React re-renders on every pointer move.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      position.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      position.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return position;
}