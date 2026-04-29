# Claude Design Prompt — Patuna Coklat-B Hajj Companion

> **Tool:** Claude Design (https://www.anthropic.com/news/claude-design-anthropic-labs)
> **Run screens in this order** — each one unblocks the next track of implementation.
> Copy one screen prompt at a time. Start with Screen 1.

---

## Context (include this at the top of every prompt)

You are designing a calm, beautiful, offline-first Progressive Web App for Indonesian hajji on the Patuna travel "Coklat B" Hajj 2026 package. The user is a first-time pilgrim, age 45–65, anxious, surrounded by 2 million people, often without reliable network. Your job is to make them feel **held — not entertained.**

**Stack & constraints:**
- SvelteKit 2 + Svelte 5 runes + TypeScript + Tailwind CSS v4
- Mobile-first, single-column, max content width 480px, centered on larger screens
- Min tap target 44×44px; min body font 16px
- Must render perfectly at 100% screen brightness in direct Saudi sun (high contrast)
- Bahasa Indonesia primary; Arabic only for du'a, niat, and address cards
- No internet required after first install

**Design tokens already in the codebase — use these CSS variable names exactly, do not hardcode hex:**
```css
--color-brand: #5C3A21        /* Patuna brown */
--color-gold: #C8A971         /* gold, rukun phase accent */
--color-background: #FAFAF7   /* ihram white */
--color-surface: #F2EFE8      /* card background */
--color-border: #E5E0D5       /* subtle borders */
--color-foreground: #1A1A1A   /* kiswah black */
--color-muted: #6B6560        /* secondary text */
--color-phase-madinah: #0F4C3A
--color-phase-makkah: #5C3A21
--color-phase-rukun: #9A7A3A
--color-phase-arrival: #2D4A6E
--color-phase-ash-shishah: #4A3728
--color-phase-departure: #2D4A6E
--color-background-dark: #0E0E0C
--color-foreground-dark: #EDEAE2
```

**Typography tokens:**
```css
--font-sans: 'Inter Variable'         /* headlines, UI labels */
--font-serif: 'Source Serif 4 Variable' /* body prose */
--font-arabic: 'Amiri'               /* all Arabic text */
```

**Arabic CSS classes (already defined):**
- `arabic` — 24px, RTL, line-height 2.2, Amiri
- `arabic-lg` — 32px, RTL, line-height 2.2, Amiri
- `arabic-xl` — 40px, RTL, line-height 2.2, Amiri

**Shared utility classes:**
- `card-pressable` — scale 0.98 on tap, 100ms ease-out
- `phase-ribbon` — 800ms color transition
- `tap-target` — min 44×44px
- `pb-nav` — padding-bottom for bottom nav clearance
- `pt-safe` / `pb-safe` — iOS safe area insets

**Mood & aesthetic:**
- *Quiet, sacred, contemplative.* Think Apple Notes meets Muslim Pro at its most restrained, with a touch of Linear's typographic precision.
- Anti-references: no skeuomorphic mosques, no green-and-gold Islamic clip art, no Ramadan-greeting-card energy, no neon, no carousels, no AI-generated geometric patterns.
- Inspiration: *Things 3* for calm, *Stripe Docs* for typography, *the printed Quran* for paper-like restraint.

**Motion rules:**
- Page transitions: 200ms ease-out fade + 4px translateY slide
- Cards: 100ms scale to 0.98 on tap (via `card-pressable`)
- Phase ribbon: color drifts 800ms when day changes (via `phase-ribbon`)
- *Forbidden:* bounce, parallax, confetti, scroll-jacking

---

## Screen 1 — Home: Now/Next (BLOCKER — implement first)

This is the main page (`/`). It is the heart of the app. Everything else is secondary.

**What it must answer in one glance:**
1. Where am I in the journey? (phase + day)
2. What is happening right now?
3. What is next, and how long until then?

**Layout (top to bottom):**

1. **Phase ribbon** — 4px solid bar at very top, full width, color = `--color-phase-madinah` (for this mockup). Uses `.phase-ribbon` class for transition.

2. **Header row** — Patuna brown label "HARI 3" on the left, Hijri date "26 Zulqa'dah 1447" on the right. Small, muted. Below it, the city name in large Arabic script (`arabic-lg`) centered: **مَدِينَةُ الْمُنَوَّرَة** with "Madinah Al Munawwarah" in smaller Latin below.

3. **Now card** — Large card (`card-pressable`), surface background, rounded-2xl, generous padding. Label "SEKARANG" in tiny tracking-widest muted uppercase. Below: activity title in 22px semibold, e.g. "Sholat Subuh di Masjid Nabawi". Below that: location in muted 14px "Masjid Nabawi". Tapping navigates to the day detail.

4. **Next card** — Slightly smaller, same card style. Label "BERIKUTNYA" in tiny muted uppercase. Activity: "Sarapan Pagi di Hotel" in 18px medium. Right side: countdown in brand color, bold — "07:23". Muted label below the countdown: "lagi".

5. **Climate strip** — Thin single-line strip between the cards and nav. Background `--color-surface`. Icon: sun or cloud glyph. Text: "Madinah hari ini · tipikal 36°C, berawan — tetap terhidrasi" in 13px muted. No border, just background difference.

6. **Bottom nav** — Fixed, 4 icons: House (Home, active in brand color), CalendarDays (Jadwal), BookOpen (Doa), MoreHorizontal (Lainnya). Labels below each icon in 11px. Active icon filled brand color, inactive muted. Height 56px + safe-area-inset-bottom. Top border 1px `--color-border`.

**Svelte 5 component:** `src/routes/+page.svelte`
Accepts these props via data (mock them inline for the design):
```ts
const mockDay = {
  dayNumber: 3,
  hijriDate: "26 Zulqa'dah 1447",
  location: "Madinah",
  locationArabic: "مَدِينَةُ الْمُنَوَّرَة",
  phase: "madinah",
  now: { title: "Sholat Subuh di Masjid Nabawi", place: "Masjid Nabawi" },
  next: { title: "Sarapan Pagi di Hotel", minutesAway: 443 },
  climate: "tipikal 36°C, berawan — tetap terhidrasi"
}
```

**Design note to include:** The city name in Arabic is the emotional anchor of this screen. It reminds the jamaah where they are spiritually, not just geographically. Keep it large enough to feel significant but not so large it dominates.

---

## Screen 2 — Home: After-Maghrib / Persiapan Besok

Same shell as Screen 1, but the hero section shifts to preparation for tomorrow. Auto-activates after Maghrib prayer time.

**Changes from Screen 1:**
- `data-theme="dark"` on `<html>` — dark background `#0E0E0C`, text `#EDEAE2`
- Phase ribbon remains, but slightly dimmer
- Replace "Now card" + "Next card" with a single **"Persiapan Besok"** hero card:
  - Header: "BESOK — HARI 7" in tiny muted uppercase, "Madinah → Makkah" as subtitle
  - Section "Seragam": men "Ihram Patuna", women "Gamis Putih (Mukena Atasan Ungu)"
  - Section "Koper": "Siapkan 2 pasang pakaian dalam tas kecil. Koper besar Patuna untuk Makkah."
  - Section "Hafalkan malam ini": niat Umrah in `arabic-lg` — **لَبَّيْكَ اللَّهُمَّ عُمْرَةً** — with Latin below: *Labbaik Allahumma 'Umratan*
- Bottom nav stays, same structure

**Svelte 5 component:** Modify `src/routes/+page.svelte` with `{#if isAfterMaghrib}` branch.

**Design note:** The dark theme should feel like the app dimming itself for evening — calm and intentional, not jarring. The niat Arabic should be the brightest element on screen, inviting the jamaah to read and memorize it.

---

## Screen 3 — Daily Detail: Hari 16 Wukuf Arafah

Route: `/itinerary/16`

This is a critical day. The design must communicate weight and holiness without being dramatic.

**Layout (scrollable, top to bottom):**

1. **Phase ribbon** — gold (`--color-phase-rukun`), 4px
2. **Back button** — "← Jadwal" in brand color, 44px tap target, top-left
3. **Day header block:**
   - "HARI 16" tiny muted uppercase
   - "Wukuf di Arafah" in 28px semibold — the most important line on the screen
   - "Selasa, 26 Mei 2026 · 9 Zulhijjah 1447" in 14px muted
   - Location: "Padang Arafah → Muzdalifah" in 13px muted
4. **Climate card** — surface card, no shadow. Sun icon. "Arafah hari ini · tipikal 41°C, sangat kering — minum 3–4L air, hindari aktivitas siang hari." Text in 14px. Gold left border 3px to visually signal "pay attention".
5. **"Buka Panduan Wukuf →"** — full-width button, gold background (`--color-gold`), dark text, rounded-xl, 52px height. This is the gateway to the Ritual Guide screen.
6. **Timeline section** — "AGENDA HARI INI" label. Vertical timeline: time on left (muted, monospace, right-aligned in a 48px column), activity on right. Times: 23:59 (prev day) "Memasuki Bus menuju Arafah", then Subuh "Sholat berjamaah di Tenda Arafah", Zuhur–Ashar "Khutbah Wukuf + Sholat Jamak Takdim Qashar", Maghrib–Isya "Jamak Takdim Qashar, Makan Malam", then "Persiapan menuju Muzdalifah". Dot connector on the timeline. Active/current item uses brand color dot.
7. **Niat card** — parchment-style: background slightly warmer than surface (#EDE8DC), rounded-xl, padding generous. Label "NIAT HAJI" tiny gold uppercase. Arabic `arabic-xl`: **لَبَّيْكَ اللَّهُمَّ حَجًّا**. Latin below in italic muted: *Labbaik Allahumma Hajjan*. Bahasa below: "Ya Allah, aku datang memenuhi panggilan-Mu untuk berhaji."
8. **Tips section** — "TIPS HARI INI" label. Each tip: 💡 prefix (or a minimal lightbulb SVG), 15px body. E.g. "Bawa botol minum besar — dispenser air tersedia di tenda.", "Tetap berwudhu sejak pagi hari.", "Perbanyak doa dan dzikir — ini adalah puncak ibadah haji."
9. **Du'a section** — "DOA HARI INI" label. 2 du'a cards, each: title in 15px semibold, expand arrow, when expanded: Arabic `arabic-lg`, Latin italic muted, Bahasa translation, tap-to-copy button.

**Design note:** The timeline is the structural spine. Everything else (niat, tips, du'a) hangs off it. The "Buka Panduan Wukuf" button should feel like an invitation, not a CTA — gold, calm, unhurried.

---

## Screen 4 — Ritual Guide: Wukuf Arafah walkthrough

Route: `/ritual/wukuf-arafah`

Full-screen, immersive. No bottom nav. This is the most important screen in the app.

**Layout:**

1. **Top bar** — left: "← Kembali" ghost button. Center: "Wukuf Arafah" in 15px semibold. Right: sticky **"Tersesat?"** button — small, rounded-full, border `--color-brand`, brand text, 36px height. Always visible.

2. **Step indicator** — 6 dots centered below top bar. Current dot: filled brand color, 8px. Others: unfilled border, 6px. No numbers, no progress bar — just quiet dots.

3. **Step card** — fills remaining screen height minus top bar and bottom buttons. Surface background, rounded-2xl, margin 16px horizontal. Content:
   - Step number: "Langkah 2 dari 6" in tiny muted uppercase
   - Title: "Niat Haji" in 22px semibold
   - Arabic (`arabic-xl`, centered): **لَبَّيْكَ اللَّهُمَّ حَجًّا**
   - Latin (italic, muted, centered): *Labbaik Allahumma Hajjan*
   - Bahasa (centered, 15px): "Ya Allah, aku datang memenuhi panggilan-Mu untuk berhaji."
   - Divider
   - Explanation (left-aligned, 15px serif body, line-height 1.7): "Niat diucapkan dalam hati saat bus memasuki kawasan Arafah, setelah tengah malam. Ucapkan sekali dengan penuh keyakinan. Setelah niat, Anda resmi dalam kondisi haji."
   - Warning box (if applicable) — subtle red-tinted surface, 13px: "⚠ Larangan ihram tetap berlaku sejak niat Umrah di Bir Ali."

4. **Bottom navigation** — fixed, above safe area. Two buttons side by side:
   - "← Sebelumnya" — ghost, border, 48px height, flex-1
   - "Selanjutnya →" — brand background, white text, 48px height, flex-1

**"Tersesat?" modal** — when tapped, overlays full screen:
   - Title: "Tunjukkan ke sopir atau petugas"
   - Hotel address in massive Arabic (`arabic-xl`): **فُنْدُقُ مَارْيُوتْ جَبَلْ عُمَرَ، مَكَّةُ الْمُكَرَّمَة**
   - 1-tap "Hubungi Muthawwif" button with phone icon
   - Close button

**Design note:** The step card should feel like a page in a beautifully printed manasik book — not a UI component. The jamaah should forget they're using an app. Generous whitespace, large Arabic, unhurried prose. The "Tersesat?" button is always reachable because the most critical moment for needing it is exactly when the user is in the middle of a ritual step.

---

## Screen 5 — Contacts

Route: `/more/contacts`

Calm, utilitarian, fast to scan. A jamaah under stress needs to find a number in under 3 seconds.

**Layout:**

1. **Header** — "Kontak Penting" in 22px semibold, back button top-left.

2. **Grouped sections**, each with a section label (tiny muted uppercase):

   **PATUNA**
   - Each muthawwif: name (bold), "Pembimbing Bus B-18" (muted 13px). Two buttons side by side: "Telepon" (brand outline button, phone icon) + "WhatsApp" (green filled, WhatsApp icon). 52px height each.
   - If number TBD: show placeholder "Nomor diperoleh saat manasik" in muted italic.

   **AKOMODASI**
   - Hotel Madinah: "Grand Plaza Badr Al Maqam" + city. "Tampilkan Alamat Arab →" text button in brand color — opens full-screen Arabic address card.
   - Hotel Makkah: "Marriott Jabal Omar" + same pattern.
   - Apartment: "Ash Shishah" + same pattern.

   **DARURAT SAUDI**
   - 911 — "Darurat Umum" — single large "Telepon" button, red background
   - 937 — "Layanan Kesehatan"
   - 993 — "Kepolisian"

   **PEMERINTAH INDONESIA**
   - KJRI Jeddah — name + address + telepon button

3. **Arabic address full-screen overlay** — triggered by "Tampilkan Alamat Arab →". White background, single centered Arabic block in `arabic-xl`. Subtitle in small muted Bahasa: "Tunjukkan layar ini kepada sopir taksi." Close button top-right.

**Design note:** The emergency numbers must have highest visual weight — red buttons, no ambiguity. The Arabic address overlay must be maximally simple: one piece of information, one action (show to driver), nothing else.

---

## Screen 6 — Du'a Library

Route: `/dua`

Quiet, searchable, respectful. This is the closest the app comes to feeling like a digital kitab.

**Layout:**

1. **Header** — "Doa & Dzikir" in 22px semibold.

2. **Search bar** — rounded-xl, surface background, search icon prefix, placeholder "Cari doa..." in muted. 48px height. No border on focus — just subtle shadow lift.

3. **Phase group labels** — sticky within their section, tiny muted uppercase. E.g. "PERSIAPAN IHRAM", "THAWAF", "SA'I", "WUKUF ARAFAH".

4. **Du'a list item (collapsed):**
   - Title: "Niat Umrah" in 15px semibold
   - Tag: "Saat di Bir Ali" in tiny muted — when to read
   - Right: chevron-down icon, muted
   - Bottom border only (no card box shadow — feels more like a list in a book)

5. **Du'a list item (expanded):**
   - Arabic (`arabic-lg`, right-aligned): **لَبَّيْكَ اللَّهُمَّ عُمْرَةً**
   - Latin (italic, muted, right-aligned): *Labbaik Allahumma 'Umratan*
   - Bahasa (left-aligned, 15px serif): "Ya Allah, aku memenuhi panggilan-Mu untuk berumrah."
   - Tap-to-copy row: clipboard icon + "Salin teks Arab" in 13px brand color, right-aligned
   - Chevron-up to collapse

**Design note:** Avoid making this look like a flashcard app. The lack of card boxes in the collapsed state — just a bottom border — makes it feel like reading a book. The expanded state reveals the Arabic with appropriate reverence: large, centered, plenty of breathing room above and below.

---

## Deliverable for each screen

For each screen produce:
1. A complete Svelte 5 component (`.svelte`) using runes (`$state`, `$derived`, `$props`), Tailwind classes with the CSS variables above, minimal inline CSS only for Arabic layout
2. Any TypeScript interfaces needed (inline in the component is fine)
3. One paragraph "Design rationale" explaining the key choices

**Tone of any Bahasa Indonesia copy:** formal-but-warm (use "Anda" not "kamu"), short sentences, no jargon. Arabic must have full diacritics (tashkeel) — do not approximate from memory, use the exact text shown in each screen spec above.
