# TEXT LOCK — GOOGLE FLOW VISIBLE TEXT

**STATUS: BINDING**

Remotion creates no visible YouTube text. Planned visible German text is rendered directly inside Google Flow images.

## Allowed text modes

### Cover
- exact German title
- normally 2–7 words
- no extra random text

### Keyword
- one short term or phrase
- normally 1–5 words

### Schema
For `SCHEMA_EXPLAINER` frames:
- optional short title
- up to 3 short labels
- labels should normally be 1–5 words each
- every visible word must be explicitly planned

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

Unplanned posters, screens, documents, packaging, signs and interfaces must use abstract shapes/lines/icons instead of readable words.

## Metadata

Use `flowTextMoments` entries such as:
```json
[
  {"scene":1,"kind":"cover","texts":["WARUM DU NICHT LOSLÄSST"]},
  {"scene":6,"kind":"schema","texts":["SPOTLIGHT-EFFEKT","ICH DENKE ALLE SCHAUEN","ALLE SIND MIT SICH BESCHÄFTIGT"]}
]
```

## QA

Regenerate the affected image if:
- wording is wrong
- umlauts/punctuation are wrong
- text is clipped or unreadable
- any unplanned readable text appears
- schema contains extra labels
- typography covers the main action

`sceneLabels` remains empty and `renderGermanLabelsInRemotion` remains false.
