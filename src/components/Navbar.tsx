"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hamburgerImageError, setHamburgerImageError] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

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
    const sections = ["about", "skills", "experience", "certifications", "security-labs", "portfolio", "testimonials", "contact"];
    
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
            alt="Luis Lozoya Portfolio Logo"
            width={32}
            height={32}
            priority
            className={`rounded-full border-2 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}
          />
        </Link>

        {/* Desktop Menu - compact (hidden on mobile/tablet, show at xl) */}
        <div className="hidden xl:flex justify-center items-center flex-grow gap-2 sm:gap-3 xl:gap-4 min-w-0">
          {[
            "About",
            "Skills",
            "Experience",
            "Certifications",
            "Security Labs",
            "Portfolio",
            "Testimonials",
            "Contact",
          ].map((item) => {
            const sectionId = item.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeSection === sectionId;
            const isLabs = item === "Security Labs";
            const labsClass = isLabs
              ? theme === "dark"
                ? "text-amber-400 hover:text-amber-300"
                : "text-amber-600 hover:text-amber-700"
              : "";
            const defaultClass = isActive
              ? theme === "dark"
                ? "text-white"
                : "text-gray-900"
              : theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-900";
            return (
              <a
                key={item}
                href={`#${sectionId}`}
                className={`relative px-1.5 py-1 text-xs font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${
                  isLabs ? labsClass : defaultClass
                }`}
              >
                {item}
                {isActive && (
                  <div className={`absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-5 h-px ${
                    isLabs ? "bg-amber-500" : theme === "dark" ? "bg-white" : "bg-gray-900"
                  }`}></div>
                )}
              </a>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 border shrink-0 transition-all duration-300 hover:scale-105 ${
            theme === 'dark' 
              ? 'border-gray-700 text-gray-400 hover:border-white hover:text-white' 
              : 'border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900'
          }`}
          aria-label="Toggle theme"
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
                    aria-label="Toggle theme"
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
              {[
                "About",
                "Skills",
                "Experience",
                "Certifications",
                "Security Labs",
                "Portfolio",
                "Testimonials",
                "Contact",
              ].map((item, index) => {
                const sectionId = item.toLowerCase().replace(/\s+/g, "-");
                const isActive = activeSection === sectionId;
                const isLabs = item === "Security Labs";
                const labsMobileClass = isLabs
                  ? theme === "dark"
                    ? isActive
                      ? "text-amber-400 bg-amber-500/20"
                      : "text-amber-400/90 active:bg-amber-500/10"
                    : isActive
                      ? "text-amber-700 bg-amber-100"
                      : "text-amber-600 active:bg-amber-50"
                  : "";
                const defaultMobileClass = isActive
                  ? theme === "dark"
                    ? "text-white bg-gray-800"
                    : "text-gray-900 bg-gray-100"
                  : theme === "dark"
                    ? "text-gray-300 active:bg-gray-800"
                    : "text-gray-700 active:bg-gray-100";
                return (
                  <a
                    key={item}
                    href={`#${sectionId}`}
                    className={`block transition-all duration-200 py-3 px-3 text-sm font-medium rounded-lg mb-0.5 active:scale-95 active:opacity-80 ${
                      isLabs ? labsMobileClass : defaultMobileClass
                    }`}
                    onClick={toggleMenu}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {item}
                  </a>
                );
              })}
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
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>© 2025 Luis Lozoya</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
