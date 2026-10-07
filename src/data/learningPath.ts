export interface LearningItem {
  id: string;
  label: string;
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
  /** Work in flight, with finer detail than certTimeline (lab counts, exam dates). */
  inProgress: LearningItem[];
}

export const learningPath: LearningPathData = {
  lastUpdated: "2026-10-03",
  inProgress: [
    {
      id: "portswigger",
      label: "PortSwigger Web Academy",
      meta: "BSCP exam Dec 19, 2026",
      progress: {
        current: 10,
        total: 61,
        unit: "Apprentice labs",
      },
    },
    {
      id: "scs",
      label: "AWS Security Specialty",
      meta: "SCS-C03, target Q1 2027",
    },
  ],
};

/**
 * Single source of truth for cert status across the site. The /now table, the
 * Credentials "Planned" pills, and any future surface all
 * read from here so they cannot drift apart.
 */
export const certTimeline: CertTimelineEntry[] = [
  { name: "GIAC GCIH (SEC504)", status: "Passed", date: "Aug 2026" },
  { name: "GIAC GSEC", status: "Passed", date: "Apr 2026" },
  { name: "GIAC GFACT", status: "Passed", date: "Jan 2026" },
  { name: "AWS Security Specialty (SCS-C03)", status: "In progress", date: "Target Q1 2027" },
  { name: "PortSwigger BSCP", status: "In progress", date: "Target Q4 2026" },
  { name: "TryHackMe AI Security (AI1)", status: "Planned", date: "Late 2026" },
  { name: "HackTheBox AI Red Teamer path", status: "Planned", date: "2027" },
  { name: "TCM PWPA (Web Pentest)", status: "Planned", date: "2027" },
];

export const certsByStatus = (status: CertStatus) =>
  certTimeline.filter((c) => c.status === status);
