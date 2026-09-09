// src/pages/services/branding/Property360VirtualTour.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  Home,
  Building2,
  Plane,
  Sofa,
  LayoutGrid,
  Glasses,
  ArrowRight,
  CheckCircle2,
  Camera,
  UploadCloud,
  Map,
} from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { MagneticButton } from "../../../components/ui/MagneticButton";
import {
  EASE,
  viewportOnce,
  fadeUp,
  staggerChildren,
} from "../../../lib/animations";

// Each entry powers both the sidebar tab and the content shown on the
// right when that tab is active.
const SERVICE_CATEGORIES = [
  {
    id: "interior-tour",
    label: "Interior Tour",
    icon: Home,
    tagline: "Walk buyers through every room before they book a visit.",
    description:
      "Full 360° interior capture stitched into a single walkthrough — every hallway, corner and room connected the way a real visit would feel.",
    features: [
      "360° room-by-room capture",
      "Seamless room-to-room navigation",
      "HDR-balanced lighting on every shot",
      "Dollhouse & walkthrough view modes",
    ],
  },
  {
    id: "exterior-tour",
    label: "Exterior Tour",
    icon: Building2,
    tagline: "First impressions, covered from the curb to the backyard.",
    description:
      "The outside of a property sells as hard as the inside. We capture the facade, entry, yard and surrounding grounds in the same immersive format.",
    features: [
      "Full facade & entry capture",
      "Yard, garden & outdoor space coverage",
      "Neighborhood context shots",
      "Seamless link into the interior tour",
    ],
  },
  {
    id: "drone-view",
    label: "Drone View",
    icon: Plane,
    tagline: "Show the property no ground camera can.",
    description:
      "Aerial footage and stills that put a listing in context — lot size, roofline, surrounding streets and how the property sits in the neighborhood.",
    features: [
      "4K aerial photo & video",
      "Roofline & lot-boundary shots",
      "Neighborhood & surrounding-area context",
      "Licensed, insured drone operation",
    ],
  },
  {
    id: "virtual-staging",
    label: "Virtual Staging",
    icon: Sofa,
    tagline: "Let buyers picture it furnished, without moving a single couch.",
    description:
      "Empty or dated rooms furnished digitally in a style that fits the property — so listings show their potential instead of their emptiness.",
    features: [
      "Photorealistic furniture placement",
      "Style matched to the property & buyer profile",
      "Before/after empty-room staging",
      "Fast turnaround, no physical furniture needed",
    ],
  },
  {
    id: "floor-plan-tour",
    label: "Floor Plan Tour",
    icon: LayoutGrid,
    tagline: "Give buyers the layout, not just the look.",
    description:
      "An interactive floor plan overlaid on the tour, so buyers can orient themselves, check room dimensions and jump straight to the room they care about.",
    features: [
      "Accurate 2D & 3D floor plans",
      "Click-to-jump room navigation",
      "Room dimensions & square footage",
      "Overlay synced to the 360° tour",
    ],
  },
  {
    id: "vr-experience",
    label: "VR Experience",
    icon: Glasses,
    tagline: "A walkthrough that feels like actually being there.",
    description:
      "The same tour, made headset-ready — for out-of-town buyers, high-end listings, or agents who want to hand over the closest thing to an in-person showing.",
    features: [
      "VR headset compatible export",
      "Immersive room-scale navigation",
      "Works on standalone & PC headsets",
      "Shareable link, no app install required",
    ],
  },
];

const DELIVERABLES = [
  {
    icon: Camera,
    title: "360° Interior Capture",
    description:
      "Every room shot and stitched into a single navigable tour, with consistent lighting from entry to exit.",
    color: "#7FB4FF",
  },
  {
    icon: Plane,
    title: "Drone Aerial & Exterior",
    description:
      "Aerial stills and video alongside ground-level exterior coverage, so the full property is represented.",
    color: "#7F5FFF",
  },
  {
    icon: Sofa,
    title: "Virtual Staging",
    description:
      "Empty rooms furnished digitally in a style suited to the property, without a single physical item moved.",
    color: "#FF8B6B",
  },
  {
    icon: Map,
    title: "Interactive Floor Plans",
    description:
      "A 2D/3D floor plan overlay synced to the tour, with room dimensions and click-to-jump navigation.",
    color: "#4E86FF",
  },
  {
    icon: Glasses,
    title: "VR-Ready Walkthroughs",
    description:
      "The same tour exported headset-ready, for buyers who want the closest thing to walking through in person.",
    color: "#22d3ee",
  },
  {
    icon: UploadCloud,
    title: "Hosting & Listing Sync",
    description:
      "Hosted tour link plus embed-ready versions for your listing site, MLS and major property portals.",
    color: "#f472b6",
  },
];

const COMPATIBLE_WITH = [
  "Matterport",
  "Zillow 3D Home",
  "Realtor.com",
  "MLS Listings",
  "Google Street View",
  "VR Headsets",
];

const PROCESS = [
  {
    index: "01",
    title: "Site Assessment",
    description:
      "Walk the property, plan the shot list, and flag any rooms that need virtual staging.",
  },
  {
    index: "02",
    title: "Capture Day",
    description:
      "Full 360° interior capture, drone exterior footage and floor plan scan, done in a single visit.",
  },
  {
    index: "03",
    title: "Edit & Stage",
    description:
      "HDR blending, color correction, and virtual furniture placed room by room where needed.",
  },
  {
    index: "04",
    title: "Interactive Build",
    description:
      "Stitched into a navigable tour with hotspots, room labels and the floor plan overlay synced in.",
  },
  {
    index: "05",
    title: "Publish & Handoff",
    description:
      "Hosted tour link delivered, embedded into your listing, and synced to MLS/Zillow where supported.",
  },
];

export function Property360VirtualTour() {
  const [activeId, setActiveId] = useState("interior-tour");
  const activeCategory =
    SERVICE_CATEGORIES.find((c) => c.id === activeId) ?? SERVICE_CATEGORIES[0];
  const ActiveIcon = activeCategory.icon;

  // Autoplay: advances to the next category every 4s, starting from
  // Interior Tour. Resets on every activeId change, so a manual click
  // just continues the cycle from wherever the user picked.
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIndex = SERVICE_CATEGORIES.findIndex(
        (c) => c.id === activeId,
      );
      const nextIndex = (currentIndex + 1) % SERVICE_CATEGORIES.length;
      setActiveId(SERVICE_CATEGORIES[nextIndex].id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeId]);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-ion/20 opacity-40 blur-[150px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-ion" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-mist">
              Branding
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-display-1 font-semibold text-ink sm:mt-8"
          >
            Property 360° <span className="italic text-ion">Virtual Tour</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base text-mist sm:text-lg"
          >
            We capture, stage and stitch every property into an immersive
            walkthrough — interior, exterior, drone and floor plan, all in
            one tour buyers can explore before they ever step inside.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton href="/contact" className="rounded-full">
              Get a Free Consultation
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {COMPATIBLE_WITH.map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-line bg-surface/40 px-3.5 py-1.5 text-xs text-mist"
              >
                {platform}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Category explorer: clickable sidebar, content on the right ---------- */}
      <section className="relative bg-void px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 backdrop-blur-xl">
              <Layers className="h-3.5 w-3.5 text-ion" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-mist">
                Service Category
              </span>
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Pick a view,
            </h2>
            <h2 className="font-display text-3xl font-semibold text-ion sm:text-4xl">
              see how we build it.
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Sidebar — clickable tabs */}
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <GlassPanel className="overflow-hidden p-2">
                <ul className="flex flex-col gap-1 p-1">
                  {SERVICE_CATEGORIES.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(item.id)}
                          aria-pressed={isActive}
                          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors duration-300 ${
                            isActive
                              ? "border-ion/30 bg-ion/10 text-ion"
                              : "border-transparent text-mist hover:bg-white/[0.03] hover:text-ink"
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                              isActive ? "bg-ion/15" : "bg-white/5"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="flex-1">{item.label}</span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-ion" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </GlassPanel>
            </motion.aside>

            {/* Content — swaps with the active category */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <GlassPanel className="relative overflow-hidden p-7 sm:p-10">
                    {/* autoplay progress — fills over the 4s cycle, restarts each swap */}
                    <div className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-2xl bg-white/5">
                      <motion.div
                        className="h-full bg-ion"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                      />
                    </div>

                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-ion/15 opacity-60 blur-3xl"
                      aria-hidden
                    />

                    {/* large faded index number, purely decorative */}
                    <span
                      className="pointer-events-none absolute right-7 top-8 font-display text-6xl font-semibold text-white/5 sm:right-10 sm:text-7xl"
                      aria-hidden
                    >
                      {String(
                        SERVICE_CATEGORIES.findIndex(
                          (c) => c.id === activeCategory.id,
                        ) + 1,
                      ).padStart(2, "0")}
                    </span>

                    <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-ion/40 bg-ion/10">
                      <ActiveIcon className="h-5 w-5 text-ion" />
                    </span>
                    <h3 className="relative mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {activeCategory.label}
                    </h3>
                    <p className="relative mt-2 text-base text-ion">
                      {activeCategory.tagline}
                    </p>
                    <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                      {activeCategory.description}
                    </p>

                    <ul className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeCategory.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-mist sm:text-base"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ion" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-8">
                      <MagneticButton href="/contact" className="rounded-full">
                        Talk to Us About {activeCategory.label}
                      </MagneticButton>
                    </div>
                  </GlassPanel>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Whole-page content: what our 360 tour service includes ---------- */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-haze">
              What's included
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Everything a listing needs to sell itself,
            </h2>
            <h2 className="font-display text-3xl font-semibold text-ion sm:text-4xl">
              captured in a single visit.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerChildren(0.08)}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DELIVERABLES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group"
                >
                  <GlassPanel className="relative h-full overflow-hidden p-6 transition-all duration-500 group-hover:-translate-y-1">
                    <div
                      className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"
                      style={{ backgroundColor: `${item.color}25` }}
                    />
                    <span
                      className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: `${item.color}1a`,
                        border: `1px solid ${item.color}40`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.color }} />
                    </span>
                    <h3 className="relative mt-4 font-display text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-mist">
                      {item.description}
                    </p>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Process + Why choose us — side by side on desktop */}
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-haze">
                  How it works
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Our <span className="text-ion">process</span>
                </h2>
              </motion.div>

              <div className="relative mt-10">
                <motion.div
                  className="absolute left-5 top-2 bottom-2 w-px origin-top bg-ion/30 sm:left-6"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, ease: EASE }}
                />

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={staggerChildren(0.12)}
                  className="flex flex-col gap-10"
                >
                  {PROCESS.map((step) => (
                    <motion.div
                      key={step.index}
                      variants={fadeUp}
                      className="relative flex items-start gap-5 sm:gap-6"
                    >
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ion/40 bg-void font-display text-sm font-semibold text-ion sm:h-12 sm:w-12 sm:text-base">
                        {step.index}
                      </span>
                      <div className="pt-1 sm:pt-2">
                        <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-mist sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Why choose us */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <GlassPanel className="p-7 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  Why agents <span className="text-ion">work with us</span>
                </h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {[
                    "One crew handles capture, staging and the interactive build — no separate vendors to coordinate.",
                    "Tours built to embed directly into MLS, Zillow and your listing site.",
                    "Fast turnaround so listings go live while buyer interest is highest.",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-mist sm:text-base"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ion" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden bg-void px-4 py-20 sm:px-6 sm:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/20 opacity-40 blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display text-3xl font-semibold text-ink sm:text-5xl"
          >
            Ready to show a listing
            <br className="hidden sm:block" />{" "}
            <span className="italic text-ion">buyers can walk through?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-9"
          >
            <MagneticButton href="/contact" className="rounded-full">
              Start a Project <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}