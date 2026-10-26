# Security policy

## Reporting a vulnerability

If you find a security issue in this site, email **kristopher.m.villanueva@gmail.com**
with enough detail to reproduce it. Please do not open a public issue for a
suspected vulnerability.

I aim to acknowledge reports within 5 working days. There is no bug bounty.

## Scope

In scope:

- This site's application code, content pipeline and build configuration.
- The `/admin` upload surface and `/api/evidence` endpoint.
- Security headers, caching behaviour and handling of evidence images.

Out of scope:

- Denial-of-service testing or volumetric traffic.
- Social engineering.
- Vulnerabilities in Vercel's platform or third-party services; report those to
  the relevant vendor.
- Findings that require a compromised administrator password or an
  already-trusted device.

## Handling of secrets and data

- No credentials, API keys, phone numbers or internal hostnames are committed to
  this repository.
- `ADMIN_PASSWORD` and `BLOB_READ_WRITE_TOKEN` are supplied as environment
  variables in Vercel and are never exposed to the browser.
- The admin password is compared server-side using SHA-256 digests and a
  constant-time comparison. Upload failures are rate-limited per source address.
- Uploaded images are re-encoded server-side to WebP with metadata stripped.
- Evidence screenshots are redacted before publication. Architecture details on
  the public pages are generalised.

## Headers and known limitations

Production responses send:

- `Content-Security-Policy` with `default-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'none'`, and no third-party script, font or media origins.
- `Strict-Transport-Security` with a two-year max-age, `includeSubDomains` and
  `preload`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Cross-Origin-Opener-Policy: same-origin`, and a restrictive
  `Permissions-Policy`.
- No `X-Powered-By` header.

Known limitations:

- `script-src` includes `'unsafe-inline'` because Next.js emits inline bootstrap
  and hydration scripts. There is no nonce plumbing, and switching to a nonce
  would make the pre-rendered pages dynamic. External script origins are still
  blocked, and the site loads no third-party JavaScript.
- `/admin` uses a shared password rather than an identity provider. Failed checks
  are rate-limited per source address, but a distributed guessing attempt is not
  fully mitigated. Deployment Protection should be used if that matters.
- The production dependency audit is clean. Two moderate advisories remain in
  the build-only `@tailwindcss/typography` chain; they are not part of the
  runtime and are tracked rather than force-downgraded.
