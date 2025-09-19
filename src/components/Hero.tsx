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
      className={`min-h-screen flex flex-col items-center justify-center relative pt-20 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
      id="hero"
    >
      {/* Content */}
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Luis Lozoya
        </h1>
        <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Full Stack Engineer & Web Security Specialist
        </h2>
        <p className={`text-lg sm:text-xl md:text-2xl mb-12 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          React • Next.js • TypeScript • AWS • Security • Penetration Testing
        </p>
        <button
          onClick={scrollToPortfolio}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          View My Work
        </button>
      </div>

      {/* Profile Image */}
      <div className="mt-16 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
        <Image
          src={photo}
          alt="Portrait of Luis Lozoya"
          className="rounded-full object-cover"
          width={256}
          height={256}
          priority
        />
      </div>
    </section>
  );
}
