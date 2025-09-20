"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

// Import certification images
import systemAdmin from "@/src/public/certifications/System Adm.png";
import thmCert1 from "@/src/public/certifications/THM-LJHNPB9YI3.png";
import thmCert2 from "@/src/public/certifications/THM-TGJRJ0ZZXT.png";
import courseraCert from "@/src/public/certifications/Coursera.png";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  description: string;
  image?: import("next/image").StaticImageData;
  pdfPath?: string;
  date?: string;
  credentialId?: string;
  verifyLink?: string;
}

export default function Certifications() {
  const { theme } = useTheme();

  const certifications: Certification[] = [
    {
      id: 4,
      title: "Google AI Essentials",
      issuer: "Coursera",
      description: "A self-paced course designed to help people across roles and industries get essential AI skills to boost productivity. Covers AI tools in the workplace, prompt engineering, responsible AI use, and staying current with AI trends.",
      image: courseraCert,
      date: "July 2025",
      credentialId: "8KXqmav9Spyl6pmr_QqcZg",
      verifyLink: "https://www.coursera.org/account/accomplishments/badge/8KXqmav9Spyl6pmr_QqcZg",
    },
    {
      id: 1,
      title: "Cybersecurity System Administration Certificate",
      issuer: "Purdue University Northwest",
      description: "Comprehensive cybersecurity program covering computer systems, networks, and cybersecurity fundamentals. Includes CompTIA A+, Security+, Linux Administration, Ethical Hacking, and Cloud System Administration.",
      image: systemAdmin,
      date: "2024",
      credentialId: "CS_SA",
      verifyLink: "https://www.pnw.edu/cybersecurity/cwct/training-paths/cybersecurity-system-administration-certificate-program/",
    },
    {
      id: 2,
      title: "TryHackMe Certification",
      issuer: "TryHackMe",
      description: "Advanced cybersecurity certification demonstrating expertise in penetration testing, vulnerability assessment, and security analysis.",
      image: thmCert1,
      date: "2024",
      credentialId: "THM-LJHNPB9YI3",
      verifyLink: "https://tryhackme.com/certificates/verify/THM-LJHNPB9YI3",
    },
    {
      id: 3,
      title: "TryHackMe Advanced Certification",
      issuer: "TryHackMe",
      description: "Specialized cybersecurity certification focusing on advanced attack techniques, incident response, and security architecture.",
      image: thmCert2,
      date: "2024",
      credentialId: "THM-TGJRJ0ZZXT",
      verifyLink: "https://tryhackme.com/certificates/verify/THM-TGJRJ0ZZXT",
    },
  ];

  return (
    <section
      id="certifications"
      className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 px-4">
          <h2 className={`text-4xl sm:text-5xl font-bold text-center mb-4 sm:mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Certifications
          </h2>
          <p className={`text-lg sm:text-xl mb-6 sm:mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Professional certifications that validate my expertise in cybersecurity and system administration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'
              } shadow-lg`}
            >
              <div className="relative h-64 overflow-hidden">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certification`}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className={`h-full flex items-center justify-center p-4 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div className="text-center">
                      <div className={`text-6xl mb-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        📄
                      </div>
                      <p className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        PDF Certificate
                      </p>
                    </div>
                  </div>
                )}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === 'dark' ? 'bg-black/60' : 'bg-gray-900/60'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className={`text-lg font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-white'
                      }`}>
                        {cert.title}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-200'
                      }`}>
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {cert.title}
                </h3>
                
                <p className={`text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {cert.issuer}
                </p>
                
                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {cert.description}
                </p>
                
                <div className="flex justify-between items-center">
                  {cert.date && (
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {cert.date}
                    </span>
                  )}
                  
                  <div className="flex gap-2">
                    {cert.verifyLink && (
                      <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium transition-colors ${
                          theme === 'dark'
                            ? 'text-blue-400 hover:text-blue-300'
                            : 'text-blue-600 hover:text-blue-500'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Verify →
                      </a>
                    )}
                    
                    {cert.pdfPath && (
                      <a
                        href={cert.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium transition-colors ${
                          theme === 'dark'
                            ? 'text-green-400 hover:text-green-300'
                            : 'text-green-600 hover:text-green-500'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View PDF →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
