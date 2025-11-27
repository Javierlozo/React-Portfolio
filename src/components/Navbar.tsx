"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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

  // Track active section using Intersection Observer
  useEffect(() => {
    const sections = ["about", "skills", "experience", "certifications", "portfolio", "testimonials", "contact"];
    
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
      className={`py-4 sm:py-6 px-4 sm:px-6 fixed w-full z-[100] top-0 left-0 right-0 transition-all duration-300 ${
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
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        {/* Logo */}
        <div 
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={scrollToTop}
        >
          <Image
            src="/favicon.png"
            alt="Luis Lozoya Portfolio Logo"
            width={36}
            height={36}
            priority
            className={`rounded-full border-2 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-center items-center flex-grow gap-8 xl:gap-12">
          {[
            "About",
            "Skills",
            "Experience",
            "Certifications",
            "Portfolio",
            "Testimonials",
            "Contact",
          ].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative px-2 py-2 text-sm font-light tracking-widest uppercase transition-all duration-300 ${
                  isActive 
                    ? theme === 'dark'
                      ? "text-white" 
                      : "text-gray-900"
                    : theme === 'dark'
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item}
                {isActive && (
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px ${
                    theme === 'dark' ? 'bg-white' : 'bg-gray-900'
                  }`}></div>
                )}
              </a>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-10 h-10 border transition-all duration-300 hover:scale-105 ${
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

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none"
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
          className={`fixed inset-0 z-[9999] lg:hidden ${
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
            className={`absolute right-0 top-0 h-full w-full max-w-sm border-l transform transition-all duration-300 ease-out shadow-2xl z-10 ${
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
                "Portfolio",
                "Testimonials",
                "Contact",
              ].map((item, index) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`block transition-all duration-200 py-4 px-4 text-base font-medium rounded-xl mb-1 active:scale-95 active:opacity-80 ${
                      isActive 
                        ? theme === 'dark'
                          ? "text-white bg-gray-800" 
                          : "text-gray-900 bg-gray-100"
                        : theme === 'dark'
                          ? "text-gray-300 active:bg-gray-800"
                          : "text-gray-700 active:bg-gray-100"
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
