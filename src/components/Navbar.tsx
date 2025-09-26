"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
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
    <nav className={`py-6 px-6 fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-black/90 backdrop-blur-sm border-b border-gray-800' 
        : 'bg-white/90 backdrop-blur-sm border-b border-gray-200'
    }`}>
      <div className="container mx-auto flex justify-between items-center max-w-6xl">
        {/* Logo */}
        <div 
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={scrollToTop}
        >
          <Image
            src="/favicon.png"
            alt="Portfolio Logo"
            width={36}
            height={36}
            className={`rounded-full border-2 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center flex-grow gap-12">
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
          className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105 ${
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

        {/* Minimal Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`md:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105 ${
            theme === 'dark' 
              ? 'border-gray-700 text-gray-400 hover:border-white hover:text-white' 
              : 'border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900'
          }`}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col space-y-1">
            <div className={`w-4 h-0.5 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''} ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-800'
            }`}></div>
            <div className={`w-4 h-0.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''} ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-800'
            }`}></div>
            <div className={`w-4 h-0.5 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''} ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-800'
            }`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`fixed inset-0 z-50 md:hidden ${
          theme === 'dark' ? 'bg-black/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'
        }`}>
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={toggleMenu}
          />
          
          {/* Menu Panel */}
          <div 
            className={`absolute right-0 top-0 w-full border-b transform transition-all duration-300 ease-out ${
              theme === 'dark' 
                ? 'bg-black/95 border-gray-800' 
                : 'bg-white/95 border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
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
            
            {/* Menu Items */}
            <div className="p-6 space-y-1">
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
                    className={`block transition-all duration-300 py-4 px-4 text-sm font-light tracking-widest uppercase ${
                      isActive 
                        ? theme === 'dark'
                          ? "text-white border-l-2 border-white" 
                          : "text-gray-900 border-l-2 border-gray-900"
                        : theme === 'dark'
                          ? "text-gray-400 hover:text-white hover:border-l-2 hover:border-gray-400"
                          : "text-gray-500 hover:text-gray-900 hover:border-l-2 hover:border-gray-600"
                    }`}
                    onClick={toggleMenu}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800">
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
