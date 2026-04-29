# Implementation Plan — Patuna Coklat-B Hajj Companion

> **Source PRD:** [patuna-coklat-b-hajj-companion.md](../ideas/patuna-coklat-b-hajj-companion.md)
> **Target ship date:** 2026-05-09 (manasik day at ICE BSD) — **10 days from today (2026-04-29)**
> **Builder:** Panji (solo)
> **Total effort estimate:** ~50–60 focused hours across 22 tasks

---

## Reality Check Before You Start

You have **10 days** to ship a real PWA to real jamaah at a real manasik briefing. That's tight but doable for a solo dev _if_ you stay ruthlessly scoped. This plan is sequenced so that **after Track A + Track B + half of Track D, you already have a useful app** — even if every later task slips, you have something to install at manasik.

Three rules that govern every task below:

1. **Ship over polish.** A working "Hari 16 Wukuf" guide with placeholder typography beats a beautiful empty home screen.
2. **Bundled data first, dynamic data later.** Supabase is the _last_ track. Don't let it block anything earlier.
3. **One task = one commit = one verifiable outcome.** If a task feels bigger than 4 hours, split it.

---

## Track Overview

| Track                         | Tasks | Why it exists                                    | Critical path?            |
| ----------------------------- | ----- | ------------------------------------------------ | ------------------------- |
| **A. Foundation**             | 1–3   | Repo, build, deploy pipeline, PWA shell          | Yes (blocks everything)   |
| **B. Data extraction**        | 4–8   | Turn Patuna PDFs into bundled JSON               | Yes (blocks UI)           |
| **C. Design system**          | 9–11  | Typography, colors, primitives, Arabic rendering | Yes (blocks UI)           |
| **D. Layer 1 — Home**         | 12–14 | Now/Next + after-Maghrib mode                    | Yes (this is the spine)   |
| **E. Layer 3 — Reference**    | 15–18 | Itinerary, contacts, du'a, guides                | High value, ship-blocking |
| **F. Layer 2 — Ritual Guide** | 19–20 | The 7 critical-day walkthroughs                  | High value, ship-blocking |
| **G. Dynamic + Ship**         | 21–22 | Supabase overrides + manasik distribution        | Stretch (cut if needed)   |

---

## Sequencing Strategy

```
Day 1–2:   Tasks 1, 2, 3, 9          (Foundation + design tokens)
Day 3–5:   Tasks 4, 5, 6, 7, 8       (All data extraction)
Day 5–6:   Tasks 10, 11, 12          (Primitives + Home shell)
Day 6–7:   Tasks 13, 14, 15, 16      (Home complete + Itinerary)
Day 8:     Tasks 17, 18              (Du'a + Contacts + Guides)
Day 9:     Tasks 19, 20              (Ritual Guide for all 7 days)
Day 10:    Tasks 21, 22              (Supabase + ship + QR)
```

If you fall behind by Day 7, cut Task 21 (Supabase overrides). The PRD already says Supabase is non-blocking. **Do not cut Track F (Ritual Guide) — that's the highest-value differentiator.**

---

## Track A — Foundation

### Task 1: Project scaffolding

**What:** Initialize SvelteKit 2 + Svelte 5 + TypeScript + Tailwind v4 + Bun project. Configure `@sveltejs/adapter-cloudflare`. Set up Prettier, ESLint (`eslint-plugin-svelte`).

**Files:**

- `package.json` (Bun-managed)
- `svelte.config.js` with Cloudflare adapter
- `vite.config.ts`
- `tailwind.config.ts` (Tailwind v4 syntax)
- `src/app.html`, `src/app.css`, `src/app.d.ts`
- `tsconfig.json`
- `.prettierrc`, `.eslintrc`
- `README.md` with one-page setup

**Acceptance:**

- `bun install && bun run dev` starts dev server
- `bun run build` produces a Cloudflare-compatible output in `.svelte-kit/cloudflare`
- Empty home page renders at `/`
- Lint passes with zero warnings

**Effort:** 1.5h
**Dependencies:** none

---

### Task 2: Cloudflare Pages deployment

**What:** Connect repo to Cloudflare Pages. Verify auto-deploy on push to `main`. Set up custom domain or use `*.pages.dev`. Smoke-test the deployed URL on a real phone.

**Files:**

- `wrangler.toml` (if needed for Functions later)
- GitHub Actions workflow (optional — Cloudflare's git integration may suffice)

**Acceptance:**

- Push to `main` deploys automatically within ~60s
- Deployed URL loads on iPhone Safari + Android Chrome
- Lighthouse score ≥ 90 on Performance for the empty home page

**Effort:** 1h
**Dependencies:** Task 1

---

### Task 3: PWA shell + offline scaffolding

**What:** Install `@vite-pwa/sveltekit`. Configure manifest (name "Patuna Coklat-B", short_name "Patuna B", theme color, icons). Set up Workbox precache for app shell + bundled JSON. Add install prompt component.

**Files:**

- `vite.config.ts` (PWA plugin config)
- `static/manifest.webmanifest` (auto-generated)
- `static/icons/` (192, 512, maskable variants — placeholder icons OK for now)
- `src/lib/components/InstallPrompt.svelte`
- `src/service-worker.ts` (custom logic for runtime caching of PDFs)

**Acceptance:**

- App installs as PWA on iOS Safari (Add to Home Screen) and Android Chrome (Install banner)
- Opening installed app while in airplane mode shows the home page (cached)
- DevTools → Application → Service Worker shows active SW
- Manifest validates against PWA Builder

**Effort:** 2h
**Dependencies:** Task 1, Task 2

---

## Track B — Data Extraction

> **Critical insight:** all PDFs are in [docs/](../../docs/). Most extraction is manual transcription, not OCR — the structured PDFs are too short for OCR to be worth the setup cost. Budget 6–8 hours total across this track. Treat this as the _content-writing phase_, not the engineering phase.

### Task 4: Itinerary JSON

**What:** Transcribe all 26 days from `ITINERARY HAJI 2026 - COKLAT B 18, 19, 20, 21.pdf` into `src/lib/data/itinerary.json`. Match the schema in PRD §6.1. Add the `phase` field per the 7-phase mapping in PRD §4. Add prose `whatToDo`, `whatToBring`, `dressCode`, `koperNote`, `tips` for each day — write these in your own Bahasa, beginner-friendly.

**Files:**

- `src/lib/data/itinerary.json` (~26 entries × ~250 lines = ~6500 lines but mostly data)
- `src/lib/types/itinerary.ts`
- `src/lib/data/itinerary.test.ts` (validate against schema with Zod)

**Acceptance:**

- All 26 days present, sorted by `dayNumber`
- Every activity from the PDF is captured (verify by spot-checking 3 days)
- `phase` is correctly assigned for all days
- `dressCode` filled for the 4 days that have one (Hari 1, 7, 15, 25)
- `koperNote` filled for the 3 days with koper movements (Hari 7, 11, 25)
- Zod schema validation passes; commit fails CI if it doesn't
- Each day has at least 2 `tips` (practical, beginner-friendly)

**Effort:** 3h (mostly typing)
**Dependencies:** Task 1

---

### Task 5: Du'a library JSON

**What:** Extract ~30 most relevant du'a from `Doa Zikir Haji Umrah.pdf` into `src/lib/data/dua.json`. Include: niat Umrah, niat Haji, talbiyah, du'a Multazam, du'a tawaf, du'a Sa'i, doa Arafah, du'a melontar jumrah, du'a Thawaf Wada, du'a melihat Ka'bah, du'a masuk masjid, du'a antara Safa-Marwah. Each: Arabic with full diacritics, Latin transliteration, Bahasa translation, `whenToRead` tag, optional `source`.

**Files:**

- `src/lib/data/dua.json`
- `src/lib/types/dua.ts`

**Acceptance:**

- Minimum 30 entries
- Every entry has Arabic + Latin + Bahasa (no nulls)
- Arabic text validates as RTL (no encoding issues — paste a sample into a browser, must render correctly)
- `whenToRead` is a controlled vocabulary (e.g. `tawaf-round-1`, `safa-to-marwah`, `at-multazam`) — list the allowed values in the type file
- All `id` values are unique kebab-case strings, referenceable from itinerary `duaIds`

**Effort:** 2h
**Dependencies:** Task 1

---

### Task 6: Climate norms JSON

**What:** Build `src/lib/data/climate.json` from historical climate data. Cover Madinah, Makkah, Mina, Arafah, Muzdalifah, Jeddah for the date range 24 Zulqa'dah 1447 → 19 Zulhijjah 1447 (the 26 days). Sources: weatherspark.com historical, Saudi Met Authority averages. Add `advice` in Bahasa.

**Files:**

- `src/lib/data/climate.json`
- `src/lib/types/climate.ts`

**Acceptance:**

- 6 cities × ~26 days = ~150 entries (some cities only relevant for some days, OK to skip)
- Temperature accuracy: ±2°C of weatherspark historical norm
- `advice` is a 1-sentence practical instruction in Bahasa, not a description
- Mina/Arafah/Muzdalifah entries for Hari 15–17 (the rukun) emphasize hydration

**Effort:** 1.5h
**Dependencies:** Task 1

---

### Task 7: Contacts JSON

**What:** Build `src/lib/data/contacts.json`. **You'll need to gather Patuna muthawwif numbers at manasik on 2026-05-09 — placeholder them for now.** Saudi emergency, KJRI Jeddah, hotel addresses can be filled today.

**Files:**

- `src/lib/data/contacts.json`
- `src/lib/types/contacts.ts`

**Acceptance:**

- Saudi emergency numbers (911, 937, 993) present
- KJRI Jeddah phone + address (Arabic + Latin) present
- Hotel Madinah (Grand Plaza Badr Al Maqam) — Arabic + Latin address + phone
- Hotel Makkah (Marriott Jabal Omar) — Arabic + Latin address + phone
- Apartment Ash Shishah — Arabic + Latin address + phone
- Patuna office Jakarta — phone, WhatsApp
- Muthawwif slots for B-18, B-19, B-20, B-21 with `name: "TBD — collect at manasik"`

**Effort:** 1h
**Dependencies:** Task 1

---

### Task 8: Ritual Guide content

**What:** Write step-by-step content for the 5 ritual guides into `src/lib/data/ritual-guides.json`: `ihram-umrah` (Hari 7), `wukuf-arafah` (Hari 16), `mabit-muzdalifah-jumrah-aqobah` (Hari 17), `lontar-tiga-jumrah` (Hari 18 + 19 share this), `thawaf-wada` (Hari 25). Each guide has 4–8 steps. Reference du'a from the library by `duaIds`. Cross-check theological accuracy against `Coklat Awal.pdf` and `Panduan Persiapan Jamaah Haji Patuna Travel 2026-Coklat B.pdf`.

**Files:**

- `src/lib/data/ritual-guides.json`
- `src/lib/types/ritual-guide.ts`

**Acceptance:**

- 5 guide objects present
- Each step has `title`, `explanation`, optional `arabic`/`latin`/`translation`/`duaIds`/`warning`
- `wukuf-arafah` includes: niat Haji, persiapan wukuf, khutbah wukuf, jamak takdim qashar, doa Arafah, persiapan ke Muzdalifah
- `lontar-tiga-jumrah` includes the order Ula → Wustha → Aqobah, 7 stones each, with the warning that order matters
- All referenced `duaIds` exist in `dua.json` (write a test that asserts this)

**Effort:** 3h (mostly content writing)
**Dependencies:** Task 5 (du'a library must exist first)

---

## Track C — Design System

### Task 9: Typography + color tokens

**What:** Set up the type scale and color tokens per PRD §8. Install fonts: Geist (or Inter), Source Serif 4 (or Lora), Amiri, Scheherazade New. Self-host via `@fontsource/*` so they cache offline. Define Tailwind theme extensions for the 7 phase colors.

**Files:**

- `src/app.css` (CSS custom properties for colors, font-family stacks)
- `tailwind.config.ts` (theme.extend.colors, theme.extend.fontFamily)
- `src/lib/styles/typography.css` (Arabic-specific tweaks: line-height, letter-spacing)
- `src/lib/components/ArabicText.svelte` (renders Arabic with proper font + RTL)

**Acceptance:**

- All 4 fonts load locally (no Google Fonts CDN — must work offline)
- Visit `/_design-tokens` (a hidden dev route) and see all colors + type sizes rendered correctly
- `<ArabicText>` component renders the talbiyah `لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ` with full diacritics, RTL, and beautiful typography on iOS + Android
- Dark mode swaps colors via `prefers-color-scheme` AND a manual `data-theme="dark"` attribute on `<html>`

**Effort:** 2.5h
**Dependencies:** Task 1

---

### Task 10: Card + button primitives

**What:** Build reusable Svelte 5 components: `<Card>`, `<HeroCard>`, `<Button>` (primary, secondary, ghost), `<PhoneButton>` (tel: link), `<WhatsAppButton>`, `<PhaseRibbon>`. All using runes (`$props`, `$state`, `$derived`). Match minimalist mood per PRD §8.

**Files:**

- `src/lib/components/ui/Card.svelte`
- `src/lib/components/ui/HeroCard.svelte`
- `src/lib/components/ui/Button.svelte`
- `src/lib/components/ui/PhoneButton.svelte`
- `src/lib/components/ui/WhatsAppButton.svelte`
- `src/lib/components/ui/PhaseRibbon.svelte`
- `src/routes/_design/+page.svelte` (component gallery, gated to dev)

**Acceptance:**

- Component gallery renders all primitives at `/_design`
- Min tap target 44×44px verified in DevTools (toggle device toolbar, measure)
- Tap animation is 100ms scale to 0.98 (per PRD), no bounce
- Phase ribbon supports all 7 phase colors and animates color drift over 800ms
- All components have `class` prop for Tailwind override

**Effort:** 3h
**Dependencies:** Task 9

---

### Task 11: Layout shell + bottom nav

**What:** Build the app shell: top safe-area handling, bottom 4-icon nav (Home, Itinerary, Du'a, More). Routes: `/`, `/itinerary`, `/itinerary/[day]`, `/dua`, `/more`, `/more/contacts`, `/more/guides`, `/more/settings`, `/ritual/[guideId]`. Set up SvelteKit layout with persistent nav.

**Files:**

- `src/routes/+layout.svelte`
- `src/routes/+layout.ts` (load bundled data into a context)
- `src/lib/components/AppShell.svelte`
- `src/lib/components/BottomNav.svelte`
- `src/lib/components/SafeArea.svelte`

**Acceptance:**

- Bottom nav renders on all routes except `/ritual/[guideId]` (immersive)
- Active tab is highlighted with Patuna brown
- Page transitions are 200ms ease-out fade + 4px slide (Svelte transition)
- iOS notch + home indicator handled (env safe-area-inset)
- All bundled data loaded once into a Svelte context, accessible from any page

**Effort:** 2.5h
**Dependencies:** Task 10

---

## Track D — Layer 1: Home

### Task 12: Date + phase logic

**What:** Build `src/lib/state/clock.svelte.ts` (Svelte 5 rune-based store): exposes `currentDay` (1–26, derived from device clock + start date), `currentPhase`, `isAfterMaghrib` (computed from bundled prayer-times for current city). Allow override via `localStorage` for users on different flight schedules.

**Files:**

- `src/lib/state/clock.svelte.ts` (uses `$state` + `$derived`)
- `src/lib/data/prayer-times.json` (bundled, per-city per-day Maghrib times — extract from Hijri calendar libraries or hard-code for the 26 days)
- `src/lib/utils/hijri.ts` (Gregorian → Hijri conversion using `hijri-converter` or a small custom table for the 26 days)
- Tests for edge cases: before Hajj starts, after Hajj ends, mid-day, 2am

**Acceptance:**

- `currentDay` returns correct value for any timestamp during the 26-day window
- `currentDay` returns `null` (or "pre-Hajj") before Hari 1 and "post-Hajj" after Hari 26
- `isAfterMaghrib` flips correctly at the right time for the right city
- Override in `localStorage` (key: `patuna.startDate`) shifts all calculations
- Unit tests cover ≥ 8 scenarios

**Effort:** 2h
**Dependencies:** Task 4 (need itinerary for city per day), Task 6 (climate provides location anchors)

---

### Task 13: Home — Now/Next mode

**What:** Build `/` with the daytime layout per PRD §8 screen 1: phase ribbon, hero (city + Hari N + Hijri date), Now card, Next card with countdown, climate strip. Pull data from clock store + itinerary.

**Files:**

- `src/routes/+page.svelte`
- `src/lib/components/home/HeroSection.svelte`
- `src/lib/components/home/NowCard.svelte`
- `src/lib/components/home/NextCard.svelte`
- `src/lib/components/home/ClimateStrip.svelte`

**Acceptance:**

- On Hari 16 (mocked clock), home shows: gold phase ribbon, "Hari 16 — 9 Zulhijjah 1447", "Padang Arafah" as city, Now: "Khutbah Wukuf", Next: "Sholat Maghrib & Isya jamak takdim qashar in Xh Ym", climate: "Arafah, hari ini biasanya 41°C..."
- Countdown updates every minute (no need for second-level)
- Tapping the hero navigates to `/itinerary/16`
- Loads in <500ms on a 4G connection (Lighthouse)
- Works offline (toggle airplane mode, refresh, still works)

**Effort:** 3h
**Dependencies:** Task 11, Task 12

---

### Task 14: Home — After-Maghrib mode (Persiapan Besok)

**What:** When `isAfterMaghrib === true`, swap the hero from Now/Next to "Persiapan Besok": tomorrow's dress code, koper instructions, niat to memorize. Auto-dark theme.

**Files:**

- `src/lib/components/home/PersiapanBesokCard.svelte`
- Modify `src/routes/+page.svelte` to conditionally render

**Acceptance:**

- On Hari 6 evening (mocked, after Maghrib), home shows: "Persiapan Besok: Hari ke-7, Madinah → Makkah, ihram, Bir Ali"
- Dress code: men "Ihrom Patuna", women "Gamis Putih (Mukena Atasan Ungu Patuna)"
- Koper note: "Siapkan 2 pasang pakaian dalam tas kecil, koper besar Patuna untuk Makkah"
- Niat to memorize: niat Umrah, large Arabic + Latin
- Background auto-dims to dark mode

**Effort:** 2h
**Dependencies:** Task 13

---

## Track E — Layer 3: Reference

### Task 15: Itinerary list + detail

**What:** Build `/itinerary` (list of all 26 days, grouped by phase, current day highlighted) and `/itinerary/[day]` (detail per PRD §5.2: header, timeline, what to do/bring/wear, tips, du'a list, climate, Patuna note).

**Files:**

- `src/routes/itinerary/+page.svelte`
- `src/routes/itinerary/[day]/+page.svelte`
- `src/lib/components/itinerary/DayCard.svelte`
- `src/lib/components/itinerary/Timeline.svelte`
- `src/lib/components/itinerary/TipsList.svelte`
- `src/lib/components/itinerary/DuaCard.svelte` (used in detail; reusable in /dua too)

**Acceptance:**

- List page shows all 26 days, grouped by 7 phases, each phase has its color ribbon
- Current day is highlighted with a subtle gold border
- Tapping a day opens detail
- Detail page shows all sections from PRD §5.2
- Activities with `time: null` render as "Sepanjang hari"
- Conditional activities are marked with a subtle "\*kondisional" tag
- Du'a embedded inline expand/collapse
- Detail loads in <300ms (all data is bundled)

**Effort:** 3.5h
**Dependencies:** Task 11, Task 12, Task 4

---

### Task 16: Du'a library

**What:** Build `/dua` per PRD §5.6: searchable, grouped by Hajj phase. Each entry: title in Bahasa, expand to show Arabic (large, Amiri) + Latin + Bahasa, tap-to-copy.

**Files:**

- `src/routes/dua/+page.svelte`
- `src/lib/components/dua/DuaListItem.svelte`
- `src/lib/components/dua/SearchBar.svelte`

**Acceptance:**

- All ~30 du'a render
- Search filters by title + Bahasa translation (case-insensitive, accent-insensitive)
- Tap-to-copy copies Arabic text to clipboard with toast confirmation
- Arabic renders in Amiri at 28px+ for readability
- Group headers use phase colors

**Effort:** 2h
**Dependencies:** Task 11, Task 5

---

### Task 17: Contacts

**What:** Build `/more/contacts` per PRD §5.5: grouped sections, big telepon + WhatsApp buttons per contact, "Tampilkan dalam Bahasa Arab" full-screen address card for taxi drivers.

**Files:**

- `src/routes/more/contacts/+page.svelte`
- `src/lib/components/contacts/ContactCard.svelte`
- `src/lib/components/contacts/ArabicAddressCard.svelte` (full-screen)

**Acceptance:**

- Tapping phone number opens dialer (`tel:` link)
- Tapping WhatsApp opens WhatsApp (`https://wa.me/` link)
- "Tampilkan dalam Bahasa Arab" opens a full-screen card showing only the Arabic address in 36px+, white background, black text — designed to be shown to a taxi driver
- Hotels grouped under "Akomodasi"
- Saudi emergency numbers in red-accent group
- Patuna placeholder muthawwif slots clearly labeled "TBD"

**Effort:** 2h
**Dependencies:** Task 11, Task 7

---

### Task 18: Guides (downloadable PDFs)

**What:** Build `/more/guides` per PRD §5.4: list of PDFs with size labels, cache strategy indicators ("Tersedia offline" vs "Buka saat WiFi"). Bundle the 4 small PDFs in `static/pdfs/`. Larger ones link to Drive.

**Files:**

- `src/routes/more/guides/+page.svelte`
- `src/lib/components/guides/GuideListItem.svelte`
- `static/pdfs/itinerary-coklat-b.pdf` (copy from `docs/`)
- `static/pdfs/panduan-persiapan-coklat-b.pdf`
- `static/pdfs/rundown-manasik.pdf`
- `static/pdfs/dokumen-pendukung-manasik.pdf`
- `src/lib/data/guides.json` (metadata: title, size, local path or Drive URL, cache strategy)

**Acceptance:**

- Bundled PDFs (<5MB total) open in-browser with native viewer
- Drive-linked PDFs open in new tab to Drive viewer with copy-link affordance
- "Tersedia offline" badge on bundled ones
- Tapping a Drive-only PDF while offline shows "Buka saat WiFi tersedia" message + copy-link button
- Total bundled PDF size is ≤ 1.5MB after build (verify with `du -h`)

**Effort:** 1.5h
**Dependencies:** Task 11

---

## Track F — Layer 2: Ritual Guide

### Task 19: Ritual Guide walkthrough screen

**What:** Build `/ritual/[guideId]` per PRD §8 screen 4: full-screen immersive (no bottom nav), step indicator dots, prev/next buttons, "Tersesat?" sticky button, gold accent for rukun-phase guides.

**Files:**

- `src/routes/ritual/[guideId]/+page.svelte`
- `src/lib/components/ritual/StepIndicator.svelte` (minimal dots)
- `src/lib/components/ritual/RitualStepCard.svelte` (Arabic + Latin + Bahasa + explanation + warning)
- `src/lib/components/ritual/LostButton.svelte` (sticky, opens modal with hotel address Arabic card + Patuna phone)

**Acceptance:**

- Loading `/ritual/wukuf-arafah` shows the first step
- Swipe left/right or prev/next button navigates steps
- Step dots reflect position (X of N)
- Niat steps render Arabic at 32px+, Latin at 18px italic, Bahasa at 18px regular
- Warning text (e.g. "Larangan ihram berlaku sejak niat") renders in red-accent box
- Tapping "Tersesat?" opens modal with current hotel's Arabic address card + 1-tap call to muthawwif
- Bottom nav is hidden on ritual screens

**Effort:** 3h
**Dependencies:** Task 11, Task 8, Task 17

---

### Task 20: Wire ritual guides into itinerary

**What:** On detail pages for Hari 7, 15, 16, 17, 18, 19, 25, surface a prominent "Buka Panduan Ritual" button at the top of the page that deep-links to the appropriate `/ritual/[guideId]`. Also add the same entry point on the home Now/Next card when the current day matches.

**Files:**

- Modify `src/routes/itinerary/[day]/+page.svelte`
- Modify `src/lib/components/home/NowCard.svelte`

**Acceptance:**

- On Hari 16 itinerary detail, a gold "Buka Panduan Wukuf Arafah →" button appears at the top
- On home, when current day is in {7, 15, 16, 17, 18, 19, 25}, the Now card shows the same button
- Hari 18 and Hari 19 both link to `lontar-tiga-jumrah` (shared guide)
- Button is dismissible (small × icon) — stores in localStorage so dismissed buttons don't reappear that day

**Effort:** 1h
**Dependencies:** Task 13, Task 15, Task 19

---

## Track G — Dynamic + Ship

### Task 21: Supabase daily_overrides (optional, can ship without)

**What:** Set up Supabase project. Create `daily_overrides` table per PRD §6.6. Build a tiny admin form (separate route `/admin`, password-protected via env var) for muthawwif to add overrides. App fetches overrides on open with 3s timeout, merges into UI.

**Files:**

- `supabase/migrations/0001_daily_overrides.sql`
- `src/routes/admin/+page.svelte` (password gate)
- `src/lib/state/overrides.svelte.ts` (fetch + merge logic)
- Modify itinerary rendering to apply overrides

**Acceptance:**

- Supabase project provisioned, RLS enabled (read-public, write-auth-only)
- Admin can add an override via the form
- App fetches on open, falls back gracefully if offline (uses bundled times)
- Overrides display with subtle "diperbarui [time]" tag so users know it's dynamic
- Override fetch never blocks render — UI shows bundled data first, then merges

**Effort:** 3h
**Dependencies:** Task 13, Task 15
**Cut criteria:** If Day 9 ends and Tasks 1–20 aren't all green, **cut this task.** Ship without it. The PRD already calls Supabase non-blocking.

---

### Task 22: Manasik distribution prep

**What:** Generate QR code linking to deployed PWA URL. Test full install flow on 3 different phones (iOS Safari, Android Chrome, Samsung Internet). Print 50× QR-code cards for manasik. Write a 1-page "How to install" PDF in Bahasa for jamaah who get stuck.

**Files:**

- `static/qr.svg` (or generated on-the-fly)
- `docs/install-guide-bahasa.pdf` (export from a simple SvelteKit page or Canva)
- Manual test checklist: install on iOS Safari, Android Chrome, Samsung Internet, MIUI browser

**Acceptance:**

- QR code resolves to deployed URL
- Install flow tested on at least 3 distinct devices, all succeed within 60 seconds
- Printed cards ready for 2026-05-09
- 1-page install guide exists as both digital and print

**Effort:** 2h
**Dependencies:** Task 3, all UI tasks complete

---

## Verification & Quality Gates

Run before each commit:

- `bun run lint` — zero errors
- `bun run check` — TypeScript zero errors
- `bun run build` — succeeds, output is reasonable size

Run before deploying to production:

- Lighthouse mobile score: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90, PWA installable
- Manual device test: iOS Safari + Android Chrome
- Airplane-mode test: install, kill network, reopen, verify all bundled features work
- Visual regression: compare home, itinerary detail, ritual guide screenshot before/after

---

## Risk Register

| Risk                                              | Likelihood | Impact   | Mitigation                                                                                                                 |
| ------------------------------------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Patuna muthawwif refuses to share phone numbers   | Medium     | High     | Fallback: link Patuna's published WhatsApp group invite + office line                                                      |
| Arabic typography renders poorly on older Android | Low        | Medium   | Test early on a real Android in Task 9; if broken, fall back to system Arabic font                                         |
| Cloudflare Pages free tier hit                    | Very low   | Low      | ~150 jamaah × 50 opens × 26 days = 195k requests; well under 100k/day free tier                                            |
| Supabase write fails during Hajj                  | Medium     | Low      | Already non-blocking; bundled data is the fallback                                                                         |
| Du'a translation theological dispute              | Low        | High     | Pre-clear with Patuna ustadz at manasik before final ship                                                                  |
| Date logic bug shifts all activities by 1 day     | Low        | Critical | Add a debug screen at `/_debug/clock` that shows currentDay for each hour of the next 26 days; manually verify before ship |
| User installs PWA but it never updates            | Medium     | Medium   | Implement update-available banner using Workbox `skipWaiting` + reload prompt                                              |
| 125MB Guide Haji PDF accidentally bundled         | Low        | High     | Verify build output size <10MB before deploy; CI check                                                                     |

---

## Parallelization Opportunities

If you bring in a second hand for any portion:

- **Tasks 4, 5, 6, 7** (data extraction) can all run in parallel — independent JSON files
- **Task 8** (ritual guide content) blocks on Task 5 (du'a IDs) but otherwise independent
- **Task 9** (design tokens) can run parallel to data extraction
- **Tasks 15, 16, 17, 18** (reference screens) can run in parallel after Tasks 11 + 12 land

---

## Definition of Done — v1

- [ ] All 22 tasks (or 21 if Task 21 cut) marked complete
- [ ] Deployed to Cloudflare Pages production URL
- [ ] PWA installs on iOS Safari + Android Chrome + Samsung Internet
- [ ] Works offline after first install (verified via airplane mode)
- [ ] All 26 days of itinerary present and correct
- [ ] All 5 ritual guides accessible and content-reviewed
- [ ] Lighthouse mobile: Performance ≥ 90, A11y ≥ 95, PWA installable
- [ ] At least 3 jamaah at manasik successfully install the app
- [ ] Self: I've used the app for a full mock-day and it answered my questions

---

## Post-Ship (during Hajj, 2026-05-11 → 2026-06-05)

- Daily mini-retro: did anything break? Did jamaah open it?
- If Task 21 (Supabase) is in: push 1–2 overrides per day as muthawwif gives real-time updates
- Patch critical bugs only — no new features mid-Hajj
- Collect feedback in a single doc for v1.1 / v2

---

_Bismillah. Let's build._
