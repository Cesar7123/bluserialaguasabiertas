# Blu — Agent Instructions

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |

No test, lint, typecheck, or format commands exist. No CI. No pre-commit hooks.

## Stack

- **Vite 6** + **React 18** + **TypeScript** (no `tsconfig.json` — Vite uses built-in settings)
- **Tailwind CSS v4** — configured via `@theme inline` in `src/styles/theme.css`, **not** a `tailwind.config` file
- **React Router DOM v7** — 2 routes: `/` (LandingPage), `/event/:eventId` (EventPage)
- **`@` alias** → `src/` (set in `vite.config.ts` — do not remove `react()` or `tailwindcss()` plugins)
- **No state management** — all local `useState`

## Style

- **Animation:** Tailwind utilities + `tw-animate-css` (used via `animate-in/out`, `animate-accordion-*`). `motion` v12 is installed but unused.
- **Icons:** `lucide-react`
- **Class merge:** `cn()` utility in `src/app/components/ui/utils.ts` (clsx + tailwind-merge)
- **UI:** shadcn-style components hand-rolled on Radix UI primitives (under `src/app/components/ui/`)
- **Notifications:** `sonner` toast library
- **Language:** es-MX (Spanish Mexico) — all UI copy, SEO meta, structured data

## CSS Layering

`src/styles/index.css` imports in order:
1. `fonts.css` (empty — no custom fonts loaded)
2. `tailwind.css` (Tailwind + tw-animate-css)
3. `theme.css` (custom properties, dark mode, base typography)

Dark mode toggled via `.dark` class on `<html>`.

## Architecture

- **Entry:** `src/main.tsx` → renders `<App />`
- **Routing:** `src/app/App.tsx` — `BrowserRouter` with `Routes`, `<Navigation />` rendered globally above routes
- **Pages:** `src/app/pages/` — LandingPage (full single-page scroll with sections: home, about, swims, partners, sponsors, contact), EventPage (individual event detail)
- **Data:** `src/app/data/events.ts` — `SwimEvent[]` array, looked up by `id` param
- **Nav scroll:** `scrollIntoView({ behavior: 'smooth' })` — cross-page nav via `window.location.href = '/#sectionId'`

## Deployment

- **Target:** Vercel (SPA) — `vercel.json` rewrites all paths to `/index.html`
- PWA manifest at `/public/manifest.json` (icons not yet created)
- SEO structured data (JSON-LD) embedded in `index.html`: SportsOrganization, EventSeries, SportsEvent
- Domain placeholder: `bluserialaguasabiertas.com` — update before going live

## Known Gaps

- No favicon files exist yet
- OG/Twitter images referenced in meta tags do not exist
- All 4 events share the same Unsplash hero image URL
