# React-Portfolio

Personal portfolio site for **Luis Javier Lozoya** — a security-focused software engineer in Charleston, SC. Live at **[luislozoya.com](https://www.luislozoya.com)**.

More than a portfolio page: it's a Next.js app with an AI assistant, a job-fit analyzer, an LLM red-team playground, security lab write-ups, and synced study notes.

## Features

- **Portfolio** — Hero, about, experience timeline, tech stack, certifications, project slider, and contact.
- **Ask AI about Luis** — A chat assistant (`/api/chat`) grounded in a hand-written context file about Luis's experience, so visitors can ask questions and get honest, specific answers.
- **Fit Assessment** — Paste a job description and get a fit score against Luis's profile (`/api/fit-assessment`).
- **AI Playground** (`/ai-playground`) — An LLM red-team test rig that runs OWASP LLM Top 10 attacks (instruction override, PII exfiltration, prompt extraction) against models via the Vercel AI Gateway.
- **Cybersecurity Labs** (`/labs`) — Hands-on lab write-ups (tcpdump, Wireshark) with steps, command breakdowns, screenshots, printable views, and cheatsheets.
- **Notes** (`/notes`) — Study notes synced from other GitHub repos (PortSwigger Academy, TCM PWPA) via `scripts/sync-notes.mjs`.
- **Blog** (`/blog`) — MDX-based blog.
- **llm-audit landing** (`/llm-audit`) — Page for the [`llm-audit`](https://github.com/Javierlozo/llm-audit) Semgrep rule pack.
- **Admin dashboard** (`/admin`) — Page-view analytics and tracking, behind a login.

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Framer Motion, Lenis (smooth scroll)
- **AI:** OpenAI, Vercel AI SDK, Vercel AI Gateway
- **Backend:** Next.js API Routes, Supabase (analytics + admin), middleware-based rate limiting & input sanitization
- **Content:** MDX (`react-markdown`, `remark-gfm`, `gray-matter`)
- **Charts:** Recharts
- **Deployment:** Vercel

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # add your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run attacks` | Run the LLM red-team attack suite (`scripts/run-attacks.ts`) |
| `npm run sync:notes` | Sync study notes from source repos into `content/notes` |
| `npm run notes:publish` | Sync notes, commit, and push |

### Environment Variables

See `.env.local.example`. The AI Gateway powers the red-team lab and can authenticate via a static `AI_GATEWAY_API_KEY` or an OIDC token from `vercel env pull`. `OPENAI_API_KEY` powers the chat and fit-assessment routes; Supabase keys power analytics and the admin dashboard.
