import type { L } from "@/i18n/config";

/**
 * Projects & case studies.
 *
 * Rules (see docs/CONTENT.md):
 * - Never publish client names, internal server names, queries, credentials or proprietary structures.
 * - Never invent metrics, features or technologies. Use `pendingConfirmation: true` while content
 *   still needs to be validated by Vasco — a discreet badge is shown on the page.
 * - Images go in /public/images/projects. Use synthetic data only.
 */

export type ProjectKind = "bi" | "digital";
export type ProjectStatus = "professional" | "published" | "development" | "prototype" | "concept";
export type ProjectIcon =
  | "database" | "gauge" | "file" | "trophy" | "home" | "cake" | "anchor" | "search"
  | "car" | "radar" | "blocks" | "bot";

export interface ArchitectureStage {
  label: L;
  nodes: string[];
}

export interface GalleryItem {
  /** Path inside /public, or null for a placeholder frame. */
  src: string | null;
  alt: L;
}

export interface Project {
  slug: string;
  kind: ProjectKind;
  /** Also list the project in the other portfolio section. */
  alsoIn?: ProjectKind;
  status: ProjectStatus;
  icon: ProjectIcon;
  featured?: boolean;
  personal?: boolean;
  confidential?: boolean;
  /** Content still to be validated by the author — shows a "pending confirmation" note. */
  pendingConfirmation?: boolean;
  title: L;
  summary: L;
  /** Technologies — also used by the portfolio filter. Only confirmed technologies. */
  tags: string[];
  url?: string;
  /** Public preview link (e.g. *.vercel.app) for projects not yet launched. */
  previewUrl?: string;
  context?: L;
  problem?: L;
  objective?: L;
  architecture?: ArchitectureStage[];
  approach?: L[];
  challenges?: L[];
  solution?: L;
  results?: L;
  role?: L;
  aiUsage?: L;
  features?: L[];
  gallery?: GalleryItem[];
  demo?: "sql-diagnostics";
}

const confidentialResults: L = {
  en: "Quantified results are not published to protect client confidentiality. Outcomes can be discussed in an interview context, within the limits of confidentiality agreements.",
  pt: "Os resultados quantificados não são publicados para proteger a confidencialidade do cliente. Podem ser discutidos em contexto de entrevista, dentro dos limites dos acordos de confidencialidade.",
};

export const projects: Project[] = [
  // ───────────────────────────── Business Intelligence ─────────────────────────────
  {
    slug: "enterprise-power-bi-large-scale-analytics",
    kind: "bi",
    status: "professional",
    icon: "database",
    featured: true,
    confidential: true,
    title: {
      en: "Enterprise Power BI & Large-Scale Data Analytics",
      pt: "Power BI Empresarial & Análise de Dados em Larga Escala",
    },
    summary: {
      en: "BI solutions over datasets in the hundreds of millions of records — including one project with roughly 500–600 million rows — where performance, modelling and efficient querying were central.",
      pt: "Soluções de BI sobre conjuntos de dados na ordem das centenas de milhões de registos — incluindo um projeto com cerca de 500–600 milhões de linhas — onde a performance, a modelação e a consulta eficiente foram centrais.",
    },
    tags: ["Power BI", "DAX", "Power Query", "SQL Server", "Data Modeling"],
    context: {
      en: "Enterprise environment with large fact tables, multiple business areas consuming the same data, and reports expected to remain responsive for daily decision-making.",
      pt: "Ambiente empresarial com tabelas de factos de grande dimensão, várias áreas de negócio a consumir os mesmos dados e relatórios que tinham de se manter rápidos para a tomada de decisão diária.",
    },
    problem: {
      en: "At this volume, naïve models and queries quickly become slow to refresh and slow to explore. Business users need reliable figures and responsive reports — without waiting minutes for a visual to load.",
      pt: "Com este volume, modelos e queries pouco cuidados tornam-se rapidamente lentos a atualizar e a explorar. Os utilizadores de negócio precisam de números fiáveis e relatórios rápidos — sem esperar minutos por um visual.",
    },
    objective: {
      en: "Deliver a semantic model and reports that scale to hundreds of millions of rows while keeping refresh times, memory footprint and query response under control.",
      pt: "Entregar um modelo semântico e relatórios que escalem para centenas de milhões de linhas, mantendo sob controlo os tempos de atualização, a memória utilizada e o tempo de resposta.",
    },
    architecture: [
      { label: { en: "Sources", pt: "Fontes" }, nodes: ["Operational systems", "SQL Server"] },
      { label: { en: "Data layer", pt: "Camada de dados" }, nodes: ["T-SQL views", "Stored procedures", "Indexing"] },
      { label: { en: "Semantic model", pt: "Modelo semântico" }, nodes: ["Star schema", "Power Query", "DAX measures"] },
      { label: { en: "Consumption", pt: "Consumo" }, nodes: ["Power BI reports", "Business users"] },
    ],
    approach: [
      {
        en: "Dimensional modelling (star schema) with clear separation between facts and dimensions.",
        pt: "Modelação dimensional (star schema) com separação clara entre factos e dimensões.",
      },
      {
        en: "Pushing heavy transformations upstream to SQL Server instead of the report layer.",
        pt: "Deslocar transformações pesadas para o SQL Server em vez da camada de relatório.",
      },
      {
        en: "Reducing column cardinality and removing unused columns to keep the model compact.",
        pt: "Reduzir a cardinalidade das colunas e remover colunas não utilizadas para manter o modelo compacto.",
      },
      {
        en: "Writing DAX measures with performance in mind and validating them against source figures.",
        pt: "Escrever medidas DAX com foco em performance e validá-las contra os valores de origem.",
      },
    ],
    challenges: [
      { en: "Refresh duration and memory consumption at this scale.", pt: "Duração das atualizações e consumo de memória a esta escala." },
      { en: "Keeping visuals responsive under heavy filtering.", pt: "Manter os visuais rápidos com filtragem intensiva." },
      { en: "Guaranteeing consistency between report figures and source systems.", pt: "Garantir consistência entre os valores dos relatórios e os sistemas de origem." },
    ],
    solution: {
      en: "A performance-oriented end-to-end design: optimized SQL data layer, compact dimensional model and carefully written measures — validated with business users.",
      pt: "Um desenho end-to-end orientado para a performance: camada SQL otimizada, modelo dimensional compacto e medidas cuidadosamente escritas — validados com os utilizadores de negócio.",
    },
    results: confidentialResults,
    gallery: [
      { src: null, alt: { en: "Conceptual model diagram (synthetic)", pt: "Diagrama conceptual do modelo (sintético)" } },
      { src: null, alt: { en: "Dashboard with synthetic data", pt: "Dashboard com dados sintéticos" } },
    ],
  },
  {
    slug: "sql-assessment-mis-monitor",
    kind: "bi",
    alsoIn: "digital",
    status: "professional",
    icon: "search",
    featured: true,
    confidential: true,
    title: { en: "SQL Server Assessment — Decision-Support Tool", pt: "Assessment SQL Server — Ferramenta de Apoio à Decisão" },
    summary: {
      en: "Assessment of an enterprise SQL Server 2019 environment (several databases, multi-terabyte), delivered as a single offline HTML tool for data teams that are not DBAs: what is wrong, why, who fixes it, expected benefit and how to validate.",
      pt: "Assessment de um ambiente SQL Server 2019 empresarial (várias bases de dados, vários terabytes), entregue como uma ferramenta HTML única e offline para equipas de dados que não são DBA: o que está mal, porquê, quem resolve, o benefício esperado e como validar.",
    },
    tags: ["SQL Server", "T-SQL", "PowerShell", "Python", "Performance Tuning", "DMVs"],
    context: {
      en: "Built in a professional context for a data/MIS team working on a large SQL Server 2019 environment. Client, server and database names are not published.",
      pt: "Desenvolvido em contexto profissional para uma equipa de dados/MIS que trabalha sobre um ambiente SQL Server 2019 de grande dimensão. Os nomes do cliente, do servidor e das bases de dados não são publicados.",
    },
    problem: {
      en: "Classic DBA reports list hundreds of findings without saying who should act, how much effort it takes or how to prove the improvement — so data teams cannot prioritise or argue their case.",
      pt: "Os relatórios clássicos de DBA listam centenas de achados sem dizer quem deve agir, quanto esforço exige ou como provar a melhoria — e as equipas de dados não conseguem priorizar nem fundamentar o pedido.",
    },
    objective: {
      en: "Turn a technical assessment into decisions: classified actions, quick wins with rollback, health scores and a roadmap, every number traceable to its source.",
      pt: "Transformar um assessment técnico em decisões: ações classificadas, quick wins com rollback, health scores e roadmap, com cada número rastreável à sua fonte.",
    },
    architecture: [
      { label: { en: "Collection", pt: "Recolha" }, nodes: ["PowerShell collector", "DMVs → CSV"] },
      { label: { en: "Curation", pt: "Curadoria" }, nodes: ["Python build", "Ticket classification"] },
      { label: { en: "Tool", pt: "Ferramenta" }, nodes: ["Single-file HTML", "100% offline"] },
      { label: { en: "Decision", pt: "Decisão" }, nodes: ["Quick wins", "Roadmap"] },
    ],
    features: [
      { en: "226 actions classified by owner: data team, DBA, infrastructure or development", pt: "226 ações classificadas por responsável: equipa de dados, DBA, infraestrutura ou desenvolvimento" },
      { en: "20 quick wins, each with impact, before/after with confidence level, SQL and rollback", pt: "20 quick wins, cada um com impacto, antes/depois com nível de confiança, SQL e rollback" },
      { en: "12 health-score categories and a roadmap derived from the actions' priority", pt: "12 categorias de health score e roadmap derivado da prioridade das ações" },
      { en: "26 learning articles (MAXDOP, waits, missing indexes…) illustrated with the environment's own data", pt: "26 artigos de aprendizagem (MAXDOP, waits, índices em falta…) ilustrados com dados do próprio ambiente" },
      { en: "PowerShell collector whose CSVs are read locally in the browser — no data leaves the machine", pt: "Coletor PowerShell cujos CSVs são lidos localmente no browser — nenhum dado sai da máquina" },
      { en: "Anonymised generic edition whose findings are computed at runtime from the collected data", pt: "Edição genérica anonimizada, com achados calculados em runtime a partir dos dados recolhidos" },
    ],
    approach: [
      { en: "Never invent data: where there is no evidence the tool shows “N/A” with an explanation.", pt: "Nunca inventar dados: onde não há evidência, a ferramenta mostra «N/D» com explicação." },
      { en: "Decision support, not an automatic judge: objective problem, recommended practice and contextual observation are kept apart.", pt: "Apoio à decisão, não juiz automático: problema objetivo, prática recomendada e observação contextual ficam separados." },
      { en: "Each recommendation explains why, its cost and when it does not apply.", pt: "Cada recomendação explica porquê, o custo e quando não se aplica." },
    ],
    role: { en: "Author — requirements, architecture, SQL analysis and functional validation.", pt: "Autor — requisitos, arquitetura, análise SQL e validação funcional." },
    aiUsage: {
      en: "Claude and ChatGPT assisted with design and implementation of the HTML tool and build scripts; requirements, architecture and validation are mine.",
      pt: "O Claude e o ChatGPT apoiaram o desenho e a implementação da ferramenta HTML e dos scripts de build; requisitos, arquitetura e validação são meus.",
    },
    results: confidentialResults,
  },
  {
    slug: "sql-server-performance-optimization",
    kind: "bi",
    status: "professional",
    icon: "gauge",
    featured: false,
    confidential: true,
    title: {
      en: "SQL Server Performance & Process Optimization",
      pt: "Performance SQL Server & Otimização de Processos",
    },
    summary: {
      en: "Optimization of queries, stored procedures and reporting processes in SQL Server — from diagnosis and execution plan analysis to bottleneck removal.",
      pt: "Otimização de queries, stored procedures e processos de reporting em SQL Server — do diagnóstico e análise de planos de execução à remoção de gargalos.",
    },
    tags: ["SQL Server", "T-SQL", "Performance Tuning", "Indexing"],
    problem: {
      en: "Reporting processes and stored procedures that took too long, competed for resources or failed to finish within their execution windows.",
      pt: "Processos de reporting e stored procedures que demoravam demasiado, competiam por recursos ou não terminavam dentro das janelas de execução.",
    },
    objective: {
      en: "Identify the real bottlenecks with evidence, fix them with minimal risk and make processes predictable.",
      pt: "Identificar os gargalos reais com base em evidência, corrigi-los com risco mínimo e tornar os processos previsíveis.",
    },
    architecture: [
      { label: { en: "Measure", pt: "Medir" }, nodes: ["Baseline timings", "I/O & CPU statistics"] },
      { label: { en: "Diagnose", pt: "Diagnosticar" }, nodes: ["Execution plans", "Wait analysis", "Hot spots"] },
      { label: { en: "Optimize", pt: "Otimizar" }, nodes: ["Query rewrite", "Indexing", "Set-based logic"] },
      { label: { en: "Validate", pt: "Validar" }, nodes: ["Result parity", "Before/after timings"] },
    ],
    approach: [
      { en: "Establish a baseline before changing anything.", pt: "Estabelecer uma baseline antes de alterar o que quer que seja." },
      {
        en: "Read execution plans to find expensive operators: scans on large tables, key lookups, spills, implicit conversions.",
        pt: "Ler planos de execução para encontrar operadores caros: scans em tabelas grandes, key lookups, spills, conversões implícitas.",
      },
      {
        en: "Replace row-by-row logic with set-based T-SQL where possible.",
        pt: "Substituir lógica linha-a-linha por T-SQL orientado a conjuntos sempre que possível.",
      },
      {
        en: "Review indexing and statistics, and validate that results are identical after each change.",
        pt: "Rever índices e estatísticas, e validar que os resultados são idênticos após cada alteração.",
      },
    ],
    challenges: [
      { en: "Changing critical processes without affecting results.", pt: "Alterar processos críticos sem afetar resultados." },
      { en: "Distinguishing symptoms from root causes.", pt: "Distinguir sintomas de causas reais." },
    ],
    solution: {
      en: "A repeatable diagnostic methodology — measure, diagnose, optimize, validate — applied to queries, procedures and reporting chains.",
      pt: "Uma metodologia de diagnóstico repetível — medir, diagnosticar, otimizar, validar — aplicada a queries, procedures e cadeias de reporting.",
    },
    results: confidentialResults,
    demo: "sql-diagnostics",
  },
  {
    slug: "financial-reporting-data-automation",
    kind: "bi",
    status: "professional",
    icon: "file",
    confidential: true,
    title: {
      en: "Financial Reporting & Data Automation",
      pt: "Reporting Financeiro & Automatização de Dados",
    },
    summary: {
      en: "Development and maintenance of automated reporting processes — extraction, transformation and data validation — in a financial context.",
      pt: "Desenvolvimento e manutenção de processos automatizados de reporting — extração, transformação e validação de dados — em contexto financeiro.",
    },
    tags: ["SQL Server", "SSIS", "SSRS", "ETL", "Automation"],
    problem: {
      en: "Recurring reports that depend on several data sources, strict deadlines and zero tolerance for inconsistent figures.",
      pt: "Relatórios recorrentes que dependem de várias fontes, prazos rigorosos e tolerância zero para valores inconsistentes.",
    },
    objective: {
      en: "Automate extraction, transformation and validation so that reports are produced reliably and on time, with less manual effort.",
      pt: "Automatizar a extração, transformação e validação para que os relatórios sejam produzidos de forma fiável e atempada, com menos esforço manual.",
    },
    architecture: [
      { label: { en: "Extract", pt: "Extrair" }, nodes: ["Source systems", "Files"] },
      { label: { en: "Transform", pt: "Transformar" }, nodes: ["ETL packages", "T-SQL procedures"] },
      { label: { en: "Validate", pt: "Validar" }, nodes: ["Reconciliation checks", "Data-quality rules"] },
      { label: { en: "Report", pt: "Reportar" }, nodes: ["Paginated reports", "Distribution"] },
    ],
    approach: [
      { en: "Standardized ETL flows with clear, traceable steps.", pt: "Fluxos ETL normalizados, com passos claros e rastreáveis." },
      { en: "Validation and reconciliation checks before any figure is published.", pt: "Validações e reconciliações antes de qualquer valor ser publicado." },
      { en: "Ongoing maintenance as business rules and sources evolve.", pt: "Manutenção contínua à medida que regras de negócio e fontes evoluem." },
    ],
    solution: {
      en: "Automated, validated reporting pipelines — described here only in generic, anonymized terms.",
      pt: "Pipelines de reporting automatizados e validados — descritos aqui apenas em termos genéricos e anonimizados.",
    },
    results: confidentialResults,
  },
  {
    slug: "fpf-sports-intelligence",
    kind: "bi",
    alsoIn: "digital",
    status: "prototype",
    icon: "trophy",
    featured: true,
    personal: true,
    title: {
      en: "FPF Sports Intelligence — Portugal at EURO 2024",
      pt: "FPF Sports Intelligence — Portugal no EURO 2024",
    },
    summary: {
      en: "Independent prototype that brings together the EURO 2024 event data published by StatsBomb and compares Portugal's performance with the rest of the tournament. Built with public data: it is not an official FPF system and uses no internal federation data.",
      pt: "Protótipo independente que reúne os eventos do EURO 2024 publicados pela StatsBomb e compara o desempenho de Portugal com o resto do torneio. Feito com dados públicos: não é um sistema oficial da FPF nem usa dados internos da federação.",
    },
    tags: ["Python", "pandas", "Parquet", "Power BI", "DAX", "Data Modeling"],
    context: {
      en: "Prototype built on my own initiative to prepare a technical interview at the Portuguese Football Federation — an end-to-end exercise from raw public event data to an analysis report.",
      pt: "Protótipo feito por iniciativa própria para preparar uma entrevista técnica na Federação Portuguesa de Futebol — um exercício completo, dos dados públicos em bruto até ao relatório de análise.",
    },
    problem: {
      en: "Public football event data comes as nested JSON per match. To compare a team with a tournament it has to be flattened, validated and modelled before any indicator can be trusted.",
      pt: "Os dados públicos de eventos de futebol chegam em JSON aninhado, jogo a jogo. Para comparar uma equipa com um torneio é preciso achatá-los, validá-los e modelá-los antes de se poder confiar em qualquer indicador.",
    },
    objective: {
      en: "Turn the 51 EURO 2024 matches into a dimensional model and a Power BI report that compares Portugal with the rest of the tournament.",
      pt: "Transformar os 51 jogos do EURO 2024 num modelo dimensional e num relatório Power BI que compare Portugal com o resto do torneio.",
    },
    architecture: [
      { label: { en: "Source", pt: "Origem" }, nodes: ["StatsBomb Open Data", "JSON events"] },
      { label: { en: "Transformation", pt: "Transformação" }, nodes: ["Python", "pandas", "Quality checks"] },
      { label: { en: "Model", pt: "Modelo" }, nodes: ["Parquet", "9 tables"] },
      { label: { en: "Analysis", pt: "Análise" }, nodes: ["Power BI", "6 pages · DAX"] },
    ],
    features: [
      { en: "Ingestion of the public match, lineup and event JSON files", pt: "Ingestão dos ficheiros JSON públicos de jogos, plantéis e eventos" },
      { en: "Python transformation into a dimensional model stored as Parquet", pt: "Transformação em Python para um modelo dimensional em Parquet" },
      { en: "Player and team metrics, with 23 data-quality rules checked on every run", pt: "Métricas por jogador e por equipa, com 23 regras de qualidade verificadas a cada execução" },
      { en: "Six-page Power BI report with 99 DAX measures", pt: "Relatório Power BI de seis páginas, com 99 medidas DAX" },
    ],
    approach: [
      { en: "Overlapping participation intervals are merged before summing, so minutes played are never counted twice.", pt: "Os intervalos de participação sobrepostos são unidos antes de somar, para não contar minutos jogados duas vezes." },
      { en: "Percentiles are computed by position and only include players with at least 180 minutes.", pt: "Os percentis são calculados por posição e só incluem jogadores com pelo menos 180 minutos." },
      { en: "Detailed events are limited to Portugal's matches; tournament-wide aggregates are used for comparison.", pt: "Os eventos detalhados limitam-se aos jogos de Portugal; para comparação usam-se agregados de todo o torneio." },
      { en: "Part of the Power BI report layer is generated by Python scripts instead of being built by hand.", pt: "Parte da camada de relatório Power BI é gerada por scripts Python em vez de construída à mão." },
    ],
    challenges: [
      { en: "Event data only: no tracking or medical data.", pt: "Só dados de eventos: sem dados de tracking nem dados clínicos." },
      { en: "Short sample: five Portugal matches. Player-level conclusions are indications, not certainties.", pt: "Amostra curta: cinco jogos de Portugal. As conclusões por jogador são indícios, não certezas." },
      { en: "It is a prototype: no scheduled refresh and no production access control.", pt: "É um protótipo: sem atualização agendada nem controlo de acessos de produção." },
    ],
    results: {
      en: "51 tournament matches processed into 9 Parquet tables, validated by 23 quality rules and analysed in a six-page report with 99 DAX measures.",
      pt: "51 jogos do torneio processados em 9 tabelas Parquet, validados por 23 regras de qualidade e analisados num relatório de seis páginas com 99 medidas DAX.",
    },
    role: { en: "Individual project — data pipeline, model and report.", pt: "Projeto individual — pipeline de dados, modelo e relatório." },
    aiUsage: {
      en: "LLMs helped draft Python and DAX, explain errors and document the model. Every output was tested and validated manually.",
      pt: "Os LLMs ajudaram a escrever rascunhos de Python e DAX, explicar erros e documentar o modelo. Todos os resultados foram testados e validados manualmente.",
    },
  },

  // ───────────────────────────── AI & Digital ─────────────────────────────
  {
    slug: "anfitriao",
    kind: "digital",
    status: "published",
    icon: "home",
    featured: true,
    title: { en: "Anfitrião — Short-Term Rental Management", pt: "Anfitrião — Gestão de Alojamento Local" },
    summary: {
      en: "SaaS platform for Portuguese short-term rental (Alojamento Local) hosts: Airbnb and Booking.com in one calendar, properties, bookings and guests in one place, online check-in and the SIBA guest report ready before arrival.",
      pt: "Plataforma SaaS para anfitriões de Alojamento Local: Airbnb e Booking.com num só calendário, propriedades, reservas e hóspedes num único lugar, check-in online e o boletim do SIBA pronto antes da chegada.",
    },
    tags: ["Next.js", "Supabase", "Vercel", "AI-assisted Development"],
    url: "https://anfitrioes.pt",
    problem: {
      en: "Hosts juggle several booking platforms, spreadsheets and the Portuguese legal paperwork (such as the SIBA guest report) for every stay.",
      pt: "Os anfitriões gerem várias plataformas de reservas, folhas de cálculo e a burocracia legal portuguesa (como o boletim do SIBA) em cada estadia.",
    },
    objective: {
      en: "Centralize the whole operation in one product built for Portuguese law — less tabs, less paperwork.",
      pt: "Centralizar toda a operação num único produto feito para a lei portuguesa — menos separadores, menos papelada.",
    },
    features: [
      { en: "Unified calendar for Airbnb and Booking.com", pt: "Calendário unificado Airbnb e Booking.com" },
      { en: "Portuguese compliance (SIBA guest report)", pt: "Conformidade portuguesa (boletim do SIBA)" },
      { en: "Online guest check-in", pt: "Check-in online dos hóspedes" },
      { en: "Revenue and expense tracking", pt: "Registo de receitas e despesas" },
      { en: "Properties, bookings and guests in one place", pt: "Propriedades, reservas e hóspedes num único lugar" },
      { en: "Subscription plans (Trial, Starter, Pro, Business)", pt: "Planos de subscrição (Trial, Starter, Pro, Empresa)" },
    ],
    role: { en: "Product concept, development and publication.", pt: "Conceito do produto, desenvolvimento e publicação." },
    aiUsage: {
      en: "LLMs used as a development accelerator; product decisions, architecture, review and validation done by me.",
      pt: "LLMs usados como acelerador de desenvolvimento; decisões de produto, arquitetura, revisão e validação feitas por mim.",
    },
    gallery: [{ src: null, alt: { en: "Anfitrião landing page", pt: "Página inicial do Anfitrião" } }],
  },
  {
    slug: "roberta-c-cakes",
    kind: "digital",
    status: "published",
    icon: "cake",
    title: { en: "Roberta C Cakes", pt: "Roberta C Cakes" },
    summary: {
      en: "Website for a celebration-cake atelier in Amora, Seixal — wedding, christening and milestone cakes designed from scratch, with a clear ordering journey and personalised consultation.",
      pt: "Website para um atelier de bolos de celebração em Amora, Seixal — bolos de casamento, batizado e datas marcantes desenhados de raiz, com um percurso de encomenda claro e consulta personalizada.",
    },
    tags: ["Next.js", "Supabase", "Vercel", "AI-assisted Development"],
    url: "https://robertaccakes.pt",
    problem: {
      en: "A small artisan business needed a premium online presence that showcases its work and turns visitors into consultation requests.",
      pt: "Um negócio artesanal precisava de uma presença online premium que mostrasse o seu trabalho e transformasse visitas em pedidos de consulta.",
    },
    features: [
      { en: "Services by occasion (weddings, christenings, birthdays, corporate)", pt: "Serviços por ocasião (casamentos, batizados, aniversários, empresas)" },
      { en: "Transparent pricing section", pt: "Secção de preços transparente" },
      { en: "Ordering process: consultation, mood board, tasting, booking, delivery", pt: "Processo de encomenda: consulta, mood board, degustação, reserva, entrega" },
      { en: "FAQ and contact / consultation request", pt: "FAQ e pedido de contacto / consulta" },
      { en: "SEO-oriented structure for local search", pt: "Estrutura orientada a SEO para pesquisa local" },
    ],
    role: { en: "Design, development and publication.", pt: "Design, desenvolvimento e publicação." },
    aiUsage: {
      en: "LLMs used to accelerate development and content structure; decisions and review done by me.",
      pt: "LLMs usados para acelerar o desenvolvimento e a estrutura de conteúdos; decisões e revisão feitas por mim.",
    },
    gallery: [{ src: null, alt: { en: "Roberta C Cakes homepage", pt: "Página inicial Roberta C Cakes" } }],
  },
  {
    slug: "patrao-mor-amora",
    kind: "digital",
    status: "published",
    icon: "anchor",
    title: { en: "Patrão Mor Amora — Nautical School", pt: "Patrão Mor Amora — Escola Náutica" },
    summary: {
      en: "Website for a DGRM-certified nautical school: an entry hub for the two schools (Amora and Oeiras) and a full site for the Amora unit, with its courses and contacts.",
      pt: "Website para uma escola náutica certificada pela DGRM: um hub de entrada para as duas escolas (Amora e Oeiras) e um site completo para a unidade da Amora, com cursos e contactos.",
    },
    tags: ["Next.js", "Supabase", "Vercel", "AI-assisted Development"],
    url: "https://patrao-mor-amora.vercel.app",
    features: [
      { en: "Hub page to choose between the Amora and Oeiras schools", pt: "Página hub para escolher entre as escolas da Amora e de Oeiras" },
      { en: "Course presentation for the Amora unit", pt: "Apresentação dos cursos da unidade da Amora" },
      { en: "Local SEO with structured data (LocalBusiness / EducationalOrganization)", pt: "SEO local com dados estruturados (LocalBusiness / EducationalOrganization)" },
      { en: "Security headers and cookie consent", pt: "Cabeçalhos de segurança e consentimento de cookies" },
    ],
    role: { en: "Design, development and publication.", pt: "Design, desenvolvimento e publicação." },
    aiUsage: {
      en: "LLM-assisted development, with human review of structure, content and SEO.",
      pt: "Desenvolvimento assistido por LLMs, com revisão humana da estrutura, conteúdos e SEO.",
    },
    gallery: [{ src: null, alt: { en: "Patrão Mor hub page", pt: "Página hub Patrão Mor" } }],
  },
  {
    slug: "sabados",
    kind: "digital",
    status: "development",
    icon: "car",
    title: { en: "Sábados — Private Chauffeur (Luxury)", pt: "Sábados — Motorista Privado (Luxo)" },
    summary: {
      en: "Premium website for a private chauffeur service that runs exclusively on Saturdays — transfers, events and private experiences in a Tesla Model Y driven by the host — with services, the booking journey and an availability request.",
      pt: "Website premium para um serviço de motorista privado exclusivamente aos sábados — transfers, eventos e experiências privadas num Tesla Model Y conduzido pelo próprio anfitrião — com serviços, percurso de reserva e pedido de disponibilidade.",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "AI-assisted Development"],
    previewUrl: "https://sabados-alpha.vercel.app",
    featured: true,
    features: [
      { en: "Three service formats: transfer, discovery day, custom day", pt: "Três formatos de serviço: transfer, dia de descoberta, dia à medida" },
      { en: "Four-step booking journey", pt: "Percurso de reserva em quatro passos" },
      { en: "Availability request and direct contact", pt: "Pedido de disponibilidade e contacto direto" },
      { en: "Saturday date picker (Europe/Lisbon time zone), with unit tests", pt: "Seletor de sábados (fuso Europe/Lisbon), com testes unitários" },
      { en: "Request assembled on the device and sent by WhatsApp — no backend, no stored data", pt: "Pedido montado no dispositivo e enviado por WhatsApp — sem backend nem dados guardados" },
      { en: "Illustrative Creative Commons photos with author credits; vehicle and host photos only real ones", pt: "Fotografias ilustrativas Creative Commons com crédito do autor; carro e anfitrião só com fotografias reais" },
    ],
    gallery: [
      { src: "/images/projects/sabados-hero.webp", alt: { en: "Home: “Private chauffeur, on Saturdays”", pt: "Início: «Motorista privado, ao sábado»" } },
      { src: "/images/projects/sabados-experiencias.webp", alt: { en: "Service formats, with an illustrative photo", pt: "Formatos de serviço, com fotografia ilustrativa" } },
      { src: "/images/projects/sabados-pedido.webp", alt: { en: "Availability request with the Saturday picker", pt: "Pedido de disponibilidade com o seletor de sábados" } },
    ],
    aiUsage: {
      en: "LLM-assisted development; content and final details still being completed.",
      pt: "Desenvolvimento assistido por LLMs; conteúdos e detalhes finais ainda em conclusão.",
    },
  },
  {
    slug: "faresniper",
    kind: "digital",
    status: "development",
    previewUrl: "https://luxeradar.vercel.app",
    icon: "radar",
    title: { en: "FareSniper — AI Travel Deal Radar", pt: "FareSniper — Radar de Viagens com IA" },
    summary: {
      en: "Web app concept that monitors flight and hotel prices, detects price drops and scores each deal, with a dashboard, saved deals and alerts.",
      pt: "Aplicação web que monitoriza preços de voos e hotéis, deteta quedas de preço e atribui um score a cada oportunidade, com dashboard, favoritos e alertas.",
    },
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui", "Vercel", "LLMs"],
    features: [
      { en: "Deals dashboard and explore view", pt: "Dashboard de oportunidades e vista de exploração" },
      { en: "Opportunity score per deal", pt: "Score de oportunidade por deal" },
      { en: "Price history and price-drop detection", pt: "Histórico de preços e deteção de quedas" },
      { en: "Saved deals and alerts", pt: "Deals guardados e alertas" },
    ],
    aiUsage: {
      en: "Built with LLM assistance; the product is an exploration of data collection, scoring and alerting.",
      pt: "Construído com assistência de LLMs; o produto é uma exploração de recolha de dados, scoring e alertas.",
    },
  },
  {
    slug: "blocos",
    kind: "digital",
    status: "published",
    url: "https://blocos-rose.vercel.app",
    icon: "blocks",
    title: { en: "Blocos — Local-first Notes", pt: "Blocos — Notas Local-first" },
    summary: {
      en: "Notion-style pages and blocks editor that runs locally and keeps data private, installable as a PWA, with light and dark themes.",
      pt: "Editor de páginas e blocos ao estilo do Notion, que funciona localmente e mantém os dados privados, instalável como PWA, com tema claro e escuro.",
    },
    tags: ["Next.js", "TypeScript", "PWA", "Supabase", "AI-assisted Development"],
    features: [
      { en: "Pages and blocks editing", pt: "Edição de páginas e blocos" },
      { en: "Local, private storage", pt: "Armazenamento local e privado" },
      { en: "Installable PWA", pt: "PWA instalável" },
      { en: "Light / dark theme", pt: "Tema claro / escuro" },
    ],
  },
  {
    slug: "cryptobot",
    kind: "digital",
    status: "prototype",
    icon: "bot",
    featured: true,
    personal: true,
    title: { en: "CryptoBot — Trading Strategy Research", pt: "CryptoBot — Investigação de Estratégias de Trading" },
    summary: {
      en: "Python research project that tests crypto trading strategies with backtests, out-of-sample validation and paper trading in the cloud. The honest outcome: no strategy showed a net edge after costs, so no real money was used.",
      pt: "Projeto de investigação em Python que testa estratégias de trading em criptomoedas com backtests, validação fora da amostra e paper trading na nuvem. O resultado honesto: nenhuma estratégia mostrou vantagem líquida depois de custos, por isso não se usou dinheiro real.",
    },
    tags: ["Python", "pandas", "pytest", "PostgreSQL", "Supabase", "Vercel"],
    problem: {
      en: "Most trading bots are judged on gross backtest returns. Fees, minimum order sizes, failed legs and overfitting make many of them lose money in reality.",
      pt: "A maioria dos bots de trading é avaliada pelo retorno bruto do backtest. Comissões, mínimos de ordem, pernas falhadas e sobreajuste fazem muitos deles perder dinheiro na realidade.",
    },
    objective: {
      en: "Only move a strategy towards real money if it beats costs out of sample, under a written risk policy.",
      pt: "Só avançar uma estratégia para dinheiro real se vencer os custos fora da amostra, segundo uma política de risco escrita.",
    },
    architecture: [
      { label: { en: "Data", pt: "Dados" }, nodes: ["Exchange API (ccxt)", "Prices & funding rates"] },
      { label: { en: "Research", pt: "Investigação" }, nodes: ["Python · pandas", "Train / validation / OOS"] },
      { label: { en: "Paper trading", pt: "Paper trading" }, nodes: ["Supabase (PostgreSQL)", "pg_cron every 5 min"] },
      { label: { en: "Monitoring", pt: "Acompanhamento" }, nodes: ["Vercel page", "Read-only access"] },
    ],
    features: [
      { en: "Backtests of 8 strategies with gross-vs-net screening against trading costs", pt: "Backtests de 8 estratégias com triagem bruto-vs-líquido face aos custos de negociação" },
      { en: "Delta-neutral funding-rate carry tested on 8 assets", pt: "Carry delta-neutro de funding rates testado em 8 ativos" },
      { en: "Paper trading in the cloud with exchange minimums, step sizes and failed-leg handling", pt: "Paper trading na nuvem com mínimos da corretora, passos de preço e tratamento de pernas falhadas" },
      { en: "Accounting with a verified identity and an automated daily exit report", pt: "Contabilidade com identidade verificada e relatório diário automático" },
    ],
    results: {
      en: "0 of 8 strategies passed the risk policy; the carry strategy showed no net edge in 2025–2026. The project stopped before real money — the expected outcome of a rigorous process, not an unfinished one.",
      pt: "0 de 8 estratégias passaram a política de risco; o carry não mostrou vantagem líquida em 2025–2026. O projeto parou antes do dinheiro real — o resultado esperado de um processo rigoroso, não um projeto por acabar.",
    },
    role: { en: "Individual project — research, code and cloud deployment.", pt: "Projeto individual — investigação, código e publicação na nuvem." },
    aiUsage: {
      en: "Developed with AI assistance (Claude) for code and analysis; risk rules and go/no-go decisions are mine.",
      pt: "Desenvolvido com apoio de IA (Claude) no código e na análise; as regras de risco e as decisões de avançar ou parar são minhas.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsOf(kind: ProjectKind) {
  const rank = (p: Project) => (p.alsoIn === kind ? 3 : p.status === "published" ? 0 : p.status === "professional" ? 0 : 1);
  return projects.filter((p) => p.kind === kind || p.alsoIn === kind).sort((a, b) => rank(a) - rank(b));
}

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
