"use client";
import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: StaticImageData;
  liveLink?: string;
  codeLink: string;
}

interface ProjectModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
}

export default function ProjectModal({
  showModal,
  setShowModal,
  project,
}: ProjectModalProps) {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg mx-auto relative transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100 shadow-2xl max-h-[75vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={() => setShowModal(false)}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 text-center">
          {project.title}
        </h2>

        {/* Project Image */}
        {/* <div className="mt-4">
          <Image
            src={project.image}
            alt={project.title}
            className="rounded-lg"
            layout="responsive"
            width={100}
            height={50}
          />
        </div> */}

        {/* Description */}
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {project.liveLink && (
            <button
              className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
              onClick={() => window.open(project.liveLink, "_blank")}
            >
              Live
            </button>
          )}
          <button
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
            onClick={() => window.open(project.codeLink, "_blank")}
          >
            Code
          </button>
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
