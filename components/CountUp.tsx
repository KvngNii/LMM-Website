"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export default function CountUp({ to, prefix = "", suffix = "", duration = 1.8, format = (n: number) => Math.round(n).toLocaleString("en-US"), className = "" }: {
  to: number; prefix?: string; suffix?: string; duration?: number; format?: (n: number) => string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    registerGsap();
    const el = ref.current; if (!el) return;
    const write = (n: number) => { el.textContent = `${prefix}${format(n)}${suffix}`; };
    if (prefersReducedMotion()) { write(to); return; }
    write(0);
    const o = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(o, {
        n: to, duration, ease: "power3.out", onUpdate: () => write(o.n),
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, prefix, suffix, duration]);
  return <span ref={ref} className={className} aria-label={`${prefix}${format(to)}${suffix}`}>{`${prefix}${format(to)}${suffix}`}</span>;
}
