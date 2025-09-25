"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
import { useTheme } from "../contexts/ThemeContext";

import web1 from "@/src/public/pictures/rental.png";
import web2 from "@/src/public/pictures/weather.png";
import web3 from "@/src/public/pictures/langchain.png";
import web4 from "@/src/public/pictures/Screenshot (117).png";
import lessUSA from "@/src/public/pictures/Less1.png";
import querri from "@/src/public/pictures/querri1.png";
import cursorRules from "@/src/public/pictures/cursor-rules.png";
import gseay from "@/src/public/pictures/gseay.png";
import africanxt from "@/src/public/pictures/Header.png";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: import("next/image").StaticImageData;
  liveLink?: string;
  codeLink?: string;
}

export default function Portfolio() {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const projects: Project[] = [
    {
      id: 10,
      title: "AfricaNXT – Global Mentorship Platform (via GDNA)",
      description:
        "Contributed through GDNA (contract role): React-based UI, Cognito authentication, AWS integration.",
      techStack: ["React 18", "AWS CDK", "Cognito", "Squid Cloud", "TypeScript", "SES"],
      image: africanxt,
      liveLink: "https://app.africanxt.com/unga",
    },
    {
      id: 7,
      title: "Cursor Rules Hub",
      description:
        "A community-driven platform for sharing and discovering AI behavior rules for the Cursor Editor. Features include rule browsing, creation tools, file pattern matching, and a dark mode interface. Built with a modern tech stack including Next.js 14, Supabase, and TypeScript.",
      techStack: ["Next.js 14", "Supabase", "TypeScript", "Tailwind CSS"],
      image: cursorRules,
      liveLink: "https://cursor-rules-virid.vercel.app/",
      codeLink: "https://github.com/Javierlozo/cursor_rules",
    },
    {
      id: 8,
      title: "GSeay, Inc. – Construction Website (via GDNA)",
      description:
        "Contributed through GDNA (contract role): Next.js front-end, AWS Amplify integration, responsive design.",
      techStack: ["Next.js", "AWS Amplify", "TypeScript", "Responsive Design"],
      image: gseay,
      liveLink: "https://www.gseayinc.com/",
    },
    {
      id: 5, // Assign a unique ID
      title: "LESS USA – Digital Platform (via GDNA)",
      description:
        "Contributed through GDNA (contract role): Next.js front-end, AWS Amplify deployment, user experience optimization.",
      techStack: ["Next.js", "AWS", "Amplify"],
      image: lessUSA,
      liveLink: "https://www.less-usa.com/",
    },
    {
      id: 6,
      title: "Querri – Dynamic Platform (via Querri)",
      description:
        "Contributed through Querri (contract role): HubSpot CMS development, custom HTML/CSS implementation, user experience optimization.",
      techStack: ["HubSpot CMS", "HTML", "CSS", "Javacript"],
      image: querri,
      liveLink: "https://querri.com/",
    },
    {
      id: 3,
      title: "YouTube GPT Creator",
      description:
        "Built an intelligent AutoGPT application for YouTube content creation, utilizing Python and LangChain to automate and enhance content generation processes.",
      techStack: ["Python", "LangChain"],
      image: web3,
      codeLink: "https://github.com/Javierlozo/langchain-autogpt",
    },
    {
      id: 1,
      title: "Rental App",
      description:
        "Designed and implemented a user-friendly sports equipment rental application tailored for the Charleston, SC area, featuring real-time availability and secure transactions.",
      techStack: ["React", "Node.js", "AWS"],
      image: web1,
      liveLink: "https://javierlozo.github.io/Rental-App/",
      codeLink: "https://github.com/Javierlozo/Rental-App",
    },
    {
      id: 2,
      title: "Weather App",
      description:
        "Developed a dynamic weather application enabling users to check real-time weather conditions across multiple cities, integrating reliable REST APIs for accurate data.",
      techStack: ["React", "REST API"],
      image: web2,
      liveLink: "https://javierlozo.github.io/WeatherCheck-API/",
      codeLink: "https://github.com/Javierlozo/WeatherCheck-API",
    },
    {
      id: 4,
      title: "Old Portfolio Page",
      description:
        "Created an early version of my portfolio website to showcase projects and skills, built with React and Node.js, serving as a foundation for my current professional site.",
      techStack: ["React", "Node.js"],
      image: web4,
      liveLink: "https://javierlozo.github.io/portfolio/",
      codeLink: "https://github.com/Javierlozo/portfolio",
    },
  ];

  return (
    <section
      id="portfolio"
      className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Minimalist Section Header */}
        <div className="text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl font-light tracking-tight mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Portfolio
          </h2>
          <div className={`w-16 h-px mx-auto mb-6 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A selection of projects showcasing my expertise in web development and cybersecurity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleProjectClick(project);
                }
              }}
            >
              <div className={`overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    theme === 'dark' ? 'bg-black/70' : 'bg-gray-900/70'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <h4 className={`text-lg font-medium mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-white'
                        }`}>
                          {project.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {project.techStack.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 text-xs font-medium rounded-full border ${
                                theme === 'dark' 
                                  ? 'text-white border-gray-600 bg-gray-800/50' 
                                  : 'text-white border-gray-300 bg-gray-900/50'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <h4 className={`text-lg font-medium mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h4>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          theme === 'dark' 
                            ? 'text-gray-300 border-gray-700 bg-gray-800/50' 
                            : 'text-gray-600 border-gray-200 bg-gray-50'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          showModal={showModal}
          setShowModal={setShowModal}
          project={selectedProject}
        />
      )}
    </section>
  );
}
