import type { L } from "@/i18n/config";

/**
 * Career & education. ⚠️ Only add roles, dates and institutions exactly as in the official CV.
 * Entries flagged `placeholder: true` are rendered with a "to be confirmed" style.
 */

export interface Role {
  company: string;
  title: L;
  /** ISO "YYYY-MM". */
  start: string;
  /** ISO "YYYY-MM" or null for current role. */
  end: string | null;
  description: L;
  tags?: string[];
}

export const roles: Role[] = [
  {
    company: "Noesis",
    title: { en: "Senior BI Consultant", pt: "Senior BI Consultant" },
    start: "2022-03",
    end: null,
    description: {
      en: "Business Intelligence consulting: SQL Server development and optimization, Power BI semantic models and reports, ETL and reporting processes for enterprise clients.",
      pt: "Consultoria de Business Intelligence: desenvolvimento e otimização em SQL Server, modelos semânticos e relatórios Power BI, processos de ETL e reporting para clientes empresariais.",
    },
    tags: ["SQL Server", "T-SQL", "Power BI", "DAX", "SSIS", "SSRS"],
  },
  // TODO: add previous roles from the official CV (company, title, start, end, description).
];

export interface Education {
  degree: L;
  institution: string | null;
  year: string | null;
}

export const education: Education[] = [
  {
    degree: {
      en: "Postgraduate degree in Information Management and Business Intelligence in Healthcare",
      pt: "Pós-graduação em Gestão da Informação e Business Intelligence na Saúde",
    },
    institution: "NOVA IMS",
    year: null, // TODO: confirm year from CV
  },
  {
    degree: {
      en: "Bachelor's degree in Distribution and Logistics Management",
      pt: "Licenciatura em Gestão da Distribuição e Logística",
    },
    institution: null, // TODO: confirm institution from CV
    year: null, // TODO: confirm year from CV
  },
];

export const training: L[] = [
  {
    en: "Complementary training in information technology, software development and data analysis.",
    pt: "Formação complementar em tecnologias de informação, desenvolvimento e análise de dados.",
  },
  // TODO: list specific courses from the CV.
];
