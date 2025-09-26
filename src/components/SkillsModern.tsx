"use client";
import React, { useState } from "react";
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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Skills & Expertise
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Comprehensive technical expertise across modern web development, cloud infrastructure, and AI-powered solutions
          </p>
        </div>

        {/* All Skills Display */}
        <div className="space-y-12 sm:space-y-16">
          {skillCategories.map((category) => (
            <div key={category.id} className="space-y-6 sm:space-y-8">
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <FontAwesomeIcon icon={category.icon} className="text-2xl sm:text-3xl" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-thin ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm sm:text-base md:text-lg ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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

                  return (
                    <div
                      key={skill}
                      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-transparent border-gray-700 hover:border-gray-600' 
                          : 'bg-transparent border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        <FontAwesomeIcon icon={getSkillIcon(skill)} className="text-base sm:text-lg" />
                      </div>
                      <span className={`text-xs sm:text-sm font-light ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className={`mt-16 p-8 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <h3 className={`text-2xl font-thin text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              <div className={`flex items-center gap-3 mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <FontAwesomeIcon icon={faUsers} className="text-xl" />
                <h4 className={`text-lg font-light ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Client-Focused (IberiaTech Solutions)
                </h4>
              </div>
              <div className={`text-sm space-y-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>Built bilingual websites and AI features for US and Spanish small businesses.</p>
                <p>Increased engagement by up to 40% with responsive, modern designs.</p>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              <div className={`flex items-center gap-3 mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
                <h4 className={`text-lg font-light ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Enterprise-Scale (GDNA)
                </h4>
              </div>
              <div className={`text-sm space-y-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>Contributed to AfricaNXT mentorship platform (~1,200 users).</p>
                <p>Improved onboarding efficiency by 60% through optimized React components.</p>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-white'
            }`}>
              <div className={`flex items-center gap-3 mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <FontAwesomeIcon icon={faLightbulb} className="text-xl" />
                <h4 className={`text-lg font-light ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Career Growth
                </h4>
              </div>
              <div className={`text-sm space-y-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>Full-stack experience with React, Next.js, AWS, Python, and AI frameworks.</p>
                <p>Proven results: faster load times (30%) and enhanced user experiences.</p>
                <p>Expanding expertise through SANS Cyber Academy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
