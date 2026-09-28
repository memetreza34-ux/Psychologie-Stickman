# YOUTUBE VISUAL BEAT RULES

**STATUS: BINDING**

## One important thought = one visual beat

Split semantically when the spoken idea changes: new action, mechanism, example, comparison, cause/effect, question/answer, problem/solution, power relation, emotional state or location.

Typical target remains about 10–16 spoken words per beat; clarity wins over word count.

## Every beat plans

Every scene must contain:
- `sceneType`: CHARACTER_SCENE / SCHEMA_EXPLAINER / OBJECT_METAPHOR / COMPARE_VISUAL / TEXT_ILLUSTRATION
- `compositionType`: standard / split / contrast / montage
- `socialDensity`: solo / duo / group / none
- `moodMode`: CLEAR / UNEASY / DARK / POWER / MONEY / ISOLATION / HOPE
- `moodIntensity`: integer 0–4
- `powerDynamic`: NEUTRAL / SELF_VS_SELF / PEER_TO_PEER / DOMINANT_VS_TARGET / AUTHORITY_VS_GROUP / GROUP_VS_INDIVIDUAL / SYSTEM_VS_INDIVIDUAL / STATUS_CONTRAST / NONE
- `visualIdea`
- `subject`
- `actionOrRelation`
- `environment`
- `camera`
- `lightingMood`
- `colorDirection`
- `characterDirection` when characters appear
- `continuityPolicy`
- `textPolicy`
- exact planned Flow texts when needed

No scene should reach Phase 2 without mood mode, intensity and power dynamic.

## Mood selection

Choose mood from the current spoken beat only.

- `CLEAR`: explanation, ordinary cognition, neutral everyday behavior.
- `UNEASY`: doubt, uncertainty, subtle pressure or tension.
- `DARK`: manipulation, coercion, deception, severe conflict or disturbing behavior.
- `POWER`: hierarchy, authority, dominance, status or control.
- `MONEY`: money, pricing, consumption, negotiation, greed, financial risk or status.
- `ISOLATION`: exclusion, loneliness, vulnerability, alienation or fear.
- `HOPE`: protection, solution, clarity, recovery or constructive resolution.

Do not choose DARK merely because the overall video is about a dark subject. Each beat gets its own mood.

## Power relation

When the sentence describes influence, hierarchy, control, pressure, exclusion or status, the frame must visibly encode the relation through:
- blocking
- scale
- foreground/background placement
- distance
- posture
- gaze
- camera angle
- environmental control

Do not rely only on symbols or text when a human relationship is the actual point.

## Choosing a scene type

Use CHARACTER_SCENE when a relatable human action, reaction, hierarchy or relationship explains the beat best.
Use SCHEMA_EXPLAINER for mechanisms, sequences or relationships that genuinely benefit from arrows/labels.
Use OBJECT_METAPHOR when one symbolic object/environment explains the invisible mechanism faster.
Use COMPARE_VISUAL for two states, people, choices or perspectives.
Use TEXT_ILLUSTRATION for a memorable concept moment only.

## Same world everywhere

Schemas, objects and text illustrations use the same 2D linework, cel shading, texture, controlled color and world polish as character scenes.

Mood may change lighting/color strongly while illustration style remains fixed.

## Text policy

Allowed:
- `FLOW_EXACT_COVER_TEXT`
- `FLOW_EXACT_KEYWORD_TEXT`
- `FLOW_EXACT_SCHEMA_TEXT`
- `FLOW_EXACT_COMPARISON_TEXT`
- `FLOW_EXACT_TEXT_ILLUSTRATION`
- `NONE`

Schema: optional short title + up to 3 short labels.
Comparison: optional short title + up to 2 short labels.
All visible text must be exact German planned in Phase 1.
`NONE` means `ZERO READABLE TEXT`.
Speech context is never visible text.

## Fixed Phase 2 prompt contract

Every scene uses `FLOW_SCENE_PROMPT_CONTRACT_V1` from `rules/FLOW_PROMPT_CONTRACT.md`.

The exact field order and exact `PROMPT:` sub-block order are mandatory for every scene. Use `NONE` instead of dropping a field.

## Phase 2

Flow applies `CINEMATIC_HUMAN_BEHAVIOR_V2` to each beat.

It may vary:
- character identity
- role
- place
- camera
- mood
- lighting
- local color
- representation type

while preserving:
- same Stickman anatomy family
- same outline language
- same cel-shading/rendering family
- same overall world polish

Do not copy a previous room, pose, mood or composition simply for consistency. Consistency means same world, not same scene.
