import type { L } from "@/i18n/config";

/** Career & education — source: official CV (English version). */

export interface Role {
  company: string;
  location?: string;
  title: L;
  /** ISO "YYYY-MM". */
  start: string;
  /** ISO "YYYY-MM" or null for current role. */
  end: string | null;
  sector?: L;
  description: L;
  highlights?: L[];
  tags?: string[];
}

export const roles: Role[] = [
  {
    company: "Noesis",
    location: "Lisboa",
    title: { en: "Senior BI Consultant", pt: "Senior BI Consultant" },
    start: "2022-03",
    end: null,
    sector: { en: "Enterprise clients", pt: "Clientes empresariais" },
    description: {
      en: "End-to-end BI delivery for enterprise clients: from requirements with business units to data models, dashboards and automated reporting.",
      pt: "Entrega de BI end-to-end para clientes empresariais: do levantamento de requisitos com as áreas de negócio aos modelos de dados, dashboards e reporting automatizado.",
    },
    highlights: [
      { en: "Interactive dashboards and KPIs in Power BI", pt: "Dashboards interativos e KPIs em Power BI" },
      { en: "Data modelling with DAX and Power Query (M)", pt: "Modelação de dados com DAX e Power Query (M)" },
      { en: "ETL from SQL Server, Excel and other sources", pt: "ETL a partir de SQL Server, Excel e outras fontes" },
      { en: "Optimization and automation of recurring reports", pt: "Otimização e automatização de relatórios recorrentes" },
      { en: "Data quality, performance and documentation", pt: "Qualidade de dados, performance e documentação" },
    ],
    tags: ["Power BI", "SQL Server", "DAX", "Power Query", "Excel", "SharePoint", "Azure Data Studio"],
  },
  {
    company: "genesis.studio",
    location: "Lisboa",
    title: { en: "Business Intelligence Consultant", pt: "Consultor de Business Intelligence" },
    start: "2021-08",
    end: "2022-03",
    sector: { en: "Banking", pt: "Banca" },
    description: {
      en: "BI solutions for the banking sector, integrating data from several banking systems into Power BI.",
      pt: "Soluções de BI para o setor bancário, integrando dados de vários sistemas bancários em Power BI.",
    },
    highlights: [
      { en: "Dashboards and KPIs for data-driven decisions in banking", pt: "Dashboards e KPIs para decisões baseadas em dados na banca" },
      { en: "SQL-based ETL across banking systems", pt: "ETL em SQL entre sistemas bancários" },
      { en: "Automated data updates and recurring reports", pt: "Atualizações de dados e relatórios recorrentes automatizados" },
    ],
    tags: ["Power BI", "SQL Server", "DAX", "Power Query", "Excel"],
  },
  {
    company: "IDW",
    location: "Lisboa",
    title: { en: "Business Intelligence Consultant", pt: "Consultor de Business Intelligence" },
    start: "2020-10",
    end: "2021-09",
    sector: { en: "Public administration", pt: "Administração pública" },
    description: {
      en: "Migration of Excel reporting to Power BI and integration of public-sector datasets for performance monitoring and accountability.",
      pt: "Migração de reporting em Excel para Power BI e integração de dados do setor público para monitorização de desempenho e prestação de contas.",
    },
    highlights: [
      { en: "Excel → Power BI report migration and optimization", pt: "Migração e otimização de relatórios Excel → Power BI" },
      { en: "SQL extraction and transformation of multiple datasets", pt: "Extração e transformação em SQL de múltiplos conjuntos de dados" },
      { en: "Requirements gathering with public administration departments", pt: "Levantamento de requisitos com serviços da administração pública" },
    ],
    tags: ["Power BI", "SQL Server", "Excel", "Power Query"],
  },
  {
    company: "IDW",
    location: "Lisboa",
    title: { en: "Junior Business Intelligence Consultant", pt: "Consultor Júnior de Business Intelligence" },
    start: "2019-02",
    end: "2019-12",
    description: {
      en: "Start of the BI career: dashboards and reports in Power BI and Excel, data integration with Reporting Services and Integration Services.",
      pt: "Início da carreira em BI: dashboards e relatórios em Power BI e Excel, integração de dados com Reporting Services e Integration Services.",
    },
    tags: ["Power BI", "DAX", "SSRS", "SSIS", "Excel"],
  },
  {
    company: "Freelancer",
    location: "Lisboa",
    title: { en: "E-commerce & Dropshipping Specialist", pt: "Especialista em E-commerce e Dropshipping" },
    start: "2016-12",
    end: "2022-01",
    sector: { en: "E-commerce", pt: "E-commerce" },
    description: {
      en: "Own e-commerce operation on marketplaces such as Amazon, eBay, Fnac and Worten — sales and KPI analysis, inventory and financial reporting, digital marketing and logistics.",
      pt: "Operação própria de e-commerce em marketplaces como Amazon, eBay, Fnac e Worten — análise de vendas e KPIs, gestão de inventário e reporting financeiro, marketing digital e logística.",
    },
    highlights: [
      { en: "KPI analysis: conversion rate, acquisition cost, ROI", pt: "Análise de KPIs: taxa de conversão, custo de aquisição, ROI" },
      { en: "Advanced Excel and Power BI for inventory and finance", pt: "Excel avançado e Power BI para inventário e finanças" },
      { en: "Google Ads, Facebook Ads, SEO/SEM", pt: "Google Ads, Facebook Ads, SEO/SEM" },
    ],
    tags: ["Excel", "Power BI", "Google Analytics", "Power Query"],
  },
];

export interface Education {
  degree: L;
  institution: string;
  year: string;
}

export const education: Education[] = [
  {
    degree: {
      en: "Postgraduate Certificate in Information Management and Business Intelligence in Healthcare",
      pt: "Pós-Graduação em Gestão da Informação e Business Intelligence na Saúde",
    },
    institution: "NOVA IMS — Information Management School",
    year: "2019–2020",
  },
  {
    degree: { en: "Level 6 Course in Distribution and Logistics", pt: "Curso Nível 6 em Distribuição e Logística" },
    institution: "IEFP — Instituto do Emprego e da Formação Profissional",
    year: "2006–2007",
  },
  {
    degree: { en: "Bachelor's degree in Distribution and Logistics Management", pt: "Licenciatura em Gestão da Distribuição e Logística" },
    institution: "Instituto Politécnico de Setúbal",
    year: "1997–2002",
  },
];

export const training: L[] = [
  {
    en: "Web Page Design, Digital/Multimedia and Information Resources — Instituto Politécnico de Leiria (2017)",
    pt: "Design de Páginas Web, Digital/Multimédia e Recursos de Informação — Instituto Politécnico de Leiria (2017)",
  },
  { en: "Digital Marketing — TGS (2017)", pt: "Marketing Digital — TGS (2017)" },
];

export const languages: { name: L; level: L }[] = [
  { name: { en: "Portuguese", pt: "Português" }, level: { en: "Native", pt: "Nativo" } },
  { name: { en: "English", pt: "Inglês" }, level: { en: "Intermediate", pt: "Intermédio" } },
];
