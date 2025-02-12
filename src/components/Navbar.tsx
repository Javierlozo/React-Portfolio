"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 bg-black/80 backdrop-blur-md fixed w-full z-50 top-0 left-0 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
          Welcome to my Portfolio
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
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-400 hover:to-blue-400 transition-all duration-200 text-sm uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full glass-morphism hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="text-violet-400" size={24} />
          ) : (
            <FiMenu className="text-violet-400" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-gray-900 animate-slide-in">
            <div className="flex flex-col p-6 space-y-4">
              {[
                "About",
                "Skills",
                "Experience",
                "Portfolio",
                "Testimonials",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-400 hover:to-blue-400 transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
