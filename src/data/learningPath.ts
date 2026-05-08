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
  lastUpdated: "2026-05-08",
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
      meta: "Apprentice level, working toward BSCP",
      progress: {
        current: 8,
        total: 61,
        unit: "Apprentice labs",
      },
    },
    {
      id: "pwpa",
      label: "PWPA",
      status: "in-progress",
      meta: "TCM Practical Bug Bounty course in progress",
    },
  ],
  upcoming: ["AWS AI Practitioner", "PAPA", "AWS Solutions Architect Associate"],
};
