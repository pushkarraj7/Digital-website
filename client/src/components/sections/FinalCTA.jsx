import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Rocket, Handshake, TrendingUp, Clock } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { EASE } from "../../lib/animations";

function StatRing({ value, suffix = "", max, label, Icon, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const numericValue = parseFloat(value);

  const motionVal = useMotionValue(0);
  const displayRef = useRef(null);
  const circleRef = useRef(null);

  const RADIUS = 30;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, [0, numericValue], {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.8,
    });
    return controls.stop;
  }, [inView, motionVal, numericValue]);

  useEffect(() => {
    return motionVal.on("change", (latest) => {
      if (displayRef.current) {
        const decimals = value.toString().includes(".") ? 1 : 0;
        displayRef.current.textContent = latest.toFixed(decimals) + suffix;
      }
      if (circleRef.current) {
        const offset =
          CIRCUMFERENCE - Math.min(latest / max, 1) * CIRCUMFERENCE;
        circleRef.current.style.strokeDashoffset = offset;
      }
    });
  }, [motionVal, suffix, value, max, CIRCUMFERENCE]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="pointer-events-auto group relative flex w-full max-w-[168px] items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-3 py-3 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors duration-300 hover:border-ion/40 sm:gap-4 sm:px-4 sm:py-4"
    >
      {/* corner shine */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-ion/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className="h-full w-full -rotate-90"
        >
          <circle
            cx="32"
            cy="32"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />
          <circle
            ref={circleRef}
            cx="32"
            cy="32"
            r={RADIUS}
            fill="none"
            stroke="url(#statGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          <defs>
            <linearGradient
              id="statGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#60a5ff" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        <Icon
          className="absolute h-4 w-4 text-ion sm:h-5 sm:w-5"
          strokeWidth={1.75}
        />
      </div>

      <div className="flex flex-col items-start text-left">
        <span
          ref={displayRef}
          className="font-display text-lg font-semibold text-ink sm:text-xl"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          0{suffix}
        </span>
        <span className="mt-0.5 text-[10px] uppercase leading-tight tracking-wide text-mist sm:text-[11px]">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

const STATS = [
  { label: "Projects shipped", value: 50, suffix: "+", max: 60, Icon: Rocket },
  {
    label: "Client retention",
    value: 98,
    suffix: "%",
    max: 100,
    Icon: Handshake,
  },
  {
    label: "Avg. growth lift",
    value: 3.2,
    suffix: "x",
    max: 5,
    Icon: TrendingUp,
  },
  { label: "Avg. response time", value: 2, suffix: "h", max: 24, Icon: Clock },
];

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-void px-4 py-20 sm:px-6 sm:py-32 lg:px-4"
    >
      {/* base radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 50%, rgba(12,41,89,0.6), transparent 70%)",
        }}
      />

      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(60% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* drifting glow orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-ion/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ion/10 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating stat cards — left, stacked */}
      <div className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex lg:origin-left lg:scale-[0.68] xl:left-12 xl:scale-100 xl:gap-5">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <StatRing {...STATS[0]} delay={0.5} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
        >
          <motion.div
            animate={{ y: [0, -13, 0] }}
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <StatRing {...STATS[1]} delay={0.65} />
          </motion.div>
        </motion.div>
      </div>

      {/* floating stat cards — right, stacked */}
      <div className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex lg:origin-right lg:scale-[0.68] xl:right-12 xl:scale-100 xl:gap-5">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -11, 0] }}
            transition={{
              duration: 4.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <StatRing {...STATS[2]} delay={0.6} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
          >
            <StatRing {...STATS[3]} delay={0.75} />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-ion/30 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ion"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ion" />
          Let&rsquo;s build something
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative font-display text-3xl font-semibold text-ink sm:text-5xl"
        >
          <span className="pointer-events-none absolute -left-3 -top-4 h-3 w-3 border-l border-t border-ion/40 sm:-left-10 sm:-top-8 sm:h-4 sm:w-4" />
          <span className="pointer-events-none absolute -right-3 -top-4 h-3 w-3 border-r border-t border-ion/40 sm:-right-10 sm:-top-8 sm:h-4 sm:w-4" />
          Ready to turn attention into growth?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="mt-6 max-w-lg text-base text-mist sm:text-lg"
        >
          Tell us where you are. We&rsquo;ll help you find where you can go
          next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="mt-10 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <MagneticButton
            href="#contact-form"
            data-cursor="interactive"
            className="w-full rounded-full sm:w-auto"
          >
            Start a Project
          </MagneticButton>
          <MagneticButton
            href="mailto:hello@mvmdigital.com"
            variant="secondary"
            data-cursor="interactive"
            className="w-full rounded-full sm:w-auto"
          >
            Talk to MVM Digital
          </MagneticButton>
        </motion.div>

        {/* stats row on mobile/tablet, hidden on lg+ since they float on the sides there */}
        <div className="mt-12 grid w-full max-w-sm grid-cols-2 place-items-center gap-3 sm:mt-16 sm:max-w-md sm:gap-4 lg:hidden">
          {STATS.map((stat, i) => (
            <StatRing key={stat.label} {...stat} delay={0.45 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
