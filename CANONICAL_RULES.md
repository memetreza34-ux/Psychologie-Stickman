# CANONICAL RULES — HUMAN BEHAVIOR VISUAL PRODUCTION

## Source of Truth

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/FLOW_OUTPUT_MODE.md`
6. `rules/IMAGE_REFERENCE_LOCK.md`
7. approved `assets/cinematic-human-behavior-world/` references
8. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
9. `rules/COVER_LOCK.md`
10. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
11. `rules/YOUTUBE_EXPORT_PACKAGE.md`
12. format/script/production rules

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

## Representation

Every Visual Beat chooses one:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

Character presence is optional outside `CHARACTER_SCENE`.

## Google Flow structure — HARD LOCK

Every YouTube project uses exactly one central file:

`02-google-flow/google-flow-prompt.txt`

That one file contains the global visual rules and **all scenes for the complete video**.

Do not split one video into multiple Flow master-prompt files or separate batch-prompt files. Batch generation is allowed, but all batches use the same `google-flow-prompt.txt`.

Scene prompts stay concise because the global visual rules exist once at the top.

## Google Flow output — HARD LOCK FOR NEW VIDEOS

Follow `rules/FLOW_OUTPUT_MODE.md`.

New/future projects use `FINAL_SEPARATE_IMAGE_ASSETS_V2`.

The master prompt produces **final source images**, not a storyboard or automatic video.

- Scene 01 first
- exactly 3 separate Scene-01 cover candidates
- stop for approval
- keep one winner, rename immediately to `01.png`, place in `03-bilder/`
- later generation uses exactly 5 scene numbers per batch whenever at least 5 remain
- final remainder batch contains 1–4 scenes
- generate each five-scene batch as one batch operation, not deliberately image-by-image
- every scene number becomes its own standalone 16:9 image
- every accepted image is immediately renamed to its matching `NN.png`
- all accepted images stay together in one flat `03-bilder/` folder
- no batch subfolders or separate cover folder
- preserve the same approved premium visual world across every batch
- after batch QA, regenerate only failures and continue automatically with the next batch
- never combine several scene numbers into one storyboard, contact sheet, panel grid or collage
- never ask Flow to turn the scene plan into a video

A single scene may use split/contrast/montage only when all parts explain that one scene's spoken beat.

**Existing/historical projects are not retroactively migrated.** Change an existing project only when the user explicitly requests that project's migration.

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

`01.png = Scene 01 + Cover/Thumbnail`.

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
  "representationPolicy": "MIXED_HUMAN_BEHAVIOR_VISUALS_V2",
  "flowOutputPolicy": "FINAL_SEPARATE_IMAGE_ASSETS_V2",
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
- later batches visibly drift into another art style or lower-quality world
- several scene numbers are combined into one storyboard/contact-sheet asset
- new video falls back to deliberate one-scene-at-a-time generation while five scenes remain
- accepted scene images are not renamed to `NN.png`
- accepted scene images are split across batch folders instead of one `03-bilder/` folder
- one video is split into multiple Google-Flow master-prompt files
- new finished YouTube project has no complete `05-export/youtube-upload.txt`
