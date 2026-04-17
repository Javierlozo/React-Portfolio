"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import BorderDrawButton from "./BorderDrawButton";

const socialLink =
  "p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 rounded-full transition-colors duration-300 hover:scale-110 border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-white dark:hover:text-white";

export default function Footer() {
  return (
    <footer className="py-12 sm:py-14 md:py-16 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        <div className="text-center">
          <div className="mb-10 sm:mb-12">
            <h4 className="text-xl font-light tracking-wide mb-6 text-gray-900 dark:text-white">
              Let&apos;s Connect
            </h4>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-gray-600 dark:text-gray-300">
              <BorderDrawButton as="a" href="/resume/Resume.pdf" download="Luis Lozoya - Resume.pdf">
                Download Resume
              </BorderDrawButton>
              <BorderDrawButton as="a" href="https://github.com/Javierlozo" target="_blank" rel="noopener noreferrer">
                View Code on GitHub
              </BorderDrawButton>
              <BorderDrawButton as="a" href="/#security-labs">
                See Security Labs
              </BorderDrawButton>
            </div>

            <div className="flex justify-center gap-6 sm:gap-8">
              <a
                href="https://www.linkedin.com/in/luisjlozoya/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Luis on LinkedIn"
                className={socialLink}
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
              </a>
              <a
                href="https://github.com/Javierlozo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Luis on GitHub"
                className={socialLink}
              >
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
              </a>
            </div>
          </div>

          <div className="w-24 h-px mx-auto mb-8 bg-gray-300 dark:bg-gray-700"></div>

          <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Luis Javier Lozoya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
