# CANONICAL RULES — HUMAN BEHAVIOR VISUAL PRODUCTION

## Source of Truth

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/FLOW_PROMPT_CONTRACT.md`
4. `rules/STICKMAN_DNA.md`
5. approved `assets/cinematic-human-behavior-world/` references
6. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
7. `rules/COVER_LOCK.md`
8. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
9. format/script/production rules

## Active world

`CINEMATIC_HUMAN_BEHAVIOR_V2`

Core:
- one unified stylized stickman-inspired human family
- polished cinematic 2D editorial/animated-film rendering
- believable environments
- clean slightly organic outlines
- soft cel shading
- adaptive psychological lighting and color
- natural depth
- meaningful details
- same world across bright, uneasy, dark, power, money, isolation and hope scenes

## Mood engine

Every visual beat plans:
- `moodMode`: `CLEAR`, `UNEASY`, `DARK`, `POWER`, `MONEY`, `ISOLATION`, `HOPE`
- `moodIntensity`: integer `0–4`
- `powerDynamic`

Mood changes storytelling. It must not change the illustration family.

## Character rule

All people follow `STYLIZED_STICKMAN_CAST_V2`.

Characters may appear friendly, neutral, exhausted, vulnerable, anxious, dominant, cold, manipulative, deceptive, intimidating, isolated or authoritative while retaining identical anatomy logic.

No cheap villain clichés by default.

## Representation

Every Visual Beat chooses one:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

Character presence is optional outside `CHARACTER_SCENE`.

## Prompt contract — HARD LOCK

Every Flow scene uses `FLOW_SCENE_PROMPT_CONTRACT_V1`.

Every `SCENE NN` block has the same ordered fields and every `PROMPT:` has the same ordered sub-blocks. Values may change; structure may not.

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

It follows the permanent reference system. It does NOT define global style.

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
  "promptContract": "FLOW_SCENE_PROMPT_CONTRACT_V1",
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
- Scene 01 as global style/anatomy master

Historical produced projects may retain old metadata as legacy artifacts, but no active agent or new project may copy those standards forward.

## Hard fail

- bare line-stickman/whiteboard drift
- normal cartoon or realistic human drift
- mixed human anatomy families
- 3D/Pixar/anime/photorealistic drift
- corporate-vector schema drift
- random readable text
- mood contradicts beat
- required power dynamic is visually absent
- dark scene becomes meaningless black void
- prompt contract fields are missing or reordered
- current beat is not visually clear
