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
5. VIDEO WORLD / continuity facts for this script
6. COVER WORKFLOW
7. FIVE-IMAGE BATCH WORKFLOW
8. GLOBAL TEXT RULE
9. OBSERVABLE-SCENE RULE
10. BILD 01 through BILD NN

## Prompt simplicity

Detailed planning belongs in `99-intern/`.

Final BILD prompts stay short and direct:
- representation + camera/framing
- dominant subject/relation
- exact visible action/object/mechanism/text
- useful environment/props
- scene-specific light/color/mood
- continuity when needed
- exact visible German text or `No visible text.`

Do not repeat the full visual-world specification in every BILD.

## Representation first — HARD RULE

Before each BILD prompt, the repo must already have chosen the clearest representation:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

People are optional. Do not turn every beat into a stickman scene simply because the channel is a Stickman channel.

A character scene is appropriate when visible human behavior/interaction is the evidence. If an object, exact phrase, environment, mechanism or comparison carries the beat better, use that form instead.

Later non-character frames must still preserve the approved episode linework, shading, texture, color handling and finish.

## Observable Scene First

Use:

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → final prompt`

Do not ask Flow to invent how an abstract psychological state looks.
Do not literalize effect names automatically.

## Global visual style anchor

Use this short anchor once near the top of the master and only repeat compactly when Flow needs reinforcement:

`Same approved Psychology Stickman World: high-quality hand-drawn 2D animation with organic dark outlines, soft cel shading, subtle illustration texture, natural clear colors and coherent depth. When people appear they use the same stickman species: oversized round/soft-oval light heads, tiny black oval eyes, minimal expressive faces, narrow clothed torsos and very thin dark stick-like limbs. People, clothing, objects, text, environment, era, light and mood adapt to the script.`

Minimal global exclusions:
- no 3D / Pixar
- no anime
- no photorealism
- no normal-human anatomy drift
- no bare whiteboard doodle look
- no foreign corporate infographic style

## People

Do not invent a permanent protagonist.

Design people from the current script and role while keeping the same species.
Reuse exact identity only when story continuity clearly requires the same person.

Do not add people to object/text/environment frames just to make them feel populated.

Emotion should be visible through action, gaze, posture, hands, spacing, blocking and object relations when people are actually part of the chosen representation.

## Cover workflow

- BILD 01 only
- exactly 3 separate 16:9 cover candidates
- same visual thesis and exact cover text
- 3 meaningfully different compositions
- STOP for user choice
- winner → `01.png`
- approved `01.png` becomes the episode visual reference for species when people appear, plus linework, shading, texture and finish for every representation type

The approved cover is NOT a command to repeat its exact composition/person/location or to keep using people in later scenes.

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
Text may be the primary subject of a `TEXT_ILLUSTRATION` when wording itself is the mechanism.

## Hard fail

- full character scenes are used by default without a representation reason
- a person is added only to decorate an object/text beat
- people drift into a different species or normal cartoon-human anatomy
- object/text/schema frames switch to a foreign rendering style
- dark/bright/historical scenes switch to a foreign rendering style
- Flow must invent the core visual idea
- several scene numbers are combined into one asset
- cover gate or five-image batching is broken
