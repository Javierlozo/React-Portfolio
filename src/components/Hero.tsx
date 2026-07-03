"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import photo from "@/src/assets/pictures/Photo-127.jpg";
import BorderDrawButton from "./BorderDrawButton";
import SecurityTerminal from "./SecurityTerminal";

export default function Hero() {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Scroll-linked parallax: hero fades as user scrolls down
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const denom = window.innerHeight * 0.6;
          setScrollFraction(denom > 0 ? Math.min(window.scrollY / denom, 1) : 0);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Apple-style: content fades and shifts up as user scrolls past
  const heroOpacity = 1 - scrollFraction;
  const heroTranslateY = scrollFraction * -40;

  const visible = mounted || prefersReducedMotion;
  const dur = prefersReducedMotion ? 'duration-0' : 'duration-700';
  const delay = (ms: number) => prefersReducedMotion ? '0ms' : `${ms}ms`;

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative bg-transparent"
      id="hero"
    >
      <div
        className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto pt-20 sm:pt-24 md:pt-20 lg:pt-16 pb-12 sm:pb-0"
        style={{
          opacity: Math.max(0, heroOpacity),
          transform: `translateY(${heroTranslateY}px)`,
          willChange: "transform, opacity",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="text-left space-y-6 sm:space-y-8 order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin tracking-tight text-gray-900 dark:text-white">
              <span
                className={`inline-block transition-all ease-out ${dur} ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 sm:-translate-x-8'
                }`}
                style={{ transitionDelay: delay(0) }}
              >
                Luis
              </span>
              <span className="inline-block mx-2 sm:mx-3"> </span>
              <span
                className={`inline-block transition-opacity ease-out ${dur} ${
                  visible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: delay(100) }}
              >
                Javier
              </span>
              <span className="inline-block mx-2 sm:mx-3"> </span>
              <span
                className={`inline-block transition-all ease-out ${dur} ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 sm:translate-x-8'
                }`}
                style={{ transitionDelay: delay(200) }}
              >
                Lozoya
              </span>
            </h1>

            <h2
              className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide transition-all ease-out ${dur} text-gray-600 dark:text-gray-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:translate-y-4'
              }`}
              style={{ transitionDelay: delay(350) }}
            >
              Application Security Engineer
            </h2>

            <div
              className={`max-w-lg transition-all ease-out ${dur} ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:translate-y-4'
              }`}
              style={{ transitionDelay: delay(600) }}
            >
              <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-gray-600 dark:text-gray-300">
                Five years shipping React and Next.js on AWS. Now I secure the systems I used to build. I ship{" "}
                <span className="font-normal text-gray-900 dark:text-white">llm-audit</span>, an OWASP LLM Top 10 scanner on npm.
                <span className="block mt-2 text-gray-500 dark:text-gray-400">
                  From commercial construction in Spain to application security in Charleston, SC.
                </span>
              </p>
            </div>

            <p
              className={`text-xs sm:text-sm font-light tracking-wide transition-opacity ${dur} text-gray-500 dark:text-gray-400 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: delay(850) }}
            >
              GIAC GSEC + GFACT {" · "} GCIH in progress {" · "} US Work Authorized
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={scrollToPortfolio}
                className="px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-light tracking-widest uppercase transition-colors duration-300 bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                View Security Work
              </button>
              <BorderDrawButton as="a" href="/resume/Resume.pdf" download="Luis Javier Lozoya - Resume.pdf">
                Resume
              </BorderDrawButton>
              <BorderDrawButton onClick={scrollToContact}>
                Contact
              </BorderDrawButton>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 sm:gap-8 order-2">
            <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64">
              <Image
                src={photo}
                alt="Luis Javier Lozoya, Application Security Engineer"
                className="rounded-full object-cover border border-gray-200 dark:border-gray-700"
                width={256}
                height={256}
                priority
              />
            </div>
            <SecurityTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
