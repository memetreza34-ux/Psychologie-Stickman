# GOOGLE FLOW PROMPT ARCHITECTURE — NATURAL MASTER V1

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

Policy ID: `NATURAL_FLOW_MASTER_V1`

This rule controls **how the final `google-flow-prompt.txt` is written**. Output/batching remains controlled by `rules/FLOW_OUTPUT_MODE.md`.

## 1. One master file only

Every YouTube video keeps exactly one Flow file:

`02-google-flow/google-flow-prompt.txt`

It contains the full channel/world instruction, the complete output workflow and all image prompts for the whole video.

Never split one video into `prompt-1.txt`, `batch-1.txt`, `flow-3-images.txt` or similar files.

## 2. Internal planning and final Flow prompt are different layers

Detailed planning belongs in `99-intern/`.

Internal planning may use fields such as:
- speech/voice-over beat
- scene type
- visual function
- composition type
- social density
- mood mode/intensity
- power dynamic
- visual idea/task
- subject/action/relation
- environment
- camera
- lighting/color direction
- continuity
- text policy
- QA

These fields are useful for planning and validation but **must not be dumped mechanically into the final Flow prompt**.

The final Flow prompt should read like clear art direction to an illustrator, not like a database form.

## 3. Required final master structure

New `google-flow-prompt.txt` files use this order:

1. `TASK / OUTPUT`
2. `CHANNEL VISUAL WORLD`
3. `CHARACTER + REFERENCE SYSTEM`
4. `VIDEO WORLD LOCK`
5. `GENERATION WORKFLOW`
6. `GLOBAL TEXT RULE`
7. `BILD 01` through `BILD NN` as natural direct image prompts
8. short final QA reminder if useful

Global style/anatomy/negative rules appear **once near the top**, not repeated inside every image block.

## 4. Natural image-prompt rule

Each `BILD NN` block contains one natural direct paragraph or a few concise sentences.

Write only what that image needs. A strong prompt normally communicates, in natural language:
- camera/framing when important
- dominant subject or relationship
- visible action/state/mechanism
- relevant environment/props
- lighting/mood/local color
- continuity with a recurring character/place/object when needed
- exact German visible text only when planned

Do not output mechanical scene labels such as:

```text
SCENE TYPE:
SOCIAL DENSITY:
VISUAL IDEA:
VISUAL TASK:
POWER DYNAMIC:
CHARACTER DIRECTION:
LIGHTING MOOD:
```

Those remain in `99-intern/`.

## 5. One clear visual thought per image

Each final image should communicate one dominant idea quickly.

Prefer:
- one dominant subject/relation
- 1–3 genuinely useful supporting elements
- large YouTube-readable shapes
- clear focal hierarchy

If a spoken beat contains two equally important visual ideas, split the planning into two image beats rather than overloading one image.

## 6. Unified world, varied staging

The complete video must feel like one illustrated film by the same illustrator.

Keep constant:
- mature strict-stickman anatomy family
- linework/outline behavior
- 2D rendering language
- cel-shading family
- texture/detail quality
- environment-quality standard
- typography language
- overall adult psychology-documentary/editorial identity

Allow to vary by beat:
- location
- camera distance/angle
- day/night
- light direction
- local color
- mood
- number of people
- character vs object vs schema vs comparison

**Same world does not mean same composition or same palette.**

## 7. Reference architecture

Use references by role, not as one giant style collage.

Preferred minimal system when approved assets exist:
- `style-master.png` — style/rendering/anatomy-quality anchor
- one or two clean reference images for a recurring Character A when needed
- one or two clean reference images for a recurring Character B when needed
- `character-group.png` only when group consistency benefits from it
- one optional schema/environment reference only when that visual family needs additional steering

Not every video needs every reference.

Reference roles:
- **style-only** reference locks rendering/anatomy/linework/shading/texture quality
- **character-identity** reference locks the returning person's identity/clothing cues
- **environment-continuity** reference locks a recurring place/layout

Never use a weak/cute/chibi/broad-shouldered reference just because it exists. Text rules remain authoritative until a reference is explicitly approved.

## 8. Character quality

Characters remain `STYLIZED_STICKMAN_CAST_V2`, but they must not feel sterile.

Within the same anatomy family, individuality may come from:
- simple hairstyle/silhouette
- eyebrows and small eye/mouth variation
- glasses or one useful accessory
- clothing color/shape
- posture
- gaze
- social distance
- role-specific body language

Do not individualize by switching to normal cartoon-human anatomy.

## 9. Representation variety

Do not force humans into every image.

Use the clearest representation for the beat:
- character interaction
- object/environment illustration
- object metaphor
- comparison
- cinematic schema/mechanism
- sparse text illustration only when useful

Visible text and schemas are tools, not defaults.

## 10. Cover + production workflow — non-negotiable

The prompt must preserve `FINAL_SEPARATE_IMAGE_ASSETS_V2` exactly:

### Cover gate
1. Read the full master prompt.
2. Generate **BILD 01 only**.
3. Generate exactly **3 separate 16:9 cover candidates**.
4. Never combine them into one sheet/grid.
5. STOP and wait for the user to choose one.
6. Keep the chosen image only.
7. Rename it immediately to `01.png`.
8. Put it directly in `03-bilder/`.

### After user chooses the cover
- generate all remaining images in batches of exactly **5 image numbers** whenever at least 5 remain
- each requested image remains its own standalone 16:9 asset
- do not deliberately generate the five images one-by-one
- after each batch, immediately rename accepted outputs to their image number: `02.png`, `03.png`, etc.
- put every accepted image directly into the same flat `03-bilder/` folder
- no `batch-1/`, `covers/` or other output subfolders
- QA the batch; regenerate only failed images
- after a successful batch, continue automatically with the next 5-image batch
- final batch may contain the remaining 1–4 images
- never offer to create the final video in Flow

At the end:

```text
03-bilder/
01.png
02.png
03.png
...
NN.png
```

## 11. Global text rule

Default: no visible text.

Only render exact German wording explicitly requested for a specific image.
Do not render voice-over text as captions.
Do not invent readable signs, screens, documents, packaging or pseudo-text.

## 12. Good final prompt style

Good:

```text
BILD 05
Wide three-quarter view inside a modern café in daylight. Character A sits opposite Character B while B confidently explains something and A begins accepting the idea. Keep both figures large and readable with natural social spacing. Warm window light, muted green and amber local colors, rich but uncluttered café depth. No visible text.
```

Avoid:

```text
SCENE TYPE: CHARACTER_SCENE
SOCIAL DENSITY: DUO
VISUAL IDEA: ...
VISUAL TASK: ...
CAMERA: ...
LIGHTING MOOD: ...
CHARACTER DIRECTION: ...
```

## 13. Hard fail

Reject/rewrite the final master prompt if:
- it becomes a long repeated technical form instead of direct art direction
- global style rules are repeated inside every image block
- several scene numbers are combined into one image asset
- cover approval is skipped
- post-cover generation does not use 5-image batches when five remain
- accepted images are not renamed immediately
- accepted images are split across folders
- later batches reset the style
- the visual world is consistent only because every image repeats the same room, palette or character shot
- figures are forced into every frame
- text or schemas are used as filler

This rule complements `rules/FLOW_OUTPUT_MODE.md`, `rules/VISUAL_SYSTEM.md`, `rules/IMAGE_REFERENCE_LOCK.md` and `rules/REPRESENTATION_VARIETY_LOCK.md`.