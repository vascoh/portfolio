import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { themeScript } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = { title: "404 — Vasco Henriques", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark ${GeistSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
          <div aria-hidden className="bg-grid absolute inset-0" />
          <div className="relative">
            <p className="font-mono text-7xl font-bold text-gradient">404</p>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg">Page not found · Página não encontrada</h1>
            <p className="mt-3 text-fg-muted">The page you are looking for does not exist or was moved.</p>
            <div className="mt-8 flex justify-center gap-3">
              <a href="/en/" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg">Home</a>
              <a href="/pt/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg">Início</a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
