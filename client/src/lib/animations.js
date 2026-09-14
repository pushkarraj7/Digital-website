// Shared motion presets. Keep easing consistent across the whole site so
// motion feels like one system rather than per-component choices.

export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: EASE } },
};

export const staggerChildren = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const wordStagger = (stagger = 0.05, delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const wordUp = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.75, ease: EASE } },
};

export const snapIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const viewportOnce = { once: true, margin: "-15% 0px -15% 0px" };
