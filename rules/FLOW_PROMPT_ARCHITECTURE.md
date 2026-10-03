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
4. REPRESENTATION-FIRST rule
5. SEQUENCE VARIETY / MOBILE-READABILITY rule
6. VIDEO WORLD / continuity facts
7. COVER WORKFLOW
8. FIVE-IMAGE BATCH WORKFLOW
9. GLOBAL TEXT RULE
10. OBSERVABLE-SCENE RULE
11. BILD 01 through BILD NN

## Prompt simplicity

Detailed planning belongs in `99-intern/`.

Final BILD prompts stay short and direct:
- representation + camera/framing
- dominant subject/relation
- exact visible action/object/mechanism/text
- useful environment/props
- scene-specific light/color/mood
- continuity when needed
- exact German text or `No visible text.`

Do not repeat the full visual-world paragraph in every BILD.

## Representation first — HARD RULE

Before each BILD prompt, Phase 1 must already choose one:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

People are optional. A character scene is appropriate only when visible human behavior/interaction is the evidence.

## Stickman species lock — HARD RULE

Whenever a BILD contains people, the prompt must preserve the approved species. Use the compact reinforcement when needed:

`same approved stickman species: oversized light round/oval head, tiny black oval eyes, narrow clothed torso, very thin dark stick-like limbs; no normal-human anatomy.`

Historical, office, laboratory, family and dark-psychology scenes do not get exceptions. If Flow generates a normal cartoon human, that BILD fails and must be regenerated.

## Sequence variety and staging

Representation variety alone is insufficient if the frames still look like repeated flat explainer cards.

Before Phase 2, check adjacent scenes for:
- camera distance
- focal scale
- subject placement
- spatial depth
- local palette/light
- flat-board vs immersive-environment staging

Avoid repeated beige/neutral presentation boards, centered objects, circles/arrows templates or near-identical layouts across several adjacent BILDs.

When the script allows, prefer concrete real-world contexts such as a shelf, room, street, desk, product close-up, hallway or laboratory over a generic explanatory background.

## Mobile readability

All images must work at phone size.

- large clear focal subject
- short planned text only
- no paragraph-like copy
- schemas preferably max 3 major labels/branches
- avoid tiny crowds, dense arrow networks and many mini-panels

## Observable Scene First

Use:

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → final prompt`

Do not ask Flow to invent an abstract psychological visual. Do not literalize effect names automatically.

## Global style anchor

Use once near the top:

`Same approved Psychology Stickman World: high-quality hand-drawn 2D animation with organic dark outlines, soft cel shading, subtle illustration texture, natural clear colors and coherent depth. When people appear they use the exact same stickman species: oversized round/soft-oval light heads, tiny black oval eyes, narrow clothed torsos and very thin dark stick-like limbs; never normal cartoon-human anatomy. Objects, text, environments and schemas use the same illustrator language.`

Minimal exclusions:
- no 3D / Pixar
- no anime
- no photorealism
- no normal-human anatomy drift
- no bare whiteboard doodle
- no foreign corporate infographic style
- no repetitive beige explainer-board default

## People

Do not invent a permanent protagonist. Reuse exact identity only when story continuity requires it. Do not add people to object/text/environment frames just to populate them.

## Cover workflow

- BILD 01 only
- exactly 3 separate 16:9 cover candidates
- same visual thesis and exact cover text
- 3 meaningfully different compositions
- STOP for user choice
- winner → `01.png`
- approved `01.png` becomes episode reference for linework, shading, texture, finish and stickman species when people appear

The cover does not force later scenes to repeat its person, location, composition or representation type.

## Later generation

After cover approval:
- 02–06
- 07–11
- 12–16
- continue in groups of 5
- final remainder 1–4

Each BILD remains one separate 16:9 asset. Accepted images → `NN.png` → same flat `03-bilder/`. Regenerate only failed images. Never create storyboard/contact sheet/final video.

## Text

Default: `No visible text.`

Only exact planned German wording may appear. Text may be the primary subject of a `TEXT_ILLUSTRATION` when wording itself is the mechanism, but it must remain large and sparse.

## Hard fail / rewrite

- character scene used by default without representation reason
- any human drifts into normal cartoon-human anatomy
- non-character frame switches to a foreign rendering style
- several adjacent frames repeat the same flat explainer-board composition
- schema/text image is too dense for phone viewing
- tiny people or labels are required to understand the point
- Flow must invent the core visual idea
- several scene numbers are combined into one asset
- cover gate or five-image batching is broken
