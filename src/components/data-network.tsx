"use client";

import { useEffect, useRef } from "react";

/**
 * Discreet "data flow" animation: drifting nodes, faint links and small packets
 * travelling between them. Pauses off-screen / in background tabs and renders a
 * single static frame when the user prefers reduced motion.
 */
export function DataNetwork({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    type Packet = { a: number; b: number; t: number; speed: number };
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const LINK = 150;

    const colors = () => {
      const s = getComputedStyle(document.documentElement);
      return { a: s.getPropertyValue("--accent").trim() || "#4d8dff", b: s.getPropertyValue("--accent-2").trim() || "#22d3ee" };
    };
    let palette = colors();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(24, (w * h) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.8,
      }));
      packets = [];
    }

    function hex(c: string, alpha: number) {
      if (c.startsWith("#") && c.length === 7) {
        const n = parseInt(c.slice(1), 16);
        return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
      }
      return c;
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      // links
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx!.strokeStyle = hex(palette.a, (1 - d / LINK) * 0.22);
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
            if (!reduced && packets.length < 14 && Math.random() < 0.0009) {
              packets.push({ a: i, b: j, t: 0, speed: 0.006 + Math.random() * 0.01 });
            }
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx!.fillStyle = hex(palette.a, 0.7);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      // packets
      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx!.fillStyle = hex(palette.b, 0.95);
        ctx!.shadowColor = palette.b;
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    function loop() {
      if (visible && !document.hidden) frame();
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduced) frame();
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) frame();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      palette = colors();
      if (reduced) frame();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
