# Design System: Luis Lozoya Portfolio

> Source of truth for all visual and interaction decisions across the portfolio.

---

## 1. Brand Identity

**Personality:** Technical, modern, security-focused, approachable
**Tone:** Professional with a cybersecurity edge -- clean enough for recruiters, technical enough for engineers

---

## 2. Color System

### Dark Mode (Default)

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Background | `--bg-primary` | `#0B1220` | Page background |
| Surface | `--bg-surface` | `#0F172A` | Cards, panels |
| Surface Elevated | `--bg-elevated` | `#1E293B` | Hover states, modals |
| Border | `--border-default` | `#334155` | Dividers, card borders |
| Text Primary | `--text-primary` | `#F8FAFC` | Headings, body |
| Text Secondary | `--text-secondary` | `#94A3B8` | Muted labels, captions |
| Text Tertiary | `--text-tertiary` | `#64748B` | Placeholders |
| Cyan (Primary Accent) | `--accent-cyan` | `#00D4FF` | Links, primary actions, highlights |
| Cyan Hover | `--accent-cyan-hover` | `#00B8E6` | Interactive hover state |
| Green (Secondary Accent) | `--accent-green` | `#00FF88` | Success, secondary CTA, terminal |
| Orange (Tertiary Accent) | `--accent-orange` | `#FF6B35` | Warnings, badges, emphasis |
| Blue (CTA) | `--accent-blue` | `#2563EB` | Buttons, call-to-action |

### Light Mode

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Background | `--bg-primary` | `#FAFAF9` | Page background |
| Surface | `--bg-surface` | `#FFFFFF` | Cards, panels |
| Surface Elevated | `--bg-elevated` | `#F1F5F9` | Hover states |
| Border | `--border-default` | `#E2E8F0` | Dividers, card borders |
| Text Primary | `--text-primary` | `#0F172A` | Headings, body |
| Text Secondary | `--text-secondary` | `#475569` | Muted labels |
| Text Tertiary | `--text-tertiary` | `#94A3B8` | Placeholders |
| Blue (Primary Accent) | `--accent-cyan` | `#3B82F6` | Links, primary actions |
| Emerald (Secondary) | `--accent-green` | `#10B981` | Success states |
| Amber (Tertiary) | `--accent-orange` | `#F59E0B` | Warnings, badges |
| Blue (CTA) | `--accent-blue` | `#1D4ED8` | Buttons |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Primary | `135deg, #00D4FF -> #0099CC` | Headings, hero text, primary focus |
| Secondary | `135deg, #00FF88 -> #00CC66` | Skill badges, success states |
| Accent | `135deg, #FF6B35 -> #F7931E` | CTAs, highlight badges |
| Cyber | `135deg, #00FFFF -> #0080FF` | Terminal elements, cyber cards |
| Matrix | `135deg, #00FF00 -> #008000` | Lab/security-themed elements |

### Contrast Requirements

- Body text on dark: minimum 7:1 (WCAG AAA)
- Body text on light: minimum 4.5:1 (WCAG AA)
- Large headings: minimum 3:1
- Interactive elements: visible focus ring at all times

---

## 3. Typography

### Font Stack

| Role | Font | Fallback | Weight Range |
|------|------|----------|--------------|
| Primary (Headings + Body) | Inter | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif | 300-700 |
| Monospace (Code/Terminal) | JetBrains Mono | Fira Code, Consolas, monospace | 400-600 |

### Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Display (Hero) | `clamp(2.5rem, 6vw, 4rem)` | 700 | 1.1 | -0.03em |
| H1 | `clamp(1.875rem, 5vw, 2.5rem)` | 700 | 1.2 | -0.02em |
| H2 | `clamp(1.5rem, 4vw, 2rem)` | 700 | 1.3 | -0.02em |
| H3 | `clamp(1.25rem, 3vw, 1.5rem)` | 600 | 1.4 | -0.01em |
| Body | 16px (1rem) | 400 | 1.6 | 0 |
| Body Small | 14px (0.875rem) | 400 | 1.5 | 0 |
| Caption | 12px (0.75rem) | 500 | 1.4 | 0.02em |
| Code | 14px (0.875rem) | 400 | 1.6 | 0 |

### Rules

- Maximum line length: 65-75 characters
- Minimum body text on mobile: 16px (prevents iOS zoom)
- Gradient text for headings only, never body text
- Monospace reserved for code snippets, terminal UI, and lab content

### Recommended Upgrade (Optional)

For a more distinctive look, consider switching to:
- **Headings:** Space Grotesk (geometric, tech-forward)
- **Body:** Inter or DM Sans (stays readable)

---

## 4. Spacing System

Based on a 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps, icon padding |
| `--space-2` | 8px | Inline spacing, small gaps |
| `--space-3` | 12px | Form field padding |
| `--space-4` | 16px | Card padding, standard gap |
| `--space-6` | 24px | Section inner padding |
| `--space-8` | 32px | Component spacing |
| `--space-12` | 48px | Section gaps |
| `--space-16` | 64px | Major section breaks |
| `--space-24` | 96px | Hero section padding |

### Layout Constraints

| Token | Value | Usage |
|-------|-------|-------|
| `--max-width-content` | 1280px (max-w-7xl) | Main content container |
| `--max-width-text` | 768px (max-w-3xl) | Readable text blocks |
| `--max-width-narrow` | 640px (max-w-2xl) | Forms, modals |

---

## 5. Component Patterns

### Glass Card (Primary Surface)

```css
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.05);   /* dark mode */
background: rgba(255, 255, 255, 0.80);   /* light mode */
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
```

### Cyber Card (Themed Surface)

```css
background: rgba(0, 212, 255, 0.03);
border: 1px solid rgba(0, 212, 255, 0.15);
border-radius: 8px;
```

### Buttons

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `--accent-blue` | white | none |
| Secondary | transparent | `--accent-cyan` | 1px `--accent-cyan` |
| Cyber | `rgba(0, 212, 255, 0.1)` | `--accent-cyan` | 1px `--accent-cyan` |
| Ghost | transparent | `--text-secondary` | none |

### Interaction States

| State | Treatment |
|-------|-----------|
| Hover | Lighten background 10%, shift border color |
| Active | Scale 0.98 |
| Focus | 2px ring offset, `--accent-cyan` color |
| Disabled | opacity 0.5, cursor not-allowed |
| Loading | Pulse animation on button, disable click |

---

## 6. Animation & Motion

### Timing

| Type | Duration | Easing |
|------|----------|--------|
| Micro-interaction | 150ms | ease-out |
| State change | 200ms | ease-in-out |
| Enter/appear | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Page transition | 400ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Ambient/float | 6-8s | ease-in-out (infinite) |

### Motion Principles

- Use `transform` and `opacity` only for animations (GPU-accelerated)
- Never animate `width`, `height`, `top`, `left`
- Scroll-triggered animations via AOS: fade-up, fade-in
- Always respect `prefers-reduced-motion: reduce`
- Hover scale limited to 1.02 max to avoid layout shift

### Signature Animations

| Name | Usage | Duration |
|------|-------|----------|
| `animate-blob` | Background decorative blobs | 7s |
| `animate-float` | Subtle element floating | 6s |
| `animate-subtle-glow` | Card glow on hover | 3s |
| `animate-fade-in` | Section entrance | 0.6s |
| `animate-slide-in` | Card reveal | 0.3s |
| `terminal-cursor` | Blinking cursor in terminal UI | 1s step |

---

## 7. Effects Library

| Effect | Implementation | Usage |
|--------|---------------|-------|
| Glassmorphism | `backdrop-filter: blur(12px)` + semi-transparent bg | Cards, modals, navbar |
| Gradient Text | `background-clip: text` + gradient | Section headings |
| Glow | `box-shadow: 0 0 20px rgba(0,212,255,0.15)` | Hover cards, active states |
| Gradient Border | `border-image` or pseudo-element gradient | Featured cards, CTAs |
| Shimmer | Animated gradient sweep | Loading states |
| Scan Lines | `::before` with repeating-linear-gradient | Terminal/lab sections |

---

## 8. Iconography

| Source | Usage |
|--------|-------|
| FontAwesome (Solid) | UI actions (arrows, close, menu) |
| FontAwesome (Brands) | Tech logos (GitHub, LinkedIn, etc.) |
| React Icons | Supplementary icons |

### Rules

- No emojis as UI icons
- Consistent sizing: 20px (sm), 24px (md), 32px (lg)
- Icons paired with text should be vertically centered
- Interactive icons need 44x44px minimum touch target

---

## 9. Responsive Breakpoints

| Name | Width | Target |
|------|-------|--------|
| Mobile | < 640px | Phones |
| Tablet | 640-1023px | Tablets, small laptops |
| Desktop | 1024-1439px | Laptops |
| Wide | >= 1440px | External monitors |

### Mobile-Specific Rules

- Touch targets: 44x44px minimum
- Safe area insets for notched devices
- Reduced animation complexity
- Stack horizontal layouts vertically
- Full-width cards (no side padding less than 16px)

---

## 10. Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default content |
| Card hover | 10 | Elevated cards |
| Sticky header | 20 | Navbar |
| Dropdown | 30 | Menus, tooltips |
| Modal backdrop | 40 | Overlay |
| Modal | 50 | Dialog content |
| Toast | 60 | Notifications |
| AI Chat | 70 | Chat widget (always accessible) |

---

## 11. Accessibility Checklist

- [x] Color contrast ratios meet WCAG AA (4.5:1 body, 3:1 large)
- [x] Focus rings visible on all interactive elements
- [x] `prefers-reduced-motion` disables non-essential animation
- [x] Semantic HTML (`nav`, `main`, `section`, `article`)
- [x] Alt text on all meaningful images
- [x] `aria-label` on icon-only buttons
- [x] Tab order follows visual reading order
- [x] Form inputs have associated labels
- [x] Skip-to-content link available

---

## 12. Anti-Patterns to Avoid

- Excessive animation that distracts from content
- Neon colors on body text (reserve for accents only)
- Glass effects with insufficient contrast in light mode
- Layout shifts from hover scale transforms > 1.02
- Mixing more than 3 accent colors in a single view
- Inconsistent border-radius across components
- Z-index values without a defined scale
