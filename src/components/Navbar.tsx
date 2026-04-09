"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hamburgerImageError, setHamburgerImageError] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pathname = usePathname();
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
    if (isOpen) toggleMenu();
  };

  // Track active section using Intersection Observer
  useEffect(() => {
    const sections = ["about", "experience", "security-labs", "certifications", "portfolio", "fit-check", "testimonials", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is 20% from top
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle hero section (when at top)
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const TOP_LINKS = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
  ];

  const LABS_LINK = { label: "Labs", id: "security-labs" };

  const PORTFOLIO_LINK = { label: "Portfolio", id: "portfolio" };

  const DROPDOWNS = [
    {
      label: "Credentials",
      items: [
        { label: "Credentials", id: "certifications" },
        { label: "Testimonials", id: "testimonials" },
      ],
    },
  ];

  const CTA_LINK = { label: "Fit Check", id: "fit-check" };
  const CONTACT_LINK = { label: "Contact", id: "contact" };

  const ALL_LINKS = [
    ...TOP_LINKS,
    LABS_LINK,
    PORTFOLIO_LINK,
    ...DROPDOWNS.flatMap((d) => d.items),
    CTA_LINK,
    CONTACT_LINK,
  ];

  return (
    <nav 
      id="main-navbar" 
      className={`py-2 sm:py-3 px-3 sm:px-4 fixed w-full z-[100] top-0 left-0 right-0 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-black/90 backdrop-blur-sm border-b border-gray-800' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-200'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 100
      }}
    >
      <div className="container mx-auto flex justify-between items-center max-w-7xl gap-2">
        {/* Logo - home link, scroll to top when already on home */}
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
            className={`rounded-full border-2 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}
          />
        </Link>

        {/* Desktop Menu */}
        <div ref={dropdownRef} className="hidden xl:flex justify-center items-center flex-grow gap-1 min-w-0">
          {TOP_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={pathname === "/" ? `#${link.id}` : `/#${link.id}`}
                className={`relative px-2 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? theme === "dark" ? "text-white" : "text-gray-900"
                    : theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <div className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px ${
                    theme === "dark" ? "bg-white" : "bg-gray-900"
                  }`} />
                )}
              </a>
            );
          })}

          {/* Labs - top-level highlighted link */}
          <a
            href={pathname === "/" ? `#${LABS_LINK.id}` : `/#${LABS_LINK.id}`}
            className={`relative px-2 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
              activeSection === LABS_LINK.id
                ? theme === "dark" ? "text-amber-400" : "text-amber-600"
                : theme === "dark" ? "text-amber-400/80 hover:text-amber-300" : "text-amber-600/80 hover:text-amber-700"
            }`}
          >
            {LABS_LINK.label}
            {activeSection === LABS_LINK.id && (
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px bg-amber-500" />
            )}
          </a>

          {/* Portfolio - top-level link */}
          <a
            href={pathname === "/" ? `#${PORTFOLIO_LINK.id}` : `/#${PORTFOLIO_LINK.id}`}
            className={`relative px-2 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
              activeSection === PORTFOLIO_LINK.id
                ? theme === "dark" ? "text-white" : "text-gray-900"
                : theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {PORTFOLIO_LINK.label}
            {activeSection === PORTFOLIO_LINK.id && (
              <div className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px ${
                theme === "dark" ? "bg-white" : "bg-gray-900"
              }`} />
            )}
          </a>

          {/* Category dropdowns */}
          {DROPDOWNS.map((dropdown) => {
            const isOpen = openDropdown === dropdown.label;
            const hasActive = dropdown.items.some((l) => activeSection === l.id);
            return (
              <div key={dropdown.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : dropdown.label)}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1 px-2 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    hasActive
                      ? theme === "dark" ? "text-white" : "text-gray-900"
                      : theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {dropdown.label}
                  <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  {hasActive && (
                    <div className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px ${
                      theme === "dark" ? "bg-white" : "bg-gray-900"
                    }`} />
                  )}
                </button>

                {isOpen && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-lg border shadow-lg overflow-hidden ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {dropdown.items.map((link) => {
                      const isActive = activeSection === link.id;
                      return (
                        <a
                          key={link.id}
                          href={pathname === "/" ? `#${link.id}` : `/#${link.id}`}
                          onClick={() => setOpenDropdown(null)}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            isActive
                              ? theme === "dark" ? "text-white bg-gray-800" : "text-gray-900 bg-gray-100"
                              : theme === "dark" ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Blog - separate page link */}
          <Link
            href="/blog"
            className={`relative px-2 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
              pathname.startsWith("/blog")
                ? theme === "dark" ? "text-white" : "text-gray-900"
                : theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Blog
            {pathname.startsWith("/blog") && (
              <div className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px ${
                theme === "dark" ? "bg-white" : "bg-gray-900"
              }`} />
            )}
          </Link>

          {/* Fit Check CTA */}
          <a
            href={pathname === "/" ? `#${CTA_LINK.id}` : `/#${CTA_LINK.id}`}
            className={`relative px-3 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap rounded-full border transition-all duration-300 ${
              activeSection === CTA_LINK.id
                ? theme === "dark"
                  ? "border-blue-400 text-blue-400 bg-blue-500/10"
                  : "border-blue-600 text-blue-600 bg-blue-50"
                : theme === "dark"
                  ? "border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/10"
                  : "border-gray-300 text-gray-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {CTA_LINK.label}
          </a>

          {/* Contact */}
          <a
            href={pathname === "/" ? `#${CONTACT_LINK.id}` : `/#${CONTACT_LINK.id}`}
            className={`relative px-2 py-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
              activeSection === CONTACT_LINK.id
                ? theme === "dark" ? "text-white" : "text-gray-900"
                : theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {CONTACT_LINK.label}
            {activeSection === CONTACT_LINK.id && (
              <div className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-px ${
                theme === "dark" ? "bg-white" : "bg-gray-900"
              }`} />
            )}
          </a>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border shrink-0 transition-all duration-300 hover:scale-105 ${
            theme === 'dark' 
              ? 'border-gray-700 text-gray-400 hover:border-white hover:text-white' 
              : 'border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900'
          }`}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'dark' ? (
            <FiSun className="w-4 h-4" />
          ) : (
            <FiMoon className="w-4 h-4" />
          )}
        </button>

        {/* Hamburger Menu Button - show on mobile and tablet */}
        <button
          onClick={toggleMenu}
          className="xl:hidden w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FiX className={`w-7 h-7 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`} />
          ) : hamburgerImageError ? (
            <FiMenu className={`w-7 h-7 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`} />
          ) : (
            <Image
              src="/hamburger.png"
              alt="Menu"
              width={32}
              height={32}
              className="transition-all duration-300"
              onError={() => setHamburgerImageError(true)}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu - App-like Slide-in */}
      {isOpen && (
        <div 
          className={`fixed inset-0 z-[9999] xl:hidden ${
            theme === 'dark' ? 'bg-black/90 backdrop-blur-lg' : 'bg-white/90 backdrop-blur-lg'
          }`}
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 animate-fadeIn z-0"
            onClick={toggleMenu}
          />
          
          {/* Menu Panel - Slide from right */}
          <div 
            className={`absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md md:max-w-lg border-l transform transition-all duration-300 ease-out shadow-2xl z-10 ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-white border-gray-200'
            }`}
            style={{
              animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: theme === 'dark' ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-6 border-b ${
              theme === 'dark' 
                ? 'border-gray-800 bg-gray-900' 
                : 'border-gray-200 bg-white'
            }`}
            style={{
              backgroundColor: theme === 'dark' ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)'
            }}>
              <div className="flex items-center justify-between">
                <span className={`text-lg font-light tracking-wide ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Menu</span>
                <div className="flex items-center gap-4">
                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      theme === 'dark'
                        ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                        : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                    }`}
                    aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                    aria-pressed={theme === 'dark'}
                  >
                    {theme === 'dark' ? (
                      <FiSun className="w-4 h-4" />
                    ) : (
                      <FiMoon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={toggleMenu}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      theme === 'dark' 
                        ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                        : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Menu Items - App-like list */}
            <div
              className={`p-4 overflow-y-auto ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}
              style={{
                maxHeight: 'calc(100vh - 200px)',
                backgroundColor: theme === 'dark' ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)'
              }}>
              {ALL_LINKS.map((link, index) => {
                const isActive = activeSection === link.id;
                const isLabs = link.id === "security-labs";
                const isFitCheck = link.id === "fit-check";
                const colorClass = isLabs
                  ? theme === "dark"
                    ? isActive ? "text-amber-400 bg-amber-500/20" : "text-amber-400/90 active:bg-amber-500/10"
                    : isActive ? "text-amber-700 bg-amber-100" : "text-amber-600 active:bg-amber-50"
                  : isFitCheck
                    ? theme === "dark"
                      ? isActive ? "text-blue-400 bg-blue-500/20" : "text-blue-400/90 active:bg-blue-500/10"
                      : isActive ? "text-blue-700 bg-blue-100" : "text-blue-600 active:bg-blue-50"
                  : isActive
                    ? theme === "dark" ? "text-white bg-gray-800" : "text-gray-900 bg-gray-100"
                    : theme === "dark" ? "text-gray-300 active:bg-gray-800" : "text-gray-700 active:bg-gray-100";

                // Insert category headers
                const isFirstCredential = link.id === "skills-assessment";
                const header = isFirstCredential ? "Credentials" : null;

                return (
                  <React.Fragment key={link.id}>
                    {header && (
                      <>
                        <div className={`my-2 mx-3 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`} />
                        <div className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}>{header}</div>
                      </>
                    )}
                    <a
                      href={pathname === "/" ? `#${link.id}` : `/#${link.id}`}
                      className={`block transition-all duration-200 py-3 px-3 text-sm font-medium rounded-lg mb-0.5 active:scale-95 active:opacity-80 ${colorClass}`}
                      onClick={toggleMenu}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.label}
                    </a>
                  </React.Fragment>
                );
              })}

              {/* Blog link */}
              <div className={`my-2 mx-3 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`} />
              <Link
                href="/blog"
                className={`block transition-all duration-200 py-3 px-3 text-sm font-medium rounded-lg mb-0.5 active:scale-95 active:opacity-80 ${
                  pathname.startsWith("/blog")
                    ? theme === "dark" ? "text-white bg-gray-800" : "text-gray-900 bg-gray-100"
                    : theme === "dark" ? "text-gray-300 active:bg-gray-800" : "text-gray-700 active:bg-gray-100"
                }`}
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </div>

            {/* Footer */}
            <div className={`p-6 border-t ${
              theme === 'dark' 
                ? 'border-gray-800 bg-gray-900' 
                : 'border-gray-200 bg-white'
            }`}
            style={{
              backgroundColor: theme === 'dark' ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)'
            }}>
              <div className="text-center">
                <div className={`text-xs font-light tracking-widest ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`}>© {new Date().getFullYear()} Luis Javier Lozoya</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
