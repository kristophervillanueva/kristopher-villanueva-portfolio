# Evidence — VLAN segmentation

Drop redacted screenshots here as `<slot-id>.webp`, or upload them through `/admin`
(Blob storage wins over a local file). Nothing is published until a file exists.

| Slot | Suggested file | What it should prove |
| --- | --- | --- |
| `switch-vlans` | `switch-vlans.webp` | VLANs 102–105 exist on the relevant switches. |
| `pvid-ports` | `pvid-ports.webp` | Access ports and PVIDs match the intended assignment. |
| `tagged-uplinks` | `tagged-uplinks.webp` | Required VLANs are allowed across the uplinks. |
| `fortigate-interfaces` | `fortigate-interfaces.webp` | VLAN interfaces and gateway addresses match the plan. |
| `firewall-policy` | `firewall-policy.webp` | Inter-VLAN rules are explicit, not a blanket permit. |
| `endpoint-config` | `endpoint-config.webp` | A migrated device has the correct address, mask, gateway and DNS. |
| `connectivity-test` | `connectivity-test.webp` | Required same-VLAN and cross-VLAN services work. |
| `denied-path` | `denied-path.webp` | A path that should be blocked is blocked at the protocol level. |

Before publishing: redact hostnames, usernames, exact addressing, policy IDs and
any employer-identifying details. The page itself deliberately omits subnet values.
