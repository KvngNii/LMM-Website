"use client";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { getLenis } from "@/lib/lenis";

export default function CartDrawer() {
  const { lines, total, open, setOpen, setQty, remove } = useCart();

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop(); else l?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); getLenis()?.start(); };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-charcoal/50 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-ivory text-charcoal transition-transform duration-[600ms] ease-out-expo ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-xl font-semibold tracking-tight">Your cart</h2>
          <button onClick={() => setOpen(false)} className="eyebrow link-u" aria-label="Close cart">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
          {lines.length === 0 ? (
            <p className="body-lg pt-6 text-charcoal/70">Nothing here yet. Browse the store to add a book.</p>
          ) : (
            <ul className="divide-y divide-charcoal/10">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <p className="font-semibold tracking-tight">{l.title}</p>
                    <p className="text-sm text-charcoal/70">${l.price.toFixed(2)}</p>
                    <button onClick={() => remove(l.id)} className="mt-2 text-sm underline underline-offset-4">Remove</button>
                  </div>
                  <div className="flex items-center gap-2" role="group" aria-label={`Quantity for ${l.title}`}>
                    <button className="h-9 w-9 rounded-[4px] bg-charcoal/[0.06]" onClick={() => (l.qty > 1 ? setQty(l.id, l.qty - 1) : remove(l.id))} aria-label="Decrease">−</button>
                    <span className="w-6 text-center font-semibold" aria-live="polite">{l.qty}</span>
                    <button className="h-9 w-9 rounded-[4px] bg-charcoal/[0.06]" onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-charcoal/10 px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-charcoal/70">Subtotal</span>
            <span className="text-xl font-semibold tracking-tight">${total.toFixed(2)}</span>
          </div>
          {/* TODO(LMM): connect a payment provider (for example Paystack or Stripe) and route this button to checkout. */}
          <button className="btn btn-dark w-full justify-center" disabled={lines.length === 0} style={{ opacity: lines.length ? 1 : 0.4 }}>
            Checkout
          </button>
          <p className="mt-3 text-xs text-charcoal/60">Payments are not connected yet. This button becomes live once a payment provider is added.</p>
        </div>
      </aside>
    </div>
  );
}
