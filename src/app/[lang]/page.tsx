import Link from "next/link";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/hero";
import { genericIcons } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/contact-cta";
import { aboutHighlights, aboutIntro } from "@/content/about";
import { certifications } from "@/content/certifications";
import { projects } from "@/content/projects";
import { expertiseAreas, skillGroups } from "@/content/skills";
import { href, tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata(lang, "/", `Vasco Henriques — Senior BI Consultant | SQL Server & Power BI`, d.hero.text);
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const tech = skillGroups.filter((g) => g.level !== "learning").flatMap((g) => g.items.slice(0, 7));

  return (
    <>
      <Hero lang={lang} dict={d} />

      {/* Tagline marquee-like band */}
      <div className="border-y border-border bg-surface/50">
        <p className="container-page py-5 text-center font-mono text-xs uppercase tracking-[0.2em] text-fg-muted sm:text-sm">
          {d.hero.tagline}
        </p>
      </div>

      {/* Expertise */}
      <section className="container-page py-24 sm:py-32">
        <div className="reveal">
          <SectionHeading eyebrow={d.home.expertiseEyebrow} title={d.home.expertiseTitle} text={d.home.expertiseText} />
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {expertiseAreas.map((a, i) => {
            const Icon = genericIcons[a.icon];
            return (
              <li key={i} className="reveal glass card-hover relative overflow-hidden rounded-2xl p-7">
                <span aria-hidden data-n={`0${i + 1}`} className="absolute right-6 top-6 font-mono text-5xl font-bold text-fg/5 before:content-[attr(data-n)]" />
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_10px_30px_-10px_var(--glow)]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg">{tr(a.title, lang)}</h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{tr(a.text, lang)}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <li key={t} className="rounded-md px-2 py-0.5 font-mono text-[0.7rem] text-fg-subtle ring-1 ring-border">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      {/* About teaser */}
      <section className="relative border-y border-border bg-bg-elev/50 py-24 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading eyebrow={d.home.aboutEyebrow} title={d.home.aboutTitle} />
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{tr(aboutIntro, lang)}</p>
            <Link href={href(lang, "about")} className="group mt-6 inline-flex items-center gap-2 font-medium text-accent">
              {d.home.aboutMore}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <ul className="reveal grid gap-3 self-center sm:grid-cols-2">
            {aboutHighlights.slice(0, 6).map((h, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-border bg-bg/60 p-4 text-sm text-fg">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-2" aria-hidden />
                {tr(h, lang)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-page py-24 sm:py-32">
        <div className="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={d.home.featuredEyebrow} title={d.home.featuredTitle} text={d.home.featuredText} />
          <ButtonLink href={href(lang, "projects")} variant="secondary" className="shrink-0">
            {d.home.allProjects}
            <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug} className="reveal">
              <ProjectCard project={p} lang={lang} dict={d} />
            </li>
          ))}
        </ul>
      </section>

      {/* Tech + certifications */}
      <section className="border-t border-border bg-bg-elev/50 py-24 sm:py-28" aria-label={d.home.techTitle}>
        <div className="container-page grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal">
            <SectionHeading eyebrow={d.home.techEyebrow} title={d.home.techTitle} />
            <ul className="mt-8 flex flex-wrap gap-2">
              {tech.map((t) => (
                <li key={t} className="glass rounded-lg px-3.5 py-2 text-sm text-fg transition-colors hover:border-accent/50">
                  {t}
                </li>
              ))}
            </ul>
            <Link href={href(lang, "skills")} className="group mt-6 inline-flex items-center gap-2 font-medium text-accent">
              {d.home.allSkills}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <div className="reveal">
            <SectionHeading eyebrow={d.home.certEyebrow} title={d.home.certTitle} />
            <ul className="mt-8 space-y-3">
              {certifications.map((c, i) => (
                <li key={i} className="glass flex items-start gap-4 rounded-xl p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Award className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-fg">{tr(c.name, lang)}</p>
                    <p className="mt-0.5 font-mono text-xs text-fg-subtle">
                      {[c.code, c.issuer !== "—" ? c.issuer : null, c.year].filter(Boolean).join(" · ")}
                    </p>
                  </div>
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
