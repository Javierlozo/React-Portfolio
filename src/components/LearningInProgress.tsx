"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faCodeBranch,
  faSpinner,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

interface LabInProgress {
  id: number;
  title: string;
  platform: string;
  summary: string;
  link?: string;
  /** Shown as "Coming soon" when no content yet */
  planned?: boolean;
}

interface BadgeEarned {
  id: number;
  title: string;
  platform: string;
  summary: string;
  verifyLink?: string;
}

interface WriteUpLink {
  id: number;
  label: string;
  url: string;
  description?: string;
}

const LABS_IN_PROGRESS: LabInProgress[] = [
  {
    id: 1,
    title: "Tcpdump",
    platform: "Self-paced / lab",
    summary: "Packet capture and CLI analysis; filters, protocols, and traffic inspection.",
    planned: true,
  },
  {
    id: 2,
    title: "Wireshark",
    platform: "Self-paced / lab",
    summary: "Traffic analysis and PCAP deep-dive; protocol dissection and incident response.",
  },
  {
    id: 3,
    title: "AWS VPC Flow Logs",
    platform: "AWS / lab",
    summary: "Cloud network visibility; capturing and analyzing VPC flow logs for security and troubleshooting.",
  },
];

const BADGES_EARNED: BadgeEarned[] = [
  {
    id: 1,
    title: "Complete Beginner",
    platform: "TryHackMe",
    summary: "Cybersecurity fundamentals: networking, web security, and ethical hacking basics.",
    verifyLink: "https://tryhackme.com/certificate/LJHNPB9YI3",
  },
  {
    id: 2,
    title: "Pre Security",
    platform: "TryHackMe",
    summary: "Pre-security concepts, tools, and methodologies for security professionals.",
    verifyLink: "https://tryhackme.com/certificate/TGJRJ0ZZXT",
  },
];

const WRITE_UPS: WriteUpLink[] = [
  {
    id: 1,
    label: "Lab write-ups & notes",
    url: "https://github.com/Javierlozo",
    description: "Sanitized lab notes and write-ups on GitHub.",
  },
];

export default function LearningInProgress() {
  const { theme } = useTheme();

  return (
    <section
      id="learning"
      aria-label="What I'm learning and labs in progress"
      className={`py-16 sm:py-20 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}
    >
      <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
              theme === "dark" ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
            }`}
          >
            What I&apos;m Learning / Labs in Progress
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Current labs, badges earned, and write-ups. Ongoing growth in cybersecurity and secure development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Current labs in progress */}
          <div
            className={`rounded-2xl border-2 p-6 sm:p-8 ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h3
              className={`flex items-center gap-2 text-lg font-medium mb-6 pb-3 border-b ${
                theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              Labs in progress
            </h3>
            <ul className="space-y-4">
              {LABS_IN_PROGRESS.map((lab) => (
                <li key={lab.id} className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {lab.title}
                    </span>
                    {lab.planned ? (
                      <span
                        className={`text-xs font-medium shrink-0 px-2 py-0.5 rounded ${
                          theme === "dark"
                            ? "bg-gray-600 text-gray-300"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        Coming soon
                      </span>
                    ) : lab.link ? (
                      <a
                        href={lab.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium shrink-0 ${
                          theme === "dark" ? "text-amber-400 hover:text-amber-300" : "text-amber-700 hover:text-amber-800"
                        }`}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-0.5" />
                        Open
                      </a>
                    ) : null}
                  </div>
                  <p className={`text-xs text-left ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {lab.platform}
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {lab.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Badges earned */}
          <div
            className={`rounded-2xl border-2 p-6 sm:p-8 ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h3
              className={`flex items-center gap-2 text-lg font-medium mb-6 pb-3 border-b ${
                theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faCertificate} />
              Badges earned
            </h3>
            <ul className="space-y-4">
              {BADGES_EARNED.map((badge) => (
                <li key={badge.id} className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {badge.title}
                    </span>
                    {badge.verifyLink && (
                      <a
                        href={badge.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium shrink-0 ${
                          theme === "dark" ? "text-amber-400 hover:text-amber-300" : "text-amber-700 hover:text-amber-800"
                        }`}
                      >
                        Verify
                      </a>
                    )}
                  </div>
                  <p className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {badge.platform}
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {badge.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub write-ups */}
          <div
            className={`rounded-2xl border-2 p-6 sm:p-8 ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h3
              className={`flex items-center gap-2 text-lg font-medium mb-6 pb-3 border-b ${
                theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faCodeBranch} />
              Write-ups &amp; notes
            </h3>
            <ul className="space-y-4">
              {WRITE_UPS.map((writeUp) => (
                <li key={writeUp.id}>
                  <a
                    href={writeUp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 font-medium text-sm sm:text-base transition-colors ${
                      theme === "dark"
                        ? "text-white hover:text-amber-400"
                        : "text-gray-900 hover:text-amber-700"
                    }`}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs opacity-80 group-hover:opacity-100" />
                    {writeUp.label}
                  </a>
                  {writeUp.description && (
                    <p className={`text-sm mt-1 leading-relaxed ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {writeUp.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
