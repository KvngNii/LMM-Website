"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, registerGsap } from "@/lib/gsap";
import { services } from "@/lib/content";
import { getLenis } from "@/lib/lenis";
import Reveal from "./Reveal";

const STEP = 400; // px of scroll per step, matching the reference site

export default function Services() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    const mq = window.matchMedia("(min-width: 768px)");
    let st: ScrollTrigger | undefined;
    const build = () => {
      st?.kill();
      if (!mq.matches || !wrap.current) return;
      st = ScrollTrigger.create({
        trigger: wrap.current, start: "top top", end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(services.length - 1, Math.floor(self.progress * services.length));
          setActive(i);
        },
      });
    };
    build();
    mq.addEventListener("change", build);
    return () => { mq.removeEventListener("change", build); st?.kill(); };
  }, []);

  const goTo = (i: number) => {
    if (!wrap.current) return;
    const top = wrap.current.getBoundingClientRect().top + window.scrollY;
    const y = top + i * STEP + 4;
    const l = getLenis();
    if (l) l.scrollTo(y, { duration: 1.2 }); else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="services" data-nav="light" className="bg-ivory">
      <div className="px-4 pb-10 pt-28 md:px-8 md:pb-0 md:pt-44">
        <p className="eyebrow mb-8 text-charcoal/70">What we do</p>
        <Reveal as="h2" className="display-lg max-w-[16ch]">
          Everything your brand needs, <span className="serif">under one roof.</span>
        </Reveal>
      </div>

      {/* Desktop: pinned stepper, one step per 400px of scroll */}
      <div ref={wrap} className="relative hidden md:block" style={{ height: `calc(100vh + ${(services.length - 1) * STEP}px)` }}>
        <div className="sticky top-0 grid h-screen grid-cols-12 gap-8 px-8 py-20">
          <ol className="col-span-6 flex flex-col justify-center gap-1">
            {services.map((s, i) => (
              <li key={s.title}>
                <button
                  onClick={() => goTo(i)}
                  className={`display-md flex items-baseline gap-5 text-left transition-colors duration-500 ${i === active ? "text-charcoal" : "text-charcoal/25 hover:text-charcoal/50"}`}
                  aria-current={i === active}
                >
                  <span className="eyebrow w-8 shrink-0 translate-y-[-0.4em]">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>

          <div className="relative col-span-6 flex flex-col justify-center gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-charcoal">
              {services.map((s, i) => (
                <Image
                  key={s.title} src={s.image} alt="" fill sizes="50vw"
                  className={`object-cover transition-all duration-[900ms] ease-out-expo ${i === active ? "scale-100 opacity-100" : "scale-[1.08] opacity-0"}`}
                  style={{ objectPosition: s.pos }}
                />
              ))}
            </div>
            <div className="relative min-h-[210px]">
              {services.map((s, i) => (
                <div key={s.title} className={`absolute inset-0 transition-all duration-700 ease-out-expo ${i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`} aria-hidden={i !== active}>
                  <p className="body-lg max-w-[46ch]">{s.lead}</p>
                  <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-[0.95rem] text-charcoal/80">
                    {s.points.map((p) => <li key={p} className="border-t border-charcoal/15 py-2">{p}</li>)}
                  </ul>
                  {s.price && <p className="mt-4 inline-block rounded-[4px] bg-orange px-3 py-1.5 text-sm font-semibold text-charcoal">{s.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: simple stack, no pinning */}
      <div className="space-y-14 px-4 pb-24 md:hidden">
        {services.map((s, i) => (
          <article key={s.title}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-charcoal">
              <Image src={s.image} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: s.pos }} />
            </div>
            <p className="eyebrow mt-5 text-charcoal/70">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display-md mt-1">{s.title}</h3>
            <p className="body-lg mt-3 text-charcoal/80">{s.lead}</p>
            <ul className="mt-4 text-[0.95rem] text-charcoal/80">
              {s.points.map((p) => <li key={p} className="border-t border-charcoal/15 py-2">{p}</li>)}
            </ul>
            {s.price && <p className="mt-4 inline-block rounded-[4px] bg-orange px-3 py-1.5 text-sm font-semibold">{s.price}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
