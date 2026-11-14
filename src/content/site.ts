/**
 * Global site configuration.
 *
 * ⚠️ PLACEHOLDERS: every value set to `null` is intentionally unconfigured.
 * Never invent contacts or profile URLs — fill these in with real data only.
 */
export const site = {
  name: "Vasco Henriques",
  headline: "Senior BI Consultant & Data Engineer | SQL Server · Power BI · Python",
  location: "Lisboa, Portugal",
  /** Public URL of the deployed website (used for SEO, sitemap and Open Graph). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://vasco-henriques.vercel.app").replace(/\/$/, ""),

  /** Professional photo. Place the file in /public/images and set e.g. "/images/vasco-henriques.jpg". */
  photo: null as string | null,

  contact: {
    /** TODO: professional email address. */
    email: "vascotelo@hotmail.com" as string | null,
    /** TODO: full LinkedIn profile URL. */
    linkedin: "https://www.linkedin.com/in/vasco-henriques/" as string | null,
    /** TODO: full GitHub profile URL. */
    github: "https://github.com/vascoh" as string | null,
  },

  /** CV files. Place PDFs in /public/cv and set the paths, e.g. "/cv/vasco-henriques-cv-en.pdf". */
  cv: {
    en: null as string | null,
    pt: null as string | null,
  },

  /** Contact form endpoint (e.g. Formspree): accepts POST JSON, replies 2xx on success.
   *  null → the form prepares the message in the visitor's email app (mailto). */
  formEndpoint: null as string | null,

  /** Shows the "Open to opportunities" badge. */
  openToWork: true,
};
