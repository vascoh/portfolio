"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Step = { title: string; text: string; code: string };

const steps: Record<Locale, Step[]> = {
  en: [
    {
      title: "Measure",
      text: "Capture a baseline before touching anything: duration, CPU and logical reads.",
      code: "SET STATISTICS IO, TIME ON;\n\nEXEC dbo.usp_SalesReport @Year = 2024;",
    },
    {
      title: "Diagnose",
      text: "Read the actual execution plan. Typical suspects: scans on large tables, key lookups, spills, implicit conversions, non-sargable predicates.",
      code: "-- Non-sargable: function on the column\nWHERE YEAR(o.OrderDate) = @Year\n\n-- Plan: Clustered Index Scan (whole table)",
    },
    {
      title: "Optimize",
      text: "Rewrite the predicate so an index can be used, and support it with a covering index.",
      code: "WHERE o.OrderDate >= DATEFROMPARTS(@Year, 1, 1)\n  AND o.OrderDate <  DATEFROMPARTS(@Year + 1, 1, 1)\n\nCREATE INDEX IX_Orders_OrderDate\n  ON dbo.Orders (OrderDate) INCLUDE (CustomerId, Amount);",
    },
    {
      title: "Validate",
      text: "Compare results (they must be identical) and the before/after statistics. Only then deploy.",
      code: "-- Result parity check\nSELECT * FROM #before\nEXCEPT\nSELECT * FROM #after;  -- expect 0 rows",
    },
  ],
  pt: [
    {
      title: "Medir",
      text: "Capturar uma baseline antes de mexer em qualquer coisa: duração, CPU e logical reads.",
      code: "SET STATISTICS IO, TIME ON;\n\nEXEC dbo.usp_SalesReport @Year = 2024;",
    },
    {
      title: "Diagnosticar",
      text: "Ler o plano de execução real. Suspeitos habituais: scans em tabelas grandes, key lookups, spills, conversões implícitas, predicados não-sargable.",
      code: "-- Não-sargable: função sobre a coluna\nWHERE YEAR(o.OrderDate) = @Year\n\n-- Plano: Clustered Index Scan (tabela inteira)",
    },
    {
      title: "Otimizar",
      text: "Reescrever o predicado para permitir o uso de um índice, suportado por um índice de cobertura.",
      code: "WHERE o.OrderDate >= DATEFROMPARTS(@Year, 1, 1)\n  AND o.OrderDate <  DATEFROMPARTS(@Year + 1, 1, 1)\n\nCREATE INDEX IX_Orders_OrderDate\n  ON dbo.Orders (OrderDate) INCLUDE (CustomerId, Amount);",
    },
    {
      title: "Validar",
      text: "Comparar resultados (têm de ser idênticos) e as estatísticas antes/depois. Só então fazer deploy.",
      code: "-- Verificação de paridade de resultados\nSELECT * FROM #before\nEXCEPT\nSELECT * FROM #after;  -- esperado: 0 linhas",
    },
  ],
};

export function SqlDiagnosticsDemo({ lang }: { lang: Locale }) {
  const [i, setI] = useState(0);
  const s = steps[lang];
  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <p className="text-sm text-fg-muted">
        {lang === "en"
          ? "Illustrative walkthrough with a fictional schema — not client code."
          : "Exemplo ilustrativo com um esquema fictício — não é código de cliente."}
      </p>
      <div role="tablist" aria-label="Methodology" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {s.map((step, idx) => (
          <button
            key={step.title}
            role="tab"
            id={`sql-tab-${idx}`}
            aria-selected={i === idx}
            aria-controls="sql-panel"
            onClick={() => setI(idx)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors",
              i === idx ? "border-accent bg-accent/10 text-fg" : "border-border text-fg-muted hover:text-fg",
            )}
          >
            <span className={cn("grid size-6 place-items-center rounded-full font-mono text-xs", i === idx ? "bg-accent text-accent-fg" : "bg-surface-strong")}>
              {idx + 1}
            </span>
            {step.title}
          </button>
        ))}
      </div>
      <div id="sql-panel" role="tabpanel" aria-labelledby={`sql-tab-${i}`} className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <p className="text-sm leading-relaxed text-fg-muted">{s[i].text}</p>
        <pre className="overflow-x-auto rounded-xl border border-border bg-bg-elev p-4 font-mono text-xs leading-relaxed text-fg">
          <code>{s[i].code}</code>
        </pre>
      </div>
    </div>
  );
}
