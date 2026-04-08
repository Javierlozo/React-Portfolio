"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faWrench,
  faArrowRight,
  faNetworkWired,
  faCloud,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { LABS, getLabPath } from "../data/labs";

const FOCUS_ICONS: Record<string, IconDefinition> = {
  "Network Forensics": faNetworkWired,
  "Cloud Network Forensics": faCloud,
  "Password Management & Cryptography": faKey,
};

const FOCUS_GRADIENTS: Record<string, { dark: string; light: string }> = {
  "Network Forensics": {
    dark: "from-blue-600/20 to-cyan-600/10",
    light: "from-blue-100 to-cyan-50",
  },
  "Cloud Network Forensics": {
    dark: "from-violet-600/20 to-blue-600/10",
    light: "from-violet-100 to-blue-50",
  },
  "Password Management & Cryptography": {
    dark: "from-amber-600/20 to-orange-600/10",
    light: "from-amber-100 to-orange-50",
  },
};

const DEFAULT_GRADIENT = {
  dark: "from-gray-600/20 to-gray-700/10",
  light: "from-gray-100 to-gray-50",
};

const labSkillTags = (() => {
  const completed = LABS.filter((l) => !l.comingSoon);
  const focuses = [...new Set(completed.map((l) => l.focus).filter(Boolean))] as string[];
  const tools = [...new Set(completed.flatMap((l) => l.tools))];
  return [...new Set([...focuses, ...tools])].slice(0, 10);
})();

export default function CybersecurityLabs() {
  const { theme } = useTheme();

  return (
    <section id="security-labs" className={`py-12 sm:py-16 md:py-20 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-700"
              }`}
            >
              <FontAwesomeIcon icon={faFlask} className="text-xl" />
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-thin ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Security Labs
            </h2>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                theme === "dark" ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700"
              }`}
            >
              {LABS.filter((l) => !l.comingSoon).length} completed
            </span>
          </div>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-5 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Hands-on labs with real packet captures, full analysis, and detailed writeups. Evidence of skill beyond certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {labSkillTags.map(
              (skill) => (
                <span
                  key={skill}
                  className={`text-xs px-3 py-1 rounded-full ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-400 border border-gray-700"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Labs: compact summary cards */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {(() => {
            const byCourse = LABS.reduce<Record<string, typeof LABS>>((acc, lab) => {
              const key = lab.course ?? "_other";
              if (!acc[key]) acc[key] = [];
              acc[key].push(lab);
              return acc;
            }, {});
            const courseOrder = Array.from(new Set(LABS.map((l) => l.course ?? "_other")));
            return courseOrder.map((courseKey) => {
              const labsInCourse = byCourse[courseKey] ?? [];
              return (
                <div key={courseKey} className="space-y-4">
                  {courseKey !== "_other" && (
                    <h3
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        theme === "dark" ? "text-amber-400/90" : "text-amber-700"
                      }`}
                    >
                      {courseKey}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {labsInCourse.map((lab) => (
                      <article
                        key={lab.id}
                        className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 flex flex-col ${
                          lab.comingSoon ? "opacity-75" : ""
                        } ${
                          theme === "dark"
                            ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {(() => {
                          const gradient = FOCUS_GRADIENTS[lab.focus ?? ""] ?? DEFAULT_GRADIENT;
                          return (
                            <div className={`relative px-5 pt-5 pb-4 bg-gradient-to-br ${theme === "dark" ? gradient.dark : gradient.light}`}>
                              <FontAwesomeIcon
                                icon={FOCUS_ICONS[lab.focus ?? ""] ?? faFlask}
                                className={`absolute top-4 right-4 text-3xl opacity-15 ${
                                  theme === "dark" ? "text-white" : "text-gray-900"
                                }`}
                              />
                              <span className={`text-[10px] font-semibold uppercase tracking-widest ${
                                theme === "dark" ? "text-gray-400" : "text-gray-500"
                              }`}>
                                {lab.focus ?? "Security"}
                              </span>
                              <h3 className={`font-medium mt-1 leading-snug ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {lab.title}
                              </h3>
                              {lab.comingSoon && (
                                <span
                                  className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded ${
                                    theme === "dark" ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"
                                  }`}
                                >
                                  Coming soon
                                </span>
                              )}
                            </div>
                          );
                        })()}
                        <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                          <p className={`text-sm leading-relaxed mb-3 flex-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                            {lab.summary}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {lab.tools.slice(0, 4).map((tool) => (
                              <span
                                key={tool}
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                <FontAwesomeIcon icon={faWrench} className="text-[10px] mr-1 opacity-50" />
                                {tool}
                              </span>
                            ))}
                          </div>
                          {!lab.comingSoon && (
                            <Link
                              href={getLabPath(lab)}
                              className={`inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                                theme === "dark"
                                  ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              }`}
                            >
                              Read full write-up
                              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                            </Link>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>

        <p
          className={`text-center text-sm mt-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Labs are from SANS Cyber Academy.
        </p>
      </div>
    </section>
  );
}
