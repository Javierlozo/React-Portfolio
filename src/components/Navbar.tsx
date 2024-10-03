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
  const [showResume, setShowResume] = useState<boolean>(false); // State to toggle embedded resume

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
      <nav className="p-5 bg-white dark:bg-gray-900 fixed w-full z-10 top-0 left-0 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-teal-600">LL Portfolio</div>

          {/* Centered Desktop Menu */}
          <div className="hidden md:flex justify-center items-center flex-grow">
            <a
              href="#skills"
              className="ml-6 text-gray-800 dark:text-white hover:underline"
            >
              Skills
            </a>
            <a
              href="#portfolio"
              className="ml-6 text-gray-800 dark:text-white hover:underline"
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

          {/* Resume and Dark Mode Toggle */}
          <div className="hidden md:flex items-center">
            <Link href="/resume">
              <button className="ml-8 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md hover:opacity-80">
                Resume
              </button>
            </Link>
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
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900">
            <a
              href="#skills"
              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Skills
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
            <button
              className="w-full text-left px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:bg-teal-600"
              onClick={() => setShowResume(!showResume)}
            >
              {showResume ? "Hide Resume" : "Resume"}
            </button>
          </div>
        )}
      </nav>

      {/* Resume Embed */}
      {showResume && (
        <div className="mt-24 p-5">
          <h3 className="text-2xl font-bold mb-4 text-center text-teal-600">
            My Resume
          </h3>
          <div className="flex justify-center">
            <embed
              src="/Resume.pdf" // Path to your resume file
              type="application/pdf"
              width="100%"
              height="600px"
              className="shadow-lg border border-gray-300"
            />
          </div>
        </div>
      )}
    </>
  );
}
