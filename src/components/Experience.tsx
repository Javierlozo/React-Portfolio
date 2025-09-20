"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ExperienceItem {
  company: string;
  location: string;
  position: string;
  period: string;
  responsibilities: string[];
}

export default function Experience() {
  const { theme } = useTheme();
  
  const experiences: ExperienceItem[] = [
    {
      company: "Global Digital Needs Agency (g/d/n/a)",
      location: "Charleston, SC",
      position: "Software Engineer (Contract)",
      period: "April 2024 – Present",
      responsibilities: [
        "Leading end-to-end development of MVP React applications using AWS Lambda and Amplify, reducing time-to-market by 40%",
        "Implementing Next.js 14 with Server Components and Supabase for real-time features and authentication",
        "Integrating AI-powered features using AWS services, creating key differentiators for market positioning",
        "Architecting scalable hybrid infrastructure using Supabase and AWS, optimizing performance and costs",
      ],
    },
    {
      company: "Querri",
      location: "Charleston, SC",
      position: "Software Engineer (Contract)",
      period: "August 2023 – April 2024 (9 months)",
      responsibilities: [
        "Designed and implemented responsive web applications using Svelte to improve performance and user engagement.",
        "Integrated FusionAuth for secure authentication, enhancing application security and user confidence.",
        "Developed a custom HubSpot-based website with extended functionality through custom code.",
      ],
    },
    {
      company: "Upstate Nutrition Consultants, Inc",
      location: "Greenville, SC",
      position: "Web Developer (Contract)",
      period: "July 2023 – August 2023 (2 months)",
      responsibilities: [
        "Created and maintained web pages to improve user experience and engagement.",
        "Implemented new features and functionalities to meet business requirements.",
        "Worked closely with the CEO to design and launch a cohesive web platform.",
      ],
    },
    {
      company: "Interloop Technologies, Inc",
      location: "Charleston, SC",
      position: "Software Engineer I & II",
      period: "July 2021 – June 2023 (2 years)",
      responsibilities: [
        "Led multiple high-impact projects using Angular, NestJS, and MongoDB",
        "Created and managed Azure Functions to automate processes",
        "Mentored junior developers through code reviews and pair programming",
        "Developed custom Chrome extensions integrated with CRM tools",
        "Improved application reliability by implementing test plans using Cypress",
        "Implemented secure coding practices and security architecture",
      ],
    },
  ];

  return (
    <section id="experience" className={`py-24 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl font-light tracking-tight mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Experience
          </h2>
          <div className={`w-16 h-px mx-auto ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.position}`}
              className={`p-8 border-l-4 ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-900/30' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              {/* Company Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h4 className={`text-lg font-medium mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {exp.company}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {exp.location}
                  </p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {exp.position}
                  </p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {exp.period}
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className={`space-y-3 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start text-sm leading-relaxed">
                    <span className={`mr-3 mt-1 text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>•</span>
                    {resp}
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
