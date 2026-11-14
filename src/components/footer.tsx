import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = (["about", "projects", "skills", "experience", "insights", "contact"] as const).map((k) => ({
    key: k,
    label: dict.nav[k],
  }));
  const social = [
    site.contact.linkedin && { label: "LinkedIn", url: site.contact.linkedin, Icon: LinkedInIcon },
    site.contact.github && { label: "GitHub", url: site.contact.github, Icon: GitHubIcon },
    site.contact.email && { label: "Email", url: `mailto:${site.contact.email}`, Icon: Mail },
  ].filter(Boolean) as { label: string; url: string; Icon: React.ComponentType<{ className?: string }> }[];

  return (
    <footer className="border-t border-border">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-semibold tracking-tight text-fg">{site.name}</p>
          <p className="mt-1 text-sm text-fg-muted">{site.headline}</p>
          <p className="mt-4 max-w-md text-sm text-fg-subtle">{dict.hero.tagline}</p>
          {social.length > 0 && (
            <ul className="mt-5 flex gap-2">
              {social.map(({ label, url, Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target={url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-border text-fg-muted transition hover:border-accent hover:text-fg"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.key}>
                <Link href={href(lang, l.key)} className="text-fg-muted transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
