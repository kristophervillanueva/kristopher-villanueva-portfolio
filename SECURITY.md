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
- Findings that require a compromised administrator password or a already-trusted
  device.

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
