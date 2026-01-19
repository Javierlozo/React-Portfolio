"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt, faExternalLinkAlt, faBuilding, faCode, faGlobe } from "@fortawesome/free-solid-svg-icons";

// Import company logos
import querriLogo from "@/src/public/pictures/querri.png";
import gseayLogo from "@/src/public/pictures/gseay.png";
import lessLogo from "@/src/public/pictures/Less1.png";
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
      position: "Independent Consultant — Founder, IberiaTech Solutions",
      location: "Charleston, SC",
      duration: "2024 - Present",
      description: "As an independent consultant, I help businesses in the US and Spain expand their digital presence with AI-enabled, bilingual solutions. Through IberiaTech Solutions, I deliver responsive websites and scalable cloud applications that help small businesses validate new ideas quickly and reach broader markets.",
      achievements: [
        "Managed full project lifecycle with small business clients, from requirements to deployment",
        "Advised clients on bilingual strategy and AI integration, shaping digital roadmaps",
        "Delivered production websites and prototypes, ensuring timely launches and measurable impact"
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
      duration: "Apr 2024 - Present",
      description: "Leading end-to-end development of web applications using Next.js 14, React, and AWS services. Collaborating with external engineering teams and conducting code reviews while delivering scalable solutions.",
      achievements: [
        "Delivered React components and AWS Cognito integration for AfricaNXT (mentorship platform, ~1,200 users)",
        "Applied security-aware practices in authentication, authorization, and cloud configuration aligned with industry best practices",
        "Coordinated sprints and code reviews with cross-functional teams to ensure consistent delivery",
        "Partnered with design and product stakeholders to align technical work with business goals",
        "Built database infrastructure using Squid AI, supporting scalable data flows",
        "Mentored teammates on modern React and AWS practices, improving team velocity",
        "Optimized performance, reducing load times by 30% and onboarding friction by 60%"
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
      duration: "Aug 2023 - Apr 2024",
      description: "Delivered multiple projects focusing on Svelte and front-end development. Built Querri's website using HubSpot and custom code extensions.",
      achievements: [
        "Built custom HubSpot CMS solutions that increased content publishing efficiency by 50%",
        "Optimized website performance, improving page load speeds by 35%",
        "Implemented responsive design patterns that increased mobile engagement by 40%",
        "Developed custom components that reduced development time by 3 weeks per project"
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
      duration: "Jul 2023 - Aug 2023",
      description: "Partnered with CEO to transform business vision into technical solutions.",
      achievements: [
        "Translated CEO's vision into technical solutions on the company's web platform",
        "Built responsive e-commerce platforms that increased mobile sales by 45%",
        "Implemented SEO optimizations that improved organic traffic by 60%",
        "Created custom product recommendation systems that boosted average order value by 25%",
        "Optimized checkout processes, reducing cart abandonment by 30%"
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
      duration: "Jul 2021 - Jun 2023",
      description: "Progressive role from Software Engineer I to Software Engineer II, focusing on enhancing client productivity and driving company profitability through custom solutions and full-stack development.",
      achievements: [
        "Successfully delivered software development projects, driving a 10% increase in company's Q1 and Q2 profit in 2023",
        "Mentored junior developers, providing technical guidance and accelerating onboarding",
        "Acted as a bridge between development and leadership teams, aligning deliverables with business objectives",
        "Developed custom Chrome extensions integrated with CRM tools and databases using RESTful APIs and OAuth2.0",
        "Built and maintained applications using Angular, NestJs, MongoDB, and Azure Cosmos DB",
        "Created and maintained custom Azure Functions, implementing cost-effective solutions with various triggers"
      ],
      technologies: ["Angular", "NestJs", "MongoDB", "Azure Cosmos DB", "Azure Functions", "TypeScript", "Node.js", "REST APIs", "OAuth2.0"],
      companyUrl: "https://www.interloopdata.com/",
      current: false,
      logo: interloopLogo,
      industry: "Data Analytics & Business Intelligence"
    }
  ];

  return (
    <section id="experience" className={`py-16 sm:py-20 w-full ${theme === 'dark' ? 'bg-[#0B1220]' : 'bg-[#FAFAF9]'}`}>
      <div className="w-full px-3 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 relative z-10">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Experience
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            My journey in web development and technology
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Timeline Line - Hidden on mobile */}
          <div className={`absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 hidden sm:block ${
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
          <div className="space-y-12">
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
                  {exp.duration.includes(' - ') 
                    ? exp.duration.split(' - ')[0].split(' ').pop()
                    : exp.duration.split(' ')[0]
                  }
                </div>
                
                {/* Timeline Dot - Hidden on mobile */}
                <div className={`absolute left-2 sm:left-6 w-4 h-4 rounded-full border-4 hidden sm:block ${
                  exp.current 
                    ? 'bg-blue-500 border-blue-500' 
                    : theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-white border-gray-400'
                }`}></div>

                {/* Content Card */}
                <div className={`ml-0 sm:ml-16 p-4 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl w-full max-w-5xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-start gap-4">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        {exp.logo ? (
                          <div className="w-16 h-16 relative">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} company logo`}
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
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
