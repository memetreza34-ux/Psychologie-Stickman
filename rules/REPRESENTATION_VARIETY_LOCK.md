# REPRESENTATION VARIETY LOCK — FUTURE YOUTUBE VIDEOS

**STATUS: BINDING PROCESS RULE**

Policy ID: `REPRESENTATION_VARIETY_V1`

## Core rule

Choose the **best visual form first**. Never choose a full character scene merely because the channel uses Stickmen or because the spoken sentence contains `du`, `jemand`, `Person` or another human pronoun.

For every spoken beat, ask:
1. What must the viewer understand?
2. What is the clearest observable evidence?
3. Which representation explains it fastest with the least visual clutter?

Allowed primary forms:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

These are semantic choices, not style definitions. Every form stays inside `PSYCHOLOGY_STICKMAN_WORLD_V1`.

## Character gate — HARD RULE

A full character scene is justified when human behavior itself is the evidence, for example:
- gaze / reaction
- hierarchy / dominance
- social pressure
- conversation / conflict
- blocking / approach / withdrawal
- group behavior
- emotion that depends on posture and relation

Prefer a non-character representation when the beat is mainly about:
- one object becoming important
- a message / phrase / warning
- a place or environmental condition
- a mechanism or sequence
- a direct comparison
- a historical setup that can be shown through objects/room design
- a number / price / short exact term

A person may appear cropped or secondary in an object-led frame, but the frame should not be converted into another generic two-person scene.

## Human presence

People are optional.

When people are used, follow `PSYCHOLOGY_STICKMAN_WORLD_V1`: same stickman species and illustrator language, but clothing, hair, role, era, expression and posture adapt to the script.

When people are not used, objects, environments, schemas and text still use the exact same outline, shading, texture, color and finish language.

## Sequence-level anti-repetition

Do not let a whole video become:
`person at table → person in room → two people talking → person at table → two people talking`.

Across a normal 10+ scene video, deliberately review whether the sequence contains enough **genuinely different visual forms** to match the script.

This is not a quota system. However, if roughly three quarters or more of a 10+ scene plan are full `CHARACTER_SCENE`s, the plan must include an explicit `characterHeavyJustification` explaining why human behavior is genuinely the clearest evidence throughout. Without that justification, the plan fails QA and must be reconsidered.

Four or more consecutive full character scenes should trigger a review unless story continuity genuinely requires them.

## Text-led frames

Visible text is not decoration, but it is allowed when wording itself matters.

Good uses:
- exact psychology term
- exact controlling phrase
- important number / price
- short compare label
- one concise warning / choice

If text is unnecessary: `ZERO READABLE TEXT`.

Text-led frames must look like illustrated frames from the same channel, not like presentation slides.

## Schema restraint

Use a schema only when the viewer benefits from seeing a mechanism, sequence or relation structurally.
Do not use a schema merely because the spoken sentence is abstract.
Schemas use the same hand-drawn 2D world language rather than a foreign corporate-vector style.

## Planning metadata

For new active-world phase-1 plans, every scene should include a short `representationReason` that explains why its chosen `sceneType` is the clearest form for that beat.

For `CHARACTER_SCENE`, that reason should state what visible human behavior makes the character scene necessary.

## QA

Rewrite/review when:
- nearly every scene uses people without need
- a pronoun automatically caused `CHARACTER_SCENE`
- a person is present only to hold or point at an object that could carry the frame itself
- text appears repeatedly without explanatory value
- schemas/text frames are filler
- adjacent scenes repeat the same staging despite different beats
- representation choice makes the current beat less clear
- visual variety accidentally breaks the shared Psychology Stickman World

This rule complements `rules/PSYCHOLOGY_STICKMAN_WORLD.md`, `rules/YOUTUBE_VISUAL_BEAT_RULES.md` and `rules/FLOW_OUTPUT_MODE.md`.
