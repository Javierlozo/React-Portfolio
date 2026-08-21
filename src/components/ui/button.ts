/**
 * Shared action-button styles.
 *
 * The llm-audit section and /now already used this shape; the portfolio cards
 * had drifted to square corners, a lighter weight and a gray hover, so the same
 * "View Code" action looked like two different buttons depending on where it
 * appeared. One definition instead.
 */

const base =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors";

/** Filled. One per group, for the action you want taken. */
export const buttonPrimary = `${base} bg-gray-900 text-white border-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100 dark:hover:bg-white`;

/** Outlined, warm hover. Everything else. */
export const buttonSecondary = `${base} bg-surface-card text-content border-gray-300 hover:border-amber-400 hover:bg-amber-50 dark:border-gray-700 dark:hover:border-amber-500/50`;
