import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND, NAV_LINKS } from "../../lib/constants";
import logo from "../../assets/mvm.webp";

// simple X (Twitter) logo — lucide doesn't ship this yet
function XIcon({ className, strokeWidth }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/madeviamarketing",
    Icon: Facebook,
    color: "#1877F2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mvmdigital.official",
    Icon: Instagram,
    color: "#E1306C",
  },
  {
    label: "X",
    href: "https://x.com/MVM_Digitals",
    Icon: XIcon,
    color: "#000000",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@talkwithmvm",
    Icon: Youtube,
    color: "#FF0000",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mvm-digital-pvt-ltd/",
    Icon: Linkedin,
    color: "#0A66C2",
  },
];

// Plain nav items (Home, About, Blog, Contact) vs dropdown items
// (Services, Portfolio) get their own footer columns automatically —
// keeps the footer in sync with the navbar without duplicating data.
const PLAIN_LINKS = NAV_LINKS.filter((l) => !l.groups);
const GROUPED_LINKS = NAV_LINKS.filter((l) => l.groups);

function FooterColumn({ heading, children }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-medium uppercase tracking-wide text-haze">
        {heading}
      </h3>
      {children}
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      data-cursor="interactive"
      className="text-sm text-mist transition-colors duration-300 hover:text-ion"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  // tracks "GroupLabel::SubGroupTitle" of the currently open accordion item
  // — only one can be open across the whole footer at a time
  const [openGroup, setOpenGroup] = useState(null);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-void px-4 pb-8 pt-14 sm:px-10 sm:pb-10 sm:pt-20">
      {/* top hairline glow, matches navbar/CTA accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ion/50 to-transparent" />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #0C2959, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full opacity-10 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #60a5ff, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-10 pb-10 sm:gap-12 sm:pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Logo & About — spans first column, wider than the rest */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-sm"
          >
            <Link
              to="/"
              className="flex items-center"
              data-cursor="interactive"
            >
              {/* <img
                src={logo}
                alt={BRAND.name}
                className="h-16 w-auto brightness-0 invert sm:h-20"
              /> */}
              <img
                src={logo}
                alt={BRAND.name}
                width={134}
                height={67}
                className="h-16 w-auto brightness-0 invert sm:h-20"
              />
            </Link>

            <h4 className="mt-5 font-display text-2xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-3xl">
              <span className="block italic">Turn Attention</span>
              <span className="block font-medium italic text-ion">
                Into Growth.
              </span>
            </h4>

            <p className="mt-4 text-sm leading-relaxed text-mist">
              A digital marketing and technology agency turning attention into
              measurable growth, for brands across India and beyond.
            </p>
          </motion.div>

          {/* Quick links (Home / About / Blog / Contact) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <FooterColumn heading="Navigate">
              <div className="flex flex-col gap-3">
                {PLAIN_LINKS.map((link) => (
                  <FooterLink key={link.label} to={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            </FooterColumn>
          </motion.div>

          {/* Services + Portfolio — auto-generated from NAV_LINKS groups */}
          {GROUPED_LINKS.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1 + i * 0.05,
              }}
            >
              <FooterColumn heading={group.label}>
                {group.groups.length > 1 ? (
                  // Multiple sub-groups (Services) — accordion, 1 open at a time
                  <div className="flex flex-col gap-1">
                    {group.groups.map((g) => {
                      const key = `${group.label}::${g.title}`;
                      const isOpen = openGroup === key;

                      return (
                        <div key={g.title} className="py-2">
                          <button
                            type="button"
                            data-cursor="interactive"
                            onClick={() => setOpenGroup(isOpen ? null : key)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-2 text-left text-xs font-medium uppercase tracking-wide text-mist/70 transition-colors duration-300 hover:text-ion"
                          >
                            {g.title}
                            <ChevronDown
                              className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
                                isOpen ? "rotate-180 text-ion" : ""
                              }`}
                              strokeWidth={2}
                            />
                          </button>

                          <motion.div
                            initial={false}
                            animate={{
                              gridTemplateRows: isOpen ? "1fr" : "0fr",
                            }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ display: "grid" }}
                            className="overflow-hidden"
                          >
                            <div className="min-h-0 overflow-hidden">
                              <motion.div
                                animate={{ opacity: isOpen ? 1 : 0 }}
                                transition={{
                                  duration: 0.25,
                                  delay: isOpen ? 0.08 : 0,
                                }}
                                className="flex flex-col gap-3 pt-3"
                              >
                                {g.items.map((item) => (
                                  <FooterLink key={item.href} to={item.href}>
                                    {item.label}
                                  </FooterLink>
                                ))}
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Single group (Portfolio) — flat list, no accordion needed
                  <div className="flex flex-col gap-3">
                    {group.groups[0].items.map((item) => (
                      <FooterLink key={item.href} to={item.href}>
                        {item.label}
                      </FooterLink>
                    ))}
                  </div>
                )}
              </FooterColumn>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8">
          <p className="text-xs text-haze">
            © {year} {BRAND.name}. All rights reserved.
          </p>

          <div className="flex gap-3">
            {SOCIALS.map(({ label, href, Icon, color }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                data-cursor="interactive"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                style={{ "--brand-color": color }}
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-[var(--brand-color)] hover:bg-[var(--brand-color)] sm:h-9 sm:w-9"
              >
                <Icon
                  className="h-3.5 w-3.5 text-mist transition-colors duration-300 group-hover:text-white"
                  strokeWidth={1.75}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-mist transition-colors hover:text-ink"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-mist transition-colors hover:text-ink"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
