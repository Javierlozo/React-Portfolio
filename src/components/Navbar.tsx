"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

type NavLink = { label: string; id: string };

const TOP_LINKS: NavLink[] = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
];
const LABS_LINK: NavLink = { label: "Labs", id: "security-labs" };
const PORTFOLIO_LINK: NavLink = { label: "Portfolio", id: "portfolio" };
const CREDENTIALS_LINK: NavLink = { label: "Credentials", id: "certifications" };
const CTA_LINK: NavLink = { label: "Fit Check", id: "fit-check" };
const CONTACT_LINK: NavLink = { label: "Contact", id: "contact" };

const ALL_LINKS: NavLink[] = [
  ...TOP_LINKS,
  LABS_LINK,
  PORTFOLIO_LINK,
  CREDENTIALS_LINK,
  CTA_LINK,
  CONTACT_LINK,
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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (isOpen) setIsOpen(false);
  };

  useEffect(() => {
    const sections = ["about", "experience", "security-labs", "certifications", "portfolio", "fit-check", "contact"];
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

  return (
    <nav
      id="main-navbar"
      className="py-2 sm:py-3 px-3 sm:px-4 fixed w-full z-[100] top-0 left-0 right-0 transition-colors duration-300 bg-white/90 backdrop-blur-sm border-b border-gray-200 dark:bg-black/90 dark:border-gray-800"
    >
      <div className="container mx-auto flex justify-between items-center max-w-7xl gap-2">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="cursor-pointer hover:scale-105 transition-transform duration-300 shrink-0 block"
        >
          <Image
            src="/favicon.png"
            alt="Luis Javier Lozoya Portfolio Logo"
            width={32}
            height={32}
            priority
            className="rounded-full border-2 border-gray-200 dark:border-gray-700"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex justify-center items-center flex-grow gap-1 min-w-0">
          {TOP_LINKS.map((link) => (
            <SectionLink key={link.id} link={link} />
          ))}

          {/* Labs — amber accent */}
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

          <SectionLink link={PORTFOLIO_LINK} />
          <SectionLink link={CREDENTIALS_LINK} />

          {/* Blog — separate page */}
          <Link
            href="/blog"
            className={`${linkBase} ${
              pathname.startsWith("/blog") ? linkActive : linkInactive
            }`}
          >
            Blog
            {pathname.startsWith("/blog") && <div className={underline} />}
          </Link>

          {/* Fit Check — pill CTA */}
          <a
            href={sectionHref(CTA_LINK.id)}
            className={`relative px-3 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap rounded-full border transition-colors duration-300 ${
              activeSection === CTA_LINK.id
                ? "border-blue-600 text-blue-600 bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:bg-blue-500/10"
                : "border-gray-300 text-gray-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400 dark:hover:bg-blue-500/10"
            }`}
          >
            {CTA_LINK.label}
          </a>

          <SectionLink link={CONTACT_LINK} />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 border shrink-0 transition-colors duration-300 hover:scale-105 border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
        </button>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="xl:hidden w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FiX className="w-7 h-7 transition-colors duration-300 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
          ) : hamburgerImageError ? (
            <FiMenu className="w-7 h-7 transition-colors duration-300 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
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
        <div className="fixed inset-0 z-[9999] xl:hidden bg-white/90 backdrop-blur-lg dark:bg-black/90">
          <div className="absolute inset-0 animate-fadeIn z-0" onClick={toggleMenu} />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md md:max-w-lg border-l shadow-2xl z-10 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800"
            style={{ animation: "slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-lg font-light tracking-wide text-gray-900 dark:text-white">
                  Menu
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 hover:scale-110 border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                    aria-pressed={theme === "dark"}
                  >
                    {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleMenu}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 hover:scale-110 border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                    aria-label="Close menu"
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="p-4 overflow-y-auto bg-white dark:bg-gray-900"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {ALL_LINKS.map((link, index) => {
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
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="my-2 mx-3 border-t border-gray-200 dark:border-gray-800" />
              <Link
                href="/blog"
                className={`block transition-all duration-200 py-3 px-3 text-sm font-medium rounded-lg mb-0.5 active:scale-95 active:opacity-80 ${
                  pathname.startsWith("/blog")
                    ? "text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800"
                    : "text-gray-700 active:bg-gray-100 dark:text-gray-300 dark:active:bg-gray-800"
                }`}
                onClick={toggleMenu}
              >
                Blog
              </Link>
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
