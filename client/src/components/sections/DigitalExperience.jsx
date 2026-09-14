import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Zap, MousePointerClick, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { EASE } from "../../lib/animations";

const STAGES = [
  {
    id: "discovery",
    label: "Discovery",
    copy: "A visitor lands, searching for a solution to a real problem.",
    icon: Search,
    color: "#22d3ee",
  },
  {
    id: "experience",
    label: "Experience",
    copy: "The site responds — fast, clear, and built around what they came for.",
    icon: Zap,
    color: "#a78bfa",
  },
  {
    id: "interaction",
    label: "Interaction",
    copy: "A 360 tour, a configurator, a form that feels like a conversation.",
    icon: MousePointerClick,
    color: "#f472b6",
  },
  {
    id: "conversion",
    label: "Conversion",
    copy: "The next step is obvious, and easy to take.",
    icon: CheckCircle2,
    color: "#34d399",
  },
];

const AUTO_ADVANCE_MS = 4500;

export function DigitalExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = STAGES[activeIndex];

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % STAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next, activeIndex]);

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-haze">
          How it comes together
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold text-ink sm:text-5xl">
          What a visitor actually experiences
        </h2>

        <div className="relative mt-16 bg-void overflow-hidden rounded-2xl border border-line">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-line bg-[#081b3d]/60 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span
              className="
                  ml-3 flex items-center gap-2
                  rounded-full border border-white/[0.06]
                  bg-white/[0.03]
                  px-3 py-1
                  text-xs text-haze
                  shadow-inner shadow-white/[0.02]
                  transition-all duration-300
                  hover:border-[#0C2959]/40
                  hover:bg-[#0C2959]/10
                  hover:text-white
                "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#28C840] shadow-[0_0_6px_#28C840]" />
              <span>mvmdigital.com</span>
            </span>
          </div>

          {/* visual mock content area — changes per stage */}
          <div className="relative h-[160px] overflow-hidden border-b border-line bg-gradient-to-br from-white/[0.02] to-transparent sm:h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <StageVisual stage={active} />
              </motion.div>
            </AnimatePresence>
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 100%, ${active.color}, transparent 60%)`,
              }}
            />
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-8 sm:p-10">
            {/* stage nav with progress bars */}
            <div className="-mx-5 flex flex-row gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-col sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                return (
                  <button
                    key={stage.id}
                    data-cursor="interactive"
                    onClick={() => setActiveIndex(i)}
                    className="group flex shrink-0 flex-col gap-2 text-left sm:shrink"
                  >
                    <span className="flex items-center gap-2">
                      <Icon
                        className="h-3.5 w-3.5 transition-colors duration-500"
                        style={{
                          color: isActive || isPast ? stage.color : undefined,
                        }}
                      />
                      <span
                        className={cn(
                          "text-sm transition-colors duration-500 ease-premium",
                          isActive
                            ? "text-ink"
                            : "text-mist group-hover:text-ink",
                        )}
                        style={{ color: isActive ? stage.color : undefined }}
                      >
                        {stage.label}
                      </span>
                    </span>
                    {/* progress track */}
                    <span className="relative h-[2px] w-16 overflow-hidden rounded-full bg-white/5 sm:w-full">
                      {isActive && (
                        <motion.span
                          key={activeIndex}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: AUTO_ADVANCE_MS / 1000,
                            ease: "linear",
                          }}
                          className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                      )}
                      {isPast && (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: stage.color, opacity: 1 }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: active.color }}
                >
                  0{activeIndex + 1} / 0{STAGES.length}
                </span>
                <p className="mt-2 font-display text-xl font-medium leading-snug text-ink sm:text-3xl">
                  {active.copy}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageVisual({ stage }) {
  const Icon = stage.icon;

  if (stage.id === "discovery") {
    return (
      <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-line bg-void/60 px-4 py-3">
        <Icon className="h-4 w-4 text-haze" />
        <div className="h-2 flex-1 rounded-full bg-white/10" />
      </div>
    );
  }

  if (stage.id === "experience") {
    return (
      <div className="grid w-full max-w-sm grid-cols-3 gap-2 px-4 sm:gap-3 sm:px-6">
        {[0, 1, 2].map((n) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: n * 0.1, duration: 0.4 }}
            className="h-12 rounded-lg border border-line bg-white/[0.03] sm:h-16"
          />
        ))}
      </div>
    );
  }

  if (stage.id === "interaction") {
    return (
      <motion.div
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-16 w-16 items-center justify-center rounded-full border"
        style={{
          borderColor: `${stage.color}60`,
          backgroundColor: `${stage.color}14`,
        }}
      >
        <Icon className="h-6 w-6" style={{ color: stage.color }} />
      </motion.div>
    );
  }

  // conversion
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "backOut" }}
      className="flex items-center gap-2 rounded-full px-5 py-2.5"
      style={{
        backgroundColor: `${stage.color}1a`,
        border: `1px solid ${stage.color}60`,
      }}
    >
      <Icon className="h-4 w-4" style={{ color: stage.color }} />
      <span className="text-sm font-medium" style={{ color: stage.color }}>
        Get started
      </span>
    </motion.div>
  );
}
