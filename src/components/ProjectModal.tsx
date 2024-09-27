// components/ProjectModal.tsx

"use client";
import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-teal-600">{project.title}</h2>
        <div className="mt-4">
          <Image
            src={project.image}
            alt={project.title}
            className="rounded-lg"
          />
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
        <div className="mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          {project.liveLink && (
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 mr-2"
              onClick={() => window.open(project.liveLink, "_blank")}
            >
              Live
            </button>
          )}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            onClick={() => window.open(project.codeLink, "_blank")}
          >
            Code
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
