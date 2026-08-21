export type NotesRepoStatus = "in-progress" | "upcoming" | "done";

export interface NotesSection {
  slug: string;
  title: string;
}

export interface NotesRepo {
  slug: string;
  name: string;
  shortName: string;
  cert: string;
  status: NotesRepoStatus;
  blurb: string;
  repoUrl: string;
  repoName: string;
  logoUrl: string;
  sections: NotesSection[];
}

export const NOTES_REPOS: NotesRepo[] = [
  {
    slug: "tcm-pbb",
    name: "TCM Practical Bug Bounty (PBB)",
    shortName: "TCM PBB",
    cert: "Web pentest practice. PWPA exam planned.",
    status: "in-progress",
    blurb:
      "TCM Security's practical web pentest course. Methodology, hands-on labs, full attack chains. I'm currently in the reconnaissance section.",
    repoUrl: "https://github.com/Javierlozo/tcm-pwpa-notes",
    repoName: "tcm-pwpa-notes",
    logoUrl: "/logos/pwpa.png",
    sections: [
      { slug: "01-recon", title: "Reconnaissance" },
      { slug: "02-auth-attacks", title: "Auth & Authorization" },
      { slug: "03-injection-attacks", title: "Injection" },
      { slug: "04-automated-tools", title: "Automated Tools" },
      { slug: "05-other-vulns", title: "Other Common Bugs" },
      { slug: "06-reporting", title: "Reporting" },
      { slug: "07-evasion", title: "Evasion" },
      { slug: "lab-writeups", title: "Lab Writeups" },
    ],
  },
  {
    slug: "portswigger-academy",
    name: "PortSwigger Web Security Academy",
    shortName: "PortSwigger Academy",
    cert: "Burp Suite Certified Practitioner (BSCP) prep",
    status: "in-progress",
    blurb:
      "PortSwigger's free web security academy. Apprentice → Practitioner → Expert. Currently grinding the server-side track at Apprentice level.",
    repoUrl: "https://github.com/Javierlozo/portswigger-academy-notes",
    repoName: "portswigger-academy-notes",
    logoUrl: "/logos/BSCP.png",
    sections: [
      { slug: "server-side", title: "Server-side" },
      { slug: "client-side", title: "Client-side" },
      { slug: "advanced", title: "Advanced" },
      { slug: "bscp-prep", title: "BSCP Prep" },
      { slug: "lab-writeups", title: "Lab Writeups" },
    ],
  },
];

export const NOTES_ROADMAP: { label: string; status: "in-progress" | "next" | "later" }[] = [
  { label: "TCM Practical Bug Bounty (PBB), course in progress", status: "in-progress" },
  { label: "PortSwigger Web Academy, Apprentice level, in progress", status: "in-progress" },
  { label: "TCM PWPA exam", status: "later" },
  { label: "PortSwigger BSCP exam", status: "next" },
  { label: "OffSec OSWE", status: "later" },
];
