"use client";
import React from "react";
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

  const experiences: Experience[] = [
    {
      id: 1,
      company: "IberiaTech Solutions",
      position: "Independent Consultant — Personal Brand",
      location: "Charleston, SC",
      duration: "2024 - Present",
      description: "Delivering independent projects and prototypes under my consulting brand. Focus on bilingual websites, AI features, and modern web solutions for small businesses in the US and Spain.",
      achievements: [
        "Built proof-of-concept websites with full English/Spanish translation",
        "Developed AI-powered chatbot prototypes that cut manual support tasks",
        "Created custom applications showcasing modern cloud architecture",
        "Designed responsive web solutions demonstrating latest development practices"
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
      description: "Leading end-to-end development of web applications using Next.js 14, React, and AWS services.",
      achievements: [
        "Delivered React components and AWS Cognito integration for AfricaNXT (in-progress mentorship platform), supporting ~1,200 users",
        "Optimized React components, improving user onboarding experiences by 60%",
        "Implemented AWS Cognito authentication, reducing login issues by 45%",
        "Delivered production-ready websites ahead of schedule",
        "Enhanced application performance, reducing load times by 30%",
        "Managed project workflows and implemented full-stack solutions with Supabase"
      ],
      technologies: ["React", "AWS CDK", "Cognito", "TypeScript", "Next.js", "AWS Amplify", "Supabase", "Python", "Squid AI"],
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
        "Developed custom Chrome extensions integrated with CRM tools and databases using RESTful APIs and OAuth2.0",
        "Built and maintained applications using Angular, NestJs, MongoDB, and Azure Cosmos DB",
        "Created and maintained custom Azure Functions, implementing cost-effective solutions with various triggers",
        "Mentored new junior software developers, providing guidance and technical leadership"
      ],
      technologies: ["Angular", "NestJs", "MongoDB", "Azure Cosmos DB", "Azure Functions", "React", "TypeScript", "Node.js", "REST APIs", "OAuth2.0"],
      companyUrl: "https://www.interloopdata.com/",
      current: false,
      logo: interloopLogo,
      industry: "Data Analytics & Business Intelligence"
    }
  ];

  return (
    <section id="experience" className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-thin mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Experience
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            My journey in web development and technology
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start">
                {/* Timeline Dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                  exp.current 
                    ? 'bg-blue-500 border-blue-500' 
                    : theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-white border-gray-400'
                }`}></div>

                {/* Content Card */}
                <div className={`ml-16 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl w-full max-w-5xl ${
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
                              alt={`${exp.company} logo`}
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
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-2xl font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {exp.position}
                          </h3>
                          {exp.current && (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-lg mb-2">
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

                    <div className={`text-sm mt-2 md:mt-0 ${
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
                  <p className={`text-lg mb-6 leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className={`text-lg font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className={`flex items-start gap-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                          }`}></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className={`text-lg font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
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
