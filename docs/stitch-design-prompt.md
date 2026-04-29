# Google Stitch Design Prompts — Patuna Coklat-B Hajj Companion

> **Tool:** Google Stitch — https://labs.google.com/stitch
> **Strategy:** One prompt per screen. Start with Prompt 0 (DESIGN.md) to establish
> the design system, then run screens in order 1 → 6.
> Each prompt is self-contained — copy and paste it verbatim.

---

## How to Use

1. Open Stitch at labs.google.com/stitch
2. Start a new project
3. **Run Prompt 0 first** — paste it as your opening message to establish the design system
4. Run Prompt 1 (Home screen) — this is the blocker for implementation
5. After each screen looks right, save a screenshot before moving to the next
6. Run Prompts 2–6 in order, one at a time

> **Stitch best practice:** Keep each prompt focused on one screen.
> Do not combine multiple screens in a single prompt.
> If output misses something, use a short follow-up ("make the Arabic text larger")
> rather than re-sending the full prompt.

---

## Prompt 0 — Design System (DESIGN.md / Opening Prompt)

> Paste this as your very first message in a new Stitch project.

---

A calm, sacred, offline-first mobile companion app for Indonesian Muslim pilgrims performing Hajj 2026 with Patuna travel agency. The user is a first-time hajji, age 45–65, anxious, holding their phone in the heat of Mecca surrounded by 2 million people. The app must make them feel held and guided — not entertained.

Design a mobile UI system with these exact characteristics:

**Atmosphere:** Paper-quiet and contemplative. Think a beautifully printed manasik guidebook brought to life on screen. Restrained like Apple Notes, typographically precise like Stripe Docs, spiritually grounded like the printed Quran. Density 3 out of 10 — generous whitespace, nothing crowded. Variance 5 — calm asymmetry, not rigid symmetry. Motion 3 — subtle and purposeful, nothing decorative.

**Color Palette:**
- Ihram White (#FAFAF7) — primary background, warm off-white like unbleached cotton
- Surface Parchment (#F2EFE8) — card backgrounds, slightly warmer than background
- Border Sand (#E5E0D5) — all dividers and card borders, 1px only
- Kiswah Black (#1A1A1A) — primary text, never pure black
- Muted Stone (#6B6560) — secondary text, timestamps, labels
- Patuna Brown (#5C3A21) — brand accent, used for active states, primary actions, key headings
- Hajj Gold (#C8A971) — used ONLY on the 5 sacred ritual days (Arafah, Muzdalifah, Mina). Never decorative.
- Madinah Green (#0F4C3A) — used ONLY as phase indicator when in Madinah
- Dark Canvas (#0E0E0C) — dark mode background (auto after sunset)
- Dark Text (#EDEAE2) — dark mode primary text

**Typography:**
- Headlines and UI labels: Inter Variable, weight 600, tight letter-spacing
- Body prose (tips, explanations, descriptions): Source Serif 4 Variable, weight 400, line-height 1.7
- Arabic text (du'a, niat, address cards): Amiri, minimum 24px, direction RTL, line-height 2.2, full diacritics always
- Type scale: 13px / 15px / 16px / 18px / 22px / 28px / 36px
- NEVER use decorative display fonts — this is not a marketing app

**Components:**
- Cards: rounded-2xl (16px), Surface Parchment background, Border Sand 1px border, no drop shadow. On tap: scale to 0.98 over 100ms, no bounce.
- Buttons primary: Patuna Brown fill, white text, rounded-xl, 52px height minimum, no outer glow
- Buttons ghost: Border Sand 1px border, Kiswah Black text, same sizing
- Phase ribbon: 4px solid bar at very top of screen, full width. Color changes with current journey phase (Madinah=green, Makkah=brown, Arafah/Muzdalifah/Mina=gold). Color transitions over 800ms.
- Bottom navigation: 56px height + iOS safe area, Border Sand top border 1px, 4 icons with 11px labels, active icon in Patuna Brown
- Arabic niat cards: parchment background (#EDE8DC), generous padding, rounded-2xl, centered Arabic at 40px, Latin transliteration in italic Muted Stone below

**Layout:**
- Single column, max width 480px, centered on larger screens
- Minimum tap target 44×44px everywhere
- iOS safe area insets respected top and bottom
- Content scrolls behind fixed bottom nav — always add bottom padding equal to nav height + safe area

**Motion (minimal):**
- Page transitions: 200ms ease-out fade + 4px upward slide
- Card press: 100ms scale to 0.98, immediate release
- Phase ribbon color: 800ms ease-in-out color drift
- BANNED: bounce, parallax, confetti, carousels, scroll-jacking, spinning loaders

**Anti-patterns — NEVER do any of these:**
- No green-and-gold Islamic clipart or ornamental geometric borders
- No Ramadan-greeting-card aesthetic
- No mosque silhouettes or Kaaba icons as decoration
- No neon gradients or glowing elements
- No oversaturated colors
- No emojis in UI (only in tips text where contextually appropriate)
- No 3-column equal grids
- No pure black (#000000)
- No floating labels on inputs
- No circular loading spinners
- No "Bismillah" as a UI label or button

---

## Prompt 1 — Home Screen: Now/Next (Daytime)

> This is the most important screen. Run this immediately after Prompt 0.
> It is the blocker for implementation — implement this first.

---

Design the main home screen for the Hajj companion app. This screen answers three questions in one glance: where am I in the journey, what is happening right now, and what comes next.

Show a mobile screen (375px wide) with this layout from top to bottom:

**Phase ribbon:** 4px solid bar, full width, deep green color (#0F4C3A) — we are currently in Madinah.

**Header area:** Two rows. First row: "HARI 3" in 13px semibold Patuna Brown on the left, "26 Zulqa'dah 1447" in 13px Muted Stone on the right. Second row: centered Arabic text in Amiri 32px — مَدِينَةُ الْمُنَوَّرَة — with "Madinah Al Munawwarah" in 14px Muted Stone centered below it. The Arabic city name is the emotional anchor of this screen — sacred, calm, significant.

**Now card:** Large card with Surface Parchment background, rounded-2xl, 20px padding. "SEKARANG" in 11px tracking-widest Muted Stone uppercase at top. Below: "Sholat Subuh di Masjid Nabawi" in 22px semibold Kiswah Black. Below that: "Masjid Nabawi" in 14px Muted Stone. The entire card is tappable.

**Next card:** Slightly smaller card, same style. Left side: "BERIKUTNYA" in 11px Muted Stone uppercase, then "Sarapan Pagi di Hotel" in 18px medium Kiswah Black below. Right side: "07:23" in 22px bold Patuna Brown, "lagi" in 12px Muted Stone below the countdown.

**Climate strip:** Single-line strip, Surface Parchment background, no border. Sun icon (minimal, 16px). "Madinah hari ini · tipikal 36°C, berawan — tetap terhidrasi" in 13px Muted Stone. Sits between the Next card and bottom nav.

**Bottom navigation:** Fixed to bottom. 4 items: House icon (active, Patuna Brown filled) labeled "Beranda", CalendarDays icon (inactive, Muted Stone) labeled "Jadwal", BookOpen icon labeled "Doa", MoreHorizontal icon labeled "Lainnya". Icons 24px, labels 11px, Border Sand 1px top border.

---

## Prompt 2 — Home Screen: After-Maghrib / Evening Mode

> Run after Prompt 1 is approved. Use a follow-up in the same session.

---

Now show the same home screen but in evening mode — this activates automatically after Maghrib prayer. The app shifts from "what's happening now" to "prepare for tomorrow."

**Changes from the daytime home screen:**

Switch to dark mode: background becomes #0E0E0C, all card backgrounds become #1A1916, text becomes #EDEAE2, Muted Stone becomes #9A9590, borders become #2E2C28. The transition feels like the app dimming itself for evening — calm and intentional.

Replace the Now card and Next card with a single "Persiapan Besok" (Prepare for Tomorrow) card. This card is larger and has three internal sections separated by subtle 1px dividers:

Section 1 — header: "BESOK — HARI 7" in 11px tracking-widest uppercase gold (#C8A971). Below: "Madinah → Makkah" in 18px semibold #EDEAE2.

Section 2 — dress code: "Seragam" label in 11px Muted Stone uppercase. Two rows: "Pria: Ihram Patuna" and "Wanita: Gamis Putih (Mukena Atasan Ungu Patuna)" in 15px #EDEAE2.

Section 3 — memorize tonight: "Hafalkan malam ini" label in 11px Muted Stone uppercase. Arabic text in Amiri 32px centered, white: لَبَّيْكَ اللَّهُمَّ عُمْرَةً — with "Labbaik Allahumma 'Umratan" in 14px italic #9A9590 below. The Arabic niat should be the brightest element on the dark screen — drawing the eye naturally for memorization.

Phase ribbon remains green (#0F4C3A) but at 60% opacity.
Bottom nav remains, dark theme.

---

## Prompt 3 — Daily Detail: Hari 16 Wukuf Arafah

> Run after Prompt 2 is approved. New focus — the itinerary detail screen.

---

Design the day detail screen for Hari 16 — Wukuf di Arafah. This is the most sacred day of Hajj. The design must communicate weight and holiness without being dramatic.

**Phase ribbon:** 4px, Hajj Gold (#C8A971) — we are in the Rukun phase.

**Top bar:** "← Jadwal" ghost text button in Patuna Brown, left-aligned, 44px tap target.

**Day header block:**
- "HARI 16" in 11px tracking-widest Muted Stone uppercase
- "Wukuf di Arafah" in 28px semibold Kiswah Black — this is the most prominent line
- "Selasa, 26 Mei 2026 · 9 Zulhijjah 1447" in 14px Muted Stone
- "Padang Arafah → Muzdalifah" in 13px Muted Stone

**Climate warning card:** Surface Parchment card, 3px left border in Hajj Gold (#C8A971). "☀ Arafah hari ini · tipikal 41°C, sangat kering — minum 3–4L air, hindari aktivitas siang hari" in 14px. Gold left border signals: pay attention.

**Ritual guide button:** Full-width button, Hajj Gold background (#C8A971), Kiswah Black text, 52px height, rounded-xl. Text: "Buka Panduan Wukuf →" in 16px semibold. This is an invitation, not a CTA — calm and unhurried.

**Timeline section:** Label "AGENDA HARI INI" in 11px Muted Stone uppercase. Vertical timeline: time column 48px wide on left (13px monospace Muted Stone, right-aligned), vertical dotted line in center, activity text on right (15px Kiswah Black). Activities: "23:59 — Memasuki Bus menuju Arafah", "Subuh — Sholat berjamaah di Tenda Arafah", "Zuhur–Ashar — Khutbah Wukuf + Sholat Jamak Takdim Qashar", "Maghrib–Isya — Jamak Takdim Qashar, Makan Malam", "Malam — Persiapan menuju Muzdalifah". Current item dot in Patuna Brown, others in Border Sand.

**Niat card:** Parchment-toned background (#EDE8DC), rounded-2xl, generous padding. "NIAT HAJI" in 11px tracking-widest Hajj Gold uppercase. Arabic in Amiri 36px centered: لَبَّيْكَ اللَّهُمَّ حَجًّا. Italic 14px Muted Stone centered below: Labbaik Allahumma Hajjan. 14px Source Serif 4 body below: "Ya Allah, aku datang memenuhi panggilan-Mu untuk berhaji."

**Tips section:** "TIPS HARI INI" label. Each tip prefixed with a minimal lightbulb outline icon (16px, Muted Stone). Tips in 15px Source Serif 4. Three tips: "Bawa botol minum besar — dispenser tersedia di tenda.", "Tetap berwudhu sejak pagi hari.", "Perbanyak doa dan dzikir — ini puncak ibadah haji."

---

## Prompt 4 — Ritual Guide: Wukuf Arafah Walkthrough

> Run after Prompt 3 is approved. Full-screen immersive — no bottom nav.

---

Design the ritual guide walkthrough screen for Wukuf Arafah. This is the most important screen in the app. The jamaah uses this screen to guide themselves through the most sacred moments of their life. It must feel like reading a beautifully printed manasik book — not using an app.

**No bottom navigation** on this screen — it is removed for full immersion.

**Top bar (fixed):** Left side: "← Kembali" in 15px Patuna Brown, 44px tap target. Center: "Wukuf Arafah" in 15px semibold Kiswah Black. Right side: "Tersesat?" button — small, rounded-full, 1px Patuna Brown border, Patuna Brown text, 36px height. This button is always visible no matter which step the user is on.

**Step dots:** 6 small dots centered below the top bar, 8px gap between. Current dot (dot 2): 8px diameter, Patuna Brown filled. Other dots: 6px diameter, Border Sand filled with Muted Stone border. No numbers. No progress bar. Just quiet dots.

**Step card:** Large card filling most of the screen height, 16px horizontal margin, Surface Parchment background, rounded-2xl, 24px padding. Content inside:
- "Langkah 2 dari 6" in 11px tracking-widest Muted Stone uppercase
- "Niat Haji" in 22px semibold Kiswah Black
- Arabic in Amiri 40px centered: لَبَّيْكَ اللَّهُمَّ حَجًّا
- "Labbaik Allahumma Hajjan" in 15px italic Muted Stone centered
- "Ya Allah, aku datang memenuhi panggilan-Mu untuk berhaji." in 15px Source Serif 4 centered, Kiswah Black
- 1px Border Sand horizontal divider
- Explanation in 15px Source Serif 4, left-aligned, line-height 1.7, Kiswah Black: "Niat diucapkan dalam hati saat bus memasuki kawasan Arafah, setelah tengah malam. Ucapkan sekali dengan penuh keyakinan. Setelah niat, Anda resmi dalam kondisi haji."
- Warning box below: subtle warm red-tinted background (#FEF2F2), 1px border #FECACA, rounded-xl, 12px padding. "⚠ Larangan ihram tetap berlaku sejak niat Umrah di Bir Ali." in 13px #991B1B.

**Bottom navigation (step controls, fixed):** Two buttons side by side, 16px margin, 12px gap. "← Sebelumnya" — ghost button, 1px Border Sand border, Kiswah Black text, 48px height, flex-1. "Selanjutnya →" — Patuna Brown background, white text, 48px height, flex-1, rounded-xl.

**"Tersesat?" overlay (show as a separate state):** Full screen white overlay. Top: "Tunjukkan ke sopir atau petugas" in 16px semibold Kiswah Black, centered. Large Arabic in Amiri 36px centered: فُنْدُقُ مَارْيُوتْ جَبَلْ عُمَرَ، مَكَّةُ الْمُكَرَّمَة. Below: "Marriott Jabal Omar, Makkah Al Mukarramah" in 14px Muted Stone centered. Then a large "Hubungi Muthawwif" button — Patuna Brown, white text, phone icon, full width, 56px. Top right: × close button 44px.

---

## Prompt 5 — Contacts Screen

> Run after Prompt 4 is approved. Utilitarian — fast to scan under stress.

---

Design the contacts screen. A jamaah under stress needs to find a phone number in under 3 seconds. Nothing decorative — pure function.

**Top bar:** "← Lainnya" back button left, "Kontak Penting" in 22px semibold Kiswah Black centered.

**Grouped sections** with 11px tracking-widest Muted Stone uppercase section labels. Between sections: 24px vertical gap. Within sections: 1px Border Sand divider between contacts (no cards — use dividers like a phone book, not floating cards).

**Section PATUNA:**
Contact row: "Ustadz Ahmad Fauzi" in 15px semibold, "Pembimbing Bus B-18" in 13px Muted Stone below. Two buttons right-aligned: "Telepon" — 1px Patuna Brown border, Patuna Brown text, phone icon, 40px height, rounded-lg. "WhatsApp" — #25D366 fill, white text, WhatsApp icon, same sizing. Tap targets minimum 44px. Show one muthawwif per bus (B-18, B-19, B-20, B-21). If number TBD, show "Nomor diperoleh saat manasik" in 13px italic Muted Stone instead of buttons.

**Section AKOMODASI:**
Each hotel: name in 15px semibold, city in 13px Muted Stone. Below: "Tampilkan Alamat Arab →" in 13px Patuna Brown text button — opens the full-screen Arabic address overlay. Hotels: Grand Plaza Badr Al Maqam (Madinah), Marriott Jabal Omar (Makkah), Ash Shishah (Makkah).

**Section DARURAT SAUDI:**
Three emergency contacts. Each: number bold 22px Kiswah Black on left, service name 13px Muted Stone below number. Large "Telepon" button on right — red fill (#DC2626), white text, 48px height, rounded-xl. Numbers: 911 (Darurat Umum), 937 (Layanan Kesehatan), 993 (Kepolisian). Red buttons — no ambiguity.

**Section PEMERINTAH INDONESIA:**
KJRI Jeddah — name, address in 13px Muted Stone, single Telepon button Patuna Brown fill.

**Arabic address overlay (show as separate state):** Full screen, white background, only two elements: Arabic address in Amiri 36px centered — فُنْدُقُ مَارْيُوتْ جَبَلْ عُمَرَ، مَكَّةُ الْمُكَرَّمَة — and below it "Tunjukkan layar ini kepada sopir taksi" in 14px Muted Stone centered. Top right: × close, 44px. Nothing else on this screen.

---

## Prompt 6 — Du'a Library Screen

> Run after Prompt 5 is approved. The closest the app comes to a digital kitab.

---

Design the du'a library screen. This is the most intimate screen in the app — the jamaah reads these words in the holiest places on earth. It must feel like reading a beautifully typeset kitab, not scrolling a content feed.

**Top bar:** "Doa & Dzikir" in 22px semibold Kiswah Black. No back button (this is a tab, not a pushed screen).

**Search bar:** 48px height, rounded-xl, Surface Parchment background, 1px Border Sand border. Search icon prefix in Muted Stone. Placeholder: "Cari doa..." in 15px Muted Stone italic. No border highlight on focus — just subtle background shift to white.

**Phase group labels (sticky within their section):** 11px tracking-widest Muted Stone uppercase. Groups: PERSIAPAN IHRAM, THAWAF, SA'I, WUKUF & ARAFAH, MINA & JUMRAH, THAWAF WADA.

**Du'a list item (collapsed):** No card box — just content with a 1px Border Sand bottom divider, like a list in a book. Left side: "Niat Umrah" in 15px semibold Kiswah Black, "Saat di Bir Ali" in 12px Muted Stone below. Right side: chevron-down icon in Muted Stone 20px. Full row height 64px minimum tap target.

**Du'a list item (expanded):** Expands below the title row. Surface Parchment background on the expanded area, 1px Border Sand top border. Content: Arabic in Amiri 28px right-aligned: لَبَّيْكَ اللَّهُمَّ عُمْرَةً. Latin transliteration in 14px italic Muted Stone right-aligned: Labbaik Allahumma 'Umratan. Bahasa translation in 15px Source Serif 4 left-aligned, line-height 1.7: "Ya Allah, aku memenuhi panggilan-Mu untuk berumrah." Bottom row: clipboard icon + "Salin teks Arab" in 13px Patuna Brown, right-aligned. Chevron-up to collapse. Generous padding (20px) — the Arabic deserves breathing room.

Show 3 collapsed items and 1 expanded item to demonstrate both states simultaneously. The expanded state should feel like opening a page in a book — quiet reveal, no animation drama.

---

## Follow-up Refinement Prompts

After each screen, use short targeted follow-ups if needed. Examples:

- "Make the Arabic text in the Now card larger and more prominent."
- "The Now card feels too small — increase its vertical padding."
- "The phase ribbon is too thick — reduce to 3px."
- "The climate strip text is hard to read — increase contrast."
- "The bottom nav labels are too small — increase to 12px."
- "The Ritual Guide step card needs more breathing room between Arabic and explanation."
- "Make the emergency phone buttons taller — 56px."
- "The du'a expanded state feels cramped — more padding around the Arabic."

---

## After All Screens Are Approved

Export each screen as PNG. Place them at:
```
docs/mockups/screen-1-home-daytime.png
docs/mockups/screen-2-home-evening.png
docs/mockups/screen-3-day-detail-wukuf.png
docs/mockups/screen-4-ritual-guide.png
docs/mockups/screen-5-contacts.png
docs/mockups/screen-6-dua-library.png
```

These mockups feed directly into Tasks 10–20 of the implementation plan.
