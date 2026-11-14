import Image from "next/image";
import { ArrowRight, Download, MapPin, MessageSquare } from "lucide-react";
import { site } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { DataNetwork } from "./data-network";
import { ButtonLink } from "./ui/button";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const cv = site.cv[lang] ?? site.cv.en;
  const h = dict.hero;

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36" aria-labelledby="hero-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <DataNetwork className="absolute inset-0 size-full opacity-70" />
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div className="fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-fg-muted backdrop-blur">
            {site.openToWork && <span className="size-2 rounded-full bg-emerald-500 [animation:pulse-dot_2.4s_ease-in-out_infinite]" aria-hidden />}
            <MapPin className="size-3.5" aria-hidden />
            {h.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-6 text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {h.title.split("Vasco Henriques")[0]}
            <span className="text-gradient">Vasco Henriques</span>
            {h.title.split("Vasco Henriques")[1]}
          </h1>
          <p className="mt-4 text-lg font-medium text-fg sm:text-xl">{h.subtitle}</p>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-fg-muted">{h.text}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={href(lang, "projects")} size="lg">
              {h.explore}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            {cv ? (
              <ButtonLink href={cv} variant="secondary" size="lg" download>
                <Download aria-hidden />
                {h.cv}
              </ButtonLink>
            ) : (
              <ButtonLink href={href(lang, "contact#cv")} variant="secondary" size="lg">
                <Download aria-hidden />
                {h.cvRequest}
              </ButtonLink>
            )}
            <ButtonLink href={href(lang, "contact")} variant="ghost" size="lg">
              <MessageSquare aria-hidden />
              {h.contact}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {h.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-mono text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-fg-subtle">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="fade-up relative mx-auto w-full max-w-sm [animation-delay:150ms]">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-accent-2/25 blur-2xl" aria-hidden />
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-[1.75rem] p-2">
            {site.photo ? (
              <Image
                src={site.photo}
                alt={`${site.name} — ${h.subtitle}`}
                fill
                priority
                sizes="(min-width: 1024px) 24rem, 90vw"
                className="rounded-[1.4rem] object-cover"
              />
            ) : (
              <div className="relative flex size-full flex-col items-center justify-center gap-4 rounded-[1.4rem] bg-gradient-to-br from-bg-elev to-surface-strong">
                <div aria-hidden className="bg-grid absolute inset-0 opacity-80" />
                <span className="relative grid size-28 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-4xl font-bold text-white shadow-[0_20px_60px_-15px_var(--glow)]">
                  VH
                </span>
              </div>
            )}
          </div>

          <FloatingChip className="-left-6 top-10 [animation-delay:0s]" label="SQL Server" sub="T-SQL · Tuning" />
          <FloatingChip className="-right-4 top-1/2 [animation-delay:1.2s]" label="Power BI" sub="DAX · Modeling" />
          <FloatingChip className="-bottom-5 left-8 [animation-delay:2.4s]" label="Python" sub="pandas · Parquet" />
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ label, sub, className }: { label: string; sub: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`glass absolute hidden rounded-xl px-3.5 py-2.5 shadow-lg [animation:float_6s_ease-in-out_infinite] sm:block ${className ?? ""}`}
    >
      <p className="text-sm font-semibold text-fg">{label}</p>
      <p className="font-mono text-[0.68rem] text-fg-subtle">{sub}</p>
    </div>
  );
}
