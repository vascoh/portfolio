import type { ProjectStatus } from "@/content/projects";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

const styles: Record<ProjectStatus, string> = {
  professional: "text-accent border-accent/30 bg-accent/10",
  published: "text-emerald-800 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  development: "text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10",
  prototype: "text-sky-700 dark:text-sky-300 border-sky-500/30 bg-sky-500/10",
  concept: "text-violet-700 dark:text-violet-300 border-violet-500/30 bg-violet-500/10",
};

export function StatusBadge({ status, dict, className }: { status: ProjectStatus; dict: Dictionary; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.7rem] font-medium",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {dict.status[status]}
    </span>
  );
}
