"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { nav, site } from "@/lib/site";
import { scrollToHash } from "@/lib/lenis";
import { useCart } from "./CartProvider";

export default function Nav() {
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    registerGsap();
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last;
      if (Math.abs(y - last) < 6) return;
      if (down && y > 120 && !hidden) { hidden = true; gsap.to(bar.current, { yPercent: -160, duration: 0.5, ease: "power3.out" }); }
      if (!down && hidden) { hidden = false; gsap.to(bar.current, { yPercent: 0, duration: 0.5, ease: "power3.out" }); }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Switch nav colours over dark sections.
  useEffect(() => {
    registerGsap();
    const timer = window.setTimeout(() => {
      const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-nav='dark']")).map((el) =>
        ScrollTrigger.create({
          trigger: el, start: "top 40px", end: "bottom 40px",
          onToggle: (self) => setDark(self.isActive),
        }),
      );
      // Initial state for the very first paint.
      const first = document.querySelector<HTMLElement>("[data-nav='dark']");
      if (first) setDark(first.getBoundingClientRect().top <= 40 && first.getBoundingClientRect().bottom >= 40);
      (bar as unknown as { _t?: ScrollTrigger[] })._t = triggers;
    }, 60);
    return () => {
      window.clearTimeout(timer);
      (bar as unknown as { _t?: ScrollTrigger[] })._t?.forEach((t) => t.kill());
    };
  }, [pathname]);

  useEffect(() => { setMenu(false); }, [pathname]);

  const onNav = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      setMenu(false);
      scrollToHash(href, -20);
    }
  };

  const light = dark || menu;
  const text = light ? "text-ivory" : "text-charcoal";

  return (
    <>
      <header
        ref={bar}
        className={`fixed left-4 right-4 top-4 z-[60] flex h-12 items-center justify-between rounded-[4px] px-3 backdrop-blur-[42px] transition-colors duration-500 ${text} ${menu ? "bg-transparent" : light ? "bg-ivory/10" : "bg-charcoal/[0.06]"}`}
        style={{ WebkitBackdropFilter: "blur(42px)" }}
      >
        <Link href="/" aria-label="LMM Africa home" className="relative block h-6 w-[100px]">
          <img src="/logos/lmm-africa-horizontal-charcoal.png" alt="" className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`} />
          <img src="/logos/lmm-africa-horizontal-ivory.png" alt="LMM Africa" className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={(e) => onNav(e, n.href)} className="link-u text-[0.92rem] font-medium tracking-tight">{n.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="link-u text-[0.92rem] font-medium tracking-tight" aria-label={`Open cart, ${count} items`}>
            Cart{count > 0 ? ` (${count})` : ""}
          </button>
          <a href={site.bookingUrl} className="hidden h-8 items-center rounded-[4px] bg-orange px-3 text-[0.85rem] font-semibold tracking-tight text-charcoal transition-colors hover:bg-ivory md:inline-flex">Book a call</a>
          <button className="text-[0.92rem] font-medium md:hidden" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="mobile-menu">
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] flex flex-col justify-end bg-charcoal px-4 pb-10 pt-24 text-ivory transition-[clip-path] duration-[700ms] ease-out-expo md:hidden ${menu ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)] pointer-events-none"}`}
        aria-hidden={!menu}
      >
        <ul className="space-y-1">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={(e) => onNav(e, n.href)} className="display-md block py-1">{n.label}</Link>
            </li>
          ))}
        </ul>
        <a href={site.bookingUrl} className="btn btn-orange mt-8 w-fit">Book a call</a>
      </div>
    </>
  );
}
