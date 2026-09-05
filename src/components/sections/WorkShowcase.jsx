import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "../../data/caseStudies";
import { cn } from "../../lib/utils";

// cycle through accent gradients per card so the grid doesn't look flat
const GRADIENTS = [
  "linear-gradient(160deg, rgba(34,211,238,0.25), rgba(8,9,14,0.4))",
  "linear-gradient(160deg, rgba(167,139,250,0.25), rgba(8,9,14,0.4))",
  "linear-gradient(160deg, rgba(244,114,182,0.25), rgba(8,9,14,0.4))",
  "linear-gradient(160deg, rgba(52,211,153,0.25), rgba(8,9,14,0.4))",
];
const ACCENTS = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399"];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export function WorkShowcase() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="work" className="relative bg-void px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-haze">
              Portfolio
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
              Selected work
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
          {CASE_STUDIES.map((project, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const gradient = GRADIENTS[i % GRADIENTS.length];
            const isHovered = hovered === project.slug;
            // first card spans wider — asymmetric bento layout
            const spanClass = i === 0 ? "lg:col-span-4" : "lg:col-span-2";
            const heightClass =
              i === 0
                ? "h-[320px] sm:h-[380px] lg:h-[420px]"
                : "h-[240px] sm:h-[260px] lg:h-[280px]";

            return (
              <motion.div
                key={project.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className={spanClass}
              >
                <Link
                  to={`/work/${project.slug}`}
                  data-cursor="interactive"
                  onMouseEnter={() => setHovered(project.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-line p-5 transition-transform duration-500 ease-out sm:p-8",
                    heightClass,
                    isHovered ? "-translate-y-1" : "",
                  )}
                  style={{
                    background: gradient,
                    boxShadow: isHovered
                      ? `0 20px 60px ${accent}26, 0 0 0 1px ${accent}40`
                      : "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* ghost project index */}
                  <span
                    className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[100px] font-bold leading-none opacity-[0.06] sm:text-[130px] lg:text-[160px]"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* top row */}
                  <div className="relative flex items-start justify-between">
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs"
                      style={{
                        backgroundColor: `${accent}1a`,
                        border: `1px solid ${accent}40`,
                        color: accent,
                      }}
                    >
                      {project.industry}
                    </span>

                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-10 sm:w-10"
                      style={{
                        borderColor: isHovered
                          ? accent
                          : "var(--line, #2a2d3a)",
                        backgroundColor: isHovered
                          ? `${accent}1a`
                          : "transparent",
                      }}
                    >
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                        style={{ color: isHovered ? accent : undefined }}
                      />
                    </span>
                  </div>

                  {/* bottom content */}
                  <div className="relative">
                    <h3
                      className={cn(
                        "font-display font-semibold text-ink transition-colors duration-500",
                        i === 0
                          ? "text-2xl sm:text-4xl lg:text-5xl"
                          : "text-xl sm:text-2xl lg:text-3xl",
                      )}
                      style={{ color: isHovered ? accent : undefined }}
                    >
                      {project.name}
                    </h3>

                    <motion.p
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? "auto" : 0,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden text-sm text-mist"
                      style={{ marginTop: isHovered ? "0.75rem" : 0 }}
                    >
                      {project.result}
                    </motion.p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
