// src/pages/portfolio/SocialMediaPortfolio.jsx
//
// Portfolio page for Social Media work, split into per-platform
// scrollable rows instead of one mixed grid.
//
// New piece this page introduces:
//   - components/sections/PlatformRow.jsx

import { motion } from "framer-motion";
import { MagneticButton } from "../../components/ui/MagneticButton";
import { BrowserFrame } from "../../components/ui/BrowserFrame";
import { BrandsMarquee } from "../../components/sections/BrandsMarquee";
import { PlatformRow } from "../../components/sections/PlatformRow";
import { socialPlatforms, socialStats } from "../../data/socialMediaProjects";
import { Sparkles, Share2, ArrowUpRight, Radio } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true };

export function SocialMediaPortfolio() {
  const featured = socialPlatforms[0]?.posts[0];

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
            <Share2 className="h-3.5 w-3.5" />
            Portfolio / Social Media
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-6xl"
          >
            Content built for
            <br className="hidden md:block" />
            the <span className="italic text-ion">scroll.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-6 max-w-md text-base text-mist md:text-base lg:text-lg"
          >
            Feed posts, reels, and platform-native graphics — planned and
            designed around how each platform actually gets watched.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4 md:gap-5 lg:gap-6"
          >
            <MagneticButton href="/contact" className="group rounded-full">
              Start a project
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
            <span className="text-ink">{socialStats.value}</span>{" "}
            {socialStats.label}
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
            src={featured?.image}
            alt={socialPlatforms[0]?.name || "Featured social work"}
            url="portfolio.com"
            className="[transform:rotateY(-3deg)_rotateX(1deg)] md:[transform:rotateY(-3deg)_rotateX(1deg)] lg:[transform:rotateY(-6deg)_rotateX(2deg)]"
          />
        </motion.div>
      </section>

      {/* Platform rows — bg-void */}
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
              <Radio className="h-3.5 w-3.5" />
              Platform Breakdown
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl"
            >
              Built <span className="italic text-ion">Native</span> to Each
              Platform
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-mist"
            >
              Scroll each row — every platform gets its own format, not a
              resized version of the same post.
            </motion.p>
          </div>

          <div className="divide-y divide-white/10">
            {socialPlatforms.map((platform) => (
              <PlatformRow key={platform.key} platform={platform} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands marquee — blank */}
      <section className="relative z-10 py-10">
        <BrandsMarquee />
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
            Ready for a feed{" "}
            <span className="italic text-ion">people stop for?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-mist"
          >
            Let's talk about your next content calendar, reel series, or
            platform — starting with what's not getting watched right now.
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
