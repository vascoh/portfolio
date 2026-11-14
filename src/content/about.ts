import type { L } from "@/i18n/config";

/** About page narrative. Review and adjust wording freely — no dates or employers are stated here. */

export const aboutIntro: L = {
  en: "I'm a Business Intelligence professional with almost 8 years of experience in BI and data analysis, built on an earlier career in management, logistics, reporting and decision-support solutions.",
  pt: "Sou um profissional de Business Intelligence com quase 8 anos de experiência em BI e análise de dados, construídos sobre um percurso anterior em gestão, logística, reporting e soluções de apoio à decisão.",
};

export const aboutStory: L[] = [
  {
    en: "My path didn't start in IT. It started in operations — managing teams, logistics flows and the reports that kept them running. That's where I learned that data is only valuable when it answers a real business question, on time, and in a way people trust.",
    pt: "O meu percurso não começou nas TI. Começou na operação — a gerir equipas, fluxos logísticos e os relatórios que os mantinham a funcionar. Foi aí que aprendi que os dados só têm valor quando respondem a uma pergunta real do negócio, a tempo, e de uma forma em que as pessoas confiam.",
  },
  {
    en: "That curiosity took me to Business Intelligence. Today I work as a Senior BI Consultant, focused on SQL Server and Power BI: data models, T-SQL, ETL and reporting — often with large volumes of data, where performance stops being a detail and becomes the project.",
    pt: "Essa curiosidade levou-me ao Business Intelligence. Hoje trabalho como Senior BI Consultant, focado em SQL Server e Power BI: modelos de dados, T-SQL, ETL e reporting — muitas vezes com grandes volumes de dados, onde a performance deixa de ser um detalhe e passa a ser o projeto.",
  },
  {
    en: "I have a particular interest in performance tuning: finding the bottleneck in an execution plan, rewriting a slow process, making a heavy report feel instant. It's where analytical thinking and technical depth meet.",
    pt: "Tenho um interesse especial por performance tuning: encontrar o gargalo num plano de execução, reescrever um processo lento, tornar instantâneo um relatório pesado. É onde o pensamento analítico e a profundidade técnica se encontram.",
  },
  {
    en: "More recently, I've adopted Large Language Models as practical tools for productivity and development. They let me turn ideas into web applications and digital solutions faster — while I keep ownership of the analysis, architecture and validation.",
    pt: "Mais recentemente, adotei os Large Language Models como ferramentas práticas de produtividade e desenvolvimento. Permitem-me transformar ideias em aplicações web e soluções digitais mais depressa — mantendo eu a responsabilidade pela análise, arquitetura e validação.",
  },
];

export const aboutHighlights: L[] = [
  { en: "Understanding business problems before writing a single line of code", pt: "Compreender o problema de negócio antes de escrever uma linha de código" },
  { en: "Strong command of SQL Server and Power BI", pt: "Forte domínio de SQL Server e Power BI" },
  { en: "A special interest in performance tuning", pt: "Interesse especial por performance tuning" },
  { en: "Identifying bottlenecks with evidence, not guesses", pt: "Identificar gargalos com evidência, não com palpites" },
  { en: "Building automation that removes manual work", pt: "Construir automatização que elimina trabalho manual" },
  { en: "Experience with large data volumes (hundreds of millions of rows)", pt: "Experiência com grandes volumes de dados (centenas de milhões de linhas)" },
  { en: "Technological curiosity and continuous learning", pt: "Curiosidade tecnológica e aprendizagem contínua" },
  { en: "Practical adoption of LLMs for productivity and development", pt: "Adoção prática de LLMs para produtividade e desenvolvimento" },
];

export const aboutPrinciples: { title: L; text: L }[] = [
  {
    title: { en: "Business first", pt: "Negócio primeiro" },
    text: {
      en: "A dashboard is only as good as the decision it supports. I start from the question, not the tool.",
      pt: "Um dashboard só vale a decisão que suporta. Começo pela pergunta, não pela ferramenta.",
    },
  },
  {
    title: { en: "Measure, then optimize", pt: "Medir, depois otimizar" },
    text: {
      en: "Performance work is evidence-based: baselines, execution plans and before/after validation.",
      pt: "O trabalho de performance baseia-se em evidência: baselines, planos de execução e validação antes/depois.",
    },
  },
  {
    title: { en: "Trustworthy numbers", pt: "Números fiáveis" },
    text: {
      en: "Reconciliation and validation are part of the solution, not an afterthought.",
      pt: "Reconciliação e validação fazem parte da solução, não são um pormenor final.",
    },
  },
];

export const aboutAi: L = {
  en: "I use LLMs as an accelerator — for drafting code, exploring alternatives, explaining errors and writing documentation. Analysis, validation, architectural decisions and problem-solving remain my responsibility. AI makes me faster; it doesn't replace understanding.",
  pt: "Utilizo LLMs como acelerador — para escrever rascunhos de código, explorar alternativas, explicar erros e produzir documentação. A análise, validação, decisões arquiteturais e resolução de problemas continuam a ser responsabilidade minha. A IA torna-me mais rápido; não substitui a compreensão.",
};
