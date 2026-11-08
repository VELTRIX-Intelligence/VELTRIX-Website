# VELTRIX website

Three-page marketing site (Home, Products, Get in touch) plus Privacy and Terms, built to the
VELTRIX Website Plan and the `veltrix-design` system.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · GSAP · react-three-fiber · d3

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Hosting (GitHub Pages)

Every push to `master` runs `.github/workflows/deploy-pages.yml`, which builds the site as static
files (`output: 'export'`) and publishes it to
https://veltrix-intelligence.github.io/VELTRIX-Website/

- The workflow sets `NEXT_PUBLIC_BASE_PATH=/VELTRIX-Website`. Local dev leaves it empty, so the
  site still runs at http://localhost:3000/. If you add a custom domain, remove that line.
- The Formspree ID comes from the repository variable `FORMSPREE_ID`
  (Settings → Secrets and variables → Actions → Variables).
- Static export can't use server features (server actions, image optimisation, partial
  prerendering), so `cacheComponents` is off and images are unoptimised.

## Still to supply

| What | Where to change it |
|---|---|
| Formspree form ID | live site: repository variable `FORMSPREE_ID`; local dev: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ID` |
| Phone, LinkedIn, GitHub, X | `lib/site.ts` (currently shown as "Coming soon") |
| Reply time on the form's success message | `lib/site.ts` → `replyTime` |
| Real products (name, line, division, status, platforms, pricing, 1600×1000 screenshot, link) | `lib/products.ts` |
| Spline hero scene | export to `public/3d/`, set `HERO_SPLINE_SCENE` in `components/home/HeroVisual.tsx` |
| Legal details in [square brackets] | `app/privacy/page.tsx`, `app/terms/page.tsx` — drafts, have them reviewed |
| Favicon and 1200×630 social image | `app/icon.*`, `app/opengraph-image.*` |

## Components

| Plan component | File | Source |
|---|---|---|
| Pill Nav | `components/ui/PillNav.tsx` | React Bits, restyled |
| Staggered Menu | `components/ui/StaggeredMenu.tsx` | React Bits, restyled + focus trap |
| Gradual Blur | `components/ui/GradualBlur.tsx` | React Bits |
| Rotating Text | `components/ui/RotatingText.tsx` | React Bits |
| Scroll Reveal | `components/ui/ScrollReveal.tsx` | React Bits |
| Scroll Stack | `components/ui/ScrollStack.tsx` | React Bits, restyled |
| Spline Scene + Spotlight | `components/ui/SplineScene.tsx`, `Spotlight.tsx` | 21st.dev pattern; coded rings stand-in in `components/home/RingsScene.tsx` |
| Glass Blog Card → ProductCard | `components/products/ProductCard.tsx` | UI TripleD (MIT), adapted |
| Contact with Globe | `components/ui/GlobeWireframe.tsx` + `components/contact/*` | ScrollX UI (MIT), adapted |
| Spotlight Card | `components/ui/GlowCard.tsx` | **stand-in** — swap for the 21st.dev original |
| Halftone Wordmark Footer | `components/ui/HalftoneWordmark.tsx` | **stand-in** — swap for the 21st.dev original |
