# GOOGLE FLOW PROMPT ARCHITECTURE — NATURAL MASTER V2

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

Policy ID: `NATURAL_FLOW_MASTER_V2`

Creative translation follows `OBSERVABLE_SCENE_FIRST_V1`. Output/batching follows `FINAL_SEPARATE_IMAGE_ASSETS_V2`.

## 1. One master file

Every video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

All images stay inside this one master file.

## 2. Keep the Flow prompt simple

Detailed planning belongs in `99-intern/`.

The final Flow prompt must be short, direct and visual. Do not dump long anatomy contracts, planning fields or large negative-prompt lists into every scene.

## 3. Global style block

At the top define the channel drawing DNA once:

`Polished hand-drawn 2D Stickman illustration. Simple round/oval heads, minimal expressive faces, slim simplified bodies, thin clearly drawn limbs, simple clothing, clean dark outlines, flat controlled colors and soft graphic shading. Characters, props and environments use the same illustrated language.`

Keep negatives short:

`No photorealism. No 3D/Pixar/anime. No chibi. No bare whiteboard stick figures.`

## 4. Topic world

Each video gets a short local world direction based on the topic.

Examples:
- bright/open
- cool/uneasy
- dark/power
- warm/hopeful
- commercial/money
- sparse/isolation

Do not force one palette across the channel.

## 5. Short style anchor per image

Every `BILD NN` starts with one compact reminder:

`Same polished hand-drawn 2D Stickman world as this video: simple round/oval heads, slim simplified bodies, thin drawn limbs, clean dark outlines, flat controlled colors and soft graphic shading.`

After the cover is approved, later images should additionally follow the approved `01.png` as the **video-local visual reference** for Stickman construction, linework, shading, texture and overall quality.

Do not copy the cover's exact pose, room, composition or palette unless continuity requires it.

## 6. Scene prompt formula

A normal image prompt should contain only what matters:
1. camera/framing
2. main subject
3. exact visible action/relation
4. relevant environment/props
5. light/local color if useful
6. continuity if needed
7. exact text or `No visible text.`

Target roughly **35–80 English words** for normal images. Longer only when a comparison or continuity genuinely needs it.

Every sentence should change something visible.

## 7. Observable scene first

Never ask Flow to invent what an abstract psychological state looks like.

Use:

`spoken meaning → viewer takeaway → observable evidence → concrete composition → final prompt`

Do not literalize effect names automatically.

## 8. One idea per image

One image normally has one dominant visible idea. If several independent examples are needed, create additional image beats rather than cramming them together.

## 9. Cover workflow

BILD 01:
- generate exactly 3 separate 16:9 cover candidates
- same approved thesis and exact cover text
- three meaningfully different compositions
- STOP for user choice
- chosen winner → `01.png`
- chosen `01.png` becomes the video-local visual reference for all later batches

## 10. Later generation

Only after cover selection:
- generate BILD 02–06 together
- then 07–11
- then 12–16
- continue in groups of 5 while possible
- final remainder may contain 1–4 images
- each image is still one separate 16:9 asset
- rename accepted images immediately to `NN.png`
- keep everything together in `03-bilder/`
- regenerate only failures
- never create a storyboard, contact sheet or final video

## 11. Text

Default: `No visible text.`

Only exact planned German wording may appear.

## 12. Minimal hard fail

Rewrite/regenerate if:
- the central behavior is unclear
- a named psychology effect is turned into a literal gimmick without reason
- the frame drifts to photorealism, 3D/Pixar/anime, chibi or whiteboard doodle
- the environment and characters look like different rendering styles
- several scene numbers are combined into one asset
- the cover gate or five-image batching is broken
- later batches stop matching the approved cover's drawing DNA

This rule complements `rules/STICKMAN_DNA.md`, `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`, `rules/FLOW_OUTPUT_MODE.md` and `rules/VISUAL_SYSTEM.md`.
