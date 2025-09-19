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
    <section id="experience" className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-16 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Professional Experience
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.position}`}
              className={`p-8 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h4 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {exp.company}
                  </h4>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {exp.location}
                  </p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {exp.position}
                  </p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {exp.period}
                  </p>
                </div>
              </div>
              <ul className={`space-y-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`mr-2 ${
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
