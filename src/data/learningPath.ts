export type LearningStatus = "done" | "in-progress";

export interface LearningItem {
  id: string;
  label: string;
  status: LearningStatus;
  meta?: string;
  progress?: {
    current: number;
    total: number;
    unit: string;
  };
}

export type CertStatus = "Passed" | "In progress" | "Planned";

export interface CertTimelineEntry {
  name: string;
  status: CertStatus;
  date: string;
}

export interface LearningPathData {
  lastUpdated: string;
  staleAfterDays: number;
  current: LearningItem[];
  upcoming: string[];
}

export const learningPath: LearningPathData = {
  lastUpdated: "2026-08-21",
  staleAfterDays: 30,
  current: [
    {
      id: "gfact",
      label: "GIAC GFACT",
      status: "done",
      meta: "Foundational Cybersecurity",
    },
    {
      id: "gsec",
      label: "GIAC GSEC",
      status: "done",
      meta: "passed Apr 2026",
    },
    {
      id: "gcih",
      label: "GIAC GCIH",
      status: "done",
      meta: "SANS SEC504, passed Aug 2026",
    },
    {
      id: "portswigger",
      label: "PortSwigger Web Academy",
      status: "in-progress",
      meta: "Working toward BSCP, target Q4 2026",
      progress: {
        current: 26,
        total: 52,
        unit: "Apprentice labs",
      },
    },
    {
      id: "aif",
      label: "AWS AI Practitioner",
      status: "in-progress",
      meta: "AIF-C01, target Sept 2026",
    },
    {
      id: "scs",
      label: "AWS Security Specialty",
      status: "in-progress",
      meta: "SCS-C02, target Oct 2026",
    },
  ],
  upcoming: [
    "TryHackMe AI Security (AI1)",
    "HackTheBox AI Red Teamer path",
    "TCM PWPA (Web Pentest)",
  ],
};

/**
 * Single source of truth for cert status across the site. The /now table, the
 * Certifications "In progress" and "Planned" pills, and any future surface all
 * read from here so they cannot drift apart.
 */
export const certTimeline: CertTimelineEntry[] = [
  { name: "GIAC GCIH (SEC504)", status: "Passed", date: "Aug 2026" },
  { name: "GIAC GSEC", status: "Passed", date: "Apr 2026" },
  { name: "GIAC GFACT", status: "Passed", date: "Jan 2026" },
  { name: "SANS Foundations Alumni", status: "Passed", date: "Dec 2025" },
  { name: "AWS AI Practitioner (AIF-C01)", status: "In progress", date: "Target Sept 2026" },
  { name: "AWS Security Specialty (SCS-C02)", status: "In progress", date: "Target Oct 2026" },
  { name: "PortSwigger BSCP", status: "In progress", date: "Target Q4 2026" },
  { name: "TryHackMe AI Security (AI1)", status: "Planned", date: "Late 2026" },
  { name: "HackTheBox AI Red Teamer path", status: "Planned", date: "2027" },
  { name: "TCM PWPA (Web Pentest)", status: "Planned", date: "2027" },
];

export const certsByStatus = (status: CertStatus) =>
  certTimeline.filter((c) => c.status === status);
