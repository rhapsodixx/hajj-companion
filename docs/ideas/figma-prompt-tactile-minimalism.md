# Figma Prompt: Tactile Illustrative Minimalism

## Problem Statement

How might we guide Figma's AI to redesign a minimalist Hajj app so that it feels retro, tactile, and animated with delight, without compromising the high-contrast accessibility required by 45-65 year old pilgrims?

## Recommended Direction: "Tactile & Illustrative"

We are taking the starkness of the current Uber-style minimalism and injecting humanity.

1. **Shapes:** Retro & tactile. Buttons have 2px solid black borders with offset hard shadows. When pressed, they physically "push down" (Framer Motion style).
2. **Imagery:** Monochromatic, hand-drawn illustrations (like The New Yorker) for empty states, headers, and greetings to add warmth.
3. **Motion:** GSAP/Framer Motion-style spring physics. Elements don't just appear; they scale up, slide in, and react playfully to touch.

## Key Assumptions to Validate

- [ ] **Aesthetic Acceptance:** Older Indonesian pilgrims (who typically associate Hajj apps with gold, green, and ornate arabesques) will accept and trust a monochromatic, hand-drawn aesthetic.
- [ ] **Animation Tolerance:** Spring-based animations won't cause cognitive overload or motion sickness for a 50+ demographic (animations must be fast and purposeful, not drawn out).
- [ ] **Affordance Recognition:** Tactile, hard-shadowed borders will successfully signal "this is clickable" better than flat, borderless designs.

## Figma Make Prompts (Copy & Paste)

### 1. Global Setup Prompt (The Base Style)

> "Generate a mobile app UI design system. The aesthetic is 'Tactile Illustrative Minimalism'. Use ONLY a strict monochrome color palette: pure black (#000000), pure white (#FFFFFF), and light gray (#F3F4F6) for backgrounds. Typography must be Manrope for UI and Piazzolla for large headers. UI Elements must be 'retro and tactile': use 2px solid black borders, sharp pill shapes, and offset hard black drop-shadows (neo-brutalism light). Include hand-drawn, sketch-like monochromatic illustrations for visual delight. Design the UI to look like it has fluid, bouncy micro-animations (e.g., cards that look like they scale up on scroll or press)."

### 2. Dashboard / Home Screen

> "Generate a mobile app home screen for a Hajj companion app using the 'Tactile Illustrative Minimalism' style (black and white, neo-brutalist 2px borders, hard offset shadows, Manrope font). At the top, include a playful, hand-drawn monochrome illustration of the Kaaba or a sun rising over a tent. Below it, a large Piazzolla greeting. Create a grid of tactile, physical-looking cards for 'Today's Itinerary', 'Ritual Guide', and 'Prayers'. The cards should look like physical tiles waiting to be pressed. Add a bottom navigation bar with thick, rounded icons."

### 3. Ritual Guide (Step-by-Step) Screen

> "Generate a mobile app step-by-step guide screen for Hajj rituals using the tactile, monochrome neo-brutalist style. The layout should feature a vertical timeline. Each step is a physical-looking card with a 2px black border and an offset shadow. Use playful, sketch-like monochromatic icons for each step (e.g., a hand-drawn bus, a small tent). Show one of the cards in an 'active/pressed' state where the shadow is removed and the card shifts down, simulating a spring-based tap animation. Keep typography massive and readable."

### 4. Dua / Prayer Card Screen

> "Generate a mobile app screen displaying an Arabic prayer using the tactile monochrome style. The main prayer should be inside a massive, stark white card with a thick black border and a hard shadow. Inside the card, display large, high-contrast Arabic typography, with Indonesian translation below in Manrope. Add a tactile, retro-looking 'Play Audio' button at the bottom of the card that looks like a physical mechanical button. Include a subtle, playful hand-drawn sparkle or soundwave illustration next to the button."

## Not Doing (and Why)

- **Adding bright accent colors:** We are committing fully to the high-contrast B&W constraint to ensure maximum readability in the glaring Saudi sun.
- **Complex layered navigation:** Keeping layouts flat. Older users get lost in nested menus.
- **Cinematic/Slow animations:** While we want GSAP/Framer animations, they must be functional micro-interactions (bounces, tap-scales), not slow cinematic transitions that make the app feel sluggish.
