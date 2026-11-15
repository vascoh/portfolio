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
    year: "2024–2025", // CV: "Analyzing and Visualizing Data with Microsoft Power BI"
    url: null, // TODO: add Microsoft Learn credential URL
  },
  { name: { en: "Microsoft Office Master 2016", pt: "Microsoft Office Master 2016" }, issuer: "Microsoft", type: "official", year: "2016", url: null },
  {
    name: { en: "Microsoft Office Specialist: Excel 2016 Expert", pt: "Microsoft Office Specialist: Excel 2016 Expert" },
    issuer: "Microsoft",
    type: "official",
    year: "2016",
    url: null,
  },
  {
    name: { en: "Microsoft Office Specialist: Word 2016 Expert", pt: "Microsoft Office Specialist: Word 2016 Expert" },
    issuer: "Microsoft",
    type: "official",
    year: "2016",
    url: null,
  },
  { name: { en: "Digital Marketing", pt: "Marketing Digital" }, issuer: "Google", type: "official", year: "2017", url: null },
  {
    name: { en: "Trainer Pedagogical Certification", pt: "Certificação Pedagógica de Formador" },
    issuer: "—", // TODO: confirm issuing entity
    type: "official",
    year: null,
    url: null,
  },
];
