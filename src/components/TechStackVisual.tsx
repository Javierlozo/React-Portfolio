"use client";
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNodeJs,
  faPython,
  faAws,
  faDocker,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faShieldAlt,
  faBrain,
  faLock,
  faBug,
  faCog,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface TechItem {
  name: string;
  icon: IconDefinition;
}

// Primary: technologies you use daily and would confidently lead a project with
const PRIMARY_SKILLS: TechItem[] = [
  { name: "React", icon: faReact },
  { name: "Next.js", icon: faReact },
  { name: "TypeScript", icon: faCode },
  { name: "Node.js", icon: faNodeJs },
  { name: "AWS", icon: faAws },
  { name: "Python", icon: faPython },
  { name: "PostgreSQL", icon: faDatabase },
  { name: "Tailwind CSS", icon: faCode },
];

// Secondary: tools and technologies you're familiar with and use regularly
const SECONDARY_SKILLS: { label: string; items: TechItem[] }[] = [
  {
    label: "Security",
    items: [
      { name: "OWASP Top 10", icon: faShieldAlt },
      { name: "OWASP LLM Top 10", icon: faShieldAlt },
      { name: "Threat Modeling", icon: faLock },
      { name: "Burp Suite", icon: faBug },
      { name: "OWASP ZAP", icon: faShieldAlt },
      { name: "Secure Coding", icon: faLock },
    ],
  },
  {
    label: "Forensics & IR",
    items: [
      { name: "Wireshark", icon: faBug },
      { name: "tcpdump", icon: faBug },
      { name: "PCAP Analysis", icon: faBug },
      { name: "VPC Flow Logs", icon: faShieldAlt },
      { name: "John the Ripper", icon: faLock },
      { name: "Hashcat", icon: faLock },
      { name: "exiftool", icon: faBug },
      { name: "nfdump", icon: faBug },
      { name: "DLP", icon: faShieldAlt },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Lambda", icon: faAws },
      { name: "S3", icon: faAws },
      { name: "Amplify", icon: faAws },
      { name: "Docker", icon: faDocker },
      { name: "CI/CD", icon: faCog },
      { name: "Git", icon: faGitAlt },
    ],
  },
  {
    label: "AI / Automation",
    items: [
      { name: "LangChain", icon: faBrain },
      { name: "OpenAI API", icon: faBrain },
      { name: "Prompt Engineering", icon: faBrain },
    ],
  },
  {
    label: "Data & APIs",
    items: [
      { name: "REST APIs", icon: faDatabase },
      { name: "GraphQL", icon: faCode },
      { name: "MongoDB", icon: faDatabase },
      { name: "Express", icon: faNodeJs },
    ],
  },
];

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

export default function TechStackVisual() {
  const { ref: coreRef, visible: coreVisible } = useReveal(0.1);
  const { ref: secondaryRef, visible: secondaryVisible } = useReveal(0.1);

  return (
    <section
      id="skills"
      aria-label="Tech stack overview"
      className="py-12 sm:py-16 md:py-20 bg-[#FAFAF9] dark:bg-[#0B1220]"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-thin mb-4 sm:mb-8 pb-2 border-b w-fit mx-auto leading-tight text-gray-900 border-gray-200 dark:text-white dark:border-gray-700">
            Tech Stack
          </h2>
          <p className="text-sm sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Technologies I reach for every day, and the broader toolkit I bring to projects.
          </p>
        </div>

        <div ref={coreRef} className="mb-10 sm:mb-14">
          <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 text-amber-700 dark:text-amber-400">
            Core Stack
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {PRIMARY_SKILLS.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl border transition-all duration-500 ease-out bg-white border-gray-200 hover:border-gray-400 dark:bg-gray-800/70 dark:border-gray-600 dark:hover:border-gray-500"
                style={{
                  opacity: coreVisible ? 1 : 0,
                  transform: coreVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-base sm:text-lg shrink-0 text-gray-900 dark:text-white"
                />
                <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div ref={secondaryRef}>
          <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 text-gray-500 dark:text-gray-400">
            Also Work With
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {SECONDARY_SKILLS.map((group, gi) => (
              <div
                key={group.label}
                className="rounded-xl border p-4 sm:p-5 transition-colors duration-600 ease-out bg-gray-50/80 border-gray-200 hover:border-gray-300 dark:bg-gray-800/30 dark:border-gray-700/60 dark:hover:border-gray-600"
                style={{
                  opacity: secondaryVisible ? 1 : 0,
                  transform: secondaryVisible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${gi * 100}ms`,
                }}
              >
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wide mb-2.5 pb-2 border-b text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  {group.label}
                </h4>
                <ul className="flex flex-wrap gap-1.5 sm:gap-2" role="list">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700/70 dark:text-gray-300 dark:hover:bg-gray-600"
                        title={item.name}
                      >
                        <FontAwesomeIcon icon={item.icon} className="text-[10px] opacity-60 shrink-0" />
                        <span className="leading-snug">{item.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
