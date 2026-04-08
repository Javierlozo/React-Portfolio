"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

interface BorderDrawButtonProps {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  download?: boolean;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * Shared secondary button with animated border-draw on hover.
 * Used across Hero, Footer, and Lab cards for consistent styling.
 */
export default function BorderDrawButton({
  children,
  as = "button",
  href,
  download,
  onClick,
  className = "",
  target,
  rel,
}: BorderDrawButtonProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const baseClass = `relative group px-5 sm:px-8 py-2.5 sm:py-3 text-xs font-light tracking-widest uppercase overflow-hidden inline-flex items-center justify-center gap-2 min-h-[44px] ${className}`;

  const textColor = dark
    ? "text-gray-300 group-hover:text-white"
    : "text-gray-600 group-hover:text-gray-900";

  const lineColor = dark ? "bg-white" : "bg-gray-900";

  const inner = (
    <>
      <span className={`relative z-10 transition-colors duration-300 ${textColor}`}>
        {children}
      </span>
      <span className={`absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${lineColor}`} />
      <span className={`absolute right-0 bottom-0 w-[1px] h-0 transition-all duration-300 delay-150 group-hover:h-full ${lineColor}`} />
      <span className={`absolute top-0 right-0 h-[1px] w-0 transition-all duration-300 delay-300 group-hover:w-full ${lineColor}`} />
      <span className={`absolute left-0 top-0 w-[1px] h-0 transition-all duration-300 delay-[450ms] group-hover:h-full ${lineColor}`} />
    </>
  );

  if (as === "a") {
    return (
      <a href={href} download={download} target={target} rel={rel} className={baseClass}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {inner}
    </button>
  );
}
