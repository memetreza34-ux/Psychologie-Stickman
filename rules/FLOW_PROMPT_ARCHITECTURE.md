# GOOGLE FLOW PROMPT ARCHITECTURE — NATURAL MASTER V2

**STATUS: BINDING PROCESS RULE**

Policy ID: `NATURAL_FLOW_MASTER_V2`

## Active visual world

Binding world: `PSYCHOLOGY_STICKMAN_WORLD_V1`

Source: `rules/PSYCHOLOGY_STICKMAN_WORLD.md`

## One master file

Every video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

All images stay inside this one master file.

## Final prompt order

1. TASK / OUTPUT
2. ACTIVE VISUAL WORLD
3. short global channel-style/species block
4. VIDEO WORLD / continuity facts for this script
5. COVER WORKFLOW
6. FIVE-IMAGE BATCH WORKFLOW
7. GLOBAL TEXT RULE
8. OBSERVABLE-SCENE RULE
9. BILD 01 through BILD NN

## Prompt simplicity

Detailed planning belongs in `99-intern/`.

Final BILD prompts stay short and direct:
- camera/framing
- main subject
- exact visible action/relation
- useful environment/props
- scene-specific light/color/mood
- continuity when needed
- exact visible German text or `No visible text.`

Do not repeat the full visual-world specification in every BILD.

## Observable Scene First

Use:

`spoken meaning → viewer takeaway → observable evidence → concrete composition → final prompt`

Do not ask Flow to invent how an abstract psychological state looks.
Do not literalize effect names automatically.

## Global visual style anchor

Use this short anchor once near the top of the master and only repeat compactly when Flow needs reinforcement:

`Same approved Psychology Stickman World: high-quality hand-drawn 2D animation, oversized round/soft-oval light heads, tiny black oval eyes and minimal expressive faces, narrow clothed torsos, very thin dark stick-like limbs, organic dark outlines, soft cel shading, subtle illustration texture and natural clear colors. All people share the same stickman species while clothing, hair, accessories, role, era, environment, light and mood adapt to the script.`

Minimal global exclusions:
- no 3D / Pixar
- no anime
- no photorealism
- no normal-human anatomy drift
- no bare whiteboard doodle look

## People

Do not invent a permanent protagonist.

Design people from the current script and role while keeping the same species.
Reuse exact identity only when story continuity clearly requires the same person.

Emotion should be visible through action, gaze, posture, hands, spacing, blocking and object relations.

## Cover workflow

- BILD 01 only
- exactly 3 separate 16:9 cover candidates
- same visual thesis and exact cover text
- 3 meaningfully different compositions
- STOP for user choice
- winner → `01.png`
- approved `01.png` becomes the episode visual reference for species, linework, shading, texture and finish

The approved cover is NOT a command to repeat its exact composition/person/location in later scenes.

## Later generation

After cover approval:
- 02–06
- 07–11
- 12–16
- continue in groups of 5
- final remainder 1–4

Each BILD remains one separate 16:9 asset.
Accepted images → `NN.png` → same flat `03-bilder/`.
Regenerate only failed images.
Never create storyboard/contact sheet/final video.

When supported, attach/use `01.png` as the visual style reference / ingredient for later batches.

## Text

Default: `No visible text.`

Only exact planned German wording may appear.

## Hard fail

- people drift into a different species or normal cartoon-human anatomy
- dark/bright/historical scenes switch to a foreign rendering style
- Flow must invent the core visual idea
- several scene numbers are combined into one asset
- cover gate or five-image batching is broken
