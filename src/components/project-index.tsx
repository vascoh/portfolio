"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, Camera, Plus, Shapes } from "lucide-react";
import type { IndexEntry } from "@/lib/project-index";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";
import { projectIcons } from "./icons";

type Filter = "all" | "done" | "ongoing";
type Work = Dictionary["work"];

const DESKTOP = "(min-width: 1024px)";

/* ───────────────────────────── Visuals ───────────────────────────── */

/** Real screenshot when one exists; otherwise a composition drawn from the project's own documented
 *  architecture or features — discreetly labelled as illustrative. */
function ProjectVisual({ entry, w, eager }: { entry: IndexEntry; w: Work; eager?: boolean }) {
  const Icon = projectIcons[entry.icon];
  if (entry.image) {
    return (
      <figure className="absolute inset-0 m-0">
        <Image
          src={entry.image.src}
          alt={entry.image.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover object-top"
        />
        <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-white/90 backdrop-blur">
          <Camera className="size-3" aria-hidden />
          {w.screenshot}
        </figcaption>
      </figure>
    );
  }

  const warm = entry.category === w.categoryDigital;
  return (
    <figure className="absolute inset-0 m-0 overflow-hidden" aria-label={`${w.illustrative} — ${entry.name}`}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          warm
            ? "bg-[radial-gradient(120%_90%_at_85%_10%,color-mix(in_oklab,var(--accent-2)_26%,transparent),transparent_60%)]"
            : "bg-[radial-gradient(120%_90%_at_15%_10%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_60%)]",
        )}
      />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-80" />
      <Icon aria-hidden className="absolute -right-6 -top-6 size-44 text-fg/[0.05]" strokeWidth={1} />

      <div aria-hidden className="relative flex h-full flex-col justify-between p-5 pb-12 sm:p-7 sm:pb-14">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_10px_30px_-10px_var(--glow)]">
            <Icon className="size-5" />
          </span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">{entry.tags.slice(0, 3).join(" · ")}</span>
        </div>

        {entry.sketch.kind === "flow" && entry.sketch.items.length > 0 ? (
          <ol className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <span className="absolute left-4 right-4 top-1/2 hidden h-px bg-gradient-to-r from-accent/60 via-accent-2/60 to-accent/10 sm:block" />
            {entry.sketch.items.map((it, i) => {
              const [stage, node] = it.split("|");
              return (
                <li key={i} className="relative rounded-xl text-left border border-border-strong bg-bg/80 p-2.5 backdrop-blur">
                  <span className="block truncate font-mono text-[0.6rem] uppercase tracking-wider text-accent">{stage}</span>
                  <span className="mt-1 line-clamp-2 block text-[0.72rem] font-medium leading-snug text-fg">{node}</span>
                </li>
              );
            })}
          </ol>
        ) : entry.sketch.items.length > 0 ? (
          <div className="rounded-xl border border-border-strong bg-bg/80 p-3 backdrop-blur">
            <div className="mb-2.5 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 rounded-full bg-fg/15" />
              ))}
            </div>
            <ul className="space-y-1.5">
              {entry.sketch.items.map((it, i) => (
                <li key={i} className="flex items-center gap-2 text-left text-xs text-fg-muted">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent-2" />
                  <span className="truncate">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <span className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{entry.name}</span>
        )}
      </div>

      <figcaption className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/70 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-fg-subtle backdrop-blur">
        <Shapes className="size-3" aria-hidden />
        {w.illustrative}
      </figcaption>
    </figure>
  );
}

function StatusMark({ entry, className }: { entry: IndexEntry; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider",
        entry.ongoing ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full bg-current", entry.ongoing && "animate-pulse")} aria-hidden />
      {entry.statusLabel}
    </span>
  );
}

/* ───────────────────────────── Details ───────────────────────────── */

function Details({ entry, w, lang }: { entry: IndexEntry; w: Work; lang: "en" | "pt" }) {
  return (
    <dl className="grid gap-6 text-[0.95rem] leading-relaxed [&_p]:text-left sm:[&_p]:text-justify">
      {entry.need && (
        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">{entry.need.label}</dt>
          <dd className="mt-2 text-fg-muted">
            <p>{entry.need.text}</p>
          </dd>
        </div>
      )}
      <div>
        <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">{w.solution}</dt>
        <dd className="mt-2 space-y-2 text-fg-muted">
          {entry.solution.map((s, i) => (
            <p key={i} className={i === 0 ? "text-fg" : undefined}>
              {s}
            </p>
          ))}
        </dd>
      </div>
      {entry.contribution && (
        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">{w.contribution}</dt>
          <dd className="mt-2 text-fg-muted">
            <p>{entry.contribution}</p>
          </dd>
        </div>
      )}
      <div>
        <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">{w.technologies}</dt>
        <dd className="mt-2.5">
          <ul className="flex flex-wrap gap-1.5">
            {entry.tags.map((t) => (
              <li key={t} className="rounded-md px-2 py-0.5 text-left font-mono text-[0.72rem] text-fg ring-1 ring-border-strong">
                {t}
              </li>
            ))}
          </ul>
        </dd>
      </div>
      {(entry.results || entry.resultsPrivate) && (
        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">{w.results}</dt>
          <dd className="mt-2 text-fg-muted">
            <p className={entry.results ? undefined : "text-sm italic"}>{entry.results ?? w.resultsPrivate}</p>
          </dd>
        </div>
      )}
      <div>
        <dt className="sr-only">{w.links}</dt>
        <dd className="flex flex-wrap gap-2.5">
          {entry.links.map((l) =>
            l.external ? (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3.5 py-1.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {l.label}
                <span className="font-mono text-xs text-fg-subtle">{new URL(l.url).hostname}</span>
                <ArrowUpRight className="size-3.5" aria-hidden />
                <span className="sr-only"> ({w.newTab})</span>
              </a>
            ) : (
              <Link
                key={l.url}
                href={l.url}
                className="inline-flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                hrefLang={lang}
              >
                {l.label}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            ),
          )}
        </dd>
      </div>
    </dl>
  );
}

/* ───────────────────────────── Index ───────────────────────────── */

export function ProjectIndex({ entries, w, lang }: { entries: IndexEntry[]; w: Work; lang: "en" | "pt" }) {
  const uid = useId();
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(entries[0]?.slug ?? "");
  const [open, setOpen] = useState<string | null>(null);
  const [desktop, setDesktop] = useState(false);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const counts = useMemo(
    () => ({ all: entries.length, done: entries.filter((e) => !e.ongoing).length, ongoing: entries.filter((e) => e.ongoing).length }),
    [entries],
  );
  const visible = useMemo(
    () => entries.filter((e) => filter === "all" || (filter === "ongoing" ? e.ongoing : !e.ongoing)),
    [entries, filter],
  );
  const current = visible.find((e) => e.slug === active) ?? visible[0];

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setOpen(null);
    const next = entries.filter((e) => f === "all" || (f === "ongoing" ? e.ongoing : !e.ongoing));
    if (!next.some((e) => e.slug === active) && next[0]) setActive(next[0].slug);
  };

  const activate = useCallback(
    (slug: string, viaClick: boolean) => {
      setActive(slug);
      if (!viaClick) return;
      if (window.matchMedia(DESKTOP).matches) {
        // The preview is already visible: move focus into it so its links are one Tab away.
        requestAnimationFrame(() => panelHeading.current?.focus({ preventScroll: false }));
      } else {
        setOpen((o) => (o === slug ? null : slug));
      }
    },
    [],
  );

  const onRowKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowDown") next = Math.min(i + 1, visible.length - 1);
    else if (e.key === "ArrowUp") next = Math.max(i - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = visible.length - 1;
    if (next < 0) return;
    e.preventDefault();
    rowRefs.current[visible[next].slug]?.focus();
  };

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: w.all },
    { id: "done", label: w.done },
    { id: "ongoing", label: w.ongoing },
  ];

  return (
    <div>
      {/* Filter */}
      <div role="group" aria-label={w.filterLabel} className="flex flex-wrap items-center gap-2">
        {filters.map((f) =>
          counts[f.id] > 0 ? (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => changeFilter(f.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                filter === f.id
                  ? "border-fg bg-fg text-bg"
                  : "border-border-strong text-fg-muted hover:border-fg/40 hover:text-fg",
              )}
            >
              {f.label}
              <span className="font-mono text-xs">{String(counts[f.id]).padStart(2, "0")}</span>
            </button>
          ) : null,
        )}
        <p className="sr-only" id={`${uid}-hint`}>
          {desktop ? w.hint : w.tapHint}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-14">
        {/* List */}
        <ol aria-label={w.listLabel} aria-describedby={`${uid}-hint`} className="border-b border-border">
          {visible.map((e, i) => {
            const isActive = current?.slug === e.slug;
            const isOpen = open === e.slug;
            const panelId = `${uid}-${e.slug}`;
            return (
              <li key={e.slug} className="border-t border-border">
                <button
                  ref={(el) => {
                    rowRefs.current[e.slug] = el;
                  }}
                  type="button"
                  onMouseEnter={() => desktop && activate(e.slug, false)}
                  onFocus={() => desktop && activate(e.slug, false)}
                  onClick={() => activate(e.slug, true)}
                  onKeyDown={(ev) => onRowKey(ev, i)}
                  aria-expanded={desktop ? undefined : isOpen}
                  aria-controls={desktop ? `${uid}-preview` : panelId}
                  aria-current={desktop && isActive ? "true" : undefined}
                  className="group relative grid w-full grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] items-start gap-x-3 py-5 text-left sm:grid-cols-[3rem_minmax(0,1fr)_1.25rem] sm:gap-x-4 sm:py-6 focus-visible:outline-offset-[-2px]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-px left-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-out",
                      "w-full scale-x-0",
                      ((desktop && isActive) || (!desktop && isOpen)) && "scale-x-100",
                    )}
                  />
                  <span
                    className={cn(
                      "pt-1.5 font-mono text-xs tabular-nums transition-colors sm:text-sm",
                      (desktop && isActive) || isOpen ? "text-accent" : "text-fg-subtle",
                    )}
                  >
                    {e.number}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-balance text-xl font-semibold leading-tight tracking-tight transition-[color,transform] duration-300 sm:text-[1.6rem]",
                        desktop
                          ? isActive
                            ? "translate-x-1 text-fg"
                            : "text-fg-muted group-hover:text-fg"
                          : "text-fg",
                      )}
                    >
                      {e.name}
                    </span>
                    {e.descriptor && <span className="mt-1 block text-[0.95rem] text-fg-muted">{e.descriptor}</span>}
                    <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-subtle">
                      <StatusMark entry={e} />
                      <span>
                        {e.category}
                        {e.qualifier && <> · {e.qualifier}</>}
                      </span>
                    </span>
                  </span>
                  <span className="flex justify-end pt-2">
                    <Plus
                      aria-hidden
                      className={cn("size-4 text-fg-subtle transition-transform duration-300 lg:hidden", isOpen && "rotate-45 text-accent")}
                    />
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        "hidden size-4 transition-all duration-300 lg:block",
                        isActive ? "translate-x-0 text-accent opacity-100" : "-translate-x-2 opacity-0",
                      )}
                    />
                  </span>
                </button>

                {/* Mobile / tablet: inline preview, opened by tap */}
                {!desktop && isOpen && (
                  <div id={panelId} className="swap-in pb-8 lg:hidden">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-bg-elev">
                      <ProjectVisual entry={e} w={w} eager />
                    </div>
                    <div className="mt-6">
                      <Details entry={e} w={w} lang={lang} />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Desktop: sticky preview that follows hover / keyboard focus */}
        <div className="hidden lg:block">
          {current && (
            <section
              id={`${uid}-preview`}
              aria-labelledby={`${uid}-preview-title`}
              className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-bg-elev/70 p-3 [scrollbar-width:thin]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-bg">
                {visible.map((e, i) => (
                  <div
                    key={e.slug}
                    aria-hidden={e.slug !== current.slug}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-500 ease-out",
                      e.slug === current.slug ? "scale-100 opacity-100" : "pointer-events-none scale-[1.015] opacity-0",
                    )}
                  >
                    <ProjectVisual entry={e} w={w} eager={i < 2} />
                  </div>
                ))}
              </div>
              <div key={current.slug} className="swap-in px-4 pb-5 pt-6 xl:px-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <StatusMark entry={current} />
                  <p className="text-left font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">
                    {current.number} · {current.category}
                    {current.qualifier && <> · {current.qualifier}</>}
                  </p>
                </div>
                <h3
                  ref={panelHeading}
                  id={`${uid}-preview-title`}
                  tabIndex={-1}
                  className="mt-3 text-balance text-3xl font-semibold tracking-tight text-fg focus:outline-none focus-visible:outline-2"
                >
                  {current.name}
                  {current.descriptor && <span className="mt-1 block text-lg font-normal text-fg-muted">{current.descriptor}</span>}
                </h3>
                <div className="mt-6">
                  <Details entry={current} w={w} lang={lang} />
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
