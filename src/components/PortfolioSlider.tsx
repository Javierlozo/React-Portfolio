"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCode } from "@fortawesome/free-solid-svg-icons";

// Import project images
import lessUSA from "@/src/public/pictures/Less1.png";
import querri from "@/src/public/pictures/querri1.png";
import cursorRules from "@/src/public/pictures/cursor-rules.png";
import gseay from "@/src/public/pictures/gseay.png";
import africanxt from "@/src/public/pictures/app.africanxt.com_.png";
import iberiatech from "@/src/public/pictures/www.iberiatechsolutions.com_ (1).png";
import web3 from "@/src/public/pictures/langchain.png";
import shopEssentialshub from "@/src/public/pictures/www.shopessentialshub.com_.png";
import talentagent from "@/src/public/pictures/TalentAgent.png";
import coastalMillwork from "@/src/public/pictures/coastal-millwork.png";
import nevaEstudio from "@/src/public/pictures/neva.png";

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

  const clientProjects: Project[] = [
    {
      id: 16,
      title: "NEVA Estudio: Architecture Firm Website (via IberiaTech Solutions)",
      description: "Bilingual website for an architecture studio in Gijon, Asturias, Spain. Features a project gallery with image carousel, service modals, contact form, and smooth Framer Motion animations. Built with internationalization support for Spanish and English.",
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "next-intl"],
      image: nevaEstudio,
      liveLink: "https://neva-estudio.vercel.app",
      codeLink: "https://github.com/Javierlozo/neva-estudio",
      featured: true,
      problem: "Architecture firm needed a professional web presence showcasing their portfolio to attract residential and commercial clients in Asturias.",
      solution: "Built a bilingual (ES/EN) site with interactive project gallery, service detail modals, and a minimalist design reflecting the studio's architectural aesthetic.",
      impact: "Professional site live with full internationalization, smooth animations, and a project showcase that highlights 10+ years of architectural work.",
    },
    {
      id: 15,
      title: "Coastal Millwork & Supply: Commercial Interiors Website (via IberiaTech Solutions)",
      description: "Full website redesign for an award-winning, full-service commercial architectural interiors contractor in Summerville, SC. Built with Next.js 16, featuring an interactive project gallery, service rail maps, and optimized SEO for local and commercial search visibility.",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
      image: coastalMillwork,
      liveLink: "https://coastal-millwork.vercel.app",
      codeLink: "https://github.com/IberiaTech-Solutions/coastal-millwork",
      featured: true,
      problem: "Existing website was outdated and didn't reflect the company's award-winning portfolio or support lead generation.",
      solution: "Redesigned and rebuilt the site with Next.js for SEO and performance, showcasing notable projects, awards, and services with a modern, professional layout.",
      impact: "Modern site live with interactive project gallery, improved local SEO, and clear service presentation for commercial clients.",
    },
    {
      id: 10,
      title: "AfricaNXT: Global Mentorship Platform (via GDNA)",
      description: "Contributing to a mentorship platform currently onboarding ~1,200 users. Delivered React-based UI components and AWS Cognito authentication system to improve user registration and onboarding.",
      techStack: ["React 18", "AWS CDK", "Cognito", "Squid Cloud", "TypeScript", "SES"],
      image: africanxt,
      liveLink: "https://build.africanxt.com/",
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
      id: 14,
      title: "TalentAgent: AI Job Fit Assessment Platform (2026)",
      description: "Paste any job description and get an honest 0-100 fit score with strengths, gaps, and interview prep. Includes ghost job detection and a job board with AI scores.",
      techStack: ["Next.js 15", "Supabase", "OpenAI", "Stripe", "TypeScript", "Tailwind CSS"],
      image: talentagent,
      liveLink: "https://portfolio-hub-tawny.vercel.app/",
      featured: true,
      problem: "Job seekers waste hours applying to roles that aren't a good fit or are ghost postings.",
      approach: "Built a full-stack platform with OpenAI for fit scoring, Supabase for data and auth, Stripe for payments, and a job board with pre-scored listings.",
      outcome: "Live platform that scores fit in 10 seconds, detects ghost jobs, and gives honest 'Don't Apply' signals. Free to use.",
      role: "Solo builder: design, full-stack development, AI integration, payments, deployment",
    },
    {
      id: 13,
      title: "ShopEssentialsHub: Curated Product Recommendation Platform (2025)",
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
      id: 11,
      title: "IberiaTech Solutions: Bilingual Business Website (2025)",
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
      title: "Cursor Rules Hub: AI Community Platform (2025)",
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
      title: "YouTube GPT Creator (2024)",
      description: "AI-assisted automation for YouTube content workflows using Python and LangChain, reducing manual steps in scripting and planning.",
      techStack: ["Python", "LangChain"],
      image: web3,
      codeLink: "https://github.com/Javierlozo/langchain-autogpt",
      problem: "Content creators spend significant time on scripting, research, and planning before recording.",
      approach: "Built a Python tool using LangChain to automate research and draft scripts from prompts. Integrated with common content workflows.",
      outcome: "Roughly 40% reduction in manual effort for script and planning steps. Demonstrates AI/LLM integration and automation.",
      role: "Backend, AI integration, scripting/automation",
    },
  ];

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
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Selected client and independent work with measurable outcomes
          </p>

          {/* Client Work Subheader */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-xl sm:text-2xl font-thin mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Client Work
            </h3>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Delivered via GDNA, Querri, and direct engagements
            </p>
          </div>
        </div>

        {/* Split Screen: Left nav + Right detail */}
        <div className={`grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-0 rounded-2xl overflow-hidden border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Left Panel - Project List */}
          <nav className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} lg:border-r ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
              {clientProjects.map((project, index) => {
                const isActive = index === currentIndex;
                // Extract short name (before the colon)
                const shortName = project.title.split(":")[0];
                return (
                  <button
                    key={project.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative text-left px-4 lg:px-6 py-4 lg:py-5 transition-all duration-200 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink border-b last:border-b-0 ${
                      theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                    } ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-900'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                      } hidden lg:block`} />
                    )}
                    <span className="text-sm font-medium block">{shortName}</span>
                    <span className={`text-xs mt-0.5 block ${
                      isActive
                        ? theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                        : theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    } hidden lg:block`}>
                      {project.techStack.slice(0, 3).join(" / ")}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right Panel - Project Detail */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-5 sm:p-6 md:p-8 lg:p-10`}>
            {(() => {
              const project = clientProjects[currentIndex];
              return (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  {/* Large Image */}
                  <div className="relative w-full h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden rounded-xl mb-6 sm:mb-8">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                    />
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl sm:text-2xl font-thin mb-5 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>

                  {/* Case Study */}
                  {(project.problem || project.solution || project.impact) && (
                    <div className={`space-y-4 mb-6 border-l-2 pl-4 ${
                      theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                    }`}>
                      {project.problem && (
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${
                            theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                          }`}>Problem</span>
                          <p className={`text-sm sm:text-base leading-relaxed mt-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${
                            theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                          }`}>Solution</span>
                          <p className={`text-sm sm:text-base leading-relaxed mt-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{project.solution}</p>
                        </div>
                      )}
                      {project.impact && (
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${
                            theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                          }`}>Impact</span>
                          <p className={`text-sm sm:text-base leading-relaxed mt-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{project.impact}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!(project.problem || project.solution || project.impact) && (
                    <p className={`text-sm sm:text-base mb-6 leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>{project.description}</p>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    }`}>Tech</span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full border ${
                            theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 border-gray-600'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-5 py-2.5 text-sm transition-all duration-200 border ${
                          theme === 'dark'
                            ? 'border-blue-500/50 text-blue-400 hover:border-blue-400 hover:text-blue-300'
                            : 'border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700'
                        }`}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                        <span>View Live</span>
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-5 py-2.5 text-sm transition-all duration-200 border ${
                          theme === 'dark'
                            ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-gray-200'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
                        }`}
                      >
                        <FontAwesomeIcon icon={faCode} className="text-xs" />
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
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
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Side projects and open-source work with live demos and source code
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
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
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
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                            {project.problem}
                          </span>
                        </div>
                      )}
                      {project.approach && (
                        <div>
                          <span className={`font-medium ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Approach: </span>
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                            {project.approach}
                          </span>
                        </div>
                      )}
                      {project.outcome && (
                        <div>
                          <span className={`font-medium ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>Outcome: </span>
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
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
