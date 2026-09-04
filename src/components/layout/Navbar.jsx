import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../lib/constants";
import { MagneticButton } from "../ui/MagneticButton";
import { cn } from "../../lib/utils";
import logo from "../../assets/mvm.png";
import { smoothScrollTo } from "../../lib/smoothScroll";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border border-line bg-void/60 backdrop-blur-xl transition-all duration-500 ease-premium",
          scrolled
            ? "px-3 py-2 sm:px-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            : "px-4 py-3 sm:px-6 sm:py-3.5",
        )}
      >
        <Link to="/" className="flex items-center" data-cursor="interactive">
          <img
            src={logo}
            alt="MVM Digital"
            className={cn(
              "w-auto transition-all duration-500 ease-premium",
              scrolled ? "h-6 sm:h-7" : "h-7 sm:h-8",
            )}
          />
        </Link>

        <ul className="hidden items-center gap-5 lg:flex lg:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="interactive"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(link.href);
                }}
                className="text-sm text-mist transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <MagneticButton
            href="#contact"
            data-cursor="interactive"
            className="!px-5 !py-2.5 !text-sm rounded-full"
          >
            Start a Project
          </MagneticButton>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "h-px w-4 bg-ink transition-transform duration-300",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-4 bg-ink transition-transform duration-300",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </div>
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 top-[4.5rem] rounded-2xl border border-line bg-void/95 p-6 backdrop-blur-xl lg:hidden sm:left-6 sm:right-6"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    smoothScrollTo(link.href);
                  }}
                  className="text-base text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-void"
          >
            Start a Project
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
