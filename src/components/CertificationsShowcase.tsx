"use client";
import React, { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCertificate, faCalendarAlt, faTimes, faGraduationCap, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useCardTilt } from "../hooks/useCardTilt";

// Import certification images
import gsec from "@/src/public/certifications/GSEC.png";
import gfact from "@/src/public/certifications/GFACT.png";
import coursera from "@/src/public/certifications/Coursera.png";
import systemAdm from "@/src/public/certifications/System Adm.png";

// Import education logos
import pnwLogo from "@/src/public/pictures/pnw-logo.png";
import harborLogo from "@/src/public/pictures/harbor-logo.png";
import ieLogo from "@/src/public/pictures/ie-university.png";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: StaticImageData;
  verifyLink?: string;
  description: string;
  skills: string[];
}

function TiltCard({ children, className, onClick }: { children: React.ReactNode; className: string; onClick: () => void }) {
  const { ref, onMouseMove, onMouseLeave } = useCardTilt(3);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`${className} transition-transform duration-300 ease-out`}
    >
      {children}
    </div>
  );
}

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

interface Education {
  id: number;
  institution: string;
  degree: string;
  location: string;
  duration: string;
  description: string;
  logo: StaticImageData;
}

const EDUCATION: Education[] = [
  {
    id: 1,
    institution: "Purdue University Northwest",
    degree: "Cybersecurity Path - System Administration",
    location: "Online",
    duration: "Mar 2022 - May 2023",
    description: "Cybersecurity and system administration program covering security fundamentals, network protection, and infrastructure management.",
    logo: pnwLogo,
  },
  {
    id: 2,
    institution: "JRS Coding School",
    degree: "Full Stack Developer",
    location: "The Harbor Entrepreneur Center, Charleston, SC",
    duration: "Nov 2019 - Oct 2020",
    description: "Intensive full-stack development program. Career pivot from construction to software engineering. Landed first engineering role at Interloop within months of completion.",
    logo: harborLogo,
  },
  {
    id: 3,
    institution: "IE University",
    degree: "Arquitecto Tecnico (Bachelor's in Architectural Engineering)",
    location: "Segovia, Spain",
    duration: "2006 - 2012",
    description: "Technical architecture degree covering structural engineering, construction management, and building design. Final thesis: design and construction technical drawings for a hospital. Foundation for project management and analytical thinking that carried into software engineering.",
    logo: ieLogo,
  },
];

export default function CertificationsShowcase() {
  const { theme } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const { ref: gridRef, visible: gridVisible } = useReveal(0.1);
  const { ref: eduRef, visible: eduVisible } = useReveal(0.1);

  const certifications: Certification[] = [
    {
      id: 1,
      title: "GIAC Security Essentials (GSEC)",
      issuer: "SANS Institute",
      date: "April 2026",
      image: gsec,
      verifyLink: "https://www.credly.com/badges/a2483986-24fe-47ec-8c33-b4350fef966f",
      description: "Validates hands-on skills across network security, cryptography, Windows and Linux hardening, incident response, and cloud security fundamentals. Earned through the SANS SEC401 course as part of the SANS Cyber Academy scholarship.",
      skills: ["Network Security", "Cryptography", "Incident Response", "Windows Security", "Linux Security", "Cloud Security"]
    },
    {
      id: 2,
      title: "GIAC Foundational Cybersecurity Technologies (GFACT)",
      issuer: "SANS Institute",
      date: "January 2026",
      image: gfact,
      verifyLink: "https://www.credly.com/badges/e82ec125-f253-430a-9daa-b0146f3b056b",
      description: "Comprehensive certification validating foundational knowledge across networking, operating systems, cloud platforms, web technologies, and core security principles. Demonstrates expertise in cybersecurity fundamentals essential for secure software development.",
      skills: ["Cybersecurity", "Networking", "Operating Systems", "Cloud Security", "Web Technologies", "Security Principles"]
    },
    {
      id: 3,
      title: "Introduction to AI",
      issuer: "Google (via Coursera)",
      date: "2025",
      image: coursera,
      verifyLink: undefined,
      description: "Comprehensive program covering AI fundamentals and practical applications of artificial intelligence.",
      skills: ["Artificial Intelligence", "AI Applications", "Data Science"]
    },
    {
      id: 4,
      title: "Cybersecurity: System Administration Certificate Program",
      issuer: "Purdue University and Ivy Tech",
      date: "2023",
      image: systemAdm,
      verifyLink: undefined,
      description: "Comprehensive cybersecurity and system administration program covering security fundamentals, network protection, and infrastructure management.",
      skills: ["Cybersecurity", "System Administration", "Network Security", "Infrastructure", "Security Management"]
    },
  ];

  return (
    <section id="certifications" className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-[#0B1220]' : 'bg-[#FAFAF9]'}`}>
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4 sm:px-6 md:px-8">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Certifications & Education
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Industry certifications and academic foundation
          </p>
        </div>

        {/* Certifications: full viewport width, single row */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
            <TiltCard
              className={`group cursor-pointer min-w-0 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden ${
                cert.id === 1
                  ? theme === 'dark' ? 'ring-2 ring-amber-500/50' : 'ring-2 ring-amber-400/60'
                  : ''
              }`}
              onClick={() => setSelectedCert(cert)}
            >
              {/* Certificate Image */}
              <div className="relative h-32 sm:h-48 md:h-52 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={`${cert.title} professional certification`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Overlay Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                  <FontAwesomeIcon icon={faCertificate} className="mr-1" />
                  Verified
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className={`text-base sm:text-lg font-light mb-2 line-clamp-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {cert.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs sm:text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {cert.issuer}
                  </span>
                  <div className={`flex items-center gap-1 text-xs ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{cert.date}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className={`px-2 py-1 text-xs rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </TiltCard>
            </div>
          ))}
        </div>


        {/* Modal for Certificate Details */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <div
              className={`absolute inset-0 backdrop-blur-sm ${theme === 'dark' ? 'bg-black/80' : 'bg-black/40'}`}
              onClick={() => setSelectedCert(null)}
            />
            
            {/* Modal Content */}
            <div className={`relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-hidden rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-gray-200' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={faTimes} className="text-lg sm:text-xl" />
              </button>

              {/* Certificate Image */}
              <div className="relative h-48 sm:h-64">
                <Image
                  src={selectedCert.image}
                  alt={`${selectedCert.title} professional certification`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Certificate Details */}
              <div className="p-4 sm:p-8 overflow-y-auto max-h-[calc(95vh-12rem)] sm:max-h-[calc(90vh-16rem)]">
                <h3 className={`text-xl sm:text-2xl font-thin mb-3 sm:mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedCert.title}
                </h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <span className={`text-base sm:text-lg font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {selectedCert.issuer}
                  </span>
                  <div className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span className="text-sm sm:text-base">{selectedCert.date}</span>
                  </div>
                </div>

                <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {selectedCert.description}
                </p>

                {/* Skills */}
                <div className="mb-4 sm:mb-6">
                  <h4 className={`text-base sm:text-lg font-light mb-2 sm:mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Skills Covered:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verify Link */}
                {selectedCert.verifyLink && (
                  <a
                    href={selectedCert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 border w-full sm:w-auto ${
                      theme === 'dark'
                        ? 'border-blue-600 text-blue-400 hover:border-blue-500 hover:text-blue-300'
                        : 'border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700'
                    }`}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    <span>Verify Certificate</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        <div className="px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex-1 h-px ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`} />
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                />
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Education
                </span>
              </div>
              <div className={`flex-1 h-px ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`} />
            </div>

            <div ref={eduRef} className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <div
                  key={edu.id}
                  className={`flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border transition-all duration-600 ease-out ${
                    theme === "dark"
                      ? "bg-gray-800/50 border-gray-700/50 hover:border-gray-600/60"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                  style={{
                    opacity: eduVisible ? 1 : 0,
                    transform: eduVisible ? "translateY(0)" : "translateY(24px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl shrink-0 mt-0.5 bg-white p-1.5 shadow-sm border border-gray-100">
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <h4
                        className={`text-sm sm:text-base font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {edu.degree}
                      </h4>
                      <span
                        className={`text-xs whitespace-nowrap ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {edu.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          theme === "dark" ? "text-amber-400/80" : "text-amber-700"
                        }`}
                      >
                        {edu.institution}
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[9px]" />
                        {edu.location}
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
