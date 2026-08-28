"use client";
import React from "react";
import { containerShell } from "./ui/Section";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import BorderDrawButton from "./BorderDrawButton";

const socialLink =
  "p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 rounded-full transition-colors duration-300 hover:scale-110 border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-white dark:hover:text-white";

export default function Footer() {
  return (
    <footer className="py-12 sm:py-14 md:py-16 bg-surface">
      <div className={containerShell("prose")}>
        <div className="text-center">
          <div className="mb-10 sm:mb-12">
            <h4 className="text-xl font-light tracking-wide mb-6 text-content">
              Let&apos;s Connect
            </h4>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-content-muted">
              <BorderDrawButton as="a" href="/resume/Resume.pdf" download="Luis Javier Lozoya - Resume.pdf">
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

          <nav
            aria-label="Secondary"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-content-subtle"
          >
            <Link href="/#experience" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Experience
            </Link>
            <Link href="/#portfolio" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="/notes" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Notes
            </Link>
            <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/now" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Now
            </Link>
            {/* The site keeps its own analytics, so the page saying what is
                in them is owed rather than decorative, even now that the
                answer is "no cookies, no IP". The footer is where a reader
                looks for it. */}
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
          </nav>

          <div className="w-24 h-px mx-auto mb-8 bg-gray-300 dark:bg-gray-700"></div>

          <p className="text-sm tracking-wide text-content-muted">
            © {new Date().getFullYear()} Luis Javier Lozoya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
