"use client";
import { products } from "@/lib/products";
import { useCart } from "./CartProvider";
import ProductCover from "./ProductCover";

export default function StoreGrid() {
  const { add } = useCart();
  return (
    <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-28 md:grid-cols-3 md:gap-x-6">
      {products.map((p) => (
        <article key={p.id}>
          <ProductCover title={p.title} />
          <div className="mt-5 flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight">{p.title}</h2>
            <span className="text-lg">${p.price.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-sm text-charcoal/70">{p.author}</p>
          <p className="mt-3 max-w-[36ch] text-charcoal/80">{p.blurb}</p>
          {p.placeholder && <p className="mt-3 text-xs uppercase tracking-wider text-charcoal/50">Sample listing</p>}
          <button onClick={() => add(p.id)} className="btn btn-dark mt-5">Add to cart</button>
        </article>
      ))}
    </div>
  );
}
