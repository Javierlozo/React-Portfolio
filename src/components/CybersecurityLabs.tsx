"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
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
import ScrambleText from "./ScrambleText";
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

const FOCUS_GRADIENTS: Record<string, string> = {
  "Network Forensics": "from-blue-100 to-cyan-50 dark:from-blue-600/20 dark:to-cyan-600/10",
  "Cloud Network Forensics": "from-violet-100 to-blue-50 dark:from-violet-600/20 dark:to-blue-600/10",
  "Password Management & Cryptography": "from-amber-100 to-orange-50 dark:from-amber-600/20 dark:to-orange-600/10",
  "Data Security & DLP": "from-emerald-100 to-teal-50 dark:from-emerald-600/20 dark:to-teal-600/10",
  "Network Security": "from-blue-100 to-indigo-50 dark:from-blue-600/20 dark:to-indigo-600/10",
  "Malware Analysis": "from-red-100 to-rose-50 dark:from-red-600/20 dark:to-rose-600/10",
  "Web Application Security": "from-orange-100 to-red-50 dark:from-orange-600/20 dark:to-red-600/10",
  "SIEM & Log Analysis": "from-cyan-100 to-blue-50 dark:from-cyan-600/20 dark:to-blue-600/10",
  "Cryptography": "from-amber-100 to-yellow-50 dark:from-amber-600/20 dark:to-yellow-600/10",
  "Intrusion Detection": "from-rose-100 to-pink-50 dark:from-rose-600/20 dark:to-pink-600/10",
  "Windows Security": "from-sky-100 to-blue-50 dark:from-sky-600/20 dark:to-blue-600/10",
  "Linux Security": "from-green-100 to-emerald-50 dark:from-green-600/20 dark:to-emerald-600/10",
};

const DEFAULT_GRADIENT = "from-gray-100 to-gray-50 dark:from-gray-600/20 dark:to-gray-700/10";

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

function LabCard({ lab, index }: { lab: (typeof LABS)[number]; index: number }) {
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
        <article className="relative rounded-2xl overflow-hidden flex flex-col bg-white border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700/50">
          <div className={`relative px-5 pt-5 pb-4 bg-gradient-to-br ${gradient}`}>
            <FontAwesomeIcon
              icon={FOCUS_ICONS[lab.focus ?? ""] ?? faFlask}
              className="absolute top-4 right-4 text-3xl opacity-15 text-gray-900 dark:text-white"
            />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {lab.focus ?? "Security"}
            </span>
            <h3 className="font-medium mt-1 leading-snug text-gray-900 dark:text-white">
              {lab.title}
            </h3>
          </div>
          <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
            <p className="text-sm leading-relaxed mb-3 flex-1 text-gray-600 dark:text-gray-300">
              {lab.summary}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {lab.tools.slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
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
  groupIndex,
}: {
  courseKey: string;
  labs: (typeof LABS);
  groupIndex: number;
}) {
  const { ref, visible } = useReveal(0.1);

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
          <span className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-700" />
        )}
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80">
          {courseKey}
        </h4>
        <span className="text-[10px] px-1.5 py-0.5 rounded text-gray-400 dark:text-gray-500">
          {completedInGroup}/{labs.length}
        </span>
      </div>
      <div className="ml-2.5 border-l-2 border-dashed border-black/10 dark:border-white/10 pl-3 sm:pl-5 space-y-1.5">
        {labs.map((lab, i) => {
          const icon = FOCUS_ICONS[lab.focus ?? ""] ?? faFlask;
          const done = !lab.comingSoon;
          return (
            <div
              key={lab.id}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-500 ease-out bg-white border border-gray-200 hover:border-gray-300 dark:bg-gray-800/50 dark:border-gray-700/40 dark:hover:border-gray-600/60"
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
                  className="text-sm w-5 shrink-0 text-gray-300 dark:text-gray-600"
                />
              )}
              <span className={`text-sm flex-1 ${
                done
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
                {lab.title}
              </span>
              <span className="inline-block text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
                {lab.focus}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const FEATURED_COUNT = 6;

const FEATURED_SLUG_ORDER = [
  "vpc-flow-logs",
  "wireshark-packet-analysis",
  "web-app-exploitation",
  "tcpdump-traffic-analysis",
  "password-auditing",
  "ids-snort3-zeek",
];

export default function CybersecurityLabs() {
  const [showAllLabs, setShowAllLabs] = useState(false);

  const completedLabs = LABS.filter((l) => !l.comingSoon).slice().sort((a, b) => {
    const aIdx = FEATURED_SLUG_ORDER.indexOf(a.slug);
    const bIdx = FEATURED_SLUG_ORDER.indexOf(b.slug);
    const aRank = aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx;
    const bRank = bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx;
    if (aRank !== bRank) return aRank - bRank;
    return a.id - b.id;
  });
  const visibleLabs = showAllLabs ? completedLabs : completedLabs.slice(0, FEATURED_COUNT);
  const hasMoreLabs = completedLabs.length > FEATURED_COUNT;

  // Group ALL labs by course for the pipeline view
  const allByCourse = LABS.reduce<Record<string, typeof LABS>>((acc, lab) => {
    const key = lab.course ?? "_other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(lab);
    return acc;
  }, {});
  const courseOrder = Array.from(new Set(LABS.map((l) => l.course ?? "_other")));

  return (
    <section id="security-labs" className="py-12 sm:py-16 md:py-20 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              <FontAwesomeIcon icon={faFlask} className="text-xl" />
            </div>
            <ScrambleText
              as="h2"
              className="text-2xl sm:text-3xl md:text-4xl font-thin font-mono text-gray-900 dark:text-white"
            >
              Security Labs
            </ScrambleText>
            <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
              {completedLabs.length} labs
            </span>
          </div>
          <RevealText
            as="p"
            delay={200}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-5 text-gray-600 dark:text-gray-300"
          >
            Selected hands-on labs with real packet captures, full analysis, and detailed writeups. Evidence of skill beyond certifications.
          </RevealText>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {labSkillTags.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {visibleLabs.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} index={i} />
          ))}
        </div>

        {hasMoreLabs && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllLabs((v) => !v)}
              className="px-6 py-2.5 text-sm font-medium rounded-lg border transition-colors border-amber-600 text-amber-700 hover:bg-amber-50 dark:border-amber-500/60 dark:text-amber-400 dark:hover:bg-amber-500/10"
            >
              {showAllLabs ? "Show less" : `Show all ${completedLabs.length} labs`}
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Link
            href="/labs/cheatsheet"
            className="text-sm font-medium transition-colors text-amber-700 hover:text-amber-800 dark:text-amber-400/80 dark:hover:text-amber-300"
          >
            Also: SEC401 command cheatsheet →
          </Link>
        </div>

        <p className="text-center text-sm mt-10 text-gray-500 dark:text-gray-400">
          Labs are from SANS Cyber Academy.
        </p>
      </div>
    </section>
  );
}
