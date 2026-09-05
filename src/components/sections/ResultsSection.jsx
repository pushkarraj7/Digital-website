import { motion } from "framer-motion";
import { TrendingUp, Target, Users, TrendingDown } from "lucide-react";
import { AnimatedCounter } from "../ui/AnimatedCounter";

const METRICS = [
  {
    value: 184,
    prefix: "+",
    suffix: "%",
    label: "Organic visibility",
    icon: TrendingUp,
    color: "#22d3ee",
    large: true,
  },
  {
    value: 3.7,
    suffix: "\u00d7",
    label: "Campaign ROAS",
    icon: Target,
    color: "#a78bfa",
  },
  {
    value: 126,
    prefix: "+",
    suffix: "%",
    label: "Qualified leads",
    icon: Users,
    color: "#f472b6",
  },
  {
    value: 68,
    suffix: "%",
    label: "Lower acquisition cost",
    icon: TrendingDown,
    color: "#34d399",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function ResultsSection() {
  return (
    <section id="results" className="relative px-4 py-16 sm:px-6 sm:py-24">
      {/* soft ambient glow behind the numbers */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, #22d3ee, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-haze">
            Results
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
            Great work turns heads.
          </h2>
          <h2 className="font-display text-3xl font-semibold text-ion sm:text-5xl">
            Good numbers keep them turned.
          </h2>
        </motion.div>

        <div className="relative mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="group relative overflow-hidden bg-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 sm:p-8 lg:p-10"
              >
                {/* hover glow */}
                {/* hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(220px circle at 30% 20%, ${metric.color}25, transparent 70%)`,
                  }}
                />

                {/* corner glow */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"
                  style={{
                    backgroundColor: `${metric.color}20`,
                  }}
                />

                {/* top accent */}
                <div
                  className="pointer-events-none absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 transition-all duration-700 group-hover:w-2/3"
                  style={{
                    backgroundColor: metric.color,
                    boxShadow: `0 0 20px 4px ${metric.color}60`,
                  }}
                />

                <div className="relative flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: `${metric.color}1a`,
                      border: `1px solid ${metric.color}40`,
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: metric.color }} />
                  </span>
                </div>

                <p
                  className={
                    metric.large
                      ? "relative mt-4 font-display text-4xl font-semibold leading-tight sm:mt-6 sm:text-5xl lg:text-7xl"
                      : "relative mt-4 font-display text-3xl font-semibold text-ink sm:mt-6 sm:text-4xl lg:text-5xl"
                  }
                  style={
                    metric.large
                      ? {
                          backgroundImage: `linear-gradient(135deg, #fff, ${metric.color})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : undefined
                  }
                >
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </p>
                <p className="relative mt-2 text-xs text-mist sm:mt-3 sm:text-sm">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* <p className="mt-8 text-xs text-haze">
          Demo figures shown for illustration. Replace with real campaign data
          before launch.
        </p> */}
      </div>
    </section>
  );
}
