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
        <div className="text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl font-light tracking-tight mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            About Me
          </h2>
          <div className={`w-16 h-px mx-auto ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            I&apos;m a{" "}
            <span className={`font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Full Stack Engineer, AI Specialist & Security Expert
            </span>{" "}
            with extensive experience building secure, scalable applications. I combine modern 
            development practices with AI integration and cybersecurity expertise to create 
            robust solutions that protect against evolving threats.
          </p>
          
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            My passion lies in leveraging AI and modern technologies to build intelligent, 
            secure applications. I&apos;m dedicated to staying at the forefront of AI development 
            while implementing comprehensive security measures that protect against both 
            traditional and emerging cyber threats.
          </p>
          
          {/* Achievement Highlight */}
          <div className={`mt-12 p-6 border-l-4 ${
            theme === 'dark' 
              ? 'border-gray-600 bg-gray-900/50' 
              : 'border-gray-300 bg-gray-50'
          }`}>
            <h4 className={`text-base font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Achievement
            </h4>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Accepted into Fall 2025 SANS Cyber Academy
              </span>{" "}
              — Training with industry experts to enhance my security knowledge and earn GIAC certifications 
              in incident response, threat detection, and cyber defense.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
