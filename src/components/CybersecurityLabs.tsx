"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faWrench,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { LABS, getLabPath } from "../data/labs";

export default function CybersecurityLabs() {
  const { theme } = useTheme();

  return (
    <section id="security-labs" className={`py-12 sm:py-16 md:py-20 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
              theme === "dark" ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
            }`}
          >
            Security Labs
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Hands-on labs and evidence of real skill beyond certifications.
          </p>
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
                        className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                          lab.comingSoon ? "opacity-75" : ""
                        } ${
                          theme === "dark"
                            ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className={`p-2.5 rounded-xl shrink-0 ${
                                theme === "dark" ? "bg-gray-700 text-amber-400" : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              <FontAwesomeIcon icon={faFlask} className="text-lg" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {lab.title}
                              </h3>
                              {lab.role && (
                                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-amber-400/90" : "text-amber-700"}`}>
                                  {lab.role}
                                </p>
                              )}
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
                          </div>
                          <p className={`text-sm leading-relaxed mb-3 flex-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                            {lab.summary}
                          </p>
                          {!lab.comingSoon && lab.whyThisMatters && (
                            <div
                              className={`mb-3 p-2.5 rounded-lg text-xs ${
                                theme === "dark" ? "bg-amber-500/10 text-amber-200/90" : "bg-amber-50 text-amber-900/90"
                              }`}
                            >
                              <span className={`font-medium ${theme === "dark" ? "text-amber-400" : "text-amber-700"}`}>
                                Why it matters:
                              </span>{" "}
                              {lab.whyThisMatters.slice(0, 120)}
                              {lab.whyThisMatters.length > 120 ? "…" : ""}
                            </div>
                          )}
                          {(lab.focus || lab.level || lab.date) && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {lab.focus && (
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    theme === "dark" ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  Focus: {lab.focus}
                                </span>
                              )}
                              {lab.level && (
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    theme === "dark" ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  Level: {lab.level}
                                </span>
                              )}
                              {lab.date && (
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    theme === "dark" ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  Date: {lab.date}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {lab.tools.slice(0, 4).map((tool) => (
                              <span
                                key={tool}
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                          {!lab.comingSoon && (
                            <Link
                              href={getLabPath(lab)}
                              className={`inline-flex items-center gap-2 text-sm font-medium ${
                                theme === "dark"
                                  ? "text-amber-400 hover:text-amber-300"
                                  : "text-amber-700 hover:text-amber-800"
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
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          Labs are from SANS Cyber Academy.
        </p>
      </div>
    </section>
  );
}
