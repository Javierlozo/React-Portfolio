---
title: "Authorization Attacks"
order: 2
source: "https://github.com/Javierlozo/tcm-pwpa-notes/blob/main/02-auth-attacks/authorization.md"
---

# Authorization Attacks

> **Course module:** Authentication and Authorization Attacks → Introduction to Authorization, IDOR, Introduction to APIs, Broken Access Control, Testing with Autorize
> **OWASP Top 10:** A01 - Broken Access Control

## Cheat sheet

Authorization (a.k.a. access control) is **what you're allowed to do** once the app knows who you are. Authentication asks "is this `carlos`?". Authorization asks "is `carlos` allowed to read this invoice / delete this user / hit this admin page?".

**Three flavors of authz check, three flavors of bug:**

- **Vertical**: low-priv user reaches functionality reserved for admins
- **Horizontal**: user A reads or writes user B's data (this is where IDOR lives)
- **Context-dependent**: user breaks a step in a multi-step flow they shouldn't (modifying cart after payment, voting twice, skipping payment)

**Where I look first:**

- Anything with a numeric or guessable ID in the URL or body (`/api/user/123`, `/orders/456`)
- Admin paths that work without role checks (`/admin`, `/admin-panel-yb556` leaked in JS)
- Role flags in cookies, hidden fields, or query strings that the user can edit
- Method tampering: if `POST /admin` is blocked, try `GET /admin`, `PUT /admin`
- Path tricks: `/admin/` vs `/admin`, `/Admin`, `/admin;.png`

**Tools:** Burp Repeater for one-off swaps, **Autorize** extension to test every request as a second user automatically.

## Authentication vs Authorization

Same distinction as in [authentication.md](./authentication.md), repeated because it matters:

- **Authentication:** who you are. The login form.
- **Authorization:** what you can do. Every door inside.

A useful test in your head: "If two users have valid sessions, can user A do something to user B's data?" Yes is a horizontal authz bug. "If a normal user pokes admin URLs, do they work?" Yes is a vertical authz bug.

## Three types of access control (PortSwigger's framing)

The categories that show up in every modern training:

- **Vertical access control.** Different user roles get different features. Admins manage users, normal users don't. Broken when a normal user reaches an admin feature.
- **Horizontal access control.** Same role, different data. Two normal users can each see their own banking transactions, never each other's. Broken when user A reads user B's data.
- **Context-dependent access control.** The same user is allowed to do something at one step of a flow but not another. Editing a cart is fine before payment, not after. Broken when the user can jump back to an earlier state.

Most real findings are vertical or horizontal. Context-dependent is rarer but very high-impact because it usually means money or fraud.

## IDOR (Insecure Direct Object Reference)

The classic horizontal authz bug. The app exposes an object identifier directly in the request and uses it to look up data **without checking that the logged-in user is allowed to see that object**.

Canonical example: I log in as user `123` and visit my profile.

```
GET /api/user/123/profile HTTP/1.1
Host: target.com
Cookie: session=abc...
```

Server returns my profile. Fine. Now I send the same request to Repeater and change `123` to `124`:

```
GET /api/user/124/profile HTTP/1.1
Host: target.com
Cookie: session=abc...
```

If user 124's profile comes back, that's IDOR. The app trusted the ID in the URL instead of checking "does this session own user 123, and is user 123 allowed to read user 124?".

### Where IDOR shows up

Not just `/api/user/{id}`. Anywhere the app routes by ID:

- `/orders/456`
- `/messages/inbox?conversation=789`
- `/invoices/download?id=1001`
- `POST /transfer` with body `{"from": "123", "to": "999", "amount": 1}` (swap `from` to someone else's account)
- Hidden form fields like `<input type="hidden" name="user_id" value="123">`

### What IDs to try

- **Sequential integers.** Increment, decrement. Easiest case.
- **UUIDs.** Harder to guess, but if they're version-1 (timestamp-based) or leaked anywhere else in the app (in a list view, in an email link, in a JS file), the bug still exists, just the ID is harder to find.
- **Base64'd integers.** Decode, increment, re-encode. Same bug, slight obfuscation.
- **Predictable hashes** like MD5 of the user's email. If I can guess the input, I can guess the ID.

### Why Repeater is the right tool

Each test is a deliberate single-shot change. I don't want to spray hundreds of IDs at a production app before confirming the bug exists. Two or three Repeater sends are enough to prove or disprove it. For broader sweeps once the bug is confirmed, I'd move to Intruder Sniper or to Autorize for cross-user replay.

## APIs as the IDOR surface

A short detour because the course bundles "Introduction to APIs" right next to IDOR, and they're tied together.

Modern web apps don't render full HTML pages with the data baked in. The browser loads a JS bundle, and the JS bundle calls a REST or GraphQL API for every piece of data:

```
GET /api/v1/users/123       → user profile JSON
GET /api/v1/orders/456      → order JSON
POST /api/v1/orders         → create order
DELETE /api/v1/orders/456   → cancel order
```

Every one of those endpoints is a place where authorization needs to happen. And because they're called from JS, every parameter is visible in DevTools or in Burp's HTTP history. The attacker can call them too, with any value they want.

This is why APIs dominate modern access control findings:

- The IDs are right there in the request path or body
- The same endpoint is called from many UI pages, but the authz check has to be implemented once per endpoint, not once per UI page. Easy to forget on one of them.
- API docs (Swagger, GraphQL introspection) often expose every endpoint the app has, including ones the UI never calls
- "Hidden" admin endpoints often live under the same `/api/v1/...` prefix and just aren't linked in the UI

I always look for:

- A Swagger / OpenAPI doc (`/swagger`, `/api-docs`, `/openapi.json`)
- A GraphQL introspection endpoint (`/graphql` with `__schema` query enabled)
- API endpoints referenced in the JS bundle but not used by the UI I see (Param Miner and grep)
- Versioned alternates (`/api/v2/...`, `/internal/...`, mobile-only endpoints)

## Broken Access Control

The OWASP umbrella that contains IDOR plus everything else where an authorization check is missing or wrong.

### Vertical privilege escalation

A normal user reaches admin functionality.

- **Unprotected admin endpoint.** `/admin` works for anyone who knows the URL. The URL might be in `robots.txt`, brute-forceable with `dirb`/`ffuf`, or leaked in client-side JS that conditionally renders an admin link based on a role flag (the script runs for everyone, so the URL ends up in the bundle for everyone).
- **Parameter-based access control.** The role lives somewhere the user can edit:
  ```
  GET /home?admin=true
  Cookie: role=admin
  <input type="hidden" name="user_role" value="user">
  ```
  Flip any of those. If anything changes, it's broken.
- **Platform / proxy misconfiguration.** The proxy blocks `POST /admin` but the app accepts `GET /admin` or `PUT /admin`. Or the proxy honors `X-Original-URL: /admin/deleteUser` while routing on `/home`. HTTP method tampering and header overrides are the classic moves.
- **URL-matching discrepancies.** Proxy and app interpret the URL differently. `/admin` vs `/admin/` vs `/Admin` vs `/admin;.png`. Whichever the proxy doesn't recognize as "the admin path" but the app does is the bypass.

### Horizontal privilege escalation

Already covered as IDOR above. Same user role, different user's data.

Sometimes horizontal becomes vertical. If user 1 is the admin and I can read user 1's data as user 1234, I'm now reading admin data. Worse, if the same bug lets me **change** user 1's password, I just escalated to admin.

### Context-dependent

The state machine breaks.

- Skipping the payment step in a multi-page checkout and still receiving the order
- Editing the cart after the order is finalized
- Submitting the same coupon twice before the "already used" flag is written
- Triggering an action that's only supposed to be available during a setup wizard, after the wizard finishes

These bugs are usually found by playing the flow forward normally, then **replaying earlier requests out of order** in Repeater.

## Testing with Autorize

Doing IDOR by hand in Repeater is fine for one or two endpoints. On a real app with hundreds of endpoints, the question becomes "is **any** endpoint missing an authz check?", and you cannot click through that manually.

**Autorize** is the Burp extension that automates the cross-user check. Install from `Extensions → BApp Store → Autorize`.

### How it works

1. I configure two sessions: my normal session cookie (User A, "high-privilege"), and a second session (User B, "low-privilege" or "no session at all").
2. Autorize watches every request my browser makes as User A.
3. For each one, it replays the same request twice in the background:
   - Once with User B's cookie (low-priv replay)
   - Once with no auth header at all (unauthenticated replay)
4. It compares the three responses and flags each as `Bypassed!`, `Not bypassed`, or `Is enforced??` (manual review needed).

I browse the app normally with User A. Autorize fills with results behind the scenes. Anywhere the low-priv user got the same response as the high-priv user is a candidate finding.

### Setup workflow

1. Open the app in Burp's browser, log in as User A. Note the request flow looks normal.
2. Right-click any request → `Engagement tools` → `Copy` to grab User A's cookie. Set that aside, I'll usually keep User A as the active browser session.
3. Log in as User B in a separate browser or private window, capture User B's cookie.
4. In Autorize's config, paste User B's cookie into the `Configuration` tab as the "low privileged user" headers (replace `Cookie: session=...` with B's value).
5. Click `Autorize is off` to turn it `Autorize is on`.
6. Switch back to the User A browser and click around the app, especially anything that loads data: profile pages, order lists, admin tools, account settings.
7. Watch the Autorize results table. Sort by status. `Bypassed!` rows are findings.

### Interpreting results

Autorize is fast but it produces false positives. The three statuses:

- **Bypassed!**: low-priv response looks identical (or near-identical) to high-priv. Almost always a finding, but verify the response actually contains the high-priv data (a generic error page can look identical between users).
- **Not bypassed**: responses differ significantly (different status, different length). Authz is doing something, probably correctly.
- **Is enforced??**: the extension isn't sure. Manual review. Check the response in Repeater.

For each `Bypassed!`, I send the original request to Repeater, swap in User B's cookie myself, and confirm the data leak. Autorize is the funnel; Repeater is the confirmation.

### Limits

- Autorize replays requests as-is. If the app uses CSRF tokens that are tied to the session, the low-priv replay will fail because the token belongs to User A. Workaround: configure Autorize to substitute the CSRF token, or test endpoints that don't use CSRF (most JSON APIs).
- It catches missing checks, not buggy ones. If User B is supposed to have access but the check is wrong (e.g., role comparison off-by-one), Autorize won't flag it.
- It only covers requests I actually trigger as User A. Endpoints that User A's UI never calls won't be tested. I need to browse thoroughly, and supplement with API doc enumeration.

## My order in an authz test

1. Log in as two users with different privilege levels (or one user + unauthenticated).
2. Map every endpoint while logged in as the high-priv user. Site map fills in.
3. Turn Autorize on, browse the high-priv account through every page that loads data.
4. Triage `Bypassed!` results. For each, manually replay in Repeater to confirm.
5. For obvious IDOR candidates (any request with an ID), increment/decrement in Repeater regardless of what Autorize said.
6. For admin endpoints found in JS, robots.txt, or path brute force, hit them with the low-priv user.
7. Document each finding with the original request, the replayed request, and the data that leaked.

## Related notes

- [Authentication Attacks](./authentication.md): the first half of this module
- [Burp Suite: IDOR section](../01-recon/burp-suite.md#idor-insecure-direct-object-reference): the manual Repeater workflow
- [Burp Suite: Extensions](../01-recon/burp-suite.md#extensions-bapp-store-and-turbo-intruder): installing Autorize and friends
- PortSwigger Academy: [access control](https://portswigger.net/web-security/access-control) for the same material with hands-on labs

## Lab writeups

Add links here as I complete labs touching authorization or IDOR.
