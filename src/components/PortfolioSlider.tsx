"use client";
import React, { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCode } from "@fortawesome/free-solid-svg-icons";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Import project images
import lessUSA from "@/src/assets/pictures/Less1.png";
import querri from "@/src/assets/pictures/querri1.png";
import cursorRules from "@/src/assets/pictures/cursor-rules.png";
import gseay from "@/src/assets/pictures/gseay.png";
import africanxt from "@/src/assets/pictures/app.africanxt.com_.png";
import iberiatech from "@/src/assets/pictures/iberiatech.png";
import web3 from "@/src/assets/pictures/langchain.png";
import shopEssentialshub from "@/src/assets/pictures/shopessentials.png";
import talentagent from "@/src/assets/pictures/TalentAgent.png";
import coastalMillwork from "@/src/assets/pictures/coastal-millwork.png";
import nevaEstudio from "@/src/assets/pictures/neva.png";
import tinta from "@/src/assets/pictures/tinta.png";
import axis from "@/src/assets/pictures/axis.png";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: StaticImageData;
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
  /** Show the entire screenshot at the card's natural aspect ratio (no cropping) */
  fullImage?: boolean;
}

export default function PortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: clientRef, visible: clientVisible } = useReveal(0.1);
  const { ref: indyRef, visible: indyVisible } = useReveal(0.1);

  const clientProjects: Project[] = [
    {
      id: 10,
      title: "AfricaNXT: Global Mentorship Platform (via GDNA)",
      description: "Mentorship platform onboarding ~1,200 users. Built React UI components and the authentication flow.",
      techStack: [],
      image: africanxt,
      liveLink: "https://build.africanxt.com/",
      featured: true,
      problem: "Mentorship platform needed secure, scalable onboarding for ~1,200 users.",
      solution: "React UI components and a managed authentication flow. Session handling and input validation at the auth layer; infrastructure provisioned with least-privilege access controls.",
      impact: "60% improvement in onboarding efficiency. Secure registration and sign-in live in production.",
    },
    {
      id: 8,
      title: "GSeay, Inc.: Construction Website (via GDNA)",
      description: "Delivered a responsive website completed 2 weeks ahead of schedule.",
      techStack: [],
      image: gseay,
      liveLink: "https://www.gseayinc.com/",
      problem: "Construction company needed a professional, responsive site with reliable hosting.",
      solution: "Built and deployed a responsive site on a managed cloud platform. Clean layout and fast load times.",
      impact: "Delivered 2 weeks ahead of schedule; live site supports lead generation and brand presence.",
    },
    {
      id: 5,
      title: "LESS USA: Digital Platform (via GDNA)",
      description: "Front-end performance and deployment work for a digital platform. 30% improvement on load-time metrics after the rebuild.",
      techStack: [],
      image: lessUSA,
      liveLink: "https://www.less-usa.com/",
      problem: "Existing site had slow load times and a rough user flow.",
      solution: "Front-end optimization paired with a migration to a managed cloud platform for build and deploy.",
      impact: "30% faster on platform performance metrics. Cleaner UX after the cleanup.",
    },
    {
      id: 6,
      title: "Querri: Dynamic Analytics Platform (Contract Role)",
      description: "CMS and front-end performance work. Site speed up 35%, mobile engagement up 40%.",
      techStack: [],
      image: querri,
      liveLink: "https://querri.com/",
      problem: "Analytics platform site needed faster load times and better mobile engagement.",
      solution: "Custom CMS modules and templates, plus front-end performance work on assets and rendering.",
      impact: "Site speed improved by 35%; mobile engagement increased by 40%.",
    },
  ];

  const independentProjects: Project[] = [
    {
      id: 18,
      title: "Axis: Exit Planning SaaS for Financial Advisors (2026)",
      description: "Subscription platform that lets financial advisors initiate strategic exit planning conversations with business owner clients earlier in the relationship. $99/mo, no contracts, cancel anytime.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe"],
      image: axis,
      liveLink: "https://clarity-app-git-marketing-editorial-pass-iberia-tech-solutions.vercel.app/",
      codeLink: "https://github.com/IberiaTech-Solutions/clarity-app",
      featured: true,
      problem: "Financial advisors typically enter exit planning conversations late, after a sale becomes urgent. By then, other specialists have taken the seat at the table.",
      approach: "Multi-tenant SaaS in the clarity-app codebase. Each advisor gets a personalized assessment link to share with business owner clients. The assessment covers readiness, value gaps, and transferability risks. Advisors are notified on submission and review results in their dashboard to guide the next conversation.",
      outcome: "Subscription model at $99/mo with cancel-anytime terms. Pitch to advisors: get the exit-planning conversation started before someone else does.",
      role: "Technical co-founder alongside a business development partner. I lead product design, technical architecture, and full-stack development.",
    },
    {
      id: 17,
      title: "Tinta Gallery: Spanish Watercolor Gallery (2026)",
      description: "Bilingual online gallery for two Spanish watercolorists, bringing their work to US buyers. Custom i18n routing, locale-aware unit display (in/cm), and an inquiry pipeline through Gmail SMTP.",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Framer Motion", "Turbopack"],
      image: tinta,
      liveLink: "https://tinta.gallery",
      featured: true,
      problem: "Two painters in Gijón, Spain (Juan Mieres and Rafael Lozoya) had a strong following at home but no presence in the US. They needed a bilingual gallery site that carried their voice for American buyers and routed inquiries reliably.",
      approach: "Custom i18n with /en and /es route segments and middleware locale detection (cookie, IP geo, Accept-Language). Dictionary-based content, localized titles, dimensions shown in inches for English and centimeters for Spanish. Contact form posts to a Nodemailer + Gmail SMTP route. Deployed on Vercel.",
      outcome: "Live bilingual gallery at tinta.gallery showing 8 originals priced $300–$450. Operates as a DBA under IberiaTech Solutions LLC.",
      role: "Solo build: concept, design, full-stack development, deployment",
    },
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
      title: "ShopEssentialsHub: Honest Amazon Picks (2025)",
      description: "A thousand options on Amazon, one honest pick per category. Hand-tested gear across coffee, home, tech, and pets. No AI slop, no drop-ship clones, no fake stars.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      image: shopEssentialshub,
      liveLink: "https://www.shopessentialshub.com/",
      codeLink: "https://github.com/IberiaTech-Solutions/essentials-hub",
      featured: true,
      problem: "Amazon is flooded with AI-written reviews, drop-ship clones, and inflated 4-star ratings. Buyers waste time second-guessing every category.",
      approach: "Built a Next.js site organized by category (Home & Kitchen, Work & Tech, Life & Play, Health & Car) with one editor-picked product per slot. Weekly Team Picks surface the strongest finds. Affiliate links route through Amazon's program.",
      outcome: "Live at shopessentialshub.com with curated picks across four categories and a weekly featured shortlist. Affiliate model, no paid placements.",
      role: "Solo build: design, full-stack development, deployment (Vercel)",
    },
    {
      id: 11,
      title: "IberiaTech: Bilingual Web Consultancy (2025)",
      description: "Solo consultancy out of Charleston, SC. Websites, online stores, and the occasional piece of software nobody else will sell off the shelf. Built in English and Spanish. Recent clients: NEVA Estudio, Tinta Gallery, Coastal Millwork.",
      techStack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: iberiatech,
      liveLink: "https://www.iberiatechsolutions.com/",
      codeLink: "https://github.com/IberiaTech-Solutions/iberiatech",
      problem: "Small and mid-size clients (especially Spanish-speaking owners) get pushed into template-heavy agency builds with rotating account managers. They need bilingual sites that actually convert and a direct line to the person building them.",
      approach: "Solo consultancy with a consistent stack: Next.js, custom EN/ES routing where it makes sense, and Vercel deployment. The IberiaTech site itself uses locale detection, dark mode, and Framer Motion as the showcase build.",
      outcome: "Live at iberiatechsolutions.com with three production client projects shipped so far: NEVA Estudio, Tinta Gallery, and Coastal Millwork.",
      role: "Solo consultancy: design, full-stack development, client relationships, deployment",
    },
    {
      id: 7,
      title: "Cursor Rules Hub: AI Community Platform (2025)",
      description: "Community-driven platform for sharing and discovering AI behavior rules for Cursor Editor. Rule browsing, creation tools, and file-pattern matching.",
      techStack: ["Next.js 14", "Supabase", "TypeScript", "Tailwind CSS"],
      image: cursorRules,
      liveLink: "https://cursor-rules-virid.vercel.app/",
      codeLink: "https://github.com/Javierlozo/cursor_rules",
      problem: "Cursor users had no central place to find, share, or version rules. Everyone was reinventing the wheel in their own .cursorrules files.",
      approach: "Next.js app with Supabase for storage and auth. Rule CRUD, tagging, and file-pattern matching so rules surface based on the file you have open.",
      outcome: "Live community site for browsing and contributing Cursor rules.",
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
      approach: "Python tool using LangChain to automate research and draft scripts from prompts.",
      outcome: "Roughly 40% reduction in manual effort for script and planning steps.",
      role: "Backend, AI integration, scripting/automation",
    },
    {
      id: 16,
      title: "NEVA Estudio, Concept Redesign (2026)",
      description: "Unsolicited concept redesign for a bilingual (ES/EN) architecture studio. Image-led project gallery, service detail modals, contact form, and Framer Motion interactions. Not affiliated with or endorsed by NEVA Estudio.",
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "next-intl"],
      image: nevaEstudio,
      liveLink: "https://neva-estudio.vercel.app",
      codeLink: "https://github.com/IberiaTech-Solutions/neva-estudio",
      fullImage: true,
      problem: "Spec brief: a bilingual editorial site for a design-led architecture studio, organized around the project portfolio rather than template marketing copy.",
      approach: "Built a concept site with next-intl locale routing, image carousel gallery, service modals, and Framer Motion interactions.",
      outcome: "Working concept with full i18n flow, accessible gallery interactions, and a minimalist editorial aesthetic.",
      role: "Solo build: concept, design, full-stack development",
    },
    {
      id: 15,
      title: "Coastal Millwork & Supply, Concept Redesign (2025)",
      description: "Unsolicited concept redesign for a commercial interiors contractor. Project gallery, service detail pages, and local SEO patterns. Built with Next.js 16 and Tailwind CSS. Not affiliated with or endorsed by Coastal Millwork & Supply.",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
      image: coastalMillwork,
      liveLink: "https://coastal-millwork.vercel.app",
      codeLink: "https://github.com/IberiaTech-Solutions/coastal-millwork",
      problem: "Spec brief: a content-rich showcase for a services-based contractor, organized around actual project work rather than templated marketing copy.",
      approach: "Designed and built a concept site with an interactive project gallery, service pages, and SEO-friendly metadata.",
      outcome: "Working concept with an interactive project gallery, service detail pages, and SEO-tuned metadata.",
      role: "Solo build: concept, design, full-stack development",
    },
  ];

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto text-gray-900 border-gray-200 dark:text-white dark:border-gray-700">
            Portfolio
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-gray-600 dark:text-gray-300">
            Selected client and independent work with measurable outcomes
          </p>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-thin mb-4 text-gray-900 dark:text-white">
              Client Work
            </h3>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Delivered via GDNA, Querri, and direct engagements
            </p>
          </div>
        </div>

        <div
          ref={clientRef}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-0 rounded-2xl overflow-hidden border transition-all duration-700 ease-out border-gray-200 dark:border-gray-700"
          style={{
            opacity: clientVisible ? 1 : 0,
            transform: clientVisible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <nav className="bg-gray-50 dark:bg-gray-900 lg:border-r border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-col">
              {clientProjects.map((project, index) => {
                const isActive = index === currentIndex;
                const shortName = project.title.split(":")[0];
                return (
                  <button
                    key={project.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative text-left px-4 lg:px-6 py-4 lg:py-5 transition-colors duration-200 border-b last:border-b-0 border-gray-200 dark:border-gray-800 ${
                      isActive
                        ? 'bg-white text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-white/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-green-700 dark:bg-green-400 hidden lg:block" />
                    )}
                    <span className="text-sm font-medium block">{shortName}</span>
                    {project.techStack.length > 0 && (
                      <span className={`text-xs mt-0.5 block hidden lg:block ${
                        isActive
                          ? 'text-gray-500 dark:text-gray-300'
                          : 'text-gray-400 dark:text-gray-600'
                      }`}>
                        {project.techStack.slice(0, 3).join(" / ")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 lg:p-10">
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
                      <div className="absolute top-4 left-4 bg-green-700 text-white dark:bg-green-500 dark:text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-thin mb-5 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>

                  {(project.problem || project.solution || project.impact) && (
                    <div className="space-y-4 mb-6">
                      {project.problem && (
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">Problem</span>
                          <p className="text-sm sm:text-base leading-relaxed mt-1 text-gray-600 dark:text-gray-300">{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">Solution</span>
                          <p className="text-sm sm:text-base leading-relaxed mt-1 text-gray-600 dark:text-gray-300">{project.solution}</p>
                        </div>
                      )}
                      {project.impact && (
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">Impact</span>
                          <p className="text-sm sm:text-base leading-relaxed mt-1 text-gray-600 dark:text-gray-300">{project.impact}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!(project.problem || project.solution || project.impact) && (
                    <p className="text-sm sm:text-base mb-6 leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>
                  )}

                  {project.techStack.length > 0 && (
                    <div className="mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">Tech</span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full border bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                          >{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 text-sm transition-colors duration-200 border border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700 dark:border-blue-500/50 dark:text-blue-400 dark:hover:border-blue-400 dark:hover:text-blue-300"
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
                        className="flex items-center gap-2 px-5 py-2.5 text-sm transition-colors duration-200 border border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-200"
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
            <h3 className="text-xl sm:text-2xl font-thin mb-4 text-gray-900 dark:text-white">
              Independent Projects
            </h3>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Side projects and open-source work with live demos and source code
            </p>
          </div>

          <div ref={indyRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {independentProjects.map((project, i) => (
              <div
                key={project.id}
                className="p-4 sm:p-6 rounded-2xl shadow-lg transition-shadow duration-700 ease-out hover:shadow-xl bg-white dark:bg-gray-800"
                style={{
                  opacity: indyVisible ? 1 : 0,
                  transform: indyVisible ? "translateY(0)" : "translateY(28px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {/* Project Image */}
                <div
                  className={`mb-4 sm:mb-5 md:mb-6 overflow-hidden rounded-lg ${
                    project.fullImage ? "" : "h-36 sm:h-40 md:h-48"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    width={1600}
                    height={900}
                    className={
                      project.fullImage
                        ? "w-full h-auto"
                        : "w-full h-full object-cover object-top"
                    }
                  />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-base sm:text-lg font-light text-gray-900 dark:text-white">
                    {project.title}
                  </h4>

                  {project.role && (
                    <p className="text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
                      Role: {project.role}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                  {(project.problem || project.approach || project.outcome) && (
                    <div className="space-y-2 text-xs sm:text-sm">
                      {project.problem && (
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Problem: </span>
                          <span className="text-gray-600 dark:text-gray-300">{project.problem}</span>
                        </div>
                      )}
                      {project.approach && (
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Approach: </span>
                          <span className="text-gray-600 dark:text-gray-300">{project.approach}</span>
                        </div>
                      )}
                      {project.outcome && (
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Outcome: </span>
                          <span className="text-gray-600 dark:text-gray-300">{project.outcome}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors duration-300 border border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-200"
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
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors duration-300 border border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-200"
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
