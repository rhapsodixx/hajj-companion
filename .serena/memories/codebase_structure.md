# Codebase Structure

```
patuna-hajj-companion/
├── src/
│   ├── app.d.ts                    # App type declarations
│   ├── app.html                    # HTML template
│   ├── service-worker.ts           # PWA service worker (Workbox injectManifest)
│   ├── lib/
│   │   ├── types/
│   │   │   ├── contact.ts          # Contact type definitions
│   │   │   ├── climate.ts          # Climate type definitions
│   │   │   ├── dua.ts              # Du'a type definitions
│   │   │   ├── itinerary.ts        # Itinerary type definitions
│   │   │   └── ritual.ts           # Ritual guide type definitions
│   │   ├── data/
│   │   │   ├── climate.json/ts     # Climate data
│   │   │   ├── contacts.json/ts    # Contact data
│   │   │   ├── dua.json/ts         # Du'a library data
│   │   │   ├── itinerary.json/ts   # 26-day itinerary data
│   │   │   └── ritual.json/ts      # Ritual guide data
│   │   ├── components/
│   │   │   ├── ui/                 # Shared UI components (Button, Card, PhaseRibbon, etc.)
│   │   │   ├── home/               # Home screen components
│   │   │   ├── contacts/           # Contacts screen components
│   │   │   ├── guides/             # Guides screen components
│   │   │   ├── ritual/             # Ritual guide components
│   │   │   ├── itinerary/          # Itinerary screen components
│   │   │   └── dua/                # Du'a library components
│   │   ├── utils/                  # Utility functions
│   │   ├── state/                  # Global state management
│   │   ├── assets/                 # Static assets (favicon.svg)
│   │   └── index.ts               # Barrel file (note: CLAUDE.md says don't use, but exists)
│   └── routes/
│       ├── +layout.svelte          # Root layout (layout.css, UpdatePrompt, InstallPrompt)
│       ├── layout.css              # Global styles, @theme block, design tokens
│       ├── (app)/
│       │   ├── +layout.svelte      # App shell with BottomNav + pb-nav padding
│       │   ├── +page.svelte        # Home (Now/Next)
│       │   ├── itinerary/
│       │   │   ├── +page.svelte    # 26-day grouped list
│       │   │   └── [day]/+page.svelte # Daily detail
│       │   ├── dua/+page.svelte    # Du'a library
│       │   └── more/
│       │       ├── +page.svelte    # More menu
│       │       ├── contacts/+page.svelte
│       │       ├── guides/+page.svelte
│       │       └── settings/+page.svelte
│       ├── ritual/[guideId]/+page.svelte # Ritual walkthrough (no bottom nav, immersive)
│       ├── admin/                  # Admin routes
│       ├── _debug/                 # Debug routes
│       └── _design/+page.svelte    # Dev-only component gallery
├── static/                         # Static files served as-is
├── docs/                           # Documentation
├── supabase/                       # Supabase config (optional overrides)
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── wrangler.jsonc                  # Cloudflare Pages config
├── CLAUDE.md                       # Project instructions for Claude Code
└── .prettierrc                     # Prettier config
```

## Key Patterns

- No `+page.ts` or `+page.server.ts` — all data client-side from static JSON imports
- Data: JSON → typed cast → exported array + accessor functions
- Ritual route is outside `(app)` group — no bottom nav, immersive experience
- `_design` route is dev-only component gallery
