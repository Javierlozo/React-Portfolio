"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  
  return (
    <section
      id="about"
      className={`py-24 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-24">
          <h2 className={`text-3xl md:text-4xl font-thin mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            About
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-12 max-w-3xl mx-auto">
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Through my consulting brand IberiaTech Solutions, I{" "}
            <span className={`font-light ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              deliver prototypes and proof-of-concepts
            </span>{" "}
            that demonstrate modern web and AI capabilities for small businesses in the US and Spain.
          </p>
          
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            My expertise spans{" "}
            <span className={`font-light ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              full-stack development, AI integration, and cloud architecture
            </span>{" "}
            — building solutions that deliver measurable business results.
          </p>
          
          {/* Achievement Highlight */}
          <div className={`mt-16 p-8 border-l ${
            theme === 'dark' 
              ? 'border-gray-700 bg-transparent' 
              : 'border-gray-200 bg-transparent'
          }`}>
            <h4 className={`text-sm font-light mb-3 tracking-widest uppercase ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Recent Achievement
            </h4>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <span className={`font-light ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Accepted into Fall 2025 SANS Cyber Academy
              </span>{" "}
              — Training with industry experts to enhance security knowledge and earn GIAC certifications 
              in incident response, threat detection, and cyber defense.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
