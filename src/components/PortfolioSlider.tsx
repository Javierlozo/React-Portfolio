"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faExternalLinkAlt, faCode } from "@fortawesome/free-solid-svg-icons";

// Import project images
import lessUSA from "@/src/public/pictures/Less1.png";
import querri from "@/src/public/pictures/querri1.png";
import cursorRules from "@/src/public/pictures/cursor-rules.png";
import gseay from "@/src/public/pictures/gseay.png";
import africanxt from "@/src/public/pictures/app.africanxt.com_ (1).png";
import iberiatech from "@/src/public/pictures/www.iberiatechsolutions.com_ (1).png";
import web1 from "@/src/public/pictures/rental.png";
import web2 from "@/src/public/pictures/weather.png";
import web3 from "@/src/public/pictures/langchain.png";
import web4 from "@/src/public/pictures/Screenshot (117).png";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: any;
  liveLink?: string;
  codeLink?: string;
  featured?: boolean;
}

export default function PortfolioSlider() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const clientProjects: Project[] = [
    {
      id: 10,
      title: "AfricaNXT — Global Mentorship Platform (via GDNA)",
      description: "Contributing to a mentorship platform currently onboarding ~1,200 users. Delivered React-based UI components and AWS Cognito authentication system to improve user registration and onboarding.",
      techStack: ["React 18", "AWS CDK", "Cognito", "Squid Cloud", "TypeScript", "SES"],
      image: africanxt,
      liveLink: "https://app.africanxt.com/unga",
      featured: true,
    },
    {
      id: 8,
      title: "GSeay, Inc. — Construction Website (via GDNA)",
      description: "Delivered a responsive website with Next.js and AWS Amplify integration, completed 2 weeks ahead of schedule.",
      techStack: ["Next.js", "AWS Amplify", "TypeScript"],
      image: gseay,
      liveLink: "https://www.gseayinc.com/",
    },
    {
      id: 5,
      title: "LESS USA — Digital Platform (via GDNA)",
      description: "Enhanced platform performance by 30% and optimized user experience. Deployed with AWS Amplify.",
      techStack: ["Next.js", "AWS", "Amplify"],
      image: lessUSA,
      liveLink: "https://www.less-usa.com/",
    },
    {
      id: 6,
      title: "Querri — Dynamic Analytics Platform (Contract Role)",
      description: "Built custom HubSpot CMS solutions, improved site speed by 35%, and increased mobile engagement by 40%.",
      techStack: ["HubSpot CMS", "HTML", "CSS", "JavaScript"],
      image: querri,
      liveLink: "https://querri.com/",
    },
  ];

  const independentProjects: Project[] = [
    {
      id: 11,
      title: "IberiaTech Solutions — Bilingual Business Website (Independent Project)",
      description: "Built a modern, bilingual business website with English/Spanish translation, AI-powered features, and responsive design that increased engagement by 40% and expanded market reach to Spanish-speaking audiences.",
      techStack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: iberiatech,
      liveLink: "https://www.iberiatechsolutions.com/",
      codeLink: "https://github.com/IberiaTech-Solutions/iberiatech",
    },
    {
      id: 7,
      title: "Cursor Rules Hub — AI Community Platform (Independent Project)",
      description: "Developing a community-driven platform for AI behavior rules in Cursor Editor. Features include rule browsing, creation tools, and intelligent file pattern matching. Currently building core features and preparing for community rollout.",
      techStack: ["Next.js 14", "Supabase", "TypeScript", "Tailwind CSS"],
      image: cursorRules,
      liveLink: "https://cursor-rules-virid.vercel.app/",
      codeLink: "https://github.com/Javierlozo/cursor_rules",
    },
    {
      id: 3,
      title: "YouTube GPT Creator (Independent Project)",
      description: "Developed an intelligent AutoGPT application to automate YouTube content workflows, reducing manual content creation time by ~40%. Utilized Python and LangChain to streamline content generation processes.",
      techStack: ["Python", "LangChain"],
      image: web3,
      codeLink: "https://github.com/Javierlozo/langchain-autogpt",
    },
    {
      id: 1,
      title: "Rental App (Independent Project)",
      description: "Designed and implemented a user-friendly sports equipment rental application tailored for the Charleston, SC area, featuring real-time availability and secure transactions.",
      techStack: ["React", "Node.js", "AWS"],
      image: web1,
      liveLink: "https://javierlozo.github.io/Rental-App/",
      codeLink: "https://github.com/Javierlozo/Rental-App",
    },
    {
      id: 2,
      title: "Weather App (Independent Project)",
      description: "Developed a dynamic weather application enabling users to check real-time weather conditions across multiple cities, integrating reliable REST APIs for accurate data.",
      techStack: ["React", "REST API"],
      image: web2,
      liveLink: "https://javierlozo.github.io/WeatherCheck-API/",
      codeLink: "https://github.com/Javierlozo/WeatherCheck-API",
    },
    {
      id: 4,
      title: "Old Portfolio Page (Independent Project)",
      description: "Created an early version of my portfolio website to showcase projects and skills, built with React and Node.js, serving as a foundation for my current professional site.",
      techStack: ["React", "Node.js"],
      image: web4,
      liveLink: "https://javierlozo.github.io/portfolio/",
      codeLink: "https://github.com/Javierlozo/portfolio",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clientProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + clientProjects.length) % clientProjects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="portfolio" className={`py-16 sm:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Portfolio
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Real projects delivering measurable business value and growth
          </p>

          {/* Mini Grid Summary */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="text-center">
              <h4 className={`text-base sm:text-lg font-light mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Clients
              </h4>
              <p className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                GDNA, Querri, Upstate Nutrition, Interloop
              </p>
            </div>
            <div className="text-center">
              <h4 className={`text-base sm:text-lg font-light mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Impact
              </h4>
              <p className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Delivered measurable results — from 30% faster load times to 60% higher engagement
              </p>
            </div>
            <div className="text-center">
              <h4 className={`text-base sm:text-lg font-light mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Tech
              </h4>
              <p className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                React, Next.js, AWS, Python, Svelte, Supabase, Squid AI
              </p>
            </div>
          </div>
          
          {/* Client Projects Subheader */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xl sm:text-2xl font-thin mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Client & Contract Projects
            </h3>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Professional work delivering real business impact
            </p>
          </div>
        </div>

        {/* Main Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 backdrop-blur-sm text-white/80 hover:bg-gray-700/70 hover:text-white' 
                : 'bg-white/50 backdrop-blur-sm text-gray-900/80 hover:bg-gray-100/70 hover:text-gray-900'
            } shadow-lg`}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 backdrop-blur-sm text-white/80 hover:bg-gray-700/70 hover:text-white' 
                : 'bg-white/50 backdrop-blur-sm text-gray-900/80 hover:bg-gray-100/70 hover:text-gray-900'
            } shadow-lg`}
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
          </button>

          {/* Project Display */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {clientProjects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } rounded-2xl shadow-2xl`}>
                    {/* Project Image */}
                    <div className="relative">
                      <div className="relative w-full h-80 overflow-hidden rounded-xl group">
                        <Image
                          src={project.image}
                          alt={`Screenshot of ${project.title}`}
                          fill
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        {project.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </div>
                        )}
                        {/* Image Overlay with Caption */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                          <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <div className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-white'
                            }`}>
                              {project.title}
                            </div>
                            <div className={`text-xs ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
                            }`}>
                              Click to view details
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex flex-col justify-center">
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      
                      <p className={`text-sm sm:text-base md:text-lg mb-6 leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full border transition-all duration-300 hover:scale-105 ${
                              theme === 'dark' 
                                ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500' 
                                : 'bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border ${
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
                            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border ${
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
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {clientProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? theme === 'dark' ? 'bg-white' : 'bg-gray-900'
                    : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Project Counter */}
        <div className="text-center mt-6 sm:mt-8">
          <p className={`text-xs sm:text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Selected Projects
          </p>
        </div>

        {/* Independent Projects Section */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className={`text-xl sm:text-2xl font-thin mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Independent Projects & Prototypes
            </h3>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Personal initiatives showcasing innovation and technical exploration
            </p>
          </div>

          {/* Independent Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {independentProjects.map((project) => (
              <div
                key={project.id}
                className={`p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Project Image */}
                <div className="mb-4 sm:mb-6 h-40 sm:h-48 overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Project Content */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className={`text-base sm:text-lg font-light ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h4>
                  
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded-full ${
                          theme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-300 border ${
                          theme === 'dark'
                            ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-gray-200'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
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
                        className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-300 border ${
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
