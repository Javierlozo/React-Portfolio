# Portfolio Strategy & Reference

This folder contains the strategy, implementation details, and reference materials for the AI-powered features on luislozoya.com.

## Documents

| File | Description | Status |
|------|-------------|--------|
| [ai-features-plan.md](ai-features-plan.md) | What was built, architecture, key decisions, page order, next steps | v1 shipped, content reviewed |
| [ai-context-reference.md](ai-context-reference.md) | Reference copy of system prompt, narratives, skills data | Reviewed March 2026 |
| [nate-b-jones-transcript.md](nate-b-jones-transcript.md) | Full transcript of "Stop Competing With 400 Applicants" (156K views) | Reference |

## Core Idea

From Nate B Jones: *"Instead of submitting yourself for filtering, create and control the point of contact. A surface where people encounter you on your own terms, where they can query your experience, explore you in depth."*

## What's Live

1. **Ask AI Chat** — floating button on every page, streaming GPT-4o-mini conversation
2. **View AI Context** — expandable Situation/Actions/Results/Lessons on each experience card
3. **Skills Assessment** — three-column Strong/Moderate/Gaps honest breakdown
4. **Fit Assessment** — paste a job description, get honest score + analysis
5. **Navbar** — "Fit Check" link (cyan-styled) in desktop and mobile menus
6. **CSP** — `api.openai.com` in connect-src, `unsafe-eval` in dev only for HMR

## To Go Live

Add `OPENAI_API_KEY` to `.env.local` (local) and Vercel environment variables (production).
