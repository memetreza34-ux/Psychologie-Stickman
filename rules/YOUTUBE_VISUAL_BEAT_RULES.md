# YOUTUBE VISUAL BEAT RULES

**STATUS: BINDING**

## One thought = one visual beat

Split when the spoken idea changes: action, example, comparison, cause/effect, question/answer, problem/solution, relation or location.

Typical target: about 10–16 spoken words per beat. Clarity wins.

## Observable-scene gate

Before the final image prompt, define:
- `viewerTakeaway`
- `observableEvidence`
- `dominantRelation`
- `sceneType`
- `representationReason`
- `literalMetaphorWarning`
- `motifKey`
- `visualChangeReason`
- `panelCount`

For new/revised active projects, use `visualSequencePolicy: "VISUAL_SEQUENCE_HARDENING_V1"`.

## Representation choice — HARD GATE

Allowed:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

Choose the clearest representation BEFORE character design. A pronoun or mention of a person does not automatically justify `CHARACTER_SCENE`.

## Do not literalize effect names

A psychology term is not automatically an art instruction.

Spotlight Effect ≠ automatic spotlight.
Anchor Effect ≠ automatic anchor.
Halo Effect ≠ automatic halo.
Framing Effect ≠ automatic picture frame.

## Composition

Default to one coherent visual idea. Use split/contrast only when the beat genuinely requires two states. Avoid cramming multiple examples into one image.

### Panel/state limit

Default: **maximum 2 distinct visible states/panels in one BILD**.

If a mechanism needs three steps:
- split it across several BILDs, or
- show one coherent physical scene containing the decisive relation, or
- reduce it to a two-state before/after comparison.

A 3-/4-panel explainer board is not an acceptable default, even when `sceneType` is `SCHEMA_EXPLAINER`.

## Camera and staging

Choose camera because it clarifies the beat:
- wide for environment/relations
- medium for action + context
- close for a reaction/object
- top-down/tabletop for choices, objects or mechanisms
- over-shoulder when gaze/attention matters
- low/high only when hierarchy/scale needs it

Before Phase 2, compare each scene to the previous two. If the camera, focal scale, flat background and object placement are effectively the same despite a different spoken idea, redesign the composition.

## Motif progression — HARD GATE

`motifKey` describes the dominant recurring story motif/visual role, not merely the generic representation type.

Examples:
- `store_purchase_conflict`
- `receipt_aftermath`
- `choice_pair_topdown`
- `macro_feature_inspection`
- `historical_lab_setup`

`visualChangeReason` explains what materially changes from nearby scenes: action, consequence, location, object state, camera, focal scale, social relation or foreground/background role.

Three or more adjacent scenes with the same `motifKey` fail unless there is a specific `motifProgressionJustification` and the visual staging still progresses materially.

A recurring prop may remain for continuity, but repeated near-identical product displays, desk shots or person-at-table scenes are not progression.

## Active visual world

Use `rules/PSYCHOLOGY_STICKMAN_WORLD.md` and `rules/VISUAL_SEQUENCE_HARDENING.md`.

When people appear, every person must remain in the exact approved stickman species. No normal cartoon-human anatomy drift is accepted, even in historical, office or research scenes.

If several people share one frame, all of them use the same light/white base-head construction, torso scale and thin-limb anatomy. Mixed normal-cartoon human + stickman = FAIL.

Object, environment, text and schema frames use the same illustrator language.

## Emotion

When people are used, plan visible cues: gaze, head angle, shoulders, hands, distance, standing/sitting, blocking, approach and object interaction.

When people are not needed, mood may come from object placement, environment, light, negative space and exact planned text.

## Sequence-level review

Before Phase 2, review the whole scene list for **representation variety, staging variety and motif progression**.

Flag/rewrite when:
- nearly every beat became a full character scene
- several adjacent scenes repeat the same social staging
- several adjacent scenes repeat a flat beige/neutral explainer-board composition
- several adjacent scenes repeat the same story object in effectively the same role
- a person only holds or points at an object
- object/text/environment alternatives were ignored
- 3+ adjacent explainer-style frames rely on circles/arrows/centered objects instead of richer scene variation
- 3+ adjacent scenes share one `motifKey` without explicit justification
- 4+ consecutive `CHARACTER_SCENE`s occur without strong continuity need
- `panelCount > 2` without exceptional justification

For 10+ scene videos, roughly 75%+ `CHARACTER_SCENE` requires explicit `characterHeavyJustification`.

## Schema and text density

Schemas should have one mechanism and preferably no more than 3 major labels/branches. Avoid crowds of tiny figures and dense arrow networks.

Default maximum is 2 distinct states/panels per image.

Text must be large enough for mobile viewing. Avoid small explanatory paragraphs, many labels or text that competes with the main visual.

## Text policy

Planned exact German text only. Otherwise: `ZERO READABLE TEXT`.

Any unplanned readable English, German, packaging/UI copy or gibberish is a regeneration failure.

## Visual pacing review

A simple static frame should not stay unchanged longer than its information density supports.

Guidance:
- simple object/text close-up: about 3–4.5 s
- normal action/environment: about 4–5.5 s
- complex research/environment: about 5–6.5 s when there is real detail to inspect

If a long spoken beat would force a simple frame to sit too long, create another concrete visual beat rather than adding random decorative motion.

## Phase 2

Each video uses exactly one:
`02-google-flow/google-flow-prompt.txt`

## Flow output

Follow `rules/FLOW_OUTPUT_MODE.md`:
- 3 covers first
- user selection
- approved `01.png` becomes episode visual reference
- then 5-image batches
- separate 16:9 assets
- `NN.png`
- one flat `03-bilder/`
- no storyboard/contact sheet/final video
