import { site } from "./site";

function resolveUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveUrl();

export const defaultDescription =
  "IT administrator working across infrastructure, Microsoft 365 and security operations. Windows Server, Hyper-V, Active Directory, FortiGate, TrueNAS and Veeam — documented, tested and honestly reported.";

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: `${site.role} — ${site.specialism}`,
  email: `mailto:${site.email}`,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mandaluyong City",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
  sameAs: [site.linkedin],
  knowsAbout: [
    "Windows Server",
    "Active Directory",
    "Hyper-V",
    "Microsoft 365",
    "FortiGate",
    "TrueNAS",
    "Veeam Backup & Replication",
    "Disaster Recovery",
    "Network Segmentation",
  ],
};
