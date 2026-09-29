# GOOGLE FLOW OUTPUT MODE — FINAL IMAGE ASSETS

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS ONLY**

Policy ID: `FINAL_SEPARATE_IMAGE_ASSETS_V2`

Existing/historical YouTube projects are NOT migrated by this rule unless the user explicitly asks for that specific project to be changed.

## Core rule

A YouTube video uses exactly one master file:

`02-google-flow/google-flow-prompt.txt`

That file contains the global channel/visual rules and every scene prompt for the complete video.

The master prompt is an instruction for generating **final source images**, not a request for a storyboard or an automatically generated video.

## Output hard lock

Google Flow must NEVER combine several scene numbers into one generated asset.

Never output:
- a storyboard sheet
- a contact sheet
- a 3x3 or other panel grid containing several scene numbers
- a collage containing several independent scenes
- a shot-list image
- a storyboard preview
- an automatically generated video

Each scene number becomes its own separate 16:9 image asset.

A single scene may use `SPLIT`, `CONTRAST` or `MONTAGE` inside that one image only when the scene plan explicitly requires it. This never permits combining several different scene numbers into one image.

## Initial cover run

1. Read the entire master prompt so the full visual world and continuity plan are understood.
2. Generate **Scene 01 only**.
3. Generate exactly **3 separate Scene-01 cover candidates**.
4. Each candidate is a standalone 16:9 image, never a three-panel sheet.
5. STOP for user approval.
6. Keep exactly one approved winner.
7. Rename the approved winner to `01.png`.
8. Place it in the single final image folder `03-bilder/`.
9. Discard/reject the other two candidates.

## Regular generation — five-scene batches

After Scene 01 approval:
- generate the remaining scenes in **batches of exactly 5 scene numbers whenever at least 5 scenes remain**
- the final batch contains the remaining 1–4 scenes when fewer than 5 remain
- generate the whole current batch in one batch step/turn; do not deliberately process the five scenes one-by-one
- every scene number still produces one separate standalone 16:9 image
- do not create alternate versions unless a scene fails QA or the user asks
- run internal QA after the batch
- regenerate only failed images, not the whole batch
- after a batch passes QA, continue automatically with the next five-scene batch from the same master file; do not require a user confirmation between successful regular batches

Example after approved Scene 01:

`Batch 1: Scene 02, 03, 04, 05, 06`

means **five separate image assets generated as one batch operation**, not one image containing five panels and not five manually separated generation rounds.

Then:

`Batch 2: Scene 07, 08, 09, 10, 11`

Continue in groups of five until the final remainder batch.

## Naming — immediate and mandatory

As soon as an image passes QA, rename it immediately to its matching two-digit scene number:

- Scene 01 → `01.png`
- Scene 02 → `02.png`
- Scene 03 → `03.png`
- ...
- Scene 10 → `10.png`
- Scene NN → `NN.png`

Do not leave accepted images with temporary/generated names.

The file number always matches the scene number.

## Single final image folder

All accepted source images for the video belong together in exactly one flat folder:

`03-bilder/`

Rules:
- no batch subfolders
- no separate cover folder
- no `batch-1/`, `batch-2/` or similar output folders
- no duplicate accepted versions
- final folder contains only the accepted numbered scene images needed for the video

At the end of Flow image production, collect/keep all accepted renamed images together in this one folder. If the Flow environment requires packaging for download, package this folder as one archive while preserving the folder name and numbered filenames.

Expected final state example:

```text
03-bilder/
├── 01.png
├── 02.png
├── 03.png
├── 04.png
├── 05.png
├── 06.png
├── 07.png
└── ...
```

## Master prompt wording

Every NEW `google-flow-prompt.txt` must contain an explicit output instruction equivalent to:

`OUTPUT MODE — FINAL SOURCE IMAGES ONLY. Read the full master prompt, but generate only the current requested batch. Every scene number must be a separate standalone 16:9 image. NEVER create a storyboard, contact sheet, multi-scene panel grid, collage or video. After Scene 01 approval, generate scenes in five-scene batches, immediately rename accepted images to NN.png, and collect all accepted images in one flat 03-bilder/ folder.`

It must also contain the Scene-01 approval gate and five-scene batch instructions.

## QA hard fail

Reject the result if:
- two or more scene numbers appear inside one generated asset
- Flow creates a storyboard/contact sheet instead of individual images
- Flow proposes a video instead of the requested source images
- regular generation intentionally falls back to one-scene-at-a-time instead of a five-scene batch when five scenes remain
- a normal scene is returned as a multi-panel layout without that scene explicitly requesting split/contrast/montage
- an accepted image is left with a non-scene filename
- accepted images are split across batch folders instead of one `03-bilder/` folder
- scene numbering and accepted filenames do not match

## Structural compatibility

This rule does **not** split the master prompt into multiple files. All scenes remain in the single `02-google-flow/google-flow-prompt.txt`.

This V2 batch/output rule applies to **future/new YouTube projects only**. Existing project prompts remain unchanged unless the user explicitly requests migration.