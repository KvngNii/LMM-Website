# LMM website: project handoff

This file gives Claude Code everything it needs to continue the build. Read it fully before changing anything.

## 1. What this project is

A new marketing website for LMM (La’vitta Marketing Management, also LMM Africa, domain lavittamm.com). It replaces the current Squarespace site. The owner is Nii Hammond (Partner and Director of Operations at LMM). The goal is a site that matches the look, feel, motion and responsiveness of https://www.tinywins.com, rebuilt with LMM branding and content.

Status: first working version is built, builds cleanly, and has been checked in a headless browser at 390, 768, 1440 and 1920 pixel widths with no console errors and no horizontal overflow. It has not been tested on real devices, in Safari or Firefox, or with a performance audit.

## 2. Run it

    npm install
    npm run dev        # http://localhost:3000
    npm run build
    npm start

Node 22 and npm 10 were used. If you run `next start` in the background while testing, rebuild only after stopping it, otherwise the page will request chunks that no longer exist.

## 3. Stack

- Next.js 15 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 (CSS first config in `app/globals.css`, no tailwind.config file)
- GSAP 3.13 with ScrollTrigger and SplitText (SplitText is free from 3.13)
- Lenis 1.3 for smooth scroll, driven by the GSAP ticker
- `next/image` for photos, plain `img` for the PNG logos

## 4. Hard rules from the owner

1. Fonts: only Manrope and FreightDisp Pro (registered as "Freight Disp Pro"). Never add another family.
2. May One case study headline must read "$30K+ in 30 Days". Evidence: $19,690 from premium offers plus $11,000 from drop ins and recurring services equals $30,690. Do not reintroduce the old "200 percent revenue growth in 45 days" line unless the owner asks.
3. The store and cart stay. LMM will sell books.
4. A booking link must exist. The real URL is not supplied yet.
5. Team: Loren, Nii, Chris, Elikem, AY. Chris is the person previously labelled Atiemo in the Drive file name. Dalene has left and must not appear.
6. Writing style for any copy or reports: no hyphens in prose, no em dashes, conversational and direct, no cliches. Write "in house", "full service", "long term" without hyphens. Do not use the tagline "Forged, not found."
7. Be upfront about limits. Never invent content, figures, contact details or links. Use a clearly marked placeholder instead.

## 5. Brand system

Colours (from the LMM brand guide):

    --color-charcoal: #191919   primary dark
    --color-ivory:    #F8F6F3   background
    --color-orange:   #E68A42   accent
    --color-stone:    #C8C4BE   supporting neutral

Typography:
- Manrope is primary (weights loaded: 400, 500, 600, 700, 800).
- FreightDisp Pro is the secondary serif, used as italic accent words in headings (Book Italic 400 italic is the main one). Other loaded files: Book Regular 400, Medium 500, Semibold Italic 600, Black 900.
- Fonts live in `public/fonts` as WOFF2 converted from the owner’s desktop TTFs. The owner has no web licence for FreightDisp Pro. Flag this before launch.

Contrast rule (calculated, worth re checking with a tool):
- Orange on charcoal is about 6.8:1, good for text.
- Charcoal on orange is about 6.8:1, good for text and buttons.
- Orange on ivory is about 2.4:1 and fails. So orange text appears only on charcoal sections. On ivory sections the italic serif accent is charcoal. Buttons on orange use charcoal text, never white (white on orange is about 2.6:1).

Logo rules from the guide: no stretching, squeezing, wrapping, drop shadows, gradients, recolouring, busy backgrounds or unapproved containers. Use the white (ivory) or monochrome version on dark backgrounds and keep clear space from edges.

Voice lines already used from brand materials: "The Most Beautiful Thing You Can Build Is Clarity", "Born to Create, Built to Evolve", "Strategy makes beauty last", "In house marketing, without the overhead".

## 6. File map

    app/
      layout.tsx          fonts preload, js class, providers, Nav, CartDrawer, main (z 10) and Footer
      page.tsx            home: Hero, Statement, CostSection, Services, FullReveal, Work, TeamCarousel, StoreTeaser, CTA
      store/page.tsx      store page using StoreGrid
      globals.css         font faces, brand tokens (@theme), type scale, buttons, helpers
      icon.png            favicon (orange icon on charcoal)
    components/
      SmoothScroll.tsx    Lenis plus GSAP ticker sync (skipped for reduced motion)
      Nav.tsx             pill nav, hides on scroll down, flips colours over dark sections, mobile menu
      Hero.tsx            word swap headline, intro, parallax phone image
      Reveal.tsx          line mask reveal and fade variant
      Parallax.tsx        oversized wrapper that drifts up to 34px
      CountUp.tsx         number count up on scroll
      Statement.tsx, CostSection.tsx, Services.tsx, FullReveal.tsx, Work.tsx,
      TeamCarousel.tsx, StoreTeaser.tsx, CTA.tsx, Footer.tsx
      CartProvider.tsx    cart state with localStorage persistence (guarded by try and catch)
      CartDrawer.tsx      slide in cart, stops Lenis while open
      StoreGrid.tsx, ProductCover.tsx
    lib/
      site.ts             booking URL, email, Instagram, nav links (TODO(LMM) markers)
      products.ts         sample books (TODO(LMM))
      content.ts          hero words, cost roles, services, case cards, team
      gsap.ts             plugin registration and prefersReducedMotion helper
      lenis.ts            Lenis singleton and scrollToHash
    public/
      fonts/              WOFF2 files
      logos/              27 named logo PNGs (1200px or 900px wide) plus icon only crops
      team/               loren, nii, chris, elikem, ay (webp, 1400px long edge)
      img/                phone-clarity, stationery, born-to-create (brand mockups, webp)

Search the repo for `TODO(LMM)` to find every placeholder.

## 7. Motion specification (measured from tinywins.com, then adapted)

Smooth scroll: Lenis with lerp 0.1 on the document, wired as `lenis.on("scroll", ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.

Line reveal (`Reveal.tsx`): SplitText type lines with masks, lines start at yPercent 110, 0.7s, ease power3.out, stagger 0.06s, trigger when the element top reaches 80 percent of the viewport, plays once. Fade variant: opacity 0 and y 24 to rest, 0.9s. Descender padding is added to the SplitText masks (0.14em) so g, p and y do not clip. Elements start hidden through `html.js .reveal { visibility: hidden }` and are shown once split.

Hero word swap (`Hero.tsx`): four words in masks, letters split, hold 4.3s, swap 0.6s with power3.inOut, 32ms stagger between letters, exit to yPercent minus 105 and enter from plus 105, first swap about 5.7s after load. The h1 carries an aria label with the full phrase and the animated copy is aria hidden.

Parallax (`Parallax.tsx`): inner wrapper inset minus 34px minus 46px, will change transform, vertical travel from minus 34 to plus 34 with scrub.

Full screen image reveal (`FullReveal.tsx`): clip path from inset(14% 24% 14% 24% round 4px) to inset(0), image scale 1.21 to 1 and yPercent minus 10 to 0, scrubbed from "top 85%" to "top 5%".

Services stepper (`Services.tsx`): sticky stage inside a wrapper of height 100vh plus (steps minus 1) times 400px. Active step is floor of progress times steps. Active title charcoal, others charcoal at 25 percent. Image and copy cross fade. Below 768px it becomes a plain stack with no pinning.

Team carousel (`TeamCarousel.tsx`): sticky stage, 520px of scroll per person. Per frame it rewrites width, height, x and opacity. Base card 435 by 580, size ratio 0.62 per step to the right (capped at four steps), the card ahead of the viewer narrows to zero and fades as it leaves. Name and role swap with masked translate. Below 768px it becomes a vertical grid.

Reveal footer (`Footer.tsx`): `position: sticky; bottom: 0; z-index: 0` after a `main` that is `relative z-10` with an opaque ivory background. This is why `main` must keep its background.

Nav (`Nav.tsx`): 48px tall pill, 16px inset, 6 percent charcoal fill with 42px backdrop blur, 4px radius. Hides on scroll down after 120px, returns on scroll up. Sections tagged `data-nav="dark"` flip it to ivory text through ScrollTrigger.

Reduced motion: Lenis is not started, reveals show immediately, hero shows the first word only, CSS transitions are shortened.

Unverified on the reference site (so not copied): hover states beyond basics, the footer WebGL canvas, and the exact intro timing. TinyWins uses one three.js canvas in the footer. This build does not include any WebGL.

## 8. Content source of truth

- Services and pricing: LMM 2026 Service Offerings Brochure (Ghana). Prices shown on the site are only the three starting prices: complete rebrand $3,500, social media and content from $2,000 a month, documentary from $4,000.
- In house cost comparison (shown in CostSection): Strategist $3,000 to $6,000, Social Media Manager $2,000 to $4,000, Content Creator $2,500 to $5,000, Designer $1,500 to $3,000, Ads Manager $1,000 to $3,000, Email Specialist $1,000 to $2,500, total $11,000 to $23,500 a month.
- Case studies: May One (featured), One Africa crowdfunding for Repaired Nations ($11K+ in 40 days), A Holy Culture Christmas album campaign, Madam Lucy Gari rebranding, documentary and website.
- Team roles: Loren La’Vitta Founder and CEO, Nii Hammond Partner and Director of Operations, Chris Creative Director, Elikem Director of Brand Voice, AY Multimedia Specialist.

## 9. Assets and where the originals live

Google Drive (owner’s account) folder "Rebrand Website assets", id `19Gb7ooS8Roh15WPdcms6BfQRgILYbDEr`, contains:
- `Logos/PNG` (id `1Veb3kzf_jUwQKnDZ7z9DKOsf9l71aZ4S`): files 1 to 27 plus PATTERN.png, all about 4400px wide with transparent backgrounds. Names used in `public/logos`:
  - 1 to 5 La’vitta horizontal (orange with ivory text, orange with charcoal text, ivory, charcoal, orange)
  - 6 to 10 LMM Africa horizontal (same colourways)
  - 11 to 15 La’vitta stacked
  - 16 to 20 La’vitta three line lockup
  - 21 to 25 circular badge
  - 26 and 27 LMM Africa wordmark without the icon (ivory, charcoal)
- `Logos/JPG` (id `14Dp0YxWZ2uueMo30LNG5-I9SVH4MiyHb`): JPG versions 1 to 15.
- `Assets` (id `1e1gOtxy8Nacc829Wwd9UDhCFzVEE_DRG`): brand mockups (L1 to L18, SM1 to SM4, letterhead, business cards). Only L1 (phone), L9 (stationery) and SM1 (quote card) are used. The others have not been reviewed.
- `Staff Images` (id `15SjrmhIhj6oHsqaBprPQziTDvlcGiP_K`): Loren, Nii, AY, Elikem and Atiemo (Chris). No photo exists for Dalene, who has left.
- `Font` (id `1QYa8elhLEruCWognALr1RZ7Wa5ONd6ef`): Manrope and FreightDispPro desktop TTFs.

No SVG logos exist. The icon only logos in `public/logos/icon-*.png` were cropped from the stacked versions. Vectorising the icon would give sharper favicons and nav marks.

## 10. Open items

1. Booking URL: set `bookingUrl` in `lib/site.ts`. Until then the buttons point at `#book`.
2. Real books: titles, authors, prices, cover images in `lib/products.ts`. Replace `ProductCover` with real images.
3. Payments: Checkout in `CartDrawer.tsx` does nothing. Ask which provider (Paystack or Stripe are the likely choices), then build checkout and order confirmation.
4. Public contact details and social links: `site.email` and `site.instagram` are empty, so the footer hides them.
5. FreightDisp Pro web licence: confirm or buy before launch.
6. Services section visuals reuse three brand mockups. Replace with real client work or photography when available.
7. Madam Lucy Gari case card: the brochure slide for it had May One text pasted in by mistake. The card currently has generic copy only. Ask for the correct copy.
8. Cost figure conflict: the old site used a $30,000 figure and the brochure shows $11,000 to $23,500 a month. The new site uses the brochure figures. Confirm.
9. Hero imagery: the hero uses a brand mockup. The owner may supply a better hero photo.

## 11. Suggested next steps

- Performance and accessibility pass: Lighthouse, keyboard navigation through nav, drawer and stepper, focus management when the cart opens, screen reader check of the swapping headline and the pinned sections.
- Test in Safari and Firefox, and on real iPhone and Android devices (sticky plus pinned sections and backdrop blur are the usual trouble spots).
- Add `sitemap`, `robots`, Open Graph image, and structured data for the organisation.
- Add a contact or enquiry form if the owner wants one in addition to booking.
- Consider an optional footer WebGL moment to mirror the reference, only if it can be done without hurting performance.
- Deploy (Vercel is the natural fit), connect the lavittamm.com domain, and set up redirects from old Squarespace URLs.
- Replace the sample store with real data, ideally from a small CMS or a JSON file the team can edit.

## 12. Gotchas

- `main` in `layout.tsx` must stay `relative z-10` with an ivory background, or the reveal footer shows through.
- The cart drawer calls `lenis.stop()` while open and its scroll area has `data-lenis-prevent`. Keep both.
- `Reveal` hides text with CSS until JavaScript splits it. A `noscript` rule restores visibility.
- ScrollTrigger instances inside components are created in effects and cleaned up in the effect return. Keep that pattern so route changes between `/` and `/store` do not leak triggers.
- Pinned sections use `window.matchMedia("(min-width: 768px)")` and rebuild on change. Keep the mobile fallbacks in step with the desktop content.
- Lenis does not need to be started inside `ScrollTrigger.scrollerProxy` because it scrolls the document itself.
- Do not add fonts through `next/font`. The site uses local WOFF2 files with `font-display: swap` and preloads three of them.
