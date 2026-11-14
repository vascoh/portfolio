import { Download, FileText, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { PageHeader } from "@/components/section-heading";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata(lang, "contact", d.contact.title, d.contact.text);
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const c = getDictionary(lang).contact;

  const channels = [
    { label: "Email", value: site.contact.email, url: site.contact.email ? `mailto:${site.contact.email}` : null, Icon: Mail },
    { label: "LinkedIn", value: site.contact.linkedin?.replace(/^https?:\/\/(www\.)?/, ""), url: site.contact.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", value: site.contact.github?.replace(/^https?:\/\/(www\.)?/, ""), url: site.contact.github, Icon: GitHubIcon },
  ];
  const cvs = [
    { label: c.cvEn, url: site.cv.en, lang: "en" },
    { label: c.cvPt, url: site.cv.pt, lang: "pt" },
  ];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} text={c.text} />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm dict={c} />

        <aside className="space-y-6">
          {site.openToWork && (
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-700 dark:text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-500 [animation:pulse-dot_2.4s_ease-in-out_infinite]" aria-hidden />
              {c.open}
            </p>
          )}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-fg-subtle">{c.channels}</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-fg">
                <MapPin className="size-4 text-accent" aria-hidden />
                {site.location}
              </li>
              {channels.map(({ label, value, url, Icon }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <Icon className="size-4 text-accent" aria-hidden />
                  {url ? (
                    <a href={url} target={url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-fg hover:text-accent">
                      {value}
                    </a>
                  ) : (
                    <span className="text-fg-subtle">
                      {label} — <em>{c.pending}</em>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div id="cv" className="glass scroll-mt-24 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-fg-subtle">
              <FileText className="size-4" aria-hidden />
              {c.cvTitle}
            </h2>
            <ul className="mt-4 space-y-2">
              {cvs.map((cv) => (
                <li key={cv.lang}>
                  {cv.url ? (
                    <a
                      href={cv.url}
                      download
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm text-fg transition-colors hover:border-accent"
                    >
                      {cv.label}
                      <Download className="size-4 text-accent" aria-hidden />
                    </a>
                  ) : (
                    <span className="flex items-center justify-between rounded-xl border border-dashed border-border-strong px-4 py-3 text-sm text-fg-subtle">
                      {cv.label}
                      <em className="text-xs">{c.pending}</em>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
