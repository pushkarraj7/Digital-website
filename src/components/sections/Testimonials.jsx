import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "../../data/testimonials";
import { EASE } from "../../lib/animations";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";

const DURATION = 5000;
const TICK = 50;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const [direction, setDirection] = useState(1);

  const current = TESTIMONIALS[index];
  const isTouch = useIsTouchDevice();

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 100 : -100 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -100 : 100 }),
  };

  useEffect(() => {
    if (paused) return;

    const start = Date.now() - progress * DURATION;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / DURATION, 1);

      if (pct >= 1) {
        setDirection(1);
        setIndex((i) => (i + 1) % TESTIMONIALS.length);
        setProgress(0);
      } else {
        setProgress(pct);
      }
    }, TICK);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  function goTo(i) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    setProgress(0);
  }

  function go(delta) {
    setDirection(delta);
    setIndex((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
    setProgress(0);
  }

  return (
    <section
      className="relative overflow-hidden border-y border-line px-4 py-16 sm:px-6 sm:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="relative rounded-2xl border border-ink/15 px-5 py-12 text-center sm:px-16 sm:py-14">
          <span className="pointer-events-none absolute left-1 -top-10 select-none font-display text-[90px] italic leading-none text-ink/[0.15] sm:-left-4 sm:-top-12 sm:text-[180px]">
            "
          </span>
          <button
            data-cursor="interactive"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 text-haze transition-colors duration-300 hover:text-ink sm:block"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            data-cursor="interactive"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-haze transition-colors duration-300 hover:text-ink sm:block"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M9 18l6-6-6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="relative min-h-[180px] sm:min-h-[220px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag={isTouch ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                }}
                className="absolute inset-0"
              >
                <p className="font-display text-xl font-medium leading-snug text-ink sm:text-3xl">
                  {current.quote}
                </p>

                <div className="mt-6 flex items-center justify-center gap-3 sm:mt-10">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ion/30 font-mono text-xs text-ion sm:h-11 sm:w-11">
                    {current.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="text-left">
                    <p className="text-sm text-ink">{current.name}</p>
                    <p className="text-xs text-haze">
                      {current.role}, {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:flex-nowrap">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              data-cursor="interactive"
              onClick={() => goTo(i)}
              className="relative h-px w-8 overflow-hidden bg-line sm:w-12"
              aria-label={`Show testimonial from ${t.name}`}
            >
              <span
                className="absolute inset-y-0 left-0 bg-ion transition-[width] duration-75 ease-linear"
                style={{
                  width:
                    i === index
                      ? `${progress * 100}%`
                      : i < index
                        ? "100%"
                        : "0%",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
