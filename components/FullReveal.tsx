"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "./Reveal";

/** Full screen image that opens from an inset frame as it scrolls in (clip path, scale 1.21 to 1, drift -10% to 0). */
export default function FullReveal() {
  const sec = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sec.current, start: "top 85%", end: "top 5%", scrub: true };
      gsap.fromTo(frame.current, { clipPath: "inset(14% 24% 14% 24% round 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: st });
      gsap.fromTo(img.current, { scale: 1.21, yPercent: -10 }, { scale: 1, yPercent: 0, ease: "none", scrollTrigger: st });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} data-nav="dark" className="relative h-[100svh] min-h-[560px] bg-ivory">
      <div ref={frame} className="absolute inset-0 overflow-hidden bg-charcoal">
        <div ref={img} className="absolute inset-0 will-change-transform">
          <Image src="/img/stationery.webp" alt="LMM stationery, a phone and business cards laid out on dark slate." fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/10" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-12 text-ivory md:px-8 md:pb-16">
          <Reveal as="h2" className="display-lg max-w-[14ch]">
            Born to create, <span className="serif text-orange">built to evolve.</span>
          </Reveal>
          <Reveal as="p" className="body-lg mt-6 max-w-[44ch] text-ivory/85">
            Your brand isn’t just a logo. It’s a living story. At LMM, we don’t redesign, we rebirth.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
