# AI Features Implementation — react-portfolio (luislozoya.com)

**Date:** March 2026
**Status:** v1 implemented and building successfully
**Inspired by:** [nate-b-jones-transcript.md](nate-b-jones-transcript.md)

---

## What Was Already There

The portfolio at luislozoya.com is a polished static site:
- **Stack:** Next.js 15, React 18, Tailwind 3, TypeScript, Vercel
- **Sections:** Hero, About, TechStackVisual, SkillsModern, ExperienceTimeline (5 roles), CertificationsShowcase, CybersecurityLabs (with detailed write-ups), PortfolioSlider, Testimonials, Contact (EmailJS)
- **Theme:** Dark/light mode via ThemeContext (class-based), cybersecurity aesthetic (neon gradients, matrix effects)
- **Icons:** FontAwesome + react-icons

---

## What Was Built

### 1. "Ask AI About Luis" Chat Modal
A floating button (bottom-right) that opens a streaming chat modal. Employers can ask anything about Luis's experience, skills, or projects.

**Files created:**
- `src/components/AIChatButton.tsx` — floating FAB with gradient, theme-aware (cyan in dark, blue in light)
- `src/components/AIChatModal.tsx` — chat UI with streaming SSE, message history, 4 starter questions, Escape to close, body scroll lock
- `src/app/api/chat/route.ts` — POST endpoint, streams OpenAI GPT-4o-mini responses via SSE, 20-message history limit
- `src/data/ai-context.ts` — system prompt with all 5 roles, certs, labs, skills, projects, communication style

**Wiring:**
- `<AIChatButton />` added to `layout.tsx` inside `<ThemeProvider>` (appears on every page)
- "Fit Check" nav link added to Navbar (desktop + mobile)

**Nate's principle:** *"Instead of reading a static bio, you can query."*

### 2. "View AI Context" on Experience Cards
Expandable section on each ExperienceTimeline card showing the real narrative: situation, actions, results, lessons learned.

**Files modified:**
- `src/components/ExperienceTimeline.tsx` — added `expandedNarratives` state, `toggleNarrative()`, imports from `ai-context.ts`. Each card now has a "View AI Context" button (FiZap icon + chevron) that expands to show Situation / What I Did / Results / Lessons Learned.
- `src/data/ai-context.ts` — exports `experienceNarratives` as a `Record<number, ExperienceNarrative>` keyed by `exp.id` (matches existing Experience data)

**No API call needed** — all static data in `ai-context.ts`.

**Nate's principle:** *"One is a claim that could mean anything. The other shows this person understands how organizations work."*

### 3. Skills Assessment — Strong / Moderate / Gaps
New section with three columns showing honest self-assessment. Supplements (does not replace) the existing TechStackVisual and SkillsModern components.

**Files created:**
- `src/components/SkillsAssessment.tsx` — three-column layout with IntersectionObserver animation, theme-aware colors (emerald/amber/rose in both dark and light mode)

**Files modified:**
- `src/app/page.tsx` — `<SkillsAssessment />` added after `<ExperienceTimeline />`

**Nate's principle:** *"Most people will not publish the gaps. This is already eye-opening."*

### 4. Fit Assessment Tool
Section where an employer can paste a job description. AI analyzes it against Luis's experience and gives an honest fit verdict.

**Files created:**
- `src/components/FitAssessment.tsx` — textarea + results display (ScoreRing SVG, strengths/gaps cards, recommendation, interview tips). IntersectionObserver for scroll reveal. Theme-aware.
- `src/app/api/fit-assessment/route.ts` — POST endpoint, calls GPT-4o-mini, returns structured JSON (score, verdict, summary, strengths, gaps, recommendation, interviewTips)

**Files modified:**
- `src/app/page.tsx` — `<FitAssessment />` added before `<Testimonials />`
- `src/components/Navbar.tsx` — "Fit Check" link added (cyan in dark mode, blue in light) with FiZap icon, in both desktop and mobile menus

**Nate's principle:** *"Your AI tells them honestly whether you're right for the role. Not a pitch, a real assessment."*

### 5. Infrastructure Changes

**Files modified:**
- `package.json` — added `openai` dependency
- `next.config.js` — added `api.openai.com` to CSP `connect-src`; added `isDev` flag to include `'unsafe-eval'` in `script-src` during development only (Next.js HMR requires it)
- `src/app/layout.tsx` — imported and added `<AIChatButton />` inside `<ThemeProvider>`
- `src/components/Navbar.tsx` — added `FiZap` import, "Fit Check" to nav arrays (desktop + mobile), cyan/blue styling matching "Security Labs" pattern, IntersectionObserver section tracking updated

**Files created:**
- `.env.local` — placeholder for `OPENAI_API_KEY` (gitignored)

---

## Architecture

```
src/
├── data/
│   └── ai-context.ts              # System prompt, experience narratives (keyed by id), skills assessment data
├── components/
│   ├── AIChatButton.tsx            # Floating FAB → opens modal (theme-aware)
│   ├── AIChatModal.tsx             # Chat UI: streaming SSE, starter questions, Escape close, body scroll lock
│   ├── ExperienceTimeline.tsx      # MODIFIED — added "View AI Context" expandable per card
│   ├── SkillsAssessment.tsx        # 3-column Strong/Moderate/Gaps (theme-aware, IntersectionObserver)
│   ├── FitAssessment.tsx           # Paste JD → score ring + analysis (theme-aware)
│   └── Navbar.tsx                  # MODIFIED — added "Fit Check" link
├── app/
│   ├── api/
│   │   ├── chat/route.ts           # Streaming SSE, multi-turn, GPT-4o-mini, 20-msg limit
│   │   └── fit-assessment/route.ts # JSON response, structured fit analysis, 5000-char JD limit
│   ├── layout.tsx                  # MODIFIED — AIChatButton mounted inside ThemeProvider
│   └── page.tsx                    # MODIFIED — added SkillsAssessment + FitAssessment sections
```

---

## Key Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| AI model | GPT-4o-mini | Cheap ($0.15/1M input), fast, good enough for portfolio chat. Upgrade to GPT-4o later if needed. |
| Streaming | OpenAI streaming + ReadableStream SSE | Real-time feel. Users see words appear as they're generated. |
| Data storage | All in `ai-context.ts` | No database needed. This is a personal site, not a SaaS. Easy to update. |
| Theme | Use existing ThemeContext | All new components respect dark/light mode via `useTheme()` hook. |
| Icons | FontAwesome + react-icons (FiZap) | Consistent with the rest of the site. FiZap for AI-related elements. |
| Chat position | Floating bottom-right, z-50 | Non-intrusive. Modal at z-200 to sit above everything. |
| Experience narratives | `Record<number, ExperienceNarrative>` keyed by `exp.id` | Maps directly to existing Experience data without changing the interface. |
| CSP dev mode | `unsafe-eval` only in `NODE_ENV=development` | Next.js HMR requires eval. Production keeps strict CSP. |
| Navbar | "Fit Check" link (not "Ask AI") | The floating button handles AI chat. Navbar links to the on-page fit assessment section. |

---

## Page Section Order (Updated)

```
Hero
About
TechStackVisual
SkillsModern (existing sticky cards)
ExperienceTimeline (with "View AI Context" per card)
SkillsAssessment (NEW — Strong / Moderate / Gaps)
CertificationsShowcase
CybersecurityLabs
PortfolioSlider
FitAssessment (NEW — paste a JD)
Testimonials
Contact
```

Plus: `AIChatButton` floating on every page (mounted in layout.tsx)

---

## Content Review (Completed March 2026)

All content in `src/data/ai-context.ts` has been reviewed and personalized:

### System prompt (`LUIS_SYSTEM_PROMPT`)
- [x] All 5 roles updated with accurate details
- [x] GDNA updated: Figma-to-code evolution, now serverless AWS architecture, API/DB design, client meetings
- [x] IberiaTech reframed as independent projects (no active clients)
- [x] Querri updated: client Svelte project + HubSpot maintenance
- [x] Upstate Nutrition: honest about engagement ending early
- [x] Interloop: added JRS Coding School bootcamp context
- [x] Full background story added: Spain, architecture degree, construction career, career pivot
- [x] Certs updated: removed Network+ (studied, not certified), added Purdue System Admin, CAPM, GSEC in progress
- [x] Community involvement added: HackOps 2024 winner, HarborHack judge/speaker
- [x] Removed specific GDNA client names
- [x] Removed all em dashes

### Experience narratives (`experienceNarratives`)
- [x] All 5 roles personalized with accurate Situation/Actions/Results/Lessons
- [x] Lessons Learned quotes reviewed

### Skills assessment (`skillsAssessment`)
- [x] AWS expanded to full service list (API Gateway, Lambda, S3, RDS, Cognito, IAM, Secrets Manager, Amplify, CDK)
- [ ] Review Moderate/Gaps columns (Supabase, Stripe, Claude, Figma placement)

### Other updates
- [x] TechStack: removed GraphQL, Kubernetes, Metasploit. Added Lambda, S3, tcpdump
- [x] About section: removed IberiaTech consulting claim, softened to "Always open to interesting conversations"
- [x] TalentAgent added to portfolio (replaced PortfolioHub)
- [x] Removed Rental App, Weather App, Old Portfolio Page
- [x] Added years to all project titles
- [x] Hero subtitle updated

### Test by interrogating
- [ ] Open the chat and try to trip it up
- [ ] Ask about things not in the prompt: it should say "I don't have details" not fabricate

---

## Next Steps

### Polish
- [ ] Rate limiting on API routes (prevent abuse in production)
- [ ] Error boundaries around AI components
- [ ] Loading skeletons for new sections
- [ ] Test on actual mobile devices (chat fullscreen, touch targets)

### Depth
- [ ] Shareable fit results ("I scored 87% for Senior Frontend at Stripe")
- [ ] Chat suggested follow-ups after each AI response
- [ ] Click a skill in SkillsAssessment: opens chat pre-filled with a question about that skill

### Distribution
- [ ] SEO meta tags for new sections
- [ ] OG image showing "Ask AI About Luis" for social sharing
- [ ] Blog post about building this (meta-content that demonstrates capability)

### Advanced
- [ ] Analytics: track chat opens, questions asked, fit assessments run
- [ ] Resume download link in chat responses
- [ ] Voice interaction (Web Speech API)
- [ ] Model upgrade path: switch to GPT-4o or Claude when deeper conversations justify the cost

---

## Key Quotes from Nate (Quick Reference)

> "The interrogative format surfaces what's really there. And if nothing is there, it surfaces that too."

> "You're not just presenting yourself for evaluation. You're evaluating fit from your side too."

> "In a market where attention is the bottleneck, engineering that tiny shift — from filtering to investigating — is the highest leverage move you can make."

> "They feel like they discovered the truth. You designed what they would find."

> "This is not a hack for seeming impressive. It is an amplifier for real capabilities."
