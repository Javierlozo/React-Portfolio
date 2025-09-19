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
    const sections = ["about", "skills", "experience", "portfolio", "testimonials", "contact"];
    
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
    <nav className="p-3 sm:p-4 glass-morphism fixed w-full z-50 top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={scrollToTop}
        >
          <Image
            src="/favicon.png"
            alt="Portfolio Logo"
            width={32}
            height={32}
            className="rounded-full border-2 border-white/10 sm:w-10 sm:h-10"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center flex-grow gap-8">
          {[
            "About",
            "Skills",
            "Experience",
            "Portfolio",
            "Testimonials",
            "Contact",
          ].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative px-4 py-2 text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                  isActive 
                    ? theme === 'dark'
                      ? "text-white bg-gray-800 rounded-lg" 
                      : "text-gray-900 bg-gray-200 rounded-lg"
                    : theme === 'dark'
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 rounded-lg"
                }`}
              >
                {item}
                {isActive && (
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    theme === 'dark' ? 'bg-white' : 'bg-gray-800'
                  }`}></div>
                )}
              </a>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <FiSun className="w-5 h-5 text-white" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Minimal Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col space-y-1">
            <div className={`w-5 h-0.5 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''} ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-800'
            }`}></div>
            <div className={`w-5 h-0.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''} ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-800'
            }`}></div>
            <div className={`w-5 h-0.5 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''} ${
              theme === 'dark' ? 'bg-white' : 'bg-gray-800'
            }`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`fixed inset-0 z-50 md:hidden ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              theme === 'dark' ? 'bg-black' : 'bg-white'
            }`}
            onClick={toggleMenu}
          />
          
          {/* Menu Panel */}
          <div 
            className={`absolute right-0 top-0 w-full border shadow-lg transform transition-all duration-300 ease-out ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            {/* Header */}
            <div 
              className={`p-4 border-b ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-black' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Menu</span>
                <div className="flex items-center gap-3">
                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <FiSun className="w-4 h-4 text-white" />
                    ) : (
                      <FiMoon className="w-4 h-4 text-gray-800" />
                    )}
                  </button>
                  <button
                    onClick={toggleMenu}
                    className={`w-6 h-6 flex items-center justify-center transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div 
              className={`p-4 space-y-1 ${
                theme === 'dark' ? 'bg-black' : 'bg-white'
              }`}
            >
              {[
                "About",
                "Skills",
                "Experience",
                "Portfolio",
                "Testimonials",
                "Contact",
              ].map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`block transition-colors duration-200 py-3 px-4 rounded-lg ${
                      isActive 
                        ? theme === 'dark'
                          ? "text-cyan-400 bg-gray-800 border-l-4 border-cyan-400" 
                          : "text-blue-600 bg-gray-100 border-l-4 border-blue-600"
                        : theme === 'dark'
                          ? "text-white hover:text-cyan-400 hover:bg-gray-800"
                          : "text-gray-800 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                    onClick={toggleMenu}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
            
            {/* Footer */}
            <div 
              className={`p-4 border-t ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-black' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-center">
                <div className={`text-xs ${
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
