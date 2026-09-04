import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { EASE } from "../../lib/animations";

const PRINCIPLES = [
  {
    title: "Strategy before execution",
    copy: "Every creative decision should have a reason.",
    detail:
      "We start with research, positioning, and a clear brief — not a blank canvas. Design without strategy is just decoration.",
  },
  {
    title: "Design with purpose",
    copy: "Beautiful is good. Effective is better.",
    detail:
      "Every pixel earns its place by moving a metric — attention, trust, or conversion. Aesthetics serve outcomes, not the other way around.",
  },
  {
    title: "Built around people",
    copy: "Technology matters. Human behavior matters more.",
    detail:
      "We design for how people actually behave online — their patience, their attention span, their habits — not how we wish they would.",
  },
  {
    title: "Optimize relentlessly",
    copy: "Launch is not the finish line.",
    detail:
      "Every product we ship is instrumented, measured, and iterated on. The first version is a hypothesis, not the answer.",
  },
  {
    title: "One team, full stack",
    copy: "Marketing and engineering, under one roof.",
    detail:
      "No handoffs between a design agency, a dev shop, and a marketing consultant. Strategy, build, and growth stay in sync because one team owns all three.",
  },
  {
    title: "Performance is a feature",
    copy: "A slow site is a broken site.",
    detail:
      "Every build is engineered for speed from day one — load times, Core Web Vitals, and mobile performance are treated as requirements, not afterthoughts.",
  },
  {
    title: "Transparent by default",
    copy: "You always know where things stand.",
    detail:
      "Clear timelines, honest scoping, and direct access to the people doing the work — no account managers relaying messages, no black-box process.",
  },
  {
    title: "Built to scale",
    copy: "What we build today shouldn't block you tomorrow.",
    detail:
      "Clean architecture and documented systems mean your site or product can grow with the business, instead of needing a rebuild every couple of years.",
  },
  {
    title: "Data over guesswork",
    copy: "Decisions backed by numbers, not opinions.",
    detail:
      "From SEO to ad spend to UX changes, we test, track, and let performance data guide the next move — not whoever argues loudest in the room.",
  },
  {
    title: "Partners, not vendors",
    copy: "We stick around after launch.",
    detail:
      "Our best work comes from long-term relationships — ongoing optimization, ownership of outcomes, and a genuine stake in your growth beyond the invoice.",
  },
];

export function WhyMVM() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-void px-4 py-16 sm:px-6 sm:py-24">
      <span className="pointer-events-none absolute -right-16 top-10 hidden select-none font-voice text-[280px] italic leading-none text-ink/[0.03] sm:block sm:text-[380px]">
        "
      </span>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-ion">
            Why MVM
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
            Not more noise.
          </h2>
          <h2 className="font-display text-3xl font-semibold text-mist sm:text-5xl">
            More meaningful digital experiences.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 sm:mt-20 lg:grid-cols-2">
          {[PRINCIPLES.slice(0, 5), PRINCIPLES.slice(5)].map(
            (column, colIdx) => (
              <div
                key={colIdx}
                className="divide-y divide-line border-y border-line"
              >
                {column.map((p, localI) => {
                  const i = colIdx * 5 + localI;
                  return (
                    <button
                      key={p.title}
                      data-cursor="interactive"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="relative block w-full py-5 text-left sm:py-8"
                    >
                      {active === i && (
                        <motion.span
                          layoutId="why-mvm-accent"
                          className="absolute -left-px top-0 h-full w-px bg-ion"
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      )}

                      <div className="flex items-center justify-between gap-3 pl-4 sm:gap-6 sm:pl-6">
                        <h3
                          className={cn(
                            "font-display text-lg font-medium transition-colors duration-500 ease-premium sm:text-xl lg:text-2xl",
                            active === i ? "text-ink" : "text-mist",
                          )}
                        >
                          {p.title}
                        </h3>
                        <span
                          className={cn(
                            "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 ease-premium sm:h-8 sm:w-8",
                            active === i && "rotate-45 border-ion",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute h-px w-3.5 transition-colors duration-500 ease-premium",
                              active === i ? "bg-ion" : "bg-haze",
                            )}
                          />
                          <span
                            className={cn(
                              "absolute h-3.5 w-px transition-colors duration-500 ease-premium",
                              active === i ? "bg-ion" : "bg-haze",
                            )}
                          />
                        </span>
                      </div>

                      <p className="mt-2 max-w-md pl-4 text-sm text-mist sm:mt-3 sm:pl-6">
                        {p.copy}
                      </p>

                      <AnimatePresence initial={false}>
                        {active === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden pl-4 sm:pl-6"
                          >
                            <p className="mt-3 max-w-md text-sm leading-relaxed text-haze sm:mt-4">
                              {p.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
