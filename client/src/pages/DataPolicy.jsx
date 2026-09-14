// src/pages/PrivacyPolicy.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Calendar, Link2, Check, ArrowUp } from "lucide-react";
import { EASE, viewportOnce, fadeUp } from "../lib/animations";

const LAST_UPDATED = "September 12, 2026";

const SECTIONS = [
  {
    id: "what-we-collect",
    label: "Information we collect",
    title: "1. Information we collect",
  },
  {
    id: "how-we-use-it",
    label: "How we use it",
    title: "2. How we use this information",
  },
  {
    id: "cookies-tracking",
    label: "Cookies & tracking",
    title: "3. Cookies and tracking tools",
  },
  { id: "whatsapp", label: "WhatsApp", title: "4. WhatsApp communications" },
  {
    id: "sharing",
    label: "Who we share with",
    title: "5. Who we share information with",
  },
  {
    id: "retention",
    label: "How long we keep it",
    title: "6. How long we keep it",
  },
  { id: "your-rights", label: "Your rights", title: "7. Your rights" },
  { id: "security", label: "How we protect it", title: "8. How we protect it" },
  {
    id: "children",
    label: "Children's privacy",
    title: "9. Children's privacy",
  },
  {
    id: "third-party-links",
    label: "Links to other sites",
    title: "10. Links to other sites",
  },
  { id: "changes", label: "Changes", title: "11. Changes to this policy" },
  { id: "contact", label: "Contact us", title: "12. Contact us" },
];

/* ---------- Reading progress bar ---------- */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-ion"
      aria-hidden
    />
  );
}

/* ---------- Back to top ---------- */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: EASE }}
          aria-label="Back to top"
          className="fixed bottom-6 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-mist shadow-sm transition-colors hover:border-ion hover:text-ion focus-visible:outline focus-visible:outline-2 focus-visible:outline-ion sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------- Desktop sidebar nav ---------- */
function SidebarNav({ activeId, onNavigate }) {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-28" aria-label="Table of contents">
        <p className="text-sm font-medium text-ink">On this page</p>
        <ul className="relative mt-4 space-y-1 border-l border-line pl-4">
          {SECTIONS.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="tocIndicator"
                    className="absolute -left-[17px] top-0 h-full w-[2px] bg-ion"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
                <a
                  href={`#${s.id}`}
                  onClick={(e) => onNavigate(e, s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ion ${
                    isActive ? "text-ion" : "text-mist hover:text-ink"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

/* ---------- Mobile chip nav ---------- */
function MobileNav({ activeId, onNavigate }) {
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-line bg-white/90 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden">
      <nav
        aria-label="Table of contents"
        className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <a
              key={s.id}
              ref={isActive ? activeRef : null}
              href={`#${s.id}`}
              onClick={(e) => onNavigate(e, s.id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ion ${
                isActive
                  ? "border-ion bg-ion text-white"
                  : "border-line text-mist hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

/* ---------- Section ---------- */
function Section({ id, title, children, onCopyLink, copiedId }) {
  const isCopied = copiedId === id;
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className="group scroll-mt-32 border-b border-line py-8 first:pt-0 last:border-b-0 lg:scroll-mt-28"
    >
      <div className="flex items-center gap-2">
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => onCopyLink(id)}
          aria-label={`Copy link to ${title}`}
          className="text-haze opacity-0 transition-opacity duration-150 hover:text-ion focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ion group-hover:opacity-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-mist sm:text-base">
        {children}
      </div>
    </motion.div>
  );
}

export function PrivacyPolicy() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (e, id) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  const handleCopyLink = async (id) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(
        () => setCopiedId((current) => (current === id ? null : current)),
        1600,
      );
    } catch {
      // Clipboard access denied — fail silently, link is still reachable by scrolling.
    }
  };

  return (
    <>
      <ProgressBar />
      <BackToTop />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-32">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-ion/15 opacity-40 blur-[160px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-3xl font-semibold text-ink sm:text-4xl"
          >
            Privacy Policy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mt-5 flex items-center gap-1.5 text-xs text-haze"
          >
            <Calendar className="h-3.5 w-3.5" />
            Last updated: {LAST_UPDATED}. Twelve sections, about six minutes to
            read.
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mt-6 text-sm leading-relaxed text-mist sm:text-base"
          >
            This policy explains what MVM Digital Private Limited ("MVM
            Digital," "we," "us," or "our") collects when you visit{" "}
            <a
              href="https://mvmdigitals.com/"
              className="text-ion underline underline-offset-2"
            >
              mvmdigitals.com
            </a>
            , why we collect it, and what say you have over it. We've tried to
            write it the way we'd actually explain it to a client, not the way a
            template would.
          </motion.p>
        </div>
      </section>

      <MobileNav activeId={activeId} onNavigate={handleNavigate} />

      {/* ---------- Body ---------- */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <SidebarNav activeId={activeId} onNavigate={handleNavigate} />

          <div className="max-w-3xl">
            <Section
              id="what-we-collect"
              title="1. Information we collect"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                We collect information in a few specific ways, depending on how
                you interact with us:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="text-ink">
                    Forms you fill out on our site
                  </span>{" "}
                  — contact forms, service inquiry forms, and the "get in touch"
                  form typically ask for your name, phone number, email address,
                  business name, and a short description of what you're looking
                  for.
                </li>
                <li>
                  <span className="text-ink">WhatsApp and phone inquiries</span>{" "}
                  — if you reach out to us or one of our clients' campaigns via
                  WhatsApp or a phone call listed on our site, we retain that
                  number and conversation to respond to you and, where relevant,
                  follow up about the service you asked about.
                </li>
                <li>
                  <span className="text-ink">Automatically collected data</span>{" "}
                  — when you browse our site, our analytics tools log standard
                  technical details: your approximate location (city-level, from
                  IP), device and browser type, pages visited, and how you
                  arrived at the site (e.g. a Google search or an Instagram ad).
                </li>
              </ul>
              <p>
                We do not process payments, store card details, or handle
                billing information through this website. Any commercial
                engagement with us — retainers, project fees, invoicing — is
                handled separately through direct communication and a signed
                agreement, not through the site itself.
              </p>
            </Section>

            <Section
              id="how-we-use-it"
              title="2. How we use this information"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <ul className="list-disc space-y-2 pl-5">
                <li>To respond to inquiries and quote or scope a project.</li>
                <li>
                  To follow up on a service you asked about, including via
                  WhatsApp, email, or phone.
                </li>
                <li>
                  To understand which pages, campaigns, or ads are actually
                  bringing people to the site, so we can improve it.
                </li>
                <li>
                  To retarget site visitors with ads on Meta platforms
                  (Instagram/Facebook) if you've previously visited a page on
                  our site — see Section 3 below.
                </li>
                <li>
                  To share relevant case studies or updates about our services,
                  only if you've opted in to receive them.
                </li>
              </ul>
              <p>
                We do not sell your personal information to third parties, and
                we never share your contact details with unrelated businesses
                for their own marketing.
              </p>
            </Section>

            <Section
              id="cookies-tracking"
              title="3. Cookies and tracking tools"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                Our site uses <span className="text-ink">Google Analytics</span>{" "}
                to understand traffic and site behaviour, and the{" "}
                <span className="text-ink">Meta Pixel</span> to measure the
                performance of our own Instagram and Facebook ad campaigns and
                to show you relevant ads on those platforms after you've visited
                our site. Both tools use cookies and similar technologies to do
                this.
              </p>
              <p>
                You can control or block these cookies through your browser
                settings, or opt out of Google Analytics tracking using Google's
                official{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  className="text-ion underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  browser add-on
                </a>
                . Blocking these won't affect your ability to browse the site or
                contact us — it only limits what we (and Meta/Google) can see
                about that visit.
              </p>
            </Section>

            <Section
              id="whatsapp"
              title="4. WhatsApp communications"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                Because WhatsApp marketing is one of the services we run for
                clients, and one of the channels we use ourselves, it's worth
                being specific here. If you message us on WhatsApp or opt in to
                updates through a client campaign we manage, we store your
                number and message history to respond and to send relevant
                follow-ups.
              </p>
              <p>
                You can stop these messages at any time by replying "STOP" or
                simply telling us to remove you — we'll action that within a
                reasonable time and won't message that number again for
                marketing purposes.
              </p>
            </Section>

            <Section
              id="sharing"
              title="5. Who we share information with"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                We share data with a small set of service providers who help us
                run the site and our campaigns, and only to the extent needed
                for them to do that job:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Google (Analytics, Google Business Management tools)</li>
                <li>Meta (Pixel, ad platform)</li>
                <li>Our website hosting and email service providers</li>
              </ul>
              <p>
                We may also disclose information if legally required to do so —
                for instance, in response to a valid request from a government
                or law enforcement authority.
              </p>
            </Section>

            <Section
              id="retention"
              title="6. How long we keep it"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                We keep inquiry and contact information for as long as there's
                an active or reasonably recent conversation with you, and for a
                period after that in case you get back in touch. If you ask us
                to delete your information and there's no legal or contractual
                reason for us to retain it, we will.
              </p>
            </Section>

            <Section
              id="your-rights"
              title="7. Your rights"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                Under India's Digital Personal Data Protection Act, 2023, you
                have the right to:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Ask us what personal data we hold about you.</li>
                <li>Ask us to correct inaccurate or outdated information.</li>
                <li>
                  Ask us to erase your data, where we're not required to keep it
                  for a legal or contractual reason.
                </li>
                <li>
                  Withdraw consent for marketing communications at any time.
                </li>
              </ul>
              <p>
                To exercise any of these, email us at{" "}
                <a
                  href="mailto:info@mvmdigitals.com"
                  className="text-ion underline underline-offset-2"
                >
                  info@mvmdigitals.com
                </a>{" "}
                with the subject line "Data Request." We'll respond within a
                reasonable timeframe, generally within 30 days.
              </p>
            </Section>

            <Section
              id="security"
              title="8. How we protect it"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                We restrict access to inquiry and client data to the team
                members who need it to do their job, use secure connections
                (HTTPS) across the site, and rely on reputable third-party
                platforms (Google, Meta, our hosting provider) that maintain
                their own security standards. No method of storage or
                transmission is perfectly secure, but we don't treat this
                lightly given the nature of the client data we handle.
              </p>
            </Section>

            <Section
              id="children"
              title="9. Children's privacy"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                Our services are directed at businesses and business owners, not
                children. We don't knowingly collect personal information from
                anyone under 18. If you believe a minor has submitted
                information to us, contact us and we'll remove it.
              </p>
            </Section>

            <Section
              id="third-party-links"
              title="10. Links to other sites"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                Our site links out to client websites, portfolio pieces, and
                social profiles we've built or manage. Once you leave
                mvmdigitals.com, this policy no longer applies — the site you've
                navigated to has its own privacy practices, and we'd encourage
                you to check them.
              </p>
            </Section>

            <Section
              id="changes"
              title="11. Changes to this policy"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                If we materially change how we collect or use information, we'll
                update this page and change the "Last updated" date at the top.
                We won't quietly widen what we do with your data without
                reflecting that here.
              </p>
            </Section>

            <Section
              id="contact"
              title="12. Contact us"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                Questions about this policy, or a request regarding your data,
                can go to:
              </p>
              <p className="text-ink">
                MVM Digital Private Limited
                <br />
                708 Capstone Building, Sharda Mandir Crossroads, <br />
                Old Gujarat College Rd, Ellisbridge,Ahmedabad, Gujarat 380006
                <br />
                Email:{" "}
                <a
                  href="mailto:info@mvmdigitals.com"
                  className="text-ion underline underline-offset-2"
                >
                  info@mvmdigitals.com
                </a>
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
