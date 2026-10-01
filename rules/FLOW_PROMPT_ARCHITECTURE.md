# GOOGLE FLOW PROMPT ARCHITECTURE — NATURAL MASTER V2

**STATUS: BINDING PROCESS RULE**

Policy ID: `NATURAL_FLOW_MASTER_V2`

## Visual-world gate

Current visual-world status: **UNDEFINED**.

This file defines prompt structure only. It must NOT invent the new channel style.

No new Flow image generation may start until a new visual world has been explicitly defined and approved.

## One master file

Every video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

All images stay inside this one master file.

## Final prompt order

1. TASK / OUTPUT
2. VISUAL WORLD STATUS
3. approved CHANNEL STYLE / CHARACTER SYSTEM once the new world exists
4. VIDEO WORLD / continuity
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
- light/color only according to the future approved visual world
- continuity when needed
- exact visible German text or `No visible text.`

Do not repeat large technical forms inside every BILD.

## Observable Scene First

Use:

`spoken meaning → viewer takeaway → observable evidence → concrete composition → final prompt`

Do not ask Flow to invent how an abstract psychological state looks.
Do not literalize effect names automatically.

## Visual style anchor

There is currently **no active style anchor**.

When the new visual world is approved, define one short reusable anchor here and in the template. Until then, do not substitute an old Stickman/editorial/3D/cartoon style.

## Cover workflow

- BILD 01 only
- exactly 3 separate 16:9 cover candidates
- same visual thesis and exact cover text
- 3 meaningfully different compositions
- STOP for user choice
- winner → `01.png`

How the approved cover is used as a visual reference will be finalized together with the new visual world.

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

## Text

Default: `No visible text.`

Only exact planned German wording may appear.

## Hard fail

- image generation starts while `VISUAL WORLD STATUS` is `UNDEFINED`
- an old deleted visual world is silently reused
- Flow must invent the core visual idea
- several scene numbers are combined into one asset
- cover gate or five-image batching is broken
