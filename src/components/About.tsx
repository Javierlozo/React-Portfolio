"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  
  return (
    <section
      id="about"
      className={`py-16 sm:py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            About
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-8 sm:space-y-12 max-w-3xl mx-auto">
          <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Through my consulting brand IberiaTech Solutions, I{" "}
            <span className={`font-light ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              build bilingual websites, AI-powered features, and modern cloud applications
            </span>{" "}
            for small businesses in the US and Spain. These projects include full production websites as well as prototypes that help clients validate new ideas quickly.
          </p>
          
          <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            I also contract with{" "}
            <span className={`font-light ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Global Digital Needs Agency (GDNA)
            </span>
            , where I contribute to AWS-powered platforms and large-scale web applications — including AfricaNXT, a mentorship platform currently serving ~1,200 users.
          </p>
          
          <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            My expertise spans{" "}
            <span className={`font-light ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              full-stack development, AI integration, and cloud architecture
            </span>{" "}
            — delivering solutions that are not only technically strong but also drive measurable business results.
          </p>
          
          {/* Achievement Highlight */}
          <div className={`mt-12 sm:mt-16 p-6 sm:p-8 border-l ${
            theme === 'dark' 
              ? 'border-gray-700 bg-transparent' 
              : 'border-gray-200 bg-transparent'
          }`}>
            <h4 className={`text-xs sm:text-sm font-light mb-2 sm:mb-3 tracking-widest uppercase ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Recent Achievement
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${
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
