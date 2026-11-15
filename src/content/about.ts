import type { L } from "@/i18n/config";

/** About page narrative. Review and adjust wording freely — no dates or employers are stated here. */

export const aboutIntro: L = {
  en: "Senior Business Intelligence Consultant working in BI since 2019, specialised in SQL Server and Power BI. I build data models, dashboards and automated reporting for healthcare, banking, public administration and e-commerce — turning complex data into decisions people trust.",
  pt: "Consultor sénior de Business Intelligence a trabalhar em BI desde 2019, especializado em SQL Server e Power BI. Desenvolvo modelos de dados, dashboards e reporting automatizado para saúde, banca, administração pública e e-commerce — transformando dados complexos em decisões em que as pessoas confiam.",
};

export const aboutStory: L[] = [
  {
    en: "I studied Distribution and Logistics Management and spent years close to operations, sales and reporting — including running my own e-commerce business on marketplaces such as Amazon, eBay, Fnac and Worten, where KPIs, inventory and margins were part of every day. That's where I learned that data only matters when it answers a real business question.",
    pt: "Formei-me em Gestão da Distribuição e Logística e passei anos perto da operação, das vendas e do reporting — incluindo um negócio próprio de e-commerce em marketplaces como Amazon, eBay, Fnac e Worten, onde KPIs, inventário e margens faziam parte do dia a dia. Foi aí que aprendi que os dados só importam quando respondem a uma pergunta real do negócio.",
  },
  {
    en: "In 2019 I moved into Business Intelligence and completed a postgraduate degree in Information Management and BI at NOVA IMS. Since then I've worked as a BI consultant at IDW (public administration), genesis.studio (banking) and, since 2022, Noesis — as Senior BI Consultant — with SQL Server, T-SQL, Power BI, DAX, Power Query, SSIS and SSRS, often over hundreds of millions of rows, where performance stops being a detail and becomes the project.",
    pt: "Em 2019 mudei para Business Intelligence e concluí a pós-graduação em Gestão da Informação e BI na NOVA IMS. Desde então trabalhei como consultor de BI na IDW (administração pública), na genesis.studio (banca) e, desde 2022, na Noesis — como Senior BI Consultant — com SQL Server, T-SQL, Power BI, DAX, Power Query, SSIS e SSRS, muitas vezes sobre centenas de milhões de linhas, onde a performance deixa de ser um detalhe e passa a ser o projeto.",
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
