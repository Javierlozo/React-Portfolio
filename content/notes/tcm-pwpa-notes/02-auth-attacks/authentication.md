---
title: "Authentication Attacks"
order: 1
source: "https://github.com/Javierlozo/tcm-pwpa-notes/blob/main/02-auth-attacks/authentication.md"
---

# Authentication Attacks

> **Course module:** Authentication and Authorization Attacks → Introduction to Authentication, Brute-force Attacks, Attacking MFA, Authentication Challenge Walkthrough
> **OWASP Top 10:** A07 - Identification and Authentication Failures

## Cheat sheet

Authentication is **who you are**. Break it and every authorization check downstream is making decisions on the wrong identity.

**Where the bugs live:**

- No rate limit on the login endpoint (or only on the visible one, not the mobile API)
- Username enumeration via different error text, status code, or response length
- Account lockout that's bypassable by spraying across many accounts
- MFA that can be skipped, replayed, brute-forced, or restarted to land logged-in
- Predictable password resets, weak "secret questions", remember-me cookies that double as auth

**Tools:** Burp Repeater for one-by-one, Burp Intruder (Sniper / Pitchfork / Cluster bomb) for fuzzing, Hydra for protocol-level brute force outside HTTP.

**Wordlists:** `rockyou.txt`, SecLists `Passwords/`, SecLists `Usernames/`, custom lists built from recon (employee names from LinkedIn, company words from the site).

## Authentication vs Authorization

Two words that get used like they mean the same thing. They don't.

- **Authentication:** who you are. The login form. "Prove you are `carlos`."
- **Authorization** (sometimes called **access control**): what you're allowed to do once the app believes who you are. "OK `carlos`, can you delete this invoice?"

Auth is the front door. Authorization is every locked door inside the building. You can break either one independently:

- Bypass auth and you log in as someone else.
- Bypass authorization and you keep your own login but reach things you shouldn't.

Both topics live together in this module because in the real world, a finding usually chains them: I authenticate as a low-privilege user (or no user at all), then I push through broken authz to get to admin data.

For authorization specifically, see [authorization.md](./authorization.md).

## What can the login flow actually be?

The three factors:

- **Knowledge** (something you know): password, PIN, security question
- **Possession** (something you have): phone with a code, hardware key, physical token
- **Inherence** (something you are): fingerprint, face, voice

A single-factor login is just one of those. MFA is two or more *from different categories*. Two passwords is not MFA. A password plus an SMS code is.

Each factor has its own failure modes. Password-based auth is the most attacked because it's the most common and the easiest to fuzz remotely.

## Brute-force attacks

The category covers any "try lots of values until one works" attack on an authentication mechanism. Three flavors:

- **Vertical brute force.** Pin one username, try many passwords. Standard attack against a single known target account.
- **Horizontal brute force** (a.k.a. password spraying). Pin one password, try many usernames. Slips under per-account lockout because no single account hits the threshold. The password you spray is usually a high-probability guess like `Welcome1!` or `Companyname2024!`.
- **Diagonal brute force** (a.k.a. credential stuffing). Many usernames paired with many passwords, often from a breach dump. Pitchfork attack in Burp: list A is emails, list B is the password leaked for that email.

### Brute-forcing usernames

Usernames are easy to guess when they follow a pattern. Common ones:

- `admin`, `administrator`, `root`, `test`, `demo`
- `firstname.lastname@<company>` is the universal corporate format
- Email addresses the app itself discloses (profile pages, comment authors, "user not found" responses)

I also generate a custom username list from recon: people on the company's LinkedIn or About page, run through a name-to-email mangler.

### Brute-forcing passwords

Smart guessing beats spraying a 14-million-line wordlist. Patterns I try first:

- `Companyname2024!`, `Welcome1!`, `Password1!`, `Changeme123!`
- Season + year: `Spring2024!`, `Summer2025!`
- `<firstname>123` for personal accounts
- Passwords leaked for the target's email in a known breach (HaveIBeenPwned, dehashed)

When a password policy forces resets, users iterate predictably: `Mypassword1!` becomes `Mypassword2!`.

### Username enumeration

When the app tells me whether a username exists, I can split the brute force into two cheaper steps: enumerate valid usernames first, then attack only those.

Three places this usually leaks:

- **Login:** "incorrect password" vs "user not found"
- **Registration:** "username already taken"
- **Forgot password:** "email sent" vs "no account with that email"

Even when the visible text is identical, response **time**, **status code**, or **content length** can leak the same information. In Burp Intruder, sort the result table by Length and Status. An outlier is a tell.

### Workflow in Burp

1. Catch the login `POST` in the proxy.
2. Send to Intruder (`Ctrl+I`).
3. Mark the username and/or password as positions with `§`.
4. Pick the attack type:
   - **Sniper** for one position at a time (just usernames, or just passwords against one user).
   - **Pitchfork** for paired username/password lists (credential stuffing).
   - **Cluster bomb** for full Cartesian product (many users × many passwords).
5. Load the wordlists in the `Payloads` tab.
6. Start the attack. Sort by length and status. The outlier is usually the hit.

More on the attack types in [burp-suite.md](../01-recon/burp-suite.md#the-four-attack-types).

### Defenses I look for (and how they fail)

- **Account lockout** after N failed attempts. Bypassed by password spraying: one attempt per account across many accounts.
- **IP-based rate limiting**. Bypassed when the app trusts a header like `X-Forwarded-For` and rotates per request. Also bypassable through Tor, residential proxy pools, or just slow-rolling under the threshold.
- **CAPTCHA**. Sometimes only shown after the first failure, so the first attempt for each account is always CAPTCHA-free. Sprays slip through.
- **"Login from new location"** email. Doesn't actually block, just notifies. Attack still succeeds; user might or might not notice in time.
- **Mobile or legacy endpoint**. The protections live on `/login` but not on `/api/v1/login` or the GraphQL mutation. I always look for a second auth endpoint with weaker controls.

## Attacking MFA

MFA is supposed to mean "even if the password leaks, the attacker still needs the phone." It's not bulletproof.

### Bypassing the second factor entirely

The most embarrassing class of MFA bug. The app authenticates the user, then trusts the client to walk through the MFA step. If I can skip the step, I'm in.

- **Direct navigation.** After submitting the password, the app sends me to `/2fa-verify`. I change the URL to `/account` and the session is already authenticated. Classic broken state machine.
- **Force-browsing the post-login page.** Same idea, different vector. `/dashboard` doesn't check that the MFA step was completed, only that the session is logged in.
- **Editing the MFA-required flag.** A cookie or response field says `mfa_required=true`. Flip it.

### Brute-forcing the MFA code

A six-digit numeric code has only one million possibilities. If there's no rate limit on the code submission, that's seconds of work. Even with a rate limit, many apps:

- Apply the limit only to the password step, not the code step
- Reset the limit when the user requests a new code (so request a new code every N attempts)
- Apply the limit per account but not per IP, or vice versa

I look at the second-factor request the same way as the first-factor: send to Intruder, mark the code field, pick a Sniper attack with payloads `000000`-`999999`, sort by length.

### Replay and timing

- **Replay.** If the same code works for a window of time, capturing one valid code (phishing, screen-share, log leak) lets me reuse it.
- **Code never expires.** If the app doesn't invalidate the code after first use, I can land it later.
- **Race condition.** Submit the code twice in parallel and the app might process both before marking the code used. Usually not useful for MFA itself, but the same race shows up in coupons, withdrawals, and password resets.

### Recovery flow as a side door

"Forgot device" is the second factor's weakest link. If I can answer a security question, receive a backup email, or claim a phone number reassignment, I drop the MFA requirement entirely.

I always check whether the recovery flow has the same rate limits and protections as the main login. It usually doesn't.

### Push fatigue and SIM swap

Out of scope for a remote-only test, but worth knowing because clients ask:

- **Push fatigue.** Spam the user with push approval prompts until they hit approve to make it stop. Real attack, documented in the Uber 2022 breach.
- **SIM swap.** Social-engineer the carrier into porting the victim's number to the attacker's SIM, then receive SMS codes. Carrier problem, but it's why SMS as a factor is regarded as weak.

## Authentication Challenge Walkthrough

The course wraps the module with a hands-on lab. The flow I use:

1. **Recon the login.** What endpoint? What parameters? What does each error look like? Is there a separate API endpoint with the same function?
2. **Check for username enumeration.** Send a known-bad username, then a known-good one (one I registered, one from `robots.txt`, one I guessed). Compare in Comparer. Any difference at all is a leak.
3. **Build the username list.** From enumeration plus recon (employee names, default accounts).
4. **Spray the high-probability passwords first.** `Welcome1!`, `Companyname2024!`. Pitchfork attack pairing username with a small password list.
5. **If MFA blocks me, retest the post-MFA state.** Skip the MFA page directly. Try every protected URL. Check the cookie before and after MFA for any flag I can flip.
6. **Document each finding** as it happens with the request, response, and the impact, so the report writes itself later.

I keep a running notes file as I go. Repeating "what was that request again?" two hours later wastes more time than just writing it down.

## Related notes

- [Burp Suite](../01-recon/burp-suite.md): Repeater, Intruder, Comparer, the tools used in every step above
- [Authorization Attacks](./authorization.md): the second half of this module, what you can do once authenticated
- PortSwigger Academy: [authentication](https://portswigger.net/web-security/authentication) for the same material with hands-on labs

## Lab writeups

Add links here as I complete labs touching authentication.
