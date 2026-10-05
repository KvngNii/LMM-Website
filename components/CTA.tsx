import { site } from "@/lib/site";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="book" data-nav="light" className="bg-orange px-4 py-28 text-charcoal md:px-8 md:py-44">
      <Reveal as="h2" className="display-xl max-w-[12ch]">
        Ready to build a brand that <span className="serif">converts?</span>
      </Reveal>
      <div className="mt-12 flex flex-wrap items-center gap-6">
        {/* TODO(LMM): point this at the real booking page via lib/site.ts */}
        <a href={site.bookingUrl} className="btn btn-dark">Book a call</a>
        <p className="max-w-[36ch] text-lg font-medium tracking-tight">Tell us what you are building and we will tell you how we would grow it.</p>
      </div>
    </section>
  );
}
