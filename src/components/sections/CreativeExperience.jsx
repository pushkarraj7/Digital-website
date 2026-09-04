import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FRAGMENTS = [
  { text: 'MVM', top: '10%', left: '8%', size: 'text-6xl', depth: 30 },
  { text: 'Bold', top: '65%', left: '12%', size: 'text-2xl', depth: 60 },
  { text: 'Digital', top: '20%', left: '70%', size: 'text-3xl', depth: 45 },
  { text: 'Growth', top: '75%', left: '62%', size: 'text-5xl', depth: 20 },
  { text: '01', top: '45%', left: '45%', size: 'text-sm', depth: 80 },
];

export function CreativeExperience() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-xl font-display text-4xl font-semibold text-ink sm:text-5xl">
          Make them look. Give them a reason to stay.
        </h2>

        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          className="relative mt-16 h-[480px] overflow-hidden rounded-3xl border border-line bg-[#081b3d]/40"
        >
          {FRAGMENTS.map((f) => (
            <Fragment key={f.text} {...f} mx={mx} my={my} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Fragment({ text, top, left, size, depth, mx, my }) {
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), { stiffness: 120, damping: 20 });
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-depth, depth]), { stiffness: 120, damping: 20 });

  return (
    <motion.span style={{ top, left, x, y }} className={`absolute font-display font-semibold text-ink/80 ${size}`}>
      {text}
    </motion.span>
  );
}