import type { L } from "@/i18n/config";

/**
 * Certifications. `type: "official"` = vendor/official certification; `type: "course"` = course or training.
 * Do not mix courses with official certifications, and never list training in progress as completed.
 */
export interface Certification {
  name: L;
  issuer: string;
  type: "official" | "course";
  year: string | null;
  /** Public verification URL (e.g. Microsoft Learn credential). */
  url: string | null;
  code?: string;
}

export const certifications: Certification[] = [
  {
    name: {
      en: "Microsoft Certified: Power BI Data Analyst Associate",
      pt: "Microsoft Certified: Power BI Data Analyst Associate",
    },
    issuer: "Microsoft",
    code: "PL-300",
    type: "official",
    year: null, // TODO: confirm year
    url: null, // TODO: add Microsoft Learn credential URL
  },
  {
    name: { en: "Microsoft Office Master", pt: "Microsoft Office Master" },
    issuer: "Microsoft",
    type: "official",
    year: null,
    url: null,
  },
  {
    name: {
      en: "Trainer Pedagogical Certification",
      pt: "Certificação Pedagógica de Formador",
    },
    issuer: "—", // TODO: confirm issuing entity from CV
    type: "official",
    year: null,
    url: null,
  },
  // TODO: add other certifications proven by the CV.
];
