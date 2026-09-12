// src/pages/TermsAndConditions.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Calendar, Link2, Check, ArrowUp } from "lucide-react";
import { EASE, viewportOnce, fadeUp } from "../lib/animations";

const LAST_UPDATED = "September 12, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    label: "Acceptance",
    title: "1. Acceptance of these terms",
  },
  {
    id: "services",
    label: "Our services",
    title: "2. What this website covers",
  },
  {
    id: "no-payments",
    label: "Payments",
    title: "3. No payments processed on this site",
  },
  { id: "accuracy", label: "Outcomes", title: "4. No guaranteed outcomes" },
  {
    id: "ip",
    label: "Intellectual property",
    title: "5. Intellectual property",
  },
  { id: "conduct", label: "Acceptable use", title: "6. Acceptable use" },
  {
    id: "third-party",
    label: "Third-party services",
    title: "7. Third-party services and links",
  },
  { id: "liability", label: "Liability", title: "8. Limitation of liability" },
  { id: "indemnity", label: "Indemnification", title: "9. Indemnification" },
  {
    id: "governing-law",
    label: "Governing law",
    title: "10. Governing law and jurisdiction",
  },
  { id: "changes", label: "Changes", title: "11. Changes to these terms" },
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

export function TermsAndConditions() {
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
            Terms & Conditions
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
            These terms govern your use of{" "}
            <a
              href="https://mvmdigitals.com/"
              className="text-ion underline underline-offset-2"
            >
              mvmdigitals.com
            </a>
            , operated by MVM Digital Private Limited ("MVM Digital," "we,"
            "us," or "our"). By browsing the site or submitting an inquiry
            through it, you're agreeing to what's below.
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
              id="acceptance"
              title="1. Acceptance of these terms"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                Using this website — browsing our services, viewing our
                portfolio, or submitting a contact or inquiry form — constitutes
                acceptance of these terms. If you don't agree with any part of
                them, please don't submit information through the site; you're
                welcome to reach out to us directly instead to discuss any
                concerns.
              </p>
            </Section>

            <Section
              id="services"
              title="2. What this website covers"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                This website describes and showcases the services MVM Digital
                offers, including but not limited to: digital marketing (social
                media marketing, WhatsApp marketing, online advertising
                campaigns, Google Business management, lead generation
                programs), branding and content production (product photography,
                studio and podcast shoots, 360° virtual tours, custom NFC cards,
                graphic design and video editing), and IT solutions (website
                design and development, application development, software
                development).
              </p>
              <p>
                Nothing on this website constitutes a binding service agreement
                on its own. Any actual engagement — scope, timeline,
                deliverables, and pricing — is confirmed separately in writing
                (proposal, quote, or contract) between you and MVM Digital
                before work begins.
              </p>
            </Section>

            <Section
              id="no-payments"
              title="3. No payments processed on this site"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                This website does not process payments, store card details, or
                handle billing. It is used to share information about our work
                and to collect inquiries. Any commercial terms — fees,
                invoicing, payment schedules — are agreed to directly with our
                team and are governed by the specific service agreement you sign
                with us, not by this website.
              </p>
            </Section>

            <Section
              id="accuracy"
              title="4. No guaranteed outcomes"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                We're direct with clients about this in person, so we'll be
                equally direct here: nothing on this site is a guarantee of
                specific results. Marketing outcomes — ad performance, search
                rankings, follower growth, lead volume, conversion rates —
                depend on factors outside our full control, including platform
                algorithm changes, market conditions, and your business's own
                execution on our recommendations. Case studies and figures shown
                on this site or our blog reflect actual results for the specific
                clients described and aren't a promise of similar results for
                every business.
              </p>
            </Section>

            <Section
              id="ip"
              title="5. Intellectual property"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                All content on this website — copy, design, photography,
                graphics, and the site's code — is owned by MVM Digital or used
                with permission, and may not be copied, reproduced, or reused
                without our written consent.
              </p>
              <p>
                Ownership of deliverables we create for a specific client (a
                website, a set of ad creatives, photography, a mobile app, etc.)
                transfers to that client according to the terms set out in their
                individual service agreement, typically upon full payment. Until
                then, or unless otherwise agreed, MVM Digital retains rights to
                work-in-progress deliverables.
              </p>
            </Section>

            <Section
              id="conduct"
              title="6. Acceptable use"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                You agree not to use this website to submit false contact
                information, attempt to access non-public areas of the site or
                its underlying systems, scrape content for republication, or use
                the site in any way that could damage or disrupt it for other
                visitors.
              </p>
            </Section>

            <Section
              id="third-party"
              title="7. Third-party services and links"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                This site links to and integrates with third-party platforms —
                Google, Meta, WhatsApp, and client websites we've built or
                manage. We aren't responsible for the content, availability, or
                practices of those third-party platforms once you leave
                mvmdigitals.com.
              </p>
            </Section>

            <Section
              id="liability"
              title="8. Limitation of liability"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                To the fullest extent permitted by law, MVM Digital isn't liable
                for any indirect, incidental, or consequential loss arising from
                your use of this website, including loss of business, revenue,
                or data, except where that liability arises from a signed
                service agreement between you and us — in which case the terms
                of that agreement govern.
              </p>
            </Section>

            <Section
              id="indemnity"
              title="9. Indemnification"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                You agree to indemnify MVM Digital against any claims, damages,
                or expenses arising from your misuse of this website or
                violation of these terms.
              </p>
            </Section>

            <Section
              id="governing-law"
              title="10. Governing law and jurisdiction"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                These terms are governed by the laws of India. Any dispute
                arising from your use of this website or these terms will be
                subject to the exclusive jurisdiction of the courts in
                Ahmedabad, Gujarat.
              </p>
            </Section>

            <Section
              id="changes"
              title="11. Changes to these terms"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>
                We may update these terms from time to time as our services or
                the site itself evolve. The "Last updated" date at the top
                reflects the most recent revision. Continued use of the site
                after a change means you accept the updated terms.
              </p>
            </Section>

            <Section
              id="contact"
              title="12. Contact us"
              onCopyLink={handleCopyLink}
              copiedId={copiedId}
            >
              <p>Questions about these terms can be directed to:</p>
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
