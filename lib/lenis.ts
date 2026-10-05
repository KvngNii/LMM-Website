import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };
export const getLenis = () => instance;

/** Smooth scroll to a hash target (works with or without Lenis running). */
export function scrollToHash(hash: string, offset = 0) {
  const id = hash.replace(/^.*#/, "");
  const el = id ? document.getElementById(id) : null;
  if (!el) return false;
  if (instance) instance.scrollTo(el, { offset, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}
