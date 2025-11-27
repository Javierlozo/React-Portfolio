"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const { theme } = useTheme();
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
      className={`py-16 sm:py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            About
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-8 sm:space-y-12 max-w-3xl mx-auto">
          <p 
            ref={(el) => { elementRefs.current[0] = el; }}
            data-index="0"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ${
              visibleElements.has(0)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
          >
            I&apos;m a full-stack software engineer based in Charleston, SC, with a passion for building intelligent, secure, and scalable web applications.
          </p>
          
          <p 
            ref={(el) => { elementRefs.current[1] = el; }}
            data-index="1"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ${
              visibleElements.has(1)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(1) ? '0ms' : '100ms' }}
          >
            Through my company, IberiaTech Solutions, I help small businesses in the US and Spain expand their digital presence with AI-powered and bilingual websites.
          </p>
          
          <p 
            ref={(el) => { elementRefs.current[2] = el; }}
            data-index="2"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ${
              visibleElements.has(2)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(2) ? '0ms' : '200ms' }}
          >
            I also contract with Global Digital Needs Agency (GDNA), contributing to AWS-powered platforms such as AfricaNXT, a mentorship platform serving over 1,200 users.
          </p>
          
          {/* Achievement Highlight */}
          <div 
            ref={(el) => { elementRefs.current[3] = el; }}
            data-index="3"
            className={`mt-12 sm:mt-16 p-6 sm:p-8 border-l transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${
              theme === 'dark' 
                ? 'border-gray-700 bg-transparent' 
                : 'border-gray-200 bg-transparent'
            } ${
              visibleElements.has(3)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-3 sm:-translate-x-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(3) ? '0ms' : '300ms' }}
          >
            <h4 className={`text-xs sm:text-sm font-light mb-2 sm:mb-3 tracking-widest uppercase ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Recent Achievement
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <span className={`font-light ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Accepted into Fall 2025 SANS Cyber Academy
              </span>{" "}
              — Training with industry experts to enhance security knowledge and earn GIAC certifications 
              in incident response, threat detection, and cyber defense.
            </p>
          </div>

          {/* Personal Touch */}
          <div 
            ref={(el) => { elementRefs.current[4] = el; }}
            data-index="4"
            className={`mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-gray-50/50 border border-gray-200'
            } ${
              visibleElements.has(4)
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 sm:translate-y-6 scale-98 sm:scale-95'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(4) ? '0ms' : '400ms' }}
          >
            <p className={`text-sm sm:text-base leading-relaxed text-center ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Outside of code, I love exploring{" "}
              <span className={`font-light ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                AI, cybersecurity, and mentoring other developers
              </span>
              .{" "}
              <span className={`font-light ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Winner of HackOps 2024
              </span>{" "}
              and passionate about bridging tech between the US and Spain.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
