# TEXT LOCK — GOOGLE FLOW VISIBLE TEXT

**STATUS: BINDING PROCESS RULE**

Remotion creates no visible YouTube text. Planned visible German text is rendered directly inside Google Flow images.

## Core principle

Use visible text only when it improves understanding. Prefer a strong visual mechanism over explanatory labels.

All unplanned text is forbidden.

## Allowed text modes

### Cover
- exact German main title
- normally 2–7 words
- default is one main title only
- extra short mechanism labels only when necessary

### Keyword
- one short term or phrase
- normally 1–5 words

### Schema
- optional short title
- up to 3 short labels
- use fewer labels when the relation is already clear

### Comparison
- up to 2 short comparison labels plus optional short title

### Text Illustration
- one memorable short phrase
- use sparingly

### All other frames
`ZERO READABLE TEXT`.

## No accidental background text

Unplanned posters, screens, documents, packaging, signs and interfaces must not contain readable words.

Speech context is never visible text.

## Canonical metadata

Use `flowTextMoments` with property `text`.

`text` may be:
- one string
- an array of up to 4 exact strings when one frame genuinely needs several planned elements

Allowed `kind` values:
- `cover`
- `keyword`
- `schema`
- `comparison`
- `text_illustration`

Do not create multiple `flowTextMoments` entries for the same scene.

## Density

Text-bearing frames should normally remain at or below 30% of scenes.
This is a ceiling, not a target.

## Typography status

The old visual-world-specific typography lock was removed.

Current visual world: **UNDEFINED**.

Until the new visual world is approved, this file defines only wording, density and text safety. Font feeling, graphic treatment, color, outline, integration style and other visual typography decisions are intentionally undefined.

## QA

Regenerate the affected image if:
- wording is wrong
- umlauts/punctuation are wrong
- text is clipped or unreadable
- extra readable text appears
- schema contains unplanned labels
- text covers the main visual mechanism

`sceneLabels` remains empty and `renderGermanLabelsInRemotion` remains false.
