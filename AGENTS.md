# AGENTS.md — Patuna Coklat-B Hajj Companion

This file provides agent-specific instructions for AI coding assistants working on this project. It references and extends `CLAUDE.md` — read that file first for the full project context, tech stack, architecture, and coding conventions.

## Start Here

Read `CLAUDE.md` in the project root before making any changes. It contains the complete project overview, tech stack, architecture decisions, coding conventions, design tokens, and constraints.

Additional context files:

- **PRD:** `docs/ideas/patuna-coklat-b-hajj-companion.md` — full product requirements
- **Implementation plan:** `docs/plan/implementation-plan.md` — task breakdown and sequencing
- **Design prompt:** `docs/claude-design-prompt.md` — UI design direction and screen specs
- **Design system:** `DESIGN.md` — unified visual design system reference, overriding previous styles

## Agent Workflow

1. Read `CLAUDE.md` for project conventions and constraints.
2. Read the relevant data types in `src/lib/types/` before modifying data structures.
3. Read the relevant data module in `src/lib/data/` before adding or changing static content.
4. Follow the Svelte 5 runes patterns exactly — no legacy syntax.
5. Use standard UI components (`Card`, `HeroCard`, `Button`, etc.) — do not create one-off containers.
6. Run `bun run check` after changes to verify types.
7. Run `bun run build` to verify production build.
8. Run `bun run lint` before considering work complete.
9. Run `bun run format` to auto-format before committing.

## Key Reminders

- All UI text is Bahasa Indonesia. Arabic only for du'a, niat, and address cards.
- Do not write Arabic text from memory — use exact values from bundled JSON in `src/lib/data/`.
- All data is static JSON bundled at build time. No API routes, no server-side data fetching, no database queries.
- No `<style>` blocks in components. Use Tailwind classes + CSS variables from `layout.css`.
- Component props use `interface Props` + `$props()` — never `export let`.
- Max content width is 480px (`max-w-120`). Mobile-first, single-column.
- Min tap target 44×44px. The target user is 45–65 years old with medium phone literacy.
- Dark mode uses `html[data-theme='dark']` CSS variable overrides, not Tailwind `dark:` classes.
- Use `phosphor-svelte` for all icons. Do not use inline SVGs.
- Use `bg-surface` instead of `bg-white` for dark-mode compatibility.
- Every page root container should include the `page-enter` class for entrance animation.
- Use GSAP for complex state transitions, expand/collapse behaviors, and staggered item entrances to create a tactile, "pro-max" feel.
- Global `focus-visible` outlines are in `layout.css` — do not add per-component focus styles.

## File References

| What                       | Where                      |
| -------------------------- | -------------------------- |
| Design tokens & global CSS | `src/routes/layout.css`    |
| Type definitions           | `src/lib/types/*.ts`       |
| Static data (JSON)         | `src/lib/data/*.json`      |
| Data accessors (typed)     | `src/lib/data/*.ts`        |
| UI components              | `src/lib/components/ui/`   |
| App routes                 | `src/routes/(app)/`        |
| More sub-pages             | `src/routes/(app)/more/*/` |
| Ritual routes (no nav)     | `src/routes/ritual/`       |
| Admin panel                | `src/routes/admin/`        |
| Service worker             | `src/service-worker.ts`    |
| Svelte config              | `svelte.config.js`         |
| Vite config                | `vite.config.ts`           |
