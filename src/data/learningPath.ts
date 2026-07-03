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

export interface LearningPathData {
  lastUpdated: string;
  staleAfterDays: number;
  current: LearningItem[];
  upcoming: string[];
}

export const learningPath: LearningPathData = {
  lastUpdated: "2026-07-03",
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
      status: "in-progress",
      meta: "SANS SEC504, target Aug 2026",
    },
    {
      id: "portswigger",
      label: "PortSwigger Web Academy",
      status: "in-progress",
      meta: "Working toward BSCP",
      progress: {
        current: 26,
        total: 52,
        unit: "Apprentice labs",
      },
    },
    {
      id: "pwpa",
      label: "TCM PWPA",
      status: "in-progress",
      meta: "Practical Web Pentest Associate",
    },
    {
      id: "scs",
      label: "AWS Security Specialty",
      status: "in-progress",
      meta: "SCS-C02, target Sept 2026",
    },
  ],
  upcoming: ["AWS Solutions Architect Associate (SAA-C03), bounty stack"],
};
