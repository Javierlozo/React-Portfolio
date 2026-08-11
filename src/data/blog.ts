import { LABS, getLabPath, type CybersecurityLab } from "./labs";

export type BlogPost = LabBackedBlogPost | StandaloneBlogPost;

export interface LabBackedBlogPost {
  kind: "lab";
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lab: CybersecurityLab;
  labPath: string;
}

export interface StandaloneBlogPost {
  kind: "mdx";
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  href: string;
}

/**
 * SEO-optimized titles and descriptions for each lab.
 * These target long-tail search queries.
 */
export const BLOG_METADATA: Record<string, { title: string; description: string; date: string }> = {
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
    date: "2026-03-04",
  },
  "vpc-flow-logs": {
    title: "AWS VPC Flow Log Analysis: Investigating 173K Records to Map an Attacker's Full Kill Chain",
    description:
      "A hands-on walkthrough of analyzing AWS VPC Flow Logs at scale: extracting 33K attacker flows from 579 compressed log files, quantifying 265MB of data exfiltration on a non-standard port, determining the attack timeframe, and confirming the complete attack surface using PCAP-to-NetFlow conversion with nfpcapd and nfdump.",
    date: "2026-03-08",
  },
  "password-auditing": {
    title: "Password Auditing with John the Ripper and Hashcat: Cracking Office, NTLM, and Linux Hashes",
    description:
      "A hands-on walkthrough of password auditing across four hash types: extracting and cracking an Office 2013 encrypted spreadsheet, NTLM hashes, and Linux SHA-512 crypt passwords using John the Ripper with a CeWL wordlist, demonstrating brute-force infeasibility with Hashcat, and expanding 1,552 words into 4M+ candidates with word-mangling rules to crack passwords the base wordlist missed.",
    date: "2026-03-11",
  },
  "data-loss-prevention": {
    title: "Data Loss Prevention: Scanning Removable Media for Sensitive Content, Metadata, and GPS Coordinates",
    description:
      "A hands-on DLP investigation on removable media: using grep regex to flag files containing classification keywords, extracting document metadata with exiftool to reveal authorship and SECRET markings, and geolocating a photograph by extracting GPS coordinates from embedded EXIF data.",
    date: "2026-03-15",
  },
  "network-discovery": {
    title: "Network Discovery with Nmap and ndiff: Host Enumeration, Change Detection, and Post-Scan Triage",
    description:
      "A hands-on Nmap workflow against a /24 lab network: host discovery, service/version enumeration, OS fingerprinting, XML baseline comparison with ndiff to surface a new WSGI service between scans, and post-scan pivot with SSH, netstat, iptables, and curl to validate findings at the OS and firewall layer.",
    date: "2026-03-18",
  },
  "web-app-exploitation": {
    title: "SQL Injection in a PHP Storefront: From LIKE-Clause Probing to Stacked Queries, then WAF Validation",
    description:
      "A hands-on web app exploitation walkthrough: discovering a LIKE-clause SQL injection from a leaked stack trace, refining payloads to dump an entire Merchandise table, using stacked queries to enumerate databases and tables via SHOW statements, and then deploying a WAF to confirm the same payloads return HTTP 418, a full vulnerability lifecycle demo.",
    date: "2026-03-22",
  },
  "hashing-cryptographic-validation": {
    title: "Hashing and Cryptographic Validation with SHA-256 and GPG: From Hash Integrity to Detecting Tampered Documents",
    description:
      "A hands-on walkthrough of cryptographic integrity: proving SHA-256 is content-bound with rename vs. one-byte-edit tests, generating an RSA 3072-bit GPG key, producing detached signatures, importing a third-party public key, catching a tampered Bankruptcy.docx via a BAD signature, reviewing suspicious metadata with exiftool, and restoring a clean backup that verifies cleanly.",
    date: "2026-03-25",
  },
  "ids-snort3-zeek": {
    title: "Intrusion Detection with Snort3 and Zeek: PCAP Replay, Rule Tuning, BPF Filters, and File Extraction",
    description:
      "A hands-on IDS/NSM walkthrough: validating a Snort 3.1.73 configuration, scoping HOME_NET to a /16, replaying investigate.pcap through the community ruleset to surface 294 INDICATOR-SHELLCODE ssh CRC32 overflow alerts from a single attacker IP, pivoting with --bpf, and reprocessing the same PCAP in Zeek with the extract-all-files policy to show how signature IDS and protocol-aware NSM complement each other.",
    date: "2026-03-29",
  },
  "linux-logging-auditing": {
    title: "Linux Logging and Auditing: auditd, aureport, ausearch, and SIGMA Detection with Zircolite",
    description:
      "A hands-on walkthrough of the Linux audit pipeline: Best-Practice auditd rules (recon, susp_activity, sssd), aureport --summary and --key triage, ausearch -k with -i for interpreted output, decoding a hex-encoded bash /dev/tcp reverse shell with xxd, and running Zircolite with a SIGMA ruleset to surface 177 Webshell Remote Command Execution events (MITRE T1505.003) from 41k raw audit events.",
    date: "2026-04-01",
  },
  "linux-permissions": {
    title: "Linux Permissions: umask, Mode Bits, and the Sticky Bit Explained with a Docker Lab",
    description:
      "A hands-on walkthrough of the Linux permission model: spinning up a Docker lab container, observing default umask 0022 produce 644/755, tightening to umask 0027 for a 640/750 hardening baseline, and demonstrating the /tmp sticky bit (drwxrwxrwt) that protects shared directories from cross-user tampering.",
    date: "2026-04-05",
  },
  "windows-security-policies": {
    title: "Applying Windows Security Policies with secedit.exe: Analyze, Configure, and Verify Baseline Compliance",
    description:
      "A hands-on walkthrough of Windows baseline compliance using secedit.exe /analyze and /configure: comparing a VM to the Alpha basic security template, surfacing MinimumPasswordLength, LockoutBadCount, and MaximumLogSize drift via PowerShell Select-String, applying the template, and re-analyzing to produce before/after audit evidence.",
    date: "2026-04-08",
  },
  "powershell-speed-scale": {
    title: "PowerShell for Speed and Scale: Fleet-Wide Hunting with Invoke-Command, Event ID 7045, and Get-FileHash",
    description:
      "A hands-on PowerShell workflow spanning local process/service enumeration through the object pipeline (Get-Process, Get-Service, Where-Object, Measure-Object, Out-GridView, Export-Csv), remote execution across three alpha-svr hosts with Invoke-Command, and a concrete hunt that surfaces a rogue BrokerSvc running broker.exe as LocalSystem, complete with Event ID 7045 correlation and a SHA-256 suitable for IOC distribution.",
    date: "2026-04-12",
  },
  "live-investigation-powershell": {
    title: "PowerShell Live Investigation: Triaging a Compromised Windows Host with Get-NetTCPConnection, Run-Key Hunting, and Compare-Object",
    description:
      "A hands-on SEC504 live-response walkthrough on Windows: pivoting from Get-Process with a TEMP-path filter to find calcache.exe (PID 1672), mapping its outbound beacon to 23.11.32.159:80 via Get-NetTCPConnection, eradicating HKCU Run-key persistence, and diffing services and scheduled tasks against a saved baseline with Compare-Object to surface a rogue Dynamics service and a Microsoft eDynamics scheduled task.",
    date: "2026-05-21",
  },
  "rita-beacon-detection": {
    title: "Network Beacon Detection with RITA: Tuning False Positives, Threat-Intel Feeds, and Unmasking a Google Analytics Typosquat",
    description:
      "A hands-on SEC504 threat-hunting workflow with RITA on the falsimentis Zeek dataset: triaging a 98.60% beacon to Canonical NTP as a false positive, tuning config.hjson with a CIDR safelist and a malwaresum threat-intel feed, then re-importing to surface three HIGH severity C2 beacons to 167.172.201.123 disguised as www1-google-analytics.com, with an awk pivot on access.log to enumerate all seven compromised internal hosts.",
    date: "2026-05-27",
  },
  "malware-analysis-analyticsinstaller": {
    title: "Malware Analysis with Strings, Regshot, and Process Monitor: Profiling AnalyticsInstaller.exe from Hash to Wiper Payload",
    description:
      "A hands-on SEC504 malware-triage walkthrough on Windows: hashing AnalyticsInstaller.exe with Get-FileHash, pulling IOCs with Sysinternals Strings (a www1-google-analytics.com typosquat C2, an HKCU Run key, an encoded PowerShell payload, and a destructive AnalyticsBackup.bat), then detonating it under Regshot and Process Monitor to confirm the 'Analytics Backup' scheduled-task persistence and the cmd.exe to powershell.exe -EncodedCommand execution chain.",
    date: "2026-05-30",
  },
  "ai-assisted-incident-handling": {
    title: "AI-Assisted Incident Handling: Deobfuscating Malware, Generating PowerShell Tooling, and Drafting an IR Playbook with a Self-Hosted gpt-4.1",
    description:
      "A hands-on SEC504 workflow using a self-hosted gpt-4.1 (OpenWebUI/Docker) as an incident-handling force-multiplier: deobfuscating a variable-fragmented malicious batch script and extracting its IOCs, generating a PowerShell baseline-collection tool for Compare-Object diffing, and drafting a MITRE ATT&CK-mapped incident-response playbook, all on a local model so malware and IOCs never leave the environment.",
    date: "2026-05-31",
  },
  "nmap-network-discovery": {
    title: "Network Discovery and Service Enumeration with Nmap: ARP Sweeps, Version Detection, and NSE Against an Exposed MongoDB",
    description:
      "A hands-on SEC504 Nmap reconnaissance walkthrough across a 172.30.0.0/24 lab subnet: contrasting unprivileged and privileged ARP host discovery, full-range TCP scanning and version detection that unmasks Dropbear SSH on a non-standard port, and NSE scripts that surface an unauthenticated MongoDB 5.0.27 and an SMB server (FILESTOR) not requiring message signing.",
    date: "2026-06-03",
  },
  "cloud-attack-surface-mapping": {
    title: "Cloud Attack Surface Mapping with masscan and TLS Certificate Fingerprinting",
    description:
      "A SEC504 walkthrough of attributing anonymous cloud IPs to their owners: sweeping a /16 for port 443 with masscan, collecting TLS certificates with tls-scan, and parsing subject CNs with jq to find the one host that belongs to the target, then enumerating it with nmap http-enum.",
    date: "2026-06-05",
  },
  "smb-share-enumeration-credential-discovery": {
    title: "SMB Share Enumeration and Credential Discovery: From smbclient to Lateral Movement",
    description:
      "A SEC504 SMB compromise chain with no exploit: enumerating shares with smbclient, exfiltrating a home directory with the built-in tar command, recovering a hardcoded credential from a stale backup.ps1.OLD PowerShell script, and reusing it to reach a share holding a 33.8 MB database backup.",
    date: "2026-06-15",
  },
  "windows-event-log-threat-hunting-hayabusa": {
    title: "Windows Event Log Threat Hunting with Hayabusa and Sigma Rules",
    description:
      "A SEC504 threat-hunting walkthrough using Hayabusa to apply 4,151 Sigma and Hayabusa rules to 361 EVTX files, reducing 4,419 raw events to 33 unique detections, then grouping in Timeline Explorer to reconstruct an anti-forensics timeline of log-clearing events.",
    date: "2026-06-16",
  },
  "netcat-transfer-shells-pivot-relays": {
    title: "Netcat for Data Transfer, Bind Shells, and Named-Pipe Pivot Relays",
    description:
      "A SEC504 walkthrough of netcat across an intrusion: listener/client chat, two-way file transfer, bind shells on Linux and Windows, and a named-pipe (FIFO) relay that pivots through a compromised host to an unreachable target while laundering the attacker's source IP.",
    date: "2026-06-17",
  },
  "online-password-attacks-legba": {
    title: "Online Password Attacks with Legba: Credential Stuffing, Dictionary, and Password Spraying",
    description:
      "A SEC504 walkthrough of the three online password attacks with Legba: credential stuffing against HTTP Basic auth, single-user dictionary against MySQL, and password spraying against SMB, showing how spraying one password across many accounts evades lockout thresholds.",
    date: "2026-07-01",
  },
  "offline-password-cracking-hashcat": {
    title: "Offline Password Cracking with Hashcat: Shadow Files, Active Directory NTDS, and the Attack-Mode Ladder",
    description:
      "A SEC504 Hashcat walkthrough against Linux shadow hashes and an Active Directory NTDS.dit dumped with secretsdump.py, working the dictionary, mask, and rule-based attack modes and showing why a best64 rule attack cracks more hashes in four seconds than a six-minute mask run.",
    date: "2026-08-02",
  },
  "post-exploitation-metasploit-meterpreter": {
    title: "Post-Exploitation with Metasploit and Meterpreter: psexec, Process Migration, and hashdump",
    description:
      "A SEC504 Metasploit walkthrough using psexec (authenticated code execution where valid credentials are the exploit) to open a SYSTEM Meterpreter session, migrating into lsass.exe for stability and x64 context, and dumping local NTLM hashes to pivot to the next host.",
    date: "2026-08-03",
  },
  "idor-forced-browsing": {
    title: "IDOR and Forced Browsing: Enumerating Objects with ffuf and Sequential IDs",
    description:
      "A SEC504 web walkthrough chaining forced browsing (ffuf content discovery that surfaces a leaked Docker build log) into an insecure direct object reference, where predictable four-digit chat-log IDs and a missing authorization check expose every user's transcript in a five-second sweep.",
    date: "2026-07-03",
  },
  "os-command-injection-reverse-shell": {
    title: "OS Command Injection to Root Reverse Shell: Argument Injection and the || Operator",
    description:
      "A SEC504 web walkthrough exploiting an unsanitized fping parameter: proving the sink with harmless argument injection (-h), escalating to command execution as root with the -z || failure-operator technique, and chaining to a netcat reverse shell and a SQLite database dump.",
    date: "2026-07-03",
  },
  "stored-xss-session-hijacking": {
    title: "Stored XSS to Session Hijacking: Per-Field Probing and Cookie Theft",
    description:
      "A SEC504 web walkthrough finding a stored cross-site scripting flaw in a support-ticket form through per-field probing (one field escaped, another not), weaponizing it into a cookie stealer that captures an analyst's session, and replaying the stolen token to reach an admin panel.",
    date: "2026-07-04",
  },
  "sql-injection-database-exfiltration-sqlmap": {
    title: "SQL Injection and Database Exfiltration with sqlmap: From a Single Quote to a Full Dump",
    description:
      "A SEC504 web walkthrough confirming SQL injection by hand with a single quote (a MariaDB 1064 error), then using sqlmap to identify the one injectable parameter of two, enumerate the database, and dump a users table of roles and password hashes, one cracked inline to Password123.",
    date: "2026-07-04",
  },
};

/**
 * Each blog post wraps a lab with an SEO-friendly title and description
 * targeting search queries recruiters and practitioners actually use.
 */
export const LAB_POSTS: LabBackedBlogPost[] = LABS.filter(
  (l) => !l.comingSoon
)
  .map((lab) => {
    const mapping = BLOG_METADATA[lab.slug];
    return {
      kind: "lab" as const,
      slug: lab.slug,
      title: mapping?.title ?? lab.title,
      description: mapping?.description ?? lab.summary,
      date: mapping?.date ?? "2026-02-01",
      tags: [...(lab.tools || []), ...(lab.skillsDemonstrated?.slice(0, 3) || [])],
      lab,
      labPath: getLabPath(lab),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getBlogPostHref(post: BlogPost): string {
  return post.kind === "lab" ? post.labPath : post.href;
}
