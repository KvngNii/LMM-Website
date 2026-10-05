"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { heroWords } from "@/lib/content";
import { site } from "@/lib/site";
import Parallax from "./Parallax";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const swap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    const reduce = prefersReducedMotion();
    const words = Array.from(swap.current?.querySelectorAll<HTMLElement>("[data-word]") ?? []);
    const chars = words.map((w) => Array.from(w.querySelectorAll<HTMLElement>("[data-c]")));
    if (!words.length) return;

    let call: gsap.core.Tween | undefined;
    const ctx = gsap.context(() => {
      // Resting state: first word in place, the rest parked below their masks.
      chars.slice(1).forEach((c) => gsap.set(c, { yPercent: 105 }));
      if (reduce) return;

      // Intro: lines rise out of their masks, then the supporting copy fades up.
      gsap.set("[data-hero-line]", { yPercent: 110 });
      gsap.set("[data-hero-fade]", { opacity: 0, y: 24 });
      const intro = gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } });
      intro.to("[data-hero-line]", { yPercent: 0, duration: 1, stagger: 0.09 })
           .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.55");

      // Word swap: hold 4.3s, swap 0.6s, 32ms stagger between letters.
      let i = 0;
      const loop = () => {
        const cur = chars[i];
        const nxt = chars[(i + 1) % chars.length];
        const tl = gsap.timeline({ onComplete: () => { i = (i + 1) % chars.length; call = gsap.delayedCall(4.3, loop); } });
        tl.to(cur, { yPercent: -105, duration: 0.6, ease: "power3.inOut", stagger: 0.032 }, 0)
          .fromTo(nxt, { yPercent: 105 }, { yPercent: 0, duration: 0.6, ease: "power3.inOut", stagger: 0.032 }, 0.06);
      };
      call = gsap.delayedCall(4.3 + 1.4, loop);
    }, root);

    return () => { call?.kill(); ctx.revert(); };
  }, []);

  const widest = heroWords.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <section ref={root} data-nav="dark" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal px-4 pb-10 pt-28 text-ivory md:px-8">
      <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <h1 className="display-xl" aria-label={`We build brands that ${heroWords.join(", ")}.`}>
            <span aria-hidden="true" className="block">
              <span className="block overflow-hidden pb-[0.08em]"><span data-hero-line className="block">We build</span></span>
              <span className="block overflow-hidden pb-[0.08em]"><span data-hero-line className="block">brands that</span></span>
              <span className="block overflow-hidden pb-[0.18em]">
                <span data-hero-line className="block">
                  <span ref={swap} className="serif relative inline-block overflow-hidden pb-[0.16em] pr-[0.12em] align-top text-orange">
                    <span className="invisible">{widest}.</span>
                    {heroWords.map((w) => (
                      <span key={w} data-word className="absolute left-0 top-0 whitespace-nowrap">
                        {(w + ".").split("").map((ch, k) => (
                          <span key={k} data-c className="inline-block">{ch}</span>
                        ))}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </span>
          </h1>

          <div className="mt-10 flex max-w-xl flex-col gap-8">
            <p data-hero-fade className="body-lg text-ivory/80">
              In house marketing, without the overhead. One team for your strategy, brand, content and growth, built for founders, creatives and changemakers.
            </p>
            <div data-hero-fade className="flex flex-wrap gap-3">
              <a href={site.bookingUrl} className="btn btn-orange">Book a call</a>
              <a href="#work" className="btn btn-ghost-light">See the results</a>
            </div>
          </div>
        </div>

        <div data-hero-fade className="md:col-span-4">
          <Parallax className="aspect-[4/5] w-full">
            <Image src="/img/phone-clarity.webp" alt="A phone showing the LMM message: the most beautiful thing you can build is clarity." fill priority sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
