# Task Completion Checklist

When a coding task is completed, run these steps in order:

1. **Format:** `bun run format`
2. **Type check:** `bun run check`
3. **Lint:** `bun run lint`
4. **Manual browser test** (if UI changes) — run `bun run dev` and verify in browser
5. **Verify build** (if significant changes) — `bun run build`

## Additional Notes

- Always check that page titles include `<svelte:head><title>Page Name — Patuna Coklat-B</title></svelte:head>`
- Verify Arabic text uses `dir="rtl"` on parent containers
- Ensure all interactive elements have min 44px tap targets
- Check that no hardcoded color hex values are used (use CSS variables)
- No `<style>` blocks in Svelte components
- No legacy Svelte syntax (`export let`, `$:`, `on:click`, `<slot />`)
