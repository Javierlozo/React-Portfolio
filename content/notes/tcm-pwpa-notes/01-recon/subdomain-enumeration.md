---
title: "Subdomain Enumeration"
order: 3
source: "https://github.com/Javierlozo/tcm-pwpa-notes/blob/main/01-recon/subdomain-enumeration.md"
---

# Subdomain Enumeration

The main site is usually the part with the most eyes on it. The real wins tend to be on subdomains nobody is watching: a forgotten dev box, an old admin panel, a staging environment with weak auth. So before I poke at the main app I try to map out every subdomain I can find.

## Google dorking

Quick and passive. I just open Google and type:

```
site:azena.com -www -store
```

`site:` limits results to that domain. The minus operator drops noise I don't care about (the main `www`, and the `store` subdomain in this case). Whatever Google has indexed across the rest of the subdomains shows up.

I keep stripping known subdomains off with more `-foo` filters until what's left is interesting. Usually pulls up blogs, support portals, marketing pages, sometimes an old subdomain the SEO team forgot about.

## crt.sh

Certificate Transparency logs. Every time a public CA issues a cert, it gets logged. That log is public and searchable.

Go to `crt.sh`, search:

```
%.azena.com
```

`%` is a SQL wildcard, so this returns every cert ever issued for anything under `azena.com`. It gives a ton of subdomains based on certificate IDs.

Why this is good: nothing touches the target. I'm reading public CT logs, the target has no idea I looked. And it picks up internal-sounding hosts that never appear on the public site, because at some point somebody put TLS on them.

I usually pipe the raw output through `sort -u` to dedupe and to strip out wildcard entries (`*.azena.com`).

## subfinder

When I want to combine a bunch of passive sources in one shot, subfinder is what I reach for. It queries crt.sh, VirusTotal, SecurityTrails, AlienVault and a stack of others, then gives me one merged list.

Basic run:

```
subfinder -d azena.com
```

Save it to a file so I can feed it into the next tool:

```
subfinder -d azena.com -o azena
```

`-d` is the target domain. `-o` is the output file.

Once I have the list, I resolve each entry (only the ones that actually resolve are worth probing) and feed it into `httpx` to see which ones are alive on HTTP/HTTPS.

## assetfinder

Another passive source. Pulls subdomains from a different mix of feeds than subfinder, so I run both and merge. The catch: it returns a bunch of junk too (other domains that mention the target, related orgs, etc.), so I filter to just the target.

```
assetfinder azena.com | grep azena.com | sort -u > azena2.txt
```

`grep azena.com` keeps only the rows actually under the target domain. `sort -u` dedupes.

## amass

Heavier, more thorough, slower. Combines passive sources with optional active brute-forcing. Worth running but expect it to take a while, so I kick it off and let it run in the background.

```
amass enum -d azena.com > azena3.txt
```

## Merging the lists

Once I have outputs from subfinder (`azena`), assetfinder (`azena2.txt`), and amass (`azena3.txt`), I merge them into a single deduped file:

```
cat azena | sort -u > azenasorted.txt
cat azenasorted.txt >> azena2.txt
cat azena2.txt | sort -u > azenafinal.txt
```

`azenafinal.txt` is the working list.

## httprobe: which ones are alive?

A subdomain that resolves isn't necessarily serving anything. `httprobe` reads a list, hits each one over HTTP and HTTPS, and prints back the ones that respond.

```
cat azenafinal.txt | grep azena.com | sort -u | httprobe -prefer-https | grep https > azenaalive.txt
```

`-prefer-https` makes it try HTTPS first and skip the HTTP version if HTTPS already answers. The trailing `grep https` keeps only the HTTPS hits in the final file.

## gowitness: screenshot the live ones

When the alive list gets long, eyeballing every subdomain in a browser takes forever. `gowitness` takes a list of URLs and screenshots each one. Quick visual triage. Login portals, default pages, broken stuff, interesting admin panels all jump out at a glance.

```
gowitness file -f azenaalive.txt -P azenapics/ --no-http
```

`-f` is the input file, `-P` is the directory to dump screenshots into, `--no-http` skips the HTTP variants since httprobe already gave me the HTTPS ones.

## My order

1. Google dorking for a quick read on what the target advertises publicly.
2. `crt.sh` with `%.domain.tld` to mine certs.
3. `subfinder`, `assetfinder`, and `amass` in parallel for the merged passive pass.
4. Concatenate + `sort -u` into one final list.
5. `httprobe` to keep only the live ones.
6. `gowitness` to screenshot them all and triage visually.
7. Anything that looks like staging, dev, admin, internal, or old goes to the top of my list.

Passive sources first. Active subdomain bruteforcing (`ffuf` against a DNS wordlist, etc.) only after I've confirmed scope.
