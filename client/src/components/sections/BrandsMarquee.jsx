// import { motion } from "framer-motion";

// // Demo logo placeholders — abstract mark + fictional name, so nothing here
// // depends on real client logos. Swap DEMO_LOGOS for real client marks
// // (as <img> imports) once approved.
// const DEMO_LOGOS = [
//   { name: "Northfield", shape: "circle" },
//   { name: "Vantree", shape: "triangle" },
//   { name: "Solace Co.", shape: "square" },
//   { name: "Kindra", shape: "hex" },
//   { name: "Bureau 9", shape: "diamond" },
//   { name: "Fernway", shape: "circle" },
//   { name: "Amberlane", shape: "triangle" },
//   { name: "Loop & Co", shape: "square" },
//   { name: "Nordhaus", shape: "hex" },
//   { name: "Palet", shape: "diamond" },
// ];

// const ROW_ONE = DEMO_LOGOS.slice(0, 5);
// const ROW_TWO = DEMO_LOGOS.slice(5, 10);

// function LogoMark({ shape }) {
//   const common = { width: 18, height: 18, fill: "currentColor" };
//   switch (shape) {
//     case "triangle":
//       return (
//         <svg viewBox="0 0 18 18" {...common}>
//           <polygon points="9,1 17,17 1,17" />
//         </svg>
//       );
//     case "square":
//       return (
//         <svg viewBox="0 0 18 18" {...common}>
//           <rect x="2" y="2" width="14" height="14" rx="3" />
//         </svg>
//       );
//     case "hex":
//       return (
//         <svg viewBox="0 0 18 18" {...common}>
//           <polygon points="9,1 16,5 16,13 9,17 2,13 2,5" />
//         </svg>
//       );
//     case "diamond":
//       return (
//         <svg viewBox="0 0 18 18" {...common}>
//           <polygon points="9,1 17,9 9,17 1,9" />
//         </svg>
//       );
//     default:
//       return (
//         <svg viewBox="0 0 18 18" {...common}>
//           <circle cx="9" cy="9" r="8" />
//         </svg>
//       );
//   }
// }

// function MarqueeRow({ logos, direction = "left", speed = 30 }) {
//   // duplicated so the loop has no visible seam
//   const track = [...logos, ...logos];

//   return (
//     <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
//       <div
//         className={`marquee-track flex w-max items-center will-change-transform ${
//           direction === "left"
//             ? "animate-marquee-left"
//             : "animate-marquee-right"
//         }`}
//         style={{ "--marquee-duration": `${speed}s` }}
//       >
//         {track.map((logo, i) => (
//           <div
//             key={i}
//             className="mr-8 flex h-9 w-32 shrink-0 items-center justify-center gap-2 grayscale opacity-50 transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:mr-16 sm:h-12 sm:w-40"
//           >
//             <span className="text-ion">
//               <LogoMark shape={logo.shape} />
//             </span>
//             <span className="font-display text-sm font-semibold tracking-tight text-ink sm:text-base">
//               {logo.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function BrandsMarquee() {
//   return (
//     <section className="relative z-10 isolate overflow-hidden px-4 py-20 sm:px-10 sm:py-32">
//       <div className="relative mx-auto max-w-6xl">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="text-center"
//         >
//           <p className="text-xs font-medium uppercase tracking-[0.25em] text-mist">
//             Trusted by
//           </p>
//           <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
//             Teams we've{" "}
//             <span className="italic text-ion">worked alongside</span>
//           </h2>
//         </motion.div>

//         <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:gap-10">
//           <MarqueeRow logos={ROW_ONE} direction="left" speed={22} />
//           <MarqueeRow logos={ROW_TWO} direction="right" speed={26} />
//         </div>
//       </div>

//       <style>{`
//   .marquee-track {
//     animation-duration: var(--marquee-duration, 30s);
//     animation-timing-function: linear;
//     animation-iteration-count: infinite;
//     backface-visibility: hidden;
//     transform: translate3d(0, 0, 0);
//   }
//   .marquee-track:hover {
//     animation-play-state: paused;
//   }
//   @keyframes marquee-left {
//     from { transform: translate3d(0, 0, 0); }
//     to { transform: translate3d(-50%, 0, 0); }
//   }
//   @keyframes marquee-right {
//     from { transform: translate3d(-50%, 0, 0); }
//     to { transform: translate3d(0, 0, 0); }
//   }
//   .animate-marquee-left { animation-name: marquee-left; }
//   .animate-marquee-right { animation-name: marquee-right; }
// `}</style>
//     </section>
//   );
// }

import { motion } from "framer-motion";

// Real client logos — served from /images/clients_enhanced_png/
const CLIENT_LOGOS = Array.from({ length: 28 }, (_, i) => ({
  name: `Client ${i + 1}`,
  src: `/images/clients/${i + 1}.png`,
}));

const half = Math.ceil(CLIENT_LOGOS.length / 2);
const ROW_ONE = CLIENT_LOGOS.slice(0, half);
const ROW_TWO = CLIENT_LOGOS.slice(half);

function MarqueeRow({ logos, direction = "left", speed = 30 }) {
  // duplicated so the loop has no visible seam
  const track = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`marquee-track flex w-max items-center will-change-transform ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={{ "--marquee-duration": `${speed}s` }}
      >
        {track.map((logo, i) => (
          <div
            key={i}
            className="mr-8 flex h-9 w-32 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105 sm:mr-16 sm:h-12 sm:w-40"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = logo.src.replace(".png", ".webp", ".jpg");
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandsMarquee() {
  return (
    <section className="relative z-10 isolate overflow-hidden px-4 py-20 sm:px-10 sm:py-32">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-mist">
            Trusted by
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            Teams we've{" "}
            <span className="italic text-ion">worked alongside</span>
          </h2>
        </motion.div>

        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:gap-10">
          <MarqueeRow logos={ROW_ONE} direction="left" speed={22} />
          <MarqueeRow logos={ROW_TWO} direction="right" speed={26} />
        </div>
      </div>

      <style>{`
  .marquee-track {
    animation-duration: var(--marquee-duration, 30s);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
  @keyframes marquee-left {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
  }
  @keyframes marquee-right {
    from { transform: translate3d(-50%, 0, 0); }
    to { transform: translate3d(0, 0, 0); }
  }
  .animate-marquee-left { animation-name: marquee-left; }
  .animate-marquee-right { animation-name: marquee-right; }
`}</style>
    </section>
  );
}
