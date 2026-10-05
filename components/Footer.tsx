import Link from "next/link";
import { nav, site } from "@/lib/site";

/** Reveal footer: sticky to the bottom of the viewport underneath the page, uncovered as the page scrolls away. */
export default function Footer() {
  return (
    <footer data-nav="dark" className="sticky bottom-0 z-0 flex min-h-[100svh] flex-col justify-between gap-16 bg-charcoal px-4 pb-8 pt-20 text-ivory md:px-8">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <img src="/logos/lavitta-stacked-ivory.png" alt="La’vitta Marketing Management" className="w-[min(280px,60vw)]" />
        </div>
        <div className="grid grid-cols-2 gap-10 md:col-span-6">
          <div>
            <p className="eyebrow mb-4 text-ivory/60">Explore</p>
            <ul className="space-y-2">
              {nav.map((n) => (<li key={n.href}><Link href={n.href} className="link-u text-lg">{n.label}</Link></li>))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-ivory/60">Get in touch</p>
            <ul className="space-y-2 text-lg">
              <li><a href={site.bookingUrl} className="link-u">Book a call</a></li>
              {site.email && <li><a href={`mailto:${site.email}`} className="link-u">{site.email}</a></li>}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <p className="display-lg max-w-[16ch]">Strategy makes beauty <span className="serif text-orange">last.</span></p>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/20 pt-6 text-sm text-ivory/70">
          <span>© {new Date().getFullYear()} La’vitta Marketing Management. LMM Africa.</span>
          <span>Ghana</span>
        </div>
      </div>
    </footer>
  );
}
