# Google Stitch Prompt: Tactile Illustrative Minimalism

## Stitch Prompting Strategy

Google Stitch works best with **iterative micro-prompts** rather than one giant "mega-prompt". We will start with a strong foundational prompt (Phase 1) to establish the structure and vibe, and then use targeted follow-up prompts (Phase 2 & 3) to refine the tactile details and layout specifics.

## Phase 1: The Base Generation (Start Here)

**Action:** Use this prompt to generate the initial Dashboard/Home screen.

> **Prompt:** "Design a mobile home screen for a Hajj companion app targeting 45-65 year old Indonesian pilgrims. The visual direction is 'Tactile Illustrative Minimalism'—a clean, high-contrast, black-and-white neo-brutalist aesthetic. Use pure black (#000000) for text and borders, pure white (#FFFFFF) for cards, and a very light gray (#F3F4F6) for the app background.
>
> Structure the layout as follows:
>
> 1. Top Header: A large, elegant serif greeting (e.g., 'Assalamualaikum, Budi'). Next to it, include a simple, playful, monochromatic hand-drawn style icon of a sunrise or the Kaaba.
> 2. Main Content: A grid or vertical stack of large, highly accessible cards for 'Today's Itinerary', 'Ritual Guide', and 'Prayers'.
> 3. Card Style: Make the cards look like physical tiles. Give them a 2px solid black border and a hard, offset black drop-shadow (e.g., 4px 4px 0px #000).
> 4. Bottom Nav: A simple bottom navigation bar with thick, rounded monochrome icons.
>    Ensure the font size is large and highly legible (minimum 16px for body text)."

## Phase 2: Refining the "Tactile" Interactions (Follow-up)

**Action:** Once Stitch generates the base layout, use this prompt to enhance the interactive feel.

> **Prompt:** "Keep the current layout, but refine the interactive elements to make them feel more tactile and physical. Whenever a card or button is hovered or in an active state, remove the hard black offset shadow and translate the element down and right by 4px so it looks like a mechanical button being pressed down. Add a quick spring-based CSS transition (e.g., `transition-all duration-150 ease-out`) to make the movement feel bouncy and delightful."

## Phase 3: The Ritual Guide Screen (Generate New Screen)

**Action:** Use this to generate a specific internal screen based on the established design system.

> **Prompt:** "Using the same 'Tactile Illustrative Minimalism' design system (black and white, 2px borders, hard offset shadows, serif headers), design a step-by-step 'Ritual Guide' screen for mobile. The layout should be a vertical timeline. Each step in the timeline is a separate physical-looking card. Include a simple, playful sketch-like monochromatic icon (like a bus or a tent) inside each card. Ensure one of the cards represents an 'active' state where the shadow is removed and the card is shifted down to look like it has been pressed."

## Phase 4: The Prayer/Dua Screen (Generate New Screen)

**Action:** Use this to design the content-heavy prayer screen.

> **Prompt:** "Design a 'Prayer/Dua' detail screen for mobile using our established tactile, high-contrast monochrome style. The screen should feature one massive white card taking up most of the screen, with a 2px black border and a hard offset shadow. Inside the card, display large Arabic text (right-aligned) at the top, and smaller sans-serif translation text below it. At the bottom of the card, add a full-width 'Play Audio' button that looks like a chunky, physical mechanical button with a bold black outline."

## Best Practices Reminders for Stitch

- **Use Experimental Mode (Gemini 2.5 Pro):** For this level of specific styling (neo-brutalism, hard shadows), the Pro model will adhere much better to your exact CSS/visual instructions.
- **Inspect the Output:** Look at the generated Tailwind. If Stitch uses generic `shadow-md`, prompt it specifically: _"Change the box-shadow on the cards to a solid 4px 4px black shadow with 0px blur."_
- **Iterate One Thing at a Time:** If the layout is good but the shadows are wrong, don't ask it to change the layout _and_ the shadows. Just say _"Keep this exact layout, but fix the card shadows."_
- **Reference Inputs:** If you have a sketch or a screenshot of a neo-brutalist app you like, upload it to Stitch and say: _"Use this image for structural inspiration, but apply our monochromatic Tactile Minimalist style."_
