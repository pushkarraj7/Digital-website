import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Zap } from "lucide-react";

import { GlassPanel } from "../components/ui/GlassPanel";
import { EASE, viewportOnce, fadeUp, staggerChildren } from "../lib/animations";

const EnquiryForm = lazy(() =>
  import("../components/sections/EnquiryForm").then((m) => ({
    default: m.EnquiryForm,
  })),
);

const REASSURANCE = [
  {
    icon: Zap,
    title: "Fast reply",
    copy: "We read every enquiry and get back within a day, usually sooner.",
    color: "#7FB4FF",
  },
  {
    icon: MessageCircle,
    title: "No sales script",
    copy: "You'll talk to the people actually doing the work, not a rep.",
    color: "#7F5FFF",
  },
  {
    icon: Sparkles,
    title: "Straight answer",
    copy: "If we're not the right fit, we'll tell you that too.",
    color: "#FF8B6B",
  },
];

export function Contact() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pb-32 pt-28 sm:px-6 sm:pb-44">
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/20 opacity-40 blur-[160px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-aurora/20 opacity-30 blur-[140px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-ion" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-mist">
              Contact MVM Digital
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-display-1 font-semibold text-ink sm:mt-8"
          >
            Let's talk about{" "}
            <span className="italic text-ion">what you're building.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-base text-mist sm:text-lg"
          >
            Whether it's a full rebuild or one piece of the puzzle, tell us
            where things stand. We'll take it from there.
          </motion.p>
        </div>
      </section>

      {/* ---------- Reassurance strip — floats between hero and form ---------- */}
      <section className="relative z-20 -mt-16 -mb-16 px-4 sm:-mt-24 sm:-mb-24 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerChildren(0.08)}
          className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-line rounded-3xl border border-line bg-surface/70 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {REASSURANCE.map(({ icon: Icon, title, copy, color }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative overflow-hidden p-6 sm:p-7"
            >
              <div
                className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rounded-full opacity-0 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"
                style={{ backgroundColor: `${color}25` }}
              />
              <span
                className="relative flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${color}1a`,
                  border: `1px solid ${color}40`,
                }}
              >
                <Icon className="h-4 w-4" style={{ color }} />
              </span>
              <p className="relative mt-4 text-sm font-medium text-ink sm:text-base">
                {title}
              </p>
              <p className="relative mt-1.5 text-xs leading-relaxed text-mist sm:text-sm">
                {copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- Enquiry form + details ---------- */}
      <Suspense fallback={null}>
        <EnquiryForm />
      </Suspense>
    </>
  );
}
