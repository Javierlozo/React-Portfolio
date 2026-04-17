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
      <article className="group relative rounded-2xl overflow-hidden flex flex-col bg-white border border-gray-200 hover:border-amber-400 transition-colors duration-300 dark:bg-gray-800/90 dark:border-gray-700/50 dark:hover:border-amber-500/60">
        <div className="relative px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700/50">
          <FontAwesomeIcon
            icon={FOCUS_ICONS[lab.focus ?? ""] ?? faFlask}
            className="absolute top-4 right-4 text-3xl opacity-10 text-gray-900 dark:text-white"
          />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400/80">
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
            <span className="font-mono text-xs sm:text-sm font-semibold tabular-nums px-3 py-1 rounded-full whitespace-nowrap bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
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
