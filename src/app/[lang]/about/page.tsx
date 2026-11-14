import { Bot, CheckCircle2 } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { PageHeader, SectionHeading } from "@/components/section-heading";
import { aboutAi, aboutHighlights, aboutIntro, aboutPrinciples, aboutStory } from "@/content/about";
import { site } from "@/content/site";
import { tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata(lang, "about", d.nav.about, tr(aboutIntro, lang));
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return (
    <>
      <PageHeader eyebrow={d.about.eyebrow} title={d.about.title} text={tr(aboutIntro, lang)} />

      <section className="container-page grid gap-14 py-20 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-fg-muted">
          {aboutStory.map((p, i) => (
            <p key={i} className={i === 0 ? "text-fg first-letter:float-left first-letter:mr-2 first-letter:font-mono first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-accent" : ""}>
              {tr(p, lang)}
            </p>
          ))}
        </div>
        <aside className="glass h-fit rounded-2xl p-6 lg:sticky lg:top-24">
          <dl className="space-y-4 text-sm">
            {[
              [lang === "en" ? "Role" : "Função", "Senior BI Consultant"],
              [lang === "en" ? "Location" : "Localização", site.location],
              [lang === "en" ? "Experience" : "Experiência", lang === "en" ? "~8 years in BI & data" : "~8 anos em BI & dados"],
              [lang === "en" ? "Focus" : "Foco", "SQL Server · Power BI · AI"],
              [lang === "en" ? "Languages" : "Idiomas", lang === "en" ? "Portuguese, English" : "Português, Inglês"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                <dt className="text-fg-subtle">{k}</dt>
                <dd className="text-right font-medium text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="border-y border-border bg-bg-elev/50 py-20">
        <div className="container-page">
          <SectionHeading title={d.about.highlightsTitle} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aboutHighlights.map((h, i) => (
              <li key={i} className="reveal glass flex gap-3 rounded-xl p-5 text-sm text-fg">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-2" aria-hidden />
                {tr(h, lang)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page grid gap-14 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading title={d.about.principlesTitle} />
          <ol className="mt-10 space-y-6">
            {aboutPrinciples.map((p, i) => (
              <li key={i} className="reveal flex gap-5">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-fg">{tr(p.title, lang)}</h3>
                  <p className="mt-1.5 text-fg-muted">{tr(p.text, lang)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="reveal glass relative h-fit overflow-hidden rounded-2xl p-8">
          <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-accent-2/15 blur-2xl" />
          <Bot className="relative size-8 text-accent-2" aria-hidden />
          <h2 className="relative mt-4 text-2xl font-semibold tracking-tight text-fg">{d.about.aiTitle}</h2>
          <p className="relative mt-4 leading-relaxed text-fg-muted">{tr(aboutAi, lang)}</p>
        </div>
      </section>

      <ContactCta lang={lang} />
    </>
  );
}
