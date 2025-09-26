"use client";
import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExternalLinkAlt,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image?: import("next/image").StaticImageData;
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
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  if (!showModal) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-2xl max-h-[90vh] rounded-lg overflow-hidden z-10 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setShowModal(false)}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
            theme === 'dark' 
              ? 'text-white hover:text-gray-300 bg-gray-700 hover:bg-gray-600' 
              : 'text-gray-800 hover:text-gray-600 bg-gray-200 hover:bg-gray-300'
          }`}
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Project Image */}
          {project.image && (
            <div className="w-full mb-6 h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                width={800}
                height={600}
                className="w-full h-auto object-contain object-top"
              />
            </div>
          )}
          
          <div className="p-6">
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {project.title}
            </h3>

          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 text-sm font-medium border ${
                  theme === 'dark' 
                    ? 'text-gray-300 border-gray-600' 
                    : 'text-gray-600 border-gray-300'
                }`}
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
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 border ${
                  theme === 'dark'
                    ? 'border-blue-600 text-blue-400 hover:border-blue-500 hover:text-blue-300'
                    : 'border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700'
                }`}
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
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 border ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-gray-200'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={faCode} />
                <span>View Code</span>
              </a>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body);
}
