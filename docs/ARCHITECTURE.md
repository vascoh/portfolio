# Architecture & visual proposal

## Positioning
Not an online CV: a professional digital identity combining **BI depth** (SQL Server, Power BI, performance) with
**AI-assisted digital solutions**. Every claim is factual; unconfirmed content is flagged.

## Visual direction
- **Dark premium by default** — deep navy `#060a14`, graphite surfaces, electric blue `#4d8dff` + cyan `#22d3ee` accents, subtle gradients
- **Light mode** with darker accents for WCAG AA contrast; theme persisted in `localStorage`, applied before paint (no flash)
- Subtle glassmorphism (`.glass`), faint grid backgrounds, soft glows
- Typography: Geist Sans / Geist Mono (mono for eyebrows, metrics and code → "data" feel)
- Motion: hero canvas data-network (pauses off-screen, static under `prefers-reduced-motion`), CSS scroll-driven reveals, hover micro-interactions

## Information architecture
`/en/` and `/pt/` (EN default) →
Home · About · Projects (BI portfolio + AI & Digital, tech filters) · Project case study `/projects/[slug]` · Skills · Experience & Education & Certifications · Insights · Contact

## Technical decisions
| Decision | Reason |
|---|---|
| Static export (`output: "export"`) | Fast, secure, free hosting on Netlify/Vercel/Pages; no server to maintain |
| Typed TS content instead of CMS/Supabase | No real need for a backend yet; type-safe; edit via GitHub |
| Form: endpoint or mailto | No backend; POST JSON to `site.formEndpoint` if set, else mailto; honeypot + timing anti-spam |
| CSS animations instead of Framer Motion | Smaller JS bundle, better Core Web Vitals |
| Locale route segment `[lang]` | Fully static bilingual pages with `hreflang` alternates |

## SEO & accessibility
Per-page metadata, canonical + `hreflang`, Open Graph/Twitter image (`/images/og.png`), JSON-LD `Person`,
`sitemap.xml`, `robots.txt`. Skip link, semantic landmarks, visible focus, `aria-pressed` filters,
accessible form errors, reduced-motion support, AA colour tokens.

## Confidentiality
Professional case studies use generic descriptions, conceptual architectures and fictional schemas/data only.
