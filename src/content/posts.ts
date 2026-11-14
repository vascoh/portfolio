import type { L } from "@/i18n/config";

/**
 * Blog / Insights. Articles are listed as "coming soon" until written and validated by the author.
 * To publish an article later, add `published: "YYYY-MM-DD"` and a body (e.g. MDX) — see docs/CONTENT.md.
 */

export const postCategories = [
  { id: "sql", label: { en: "SQL Server Performance", pt: "Performance SQL Server" } },
  { id: "powerbi", label: { en: "Power BI & DAX", pt: "Power BI & DAX" } },
  { id: "data-eng", label: { en: "Data Engineering", pt: "Data Engineering" } },
  { id: "ai", label: { en: "Artificial Intelligence & LLMs", pt: "Inteligência Artificial & LLMs" } },
  { id: "automation", label: { en: "Automation", pt: "Automatização" } },
  { id: "learning", label: { en: "Learning Journey", pt: "Percurso de Aprendizagem" } },
] as const;

export type PostCategory = (typeof postCategories)[number]["id"];

export interface Post {
  slug: string;
  category: PostCategory;
  title: L;
  summary: L;
  /** null = not yet published (shown as "coming soon"). */
  published: string | null;
}

export const posts: Post[] = [
  {
    slug: "optimizing-sql-server-queries",
    category: "sql",
    title: { en: "Optimizing SQL Server Queries: My Approach", pt: "Otimizar Queries em SQL Server: A Minha Abordagem" },
    summary: {
      en: "Measure first, read the execution plan, fix the real bottleneck, validate the results — a practical workflow for query tuning.",
      pt: "Medir primeiro, ler o plano de execução, corrigir o gargalo real, validar os resultados — um fluxo prático de tuning de queries.",
    },
    published: null,
  },
  {
    slug: "hundreds-of-millions-of-rows-in-bi",
    category: "powerbi",
    title: { en: "Working with Hundreds of Millions of Rows in BI", pt: "Trabalhar com Centenas de Milhões de Linhas em BI" },
    summary: {
      en: "What changes when a Power BI model grows to hundreds of millions of rows — modelling, cardinality and where transformations should live.",
      pt: "O que muda quando um modelo Power BI cresce para centenas de milhões de linhas — modelação, cardinalidade e onde devem viver as transformações.",
    },
    published: null,
  },
  {
    slug: "how-i-use-llms-to-accelerate-development",
    category: "ai",
    title: { en: "How I Use LLMs to Accelerate Development", pt: "Como Uso LLMs para Acelerar o Desenvolvimento" },
    summary: {
      en: "LLMs as a pair-programmer: where they save time, where they fail, and why review and validation stay human.",
      pt: "LLMs como pair-programmer: onde poupam tempo, onde falham e porque a revisão e validação continuam humanas.",
    },
    published: null,
  },
  {
    slug: "from-bi-to-ai-assisted-applications",
    category: "learning",
    title: { en: "From Business Intelligence to AI-Assisted Applications", pt: "Do Business Intelligence às Aplicações Assistidas por IA" },
    summary: {
      en: "How years of BI work — understanding data, processes and business needs — translate into building digital products.",
      pt: "Como anos de trabalho em BI — compreender dados, processos e necessidades de negócio — se traduzem na construção de produtos digitais.",
    },
    published: null,
  },
  {
    slug: "football-analytics-project-power-bi",
    category: "powerbi",
    title: { en: "Building a Football Analytics Project with Power BI", pt: "Construir um Projeto de Football Analytics com Power BI" },
    summary: {
      en: "From raw football statistics to a dimensional model and DAX indicators — with Python and LLMs along the way.",
      pt: "De estatísticas brutas de futebol a um modelo dimensional e indicadores DAX — com Python e LLMs pelo caminho.",
    },
    published: null,
  },
];
