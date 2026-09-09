// src/pages/portfolio/WebsiteDevelopmentPortfolio.jsx
//
// Portfolio page for WordPress + Custom Website Development.
// PageTransition wraps this at the route level (see App.jsx), so this
// component stays unwrapped, matching your other pages.
//
// New pieces this page introduces:
//   - components/ui/BrowserFrame.jsx     (hero + showcase screenshots)
//   - components/sections/BuildPathCompare.jsx  (WordPress vs Custom split)
//
// Assumptions on existing components (adjust if signatures differ):
//   - BrandsMarquee takes no required props
//   - Testimonials / FinalCTA take no required props
//   - MagneticButton renders as a link when given `href`

import { motion } from "framer-motion";
import { MagneticButton } from "../../components/ui/MagneticButton";
import { BrowserFrame } from "../../components/ui/BrowserFrame";
import { BrandsMarquee } from "../../components/sections/BrandsMarquee";
import { BuildPathCompare } from "../../components/sections/BuildPathCompare";
import { Testimonials } from "../../components/sections/Testimonials";
import {
  websiteDevProjects,
  websiteDevStats,
} from "../../data/websiteDevProjects";

import { Sparkles, ArrowUpRight, LayoutGrid, ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true };

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative"
    >
      <div className="relative">
        <BrowserFrame
          src={project.image}
          alt={project.title}
          url={project.url}
          tone={project.type}
          className="transition-transform duration-500 ease-premium group-hover:-translate-y-1.5"
        />
        {/* hover sheen */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg text-ink transition-colors duration-300 group-hover:text-ion">
              {project.title}
            </h3>
            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-ion opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mist">
            {project.summary}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
            project.type === "wordpress"
              ? "border-[#4C6E8A]/30 text-[#7FA6C4]"
              : "border-ion/30 text-ion"
          }`}
        >
          {project.type === "wordpress" ? "WordPress" : "Custom"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-mist"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function WebsiteDevelopmentPortfolio() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-28 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-6 md:pt-36 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pt-40">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Portfolio / Website Development
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-6xl"
          >
            Two ways to build a website.
            <br className="hidden md:block" />
            We do both <span className="italic text-ion">properly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-6 max-w-md text-base text-mist md:text-base lg:text-lg"
          >
            Some sites need to be live by Friday and easy for your team to edit.
            Others need architecture no page builder can give you. We build for
            whichever one you actually have.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4 md:gap-5 lg:gap-6"
          >
            <MagneticButton href="/contact" className="group rounded-full">
              Tell us about your site
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>

            <a
              href="#work"
              className="group inline-flex items-center gap-1.5 text-sm text-mist transition-colors duration-300 hover:text-ink"
            >
              <span className="relative">
                See the work
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ion transition-all duration-500 ease-premium group-hover:w-full" />
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px opacity-60 transition-all duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            className="mt-10 text-sm text-mist"
          >
            <span className="text-ink">{websiteDevStats.value}</span>{" "}
            {websiteDevStats.label}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16, rotateY: -6 }}
          animate={{ opacity: 1, y: 0, rotateY: -6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: 1200 }}
          className="[transform-style:preserve-3d] md:scale-90 lg:scale-100"
        >
          <BrowserFrame
            src={websiteDevProjects[0]?.image}
            alt="Featured project preview"
            url="yourbusiness.com"
            className="[transform:rotateY(-3deg)_rotateX(1deg)] md:[transform:rotateY(-3deg)_rotateX(1deg)] lg:[transform:rotateY(-6deg)_rotateX(2deg)]"
          />
        </motion.div>
      </section>

      {/* WordPress vs Custom split — bg-void */}
      <section className="relative z-10 bg-void px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <BuildPathCompare />
        </div>
      </section>

      {/* Brands marquee — blank, 3rd section */}
      <section className="relative z-10 py-10">
        <BrandsMarquee />
      </section>

      {/* Work showcase — bg-void */}
      <section id="work" className="relative z-10 bg-void px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Selected Work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl"
            >
              Recent <span className="italic text-ion">Builds</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-mist"
            >
              A mix of WordPress builds and fully custom platforms, shipped and
              running in production today.
            </motion.p>
          </div>

          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {websiteDevProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10">
        <Testimonials />
      </section>

      {/* ================= CTA (bg-void) ================= */}
      <section className="relative z-10 overflow-hidden bg-void px-6 pb-28 pt-24 md:px-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-ion/10 blur-[150px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Let's Build Something
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-3xl font-semibold text-ink md:text-5xl"
          >
            Have a product idea{" "}
            <span className="italic text-ion">in mind?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-mist"
          >
            Let's talk about building your next CRM, ERP, HRMS, or internal tool
            — starting with what's actually breaking right now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              as="a"
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-void transition-transform hover:scale-[1.03]"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>

            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-ink transition-colors hover:border-white/30 hover:bg-white/5"
            >
              See more work
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
