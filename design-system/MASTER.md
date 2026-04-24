# Design System: Luis Javier Lozoya Portfolio

> Source of truth for visual and interaction decisions across the portfolio.
> Describes the code as it exists — not aspirations. Edit when behavior changes.

---

## 1. Brand Identity

**Personality:** Security-focused, technical, calm-confident, recruiter-legible.
**Tone:** Terminal-adjacent rather than neon-cyber. Clean enough to scan in 10 seconds, technical enough that an engineer trusts the taste.
**Positioning:** "Security-Focused Software Engineer." Primary audience = AppSec / DevSecOps recruiters and hiring managers.

---

## 2. Color System

### Tokens (source of truth: `src/styles/globals.css`)

Every color in the product should resolve to one of these variables. Components are allowed to reach for raw Tailwind `gray-*` where no token applies, but new work should prefer the semantic Tailwind alias (§ 2c).

#### Dark (default)

| Role | Variable | Value | Usage |
|------|----------|-------|-------|
| Page | `--bg` | `#0B1220` | Page background |
| Surface | `--bg-elev` | `#0F172A` | Cards, panels |
| Text | `--fg` | `#E5E7EB` | Body text, headings |
| Text (muted) | `--fg-muted` | `#9CA3AF` | Labels, captions, placeholders |
| Divider | `--border` | `#1F2937` | Borders, rules |
| Accent | `--accent` | `#22C55E` | Brand accent (terminal green) |
| Accent (soft) | `--accent-soft` | `rgba(34,197,94,0.12)` | Tinted backgrounds, chips |
| Link | `--link` | `#60A5FA` | Inline links, blue-semantic actions |
| Link (hover) | `--link-hover` | `#93C5FD` | Link hover state |

#### Light

| Role | Variable | Value |
|------|----------|-------|
| Page | `--bg` | `#FAFAF9` |
| Surface | `--bg-elev` | `#FFFFFF` |
| Text | `--fg` | `#1F2937` |
| Text (muted) | `--fg-muted` | `#6B7280` |
| Divider | `--border` | `#E5E7EB` |
| Accent | `--accent` | `#15803D` |
| Accent (soft) | `--accent-soft` | `rgba(21,128,61,0.10)` |
| Link | `--link` | `#2563EB` |
| Link (hover) | `--link-hover` | `#1D4ED8` |

### Semantic meaning

- **Green (`--accent`)** — brand accent. Primary CTA, section labels, active-state indicators, success states, code/terminal prompts.
- **Blue (`--link`)** — link color. Actual hyperlinks, disclosure toggles, external-link actions. Never as a brand accent or decorative fill.
- **Amber** (`amber-50/50`, `amber-500/10`) — emphasis callouts only ("Why this matters", "Key findings"). Tint-only, no border stripe.
- **Grays** — everything else. Inverted monochrome is the default primary-button treatment.

### Semantic Tailwind tokens (`tailwind.config.js`)

New components should prefer these over raw Tailwind grays. They resolve to the variables above and theme-switch automatically.

| Class | Resolves to |
|-------|-------------|
| `bg-surface` / `text-surface` | `var(--bg)` |
| `bg-surface-elevated` | `var(--bg-elev)` |
| `text-content` | `var(--fg)` |
| `text-content-muted` | `var(--fg-muted)` |
| `bg-accent` / `text-accent` / `border-accent` | `var(--accent)` |
| `bg-accent-soft` | `var(--accent-soft)` |
| `border-divider` | `var(--border)` |
| `text-link` / `text-link-hover` | `var(--link)` / `var(--link-hover)` |

### Contrast

- Body on dark: 11:1 (AAA). Body on light: 9:1 (AAA).
- Green primary button: `#15803D` on white = 4.9:1 (AA); `#22C55E` on `gray-900` = 8.4:1 (AAA).
- Never put gray text on a colored fill. Use a shade of the fill color (e.g. `text-green-900` on `bg-green-50`).

---

## 3. Typography

### Fonts

| Role | Family | Loaded via |
|------|--------|------------|
| UI + body | Inter (variable) | `next/font/google` in `layout.tsx` → `--font-inter` |
| Monospace | JetBrains Mono (400/500/600) | `next/font/google` in `layout.tsx` → `--font-mono` |

Monospace is reserved for: terminal UI, code snippets, section labels in lab pages, keyboard hints, flag values.

### Scale

Headings use fluid `clamp()` on the public marketing pages; the `globals.css` mobile block resets h1/h2/h3 at `<768px` to prevent text that's too large on phones.

| Element | Size |
|---------|------|
| Hero display | `clamp(1.875rem, 5vw, 2.5rem)` + desktop overrides via Tailwind (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`) |
| h1 | `clamp(1.875rem, 5vw, 2.5rem)` mobile, `text-3xl/4xl` desktop |
| h2 | `clamp(1.5rem, 4vw, 2rem)` mobile |
| h3 | `clamp(1.25rem, 3vw, 1.5rem)` mobile |
| Body | `16px` (iOS zoom threshold — enforced globally in the mobile CSS block) |
| Body small | `14px` |
| Caption / label | `12px`, mono, uppercase, tracking-widest |

### Rules

- Max line length for long-form body: ~65-75ch. Lab writeups set this via container max-widths.
- Never set long body passages in uppercase. All-caps is reserved for short section labels (mono, tracking-widest).
- **Gradient text is banned.** No `background-clip: text` anywhere.

---

## 4. Spacing

Uses Tailwind's default 4pt scale (`p-1` = 4px, `p-2` = 8px, etc.). No custom `--space-*` variables.

Common patterns:
- Card padding: `p-4 sm:p-5` or `p-5 sm:p-6`
- Section vertical rhythm: `mb-10` between sections inside a page
- Stack spacing: `space-y-4` between sibling content blocks

### Layout max-widths

| Context | Class |
|---------|-------|
| Main container | `max-w-6xl mx-auto` (Hero) |
| Readable prose | `max-w-3xl` (About) |
| Form / narrow | `max-w-lg` or `max-w-md` |

Section scroll-anchor offset is 80px (matches fixed navbar height) — set in the `globals.css` mobile block.

---

## 5. Components

### Primary CTA button

Inverted monochrome. This is the site's primary action pattern (Hero "View My Work"):

```tsx
className="px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-light tracking-widest uppercase
  bg-gray-900 text-white hover:bg-gray-700
  dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200
  transition-colors duration-300"
```

### Accent button (brand green)

Used for AI Chat button, Fit Check submit, AI modal send. Solid fill, no gradient.

```tsx
className="bg-green-700 hover:bg-green-800 text-white
  dark:bg-green-500 dark:hover:bg-green-400 dark:text-gray-900"
```

Text color flips dark-on-green in dark mode — reads as a terminal-prompt color.

### Border-draw button

Used for secondary actions (Resume, Contact). See `BorderDrawButton.tsx`. Animates a 1px border-in on hover.

### Text input / textarea

```tsx
className="border rounded-xl px-3 py-2.5 text-sm
  bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:border-transparent focus:ring-green-700
  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500
  dark:focus:ring-green-500"
```

Focus ring matches brand accent to pair visually with the adjacent accent button.

### Chips / pills

Flat tint + 1px border. `bg-white/40 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700`. Used in the SkillOrbit magnetic skills.

### Emphasis callouts (tint only)

No border stripes. Amber tint for "Why this matters" / "Key findings"; green tint for security-controls sections. Heading inside the box carries the semantic color.

### Cards

Simple: `rounded-xl bg-surface-elevated border border-divider p-5`. No nested cards. No decorative drop shadows.

---

## 6. Motion

### Keyframes (source of truth: `src/styles/globals.css`)

| Name | Duration | Purpose |
|------|----------|---------|
| `fadeIn` | 0.2s–0.6s | Section entrance, element reveal |
| `float` | 3s infinite | Subtle ambient motion (decorative) |
| `blink` | 1s step-infinite | Terminal cursor |
| `typingPulse` | 1.2s ease-out infinite | AI "thinking" indicator (3 dots) |
| `clip-reveal` | 0.8s ease-out | Scroll-triggered content reveal |
| `slideInRight` | 0.3s | Mobile menu slide-in |

### Easing

Default: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint). Also acceptable: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for confident entrances.

**Bounce and elastic curves are banned.** They feel dated.

### Rules

- Animate `transform` and `opacity` only — never `width`/`height`/`top`/`left`.
- `prefers-reduced-motion` globally collapses all animation and transition durations to 0.01ms (`globals.css` mobile block applies to desktop too via the media query).
- Exit animations are ~75% of entrance duration.
- Hover scale: never exceed `1.05`.

### Performance notes

- `SkillOrbit.tsx` uses a `useRef`-backed pointer tracker (not state) so 6 chips don't cause an 1800-teardown-per-second rAF-restart cascade during hover. See § 10.
- Hero parallax uses rAF-throttled scroll listener.

---

## 7. Effects

| Effect | Used for | Notes |
|--------|----------|-------|
| Glassmorphism | Navbar (`bg-white/90 backdrop-blur-sm`), mobile menu, modals, modal backdrops | Limited to frame elements — never card fills |
| Solid accent fills | Buttons, progress bar, timeline line, featured badges | No gradients in brand usage |
| Tinted callouts | Lab page emphasis boxes | `bg-{color}-50` light / `bg-{color}-500/10` dark |

### Banned

- **Gradient text** (`bg-clip-text` + gradient)
- **Side-stripe borders** > 1px (`border-l-2+`, `border-r-2+` with color)
- **Blue → purple, blue → cyan, cyan → teal gradients** (AI-palette tells)
- **`dark:text-cyan-*`, `dark:bg-cyan-*`** — the cyan-on-dark palette

---

## 8. Iconography

- FontAwesome Solid for UI actions (close, bolt, shield, etc.)
- FontAwesome Brands for tech logos
- All icon-only buttons carry `aria-label`
- Touch targets enforced to 44×44px via `globals.css` mobile block

---

## 9. Responsive breakpoints

Tailwind defaults. Key breakpoints in use:

| Name | Width | Notes |
|------|-------|-------|
| Mobile | `<640px` | One-column, 16px body min, overflow-x hidden |
| `sm` | `≥640px` | Two-column grids allowed |
| `md` | `≥768px` | Hero splits to 2-column |
| `lg` | `≥1024px` | Desktop layout: sidebar + primary |
| `xl` | `≥1280px` | Navbar expands from hamburger to horizontal |

Mobile-specific rules in `globals.css`:
- `overflow-x: hidden` on `html, body`
- `overscroll-behavior-y: contain`
- Safe-area insets on body padding
- `font-size: 16px !important` on inputs (prevents iOS zoom)
- 44px min-height on buttons and `[role="button"]`

---

## 10. Accessibility

### Implemented

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<button>`).
- Skip-to-content link in layout.
- Focus-visible outline: `outline: 2px solid var(--link); outline-offset: 2px`. Non-keyboard focus has no outline.
- `prefers-reduced-motion` collapses all animation.
- All `next/image` have `alt`. All icon-only buttons have `aria-label`.
- Forms use `<label htmlFor>` (sr-only when the placeholder suffices visually).

### Modal pattern

All modals (`AIChatModal`, `CommandPalette`, `ImageLightbox`) implement:
- `role="dialog"` + `aria-modal="true"`
- Either `aria-labelledby` (referenced heading) or `aria-label` (palette)
- Escape-to-close
- Initial focus set (input or first interactive)
- Focus trap via `src/hooks/useFocusTrap.ts`
- Focus restoration to trigger on close (`AIChatButton` uses a `buttonRef`; `CommandPalette` saves `document.activeElement` on open)
- Body scroll lock while open

### AI typing indicator

`AIChatModal` uses `role="status"` + `aria-label="Assistant is typing"` on the 3-dot pulse so screen readers announce the state.

---

## 11. Z-index

Semantic scale defined in `tailwind.config.js`:

| Class | Value | Used by |
|-------|-------|---------|
| `z-50` (Tailwind default) | 50 | AIChatButton (floating action) |
| `z-nav` | 100 | Navbar |
| `z-modal` | 200 | AIChatModal, CommandPalette, ImageLightbox, Navbar mobile menu |
| `z-toast` | 300 | (reserved for future toasts) |

New components should use the semantic classes. Avoid arbitrary `z-[N]`.

---

## 12. Anti-patterns (hard stops)

1. **Gradient text.** No `background-clip: text` + gradient. Use weight/size for emphasis instead.
2. **Side-stripe borders.** No `border-l-2+` or `border-r-2+` with a colored accent. Use tinted backgrounds + typographic labels instead.
3. **AI palette.** No cyan-on-dark (`dark:text-cyan-400`, `dark:bg-cyan-*`, `from-cyan-* to-blue-*`). No blue→purple gradients.
4. **Bounce / elastic easing.** Use `ease-out-quint` / `ease-out-expo` decelerations.
5. **Gray text on colored backgrounds.** Use a shade of the fill color.
6. **Pure black / pure white.** Always tint neutrals.
7. **Nested cards.** Flatten hierarchy with spacing.
8. **Hero-metric templates.** No "big number, small label" stat rows (none in use today — keep it that way).
9. **Monospace as "technical vibe" body text.** Reserve mono for terminals, labels, code, and keyboard hints.
10. **Animating layout properties.** Transform + opacity only.
