"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

/** Frame that clips an oversized inner wrapper, which drifts up to 34px as you scroll past. */
export default function Parallax({ className = "", travel = 34, children }: { className?: string; travel?: number; children: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion() || !frame.current || !wrap.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(wrap.current, { y: -travel }, {
        y: travel, ease: "none",
        scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, frame);
    return () => ctx.revert();
  }, [travel]);

  return (
    <div ref={frame} className={`px-frame ${className}`}>
      <div ref={wrap} className="px-wrap">{children}</div>
    </div>
  );
}
