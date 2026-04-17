"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LabNotFound() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-[#FAFAF9] dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-3xl">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">
          Lab not found
        </h1>
        <Link
          href="/#security-labs"
          className="inline-flex items-center gap-2 mt-4 text-sm text-amber-700 dark:text-amber-400"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Security Labs
        </Link>
      </div>
    </div>
  );
}
