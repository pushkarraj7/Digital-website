import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { MagneticButton } from "../ui/MagneticButton";
import { BRAND } from "../../lib/constants";
import { EASE } from "../../lib/animations";
import { Sparkles } from "lucide-react";
import { useIsDesktop } from "../../hooks/useMediaQuery";

export function HeroExperience() {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Depth layers: background moves slowest, content moves faster —
  // classic parallax. Adjust the output ranges to taste.
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Plain ref (not a motion value) so the R3F render loop can read it
  // every frame without triggering React re-renders.
  const scrollRef = useRef(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [scrollYProgress]);
  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:pt-24"
    >
      {/* Layer 1: background glow — moves slowest (deepest) */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 40%, rgba(78,134,255,0.16), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Layer 2: content — moves faster (foreground), fades on scroll-out */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        {/* Left: text content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-2 rounded-full border border-line/70 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-mist backdrop-blur-sm sm:text-xs sm:tracking-[0.25em]"
          >
            <Sparkles className="h-3.5 w-3.5 text-ion" />
            Digital marketing &amp; technology agency
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink xs:text-5xl sm:text-6xl sm:leading-[1] lg:text-6xl xl:text-7xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0 }}
            >
              Turn Attention
            </motion.span>
            <motion.span
              className="block font-medium italic text-ion"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            >
              Into Growth.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
            className="mt-4 max-w-md text-balance text-md leading-relaxed text-mist sm:text-base"
          >
            {BRAND.supporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.56 }}
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
        </div>

        {/* Right: browser-window mockup, wide + short */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="relative w-full max-w-lg justify-self-center lg:block lg:justify-self-end"
          >
            <div className="absolute -inset-3 rounded-[1.5rem] bg-ion/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border border-line/60 bg-[#0d0f14] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              {/* Browser chrome bar */}
              {/* <div className="flex items-center gap-1.5 border-b border-line/50 bg-[#081b3d]/60 px-3.5 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 h-5 flex-1 rounded-md bg-white/5" />
            </div> */}

              {/* Screen content, wide rectangle */}
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                  alt="Digital marketing dashboard preview"
                  width={1200}
                  height={750}
                  loading="eager"
                  fetchpriority="high"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
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
