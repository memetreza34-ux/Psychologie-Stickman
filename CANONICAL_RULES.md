# CANONICAL RULES — HUMAN BEHAVIOR VISUAL PRODUCTION

## Source of Truth

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/FLOW_OUTPUT_MODE.md`
6. `rules/FLOW_PROMPT_ARCHITECTURE.md`
7. `rules/REPRESENTATION_VARIETY_LOCK.md`
8. `rules/IMAGE_REFERENCE_LOCK.md`
9. approved `assets/cinematic-human-behavior-world/` references
10. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
11. `rules/COVER_LOCK.md`
12. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
13. `rules/YOUTUBE_EXPORT_PACKAGE.md`
14. format/script/production rules

## Active world

`CINEMATIC_HUMAN_BEHAVIOR_V2`

Core:
- one unified mature strict-stickman human family
- polished cinematic 2D psychology-documentary / editorial rendering
- believable rich environments
- clean dark/organic outlines
- soft cel shading with useful graphic shadow
- adaptive psychological lighting and color
- natural depth
- same visual world across bright, uneasy, dark, power, money, isolation and hopeful scenes

## Character rule

All people follow `STYLIZED_STICKMAN_CAST_V2`.

Hard anatomy:
- large simple head without chibi/mascot exaggeration
- minimal face
- small narrow clothed torso
- narrow shoulders
- very slim arms and legs
- simple no-finger hands and shoes

Characters may appear friendly, neutral, exhausted, vulnerable, anxious, dominant, cold, manipulative, deceptive, intimidating, isolated or authoritative while retaining identical anatomy logic.

Individuality may come from restrained hair/eyebrow/eye/mouth variation, glasses/accessories, clothing, posture, gaze and role-specific body language without changing anatomy family.

No cute/chibi/mascot people, no normal cartoon humans, no realistic human anatomy, no broad shoulders/thick limbs, no 3D/Pixar/anime drift.

## Rich-world rule

Simple characters do not mean empty scenes.

Normal real-life frames use scene-specific environments, meaningful props, useful foreground/midground/background and motivated light. Empty cream/off-white space is not the channel default and is used only when deliberate negative space is part of the beat.

## Unified film-world rule — HARD LOCK

A complete YouTube video must feel like **one coherent illustrated film**, not a collection of unrelated AI images.

Across all scenes and all Flow batches, preserve the same:
- Stickman anatomy family
- illustration/rendering language
- outline behavior
- cel-shading style
- texture/detail level
- environment quality
- depth/spatial logic
- typography language
- overall premium editorial/psychology-documentary identity

Scene mood, color temperature, location, camera and lighting may change when the story requires it. The visual identity may not.

A batch boundary is never allowed to reset the style. Batch 2, Batch 3 and later batches must still look as if the same illustrator created them for the same channel and the same visual world.

## Representation variety — HARD LOCK FOR NEW VIDEOS

Follow `rules/REPRESENTATION_VARIETY_LOCK.md`.

Do not force every visual beat into a Stickman character scene.

Every beat chooses the clearest form:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`
- environment/object-only illustration when clearer

Normal longform guidance:
- character scenes about 45–60%
- schemas about 10–20%
- object metaphors about 10–20%
- comparisons about 10–20%
- text illustrations normally 0–10%

These are guidance ranges, not quotas. Clarity wins.

Text and schemas are used only when they materially improve understanding. Do not place text on every image and do not use schemas as filler. If text is unnecessary: `ZERO READABLE TEXT`.

Do not mechanically repeat one red/burgundy/dark treatment, one teal/cream treatment, one room type or one character-shot pattern across the video. Mood, color, camera and representation may vary by beat while the illustration identity stays fixed.

## Google Flow prompt architecture — HARD LOCK

Follow `rules/FLOW_PROMPT_ARCHITECTURE.md` / `NATURAL_FLOW_MASTER_V1`.

Every YouTube project uses exactly one central file:

`02-google-flow/google-flow-prompt.txt`

That one file contains the full channel/world instruction, output workflow and **all images for the complete video**.

Detailed planning remains in `99-intern/`. The final Flow prompt must not mechanically dump planning fields such as scene type, social density, mood, visual task, power dynamic or character direction into every image block.

The final master is written as:
1. task/output
2. one concise channel visual-world block
3. character/reference system
4. video world/continuity lock
5. cover + five-image generation workflow
6. global text rule
7. `BILD 01` through `BILD NN` as natural direct image prompts

Global style/anatomy/negative rules appear once near the top. Each image block then reads like concise art direction to an illustrator.

Do not split one video into multiple Flow master-prompt files or separate batch-prompt files. Batch generation is allowed, but all batches use the same `google-flow-prompt.txt`.

## Google Flow output — HARD LOCK FOR NEW VIDEOS

Follow `rules/FLOW_OUTPUT_MODE.md`.

New/future projects use `FINAL_SEPARATE_IMAGE_ASSETS_V2`.

The master prompt produces **final source images**, not a storyboard or automatic video.

- Scene/Bild 01 first
- exactly 3 separate Cover candidates for Bild 01
- stop for user approval
- keep one winner, rename immediately to `01.png`, place in `03-bilder/`
- only after the user chooses the cover, generate later images
- later generation uses exactly 5 image numbers per batch whenever at least 5 remain
- final remainder batch contains 1–4 images
- generate each five-image batch as one batch operation, not deliberately image-by-image
- every image number becomes its own standalone 16:9 image
- every accepted image is immediately renamed to its matching `NN.png`
- all accepted images stay together in one flat `03-bilder/` folder
- no batch subfolders or separate cover folder
- preserve the same approved premium visual world across every batch
- after batch QA, regenerate only failures and continue automatically with the next batch
- never combine several image numbers into one storyboard, contact sheet, panel grid or collage
- never ask Flow to turn the image plan into a video

A single image may use split/contrast/montage only when all parts explain that one spoken beat.

**Existing/historical projects are not retroactively migrated.** Change an existing project only when the user explicitly requests that project's migration.

## Reference architecture

Follow `rules/IMAGE_REFERENCE_LOCK.md`.

Use approved references by role rather than a giant style collage. A practical minimal pack may contain:
- `style-master.png`
- one or two approved images for recurring Character A when needed
- one or two approved images for recurring Character B when needed
- `character-group.png` when group consistency benefits from it
- one optional schema/environment reference when needed

Not every video needs every reference. Until a reference is actually approved, the text rules remain authoritative.

## Visual clarity

One important visual thought per frame. No future information. Detail supports the current beat.

## Text rule

Google Flow only. Planned modes:
- cover
- keyword
- schema title + short labels
- comparison labels
- short text illustration

Unplanned text: `ZERO READABLE TEXT`.
Speech context is never visible text.
Remotion visible YouTube text remains disabled.

## Cover

`01.png = Scene/Bild 01 + Cover/Thumbnail`.

It follows the permanent channel visual system and approved references.

## Script

Keep `HOOK_FIRST_EXPLAIN_EARLY_V1`:
- Hook scene 01
- core concept by scene 03
- concrete example by scene 05 when possible

## YouTube export package — HARD LOCK

Every new YouTube project finishes with:

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

`youtube-upload.txt` is the single copy/paste file for publication and contains:
- final YouTube title
- full description / caption
- sources / links when relevant
- chapters when useful
- tags
- hashtags
- pinned comment or `NONE`
- cleaned final German speaker text / captions
- basic video data

Do not create separate normal-workflow files such as `title.txt`, `description.txt`, `tags.txt` or `chapters.txt`. All copyable upload information belongs in `youtube-upload.txt`.

Final upload package must contain no placeholders. See `rules/YOUTUBE_EXPORT_PACKAGE.md`.

## Required metadata for new projects

```json
{
  "visualSystem": "CINEMATIC_HUMAN_BEHAVIOR_V2",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V2",
  "moodPolicy": "ADAPTIVE_PSYCHOLOGICAL_MOOD_V1",
  "environmentPolicy": "BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2",
  "renderingPolicy": "SOFT_CEL_SHADED_FILM_FRAME_V2",
  "representationPolicy": "REPRESENTATION_VARIETY_V1",
  "flowOutputPolicy": "FINAL_SEPARATE_IMAGE_ASSETS_V2",
  "flowPromptPolicy": "NATURAL_FLOW_MASTER_V1",
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3"
}
```

## Retired standards

Not active for new production:
- `Universal Editorial Stickman World v1.3`
- `MINIMAL_EDITORIAL_STICKMAN_V2`
- `CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1`
- `FLOW_SCENE_PROMPT_CONTRACT_V1`
- `FINAL_SEPARATE_IMAGE_ASSETS_V1` for new projects

Historical produced projects may retain old metadata and old Flow batching as legacy artifacts.

## Hard fail

- bare whiteboard/doodle drift
- cute/chibi/mascot drift
- normal cartoon or realistic human drift
- broad normal-human shoulders or thick limbs
- mixed human anatomy families
- 3D/Pixar/anime/photorealistic drift
- corporate-vector schema drift
- empty cream/off-white background used as normal default
- random readable text
- current beat is not visually clear
- nearly every frame uses a character without a clear reason
- text/schema frames are used as filler
- one red/burgundy/dark or teal/cream treatment is mechanically repeated across the whole video
- later batches visibly drift into another art style or lower-quality world
- final Flow prompt is a repeated technical form instead of natural image art direction
- several scene/image numbers are combined into one storyboard/contact-sheet asset
- new video falls back to deliberate one-image-at-a-time generation while five images remain
- accepted images are not renamed to `NN.png`
- accepted images are split across batch folders instead of one `03-bilder/` folder
- one video is split into multiple Google-Flow master-prompt files
- new finished YouTube project has no complete `05-export/youtube-upload.txt`
