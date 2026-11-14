import { ContactCta } from "@/components/contact-cta";
import { genericIcons } from "@/components/icons";
import { PageHeader } from "@/components/section-heading";
import { skillGroups, type SkillLevel } from "@/content/skills";
import { tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata(lang, "skills", d.nav.skills, d.skills.text);
}

const levelStyle: Record<SkillLevel, string> = {
  core: "bg-accent",
  projects: "bg-accent-2",
  learning: "bg-violet-500",
};

export default async function SkillsPage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  const legend: [SkillLevel, string][] = [
    ["core", d.skills.legendCore],
    ["projects", d.skills.legendProjects],
    ["learning", d.skills.legendLearning],
  ];
  return (
    <>
      <PageHeader eyebrow={d.skills.eyebrow} title={d.skills.title} text={d.skills.text} />
      <section className="container-page py-16">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted" aria-label="Legend">
          {legend.map(([lvl, label]) => (
            <li key={lvl} className="flex items-center gap-2">
              <span className={cn("size-2.5 rounded-full", levelStyle[lvl])} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {skillGroups.map((g) => {
            const Icon = genericIcons[g.icon];
            return (
              <section key={g.id} className="reveal glass card-hover relative overflow-hidden rounded-2xl p-7">
                <span aria-hidden className={cn("absolute inset-x-0 top-0 h-0.5", levelStyle[g.level])} />
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-strong text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-fg">{tr(g.title, lang)}</h2>
                    <p className="flex items-center gap-1.5 text-xs text-fg-subtle">
                      <span className={cn("size-1.5 rounded-full", levelStyle[g.level])} aria-hidden />
                      {legend.find(([l]) => l === g.level)?.[1]}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">{tr(g.description, lang)}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-lg border border-border bg-bg-elev px-3 py-1.5 text-sm text-fg">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
      <ContactCta lang={lang} />
    </>
  );
}
