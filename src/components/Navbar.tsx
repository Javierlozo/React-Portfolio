"use client";
import React, { useState, useEffect } from "react";
import { BsFillMoonFill, BsFillBrightnessHighFill } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState<boolean>(
    typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === "true"
      : false
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Removed showResume state if you only want the download option

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="p-7 bg-white dark:bg-gray-900 fixed w-full z-10 top-0 left-0 shadow-md">
        <div className="container mx-auto flex justify-between items-center font-bold">
          {/* Logo */}
          <div className="text-xl font-bold text-teal-600">
            Welcome to my Portfolio
          </div>

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex justify-center items-center flex-grow">
            <a
              href="#about"
              className="ml-6 text-gray-800 dark:text-white hover:underline"
            >
              About
            </a>
            <a
              href="#skills"
              className="ml-6 text-gray-800 dark:text-white hover:underline"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="ml-6 text-gray-800 dark:text-white hover:underline"
            >
              Experience
            </a>
            <a
              href="#portfolio"
              className="ml-6 text-[#0D9488] dark:text-white hover:underline"
            >
              Portfolio
            </a>
            <a
              href="#testimonials"
              className="ml-6 text-gray-800 dark:text-white hover:underline"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="ml-6 text-gray-800 dark:text-white hover:underline"
            >
              Contact
            </a>
          </div>

          {/* Download Resume and Dark Mode Toggle */}
          <div className="hidden md:flex items-center">
            {/* Download Resume Link */}
            {/* <a href="/resume/Resume.pdf" download>
              <button className="ml-8 text-white px-4 py-2 rounded-md hover:opacity-80 bg-teal-700">
                Resume
              </button>
            </a> */}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="ml-4"
            >
              {darkMode ? (
                <BsFillBrightnessHighFill className="text-white" size={24} />
              ) : (
                <BsFillMoonFill size={24} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="mr-4"
            >
              {darkMode ? (
                <BsFillBrightnessHighFill className="text-gray-800" size={24} />
              ) : (
                <BsFillMoonFill className="text-gray-800" size={24} />
              )}
            </button>
            {/* Menu Toggle */}
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 font-bold">
            <a
              href="#skills"
              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Experience
            </a>
            <a
              href="#portfolio"
              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Portfolio
            </a>
            <a
              href="#testimonials"
              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Contact
            </a>
            {/* Download Resume Link */}
            {/* <a href="/resume/Resume.pdf" download>
              <button className="w-full text-left px-4 py-2 text-white hover:bg-teal-600 bg-teal-800">
                Resume
              </button>
            </a> */}
          </div>
        )}
      </nav>
    </>
  );
}
