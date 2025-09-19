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
      title: "AfricaNXT - Global African Talent Platform",
      description:
        "Led the development of a sophisticated mentorship platform connecting African talent globally. Implemented a production-ready AWS infrastructure with Cognito authentication, featuring domain-based validation, tiered user hierarchy (Admin → Anonymous), and GDPR-compliant consent management. Built an advanced admin dashboard with waitlist management, user promotion workflows, and real-time analytics powered by Squid Cloud backend.",
      techStack: ["React 18", "AWS CDK", "Cognito", "Squid Cloud", "TypeScript", "SES"],
      image: africanxt,
      liveLink: "https://app.africanxt.com/unga",
      codeLink: "https://github.com/gdnaio/africanxt-monorepo",
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
      title: "GSeay Inc Construction",
      description:
        "A professional website for GSeay Inc General Contractor, showcasing their construction services, project portfolio, and company history. Built with Next.js and AWS Amplify, featuring a modern design with interactive elements and comprehensive service information.",
      techStack: ["Next.js", "AWS Amplify", "TypeScript", "Responsive Design"],
      image: gseay,
      liveLink: "https://www.gseayinc.com/",
    },
    {
      id: 5, // Assign a unique ID
      title: "LESS USA",
      description:
        "Developed a robust and scalable platform for LESS USA, enhancing user experience and operational efficiency through seamless integration with AWS and Amplify.",
      techStack: ["Next.js", "AWS", "Amplify"],
      image: lessUSA,
      liveLink: "https://www.less-usa.com/",
    },
    {
      id: 6,
      title: "Querri",
      description:
        "Collaborated with Querri to develop a dynamic and user-friendly platform, utilizing modern technologies and custom coding to align with the client's vision. Focused on creating seamless user experiences and ensuring robust functionality, the project exemplifies innovation and performance.",
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
      className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 px-4">
          <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-4 sm:mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            My Portfolio
          </h2>
          <p className={`text-lg sm:text-xl mb-6 sm:mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explore a selection of projects that highlight my skills and expertise
            in web development and cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
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
              <div className={`overflow-hidden rounded-lg aspect-video ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <div className="relative h-full">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    theme === 'dark' ? 'bg-black/60' : 'bg-gray-900/60'
                  }`}>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className={`text-lg font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-white'
                      }`}>
                        {project.title}
                      </h4>
                      <p className={`text-sm line-clamp-2 mb-3 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-200'
                      }`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              theme === 'dark' 
                                ? 'text-white bg-gray-700' 
                                : 'text-white bg-gray-600'
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
