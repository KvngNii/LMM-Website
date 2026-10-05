import Reveal from "./Reveal";

const values = [
  { t: "People before profit", d: "We choose long term impact over quick wins, and we decline work that does not match our values." },
  { t: "Foundation first", d: "We start with the clarity work that shapes the brand, then build the campaigns, content and systems on top of it." },
  { t: "We stay through the growth", d: "We operate like your in house marketing department, so you can lead and build without distraction." },
];

export default function Statement() {
  return (
    <section data-nav="light" className="bg-ivory px-4 py-28 md:px-8 md:py-44">
      <p className="eyebrow mb-8 text-charcoal/70">Who we are</p>
      <Reveal as="h2" className="display-md max-w-[22ch] md:max-w-[26ch]">
        La’vitta Marketing Management is a full service creative team for the person who is called to something and builds with <span className="serif">intention.</span>
      </Reveal>

      <div className="mt-24 grid gap-10 md:mt-40 md:grid-cols-3 md:gap-8">
        {values.map((v, i) => (
          <Reveal key={v.t} variant="fade" delay={i * 0.08} className="border-t border-charcoal/20 pt-6">
            <h3 className="text-xl font-semibold tracking-tight">{v.t}</h3>
            <p className="mt-3 max-w-[34ch] text-charcoal/75">{v.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
