import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { defaultDescription, personJsonLd, siteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#07080a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: defaultDescription,
  applicationName: `${site.name} portfolio`,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  keywords: [
    "IT Administrator",
    "Systems Administrator",
    "Infrastructure Engineer",
    "Windows Server",
    "Active Directory",
    "Microsoft 365",
    "Hyper-V",
    "TrueNAS",
    "Veeam",
    "FortiGate",
    "Disaster Recovery",
    "Metro Manila",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: defaultDescription,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const json = JSON.stringify(personJsonLd).replace(/</g, "\\u003c");

  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh bg-canvas antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-panel focus:px-4 focus:py-2 focus:text-sm focus:text-ink focus:outline focus:outline-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      </body>
    </html>
  );
}
