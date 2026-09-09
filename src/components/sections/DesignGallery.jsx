// src/components/sections/DesignGallery.jsx
//
// Category-filtered masonry gallery for design work. Filter pills up
// top; CSS-columns masonry below so image heights vary naturally
// instead of forcing everything into a uniform grid cell.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  graphicDesignProjects,
  designCategories,
} from "../../data/graphicDesignProjects";

const EASE = [0.16, 1, 0.3, 1];

function GalleryItem({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 max-lg:!h-auto max-lg:!aspect-square sm:mb-6 ${project.size}`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ion">
          {project.category}
        </span>
        <h3 className="mt-1 font-display text-base text-ink md:text-lg">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

export function DesignGallery() {
  const [active, setActive] = useState("All");
  const filters = ["All", ...designCategories];

  const visible =
    active === "All"
      ? graphicDesignProjects
      : graphicDesignProjects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2.5">
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-xs ${
                isActive
                  ? "border-ion/40 bg-ion/10 text-ion"
                  : "border-white/10 text-mist hover:border-white/25 hover:text-ink"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <GalleryItem key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
