"use client";
import React from "react";
import Link from "next/link";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-12 sm:py-14 md:py-16 ${theme === 'dark' ? 'bg-[#0B1220]' : 'bg-[#FAFAF9]'}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        <div className="text-center">
          {/* Minimalist Header */}
          <div className="mb-10 sm:mb-12">
            <h4 className={`text-xl font-light tracking-wide mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Let&apos;s Connect
            </h4>

            {/* Quick CTAs for recruiters */}
            <div className={`flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <a
                href="/resume/Resume.pdf"
                download
                className={`text-sm font-light tracking-wide uppercase border px-4 py-2.5 sm:py-2 min-h-[44px] flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:border-white hover:text-white'
                    : 'border-gray-300 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                Download Resume
              </a>
              <a
                href="https://github.com/Javierlozo"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-light tracking-wide uppercase border px-4 py-2.5 sm:py-2 min-h-[44px] flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:border-white hover:text-white'
                    : 'border-gray-300 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                View Code on GitHub
              </a>
              <Link
                href="/#security-labs"
                className={`text-sm font-light tracking-wide uppercase border px-4 py-2.5 sm:py-2 min-h-[44px] flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:border-white hover:text-white'
                    : 'border-gray-300 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                See Security Labs
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 sm:gap-8">
              <a
                href="https://www.linkedin.com/in/luisjlozoya/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                href="https://github.com/Javierlozo"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className={`w-24 h-px mx-auto mb-8 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>

          {/* Copyright */}
          <p className={`text-sm tracking-wide ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © {new Date().getFullYear()} Luis Lozoya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
