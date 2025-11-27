"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faJs, faPython, faAws, faNodeJs, faHtml5, faCss3Alt, faGitAlt, faDocker } from "@fortawesome/free-brands-svg-icons";
import { faCode as faCodeSolid, faDatabase as faDatabaseSolid, faCloud as faCloudSolid, faShieldAlt, faMobile as faMobileSolid, faRocket as faRocketSolid, faCog, faChartBar, faLightbulb, faUsers, faClock, faCheckCircle, faBrain, faChartLine, faGlobe, faLock } from "@fortawesome/free-solid-svg-icons";

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  description: string;
  skills: string[];
  color: string;
}

export default function SkillsModern() {
  const { theme } = useTheme();
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Intersection Observer for scroll-triggered animations - card by card reveal
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // More aggressive threshold for sequential reveal
      threshold: [0, 0.25, 0.5, 0.75, 1] // Multiple thresholds for smoother transitions
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-card-id');
        if (cardId && entry.isIntersecting && entry.intersectionRatio > 0.25) {
          setVisibleCards((prev) => {
            const newSet = new Set(prev);
            newSet.add(cardId);
            return newSet;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all category cards after a short delay to ensure refs are set
    const timeoutId = setTimeout(() => {
      Object.values(cardRefs.current).forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: faCodeSolid,
      description: "Modern, responsive user interfaces that deliver exceptional user experiences",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
      color: "blue"
    },
    {
      id: "backend",
      title: "Backend & APIs",
      icon: faDatabaseSolid,
      description: "Scalable server-side solutions and robust API development",
      skills: ["Node.js", "Python", "Express.js", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL"],
      color: "green"
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      icon: faCloudSolid,
      description: "AWS expertise and modern deployment strategies",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Serverless", "Lambda", "Amplify"],
      color: "purple"
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: faShieldAlt,
      description: "Enterprise-grade security and compliance implementations",
      skills: ["Cybersecurity", "Authentication", "Authorization", "SOC 2", "GDPR", "Data Protection"],
      color: "red"
    },
    {
      id: "mobile",
      title: "Mobile & Responsive",
      icon: faMobileSolid,
      description: "Cross-platform mobile solutions and responsive design",
      skills: ["React Native", "PWA", "Responsive Design", "Mobile-First", "iOS", "Android"],
      color: "orange"
    },
    {
      id: "ai",
      title: "AI & Machine Learning",
      icon: faRocketSolid,
      description: "AI-powered solutions and intelligent automation",
      skills: ["Machine Learning", "AI Integration", "LangChain", "OpenAI", "Prompt Engineering", "Natural Language Processing"],
      color: "indigo"
    }
  ];


  return (
    <section id="skills" className={`py-16 sm:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-0 relative z-10">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Skills & Expertise
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-4 sm:mb-0 pb-4 sm:pb-0 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Comprehensive technical expertise across modern web development, cloud infrastructure, and AI-powered solutions
          </p>
        </div>

        {/* All Skills Display - Cards Stacking on Top, Previous Fade Out */}
        <div className="relative -mt-8 sm:-mt-24">
          {skillCategories.map((category, index) => {
            const isVisible = visibleCards.has(category.id);
            const delay = 200;
            // Check if a later card is visible (this card should fade out)
            const hasLaterVisibleCard = skillCategories.slice(index + 1).some(cat => visibleCards.has(cat.id));
            // Higher z-index for cards that appear later (they stack on top)
            const zIndex = isVisible ? (index + 10) : (index + 1);
            
            return (
              <div
                key={category.id}
                ref={(el) => {
                  cardRefs.current[category.id] = el;
                }}
                data-card-id={category.id}
                className={`sticky top-24 sm:top-24 min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center transition-all duration-1000 ease-out mb-8 ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : hasLaterVisibleCard
                    ? 'opacity-0 translate-y-0 scale-95 pointer-events-none'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: isVisible ? `${delay}ms` : '0ms',
                  zIndex: zIndex
                }}
              >
                {/* Complete Category Card - Header + All Skills */}
                <div className={`flex flex-col p-8 sm:p-12 rounded-3xl border-2 transition-all duration-700 shadow-2xl backdrop-blur-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-800/95 border-gray-700 hover:border-gray-600 hover:shadow-2xl' 
                    : 'bg-white/95 border-gray-200 hover:border-gray-300 hover:shadow-2xl'
                } ${isVisible ? 'scale-100 shadow-2xl' : 'scale-95 shadow-none'}`}>
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div className={`p-4 sm:p-5 rounded-2xl ${
                      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                    } transition-all duration-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-90 -rotate-6'}`}>
                      <FontAwesomeIcon icon={category.icon} className="text-3xl sm:text-4xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl sm:text-2xl font-thin mb-3 sm:mb-4 transition-all duration-500 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      } ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                        {category.title}
                      </h3>
                      <p className={`text-sm sm:text-base md:text-lg transition-all duration-700 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      } ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{
                        transitionDelay: isVisible ? '300ms' : '0ms'
                      }}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid - All Skills in One Card */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {category.skills.map((skill) => {
                  const getSkillIcon = (skillName: string) => {
                    switch (skillName.toLowerCase()) {
                      case 'react': return faReact;
                      case 'javascript': return faJs;
                      case 'python': return faPython;
                      case 'aws': return faAws;
                      case 'node.js': return faNodeJs;
                      case 'html5': return faHtml5;
                      case 'css3': return faCss3Alt;
                      case 'docker': return faDocker;
                      case 'kubernetes': return faCog;
                      case 'git': return faGitAlt;
                      case 'machine learning': return faBrain;
                      case 'data analytics': return faChartLine;
                      case 'ai integration': return faLightbulb;
                      case 'authentication': return faLock;
                      case 'responsive design': return faGlobe;
                      case 'mobile-first': return faMobileSolid;
                      case 'ci/cd': return faCog;
                      case 'serverless': return faCloudSolid;
                      case 'rest apis': return faDatabaseSolid;
                      case 'graphql': return faCodeSolid;
                      case 'mongodb': return faDatabaseSolid;
                      case 'postgresql': return faDatabaseSolid;
                      case 'express.js': return faNodeJs;
                      case 'next.js': return faReact;
                      case 'typescript': return faCodeSolid;
                      case 'tailwind css': return faCss3Alt;
                      case 'react native': return faReact;
                      case 'pwa': return faMobileSolid;
                      case 'ios': return faMobileSolid;
                      case 'android': return faMobileSolid;
                      case 'langchain': return faBrain;
                      case 'openai': return faBrain;
                      case 'prompt engineering': return faLightbulb;
                      case 'natural language processing': return faBrain;
                      case 'cybersecurity': return faShieldAlt;
                      case 'authorization': return faLock;
                      case 'soc 2': return faCheckCircle;
                      case 'gdpr': return faShieldAlt;
                      case 'data protection': return faShieldAlt;
                      case 'lambda': return faCloudSolid;
                      case 'amplify': return faAws;
                      default: return faCodeSolid;
                    }
                  };

                  const skillIndex = category.skills.indexOf(skill);
                  const skillDelay = skillIndex * 80; // Increased delay for more sequential feel
                  const skillVisible = isVisible;
                  
                  return (
                    <div
                      key={skill}
                      className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 transition-all duration-700 ease-out ${
                        theme === 'dark' 
                          ? 'bg-gray-800/30 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 hover:scale-105' 
                          : 'bg-gray-50/50 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-105'
                      } ${
                        skillVisible 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-6 scale-90'
                      }`}
                      style={{
                        transitionDelay: skillVisible ? `${delay + skillDelay}ms` : '0ms'
                      }}
                    >
                      <div className={`transition-all duration-500 ${skillVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'} ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        <FontAwesomeIcon icon={getSkillIcon(skill)} className="text-lg sm:text-xl" />
                      </div>
                      <span className={`text-sm sm:text-base font-light ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {skill}
                      </span>
                    </div>
                  );
                })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlights Section - Card by Card */}
        <div 
          ref={(el) => {
            cardRefs.current['highlights'] = el;
          }}
          data-card-id="highlights"
          className={`mt-4 sm:mt-6 min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center p-8 sm:p-12 rounded-3xl transition-all duration-1000 ease-out ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          } ${
            visibleCards.has('highlights')
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          <h3 className={`text-xl sm:text-2xl font-thin text-center mb-12 sm:mb-16 transition-all duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          } ${
            visibleCards.has('highlights')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}>
            Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                icon: faUsers,
                title: "Client-Focused (IberiaTech Solutions)",
                content: [
                  "Built bilingual websites and AI features for US and Spanish small businesses.",
                  "Increased engagement by up to 40% with responsive, modern designs."
                ]
              },
              {
                icon: faCheckCircle,
                title: "Enterprise-Scale (GDNA)",
                content: [
                  "Contributed to AfricaNXT mentorship platform (~1,200 users).",
                  "Improved onboarding efficiency by 60% through optimized React components."
                ]
              },
              {
                icon: faLightbulb,
                title: "Career Growth",
                content: [
                  "Full-stack experience with React, Next.js, AWS, Python, and AI frameworks.",
                  "Proven results: faster load times (30%) and enhanced user experiences.",
                  "Expanding expertise through SANS Cyber Academy."
                ]
              }
            ].map((highlight, index) => {
              const highlightVisible = visibleCards.has('highlights');
              const highlightDelay = index * 200;
              
              return (
                <div
                  key={index}
                  className={`p-8 sm:p-10 rounded-2xl border-2 transition-all duration-700 ease-out shadow-lg ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'
                  } ${
                    highlightVisible
                      ? 'opacity-100 translate-y-0 scale-100 shadow-xl'
                      : 'opacity-0 translate-y-8 scale-90 shadow-none'
                  }`}
                  style={{
                    transitionDelay: highlightVisible ? `${highlightDelay}ms` : '0ms'
                  }}
                >
                  <div className={`flex items-center gap-3 mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FontAwesomeIcon icon={highlight.icon} className="text-xl" />
                    <h4 className={`text-lg font-light ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {highlight.title}
                    </h4>
                  </div>
                  <div className={`text-sm space-y-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {highlight.content.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
