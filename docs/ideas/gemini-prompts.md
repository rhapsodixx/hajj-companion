# Hajj Companion: Gemini Image Prompts

## Problem Statement

How might we generate highly recognizable, navigation-focused isometric maps and a homepage header that strictly adhere to a minimalist black-and-white aesthetic, using only pure white backgrounds and specific Phase Color accents to ensure they blend seamlessly into the app's UI?

## Key Assumptions to Validate

- [ ] **Legibility in Sunlight:** The strict black, white, and single accent color will remain legible in intense Saudi sunlight.
- [ ] **Navigation Utility:** The isometric angles provide enough spatial context for jamaah to orient themselves without requiring hyper-realistic map details.
- [ ] **Background Blending:** The generated "pure white" background from the AI can be cleanly blended or multiplied in CSS without harsh bounding boxes.

## MVP Scope (The Prompts)

Copy and paste these exact prompts into Gemini/Imagen. _Pro-tip for Gemini: If it generates something too colorful, explicitly add "Use absolutely no colors other than white, black, and [Accent Color]." to the prompt._

### 1. Homepage Header (The Kaaba)

**Accent Color:** Makkah Brown (`#451a03`)

> `A minimalist, highly recognizable architectural illustration of the Kaaba in Makkah. Designed as a UI header asset for a mobile app. The background must be pure, solid white (#FFFFFF). The Kaaba and surrounding courtyard should be rendered in stark, high-contrast pure black and white. Use a single, subtle accent color of deep mahogany brown (#451a03) for key architectural highlights. Extreme minimalism, vast negative space, soft and whisper-light pill-shaped shadows. Sacred, quiet, and contemplative atmosphere. Flat design, no visual clutter, no gradients.`

### 2. Isometric Map: Makkah (Masjid al-Haram)

**Accent Color:** Makkah Brown (`#451a03`)

> `A functional, navigation-focused isometric map of Masjid al-Haram and the Kaaba in Makkah. Pure solid white background (#FFFFFF). The buildings and pathways must be rendered in matte white with crisp, pure black outlines and soft, 12% opacity drop shadows. Use a single accent color of deep mahogany brown (#451a03) to highlight the Kaaba and primary walking paths. Highly legible, minimalist app UI asset, rounded pill-shaped corners, no complex textures, stark duality, quiet and sacred aesthetic.`

### 3. Isometric Map: Madinah (Nabawi Mosque)

**Accent Color:** Madinah Green (`#064e3b`)

> `A functional, navigation-focused isometric map of the Prophet's Mosque (Al-Masjid an-Nabawi) in Madinah, featuring the iconic umbrellas. Pure solid white background (#FFFFFF). The structures and courtyards must be rendered in matte white with crisp, pure black outlines and soft, 12% opacity drop shadows. Use a single accent color of deep emerald green (#064e3b) to highlight the umbrellas and the Green Dome. Highly legible, minimalist app UI asset, rounded pill-shaped corners, no complex textures, stark duality, quiet and sacred aesthetic.`

### 4. Isometric Map: Arafah (Tent City)

**Accent Color:** Rukun/Hajj Days Brown (`#713f12`)

> `A functional, navigation-focused isometric map of the tents in Arafah. Pure solid white background (#FFFFFF). The rows of tents and main roads must be rendered in matte white with crisp, pure black outlines and soft, 12% opacity drop shadows. Use a single accent color of earthy brown (#713f12) to highlight the primary navigation routes and zone markers. Highly legible, minimalist app UI asset, rounded pill-shaped corners, no complex textures, stark duality, quiet and sacred aesthetic.`

## Not Doing (and Why)

- **No hyper-realistic satellite maps:** They carry too much visual clutter and fail the "high-contrast" requirement for intense sunlight visibility.
- **No people/crowds in the maps:** They obscure the navigation paths and make the isometric view messy.
- **No full-color renderings:** Breaks the Uber-style minimalist design system and reduces accessibility for older users.
