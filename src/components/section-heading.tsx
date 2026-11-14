import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent", className)}>
      <span aria-hidden className="h-px w-6 bg-gradient-to-r from-accent to-accent-2" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  as: Tag = "h2",
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  as?: "h1" | "h2";
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "text-balance font-semibold tracking-tight text-fg",
          Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Tag>
      {text && <p className="mt-4 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">{text}</p>}
    </div>
  );
}

export function PageHeader(props: { eyebrow: string; title: string; text?: string }) {
  return (
    <header className="relative overflow-hidden border-b border-border pb-14 pt-32 sm:pt-40">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
      <div className="container-page relative fade-up">
        <SectionHeading as="h1" {...props} />
      </div>
    </header>
  );
}
