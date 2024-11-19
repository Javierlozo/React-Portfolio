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

  const projects: Project[] = [
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
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold dark:text-gray-100">
          My Portfolio
        </h3>
        <p className="text-md md:text-lg lg:text-xl pt-5 dark:text-gray-400">
          Explore a selection of projects that highlight my skills and expertise
          in web development.
        </p>
        <p className="text-xs md:text-sm pb-20 dark:text-gray-400 mt-3">
          Click on any project to dive deeper into its features and the
          technologies used. This portfolio itself was crafted using React,
          Next.js and TailwindCSS.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-7 px-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative cursor-pointer"
            tabIndex={0} // Make it focusable
            onClick={() => handleProjectClick(project)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleProjectClick(project);
            }}
          >
            <div className="overflow-hidden rounded-2xl shadow-lg dark:shadow-gray-800">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title} website`}
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
              <p className="text-sm mt-8">{project.description}</p>
              <div className="text-xs flex justify-center flex-wrap gap-2 mt-8">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full shadow-sm hover:shadow-lg transition-shadow duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
