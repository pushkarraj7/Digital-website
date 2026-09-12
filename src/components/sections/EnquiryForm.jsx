import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Clock,
  MousePointerClick,
  Navigation,
} from "lucide-react";

import { EASE } from "../../lib/animations";
import { cn } from "../../lib/utils";

const SERVICES = [
  "Social Media Marketing & Management",
  "Google Business Management",
  "Software Development",
  "Application Development",
  "Website Design & Development",
  "Lead Generation Program",
  "Online Advertise Campaign",
  "WhatsApp Marketing",
  "Property 360 Virtual Tour",
  "Google 360 Virtual Tour",
  "Graphic Design and Video Editing",
  "Product Photography",
  "Custom NFC Card",
  "Not sure yet",
];

// NOTE: swap these for MVM's real contact details before launch.
const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value:
      "708 Capstone Building, Sharda Mandir Crossroads, Old Gujarat College Rd, Ellisbridge,Ahmedabad, Gujarat 380006",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@mvmdigitals.com",
    href: "mailto:info@mvmdigitals.com",
  },
  {
    icon: Phone,
    label: "Phone",
    values: [
      { text: "+91 97849 56954", href: "tel:+919784956954" },
      { text: "+91 77790 41621", href: "tel:+917779041621" },
    ],
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat, 9am–6pm IST",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function ServiceDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  // Prevent the page from scrolling once the dropdown list hits its own
  // scroll boundary (top/bottom) — only the list should scroll while hovered.
  useEffect(() => {
    const el = listRef.current;
    if (!el || !open) return;

    function handleWheel(e) {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
      e.stopPropagation();
    }

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [open]);

  const filtered = SERVICES.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="interactive"
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-line bg-void/60 px-3 py-2.5 text-left text-sm outline-none transition-colors focus:border-ion/50",
          value ? "text-ink" : "text-haze",
        )}
      >
        <span className="truncate pr-2">{value || "Select a service"}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          className={cn(
            "shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-20 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-black shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="border-b border-line p-2">
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full rounded-lg bg-void/60 px-3 py-2 text-sm text-ink outline-none placeholder:text-haze"
              />
            </div>

            <ul
              ref={listRef}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#7FB4FF66 transparent",
              }}
              className={cn(
                "max-h-56 overflow-y-auto overflow-x-hidden overscroll-contain p-2",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&::-webkit-scrollbar-thumb]:bg-ion/40",
                "[&::-webkit-scrollbar-thumb:hover]:bg-ion/70",
              )}
            >
              {filtered.length === 0 ? (
                <li className="px-3 py-2 text-sm text-haze">
                  No matches found
                </li>
              ) : (
                filtered.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(s);
                        setOpen(false);
                      }}
                      data-cursor="interactive"
                      className={cn(
                        "block w-full rounded-lg px-3 py-2 text-left text-sm leading-snug transition-colors duration-200 hover:bg-surface hover:text-ink",
                        value === s ? "bg-surface text-ink" : "text-mist",
                      )}
                    >
                      {s}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Form() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setStatus("submitting");

    try {
      // TODO: wire this up to a real endpoint (e.g. your backend, Formspree,
      // or a serverless function) once one exists. For now this simulates
      // a submission so the UI/UX can be reviewed end-to-end.
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex h-full min-h-[380px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-white/[0.03] px-6 py-10 text-center"
      >
        <CheckCircle2 className="h-8 w-8 text-ion" />
        <p className="font-display text-xl font-semibold text-ink">
          Got it — thanks.
        </p>
        <p className="max-w-sm text-sm text-mist">
          We'll take a look and get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-ion transition-colors hover:text-ink"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-line bg-white/[0.03] p-5 text-left backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs text-mist">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className="rounded-lg border border-line bg-void/60 px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-haze focus:border-ion/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-mist">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            className="rounded-lg border border-line bg-void/60 px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-haze focus:border-ion/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs text-mist">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91 00000 00000"
            className="rounded-lg border border-line bg-void/60 px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-haze focus:border-ion/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-mist">What are you looking for?</label>
          <ServiceDropdown
            value={form.service}
            onChange={(val) => update("service", val)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs text-mist">
          Message (optional)
        </label>
        <textarea
          id="message"
          rows={3}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us a bit about what you need"
          className="resize-none rounded-lg border border-line bg-void/60 px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-haze focus:border-ion/50"
        />
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        data-cursor="interactive"
        className={cn(
          "mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-void transition-colors duration-300 hover:bg-ion disabled:opacity-60",
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send enquiry"
        )}
      </button>

      <p className="mt-3 text-center text-[11px] text-haze">
        We'll only use these details to get back to you about your enquiry.
      </p>
    </form>
  );
}

export function EnquiryForm() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-void px-4 py-20 sm:px-6 sm:py-32"
    >
      {/* ambient glow, consistent with the rest of the site's dark sections */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 20%, rgba(12,41,89,0.5), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ion">
              Get in touch
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
              Tell us what you're building.
            </h2>
            <p className="mt-4 text-base text-mist sm:text-lg">
              Fill in a few details and we'll get back to you — no long forms,
              no sales calls you didn't ask for.
            </p>
          </motion.div>

          <motion.a
            href="https://www.google.com/maps/search/?api=1&query=708+Capstone+Building+Sharda+Mandir+Crossroads+Old+Gujarat+College+Rd+Ellisbridge+Ahmedabad+Gujarat+380006"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="interactive"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-ion/50 hover:text-ion"
          >
            <Navigation className="h-4 w-4" />
            Get directions
          </motion.a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          {/* left — company details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex flex-col justify-between rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map(
                ({ icon: Icon, label, value, href, values }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-void/60">
                      <Icon className="h-4 w-4 text-ion" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-haze">
                        {label}
                      </p>
                      {values ? (
                        <div className="mt-0.5 flex flex-col gap-0.5">
                          {values.map((v) => (
                            <a
                              key={v.href}
                              href={v.href}
                              data-cursor="interactive"
                              className="block text-sm text-ink transition-colors hover:text-ion"
                            >
                              {v.text}
                            </a>
                          ))}
                        </div>
                      ) : href ? (
                        <a
                          href={href}
                          data-cursor="interactive"
                          className="mt-0.5 block text-sm text-ink transition-colors hover:text-ion"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-ink">{value}</p>
                      )}
                      {label === "Address" && (
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=708+Capstone+Building+Sharda+Mandir+Crossroads+Old+Gujarat+College+Rd+Ellisbridge+Ahmedabad+Gujarat+380006"
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="interactive"
                          className="mt-2 inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-mist transition-colors duration-300 hover:border-ion/50 hover:text-ion"
                        >
                          <Navigation className="h-3 w-3" />
                          Get directions
                        </a>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>

            <p className="mt-10 text-xs leading-relaxed text-haze">
              Prefer email or a call? Reach out directly using the details above
              — we read every enquiry that comes through the form too.
            </p>
          </motion.div>

          {/* right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative"
          >
            {/* points directly at the form, desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="pointer-events-none absolute -top-12 -left-10 z-10 hidden lg:block"
            >
              <div className="flex items-center gap-2 rounded-full border border-ion/30 bg-ion/10 py-1.5 pl-3 pr-4 backdrop-blur-sm">
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-ion/20"
                >
                  <MousePointerClick className="h-3.5 w-3.5 text-ion" />
                </motion.span>
                <span className="text-xs font-medium text-ion">Start here</span>
              </div>
              <svg
                width="40"
                height="36"
                viewBox="0 0 40 36"
                className="absolute left-8 top-full"
                aria-hidden
              >
                <path
                  d="M4 2C4 18 20 24 34 30"
                  stroke="#7FB4FF"
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                  fill="none"
                  markerEnd="url(#pointerArrow)"
                />
                <defs>
                  <marker
                    id="pointerArrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="#7FB4FF" />
                  </marker>
                </defs>
              </svg>
            </motion.div>

            <Form />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
