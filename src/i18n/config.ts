export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Bilingual string used across all typed content files. */
export type L = { en: string; pt: string };

export function tr(value: L, lang: Locale): string {
  return value[lang];
}

/** Builds a localized internal path, e.g. href("pt", "/projects") -> "/pt/projects/". */
export function href(lang: Locale, path = "/"): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const [p, hash] = clean.split("#");
  return `/${lang}/${p ? p + "/" : ""}${hash ? "#" + hash : ""}`;
}
