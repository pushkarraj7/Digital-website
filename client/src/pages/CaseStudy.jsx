import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { CASE_STUDIES } from "../data/caseStudies";
import { GlassPanel } from "../components/ui/GlassPanel";
import { fadeUp, staggerChildren, viewportOnce, EASE } from "../lib/animations";
import { cn } from "../lib/utils";

const SECTIONS = [
  { key: "challenge", label: "The challenge" },
  { key: "approach", label: "What we did" },
  { key: "outcome", label: "The outcome" },
];

export function CaseStudy() {
  const { slug } = useParams();
  const index = CASE_STUDIES.findIndex((p) => p.slug === slug);
  const project = CASE_STUDIES[index];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // Unknown slug — send back home rather than showing a dead page.
  if (!project) return <Navigate to="/" replace />;

  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];

  return (
    <article className="relative bg-void px-6 pb-32 pt-36 sm:pt-44">
      {/* Ambient backdrop tinted with this project's accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(50% 40% at 50% 0%, ${project.accent}22, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-4xl">
        <motion.header
          variants={staggerChildren(0.08)}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <Link
              to="/"
              data-cursor="interactive"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] py-2 pl-3 pr-4 text-sm text-mist transition-all duration-300 hover:border-ion/40 hover:text-ink"
            >
              <ArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Back
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${project.accent}1a`,
                  border: `1px solid ${project.accent}40`,
                  color: project.accent,
                }}
              >
                {project.industry}
              </span>
              {project.tags?.map((tag) => (
                <span key={tag} className="text-xs text-haze">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-semibold text-ink sm:text-6xl"
          >
            {project.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-mist"
          >
            {project.summary}
          </motion.p>
        </motion.header>

        {/* Visual placeholder — swap for real project imagery once available */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mt-14 aspect-[16/9] overflow-hidden rounded-2xl border border-line"
          style={{
            background: `linear-gradient(135deg, ${project.accent}33, #0A0F1C 70%)`,
          }}
        >
          <div className="absolute bottom-6 left-6 text-xs text-haze">
            Image placeholder
          </div>
        </motion.div>

        {/* Key stats row */}
        {project.stats?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
          >
            {project.stats.map((stat) => (
              <div key={stat.label} className="bg-void/60 p-6 sm:p-8">
                <p
                  className="font-display text-3xl font-semibold sm:text-4xl"
                  style={{ color: project.accent }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-mist sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Narrative sections */}
        <div className="mt-16 flex flex-col gap-12">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-10"
            >
              <p className="text-xs uppercase tracking-wide text-haze">
                {section.label}
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-mist">
                {project[section.key]}
              </p>
            </motion.div>
          ))}
        </div>

        <GlassPanel className="mt-20 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs text-haze">Next project</p>
            <p className="mt-2 font-display text-2xl font-medium text-ink">
              {next.name}
            </p>
          </div>
          <Link
            to={`/work/${next.slug}`}
            data-cursor="interactive"
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5",
              "text-[0.95rem] font-medium tracking-tight text-void",
              "transition-colors duration-500 ease-premium hover:bg-ion",
            )}
          >
            View case study
            <ArrowUpRight size={16} />
          </Link>
        </GlassPanel>
      </div>
    </article>
  );
}
