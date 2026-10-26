import type { Metadata } from "next";
import { AdminUploader } from "@/components/admin-uploader";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Evidence upload",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  const projects = getAllProjects({ includeDrafts: true }).map((project) => ({
    slug: project.slug,
    title: project.title,
    slots: project.evidence.map((item) => ({
      id: item.id,
      label: item.label,
      proves: item.proves,
      status: item.status,
    })),
  }));

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16">
      <AdminUploader
        projects={projects}
        configured={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
        hasPassword={Boolean(process.env.ADMIN_PASSWORD)}
      />
    </div>
  );
}
