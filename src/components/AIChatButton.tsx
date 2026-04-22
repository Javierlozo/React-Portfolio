"use client";

import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import AIChatModal from "./AIChatModal";

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 font-semibold text-sm bg-green-700 hover:bg-green-800 text-white shadow-green-700/25 dark:bg-green-500 dark:hover:bg-green-400 dark:text-gray-900 dark:shadow-green-500/25"
        aria-label="Ask AI About Luis"
      >
        <FontAwesomeIcon icon={faBolt} className="w-5 h-5" />
        <span className="hidden sm:inline">Ask AI</span>
      </button>

      {isOpen && <AIChatModal onClose={handleClose} />}
    </>
  );
}
