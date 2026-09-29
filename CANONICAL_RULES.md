# CANONICAL RULES — HUMAN BEHAVIOR VISUAL PRODUCTION

## Source of Truth

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. approved `assets/cinematic-human-behavior-world/` references
5. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
6. `rules/COVER_LOCK.md`
7. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
8. format/script/production rules

## Active world

`CINEMATIC_HUMAN_BEHAVIOR_V2`

Core:
- one unified strict stylized stickman human family
- polished cinematic 2D rendering
- believable environments
- clean dark/organic outlines
- soft cel shading
- adaptive psychological lighting and color
- natural depth
- same visual world across bright, uneasy, dark, power, money, isolation and hopeful scenes

## Character rule

All people follow `STYLIZED_STICKMAN_CAST_V2`.

Characters may appear friendly, neutral, exhausted, vulnerable, anxious, dominant, cold, manipulative, deceptive, intimidating, isolated or authoritative while retaining identical anatomy logic.

No normal cartoon humans, no realistic human anatomy, no 3D/Pixar/anime drift.

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

Scene prompts should be concise and clear. They do not need artificial repeated technical sub-blocks when the global rules already exist at the top of the same file.

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

## Required metadata for new projects

```json
{
  "visualSystem": "CINEMATIC_HUMAN_BEHAVIOR_V2",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V2",
  "moodPolicy": "ADAPTIVE_PSYCHOLOGICAL_MOOD_V1",
  "environmentPolicy": "BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2",
  "renderingPolicy": "SOFT_CEL_SHADED_FILM_FRAME_V2",
  "representationPolicy": "MIXED_HUMAN_BEHAVIOR_VISUALS_V2",
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

Historical produced projects may retain old metadata as legacy artifacts.

## Hard fail

- bare whiteboard/doodle drift
- normal cartoon or realistic human drift
- mixed human anatomy families
- 3D/Pixar/anime/photorealistic drift
- corporate-vector schema drift
- random readable text
- current beat is not visually clear
- one video is split into multiple Google-Flow master-prompt files
