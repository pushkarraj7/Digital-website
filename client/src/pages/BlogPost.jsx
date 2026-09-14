// src/pages/BlogPost.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Megaphone,
  Code2,
  TrendingUp,
  Layers,
  Calendar,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { POSTS } from "../data/blogPosts";
import { MagneticButton } from "../components/ui/MagneticButton";
import { EASE, viewportOnce, fadeUp } from "../lib/animations";

// Turns a heading's text into a stable id we can link/scroll to,
// e.g. "Why it's converting better" -> "why-its-converting-better".
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CATEGORY_META = {
  Marketing: { icon: Megaphone, color: "#7FB4FF" },
  Development: { icon: Code2, color: "#7F5FFF" },
  Growth: { icon: TrendingUp, color: "#FF8B6B" },
  "Case Studies": { icon: Layers, color: "#4ADE80" },
};

function PostVisual({ category, seed, className = "" }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.Marketing;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-[#08090C] ${className}`}
    >
      <img
        src={`https://picsum.photos/seed/${seed}/1200/700`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(150deg, ${meta.color}33 0%, rgba(8,9,12,0.55) 70%)`,
        }}
        aria-hidden
      />
    </div>
  );
}

function CategoryTag({ category }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.Marketing;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium"
      style={{ color: meta.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {category}
    </span>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.id === slug);

  // Unknown slug — bounce to the blog index instead of a dead page.
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const more = POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  // Headings pulled from the post content power the "On this page" rail —
  // any post with 2+ headings gets one automatically, no extra data needed.
  const headings = useMemo(
    () =>
      post.content
        .filter((block) => block.type === "heading")
        .map((block) => ({ text: block.text, slug: slugify(block.text) })),
    [post],
  );
  const [activeSlug, setActiveSlug] = useState(headings[0]?.slug);

  const articleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const readingProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
  });

  // Scroll-spy: highlight whichever heading is currently nearest the top
  // of the viewport as the reader scrolls through the article.
  useEffect(() => {
    if (headings.length < 2) return;
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSlug(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <>
      {/* Reading progress — tracks scroll through the article body only,
          not the hero/more-posts/CTA either side of it. */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-ion"
        style={{ scaleX: readingProgress }}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-32">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-ion/15 opacity-40 blur-[160px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <CategoryTag category={post.category} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-6 flex items-center gap-4 text-xs text-haze"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} read
            </span>
          </motion.div>
        </div>
      </section>

      {/* ---------- Featured image ---------- */}
      <section className="px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <PostVisual
            category={post.category}
            seed={post.id}
            className="h-64 w-full sm:h-80"
          />
        </motion.div>
      </section>

      {/* ---------- Content ---------- */}
      <section ref={articleRef} className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
          {headings.length >= 2 && (
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-haze">
                  On this page
                </p>
                <ul className="mt-4 flex flex-col gap-2 border-l border-line pl-4">
                  {headings.map((h) => (
                    <li key={h.slug}>
                      <a
                        href={`#${h.slug}`}
                        data-cursor="interactive"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(h.slug)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                        className={`block text-sm transition-colors duration-300 ${
                          activeSlug === h.slug
                            ? "text-ion"
                            : "text-mist hover:text-ink"
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          <div className="max-w-3xl">
            {post.content.map((block, i) =>
              block.type === "heading" ? (
                <motion.h2
                  key={i}
                  id={slugify(block.text)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-10 scroll-mt-28 font-display text-xl font-semibold text-ink first:mt-0 sm:text-2xl"
                >
                  {block.text}
                </motion.h2>
              ) : (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-4 text-base leading-relaxed text-mist sm:text-lg"
                >
                  {block.text}
                </motion.p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ---------- More posts ---------- */}
      {more.length > 0 && (
        <section className="border-t border-line px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <motion.h3
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="font-display text-2xl font-semibold text-ink sm:text-3xl"
            >
              More from the blog
            </motion.h3>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.id}`}
                  data-cursor="interactive"
                  className="group"
                >
                  <PostVisual
                    category={p.category}
                    seed={p.id}
                    className="h-36 w-full"
                  />
                  <div className="mt-3">
                    <CategoryTag category={p.category} />
                    <h4 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-ion">
                      {p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- CTA ---------- */}
      <section className="relative z-10 overflow-hidden bg-void px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-24">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-ion/10 blur-[150px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-2xl text-center">
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
            className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl"
          >
            Got something similar{" "}
            <span className="italic text-ion">going on?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-mist"
          >
            Tell us what you're working on, and we'll give you a straight answer
            on what it'll actually take to get it done right.
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

            <Link
              to="/blog"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-ink transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Read more posts
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
