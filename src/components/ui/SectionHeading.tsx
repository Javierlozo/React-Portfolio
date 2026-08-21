import React from "react";

/**
 * The centered section heading used across the home page. There were eight
 * near-identical copies of these class strings, differing only in margin, so
 * they drifted every time one of them was edited.
 *
 * Components that animate their own heading (About uses RevealText, Labs
 * wraps an icon row) import the class constants directly instead of the
 * component.
 */

export const headingClass =
  "text-2xl sm:text-3xl md:text-4xl font-thin text-gray-900 dark:text-white";

/** Heading plus the thin rule underneath it. */
export const headingRuleClass = `${headingClass} pb-2 border-b w-fit mx-auto border-gray-200 dark:border-gray-700`;

export const ledeClass =
  "text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300";

export const eyebrowClass =
  "font-mono text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400";

export const headerWrapMargin = "mb-10 sm:mb-12 md:mb-16";
export const headerWrapClass = `text-center ${headerWrapMargin}`;

interface SectionHeadingProps {
  title: React.ReactNode;
  /** Small uppercase label above the title. */
  eyebrow?: React.ReactNode;
  /** Supporting line below the title. */
  children?: React.ReactNode;
  /** The thin rule under the title. On by default. */
  rule?: boolean;
  /** Gap below the title, tightened when there is no lede. */
  titleMargin?: string;
  /** Gap below the whole header block. */
  margin?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  eyebrow,
  children,
  rule = true,
  titleMargin,
  margin = headerWrapMargin,
  className = "",
}: SectionHeadingProps) {
  const titleGap = titleMargin ?? (children ? "mb-6 sm:mb-8" : "mb-3");
  return (
    <div className={`text-center ${margin} ${className}`.trim()}>
      {eyebrow && <p className={`${eyebrowClass} mb-3`}>{eyebrow}</p>}
      <h2 className={`${rule ? headingRuleClass : headingClass} ${titleGap}`}>
        {title}
      </h2>
      {children && <p className={ledeClass}>{children}</p>}
    </div>
  );
}
