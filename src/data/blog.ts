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
      "A hands-on web app exploitation walkthrough: discovering a LIKE-clause SQL injection from a leaked stack trace, refining payloads to dump an entire Merchandise table, using stacked queries to enumerate databases and tables via SHOW statements, and then deploying a WAF to confirm the same payloads return HTTP 418 — a full vulnerability lifecycle demo.",
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
      "A hands-on walkthrough of the Linux audit pipeline — Best-Practice auditd rules (recon, susp_activity, sssd), aureport --summary and --key triage, ausearch -k with -i for interpreted output, decoding a hex-encoded bash /dev/tcp reverse shell with xxd, and running Zircolite with a SIGMA ruleset to surface 177 Webshell Remote Command Execution events (MITRE T1505.003) from 41k raw audit events.",
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
      "A hands-on PowerShell workflow spanning local process/service enumeration through the object pipeline (Get-Process, Get-Service, Where-Object, Measure-Object, Out-GridView, Export-Csv), remote execution across three alpha-svr hosts with Invoke-Command, and a concrete hunt that surfaces a rogue BrokerSvc running broker.exe as LocalSystem — complete with Event ID 7045 correlation and a SHA-256 suitable for IOC distribution.",
    date: "2026-04-12",
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
