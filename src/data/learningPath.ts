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
  lastUpdated: "2026-05-02",
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
      meta: "working toward BSCP",
      progress: {
        current: 0,
        total: 47,
        unit: "Practitioner labs",
      },
    },
    {
      id: "aws-ai-practitioner",
      label: "AWS AI Practitioner",
      status: "in-progress",
      meta: "cloud AI fluency",
    },
    {
      id: "llm-redteam",
      label: "LLM Red Team Lab",
      status: "in-progress",
      meta: "4-week prompt injection research, week 1",
    },
  ],
  upcoming: ["PWPA", "PAPA", "AWS Solutions Architect Associate", "OSCP", "PNPT"],
};
