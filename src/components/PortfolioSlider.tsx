"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faExternalLinkAlt, faCode } from "@fortawesome/free-solid-svg-icons";

// Import project images
import lessUSA from "@/src/public/pictures/Less1.png";
import querri from "@/src/public/pictures/querri1.png";
import cursorRules from "@/src/public/pictures/cursor-rules.png";
import gseay from "@/src/public/pictures/gseay.png";
import africanxt from "@/src/public/pictures/app.africanxt.com_.png";
import iberiatech from "@/src/public/pictures/www.iberiatechsolutions.com_ (1).png";
import portfolioHub from "@/src/public/pictures/portfoliohub.png";
import web1 from "@/src/public/pictures/rental.png";
import web2 from "@/src/public/pictures/weather.png";
import web3 from "@/src/public/pictures/langchain.png";
import web4 from "@/src/public/pictures/Screenshot (117).png";
import shopEssentialshub from "@/src/public/pictures/www.shopessentialshub.com_.png";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: any;
  liveLink?: string;
  codeLink?: string;
  featured?: boolean;
  /** Micro-case study: what challenge or need this addressed */
  problem?: string;
  /** Micro-case study: your approach (design, architecture, implementation) */
  approach?: string;
  /** Micro-case study: measurable or qualitative outcome */
  outcome?: string;
  /** Your role(s): e.g. "Design, backend, deployment" */
  role?: string;
  /** Case study: solution delivered (for client work) */
  solution?: string;
  /** Case study: measurable impact (for client work) */
  impact?: string;
}

export default function PortfolioSlider() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const clientProjects: Project[] = [
    {
      id: 10,
      title: "AfricaNXT: Global Mentorship Platform (via GDNA)",
      description: "Contributing to a mentorship platform currently onboarding ~1,200 users. Delivered React-based UI components and AWS Cognito authentication system to improve user registration and onboarding.",
      techStack: ["React 18", "AWS CDK", "Cognito", "Squid Cloud", "TypeScript", "SES"],
      image: africanxt,
      liveLink: "https://app.africanxt.com/unga",
      featured: true,
      problem: "Mentorship platform needed secure, scalable onboarding UX for ~1,200 users.",
      solution: "Built React UI components and AWS Cognito auth, with scalable backend and CDK-managed infrastructure.",
      impact: "Onboarding efficiency improved by 60%; secure registration and sign-in flow in production.",
    },
    {
      id: 8,
      title: "GSeay, Inc.: Construction Website (via GDNA)",
      description: "Delivered a responsive website with Next.js and AWS Amplify integration, completed 2 weeks ahead of schedule.",
      techStack: ["Next.js", "AWS Amplify", "TypeScript"],
      image: gseay,
      liveLink: "https://www.gseayinc.com/",
      problem: "Construction company needed a professional, responsive site with reliable hosting.",
      solution: "Built and deployed a Next.js site with AWS Amplify; clean layout and fast load times.",
      impact: "Delivered 2 weeks ahead of schedule; live site supports lead generation and brand presence.",
    },
    {
      id: 5,
      title: "LESS USA: Digital Platform (via GDNA)",
      description: "Enhanced platform performance by 30% and optimized user experience. Deployed with AWS Amplify.",
      techStack: ["Next.js", "AWS", "Amplify"],
      image: lessUSA,
      liveLink: "https://www.less-usa.com/",
      problem: "Platform needed better performance and a smoother user experience.",
      solution: "Optimized front-end and deployment; deployed with AWS Amplify for stability and speed.",
      impact: "Platform performance improved by 30%; clearer UX and faster page loads.",
    },
    {
      id: 6,
      title: "Querri: Dynamic Analytics Platform (Contract Role)",
      description: "Built custom HubSpot CMS solutions, improved site speed by 35%, and increased mobile engagement by 40%.",
      techStack: ["HubSpot CMS", "HTML", "CSS", "JavaScript"],
      image: querri,
      liveLink: "https://querri.com/",
      problem: "Analytics platform site needed faster load times and better mobile engagement.",
      solution: "Built custom HubSpot CMS solutions; optimized assets and front-end code.",
      impact: "Site speed improved by 35%; mobile engagement increased by 40%.",
    },
  ];

  const independentProjects: Project[] = [
    {
      id: 13,
      title: "ShopEssentialsHub: Curated Product Recommendation Platform",
      description: "A modern product curation platform with hand-picked Amazon products, reviews, category filtering, and Editor's Choice. Responsive, SEO-optimized, with affiliate integration.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      image: shopEssentialshub,
      liveLink: "https://www.shopessentialshub.com/",
      codeLink: "https://github.com/IberiaTech-Solutions/essentials-hub",
      featured: true,
      problem: "Users needed a trusted, curated list of products by category instead of browsing generic storefronts.",
      approach: "Designed and built the full stack: Next.js app, category and filter UX, Editor's Choice section, and Amazon affiliate integration with SEO and responsive layout.",
      outcome: "Live site with clear categories, fast load times, and monetization path. Demonstrates full-stack and product-thinking skills.",
      role: "Design, full-stack development, deployment (Vercel)",
    },
    {
      id: 12,
      title: "PortfolioHub: Professional Portfolio Platform",
      description: "A platform for discovering and connecting with professionals via their portfolios. Browse work, discover talent, and facilitate collaborations.",
      techStack: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "PLpgSQL"],
      image: portfolioHub,
      liveLink: "https://portfolio-hub-tawny.vercel.app/",
      codeLink: "https://github.com/IberiaTech-Solutions/PortfolioHub",
      featured: true,
      problem: "No single place to discover and compare portfolios; recruiters and teams spend time hunting across LinkedIn and personal sites.",
      approach: "Built end-to-end: auth and profiles in Supabase, PLpgSQL for queries, Next.js 15/React 19 front end. Focus on browse, search, and clear profile presentation.",
      outcome: "Working platform where users can browse and connect with professionals. Shows backend (Supabase, SQL), front end, and product design.",
      role: "Full-stack design, backend (Supabase/PLpgSQL), deployment",
    },
    {
      id: 11,
      title: "IberiaTech Solutions: Bilingual Business Website",
      description: "Modern bilingual (EN/ES) business site with AI features and responsive design. Increased engagement and expanded reach to Spanish-speaking audiences.",
      techStack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: iberiatech,
      liveLink: "https://www.iberiatechsolutions.com/",
      codeLink: "https://github.com/IberiaTech-Solutions/iberiatech",
      problem: "Business needed a professional, bilingual web presence and clearer way to showcase services and reach both English and Spanish markets.",
      approach: "Designed and implemented the site with i18n, responsive layout, and AI-powered sections. Used Framer Motion for polished interactions.",
      outcome: "~40% increase in engagement and expanded reach to Spanish-speaking audiences. Live site used for client acquisition.",
      role: "Design, front-end development, deployment",
    },
    {
      id: 7,
      title: "Cursor Rules Hub: AI Community Platform",
      description: "Community-driven platform for sharing and discovering AI behavior rules for Cursor Editor. Rule browsing, creation tools, and file-pattern matching.",
      techStack: ["Next.js 14", "Supabase", "TypeScript", "Tailwind CSS"],
      image: cursorRules,
      liveLink: "https://cursor-rules-virid.vercel.app/",
      codeLink: "https://github.com/Javierlozo/cursor_rules",
      problem: "Cursor users had no central place to find, share, or version rules; everyone was reinventing the wheel.",
      approach: "Built a Next.js app with Supabase for storage and auth. Implemented rule CRUD, tagging, and pattern-matching logic so rules can be suggested by file type.",
      outcome: "Live community site for browsing and contributing rules. Demonstrates full-stack work and understanding of developer tools.",
      role: "Full-stack development, database design, deployment",
    },
    {
      id: 3,
      title: "YouTube GPT Creator",
      description: "AI-assisted automation for YouTube content workflows using Python and LangChain, reducing manual steps in scripting and planning.",
      techStack: ["Python", "LangChain"],
      image: web3,
      codeLink: "https://github.com/Javierlozo/langchain-autogpt",
      problem: "Content creators spend significant time on scripting, research, and planning before recording.",
      approach: "Built a Python tool using LangChain to automate research and draft scripts from prompts. Integrated with common content workflows.",
      outcome: "Roughly 40% reduction in manual effort for script and planning steps. Demonstrates AI/LLM integration and automation.",
      role: "Backend, AI integration, scripting/automation",
    },
    {
      id: 1,
      title: "Rental App",
      description: "User-friendly sports equipment rental app for the Charleston, SC area with real-time availability and secure transactions.",
      techStack: ["React", "Node.js", "AWS"],
      image: web1,
      liveLink: "https://javierlozo.github.io/Rental-App/",
      codeLink: "https://github.com/Javierlozo/Rental-App",
      problem: "Local sports equipment rental lacked a simple way to see availability and book online.",
      approach: "Designed and built a React front end and Node.js backend with availability logic and a clear booking flow. Deployed for demo use.",
      outcome: "Working demo showing full-stack skills: React, Node, and deployment. Real-time availability and transaction flow.",
      role: "Design, front-end and backend, deployment",
    },
    {
      id: 2,
      title: "Weather App",
      description: "Dynamic weather app for real-time conditions across multiple cities, powered by a reliable REST API.",
      techStack: ["React", "REST API"],
      image: web2,
      liveLink: "https://javierlozo.github.io/WeatherCheck-API/",
      codeLink: "https://github.com/Javierlozo/WeatherCheck-API",
      problem: "Need a simple, fast way to check weather in multiple cities without switching sites or apps.",
      approach: "Built a React SPA that consumes a weather REST API, with city search and clear display of conditions and forecasts.",
      outcome: "Clean, functional demo of API integration and React state management. Live and open source.",
      role: "Front-end development, API integration, deployment",
    },
    {
      id: 4,
      title: "Old Portfolio Page",
      description: "Early portfolio site to showcase projects and skills, built with React and Node.js. Foundation for this professional site.",
      techStack: ["React", "Node.js"],
      image: web4,
      liveLink: "https://javierlozo.github.io/portfolio/",
      codeLink: "https://github.com/Javierlozo/portfolio",
      problem: "Needed a single place to present projects and skills to recruiters and clients.",
      approach: "Designed and built a React + Node.js portfolio with project cards and a simple, readable layout.",
      outcome: "Served as the basis for this portfolio and demonstrated early full-stack and deployment skills.",
      role: "Design, front-end and backend, deployment",
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

  // Magnetic hover effect for portfolio cards (desktop only, no reduced motion)
  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (y / rect.height) * -10; // Max 10 degrees
    const rotateY = (x / rect.width) * 10;
    
    setCardPosition({
      x: x * 0.1,
      y: y * 0.1,
      rotateX,
      rotateY
    });
  };

  const handleCardMouseLeave = () => {
    if (isTouchDevice || prefersReducedMotion) return;
    setCardPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <section id="portfolio" className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-[#0B1220]' : 'bg-[#FAFAF9]'}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
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
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 p-4 sm:p-5 md:p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="text-center">
              <h4 className={`text-base sm:text-lg font-light mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Selected Work
              </h4>
              <p className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Client projects and independent initiatives
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
                Delivered measurable results: 30% faster load times to 60% higher engagement
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
          
          {/* Client Work Subheader */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xl sm:text-2xl font-thin mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Client Work
            </h3>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Professional projects via GDNA, Querri, Upstate Nutrition
            </p>
          </div>
        </div>

        {/* Main Slider */}
        <div className="relative">
          {/* Navigation Arrows - smaller on mobile, avoid overlap */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full border transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 backdrop-blur-sm text-white/80 hover:bg-gray-700/70 hover:text-white' 
                : 'bg-white/50 backdrop-blur-sm text-gray-900/80 hover:bg-gray-100/70 hover:text-gray-900'
            } shadow-lg`}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-base sm:text-xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className={`absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full border transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 backdrop-blur-sm text-white/80 hover:bg-gray-700/70 hover:text-white' 
                : 'bg-white/50 backdrop-blur-sm text-gray-900/80 hover:bg-gray-100/70 hover:text-gray-900'
            } shadow-lg`}
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-base sm:text-xl" />
          </button>

          {/* Project Display */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {clientProjects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div 
                    ref={index === currentIndex ? cardRef : null}
                    onMouseMove={index === currentIndex && !isTouchDevice && !prefersReducedMotion ? handleCardMouseMove : undefined}
                    onMouseLeave={index === currentIndex && !isTouchDevice && !prefersReducedMotion ? handleCardMouseLeave : undefined}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } rounded-2xl shadow-2xl transition-transform ease-out ${
                      isTouchDevice || prefersReducedMotion ? 'duration-0' : 'duration-300'
                    }`}
                    style={{
                      transform: (index === currentIndex && !isTouchDevice && !prefersReducedMotion)
                        ? `translate(${cardPosition.x}px, ${cardPosition.y}px) rotateX(${cardPosition.rotateX}deg) rotateY(${cardPosition.rotateY}deg)`
                        : 'none',
                      transformStyle: (isTouchDevice || prefersReducedMotion) ? 'flat' : 'preserve-3d',
                      perspective: (isTouchDevice || prefersReducedMotion) ? 'none' : '1000px'
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative">
                      <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-xl group">
                        <Image
                          src={project.image}
                          alt={`${project.title}, ${project.description}`}
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

                    {/* Project Info: Case study format */}
                    <div className="flex flex-col justify-center">
                      <h3 className={`text-xl sm:text-2xl font-thin mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>

                      {/* Case study: Problem / Solution / Impact */}
                      {(project.problem || project.solution || project.impact) && (
                        <div className={`space-y-3 mb-6 border-l-2 pl-4 ${
                          theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                        }`}>
                          {project.problem && (
                            <div>
                              <span className={`text-xs font-semibold uppercase tracking-wide ${
                                theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                              }`}>
                                Problem
                              </span>
                              <p className={`text-sm sm:text-base leading-relaxed mt-0.5 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {project.problem}
                              </p>
                            </div>
                          )}
                          {project.solution && (
                            <div>
                              <span className={`text-xs font-semibold uppercase tracking-wide ${
                                theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                              }`}>
                                Solution
                              </span>
                              <p className={`text-sm sm:text-base leading-relaxed mt-0.5 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {project.solution}
                              </p>
                            </div>
                          )}
                          {project.impact && (
                            <div>
                              <span className={`text-xs font-semibold uppercase tracking-wide ${
                                theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                              }`}>
                                Impact
                              </span>
                              <p className={`text-sm sm:text-base leading-relaxed mt-0.5 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {project.impact}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {!(project.problem || project.solution || project.impact) && (
                        <p className={`text-sm sm:text-base md:text-lg mb-6 leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {project.description}
                        </p>
                      )}

                      {/* Tech */}
                      <div className="mb-2">
                        <span className={`text-xs font-semibold uppercase tracking-wide ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Tech
                        </span>
                      </div>
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
              Independent Projects
            </h3>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Developer projects with Problem → Approach → Outcome. Code + live demos linked.
            </p>
          </div>

          {/* Independent Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {independentProjects.map((project) => (
              <div
                key={project.id}
                className={`p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Project Image */}
                <div className="mb-4 sm:mb-5 md:mb-6 h-36 sm:h-40 md:h-48 overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
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

                  {project.role && (
                    <p className={`text-xs font-medium uppercase tracking-wide ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Role: {project.role}
                    </p>
                  )}
                  
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Micro-case study: Problem / Approach / Outcome */}
                  {(project.problem || project.approach || project.outcome) && (
                    <div className={`space-y-2 text-xs sm:text-sm border-l-2 pl-3 ${
                      theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                    }`}>
                      {project.problem && (
                        <div>
                          <span className={`font-medium ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Problem: </span>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            {project.problem}
                          </span>
                        </div>
                      )}
                      {project.approach && (
                        <div>
                          <span className={`font-medium ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Approach: </span>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            {project.approach}
                          </span>
                        </div>
                      )}
                      {project.outcome && (
                        <div>
                          <span className={`font-medium ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Outcome: </span>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            {project.outcome}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

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
