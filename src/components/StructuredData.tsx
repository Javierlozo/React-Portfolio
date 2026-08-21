export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luis Javier Lozoya",
    "jobTitle": "Application Security Engineer",
    "description": "Application Security Engineer in Charleston, SC. GIAC GCIH + GSEC + GFACT certified. I ship llm-audit, an OWASP LLM Top 10 static analyzer for TypeScript and JavaScript, and secure React, Next.js, and AWS applications.",
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
      "LLM Security",
      "AI Security",
      "OWASP LLM Top 10",
      "Prompt Injection",
      "Static Analysis",
      "Semgrep",
      "DevSecOps",
      "Web Application Security",
      "Penetration Testing",
      "OWASP Top 10",
      "Cloud Security",
      "AWS Security",
      "AWS Cognito",
      "AWS IAM",
      "AWS Lambda",
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
        "name": "GIAC Certified Incident Handler (GCIH)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "GIAC (Global Information Assurance Certification)"
        }
      },
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
      "GIAC GCIH Certification",
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
