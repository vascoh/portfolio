import type { L } from "@/i18n/config";

export type SkillLevel = "core" | "projects" | "learning";
export type SkillIcon = "database" | "terminal" | "globe" | "sparkles";

export interface SkillGroup {
  id: string;
  icon: SkillIcon;
  level: SkillLevel;
  title: L;
  description: L;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    icon: "database",
    level: "core",
    title: { en: "Core Expertise", pt: "Competências Principais" },
    description: {
      en: "Consolidated professional experience — the foundation of my daily work.",
      pt: "Experiência profissional consolidada — a base do meu trabalho diário.",
    },
    items: ["SQL Server", "T-SQL", "Power BI", "DAX", "Power Query", "Data Modeling", "SSIS", "SSRS", "Report Builder", "Performance Tuning", "Data Warehousing"],
  },
  {
    id: "dev",
    icon: "terminal",
    level: "core",
    title: { en: "Development & Automation", pt: "Desenvolvimento & Automatização" },
    description: {
      en: "Tools to automate processes, version code and move data reliably.",
      pt: "Ferramentas para automatizar processos, versionar código e mover dados com fiabilidade.",
    },
    items: ["Python", "PowerShell", "Git", "Azure DevOps", "ETL", "Automation"],
  },
  {
    id: "web",
    icon: "globe",
    level: "projects",
    title: { en: "Web & AI Projects", pt: "Projetos Web & IA" },
    description: {
      en: "Hands-on experience in my own projects, built with AI-assisted development.",
      pt: "Experiência prática em projetos próprios, desenvolvidos com assistência de IA.",
    },
    items: ["Next.js", "TypeScript", "React", "Supabase", "Vercel", "Netlify", "LLMs", "Prompt Engineering", "AI-assisted Development"],
  },
  {
    id: "learning",
    icon: "sparkles",
    level: "learning",
    title: { en: "Learning & Exploration", pt: "Aprendizagem & Exploração" },
    description: {
      en: "Technologies I'm currently studying — not yet professional experience.",
      pt: "Tecnologias que estou a estudar — ainda sem experiência profissional.",
    },
    items: ["Microsoft Fabric", "Databricks", "PySpark", "Spark SQL", "CI/CD"],
  },
];

export const expertiseAreas: { icon: "database" | "chart" | "bot" | "workflow"; title: L; text: L; tags: string[] }[] = [
  {
    icon: "database",
    title: { en: "Data Engineering & SQL Optimization", pt: "Data Engineering & Otimização SQL" },
    text: {
      en: "Advanced T-SQL, stored procedures, views and indexing. Execution plan analysis and performance tuning for data-intensive processes.",
      pt: "T-SQL avançado, stored procedures, views e indexação. Análise de planos de execução e performance tuning de processos com grandes volumes de dados.",
    },
    tags: ["SQL Server", "T-SQL", "SSIS"],
  },
  {
    icon: "chart",
    title: { en: "Business Intelligence & Analytics", pt: "Business Intelligence & Analytics" },
    text: {
      en: "Semantic models, DAX and Power Query. Operational and management reporting that business users trust — from data warehouse to dashboard.",
      pt: "Modelos semânticos, DAX e Power Query. Reporting operacional e de gestão em que o negócio confia — do data warehouse ao dashboard.",
    },
    tags: ["Power BI", "DAX", "SSRS"],
  },
  {
    icon: "bot",
    title: { en: "AI-Assisted Software Development", pt: "Desenvolvimento Assistido por IA" },
    text: {
      en: "LLMs as a development accelerator for web apps and tools — with architecture, review and validation kept under human responsibility.",
      pt: "LLMs como acelerador de desenvolvimento de aplicações e ferramentas — com arquitetura, revisão e validação sob responsabilidade humana.",
    },
    tags: ["LLMs", "Next.js", "TypeScript"],
  },
  {
    icon: "workflow",
    title: { en: "Automation & Digital Solutions", pt: "Automatização & Soluções Digitais" },
    text: {
      en: "ETL pipelines, scripted processes and small digital products that remove manual work and turn ideas into working solutions.",
      pt: "Pipelines ETL, processos automatizados e pequenos produtos digitais que eliminam trabalho manual e transformam ideias em soluções.",
    },
    tags: ["Python", "PowerShell", "ETL"],
  },
];
