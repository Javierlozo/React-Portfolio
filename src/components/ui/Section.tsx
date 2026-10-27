import React from "react";

/**
 * The shared home-page section shell. Every section used to hand-write the
 * same vertical rhythm and background pair, which meant a theme change had to
 * be made in eight places. Change it here instead.
 */

const SECTION_PAD = "py-12 sm:py-16 md:py-20";

/**
 * Background tones. Alternating them marks where one section ends and the
 * next begins. `inverted` is dark in both themes: the `dark` class flips the
 * Tailwind dark: variants and the CSS tokens (see globals.css) inside it.
 */
export const SECTION_TONE = {
  base: "bg-[#FAFAF9] dark:bg-[#0B1220]",
  alt: "bg-stone-100 border-y border-stone-200 dark:bg-[#131C2E] dark:border-white/5",
  inverted: "dark bg-[#05080F] border-t border-amber-500/40 text-[var(--fg)]",
} as const;

export type SectionTone = keyof typeof SECTION_TONE;

export const sectionClass = (tone: SectionTone = "base") =>
  `${SECTION_PAD} ${SECTION_TONE[tone]}`;

export const sectionShell = sectionClass();

/** Container widths, named by intent rather than by number. */
export const CONTAINER_WIDTH = {
  /** Tight column, forms and single-purpose panels. */
  narrow: "max-w-3xl",
  /** Body copy. The default for text-led sections. */
  prose: "max-w-4xl",
  /** Feature blocks with code, cards or media alongside text. */
  feature: "max-w-5xl",
  /** Card and tile grids. */
  grid: "max-w-6xl",
  /** Full-bleed layouts that want the whole page measure. */
  page: "max-w-7xl",
} as const;

export type ContainerWidth = keyof typeof CONTAINER_WIDTH;

export const containerShell = (width: ContainerWidth = "prose") =>
  `container mx-auto px-4 sm:px-6 md:px-8 ${CONTAINER_WIDTH[width]}`;

interface SectionProps {
  id?: string;
  width?: ContainerWidth;
  tone?: SectionTone;
  /** Extra classes on the <section> itself. */
  className?: string;
  /** Extra classes on the inner container. */
  containerClassName?: string;
  /** Set false when the component manages its own container (refs, motion). */
  container?: boolean;
  children: React.ReactNode;
}

export default function Section({
  id,
  width = "prose",
  tone = "base",
  className = "",
  containerClassName = "",
  container = true,
  children,
}: SectionProps) {
  return (
    <section id={id} className={`${sectionClass(tone)} ${className}`.trim()}>
      {container ? (
        <div className={`${containerShell(width)} ${containerClassName}`.trim()}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
