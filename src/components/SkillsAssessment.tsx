"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { skillsAssessment } from "../data/ai-context";

const colorMap = {
  emerald: {
    dark: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-500" },
    light: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
  },
  amber: {
    dark: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", dot: "bg-amber-500" },
    light: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
  },
  rose: {
    dark: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", dot: "bg-rose-500" },
    light: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", dot: "bg-rose-500" },
  },
};

export default function SkillsAssessment() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills-assessment"
      ref={sectionRef}
      className={`py-12 sm:py-16 md:py-20 w-full ${isDark ? "bg-[#0a0f1a]" : "bg-white"}`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            Honest Assessment
          </p>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-4 pb-2 border-b w-fit mx-auto ${
              isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
            }`}
          >
            Skills Breakdown
          </h2>
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Not a wall of logos. Three columns: what I&apos;m strong at, what I can ramp
            on, and what I&apos;m still learning.
          </p>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsAssessment.map((category, idx) => {
            const colors = colorMap[category.color][isDark ? "dark" : "light"];
            return (
              <div
                key={category.label}
                className={`rounded-2xl border p-5 sm:p-6 h-full transition-all duration-500 ${
                  colors.border
                } ${colors.bg} ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                  <h3 className={`text-lg font-semibold ${colors.text}`}>
                    {category.label}
                  </h3>
                </div>
                <p
                  className={`text-xs mb-5 ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {category.description}
                </p>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill.name}>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {skill.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
