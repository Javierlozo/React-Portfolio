"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faSun, faMoon, faChevronDown, faMagnifyingGlass, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../contexts/ThemeContext";
import { OPEN_EVENT } from "./CommandPalette";

type NavLink = { label: string; id: string };
type NavItem = { label: string; id?: string; href?: string; note?: string };

const TOP_LINKS: NavLink[] = [
  { label: "About", id: "about" },
];
const LABS_LINK: NavLink = { label: "Labs", id: "security-labs" };
const CREDENTIALS_LINK: NavLink = { label: "Credentials", id: "certifications" };
const CTA_LINK: NavLink = { label: "Fit Check", id: "fit-check" };
const CONTACT_LINK: NavLink = { label: "Contact", id: "contact" };

// llm-audit leads Work: it is the flagship and the first thing a hiring
// manager should see. Section anchor, not /llm-audit, for the richer layout.
const WORK_ITEMS: NavItem[] = [
  { label: "llm-audit", id: "llm-audit", note: "OWASP LLM Top 10 scanner" },
  { label: "LLM Red Team Lab", href: "/ai-playground", note: "Prompt injection research" },
  { label: "Other projects", id: "portfolio", note: "Shipped web work" },
  { label: "Experience", id: "experience", note: "Where I have worked" },
];

// Mobile mirrors the desktop grouping: flat primary links, then Work and
// Writing as labeled groups.
const MOBILE_PRIMARY: NavLink[] = [
  ...TOP_LINKS,
  LABS_LINK,
  CREDENTIALS_LINK,
  CTA_LINK,
  CONTACT_LINK,
];

const WRITING_ITEMS: NavItem[] = [
  { label: "AppSec Notes", href: "/notes", note: "Course and cert notes" },
  { label: "Blog", href: "/blog", note: "Writeups and findings" },
  { label: "Now", href: "/now", note: "What I am working on" },
];

const linkBase =
  "relative px-2 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-colors duration-300";
const linkInactive =
  "text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white";
const linkActive = "text-gray-900 dark:text-white";
const underline =
  "absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px bg-gray-900 dark:bg-white";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hamburgerImageError, setHamburgerImageError] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((v) => !v);

  const openSearch = () => {
    setIsOpen(false);
    window.dispatchEvent(new Event(OPEN_EVENT));
  };

  // Mac shows ⌘K, everything else Ctrl K. Resolved after mount so the server
  // and client markup match.
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (isOpen) setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  useEffect(() => {
    const sections = ["about", "llm-audit", "experience", "security-labs", "certifications", "portfolio", "fit-check", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sectionHref = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  const SectionLink = ({ link }: { link: NavLink }) => {
    const isActive = activeSection === link.id;
    return (
      <a
        href={sectionHref(link.id)}
        className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
      >
        {link.label}
        {isActive && <div className={underline} />}
      </a>
    );
  };

  const itemHref = (item: NavItem) => (item.href ? item.href : sectionHref(item.id!));

  const isItemActive = (item: NavItem) =>
    item.href ? pathname.startsWith(item.href) : activeSection === item.id;

  const NavDropdown = ({ label, items }: { label: string; items: NavItem[] }) => {
    const [open, setOpen] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const wrapRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const groupActive = items.some(isItemActive);

    const close = () => {
      setOpen(false);
      setCursor(-1);
    };

    // Small delay so brushing past the menu does not flash the panel open.
    const scheduleOpen = () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      openTimer.current = setTimeout(() => setOpen(true), 120);
    };
    const cancelOpen = () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      openTimer.current = null;
    };

    useEffect(() => () => cancelOpen(), []);

    useEffect(() => {
      if (!open) return;
      const onDown = (e: MouseEvent) => {
        if (!wrapRef.current?.contains(e.target as Node)) close();
      };
      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onEsc);
      return () => {
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("keydown", onEsc);
      };
    }, [open]);

    useEffect(() => {
      if (open && cursor >= 0) itemRefs.current[cursor]?.focus();
    }, [open, cursor]);

    const move = (delta: number) => {
      setOpen(true);
      setCursor((c) => {
        const next = c + delta;
        if (next < 0) return items.length - 1;
        if (next >= items.length) return 0;
        return next;
      });
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Home" && open) {
        e.preventDefault();
        setCursor(0);
      } else if (e.key === "End" && open) {
        e.preventDefault();
        setCursor(items.length - 1);
      }
    };

    return (
      <div
        ref={wrapRef}
        className="relative"
        onMouseEnter={scheduleOpen}
        onMouseLeave={() => {
          cancelOpen();
          close();
        }}
        onKeyDown={onKeyDown}
      >
        <button
          type="button"
          onClick={() => {
            cancelOpen();
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-haspopup="true"
          className={`${linkBase} inline-flex items-center gap-1.5 ${
            groupActive ? linkActive : linkInactive
          }`}
        >
          {label}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          {groupActive && <div className={underline} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-72"
            >
              <div
                role="menu"
                aria-label={label}
                className="rounded-2xl border shadow-xl shadow-gray-900/5 overflow-hidden p-1.5 bg-white/95 backdrop-blur border-divider dark:bg-gray-900/95 dark:shadow-black/40"
              >
                {items.map((item, i) => {
                  const active = isItemActive(item);
                  const focused = cursor === i;
                  return (
                    <a
                      key={item.label}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      role="menuitem"
                      href={itemHref(item)}
                      onClick={close}
                      onMouseEnter={() => setCursor(i)}
                      className={`group relative flex items-center gap-3 rounded-xl pl-3 pr-2.5 py-2.5 outline-none transition-colors duration-150 ${
                        active || focused
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      {/* Accent rail: solid when the item is the current page */}
                      <span
                        aria-hidden
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-amber-500 transition-all duration-150 ${
                          active
                            ? "h-7 opacity-100"
                            : focused
                            ? "h-5 opacity-70"
                            : "h-0 opacity-0"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-sm font-medium transition-transform duration-150 ${
                            active || focused
                              ? "translate-x-0.5 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.note && (
                          <span className="block mt-0.5 text-xs text-content-subtle">
                            {item.note}
                          </span>
                        )}
                      </span>
                      <FontAwesomeIcon
                        icon={faArrowRightLong}
                        aria-hidden
                        className={`w-3 h-3 shrink-0 text-gray-400 transition-all duration-150 ${
                          active || focused
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-1"
                        }`}
                      />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav
      id="main-navbar"
      className="py-2 sm:py-3 px-3 sm:px-4 fixed w-full z-nav top-0 left-0 right-0 transition-colors duration-300 bg-surface-elevated border-b border-divider"
    >
      <div className="container mx-auto flex justify-between items-center max-w-7xl gap-2">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="cursor-pointer hover:scale-105 transition-transform duration-300 shrink-0 block"
        >
          <Image
            src="/light.png"
            alt="Luis Javier Lozoya Portfolio Logo"
            width={115}
            height={82}
            priority
            className="block dark:hidden h-11 w-auto"
          />
          <Image
            src="/dark.png"
            alt="Luis Javier Lozoya Portfolio Logo"
            width={153}
            height={149}
            priority
            className="hidden dark:block h-11 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex justify-center items-center flex-grow gap-1 min-w-0">
          {TOP_LINKS.map((link) => (
            <SectionLink key={link.id} link={link} />
          ))}

          <NavDropdown label="Work" items={WORK_ITEMS} />

          {/* Labs, amber accent */}
          <a
            href={sectionHref(LABS_LINK.id)}
            className={`${linkBase} ${
              activeSection === LABS_LINK.id
                ? "text-amber-600 dark:text-amber-400"
                : "text-amber-600/80 hover:text-amber-700 dark:text-amber-400/80 dark:hover:text-amber-300"
            }`}
          >
            {LABS_LINK.label}
            {activeSection === LABS_LINK.id && (
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px bg-amber-500" />
            )}
          </a>

          <NavDropdown label="Writing" items={WRITING_ITEMS} />

          <SectionLink link={CREDENTIALS_LINK} />

          {/* Fit Check, pill CTA */}
          <a
            href={sectionHref(CTA_LINK.id)}
            className={`relative px-3 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap rounded-full border transition-colors duration-300 ${
              activeSection === CTA_LINK.id
                ? "border-green-700 text-green-700 bg-green-50 dark:border-green-400 dark:text-green-400 dark:bg-green-500/10"
                : "border-gray-300 text-gray-500 hover:border-green-700 hover:text-green-700 hover:bg-green-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-green-400 dark:hover:text-green-400 dark:hover:bg-green-500/10"
            }`}
          >
            {CTA_LINK.label}
          </a>

          <SectionLink link={CONTACT_LINK} />
        </div>

        {/* Search */}
        <button
          onClick={openSearch}
          className="hidden sm:inline-flex items-center gap-2 h-9 px-3 border shrink-0 transition-colors duration-300 border-divider text-content-subtle hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white"
          aria-label="Search labs, writing, and notes"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-xs font-medium tracking-wide">Search</span>
          <span className="hidden lg:inline font-mono text-[10px] opacity-60">
            {isMac ? "⌘K" : "Ctrl K"}
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 border shrink-0 transition-colors duration-300 hover:scale-105 border-divider text-content-subtle hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? <FontAwesomeIcon icon={faSun} className="w-4 h-4" /> : <FontAwesomeIcon icon={faMoon} className="w-4 h-4" />}
        </button>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="xl:hidden w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faXmark} className="w-7 h-7 transition-colors duration-300 text-content-muted hover:text-gray-900 dark:hover:text-white" />
          ) : hamburgerImageError ? (
            <FontAwesomeIcon icon={faBars} className="w-7 h-7 transition-colors duration-300 text-content-muted hover:text-gray-900 dark:hover:text-white" />
          ) : (
            <Image
              src="/hamburger.png"
              alt="Menu"
              width={32}
              height={32}
              className="transition-opacity duration-300"
              onError={() => setHamburgerImageError(true)}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-modal xl:hidden bg-black/50">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            className="absolute inset-0 animate-fadeIn z-0 cursor-default"
            onClick={toggleMenu}
          />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md md:max-w-lg border-l shadow-2xl z-10 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800"
            style={{ animation: "slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-lg font-light tracking-wide text-content">
                  Menu
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 hover:scale-110 border-gray-300 text-content-muted hover:border-gray-900 hover:text-gray-900 dark:border-gray-600 dark:hover:border-white dark:hover:text-white"
                    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                    aria-pressed={theme === "dark"}
                  >
                    {theme === "dark" ? <FontAwesomeIcon icon={faSun} className="w-4 h-4" /> : <FontAwesomeIcon icon={faMoon} className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleMenu}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 hover:scale-110 border-gray-300 text-content-muted hover:border-gray-900 hover:text-gray-900 dark:border-gray-600 dark:hover:border-white dark:hover:text-white"
                    aria-label="Close menu"
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="p-4 overflow-y-auto bg-white dark:bg-gray-900"
              data-lenis-prevent
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              <button
                type="button"
                onClick={openSearch}
                className="flex w-full items-center gap-3 py-3 px-3 mb-2 rounded-lg border text-sm font-medium transition-colors border-gray-200 text-content-subtle active:bg-gray-100 dark:border-gray-800 dark:active:bg-gray-800"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5" />
                Search labs, writing, notes
              </button>

              {MOBILE_PRIMARY.map((link) => {
                const isActive = activeSection === link.id;
                const isLabs = link.id === "security-labs";
                const isFitCheck = link.id === "fit-check";

                const colorClass = isLabs
                  ? isActive
                    ? "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/20"
                    : "text-amber-600 active:bg-amber-50 dark:text-amber-400/90 dark:active:bg-amber-500/10"
                  : isFitCheck
                  ? isActive
                    ? "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20"
                    : "text-blue-600 active:bg-blue-50 dark:text-blue-400/90 dark:active:bg-blue-500/10"
                  : isActive
                  ? "text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800"
                  : "text-gray-700 active:bg-gray-100 dark:text-gray-300 dark:active:bg-gray-800";

                return (
                  <a
                    key={link.id}
                    href={sectionHref(link.id)}
                    className={`block transition-all duration-200 py-3 px-3 text-sm font-medium rounded-lg mb-0.5 active:scale-95 active:opacity-80 ${colorClass}`}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </a>
                );
              })}

              {[
                { heading: "Work", items: WORK_ITEMS },
                { heading: "Writing", items: WRITING_ITEMS },
              ].map((group) => (
                <div key={group.heading}>
                  <div className="my-2 mx-3 border-t border-gray-200 dark:border-gray-800" />
                  <div className="px-3 pt-1 pb-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {group.heading}
                  </div>
                  {group.items.map((item) => {
                    const active = isItemActive(item);
                    const cls = `block transition-all duration-200 py-3 px-3 text-sm font-medium rounded-lg mb-0.5 active:scale-95 active:opacity-80 ${
                      active
                        ? "text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800"
                        : "text-gray-700 active:bg-gray-100 dark:text-gray-300 dark:active:bg-gray-800"
                    }`;
                    return item.href ? (
                      <Link key={item.label} href={item.href} className={cls} onClick={toggleMenu}>
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={sectionHref(item.id!)}
                        className={cls}
                        onClick={toggleMenu}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="p-6 border-t bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800">
              <div className="text-center">
                <div className="text-xs font-light tracking-widest text-gray-400">
                  © {new Date().getFullYear()} Luis Javier Lozoya
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
