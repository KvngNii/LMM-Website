# LMM website

Next.js 15 (App Router), Tailwind v4, GSAP (ScrollTrigger + SplitText), Lenis smooth scroll.

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Things still to fill in (search the repo for TODO(LMM))

- `lib/site.ts`: real booking link (`bookingUrl`), public email, Instagram.
- `lib/products.ts`: real books, prices and cover images. Current entries are samples.
- `components/CartDrawer.tsx`: connect a payment provider (Paystack or Stripe) to the Checkout button.
- Fonts in `public/fonts` are WOFF2 conversions of the desktop files. Confirm a web licence for FreightDisp Pro before launch.
- `lib/content.ts`: services visuals reuse three brand mockups. Swap in real client work when available.

## Motion map

- Smooth scroll: `components/SmoothScroll.tsx` (Lenis lerp 0.1, driven by the GSAP ticker).
- Line reveal: `components/Reveal.tsx` (SplitText masked lines, 0.7s power3.out, 0.06s stagger, plays once at top 80%).
- Hero word swap: `components/Hero.tsx` (4.3s hold, 0.6s swap, 32ms letter stagger).
- Parallax images: `components/Parallax.tsx` (travel capped at 34px).
- Services stepper: `components/Services.tsx` (400px of scroll per step, sticky stage).
- Full screen image reveal: `components/FullReveal.tsx`.
- Pinned team carousel: `components/TeamCarousel.tsx` (0.62 size ratio per step).
- Reveal footer: `components/Footer.tsx` (sticky bottom, under the page).
- Reduced motion is respected everywhere.
