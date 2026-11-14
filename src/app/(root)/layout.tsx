import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Vasco Henriques — Senior BI Consultant & Data Engineer",
  robots: { index: false, follow: true },
};

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className="dark">
      <body>{children}</body>
    </html>
  );
}
