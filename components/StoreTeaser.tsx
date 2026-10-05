import Link from "next/link";
import { products } from "@/lib/products";
import Reveal from "./Reveal";
import ProductCover from "./ProductCover";

export default function StoreTeaser() {
  return (
    <section data-nav="light" className="bg-stone px-4 py-28 md:px-8 md:py-44">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="eyebrow mb-8 text-charcoal/75">The store</p>
          <Reveal as="h2" className="display-lg max-w-[14ch]">
            Books to help you build with <span className="serif">intention.</span>
          </Reveal>
        </div>
        <Link href="/store" className="btn btn-dark">Visit the store</Link>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 md:mt-24 md:grid-cols-3 md:gap-6">
        {products.map((p) => (
          <Link key={p.id} href="/store" className="group block">
            <ProductCover title={p.title} />
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-semibold tracking-tight">{p.title}</h3>
              <span className="text-charcoal/75">${p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
