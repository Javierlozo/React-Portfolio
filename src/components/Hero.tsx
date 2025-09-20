"use client";
import React from "react";
import Image from "next/image";
import photo from "@/src/public/pictures/Photo-127.jpg";
import { useTheme } from "../contexts/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  
  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center relative ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
      id="hero"
    >
      {/* Minimalist Content Container */}
      <div className="text-center px-6 max-w-5xl mx-auto pt-24 sm:pt-20 md:pt-16 lg:pt-16">
        {/* Name - Clean, bold typography */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Luis Lozoya
        </h1>

        {/* Profile Image - Centered */}
        <div className="mb-28 w-40 h-40 sm:w-48 sm:h-48 mx-auto">
          <Image
            src={photo}
            alt="Portrait of Luis Lozoya"
            className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            width={192}
            height={192}
            priority
          />
        </div>

        {/* Title - Subtle, refined */}
        <h2 className={`text-lg sm:text-xl md:text-2xl font-normal mb-16 tracking-wide ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Full Stack Engineer, AI Specialist & Security Expert
        </h2>

        {/* Skills - Minimalist tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl mx-auto">
          {['AI & Prompting', 'React', 'TypeScript', 'Python', 'AWS', 'Security'].map((skill) => (
            <span
              key={skill}
              className={`px-4 py-2 text-sm font-medium rounded-full border ${
                theme === 'dark' 
                  ? 'text-gray-300 border-gray-700 bg-gray-900/50' 
                  : 'text-gray-600 border-gray-200 bg-gray-50'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA Button - Minimalist design */}
        <button
          onClick={scrollToPortfolio}
          className={`px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 border-2 ${
            theme === 'dark' 
              ? 'border-white text-white hover:bg-white hover:text-black' 
              : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
          }`}
        >
          View Work
        </button>
      </div>

    </section>
  );
}
