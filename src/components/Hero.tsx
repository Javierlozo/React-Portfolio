"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import photo from "@/src/public/pictures/Photo-127.jpg";
import { useTheme } from "../contexts/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const [nameVisible, setNameVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [paragraphsVisible, setParagraphsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animate elements on mount (faster on mobile, instant if reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) {
      setNameVisible(true);
      setSubtitleVisible(true);
      setParagraphsVisible(true);
      setSkillsVisible(true);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const delay1 = isMobile ? 100 : 200;
    const delay2 = isMobile ? 300 : 600;
    const delay3 = isMobile ? 500 : 1000;
    const delay4 = isMobile ? 700 : 1400;

    const timer1 = setTimeout(() => setNameVisible(true), delay1);
    const timer2 = setTimeout(() => setSubtitleVisible(true), delay2);
    const timer3 = setTimeout(() => setParagraphsVisible(true), delay3);
    const timer4 = setTimeout(() => setSkillsVisible(true), delay4);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [prefersReducedMotion]);

  // Detect if device supports hover (desktop) vs touch (mobile)
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Magnetic hover effect for profile image (desktop only)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setImagePosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setImagePosition({ x: 0, y: 0 });
  };
  
  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center relative ${
        theme === 'dark' ? 'bg-transparent' : 'bg-transparent'
      }`}
      id="hero"
    >
      {/* Minimalist Content Container */}
      <div className="px-3 sm:px-6 max-w-6xl mx-auto pt-20 sm:pt-20 md:pt-16 lg:pt-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left space-y-6 sm:space-y-8 order-1">
            {/* Name - Split text animation */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <span className={`inline-block transition-all ease-out ${
                prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
              } ${
                nameVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4 sm:-translate-x-8'
              }`}>
                Luis
              </span>
              <span className="inline-block mx-2 sm:mx-3"> </span>
              <span className={`inline-block transition-all ease-out ${
                prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
              } ${
                nameVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4 sm:translate-x-8'
              }`} style={{ transitionDelay: prefersReducedMotion ? '0ms' : '200ms' }}>
                Lozoya
              </span>
            </h1>

            {/* Headline - Fade in from bottom */}
            <h2 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} ${
              subtitleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2 sm:translate-y-4'
            }`}>
              Software Engineer | Security-Focused | AI-Enabled | GIAC GFACT Certified
            </h2>

            {/* Sub-headline */}
            <div className={`max-w-lg transition-all ease-out ${
              prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
            } ${
              paragraphsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2 sm:translate-y-4'
            }`}>
              <p className={`text-sm sm:text-base md:text-lg font-light leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Building secure, cloud-native web applications with React, Next.js, AWS, and AI-powered features.
              </p>
            </div>

            {/* Skills - Cascade animation */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {['React', 'TypeScript', 'Python', 'AWS', 'AI Integration', 'Cloud Architecture'].map((skill, index) => (
                <span
                  key={skill}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-light rounded-full border transition-all ease-out ${
                    prefersReducedMotion ? 'duration-0' : 'duration-300 sm:duration-500'
                  } ${
                    theme === 'dark' 
                      ? 'text-gray-400 border-gray-700 bg-transparent' 
                      : 'text-gray-500 border-gray-200 bg-transparent'
                  } ${
                    skillsVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-2 sm:translate-y-4 scale-95 sm:scale-90'
                  }`}
                  style={{
                    transitionDelay: prefersReducedMotion || !skillsVisible ? '0ms' : `${index * 50}ms`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Buttons - Minimalist design */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToPortfolio}
                className={`px-8 sm:px-12 py-2.5 sm:py-3 text-xs sm:text-sm font-light tracking-widest uppercase transition-all duration-300 border ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                View My Work
              </button>
              <button
                onClick={scrollToContact}
                className={`px-8 sm:px-12 py-2.5 sm:py-3 text-xs sm:text-sm font-light tracking-widest uppercase transition-all duration-300 border ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right Side - Profile Image with magnetic effect */}
          <div className="flex justify-center lg:justify-end order-2">
            <div 
              ref={imageRef}
              onMouseMove={!isTouchDevice ? handleMouseMove : undefined}
              onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
              className={`w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 transition-transform ease-out ${
                isTouchDevice ? 'duration-0' : 'duration-300'
              }`}
              style={{
                transform: isTouchDevice 
                  ? 'none' 
                  : `translate(${imagePosition.x}px, ${imagePosition.y}px)`
              }}
            >
              <Image
                src={photo}
                alt="Luis Lozoya — Software Engineer | Security-Focused | AI-Enabled"
                className="rounded-full object-cover border border-gray-200 dark:border-gray-700 transition-all duration-500"
                width={256}
                height={256}
                priority
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
