"use client";
import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-12 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h4 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Let&apos;s Connect
            </h4>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/luisjlozoya/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FaLinkedinIn className={`text-2xl ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`} />
              </a>
              <a
                href="https://github.com/Javierlozo"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FaGithub className={`text-2xl ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`} />
              </a>
            </div>
          </div>

          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            &copy; {new Date().getFullYear()} Luis Lozoya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
