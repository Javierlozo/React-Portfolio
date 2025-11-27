"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function ScrollProgress() {
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div
        className={`h-full transition-all duration-150 ease-out ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500' 
            : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'
        }`}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

