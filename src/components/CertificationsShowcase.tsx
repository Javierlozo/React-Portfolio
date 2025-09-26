"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCertificate, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
    <section id="certifications" className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-thin mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Certifications
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Professional certifications and continuous learning achievements
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden`}
              onClick={() => setSelectedCert(cert)}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 bg-white/90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                  <FontAwesomeIcon icon={faCertificate} className="mr-1" />
                  Verified
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {cert.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-sm font-medium ${
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            />
            
            {/* Modal Content */}
            <div className={`relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xl" />
              </button>

              {/* Certificate Image */}
              <div className="relative h-64">
                <Image
                  src={selectedCert.image}
                  alt={`${selectedCert.title} certificate`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Certificate Details */}
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedCert.title}
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-lg font-medium ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {selectedCert.issuer}
                  </span>
                  <div className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{selectedCert.date}</span>
                  </div>
                </div>

                <p className={`text-lg mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {selectedCert.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Skills Covered:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-sm rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-200 text-gray-700'
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
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
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
