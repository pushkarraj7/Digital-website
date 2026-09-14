import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SIGNALS = [
  { label: 'Impressions', x: -260, y: -120 },
  { label: 'Reach', x: 220, y: -90 },
  { label: 'Followers', x: -180, y: 140 },
  { label: 'Clicks', x: 200, y: 160 },
  { label: 'Likes', x: -320, y: 20 },
  { label: 'Views', x: 300, y: -10 },
];

export function AttentionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const converge = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-void px-6 py-40">
      <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center text-center">
        {SIGNALS.map((s) => (
          <Signal key={s.label} {...s} progress={converge} />
        ))}

        <div className="relative z-10 space-y-3">
          <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Everyone is fighting for attention.
          </h2>
          <motion.p
            style={{ opacity: pathOpacity }}
            className="text-4xl font-semibold text-ion sm:text-5xl"
          >
            Very few turn it into action.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Signal({ label, x, y, progress }) {
  const posX = useTransform(progress, [0, 1], [x, 0]);
  const posY = useTransform(progress, [0, 1], [y, 0]);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.55, 0.35, 0]);
  const scale = useTransform(progress, [0, 1], [1, 0.4]);

  return (
    <motion.span
      style={{ x: posX, y: posY, opacity, scale }}
      className="pointer-events-none absolute rounded-full border border-line px-4 py-1.5 text-xs tracking-wide text-haze"
    >
      {label}
    </motion.span>
  );
}