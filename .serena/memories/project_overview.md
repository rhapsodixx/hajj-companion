# Patuna Coklat-B Hajj Companion

## Purpose

Offline-first PWA for Indonesian hajj pilgrims (jamaah) on the Patuna Coklat-B Hajj 2026 package (Bus 18/19/20/21). Tells first-time pilgrims exactly what to do, where, and when — even without internet in Mina or Arafah. All UI in Bahasa Indonesia; Arabic only for du'a, niat, and address cards.

## Target Users

Age 45–65, medium smartphone literacy, anxious about ritual correctness. The app must make them feel held, not entertained.

## Ship Date

2026-05-09 (manasik day, ICE BSD). 26-day Hajj period: 2026-05-11 → 2026-06-05.

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (runes mode forced) — `svelte@^5.55`
- **Language:** TypeScript (strict) — `typescript@^6.0`
- **Runtime:** Bun >=1.3.0
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, no config file) — `tailwindcss@^4.2`
- **Fonts:** Self-hosted via `@fontsource` — Inter, Source Serif 4, Noto Naskh Arabic
- **Adapter:** `@sveltejs/adapter-cloudflare` — Cloudflare Pages
- **PWA:** `vite-plugin-pwa` with `injectManifest` (Workbox)
- **Linting:** ESLint + Prettier
- **Testing:** None configured yet

## Architecture — Three Layers

1. **Home (Now/Next):** Default screen. Current activity, countdown, climate strip, phase ribbon.
2. **Ritual Guide:** Active on 7 high-stakes days. Read-only walkthrough with Arabic niat, step-by-step. No checklists.
3. **Reference:** 26-day itinerary, contacts, du'a library, guides, climate.

## 7 Itinerary Phases

`arrival` → `madinah-to-makkah` → `makkah` → `ash-shishah-prep` → `rukun` → `post-hajj` → `departure`

## Data Architecture — Static JSON, No API

All data bundled at build time from JSON files. No database, no API routes, no server-side data fetching.

Pattern: `src/lib/types/*.ts` → type definitions, `src/lib/data/*.json` → raw data, `src/lib/data/*.ts` → typed exports + accessor functions.

Four data domains: `itinerary`, `dua`, `climate`, `contacts`.

## Deploy Target

Cloudflare Pages via `wrangler`.
