import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * Animates a number counting up from 0 when it enters the viewport.
 * Uses a spring rather than a linear tween so the motion feels weighted,
 * matching the rest of the site's motion language.
 */
export function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20, mass: 1 });
  const displayRef = useRef(null);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, decimals]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={displayRef}>{prefix}0{suffix}</span>
    </motion.span>
  );
}