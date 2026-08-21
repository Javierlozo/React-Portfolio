"use client";
import React, { useState, useEffect, useRef } from "react";
import { headerWrapClass, headingRuleClass, ledeClass } from "./ui/SectionHeading";
import Section from "./ui/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faGavel, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import RevealText from "./RevealText";

export default function About() {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5])); // Start with all visible
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
    <Section
      id="about"
      container={false}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className={headerWrapClass}>
          <RevealText
            as="h2"
            className={`${headingRuleClass} mb-6 sm:mb-8`}
          >
            About
          </RevealText>
          <RevealText
            as="p"
            delay={200}
            className={ledeClass}
          >
            Current work, then the path that got me here.
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
            These days, most of my work mixes web development with LLM features. Right now I&apos;m running a{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              prompt-injection lab
            </span>
            {" "}against a chatbot I built, testing how well the usual defenses hold up under realistic attack patterns. Findings live at /ai-playground. That work fed into{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              llm-audit
            </span>
            , an OWASP LLM Top 10 static analyzer I ship on npm for TypeScript and JavaScript codebases.
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
            By day I&apos;m at{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              GDNA
            </span>
            , building cloud-native apps on AWS. The interesting parts sit on the boundary between feature development and security: input validation, auth flows, S3 policies, secrets handling, and figuring out where things break when no one&apos;s watching.
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
            My security path started with the SANS Cyber Academy scholarship, which got me the{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              GIAC GFACT, GSEC, and GCIH certifications
            </span>
            . AWS AI Practitioner and AWS Security Specialty are scheduled for September and October 2026, PortSwigger BSCP after that. The focus from here is AI and LLM security plus cloud security engineering.
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
            Before software: I&apos;m from Spain, six years in commercial construction (structural detailing, CAD, project management). Studied architectural engineering at{" "}
            <span className="font-normal text-gray-900 dark:text-white">
              IE University
            </span>
            .
          </p>

          <p
            ref={(el) => { elementRefs.current[4] = el; }}
            data-index="4"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } text-gray-600 dark:text-gray-300 ${
              visibleElements.has(4)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(4) ? '0ms' : '350ms' }}
          >
            I take a small number of contract engagements: LLM application security reviews, OWASP LLM Top 10 assessments, and AWS auth and IAM hardening. Email{" "}
            <a
              href="mailto:luis.lozoya.tech@gmail.com"
              className="font-normal underline underline-offset-4 decoration-gray-300 hover:decoration-gray-600 text-gray-900 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-300"
            >
              luis.lozoya.tech@gmail.com
            </a>
            .
          </p>

          {/* Community */}
          <div
            ref={(el) => { elementRefs.current[5] = el; }}
            data-index="5"
            className={`flex flex-wrap gap-2 sm:gap-3 transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${
              visibleElements.has(5)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(5) ? '0ms' : '400ms' }}
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
    </Section>
  );
}
