"use client";

import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FiZap } from "react-icons/fi";
import AIChatModal from "./AIChatModal";

export default function AIChatButton() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[50] flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 font-semibold text-sm ${
          theme === "dark"
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-cyan-500/25"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25"
        }`}
        aria-label="Ask AI About Luis"
      >
        <FiZap className="w-5 h-5" />
        <span className="hidden sm:inline">Ask AI</span>
      </button>

      {isOpen && <AIChatModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
