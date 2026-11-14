"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
      <Moon className="size-[18px] dark:hidden" aria-hidden />
    </button>
  );
}

/** Inline script that runs before paint to avoid a theme flash. Dark is the default. */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})();`;
