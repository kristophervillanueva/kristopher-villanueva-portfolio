import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
            height: 340,
            background:
              "radial-gradient(ellipse 60% 100% at 30% 0%, rgba(241,163,60,0.16), transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingLeft: 24,
            paddingTop: 20,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              border: "1px solid #2b3442",
              background: "#0e1116",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e9edf3",
              fontSize: 15,
              letterSpacing: 2,
            }}
          >
            KV
          </div>
          <div
            style={{
              display: "flex",
              color: "#77828f",
              fontSize: 17,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            portfolio · infrastructure
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 24,
            paddingRight: 24,
            marginTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#e9edf3",
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: -2.5,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              width: 90,
              height: 3,
              background: "#f1a33c",
              marginTop: 26,
              marginBottom: 24,
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#a3adbb",
              fontSize: 26,
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            {site.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 20,
          }}
        >
          <div style={{ display: "flex", gap: 48 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", color: "#e9edf3", fontSize: 28 }}>
                2 Hyper-V hosts
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#77828f",
                  fontSize: 14,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                4 VMs · Dell servers
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", color: "#e9edf3", fontSize: 28 }}>
                TrueNAS · Veeam
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#77828f",
                  fontSize: 14,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                documented and tested
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "#77828f",
              fontSize: 17,
              letterSpacing: 1,
            }}
          >
            {site.locationShort}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
