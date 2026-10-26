# Evidence — Zero-Budget Secure Remote Access

Drop screenshots here using the slot ids from the frontmatter of
`content/projects/secure-remote-access.mdx`:

| Slot id | File | What it should prove |
| --- | --- | --- |
| `opnsense-vpn` | `opnsense-vpn.webp` | The tunnel is up with tls-crypt-v2 and a client is connected. |
| `fortigate-policy` | `fortigate-policy.webp` | One narrow inbound policy, ordered above the broad VLAN policy. |
| `privacyidea-token` | `privacyidea-token.webp` | Per-user TOTP tokens enrolled and resolving through RADIUS. |
| `vpn-client` | `vpn-client.webp` | A home connection authenticating with all three factors. |
| `rdp-session` | `rdp-session.webp` | RDP crossing the tunnel into the correct VLAN. |
| `vnc-dual-monitor` | `vnc-dual-monitor.webp` | UltraVNC handling lock screen, UAC and dual monitors. |
| `ldaps-cert` | `ldaps-cert.webp` | Directory lookup over TLS to one controller by hostname. |

WebP preferred; PNG, JPEG and AVIF also work — the filename stem must match
the slot id exactly.

After adding a file, set that slot's `status` to `verified` and add a `date`
in the frontmatter, then redeploy. Alternatively use `/admin` to upload to
Blob storage, which revalidates the page without a redeploy.

**Redact before committing.** See `docs/REDACTION.md`. On these screenshots
the risky areas are the FortiGate policy name and interface, the OPNsense
certificate subject, VPN client usernames and any desktop wallpaper or window
title that identifies the practice.
