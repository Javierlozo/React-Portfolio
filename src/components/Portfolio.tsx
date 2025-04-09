"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

import web1 from "@/src/public/pictures/rental.png";
import web2 from "@/src/public/pictures/weather.png";
import web3 from "@/src/public/pictures/langchain.png";
import web4 from "@/src/public/pictures/Screenshot (117).png";
import lessUSA from "@/src/public/pictures/Less1.png";
import querri from "@/src/public/pictures/querri1.png";
import cursorRules from "@/src/public/pictures/cursor-rules.png";
import gseay from "@/src/public/pictures/gseay.png";

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const projects: Project[] = [
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
      className="relative py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white mb-12 animate-fade-in">
          My Portfolio
        </h3>
        <p className="text-center text-lg text-gray-300 mb-16 animate-fade-in">
          Explore a selection of projects that highlight my skills and expertise
          in web development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleProjectClick(project);
                }
              }}
            >
              <div className="overflow-hidden rounded-2xl aspect-video glass-morphism">
                <div className="relative h-full">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-lg font-bold text-white mb-2">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium text-white bg-white/10 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium text-white bg-white/10 rounded-full">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
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
