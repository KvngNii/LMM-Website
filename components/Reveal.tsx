"use client";
import { createElement, useEffect, useRef } from "react";
import { gsap, SplitText, registerGsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  variant?: "lines" | "fade";
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

/** Line by line mask reveal (or a simple fade) that plays once when the element reaches 80% of the viewport. */
export default function Reveal({ as = "div", variant = "lines", delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.style.visibility = "visible"; return; }

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        if (variant === "fade") {
          el.style.visibility = "visible";
          gsap.from(el, {
            opacity: 0, y: 24, duration: 0.9, delay, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
          return;
        }
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            el.style.visibility = "visible";
            // Give descenders (g, p, y) room inside the clipping masks.
            (self.masks as HTMLElement[]).forEach((m) => { m.style.paddingBottom = "0.14em"; m.style.marginBottom = "-0.14em"; });
            return gsap.from(self.lines, {
              yPercent: 110, duration: 0.7, delay, ease: "power3.out", stagger: 0.06,
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
          },
        });
      }, el);
    });

    return () => { cancelled = true; ctx?.revert(); };
  }, [variant, delay]);

  return createElement(as, { ref, className: `reveal ${className}` }, children);
}
