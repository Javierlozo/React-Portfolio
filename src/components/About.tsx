"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set([0, 1, 2, 3])); // Start with all visible
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
      className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-[#0B1220]' : 'bg-[#FAFAF9]'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            About
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Background and approach
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12 max-w-3xl mx-auto">
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
            I&apos;m a software engineer with a strong focus on frontend development, cloud technologies, and cybersecurity. I recently earned the{" "}
            <span className={`font-normal ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              GIAC Foundational Cybersecurity Technologies (GFACT) certification
            </span>{" "}
            through the SANS Institute, validating my knowledge across networking, operating systems, cloud platforms, web technologies, and core security principles.
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
            I bring together real-world software engineering experience and formal security training to design and build applications that are{" "}
            <span className={`font-normal ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              secure by design, scalable, and production-ready
            </span>.
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
            In addition to traditional web development, I work with{" "}
            <span className={`font-normal ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              AI-enabled features, including LLM integrations and automation workflows
            </span>
            , always with a security-aware mindset around data handling, access control, and responsible AI usage.
          </p>
          
          <p 
            ref={(el) => { elementRefs.current[3] = el; }}
            data-index="3"
            className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ${
              visibleElements.has(3)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 sm:translate-y-6'
            }`}
            style={{ transitionDelay: prefersReducedMotion || !visibleElements.has(3) ? '0ms' : '300ms' }}
          >
            I&apos;m continuously expanding my skills at the intersection of{" "}
            <span className={`font-normal ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              software engineering, cloud security, and applied AI
            </span>.
          </p>
          
        </div>
      </div>
    </section>
  );
}
