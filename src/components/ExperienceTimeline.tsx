"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt, faExternalLinkAlt, faBuilding, faGlobe } from "@fortawesome/free-solid-svg-icons";

// Import company logos
import querriLogo from "@/src/public/pictures/querri.png";
import interloopLogo from "@/src/public/pictures/interloop.jpeg";
import upstateLogo from "@/src/public/pictures/upstate.jpg";
import gdnaLogo from "@/src/public/pictures/gdna.ico";
import itcLogo from "@/src/public/pictures/ITC.png";

interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  current?: boolean;
  logo?: any;
  industry?: string;
}

export default function ExperienceTimeline() {
  const { theme } = useTheme();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [lineProgress, setLineProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.2
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        if (entry.isIntersecting) {
          setVisibleCards((prev) => new Set(prev).add(index));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Timeline line progress animation (skip if reduced motion)
    const updateLineProgress = () => {
      if (prefersReducedMotion || !timelineRef.current) {
        setLineProgress(1); // Show full line immediately
        return;
      }
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const timelineTop = timelineRect.top + scrollTop;
      const timelineHeight = timelineRect.height;
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (scrollTop + viewportHeight - timelineTop) / timelineHeight
      ));
      setLineProgress(scrollProgress);
    };

    window.addEventListener('scroll', updateLineProgress, { passive: true });
    updateLineProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateLineProgress);
    };
  }, [prefersReducedMotion]);

  const experiences: Experience[] = [
    {
      id: 1,
      company: "IberiaTech Solutions",
      position: "Founder & Lead Engineer",
      location: "Charleston, SC",
      duration: "2024 to Present",
      description: "Founded a consulting practice serving small businesses in the US and Spain. Deliver production web applications, bilingual platforms, and AI-enabled features end-to-end, from scoping to deployment.",
      achievements: [
        "Built and launched iberiatechsolutions.com (bilingual EN/ES) and shopessentialshub.com, both live and generating traffic",
        "Delivered Next.js + AWS prototypes for clients, cutting time-to-market from months to weeks",
        "Integrated AI features (LLM-powered content, recommendation logic) into client deliverables"
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AWS", "Node.js"],
      companyUrl: "https://www.iberiatechsolutions.com/",
      current: true,
      logo: itcLogo,
      industry: "Web Development & AI Solutions"
    },
    {
      id: 2,
      company: "GDNA",
      position: "Software Engineer (Contract)",
      location: "Mount Pleasant, SC",
      duration: "Apr 2024 to Present",
      description: "Building and shipping web applications across multiple GDNA client engagements, and performing security audits on client infrastructure. Working with Next.js, React, AWS, and Python.",
      achievements: [
        "Delivered production apps for multiple clients: AfricaNXT (~1,200-user mentorship platform), GSeay Inc. (construction site delivered 2 weeks early), and LESS USA (performance optimization)",
        "Built AWS Cognito authentication and React UI components for AfricaNXT, reducing onboarding friction by 60%",
        "Conducted security audits for client applications: reviewed auth flows, cloud configurations, and dependency vulnerabilities",
        "Optimized front-end performance across client sites, reducing load times by 30%",
        "Built database infrastructure using Squid AI and mentored teammates on React and AWS practices"
      ],
      technologies: ["React", "AWS CDK", "Cognito", "TypeScript", "Next.js", "AWS Amplify", "Supabase", "Python", "Squid AI"],
      companyUrl: "https://gdna.io/",
      current: true,
      logo: gdnaLogo,
      industry: "AWS & Cloud Solutions"
    },
    {
      id: 3,
      company: "Querri",
      position: "Software Engineer (Contract)",
      location: "Mount Pleasant, SC",
      duration: "Aug 2023 to Apr 2024",
      description: "Built and maintained Querri's marketing site and internal tools using HubSpot CMS and Svelte.",
      achievements: [
        "Built custom HubSpot CMS modules and templates, improving content publishing workflow",
        "Optimized site performance (image compression, lazy loading), improving page load speed by 35%",
        "Implemented responsive design patterns across the marketing site for mobile and tablet"
      ],
      technologies: ["Svelte", "HubSpot CMS", "HTML", "CSS", "JavaScript", "FusionAuth", "AWS"],
      companyUrl: "https://querri.com/",
      current: false,
      logo: querriLogo,
      industry: "Data Analytics & Business Intelligence"
    },
    {
      id: 4,
      company: "Upstate Nutrition",
      position: "Software Engineer (Contract)",
      location: "Remote",
      duration: "Jul 2023 to Aug 2023",
      description: "Short-term engagement to redesign and optimize the company's Shopify storefront.",
      achievements: [
        "Rebuilt the Shopify storefront with responsive Liquid templates and improved mobile UX",
        "Implemented on-page SEO optimizations (meta tags, structured data, image compression)",
        "Streamlined the checkout flow to reduce friction for mobile shoppers"
      ],
      technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "SEO", "Analytics"],
      current: false,
      logo: upstateLogo,
      industry: "E-commerce & Wellness"
    },
    {
      id: 5,
      company: "Interloop",
      position: "Software Engineer",
      location: "Charleston, SC",
      duration: "Jul 2021 to Jun 2023",
      description: "Promoted from Software Engineer I to II. Full-stack development on Angular/NestJs stack with Azure cloud services.",
      achievements: [
        "Built custom Chrome extensions integrated with CRM tools using RESTful APIs and OAuth 2.0",
        "Developed and maintained full-stack features using Angular, NestJs, MongoDB, and Azure Cosmos DB",
        "Created Azure Functions with various triggers, reducing infrastructure costs for client workloads",
        "Mentored junior developers and coordinated between development and leadership teams"
      ],
      technologies: ["Angular", "NestJs", "MongoDB", "Azure Cosmos DB", "Azure Functions", "TypeScript", "Node.js", "REST APIs", "OAuth2.0"],
      companyUrl: "https://www.interloopdata.com/",
      current: false,
      logo: interloopLogo,
      industry: "Data Analytics & Business Intelligence"
    }
  ];

  return (
    <section id="experience" className={`py-12 sm:py-16 md:py-20 w-full ${theme === 'dark' ? 'bg-[#0B1220]' : 'bg-[#FAFAF9]'}`}>
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 relative z-10">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Experience
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            5+ years across startups, agencies, and independent consulting
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Timeline Line - Hidden on mobile, visible from tablet */}
          <div className={`absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 hidden sm:block ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}>
            {/* Animated progress line */}
            <div 
              className={`absolute top-0 left-0 w-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-gradient-to-b from-blue-500 to-cyan-500' : 'bg-gradient-to-b from-blue-600 to-cyan-600'
              }`}
              style={{ 
                height: `${lineProgress * 100}%`,
                boxShadow: `0 0 10px ${theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.5)'}`
              }}
            />
          </div>

          {/* Experience Items */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                ref={(el) => { cardRefs.current[index] = el; }}
                data-index={index}
                className={`relative flex items-start transition-all ease-out ${
                  prefersReducedMotion ? 'duration-0' : 'duration-500 sm:duration-700'
                } ${
                  visibleCards.has(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4 sm:translate-x-8'
                }`}
                style={{ 
                  transitionDelay: prefersReducedMotion || !visibleCards.has(index) ? '0ms' : `${index * 100}ms`
                }}
              >
                {/* Year Label - Hidden on mobile */}
                <div className={`absolute -left-2 sm:-left-2 top-6 text-xs font-light tracking-widest hidden sm:block ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {exp.duration.includes(' to ')
                    ? exp.duration.split(' to ')[0].split(' ').pop()
                    : exp.duration.split(' ')[0]
                  }
                </div>
                
                {/* Timeline Dot - Hidden on mobile */}
                <div className={`absolute left-2 sm:left-5 md:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 hidden sm:block ${
                  exp.current 
                    ? 'bg-blue-500 border-blue-500' 
                    : theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-white border-gray-400'
                }`}></div>

                {/* Content Card */}
                <div className={`ml-0 sm:ml-14 md:ml-16 p-3 sm:p-5 md:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl w-full max-w-5xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-start gap-4">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        {exp.logo ? (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} company logo`}
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <FontAwesomeIcon 
                              icon={faBuilding} 
                              className={`text-2xl ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`} 
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className={`text-lg sm:text-xl md:text-2xl font-light ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {exp.position}
                          </h3>
                          {exp.current && (
                            <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                              Current
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-base sm:text-lg mb-2">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-semibold hover:underline ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`}
                            >
                              {exp.company}
                              <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1 text-sm" />
                            </a>
                          ) : (
                            <span className={`font-semibold ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {exp.company}
                            </span>
                          )}
                        </div>

                        {exp.industry && (
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon 
                              icon={faGlobe} 
                              className={`text-sm ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                              }`} 
                            />
                            <span className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {exp.industry}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`text-xs sm:text-sm mt-2 md:mt-0 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm sm:text-base md:text-lg mb-6 leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className={`text-base sm:text-lg font-light mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className={`flex items-start gap-2 sm:gap-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-xs sm:text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className={`text-base sm:text-lg font-light mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                            theme === 'dark' 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
