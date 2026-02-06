export interface LabScreenshot {
  src: string;
  alt?: string;
  caption?: string;
}

export interface LabStep {
  title: string;
  description: string;
  command?: string;
  /** Brief explanation of each flag (e.g. "-n: no hostname lookup") */
  commandBreakdown?: string;
  screenshot?: string;
}

export interface CybersecurityLab {
  id: number;
  /** URL segment for course (e.g. "sec401", "aws") */
  courseSlug: string;
  /** URL segment for this lab (e.g. "tcpdump-traffic-analysis") */
  slug: string;
  /** Legacy flat slug for redirects (e.g. "sec401-tcpdump") */
  legacySlug?: string;
  title: string;
  course?: string;
  role?: string;
  /** Focus area (e.g. "Network Forensics") */
  focus?: string;
  /** Level/course code (e.g. "SEC401") */
  level?: string;
  /** Completion date (e.g. "Feb 2026") */
  date?: string;
  /** Artifacts included (e.g. "Sanitized screenshots + my own DNS capture PCAP") */
  artifacts?: string;
  /** 3-line TL;DR for recruiters */
  tldr?: string[];
  /** Skills demonstrated (ATS-friendly) */
  skillsDemonstrated?: string[];
  context: string;
  /** Brief summary for main page card (1–2 sentences) */
  summary: string;
  /** Why this matters in a real attack; show early */
  whyThisMatters: string;
  tools: string[];
  steps: string[];
  stepDetails?: LabStep[];
  outcome: string;
  /** What you'd do next in a real production environment */
  nextStepsInProduction?: string;
  /** Security controls relevant to findings */
  securityControlsRelevant?: string[];
  keyFindings?: string[];
  reportDownloadLink?: string;
  reportDownloadLabel?: string;
  screenshots?: LabScreenshot[];
  comingSoon?: boolean;
}

export const LABS: CybersecurityLab[] = [
  {
    id: 1,
    courseSlug: "sec401",
    slug: "tcpdump-traffic-analysis",
    legacySlug: "sec401-tcpdump",
    title: "Lab 1.1 – tcpdump Traffic Analysis",
    course: "SEC401 – Network Forensics",
    role: "Solo, Lab",
    context: "This lab demonstrates how to analyze network traffic using tcpdump and extract meaningful patterns from a PCAP file.",
    summary: "Analyzed PCAP traffic with tcpdump: identified /.env probing, WordPress brute-force with Hydra, and cleartext login parameters visible in the HTTP payload.",
    whyThisMatters: "In a real attack, unencrypted HTTP exposes credentials to anyone on the network. This is what defenders see when investigating a breach, and why HTTPS and secure credential handling are non-negotiable in production.",
    focus: "Network Forensics",
    level: "SEC401",
    date: "Feb 2026",
    artifacts: "Sanitized screenshots + my own DNS capture PCAP",
    tldr: [
      ".env probing attempt observed",
      "WordPress login brute force detected",
      "Demonstrates credential exposure risk over plaintext HTTP",
    ],
    skillsDemonstrated: [
      "Packet capture triage",
      "tcpdump filtering",
      "HTTP session analysis",
      "DNS correlation",
      "Attacker pattern recognition",
    ],
    tools: ["tcpdump", "dig", "PCAP analysis", "CLI"],
    steps: [
      "Initial packet overview: tcpdump -n -r investigate.pcap -c 20 -#",
      "Filtered session 1 (135.125.217.54): GET /.env, 404",
      "Read session.pcap: tcpdump -n -r session.pcap -#",
      "HTTP payload extraction: wp-login.php, visible login parameters",
      "Correlate with dig alphainc.ca NS",
      "Live DNS capture and read created_capture.pcap",
      "DNS payload extraction: tcpdump -X on created_capture.pcap",
    ],
    stepDetails: [
      {
        title: "Initial packet overview",
        description: "Read the first 20 packets from investigate.pcap to get a high-level view of traffic types (DNS, TCP, HTTP).",
        command: "tcpdump -n -r investigate.pcap -c 20 -#",
        commandBreakdown: "-n: no DNS/port lookup\n-r: read from file\n-c 20: stop after 20 packets\n-#: print packet number",
        screenshot: "/labs/tcpdump-145021.png",
      },
      {
        title: "Filtering session 1: GET /.env",
        description: "Filtered TCP traffic between 135.125.217.54 and 10.130.8.94 (ports 44366 and 80). Revealed an HTTP GET request for /.env; server responded 404 Not Found.",
        command: "tcpdump -n -r investigate.pcap 'tcp and (host 135.125.217.54 and host 10.130.8.94) and (port 44366 and port 80)'",
        commandBreakdown: "Filter: tcp + host/port pair",
        screenshot: "/labs/tcpdump-150012.png",
      },
      {
        title: "Read session.pcap",
        description: "Read session.pcap to view the filtered wp-login session packets.",
        command: "tcpdump -n -r session.pcap -#",
        screenshot: "/labs/tcpdump-150547.png",
      },
      {
        title: "HTTP payload extraction: visible login parameters",
        description: "Dumped packet contents. Revealed cleartext HTTP POST to /wp-login.php with Hydra user-agent and visible login parameters (redacted).",
        command: "tcpdump -n -r session.pcap -X -v -c 4",
        commandBreakdown: "-X: hex and ASCII payload; -v: verbose; -c 4: stop after 4 packets",
        screenshot: "/labs/tcpdump-150815.png",
      },
      {
        title: "Correlate with dig",
        description: "Used dig to query NS records for alphainc.ca, correlating with the captured DNS traffic.",
        command: "dig alphainc.ca NS",
        commandBreakdown: "alphainc.ca: domain; NS: name server",
        screenshot: "/labs/tcpdump-151413.png",
      },
      {
        title: "Live DNS capture and read",
        description: "Captured live UDP traffic on port 53 (DNS) with sudo tcpdump, wrote to created_capture.pcap, then read the capture to view DNS queries and responses.",
        command: "sudo tcpdump -n -i eth0 -w created_capture.pcap 'udp port 53'\ntcpdump -n -r created_capture.pcap",
        commandBreakdown: "-i: interface; -w: write to file; Filter: udp port 53",
        screenshot: "/labs/tcpdump-151524.png",
      },
      {
        title: "DNS payload extraction",
        description: "Dumped DNS packet contents in hex and ASCII, revealing domain names in the payload.",
        command: "tcpdump -n -r created_capture.pcap -X",
        screenshot: "/labs/tcpdump-151610.png",
      },
    ],
    outcome:
      "This lab reinforced how quickly attacker behavior stands out in raw packet captures once you know what to filter for. It also highlighted how dangerous plaintext HTTP is in real environments, since authentication data can be recovered directly from packet payloads.",
    nextStepsInProduction:
      "If this were production: I'd confirm whether the source was internal or external, check web server logs for repeated attempts, enforce HTTPS, and apply rate limiting or WAF protections around authentication endpoints.",
    securityControlsRelevant: [
      "Enforce HTTPS (HSTS)",
      "Rate-limit wp-login",
      "WAF rules for /.env probing",
      "Centralized logging + alerting (SIEM)",
    ],
    keyFindings: [
      "HTTP GET /.env from 135.125.217.54 to 10.130.8.94; server returned 404",
      "HTTP POST /wp-login.php with Hydra user-agent",
      "DNS NS lookup mapped alphainc.ca to AWS nameservers",
    ],
    screenshots: [
      { src: "/labs/tcpdump-145021.png", alt: "Step 1: Initial packet overview", caption: "tcpdump -n -r investigate.pcap -c 20 -#" },
      { src: "/labs/tcpdump-150012.png", alt: "Step 2: Filtered session 1", caption: "GET /.env, 404 (135.125.217.54)" },
      { src: "/labs/tcpdump-150547.png", alt: "Step 3: Read session.pcap", caption: "tcpdump -n -r session.pcap -#" },
      { src: "/labs/tcpdump-150815.png", alt: "Step 4: HTTP payload extraction", caption: "tcpdump -n -r session.pcap -X -v -c 4 (wp-login.php, visible login parameters)" },
      { src: "/labs/tcpdump-151413.png", alt: "Step 5: Correlate with dig", caption: "dig alphainc.ca NS" },
      { src: "/labs/tcpdump-151524.png", alt: "Step 6: Live DNS capture and read", caption: "sudo tcpdump -n -i eth0 -w created_capture.pcap 'udp port 53'; tcpdump -n -r created_capture.pcap" },
      { src: "/labs/tcpdump-151610.png", alt: "Step 7: DNS payload extraction", caption: "tcpdump -n -r created_capture.pcap -X" },
    ],
  },
  {
    id: 2,
    courseSlug: "sec401",
    slug: "wireshark-filters",
    legacySlug: "wireshark",
    title: "Wireshark",
    course: "SEC401 – Network Forensics",
    role: "Solo, Lab",
    context: "Traffic analysis and PCAP deep dive. Goal: protocol dissection and incident response.",
    summary: "Coming soon.",
    whyThisMatters: "",
    tools: ["Wireshark", "PCAP", "tshark", "protocols"],
    steps: ["Coming soon."],
    outcome: "Coming soon.",
    comingSoon: true,
  },
  {
    id: 3,
    courseSlug: "aws",
    slug: "vpc-flow-logs",
    legacySlug: "aws-vpc-flow-logs",
    title: "AWS VPC Flow Logs",
    course: "SEC401 – Network Forensics",
    role: "Solo, Lab",
    context: "Cloud network visibility. Goal: capturing and analyzing VPC flow logs for security and troubleshooting.",
    summary: "Coming soon.",
    whyThisMatters: "",
    tools: ["AWS", "VPC", "Flow Logs", "CloudWatch"],
    steps: ["Coming soon."],
    outcome: "Coming soon.",
    comingSoon: true,
  },
];

export function getLabByCourseAndSlug(courseSlug: string, slug: string): CybersecurityLab | undefined {
  return LABS.find((l) => l.courseSlug === courseSlug && l.slug === slug);
}

export function getLabPath(lab: CybersecurityLab): string {
  return `/labs/${lab.courseSlug}/${lab.slug}`;
}

/** For redirects from legacy flat URLs */
export function getLabByLegacySlug(legacySlug: string): CybersecurityLab | undefined {
  return LABS.find((l) => l.legacySlug === legacySlug);
}

export function getLabBySlug(slug: string): CybersecurityLab | undefined {
  return LABS.find((l) => l.slug === slug || l.legacySlug === slug);
}
