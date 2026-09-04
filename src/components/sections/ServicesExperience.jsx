import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICE_CATEGORIES } from "../../data/services";
import { GlassPanel } from "../ui/GlassPanel";

const CATEGORY_META = {
  strategy: {
    label: "Strategy",
    color: "#22d3ee",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-4.5 w-4.5"
      >
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  brand: {
    label: "Brand",
    color: "#f472b6",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-4.5 w-4.5"
      >
        <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2s-.4-1.4-1-2c-.6-.6-.4-2 1-2h2a4 4 0 0 0 4-4c0-4.4-3.6-8-8-8Z" />
        <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
        <circle cx="10.5" cy="7" r="1" fill="currentColor" />
        <circle cx="15" cy="8.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  digital: {
    label: "Digital",
    color: "#38bdf8",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-4.5 w-4.5"
      >
        <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
      </svg>
    ),
  },
  experience: {
    label: "Experience",
    color: "#a78bfa",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-4.5 w-4.5"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7 10 4h4l2 3" />
        <circle cx="12" cy="13.5" r="3.5" />
      </svg>
    ),
  },
};

const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((cat) =>
  cat.services.map((s) => ({ ...s, category: cat.id })),
);

const N = ALL_SERVICES.length;
const ANGLE_STEP = 360 / N;
const ROTATE_SPEED = 7; // deg/sec, clockwise

// Carousel geometry scales down on smaller viewports so cards
// stay on-screen instead of overflowing at the desktop RADIUS.
function getCarouselDimensions(width) {
  if (width < 480) {
    return {
      cardWidth: 190,
      cardHeight: 290,
      radius: 190,
      stageHeight: 330,
      perspective: 1000,
    };
  }
  if (width < 640) {
    return {
      cardWidth: 210,
      cardHeight: 300,
      radius: 230,
      stageHeight: 340,
      perspective: 1100,
    };
  }
  if (width < 1024) {
    return {
      cardWidth: 210,
      cardHeight: 280,
      radius: 360,
      stageHeight: 360,
      perspective: 1400,
    };
  }
  return {
    cardWidth: 260,
    cardHeight: 340,
    radius: 560,
    stageHeight: 440,
    perspective: 1800,
  };
}

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

export function ServicesExperience() {
  const [rotation, setRotation] = useState(0);
  const pausedRef = useRef(false);
  const rafRef = useRef();
  const lastRef = useRef(0);

  const [dimensions, setDimensions] = useState(() =>
    getCarouselDimensions(
      typeof window !== "undefined" ? window.innerWidth : 1400,
    ),
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );

  useEffect(() => {
    function onResize() {
      setDimensions(getCarouselDimensions(window.innerWidth));
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { cardWidth, cardHeight, radius, stageHeight, perspective } =
    dimensions;

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    if (reducedMotion) return;
    function tick(now) {
      if (!lastRef.current) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      if (!pausedRef.current) setRotation((r) => (r + ROTATE_SPEED * dt) % 360);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  // Index of the card currently front-and-center — used to show a single
  // card at a time on mobile (avoids the 3D fan overflowing small screens).
  const frontIndex = useMemo(() => {
    let best = { focus: -1, index: 0 };
    ALL_SERVICES.forEach((service, i) => {
      const theta = (i * ANGLE_STEP + rotation) % 360;
      const rad = (theta * Math.PI) / 180;
      const focus = (Math.cos(rad) + 1) / 2;
      if (focus > best.focus) best = { focus, index: i };
    });
    return best.index;
  }, [rotation]);

  // Which card is currently frontmost — used to tint the ambient glow.
  const frontCategory = useMemo(() => {
    let best = { focus: -1, color: CATEGORY_META.digital.color };
    ALL_SERVICES.forEach((service, i) => {
      const theta = (i * ANGLE_STEP + rotation) % 360;
      const rad = (theta * Math.PI) / 180;
      const focus = (Math.cos(rad) + 1) / 2;
      if (focus > best.focus)
        best = { focus, color: CATEGORY_META[service.category].color };
    });
    return best.color;
  }, [rotation]);

  // included in dep array only for clarity; radius doesn't affect focus calc

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-void px-4 py-16 sm:px-6 sm:py-24"
      style={{ zIndex: 0 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            One system. Every discipline.
          </h2>
          <p className="mt-5 text-base text-mist sm:text-lg">
            Ten disciplines, one team — everything MVM Digital brings to the
            table.
          </p>
        </div>
      </div>

      {/* ambient glow that follows the frontmost card's category */}
      <div
        className="pointer-events-none absolute left-1/2 top-[55%] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px] transition-colors duration-700"
        style={{ backgroundColor: frontCategory }}
      />

      <div
        className="relative mx-auto mt-10 max-w-[1400px] sm:mt-16"
        style={{ height: stageHeight, perspective: `${perspective}px` }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {ALL_SERVICES.map((service, i) => {
            const theta = (i * ANGLE_STEP + rotation) % 360;
            const deltaSigned = ((theta + 180) % 360) - 180; // -180..180, 0 = front
            const rad = (theta * Math.PI) / 180;

            const x = radius * Math.sin(rad);
            const z = radius * Math.cos(rad);
            const focus = (Math.cos(rad) + 1) / 2; // 1 = front, 0 = back

            const tilt = clamp(deltaSigned, -75, 75) * -0.45; // bounded fan tilt, never flips
            const opacity = 0.08 + Math.pow(focus, 2.2) * 0.92;
            const scale = 0.58 + Math.pow(focus, 1.6) * 0.5;
            const meta = CATEGORY_META[service.category];
            const isFront = focus > 0.85;

            if (isMobile && i !== frontIndex) return null;

            return (
              <div
                key={service.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(-50%, -50%, 0) translate3d(${x}px, 0, ${z}px) rotateY(${tilt}deg) scale(${scale})`,
                  zIndex: Math.round(focus * 1000),
                }}
              >
                <GlassPanel
                  data-cursor="interactive"
                  className="flex flex-col overflow-hidden p-4 bg-[#0b0d14]/90 sm:p-6"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    opacity,
                    pointerEvents: focus > 0.55 ? "auto" : "none",
                    background: `linear-gradient(160deg, rgba(14,16,24,0.96), rgba(8,9,14,0.98))`,
                    backdropFilter: "none",
                    WebkitBackdropFilter: "none",
                    boxShadow: isFront
                      ? `0 0 70px ${meta.color}40, 0 30px 60px rgba(0,0,0,0.6)`
                      : "0 8px 40px rgba(0,0,0,0.5)",
                    borderColor: isFront ? `${meta.color}66` : undefined,
                    transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-medium"
                      style={{
                        color: meta.color,
                        backgroundColor: `${meta.color}1a`,
                      }}
                    >
                      {meta.label}
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{
                        color: meta.color,
                        backgroundColor: `${meta.color}1a`,
                      }}
                    >
                      {meta.icon}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold text-ink sm:mt-6 sm:text-xl">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist sm:mt-3 sm:text-sm">
                    {service.line}
                  </p>

                  <div className="mt-auto flex items-center justify-end pt-3 sm:pt-6">
                    <a
                      href="#contact"
                      className="text-sm font-medium text-ion transition-colors hover:text-ink"
                    >
                      Read More →
                    </a>
                  </div>
                </GlassPanel>
              </div>
            );
          })}
        </div>
      </div>

      {/* filmic grain overlay */}
      {/* <div
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      /> */}
    </section>
  );
}
