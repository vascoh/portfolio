"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { postCategories, type Post, type PostCategory } from "@/content/posts";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

export function InsightsList({ posts, lang, dict }: { posts: Post[]; lang: Locale; dict: Dictionary["insights"] }) {
  const [cat, setCat] = useState<PostCategory | null>(null);
  const shown = cat ? posts.filter((p) => p.category === cat) : posts;
  const label = (id: PostCategory) => postCategories.find((c) => c.id === id)!.label[lang];

  return (
    <>
      <div role="group" aria-label="Categories" className="flex flex-wrap gap-2">
        {[null, ...postCategories.map((c) => c.id)].map((id) => (
          <button
            key={id ?? "all"}
            type="button"
            aria-pressed={cat === id}
            onClick={() => setCat(id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              cat === id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-fg-muted hover:text-fg",
            )}
          >
            {id ? label(id) : dict.all}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <article className="glass card-hover flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">{label(p.category)}</span>
                {!p.published && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-border-strong px-2 py-0.5 text-[0.7rem] text-fg-subtle">
                    <Clock className="size-3" aria-hidden />
                    {dict.comingSoon}
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-fg">{p.title[lang]}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.summary[lang]}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
