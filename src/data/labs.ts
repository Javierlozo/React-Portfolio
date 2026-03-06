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
    slug: "wireshark-packet-analysis",
    legacySlug: "wireshark",
    title: "Lab 1.2 – Wireshark Packet Analysis",
    course: "SEC401 – Network Forensics",
    role: "Solo, Lab",
    context:
      "This lab demonstrates how to use Wireshark's GUI-based packet analysis to investigate a 628K-packet PCAP, identify attack patterns through protocol hierarchy and conversation statistics, and reconstruct attacker sessions using display filters and stream following.",
    summary:
      "Investigated a 628K-packet PCAP in Wireshark: used protocol hierarchy and conversation statistics to surface a port-80 scanning pattern from 3.142.238.241, followed an HTTP stream revealing a successful WordPress brute-force login (Hydra, admin/#AlphaInc!), and completed a live-capture exercise extracting an HTTP object from loopback traffic.",
    whyThisMatters:
      "Wireshark turns raw packets into actionable intelligence. In incident response, the ability to quickly triage hundreds of thousands of packets using statistics, filters, and stream reconstruction is what separates a useful analyst from someone drowning in data. This lab builds exactly that muscle.",
    focus: "Network Forensics",
    level: "SEC401",
    date: "Mar 2026",
    artifacts: "Sanitized screenshots from Wireshark GUI analysis",
    tldr: [
      "Triaged 628K packets using protocol hierarchy and conversation statistics",
      "Reconstructed a successful WordPress brute-force login via HTTP stream following",
      "Completed live capture + HTTP object export on loopback traffic",
    ],
    skillsDemonstrated: [
      "Wireshark protocol hierarchy analysis",
      "Conversation and endpoint statistics",
      "Display filter construction",
      "TCP stream reconstruction",
      "HTTP object export",
      "Live packet capture",
      "Attacker pattern recognition",
    ],
    tools: ["Wireshark", "PCAP analysis", "Display filters", "HTTP stream following"],
    steps: [
      "Opened investigate.pcap (628,631 packets) and inspected initial TCP handshake + GET /.env",
      "Protocol Hierarchy Statistics: TCP 88.2%, HTTP 22.6%, TLS 44.3%, DNS 1.1%",
      "Conversations (TCP): identified 3.142.238.241 scanning port 80 across many ephemeral ports",
      "Endpoints (TCP): confirmed 1.1.1.1, 3.5.129.171, and mass 3.142.238.241 connections",
      "Built display filter: ip.addr == 20.106.124.93",
      "Followed HTTP stream (tcp.stream eq 13299): POST /wp-login.php with Hydra user-agent, 302 Found",
      "Inspected decoded form data: log=admin, pwd=#AlphaInc!, redirect to /wp-admin/",
      "Lab environment setup: ./lab-1.2 start, launched Wireshark with sudo",
      "Browsed localhost:8080/welcome.html, captured loopback HTTP traffic",
      "Applied http filter on live capture, inspected GET /workbook/ requests",
      "Exported HTTP object (file.txt): 'You completed the lab! Congratulations!'",
    ],
    stepDetails: [
      {
        title: "Initial PCAP inspection",
        description:
          "Opened investigate.pcap in Wireshark (628,631 packets). The first packets show a TCP three-way handshake between 135.125.217.54 and 10.130.8.94, followed by an HTTP GET /.env returning 404 Not Found. Same reconnaissance probe identified in Lab 1.1 with tcpdump.",
        screenshot: "/labs/wireshark-093147.png",
      },
      {
        title: "Protocol Hierarchy Statistics",
        description:
          "Statistics → Protocol Hierarchy revealed the traffic composition: TCP dominated at 88.2% (554K packets), with HTTP at 22.6% and TLS at 44.3%. UDP accounted for 11.8%, with DNS at 1.1%. SMB2 (3.1%) and SSH (1.1%) also present. This gives an instant overview of what protocols to investigate.",
        screenshot: "/labs/wireshark-094707.png",
      },
      {
        title: "Conversation statistics: scanning pattern",
        description:
          "Statistics → Conversations → TCP tab exposed a clear pattern: 3.142.238.241 made hundreds of short-lived connections to 10.130.8.94 on port 80, each with exactly 10 packets and ~1,375 bytes. This uniform, high-volume pattern is consistent with automated scanning or brute-force activity.",
        screenshot: "/labs/wireshark-094854.png",
      },
      {
        title: "Endpoint statistics",
        description:
          "Statistics → Endpoints → TCP tab confirmed the top talkers: 1.1.1.1 (ports 80 and 443), 3.5.129.171 (port 443), and the mass of 3.142.238.241 ephemeral-port connections. This helps prioritize which hosts to investigate further.",
        screenshot: "/labs/wireshark-095035.png",
      },
      {
        title: "Display filter construction",
        description:
          "Used Analyze → Display Filter Expression to build a filter for ip.addr == 20.106.124.93. The GUI filter builder shows available fields, operators, and validates the expression before applying. Helpful for constructing complex filters without memorizing syntax.",
        command: "ip.addr == 20.106.124.93",
        screenshot: "/labs/wireshark-095448.png",
      },
      {
        title: "HTTP stream: WordPress brute-force success",
        description:
          "Right-clicked → Follow → HTTP Stream on tcp.stream eq 13299. Revealed a POST to /wp-login.php from a Hydra user-agent with credentials in cleartext. The server responded 302 Found with WordPress authentication cookies and a redirect to /wp-admin/, confirming a successful brute-force login.",
        command: "tcp.stream eq 13299",
        screenshot: "/labs/wireshark-095941.png",
      },
      {
        title: "Decoded form data inspection",
        description:
          "Wireshark's protocol dissection decoded the URL-encoded form body: log=admin, pwd=#AlphaInc!, wp-submit=Log In, redirect_to=http://www.alphainc.ca/wp-admin/. Extracting structured fields from raw bytes is where Wireshark's GUI shines over command-line tools.",
        screenshot: "/labs/wireshark-100217.png",
      },
      {
        title: "Lab environment setup",
        description:
          "Set up the lab environment: navigated to /sec401/labs/1.2, ran ./lab-1.2 start to launch the local web server, then opened Wireshark with sudo for live capture privileges.",
        command: "cd /sec401/labs/1.2 && ./lab-1.2 start && sudo wireshark 2>/dev/null &",
        screenshot: "/labs/wireshark-100626.png",
      },
      {
        title: "Live capture: browsing the lab web app",
        description:
          "Browsed to localhost:8080/welcome.html which displayed 'Welcome to SEC401!' with a 'Download Your File' link. This generated HTTP traffic on the loopback interface for live capture analysis.",
        screenshot: "/labs/wireshark-101042.png",
      },
      {
        title: "Live capture analysis with http filter",
        description:
          "Applied the 'http' display filter on the live loopback capture. Wireshark showed GET /workbook/ and subsequent requests for CSS, JS, and image assets. Full page load dissected packet by packet. 250 packets captured, 42 displayed after filtering.",
        command: "http",
        screenshot: "/labs/wireshark-101109.png",
      },
      {
        title: "HTTP object export: lab completion",
        description:
          "Used File → Export Objects → HTTP to extract file.txt from the captured traffic. The file contained 'You completed the lab! Congratulations!' with ASCII art. This shows Wireshark can reconstruct and export files transferred over HTTP.",
        screenshot: "/labs/wireshark-101824.png",
      },
    ],
    outcome:
      "This lab built on the tcpdump foundation by showing how Wireshark's GUI accelerates investigation at scale. Protocol hierarchy gave an instant traffic breakdown. Conversation statistics surfaced the scanning pattern in seconds, something that would require careful scripting with tcpdump. Stream following reconstructed the full attacker session, confirming a successful WordPress brute-force with decoded credentials. The live capture exercise demonstrated end-to-end workflow: capture, filter, and extract artifacts.",
    nextStepsInProduction:
      "If this were production: I'd correlate the 3.142.238.241 scanning pattern with firewall logs and threat intel feeds, check whether the brute-forced admin account was used for lateral movement, export IOCs (IPs, user-agents, target URLs) to the SIEM, and verify that wp-login.php is protected by rate limiting, MFA, and HTTPS.",
    securityControlsRelevant: [
      "Enforce HTTPS (HSTS) to prevent credential interception",
      "MFA on WordPress admin accounts",
      "Rate-limit and geo-block wp-login.php",
      "WAF rules for automated tool user-agents (Hydra)",
      "Network segmentation to limit lateral movement",
      "Centralized logging + SIEM alerting on brute-force patterns",
    ],
    keyFindings: [
      "628,631 packets: TCP 88.2%, HTTP 22.6%, TLS 44.3%, DNS 1.1%",
      "3.142.238.241 → 10.130.8.94:80, hundreds of uniform 10-packet connections (port scanning/brute-force)",
      "Successful WordPress login: POST /wp-login.php with Hydra user-agent, admin/#AlphaInc!, 302 → /wp-admin/",
      "Live capture: HTTP object export recovered file.txt from loopback traffic",
    ],
    screenshots: [
      { src: "/labs/wireshark-093147.png", alt: "Step 1: Initial PCAP inspection", caption: "TCP handshake + GET /.env → 404 (same probe as Lab 1.1)" },
      { src: "/labs/wireshark-094707.png", alt: "Step 2: Protocol Hierarchy Statistics", caption: "TCP 88.2%, HTTP 22.6%, TLS 44.3%, DNS 1.1% across 628K packets" },
      { src: "/labs/wireshark-094854.png", alt: "Step 3: Conversation statistics", caption: "3.142.238.241 scanning port 80, hundreds of uniform 10-packet sessions" },
      { src: "/labs/wireshark-095035.png", alt: "Step 4: Endpoint statistics", caption: "Top talkers: 1.1.1.1, 3.5.129.171, mass 3.142.238.241 connections" },
      { src: "/labs/wireshark-095448.png", alt: "Step 5: Display filter construction", caption: "ip.addr == 20.106.124.93 via GUI filter builder" },
      { src: "/labs/wireshark-095941.png", alt: "Step 6: HTTP stream, WordPress brute-force", caption: "POST /wp-login.php, Hydra user-agent, 302 Found → /wp-admin/" },
      { src: "/labs/wireshark-100217.png", alt: "Step 7: Decoded form data", caption: "log=admin, pwd=#AlphaInc!, wp-submit=Log In" },
      { src: "/labs/wireshark-100626.png", alt: "Step 8: Lab environment setup", caption: "./lab-1.2 start, sudo wireshark" },
      { src: "/labs/wireshark-101042.png", alt: "Step 9: Lab web app", caption: "localhost:8080/welcome.html, Welcome to SEC401!" },
      { src: "/labs/wireshark-101109.png", alt: "Step 10: Live capture with http filter", caption: "GET /workbook/ and asset requests on loopback" },
      { src: "/labs/wireshark-101824.png", alt: "Step 11: HTTP object export", caption: "Exported file.txt, lab completion confirmed" },
    ],
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
