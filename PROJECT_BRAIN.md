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

When people appear, they share one stickman species:
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

People are adapted to the script through clothing, hair, accessories, age cues, profession/social role, historical era, posture and expression while keeping the same visual species.

The world is not character-only. A beat may instead be object-focused, environment-led, text-led, a comparison or a simple mechanism/schema. All forms keep the same illustrator language.

The world may be bright, neutral, warm, cold, historical or dark depending on the current psychology beat. The renderer/species stays fixed; representation, mood and scene content adapt.

## Representation First

Before designing characters, choose the clearest visual form:

`CHARACTER_SCENE | OBJECT_FOCUS | ENVIRONMENT_SCENE | SCHEMA_EXPLAINER | COMPARE_VISUAL | TEXT_ILLUSTRATION`

People are optional.

Do not let words like `du`, `jemand`, `Person` or `Menschen` automatically create a character scene.

Use full characters when human behavior/interaction is the evidence. Otherwise prefer the object, place, phrase, comparison or mechanism that carries the beat more directly.

For 10+ scenes, roughly 75%+ full character scenes need explicit `characterHeavyJustification` or the plan must be reworked.

## Dark psychology

Dark scenes should feel tense through observable behavior, spatial relations, objects, environment and motivated light rather than horror clichés.

Possible tools:
- gaze
- posture
- distance
- blocking
- hands
- group spacing
- doorway / room layout
- phone / message / object placement
- exact short text when wording itself matters
- negative space and light

## Episode reference

BILD 01 is the cover and first visual reference.

Workflow:
- generate exactly 3 separate cover candidates
- user chooses one
- winner becomes `01.png`
- use `01.png` as the episode style reference for later images

It anchors linework, shading, texture and finish, plus the stickman species whenever people appear.
It does NOT force later images to copy the same person, composition, representation type, location, palette or mood unless story continuity requires it.

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

**Do not prompt the psychology. Prompt the evidence of the psychology.**

```text
spoken meaning
→ viewer takeaway
→ observable evidence
→ best representation
→ concrete composition
→ final prompt
```

## Production rule

New videos use the active visual world and representation-first gate automatically.
Historical projects are not retroactively migrated unless explicitly requested.
