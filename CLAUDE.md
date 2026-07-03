# Portfolio site instructions for Claude

## Who this is for
Luis Javier Lozoya. Application Security Engineer pivoting from 5+ years
software engineering into full-time AppSec. Based in Charleston, SC.

## What I'm going for
Get AppSec / Product Security / AI Security recruiters and hiring managers
at tech-tier companies (Stripe, Figma, Rubrik, Notion, Anthropic, LaunchDarkly,
Datadog, Cloudflare, etc.) to land on this site and immediately understand:
1. I'm an engineer who does security, not a security person who learned to code
2. I ship real security tooling (llm-audit)
3. I have SANS/GIAC certs and BSCP in progress
4. I know AWS deeply (Cognito, IAM, Lambda hardening)

## Positioning (do not drift from this)
- Application Security Engineer, not pentester
- SWE background is my differentiator, not a weakness
- llm-audit is my flagship, always mention it
- AWS security depth is real (SCS-C02 in progress)
- Web pentesting is a skill I have, not my identity

## Voice constraints (strict)
- No em-dashes anywhere. Use periods or commas.
- No AI-writing cliches: "in today's fast-paced world", "unlock", "leverage",
  "seamless", "cutting-edge", "empower", "at the intersection of", "passionate about"
- No professional-summary fluff. Write like an engineer talking to another engineer.
- Short sentences beat long ones. Concrete beats abstract.
- Numbers beat adjectives. "173K flow records, 33K from one IP" beats
  "extensive log analysis."
- First person is fine. Occasional "I" is normal. Do not overdo it.
- Do not write bullet lists of skills like a resume. Show, do not tell.

## Structure I want
- Home: single-page or minimal landing. Name, headline, one line that
  differentiates. Link to labs, projects, GitHub, LinkedIn.
- Projects: llm-audit first, always. Include real usage, screenshots,
  what it catches, install command.
- Labs: organized by domain, not by SANS course number.
  Domains I care about:
  - Application Security
  - Cloud Security (AWS)
  - Network Forensics
  - Incident Response
- Certs: display GSEC, GFACT, SANS Foundations Alumni, BSCP in progress,
  SCS-C02 in progress
- About: short bio, no fluff. Where I am, what I want, how to reach me.

## What NOT to add to the site
- No "hire me" desperation copy
- No marketing agency layouts
- No hero video, no parallax scroll, no animated gradients
- No skills list with proficiency bars (fake and cringe)
- No "years of experience" counter
- No testimonials I do not actually have
- No blog category "musings" or "thoughts"

## SEO priorities
Target these phrases in H1s, meta descriptions, and body copy:
- Application Security Engineer
- Cloud Security Engineer (AWS)
- LLM Security / AI Security
- OWASP LLM Top 10
- Semgrep rules
- AWS Cognito, IAM, Lambda security
- Web application penetration testing
- Charleston, SC (in case local recruiters search geographically)

## Writing pattern for lab writeups
Every lab writeup should have this structure:

1. One-sentence what and why
2. Numbers up front (X packets, Y records, Z IPs)
3. What I found (specific findings)
4. How I found it (tools + technique)
5. Why it matters for AppSec (this is the reframe layer)
6. Repo or artifact link if applicable

Do not write "in this lab I learned..." style intros. Skip to the finding.

## Writing pattern for project pages
For llm-audit and future projects:

1. What it is in one sentence
2. Why it exists (real gap it fills)
3. What it catches (specific patterns, ideally with code snippets)
4. How to use it (install/run commands, no ceremony)
5. What is next (roadmap or open issues)

## When I ask for changes
Assume I want the smallest change that gets the result. Do not rewrite
sections I did not ask about. Do not "improve" the tone. Do not add
emojis unless I ask.

If I show you an example from another engineer's portfolio and ask
for something similar, mimic the layout and information density, not
the wording.

## Tech stack
- Framework: Next.js 15 (App Router), React 18, TypeScript
- Styling: Tailwind CSS 3 (+ @tailwindcss/typography), Framer Motion for motion
- Deployment: Vercel
- Content format: Markdown with frontmatter (gray-matter + react-markdown +
  remark-gfm), synced via scripts/sync-notes.mjs
- Data/back end: Supabase (@supabase/ssr), AI SDK + OpenAI for the ai-playground

Prefer static-first. Avoid adding JS-heavy interactive components unless
they demonstrate a security concept (a live Semgrep playground would be
worth the complexity, an animated hero would not).
