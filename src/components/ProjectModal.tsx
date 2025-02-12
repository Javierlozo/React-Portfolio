"use client";
import React, { useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExternalLinkAlt,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: StaticImageData;
  liveLink?: string;
  codeLink?: string;
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
  const modalRef = useRef<HTMLDivElement>(null);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={() => setShowModal(false)}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative w-[90vw] max-w-4xl glass-morphism rounded-2xl overflow-hidden animate-fade-in"
      >
        {/* Close button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-80 md:h-96 group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 mb-4">
            {project.title}
          </h3>

          <p className="text-gray-300 mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-medium text-white bg-white/10 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                <span>View Live</span>
              </a>
            )}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass-morphism text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <FontAwesomeIcon icon={faCode} />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
