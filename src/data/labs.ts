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
    course: "SEC401 – Network Forensics",
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
    course: "SEC401 – Password Management & Cryptographic Concepts",
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
