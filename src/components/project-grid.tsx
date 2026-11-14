"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects, lang, dict, id }: { projects: Project[]; lang: Locale; dict: Dictionary; id: string }) {
  const tags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(), [projects]);
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  return (
    <div>
      <div role="group" aria-label={dict.projects.filterLabel} className="-mx-1 flex flex-wrap gap-2 px-1">
        {[null, ...tags].map((t) => {
          const selected = active === t;
          return (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(t)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                selected
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {t ?? dict.projects.all}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite" id={`${id}-count`}>
        {shown.length}
      </p>
      {shown.length === 0 ? (
        <p className="mt-10 text-fg-muted">{dict.projects.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} lang={lang} dict={dict} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
