import { projects, type Project, type ProjectIcon, type ProjectStatus } from "@/content/projects";
import { href, tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

/**
 * Flattens projects.ts into locale-resolved, serializable entries for the editorial
 * project index on the home page. Nothing is added here: every field comes from
 * projects.ts, and missing fields stay missing (the UI hides them).
 */
export interface IndexEntry {
  slug: string;
  /** Global position (01, 02…) — stable across filters. */
  number: string;
  title: string;
  /** Project name (part of the title before " — "). */
  name: string;
  /** Descriptor after " — ", when the title has one. */
  descriptor: string | null;
  category: string;
  qualifier: string | null;
  status: ProjectStatus;
  statusLabel: string;
  /** Completed (published / professional / prototype) vs. still in development. */
  ongoing: boolean;
  icon: ProjectIcon;
  image: { src: string; alt: string } | null;
  /** Labels used to draw the illustrative composition when there is no real image. */
  sketch: { kind: "flow" | "list"; items: string[] };
  need: { label: string; text: string } | null;
  /** What was built: the summary, plus the documented solution when there is one. */
  solution: string[];
  contribution: string | null;
  tags: string[];
  results: string | null;
  resultsPrivate: boolean;
  links: { label: string; url: string; external: boolean }[];
}

function sketchOf(p: Project, lang: Locale): IndexEntry["sketch"] {
  if (p.architecture?.length) {
    return { kind: "flow", items: p.architecture.slice(0, 4).map((s) => `${tr(s.label, lang)}|${s.nodes[0] ?? ""}`) };
  }
  return { kind: "list", items: (p.features ?? []).slice(0, 4).map((f) => tr(f, lang)) };
}

export function buildProjectIndex(lang: Locale, d: Dictionary): IndexEntry[] {
  const w = d.work;
  // Completed first (published, professional, prototype), then what is in development.
  const order: Record<ProjectStatus, number> = { published: 0, professional: 1, prototype: 2, development: 3, concept: 4 };
  return projects
    .filter((p) => p.status !== "concept")
    .map((p, i) => ({ p, i }))
    .sort((a, b) => order[a.p.status] - order[b.p.status] || a.i - b.i)
    .map(({ p }, idx) => {
      const title = tr(p.title, lang);
      const [name, ...rest] = title.split(" — ");
      const img = p.gallery?.find((g) => g.src);
      const links: IndexEntry["links"] = [];
      if (p.url) links.push({ label: w.website, url: p.url, external: true });
      if (p.previewUrl) links.push({ label: w.preview, url: p.previewUrl, external: true });
      links.push({ label: w.caseStudy, url: href(lang, `projects/${p.slug}`), external: false });
      const needText = p.problem ?? p.context;
      return {
        slug: p.slug,
        number: String(idx + 1).padStart(2, "0"),
        title,
        name,
        descriptor: rest.length ? rest.join(" — ") : null,
        category: p.kind === "bi" ? w.categoryBi : w.categoryDigital,
        qualifier: p.confidential ? w.professional : p.personal ? w.personal : null,
        status: p.status,
        statusLabel: d.status[p.status],
        ongoing: p.status === "development",
        icon: p.icon,
        image: img?.src ? { src: img.src, alt: tr(img.alt, lang) } : null,
        sketch: sketchOf(p, lang),
        need: needText ? { label: p.problem ? w.need : w.context, text: tr(needText, lang) } : null,
        solution: [tr(p.summary, lang), ...(p.solution ? [tr(p.solution, lang)] : [])],
        contribution: p.role ? tr(p.role, lang) : null,
        tags: p.tags,
        results: p.results && !p.confidential ? tr(p.results, lang) : null,
        resultsPrivate: Boolean(p.confidential),
        links,
      };
    });
}
