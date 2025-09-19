"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faReact,
  faAngular,
  faNode,
  faAws,
  faPython,
  faGitAlt,
  faGithub,
  faLinux,
  faDocker,
  faJenkins,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faShieldAlt,
  faLock,
  faServer,
  faCloud,
  faCode,
  faBug,
  faNetworkWired,
  faFileCode,
  faGears,
  faEye,
  faSearch,
  faExclamationTriangle,
  faKey,
  faShield,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../contexts/ThemeContext";

interface Skill {
  name: string;
  icon: any;
  color: string;
  category: "frontend" | "backend" | "devops" | "security" | "other";
}

// Add this SVG component for Svelte logo
const SvelteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 98.1 118"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path
      d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5"
      fill="#ff3e00"
    />
    <path
      d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.4-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.7l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.9 5.2-4.1 9.9-8.6 12.7l-27.5 17.5c-1.7 1.1-3.6 1.9-5.6 2.5"
      fill="#ffffff"
    />
  </svg>
);

export default function Skills() {
  const { theme } = useTheme();
  
  const skills: Skill[] = [
    // Frontend
    {
      name: "JavaScript",
      icon: faJs,
      color: "text-yellow-400",
      category: "frontend",
    },
    {
      name: "React",
      icon: faReact,
      color: "text-blue-400",
      category: "frontend",
    },
    {
      name: "Angular",
      icon: faAngular,
      color: "text-red-500",
      category: "frontend",
    },
    {
      name: "TypeScript",
      icon: faCode,
      color: "text-blue-500",
      category: "frontend",
    },
    {
      name: "Svelte",
      icon: SvelteIcon,
      color: "text-[#ff3e00]",
      category: "frontend",
    },

    // Backend
    {
      name: "Node.js",
      icon: faNode,
      color: "text-green-500",
      category: "backend",
    },
    {
      name: "Python",
      icon: faPython,
      color: "text-blue-500",
      category: "backend",
    },
    {
      name: "Databases",
      icon: faDatabase,
      color: "text-blue-300",
      category: "backend",
    },
    {
      name: "APIs",
      icon: faServer,
      color: "text-violet-400",
      category: "backend",
    },
    {
      name: "Microservices",
      icon: faGears,
      color: "text-gray-300",
      category: "backend",
    },

    // DevOps & Cloud
    { name: "AWS", icon: faAws, color: "text-orange-500", category: "devops" },
    {
      name: "Docker",
      icon: faDocker,
      color: "text-blue-500",
      category: "devops",
    },
    {
      name: "Jenkins",
      icon: faJenkins,
      color: "text-red-400",
      category: "devops",
    },
    { name: "Git", icon: faGitAlt, color: "text-red-400", category: "devops" },
    {
      name: "GitHub",
      icon: faGithub,
      color: "text-gray-400",
      category: "devops",
    },
    {
      name: "Linux",
      icon: faLinux,
      color: "text-yellow-500",
      category: "devops",
    },
    {
      name: "Cloud Security",
      icon: faCloud,
      color: "text-blue-300",
      category: "devops",
    },

    // Security
    {
      name: "Cybersecurity",
      icon: faShieldAlt,
      color: "text-violet-400",
      category: "security",
    },
    {
      name: "Web App Security",
      icon: faShield,
      color: "text-cyan-400",
      category: "security",
    },
    {
      name: "Auth & OAuth",
      icon: faLock,
      color: "text-green-400",
      category: "security",
    },
    {
      name: "Penetration Testing",
      icon: faBug,
      color: "text-red-400",
      category: "security",
    },
    {
      name: "Vulnerability Assessment",
      icon: faSearch,
      color: "text-orange-400",
      category: "security",
    },
    {
      name: "Security Auditing",
      icon: faEye,
      color: "text-purple-400",
      category: "security",
    },
    {
      name: "Network Security",
      icon: faNetworkWired,
      color: "text-blue-500",
      category: "security",
    },
    {
      name: "Code Analysis",
      icon: faFileCode,
      color: "text-yellow-400",
      category: "security",
    },
    {
      name: "Threat Detection",
      icon: faExclamationTriangle,
      color: "text-red-500",
      category: "security",
    },
    {
      name: "Access Control",
      icon: faKey,
      color: "text-indigo-400",
      category: "security",
    },
    {
      name: "Security Architecture",
      icon: faUserShield,
      color: "text-teal-400",
      category: "security",
    },
  ];

  const categories = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    devops: "DevOps & Cloud",
    security: "Security & Infrastructure",
  };

  return (
    <section id="skills" className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-16 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Technical Skills & Security Expertise
        </h2>

        <div className="max-w-6xl mx-auto">
          {Object.entries(categories).map(([category, title]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h3 className={`text-2xl font-semibold mb-8 text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className={`flex flex-col items-center justify-center p-6 rounded-lg hover:transition-colors duration-200 h-32 w-full ${
                        theme === 'dark' 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {typeof skill.icon === "function" ? (
                        <skill.icon />
                      ) : (
                        <FontAwesomeIcon
                          icon={skill.icon}
                          className={`text-3xl ${skill.color}`}
                        />
                      )}
                      <p className={`mt-3 text-sm text-center font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {skill.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
