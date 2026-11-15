import { Award, BookOpen, Briefcase, ExternalLink, GraduationCap, Languages } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { PageHeader } from "@/components/section-heading";
import { certifications } from "@/content/certifications";
import { education, languages, roles, training } from "@/content/experience";
import { tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata(lang, "experience", d.experience.title, d.experience.title);
}

function formatMonth(ym: string, lang: Locale) {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", { month: "short", year: "numeric" }).format(new Date(y, m - 1));
}

function SectionTitle({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-fg">
      <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
        <Icon className="size-5" />
      </span>
      {children}
    </h2>
  );
}

export default async function ExperiencePage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  const e = d.experience;
  return (
    <>
      <PageHeader eyebrow={e.eyebrow} title={e.title} />

      <section className="container-page py-16">
        <SectionTitle icon={Briefcase}>{e.work}</SectionTitle>
        <ol className="relative mt-10 space-y-8 border-l border-border pl-8 sm:ml-5">
          {roles.map((r, i) => (
            <li key={i} className="reveal relative">
              <span aria-hidden className="absolute -left-[2.4rem] top-1.5 size-3 rounded-full bg-accent ring-4 ring-accent/20" />
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {formatMonth(r.start, lang)} — {r.end ? formatMonth(r.end, lang) : e.present}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-fg">
                {tr(r.title, lang)} <span className="text-fg-muted">· {r.company}</span>
              </h3>
              {(r.sector || r.location) && (
                <p className="mt-1 text-sm text-fg-subtle">{[r.sector ? tr(r.sector, lang) : null, r.location].filter(Boolean).join(" · ")}</p>
              )}
              <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">{tr(r.description, lang)}</p>
              {r.highlights && (
                <ul className="mt-3 max-w-2xl list-disc space-y-1 pl-5 text-sm leading-relaxed text-fg-muted marker:text-accent">
                  {r.highlights.map((h, j) => (
                    <li key={j}>{tr(h, lang)}</li>
                  ))}
                </ul>
              )}
              {r.tags && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <li key={t} className="rounded-md px-2 py-0.5 font-mono text-[0.7rem] text-fg-subtle ring-1 ring-border">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-bg-elev/50 py-16">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <SectionTitle icon={GraduationCap}>{e.education}</SectionTitle>
            <ul className="mt-8 space-y-4">
              {education.map((ed, i) => (
                <li key={i} className="reveal glass rounded-xl p-5">
                  <p className="font-medium text-fg">{tr(ed.degree, lang)}</p>
                  <p className="mt-1 text-sm text-fg-muted">
                    {[ed.institution, ed.year].filter(Boolean).join(" · ") || (
                      <span className="italic text-fg-subtle">{lang === "en" ? "Institution and year to be confirmed" : "Instituição e ano a confirmar"}</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <h3 className="mt-10 flex items-center gap-2 font-semibold text-fg">
              <BookOpen className="size-4 text-accent" aria-hidden />
              {e.training}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              {training.map((t, i) => (
                <li key={i}>{tr(t, lang)}</li>
              ))}
            </ul>
            <h3 className="mt-10 flex items-center gap-2 font-semibold text-fg">
              <Languages className="size-4 text-accent" aria-hidden />
              {e.languages}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              {languages.map((l, i) => (
                <li key={i}>
                  <span className="text-fg">{tr(l.name, lang)}</span> · {tr(l.level, lang)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle icon={Award}>{e.certifications}</SectionTitle>
            <ul className="mt-8 space-y-4">
              {certifications.map((c, i) => (
                <li key={i} className="reveal glass flex items-start justify-between gap-4 rounded-xl p-5">
                  <div>
                    <p className="font-medium text-fg">{tr(c.name, lang)}</p>
                    <p className="mt-1 font-mono text-xs text-fg-subtle">
                      {[c.code, c.issuer !== "—" ? c.issuer : null, c.year].filter(Boolean).join(" · ")}
                    </p>
                    <span className="mt-3 inline-block rounded-full border border-border px-2 py-0.5 text-[0.7rem] text-fg-muted">
                      {c.type === "official" ? e.official : e.course}
                    </span>
                  </div>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`${tr(c.name, lang)} — verify`} className="text-fg-muted hover:text-accent">
                      <ExternalLink className="size-4" aria-hidden />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactCta lang={lang} />
    </>
  );
}
