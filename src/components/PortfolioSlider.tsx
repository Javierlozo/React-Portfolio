"use client";
import React, { useState, useRef, useEffect } from "react";
import { headingRuleClass } from "./ui/SectionHeading";
import Section from "./ui/Section";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCode, faShieldHalved, faBriefcase } from "@fortawesome/free-solid-svg-icons";

import lessUSA from "@/src/assets/pictures/Less1.png";
import querri from "@/src/assets/pictures/querri1.png";
import cursorRules from "@/src/assets/pictures/cursor-rules.png";
import gseay from "@/src/assets/pictures/gseay.png";
import africanxt from "@/src/assets/pictures/app.africanxt.com_.png";
import iberiatech from "@/src/assets/pictures/iberiatech.png";
import web3 from "@/src/assets/pictures/langchain.png";
import shopEssentialshub from "@/src/assets/pictures/shopessentials.png";
import talentagent from "@/src/assets/pictures/TalentAgent.png";
import tinta from "@/src/assets/pictures/tinta.png";
import llmAudit from "@/src/assets/pictures/llm.png";
import aiPlayground from "@/src/assets/pictures/llm2.png";

function useReveal(threshold = 0.1) {
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

type Category = "security" | "other";

interface Project {
  id: number;
  category: Category;
  title: string;
  description: string;
  techStack: string[];
  image: StaticImageData;
  liveLink?: string;
  codeLink?: string;
  featured?: boolean;
  problem?: string;
  approach?: string;
  outcome?: string;
  role?: string;
  solution?: string;
  impact?: string;
  fullImage?: boolean;
}

const PROJECTS: Project[] = [
  // ===== Security =====
  {
    id: 19,
    category: "security",
    title: "llm-audit: Static Analysis for TypeScript LLM Apps (2026)",
    description:
      "OWASP LLM Top 10 at commit time. A Semgrep rule pack and npm CLI for catching the security failure modes AI coding assistants quietly introduce in TS/JS LLM applications. Live on npm.",
    techStack: ["Semgrep", "TypeScript", "Node.js", "OWASP LLM Top 10", "npm", "GitHub Actions"],
    image: llmAudit,
    liveLink: "/llm-audit",
    codeLink: "https://github.com/Javierlozo/llm-audit",
    featured: true,
    problem:
      "AI coding assistants reproduce a small, predictable set of security failures in LLM-integrated code: untrusted input flowing into the LLM `system` role, model output piped into `eval` or `dangerouslySetInnerHTML`, hardcoded API keys, JSON.parse on raw model output. Existing OSS SAST tooling (Semgrep `p/ai-best-practices`, agent-audit) is Python-only. The TypeScript and JavaScript ecosystem (Vercel AI SDK, Next.js Server Actions, OpenAI / Anthropic JS SDKs) was uncovered.",
    approach:
      "Built a focused Semgrep rule pack mapped explicitly to OWASP LLM Top 10, distributed via npm with a thin CLI that wires up a husky pre-commit hook and a GitHub Action workflow. Five rules in v0, each with vulnerable + safe fixtures, exercised by a test runner. Released under MIT.",
    outcome:
      "Live on npm at version 0.0.2 with a self-audit and full documentation. Caught a real LLM02 (Insecure Output Handling) bug in this very portfolio's recruiter-fit endpoint and shipped the fix in the same session.",
    role: "Solo build: rules, CLI, fixtures, distribution, docs, self-audit. v1 plan adds 7 more rules.",
  },
  {
    id: 20,
    category: "security",
    title: "LLM Red Team Lab: Prompt-Injection Research (2026, in progress)",
    description:
      "Reproducible red-team study of prompt-injection techniques mapped to OWASP LLM Top 10 and MITRE ATLAS, tested across frontier and budget-tier models via Vercel AI Gateway. Week 1 of 4 in flight; matrix UI, filters, transcripts, and a live sandbox land in weeks 2-4.",
    techStack: ["OWASP LLM Top 10", "MITRE ATLAS", "Vercel AI Gateway", "Next.js", "TypeScript"],
    image: aiPlayground,
    liveLink: "/ai-playground",
    featured: true,
    problem:
      "Production LLM features ship with informal defenses. Whether they hold up under structured attack chains is mostly anecdote, with no published, reproducible matrix of attack vs. model vs. mitigation in the open TS/JS ecosystem.",
    approach:
      "Catalog prompt-injection techniques mapped to OWASP LLM Top 10 and MITRE ATLAS. Run each attack across frontier and budget-tier models via Vercel AI Gateway. Pin model IDs and commit prompts to source so every result is reproducible. Each attack ships paired with a defensive mitigation.",
    outcome:
      "Week 1 scaffold live at /ai-playground with seeded attacks across multiple OWASP categories. Weeks 2-4 add the matrix UI, filters, slide-over transcripts, and a live sandbox.",
    role: "Solo security research: attack design, evaluation harness, mitigation patterns, writeups",
  },
  {
    id: 14,
    category: "other",
    title: "TalentAgent: AI Job-Fit Platform (2026)",
    description:
      "An LLM-integrated SaaS I built solo, end-to-end: paste any job description and get a 0-100 fit score with strengths, gaps, and an honest apply / don't-apply call in seconds.",
    techStack: ["Next.js 15", "OpenAI", "Supabase", "Stripe", "TypeScript", "Chrome Extension"],
    image: talentagent,
    codeLink: "https://github.com/Javierlozo/PortfolioHub",
    featured: true,
    problem:
      "Job seekers burn hours on applications that were never a realistic fit, and most 'fit' tools just keyword-match a resume against a posting instead of giving an honest read.",
    approach:
      "Built TalentAgent as a complete full-stack product: a Fit Check endpoint backed by OpenAI gpt-4o-mini, a job browser pulling Adzuna / RemoteOK / Arbeitnow with ghost-job detection, an AI portfolio agent that answers questions from an imported resume or GitHub profile, interview-prep generation, and a Chrome extension for checking fit directly on LinkedIn and Indeed. Supabase auth, per-user rate limiting, and Stripe billing scaffolding are wired in.",
    outcome:
      "A complete full-stack LLM product with the frontend deployed on Vercel. The planned next iteration applies the OWASP LLM Top 10 hardening patterns from my llm-audit project (input delimiting, output validation, server-side score clamps) to the Fit Check endpoint.",
    role: "Solo: design, full-stack development, LLM integration, Stripe, deployment.",
  },
  {
    id: 10,
    category: "security",
    title: "AfricaNXT: Global Mentorship Platform (via GDNA)",
    description:
      "Mentorship platform onboarding ~1,200 users. Built React UI components and the authentication flow with security-focused defaults.",
    techStack: ["AWS Cognito", "IAM", "Lambda", "React", "Next.js"],
    image: africanxt,
    liveLink: "https://build.africanxt.com/",
    featured: true,
    problem: "Mentorship platform needed secure, scalable onboarding for ~1,200 users.",
    solution:
      "React UI components and a Cognito-backed authentication flow with session handling and security headers. Input validation across 4 form types covering ~40 questions. Infrastructure provisioned with scoped IAM access controls.",
    impact: "60% improvement in onboarding efficiency. Secure registration and sign-in live in production.",
  },

  // ===== Other Work =====
  {
    id: 17,
    category: "other",
    title: "Tinta Gallery: Spanish Watercolor Gallery (2026)",
    description:
      "Bilingual online gallery for two Spanish watercolorists, bringing their work to US buyers. Custom i18n routing, locale-aware unit display (in/cm), and an inquiry pipeline through Gmail SMTP.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Framer Motion", "Turbopack"],
    image: tinta,
    liveLink: "https://tinta.gallery",
    featured: true,
    problem:
      "Two painters in Gijón, Spain (Juan Mieres and Rafael Lozoya) had a strong following at home but no presence in the US. They needed a bilingual gallery site that carried their voice for American buyers and routed inquiries reliably.",
    approach:
      "Custom i18n with /en and /es route segments and middleware locale detection (cookie, IP geo, Accept-Language). Dictionary-based content, localized titles, dimensions shown in inches for English and centimeters for Spanish. Contact form posts to a Nodemailer + Gmail SMTP route. Deployed on Vercel.",
    outcome:
      "Live bilingual gallery at tinta.gallery showing 8 originals priced $300-$450. Operates as a DBA under IberiaTech Solutions LLC.",
    role: "Solo build: concept, design, full-stack development, deployment",
  },
  {
    id: 8,
    category: "other",
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
    category: "other",
    title: "LESS USA: Digital Platform (via GDNA)",
    description:
      "Front-end performance and deployment work for a digital platform. 30% improvement on load-time metrics after the rebuild.",
    techStack: [],
    image: lessUSA,
    liveLink: "https://www.less-usa.com/",
    problem: "Existing site had slow load times and a rough user flow.",
    solution: "Front-end optimization paired with a migration to a managed cloud platform for build and deploy.",
    impact: "30% faster on platform performance metrics. Cleaner UX after the cleanup.",
  },
  {
    id: 6,
    category: "other",
    title: "Querri: Dynamic Analytics Platform (Contract Role)",
    description: "CMS and front-end performance work. Site speed up 35%, mobile engagement up 40%.",
    techStack: [],
    image: querri,
    liveLink: "https://querri.com/",
    problem: "Analytics platform site needed faster load times and better mobile engagement.",
    solution: "Custom CMS modules and templates, plus front-end performance work on assets and rendering.",
    impact: "Site speed improved by 35%; mobile engagement increased by 40%.",
  },
  {
    id: 13,
    category: "other",
    title: "ShopEssentialsHub: Honest Amazon Picks (2025)",
    description:
      "A thousand options on Amazon, one honest pick per category. Hand-tested gear across coffee, home, tech, and pets. No AI slop, no drop-ship clones, no fake stars.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: shopEssentialshub,
    liveLink: "https://www.shopessentialshub.com/",
    codeLink: "https://github.com/IberiaTech-Solutions/essentials-hub",
    featured: true,
    problem:
      "Amazon is flooded with AI-written reviews, drop-ship clones, and inflated 4-star ratings. Buyers waste time second-guessing every category.",
    approach:
      "Built a Next.js site organized by category (Home & Kitchen, Work & Tech, Life & Play, Health & Car) with one editor-picked product per slot. Weekly Team Picks surface the strongest finds. Affiliate links route through Amazon's program.",
    outcome:
      "Live at shopessentialshub.com with curated picks across four categories and a weekly featured shortlist. Affiliate model, no paid placements.",
    role: "Solo build: design, full-stack development, deployment (Vercel)",
  },
  {
    id: 11,
    category: "other",
    title: "IberiaTech: Bilingual Web Consultancy (2025)",
    description:
      "Solo consultancy out of Charleston, SC. Websites, online stores, and the occasional piece of software nobody else will sell off the shelf. Built in English and Spanish. Recent client: Tinta Gallery.",
    techStack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: iberiatech,
    liveLink: "https://www.iberiatechsolutions.com/",
    codeLink: "https://github.com/IberiaTech-Solutions/iberiatech",
    problem:
      "Small and mid-size clients (especially Spanish-speaking owners) get pushed into template-heavy agency builds with rotating account managers. They need bilingual sites that actually convert and a direct line to the person building them.",
    approach:
      "Solo consultancy with a consistent stack: Next.js, custom EN/ES routing where it makes sense, and Vercel deployment. The IberiaTech site itself uses locale detection, dark mode, and Framer Motion as the showcase build.",
    outcome:
      "Live at iberiatechsolutions.com with production client projects shipped, including Tinta Gallery.",
    role: "Solo consultancy: design, full-stack development, client relationships, deployment",
  },
  {
    id: 7,
    category: "other",
    title: "Cursor Rules Hub: AI Community Platform (2025)",
    description:
      "Community-driven platform for sharing and discovering AI behavior rules for Cursor Editor. Rule browsing, creation tools, and file-pattern matching.",
    techStack: ["Next.js 14", "Supabase", "TypeScript", "Tailwind CSS"],
    image: cursorRules,
    liveLink: "https://cursor-rules-virid.vercel.app/",
    codeLink: "https://github.com/Javierlozo/cursor_rules",
    problem:
      "Cursor users had no central place to find, share, or version rules. Everyone was reinventing the wheel in their own .cursorrules files.",
    approach:
      "Next.js app with Supabase for storage and auth. Rule CRUD, tagging, and file-pattern matching so rules surface based on the file you have open.",
    outcome: "Live community site for browsing and contributing Cursor rules.",
    role: "Full-stack development, database design, deployment",
  },
  {
    id: 3,
    category: "other",
    title: "YouTube GPT Creator (2024)",
    description:
      "AI-assisted automation for YouTube content workflows using Python and LangChain, reducing manual steps in scripting and planning.",
    techStack: ["Python", "LangChain"],
    image: web3,
    codeLink: "https://github.com/Javierlozo/langchain-autogpt",
    problem: "Content creators spend significant time on scripting, research, and planning before recording.",
    approach: "Python tool using LangChain to automate research and draft scripts from prompts.",
    outcome: "Roughly 40% reduction in manual effort for script and planning steps.",
    role: "Backend, AI integration, scripting/automation",
  },
];

export default function PortfolioSlider() {
  const [activeTab, setActiveTab] = useState<Category>("security");
  const { ref, visible } = useReveal();

  const filtered = PROJECTS.filter((p) => p.category === activeTab);
  const securityCount = PROJECTS.filter((p) => p.category === "security").length;
  const otherCount = PROJECTS.filter((p) => p.category === "other").length;

  return (
    <Section
      id="portfolio"
      container={false}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className={`${headingRuleClass} mb-4`}>
            Portfolio
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Selected work, organized by focus.
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          <button
            onClick={() => setActiveTab("security")}
            aria-pressed={activeTab === "security"}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "security"
                ? "bg-green-700 text-white dark:bg-green-500 dark:text-gray-900"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
            }`}
          >
            <FontAwesomeIcon icon={faShieldHalved} className="text-xs" />
            Security
            <span className={`text-xs ${activeTab === "security" ? "opacity-80" : "opacity-50"}`}>
              {securityCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("other")}
            aria-pressed={activeTab === "other"}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "other"
                ? "bg-green-700 text-white dark:bg-green-500 dark:text-gray-900"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
            }`}
          >
            <FontAwesomeIcon icon={faBriefcase} className="text-xs" />
            Full-Stack
            <span className={`text-xs ${activeTab === "other" ? "opacity-80" : "opacity-50"}`}>
              {otherCount}
            </span>
          </button>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-700 ease-out hover:shadow-xl bg-white dark:bg-gray-800"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
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

                {(project.problem || project.approach || project.solution || project.outcome || project.impact) && (
                  <div className="space-y-3 sm:space-y-4">
                    {project.problem && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          Problem
                        </span>
                        <p className="text-xs sm:text-sm leading-relaxed mt-1 text-gray-600 dark:text-gray-300">
                          {project.problem}
                        </p>
                      </div>
                    )}
                    {project.approach && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          Approach
                        </span>
                        <p className="text-xs sm:text-sm leading-relaxed mt-1 text-gray-600 dark:text-gray-300">
                          {project.approach}
                        </p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          Solution
                        </span>
                        <p className="text-xs sm:text-sm leading-relaxed mt-1 text-gray-600 dark:text-gray-300">
                          {project.solution}
                        </p>
                      </div>
                    )}
                    {project.outcome && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          Outcome
                        </span>
                        <p className="text-xs sm:text-sm leading-relaxed mt-1 text-gray-600 dark:text-gray-300">
                          {project.outcome}
                        </p>
                      </div>
                    )}
                    {project.impact && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          Impact
                        </span>
                        <p className="text-xs sm:text-sm leading-relaxed mt-1 text-gray-600 dark:text-gray-300">
                          {project.impact}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {project.techStack.length > 0 && (
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
                )}

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
    </Section>
  );
}
