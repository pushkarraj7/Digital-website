// src/components/sections/PlatformRow.jsx
//
// One platform's section: icon + name + stat header, then a
// horizontally scrollable row of post cards. Each platform renders a
// distinct card shape (PostCardInstagram / PostCardLinkedIn /
// PostCardReel / PostCardTwitter) matching how that platform's
// content actually reads, instead of one generic image+caption card.

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ThumbsUp,
  Repeat2,
  Play,
  Eye,
  MoreHorizontal,
  BadgeCheck,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true };

function Avatar({ size = "h-8 w-8" }) {
  return (
    <span
      className={`shrink-0 rounded-full bg-gradient-to-br from-ion/40 via-ion/10 to-transparent p-[1.5px] ${size}`}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-void">
        <span className="h-2/5 w-2/5 rounded-full bg-ion/60" />
      </span>
    </span>
  );
}

function CardShell({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_0_0_0_rgba(0,0,0,0)] transition-shadow duration-500 hover:z-10 hover:border-ion/25 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PostCardInstagram({ platform, post }) {
  return (
    <CardShell className="w-64 md:w-72">
      <div className="flex items-center gap-2.5 px-3.5 py-3">
        <Avatar />
        <span className="text-xs font-medium text-ink">{platform.handle}</span>
        <MoreHorizontal className="ml-auto h-4 w-4 text-mist" />
      </div>

      <div className={`relative overflow-hidden ${platform.aspect}`}>
        <img
          src={post.image}
          alt={post.caption}
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="px-3.5 py-3">
        <div className="flex items-center gap-4 text-mist">
          <Heart className="h-[18px] w-[18px] transition-colors duration-300 group-hover:text-ion" />
          <MessageCircle className="h-[18px] w-[18px]" />
          <Send className="h-[18px] w-[18px]" />
          <Bookmark className="ml-auto h-[18px] w-[18px]" />
        </div>
        <p className="mt-2 text-xs font-semibold text-ink">
          {post.likes} likes
        </p>
        <p className="mt-0.5 truncate text-xs text-mist">
          <span className="font-medium text-ink">{platform.handle}</span>{" "}
          {post.caption}
        </p>
      </div>
    </CardShell>
  );
}

function PostCardLinkedIn({ platform, post }) {
  return (
    <CardShell className="w-72 md:w-80">
      <div className="flex items-start gap-2.5 px-4 pt-4">
        <Avatar size="h-9 w-9" />
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-xs font-medium text-ink">
            {platform.handle}
            <BadgeCheck className="h-3.5 w-3.5 text-ion" />
          </p>
          <p className="text-[11px] text-mist">Agency · Promoted</p>
        </div>
      </div>

      <p className="px-4 pb-3 pt-2.5 text-xs leading-relaxed text-mist">
        {post.caption}
      </p>

      <div className={`relative overflow-hidden ${platform.aspect}`}>
        <img
          src={post.image}
          alt={post.caption}
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex items-center gap-5 border-t border-white/10 px-4 py-3 text-mist">
        <span className="flex items-center gap-1.5 text-xs">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ion/10">
            <ThumbsUp className="h-3 w-3 text-ion" />
          </span>
          {post.reactions}
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-xs">
          <Repeat2 className="h-4 w-4" />
          {post.reposts}
        </span>
      </div>
    </CardShell>
  );
}

function PostCardReel({ post }) {
  return (
    <CardShell className="w-44 md:w-52 rounded-[1.75rem]">
      <div className={`relative overflow-hidden ${"aspect-[9/16]"}`}>
        <img
          src={post.image}
          alt={post.caption}
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-void/40" />

        {/* progress segments, story-style */}
        <div className="absolute inset-x-3 top-3 flex gap-1">
          <span className="h-[3px] flex-1 rounded-full bg-ion/80" />
          <span className="h-[3px] flex-1 rounded-full bg-white/25" />
          <span className="h-[3px] flex-1 rounded-full bg-white/25" />
        </div>

        {/* play state */}
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-void/60 backdrop-blur-sm ring-1 ring-white/20">
            <Play className="ml-0.5 h-4 w-4 fill-ink text-ink" />
          </span>
        </span>

        {/* side action stack */}
        <div className="absolute bottom-14 right-2.5 flex flex-col items-center gap-3.5 text-ink">
          <span className="flex flex-col items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="text-[10px]">{post.likes}</span>
          </span>
          <MessageCircle className="h-4 w-4" />
          <Send className="h-4 w-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="flex items-center gap-1 text-[11px] text-ink/90">
            <Eye className="h-3 w-3" />
            {post.views} views
          </p>
          <p className="mt-0.5 truncate text-[11px] text-mist">
            {post.caption}
          </p>
        </div>
      </div>
    </CardShell>
  );
}

function PostCardTwitter({ platform, post }) {
  return (
    <CardShell className="w-72 md:w-80">
      <div className="flex items-start gap-2.5 px-4 pt-4">
        <Avatar size="h-9 w-9" />
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-xs font-medium text-ink">
            Your Agency
            <BadgeCheck className="h-3.5 w-3.5 text-ion" />
          </p>
          <p className="text-[11px] text-mist">{platform.handle}</p>
        </div>
      </div>

      <p className="px-4 pb-3 pt-2.5 text-xs leading-relaxed text-ink">
        {post.caption}
      </p>

      <div
        className={`relative overflow-hidden rounded-xl mx-4 mb-4 border border-white/10 ${platform.aspect}`}
      >
        <img
          src={post.image}
          alt={post.caption}
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex items-center gap-5 border-t border-white/10 px-4 py-3 text-mist">
        <span className="flex items-center gap-1.5 text-xs">
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          <Repeat2 className="h-4 w-4" />
          {post.reposts}
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          <Heart className="h-4 w-4 transition-colors duration-300 group-hover:text-ion" />
          {post.likes}
        </span>
      </div>
    </CardShell>
  );
}

const CARD_BY_PLATFORM = {
  instagram: PostCardInstagram,
  linkedin: PostCardLinkedIn,
  reels: PostCardReel,
  twitter: PostCardTwitter,
};

export function PlatformRow({ platform }) {
  const Icon = Icons[platform.icon] ?? Icons.Sparkles;
  const PostCard = CARD_BY_PLATFORM[platform.key] ?? PostCardInstagram;

  // Duplicated so the marquee can loop seamlessly at -50% translateX
  const loopedPosts = [...platform.posts, ...platform.posts];

  return (
    <div className="py-10 first:pt-0 last:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-6 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ion/25 bg-ion/10 text-ion">
            <Icon className="h-4 w-4" />
          </span>
          <h3 className="font-display text-xl text-ink md:text-2xl">
            {platform.name}
          </h3>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-mist">
          {platform.stat}
        </span>
      </motion.div>

      <div className="platform-row-viewport -mx-6 overflow-hidden px-6">
        <div
          className="platform-row-track flex w-max gap-5 py-4"
          style={{ "--marquee-duration": `${platform.posts.length * 5}s` }}
        >
          {loopedPosts.map((post, i) => (
            <div key={`${post.id}-${i}`} className="shrink-0">
              <PostCard platform={platform} post={post} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .platform-row-track {
          animation: platform-row-marquee var(--marquee-duration, 30s) linear infinite;
        }
        .platform-row-track:hover {
          animation-play-state: paused;
        }
        @keyframes platform-row-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
