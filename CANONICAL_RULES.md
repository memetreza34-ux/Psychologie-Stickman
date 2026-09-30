# CANONICAL RULES — HUMAN BEHAVIOR VISUAL PRODUCTION

## Source of Truth

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/FLOW_OUTPUT_MODE.md`
6. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
7. `rules/FLOW_PROMPT_ARCHITECTURE.md`
8. `rules/REPRESENTATION_VARIETY_LOCK.md`
9. `rules/IMAGE_REFERENCE_LOCK.md`
10. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
11. `rules/COVER_LOCK.md`
12. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
13. `rules/YOUTUBE_EXPORT_PACKAGE.md`

## Active world

`CINEMATIC_HUMAN_BEHAVIOR_V2`

Core:
- polished hand-drawn 2D Stickman illustration
- simple round/oval heads and minimal expressive faces
- slim simplified bodies with thin clearly drawn limbs
- clean dark outlines
- flat controlled colors
- soft graphic/cel shading
- characters, props and environments in the same illustrated language
- one clear visual idea per frame

## Topic-specific world

The drawing DNA stays constant, but the local world changes with the topic.

Bright/calm topics may be brighter and open. Anxiety may be cooler. Manipulation/power may be darker. Hope may be warmer. Everyday topics may use natural local colors.

Do not force every video into one red/dark or teal/cream palette.

## Character rule

All visible people use `STYLIZED_STICKMAN_CAST_V2`.

Do not over-specify anatomy. The target is a polished editorial Stickman, not a bare line doodle and not a normal realistic/cartoon human.

## Observable scene first

Follow `OBSERVABLE_SCENE_FIRST_V1`:

`spoken meaning → viewer takeaway → observable evidence → one concrete visible composition → final Flow prompt`

Do not ask Flow to invent a visual for abstract psychology.
Do not literalize effect names automatically.

## Representation variety

Humans are optional. Character scene, object/environment image, comparison, schema and text illustration are all valid when they communicate the beat best.

No forced quotas.

## Google Flow prompt architecture

Every project uses exactly one:

`02-google-flow/google-flow-prompt.txt`

Detailed planning stays in `99-intern/`.

The final prompt stays concise:
1. task/output
2. short channel style
3. short topic/video world
4. cover + five-image workflow
5. text rule
6. observable-scene rule
7. `BILD 01` through `BILD NN`

Every BILD repeats only one short style anchor plus the actual scene direction.

## Cover + batching — HARD LOCK

- BILD 01 first
- exactly 3 separate cover candidates
- STOP for user choice
- chosen winner → `03-bilder/01.png`
- chosen `01.png` becomes the video-local visual reference for all later images
- preserve from it: Stickman construction, linework, flat color treatment, graphic shading, texture and overall illustration quality
- do not copy its exact pose, room, composition or palette by default
- only then continue in five-image batches
- each BILD stays a separate 16:9 asset
- accepted images renamed immediately to `NN.png`
- all accepted images stay together in one flat `03-bilder/`
- regenerate only failures
- never create a storyboard/contact sheet/final video in Flow

## Text rule

Only exact planned German text may appear. Otherwise: `ZERO READABLE TEXT`.

## Script

Keep `HOOK_FIRST_EXPLAIN_EARLY_V1`.

## Export

Every finished new YouTube project contains:

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

## Existing projects

Historical/existing projects are not automatically migrated. Migration only on explicit request for that project.

## Minimal hard fail

- photorealistic/realistic humans
- 3D/Pixar/anime
- cute/chibi/mascot
- bare whiteboard Stickmen
- character/environment rendering mismatch
- abstract psychology replacing observable evidence
- several scene numbers combined into one asset
- cover gate or five-image batching broken
- later batches visibly drift away from the approved cover's drawing DNA
- random readable text
