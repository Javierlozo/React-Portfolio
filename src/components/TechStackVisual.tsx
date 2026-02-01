"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faJs,
  faHtml5,
  faCss3Alt,
  faNodeJs,
  faPython,
  faAws,
  faDocker,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faServer,
  faCloud,
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

interface TechCategory {
  id: string;
  label: string;
  icon: any;
  items: TechItem[];
}

const CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: faCode,
    items: [
      { name: "React", icon: faReact },
      { name: "Next.js", icon: faReact },
      { name: "TypeScript", icon: faCode },
      { name: "JavaScript", icon: faJs },
      { name: "HTML5", icon: faHtml5 },
      { name: "CSS3", icon: faCss3Alt },
      { name: "Tailwind CSS", icon: faCss3Alt },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: faServer,
    items: [
      { name: "Node.js", icon: faNodeJs },
      { name: "Python", icon: faPython },
      { name: "Express", icon: faNodeJs },
      { name: "REST / GraphQL", icon: faDatabase },
      { name: "PostgreSQL", icon: faDatabase },
      { name: "MongoDB", icon: faDatabase },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: faCloud,
    items: [
      { name: "AWS", icon: faAws },
      { name: "Docker", icon: faDocker },
      { name: "Kubernetes", icon: faCog },
      { name: "CI/CD", icon: faCog },
      { name: "Git", icon: faGitAlt },
      { name: "Amplify", icon: faAws },
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity Tools",
    icon: faShieldAlt,
    items: [
      { name: "Wireshark", icon: faBug },
      { name: "Burp Suite", icon: faBug },
      { name: "Metasploit", icon: faShieldAlt },
      { name: "OWASP ZAP", icon: faShieldAlt },
      { name: "Authentication", icon: faLock },
      { name: "Secure coding", icon: faLock },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: faBrain,
    items: [
      { name: "LangChain", icon: faBrain },
      { name: "OpenAI API", icon: faBrain },
      { name: "Prompt engineering", icon: faBrain },
      { name: "AI integration", icon: faBrain },
    ],
  },
];

export default function TechStackVisual() {
  const { theme } = useTheme();

  return (
    <section
      id="skills"
      aria-label="Tech stack overview"
      className={`py-12 sm:py-16 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
              theme === "dark" ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
            }`}
          >
            Tech Stack
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Main tools and technologies by category.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`rounded-xl border-2 p-4 sm:p-5 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/40 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <h3
                className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 pb-2 border-b ${
                  theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={category.icon} className="text-base" />
                {category.label}
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        theme === "dark"
                          ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      title={item.name}
                    >
                      <FontAwesomeIcon icon={item.icon} className="text-xs opacity-80" />
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
