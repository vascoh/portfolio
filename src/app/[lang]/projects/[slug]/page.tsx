import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CircleDashed, Eye, ImageIcon, Lock } from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ContactCta } from "@/components/contact-cta";
import { SqlDiagnosticsDemo } from "@/components/demos/sql-diagnostics-demo";
import { projectIcons } from "@/components/icons";
import { Eyebrow } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { ButtonLink } from "@/components/ui/button";
import { getProject, projects } from "@/content/projects";
import { href, locales, tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata(lang, `projects/${slug}`, tr(p.title, lang), tr(p.summary, lang));
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const d = getDictionary(lang);
  const t = d.projects;
  const Icon = projectIcons[project.icon];
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const sections: { id: string; title: string; body?: string; list?: string[] }[] = [
    { id: "context", title: t.context, body: project.context && tr(project.context, lang) },
    { id: "problem", title: t.problem, body: project.problem && tr(project.problem, lang) },
    { id: "objective", title: t.objective, body: project.objective && tr(project.objective, lang) },
  ];
  const sections2: typeof sections = [
    { id: "approach", title: t.approach, list: project.approach?.map((a) => tr(a, lang)) },
    { id: "challenges", title: t.challenges, list: project.challenges?.map((a) => tr(a, lang)) },
    { id: "solution", title: t.solution, body: project.solution && tr(project.solution, lang) },
    { id: "features", title: t.features, list: project.features?.map((a) => tr(a, lang)) },
    { id: "role", title: t.role, body: project.role && tr(project.role, lang) },
    { id: "ai", title: t.aiUsage, body: project.aiUsage && tr(project.aiUsage, lang) },
    { id: "results", title: t.results, body: project.results && tr(project.results, lang) },
  ];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border pb-14 pt-28 sm:pt-36">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-80 w-[40rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="container-page relative fade-up">
          <Link href={href(lang, "projects")} className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            {t.back}
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white">
              <Icon className="size-5" aria-hidden />
            </span>
            <StatusBadge status={project.status} dict={d} />
            {project.personal && (
              <span className="rounded-full border border-border px-2 py-0.5 text-[0.7rem] text-fg-subtle">{t.personal}</span>
            )}
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{tr(project.title, lang)}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">{tr(project.summary, lang)}</p>
          <div className="mt-6 flex flex-wrap gap-2" aria-label={t.technologies}>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted ring-1 ring-border">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.url && (
              <ButtonLink href={project.url} external>
                {t.visit}
                <ArrowUpRight aria-hidden />
              </ButtonLink>
            )}
            {project.previewUrl && (
              <ButtonLink href={project.previewUrl} external variant="secondary">
                <Eye aria-hidden />
                {t.preview}
              </ButtonLink>
            )}
            {project.kind === "digital" && !project.url && !project.previewUrl && (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border-strong px-4 py-2 text-sm text-fg-subtle">
                <Lock className="size-4" aria-hidden />
                {t.privatePreview}
              </span>
            )}
          </div>
          {(project.confidential || project.pendingConfirmation) && (
            <div className="mt-8 flex flex-wrap gap-2 text-xs">
              {project.confidential && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-fg-muted">
                  <Lock className="size-3.5" aria-hidden />
                  {t.confidential}
                </span>
              )}
              {project.pendingConfirmation && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border-strong px-3 py-1 text-fg-subtle">
                  <CircleDashed className="size-3.5" aria-hidden />
                  {t.toConfirm}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-3">
        {sections
          .filter((s) => s.body)
          .map((s) => (
            <section key={s.id} className="reveal">
              <Eyebrow>{s.title}</Eyebrow>
              <p className="leading-relaxed text-fg-muted">{s.body}</p>
            </section>
          ))}
      </div>

      {project.architecture && (
        <section className="container-page pb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-fg">{t.architecture}</h2>
          <ArchitectureDiagram stages={project.architecture} lang={lang} label={t.architecture} />
        </section>
      )}

      {project.demo && (
        <section className="container-page pb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-fg">{t.demo}</h2>
          <SqlDiagnosticsDemo lang={lang} />
        </section>
      )}

      <div className="container-page grid gap-x-12 gap-y-10 pb-16 md:grid-cols-2">
        {sections2
          .filter((s) => s.body || s.list?.length)
          .map((s) => (
            <section key={s.id} className="reveal">
              <h2 className="text-xl font-semibold tracking-tight text-fg">{s.title}</h2>
              {s.body && <p className="mt-3 leading-relaxed text-fg-muted">{s.body}</p>}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((li, i) => (
                    <li key={i} className="flex gap-3 text-fg-muted">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                      <span className="leading-relaxed">{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <section className="container-page pb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-fg">{t.gallery}</h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {project.gallery.map((g, i) => (
              <li key={i}>
                <figure>
                  <div className="glass relative aspect-video overflow-hidden rounded-2xl">
                    {g.src ? (
                      <Image src={g.src} alt={tr(g.alt, lang)} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center gap-2 border-2 border-dashed border-border-strong/60 text-fg-subtle">
                        <ImageIcon className="size-7" aria-hidden />
                        <span className="text-xs">{t.galleryPlaceholder}</span>
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-2 text-sm text-fg-muted">{tr(g.alt, lang)}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="container-page pb-8" aria-label={t.next}>
        <Link
          href={href(lang, `projects/${next.slug}`)}
          className="glass card-hover group flex items-center justify-between gap-4 rounded-2xl p-6"
        >
          <span>
            <span className="block text-xs uppercase tracking-[0.16em] text-fg-subtle">{t.next}</span>
            <span className="mt-1 block text-lg font-semibold text-fg">{tr(next.title, lang)}</span>
          </span>
          <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </nav>

      <ContactCta lang={lang} />
    </article>
  );
}
