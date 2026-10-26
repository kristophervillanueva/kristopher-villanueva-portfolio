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

function Label({
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
      letterSpacing={family === mono ? 0.6 : 0}
    >
      {children}
    </text>
  );
}

export function BackupFlowDiagram() {
  return (
    <DiagramFrame
      title="backup & recovery data flow"
      caption="Veeam protects the virtual machines; Windows Server Backup protects the physical host. Both write to the primary NAS, and selected datasets are replicated to a second system on separate hardware. Storage locations and retention are configuration snapshots, not guarantees."
      legend={
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <LegendItem>backup write path</LegendItem>
          <LegendItem dashed accent>
            ZFS replication
          </LegendItem>
        </div>
      }
    >
      <svg
        viewBox="0 0 900 236"
        role="img"
        aria-labelledby="backup-flow-title"
        className="h-auto w-full"
      >
        <title id="backup-flow-title">
          Backup data flow: Hyper-V hosts to Veeam and Windows Server Backup, to
          a primary TrueNAS system, replicated to a secondary TrueNAS system.
        </title>

        <defs>
          <marker
            id="bf-arrow"
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
            id="bf-arrow-accent"
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

        {/* hosts */}
        <Box x={12} y={36} w={196} h={176} />
        <Label x={28} y={58}>
          HYPER-V HOSTS
        </Label>
        <Label x={28} y={82} size={12.5} color="var(--color-ink)" family={sans}>
          Windows Server
        </Label>
        <Label x={28} y={100} size={10} color="var(--color-ink-2)">
          4 production VMs
        </Label>
        <line
          x1={28}
          y1={114}
          x2={192}
          y2={114}
          stroke="var(--color-line)"
        />
        <Label x={28} y={136} size={9.5}>
          host 01 · 3 VMs
        </Label>
        <Label x={28} y={154} size={9.5}>
          host 02 · 1 VM
        </Label>
        <Label x={28} y={180} size={9}>
          2 Dell servers
        </Label>

        {/* veeam */}
        <Box x={262} y={52} w={156} h={64} />
        <Label x={278} y={72}>
          VEEAM
        </Label>
        <Label
          x={278}
          y={90}
          size={9.5}
          color="var(--color-ink)"
          family={mono}
        >
          vm backup jobs
        </Label>
        <Label x={278} y={105} size={9}>
          4-hour interval
        </Label>

        {/* windows server backup */}
        <Box x={262} y={148} w={156} h={64} />
        <Label x={278} y={168} size={8.5}>
          WINDOWS SERVER BACKUP
        </Label>
        <Label
          x={278}
          y={186}
          size={9.5}
          color="var(--color-ink)"
          family={mono}
        >
          system image
        </Label>
        <Label x={278} y={201} size={9}>
          physical host
        </Label>

        {/* primary */}
        <Box x={470} y={36} w={170} h={176} accent />
        <Label x={486} y={58} color="var(--color-accent)">
          PRIMARY NAS
        </Label>
        <Label x={486} y={82} size={12} color="var(--color-ink)" family={sans}>
          TrueNAS
        </Label>
        <line
          x1={486}
          y1={96}
          x2={624}
          y2={96}
          stroke="var(--color-line)"
        />
        <Label x={486} y={118} size={9.5} color="var(--color-ink-2)">
          RAID-Z2 · 6 × 6 TB
        </Label>
        <Label x={486} y={136} size={9.5} color="var(--color-ink-2)">
          ≈ 21.7 TiB usable
        </Label>
        <line
          x1={486}
          y1={152}
          x2={624}
          y2={152}
          stroke="var(--color-line)"
        />
        <Label x={486} y={174} size={9}>
          14 restore points
        </Label>
        <Label x={486} y={190} size={9}>
          separate from production
        </Label>

        {/* secondary */}
        <Box x={700} y={66} w={180} h={116} />
        <Label x={716} y={88}>
          SECONDARY NAS
        </Label>
        <Label x={716} y={112} size={12} color="var(--color-ink)" family={sans}>
          TrueNAS
        </Label>
        <Label x={716} y={130} size={9} color="var(--color-ink-2)">
          selected datasets
        </Label>
        <line
          x1={716}
          y1={144}
          x2={864}
          y2={144}
          stroke="var(--color-line)"
        />
        <Label x={716} y={164} size={9}>
          separate hardware
        </Label>

        {/* connectors */}
        <line
          x1={208}
          y1={84}
          x2={256}
          y2={84}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#bf-arrow)"
        />
        <line
          x1={208}
          y1={180}
          x2={256}
          y2={180}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#bf-arrow)"
        />
        <line
          x1={418}
          y1={84}
          x2={464}
          y2={84}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#bf-arrow)"
        />
        <line
          x1={418}
          y1={180}
          x2={464}
          y2={180}
          stroke="var(--color-line-2)"
          strokeWidth={1.3}
          markerEnd="url(#bf-arrow)"
        />

        {/* replication */}
        <line
          x1={640}
          y1={124}
          x2={694}
          y2={124}
          stroke="var(--color-accent)"
          strokeWidth={1.4}
          markerEnd="url(#bf-arrow-accent)"
          className="animate-flow"
        />
        <Label
          x={667}
          y={112}
          size={8.5}
          color="var(--color-accent)"
          anchor="middle"
        >
          replication
        </Label>
      </svg>
    </DiagramFrame>
  );
}
