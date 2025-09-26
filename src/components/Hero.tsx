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
      <div className="px-6 max-w-6xl mx-auto pt-24 sm:pt-20 md:pt-16 lg:pt-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left space-y-8">
            {/* Name - Clean, bold typography */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Luis Lozoya
            </h1>

            {/* Title - Subtle, refined */}
            <h2 className={`text-lg sm:text-xl md:text-2xl font-light tracking-wide ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Full Stack Developer & AI Specialist
            </h2>

            {/* Business Value Proposition */}
            <div className={`max-w-lg`}>
              <p className={`text-base sm:text-lg font-light leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I help businesses{" "}
                <span className={`font-normal ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  modernize their digital presence
                </span>{" "}
                with scalable bilingual websites, AI integration, and secure cloud deployments.
              </p>
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              <Image
                src={photo}
                alt="Portrait of Luis Lozoya"
                className="rounded-full object-cover border border-gray-200 dark:border-gray-700"
                width={256}
                height={256}
                priority
              />
            </div>
          </div>
        </div>

        {/* Skills and CTA - Left aligned */}
        <div className="flex flex-col gap-8 mt-16">
          {/* Skills - Minimalist tags */}
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Python', 'AWS', 'AI Integration', 'Cloud Architecture'].map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1.5 text-xs font-light rounded-full border ${
                  theme === 'dark' 
                    ? 'text-gray-400 border-gray-700 bg-transparent' 
                    : 'text-gray-500 border-gray-200 bg-transparent'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA Button - Minimalist design */}
          <button
            onClick={scrollToPortfolio}
            className={`px-12 py-3 text-sm font-light tracking-widest uppercase transition-all duration-300 border w-fit ${
              theme === 'dark' 
                ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
            }`}
          >
            View Work
          </button>
        </div>
      </div>

    </section>
  );
}
