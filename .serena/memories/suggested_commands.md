# Suggested Commands

## Development

- `bun install` — install dependencies
- `bun run dev` — start Vite dev server
- `bun run preview` — preview Cloudflare build locally (use for PWA/offline testing)

## Build & Deploy

- `bun run build` — production build (wrangler types + vite build)
- `bun run deploy` — build + deploy to Cloudflare Pages

## Code Quality

- `bun run check` — TypeScript + Svelte type checking (runs wrangler types + svelte-check)
- `bun run lint` — Prettier check + ESLint
- `bun run format` — Auto-format all files with Prettier

## System Utils (Darwin/macOS)

- `git` — version control
- `ls` / `find` / `grep` — file operations
- `wc -l <file>` — count lines
- `cat` / `head` / `tail` — file inspection

## Task Completion Checklist

After completing a coding task, run:

1. `bun run format` — format changed files
2. `bun run check` — verify types pass
3. `bun run lint` — verify lint passes
4. Manual browser test for UI changes
