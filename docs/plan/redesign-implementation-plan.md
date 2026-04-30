# Redesign Implementation Plan — Patuna Coklat-B Hajj Companion

> **Objective:** Systematically refactor the UI to implement the new "Uber-inspired" minimalist, high-contrast, black-and-white design system defined in `DESIGN.md`.
> **Goal:** Standardize component styling, improve contrast for outdoor usability in Saudi Arabia, and remove all legacy design tokens.

---

## Track 1: Foundation Updates

### Task 1.1: Design Tokens & Tailwind Configuration

**Files:**

- `tailwind.config.ts`
- `src/app.css` / `src/routes/layout.css`

**Action:**

- Purge legacy color palettes (e.g., pastel greens) and replace them with the exact hex values from `DESIGN.md` (Pure Black `#000000`, Pure White `#ffffff`, hover grays, muted text grays).
- Configure the specific typography stacks: `Manrope` (sans-serif), `Piazzolla` (serif), and `Noto Naskh Arabic`.
- Add explicit radius tokens (e.g., `rounded-pill` or `rounded-full` mapped to 999px) and the specific shadow configurations defined in `DESIGN.md`.
- Ensure dark mode variables (`--color-background-dark`, `--color-surface-dark`, etc.) are mapped accurately to enable `prefers-color-scheme` or `data-theme="dark"` toggles.

### Task 1.2: Typography Integration

**Files:**

- `src/lib/styles/typography.css` (or wherever type scaling is managed)
- `src/lib/components/ui/ArabicText.svelte`

**Action:**

- Standardize the base type scale: 13 / 15 / 16 / 18 / 22 / 28 / 36 px.
- Standardize Arabic type scale: 24 / 32 / 40 px.
- Enforce line-height constraints (1.22–1.40 for headings).
- Ensure `ArabicText.svelte` strictly applies the Noto Naskh font family.

---

## Track 2: Core Primitives Refactoring

### Task 2.1: Button Ecosystem

**Files:**

- `src/lib/components/ui/Button.svelte`
- `src/lib/components/ui/PhoneButton.svelte`
- `src/lib/components/ui/WhatsAppButton.svelte`
- `src/lib/components/ui/LostButton.svelte`

**Action:**

- Apply the `rounded-full` (999px radius) style to all button shapes.
- **Primary Buttons:** Set to `bg-[#000000]` / `text-[#ffffff]` (or their semantic CSS variables). Focus states should use an inset ring.
- **Secondary Buttons:** Set to `bg-[#ffffff]` / `text-[#000000]` with `#e2e2e2` hover.
- **Floating Action Buttons (LostButton):** Implement the Level 3 elevation shadow (`rgba(0,0,0,0.16) 0px 2px 8px`).

### Task 2.2: Card & Surface Ecosystem

**Files:**

- `src/lib/components/ui/Card.svelte`
- `src/lib/components/ui/HeroCard.svelte`
- `src/lib/components/ui/DuaCard.svelte`
- `src/lib/components/ui/ArabicAddressCard.svelte`

**Action:**

- Normalize border-radius: 8px for standard content cards, 12px for featured cards.
- Remove default borders unless structurally necessary (`1px solid #000000`).
- Apply the Level 1/Level 2 shadow utilities.
- Ensure text elements inside cards default to pure black / muted grays with high contrast.

### Task 2.3: Auxiliary Primitives

**Files:**

- `src/lib/components/ui/PhaseRibbon.svelte`
- `src/lib/components/ui/InstallPrompt.svelte`
- `src/lib/components/ui/UpdatePrompt.svelte`

**Action:**

- Refactor `PhaseRibbon` to strictly use the new array of phase colors defined in `DESIGN.md`.
- Ensure prompts utilize pill-shaped buttons and the newly defined surface tokens.

---

## Track 3: Layout & Global Validation

### Task 3.1: Application Shell

**Files:**

- `src/lib/components/ui/BottomNav.svelte`
- Layout wrappers (`src/routes/+layout.svelte`)

**Action:**

- Convert active tab indicators in `BottomNav` to rely on high contrast (e.g., pure black) rather than legacy brand colors.
- Ensure the base layout adheres to the 8px grid and the `max-w-120` (480px) mobile-first width constraint.
- Validate that the `.pb-nav` padding utility still functions appropriately with the redesigned navigation bar.

### Task 3.2: Accessibility & Contrast Audit

**Files:**

- Across all UI components and Page routes (`src/routes/**/+page.svelte`)

**Action:**

- Conduct an audit to ensure all text elements and interactive components maintain the required 4.5:1 contrast ratio.
- Verify that every button, link, and interactive card correctly uses the `.tap-target` utility ensuring a minimum 44×44px hit area for older users.
- Confirm that no decorative elements disrupt the functional, contemplative atmosphere of the app.

---

## Definition of Done for Redesign

- [ ] Tailwind configuration exclusively uses `DESIGN.md` tokens.
- [ ] No pastel green or other unauthorized colors remain in the codebase.
- [ ] All buttons and chips are fully pill-shaped.
- [ ] All surfaces and text inputs reflect the minimalist design aesthetic.
- [ ] Lighthouse or manual accessibility checks pass a 4.5:1 contrast ratio requirement.
- [ ] App renders accurately in both light and dark modes utilizing the new black-and-white theme.
