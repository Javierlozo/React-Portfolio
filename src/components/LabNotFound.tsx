"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LabNotFound() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
      <div className="container mx-auto px-3 sm:px-6 max-w-3xl">
        <h1 className={`text-2xl font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Lab not found
        </h1>
        <Link
          href="/#security-labs"
          className={`inline-flex items-center gap-2 mt-4 text-sm ${theme === "dark" ? "text-amber-400" : "text-amber-700"}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Security Labs
        </Link>
      </div>
    </div>
  );
}
