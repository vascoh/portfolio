import { ContactCta } from "@/components/contact-cta";
import { InsightsList } from "@/components/insights-list";
import { PageHeader } from "@/components/section-heading";
import { posts } from "@/content/posts";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata(lang, "insights", d.insights.title, d.insights.text);
}

export default async function InsightsPage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return (
    <>
      <PageHeader eyebrow={d.insights.eyebrow} title={d.insights.title} text={d.insights.text} />
      <section className="container-page py-16">
        <InsightsList posts={posts} lang={lang} dict={d.insights} />
      </section>
      <ContactCta lang={lang} />
    </>
  );
}
