import { motion } from "framer-motion";
import { ArrowUp, Instagram, Linkedin, Twitter } from "lucide-react";
import { BRAND, NAV_LINKS } from "../../lib/constants";
import { SERVICE_CATEGORIES } from "../../data/services";
import logo from "../../assets/mvm.png";

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "X", href: "#", Icon: Twitter },
];

function FooterPillRow({ heading, items, getKey, getHref, getLabel }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <h3 className="w-24 shrink-0 text-sm font-medium text-ink">{heading}</h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <a
            key={getKey(item)}
            href={getHref(item)}
            data-cursor="interactive"
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-mist backdrop-blur-sm transition-colors duration-300 hover:border-ion/40 hover:bg-ion/10 hover:text-ink sm:px-4 sm:text-sm"
          >
            {getLabel(item)}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-void px-4 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
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
        <div className="flex flex-col gap-10 pb-8 sm:gap-16 sm:pb-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Left — Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md"
          >
            <div className="lg:col-span-1">
              <div
                className="flex items-center gap-2.5"
                data-cursor="interactive"
              >
                <img src={logo} alt={BRAND.name} className="h-8 w-auto" />
              </div>

              <h4 className="mt-4 font-display text-2xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-3xl">
                <span className="block italic">Turn Attention</span>
                <span className="block font-medium italic text-ion">
                  Into Growth.
                </span>
              </h4>

              <p className="mt-3 text-sm leading-relaxed text-mist">
                A digital marketing and technology agency turning attention into
                measurable growth, for brands across India and beyond.
              </p>

              {/* Socials */}
              <div className="mt-7 flex gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    data-cursor="interactive"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-ion/40 hover:bg-ion/10 sm:h-10 sm:w-10"
                  >
                    <Icon
                      className="h-4 w-4 text-mist transition-colors duration-300 group-hover:text-ion"
                      strokeWidth={1.75}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="flex gap-12 lg:gap-16">
            {/* Divider — desktop only */}
            <div className="hidden self-stretch lg:block">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </div>

            {/* Right — Footer Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col gap-5 border-t border-line/60 pb-10 pt-8 sm:pb-16 sm:pt-10 lg:border-t-0 lg:pb-0 lg:pt-0"
            >
              <FooterPillRow
                heading="Navigate"
                items={NAV_LINKS}
                getKey={(l) => l.href}
                getHref={(l) => l.href}
                getLabel={(l) => l.label}
              />

              <FooterPillRow
                heading="Services"
                items={SERVICE_CATEGORIES}
                getKey={(c) => c.id}
                getHref={() => "#services"}
                getLabel={(c) => c.label}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8">
          <p className="text-xs text-haze">
            © {year} {BRAND.name}. All rights reserved.
          </p>

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
