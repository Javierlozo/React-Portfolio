"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCertificate, faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

// Import certification images
import coursera from "@/src/public/certifications/Coursera.png";
import systemAdm from "@/src/public/certifications/System Adm.png";
import thm1 from "@/src/public/certifications/THM-LJHNPB9YI3.png";
import thm2 from "@/src/public/certifications/THM-TGJRJ0ZZXT.png";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: any;
  verifyLink?: string;
  description: string;
  skills: string[];
}

export default function CertificationsShowcase() {
  const { theme } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Introduction to AI",
      issuer: "Google (via Coursera)",
      date: "2025",
      image: coursera,
      verifyLink: "https://www.coursera.org/account/accomplishments/verify/ABC123",
      description: "Comprehensive program covering AI fundamentals, machine learning concepts, and practical applications of artificial intelligence.",
      skills: ["Artificial Intelligence", "Machine Learning", "AI Applications", "Data Science", "Neural Networks"]
    },
    {
      id: 2,
      title: "Cybersecurity - System Administration Certificate Program",
      issuer: "Purdue University and Ivy Tech",
      date: "2023",
      image: systemAdm,
      verifyLink: "https://www.coursera.org/account/accomplishments/verify/DEF456",
      description: "Comprehensive cybersecurity and system administration program covering security fundamentals, network protection, and infrastructure management.",
      skills: ["Cybersecurity", "System Administration", "Network Security", "Infrastructure", "Security Management"]
    },
    {
      id: 3,
      title: "Complete Beginner - TryHackMe",
      issuer: "TryHackMe",
      date: "2023",
      image: thm1,
      verifyLink: "https://tryhackme.com/certificate/LJHNPB9YI3",
      description: "Comprehensive cybersecurity fundamentals covering networking, web application security, and ethical hacking basics.",
      skills: ["Cybersecurity", "Networking", "Web Security", "Ethical Hacking", "Penetration Testing"]
    },
    {
      id: 4,
      title: "Pre Security - TryHackMe",
      issuer: "TryHackMe",
      date: "2023",
      image: thm2,
      verifyLink: "https://tryhackme.com/certificate/TGJRJ0ZZXT",
      description: "Pre-security training covering basic security concepts, tools, and methodologies for cybersecurity professionals.",
      skills: ["Security Fundamentals", "Security Tools", "Vulnerability Assessment", "Risk Management", "Security Awareness"]
    }
  ];

  return (
    <section id="certifications" className={`py-16 sm:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
            theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
          }`}>
            Certifications
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Professional certifications and continuous learning achievements
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden`}
              onClick={() => setSelectedCert(cert)}
            >
              {/* Certificate Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
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
              <div className="p-4 sm:p-6">
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
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
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
            </div>
          ))}
        </div>


        {/* Modal for Certificate Details */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            />
            
            {/* Modal Content */}
            <div className={`relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden ${
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
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
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
      </div>
    </section>
  );
}
