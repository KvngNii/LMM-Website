"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { products } from "@/lib/products";

type Line = { id: string; qty: number };
type Action =
  | { type: "add"; id: string }
  | { type: "set"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "hydrate"; lines: Line[] };

function reducer(state: Line[], a: Action): Line[] {
  switch (a.type) {
    case "hydrate": return a.lines;
    case "add": {
      const ex = state.find((l) => l.id === a.id);
      return ex ? state.map((l) => (l.id === a.id ? { ...l, qty: l.qty + 1 } : l)) : [...state, { id: a.id, qty: 1 }];
    }
    case "set": return state.map((l) => (l.id === a.id ? { ...l, qty: Math.max(1, a.qty) } : l));
    case "remove": return state.filter((l) => l.id !== a.id);
  }
}

type CartCtx = {
  lines: (Line & { title: string; price: number })[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "lmm-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state, ready]);

  const add = useCallback((id: string) => { dispatch({ type: "add", id }); setOpen(true); }, []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: "set", id, qty }), []);
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);

  const value = useMemo<CartCtx>(() => {
    const lines = state
      .map((l) => {
        const p = products.find((x) => x.id === l.id);
        return p ? { ...l, title: p.title, price: p.price } : null;
      })
      .filter(Boolean) as CartCtx["lines"];
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
      open, setOpen, add, setQty, remove,
    };
  }, [state, open, add, setQty, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
