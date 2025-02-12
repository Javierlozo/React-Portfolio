"use client";
import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 mb-4">
              Let&apos;s Connect
            </h4>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/luisjlozoya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-morphism rounded-full hover:scale-110 transition-transform duration-300"
              >
                <FaLinkedinIn className="text-2xl text-violet-400" />
              </a>
              <a
                href="https://github.com/Javierlozo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-morphism rounded-full hover:scale-110 transition-transform duration-300"
              >
                <FaGithub className="text-2xl text-violet-400" />
              </a>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Luis Lozoya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
