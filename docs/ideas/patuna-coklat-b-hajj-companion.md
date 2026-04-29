# Patuna Coklat-B Hajj Companion — PRD

> **Status:** v0.1 draft — pre-implementation
> **Author:** Panji Gautama (jamaah, Coklat B, Hajj 2026)
> **Last updated:** 2026-04-29
> **Target launch:** 2026-05-09 (Manasik day, ICE BSD)
> **Hajj period covered:** 2026-05-11 → 2026-06-05 (26 days)

---

## 1. Problem Statement

**How might we give Patuna Coklat-B jamaah a calm, trustworthy companion that tells them exactly what to do, where, when, and how to pray it — even when their phone has no signal in Mina or Arafah?**

A first-time hajji on Coklat B is anxious, jet-lagged, often in their 50s–60s, and surrounded by 2 million people. They have a smartphone but unreliable Saudi network, a 26-day fixed Patuna itinerary, and a head full of Arabic niat they're terrified to mispronounce. Today their answers come from a WhatsApp group that buzzes 200 times a day, a printed PDF they can't search, and a muthawwif they can't always reach.

This app makes the answer to _"what do I do right now?"_ one tap away — offline, in Bahasa Indonesia, and tailored to Coklat B-18/19/20/21.

---

## 2. Target User

**Primary:** First-time Indonesian hajji on Patuna Coklat-B (Bus 18, 19, 20, or 21), age 45–65, medium smartphone literacy, anxious about ritual correctness, no expectation of working internet abroad.

**Secondary (v2):** Family back in Indonesia who want to follow along.

**Out of scope:** Other Patuna packages (Coklat A, Putih), other travel agencies, returning hajji.

---

## 3. Recommended Direction

A single PWA, branded **"Patuna Coklat-B Hajj Companion"**, structured as three layers:

### Layer 1 — Now/Next (the home, always visible)

The default screen answers two questions: _what is happening right now_ and _what is next_. After Maghrib, the screen shifts to surface a **"Persiapan Besok"** card with tomorrow's dress code, koper instructions, and what to memorize.

### Layer 2 — Ritual Guide (high-stakes days only)

On 7 specific days, the app turns from passive reference into active guide. **No checklists** (jamaah can't constantly tap their phone during ritual). Instead: niat in Arabic + Latin transliteration + Bahasa terjemah, step-by-step explanation of what's about to happen, contextual du'a, and a "lost?" quick action with the hotel address card in Arabic for taxi drivers.

### Layer 3 — Reference (always available, secondary)

26-day itinerary, downloadable guides (linked from Drive, cached on first open for the smaller ones), important contacts (Patuna muthawwif + Saudi/Indonesian emergency), du'a library, climate norms per city per Hijri date.

### Design Direction

**Minimalism with soul.** Functional but beautiful. Subtle motion (no flashy animations — this is a sacred-context app, not TikTok). Warm, calm palette evoking _kiswah_ black, ihram white, and Patuna brown. Big tappable targets for older fingers. High contrast for Saudi sun glare. Bahasa Indonesia primary; Arabic for du'a only.

---

## 4. Itinerary Phases (drives UX)

The 26 days break into 7 phases. Each phase has a different _emotional shape_, and the app surfaces different things in each:

| Phase                               | Days  | Emotional shape           | App emphasis                                                          |
| ----------------------------------- | ----- | ------------------------- | --------------------------------------------------------------------- |
| **1. Arrival & Madinah**            | 1–6   | Excitement, jet lag       | Hotel info, Masjid Nabawi guidance, Raudhah etiquette, ziarah list    |
| **2. Madinah → Makkah (Umrah)**     | 7     | High anxiety: first ihram | **Ritual Guide active**: ihram steps, Bir Ali niat, Umrah walkthrough |
| **3. Makkah ibadah**                | 8–10  | Calm, reflective          | Masjidil Haram tips, optional 2nd Umrah from Tan'im                   |
| **4. Ash Shishah preparation**      | 11–14 | Restful, anticipation     | Manasik review materials, Mina survey night, dress-code prep          |
| **5. The Rukun (Wukuf → Tahallul)** | 15–19 | Peak intensity            | **Ritual Guide active**: Arafah, Muzdalifah, Thawaf Ifadhoh, Jumrah   |
| **6. Post-Hajj rest**               | 20–24 | Relief, fatigue           | Light reference, Masjidil Haram return, free-program suggestions      |
| **7. Departure**                    | 25–26 | Closure                   | **Ritual Guide active**: Thawaf Wada, packing, flight info            |

---

## 5. Feature Inventory

### 5.1 Home / Now-Next

- **Now card**: current location (Madinah / Makkah / Ash Shishah / Arafah / Mina), current activity, current day-of-Hajj counter (e.g. "Hari 15 — 8 Zulhijjah 1447")
- **Next card**: next time-pinned activity with countdown (e.g. "Berangkat ke Arafah dalam 4 jam 23 menit")
- **Climate strip**: tipikal cuaca hari ini ("Makkah, hari ini biasanya 41°C, kering — minum minimal 3L air")
- **Phase ribbon** (subtle): visual indicator of which of the 7 phases the user is in
- **After-Maghrib mode**: home shifts to surface **"Persiapan Besok"** card prominently
- **Date logic**: app uses device clock + Hijri date offset; user can manually override start date if needed

### 5.2 Daily Detail (tap any day)

For each of 26 days:

- **Header**: Hari ke-N, Gregorian date, Hijri date, location/route
- **Timeline**: time-pinned activities pulled from the Patuna PDF
- **What you'll do**: prose summary in Bahasa, beginner-friendly
- **What to bring/wear**: dress code, bag, koper status (besar vs tas kecil)
- **Tips**: practical advice ("Bawa botol minum 1L kosong, isi di dispenser Masjid Nabawi"; "Hindari Raudhah di waktu padat 8–11 pagi")
- **Du'a of the day**: 1–3 contextual du'a in Arabic + Latin + Bahasa
- **Climate norm**: typical weather for that Hijri date in that city
- **Patuna note**: any package-specific instruction from the PDF (e.g. uniform requirement, koper movement)

### 5.3 Ritual Guide (Layer 2 — read-only walkthrough)

For Hari 7, 15, 16, 17, 18, 19, 25 only:

- **Ihram & Umrah** (Hari 7): mandi sunnah, niat Umrah at Bir Ali, talbiyah, Tawaf 7 putaran, Sa'i Safa→Marwah 7×, tahallul (cukur)
- **Wukuf Arafah** (Hari 16): niat Haji, Khutbah Wukuf, Jamak Takdim Qashar Zuhur–Ashar, Doa Arafah, Maghrib–Isya jamak takdim qashar, persiapan ke Muzdalifah
- **Mabit Muzdalifah → Thawaf Ifadhoh → Jumrah Aqobah** (Hari 17): pengambilan kerikil, mabit Muzdalifah, Thawaf Ifadhoh + Sa'i + Tahallul Awwal di Jumeirah Hotel, lontar Aqobah 7 batu sore hari, Tahallul Akhir, mabit Mina
- **Lontar Tiga Jumrah** (Hari 18, 19): Ula → Wustha → Aqobah, 7 batu masing-masing, urutan, du'a antar jumrah
- **Thawaf Wada** (Hari 25): niat, du'a perpisahan, larangan setelah wada
- Each step shows: Arabic niat (large), Latin transliteration, Bahasa translation, 1-paragraph "what's happening", 1 contextual du'a
- **"Tersesat?" quick action** (sticky on Ritual Guide screens): hotel address card in Arabic + Patuna muthawwif phone (tel: link)

### 5.4 Guides (downloadable references)

List of PDFs from `/docs`, linked to Google Drive. Smaller files (<5MB) cached automatically on first open; large ones open via Drive viewer.

| File                                                                 | Size     | Cache strategy                                          |
| -------------------------------------------------------------------- | -------- | ------------------------------------------------------- |
| Panduan Persiapan Jamaah Haji Patuna Travel 2026-Coklat B.pdf        | 330 KB   | Bundle in app                                           |
| Rundown Manasik Coklat B.pdf                                         | 56 KB    | Bundle in app                                           |
| Dokumen Pendukung Manasik Santika ICE BSD 9-11 Mei 2026.pdf          | 626 KB   | Bundle in app                                           |
| ITINERARY HAJI 2026 - COKLAT B 18, 19, 20, 21.pdf                    | 106 KB   | Bundle in app                                           |
| Coklat Awal.pdf                                                      | 13.5 MB  | Lazy cache on first tap                                 |
| Bismillah Rangkuman Pengalaman Haji Domestik Saudi 2024 dan 2025.pdf | 28.3 MB  | Drive link only                                         |
| Materi Sosialisasi Haji 2026 (Presentation).pdf                      | 63.1 MB  | Drive link only                                         |
| Doa Zikir Haji Umrah.pdf                                             | 44.7 MB  | Drive link only (we extract key du'a into bundled JSON) |
| Guide Haji.pdf                                                       | 125.6 MB | Drive link only                                         |

### 5.5 Contacts

Single screen, no scrolling needed:

- **Patuna Muthawwif** for kloter B-18/19/20/21 (one tap to call, one tap to WhatsApp)
- **Patuna Office (Jakarta)** — emergency back-home line
- **Saudi Emergency** — 911 (unified Saudi emergency), 937 (medical), 993 (traffic)
- **KJRI Jeddah** — Indonesian Consulate emergency line
- **Hotel Madinah** — Grand Plaza Badr Al Maqam (address Arabic + Latin, phone)
- **Hotel Makkah** — Marriott Jabal Omar (address Arabic + Latin, phone)
- **Apartment Ash Shishah** (address Arabic + Latin, phone)
- **"Tersesat?" — show in Arabic** button: full-screen card a hajji can show to a taxi driver

### 5.6 Du'a Library

Bundled JSON of ~30 most relevant du'a, extracted from _Doa Zikir Haji Umrah.pdf_:

- Niat Umrah, Niat Haji, Talbiyah
- Du'a masuk Masjid, Du'a melihat Ka'bah, Du'a Multazam
- Du'a Safa-Marwah, Du'a Tawaf tiap putaran
- Du'a Wukuf, Doa Arafah
- Du'a melontar jumrah
- Du'a Thawaf Wada
- Each entry: Arabic + Latin + Bahasa, with a "kapan dibaca" tag

### 5.7 Climate Reference

Bundled JSON: per-city, per-Hijri-date typical climate norm. Sourced from historical data for Madinah, Makkah, Mina, Arafah, Muzdalifah. No live forecast.

Example entry:

```json
{
	"city": "Mina",
	"hijriDate": "9 Zulhijjah",
	"tempC": 42,
	"humidity": 12,
	"advice": "Sangat panas dan kering. Minum 3-4L air. Hindari aktivitas siang hari."
}
```

### 5.8 Settings

- Pick your bus: B-18 / B-19 / B-20 / B-21
- Override "today's date" (debug + travelers with delayed flights)
- Light/dark theme toggle (default: light; auto-dark after Maghrib)
- About / version / credits

---

## 6. Data Model

### 6.1 Itinerary (bundled `itinerary.json`)

```ts
type Day = {
  dayNumber: 1..26;
  gregorianDate: "2026-05-11";
  hijriDate: "24 Zulqa'dah 1447";
  hijriDay: 24; hijriMonth: "Zulqa'dah"; hijriYear: 1447;
  phase: "arrival" | "madinah-to-makkah" | "makkah" | "ash-shishah-prep" | "rukun" | "post-hajj" | "departure";
  location: "Jakarta" | "Madinah" | "Makkah" | "Ash Shishah" | "Arafah" | "Muzdalifah" | "Mina" | "Jeddah" | "in-transit";
  routeLabel: "MADINAH AL MUNAWWARAH" | "MADINAH → MAKKAH" | ...;
  activities: Activity[];
  whatToDo: string; // prose, Bahasa
  whatToBring: string[]; // bullets
  dressCode?: { men: string; women: string };
  koperNote?: string; // e.g. "Koper besar Patuna disiapkan untuk dibawa ke Makkah"
  tips: string[];
  duaIds: string[]; // FK to dua library
  climateNormId: string; // FK to climate
  patunaNote?: string; // direct quote from PDF
  ritualGuideId?: string; // present only on the 7 critical days
};

type Activity = {
  time?: "20:40" | null; // null = "throughout the day"
  title: string;
  description: string;
  location?: string; // e.g. "Bandara Soekarno-Hatta T3", "Masjid Bir Ali"
  conditional?: boolean; // for "disesuaikan dengan kondisi setempat"
};
```

### 6.2 Ritual Guide (bundled `ritual-guides.json`)

```ts
type RitualGuide = {
	id:
		| 'ihram-umrah'
		| 'wukuf-arafah'
		| 'mabit-muzdalifah-jumrah-aqobah'
		| 'lontar-tiga-jumrah'
		| 'thawaf-wada';
	dayNumbers: number[]; // 1..26
	steps: RitualStep[];
};

type RitualStep = {
	title: string; // e.g. "Niat Umrah di Bir Ali"
	arabic?: string;
	latin?: string;
	translation?: string; // Bahasa
	explanation: string; // 1 paragraph, what's happening, why
	duaIds?: string[];
	warning?: string; // e.g. "Larangan ihram dimulai sejak niat ini"
};
```

### 6.3 Du'a Library (bundled `dua.json`)

```ts
type Dua = {
	id: string;
	title: string; // Bahasa
	arabic: string;
	latin: string;
	translation: string;
	whenToRead: string; // tag like "saat melihat Ka'bah pertama kali"
	source?: string; // hadith reference if applicable
};
```

### 6.4 Climate Norms (bundled `climate.json`)

```ts
type ClimateNorm = {
	city: 'Madinah' | 'Makkah' | 'Mina' | 'Arafah' | 'Muzdalifah' | 'Jeddah';
	hijriMonth: "Zulqa'dah" | 'Zulhijjah';
	hijriDay: number;
	tempC: number;
	humidity: number;
	advice: string; // Bahasa
};
```

### 6.5 Contacts (bundled `contacts.json`)

```ts
type Contact = {
	category: 'patuna' | 'saudi-emergency' | 'indonesian-gov' | 'hotel';
	name: string;
	nameArabic?: string;
	phone?: string;
	whatsapp?: string;
	address?: string;
	addressArabic?: string;
	notes?: string;
};
```

### 6.6 Optional dynamic overrides (Supabase)

A small `daily_overrides` table that guides can update. Example: "Hari 18 jamarat — berangkat 16:30, bukan 16:00." Phone fetches once on app open if online; falls back to bundled times if offline. **Not blocking** — every screen renders from bundled data first.

```ts
type DailyOverride = {
	dayNumber: number;
	bus: 'B-18' | 'B-19' | 'B-20' | 'B-21' | 'all';
	field: 'departureTime' | 'note';
	value: string;
	publishedAt: string;
	publishedBy: string; // muthawwif name
};
```

---

## 7. Architecture

### Stack

- **Frontend:** SvelteKit 2 + Svelte 5 (runes), TypeScript
- **Runtime:** Bun for dev + build
- **Hosting:** Cloudflare Pages (`@sveltejs/adapter-cloudflare`) — free tier covers expected load (~100 jamaah × ~50 opens/day = 5k/day)
- **Database:** Supabase Postgres (only used for `daily_overrides` table; everything else is bundled static JSON)
- **PWA:** `@vite-pwa/sveltekit` with Workbox; precache app shell + bundled JSON + small PDFs; runtime-cache larger PDFs on first request
- **Styling:** Tailwind CSS v4 + minimal custom CSS for Arabic typography (Amiri or Scheherazade for Quranic text)
- **State:** Svelte 5 runes + `localStorage` for bus selection and theme
- **No analytics** that require network. Optional: Cloudflare Web Analytics (privacy-friendly, no cookies, doesn't break offline).

### Offline strategy

1. **First open** (in-hotel WiFi at ICE BSD on manasik day, or at home before flight): service worker pre-caches app shell, all bundled JSON, small PDFs (<5MB total). One-time download ~3MB.
2. **In Saudi**: app opens instantly from cache. If online, attempt 1 fetch to `daily_overrides` (timeout 3s); merge into UI. If offline, show last-cached overrides with timestamp.
3. **Large PDFs**: tap → if cached, show; if online, download + cache; if offline, show "Buka saat WiFi" message with Drive link copyable.

### Date logic

- Default: device clock → Gregorian → Hijri offset → day-of-Hajj number
- `Settings > Override start date` for users on different flight schedules (Pesawat 1, 2, 4 etc. — though we target Pesawat 3 SV 827 Coklat B specifically)
- After-Maghrib detection: bundled prayer-time table for current city (no API call) → if `now > maghrib`, switch home view to "Persiapan Besok" mode

### Build & deploy

- `bun install` → `bun run build` → `wrangler pages deploy`
- One-command deploy from local; CI optional via Cloudflare's GitHub integration
- Versioning: `version.json` cached separately so PWA can detect updates and prompt user to reload

---

## 8. UX Direction (for Claude Design prompt)

See **Section 12** below for the full design prompt. Highlights:

- **Mood:** _quiet, sacred, beautiful, calm._ Not corporate, not flashy.
- **Palette:** ihram white (#FAFAF7), kiswah black (#1A1A1A), Patuna brown (#5C3A21), gold accent (#C8A971, sparingly), Madinah green (#0F4C3A, only on Madinah-phase screens)
- **Typography:** sans-serif headline (Inter or Geist), serif body (Source Serif or Lora) for warmth, **Amiri** or **Scheherazade New** for Arabic. Large body size (16–18px) for older eyes.
- **Motion:** subtle. Page transitions ~200ms ease-out, card lifts on tap, phase-ribbon color drift over 800ms when day changes. _No bounce, no parallax, no confetti._
- **Layout:** mobile-first, single-column, generous whitespace, max width 480px. Big tap targets (min 44px). High-contrast text for outdoor sun.
- **Micro-detail:** Hijri date in Arabic numerals as a quiet decoration; current city name in calligraphic Arabic above the Latin name; talbiyah text fades in subtly on Day 7+ home screen.

---

## 9. Phased Rollout

### v1 — MVP (target: 2026-05-09, manasik day)

- All Layer 1 (Now/Next + after-Maghrib mode)
- All Layer 3 (full 26-day itinerary, contacts, climate, du'a library, guides list)
- Layer 2 ritual guide for **Hari 7, 15, 16, 17, 18, 19, 25**
- Bus selection (B-18/19/20/21)
- PWA install via QR code at manasik
- Static-only (no Supabase yet); ship even if dynamic overrides aren't ready

### v1.1 — Mid-Hajj patches (2026-05-15 → 2026-06-05)

- Supabase `daily_overrides` wired up
- Bug fixes from real jamaah feedback
- Tweak du'a translations as guides correct them

### v2 — Post-Hajj (2026-07+, for 2027 cohorts)

- Family companion mode (read-only follow-along for relatives in Indonesia)
- Multi-package support (Coklat A, Putih)
- Photo journal / Hajj diary (offline, exportable)
- Audio du'a recitations
- iOS Add-to-Home-Screen polish (PWA limitations)

---

## 10. Success Metrics

Hard to measure without analytics, but proxies:

- **Install rate at manasik** (target: 60%+ of ~150 Coklat-B-18/19/20/21 jamaah install the PWA on 2026-05-09)
- **Survey at end of Hajj** (1-question form: "Apakah app ini membantu? skala 1–5")
- **WhatsApp question reduction** (subjective: did the muthawwif group get fewer "what time tomorrow?" questions? Ask 3 muthawwifs post-Hajj)
- **Critical-day usage** (if Cloudflare analytics enabled: spike in opens on Hari 15–19)
- **Personal benchmark**: did _I_ feel less anxious on Hari 16 than I would have without it? (n=1, but the truest test)

---

## 11. Open Questions & Assumptions

| #   | Assumption                                             | Risk if wrong           | Validation                                                                        |
| --- | ------------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| A1  | Patuna muthawwif phone numbers can be included         | Contacts feature broken | Ask muthawwif at manasik 2026-05-09; if not, link WhatsApp group invite instead   |
| A2  | Coklat B jamaah will install a PWA from a QR           | App goes unused         | 5-minute live install demo at manasik; observe success rate                       |
| A3  | Saudi network is bad enough that offline-first matters | Over-engineering        | Confirmed by _Bismillah Rangkuman 2024-2025_ PDF (28MB) — read it before building |
| A4  | Bundled du'a translations are theologically acceptable | Reputational risk       | Cross-check 3 du'a with Patuna ustadz before launch                               |
| A5  | "Now/Next" beats "Tomorrow" as default                 | Confused users          | Show 5 jamaah at manasik a paper mockup; observe what they read first             |
| A6  | Climate norms are accurate enough to be useful         | Wrong advice            | Cross-check with weatherspark.com historical data for 5 sample dates              |
| A7  | Cloudflare Pages free tier holds                       | Unexpected cost         | Set up billing alert; downgrade to static HTML if exceeded                        |

---

## 12. Not Doing (and why)

- ❌ **Real-time weather API** — climate norms are more useful (always work, never wrong, no API key) and the difference between "42°C" and "43°C" doesn't change behavior
- ❌ **Login / accounts** — adds friction; bus selection in localStorage is enough; no PII to protect
- ❌ **Push notifications** — iOS PWA push is unreliable; muthawwif WhatsApp group already serves this
- ❌ **Qibla compass** — every smartphone has one; not differentiating
- ❌ **Prayer times calculator** — bundled static table for the 5 cities is enough; muthawwif schedule overrides anyway
- ❌ **GPS / live location** — battery hog, unreliable in tents/crowds, doesn't solve a real Patuna problem
- ❌ **Multi-package** — focus on Coklat B-18/19/20/21 only for v1
- ❌ **Multi-language UI** — Bahasa Indonesia only; Arabic for du'a and address cards only
- ❌ **Offline maps** — Google Maps + Apple Maps already work in Saudi when online; offline maps are 500MB+ and we'd be a worse Google
- ❌ **Photo / community / social** — out of scope; this is a tool, not a network
- ❌ **Audio recitations in v1** — adds 50MB+ to install size; defer to v2
- ❌ **Checklists in Ritual Guide** — jamaah won't tap phone during ritual (their hands are raised in du'a, holding stones, in tawaf); guide is read-before, not interact-during
- ❌ **Native iOS/Android apps** — PWA ships in 8 weeks; native ships in 6 months and we miss Hajj 2026

---

## 13. Implementation Plan Hooks

This PRD is the input to a separate implementation plan. The plan should break the work into ~20 tasks across these tracks:

1. **Data extraction** (5 tasks): pull itinerary, du'a, climate, contacts, ritual steps from PDFs into JSON
2. **Foundation** (3 tasks): SvelteKit + Bun + Tailwind + Cloudflare Pages + PWA scaffolding
3. **Core UI components** (4 tasks): typography system, card primitives, phase ribbon, Arabic-text rendering
4. **Layer 1 — Home/Now-Next** (3 tasks): Now card, Next card, after-Maghrib mode
5. **Layer 3 — Reference screens** (4 tasks): Itinerary list + detail, Contacts, Du'a library, Guides
6. **Layer 2 — Ritual Guide** (3 tasks): walkthrough screen, lost-action card, day-7/15-19/25 wiring
7. **Supabase + overrides** (1 task): daily_overrides table + read-only fetch
8. **Polish & ship** (2 tasks): PWA install flow, QR code, manasik distribution prep

---

## 14. Claude Design Prompt

> Use this verbatim with Claude (or any frontier design-capable LLM) once we begin UI work. It assumes the model will produce SvelteKit + Tailwind + Svelte 5 components.

---

**You are designing a calm, beautiful, offline-first Progressive Web App for Indonesian hajji on the Patuna travel "Coklat B" Hajj 2026 package. The user is a first-time pilgrim, age 45–65, anxious, surrounded by 2 million people, often without reliable network. Your job is to make them feel held — not entertained.**

**Constraints:**

- SvelteKit 2 + Svelte 5 runes + TypeScript + Tailwind CSS v4
- Mobile-first, single-column, max content width 480px
- Min tap target 44×44px; min body font 16px
- Must render perfectly at 100% screen brightness in direct Saudi sun (high contrast)
- Bahasa Indonesia primary; Arabic only for du'a, niat, and address cards
- No internet required after first install

**Mood & Aesthetic:**

- _Quiet, sacred, contemplative._ Think Apple Notes meets Muslim Pro at its most restrained, with a touch of Linear's typographic precision.
- Anti-references: no skeuomorphic mosques, no green-and-gold Islamic clip art, no Ramadan-greeting-card energy, no neon, no carousels, no AI-generated geometric patterns.
- Inspiration: _Things 3_ for calm, _Stripe Docs_ for typography, _the printed Quran_ for paper-like restraint.

**Color palette:**

- Background: `#FAFAF7` (ihram white, warm off-white)
- Foreground: `#1A1A1A` (kiswah black)
- Brand accent: `#5C3A21` (Patuna brown, used for headers and key actions)
- Gold detail: `#C8A971` (used sparingly, for ritual-day highlights only)
- Madinah phase: `#0F4C3A` (deep green, used as a phase ribbon when in Madinah)
- Makkah phase: `#5C3A21` (Patuna brown)
- Rukun phase (Arafah/Muzdalifah/Mina): `#C8A971` (gold) — these are the most sacred days
- Dark mode auto-activates after Maghrib: invert to `#0E0E0C` background, `#EDEAE2` text

**Typography:**

- Headlines: Geist Sans or Inter, weight 600, tight tracking
- Body: Source Serif 4 or Lora, weight 400, generous line-height (1.7)
- Arabic: Amiri (for du'a, large) or Scheherazade New (for inline transliteration)
- Hijri numerals (Arabic-Indic digits ٠-٩) used as quiet decoration in date headers
- Type scale: 14 / 16 / 18 / 22 / 28 / 36 px

**Motion:**

- Page transitions: 200ms ease-out fade + 4px slide
- Cards: 100ms scale to 0.98 on tap
- Phase ribbon: color drifts over 800ms when day changes
- Talbiyah text on Day-7+ home: fades in over 1.2s on first paint
- _Forbidden:_ bounce, parallax, confetti, scroll-jacking, ASMR-style "delight" animations

**Key screens to design:**

1. **Home (Now/Next mode, daytime)**
   - Top: phase ribbon (thin colored bar, 4px, current phase color)
   - Hero card: current city in large Arabic + Latin, "Hari 15 — 8 Zulhijjah 1447"
   - Now card: current activity, big and centered
   - Next card: countdown to next time-pinned activity
   - Climate strip: one-liner on today's weather norm
   - Bottom: 4-icon nav (Home, Itinerary, Du'a, More)

2. **Home (After-Maghrib mode)**
   - Same shell, but "Persiapan Besok" card occupies the hero position
   - Tomorrow's dress code, koper instructions, niat to memorize
   - Auto-dark theme

3. **Daily Detail (e.g. Hari 16 — Wukuf Arafah)**
   - Header: gold phase ribbon (rukun phase)
   - Day metadata, Hijri + Gregorian
   - Vertical timeline of activities with times on the left rail
   - "Niat Haji" highlighted in a parchment-style card with Arabic + Latin + Bahasa
   - Du'a section: 2–3 contextual du'a, each in its own card
   - Tips section: bullet list, prefixed with a small light-bulb glyph
   - Climate norm card at the bottom

4. **Ritual Guide — Wukuf Arafah walkthrough**
   - Step indicator (1 of 6, 2 of 6, ...) — minimal dots, no progress bar bling
   - Each step is a full-screen card: title, Arabic if applicable, Latin, Bahasa, 1-paragraph explanation, optional du'a
   - "Sebelumnya / Selanjutnya" buttons at bottom
   - Sticky "Tersesat?" button top-right that opens the address card

5. **Contacts**
   - Grouped sections: Patuna, Hotel, Saudi Emergency, Indonesian Government
   - Each contact: name, role, big "Telepon" + "WhatsApp" buttons
   - "Tampilkan dalam Bahasa Arab" toggle for hotel addresses (full-screen for taxi drivers)

6. **Du'a Library**
   - Searchable list, grouped by Hajj phase
   - Each entry: title in Bahasa, expand to show Arabic (large) + Latin + Bahasa
   - Tap-to-copy on each block

**Deliverable:**
For each screen, produce: (1) a Svelte 5 component file using runes, Tailwind classes, and minimal custom CSS for Arabic; (2) any shared types from the data model in Section 6; (3) a brief note on the design choice for that screen.

**Tone of the copy you write:**
Bahasa Indonesia, formal-but-warm (use "Anda", not "kamu"), short sentences, no jargon. Where you write Arabic, write it correctly with diacritics — do not paraphrase from memory; use the bundled JSON values verbatim.

---

## 15. Sign-off

**Author:** Panji Gautama
**Date drafted:** 2026-04-29
**Reviewers needed:** None for v0.1 (solo build); validate A1, A4 with Patuna muthawwif at manasik 2026-05-09.

_Bismillah hirrahmaan irrahiim. May this be of benefit, and may Allah accept the Hajj of every jamaah who uses it._
