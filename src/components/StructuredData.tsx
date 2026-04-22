export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luis Javier Lozoya",
    "jobTitle": "Security-Focused Software Engineer",
    "description": "GIAC GSEC + GFACT certified software engineer with 5+ years building and securing production web apps with React, Next.js, and AWS. Focused on application security, DevSecOps, and cloud security.",
    "url": "https://www.luislozoya.com",
    "image": "https://www.luislozoya.com/opengraph-image",
    "sameAs": [
      "https://github.com/Javierlozo",
      "https://www.linkedin.com/in/luisjlozoya",
      "https://twitter.com/javierlozo"
    ],
    "knowsAbout": [
      "Application Security",
      "AppSec",
      "DevSecOps",
      "Web Application Security",
      "Penetration Testing",
      "OWASP Top 10",
      "Cloud Security",
      "AWS Security",
      "Network Forensics",
      "Packet Analysis",
      "Incident Response",
      "Cybersecurity",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Node.js",
      "AWS"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Security Engineer",
      "description": "Building and securing production web applications and cloud infrastructure",
      "skills": [
        "Application Security",
        "DevSecOps",
        "Cloud Security",
        "AWS",
        "React",
        "Next.js",
        "TypeScript",
        "Python"
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
        "name": "GIAC Security Essentials (GSEC)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "GIAC (Global Information Assurance Certification)"
        }
      },
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
      "GIAC GSEC Certification",
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
