import Link from "next/link";
import { ArrowUpRight, FlaskConical, Globe } from "lucide-react";
import type { Project } from "@/content/projects";
import { href, tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { projectIcons } from "./icons";
import { StatusBadge } from "./status-badge";

export function ProjectCard({ project, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  const Icon = projectIcons[project.icon];
  const link = href(lang, `projects/${project.slug}`);
  return (
    <article className="glass card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-60"
      />
      <div className="relative flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl border border-border bg-gradient-to-br from-accent/15 to-accent-2/10 text-accent">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.personal && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[0.7rem] text-fg-subtle">
              <FlaskConical className="size-3" aria-hidden />
              {dict.projects.personal}
            </span>
          )}
          <StatusBadge status={project.status} dict={dict} />
        </div>
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-fg">
        <Link href={link} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {tr(project.title, lang)}
        </Link>
      </h3>
      <p className="relative mt-2 line-clamp-4 text-sm leading-relaxed text-fg-muted">{tr(project.summary, lang)}</p>
      {(project.url || project.previewUrl) && (
        <p className="relative mt-3 flex items-center gap-1.5 font-mono text-xs text-accent-2">
          <Globe className="size-3.5" aria-hidden />
          {new URL((project.url || project.previewUrl)!).hostname}
        </p>
      )}
      <ul className="relative mt-5 flex flex-wrap gap-1.5" aria-label={dict.projects.technologies}>
        {project.tags.map((t) => (
          <li key={t} className="rounded-md bg-surface-strong/60 px-2 py-0.5 font-mono text-[0.7rem] text-fg-subtle ring-1 ring-border">
            {t}
          </li>
        ))}
      </ul>
      <div className="relative mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
        {project.kind === "bi" ? dict.projects.readCase : dict.projects.viewProject}
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </div>
    </article>
  );
}

