import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { GrowthField } from "../three/GrowthField";
import { MagneticButton } from "../ui/MagneticButton";
import { HERO_ZONES, BRAND } from "../../lib/constants";
import { EASE } from "../../lib/animations";
import { cn } from "../../lib/utils";

export function HeroExperience() {
  const [activeZone, setActiveZone] = useState(null);
  const active = HERO_ZONES.find((z) => z.id === activeZone);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-24"
    >
      {/* Ambient base gradient, sits beneath the WebGL field */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, rgba(12,41,89,0.55), transparent 70%)",
        }}
      />

      {/* <GrowthField
        activeZone={activeZone}
        className="pointer-events-none absolute inset-0 opacity-90"
      /> */}

      {/* CSS fallback shown when 3D is disabled (reduced motion) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(40% 35% at 50% 45%, rgba(78,134,255,0.18), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center text-sm uppercase tracking-[0.2em] text-mist sm:text-lg sm:tracking-[0.25em]"
        >
          Digital marketing &amp; technology agency
        </motion.p>

        <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink xs:text-5xl sm:text-7xl sm:leading-[0.95] lg:text-8xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            Turn Attention
          </motion.span>
          <motion.span
            className="block font-medium italic text-ion"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            Into Growth.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mt-5 max-w-xl px-2 text-balance text-sm leading-relaxed text-mist sm:px-0 sm:text-lg"
        >
          {BRAND.supporting}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
          className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <MagneticButton
            href="#contact"
            data-cursor="interactive"
            className="w-full rounded-full sm:w-auto"
          >
            Start a Project
          </MagneticButton>
          <MagneticButton
            href="#work"
            variant="secondary"
            data-cursor="interactive"
            className="w-full rounded-full sm:w-auto"
          >
            Explore Our Work
          </MagneticButton>
        </motion.div>

        {/* Interactive hover zones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {HERO_ZONES.map((zone) => (
            <button
              key={zone.id}
              data-cursor="interactive"
              onMouseEnter={() => setActiveZone(zone.id)}
              onMouseLeave={() => setActiveZone(null)}
              onFocus={() => setActiveZone(zone.id)}
              onBlur={() => setActiveZone(null)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11px] tracking-wide transition-all duration-500 ease-premium sm:px-4 sm:py-2 sm:text-xs",
                activeZone === zone.id
                  ? "border-ion/60 bg-ion/10 text-ion"
                  : "border-line text-mist hover:text-ink",
              )}
            >
              {zone.label}
            </button>
          ))}
        </motion.div>

        <div className="mt-2 h-5">
          <AnimatePresence mode="wait">
            {active && (
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-xs text-haze"
              >
                {active.chain.join(" → ")}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-5 sm:flex"
      >
        <motion.span
          animate={{ opacity: [0.08, 0.35, 0.08] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-ion"
        />

        <motion.span
          animate={{ opacity: [0.15, 0.65, 0.15] }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-1.5 w-1.5 rounded-full bg-ion"
        />

        <motion.span
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1.5,
            delay: 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-1.5 w-1.5 rounded-full bg-ion shadow-[0_0_8px_rgba(78,134,255,0.5)]"
        />
      </motion.div>
    </section>
  );
}
