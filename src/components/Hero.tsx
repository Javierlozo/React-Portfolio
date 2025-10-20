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
      <div className="px-3 sm:px-6 max-w-6xl mx-auto pt-20 sm:pt-20 md:pt-16 lg:pt-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left space-y-6 sm:space-y-8 order-1">
            {/* Name - Clean, bold typography */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Luis Lozoya
            </h1>

            {/* Title - Subtle, refined */}
            <h2 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Full Stack Developer & AI Specialist
            </h2>

            {/* Personal Value Proposition */}
            <div className={`max-w-lg space-y-3`}>
              <p className={`text-sm sm:text-base md:text-lg font-light leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Passionate about building{" "}
                <span className={`font-normal ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  modern, secure, and AI-driven web experiences
                </span>
                .
              </p>
              <p className={`text-sm sm:text-base md:text-lg font-light leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I create{" "}
                <span className={`font-normal ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  scalable bilingual websites and cloud solutions
                </span>{" "}
                that empower teams and reach global audiences.
              </p>
            </div>

            {/* Skills - Minimalist tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {['React', 'TypeScript', 'Python', 'AWS', 'AI Integration', 'Cloud Architecture'].map((skill) => (
                <span
                  key={skill}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-light rounded-full border ${
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
              className={`px-8 sm:px-12 py-2.5 sm:py-3 text-xs sm:text-sm font-light tracking-widest uppercase transition-all duration-300 border w-fit ${
                theme === 'dark' 
                  ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                  : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              View Work
            </button>
          </div>

          {/* Right Side - Profile Image */}
          <div className="flex justify-center lg:justify-end order-2">
            <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64">
              <Image
                src={photo}
                alt="Luis Lozoya - Full Stack Developer & AI Specialist"
                className="rounded-full object-cover border border-gray-200 dark:border-gray-700"
                width={256}
                height={256}
                priority
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
