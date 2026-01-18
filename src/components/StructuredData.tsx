"use client";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luis Lozoya",
    "jobTitle": "Software Engineer | Security-Focused | AI-Enabled",
    "description": "Senior Full Stack Engineer with 5+ years experience. Expert in React, Next.js, AWS, Python, and AI integration.",
    "url": "https://javierlozo.github.io",
    "image": "https://javierlozo.github.io/og-image.png",
    "sameAs": [
      "https://github.com/Javierlozo",
      "https://linkedin.com/in/luis-lozoya",
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
      "Artificial Intelligence",
      "Web Development",
      "Cloud Architecture",
      "Supabase",
      "Svelte",
      "Squid AI",
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
        "name": "IberiaTech Solutions",
        "description": "Consulting brand delivering prototypes and proof-of-concepts for modern web and AI capabilities"
      },
      {
        "@type": "Organization", 
        "name": "Global Digital Needs Agency (GDNA)",
        "description": "Contributing to AWS-powered digital platforms and large-scale projects"
      }
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "SANS Cyber Academy",
        "description": "Cybersecurity education and training"
      }
    ],
    "award": [
      "Coursera Full Stack Development Certificate",
      "System Administration Certificate",
      "TryHackMe Cybersecurity Certifications"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
