"use client";
import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center">
          {/* Minimalist Header */}
          <div className="mb-12">
            <h4 className={`text-xl font-light tracking-wide mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Let&apos;s Connect
            </h4>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-8">
              <a
                href="https://www.linkedin.com/in/luisjlozoya/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 border-2 rounded-full transition-all duration-300 hover:scale-110 ${
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
                className={`p-3 border-2 rounded-full transition-all duration-300 hover:scale-110 ${
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
