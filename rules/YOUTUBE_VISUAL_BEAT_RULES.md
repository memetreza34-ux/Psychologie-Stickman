# YOUTUBE VISUAL BEAT RULES

**STATUS: BINDING**

## One important thought = one visual beat

Split semantically when the spoken idea changes: new action, mechanism, example, comparison, cause/effect, question/answer, problem/solution, power relation, emotional state or location.

Typical target remains about 10–16 spoken words per beat; clarity wins over word count.

## Every beat plans

Every scene may plan:
- `sceneType`: CHARACTER_SCENE / SCHEMA_EXPLAINER / OBJECT_METAPHOR / COMPARE_VISUAL / TEXT_ILLUSTRATION
- `compositionType`: standard / split / contrast / montage
- `socialDensity`: solo / duo / group / none
- `moodMode`: CLEAR / UNEASY / DARK / POWER / MONEY / ISOLATION / HOPE
- `moodIntensity`: integer 0–4
- `powerDynamic`
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

Mood/power fields belong to visual planning. They do **not** require a separate verbose prompt-contract structure inside every Flow scene.

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

Do not mechanically repeat the same red/burgundy/dark treatment across many scenes. A video may move through different color temperatures, lighting situations and accent colors while preserving one illustration identity.

## Power relation

When the sentence describes influence, hierarchy, control, pressure, exclusion or status, the frame should visibly encode the relation through blocking, scale, distance, posture, gaze, camera or environment.

## Choosing a scene type

Use CHARACTER_SCENE when a relatable human action, reaction, hierarchy or relationship explains the beat best.
Use SCHEMA_EXPLAINER only when a mechanism, sequence or relationship genuinely benefits from structural visualization.
Use OBJECT_METAPHOR when one symbolic object/environment explains the invisible mechanism faster.
Use COMPARE_VISUAL for two states, people, choices or perspectives.
Use TEXT_ILLUSTRATION for a memorable concept moment only and sparingly.

Do not default to CHARACTER_SCENE merely because the channel uses Stickmen. If an object, environment, comparison or mechanism is clearer, omit humans.

## Representation variety — HARD LOCK for new videos

Binding detail rule: `rules/REPRESENTATION_VARIETY_LOCK.md`.

Normal longform guidance:
- `CHARACTER_SCENE`: about 45–60%
- `SCHEMA_EXPLAINER`: about 10–20%
- `OBJECT_METAPHOR`: about 10–20%
- `COMPARE_VISUAL`: about 10–20%
- `TEXT_ILLUSTRATION`: normally 0–10%

These are guidance ranges, not quotas. The clearest visual for the current beat wins.

Avoid repetitive runs of:
- similar character medium shots
- the same room type
- the same red/dark palette
- several text cards
- several schemas
- centered compositions with no reason

When adjacent beats allow it, vary scene form, camera, environment, human presence and mood while preserving continuity and the unified channel world.

## Same world everywhere

Schemas, objects and text illustrations use the same 2D linework, cel shading, texture, controlled color and world polish as character scenes.

Mood may change lighting/color strongly while illustration style remains fixed.

Normal real-life scenes use believable scene-specific environments and depth. Empty cream/off-white backgrounds are not the default.

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

Text is not decorative. Use it only when it materially improves understanding: cover/title, exact concept term, important number/price, short comparison/schema label or one memorable phrase. Do not put text on every frame and do not repeat the spoken sentence as visible text.

## Phase 2 — existing structure stays

Each video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

This one master file contains the global visual rules and all scene prompts for the full video.

Scene prompts should stay concise and practical. They may use the familiar scene fields such as speech context, scene type, composition, visual idea/task, camera, lighting, character direction, planned text and a short `PROMPT:`.

Do not split one video into multiple Flow master files or batch prompt files.

## Flow output behavior

Follow `rules/FLOW_OUTPUT_MODE.md`.

- Scene 01 first as 3 separate cover candidates, then approval stop.
- Later scenes are generated in five-scene batches for new videos when at least five remain.
- Every scene number becomes its own standalone 16:9 image.
- Never combine several scene numbers into one storyboard/contact sheet/panel grid.
- Never ask Flow to create the final video.

A single scene may use split/contrast/montage if all parts explain that same beat. This does not permit combining different scene numbers.

Flow applies `CINEMATIC_HUMAN_BEHAVIOR_V2` to every beat while preserving the same mature strict-stickman anatomy family and overall illustration language.
