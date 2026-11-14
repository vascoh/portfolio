import type { Metadata } from "next";
import { site } from "@/content/site";
import { href, locales, type Locale } from "@/i18n/config";

export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  const url = href(lang, path);
  const languages = Object.fromEntries(locales.map((l) => [l === "en" ? "en" : "pt-PT", href(l, path)]));
  return {
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, "x-default": href("pt", path) } },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: lang === "en" ? "en_GB" : "pt_PT",
      alternateLocale: lang === "en" ? ["pt_PT"] : ["en_GB"],
      images: [{ url: "/images/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.headline}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og.png"] },
  };
}
