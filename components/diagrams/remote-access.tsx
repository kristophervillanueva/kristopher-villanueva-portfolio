import { DiagramFrame, LegendItem } from "./diagram-frame";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

function Box({
  x,
  y,
  w,
  h,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={6}
      fill="var(--color-panel-2)"
      stroke={accent ? "var(--color-accent)" : "var(--color-line-2)"}
      strokeOpacity={accent ? 0.55 : 1}
      strokeWidth={1}
    />
  );
}

function T({
  x,
  y,
  children,
  size = 9,
  color = "var(--color-ink-3)",
  family = mono,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  size?: number;
  color?: string;
  family?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      fontFamily={family}
      textAnchor={anchor}
      letterSpacing={family === mono ? 0.5 : 0}
    >
      {children}
    </text>
  );
}

export function RemoteAccessDiagram() {
  return (
    <DiagramFrame
      title="remote access path"
      caption="A user connects with a personal certificate, their Active Directory password and a TOTP code. Authentication is checked before the tunnel routes traffic to the office VLANs. The final VNC hop from the gateway to a render PC is unencrypted on the office LAN — a documented limitation, not an oversight."
      legend={
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <LegendItem>traffic path</LegendItem>
          <LegendItem dashed accent>
            authentication lookup
          </LegendItem>
        </div>
      }
    >
      <svg
        viewBox="0 0 900 252"
        role="img"
        aria-labelledby="remote-access-title"
        className="h-auto w-full"
      >
        <title id="remote-access-title">
          Remote access path: home PC through FortiGate and OPNsense OpenVPN,
          authenticating via FreeRADIUS, privacyIDEA and Active Directory over
          LDAPS, then reaching an office PC over RDP or VNC on the office VLANs.
        </title>

        <defs>
          <marker
            id="ra-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill="var(--color-line-2)" />
          </marker>
          <marker
            id="ra-arrow-accent"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill="var(--color-accent)" />
          </marker>
        </defs>

        {/* row 1 — session path */}
        <Box x={12} y={36} w={140} h={76} />
        <T x={26} y={56}>
          HOME PC
        </T>
        <T x={26} y={76} size={9.5} color="var(--color-ink)">
          OpenVPN client
        </T>
        <T x={26} y={94} size={8.5}>
          certificate
        </T>
        <T x={26} y={106} size={8.5}>
          password · TOTP
        </T>

        <Box x={196} y={36} w={140} h={76} />
        <T x={210} y={56}>
          FORTIGATE 60F
        </T>
        <T x={210} y={76} size={9.5} color="var(--color-ink)">
          one inbound policy
        </T>
        <T x={210} y={94} size={8.5}>
          VIP → TCP 8443
        </T>

        <Box x={380} y={36} w={160} h={76} accent />
        <T x={394} y={56} color="var(--color-accent)">
          OPNsense
        </T>
        <T x={394} y={76} size={9.5} color="var(--color-ink)">
          OpenVPN · TCP 8443
        </T>
        <T x={394} y={94} size={8.5}>
          tls-crypt-v2
        </T>

        <Box x={584} y={36} w={130} h={76} />
        <T x={598} y={56}>
          VLAN 103–105
        </T>
        <T x={598} y={76} size={9.5} color="var(--color-ink)">
          split tunnel
        </T>
        <T x={598} y={94} size={8.5}>
          only these routed
        </T>

        <Box x={758} y={36} w={130} h={76} />
        <T x={772} y={56}>
          OFFICE PC
        </T>
        <T x={772} y={76} size={9.5} color="var(--color-ink)">
          RDP 3389
        </T>
        <T x={772} y={94} size={8.5}>
          or VNC 5900
        </T>

        {/* arrows row 1 */}
        <line
          x1={152}
          y1={74}
          x2={190}
          y2={74}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#ra-arrow)"
        />
        <line
          x1={336}
          y1={74}
          x2={374}
          y2={74}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#ra-arrow)"
        />
        <line
          x1={540}
          y1={74}
          x2={578}
          y2={74}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#ra-arrow)"
        />
        <line
          x1={714}
          y1={74}
          x2={752}
          y2={74}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#ra-arrow)"
        />

        {/* auth chain */}
        <line
          x1={460}
          y1={112}
          x2={460}
          y2={164}
          stroke="var(--color-accent)"
          strokeWidth={1.3}
          strokeDasharray="4 4"
          markerEnd="url(#ra-arrow-accent)"
          className="animate-flow"
        />
        <T x={470} y={143} size={8.5} color="var(--color-accent)">
          RADIUS
        </T>

        <Box x={380} y={170} w={160} h={62} />
        <T x={394} y={190}>
          FREERADIUS
        </T>
        <T x={394} y={208} size={9.5} color="var(--color-ink)">
          auth proxy
        </T>
        <T x={394} y={222} size={8.5}>
          Ubuntu 24.04
        </T>

        <Box x={570} y={170} w={150} h={62} />
        <T x={584} y={190}>
          PRIVACYIDEA
        </T>
        <T x={584} y={208} size={9.5} color="var(--color-ink)">
          TOTP tokens
        </T>
        <T x={584} y={222} size={8.5}>
          community edition
        </T>

        <Box x={750} y={170} w={138} h={62} />
        <T x={764} y={190}>
          ACTIVE DIRECTORY
        </T>
        <T x={764} y={208} size={9.5} color="var(--color-ink)">
          one DC
        </T>
        <T x={764} y={222} size={8.5}>
          explicit hostname
        </T>

        <line
          x1={540}
          y1={201}
          x2={564}
          y2={201}
          stroke="var(--color-accent)"
          strokeWidth={1.3}
          strokeDasharray="4 4"
          markerEnd="url(#ra-arrow-accent)"
          className="animate-flow"
        />
        <line
          x1={720}
          y1={201}
          x2={744}
          y2={201}
          stroke="var(--color-accent)"
          strokeWidth={1.3}
          strokeDasharray="4 4"
          markerEnd="url(#ra-arrow-accent)"
          className="animate-flow"
        />
        <T x={630} y={160} size={8.5} color="var(--color-ink-3)" anchor="middle">
          token validation
        </T>
        <T x={732} y={160} size={8.5} color="var(--color-ink-3)" anchor="middle">
          LDAPS 636
        </T>
      </svg>
    </DiagramFrame>
  );
}
