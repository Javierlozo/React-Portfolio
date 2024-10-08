"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

// Import your project images
import web1 from "@/src/public/pictures/rental.png";
import web2 from "@/src/public/pictures/weather.png";
import web3 from "@/src/public/pictures/langchain.png";
import web4 from "@/src/public/pictures/Screenshot (117).png";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: import("next/image").StaticImageData;
  liveLink?: string;
  codeLink: string;
}

export default function Portfolio() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 3,
      title: "Youtube GPT Creator",
      description: "An AutoGPT App.",
      techStack: ["Python", "LangChain"],
      image: web3,
      codeLink: "https://github.com/Javierlozo/langchain-autogpt",
    },
    {
      id: 1,
      title: "Rental App",
      description:
        "A sport equipment rental application in Charleston, SC area.",
      techStack: ["React", "Node.js", "AWS"],
      image: web1,
      liveLink: "https://javierlozo.github.io/Rental-App/",
      codeLink: "https://github.com/Javierlozo/Rental-App",
    },
    {
      id: 2,
      title: "Weather App",
      description: "An application to check the weather in different cities.",
      techStack: ["React", "REST API"],
      image: web2,
      liveLink: "https://javierlozo.github.io/WeatherCheck-API/",
      codeLink: "https://github.com/Javierlozo/WeatherCheck-API",
    },
    {
      id: 4,
      title: "Old Portfolio Page",
      description: "Showcase of my projects and skills.",
      techStack: ["React", "Node.js"],
      image: web4,
      liveLink: "https://javierlozo.github.io/portfolio/",
      codeLink: "https://github.com/Javierlozo/portfolio",
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <section
      id="portfolio"
      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-10"
    >
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Portfolio
        </h3>
        <div className="text-md md:text-lg lg:text-xl pt-5">
          Some of the projects that I have worked on
        </div>
        <div className="text-sm md:text-base pb-20">
          (Click on any projects to learn more, this portfolio page was also
          built with React, NextJS, TailwindCSS, and deployed on Vercel)
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center pb-7 px-4">
        {projects.map((project) => (
          <div key={project.id} className="group relative cursor-pointer">
            <div className="overflow-hidden rounded-2xl shadow-lg dark:shadow-gray-800">
              <Image
                src={project.image}
                alt={project.title}
                className="transform group-hover:scale-105 transition-transform duration-300 w-full h-60 object-cover"
                layout="responsive"
              />
            </div>
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-center text-gray-200 dark:text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4"
              onClick={() => handleProjectClick(project)}
            >
              <h4 className="text-lg font-bold">{project.title}</h4>
              <p className="text-sm">{project.description}</p>
              <p className="text-xs mt-2">{project.techStack.join(", ")}</p>
            </div>
          </div>
        ))}
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
