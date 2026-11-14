# Content management ("admin area")

There is intentionally **no CMS and no admin panel**: all content lives in typed files under `src/content/`.
Edit them locally or directly on GitHub (pencil icon) → push to `main` → Vercel rebuilds automatically.
TypeScript validates the structure at build time, so a broken entry fails the build instead of breaking the site.

| What | File |
|---|---|
| Photo, email, LinkedIn, GitHub, CV paths, site URL | `src/content/site.ts` |
| Projects & case studies (BI + AI/Digital) | `src/content/projects.ts` |
| Professional experience, education, training | `src/content/experience.ts` |
| Certifications | `src/content/certifications.ts` |
| Skills & expertise cards | `src/content/skills.ts` |
| Blog / Insights | `src/content/posts.ts` |
| About narrative | `src/content/about.ts` |
| UI texts (buttons, labels) | `src/i18n/dictionary.ts` |

All texts are bilingual: `{ en: "...", pt: "..." }`.

## ⚠️ Placeholders still to fill
- [ ] `site.ts` → `photo` (put the file in `public/images/`)
- [ ] `site.ts` → `contact.email`, `contact.linkedin`, `contact.github`
- [ ] `site.ts` → `cv.en`, `cv.pt` (PDFs in `public/cv/`)
- [ ] `experience.ts` → previous roles (from official CV), institution/year of the degree, year of the postgraduate
- [ ] `certifications.ts` → years, PL-300 credential URL, issuer of the trainer certification, other certifications
- [ ] `projects.ts` → BI case studies have `pendingConfirmation: true` — review the text, then remove the flag
- [ ] `projects.ts` → CryptoBot description is minimal (its Vercel preview is private) — complete it
- [ ] Blocos, FareSniper, CryptoBot have Vercel Authentication on → no public link. Add `previewUrl`
      when they are public, or `url` when launched with a domain
- [ ] Patrão Mor Amora uses `patrao-mor-amora.vercel.app` — switch `url` when the final domain is attached
- [ ] Screenshots: `public/images/projects/*.webp` and set `gallery[].src`
- [ ] FPF Sports Intelligence: add report screenshots (`gallery`) and repo/demo links when public

## Rules
- Never publish client names, internal servers, credentials, internal queries or proprietary structures.
- Never invent metrics, features or technologies.
- Only synthetic or anonymized data in images.

## Adding a project
Copy an entry in `projects.ts`, give it a unique `slug`, `kind: "bi" | "digital"`, `status`, and bilingual texts.
Pages, sitemap and filters update automatically.

## Publishing an article
Set `published: "YYYY-MM-DD"` in `posts.ts`. (Full article pages can be added later with MDX via `@next/mdx`.)
