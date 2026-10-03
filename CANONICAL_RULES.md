# CANONICAL RULES — PSYCHOLOGY VIDEO PRODUCTION

## VISUAL WORLD STATUS

`ACTIVE`

Binding visual world for new productions:
`rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Policy ID: `PSYCHOLOGY_STICKMAN_WORLD_V1`

## Visual-world core

The channel uses one coherent hand-drawn 2D animated psychology world.

When people appear, they all belong to the same exact stickman species:
- oversized round or softly oval light/white heads
- tiny black oval eyes and minimal expressive faces
- narrow clothed torsos
- very thin dark stick-like arms and legs
- small simple hands and shoes
- organic dark outlines
- soft cel shading
- subtle illustrated texture
- natural clear colors

**Normal cartoon-human anatomy drift is a hard fail.** Clothing, hair, age, role and era may vary; underlying species/anatomy may not.

The world is NOT character-only. Object-focused frames, environments, schemas, comparisons and text-led illustrations are equally valid when they explain the beat better. All forms keep the same illustrator/render language.

## Active process sources

1. `rules/PSYCHOLOGY_STICKMAN_WORLD.md`
2. `rules/FLOW_OUTPUT_MODE.md`
3. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
4. `rules/FLOW_PROMPT_ARCHITECTURE.md`
5. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
6. `rules/REPRESENTATION_VARIETY_LOCK.md`
7. `rules/COVER_LOCK.md`
8. `rules/TEXT_OVERLAY_LOCK.md`
9. `rules/YOUTUBE_EXPORT_PACKAGE.md`
10. Script-/Format-/Produktionsregeln

## Observable Scene First + Representation First

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → final prompt`

Allowed primary forms:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

People are optional. A full character scene is used only when visible human behavior/interaction is the clearest evidence.

## Sequence / staging QA

Representation variety alone is insufficient. New videos must also avoid repetitive staging.

Review/rewrite when:
- several adjacent frames repeat the same beige/neutral explainer-board look
- several adjacent frames repeat centered objects, circles/arrows or nearly identical camera setups
- 3+ adjacent explainer-style frames become a flat presentation sequence without strong reason
- a schema depends on tiny figures, many arrows or dense labels
- planned text is too small or dense for phone viewing

When content allows, vary camera distance, focal scale, depth, subject placement, local palette/light and real-world context.

For 10+ scenes, roughly 75%+ `CHARACTER_SCENE` without `characterHeavyJustification` is a QA fail.

Every new active Phase-1 scene should include `representationReason`.

## Google Flow

Pro video exactly one:
`02-google-flow/google-flow-prompt.txt`

## Cover + reference + batching

- BILD 01 first
- exactly 3 separate 16:9 cover candidates
- STOP for user selection
- winner → `03-bilder/01.png`
- `01.png` anchors linework, shading, texture, finish and stickman species whenever people appear
- later scenes may change representation, people, clothing, place, camera, color, light and mood
- cover with people does NOT force later people
- then 5-image batches
- every BILD stays a separate 16:9 file
- accepted files immediately `NN.png`
- all in flat `03-bilder/`
- no storyboard/contact sheet/final video

## Text

Only explicitly planned German text. Otherwise `ZERO READABLE TEXT`.
Text may be the main subject when wording itself is psychologically relevant, but it must remain large, sparse and mobile-readable.

## Script

`HOOK_FIRST_EXPLAIN_EARLY_V1` remains active.

## Export

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

## Existing projects

Existing projects remain historical project states unless the user explicitly requests a migration/improvement.
