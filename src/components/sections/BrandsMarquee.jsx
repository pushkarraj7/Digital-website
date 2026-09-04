import { motion } from "framer-motion";

// Placeholder logos — swap these letters/labels for real PNG imports later
const ROW_ONE = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ROW_TWO = ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];

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
        {track.map((letter, i) => (
          <div
            key={i}
            className="mr-8 flex h-9 w-20 shrink-0 items-center justify-center grayscale opacity-50 transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:mr-16 sm:h-12 sm:w-28"
          >
            <span className="font-display text-lg font-semibold tracking-tight text-ink sm:text-2xl">
              {letter}
            </span>
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
            Brands we've <span className="italic text-ion">grown together</span>
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
