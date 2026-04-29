# Code Style & Conventions

## Svelte 5 Runes (Required)

Runes mode is forced globally. No legacy syntax.

**Use:**

- `interface Props` + `$props()` for component props
- `$state()` for reactive state
- `$derived()` for computed values
- `onclick={handler}` (lowercase, no colon)
- `{@render children()}` instead of `<slot />`

**Never use:**

- `export let`
- `$:` reactive declarations
- `on:click` event directives
- `<slot />`

## Component Props Pattern

- Always define `interface Props` in `<script>` block
- Always accept `class?: string` for outer container customization
- Use `import type { Snippet } from 'svelte'` for snippet children
- Prefer Svelte 5 snippets for complex components

## Styling

- **No `<style>` blocks** in components — all via Tailwind + global CSS
- **No `tailwind.config.js`** — Tailwind v4 uses `@theme` in `src/routes/layout.css`
- Use CSS custom properties: `text-(--color-brand)`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`
- Dark mode via `html[data-theme='dark']` attribute — **no Tailwind `dark:` prefix classes**
- Max content width: `max-w-120` (480px)
- Min tap target: 44×44px (`.tap-target` class)
- Card press: `.card-pressable` class

## Design Tokens

- Brand: `#5C3A21` (Patuna brown)
- Gold: `#C8A971` (Rukun phase accent)
- Background: `#FAFAF7` (Ihram white)
- Surface: `#F2EFE8` (Card background)
- Foreground: `#1A1A1A` (Kiswah black)
- Muted: `#6B6560` (Secondary text)
- Never hardcode hex — always use CSS variables

## File Naming

- Components: `PascalCase.svelte`
- Data/types: `kebab-case.ts` / `kebab-case.json`
- Routes: SvelteKit file-based conventions

## TypeScript

- `type` aliases only for data types (no `interface`)
- `interface` only for component `Props`
- Union literal types for categories
- All optional fields use `?:`
- No `any` types
- No `+page.ts` or `+page.server.ts` load functions

## Formatting (Prettier)

Tabs, single quotes, no trailing commas, 100 char width, `prettier-plugin-svelte` + `prettier-plugin-tailwindcss` (class sorting).

## Icons

No icon library. All icons are inline SVG strings rendered via `{@html icon}`.

## Arabic Text

- Always apply `dir="rtl"` to parent block of Arabic text
- Use `.arabic` / `.arabic-lg` / `.arabic-xl` CSS classes
- Never write Arabic from memory — always use exact values from bundled JSON

## Design Principles

- Quiet, sacred, contemplative
- Big tappable targets for older fingers
- High contrast for Saudi sun glare
- No checklists in Ritual Guide
- No bounce, parallax, confetti, scroll-jacking
- Every icon-only button needs `aria-label`
