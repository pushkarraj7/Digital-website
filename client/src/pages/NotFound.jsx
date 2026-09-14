import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

/**
 * NotFound.jsx — MVM 404 Page
 *
 * Drop-in replacement for src/pages/NotFound.jsx.
 * Styled to match the dark, glassmorphism + particle-field aesthetic
 * used across MVM (GrowthField / LightField / NeuralGrid sections).
 *
 * No external local imports — safe to paste as-is. Swap the inline
 * "glass card" div for your <GlassPanel> component, and the CTA
 * button for <MagneticButton>, if you want to reuse those directly.
 */

// Lightweight floating-particle backdrop (CSS/Framer only — no Three.js
// dependency needed just for a 404 page).
function FloatingParticles({ count = 28 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 5,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-ion/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function NotFound() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-void px-6">
      {/* Ambient gradient glow, matching Hero/CTA sections */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-ion/10 blur-[100px]" />
      </div>

      <FloatingParticles />

      {/* Grid overlay for that "digital/tech" texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-[0_0_60px_-15px_rgba(16,185,129,0.25)] backdrop-blur-xl sm:p-14"
      >
        {/* 404 numeral */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-b from-ink via-ink to-ink/30 bg-clip-text font-display text-[6rem] font-bold leading-none tracking-tight text-transparent sm:text-[8rem]"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-ion/60 to-transparent"
        />

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 font-display text-xl font-semibold text-ink sm:text-2xl"
        >
          This page took a different growth path
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist sm:text-base"
        >
          The page you're looking for doesn't exist, moved, or never made it
          past the brief. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-ion px-7 py-3 text-sm font-semibold text-void transition-transform duration-300 hover:scale-[1.03] active:scale-95"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.03] px-7 py-3 text-sm font-semibold text-mist transition-all duration-300 hover:border-ink/30 hover:bg-ink/[0.08] hover:text-ink"
          >
            <Compass size={16} />
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
