# Note screenshots

Drop sanitized screenshots into the matching repo folder:

- `portswigger-academy-notes/` — Burp Suite labs, PortSwigger Academy
- `tcm-pwpa-notes/` — TCM PWPA labs

Naming: `<note-slug>-<short-id>.png` (e.g. `authentication-burp-repeater.png`,
`path-traversal-payload-fired.png`). Match the markdown filename in
`content/notes/<repo>/<section>/<note>.md` so it's obvious which note an image
belongs to.

Reference from markdown:

```md
![Burp Repeater showing the bypassed login response](/notes/portswigger-academy-notes/authentication-burp-repeater.png "Repeater after stripping the role cookie")
```

The `title` attribute (the quoted text after the URL) renders as a caption
under the image. Omit it for no caption.

Before committing: redact session cookies, lab account IDs, and anything
PortSwigger-specific you're not allowed to share.
