import { cases } from "@/lib/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const did = [
  "Built a premium membership offer",
  "Produced 3D visuals",
  "Launched a content strategy to drive urgency and sales",
  "Created a social media and email marketing strategy",
];

export default function Work() {
  return (
    <section id="work" data-nav="dark" className="bg-charcoal px-4 py-28 text-ivory md:px-8 md:py-44">
      <p className="eyebrow mb-8 text-ivory/70">Results</p>
      <Reveal as="h2" className="display-lg max-w-[14ch]">
        Work that moves <span className="serif text-orange">the numbers.</span>
      </Reveal>

      {/* Featured: May One */}
      <div className="mt-20 grid gap-14 md:mt-32 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow text-ivory/70">May One</p>
          <p className="display-xl mt-4 text-orange">
            <CountUp to={30} prefix="$" suffix="K+" />
          </p>
          <Reveal as="p" className="display-md mt-2">
            in <span className="serif">30 days.</span>
          </Reveal>
        </div>

        <div className="space-y-10 md:col-span-6">
          <div>
            <h3 className="eyebrow mb-3 text-ivory/70">The challenge</h3>
            <Reveal as="p" className="body-lg">
              The founder was preparing to move into a new space, but monthly revenue had stalled at $8K to $10K. To fund the clinic relocation she needed to more than double that quickly, and without ads.
            </Reveal>
          </div>

          <div>
            <h3 className="eyebrow mb-3 text-ivory/70">What we did</h3>
            <ul className="border-t border-ivory/20">
              {did.map((d) => <li key={d} className="border-b border-ivory/20 py-3">{d}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-3 text-ivory/70">The results</h3>
            <dl className="border-t border-ivory/20">
              <div className="flex justify-between border-b border-ivory/20 py-3"><dt>From premium offers</dt><dd className="font-semibold">$19,690</dd></div>
              <div className="flex justify-between border-b border-ivory/20 py-3"><dt>From drop ins and recurring services</dt><dd className="font-semibold">$11,000</dd></div>
              <div className="flex justify-between py-3 text-orange"><dt className="font-semibold">Total</dt><dd className="font-semibold">$30,690</dd></div>
            </dl>
          </div>
        </div>
      </div>

      {/* More work */}
      <div className="mt-28 grid gap-px bg-ivory/20 md:mt-40 md:grid-cols-3">
        {cases.map((c, i) => (
          <article key={c.client} className="group flex min-h-[340px] flex-col justify-between bg-charcoal p-6 transition-colors duration-500 hover:bg-orange hover:text-charcoal md:p-8">
            <div>
              <p className="eyebrow text-ivory/70 transition-colors group-hover:text-charcoal/80">{String(i + 1).padStart(2, "0")} / {c.kind}</p>
              <h3 className="display-md mt-4">{c.client}</h3>
            </div>
            <div>
              {c.stat && (
                <p className="mb-3 text-5xl font-medium tracking-tight">{c.stat} <span className="text-base font-normal text-ivory/70 transition-colors group-hover:text-charcoal/80">{c.statLabel}</span></p>
              )}
              <p className="text-ivory/80 transition-colors group-hover:text-charcoal">{c.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
