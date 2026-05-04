# Blu — Design System

> **Brand:** Blu Serial Aguas Abiertas  
> **Vibe:** Open water swimming — ocean, sun, Baja California Sur  
> **Language:** Spanish (es-MX)

---

## 1. Color Palette

### Brand / Ocean Colors

| Token | Hex | OKLCH | Usage |
|---|---|---|---|
| `blue-600` | `#2563EB` | `oklch(0.546 0.245 262.88)` | Primary accent: icons, stat numbers, headings, button hover |
| `blue-900` | `#1E3A8A` | — | Hero overlay gradients |
| `blue-800` | `#1E40AF` | — | Manifest theme-color, deep brand |
| `blue-100` | `#DBEAFE` | — | Icon container backgrounds, card highlights |
| `blue-50` | `#EFF6FF` | — | Section background, gradient blends |
| `cyan-50` | `#ECFEFF` | — | Gradient partner with blue-50 in office hours card |
| `blue-400` | `#60A5FA` | — | Social media hover (Facebook) |
| `blue-300` | `#93C5FD` | — | Social media hover (Twitter) |
| `pink-400` | `#F472B6` | — | Social media hover (Instagram) |

### Semantic Theme Tokens (`src/styles/theme.css`)

#### Light Mode

| Token | Value |
|---|---|
| `--background` | `#ffffff` |
| `--foreground` | `oklch(0.145 0 0)` |
| `--primary` | `#030213` |
| `--primary-foreground` | `oklch(1 0 0)` |
| `--secondary` | `oklch(0.95 0.0058 264.53)` |
| `--secondary-foreground` | `#030213` |
| `--muted` | `#ececf0` |
| `--muted-foreground` | `#717182` |
| `--accent` | `#e9ebef` |
| `--accent-foreground` | `#030213` |
| `--destructive` | `#d4183d` |
| `--destructive-foreground` | `#ffffff` |
| `--border` | `rgba(0, 0, 0, 0.1)` |
| `--input-background` | `#f3f3f5` |
| `--switch-background` | `#cbced4` |
| `--ring` | `oklch(0.708 0 0)` |
| `--radius` | `0.625rem` |
| `--chart-1` | `oklch(0.646 0.222 41.116)` |
| `--chart-2` | `oklch(0.6 0.118 184.704)` |
| `--chart-3` | `oklch(0.398 0.07 227.392)` |
| `--chart-4` | `oklch(0.828 0.189 84.429)` |
| `--chart-5` | `oklch(0.769 0.188 70.08)` |

#### Dark Mode

| Token | Value |
|---|---|
| `--background` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.985 0 0)` |
| `--primary-foreground` | `oklch(0.205 0 0)` |
| `--secondary` | `oklch(0.269 0 0)` |
| `--muted` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.708 0 0)` |
| `--accent` | `oklch(0.269 0 0)` |
| `--destructive` | `oklch(0.396 0.141 25.723)` |
| `--border` | `oklch(0.269 0 0)` |
| `--ring` | `oklch(0.439 0 0)` |

### Shark SVG Colors (illustration, `/public/shark.svg`)

| Color | Hex |
|---|---|
| Dorsal navy | `#3c5790` |
| Deep navy | `#34497d` |
| Belly / water | `#97ddf8` |

### Neutrals (Tailwind gray scale, used throughout)

`gray-50`, `gray-100`, `gray-600`, `gray-700`, `gray-800`, `gray-900`, `white`, `black/50`, `black/70`

---

## 2. Typography

### Current State
- **No custom fonts loaded** — `src/styles/fonts.css` is empty
- Falls back to **Tailwind system font stack** (`ui-sans-serif, system-ui, ...`)
- Font weights: `--font-weight-medium: 500`, `--font-weight-normal: 400`
- Base size: `--font-size: 16px`

### Recommended Font Pairing for a Swim / Ocean Page

| Role | Font | Why |
|---|---|---|
| **Headings / Display** | **Playfair Display** (Google Fonts) | Elegant serif — evokes premium, editorial ocean magazine feel. Pairs well with waves & water motifs. |
| **Body / UI** | **Inter** (Google Fonts) | Clean, highly legible sans-serif. Excellent for Spanish text, small UI labels, navigation. |

#### Alternative — Monotone Sans (lighter, more athletic)

| Role | Font |
|---|---|
| **Headings** | **Poppins** (weight 600–700) — sporty, round, welcoming |
| **Body** | **Inter** (weight 400–500) — neutral high readability |

#### Current Type Scale (Tailwind defaults, can extend)

| Token | Size |
|---|---|
| `--text-xs` | `0.75rem` (12px) |
| `--text-sm` | `0.875rem` (14px) |
| `--text-base` | `1rem` (16px) |
| `--text-lg` | `1.125rem` (18px) |
| `--text-xl` | `1.25rem` (20px) |
| `--text-2xl` | `1.5rem` (24px) |
| `text-3xl` | `1.875rem` (30px) |
| `text-4xl` | `2.25rem` (36px) |
| `text-5xl` | `3rem` (48px) |
| `text-7xl` | `4.5rem` (72px) |

---

## 3. Animation & Motion

### Current Animations in Use

| Animation | Where | Implementation |
|---|---|---|
| `transition-colors` | Nav links, footer links, social icons, table rows | Tailwind utility |
| `transition-shadow` | Card hover (`.hover:shadow-lg`) | Tailwind utility |
| `transition-transform duration-300` | Card image zoom on hover (`.hover:scale-105`) | Tailwind utility |
| `group-hover:translate-x-1` | Button chevron arrow | Tailwind utility |
| `transition-all` | Buttons, form inputs, sidebar, switches | Tailwind utility |
| `animate-pulse` | Skeleton loading | Tailwind utility |
| `animate-caret-blink` | Input-OTP cursor | `tw-animate-css` |
| `animate-in` / `animate-out` | Radix UI: dialog, sheet, popover, dropdown, select, etc. | `tw-animate-css` |
| `animate-accordion-up/down` | Accordion | `tw-animate-css` |
| Smooth scroll | Nav anchor links | `scrollIntoView({ behavior: 'smooth' })` |

### Library Available
- **`tw-animate-css`** v1.3.8 — already imported in `tailwind.css`
- **`motion`** v12.23.24 (framer-motion successor) — installed as dependency, **not yet used**

### Recommended Swim-Page Animations

#### Hero / Entry (motion library)

| Element | Animation |
|---|---|
| Hero wave icon | `fadeIn + scaleUp` on mount |
| Hero heading | `fadeInUp` (stagger 0.15s after icon) |
| Hero subtitle | `fadeInUp` (stagger 0.3s) |
| Hero buttons | `fadeInUp` (stagger 0.45s) |

#### Scroll-Triggered (IntersectionObserver + motion)

| Element | Animation |
|---|---|
| Section headings | `fadeInUp` when scrolled into view |
| Stat numbers (300+, 24°C, etc.) | Count-up animation on viewport enter |
| Event cards | Staggered `fadeInUp` (staggerChildren: 0.1s) |
| Partner / sponsor cards | `fadeIn` with subtle `scale(0.95 → 1)` |

#### Micro-interactions

| Element | Animation |
|---|---|
| Nav link hover | Underline slide-in (pseudo-element `scaleX(0→1)`) |
| Button hover | Subtle `brightness(1.1)` + shadow lift |
| Card hover | `translateY(-4px)` + shadow deepen |
| Event image | `scale(1 → 1.05)` on card hover |
| Social icons | `scale(1 → 1.15)` + brand color transition |

#### Water / Ocean Motions (optional, decorative)

| Element | Technique |
|---|---|
| Wave divider between sections | SVG wave path with `motion` `x` oscillation (gentle horizontal drift) |
| Hero background | Parallax scroll (`translateY` at 0.5x speed) via `motion` `useScroll` + `useTransform` |
| Glow on wave icon | `@keyframes pulse-opacity` (CSS) — subtle 4s cycle |

### Motion Timing Defaults

| Property | Value |
|---|---|
| Duration (standard) | 300ms |
| Duration (enter) | 500–700ms |
| Duration (exit) | 200–300ms |
| Easing (default) | `ease-out` (enter), `ease-in` (exit) |
| Easing (motion) | `[0.4, 0, 0.2, 1]` (Material decelerated) |
| Stagger delay | 100ms between children |

---

## 4. Spacing & Layout

| Token | Value | Notes |
|---|---|---|
| Page max width | `max-w-7xl` (80rem / 1280px) | Content container |
| Section padding Y | `py-20` (5rem / 80px) | Standard section |
| Card padding | `p-8` (2rem / 32px) | Inner card spacing |
| Grid gap | `gap-8` (2rem / 32px) | Between cards |
| Border radius | `--radius: 0.625rem` (10px) | Cards, buttons, inputs |
| Icon container | `size-16` (64px) | Round icon wrappers |

---

## 5. Iconography

- **Library:** `lucide-react` (already in use)
- **Key icons:** `Waves`, `MapPin`, `Users`, `Award`, `Calendar`, `Ruler`, `TrendingUp`, `Heart`, `Mail`, `Phone`, `Facebook`, `Instagram`, `Twitter`, `ChevronRight`, `ArrowLeft`, `ExternalLink`
- **Icon sizes:** `size-4` (16px inline), `size-6` (24px), `size-8` (32px feature), `size-12` (48px hero), `size-16` (64px display), `size-20` (80px hero)
- **Icon containers:** `size-16 bg-blue-100 rounded-full` with `size-8 text-blue-600` icon inside

---

## 6. Imagery

- **Photo source:** Unsplash (Sea of Cortez / Baja California)
- **Style:** High-contrast ocean landscapes, golden hour, turquoise water
- **Overlay:** `bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-blue-900/60` on hero images
- **Mask / graphic:** Whale shark vector (`/public/shark.svg`) — navy + light blue tones
- **Card images:** 16:9 ratio (`h-64`), object-fit cover, zoom on hover

---

## 7. Implementation Notes

- All designs use **Tailwind CSS v4** with `@theme inline` directive in CSS (no `tailwind.config` file)
- Dark mode toggled via `.dark` class on `<html>`
- Add Google Fonts via `<link>` in `index.html` `<head>`, then declare `font-family` in `theme.css` or as Tailwind `@theme` font tokens
- For `motion` animations, install is done — just `import { motion } from 'motion/react'` in components
