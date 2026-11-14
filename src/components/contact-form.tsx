"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, CircleAlert, Loader2, Send } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { site } from "@/content/site";

/**
 * Contact form for a static site (no backend of its own).
 * - `site.formEndpoint` set → POST JSON to it; success only on a 2xx reply.
 * - Not set → the message is prepared in the visitor's email app (mailto:) and the
 *   page never claims it was sent.
 * Anti-spam: honeypot field + minimum fill time.
 */
type Fields = { name: string; email: string; company: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields | "form", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({ dict }: { dict: Dictionary["contact"] }) {
  const [values, setValues] = useState<Fields>({ name: "", email: "", company: "", subject: dict.subjects[0], message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error" | "mailto">("idle");
  const endpoint = site.formEndpoint;
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function validate(v: Fields): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = dict.required;
    if (!v.email.trim()) e.email = dict.required;
    else if (!EMAIL.test(v.email.trim())) e.email = dict.invalidEmail;
    if (!v.message.trim()) e.message = dict.required;
    else if (v.message.trim().length < 20) e.message = dict.tooShort;
    return e;
  }

  function update<K extends keyof Fields>(key: K, value: string) {
    setValues((s) => ({ ...s, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(values);
    if (Date.now() - startedAt.current < 3000) e.form = dict.tooFast;
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    const data = new FormData(form);
    if (data.get("bot-field")) {
      setState("success"); // silently drop bots
      return;
    }
    if (!endpoint) {
      const to = site.contact.email ?? "";
      const body = [values.message.trim(), "", "—", values.name.trim(), values.email.trim(), values.company.trim()].filter((l, i) => i < 4 || l).join("\n");
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(`[${values.subject}] ${values.name.trim()}`)}&body=${encodeURIComponent(body)}`;
      setState("mailto");
      return;
    }
    if (state === "sending") return;
    setState("sending");
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 20000);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: values.name, email: values.email, company: values.company, subject: values.subject, message: values.message }),
        signal: ctrl.signal,
      }).finally(() => clearTimeout(timer));
      if (!res.ok) throw new Error(String(res.status));
      setState("success");
      setValues({ name: "", email: "", company: "", subject: dict.subjects[0], message: "" });
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div role="status" className="glass flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
        <CheckCircle2 className="size-10 text-emerald-500" aria-hidden />
        <p className="max-w-sm text-fg">{dict.success}</p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border bg-bg-elev px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <form name="contact" noValidate onSubmit={onSubmit} aria-busy={state === "sending"} className="glass rounded-2xl p-6 sm:p-8">
      <p className="hidden" aria-hidden>
        <label>
          Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={dict.name} error={errors.name} required>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(field, errors.name ? "border-rose-500" : "border-border")}
          />
        </Field>
        <Field id="email" label={dict.email} error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(field, errors.email ? "border-rose-500" : "border-border")}
          />
        </Field>
        <Field id="company" label={dict.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={cn(field, "border-border")}
          />
        </Field>
        <Field id="subject" label={dict.subject}>
          <select id="subject" name="subject" value={values.subject} onChange={(e) => update("subject", e.target.value)} className={cn(field, "border-border")}>
            {dict.subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field id="message" label={dict.message} error={errors.message} required className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(field, "resize-y", errors.message ? "border-rose-500" : "border-border")}
          />
        </Field>
      </div>

      {(errors.form || state === "error") && (
        <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {errors.form ?? dict.error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-xs text-fg-subtle">
          <p>{dict.privacy}</p>
          {!endpoint && <p>{dict.mailNote}</p>}
          {state === "mailto" && (
            <p role="status" className="text-fg-muted">
              {dict.mailDone}{" "}
              <a className="underline underline-offset-2 hover:text-fg" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
          )}
        </div>
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
          {state === "sending" ? dict.sending : endpoint ? dict.send : dict.mailOpen}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
        {required && (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
