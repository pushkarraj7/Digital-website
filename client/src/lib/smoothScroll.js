// lib/smoothScroll.js
export function smoothScrollTo(targetId, offset = 96) {
  const el = document.querySelector(targetId);
  if (!el) return;

  const start = window.scrollY;
  const targetY = el.getBoundingClientRect().top + start - offset;
  const distance = targetY - start;
  const duration = Math.min(2400, Math.max(1100, Math.abs(distance) * 1.1));
  let startTime = null;

  const easeInOutQuint = (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutQuint(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
