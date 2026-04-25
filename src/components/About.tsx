"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faGavel, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import RevealText from "./RevealText";

export default function About() {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set([0, 1, 2, 3, 4])); // Start with all visible
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        if (entry.isIntersecting) {
          setVisibleElements((prev) => new Set(prev).add(index));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Wait a bit for refs to be set, then observe
    const timeoutId = setTimeout(() => {
      elementRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    // Check if elements are already in viewport on mount
    const checkInitialVisibility = () => {
      elementRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            setVisibleElements((prev) => new Set(prev).add(index));
          }
        }
      });
    };

    checkInitialVisibility();

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);
  
  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 bg-[#FAFAF9] dark:bg-[#0B1220]"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <RevealText
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto text-gray-900 border-gray-200 dark:text-white dark:border-gray-700"
          >
            About
          </RevealText>
          <RevealText
            as="p"
            delay={200}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          >
            Six years in construction. Now writing code and breaking it.
          </RevealText>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12 max-w-3xl mx-auto">
          <p 
            ref={(el) => { elementRefs.current[0] = el; }}
            data-index="0"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } text-gray-600 dark:text-gray-300 ${
              visibleElements.has(0)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
          >
            I&apos;m from Spain. I studied architectural engineering at{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              IE University
            </span>
            {" "}and spent almost 6 years in commercial construction (structural detailing, CAD, project management) before switching to software.
          </p>

          <p
            ref={(el) => { elementRefs.current[1] = el; }}
            data-index="1"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } text-gray-600 dark:text-gray-300 ${
              visibleElements.has(1)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(1) ? '0ms' : '50ms' }}
          >
            Now I work on the security side of web and cloud. I went through the SANS Cyber Academy scholarship and came out with the{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              GIAC GFACT and GSEC certifications
            </span>
            .
          </p>

          <p
            ref={(el) => { elementRefs.current[2] = el; }}
            data-index="2"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } text-gray-600 dark:text-gray-300 ${
              visibleElements.has(2)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(2) ? '0ms' : '200ms' }}
          >
            Most of my recent work mixes web development with LLM features. I&apos;m currently running a{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              prompt-injection lab
            </span>
            {" "}against a chatbot I built, testing how well the usual defenses hold up in practice.
          </p>
          
          <p
            ref={(el) => { elementRefs.current[3] = el; }}
            data-index="3"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } text-gray-600 dark:text-gray-300 ${
              visibleElements.has(3)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(3) ? '0ms' : '300ms' }}
          >
            Day job is at{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              GDNA
            </span>
            , building cloud-native apps on AWS. Next cert on my list is{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              GIAC GCIH
            </span>
            .
          </p>

          {/* Community */}
          <div
            ref={(el) => { elementRefs.current[4] = el; }}
            data-index="4"
            className={`flex flex-wrap gap-2 sm:gap-3 transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${
              visibleElements.has(4)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(4) ? '0ms' : '400ms' }}
          >
            {[
              { icon: faTrophy, label: "1st Place, HackOps 2024" },
              { icon: faGavel, label: "Judge, HarborHack 2024" },
              { icon: faMicrophone, label: "Speaker, HarborHack 2025" },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
              >
                <FontAwesomeIcon icon={item.icon} className="text-[10px]" />
                {item.label}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
