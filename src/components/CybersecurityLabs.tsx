"use client";
import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faWrench,
  faArrowRight,
  faNetworkWired,
  faCloud,
  faKey,
  faShieldHalved,
  faGlobe,
  faChartBar,
  faLock,
  faCrosshairs,
  faDesktop,
  faTerminal,
  faBug,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { LABS, getLabPath } from "../data/labs";
import RevealText from "./RevealText";
import BorderDrawButton from "./BorderDrawButton";

const FOCUS_ICONS: Record<string, IconDefinition> = {
  "Network Forensics": faNetworkWired,
  "Cloud Network Forensics": faCloud,
  "Password Management & Cryptography": faKey,
  "Data Security & DLP": faShieldHalved,
  "Network Security": faGlobe,
  "Malware Analysis": faBug,
  "Web Application Security": faGlobe,
  "SIEM & Log Analysis": faChartBar,
  "Cryptography": faLock,
  "Intrusion Detection": faCrosshairs,
  "Windows Security": faDesktop,
  "Linux Security": faTerminal,
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
  "Data Security & DLP": {
    dark: "from-emerald-600/20 to-teal-600/10",
    light: "from-emerald-100 to-teal-50",
  },
  "Network Security": {
    dark: "from-blue-600/20 to-indigo-600/10",
    light: "from-blue-100 to-indigo-50",
  },
  "Malware Analysis": {
    dark: "from-red-600/20 to-rose-600/10",
    light: "from-red-100 to-rose-50",
  },
  "Web Application Security": {
    dark: "from-orange-600/20 to-red-600/10",
    light: "from-orange-100 to-red-50",
  },
  "SIEM & Log Analysis": {
    dark: "from-cyan-600/20 to-blue-600/10",
    light: "from-cyan-100 to-blue-50",
  },
  "Cryptography": {
    dark: "from-amber-600/20 to-yellow-600/10",
    light: "from-amber-100 to-yellow-50",
  },
  "Intrusion Detection": {
    dark: "from-rose-600/20 to-pink-600/10",
    light: "from-rose-100 to-pink-50",
  },
  "Windows Security": {
    dark: "from-sky-600/20 to-blue-600/10",
    light: "from-sky-100 to-blue-50",
  },
  "Linux Security": {
    dark: "from-green-600/20 to-emerald-600/10",
    light: "from-green-100 to-emerald-50",
  },
};

const DEFAULT_GRADIENT = {
  dark: "from-gray-600/20 to-gray-700/10",
  light: "from-gray-100 to-gray-50",
};

const GLOW_COLORS: Record<string, string> = {
  "Network Forensics": "from-blue-500 via-cyan-500 to-blue-500",
  "Cloud Network Forensics": "from-violet-500 via-blue-500 to-violet-500",
  "Password Management & Cryptography": "from-amber-500 via-orange-500 to-amber-500",
  "Data Security & DLP": "from-emerald-500 via-teal-500 to-emerald-500",
  "Network Security": "from-blue-500 via-indigo-500 to-blue-500",
  "Malware Analysis": "from-red-500 via-rose-500 to-red-500",
  "Web Application Security": "from-orange-500 via-red-500 to-orange-500",
  "SIEM & Log Analysis": "from-cyan-500 via-blue-500 to-cyan-500",
  "Cryptography": "from-amber-500 via-yellow-500 to-amber-500",
  "Intrusion Detection": "from-rose-500 via-pink-500 to-rose-500",
  "Windows Security": "from-sky-500 via-blue-500 to-sky-500",
  "Linux Security": "from-green-500 via-emerald-500 to-green-500",
};

const labSkillTags = (() => {
  const completed = LABS.filter((l) => !l.comingSoon);
  const focuses = [...new Set(completed.map((l) => l.focus).filter(Boolean))] as string[];
  const tools = [...new Set(completed.flatMap((l) => l.tools))];
  return [...new Set([...focuses, ...tools])].slice(0, 10);
})();

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/** Animated SVG progress ring */
function ProgressRing({ completed, total, theme }: { completed: number; total: number; theme: string }) {
  const { ref, visible } = useReveal(0.5);
  const size = 72;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = completed / total;
  const offset = circumference * (1 - (visible ? progress : 0));

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme === "dark" ? "#f59e0b" : "#b45309"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-[1500ms] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-lg font-semibold leading-none ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          {completed}
        </span>
        <span className={`text-[10px] ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
          of {total}
        </span>
      </div>
    </div>
  );
}

function LabCard({ lab, theme, index }: { lab: (typeof LABS)[number]; theme: string; index: number }) {
  const { ref, visible } = useReveal();
  const gradient = FOCUS_GRADIENTS[lab.focus ?? ""] ?? DEFAULT_GRADIENT;
  const glowColor = GLOW_COLORS[lab.focus ?? ""] ?? "from-gray-500 via-gray-400 to-gray-500";

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative group rounded-2xl p-[1px]">
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${glowColor} bg-[length:200%_100%] animate-gradient-shift`}
        />
        <article
          className={`relative rounded-2xl overflow-hidden flex flex-col ${
            theme === "dark"
              ? "bg-gray-800/90 border border-gray-700/50"
              : "bg-white border border-gray-200"
          }`}
        >
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
          </div>
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
            <BorderDrawButton as="a" href={getLabPath(lab)} className="w-full justify-center">
              Read write-up
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </BorderDrawButton>
          </div>
        </article>
      </div>
    </div>
  );
}

function PipelineGroup({
  courseKey,
  labs,
  theme,
  groupIndex,
}: {
  courseKey: string;
  labs: (typeof LABS);
  theme: string;
  groupIndex: number;
}) {
  const { ref, visible } = useReveal(0.1);

  // Check if any labs in this group are completed
  const completedInGroup = labs.filter((l) => !l.comingSoon).length;
  const allComplete = completedInGroup === labs.length;

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transitionDelay: `${groupIndex * 120}ms`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        {allComplete ? (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20">
            <FontAwesomeIcon icon={faCheck} className="text-[9px] text-amber-500" />
          </span>
        ) : (
          <span
            className={`w-5 h-5 rounded-full border-2 ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          />
        )}
        <h4
          className={`text-xs font-semibold uppercase tracking-wider ${
            theme === "dark" ? "text-amber-400/80" : "text-amber-700"
          }`}
        >
          {courseKey}
        </h4>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {completedInGroup}/{labs.length}
        </span>
      </div>
      <div className="ml-2.5 border-l-2 border-dashed pl-5 space-y-1.5"
        style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
      >
        {labs.map((lab, i) => {
          const icon = FOCUS_ICONS[lab.focus ?? ""] ?? faFlask;
          const done = !lab.comingSoon;
          return (
            <div
              key={lab.id}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-500 ease-out ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700/40 hover:border-gray-600/60"
                  : "bg-white border border-gray-200 hover:border-gray-300"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transitionDelay: `${groupIndex * 120 + (i + 1) * 60}ms`,
              }}
            >
              {done ? (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 shrink-0">
                  <FontAwesomeIcon icon={faCheck} className="text-[8px] text-emerald-400" />
                </span>
              ) : (
                <FontAwesomeIcon
                  icon={icon}
                  className={`text-sm w-5 shrink-0 ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}
                />
              )}
              <span className={`text-sm flex-1 ${
                done
                  ? theme === "dark" ? "text-gray-200" : "text-gray-800"
                  : theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}>
                {lab.title}
              </span>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                  theme === "dark" ? "bg-gray-700/50 text-gray-500" : "bg-gray-100 text-gray-400"
                }`}
              >
                {lab.focus}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CybersecurityLabs() {
  const { theme } = useTheme();

  const completedLabs = LABS.filter((l) => !l.comingSoon);
  const totalLabs = LABS.length;

  // Group ALL labs by course for the pipeline view
  const allByCourse = LABS.reduce<Record<string, typeof LABS>>((acc, lab) => {
    const key = lab.course ?? "_other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(lab);
    return acc;
  }, {});
  const courseOrder = Array.from(new Set(LABS.map((l) => l.course ?? "_other")));

  return (
    <section id="security-labs" className={`py-12 sm:py-16 md:py-20 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
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
            <ProgressRing completed={completedLabs.length} total={totalLabs} theme={theme} />
          </div>
          <RevealText
            as="p"
            delay={200}
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-5 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Hands-on labs with real packet captures, full analysis, and detailed writeups. Evidence of skill beyond certifications.
          </RevealText>
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

        {/* Completed labs: full cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {completedLabs.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} theme={theme} index={i} />
          ))}
        </div>

        {/* Full pipeline: all books with progress */}
        <div className="mt-14 sm:mt-20">
          {/* Divider */}
          <div className="flex items-center gap-4 mb-8 max-w-3xl mx-auto">
            <div className={`flex-1 h-px ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`} />
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Lab Pipeline
            </span>
            <div className={`flex-1 h-px ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`} />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {courseOrder.map((courseKey, gi) => {
              const labs = allByCourse[courseKey] ?? [];
              return (
                <PipelineGroup
                  key={courseKey}
                  courseKey={courseKey}
                  labs={labs}
                  theme={theme}
                  groupIndex={gi}
                />
              );
            })}
          </div>
        </div>

        <p
          className={`text-center text-sm mt-10 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Labs are from SANS Cyber Academy.
        </p>
      </div>
    </section>
  );
}
