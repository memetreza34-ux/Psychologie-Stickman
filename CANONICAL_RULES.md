# CANONICAL RULES — PSYCHOLOGY VISUAL PRODUCTION

## Source of Truth

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. approved `assets/cinematic-psychology-world/` references
5. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
6. `rules/COVER_LOCK.md`
7. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
8. format/script/production rules

## Active world

`CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1`

Core:
- stylized stickman-inspired clothed figures, not bare line stickmen
- believable colorful 2D environments
- clean slightly organic outlines
- soft cel shading
- cinematic illustrated lighting and framing
- natural depth
- small meaningful details
- consistent film-world across every representation type

## Representation

Every Visual Beat chooses one:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

Character presence is optional outside `CHARACTER_SCENE`.

## Visual clarity

One important visual thought per frame. Detail may enrich the location, but must support rather than compete with the beat.

## Character rule

All people follow `STYLIZED_STICKMAN_CAST_V1`: large simplified head, minimal face, compact clothed torso, very slim simplified illustrated limbs, simple hands/shoes. Individuals may vary through clothing, hair cue, glasses, accessories, size, posture and expression.

## Text rule

Google Flow only. Planned modes:
- cover
- keyword
- schema title + up to 3 short labels
- comparison labels
- short text illustration

Unplanned text: `ZERO READABLE TEXT`.
Remotion visible text: disabled.

## Cover

`01.png = Scene 01 + Cover/Thumbnail`. It follows the global reference pack but does not define global style.

## Script

Keep `HOOK_FIRST_EXPLAIN_EARLY_V1`:
- Hook scene 01
- core concept by scene 03
- concrete example by scene 05 when possible

## New metadata

```json
{
  "visualSystem": "CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V1",
  "environmentPolicy": "BELIEVABLE_CINEMATIC_ENVIRONMENT_V1",
  "renderingPolicy": "SOFT_CEL_SHADED_FILM_FRAME_V1",
  "representationPolicy": "MIXED_PSYCHOLOGY_VISUALS_V1",
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3"
}
```

Old visual-policy keys and Minimal Editorial v2 are not active standards.

## Hard fail

- bare line-stickman/whiteboard drift
- normal full cartoon/realistic human drift
- 3D/Pixar/anime/photorealistic drift
- corporate-vector schema drift
- inconsistent line/shading/lighting language between scene types
- random readable text
- image does not explain current beat
