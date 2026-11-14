import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { href, locales } from "@/i18n/config";

export const dynamic = "force-static";

const pages = ["/", "about", "projects", "skills", "experience", "insights", "contact", ...projects.map((p) => `projects/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${site.url}${href(lang, page)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "/" ? 1 : page.startsWith("projects/") ? 0.7 : 0.8,
      alternates: { languages: { en: `${site.url}${href("en", page)}`, "pt-PT": `${site.url}${href("pt", page)}` } },
    })),
  );
}
