# GOOGLE FLOW OUTPUT MODE — FINAL IMAGE ASSETS

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

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

A single scene may use `SPLIT`, `CONTRAST` or `MONTAGE` inside that one image only when the scene plan explicitly requires it. This never permits combining Scene 02 + Scene 03 + Scene 04 into one image.

## Initial cover run

1. Read the entire master prompt so the full visual world and continuity plan are understood.
2. Generate **Scene 01 only**.
3. Generate exactly **3 separate Scene-01 cover candidates**.
4. Each candidate is a standalone 16:9 image, never a three-panel sheet.
5. STOP for user approval.
6. Keep exactly one winner as `03-bilder/01.png`.
7. Discard/reject the other two candidates.

## Regular generation

After Scene 01 approval:
- default batch = 3 scene numbers
- hard maximum = 5 scene numbers
- each requested scene is generated as its own standalone image
- do not create alternate versions unless a scene fails QA or the user asks
- after a batch passes QA, continue with the next batch from the same master file

Example:

`Batch: Scene 02, Scene 03, Scene 04`

means **three separate image assets**, not one image containing three panels.

## Naming

Accepted outputs are stored flat in:

`03-bilder/`

Names:
- `01.png`
- `02.png`
- `03.png`
- ...

The file number always matches the scene number.

## Master prompt wording

Every new `google-flow-prompt.txt` must contain an explicit output instruction equivalent to:

`OUTPUT MODE — FINAL SOURCE IMAGES ONLY. Read the full master prompt, but generate only the requested scene numbers. Every scene number must be a separate standalone 16:9 image. NEVER create a storyboard, contact sheet, multi-scene panel grid, collage or video.`

It must also contain the Scene-01 approval gate and regular batch instructions.

## QA hard fail

Reject the result if:
- two or more scene numbers appear inside one generated asset
- Flow creates a storyboard/contact sheet instead of individual images
- Flow proposes a video instead of the requested source images
- a normal scene is returned as a multi-panel layout without that scene explicitly requesting a split/contrast/montage
- scene numbering and accepted filenames no longer match

## Structural compatibility

This rule does **not** split the master prompt into multiple files. All scenes remain in the single `02-google-flow/google-flow-prompt.txt`.
