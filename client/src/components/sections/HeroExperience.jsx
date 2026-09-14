// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef, useEffect } from "react";
// import { MagneticButton } from "../ui/MagneticButton";
// import { BRAND } from "../../lib/constants";
// import { EASE } from "../../lib/animations";
// import { Sparkles } from "lucide-react";
// import { useIsDesktop } from "../../hooks/useMediaQuery";

// export function HeroExperience() {
//   const isDesktop = useIsDesktop();
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end start"],
//   });

//   // Depth layers: background moves slowest, content moves faster —
//   // classic parallax. Adjust the output ranges to taste.
//   const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
//   const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
//   const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   // Plain ref (not a motion value) so the R3F render loop can read it
//   // every frame without triggering React re-renders.
//   const scrollRef = useRef(0);
//   useEffect(() => {
//     return scrollYProgress.on("change", (v) => {
//       scrollRef.current = v;
//     });
//   }, [scrollYProgress]);
//   return (
//     <section
//       ref={sectionRef}
//       id="home"
//       className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:pt-24"
//     >
//       {/* Layer 1: background glow — moves slowest (deepest) */}
//       <motion.div
//         style={{ y: glowY }}
//         className="pointer-events-none absolute inset-0"
//       >
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(55% 45% at 50% 40%, rgba(78,134,255,0.16), transparent 70%)",
//           }}
//         />
//       </motion.div>

//       {/* Layer 2: content — moves faster (foreground), fades on scroll-out */}
//       <motion.div
//         style={{ y: contentY, opacity: contentOpacity }}
//         className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
//       >
//         {/* Left: text content */}
//         <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
//           <motion.span
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, ease: EASE }}
//             className="flex items-center gap-2 rounded-full border border-line/70 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-mist backdrop-blur-sm sm:text-xs sm:tracking-[0.25em]"
//           >
//             <Sparkles className="h-3.5 w-3.5 text-ion" />
//             Digital marketing &amp; technology agency
//           </motion.span>

//           <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink xs:text-5xl sm:text-6xl sm:leading-[1] lg:text-6xl xl:text-7xl">
//             <motion.span
//               className="block"
//               initial={{ opacity: 0, y: 26 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.9, ease: EASE, delay: 0 }}
//             >
//               Turn Attention
//             </motion.span>
//             <motion.span
//               className="block font-medium italic text-ion"
//               initial={{ opacity: 0, y: 26 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
//             >
//               Into Growth.
//             </motion.span>
//           </h1>

//           <motion.p
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
//             className="mt-4 max-w-md text-balance text-md leading-relaxed text-mist sm:text-base"
//           >
//             {BRAND.supporting}
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: EASE, delay: 0.56 }}
//             className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
//           >
//             <MagneticButton
//               href="#contact"
//               data-cursor="interactive"
//               className="w-full rounded-full sm:w-auto"
//             >
//               Start a Project
//             </MagneticButton>
//             <MagneticButton
//               href="#work"
//               variant="secondary"
//               data-cursor="interactive"
//               className="w-full rounded-full sm:w-auto"
//             >
//               Explore Our Work
//             </MagneticButton>
//           </motion.div>
//         </div>

//         {/* Right: browser-window mockup, wide + short */}
//         {isDesktop && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.96 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, ease: EASE, delay: 0.3 }}
//             className="relative w-full max-w-lg justify-self-center lg:block lg:justify-self-end"
//           >
//             <div className="absolute -inset-3 rounded-[1.5rem] bg-ion/15 blur-2xl" />
//             <div className="relative overflow-hidden rounded-xl border border-line/60 bg-[#0d0f14] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
//               {/* Browser chrome bar */}
//               {/* <div className="flex items-center gap-1.5 border-b border-line/50 bg-[#081b3d]/60 px-3.5 py-2.5">
//               <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
//               <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
//               <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
//               <div className="ml-3 h-5 flex-1 rounded-md bg-white/5" />
//             </div> */}

//               {/* Screen content, wide rectangle */}
//               <div className="aspect-[16/10] w-full overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
//                   alt="Digital marketing dashboard preview"
//                   width={1200}
//                   height={750}
//                   loading="eager"
//                   fetchpriority="high"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: -4 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.9 }}
//         className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
//       >
//         <motion.span
//           animate={{ opacity: [0.08, 0.35, 0.08] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//           className="h-1.5 w-1.5 rounded-full bg-ion"
//         />
//         <motion.span
//           animate={{ opacity: [0.15, 0.65, 0.15] }}
//           transition={{
//             duration: 1.5,
//             delay: 0.2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="h-1.5 w-1.5 rounded-full bg-ion"
//         />
//         <motion.span
//           animate={{ opacity: [0.25, 1, 0.25] }}
//           transition={{
//             duration: 1.5,
//             delay: 0.4,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="h-1.5 w-1.5 rounded-full bg-ion shadow-[0_0_8px_rgba(78,134,255,0.5)]"
//         />
//       </motion.div>
//     </section>
//   );
// }

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useState } from "react";
import { MagneticButton } from "../ui/MagneticButton";
import { BRAND } from "../../lib/constants";
import { EASE, wordStagger, wordUp } from "../../lib/animations";
import { Sparkles } from "lucide-react";
import { useIsDesktop } from "../../hooks/useMediaQuery";
import { QuoteModal } from "../ui/QuoteModal";

const LINE_ONE = "Turn Attention".split(" ");
const LINE_TWO = "Into Growth.".split(" ");

export function HeroExperience() {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const imageCardRef = useRef(null);

  const scrollTiltX = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Raw cursor offset (-0.5 to 0.5), updated directly — no React state,
  // so mousemove never triggers a re-render.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth out the raw cursor value so it doesn't feel twitchy.
  const springX = useSpring(cursorX, {
    stiffness: 220,
    damping: 20,
    mass: 0.3,
  });
  const springY = useSpring(cursorY, {
    stiffness: 220,
    damping: 20,
    mass: 0.3,
  });

  const cursorRotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const cursorRotateY = useTransform(springX, [-0.5, 0.5], [-16, 16]);

  // Combine scroll-driven tilt + cursor-driven tilt into ONE value,
  // instead of two systems (style + animate) fighting over rotateX.
  const combinedRotateX = useTransform(
    [scrollTiltX, cursorRotateX],
    ([scroll, cursor]) => scroll + cursor,
  );

  function handleCardMouseMove(e) {
    isHoveringRef.current = true;
    const rect = imageCardRef.current.getBoundingClientRect();
    cursorX.set((e.clientX - rect.left) / rect.width - 0.5);
    cursorY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleCardMouseLeave() {
    isHoveringRef.current = false; // idle loop resumes automatically
  }

  // Auto "breathing" tilt — plays on its own via a slow sine wave so
  // visitors who never hover still see the 3D depth effect. Hovering
  // takes over instantly; leaving hands control back to the idle loop.
  const isHoveringRef = useRef(false);

  useAnimationFrame((t) => {
    if (isHoveringRef.current) return;
    const elapsed = t / 1000;
    cursorX.set(Math.sin(elapsed * 1.1) * 0.22);
    cursorY.set(Math.cos(elapsed * 0.85) * 0.14);
  });

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState(null);
  const startProjectRef = useRef(null);

  function openQuoteModal() {
    if (startProjectRef.current) {
      const rect = startProjectRef.current.getBoundingClientRect();
      setModalOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsQuoteOpen(true);
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:pt-24"
    >
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

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
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
            <span
              style={{ perspective: 900 }}
              className="block overflow-hidden"
            >
              {LINE_ONE.map((word, i) => (
                <span
                  key={i}
                  className="mr-[0.28em] inline-block"
                  style={{ perspective: 900 }}
                >
                  <motion.span
                    initial={{ rotateX: -100, opacity: 0, y: 20 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.15 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: "inline-block",
                      transformOrigin: "50% 100%",
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            <span
              style={{ perspective: 900 }}
              className="block overflow-hidden font-medium italic text-ion"
            >
              {LINE_TWO.map((word, i) => (
                <span
                  key={i}
                  className="mr-[0.28em] inline-block"
                  style={{ perspective: 900 }}
                >
                  <motion.span
                    initial={{ rotateX: -100, opacity: 0, y: 20 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.4 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: "inline-block",
                      transformOrigin: "50% 100%",
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <div className="mt-4 max-w-md overflow-hidden">
            <motion.p
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0, y: 8 }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.55,
              }}
              className="text-balance text-md leading-relaxed text-mist sm:text-base"
            >
              {BRAND.supporting}
            </motion.p>
          </div>

          <div className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <motion.div
              ref={startProjectRef}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.7,
              }}
              className="relative w-full overflow-hidden rounded-full sm:w-auto"
            >
              <MagneticButton
                onClick={(e) => {
                  e.preventDefault();
                  openQuoteModal();
                }}
                data-cursor="interactive"
                className="w-full rounded-full sm:w-auto"
              >
                Start a Project
              </MagneticButton>
              {/* one-time light sweep to draw the eye to the primary CTA */}
              <motion.span
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 1.1, delay: 1.4, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-20deg] bg-white/25 blur-sm"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.82,
              }}
              className="w-full sm:w-auto"
            >
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
        </div>

        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            style={{ perspective: 1400 }}
            className="relative w-full max-w-lg justify-self-center lg:block lg:justify-self-end"
          >
            <div className="absolute -inset-3 rounded-[1.5rem] bg-ion/15 blur-2xl" />
            <motion.div
              ref={imageCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                rotateX: combinedRotateX,
                rotateY: cursorRotateY,
                transformPerspective: 1400,
                scale: scrollScale,
              }}
              className="relative overflow-hidden rounded-xl border border-line/60 bg-[#0d0f14] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
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
            </motion.div>
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

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        origin={modalOrigin}
      />
    </section>
  );
}
