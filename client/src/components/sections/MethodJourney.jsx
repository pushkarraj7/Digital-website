import { useEffect, useRef, useState } from "react";
import { ACCENTS_EXTENDED } from "../../lib/constants";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";
import { GlassPanel } from "../ui/GlassPanel";
import {
  Compass,
  Target,
  Sparkles,
  Rocket,
  LineChart,
  TrendingUp,
  Check,
} from "lucide-react";

const STEPS = [
  {
    id: "01",
    title: "Discover",
    short: "Understanding the business before touching anything else.",
    copy: "Before we touch a single design file, we spend real time understanding the business — the market it's competing in, what customers actually think of it, and where growth is quietly leaking out.",
    color: ACCENTS_EXTENDED[0],
    icon: Compass,
    deliverables: [
      "Market & competitor audit",
      "Customer research",
      "Growth gap analysis",
    ],
  },
  {
    id: "02",
    title: "Position",
    short: "Finding the angle nobody else in the category has claimed.",
    copy: "Most categories are more crowded than they look. We dig for the angle a competitor hasn't claimed yet, and build messaging around that instead of repeating what everyone else is already saying.",
    color: ACCENTS_EXTENDED[1],
    icon: Target,
    deliverables: [
      "Positioning statement",
      "Category framing",
      "Messaging pillars",
    ],
  },
  {
    id: "03",
    title: "Create",
    short: "Building the brand and experience around that position.",
    copy: "This is where the brand and the digital experience actually get built — identity, guidelines, and the website or product people will spend time in. Nothing here is arbitrary; every choice ties back to the positioning.",
    color: ACCENTS_EXTENDED[2],
    icon: Sparkles,
    deliverables: [
      "Visual identity system",
      "Brand guidelines",
      "Web & product experience",
    ],
  },
  {
    id: "04",
    title: "Activate",
    short: "Launching it properly across the channels that matter.",
    copy: "A brand sitting quietly does nothing. We launch it properly — campaigns, content, and a channel plan built for where your audience actually spends their time, not a generic checklist.",
    color: ACCENTS_EXTENDED[3],
    icon: Rocket,
    deliverables: [
      "Launch campaign",
      "Content calendar",
      "Channel rollout plan",
    ],
  },
  {
    id: "05",
    title: "Optimize",
    short: "Watching real behavior instead of relying on assumptions.",
    copy: "Once real traffic and real customers are in the picture, assumptions stop mattering. We watch what the data actually shows and adjust — that's usually where the biggest wins are hiding.",
    color: ACCENTS_EXTENDED[4],
    icon: LineChart,
    deliverables: [
      "Performance dashboards",
      "A/B test roadmap",
      "Funnel diagnostics",
    ],
  },
  {
    id: "06",
    title: "Grow",
    short: "Doubling down on what's proven to work, cutting what isn't.",
    copy: "By this stage we know exactly which channels, creative, and campaigns are pulling their weight — so we double down on those and cut what isn't earning its budget.",
    color: ACCENTS_EXTENDED[5],
    icon: TrendingUp,
    deliverables: [
      "Scaling playbook",
      "Budget reallocation",
      "Expansion roadmap",
    ],
  },
];

const N = STEPS.length;

export function MethodJourney() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 1024px)").matches;
  });

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    function onChange(e) {
      setIsDesktop(e.matches);
    }
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const overallWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isDesktop) return;
    setActive(Math.min(N - 1, Math.floor(v * N)));
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-void px-6"
      style={isDesktop ? { height: `${N * 60}vh`, zIndex: 10 } : { zIndex: 10 }}
    >
      <div
        className={cn(
          "flex items-center bg-void px-6",
          isDesktop ? "sticky top-0 h-screen pt-20" : "relative py-16",
        )}
        style={
          isDesktop
            ? { transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }
            : undefined
        }
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* left rail */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-haze">
              The MVM Method
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">
              How We Work
            </h2>
            <p className="mt-3 text-sm text-mist">
              No two projects start from the same place, but the process that
              gets them to results is the same six steps, every time.
            </p>

            {isDesktop && (
              <div className="relative mt-10 flex flex-col">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10" />
                <div
                  className="absolute left-4 top-4 w-px origin-top transition-all duration-700 ease-out"
                  style={{
                    height: `${(active / (N - 1)) * 100}%`,
                    backgroundColor: STEPS[active].color,
                  }}
                />

                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === active;
                  const isPast = i < active;

                  return (
                    <div
                      key={step.id}
                      className="relative z-10 flex gap-4 pb-6 last:pb-0"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
                        style={{
                          borderColor:
                            isActive || isPast
                              ? step.color
                              : "rgba(243,245,249,0.08)",
                          backgroundColor: "#070A10",
                          boxShadow: isActive
                            ? `0 0 16px ${step.color}55`
                            : "none",
                        }}
                      >
                        {isPast ? (
                          <Check
                            className="h-3.5 w-3.5"
                            style={{ color: step.color }}
                          />
                        ) : (
                          <Icon
                            className="h-3.5 w-3.5 transition-colors duration-500"
                            style={{
                              color: isActive ? step.color : "#5A6478",
                            }}
                          />
                        )}
                      </span>

                      <div className="flex flex-col pt-1">
                        <span className="flex items-baseline gap-2">
                          <span
                            className="font-display text-xs transition-colors duration-500"
                            style={{ color: isActive ? step.color : undefined }}
                          >
                            {step.id}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-medium transition-colors duration-500",
                              isActive ? "text-ink" : "text-haze",
                            )}
                          >
                            {step.title}
                          </span>
                        </span>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-1.5 max-w-[210px] text-xs leading-relaxed text-mist">
                            {step.short}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {isDesktop && (
              <div className="mt-4 flex items-center gap-3">
                <span
                  className="font-display text-xl font-semibold transition-colors duration-500"
                  style={{ color: STEPS[active].color }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full transition-colors duration-500"
                    style={{
                      width: overallWidth,
                      backgroundColor: STEPS[active].color,
                    }}
                  />
                </div>
                <span className="text-xs text-haze">
                  {String(N).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          {/* card stack — pinned/scrubbed on desktop, plain list on mobile/tablet */}
          {isDesktop ? (
            <div className="relative h-[520px] w-full">
              {STEPS.map((step, i) => (
                <Card
                  key={step.id}
                  step={step}
                  index={i}
                  total={N}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col gap-6">
              {STEPS.map((step) => (
                <StaticCard key={step.id} step={step} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StaticCard({ step }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <GlassPanel
        className="relative flex flex-col justify-between overflow-hidden p-8"
        style={{
          background:
            "linear-gradient(160deg, rgba(14,16,24,0.96), rgba(8,9,14,0.98))",
          boxShadow: `0 0 60px ${step.color}22, 0 20px 40px rgba(0,0,0,0.5)`,
          borderColor: `${step.color}40`,
        }}
      >
        <span
          className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[150px] font-bold leading-none opacity-[0.05]"
          style={{ color: step.color }}
        >
          {step.id}
        </span>

        <div className="relative flex flex-col justify-between">
          <div className="relative flex items-center gap-3">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${step.color}1a`,
                border: `1px solid ${step.color}40`,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: step.color }} />
            </span>
            <span
              className="font-display text-4xl font-semibold"
              style={{ color: step.color }}
            >
              {step.id}
            </span>
          </div>

          <div className="relative mt-5">
            <h3 className="font-display text-2xl font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              {step.copy}
            </p>

            <ul className="mt-4 flex flex-col gap-2">
              {step.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-sm text-mist"
                >
                  <Check
                    className="h-4 w-4 shrink-0"
                    style={{ color: step.color }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function Card({ step, index, total, progress }) {
  const raw = useTransform(progress, (v) => v * total - index);

  const y = useTransform(raw, (r) => {
    const pad = 0.6;
    if (r < -pad) return 420;
    if (r < pad) {
      const t = (r + pad) / (pad * 2);
      return 420 * (1 - t);
    }
    const depth = Math.min(r - pad, 3);
    return -depth * 22;
  });

  const scale = useTransform(raw, (r) => {
    const pad = 0.6;
    if (r < -pad) return 0.92;
    if (r < pad) {
      const t = (r + pad) / (pad * 2);
      return 0.92 + 0.08 * t;
    }
    const depth = Math.min(r - pad, 3);
    return 1 - depth * 0.045;
  });

  const opacity = useTransform(raw, (r) => {
    const pad = 0.6;
    if (r < -pad) return 0;
    if (r < 0) {
      const t = (r + pad) / pad;
      return Math.min(1, t);
    }
    const depth = Math.min(r - pad, 3);
    return depth > 2.6 ? Math.max(0, 1 - (depth - 2.6) * 3) : 1;
  });

  const contentOpacity = useTransform(raw, (r) => {
    const pad = 0.6;
    if (r < 0) return 0;
    if (r < pad) return r / pad;
    return 1;
  });

  const dim = useTransform(raw, (r) => {
    const pad = 0.35;
    const depth = r < pad ? 0 : Math.min(r - pad, 3);
    return depth * 0.12;
  });

  const start = index / total;
  const end = (index + 1) / total;
  const barWidth = useTransform(progress, [start, end], ["0%", "100%"]);

  const Icon = step.icon;

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        zIndex: index,
        transformOrigin: "top center",
      }}
      className="absolute inset-0"
    >
      <GlassPanel
        className="group relative flex h-full flex-col justify-between overflow-hidden p-10"
        style={{
          background:
            "linear-gradient(160deg, rgba(14,16,24,0.96), rgba(8,9,14,0.98))",
          boxShadow: `0 0 90px ${step.color}26, 0 30px 60px rgba(0,0,0,0.6)`,
          borderColor: `${step.color}40`,
        }}
      >
        <span
          className="pointer-events-none absolute -bottom-10 -right-4 select-none font-display text-[220px] font-bold leading-none opacity-[0.04]"
          style={{ color: step.color }}
        >
          {step.id}
        </span>

        <motion.div
          className="relative flex h-full flex-col justify-between"
          style={{ opacity: contentOpacity }}
        >
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{
                  backgroundColor: `${step.color}1a`,
                  border: `1px solid ${step.color}40`,
                }}
              >
                <Icon className="h-6 w-6" style={{ color: step.color }} />
              </span>
              <span
                className="font-display text-5xl font-semibold sm:text-6xl"
                style={{ color: step.color }}
              >
                {step.id}
              </span>
            </div>
            <span className="text-xs text-haze">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="relative">
            <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {step.title}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mist">
              {step.copy}
            </p>

            <ul className="mt-6 flex max-w-md flex-col gap-2 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
              {step.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-sm text-mist"
                >
                  <Check
                    className="h-4 w-4 shrink-0"
                    style={{ color: step.color }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-8 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ width: barWidth, backgroundColor: step.color }}
            />
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: dim }}
        />
      </GlassPanel>
    </motion.div>
  );
}
