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
- linework
- shading
- texture
- general rendering quality
- stickman species whenever people appear

It does NOT force later scenes to copy the same composition, location, person, representation type, palette or mood unless continuity requires it.
A cover containing people does NOT mean later images must contain people.


## Cover selection is the ONLY human STOP — HARD LOCK

Policy: `COVER_ONCE_AUTOCONTINUE_FINAL_QA_V1` (binding in addition to `FINAL_SEPARATE_IMAGE_ASSETS_V2`).

1. Generate exactly three separate cover candidates for BILD 01. **STOP only here** and wait for the user's choice.
2. After the user chooses, put the winner in `03-bilder/01.png`. Immediately delete/discard the other **two rejected cover candidate files** from the working/output folder. No unselected covers in `03-bilder/` or any handoff. Never delete them before the user has selected the winner.
3. Continue with BILD 02 onward **automatically without asking, pausing, presenting intermediate batches for approval or waiting for "weiter"**. Run 02–06, 07–11, and so on, exactly five scene numbers per operation whenever five remain. Last operation is the 1–4 remainder.
4. After EACH operation, check that its five different images exist, are separate 16:9 images, match their assigned BILD numbers and visual/text rules; rename accepted files immediately `NN.png` and place them in the ONE flat `03-bilder/` folder. Only regenerate failed or missing scene numbers, then recheck, and continue by itself.
5. Continue until every BILD 01–NN is present and accepted; do not stop after a passing 5-image batch.
6. FINAL QA: expected count **N** from `99-intern/phase1-scenes.json`; exact contiguous filenames `01.png` through `NN.png`; one 16:9 file per scene; no duplicates, gaps, failed images, leftover cover alternatives, contact sheets, subfolders or batch folders. Verify the visual-world/species and accidental-text rules, which are not mechanically detectable from filenames.
7. If something is missing, regenerate/retrieve the missing or failed items, put them in their numbered slots, and rerun final QA **without asking the user**. Report success only when the set is complete. If tools are blocked, report a concrete blocker and incomplete status, **never claim all images were produced or deleted**.
8. Final handoff is a **single flat `03-bilder/` folder** containing only the accepted numbered images. Do not create extra prompts, preview folders, extra accepted copies, a storyboard, collage, contact sheet or automatic video.
9. With images available locally, run `npm run flow:verify -- <project-folder>` to machine-check PNG signatures, 16:9 dimensions, expected count, names and folder shape. This does not replace human/visual QA. If the Flow environment cannot execute the repo's scripts, do the equivalent checks with available file controls; describe any checks you could not perform.

**One pause only: cover choice. Zero approval pauses or "continue?" questions after the choice.**

### Optional safe local cover handoff

When three temporary candidates have been saved locally as:
`03-bilder/cover-candidate-01.png`, `cover-candidate-02.png`, `cover-candidate-03.png`,
the selected winner can be finalized with
`npm run flow:cover -- <project-folder> <1|2|3>`.
That command refuses an existing `01.png`, renames the winner and removes only the two exact losing candidate files. It never deletes anything without an explicit selection.

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
- same illustrator / line language
- same cel-shading and texture language
- same professional finish
- same stickman species when people appear

Representation may change beat by beat according to Phase 1:
- character scene
- object focus
- environment scene
- schema explainer
- comparison
- text illustration

Objects, text, environments and schemas must look like they were drawn by the same illustrator as the character scenes.

When Flow supports image references / ingredients, use approved `01.png` as the style reference for later batches.

## QA fail

Reject when:
- several scene numbers appear in one asset
- Flow intentionally falls back to one-at-a-time while five remain
- accepted images are not renamed correctly
- accepted images are split across folders
- Flow creates a video instead of source images
- later images drift into another rendering style
- people drift into another human/cartoon species
- non-character frames switch to a foreign infographic/vector style
- Flow adds people to an object/text/environment frame despite the prompt explicitly choosing a non-character representation
