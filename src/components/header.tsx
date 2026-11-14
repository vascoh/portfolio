"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const items = ["about", "projects", "skills", "experience", "insights"] as const;

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary["nav"] }) {
  const pathname = usePathname() || `/${lang}/`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const otherLang: Locale = lang === "en" ? "pt" : "en";
  const switchHref = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${otherLang}`);
  const isActive = (key: string) => pathname.startsWith(href(lang, key));

  function rememberLang() {
    try {
      localStorage.setItem("lang", otherLang);
    } catch {}
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link href={href(lang)} className="group flex items-center gap-2.5 font-semibold tracking-tight">
          <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-[0.8rem] font-bold text-white shadow-[0_6px_20px_-6px_var(--glow)]">
            VH
          </span>
          <span className="sr-only text-fg sm:not-sr-only">Vasco Henriques</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((key) => (
            <li key={key}>
              <Link
                href={href(lang, key)}
                aria-current={isActive(key) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  isActive(key) ? "bg-surface text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {dict[key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Link
            href={switchHref}
            onClick={rememberLang}
            hrefLang={otherLang}
            aria-label={`${otherLang.toUpperCase()} — ${dict.language}`}
            title={dict.language}
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 font-mono text-xs font-medium uppercase text-fg-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <Languages className="size-4" aria-hidden />
            {otherLang}
          </Link>
          <ThemeToggle label={dict.theme} />
          <Link
            href={href(lang, "contact")}
            className="ml-1 hidden h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-fg transition hover:brightness-110 sm:inline-flex"
          >
            {dict.contact}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="lg:hidden">
        <ul className="container-page flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto pb-10 pt-4">
          {(["home", ...items, "contact"] as const).map((key) => (
            <li key={key}>
              <Link
                href={href(lang, key === "home" ? "/" : key)}
                className="block rounded-xl px-4 py-3.5 text-lg font-medium text-fg transition-colors hover:bg-surface"
              >
                {dict[key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
