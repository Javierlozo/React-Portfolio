export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luis Javier Lozoya",
    "jobTitle": "Full Stack Engineer - Security, Cloud, AI",
    "description": "Full Stack Engineer with 5+ years experience building production applications with React, Next.js, AWS, and Python. GIAC GFACT certified. Specializing in security-focused engineering and AI integration.",
    "url": "https://www.luislozoya.com",
    "image": "https://www.luislozoya.com/opengraph-image",
    "sameAs": [
      "https://github.com/Javierlozo",
      "https://www.linkedin.com/in/luisjlozoya",
      "https://twitter.com/javierlozo"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "AWS",
      "Node.js",
      "Cybersecurity",
      "Network Forensics",
      "Packet Analysis",
      "Cloud Security",
      "Artificial Intelligence",
      "Web Development",
      "Cloud Architecture",
      "Supabase",
      "LangChain",
      "OpenAI"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "description": "Building scalable web applications and AI-powered solutions",
      "skills": [
        "React",
        "Next.js",
        "AWS",
        "Python",
        "JavaScript",
        "TypeScript",
        "Node.js",
        "AI Integration"
      ]
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Global Digital Needs Agency (GDNA)",
        "description": "Contributing to AWS-powered digital platforms and large-scale projects"
      }
    ],
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "IE University",
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Segovia",
            "addressCountry": "ES"
          }
        }
      },
      {
        "@type": "EducationalOrganization",
        "name": "Purdue University Northwest",
        "description": "Cybersecurity Path - System Administration"
      },
      {
        "@type": "EducationalOrganization",
        "name": "JRS Coding School",
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Charleston",
            "addressRegion": "SC",
            "addressCountry": "US"
          }
        }
      },
      {
        "@type": "EducationalOrganization",
        "name": "SANS Cyber Academy",
        "description": "Cybersecurity education and training"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "GIAC Foundational Cybersecurity Technologies (GFACT)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "GIAC (Global Information Assurance Certification)"
        }
      }
    ],
    "award": [
      "GIAC GFACT Certification",
      "Coursera Full Stack Development Certificate",
      "System Administration Certificate",
      "TryHackMe Cybersecurity Certifications"
    ]
  };

  return (
    <script
      type="application/ld+json"
    >
      {JSON.stringify(structuredData)}
    </script>
  );
}
