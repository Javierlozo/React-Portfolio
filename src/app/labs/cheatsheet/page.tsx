import { Metadata } from "next";
import { LABS } from "../../../data/labs";
import PrintableCheatsheet, { type CheatRow, type CheatSection } from "../../../components/PrintableCheatsheet";

export const metadata: Metadata = {
  title: "GSEC CyberLive Cheatsheet",
  description: "Command cheatsheet grouped by tool for the GSEC CyberLive hands-on exam items.",
  robots: { index: false, follow: false },
};

/**
 * Map the first token of a command to an exam-relevant category.
 * Order matters inside the function (more specific patterns win).
 */
function categorize(firstToken: string, fullCommand: string): string {
  const t = firstToken.toLowerCase();
  const cmd = fullCommand.toLowerCase();

  // PowerShell cmdlet families
  if (/^(get|set|start|stop|new|remove|invoke|select|where|measure|out|export|import|format|sort|convertto|convertfrom|add|clear|enter|exit|test|write)-/i.test(firstToken)) {
    return "PowerShell";
  }
  if (firstToken.startsWith("$") || /^\[string\[\]\]/i.test(firstToken)) return "PowerShell";
  if (t === "ise" || t === "invoke-command") return "PowerShell";

  // Windows-specific utilities
  if (t === "secedit.exe" || t === "secedit") return "Windows Hardening (secedit / MMC)";
  if (t === "mmc.exe" || t === "notepad") return "Windows Hardening (secedit / MMC)";

  // Packet analysis
  if (t === "tcpdump") return "Packet Analysis (tcpdump)";
  if (t === "dig") return "DNS / Network Recon";

  // IDS / NSM
  if (t === "snort") return "IDS / NSM (Snort + Zeek)";
  if (t === "zeek") return "IDS / NSM (Snort + Zeek)";

  // Network discovery
  if (t === "nmap" || t === "ndiff") return "Network Discovery (nmap)";

  // Password cracking
  if (t === "john" || t === "john-the-ripper") return "Password Cracking (John + Hashcat)";
  if (t === "hashcat") return "Password Cracking (John + Hashcat)";
  if (t === "cewl") return "Password Cracking (John + Hashcat)";
  if (t === "office2john.py" || t === "office2john") return "Password Cracking (John + Hashcat)";

  // Crypto / integrity
  if (t === "sha256sum" || t === "md5sum" || t === "sha1sum") return "Cryptographic Validation (hashing + GPG)";
  if (t === "gpg") return "Cryptographic Validation (hashing + GPG)";
  if (t === "openssl") return "Cryptographic Validation (hashing + GPG)";

  // Metadata / DLP
  if (t === "exiftool") return "DLP / Metadata (exiftool + grep)";

  // Cloud / flow logs
  if (t === "aws") return "Cloud (AWS VPC Flow Logs)";
  if (t === "nfdump" || t === "nfpcapd" || t === "nfcapd") return "Cloud (AWS VPC Flow Logs)";

  // Web app exploitation
  if (t === "sqlmap" || t === "curl" || t === "wget") {
    if (cmd.includes("sql") || cmd.includes("injection") || cmd.includes("wp-login")) return "Web App Exploitation";
    return "Linux Core Utilities";
  }

  // Docker / lab bring-up
  if (t === "docker" || /^\.\/start/.test(firstToken) || /^\.\/connect/.test(firstToken) || /^\.\/stop/.test(firstToken)) {
    return "Lab Bring-up (Docker)";
  }

  // Linux permissions specifically
  if (t === "umask" || t === "chmod" || t === "chown" || t === "chgrp") return "Linux Permissions";

  // Linux core tools (grep/sed/awk/find/etc.)
  if (["grep", "sed", "awk", "find", "cat", "ls", "dir", "echo", "mkdir", "cd", "wc", "sort", "uniq", "head", "tail", "cut", "tr", "xargs", "file", "stat", "tee"].includes(t)) {
    return "Linux Core Utilities";
  }

  // SSH / remoting
  if (t === "ssh" || t === "scp") return "Remote Access (SSH)";

  return "Other Commands";
}

/**
 * Order categories for print so the most CyberLive-weighted tools come first.
 * Anything not listed falls to the end alphabetically.
 */
const CATEGORY_ORDER = [
  "PowerShell",
  "Windows Hardening (secedit / MMC)",
  "Linux Permissions",
  "Linux Core Utilities",
  "Packet Analysis (tcpdump)",
  "DNS / Network Recon",
  "Network Discovery (nmap)",
  "IDS / NSM (Snort + Zeek)",
  "Password Cracking (John + Hashcat)",
  "Cryptographic Validation (hashing + GPG)",
  "DLP / Metadata (exiftool + grep)",
  "Web App Exploitation",
  "Cloud (AWS VPC Flow Logs)",
  "Remote Access (SSH)",
  "Lab Bring-up (Docker)",
  "Other Commands",
];

function buildSections(): CheatSection[] {
  const byCategory = new Map<string, CheatRow[]>();
  const dedupe = new Set<string>(); // category + command key

  const published = LABS.filter((l) => !l.comingSoon);

  for (const lab of published) {
    if (!lab.stepDetails) continue;
    for (const step of lab.stepDetails) {
      if (!step.command) continue;
      const lines = step.command.split("\n").map((s) => s.trim()).filter(Boolean);

      for (const raw of lines) {
        const cleaned = raw.replace(/^sudo\s+/i, "");
        const firstToken = cleaned.split(/\s+/)[0];
        if (!firstToken) continue;

        const category = categorize(firstToken, cleaned);
        const dedupeKey = `${category}::${cleaned.toLowerCase()}`;
        if (dedupe.has(dedupeKey)) continue;
        dedupe.add(dedupeKey);

        const row: CheatRow = {
          command: cleaned,
          purpose: step.title,
          flags: step.commandBreakdown?.trim() ?? "",
          labSlug: lab.slug,
          labTitle: lab.title,
        };
        if (!byCategory.has(category)) byCategory.set(category, []);
        byCategory.get(category)!.push(row);
      }
    }
  }

  const sections: CheatSection[] = [];
  for (const name of CATEGORY_ORDER) {
    const rows = byCategory.get(name);
    if (rows && rows.length) {
      sections.push({ name, rows });
      byCategory.delete(name);
    }
  }
  // Any categories that weren't in CATEGORY_ORDER
  for (const [name, rows] of Array.from(byCategory.entries()).sort(([a], [b]) => a.localeCompare(b))) {
    sections.push({ name, rows });
  }

  return sections;
}

/**
 * Static appendix: high-yield CyberLive reference that isn't extractable
 * from the lab writeups (Windows Event IDs, logon types, quick filter
 * cheat cards, Linux log paths, SUID/world-writable hunts).
 */
const APPENDIX: CheatSection[] = [
  {
    name: "Windows Security Event IDs (most tested)",
    rows: [
      { command: "4624", purpose: "Successful logon", flags: "LogonType in message body (see logon types section)", labSlug: "", labTitle: "" },
      { command: "4625", purpose: "Failed logon", flags: "Status/SubStatus codes indicate failure reason (0xC000006A = bad password, 0xC0000234 = locked)", labSlug: "", labTitle: "" },
      { command: "4634 / 4647", purpose: "Account logged off / user-initiated logoff", flags: "Pair with 4624 to compute session duration", labSlug: "", labTitle: "" },
      { command: "4648", purpose: "Logon using explicit credentials", flags: "runas / lateral movement indicator", labSlug: "", labTitle: "" },
      { command: "4672", purpose: "Special privileges assigned", flags: "Fired at admin-equivalent logon (SeDebug, SeTcb, etc.)", labSlug: "", labTitle: "" },
      { command: "4688", purpose: "Process creation", flags: "Requires command-line auditing GPO to include CommandLine field", labSlug: "", labTitle: "" },
      { command: "4697", purpose: "Service installed (Security log)", flags: "Companion to System log 7045 — use both for service-install hunting", labSlug: "", labTitle: "" },
      { command: "4720 / 4722 / 4724 / 4725", purpose: "User account created / enabled / pwd reset / disabled", flags: "Account lifecycle auditing", labSlug: "", labTitle: "" },
      { command: "4728 / 4732 / 4756", purpose: "Member added to global / local / universal security group", flags: "Privilege escalation indicator", labSlug: "", labTitle: "" },
      { command: "4740", purpose: "Account locked out", flags: "CallerComputerName field shows lockout source", labSlug: "", labTitle: "" },
      { command: "1102", purpose: "Security log cleared", flags: "High-fidelity tampering indicator", labSlug: "", labTitle: "" },
    ],
  },
  {
    name: "Windows System Event IDs",
    rows: [
      { command: "7045", purpose: "Service installed (SCM)", flags: "Always review on suspicious hosts — pairs with 4697", labSlug: "", labTitle: "" },
      { command: "7036", purpose: "Service entered Running / Stopped state", flags: "Useful for timelining service starts", labSlug: "", labTitle: "" },
      { command: "6005 / 6006 / 6008", purpose: "Event log started / stopped cleanly / unexpected shutdown", flags: "Boot / reboot timeline", labSlug: "", labTitle: "" },
    ],
  },
  {
    name: "Logon Types (4624 / 4625)",
    rows: [
      { command: "Type 2", purpose: "Interactive", flags: "Keyboard at the console", labSlug: "", labTitle: "" },
      { command: "Type 3", purpose: "Network", flags: "SMB / file share / IPC$", labSlug: "", labTitle: "" },
      { command: "Type 4", purpose: "Batch", flags: "Scheduled task", labSlug: "", labTitle: "" },
      { command: "Type 5", purpose: "Service", flags: "Service start as account", labSlug: "", labTitle: "" },
      { command: "Type 7", purpose: "Unlock", flags: "Unlock of locked workstation", labSlug: "", labTitle: "" },
      { command: "Type 8", purpose: "NetworkCleartext", flags: "Plaintext credentials over network (BASIC auth, IIS)", labSlug: "", labTitle: "" },
      { command: "Type 9", purpose: "NewCredentials", flags: "runas /netonly", labSlug: "", labTitle: "" },
      { command: "Type 10", purpose: "RemoteInteractive", flags: "RDP", labSlug: "", labTitle: "" },
      { command: "Type 11", purpose: "CachedInteractive", flags: "Cached domain creds (laptop offline)", labSlug: "", labTitle: "" },
    ],
  },
  {
    name: "PowerShell one-liners for triage",
    rows: [
      { command: "Get-WinEvent -FilterHashtable @{LogName='Security';ID=4625} -MaxEvents 50", purpose: "Last 50 failed logons", flags: "-FilterHashtable is server-side and fast; avoid Where-Object after -FilterHashtable\nReplace 4625 with any ID above", labSlug: "", labTitle: "" },
      { command: "Get-WinEvent -FilterHashtable @{LogName='Security';ID=4624;StartTime=(Get-Date).AddHours(-24)}", purpose: "Logons in the last 24h", flags: "StartTime/EndTime filter in the hashtable", labSlug: "", labTitle: "" },
      { command: "Get-Process | Where-Object WS -gt 100MB | Sort WS -desc", purpose: "Top memory hogs", flags: "WS = working set; -gt comparison on numeric property", labSlug: "", labTitle: "" },
      { command: "Get-NetTCPConnection -State Listen | ft -auto", purpose: "Listening ports", flags: "Replacement for netstat -an; pair with -OwningProcess", labSlug: "", labTitle: "" },
      { command: "Get-CimInstance Win32_Service | Where State -eq Running | Select Name,PathName,StartName", purpose: "Running services + exe path + run-as account", flags: "PathName exposes the service binary path\nStartName is the account (LocalSystem, NetworkService, etc.)", labSlug: "", labTitle: "" },
      { command: "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", purpose: "Autorun keys (per-machine)", flags: "Also check HKCU:\\... and Run, RunOnce", labSlug: "", labTitle: "" },
      { command: "Get-FileHash -Algorithm SHA256 <path>", purpose: "Hash a file for IOC sharing", flags: "-Algorithm: MD5, SHA1, SHA256 (default), SHA384, SHA512", labSlug: "", labTitle: "" },
    ],
  },
  {
    name: "tcpdump quick filters",
    rows: [
      { command: "tcpdump -nn -i eth0 -c 100", purpose: "100 packets, no name resolution", flags: "-nn: no DNS, no port lookup\n-i: interface\n-c: count", labSlug: "", labTitle: "" },
      { command: "tcpdump -r file.pcap 'host 10.0.0.5'", purpose: "All traffic to/from one host", flags: "src host / dst host to narrow direction", labSlug: "", labTitle: "" },
      { command: "tcpdump -r file.pcap 'port 443'", purpose: "All traffic on port 443", flags: "src port / dst port / portrange 1000-2000", labSlug: "", labTitle: "" },
      { command: "tcpdump -r file.pcap 'tcp[13] & 2 != 0'", purpose: "SYN packets only (scan detection)", flags: "tcp[13]=18 → SYN-ACK, tcp[13]=16 → ACK, tcp[13]=4 → RST", labSlug: "", labTitle: "" },
      { command: "tcpdump -r file.pcap 'icmp[icmptype]=icmp-echo'", purpose: "ICMP echo requests (ping)", flags: "icmp-echoreply for responses", labSlug: "", labTitle: "" },
      { command: "tcpdump -XX -r file.pcap", purpose: "Hex + ASCII payload dump", flags: "-X: hex + ASCII\n-XX: include link-layer header", labSlug: "", labTitle: "" },
      { command: "tcpdump -r file.pcap -w filtered.pcap 'host 10.0.0.5'", purpose: "Save filtered subset to new PCAP", flags: "-w writes binary PCAP (no -v/-X output)", labSlug: "", labTitle: "" },
    ],
  },
  {
    name: "Wireshark display filters",
    rows: [
      { command: "ip.addr == 10.0.0.5", purpose: "Filter by IP (src or dst)", flags: "ip.src / ip.dst for direction", labSlug: "", labTitle: "" },
      { command: "tcp.port == 80", purpose: "Filter by TCP port", flags: "tcp.srcport / tcp.dstport for direction", labSlug: "", labTitle: "" },
      { command: "http.request.method == \"POST\"", purpose: "HTTP POST only", flags: "http.request.uri contains \"login\" to narrow further", labSlug: "", labTitle: "" },
      { command: "tcp.flags.syn == 1 && tcp.flags.ack == 0", purpose: "SYN without ACK (scan)", flags: "tcp.flags.reset == 1 for RSTs", labSlug: "", labTitle: "" },
      { command: "dns.qry.name contains \"evil\"", purpose: "DNS queries matching substring", flags: "dns.flags.response == 1 for responses only", labSlug: "", labTitle: "" },
      { command: "tcp.stream eq 3", purpose: "One TCP stream", flags: "Right-click packet → Follow → TCP Stream to find stream number", labSlug: "", labTitle: "" },
      { command: "frame contains \"password\"", purpose: "Any frame whose bytes contain string", flags: "Slower than field filters — use for ad-hoc hunts", labSlug: "", labTitle: "" },
    ],
  },
  {
    name: "Linux log paths & triage",
    rows: [
      { command: "/var/log/auth.log", purpose: "sudo, sshd, su (Debian / Ubuntu)", flags: "RHEL/CentOS uses /var/log/secure", labSlug: "", labTitle: "" },
      { command: "/var/log/syslog  |  /var/log/messages", purpose: "General system messages", flags: "Debian vs RHEL naming", labSlug: "", labTitle: "" },
      { command: "/var/log/wtmp  /var/log/btmp  /var/log/lastlog", purpose: "Login history (good / failed / per-user last)", flags: "Binary files — read with last / lastb / lastlog commands", labSlug: "", labTitle: "" },
      { command: "last -F   |   lastb", purpose: "Successful / failed login history", flags: "-F: full timestamps\nlastb needs root", labSlug: "", labTitle: "" },
      { command: "journalctl -u sshd --since \"1 hour ago\"", purpose: "systemd unit logs in a time window", flags: "-u: unit\n-p err..alert\n_PID=1234 match\n--since / --until: relative or ISO time", labSlug: "", labTitle: "" },
      { command: "grep -E \"Failed|Invalid\" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn", purpose: "Top source IPs of failed SSH logins", flags: "Classic brute-force triage one-liner", labSlug: "", labTitle: "" },
    ],
  },
  {
    name: "Linux hunt one-liners",
    rows: [
      { command: "find / -perm -4000 -type f 2>/dev/null", purpose: "All SUID binaries", flags: "-perm -4000: SUID bit set\n2>/dev/null: discard permission-denied noise", labSlug: "", labTitle: "" },
      { command: "find / -perm -2000 -type f 2>/dev/null", purpose: "All SGID binaries", flags: "-2000: SGID", labSlug: "", labTitle: "" },
      { command: "find / -perm -0002 -type d ! -perm -1000 2>/dev/null", purpose: "World-writable dirs missing sticky bit", flags: "-0002: world-write\n!-perm -1000: exclude sticky-bit dirs", labSlug: "", labTitle: "" },
      { command: "find / -mtime -1 -type f 2>/dev/null", purpose: "Files modified in last 24h", flags: "-mtime -1: modified < 1 day ago\n-mmin -30: < 30 min", labSlug: "", labTitle: "" },
      { command: "ss -tulnp", purpose: "Listening TCP/UDP + process", flags: "-t TCP  -u UDP  -l listening  -n no resolve  -p process", labSlug: "", labTitle: "" },
      { command: "lsof -i :22  |  lsof -p 1234", purpose: "What's using port 22 / files a PID has open", flags: "-i: network\n-p: by PID\n-u user: by user", labSlug: "", labTitle: "" },
      { command: "ps -eo pid,ppid,user,cmd --forest", purpose: "Process tree with parent PID", flags: "--forest gives tree view; ppid helps spot orphaned children", labSlug: "", labTitle: "" },
    ],
  },
];

export default function CheatsheetPage() {
  const sections = [...buildSections(), ...APPENDIX];
  const total = sections.reduce((n, s) => n + s.rows.length, 0);
  return <PrintableCheatsheet sections={sections} total={total} />;
}
