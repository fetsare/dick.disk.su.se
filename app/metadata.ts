import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dick.disk.su.se";
const siteName = "DICK – DISKs Interna Catan Klub";
const siteDescription = "DICK är DISKs interna Catan-klubb på DSV, Stockholms universitet. Bli medlem och läs mer om oss.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: baseUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const pagesMetadata = {
  about: {
    title: "Om oss",
  },
  members: {
    title: "Medlemmar",
  },
  profile: {
    title: "Profil",
  },
  becomeMember: {
    title: "Bli medlem",
  },
  becomeMemberThanks: {
    title: "Tack för din anmälan",
  },
  login: {
    title: "Logga in",
  },
  admin: {
    title: "Admin",
    robots: { index: false, follow: false },
  },
  logout: {
    title: "Logga ut",
    robots: { index: false, follow: false },
  },
} satisfies Record<string, Metadata>;
