# AI Context Reference — What Powers the AI

The AI features are powered by `src/data/ai-context.ts`. This file is **live and implemented** — the content below is what's currently in production. The AI's quality depends entirely on the depth and honesty of this data.

**Status:** Reviewed and personalized (March 2026). Source of truth is `src/data/ai-context.ts`. This doc may be out of date.

**Source of truth:** `src/data/ai-context.ts` — edit that file to update what the AI knows. This doc is a readable reference copy.

---

## System Prompt (Live)

Sent to OpenAI with every chat message via `/api/chat`. Defines who Luis is and how the AI should behave.

```
You are an AI assistant representing Luis Javier Lozoya's professional portfolio. You answer questions about his experience, skills, projects, and qualifications. Be honest, specific, and conversational. If you don't know something, say so — don't fabricate details.

## About Luis

Luis Javier Lozoya is a software engineer and cybersecurity professional with 5+ years of experience building full-stack applications and securing systems. He holds a Bachelor's in Computer Science and multiple industry certifications.

## Professional Experience

### IberiaTech Solutions (Founder & Lead Engineer, 2024–Present)
- Founded a consulting practice delivering bilingual (English/Spanish) web applications
- Builds custom solutions for small-to-mid businesses using Next.js, React, and modern cloud infrastructure
- Integrates AI-powered features into client projects (OpenAI, LangChain)
- Handles full project lifecycle: requirements, architecture, implementation, deployment

### GDNA (Software Engineer Contract, Apr 2024–Present)
- Enterprise platform development with AWS infrastructure
- Security audits and compliance work
- Full-stack development with modern JavaScript frameworks

### Querri (Software Engineer Contract, Aug 2023–Apr 2024)
- HubSpot CMS development and customization
- Built interactive components with Svelte
- Client-facing deliverables on tight timelines

### Upstate Nutrition (Software Engineer Contract, Jul–Aug 2023)
- Shopify storefront development
- E-commerce optimization and performance

### Interloop (Software Engineer, Jul 2021–Jun 2023)
- Angular and NestJS full-stack development
- Azure cloud infrastructure
- Promoted from SE I to SE II based on performance
- 2 years of team-based engineering in a startup environment

## Certifications
- CompTIA Security+
- CompTIA Network+
- AWS Cloud Practitioner
- Google Cybersecurity Professional Certificate

## Cybersecurity Labs
- Completed hands-on security labs with detailed write-ups
- tcpdump traffic analysis, Wireshark packet analysis
- OWASP web application security
- TryHackMe, HackTheBox exercises

## Technical Skills

### Strong (Daily Use)
- TypeScript / JavaScript (ES6+)
- React 18, Next.js 15 (App Router)
- Tailwind CSS, Responsive Design
- Node.js, Express
- Git, GitHub
- REST API Design
- Linux CLI, Bash scripting
- Security Fundamentals (OWASP, secure coding)

### Moderate (Project Experience)
- Python (scripting, automation)
- AWS (Lambda, S3, EC2, IAM)
- Docker
- Angular, Svelte
- MongoDB, PostgreSQL
- OpenAI API, LangChain
- Penetration testing tools (Burp Suite, Nmap, Wireshark)

### Learning / Gaps (Honest)
- Kubernetes / container orchestration
- Terraform / IaC
- GraphQL
- System design at scale
- Mobile development (React Native)
- Machine learning / data science

## Communication Style
Luis is direct, honest about gaps, and values depth over buzzwords. He prefers showing work over claiming skills.

## Response Guidelines
- Be specific: cite actual projects, companies, tools, and outcomes
- Be honest: if Luis hasn't done something, say so clearly
- Be conversational: this is a portfolio chat, not a formal interview
- Keep responses concise: 2-4 paragraphs max unless asked for detail
- When asked about gaps, frame them as growth areas with a plan
```

---

## Experience Narratives (Live — Review Needed)

These are the expandable "View AI Context" sections shown on each ExperienceTimeline card. They're **live in `src/data/ai-context.ts`** as `experienceNarratives` (keyed by `exp.id`). **Luis should review and personalize these with his own voice and specific details.**

### IberiaTech Solutions (Founder, 2024–Present)

**Situation:** After building experience across multiple contract roles, saw an opportunity to serve small-to-mid businesses that needed modern web development but couldn't afford enterprise agencies. Especially saw a gap in the bilingual (English/Spanish) market.

**Actions:**
- Founded IberiaTech Solutions as a consulting practice
- Built custom Next.js/React applications for clients with AI-powered features
- Managed full project lifecycle: discovery, architecture, implementation, deployment, maintenance
- Integrated OpenAI and LangChain into client projects for automation and content generation

**Results:**
- Delivering production applications for multiple clients
- Building a reputation in the bilingual tech consulting space
- Applying lessons from every previous role into a more complete engineering practice

**Lessons Learned:** "Running your own practice forces you to care about the full picture — not just the code, but the business problem, the client relationship, the deployment pipeline, the ongoing maintenance. It made me a better engineer because I can't hand off the hard parts."

---

### GDNA (Contract, 2024–Present)

**Situation:** Brought on to contribute to enterprise platform development with a focus on AWS infrastructure and security compliance.

**Actions:**
- Full-stack development on enterprise-grade platform
- Conducted security audits and implemented compliance requirements
- Worked with AWS services for infrastructure and deployment
- Collaborated with cross-functional team on tight delivery timelines

**Results:**
- Strengthened enterprise development skills
- Applied security knowledge in a real business context (not just labs)
- Delivered features that met compliance requirements

**Lessons Learned:** "Enterprise work taught me that security isn't a feature you add — it's a constraint you design around from the start. Every architecture decision has security implications."

---

### Querri (Contract, 2023–2024)

**Situation:** Needed to deliver HubSpot CMS customizations and interactive Svelte components for client-facing projects on tight timelines.

**Actions:**
- Built custom HubSpot CMS modules and templates
- Developed interactive components using Svelte
- Delivered client-facing work under deadline pressure
- Adapted to a new framework (Svelte) quickly

**Results:**
- Shipped on time for multiple client deliverables
- Expanded toolkit beyond React/Angular to include Svelte
- Learned to ramp quickly on unfamiliar platforms (HubSpot CMS)

**Lessons Learned:** "Contract work is all about ramp speed. You don't get months to learn the codebase — you need to deliver in weeks. That pressure made me much better at reading existing code and finding the fastest path to value."

---

### Upstate Nutrition (Contract, 2023)

**Situation:** Short-term engagement to build/optimize a Shopify storefront for a nutrition brand.

**Actions:**
- Developed Shopify storefront with focus on performance and conversion
- Optimized for mobile experience
- E-commerce best practices implementation

**Results:**
- Delivered a polished storefront on a compressed timeline
- Learned Shopify's ecosystem and Liquid templating

**Lessons Learned:** "Even short engagements teach you something. Shopify taught me that platform constraints can be a feature — when you can't over-engineer, you focus on what matters."

---

### Interloop (Full-time, 2021–2023)

**Situation:** Joined as a junior engineer (SE I) in a startup building with Angular and NestJS on Azure. First full-time engineering role after university.

**Actions:**
- Built features across the full stack: Angular frontend, NestJS backend, Azure cloud
- Learned production engineering practices: code review, testing, CI/CD, incident response
- Contributed to team processes and mentored newer engineers
- Grew from SE I to SE II through consistent delivery and technical growth

**Results:**
- Promoted to SE II based on demonstrated technical growth and delivery
- 2 years of continuous learning in a real team environment
- Built foundation in enterprise-quality engineering practices

**Lessons Learned:** "Interloop was where I went from 'I can code' to 'I can engineer.' The difference is everything around the code — how you test, how you deploy, how you handle things breaking at 2am, how you communicate trade-offs to non-technical people."

---

## Skills Assessment Data (Live — Review Needed)

### Strong (Daily use, can mentor others)
| Skill | Detail |
|-------|--------|
| TypeScript / JavaScript | Primary language for 4+ years, ES6+ |
| React & Next.js | App Router, SSR, streaming, server actions |
| Tailwind CSS | Design systems, responsive, dark mode, animations |
| Node.js & Express | REST APIs, middleware, auth flows |
| Git & GitHub | Branching, PRs, CI/CD, code review |
| Linux CLI | Daily driver, scripting, server admin |
| Security Fundamentals | OWASP top 10, secure coding, threat modeling |

### Moderate (Project experience, can deliver with ramp-up)
| Skill | Detail |
|-------|--------|
| Python | Scripting, automation, security tools |
| AWS | Lambda, S3, EC2, IAM — project use, not daily |
| Docker | Containerization, compose |
| Angular / Svelte | Used professionally at Interloop and Querri |
| PostgreSQL / MongoDB | Used in projects |
| OpenAI / LangChain | Client integrations, prompt engineering |
| Penetration Testing | Labs, write-ups, tools (Burp, Nmap, Wireshark) |

### Gaps (Honest — still learning)
| Skill | Detail |
|-------|--------|
| Kubernetes | Conceptual, no production orchestration |
| Terraform / IaC | Tutorial exposure, not hands-on |
| GraphQL | Read the spec, minimal implementation |
| System Design at Scale | Learning patterns, not battle-tested |
| Mobile Development | React Native awareness, no shipped apps |
| ML / Data Science | Basic understanding, not a practitioner |

---

## How to Update This Content

Edit `src/data/ai-context.ts` directly. This doc is a readable reference — the code is the source of truth.

1. **Review and correct** — Read every narrative and fix anything inaccurate
2. **Add specifics** — metrics, team sizes, specific technologies, project names
3. **Test by interrogating** — Open the AI chat and try to trip it up. Ask edge cases. The AI should say "I don't have details about that" rather than make things up.
4. **Keep gaps honest** — The gaps column is the most impressive part to employers. Don't remove it.
5. **Update regularly** — As skills grow, move items between columns. Add new roles and projects.

## Data Structure Notes

- `LUIS_SYSTEM_PROMPT` — string, sent as system message to `/api/chat`
- `experienceNarratives` — `Record<number, ExperienceNarrative>` keyed by `exp.id` (matches ExperienceTimeline data). Used by "View AI Context" toggle on each card.
- `skillsAssessment` — `SkillCategory[]` with `color: "emerald" | "amber" | "rose"`. Rendered by `SkillsAssessment.tsx`.
- Fit assessment uses the same `LUIS_SYSTEM_PROMPT` plus a structured JSON prompt in `/api/fit-assessment`.
