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
- max 2 distinct visual states/panels by default

### Comparison
- up to 2 short comparison labels plus optional short title
- max 2 distinct comparison states/panels

### Text Illustration
- one memorable short phrase
- use sparingly

### All other frames
`ZERO READABLE TEXT`.

## No accidental background text — HARD FAIL

Unplanned posters, screens, documents, packaging, signs and interfaces must not contain readable words.

Speech context is never visible text.

Regenerate immediately if Flow invents:
- English headings or labels
- unplanned German words
- readable packaging/brand/model names
- readable UI or website copy
- research-board headings
- fake article text
- gibberish/pseudo-text that is visibly letter-like

A non-text scene must be visually clean enough that the viewer cannot read accidental words even in the background.

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

Current visual world: **ACTIVE — `PSYCHOLOGY_STICKMAN_WORLD_V1`**.

Typography follows the same hand-drawn illustrated world and must remain integrated rather than looking like a foreign corporate slide.

Wording, density and readability rules in this file remain binding regardless of font treatment.

## QA

Regenerate the affected image if:
- wording is wrong
- umlauts/punctuation are wrong
- text is clipped or unreadable
- extra readable text appears anywhere
- English text appears without being explicitly planned
- pseudo-text/gibberish appears
- schema contains unplanned labels
- text covers the main visual mechanism
- text-bearing layout becomes a 3-/4-panel explainer board

`sceneLabels` remains empty and `renderGermanLabelsInRemotion` remains false.
