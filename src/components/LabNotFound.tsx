"use client";
import React from "react";
import { containerShell } from "./ui/Section";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LabNotFound() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-surface">
      <div className={containerShell("narrow")}>
        <h1 className="text-xl sm:text-2xl font-medium text-content">
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
