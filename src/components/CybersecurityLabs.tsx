"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask,
  faChevronDown,
  faChevronUp,
  faWrench,
  faListCheck,
  faLightbulb,
  faDownload,
  faImage,
  faBullseye,
  faCertificate,
  faCodeBranch,
  faSpinner,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

export interface LabScreenshot {
  src: string;
  alt?: string;
  caption?: string;
}

export interface CybersecurityLab {
  id: number;
  title: string;
  /** Your role in the lab (e.g. "Solo", "Red team", "Analyst") */
  role?: string;
  /** What environment? What was the goal? */
  context: string;
  tools: string[];
  /** Brief, clear steps taken */
  steps: string[];
  /** Outcome / lessons learned */
  outcome: string;
  /** Link to report PDF or code repo */
  reportDownloadLink?: string;
  reportDownloadLabel?: string;
  screenshots?: LabScreenshot[];
}

interface LabInProgress {
  id: number;
  title: string;
  platform: string;
  summary: string;
  link?: string;
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
  { id: 1, title: "Tcpdump", platform: "SANS", summary: "Packet capture and CLI analysis; filters, protocols, and traffic inspection.", planned: true },
  { id: 2, title: "Wireshark", platform: "SANS", summary: "Traffic analysis and PCAP deep-dive; protocol dissection and incident response." },
  { id: 3, title: "AWS VPC Flow Logs", platform: "SANS", summary: "Cloud network visibility; capturing and analyzing VPC flow logs for security and troubleshooting." },
];

const BADGES_EARNED: BadgeEarned[] = [
  { id: 1, title: "SANS Cyber Academy", platform: "SANS", summary: "Labs and coursework in progress. Tcpdump, Wireshark, AWS VPC Flow Logs and related security fundamentals." },
  { id: 2, title: "Complete Beginner", platform: "TryHackMe", summary: "Networking, web security, and ethical hacking basics.", verifyLink: "https://tryhackme.com/certificate/LJHNPB9YI3" },
  { id: 3, title: "Pre Security", platform: "TryHackMe", summary: "Security concepts, tools, and methodologies.", verifyLink: "https://tryhackme.com/certificate/TGJRJ0ZZXT" },
];

const WRITE_UPS: WriteUpLink[] = [
  { id: 1, label: "Lab write-ups & notes", url: "https://github.com/Javierlozo", description: "Sanitized lab notes and write-ups on GitHub." },
];

const LABS: CybersecurityLab[] = [
  {
    id: 1,
    title: "Tcpdump",
    role: "Solo, Lab",
    context: "Packet capture and CLI analysis. Goal: filters, protocols, and traffic inspection. Lab in progress; update with context when ready.",
    tools: ["tcpdump", "CLI", "filters", "protocols"],
    steps: [
      "Lab in progress. Steps and write-up to be added.",
    ],
    outcome: "Coming soon. Update with outcome when lab is complete.",
  },
  {
    id: 2,
    title: "Wireshark",
    role: "Solo, Lab",
    context: "Traffic analysis and PCAP deep dive. Goal: protocol dissection and incident response. Lab in progress; update with context when ready.",
    tools: ["Wireshark", "PCAP", "tshark", "protocols"],
    steps: [
      "Lab in progress. Steps and write-up to be added.",
    ],
    outcome: "Coming soon. Update with outcome when lab is complete.",
  },
  {
    id: 3,
    title: "AWS VPC Flow Logs",
    role: "Solo, Lab",
    context: "Cloud network visibility. Goal: capturing and analyzing VPC flow logs for security and troubleshooting. Lab in progress; update with context when ready.",
    tools: ["AWS", "VPC", "Flow Logs", "CloudWatch"],
    steps: [
      "Lab in progress. Steps and write-up to be added.",
    ],
    outcome: "Coming soon. Update with outcome when lab is complete.",
  },
];

export default function CybersecurityLabs() {
  const { theme } = useTheme();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="labs" className={`py-16 sm:py-20 ${theme === "dark" ? "bg-[#0B1220]" : "bg-[#FAFAF9]"}`}>
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-6 sm:mb-8 pb-2 border-b w-fit mx-auto ${
              theme === "dark" ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
            }`}
          >
            Labs
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Hands-on labs and evidence of real skill beyond certifications.
          </p>
        </div>

        {/* Labs List */}
        <div className="space-y-6 sm:space-y-8">
          {LABS.map((lab) => {
            const isExpanded = expandedId === lab.id;
            return (
              <article
                key={lab.id}
                className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Lab Header: Title & Role, Tools always visible */}
                <button
                  type="button"
                  onClick={() => toggleExpand(lab.id)}
                  className={`w-full text-left p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 ${
                    theme === "dark" ? "hover:bg-gray-800/80" : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        theme === "dark" ? "bg-gray-700 text-amber-400" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <FontAwesomeIcon icon={faFlask} className="text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <h3
                        className={`text-lg sm:text-xl font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {lab.title}
                      </h3>
                      {lab.role && (
                        <p
                          className={`text-xs sm:text-sm mt-1 ${
                            theme === "dark" ? "text-amber-400/90" : "text-amber-700"
                          }`}
                        >
                          {lab.role}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {lab.tools.map((tool) => (
                          <span
                            key={tool}
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              theme === "dark"
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`flex items-center gap-2 text-sm font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {isExpanded ? "Less" : "Details"}
                    <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="text-sm" />
                  </span>
                </button>

                {/* Expandable: Context, Steps, Outcome, Report link, Screenshots */}
                {isExpanded && (
                  <div
                    className={`border-t px-6 sm:px-8 py-6 sm:py-8 space-y-6 ${
                      theme === "dark" ? "border-gray-700 bg-gray-800/30" : "border-gray-200 bg-gray-50/50"
                    }`}
                  >
                    {/* Context */}
                    <div>
                      <h4
                        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-2 ${
                          theme === "dark" ? "text-amber-400" : "text-amber-700"
                        }`}
                      >
                        <FontAwesomeIcon icon={faBullseye} />
                        Context
                      </h4>
                      <p
                        className={`text-sm sm:text-base leading-relaxed ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {lab.context}
                      </p>
                    </div>

                    {/* Tools Used (repeated in expanded for clarity) */}
                    <div>
                      <h4
                        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <FontAwesomeIcon icon={faWrench} />
                        Tools used
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {lab.tools.map((tool) => (
                          <span
                            key={tool}
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Steps taken */}
                    <div>
                      <h4
                        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-2 ${
                          theme === "dark" ? "text-amber-400" : "text-amber-700"
                        }`}
                      >
                        <FontAwesomeIcon icon={faListCheck} />
                        Steps taken
                      </h4>
                      <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-left">
                        {lab.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className={
                              theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }
                          >
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcome / Lessons learned */}
                    <div>
                      <h4
                        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-2 ${
                          theme === "dark" ? "text-amber-400" : "text-amber-700"
                        }`}
                      >
                        <FontAwesomeIcon icon={faLightbulb} />
                        Outcome / Lessons learned
                      </h4>
                      <p
                        className={`text-sm sm:text-base leading-relaxed ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {lab.outcome}
                      </p>
                    </div>

                    {/* Code or Report download link */}
                    {lab.reportDownloadLink && (
                      <div>
                        <a
                          href={lab.reportDownloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border transition-all duration-300 ${
                            theme === "dark"
                              ? "border-amber-500/60 text-amber-400 hover:bg-amber-500/10"
                              : "border-amber-600 text-amber-700 hover:bg-amber-50"
                          }`}
                        >
                          <FontAwesomeIcon icon={faDownload} />
                          {lab.reportDownloadLabel ?? "Download report"}
                        </a>
                      </div>
                    )}

                    {/* Screenshots or diagrams */}
                    {lab.screenshots && lab.screenshots.length > 0 && (
                      <div>
                        <h4
                          className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <FontAwesomeIcon icon={faImage} />
                          Screenshots / diagrams
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {lab.screenshots.map((shot, idx) => (
                            <figure key={idx} className="space-y-2">
                              <div
                                className={`relative w-full aspect-video rounded-lg overflow-hidden border ${
                                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                                }`}
                              >
                                <Image
                                  src={shot.src}
                                  alt={shot.alt ?? `Screenshot ${idx + 1}`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              {shot.caption && (
                                <figcaption
                                  className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}
                                >
                                  {shot.caption}
                                </figcaption>
                              )}
                            </figure>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p
          className={`text-center text-sm mt-8 ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          Labs are from SANS Cyber Academy.
        </p>

        {/* What I'm Learning / In progress: same section, no duplicate nav */}
        <div className={`mt-16 sm:mt-20 pt-12 sm:pt-16 border-t ${theme === "dark" ? "border-gray-700/50" : "border-gray-300"}`}>
          <h3
            className={`text-xl sm:text-2xl font-thin mb-6 sm:mb-8 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            What I&apos;m Learning / In progress
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className={`rounded-2xl border-2 p-5 sm:p-6 ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <h4 className={`flex items-center gap-2 text-base font-medium mb-4 pb-2 border-b ${theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-200"}`}>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Labs in progress
              </h4>
              <ul className="space-y-3">
                {LABS_IN_PROGRESS.map((lab) => (
                  <li key={lab.id} className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`font-medium text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{lab.title}</span>
                      {lab.planned ? (
                        <span className={`text-xs font-medium shrink-0 px-2 py-0.5 rounded ${theme === "dark" ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"}`}>Coming soon</span>
                      ) : lab.link ? (
                        <a href={lab.link} target="_blank" rel="noopener noreferrer" className={`text-xs font-medium shrink-0 ${theme === "dark" ? "text-amber-400 hover:text-amber-300" : "text-amber-700 hover:text-amber-800"}`}>
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-0.5" /> Open
                        </a>
                      ) : null}
                    </div>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{lab.platform}</p>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{lab.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl border-2 p-5 sm:p-6 ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <h4 className={`flex items-center gap-2 text-base font-medium mb-4 pb-2 border-b ${theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-200"}`}>
                <FontAwesomeIcon icon={faCertificate} />
                Badges earned
              </h4>
              <ul className="space-y-3">
                {BADGES_EARNED.map((badge) => (
                  <li key={badge.id} className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`font-medium text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{badge.title}</span>
                      {badge.verifyLink && (
                        <a href={badge.verifyLink} target="_blank" rel="noopener noreferrer" className={`text-xs font-medium shrink-0 ${theme === "dark" ? "text-amber-400 hover:text-amber-300" : "text-amber-700 hover:text-amber-800"}`}>Verify</a>
                      )}
                    </div>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{badge.platform}</p>
                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{badge.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl border-2 p-5 sm:p-6 ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
              <h4 className={`flex items-center gap-2 text-base font-medium mb-4 pb-2 border-b ${theme === "dark" ? "text-amber-400 border-gray-700" : "text-amber-700 border-gray-200"}`}>
                <FontAwesomeIcon icon={faCodeBranch} />
                Write-ups &amp; notes
              </h4>
              <ul className="space-y-3">
                {WRITE_UPS.map((w) => (
                  <li key={w.id}>
                    <a href={w.url} target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-2 font-medium text-sm ${theme === "dark" ? "text-white hover:text-amber-400" : "text-gray-900 hover:text-amber-700"}`}>
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs opacity-80 group-hover:opacity-100" />
                      {w.label}
                    </a>
                    {w.description && <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{w.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
