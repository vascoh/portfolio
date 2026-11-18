"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Triggers the hero-style entrance once the block scrolls into view.
 * Progressive enhancement: content is only hidden after JavaScript marks the block as
 * "ready", so without JS (or before hydration) everything is visible.
 * Children opt in with `.anim` (fade-up) or `.anim-line` (masked line rise) and `--i` for stagger.
 */
export function InView({ children, className, threshold = 0 }: { children: ReactNode; className?: string; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Already on screen at load (deep link / reload mid-page): show immediately, no hide-then-show flash.
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.dataset.anim = "in";
      return;
    }
    el.dataset.anim = "ready";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.anim = "in";
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
