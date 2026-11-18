# Vasco Henriques — Personal & Professional Website

Bilingual (PT-PT default / EN) portfolio for **Vasco Henriques**, Senior BI Consultant & Data Engineer — SQL Server, Power BI, Python.

> *Transforming Data into Decisions. Turning Ideas into Digital Solutions.*

## Stack
- **Next.js 16** (App Router, static export) · **TypeScript** · **Tailwind CSS v4**
- shadcn-style UI primitives (`cva` + `tailwind-merge`) · **Lucide** icons · **Geist** fonts (self-hosted)
- Animations: CSS only (scroll-driven reveal + a lightweight canvas data-network in the hero) — no animation library, to protect Core Web Vitals
- Content: typed TypeScript files in `src/content/` (no CMS, no database)
- Contact form: POST JSON to `site.formEndpoint` (e.g. Formspree) when set; otherwise prepares the message in the visitor's email app (mailto) — never claims a send that did not happen

## Commands
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in /out
npm run lint    # type-check
```

## Deploy

**Vercel (active):** the `vasco-henriques` project is linked to `vascoh/portfolio`; every push to `main` deploys to production at https://vascohenriques.online (also https://vasco-henriques.vercel.app; DNS at Amen; `vercel.json` sets the Next.js framework). Set `NEXT_PUBLIC_SITE_URL` only if the domain changes.

The former GitHub Pages site (`vascoh/vascoh.github.io`) now only redirects here, keeping the path.

## Structure
```
src/app/[lang]/…        pages (home, about, projects, projects/[slug], skills, experience, insights, contact)
src/app/(root)/         "/" → redirects to /pt/ (or /en/ if previously chosen)
src/components/         UI, hero, demos, contact form
src/content/            ✏️ all editable content (projects, experience, certifications, skills, posts, site config)
src/i18n/               locales + UI dictionary (EN / PT-PT)
public/images/          local images (projects screenshots, photo, og.png)
public/cv/              CV PDFs
```

See **[docs/CONTENT.md](docs/CONTENT.md)** to update content and **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for the design system and decisions.
