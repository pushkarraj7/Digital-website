import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { CASE_STUDIES } from '../data/caseStudies';
import { GlassPanel } from '../components/ui/GlassPanel';
import { fadeUp, staggerChildren, viewportOnce, EASE } from '../lib/animations';
import { cn } from '../lib/utils';

const FIELDS = [
  { key: 'challenge', label: 'Challenge' },
  { key: 'approach', label: 'Approach' },
  { key: 'result', label: 'Result' },
];

export function CaseStudy() {
  const { slug } = useParams();
  const index = CASE_STUDIES.findIndex((p) => p.slug === slug);
  const project = CASE_STUDIES[index];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            to="/#work"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 text-sm text-mist transition-colors duration-300 hover:text-ion"
          >
            <ArrowLeft size={16} />
            Back to work
          </Link>
        </motion.div>

        <motion.header
          variants={staggerChildren(0.08)}
          initial="hidden"
          animate="show"
          className="mt-10"
        >
          {project.isPlaceholder && (
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-wide text-haze">
              Placeholder case study — for demonstration only
            </motion.p>
          )}
          <motion.p variants={fadeUp} className="mt-4 text-sm text-mist">
            {project.industry}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display text-4xl font-semibold text-ink sm:text-6xl"
          >
            {project.name}
          </motion.h1>
        </motion.header>

        {/* Visual placeholder — swap for real project imagery once available */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mt-14 aspect-[16/9] overflow-hidden rounded-2xl border border-line"
          style={{ background: `linear-gradient(135deg, ${project.accent}33, #0A0F1C 70%)` }}
        >
          <div className="absolute bottom-6 left-6 text-xs text-haze">Image placeholder</div>
        </motion.div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {FIELDS.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <p className="text-xs text-haze">{field.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">{project[field.key]}</p>
            </motion.div>
          ))}
        </div>

        <GlassPanel className="mt-20 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs text-haze">Next project</p>
            <p className="mt-2 font-display text-2xl font-medium text-ink">{next.name}</p>
          </div>
          <Link
            to={`/work/${next.slug}`}
            data-cursor="interactive"
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5',
              'text-[0.95rem] font-medium tracking-tight text-void',
              'transition-colors duration-500 ease-premium hover:bg-ion'
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