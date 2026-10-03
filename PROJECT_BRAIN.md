# PROJECT BRAIN

## Kanal

Deutschsprachige YouTube-Videos zu Psychologie und menschlichem Verhalten.

## VISUAL WORLD STATUS

**ACTIVE**

Binding source:
`rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Policy ID: `PSYCHOLOGY_STICKMAN_WORLD_V1`

## Channel visual identity

One coherent hand-drawn 2D animated psychology universe.

When people appear, they share one exact stickman species:
- oversized round / softly oval light heads
- tiny black oval eyes and minimal expressive faces
- narrow clothed torsos
- very thin dark stick-like arms and legs
- small simple hands and shoes
- organic dark outlines
- soft cel shading
- subtle drawn texture
- natural clear colors

No permanent mascot. No forced recurring Character A/B cast.

**Species lock:** role, clothing, hair and era may change, but a person may never drift into a normal cartoon-human body. Any such frame is regenerated.

## Representation First

Choose the clearest visual form before character design:

`CHARACTER_SCENE | OBJECT_FOCUS | ENVIRONMENT_SCENE | SCHEMA_EXPLAINER | COMPARE_VISUAL | TEXT_ILLUSTRATION`

People are optional. Use full characters when human behavior/interaction is the evidence; otherwise let the object, place, wording, comparison or mechanism carry the frame.

For 10+ scenes, roughly 75%+ full character scenes require explicit `characterHeavyJustification`.

## Staging First, not just representation labels

A video should not become a chain of flat beige explainer cards even when scene types differ.

Review adjacent scenes for:
- camera distance
- focal scale
- subject placement
- foreground/middle/background depth
- local palette/light
- real environment vs flat graphic board

Avoid repeated centered-object + arrows/circles layouts. Prefer real illustrated contexts when they explain the beat better.

## Mobile readability

Every image must work at phone size:
- one dominant focal idea
- large main subject
- sparse readable text
- schemas preferably max 3 major branches/labels
- no tiny crowds, dense arrows or many mini-panels

## Dark psychology

Dark scenes should feel tense through observable behavior, spatial relations, objects, environment and motivated light rather than horror clichés.

## Episode reference

BILD 01 is the cover and first visual reference.

Workflow:
- exactly 3 separate cover candidates
- user chooses one
- winner becomes `01.png`
- use `01.png` as episode style reference for linework, shading, texture, finish and stickman species when people appear

It does NOT force later images to copy the same person, composition, representation type, location, palette or mood.

## What remains fixed operationally

- Psychologie-/Human-Behavior-Themen
- Script/Hook
- Visual Beats
- `OBSERVABLE_SCENE_FIRST_V1`
- `REPRESENTATION_VARIETY_V1`
- one central `02-google-flow/google-flow-prompt.txt`
- 3 covers first
- user chooses cover
- then 5-image batches
- separate 16:9 images
- `NN.png`
- one flat `03-bilder/`
- Audio/Remotion/Export

## Observable Scene First

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → final prompt`

## Production rule

New videos automatically use the active visual world, representation-first gate, strict species lock, staging-diversity review and mobile-readability review.
Historical projects are not retroactively migrated unless explicitly requested.
