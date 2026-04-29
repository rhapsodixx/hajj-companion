# Du'a Library — Search + Category Chips

## Problem Statement

**How might we let a pilgrim quickly find the right du'a among 21–30 entries when they're either anxiously rushed ("which doa for tawaf?!") or browsing at leisure in their hotel room?**

Currently the `/dua` page groups du'as by 8 categories with accordion expanders — no search, no quick-filter. The category labels are clear (Tawaf, Jumrah, etc.) but require scrolling through all groups. For a 45–65 year old pilgrim standing in Masjidil Haram wanting to find "doa tawaf" fast, scrolling is friction.

## Recommended Direction

**Horizontal category chip row + sticky search bar.** Two complementary paths to the same goal:

1. **Category chips** — A horizontally scrollable row of tappable chips (Niat, Masjid, Tawaf, Sa'i, Wukuf, Jumrah, Safar, Umum). Tapping a chip filters the list to that category. Tapping again deselects (shows all). One big tap — no typing needed. This is the primary path for the target demographic.

2. **Search bar** — A text input below the header (and above chips) that filters across `title`, `translation`, and `whenToRead` fields. Case-insensitive, accent-insensitive. Serves the edge cases where a pilgrim knows a keyword but not which category. When active, overrides chip selection and shows a flat filtered list.

When neither is active, the list renders grouped by category (current behavior). When a chip is selected, only that category's du'as render with group header hidden (since redundant). When searching, results render flat with category labels as subtle secondary text.

## Key Assumptions to Validate

- [ ] Du'a count stays under 50 — if it grows past that, chips stay useful but search becomes the primary path
- [ ] Users recognize category names ("Tawaf", "Jumrah") well enough to tap them — likely true, these are standard hajj vocabulary
- [ ] `whenToRead` field is descriptive enough for search matching — confirmed: entries like "Saat melempar Jumrah Ula dan Wustha" are rich
- [ ] No Arabic search needed for MVP — Arabic text won't be searchable (accent-insensitive Arabic search is complex and the target user thinks in Bahasa)

## MVP Scope

### In

- Horizontal scrollable chip row with 8 category filters
- Search input filtering across `title` + `translation` + `whenToRead`
- Smooth transition between grouped (default), chip-filtered, and search-filtered views
- Result count indicator ("3 doa ditemukan")
- Empty state when search/chip yields no results ("Doa tidak ditemukan. Coba kata lain.")
- Sticky header (search + chips) on scroll
- Clear button (×) in search input to reset

### Files to modify/create

- `src/routes/(app)/dua/+page.svelte` — add search state, chip filter logic, conditional rendering
- `src/lib/components/dua/SearchBar.svelte` — new component (search input with clear button)
- `src/lib/components/dua/CategoryChips.svelte` — new component (horizontal scrollable chip row)

### Search implementation

- Filter function matches query against `title.toLowerCase()`, `translation.toLowerCase()`, `whenToRead.toLowerCase()`
- Debounced at 200ms (or instant — with 21 items, no perf concern)
- Accent-insensitive via `normalize('NFD').replace(/[̀-ͯ]/g, '')` on both query and target

## Not Doing (and Why)

- **Arabic text search** — Accent-insensitive Arabic search is complex (diacritics, hamza normalization). The target user searches in Bahasa. Can add later if requested.
- **Tap-to-copy** — Not in scope for this feature. Listed in the original Task 16 but separate concern.
- **Search history / recent searches** — Overkill for 21–30 items. The list is small enough that search is a quick filter, not a deep query.
- **Full-text search with highlighting** — Just filtering, no highlight of matched terms. Keeps UI clean and implementation simple.
- **Fuzzy search / typo tolerance** — With only 21 items, exact substring match is sufficient. The user likely types "tawaf" not "twaf".
- **External search library (Fuse.js, etc.)** — No new dependencies. Native `String.includes()` on normalized strings is sufficient for this dataset size.

## Open Questions

- Should the search bar be always visible or behind a search icon that expands? **Recommendation: always visible** — our users shouldn't need to discover the feature.
- Should chip selection persist when the user types in search? **Recommendation: no** — search overrides chips. Clearing search restores chip state.
- Should we add a "Semua" (All) chip or just let users deselect? **Recommendation: "Semua" chip as the first/default chip** — explicit and clear.
