"use client";
import React from "react";

interface ExperienceItem {
  company: string;
  location: string;
  position: string;
  period: string;
  responsibilities: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: "Global Digital Needs Agency (GDNA)",
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
      position: "Software Engineer II",
      period: "November 2022 – June 2023 (8 months)",
      responsibilities: [
        "Led multiple high-impact projects using Angular, NestJS, and MongoDB.",
        "Created and managed Azure Functions to automate processes.",
        "Mentored junior developers through code reviews and pair programming.",
      ],
    },
    {
      company: "Interloop Technologies, Inc",
      location: "Charleston, SC",
      position: "Software Engineer I",
      period: "July 2021 – November 2022 (1 year, 4 months)",
      responsibilities: [
        "Developed custom Chrome extensions integrated with CRM tools.",
        "Improved application reliability by implementing test plans using Cypress.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white mb-16 animate-fade-in">
          Work Experience
        </h3>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className="glass-morphism p-8 rounded-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    {exp.company}
                  </h4>
                  <p className="text-gray-400">{exp.location}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-white font-medium">{exp.position}</p>
                  <p className="text-gray-400">{exp.period}</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-violet-400">•</span>
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
