# GOOGLE FLOW OUTPUT MODE — FINAL IMAGE ASSETS

**STATUS: BINDING PROCESS RULE**

Policy ID: `FINAL_SEPARATE_IMAGE_ASSETS_V2`

This rule controls output behavior. Visual style is defined by `rules/PSYCHOLOGY_STICKMAN_WORLD.md`.

## One master file

Every video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

## Cover first — HARD LOCK

1. Read the full master prompt.
2. Generate BILD 01 only.
3. Generate exactly 3 separate 16:9 cover candidates.
4. Never combine them into one sheet/grid.
5. STOP for user choice.
6. Keep the chosen winner.
7. Rename it `01.png`.
8. Put it in `03-bilder/`.
9. Use approved `01.png` as the episode visual reference for later images.

`01.png` anchors:
- stickman species
- linework
- shading
- texture
- general rendering quality

It does NOT force later scenes to copy the same composition, location, person, palette or mood unless continuity requires it.

## Five-image batches

Only after cover approval:
- generate exactly 5 image numbers per batch whenever at least 5 remain
- final remainder = 1–4
- whole batch in one batch operation
- each image number = one separate 16:9 asset
- QA the batch
- regenerate only failures
- continue automatically after PASS

## Naming

Accepted images are immediately renamed to their two-digit scene number:

`01.png`, `02.png`, `03.png`, ...

## One final image folder

All accepted source images stay in one flat:

`03-bilder/`

No cover folder. No batch folders. No duplicate accepted versions.

## Never create

- storyboard
- contact sheet
- multi-scene grid
- collage containing several scene numbers
- automatic video

## Visual consistency

Active world: `PSYCHOLOGY_STICKMAN_WORLD_V1`.

Later batches must preserve:
- same stickman species
- same illustrator / line language
- same cel-shading and texture language
- same professional finish

But script-specific people, clothing, hairstyle, accessories, place, era, color, light and mood may change.

When Flow supports image references / ingredients, use approved `01.png` as the style reference for later batches.

## QA fail

Reject when:
- several scene numbers appear in one asset
- Flow intentionally falls back to one-at-a-time while five remain
- accepted images are not renamed correctly
- accepted images are split across folders
- Flow creates a video instead of source images
- later images drift into another human/cartoon species or another rendering style
