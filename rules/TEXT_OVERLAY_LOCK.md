# TEXT LOCK — GOOGLE FLOW VISIBLE TEXT v2

**STATUS: BINDING**

Remotion creates no visible YouTube text. Planned visible German text is rendered directly inside Google Flow images.

## Core principle

Use visible text only when it improves understanding. Prefer a strong visual mechanism over explanatory labels.

All unplanned text is forbidden.

## Allowed text modes

### Cover
- exact German main title
- normally 2–7 words
- default is one main title only
- extra short mechanism labels only when necessary for instant understanding
- technical topic kicker is optional, not automatic

### Keyword
- one short term or phrase
- normally 1–5 words

### Schema
For `SCHEMA_EXPLAINER` frames:
- optional short title
- up to 3 short labels
- labels normally 1–5 words each
- use fewer labels when the visual relation is already clear

### Comparison
For `COMPARE_VISUAL` frames:
- up to 2 short comparison labels plus optional short title
- exact planned German only

### Text Illustration
- one memorable short phrase integrated into the illustration
- use sparingly

### All other frames
`ZERO READABLE TEXT`.

## No accidental background text

Unplanned posters, screens, documents, packaging, signs and interfaces use abstract marks/shapes/icons instead of readable words.

Speech Context is never visible text.

## Canonical metadata

Use `flowTextMoments` with the property `text`.

`text` may be:
- one string, or
- an array of up to 4 exact strings when the same frame genuinely requires multiple planned elements.

Examples:

```json
[
  {"scene":1,"kind":"cover","text":["WARUM EINE ZAHL DICH LENKT","199 €","129 €"]},
  {"scene":2,"kind":"schema","text":["ERSTE ZAHL","ANKER","SCHÄTZUNG"]},
  {"scene":16,"kind":"text_illustration","text":"WAS WAR MEIN ANKER?"}
]
```

Allowed `kind` values:
- `cover`
- `keyword`
- `schema`
- `comparison`
- `text_illustration`

Do not create multiple `flowTextMoments` entries for the same scene.

## Density

Text-bearing frames should normally remain at or below 30% of scenes.

This is a ceiling, not a target. A video may use substantially less text when the visuals carry the explanation.

## Typography

Follow `rules/FLOW_TEXT_STYLE_LOCK.md`.

Important:
- strong contrast against the actual local background
- safe margins
- no default full-width top banner
- no redundant topic kicker
- no thick outline/glow used to compensate for bad placement

## QA

Regenerate the affected image if:
- wording is wrong
- umlauts/punctuation are wrong
- text is clipped or unreadable
- local background contrast is weak
- any unplanned readable text appears
- schema contains extra labels
- typography covers the main action
- redundant text weakens the composition

`sceneLabels` remains empty and `renderGermanLabelsInRemotion` remains false.
