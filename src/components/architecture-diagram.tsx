import { ChevronRight } from "lucide-react";
import type { ArchitectureStage } from "@/content/projects";
import { tr, type Locale } from "@/i18n/config";

/** Conceptual architecture: horizontal flow on desktop, vertical on mobile. */
export function ArchitectureDiagram({ stages, lang, label }: { stages: ArchitectureStage[]; lang: Locale; label: string }) {
  return (
    <figure aria-label={label} className="glass relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <ol className="relative flex flex-col gap-3 md:flex-row md:items-stretch">
        {stages.map((s, i) => (
          <li key={i} className="flex flex-col gap-3 md:flex-1 md:flex-row md:items-center">
            <div className="flex-1 rounded-xl border border-border bg-bg-elev/80 p-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
                {String(i + 1).padStart(2, "0")} · {tr(s.label, lang)}
              </p>
              <ul className="mt-3 space-y-1.5">
                {s.nodes.map((n) => (
                  <li key={n} className="flex items-center gap-2 text-sm text-fg">
                    <span className="size-1.5 rounded-full bg-accent-2" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            {i < stages.length - 1 && (
              <ChevronRight aria-hidden className="mx-auto size-5 shrink-0 rotate-90 text-fg-subtle md:rotate-0" />
            )}
          </li>
        ))}
      </ol>
      <figcaption className="relative mt-4 text-xs text-fg-subtle">
        {lang === "en" ? "Conceptual architecture — no internal systems or names shown." : "Arquitetura conceptual — sem sistemas ou nomes internos."}
      </figcaption>
    </figure>
  );
}
