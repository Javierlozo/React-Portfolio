"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
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

interface TechItem {
  name: string;
  icon: any;
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
    label: "Security",
    items: [
      { name: "Wireshark", icon: faBug },
      { name: "Burp Suite", icon: faBug },
      { name: "OWASP ZAP", icon: faShieldAlt },
      { name: "tcpdump", icon: faBug },
      { name: "Secure Coding", icon: faLock },
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

export default function TechStackVisual() {
  const { theme } = useTheme();

  return (
    <section
      id="skills"
      aria-label="Tech stack overview"
      className={`py-12 sm:py-16 md:py-20 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            className={`text-xl sm:text-3xl md:text-4xl font-thin mb-4 sm:mb-8 pb-2 border-b w-fit mx-auto leading-tight ${
              theme === "dark" ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
            }`}
          >
            Tech Stack
          </h2>
          <p
            className={`text-sm sm:text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Technologies I reach for every day, and the broader toolkit I bring to projects.
          </p>
        </div>

        {/* Primary: Core Stack */}
        <div className="mb-10 sm:mb-14">
          <h3
            className={`text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 ${
              theme === "dark" ? "text-amber-400" : "text-amber-700"
            }`}
          >
            Core Stack
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {PRIMARY_SKILLS.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-xl border-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/70 border-gray-600 hover:border-gray-500"
                    : "bg-white border-gray-200 hover:border-gray-400"
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-base sm:text-lg shrink-0 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                />
                <span
                  className={`text-sm sm:text-base font-medium ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary: Also Work With */}
        <div>
          <h3
            className={`text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-400"
            }`}
          >
            Also Work With
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {SECONDARY_SKILLS.map((group) => (
              <div
                key={group.label}
                className={`rounded-xl border p-4 sm:p-5 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/30 border-gray-700/60 hover:border-gray-600"
                    : "bg-gray-50/80 border-gray-200 hover:border-gray-300"
                }`}
              >
                <h4
                  className={`text-xs font-semibold uppercase tracking-wide mb-2.5 pb-2 border-b ${
                    theme === "dark" ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
                  }`}
                >
                  {group.label}
                </h4>
                <ul className="flex flex-wrap gap-1.5 sm:gap-2" role="list">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-gray-700/70 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
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
