/**
 * Merge class name fragments, skipping falsy values.
 * Lightweight replacement for `clsx` so we don't add a dependency.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/** Clamp a number between min and max. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/** Map a value from one numeric range to another. */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/** Format an integer with locale-aware thousands separators. */
export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}