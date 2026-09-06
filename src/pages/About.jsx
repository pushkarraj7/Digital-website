import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  Briefcase,
  Users2,
  Heart,
  Target,
  Compass,
} from "lucide-react";
import { GlassPanel } from "../components/ui/GlassPanel";
import { MagneticButton } from "../components/ui/MagneticButton";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { EASE, viewportOnce, fadeUp, staggerChildren } from "../lib/animations";
import { PRINCIPLES } from "../lib/constants";

import { lazy, Suspense } from "react";

const BrandsMarquee = lazy(() =>
  import("../components/sections/BrandsMarquee").then((m) => ({
    default: m.BrandsMarquee,
  })),
);
const MethodJourney = lazy(() =>
  import("../components/sections/MethodJourney").then((m) => ({
    default: m.MethodJourney,
  })),
);
const Testimonials = lazy(() =>
  import("../components/sections/Testimonials").then((m) => ({
    default: m.Testimonials,
  })),
);

const STATS = [
  {
    value: 8,
    suffix: "+",
    label: "Years building digital growth",
    icon: Clock,
    color: "#7FB4FF",
  },
  {
    value: 300,
    suffix: "+",
    label: "Projects shipped",
    icon: Briefcase,
    color: "#7F5FFF",
  },
  {
    value: 40,
    suffix: "+",
    label: "Brands partnered with",
    icon: Users2,
    color: "#FF8B6B",
  },
  {
    value: 92,
    suffix: "%",
    label: "Client retention",
    icon: Heart,
    color: "#4E86FF",
  },
];

const TEAM_ACCENTS = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399"];

// Placeholder team roster — swap names/photos once real assets are ready.
// `hue` drives the avatar gradient so the grid stays visually varied
// without needing real headshots yet.
const FOUNDER = {
  name: "Manisha Jadon",
  role: "Founder & CEO",
  hue: "from-ion to-aurora",
};

const TEAM = [
  { name: "Aditya Rao", role: "Creative Director", hue: "from-coral to-ion" },
  {
    name: "Priya Nair",
    role: "Lead UI/UX Designer",
    hue: "from-aurora to-electric",
  },
  { name: "Karan Verma", role: "Lead Developer", hue: "from-electric to-ion" },
  { name: "Sneha Iyer", role: "Growth Strategist", hue: "from-ion to-coral" },
  {
    name: "Rohan Desai",
    role: "Social Media Manager",
    hue: "from-coral to-aurora",
  },
  {
    name: "Neha Kulkarni",
    role: "Content Strategist",
    hue: "from-aurora to-ion",
  },
  {
    name: "Vivek Bhatt",
    role: "Video & Motion Editor",
    hue: "from-electric to-coral",
  },
  {
    name: "Ishita Sen",
    role: "Business Development Lead",
    hue: "from-ion to-electric",
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function Avatar({ name, hue, size = "h-16 w-16 text-lg" }) {
  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${hue} font-display font-semibold text-void`}
    >
      {initials(name)}
    </div>
  );
}

export function About() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-6">
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/20 opacity-40 blur-[160px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-aurora/20 opacity-30 blur-[140px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-ion" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-mist">
              About MVM Digital
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-display-1 font-semibold text-ink sm:mt-8"
          >
            One team, every discipline,{" "}
            <span className="italic text-ion">one accountable outcome.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base text-mist sm:text-lg"
          >
            We started MVM Digital because we were tired of the usual agency
            routine: one team does strategy, another does design, a third does
            marketing, and by the time it reaches you, nobody agrees on what
            actually worked. So we just kept it all in one place. Same people,
            strategy through to growth, all answering to the same number at the
            end of the month.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-6 items-start justify-center rounded-full border border-line p-1.5"
          >
            <span className="h-1.5 w-1 rounded-full bg-ion" />
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="relative border-y border-line bg-void px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-haze">
              Numbers
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
              Talk is easy.
            </h2>
            <h2 className="font-display text-3xl font-semibold text-ion sm:text-5xl">
              These didn't happen by accident.
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="group relative overflow-hidden bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 sm:p-8"
                >
                  {/* hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(220px circle at 30% 20%, ${stat.color}25, transparent 70%)`,
                    }}
                  />

                  {/* corner glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"
                    style={{ backgroundColor: `${stat.color}25` }}
                  />

                  {/* top accent */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 transition-all duration-700 group-hover:w-2/3"
                    style={{
                      backgroundColor: stat.color,
                      boxShadow: `0 0 20px 4px ${stat.color}60`,
                    }}
                  />

                  <span
                    className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: `${stat.color}1a`,
                      border: `1px solid ${stat.color}40`,
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: stat.color }} />
                  </span>
                  <p className="relative mt-5 font-display text-4xl font-semibold text-ink sm:text-5xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="relative mt-2 text-xs text-mist sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Mission & Vision ---------- */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand/30 opacity-40 blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-haze">
              Mission &amp; Vision
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
              Two ideas,
            </h2>
            <h2 className="font-display text-3xl font-semibold text-ion sm:text-5xl">
              pulling in the same direction.
            </h2>
          </motion.div>

          <div className="relative mt-10 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
            {/* animated connector line, sm+ only */}
            <svg
              className="pointer-events-none absolute left-0 top-1/2 z-0 hidden w-full -translate-y-1/2 sm:block"
              height="4"
              viewBox="0 0 100 4"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="missionVisionLine"
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#7FB4FF" />
                  <stop offset="100%" stopColor="#7F5FFF" />
                </linearGradient>
              </defs>
              <motion.line
                x1="0"
                y1="2"
                x2="100"
                y2="2"
                stroke="url(#missionVisionLine)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              />
            </svg>

            {/* pulse traveling along the line */}
            <motion.div
              className="pointer-events-none absolute top-1/2 z-0 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ion sm:block"
              style={{ boxShadow: "0 0 10px 2px rgba(127,180,255,0.7)" }}
              initial={{ left: "0%", opacity: 0 }}
              whileInView={{
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              viewport={viewportOnce}
              transition={{
                duration: 2.2,
                ease: EASE,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 1.4,
              }}
            />

            {/* connector node between the two cards */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-void shadow-[0_0_30px_-4px_rgba(127,180,255,0.5)]">
                <span className="h-1.5 w-1.5 rounded-full bg-ion" />
              </div>
            </div>

            {[
              {
                icon: Compass,
                label: "Mission",
                color: "#7FB4FF",
                copy: "At MVM Digital, our mission is to create impactful digital experiences that empower businesses to grow and connect authentically with their audiences. We combine creativity, technology, and strategy to deliver measurable results — helping brands build trust, achieve visibility, and make a lasting impression in the digital world.",
              },
              {
                icon: Target,
                label: "Vision",
                color: "#7F5FFF",
                copy: "Our vision is to become a leading force in digital transformation, recognized for our innovation, integrity, and excellence. We strive to turn ideas into inspiring digital realities that elevate brands and drive meaningful global connections — shaping the future of how businesses engage online.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="group/card"
                >
                  <GlassPanel className="relative h-full overflow-hidden p-7 transition-all duration-500 group-hover/card:-translate-y-1 sm:p-10">
                    {/* hover glow */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                      style={{
                        background: `radial-gradient(220px circle at 30% 20%, ${item.color}25, transparent 70%)`,
                      }}
                    />

                    {/* corner glow */}
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover/card:scale-150 group-hover/card:opacity-100"
                      style={{ backgroundColor: `${item.color}20` }}
                    />

                    {/* top accent */}
                    <div
                      className="pointer-events-none absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 transition-all duration-700 group-hover/card:w-2/3"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 20px 4px ${item.color}60`,
                      }}
                    />

                    <div className="relative flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 group-hover/card:scale-110"
                        style={{
                          backgroundColor: `${item.color}1a`,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: item.color }}
                        />
                      </span>
                      <span className="font-display text-xl font-semibold uppercase tracking-[0.1em] text-ion sm:text-2xl">
                        {item.label}
                      </span>
                    </div>
                    <p className="relative mt-5 text-sm leading-relaxed text-mist sm:text-base">
                      {item.copy}
                    </p>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Principles ---------- */}
      <MethodJourney />

      {/* ---------- Brands ---------- */}
      <BrandsMarquee />

      {/* ---------- Team ---------- */}
      <section className="relative bg-void px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-haze">
              The people behind it
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
              One founder,
            </h2>
            <h2 className="font-display text-3xl font-semibold text-ion sm:text-5xl">
              a team built to match the ambition.
            </h2>
          </motion.div>

          {/* Founder — root node */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="relative mt-10 flex justify-center sm:mt-16"
          >
            <GlassPanel className="group relative flex w-full max-w-2xl flex-col items-center gap-5 overflow-hidden p-7 text-center transition-all duration-500 hover:-translate-y-1 sm:flex-row sm:gap-7 sm:p-9 sm:text-left">
              <div
                className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-ion/20 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100 sm:left-0 sm:-top-10"
                aria-hidden
              />
              <span className="absolute right-5 top-5 text-[10px] font-medium uppercase tracking-[0.2em] text-haze">
                Founder
              </span>
              <Avatar
                name={FOUNDER.name}
                hue={FOUNDER.hue}
                size="h-20 w-20 shrink-0 text-2xl sm:h-24 sm:w-24 sm:text-3xl"
              />
              <div>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {FOUNDER.name}
                </h3>
                <span className="mt-2 inline-block rounded-full border border-ion/30 bg-ion/10 px-3 py-1 text-xs text-ion">
                  {FOUNDER.role}
                </span>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-mist sm:text-base">
                  Leads MVM's strategy and vision — building the team, the
                  process, and the standard every project is held to.
                </p>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Tree connectors: trunk down, then a fanned spine to each member.
              Built from the SAME grid-cols-4 gap-5 as the card row below, so
              every line lands exactly on a card's column — no hardcoded coordinates. */}
          <div className="relative mx-auto mt-0 hidden h-16 w-full sm:grid sm:grid-cols-4 sm:gap-5">
            {/* trunk from founder, centered over the whole row */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-ion/70 to-ion/20"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
              style={{ transformOrigin: "top" }}
            />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="relative h-full">
                {/* spine segment reaching toward the next column, meeting at the gap's midpoint */}
                {i !== 3 && (
                  <motion.div
                    className="pointer-events-none absolute left-1/2 top-6 z-10 h-px origin-left bg-ion/30"
                    style={{ width: "calc(100% + 1.25rem)" }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.4,
                      ease: EASE,
                      delay: 0.35 + i * 0.06,
                    }}
                  />
                )}
                {/* vertical drop from spine down to this column's card */}
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-6 bottom-0 w-px origin-top -translate-x-1/2 bg-ion/30"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.35,
                    ease: EASE,
                    delay: 0.55 + i * 0.06,
                  }}
                />
              </div>
            ))}
          </div>

          {/* mobile-only simple spine, no fan (single column stack) */}
          <div className="relative mx-auto mt-4 block h-8 w-px sm:hidden">
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-ion/70 to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            />
          </div>

          {/* Team — branch nodes */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerChildren(0.08)}
            className="mt-0 grid grid-cols-2 gap-4 sm:mt-0 sm:grid-cols-4 sm:gap-5 [&:has([data-team-card]:hover)_[data-team-card]:not(:hover)]:scale-[0.96] [&:has([data-team-card]:hover)_[data-team-card]:not(:hover)]:opacity-50"
          >
            {TEAM.map((member, i) => {
              const accent = TEAM_ACCENTS[i % TEAM_ACCENTS.length];
              return (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  className="relative flex flex-col items-center"
                >
                  {/* node dot at the top of the card, sits on the tree line */}
                  <span
                    className="mb-3 hidden h-2.5 w-2.5 rounded-full sm:block"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 12px 2px ${accent}80`,
                    }}
                  />
                  {i < 4 && (
                    <span className="pointer-events-none absolute -bottom-5 left-1/2 hidden h-5 w-px -translate-x-1/2 bg-gradient-to-b from-ion/30 to-transparent sm:block" />
                  )}
                  <GlassPanel
                    data-team-card
                    className="group relative flex h-full w-full flex-col items-center gap-3 overflow-hidden p-5 text-center transition-all duration-500 hover:-translate-y-1 sm:p-6"
                  >
                    <span className="absolute left-3 top-3 font-display text-xs text-haze">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"
                      style={{ backgroundColor: `${accent}25` }}
                    />
                    <div
                      className="pointer-events-none absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 transition-all duration-700 group-hover:w-2/3"
                      style={{
                        backgroundColor: accent,
                        boxShadow: `0 0 16px 3px ${accent}60`,
                      }}
                    />
                    <Avatar name={member.name} hue={member.hue} />
                    <div className="relative">
                      <p className="text-sm font-medium text-ink sm:text-base">
                        {member.name}
                      </p>
                      <p className="mt-0.5 text-xs text-mist sm:text-sm">
                        {member.role}
                      </p>
                    </div>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <Testimonials />

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden bg-void px-4 py-20 sm:px-6 sm:py-32">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/20 opacity-40 blur-[140px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 opacity-30 blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-500/10 opacity-30 blur-[120px]"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-ion/30 bg-ion/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ion"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ion" />
            Currently booking Q4 projects
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-display-2 font-semibold text-ink"
          >
            Let's build something worth
            <br className="hidden sm:block" />{" "}
            <span className="italic text-ion">paying attention to.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-5 max-w-xl text-base text-mist sm:text-lg"
          >
            Tell us where things stand and where you want them to go. We'll
            reply within a day with next steps, not a sales script.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton href="/contact" className="rounded-full">
              Start a Project
            </MagneticButton>
            <a
              href="mailto:hello@mvmdigitals.com"
              className="text-sm font-medium text-mist underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              or email us directly
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-haze"
          >
            <span>No obligation call</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>Reply within 24 hours</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>Straight answer on fit</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
