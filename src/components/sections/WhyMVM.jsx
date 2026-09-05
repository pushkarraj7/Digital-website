import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { EASE } from "../../lib/animations";

const PRINCIPLES = [
  {
    title: "One team, not three agencies",
    copy: "Your marketing team and your dev team are the same people.",
    detail:
      "Most businesses juggle a marketing agency, a separate web developer, and sometimes a third freelancer for design — each blaming the other when something breaks. Here, strategy, design, and build all sit under one roof, so nothing gets lost in translation.",
  },
  {
    title: "We build the tech, not just the ads",
    copy: "Software, apps, and websites — in-house, not outsourced.",
    detail:
      "Most digital marketing teams stop at campaigns and content. We also build the actual product — your website, your booking system, your internal tools — so the marketing and the thing it's promoting are built by people who understand both.",
  },
  {
    title: "We don't chase vanity metrics",
    copy: "A million impressions mean nothing if nobody buys.",
    detail:
      "It's easy to make a number go up — followers, likes, page views. We only report on the ones that actually move your business forward, even if that number is smaller and less exciting to screenshot.",
  },
  {
    title: "We say no sometimes",
    copy: "Not every idea deserves a yes.",
    detail:
      "If a request doesn't serve the actual goal — more inquiries, more sales, more trust — we'll tell you, even if it means turning down billable work.",
  },
  {
    title: "Real numbers, shared honestly",
    copy: "Good weeks and bad weeks, both get reported.",
    detail:
      "We're not going to hide a slow month behind a cherry-picked stat. You'll know what's actually working and what isn't, plainly.",
  },
  {
    title: "Fewer channels, done properly",
    copy: "Being everywhere badly beats nowhere at all.",
    detail:
      "We'd rather run two channels your audience actually uses really well than spread you thin across six because it looks comprehensive on a proposal.",
  },
  {
    title: "We test before we scale",
    copy: "Small bets before big budget.",
    detail:
      "Before we put real money behind an idea, we test it small and see if it actually holds up — not guess-and-hope with your whole quarter's spend.",
  },
  {
    title: "Direct access, no account managers",
    copy: "You talk to the people doing the actual work.",
    detail:
      "No relaying messages through a middle layer that doesn't understand the technical or creative details. You get the person actually building or running your campaign.",
  },
  {
    title: "Built to scale with you",
    copy: "What we build today shouldn't block you in a year.",
    detail:
      "Clean, documented builds mean your site or systems can grow as your business does, instead of needing a expensive rebuild every time you outgrow the last one.",
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
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-ion">
            Why MVM
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
            Every agency says
          </h2>
          <h2 className="font-display text-3xl font-semibold text-mist sm:text-5xl">
            they're different. Here's proof.
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
