<div align="center">
  <img src="docs/design/logo-icon-removebg-preview.png" alt="QUWA Logo" width="120" />
  <h1>QUWA</h1>
  <h3>قُوَّة</h3>
</div>

# Patuna Coklat-B Hajj Companion

This repository contains the source code for the **Patuna Coklat-B Hajj Companion (QUWA)**, an offline-first Progressive Web App (PWA) built specifically for first-time Indonesian pilgrims embarking on the Hajj 2026 journey with Patuna Travel (Coklat B package).

## 🤖 Built with AI

This project is **publicly shared** and was built assisted by **Google Gemini** and **GLM** (z.ai with claude code). It served as a practical exploration of:

- Modern full-stack development with **SvelteKit** and the **Bun** runtime.
- Creating fluid, dynamic micro-interactions using the **GSAP** animation library.

### 📊 AI Engineering Stats (Estimated)

- **Tokens Processed:** ~2.5 Million tokens (context loading, codebase analysis, iteration, and generation)
- **Estimated API Cost:** ~$5.00 - $15.00 (based on Gemini 3.1 Pro API pricing for 2.5M tokens). The majority of these tokens were spent analyzing massive context windows, specifically:
  - Official government Hajj guide PDF ebooks
  - Patuna Travel guide documentation
  - Haji Mandiri tips and tricks
- **Most Frequent Agent Skills Invoked:** `using-agent-skills` (Addy Osmani patterns), `ui-ux-pro-max`, `impeccable`, `sveltekit`
- **Most Frequent MCP Servers Invoked:** `Context7`, `sequential-thinking`, `svelte`, `serena`
- **Token Optimization:** Utilized [RTK](https://github.com/rtk-ai/rtk) to aggressively manage context, saving an estimated **~1.2 million tokens** (roughly 30-40% reduction) during long development sessions by avoiding unnecessary codebase re-indexing.

## 📖 About The Project

A first-time hajji is often anxious, jet-lagged, and surrounded by millions of people. With unreliable networks in Saudi Arabia, finding the right prayer, the next itinerary step, or emergency contacts can be challenging.

**QUWA** makes the answer to _"what do I do right now?"_ one tap away — offline, in Bahasa Indonesia, and tailored precisely to the Patuna Coklat-B schedule.

### Key Features

- **Now/Next Interface:** A context-aware homepage that tells you exactly what is happening now and what is coming next, shifting into a "Tomorrow Preparation" mode after Maghrib.
- **Offline-First Ritual Guide:** Step-by-step guidance for high-stakes ritual days (Umrah, Wukuf, Muzdalifah, Jumrah, Thawaf Wada) with Arabic niat, Latin transliteration, and Bahasa translation.
- **Du'a Library:** Bundled collection of essential prayers extracted from official guides, searchable and categorized.
- **Important Contacts:** Readily available Patuna muthawwif, Saudi emergency, and hotel information.
- **Climate Reference:** Typical weather norms for each city per Hijri date to help pilgrims prepare appropriately.

## 📸 Screenshots

<div align="center">
  <img src="docs/screenshots/itinerary.png" alt="Itinerary Page" width="250" />
  <img src="docs/screenshots/detail_itinerary.png" alt="Detail Itinerary" width="250" />
  <img src="docs/screenshots/dua.png" alt="Dua Library" width="250" />
</div>

## 🛠 Tech Stack

Built with modern web technologies focused on offline capabilities, accessibility, and performance:

- **Frontend:** SvelteKit 2 + Svelte 5 (Runes) + TypeScript
- **Styling:** Tailwind CSS v4
- **Runtime & Build:** Bun
- **PWA:** `@vite-pwa/sveltekit` with Workbox for robust offline caching
- **Hosting:** Cloudflare Pages
- **Database:** Supabase Postgres (for minimal dynamic daily overrides)

## 🚀 Getting Started

To recreate or run this project locally:

```sh
# Install dependencies
bun install

# Start a development server
bun run dev

# Or start the server and open the app in a new browser tab
bun run dev --open
```

To create a production version:

```sh
bun run build
```

## 📜 License

This repository is free and open to use. It is released to the public domain so that anyone can use, modify, distribute, and build upon this code **without any restriction**.

---

_Bismillah hirrahmaan irrahiim. May this be of benefit, and may Allah accept the Hajj of every jamaah who uses it._
