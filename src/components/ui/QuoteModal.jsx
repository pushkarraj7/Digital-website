import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  Megaphone,
  Palette,
  Code2,
  ShoppingBag,
  Building2,
  Sparkles,
} from "lucide-react";
import { EASE } from "../../lib/animations";
import { cn } from "../../lib/utils";

const INDUSTRIES = [
  {
    id: "ecommerce",
    label: "E-commerce & Retail",
    desc: "Online stores, marketplaces",
    icon: ShoppingBag,
  },
  {
    id: "realestate",
    label: "Real Estate",
    desc: "Property, listings, tours",
    icon: Building2,
  },
  {
    id: "agency",
    label: "Agency / Marketing",
    desc: "Campaigns, growth, ads",
    icon: Megaphone,
  },
  {
    id: "creative",
    label: "Design & Creative",
    desc: "Brand, visuals, media",
    icon: Palette,
  },
  {
    id: "tech",
    label: "Tech / Software",
    desc: "Apps, platforms, tools",
    icon: Code2,
  },
  {
    id: "other",
    label: "Something Else",
    desc: "Tell us more later",
    icon: Sparkles,
  },
];

const STEPS = ["name", "email", "phone", "industry"];

const STEP_META = {
  name: {
    eyebrow: "Let's get acquainted",
    title: "Who are we talking to?",
    sub: "Just your name — nothing formal.",
    icon: User,
  },
  email: {
    eyebrow: "Almost there",
    title: "Where can we reply?",
    sub: "We'll send our reply here, no spam.",
    icon: Mail,
  },
  phone: {
    eyebrow: "One more thing",
    title: "A number to reach you?",
    sub: "Optional — only if you prefer a call.",
    icon: Phone,
  },
  industry: {
    eyebrow: "Last step",
    title: "What field are you in?",
    sub: "Helps us understand your world faster.",
    icon: Briefcase,
  },
};

function ProgressDots({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/10"
        >
          <motion.div
            initial={false}
            animate={{ width: i <= current ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-y-0 left-0 rounded-full bg-ion shadow-[0_0_12px_rgba(127,180,255,0.6)]"
          />
        </div>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export function QuoteModal({ isOpen, onClose, origin }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState("form"); // form | submitting | success
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
  });
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const step = STEPS[stepIndex];
  const meta = STEP_META[step];
  const StepIcon = meta.icon;

  useEffect(() => {
    if (isOpen) {
      setStepIndex(0);
      setStatus("form");
      setForm({ name: "", email: "", phone: "", industry: "" });
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      (step === "name" || step === "email" || step === "phone") &&
      inputRef.current
    ) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [step, isOpen]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Pause Lenis entirely while the modal is open — stopPropagation can't
  // stop it since it listens on window itself, so it has to be told to
  // stand down directly. Falls back to locking native body scroll if
  // Lenis isn't mounted (e.g. reduced-motion users).
  useEffect(() => {
    if (!isOpen) return;

    const lenis = window.__lenis;
    lenis?.stop();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Lenis keeps its own wheel listener attached even while stopped
    // (it still calls preventDefault globally), which blocks native
    // scroll inside the modal too. So we scroll the panel manually.
    const el = panelRef.current;
    function handleWheel(e) {
      if (!el) return;
      e.preventDefault();
      el.scrollTop += e.deltaY;
    }
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  // Auto-close the modal a few seconds after a successful submit.
  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(t);
  }, [status, onClose]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function goNext() {
    if (stepIndex < STEPS.length - 1) {
      setDirection(1);
      setStepIndex((i) => i + 1);
    } else {
      handleSubmit();
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setDirection(-1);
      setStepIndex((i) => i - 1);
    }
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      // TODO: wire to real endpoint.
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setStatus("success");
    } catch {
      setStatus("form");
    }
  }

  const canAdvance =
    (step === "name" && form.name.trim().length > 1) ||
    (step === "email" && /\S+@\S+\.\S+/.test(form.email)) ||
    step === "phone" ||
    (step === "industry" && form.industry);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/80 backdrop-blur-md"
          />

          {/* modal panel — scales in from the button's screen position */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.2,
              x: origin
                ? origin.x -
                  (typeof window !== "undefined" ? window.innerWidth / 2 : 0)
                : 0,
              y: origin
                ? origin.y -
                  (typeof window !== "undefined" ? window.innerHeight / 2 : 0)
                : 0,
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.3,
              x: origin
                ? origin.x -
                  (typeof window !== "undefined" ? window.innerWidth / 2 : 0)
                : 0,
              y: origin
                ? origin.y -
                  (typeof window !== "undefined" ? window.innerHeight / 2 : 0)
                : 0,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            ref={panelRef}
            className="relative z-10 w-full max-w-lg max-h-[88vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-line bg-[#0b0d14] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >
            {/* ambient glow that shifts with each step */}
            <motion.div
              key={`glow-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 0%, rgba(78,134,255,0.16), transparent 70%)",
              }}
            />

            {/* faint rotating ring behind the step icon, purely decorative */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 opacity-[0.07]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="h-full w-full rounded-full border border-dashed border-ion"
              />
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              data-cursor="interactive"
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-line/60 text-mist transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-6 pt-16 sm:p-10 sm:pt-16">
              {status === "success" ? (
                <SuccessState name={form.name} onClose={onClose} />
              ) : (
                <>
                  <div className="mb-8 flex items-center justify-between">
                    <ProgressDots current={stepIndex} total={STEPS.length} />
                    <span className="text-[11px] font-medium tracking-wide text-haze">
                      {stepIndex + 1} / {STEPS.length}
                    </span>
                  </div>

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {/* icon + eyebrow + title, shared shell for every step */}
                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 18,
                            delay: 0.05,
                          }}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ion/30 bg-ion/10"
                        >
                          <StepIcon className="h-5 w-5 text-ion" />
                        </motion.div>
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ion/80">
                            {meta.eyebrow}
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">
                            {meta.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-mist">{meta.sub}</p>

                      <div className="mt-8">
                        {step === "name" && (
                          <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
                            <input
                              ref={inputRef}
                              type="text"
                              value={form.name}
                              onChange={(e) => update("name", e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && canAdvance) goNext();
                              }}
                              placeholder="e.g. Priya Sharma"
                              className="w-full border-b-2 border-line bg-transparent pb-3 font-display text-2xl text-ink outline-none transition-colors placeholder:text-haze/40 focus:border-ion sm:text-3xl"
                            />
                            <p className="mt-3 text-xs text-haze">
                              So we know who we're chatting with.
                            </p>
                          </div>
                        )}

                        {step === "email" && (
                          <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
                            <input
                              ref={inputRef}
                              type="email"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && canAdvance) goNext();
                              }}
                              placeholder="you@company.com"
                              className="w-full border-b-2 border-line bg-transparent pb-3 font-display text-xl text-ink outline-none transition-colors placeholder:text-haze/40 focus:border-ion sm:text-2xl"
                            />
                            <p className="mt-3 text-xs text-haze">
                              Straight to our inbox — no spam, ever.
                            </p>
                          </div>
                        )}

                        {step === "phone" && (
                          <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
                            <input
                              ref={inputRef}
                              type="tel"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") goNext();
                              }}
                              placeholder="+91 00000 00000"
                              className="w-full border-b-2 border-line bg-transparent pb-3 font-display text-xl text-ink outline-none transition-colors placeholder:text-haze/40 focus:border-ion sm:text-2xl"
                            />
                            <p className="mt-3 text-xs text-haze">
                              Skip it if you'd rather we just email you.
                            </p>
                          </div>
                        )}

                        {step === "industry" && (
                          <div className="grid grid-cols-2 gap-3">
                            {INDUSTRIES.map((ind, i) => {
                              const Icon = ind.icon;
                              const active = form.industry === ind.id;
                              return (
                                <motion.button
                                  key={ind.id}
                                  type="button"
                                  data-cursor="interactive"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: i * 0.05,
                                    duration: 0.4,
                                    ease: EASE,
                                  }}
                                  onClick={() => {
                                    update("industry", ind.id);
                                    setTimeout(goNext, 320);
                                  }}
                                  className={cn(
                                    "group relative flex flex-col items-start gap-2 overflow-hidden rounded-xl border p-3.5 text-left transition-all duration-300",
                                    active
                                      ? "border-ion bg-ion/10 shadow-[0_0_30px_rgba(127,180,255,0.25)]"
                                      : "border-line bg-white/[0.02] hover:border-ion/40 hover:bg-white/[0.05]",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-300",
                                      active
                                        ? "border-ion/40 bg-ion/15 text-ion"
                                        : "border-line text-mist group-hover:text-ion",
                                    )}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <p className="text-xs font-medium leading-snug text-ink">
                                    {ind.label}
                                  </p>
                                  <p className="text-[10px] leading-snug text-haze">
                                    {ind.desc}
                                  </p>
                                  {active && (
                                    <motion.div
                                      layoutId="industry-check"
                                      className="absolute right-2.5 top-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-ion"
                                    >
                                      <CheckCircle2 className="h-3 w-3 text-void" />
                                    </motion.div>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={stepIndex === 0}
                      data-cursor="interactive"
                      className={cn(
                        "flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-ink",
                        stepIndex === 0 && "invisible",
                      )}
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canAdvance || status === "submitting"}
                      data-cursor="interactive"
                      className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-void transition-colors duration-300 hover:bg-ion disabled:opacity-40"
                    >
                      {status === "submitting" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : stepIndex === STEPS.length - 1 ? (
                        "Submit"
                      ) : (
                        <>
                          Next <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function SuccessState({ name, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[400px] flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-ion/10"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-full border border-ion/50"
          />
        ))}
        <CheckCircle2 className="h-9 w-9 text-ion" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 font-display text-2xl font-semibold text-ink"
      >
        {name
          ? `Great to meet you, ${name.split(" ")[0]}.`
          : "Great to meet you."}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 max-w-xs text-sm text-mist"
      >
        We've got your details — someone from our team will reach out soon.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        onClick={onClose}
        data-cursor="interactive"
        className="mt-8 rounded-full border border-line px-6 py-2.5 text-sm text-ink transition-colors hover:border-ion/50 hover:text-ion"
      >
        Close
      </motion.button>
    </motion.div>
  );
}
