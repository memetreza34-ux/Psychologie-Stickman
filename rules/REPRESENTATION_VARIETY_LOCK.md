# REPRESENTATION VARIETY LOCK — FUTURE YOUTUBE VIDEOS

**STATUS: BINDING PROCESS RULE**

Policy ID: `REPRESENTATION_VARIETY_V1`

## Neuer Qualitaetsstandard fuer alle zukunftigen Projekte

Ab neuen Video-Projekten zusaetzlich `CONTENT_FIRST_VISUAL_QA_V2` aus `rules/CONTENT_FIRST_VISUAL_QA.md` verwenden. Die qualitative Wiederholung von Motiv/Schauplatz/Kameraperspektive und Informationswert wird technisch geprueft. Ausgesprochene Mechanismen sind ein aktiver Anlass fuer Schemata, Experimentskizzen, Vergleiche und gezielte beschriftete Illustrationen, nicht bloss fuer die naechste Figur im Zimmer. Es gelten KEINE festen Prozentziele fuer Figuren, Diagramme oder andere Darstellungen.

## Core rule

Choose the **best visual form first**. Never choose a full character scene merely because the channel uses Stickmen or because the spoken sentence mentions a person.

For every beat ask:
1. What must the viewer understand?
2. What is the clearest observable evidence?
3. Which representation explains it fastest with the least clutter?
4. Does the resulting frame look meaningfully different from adjacent beats while staying in the same world?

Allowed forms:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

## Character gate

Use `CHARACTER_SCENE` when visible human behavior is the evidence: gaze, reaction, hierarchy, social pressure, conversation, conflict, blocking, approach/withdrawal or group behavior.

Prefer non-character forms when the beat is mainly about an object, wording, place, mechanism, comparison, historical setup, number or price.

When people are used, every person must keep the exact approved stickman species. Normal cartoon-human anatomy is a hard fail.

## Human presence

People are optional. A cropped shoulder/head or hand may support an object-led frame without turning it into another generic character scene.

## Sequence-level anti-repetition

Do not let a video become either:
`person at table → person in room → two people talking → person at table`

or:
`beige board → centered object → circles/arrows → beige board → centered object`.

Representation labels alone do not guarantee real variety. Review the actual staging, camera, depth, palette and focal scale.

For 10+ scenes:
- roughly 75%+ `CHARACTER_SCENE` requires explicit `characterHeavyJustification`
- 4+ consecutive full character scenes trigger review
- 3+ consecutive flat explainer-style frames (`SCHEMA_EXPLAINER`, `TEXT_ILLUSTRATION` or diagram-like `COMPARE_VISUAL`) trigger review unless the sequence genuinely requires it

## Spatial / camera diversity

When content allows, alternate between:
- immersive environment
- close object detail
- medium interaction
- wide relation
- top-down tabletop
- text-led graphic moment

Do not mechanically rotate cameras; use them because they clarify the beat. But avoid near-identical framing across adjacent scenes when the spoken meaning changes.

## Text-led frames

Visible text is allowed only when wording itself matters. Keep it short, large and phone-readable. Avoid paragraph-like copy, tiny captions or decorative labels.

## Schema restraint

Schemas are for mechanisms, not filler. Keep them simple:
- one main mechanism
- preferably at most 3 major labels/branches
- no crowd of tiny people
- no dense arrow network
- no presentation-slide look

## Mobile readability

Every frame must pass a small-screen check. Rewrite when the main idea depends on tiny figures, tiny text, many mini-panels, dense arrows or several equally strong focal points.

## Planning metadata

Every new active-world Phase-1 scene includes `representationReason`.

For `CHARACTER_SCENE`, state what human behavior makes the character necessary.

## QA

Rewrite/review when:
- nearly every scene uses people without need
- a pronoun automatically caused `CHARACTER_SCENE`
- a person merely holds/points at an object that could carry the frame itself
- adjacent frames repeat the same flat neutral/beige explainer staging
- schemas/text frames are visually dense or phone-unreadable
- several adjacent scenes repeat the same camera/focal scale despite different beats
- text appears without explanatory value
- visual variety breaks the shared Psychology Stickman World

This rule complements `rules/PSYCHOLOGY_STICKMAN_WORLD.md`, `rules/YOUTUBE_VISUAL_BEAT_RULES.md` and `rules/FLOW_OUTPUT_MODE.md`.
