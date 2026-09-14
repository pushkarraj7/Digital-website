// src/components/sections/BuildPathCompare.jsx
//
// The core visual device of the page: a single section split into two
// tinted halves — WordPress vs. Custom — joined at a center seam,
// instead of two identical cards. Stacks vertically on mobile.

import { motion } from "framer-motion";
import { GitCompare, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true };

const paths = {
  wordpress: {
    label: "WordPress",
    eyebrow: "Platform",
    tint: "from-[#4C6E8A]/[0.14]",
    accent: "text-[#7FA6C4]",
    accentBg: "bg-[#7FA6C4]/10",
    accentBorder: "border-[#7FA6C4]/25",
    glow: "group-hover:shadow-[0_0_60px_-15px_rgba(127,166,196,0.25)]",
    body: "Custom themes and plugins on top of WordPress, built for teams who need to edit content themselves without calling a developer.",
    points: [
      "Custom theme, not a marketplace template",
      "WooCommerce for stores",
      "Editable by your team from day one",
      "Migrations from legacy CMS platforms",
    ],
    fit: "Best when it needs to be live fast and stay editable.",
  },
  custom: {
    label: "Custom-built",
    eyebrow: "Approach",
    tint: "from-ion/[0.14]",
    accent: "text-ion",
    accentBg: "bg-ion/10",
    accentBorder: "border-ion/25",
    glow: "group-hover:shadow-[0_0_60px_-15px_rgba(var(--ion-rgb,56,189,248),0.25)]",
    body: "Hand-coded front end and back end, no CMS underneath. Full control over architecture, performance, and how it integrates with everything else you run.",
    points: [
      "React front end, framework of your choice",
      "Back-end and API work included",
      "Built to scale past what a page builder allows",
      "No plugin dependencies to maintain",
    ],
    fit: "Best when the product needs its own architecture.",
  },
};

function Half({ data, align }) {
  const rightAlign = align === "right";

  return (
    <div
      className={`group relative flex flex-1 flex-col gap-6 bg-gradient-to-b ${data.tint} to-transparent p-8 transition-all duration-500 hover:bg-white/[0.015] md:p-12 ${
        rightAlign ? "md:items-end md:text-right" : ""
      }`}
    >
      <div>
        <span
          className={`text-xs font-medium uppercase tracking-[0.25em] ${data.accent}`}
        >
          {data.eyebrow}
        </span>
        <h3 className="mt-2 font-display text-3xl text-ink md:text-4xl">
          {data.label}
        </h3>
      </div>

      <p className="max-w-sm text-sm leading-relaxed text-mist md:text-base">
        {data.body}
      </p>

      <ul className={`flex flex-col gap-3 ${rightAlign ? "md:items-end" : ""}`}>
        {data.points.map((point) => (
          <li
            key={point}
            className={`flex max-w-sm items-start gap-2.5 text-sm text-mist/90 ${
              rightAlign ? "flex-row-reverse text-right" : ""
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${data.accentBg}`}
            >
              <Check className={`h-2.5 w-2.5 ${data.accent}`} strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>

      <span
        className={`mt-2 inline-flex max-w-sm items-center rounded-full border ${data.accentBorder} ${data.accentBg} px-4 py-2 text-xs font-medium ${data.accent}`}
      >
        {data.fit}
      </span>

      {/* corner glow on hover */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${data.glow}`}
      />
    </div>
  );
}

export function BuildPathCompare() {
  return (
    <div>
      <div className="mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
        >
          <GitCompare className="h-3.5 w-3.5" />
          Two Build Paths
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl"
        >
          Which One Is <span className="italic text-ion">Yours?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-mist"
        >
          Neither path is a compromise — they're built for different jobs.
          Here's how they actually differ.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.01]"
      >
        <div className="flex flex-col md:flex-row">
          <Half data={paths.wordpress} align="left" />

          {/* seam */}
          <div className="relative z-20 hidden w-px shrink-0 bg-gradient-to-b from-transparent via-white/15 to-transparent md:block">
            <span className="absolute left-1/2 top-16 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-void px-4 py-2 text-xs text-mist shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] lg:top-1/2">
              Not sure which? We'll tell you.
            </span>
          </div>
          <div className="block h-px w-full bg-white/10 md:hidden" />

          <Half data={paths.custom} align="right" />
        </div>
      </motion.div>
    </div>
  );
}
