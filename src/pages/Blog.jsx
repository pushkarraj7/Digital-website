import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

import { EASE, viewportOnce, fadeUp, staggerChildren } from "../lib/animations";

const CATEGORIES = [
  "All",
  "Marketing",
  "Development",
  "Growth",
  "Case Studies",
];

const CATEGORY_META = {
  Marketing: { icon: Megaphone, color: "#7FB4FF" },
  Development: { icon: Code2, color: "#7F5FFF" },
  Growth: { icon: TrendingUp, color: "#FF8B6B" },
  "Case Studies": { icon: Layers, color: "#4ADE80" },
};

const POSTS = [
  {
    id: "whatsapp-conversion-channel",
    category: "Marketing",
    title:
      "WhatsApp is quietly becoming India's highest-converting sales channel",
    excerpt:
      "Open rates on email keep sliding. Here's what we've learned running WhatsApp campaigns for a dozen local businesses this year.",
    date: "Aug 14, 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    id: "rebuild-every-18-months",
    category: "Development",
    title: "Why founders keep rebuilding their website every 18 months",
    excerpt:
      "It's rarely the tech stack. It's usually that the site never matched the business it was supposed to sell.",
    date: "Aug 2, 2026",
    readTime: "5 min",
  },
  {
    id: "lead-gen-funnel-worth-copying",
    category: "Growth",
    title: "The lead-gen funnel we'd actually recommend to a friend",
    excerpt:
      "No 40-step automation. Three touchpoints, one clear offer, and a follow-up that doesn't sound like a robot.",
    date: "Jul 22, 2026",
    readTime: "7 min",
  },
  {
    id: "ordering-flow-case-study",
    category: "Case Studies",
    title: "What changed after we rebuilt a restaurant chain's ordering flow",
    excerpt:
      "Average order value went up 18% without touching the menu. The fix was almost entirely about friction.",
    date: "Jul 9, 2026",
    readTime: "8 min",
  },
  {
    id: "google-business-basics",
    category: "Marketing",
    title:
      "Your Google Business listing is doing more selling than your homepage",
    excerpt:
      "A rundown of the five fields that actually move the needle, and the ones you can safely ignore.",
    date: "Jun 28, 2026",
    readTime: "4 min",
  },
  {
    id: "nfc-cards-worth-it",
    category: "Development",
    title: "Are NFC business cards actually worth it, or just a gimmick?",
    excerpt:
      "We handed them out for three months and tracked what happened. The answer depends entirely on who you're meeting.",
    date: "Jun 11, 2026",
    readTime: "5 min",
  },
  {
    id: "virtual-tour-conversion",
    category: "Growth",
    title: "A 360° virtual tour paid for itself in eleven days",
    excerpt:
      "For one client, at least. Here's the math, and the two situations where we'd tell you to skip it.",
    date: "May 30, 2026",
    readTime: "6 min",
  },
];

function PostVisual({ category, seed, className = "", compact = false }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.Marketing;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-[#08090C] ${className}`}
    >
      <img
        src={`https://picsum.photos/seed/${seed}/800/600`}
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

function FeaturedPost({ post }) {
  return (
    <motion.a
      href={`/blog/${post.id}`}
      data-cursor="interactive"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE }}
      className="group grid grid-cols-1 gap-6 rounded-3xl border border-line bg-surface/40 p-4 backdrop-blur-sm sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
    >
      <PostVisual
        category={post.category}
        seed={post.id}
        className="h-56 lg:h-full"
      />

      <div className="flex flex-col justify-center py-2">
        <CategoryTag category={post.category} />
        <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-ion sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-mist sm:text-base">
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center gap-4 text-xs text-haze">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime} read
          </span>
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-ion">
          Read the piece
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  );
}

function PostRow({ post, isActive, onActivate }) {
  return (
    <motion.a
      href={`/blog/${post.id}`}
      data-cursor="interactive"
      variants={fadeUp}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="flex items-center gap-4 border-b border-line py-5 transition-colors duration-300 first:pt-0"
    >
      <PostVisual
        category={post.category}
        seed={post.id}
        compact
        className="h-14 w-14 shrink-0 lg:hidden"
      />

      <div className="min-w-0 flex-1">
        <CategoryTag category={post.category} />
        <h3
          className={`mt-1.5 truncate-none font-display text-lg font-semibold leading-snug transition-colors duration-300 sm:text-xl ${
            isActive ? "text-ion" : "text-ink"
          }`}
        >
          {post.title}
        </h3>
        <span className="mt-1 block text-xs text-haze lg:hidden">
          {post.date} · {post.readTime}
        </span>
      </div>

      <ArrowUpRight
        className={`h-4 w-4 shrink-0 transition-all duration-300 ${
          isActive
            ? "translate-x-0.5 -translate-y-0.5 text-ion opacity-100"
            : "text-haze opacity-0 lg:group-hover:opacity-100"
        }`}
      />
    </motion.a>
  );
}

function PostIndex({ posts }) {
  const [activeId, setActiveId] = useState(posts[0]?.id);
  const active = posts.find((p) => p.id === activeId) ?? posts[0];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerChildren(0.06)}
      >
        {posts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            isActive={post.id === active?.id}
            onActivate={() => setActiveId(post.id)}
          />
        ))}
      </motion.div>

      <div className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
        <AnimatePresence mode="wait">
          {active && (
            <motion.a
              key={active.id}
              href={`/blog/${active.id}`}
              data-cursor="interactive"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="block"
            >
              <PostVisual
                category={active.category}
                seed={active.id}
                className="h-72 w-full"
              />
              <p className="mt-5 text-sm leading-relaxed text-mist">
                {active.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs text-haze">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {active.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {active.readTime} read
                </span>
              </div>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Blog() {
  const [category, setCategory] = useState("All");

  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => p.id !== featured?.id).filter(
    (p) => category === "All" || p.category === category,
  );

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-ion/15 opacity-40 blur-[160px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-ion" />
            Notes from MVM
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-display-1 font-semibold text-ink"
          >
            Things worth knowing before your next launch.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-base text-mist sm:text-lg"
          >
            Marketing, product, and the occasional war story from projects we've
            shipped for clients across India.
          </motion.p>
        </div>
      </section>

      {/* ---------- Featured post ---------- */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {featured && <FeaturedPost post={featured} />}
        </div>
      </section>

      {/* ---------- Filter + index ---------- */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                data-cursor="interactive"
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  category === c
                    ? "border-ion/50 bg-ion/10 text-ion"
                    : "border-line text-mist hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {rest.length > 0 ? (
              <PostIndex key={category} posts={rest} />
            ) : (
              <p className="text-sm text-mist">
                Nothing here yet — try a different category.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
