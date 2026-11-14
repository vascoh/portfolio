import { ArrowRight } from "lucide-react";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { ButtonLink } from "./ui/button";

export function ContactCta({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  return (
    <section className="container-page py-24 sm:py-28">
      <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/20 via-bg-elev to-accent-2/15 px-6 py-16 text-center sm:px-16">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{d.home.ctaTitle}</h2>
          <p className="mt-4 text-pretty text-fg-muted">{d.home.ctaText}</p>
          <ButtonLink href={href(lang, "contact")} size="lg" className="mt-8">
            {d.home.ctaButton}
            <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
