# GOOGLE FLOW OUTPUT MODE — FINAL IMAGE ASSETS

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS ONLY**

Policy ID: `FINAL_SEPARATE_IMAGE_ASSETS_V2`

Existing/historical projects are not migrated automatically.

## One master file

Every video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

It contains the complete image plan. Batches are generation steps, not separate prompt files.

## Cover first — HARD LOCK

1. Read the full master prompt.
2. Generate **BILD 01 only**.
3. Generate exactly **3 separate 16:9 cover candidates**.
4. Never combine them into one sheet/grid.
5. STOP and wait for the user's choice.
6. Keep exactly the chosen winner.
7. Rename it to `01.png`.
8. Put it in `03-bilder/`.

## Approved cover becomes the video-local reference

After the user chooses the cover, `01.png` becomes the visual reference for the rest of **that video**.

Later batches must preserve from it:
- Stickman construction
- outline/linework language
- flat-color treatment
- graphic/cel shading
- texture/detail level
- overall illustration quality

The cover reference does **not** force the same room, camera, pose, mood or palette. Those change with the current beat.

## Five-image batches

Only after cover approval:
- generate the remaining scenes in batches of exactly 5 whenever at least 5 remain
- final remainder = 1–4 scenes
- generate the whole current batch in one batch operation/turn
- every scene number still becomes one separate standalone 16:9 image
- use the approved `01.png` as the local style reference throughout all later batches
- QA after each batch
- regenerate only failed images
- after a passing batch continue automatically with the next batch

Example:

`02, 03, 04, 05, 06`

then:

`07, 08, 09, 10, 11`

and so on.

## Naming

Rename every accepted image immediately:
- BILD 01 → `01.png`
- BILD 02 → `02.png`
- BILD 03 → `03.png`
- ...

## One final image folder

All accepted images stay together in one flat folder:

`03-bilder/`

No cover subfolder. No batch subfolders. No duplicate accepted versions.

## Never create

- storyboard
- contact sheet
- multi-scene grid
- collage containing several scene numbers
- automatic video

One scene number = one separate image asset.

## World consistency

The complete video must look like one illustrated world from the same artist.

The same drawing DNA stays constant, while location, camera, lighting, local color and mood may change with the topic and scene.

## QA fail

Reject when:
- several scene numbers appear in one generated asset
- Flow falls back to deliberate one-image-at-a-time generation while five remain
- later batches stop matching the approved cover's drawing DNA
- an accepted image is not renamed correctly
- accepted images are split across folders
- Flow creates a video instead of source images

This rule applies to future/new videos unless the user explicitly requests migration of an existing project.
