// Deep context about Luis for AI system prompts and experience narratives

export const LUIS_SYSTEM_PROMPT = `You are an AI assistant representing Luis Javier Lozoya's professional portfolio at luislozoya.com. You answer questions about his experience, skills, projects, and qualifications. Be honest, specific, and conversational. If you don't know something, say so. Don't fabricate details.

## About Luis

Luis Javier Lozoya is a full-stack software engineer and cybersecurity professional based in Charleston, SC. Bilingual (English/Spanish), originally from Spain.

Luis came to the US in 2013 with an architectural engineering degree and a goal of becoming a construction project manager. He earned a CAPM certification and spent 6+ years in construction: from laborer to CNC operator, project manager, project design engineer, and estimator engineer at Coastal Millwork and Supply, where he completed 25+ commercial projects including Mt. Pleasant Town Hall, Volvo Manufacturing, and Google's Charleston office.

In 2019, curiosity about how computers communicate led him to study for CompTIA Network+ (studied but did not certify). That curiosity sparked a career pivot into software engineering. He completed JRS Coding School bootcamp and landed his first engineering role at Interloop in 2021. Since then he has built 5+ years of software engineering experience across startups, agencies, and independent projects.

## Professional Experience

### IberiaTech Solutions (Founder, 2024)
- Independent projects and web development under a personal brand
- Built and shipped iberiatechsolutions.com (bilingual EN/ES) and shopessentialshub.com
- Integrated AI features (LLM-powered content, recommendation logic) into projects
- Stack: Next.js, React, TypeScript, Tailwind CSS, AWS, Node.js

### GDNA (Software Engineer Contract, Apr 2024–Present)
- Started translating Figma designs into React/Next.js code, now owns full application architecture
- Architecting serverless AWS solutions: API Gateway, Lambda, S3, RDS (PostgreSQL), Cognito, IAM, Secrets Manager, Amplify
- Designing APIs, front-end architecture, and database schemas
- Heavy use of Lambda for serverless compute
- Leveraging AI tools (Claude) to accelerate development and problem-solving
- Running weekly client meetings to demo progress and gather feedback, plus internal team syncs
- Stack: AWS (API Gateway, Lambda, S3, RDS, Cognito, IAM, Secrets Manager, Amplify), React, TypeScript, Next.js, PostgreSQL, Supabase

### Querri (Software Engineer Contract, Aug 2023–Apr 2024)
- Built a client-facing project using Svelte and FusionAuth
- Modified and maintained Querri's HubSpot website with custom code throughout the contract
- Built custom HubSpot CMS modules and templates
- Stack: Svelte, HubSpot CMS, JavaScript, FusionAuth, AWS

### Upstate Nutrition (Software Engineer Contract, Jul–Aug 2023)
- Short-term contract to rebuild the Shopify storefront
- The engagement ended before completion
- Stack: Shopify, Liquid, JavaScript, CSS

### Interloop (Software Engineer, Jul 2021–Jun 2023)
- Promoted from Software Engineer I to II based on performance
- Built custom Chrome extensions integrated with CRM tools using RESTful APIs and OAuth 2.0
- Developed and maintained full-stack features using Angular, NestJs, MongoDB, and Azure Cosmos DB
- Created Azure Functions with various triggers, reducing infrastructure costs for client workloads
- Mentored junior developers and coordinated between development and leadership teams
- Stack: Angular, NestJs, MongoDB, Azure Cosmos DB, Azure Functions, TypeScript, Node.js, REST APIs, OAuth 2.0

## Certifications
- CompTIA Security+
- AWS Cloud Practitioner
- Google Cybersecurity Professional Certificate
- GIAC GFACT (2025)
- Purdue University System Administration Certificate (2023)
- CAPM (Certified Associate in Project Management, 2014)
- Currently studying for GIAC GSEC

## Cybersecurity Labs
- Completed hands-on security labs with detailed technical write-ups published on portfolio
- Lab 1.1: tcpdump Traffic Analysis: packet capture, .env probing detection, WordPress brute-force detection, DNS correlation
- Lab 1.2: Wireshark Packet Analysis: 628K packet PCAP analysis, protocol hierarchy, successful WordPress login reconstruction
- More labs in progress (AWS VPC Flow Logs, OWASP web app security)
- Platforms: TryHackMe, HackTheBox

## Technical Skills

### Strong (Daily Use)
- TypeScript / JavaScript (ES6+)
- React 18, Next.js 15 (App Router)
- Tailwind CSS, Responsive Design
- Node.js, Express
- AWS (API Gateway, Lambda, S3, RDS, Cognito, IAM, Secrets Manager, Amplify, CDK)
- Git, GitHub
- REST API Design
- Linux CLI, Bash scripting
- Security Fundamentals (OWASP, secure coding)

### Moderate (Project Experience)
- Python (scripting, automation, security tools)
- Angular (2 years at Interloop)
- Svelte (Querri project)
- Docker, containerization
- MongoDB, Azure Cosmos DB, PostgreSQL
- Supabase (auth, database: GDNA and TalentAgent)
- Figma (translating designs to code at GDNA)
- OpenAI API, LangChain
- Claude (daily development accelerator at GDNA)
- Stripe (payments integration in TalentAgent)
- Penetration testing tools (Burp Suite, Nmap, Wireshark, tcpdump)

### Learning / Gaps (Honest Assessment)
- Kubernetes / container orchestration (conceptual, not production)
- Terraform / IaC (exposure, not daily use)
- GraphQL (read about it, minimal hands-on)
- System design at scale (learning, not yet battle-tested)
- Mobile development (React Native awareness, no shipped apps)
- Machine learning / data science (basic understanding only)

## Key Projects
- luislozoya.com: This portfolio site. Next.js 15, React 18, Tailwind, TypeScript. Includes AI chat, security lab write-ups, and interactive experience timeline.
- TalentAgent: AI-powered job fit assessment platform. Paste any job description, get honest 0-100 fit score with strengths, gaps, and interview prep. Built with Next.js 15, Supabase, OpenAI, Stripe.
- IberiaTech Solutions website: Bilingual EN/ES business site for consulting practice
- ShopEssentialsHub: E-commerce platform

## Community Involvement
- Active in the Charleston tech community
- Won first place at HackOps 2024 hackathon (team HarthHaven)
- Judge at HarborHack 2024 (College of Charleston)
- Speaker at HarborHack 2025 panel, representing past CharlestonHacks winners
- Connected with CharlestonHacks, The Harbor Entrepreneur Center, and local tech community

## Communication Style
Luis is direct, honest about gaps, and values depth over buzzwords. He prefers showing work over claiming skills. Bilingual English/Spanish.

## Response Guidelines
- Be specific: cite actual companies, projects, tools, and outcomes
- Be honest: if Luis hasn't done something, say so clearly
- Be conversational: this is a portfolio chat, not a formal interview
- Keep responses concise: 2-4 paragraphs max unless asked for detail
- When asked about gaps, frame them as growth areas with a plan
- Mention the cybersecurity labs when relevant. They show hands-on security skills
`;

export interface ExperienceNarrative {
  companyId: number; // matches Experience.id in ExperienceTimeline
  situation: string;
  actions: string[];
  results: string[];
  lessonsLearned: string;
}

export const experienceNarratives: Record<number, ExperienceNarrative> = {
  1: {
    companyId: 1,
    situation:
      "After building experience across multiple contract roles, I wanted to ship my own projects. Started IberiaTech Solutions as a personal brand to explore AI integration, bilingual platforms, and e-commerce.",
    actions: [
      "Founded IberiaTech Solutions and built the brand from scratch",
      "Built and launched iberiatechsolutions.com with full bilingual EN/ES support",
      "Shipped shopessentialshub.com as an e-commerce platform",
      "Integrated AI-powered features (LLM content generation, recommendation logic) into projects",
      "Handled the full project lifecycle: design, architecture, implementation, deployment",
    ],
    results: [
      "Multiple live production sites shipped and running",
      "Hands-on experience with the full business side of software, not just the code",
      "Applied lessons from every previous role into a more complete engineering practice",
    ],
    lessonsLearned:
      "Building your own projects forces you to care about the full picture. Not just the code, but the design, the deployment, the domain setup, everything. It made me a better engineer because there's no one else to hand off the hard parts to.",
  },
  2: {
    companyId: 2,
    situation:
      "Started at GDNA translating Figma designs from the UI/UX designer into code using React, Next.js, and various backends (AWS, Supabase, Squid AI). The role evolved into owning full application builds, from architecture to client delivery.",
    actions: [
      "Early phase: turning Figma designs into production React/Next.js code across multiple client projects",
      "Current phase: architecting serverless AWS solutions (API Gateway, Lambda, S3, RDS, Cognito, IAM, Secrets Manager, Amplify)",
      "Designing APIs, front-end architecture, and database schemas",
      "Using Claude as a development accelerator for architecture decisions and problem-solving",
      "Running weekly client meetings to demo progress and gather feedback",
      "Participating in internal team syncs and contributing to design decisions",
    ],
    results: [
      "Grew from implementing designs to owning architecture, API design, and database design",
      "Deep hands-on AWS experience across a wide range of services",
      "Building the communication skills that come from presenting to clients weekly",
    ],
    lessonsLearned:
      "This role taught me that engineering is only half the job. The other half is communicating with clients, understanding what they actually need vs. what they say they need, and showing progress every week. I started turning Figma mockups into code, now I'm designing the APIs and databases myself. That growth happened because I kept pushing for more responsibility.",
  },
  3: {
    companyId: 3,
    situation:
      "Querri needed someone to build a client project using Svelte and also maintain their HubSpot website with custom code. Both Svelte and HubSpot CMS were new to me.",
    actions: [
      "Built a client-facing project using Svelte and FusionAuth for authentication",
      "Modified and maintained Querri's HubSpot website with custom code throughout the contract",
      "Built custom HubSpot CMS modules and templates",
      "Ramped up on both Svelte and HubSpot CMS quickly",
    ],
    results: [
      "Expanded toolkit beyond React/Angular to include Svelte and HubSpot CMS",
      "Demonstrated ability to pick up new frameworks and platforms fast",
      "Delivered consistently throughout the contract",
    ],
    lessonsLearned:
      "Contract work is all about ramp speed. You don't get months to learn the codebase. You need to deliver in weeks. That pressure made me much better at reading existing code and finding the fastest path to value. It also taught me that frameworks are just tools. The underlying patterns transfer.",
  },
  4: {
    companyId: 4,
    situation:
      "Short-term contract to rebuild Upstate Nutrition's Shopify storefront. The engagement ended before the project was completed.",
    actions: [
      "Started rebuilding the Shopify storefront with Liquid templates",
      "Worked within Shopify's ecosystem and e-commerce patterns",
    ],
    results: [
      "Gained exposure to Shopify development and Liquid templating",
    ],
    lessonsLearned:
      "Not every engagement works out. Sometimes projects end early for reasons outside your control. What matters is what you take from it and how you move forward.",
  },
  5: {
    companyId: 5,
    situation:
      "Joined Interloop as a junior Software Engineer (SE I) right after finishing JRS Coding School bootcamp. First full-time engineering role. The company built data analytics tools using Angular and NestJS on Azure cloud infrastructure.",
    actions: [
      "Built custom Chrome extensions integrated with CRM tools using RESTful APIs and OAuth 2.0",
      "Developed and maintained full-stack features across Angular frontend, NestJS backend, MongoDB and Azure Cosmos DB",
      "Created Azure Functions with various triggers, reducing infrastructure costs for client workloads",
      "Mentored junior developers who joined after me and coordinated between development and leadership teams",
      "Learned production engineering practices: code review, testing, CI/CD, incident response, on-call rotations",
    ],
    results: [
      "Promoted from SE I to SE II based on consistent delivery and technical growth",
      "2 years of continuous learning in a real team environment with code review and mentorship",
      "Built the foundation for enterprise-quality engineering practices that carried into every role since",
    ],
    lessonsLearned:
      "Interloop was where I went from 'I can code' to 'I can engineer.' The difference is everything around the code. How you test, how you deploy, how you handle things breaking in production, how you communicate trade-offs to non-technical stakeholders. That promotion wasn't about writing more code, it was about writing better code and lifting the team around me.",
  },
};

export interface SkillCategory {
  label: string;
  description: string;
  color: "emerald" | "amber" | "rose";
  skills: { name: string; detail: string }[];
}

export const skillsAssessment: SkillCategory[] = [
  {
    label: "Strong",
    description: "Daily use, production experience, can mentor others",
    color: "emerald",
    skills: [
      { name: "TypeScript / JavaScript", detail: "Primary language for 4+ years" },
      { name: "React & Next.js", detail: "App Router, SSR, streaming, server actions" },
      { name: "Tailwind CSS", detail: "Design systems, responsive, dark mode, animations" },
      { name: "Node.js & Express", detail: "REST APIs, middleware, auth flows" },
      { name: "AWS", detail: "API Gateway, Lambda, S3, RDS, Cognito, IAM, Secrets Manager, Amplify, CDK. Daily at GDNA" },
      { name: "Git & GitHub", detail: "Branching, PRs, CI/CD, code review" },
      { name: "Linux CLI", detail: "Daily driver, scripting, server admin" },
      { name: "Security Fundamentals", detail: "OWASP top 10, secure coding, security audits" },
    ],
  },
  {
    label: "Moderate",
    description: "Project experience, can deliver with some ramp-up",
    color: "amber",
    skills: [
      { name: "Python", detail: "Scripting, automation, security tools" },
      { name: "Angular", detail: "2 years production at Interloop" },
      { name: "Svelte", detail: "Built production features at Querri" },
      { name: "Docker", detail: "Containerization, compose, not orchestration" },
      { name: "MongoDB / Cosmos DB", detail: "Used daily at Interloop for 2 years" },
      { name: "Supabase", detail: "Auth, database, used at GDNA and TalentAgent" },
      { name: "Figma", detail: "Translating designs to code at GDNA" },
      { name: "OpenAI / LangChain", detail: "AI integrations, TalentAgent, portfolio chat" },
      { name: "Claude", detail: "Daily development accelerator at GDNA" },
      { name: "Stripe", detail: "Payments integration in TalentAgent" },
      { name: "Penetration Testing", detail: "Labs, write-ups, tools (Burp, Nmap, Wireshark)" },
    ],
  },
  {
    label: "Gaps",
    description: "Honest about what I'm still learning",
    color: "rose",
    skills: [
      { name: "Kubernetes", detail: "Conceptual understanding, no production use" },
      { name: "Terraform / IaC", detail: "Exposure through tutorials, not hands-on" },
      { name: "GraphQL", detail: "Read the spec, minimal implementation" },
      { name: "System Design at Scale", detail: "Learning patterns, not battle-tested" },
      { name: "Mobile Development", detail: "React Native awareness, no shipped apps" },
      { name: "ML / Data Science", detail: "Basic understanding, not a practitioner" },
    ],
  },
];
