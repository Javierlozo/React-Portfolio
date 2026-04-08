import { LABS, getLabPath, type CybersecurityLab } from "./labs";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lab: CybersecurityLab;
  labPath: string;
}

/**
 * SEO-optimized titles and descriptions for each lab.
 * These target long-tail search queries.
 */
const BLOG_METADATA: Record<string, { title: string; description: string; date: string }> = {
  "tcpdump-traffic-analysis": {
    title: "Analyzing Network Traffic with tcpdump: Detecting Brute Force Attacks and .env Probing",
    description:
      "A hands-on walkthrough of using tcpdump to analyze PCAP files, detect WordPress brute-force attacks with Hydra, identify .env probing attempts, and understand why plaintext HTTP is dangerous in production environments.",
    date: "2026-02-15",
  },
  "wireshark-packet-analysis": {
    title: "Wireshark Packet Analysis: Investigating a 628K-Packet Capture for Attack Patterns",
    description:
      "How to use Wireshark's protocol hierarchy, conversation statistics, and HTTP stream following to investigate a large PCAP, reconstruct a successful WordPress brute-force login, and export HTTP objects from captured traffic.",
    date: "2026-03-10",
  },
  "vpc-flow-logs": {
    title: "AWS VPC Flow Log Analysis: Investigating 173K Records to Map an Attacker's Full Kill Chain",
    description:
      "A hands-on walkthrough of analyzing AWS VPC Flow Logs at scale: extracting 33K attacker flows from 579 compressed log files, quantifying 265MB of data exfiltration on a non-standard port, determining the attack timeframe, and confirming the complete attack surface using PCAP-to-NetFlow conversion with nfpcapd and nfdump.",
    date: "2026-04-08",
  },
  "password-auditing": {
    title: "Password Auditing with John the Ripper and Hashcat: Cracking Office, NTLM, and Linux Hashes",
    description:
      "A hands-on walkthrough of password auditing across four hash types: extracting and cracking an Office 2013 encrypted spreadsheet, NTLM hashes, and Linux SHA-512 crypt passwords using John the Ripper with a CeWL wordlist, demonstrating brute-force infeasibility with Hashcat, and expanding 1,552 words into 4M+ candidates with word-mangling rules to crack passwords the base wordlist missed.",
    date: "2026-04-08",
  },
};

/**
 * Each blog post wraps a lab with an SEO-friendly title and description
 * targeting search queries recruiters and practitioners actually use.
 */
export const BLOG_POSTS: BlogPost[] = LABS.filter((l) => !l.comingSoon).map((lab) => {
  const mapping = BLOG_METADATA[lab.slug];
  return {
    slug: lab.slug,
    title: mapping?.title ?? lab.title,
    description: mapping?.description ?? lab.summary,
    date: mapping?.date ?? "2026-02-01",
    tags: [...(lab.tools || []), ...(lab.skillsDemonstrated?.slice(0, 3) || [])],
    lab,
    labPath: getLabPath(lab),
  };
});

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
