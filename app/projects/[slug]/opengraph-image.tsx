import { ImageResponse } from "next/og";
import { categoryLabel, getProject } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.title ?? site.name;
  const subtitle = project?.subtitle ?? site.specialism;
  const category = project ? categoryLabel(project.category) : site.role;
  const metrics = project?.metrics.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            right: 48,
            bottom: 48,
            border: "1px solid #1b212a",
            borderRadius: 10,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 320,
            background:
              "radial-gradient(ellipse 55% 100% at 15% 0%, rgba(241,163,60,0.14), transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#6c7787",
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            case study · {category}
          </div>
          <div
            style={{
              display: "flex",
              color: "#6c7787",
              fontSize: 16,
              letterSpacing: 2,
            }}
          >
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#e9edf3",
              fontSize: title.length > 44 ? 54 : 64,
              fontWeight: 600,
              letterSpacing: -1.8,
              lineHeight: 1.08,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              width: 90,
              height: 3,
              background: "#f1a33c",
              marginTop: 24,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#a3adbb",
              fontSize: 24,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {subtitle.length > 120 ? `${subtitle.slice(0, 117)}…` : subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 56,
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 20,
          }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", color: "#e9edf3", fontSize: 26 }}>
                {metric.value}
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#6c7787",
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
          {metrics.length === 0 && (
            <div
              style={{
                display: "flex",
                color: "#6c7787",
                fontSize: 16,
                letterSpacing: 1,
              }}
            >
              {site.role} · {site.locationShort}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
