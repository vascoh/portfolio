import { ShieldCheck, Sparkles } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { ProjectGrid } from "@/components/project-grid";
import { PageHeader, SectionHeading } from "@/components/section-heading";
import { projectsOf } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata(lang, "projects", d.projects.title, d.projects.text);
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return (
    <>
      <PageHeader eyebrow={d.projects.eyebrow} title={d.projects.title} text={d.projects.text} />

      <section id="bi" className="container-page py-20">
        <SectionHeading title={d.projects.biTitle} />
        <p className="mt-4 flex max-w-3xl gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
          {d.projects.biText}
        </p>
        <div className="mt-10">
          <ProjectGrid id="bi" projects={projectsOf("bi")} lang={lang} dict={d} />
        </div>
      </section>

      <section id="digital" className="border-t border-border bg-bg-elev/50 py-20">
        <div className="container-page">
          <SectionHeading title={d.projects.aiTitle} />
          <p className="mt-4 flex max-w-3xl gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-fg-muted">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-accent-2" aria-hidden />
            {d.projects.aiText}
          </p>
          <div className="mt-10">
            <ProjectGrid id="digital" projects={projectsOf("digital")} lang={lang} dict={d} />
          </div>
        </div>
      </section>

      <ContactCta lang={lang} />
    </>
  );
}
