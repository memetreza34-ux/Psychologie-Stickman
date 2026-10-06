# PROJECT BRAIN

## Kanal

Deutschsprachige YouTube-Videos zu Psychologie und menschlichem Verhalten.

## Topic memory — HARD LOCK

Policy: `TOPIC_UNIQUENESS_V1`.

Canonical used-topic memory: `TOPIC_REGISTRY.json`.

Before choosing any new YouTube topic:
1. read `TOPIC_REGISTRY.json`
2. compare German/English synonyms and the underlying psychological mechanism
3. inspect existing `youtube/TT.MM.JJJJ-*` projects
4. reject the idea if that core topic has already been used

**Never create a second YouTube video for the same canonical topic/mechanism.** A new title, example, hook, version or Part 2 does not reset topic usage.

A truly new topic is registered in the same change as the project. Existing historical duplicates are frozen as `LEGACY_DUPLICATE_LOCKED` and cannot receive another video.

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

**Same-frame species lock:** all visible people in one frame share the same base head construction, torso scale and thin-limb anatomy. Hair/clothing sits on top of that species; it never replaces it with a normal human face/body.

## Representation First

Choose the clearest visual form before character design:

`CHARACTER_SCENE | OBJECT_FOCUS | ENVIRONMENT_SCENE | SCHEMA_EXPLAINER | COMPARE_VISUAL | TEXT_ILLUSTRATION`

People are optional. Use full characters when human behavior/interaction is the evidence; otherwise let the object, place, wording, comparison or mechanism carry the frame.

For 10+ scenes, roughly 75%+ full character scenes require explicit `characterHeavyJustification`.

## Visual sequence hardening

Binding source: `rules/VISUAL_SEQUENCE_HARDENING.md`.
Policy: `VISUAL_SEQUENCE_HARDENING_V1`.

New/revised active videos must also pass:
- motif progression: recurring objects must change role/state/context instead of repeating the same shot
- `motifKey`, `visualChangeReason` and `panelCount` in Phase 1
- 3+ adjacent identical motif keys only with explicit continuity justification
- max 2 distinct visual states/panels per image by default
- no 3-/4-panel mini-storyboards as explanatory shortcuts
- zero unplanned readable text, including English headings and pseudo-text
- static-hold review: simple visuals should be split into another concrete beat when the spoken segment is too long

## Staging First, not just representation labels

A video should not become a chain of flat beige explainer cards even when scene types differ.

Review adjacent scenes for:
- camera distance
- focal scale
- subject placement
- foreground/middle/background depth
- local palette/light
- real environment vs flat graphic board
- recurring object/motif state

Avoid repeated centered-object + arrows/circles layouts. Prefer real illustrated contexts when they explain the beat better.

## Mobile readability

Every image must work at phone size:
- one dominant focal idea
- large main subject
- sparse readable text
- at most 2 distinct states/panels by default
- schemas preferably max 3 major labels/branches
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

- Topic uniqueness preflight before project creation
- Psychologie-/Human-Behavior-Themen
- Script/Hook
- Visual Beats
- `OBSERVABLE_SCENE_FIRST_V1`
- `REPRESENTATION_VARIETY_V1`
- `VISUAL_SEQUENCE_HARDENING_V1`
- one central `02-google-flow/google-flow-prompt.txt`
- 3 covers first
- user chooses cover
- then 5-image batches
- separate 16:9 images
- `NN.png`
- one flat `03-bilder/`
- Audio/Remotion/Export

## YouTube export package

Final upload files stay together in one flat `05-export/`:
- `final.mp4`
- `thumbnail.png`
- `captions.srt`
- `subtitle-script.txt`
- `youtube-upload.txt`

`captions.srt` is the direct-upload German subtitle file synced to the final processed voice-over. `subtitle-script.txt` mirrors those timings in a readable copy format such as `00:00–00:05`. `youtube-upload.txt` carries the final title and full description. Do not create separate caption/subtitle folders; internal timing JSON and `youtube-upload.json` stay in `99-intern/`.

## Observable Scene First

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → final prompt`

## Production rule

New videos automatically use the topic-uniqueness gate, active visual world, representation-first gate, strict same-frame species lock, motif progression, max-two-state panel rule, staging-diversity review, zero-accidental-text rule and mobile-readability review.
Historical projects are not retroactively migrated unless explicitly requested.
