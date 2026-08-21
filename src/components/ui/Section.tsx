import React from "react";

/**
 * The shared home-page section shell. Every section used to hand-write the
 * same vertical rhythm and background pair, which meant a theme change had to
 * be made in eight places. Change it here instead.
 */

export const sectionShell = "py-12 sm:py-16 md:py-20 bg-[#FAFAF9] dark:bg-[#0B1220]";

/** Container widths, named by intent rather than by number. */
export const CONTAINER_WIDTH = {
  /** Long-form prose. */
  narrow: "max-w-3xl",
  /** Default reading column for text sections. */
  default: "max-w-4xl",
  /** Index and landing layouts. */
  wide: "max-w-5xl",
  /** Card grids. */
  grid: "max-w-6xl",
  /** Card grids that want the full page measure. */
  page: "max-w-7xl",
} as const;

export type ContainerWidth = keyof typeof CONTAINER_WIDTH;

export const containerShell = (width: ContainerWidth = "default") =>
  `container mx-auto px-4 sm:px-6 md:px-8 ${CONTAINER_WIDTH[width]}`;

interface SectionProps {
  id?: string;
  width?: ContainerWidth;
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
  width = "default",
  className = "",
  containerClassName = "",
  container = true,
  children,
}: SectionProps) {
  return (
    <section id={id} className={`${sectionShell} ${className}`.trim()}>
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
