"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { team } from "@/lib/content";
import Reveal from "./Reveal";

const BASE_W = 435;
const BASE_H = 580;
const RATIO = 0.62;
const PER_STEP = 520; // px of scroll per person

export default function TeamCarousel() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    registerGsap();
    const mq = window.matchMedia("(min-width: 768px)");
    let st: ScrollTrigger | undefined;
    let t = 0;

    const layout = (p: number) => {
      t = p;
      const s = stage.current; if (!s) return;
      const f = Math.min(1, (s.clientHeight * 0.92) / BASE_H, (s.clientWidth * 0.62) / BASE_W);
      const gap = 14 * f;
      let x = 0;
      team.forEach((_, i) => {
        const el = cards.current[i]; if (!el) return;
        const d = i - t;
        const k = d >= 0 ? Math.pow(RATIO, Math.min(d, 4)) : 1;
        const w = d < -1 ? 0 : d < 0 ? BASE_W * f * (1 + d) : BASE_W * f * k;
        const h = BASE_H * f * (d >= 0 ? k : 1);
        gsap.set(el, { x, width: w, height: h, opacity: d < 0 ? Math.max(0, 1 + d) : 1 });
        if (w > 0) x += w + gap;
      });
      const idx = Math.round(Math.min(team.length - 1, Math.max(0, t)));
      if (idx !== last.current) { last.current = idx; setActive(idx); }
    };

    const build = () => {
      st?.kill();
      if (!mq.matches || !wrap.current) return;
      layout(0);
      st = ScrollTrigger.create({
        trigger: wrap.current, start: "top top", end: "bottom bottom",
        onUpdate: (self) => layout(self.progress * (team.length - 1)),
        onRefresh: (self) => layout(self.progress * (team.length - 1)),
      });
    };
    build();
    const onResize = () => layout(t);
    mq.addEventListener("change", build);
    window.addEventListener("resize", onResize);
    return () => { mq.removeEventListener("change", build); window.removeEventListener("resize", onResize); st?.kill(); };
  }, []);

  return (
    <section id="team" data-nav="light" className="bg-ivory">
      <div className="px-4 pt-28 md:px-8 md:pt-44">
        <p className="eyebrow mb-8 text-charcoal/70">The team</p>
        <Reveal as="h2" className="display-lg max-w-[14ch]">
          The people behind <span className="serif">your brand.</span>
        </Reveal>
      </div>

      {/* Desktop: pinned carousel driven by scroll */}
      <div ref={wrap} className="relative hidden md:block" style={{ height: `calc(100vh + ${(team.length - 1) * PER_STEP}px)` }}>
        <div className="sticky top-0 grid h-screen grid-cols-12 gap-8 px-8 pb-12 pt-24">
          <div className="col-span-4 flex flex-col justify-end">
            <p className="eyebrow mb-3 text-charcoal/70">Meet</p>
            <div className="relative h-[1.1em] overflow-hidden text-[clamp(2.4rem,4.4vw,4.6rem)] font-medium leading-none tracking-[-0.04em]">
              {team.map((m, i) => (
                <span key={m.name} className="absolute inset-x-0 top-0 block whitespace-nowrap transition-transform duration-[700ms] ease-out-expo" style={{ transform: `translateY(${i === active ? 0 : i < active ? -110 : 110}%)` }} aria-hidden={i !== active}>
                  {m.name}
                </span>
              ))}
            </div>
            <div className="relative mt-4 h-7 overflow-hidden text-lg text-charcoal/75">
              {team.map((m, i) => (
                <span key={m.name} className="absolute inset-x-0 top-0 block transition-transform duration-[700ms] ease-out-expo" style={{ transform: `translateY(${i === active ? 0 : i < active ? -110 : 110}%)` }} aria-hidden={i !== active}>
                  {m.role}
                </span>
              ))}
            </div>
            <div className="mt-8 flex h-3 items-end gap-1.5" aria-hidden="true">
              {team.map((m, i) => (
                <span key={m.name} className={`block w-[2px] transition-all duration-500 ${i === active ? "h-3 bg-charcoal" : "h-1.5 bg-charcoal/30"}`} />
              ))}
            </div>
          </div>

          <div ref={stage} className="relative col-span-8 overflow-hidden">
            {team.map((m, i) => (
              <div key={m.name} ref={(el) => { cards.current[i] = el; }} className="absolute bottom-0 left-0 overflow-hidden rounded-[4px] bg-charcoal">
                <Image src={m.img} alt={`${m.name}, ${m.role}`} fill sizes="440px" className="object-cover" style={{ objectPosition: m.pos }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="grid gap-10 px-4 pb-24 pt-12 sm:grid-cols-2 md:hidden">
        {team.map((m) => (
          <article key={m.name}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-charcoal">
              <Image src={m.img} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: m.pos }} />
            </div>
            <h3 className="mt-4 text-2xl font-medium tracking-tight">{m.name}</h3>
            <p className="text-charcoal/75">{m.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
