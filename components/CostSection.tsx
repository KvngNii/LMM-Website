"use client";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { costRoles } from "@/lib/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function CostSection() {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion() || !list.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-row]", {
        opacity: 0, y: 28, duration: 0.8, ease: "power3.out", stagger: 0.09,
        scrollTrigger: { trigger: list.current, start: "top 80%", once: true },
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section data-nav="dark" className="bg-charcoal px-4 py-28 text-ivory md:px-8 md:py-44">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-8 text-ivory/70">The maths</p>
          <Reveal as="h2" className="display-lg">
            What it actually takes to <span className="serif text-orange">grow a brand.</span>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <ul ref={list} className="border-t border-ivory/20">
            {costRoles.map((r) => (
              <li key={r.role} data-row className="flex items-baseline justify-between gap-6 border-b border-ivory/20 py-5">
                <span className="text-lg font-medium tracking-tight md:text-2xl">{r.role}</span>
                <span className="text-lg text-ivory/75 md:text-2xl">{r.range}<span className="hidden text-ivory/50 sm:inline"> a month</span></span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ivory/70">Total to build it in house</p>
              <p className="display-md mt-2 text-orange">
                <CountUp to={11000} prefix="$" /> to <CountUp to={23500} prefix="$" />
                <span className="text-ivory/60"> a month</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 md:mt-40">
        <Reveal as="p" className="display-lg max-w-[18ch]">
          You don’t hire six people. You get <span className="serif text-orange">one team.</span>
        </Reveal>
      </div>
    </section>
  );
}
