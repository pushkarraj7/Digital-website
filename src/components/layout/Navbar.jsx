import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../lib/constants";
import { MagneticButton } from "../ui/MagneticButton";
import { cn } from "../../lib/utils";
import logo from "../../assets/mvm.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [desktopDropdown, setDesktopDropdown] = useState(null); // label of open dropdown
  const [hoveredGroup, setHoveredGroup] = useState(null); // title of category hovered inside a dropdown
  const [mobileExpanded, setMobileExpanded] = useState(null); // label of expanded mobile group
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopDropdown(label);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDesktopDropdown(null), 150);
  };

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
              "w-auto brightness-0 invert transition-all duration-500 ease-premium",
              scrolled ? "h-8 sm:h-9" : "h-11 sm:h-12",
            )}
          />
        </Link>

        <ul className="hidden items-center gap-5 lg:flex lg:gap-8">
          {NAV_LINKS.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.groups && openDropdown(link.label)}
              onMouseLeave={() => link.groups && scheduleClose()}
            >
              <Link
                to={link.href}
                data-cursor="interactive"
                className="flex items-center gap-1 text-sm text-mist transition-colors duration-300 hover:text-ink"
              >
                {link.label}
                {link.groups && (
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    className={cn(
                      "transition-transform duration-300",
                      desktopDropdown === link.label && "rotate-180",
                    )}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )}
              </Link>

              {link.groups && (
                <AnimatePresence>
                  {desktopDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      onMouseLeave={() => setHoveredGroup(null)}
                      className="absolute left-1/2 top-full mt-3 -translate-x-1/2 flex items-start rounded-2xl border border-line bg-black shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                    >
                      {link.groups.length === 1 ? (
                        // Single group (e.g. Portfolio) — show its items flat, no category column.
                        <ul className="flex min-w-[240px] flex-col gap-1 p-3">
                          {link.groups[0].items.map((item) => (
                            <li key={item.href}>
                              <Link
                                to={item.href}
                                data-cursor="interactive"
                                className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-mist transition-colors duration-200 hover:bg-surface hover:text-ink"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <>
                          {/* Level 1: category names only */}
                          <ul className="flex min-w-[220px] flex-col gap-1 p-3">
                            {link.groups.map((group) => (
                              <li key={group.title}>
                                <Link
                                  to={
                                    group.items[0].href
                                      .split("/")
                                      .slice(0, -1)
                                      .join("/") || group.items[0].href
                                  }
                                  onMouseEnter={() =>
                                    setHoveredGroup(group.title)
                                  }
                                  data-cursor="interactive"
                                  className={cn(
                                    "flex items-center justify-between gap-4 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                                    hoveredGroup === group.title
                                      ? "bg-surface text-ink"
                                      : "text-mist hover:bg-surface hover:text-ink",
                                  )}
                                >
                                  {group.title}
                                  <svg
                                    width="7"
                                    height="10"
                                    viewBox="0 0 6 10"
                                    className="opacity-60"
                                  >
                                    <path
                                      d="M1 1L5 5L1 9"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      fill="none"
                                    />
                                  </svg>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          {/* Level 2: items of the hovered category */}
                          {(() => {
                            const active =
                              link.groups.find(
                                (g) => g.title === hoveredGroup,
                              ) || link.groups[0];
                            return (
                              <ul
                                className="flex min-w-[240px] flex-col gap-1 border-l border-line p-3"
                                onMouseEnter={() =>
                                  setHoveredGroup(active.title)
                                }
                              >
                                {active.items.map((item) => (
                                  <li key={item.href}>
                                    <Link
                                      to={item.href}
                                      data-cursor="interactive"
                                      className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-mist transition-colors duration-200 hover:bg-surface hover:text-ink"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            );
                          })()}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
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
          className="absolute left-4 right-4 top-[4.5rem] max-h-[75vh] overflow-y-auto rounded-2xl border border-line bg-void/95 p-6 backdrop-blur-xl lg:hidden sm:left-6 sm:right-6"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.groups ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded((v) =>
                          v === link.label ? null : link.label,
                        )
                      }
                      className="flex w-full items-center justify-between py-3 text-base text-ink"
                    >
                      {link.label}
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 10 6"
                        className={cn(
                          "transition-transform duration-300",
                          mobileExpanded === link.label && "rotate-180",
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
                    {mobileExpanded === link.label && (
                      <div className="flex flex-col gap-3 pb-3 pl-3">
                        {link.groups.map((group) => (
                          <div key={group.title}>
                            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-haze">
                              {group.title}
                            </p>
                            <ul className="flex flex-col gap-0.5">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    to={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block py-1.5 text-sm text-mist"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-ink"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-void"
          >
            Start a Project
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
