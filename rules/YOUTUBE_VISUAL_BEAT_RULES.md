# YOUTUBE VISUAL BEAT RULES

**STATUS: BINDING**

New projects also follow `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md` / `OBSERVABLE_SCENE_FIRST_V1`.

## One important thought = one visual beat

Split semantically when the spoken idea changes: new action, mechanism, example, comparison, cause/effect, question/answer, problem/solution, power relation, emotional state or location.

Typical target remains about 10–16 spoken words per beat; clarity wins over word count.

If one spoken sentence contains several independent examples or actions, create several visual beats instead of forcing them into one montage.

## Observable-scene gate — HARD LOCK

Before selecting scene type, camera or mood, define internally:
- `viewerTakeaway`: what must the viewer understand now?
- `observableEvidence`: what can literally be seen that proves the point?
- `dominantRelation`: the one main visible action/relationship
- `literalMetaphorWarning`: when a named psychological term could tempt a misleading literal visualization

The visual idea is not ready if `observableEvidence` is only an abstract mental-state phrase such as `show pressure`, `show attention`, `show conformity`, `show insecurity` or `visualize the effect`.

Translate it into visible behavior, objects, spacing, gaze, posture or a concrete comparison first.

## Every beat may plan internally

Every scene may plan in `99-intern/`:
- `sceneType`
- `compositionType`
- `socialDensity`
- `moodMode`
- `moodIntensity`
- `powerDynamic`
- `viewerTakeaway`
- `observableEvidence`
- `dominantRelation`
- `literalMetaphorWarning`
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
- exact planned Flow text when needed

These are planning/QC fields. They do not appear as technical labels in the final Flow image prompt.

## Do not literalize named psychology effects

Do not automatically render the literal object in an effect name.

Examples:
- Spotlight-Effekt → not automatically a spotlight
- Ankereffekt → not automatically an anchor
- Halo-Effekt → not automatically a halo
- Framing-Effekt → not automatically a picture frame
- Echo Chamber → not automatically an echo room

A symbolic metaphor must be a deliberate art-direction decision, not a lexical shortcut.

## Mood selection

Choose mood from the current spoken beat only.

- `CLEAR`: explanation, ordinary cognition, neutral everyday behavior
- `UNEASY`: doubt, uncertainty, subtle pressure or tension
- `DARK`: manipulation, coercion, deception, severe conflict or disturbing behavior
- `POWER`: hierarchy, authority, dominance, status or control
- `MONEY`: money, pricing, consumption, negotiation, greed, financial risk or status
- `ISOLATION`: exclusion, loneliness, vulnerability, alienation or fear
- `HOPE`: protection, solution, clarity, recovery or constructive resolution

Do not choose DARK merely because the overall video is about a dark subject. Mood is not a color quota and must not mechanically create red/burgundy scenes.

## Power relation

When influence, hierarchy, control, pressure, exclusion or status matters, encode it through observable blocking, scale, distance, posture, gaze, standing/sitting position, camera or environment.

Do not rely on a label such as `dominant` without visible cues.

## Choosing a representation

Use `CHARACTER_SCENE` when human action/reaction/relationship is the clearest proof.
Use `SCHEMA_EXPLAINER` only when a mechanism or relation genuinely needs structure.
Use `OBJECT_METAPHOR` only when the chosen object metaphor is clearer than a concrete situation and is not just a literalized effect name.
Use `COMPARE_VISUAL` when two states/choices/perspectives must be seen together.
Use `TEXT_ILLUSTRATION` sparingly for a memorable concept moment.
Use environment/object-only illustration when people add nothing.

## Representation variety — guidance, never quota

Binding detail rule: `rules/REPRESENTATION_VARIETY_LOCK.md`.

Typical longform ranges may still be used as a review signal, but they are NOT generation requirements.

Never force:
- a montage because none has appeared yet
- a group scene to satisfy a count
- a split screen for artificial variety
- a person merely because the channel uses Stickmen
- a schema because the sentence is abstract

Variation must emerge from the content.

## Composition

Default to one coherent scene.

Use split/contrast only for a real two-sided comparison.
Use montage only when multiple elements are inseparable parts of the same beat.

Do not use rotating composition patterns or index-based camera patterns.

Camera is chosen because it makes the current action/relation clearer:
- wide for social/environment relations
- medium/medium-wide for readable action + context
- close/close-medium for a specific reaction or object detail
- low/high angle only when hierarchy/scale actually matters

## Same world everywhere

Schemas, objects and text illustrations share the same 2D linework, cel shading, texture, controlled color and polish as character scenes.

Normal real-life scenes use believable scene-specific environments and depth. Empty cream/off-white backgrounds are not the default.

## Text policy

Allowed internally:
- `FLOW_EXACT_COVER_TEXT`
- `FLOW_EXACT_KEYWORD_TEXT`
- `FLOW_EXACT_SCHEMA_TEXT`
- `FLOW_EXACT_COMPARISON_TEXT`
- `FLOW_EXACT_TEXT_ILLUSTRATION`
- `NONE`

All visible text must be exact planned German text. `NONE` means `ZERO READABLE TEXT`.

Text is not decorative. Do not repeat the spoken sentence as visible text.

## Phase 2 — final Flow prompt

Each video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

New videos follow `rules/FLOW_PROMPT_ARCHITECTURE.md` / `NATURAL_FLOW_MASTER_V2`.

The final master contains:
- task/output instruction
- channel visual world once
- character/reference system once
- video world/continuity lock once
- cover + five-image generation workflow
- global text rule
- short observable-scene prompting rule
- all prompts from `BILD 01` to `BILD NN`

Each `BILD NN` prompt is natural direct art direction built from:
- camera/framing
- concrete subject(s)
- exact visible action/relation
- relevant other behavior/objects
- concrete environment/props
- light/local color
- continuity if needed
- exact planned German text or no visible text

The final prompt must not ask Flow to interpret the psychological concept itself.

## Flow output behavior

Follow `rules/FLOW_OUTPUT_MODE.md`:
- Bild 01 first as 3 separate cover candidates, then stop for user approval
- chosen winner becomes `01.png` in `03-bilder/`
- only then later images begin
- later images use five-image batches whenever five remain
- every image number becomes its own standalone 16:9 asset
- accepted images are immediately renamed to `NN.png`
- all accepted images stay in the same flat `03-bilder/`
- never combine several image numbers into one storyboard/contact sheet/grid
- never ask Flow to create the final video
