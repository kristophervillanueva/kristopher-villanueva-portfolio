import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent_75%)]"
      />
      <div className="relative mx-auto max-w-[1180px] px-5 py-28 sm:px-8 sm:py-40">
        <p className="eyebrow">404 · no route to host</p>
        <h1 className="mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3rem)] leading-[1.05] tracking-[-0.02em]">
          That page is not in the routing table.
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-2">
          The link may be stale, or the project may have been renamed. The
          project index is the reliable place to start.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            All projects
          </Link>
          <Link href="/" className="btn btn-ghost">
            <ArrowLeft className="size-3.5" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
