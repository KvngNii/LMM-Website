import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import StoreGrid from "@/components/StoreGrid";

export const metadata: Metadata = {
  title: "Store | LMM Africa",
  description: "Books from the LMM team.",
};

export default function StorePage() {
  return (
    <section data-nav="light" className="min-h-[100svh] bg-ivory px-4 pb-28 pt-40 md:px-8 md:pb-44">
      <p className="eyebrow mb-8 text-charcoal/70">The store</p>
      <Reveal as="h1" className="display-xl max-w-[10ch]">
        Books for <span className="serif">builders.</span>
      </Reveal>
      <Reveal as="p" className="body-lg mt-8 max-w-[44ch] text-charcoal/75">
        Practical reading for founders, creatives and changemakers who build with intention.
      </Reveal>
      <StoreGrid />
    </section>
  );
}
