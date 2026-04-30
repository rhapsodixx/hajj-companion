# CLAUDE.md — Patuna Coklat-B Hajj Companion

## Project Overview

Offline-first PWA for Indonesian hajj pilgrims (jamaah) on the Patuna Coklat-B Hajj 2026 package (Bus 18/19/20/21). Tells first-time pilgrims exactly what to do, where, and when — even without internet in Mina or Arafah. All UI in Bahasa Indonesia; Arabic only for du'a, niat, and address cards.

**Target users:** Age 45–65, medium smartphone literacy, anxious about ritual correctness. The app must make them feel held, not entertained.

**Ship date:** 2026-05-09 (manasik day, ICE BSD). 26-day Hajj period: 2026-05-11 → 2026-06-05.

**Full PRD:** `docs/ideas/patuna-coklat-b-hajj-companion.md`

## Tech Stack

| Layer     | Choice                                                | Version                                  |
| --------- | ----------------------------------------------------- | ---------------------------------------- |
| Framework | SvelteKit 2 + Svelte 5 (runes mode forced)            | `svelte@^5.55`                           |
| Language  | TypeScript (strict)                                   | `typescript@^6.0`                        |
| Runtime   | Bun                                                   | `>=1.3.0`                                |
| Styling   | Tailwind CSS v4 (`@tailwindcss/vite`, no config file) | `tailwindcss@^4.2`                       |
| Fonts     | Self-hosted via `@fontsource`                         | Inter, Source Serif 4, Noto Naskh Arabic |
| Adapter   | `@sveltejs/adapter-cloudflare`                        | Cloudflare Pages                         |
| PWA       | `vite-plugin-pwa` with `injectManifest`               | Workbox                                  |
| Linting   | ESLint + Prettier (see `.prettierrc`)                 |                                          |
| Testing   | None configured yet                                   |                                          |

## Commands

```bash
bun install              # install deps
bun run dev              # dev server
bun run build            # production build (runs wrangler types + vite build)
bun run preview          # preview Cloudflare build locally (use this to test PWA/Offline)
bun run check            # TypeScript + Svelte type checking
bun run lint             # Prettier check + ESLint
bun run format           # Auto-format all files
bun run deploy           # Build + deploy to Cloudflare Pages
```

## Architecture

### Three-Layer App Structure

1. **Layer 1 — Home (Now/Next):** Default screen. Shows current activity, next countdown, climate strip, phase ribbon. After-Maghrib mode surfaces "Persiapan Besok."
2. **Layer 2 — Ritual Guide:** Active on 7 high-stakes days (Hari 7, 15, 16, 17, 18, 19, 25). Read-only walkthrough with Arabic niat, Latin, Bahasa, step-by-step. No checklists — pilgrims can't tap during ritual.
3. **Layer 3 — Reference:** 26-day itinerary, contacts, du'a library, guides, climate.

### 7 Itinerary Phases

`arrival` → `madinah-to-makkah` → `makkah` → `ash-shishah-prep` → `rukun` → `post-hajj` → `departure`

Each phase has a dedicated color defined in CSS `@theme` as `--color-phase-*`.

### Data Architecture — Static JSON, No API

All data is bundled at build time from JSON files. No database calls, no API routes, no server-side data fetching.

```
src/lib/types/*.ts    → TypeScript type definitions
src/lib/data/*.json   → Raw static data
src/lib/data/*.ts     → Typed exports + lookup helpers (e.g., getDay(), getDuaByCategory())
```

Six data domains: `itinerary`, `dua`, `climate`, `contacts`, `ritual`, `supabase`. Each static domain follows the same pattern: JSON → typed cast → exported array + accessor functions. The `supabase` module provides optional runtime overrides.

**Date Safety:** Always use `new Date().toISOString().slice(0, 10)` for date comparisons to ensure consistency regardless of the user's device timezone (vital for JKT -> SAU transition).

Dynamic overrides (Supabase `daily_overrides`) are optional and non-blocking — every screen renders from bundled data first.

### Routing

```
src/routes/
  +layout.svelte              → Root: layout.css, favicon, UpdatePrompt, InstallPrompt
  layout.css                  → Global styles, @theme block, design tokens
  (app)/
    +layout.svelte            → App shell with BottomNav + pb-nav padding
    +page.svelte              → Home (Now/Next)
    itinerary/+page.svelte    → 26-day grouped list
    itinerary/[day]/+page.svelte → Daily detail
    dua/+page.svelte          → Du'a library
    more/+page.svelte         → "Lainnya" hub (links to contacts, guides, settings)
    more/contacts/+page.svelte → Emergency contacts
    more/guides/+page.svelte   → Ritual guides list
    more/settings/+page.svelte → Settings (dark mode, phase override)
  ritual/[guideId]/+page.svelte → Ritual walkthrough (outside app group — no bottom nav, immersive)
  admin/+page.svelte          → Admin override panel (dev/internal use)
  _design/+page.svelte        → Dev-only component gallery
  _debug/                     → Empty debug route (reserved)
```

No `+page.ts` or `+page.server.ts` load functions — all data is client-side from static JSON imports.

### PWA / Offline Strategy

- Service worker (`src/service-worker.ts`) uses `injectManifest` strategy.
- Precaches app shell + all bundled JSON + fonts + icons.
- Runtime caching: `/pdfs/*.pdf` → CacheFirst (60 days); Supabase overrides → StaleWhileRevalidate.
- Update flow: prompt user via UpdatePrompt component → SKIP_WAITING → reload.
- **Testing:** Use `bun run preview` to test service worker behavior; `dev` mode bypasses it.

## Coding Conventions

### Svelte 5 Runes (Required)

Runes mode is forced globally via `svelte.config.js`. No legacy Svelte syntax.

```svelte
<script lang="ts">
	// Props — always use interface + $props()
	interface Props {
		title: string;
		class?: string;
		children?: import('svelte').Snippet;
	}
	let { title, class: className = '', children }: Props = $props();

	// State — use $state()
	let isOpen = $state(false);

	// Derived — use $derived()
	let formatted = $derived(title.toUpperCase());

	// Render children — use {@render children()}
</script>

{@render children?.()}
```

**Never use:** `export let`, `$:` reactive declarations, `on:click` event directives, `<slot />`.

Use `onclick={handler}` (lowercase, no colon). Use `{@render children()}` instead of `<slot />`.

### Component Props Pattern

- Always define `interface Props` in the `<script>` block.
- Always accept `class?: string` for outer container customization.
- Use `import type { Snippet } from 'svelte'` for snippet children.
- Prefer Svelte 5 snippets for complex components with multiple content areas.

### Styling — Tailwind v4 + CSS Variables Only

- **No `<style>` blocks** in any component. All styling via Tailwind classes + global CSS.
- **No `tailwind.config.js`** — Tailwind v4 uses `@theme` block in `src/routes/layout.css`.
- Use CSS custom properties from `@theme` as Tailwind values: `text-(--color-brand)`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`.
- **Dark mode:** via `html[data-theme='dark']` attribute. Overrides CSS variables at body level. Do not use Tailwind `dark:` prefix classes.
- **Max content width:** `max-w-120` (480px / 30rem). Mobile-first, single-column.
- **Min tap target:** 44×44px. Use `.tap-target` utility class.
- **Card press effect:** Use `.card-pressable` utility class.

### Custom CSS Classes (defined in `layout.css`)

| Class                                   | Purpose                                                       |
| --------------------------------------- | ------------------------------------------------------------- |
| `.arabic` / `.arabic-lg` / `.arabic-xl` | Arabic text with Noto Naskh Arabic font, RTL, line-height 2.2 |
| `.pb-nav`                               | Bottom padding for BottomNav safe area                        |
| `.pt-safe` / `.pb-safe`                 | Safe-area padding for notched devices                         |
| `.tap-target`                           | Min 44×44px touch target                                      |
| `.card-pressable`                       | Scale 0.98 on `:active`, 100ms transition                     |
| `.phase-ribbon`                         | 800ms color transition for phase indicator bars               |
| `.page-enter`                           | 200ms fade+slide-up page transition animation                 |
| `.card-enter`                           | 300ms fade+slide-up entrance for cards                        |
| `.stagger-1` … `.stagger-5`             | 50ms-increment animation-delay for staggered card lists       |
| `.expand-enter`                         | 200ms slide-down for expand/collapse content                  |

**Arabic RTL:** Always apply `dir="rtl"` to the parent block of any Arabic text to ensure punctuation and numbers anchor correctly.

### Shared UI Components

Use these standard components instead of building one-off containers:

| Component                                      | Purpose                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `Card.svelte`                                  | Standard surface card — `bg-surface`, rounded-2xl, shadow. Supports `pressable` and `href` props. |
| `HeroCard.svelte`                              | Phase-accented card with left border color from `PHASE_COLORS`. Uses `bg-surface` (not phase bg). |
| `DuaCard.svelte`                               | Expandable du'a card with Arabic text, translation, and chevron toggle.                           |
| `PhaseRibbon.svelte`                           | Thin colored bar for phase indicator.                                                             |
| `BottomNav.svelte`                             | Fixed bottom navigation with 4 tabs. Uses `bg-surface/80` + backdrop-blur.                        |
| `Button.svelte`                                | Standard button with variant support.                                                             |
| `PhoneButton.svelte` / `WhatsAppButton.svelte` | Contact action buttons.                                                                           |
| `ArabicAddressCard.svelte`                     | Copyable Arabic address card with clipboard feedback.                                             |
| `LostButton.svelte`                            | Emergency "I'm lost" floating action.                                                             |
| `InstallPrompt.svelte` / `UpdatePrompt.svelte` | PWA install and update prompts.                                                                   |

### File Naming

- Components: `PascalCase.svelte`
- Data/types: `kebab-case.ts` / `kebab-case.json`
- Routes: SvelteKit file-based conventions (`+page.svelte`, `[param]`)

### Type Definitions

- Types in `src/lib/types/*.ts` — use `type` aliases only, no `interface` for data types.
- `interface` only for component `Props`.
- Union literal types for categories: `'niat' | 'tawaf' | 'sai' | ...`
- All optional fields use `?:`.

### Icons

No icon library. All icons are inline SVGs — either directly in markup or stored as template-literal constants rendered via `{@html icon}`.

**Stroke-width standard:** All inline SVG icons must use `stroke-width="1.5"` for visual consistency. Do not use `2`, `2.5`, or other weights.

### Page Titles

Every page must include:

```svelte
<svelte:head>
	<title>Page Name — Patuna Coklat-B</title>
</svelte:head>
```

## Design Tokens

These are defined once in `src/routes/layout.css` under `@theme`. Reference them by CSS variable name — **never hardcode hex values**.

### Brand & Accent Colors (Pastel Green Palette)

| Token                  | Value     | Usage                                      |
| ---------------------- | --------- | ------------------------------------------ |
| `--color-brand`        | `#5a8a6a` | Primary green — headers, key actions       |
| `--color-brand-light`  | `#7aaa8a` | Lighter brand for hover states             |
| `--color-accent`       | `#d4e8d9` | Soft green accent — badges, highlights     |
| `--color-accent-light` | `#eef5f0` | Very light green tint — subtle backgrounds |

### Neutral Colors

| Token                | Value     | Usage                   |
| -------------------- | --------- | ----------------------- |
| `--color-background` | `#f8faf9` | Main page background    |
| `--color-surface`    | `#ffffff` | Card / elevated surface |
| `--color-border`     | `#e8ede9` | Subtle borders          |
| `--color-foreground` | `#1c2b22` | Primary text            |
| `--color-muted`      | `#7a8f80` | Secondary / helper text |

### Dark Mode Overrides

| Token                     | Value     |
| ------------------------- | --------- |
| `--color-background-dark` | `#0d110e` |
| `--color-surface-dark`    | `#161c18` |
| `--color-border-dark`     | `#263028` |
| `--color-foreground-dark` | `#e4ede7` |
| `--color-muted-dark`      | `#8a9f8e` |

### Phase Colors

| Token                             | Value     | Phase             |
| --------------------------------- | --------- | ----------------- |
| `--color-phase-arrival`           | `#5a7fa0` | Arrival           |
| `--color-phase-madinah`           | `#5a8a6a` | Madinah           |
| `--color-phase-madinah-to-makkah` | `#8a9a78` | Transit           |
| `--color-phase-makkah`            | `#a08a6a` | Makkah            |
| `--color-phase-ash-shishah`       | `#9a8a7a` | Ash-Shishah prep  |
| `--color-phase-rukun`             | `#b8a070` | Rukun (hajj days) |
| `--color-phase-post-hajj`         | `#6a9a7a` | Post-hajj         |
| `--color-phase-departure`         | `#5a7fa0` | Departure         |

### Typography

**Type scale:** 13 / 15 / 16 / 18 / 22 / 28 / 36 px (via `--text-xs` through `--text-3xl`).

**Arabic scale:** 24 / 32 / 40 px (via `--text-arabic-base`, `--text-arabic-lg`, `--text-arabic-xl`).

**Fonts:**

- Headlines: Inter Variable (sans-serif, weight 600)
- Body: Source Serif 4 Variable (serif, weight 400, line-height 1.6)
- Arabic: Noto Naskh Arabic (weight 400 + 700)

## Design Principles

- **Quiet, sacred, contemplative.** Not corporate, not flashy. Think Apple Notes meets Muslim Pro at its most restrained.
- **Minimalist with pastel accents.** Predominantly white surfaces, soft green accents. Clean and calm.
- **Anti-references:** No skeuomorphic mosques, no green-and-gold Islamic clip art, no Ramadan-greeting-card energy, no neon, no carousels.
- **Motion:** Subtle only. 200ms ease-out page transitions, 100ms scale on tap, 800ms phase-ribbon color drift. 300ms card entrance with stagger. **Forbidden:** bounce, parallax, confetti, scroll-jacking.
- **Big tappable targets** for older fingers. High contrast for Saudi sun glare.
- **High Contrast:** Every UI element must maintain a contrast ratio of at least 4.5:1 for readability in intense Saudi sunlight. Avoid thin weights for body text; prefer `font-normal` (400) or `font-medium` (500).
- **Accessibility:** Global `focus-visible` outlines (2px brand-colored) are defined in `layout.css`. Every icon-only button or link must have an explicit `aria-label`. Use the `.tap-target` utility for all interactive elements to guarantee a minimum 44px hit area.
- **No checklists in Ritual Guide** — pilgrims' hands are occupied during ritual. Guide is read-before, not interact-during.

## Do Not

- Do not use legacy Svelte syntax (`export let`, `$:`, `on:click`, `<slot />`).
- Do not add `<style>` blocks in Svelte components.
- Do not use Tailwind `dark:` classes — dark mode is via CSS variable overrides.
- Do not hardcode color hex values — use CSS variables from `@theme`.
- Do not create `+page.ts` or `+page.server.ts` load functions — all data is client-side static JSON.
- Do not add npm packages without explicit approval.
- Do not use `any` TypeScript types.
- Do not add analytics that require network.
- Do not add login, accounts, push notifications, GPS, live weather, or Qibla compass features.
- Do not write Arabic from memory — always use the exact values from bundled JSON data.
- Do not use `moment.js` — use native `Date` or `Intl` APIs.
- Do not use `$lib/index.ts` barrel file — import directly from subpaths.
- Do not add comments in code unless explicitly asked.
- Do not use `stroke-width` values other than `1.5` for inline SVG icons.
- Do not use `bg-white` in components — use `bg-surface` for dark-mode compatibility.

## Formatting

Prettier config (`.prettierrc`): tabs, single quotes, no trailing commas, 100 char width, `prettier-plugin-svelte` + `prettier-plugin-tailwindcss` (class sorting).

Run `bun run format` before committing.
