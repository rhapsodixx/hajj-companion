# DESIGN.md — Patuna Coklat-B Hajj Companion

This document is the source of truth for the UI and design system of the Patuna Coklat-B Hajj Companion app. It is heavily inspired by Uber's minimalist, high-contrast, black-and-white aesthetic, combined with the specific needs of Hajj pilgrims.

## 1. Visual Theme & Atmosphere

Uber's design language is a masterclass in confident minimalism — a black-and-white universe where every pixel serves a purpose and nothing decorates without earning its place. The entire experience is built on a stark duality: jet black (`#000000`) and pure white (`#ffffff`).

**Key Characteristics:**

- Pure black-and-white foundation.
- Geometric sans-serif typography (Inter used as fallback).
- Pill-shaped everything: buttons, chips, nav items all use 999px border-radius.
- Card-based layout with whisper-soft shadows (0.12–0.16 opacity).
- 8px spacing grid with compact, information-dense layouts.
- High Contrast: Every UI element must maintain a contrast ratio of at least 4.5:1 for readability in intense Saudi sunlight.

## 2. Design Tokens

### Brand & Accent Colors

| Token                  | Value     | Role                                                    |
| ---------------------- | --------- | ------------------------------------------------------- |
| `--color-brand`        | `#000000` | Primary brand color (Uber Black) — headers, key actions |
| `--color-brand-light`  | `#e2e2e2` | Hover Gray — white button hover state                   |
| `--color-accent`       | `#efefef` | Chip Gray — secondary buttons, navigation chips         |
| `--color-accent-light` | `#f3f3f3` | Hover Light — subtle hover for elevated white buttons   |

### Neutral Colors

| Token                 | Value     | Role                                                     |
| --------------------- | --------- | -------------------------------------------------------- |
| `--color-background`  | `#ffffff` | Pure White — main page background                        |
| `--color-surface`     | `#ffffff` | Pure White — card / elevated surface                     |
| `--color-border`      | `#e2e2e2` | Subtle borders (or `#000000` for structural containment) |
| `--color-foreground`  | `#000000` | Primary text (Uber Black)                                |
| `--color-muted`       | `#4b4b4b` | Secondary text (Body Gray)                               |
| `--color-muted-light` | `#afafaf` | Tertiary text (Muted Gray)                               |

### Dark Mode Overrides

| Token                     | Value     |
| ------------------------- | --------- |
| `--color-background-dark` | `#000000` |
| `--color-surface-dark`    | `#121212` |
| `--color-border-dark`     | `#333333` |
| `--color-foreground-dark` | `#ffffff` |
| `--color-muted-dark`      | `#afafaf` |

### Phase Colors (Used for Highlighting/Accents only)

| Token                             | Value     | Phase             |
| --------------------------------- | --------- | ----------------- |
| `--color-phase-arrival`           | `#1e293b` | Arrival           |
| `--color-phase-madinah`           | `#064e3b` | Madinah           |
| `--color-phase-madinah-to-makkah` | `#14532d` | Transit           |
| `--color-phase-makkah`            | `#451a03` | Makkah            |
| `--color-phase-ash-shishah`       | `#3f3f46` | Ash-Shishah prep  |
| `--color-phase-rukun`             | `#713f12` | Rukun (hajj days) |
| `--color-phase-post-hajj`         | `#0f766e` | Post-hajj         |
| `--color-phase-departure`         | `#1e3a8a` | Departure         |

## 3. Typography Rules

- **Headline / UI**: Manrope (sans-serif, weights 400-700).
- **Body / Long-form**: Piazzolla (serif, weights 400-500).
- **Arabic**: Noto Naskh Arabic (weight 400 + 700).

**Type scale:** 13 / 15 / 16 / 18 / 22 / 28 / 36 px.
**Arabic scale:** 24 / 32 / 40 px.

- Bold headlines, medium body.
- Tight heading line-heights (1.22-1.40).
- Functional typography: No decorative type treatment, no letter-spacing tricks.

## 4. Component Stylings

- **Buttons (Primary CTA)**: Background: `#000000`, Text: `#ffffff`, Radius: 999px. Focus: inset ring.
- **Buttons (Secondary)**: Background: `#ffffff`, Text: `#000000`, Radius: 999px. Hover: `#e2e2e2`.
- **Chips / Filters**: Background: `#efefef`, Text: `#000000`, Radius: 999px.
- **Floating Action**: Background: `#ffffff`, Text: `#000000`, Radius: 999px, Shadow: `rgba(0,0,0,0.16) 0px 2px 8px 0px`.
- **Cards**: Background: `#ffffff`, Radius: 8px (content) / 12px (featured), Shadow: `rgba(0,0,0,0.12) 0px 4px 16px 0px`. No borders by default.
- **Inputs**: Text: `#000000`, Background: `#ffffff`, Border: 1px solid `#000000`, Radius: 8px.

## 5. Layout & Spacing

- Base unit: 8px (scale: 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32).
- Max container width: `max-w-120` (480px / 30rem). Mobile-first, single-column.
- Min tap target: 44×44px. Use `.tap-target` utility class. Target users: Age 45–65.
- BottomNav safe area: `.pb-nav`.

## 6. Depth & Elevation

- **Level 1 (Subtle)**: `rgba(0,0,0,0.12) 0px 4px 16px` (Standard content cards)
- **Level 2 (Medium)**: `rgba(0,0,0,0.16) 0px 4px 16px` (Elevated cards)
- **Level 3 (Floating)**: `rgba(0,0,0,0.16) 0px 2px 8px` (Floating action buttons)

## 7. Principles

- **Quiet, sacred, contemplative.** Not corporate, not flashy.
- **High Contrast:** Vital for Saudi sun glare. Every UI element must maintain a 4.5:1 ratio.
- **Motion:** Subtle only. 200ms ease-out page transitions, 100ms scale on tap.
- **No checklists in Ritual Guide** — read-before, not interact-during.
