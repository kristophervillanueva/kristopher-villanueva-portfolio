import type { ComponentPropsWithoutRef, ComponentType } from "react";
import type { Project } from "@/lib/projects";
import type { EvidenceMap } from "@/lib/evidence";
import { BackupFlowDiagram } from "@/components/diagrams/backup-flow";
import { RemoteAccessDiagram } from "@/components/diagrams/remote-access";
import {
  Callout,
  DecisionTable,
  NextSteps,
  NotClaimingList,
} from "@/components/case-study-blocks";
import { EvidenceGrid } from "@/components/evidence";

type MdxComponents = Record<string, ComponentType<Record<string, unknown>>>;

export function getMdxComponents(
  project: Project,
  evidence: EvidenceMap,
): MdxComponents {
  const components = {
    Decisions: () => <DecisionTable decisions={project.decisions} />,
    Evidence: () => <EvidenceGrid project={project} map={evidence} />,
    NotClaiming: () => <NotClaimingList items={project.notClaiming} />,
    Next: () => <NextSteps items={project.next} />,
    Diagram: () => {
      if (project.diagram === "backup-flow") return <BackupFlowDiagram />;
      if (project.diagram === "remote-access") return <RemoteAccessDiagram />;
      return null;
    },
    Callout,
    a: ({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) => {
      const external = href?.startsWith("http");
      return (
        <a
          href={href}
          {...rest}
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {children}
        </a>
      );
    },
  };

  return components as unknown as MdxComponents;
}
