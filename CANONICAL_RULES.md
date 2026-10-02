# CANONICAL RULES — PSYCHOLOGY VIDEO PRODUCTION

## VISUAL WORLD STATUS

`ACTIVE`

Binding visual world for new productions:

`rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Policy ID: `PSYCHOLOGY_STICKMAN_WORLD_V1`

## Visual-world core

The channel uses one coherent hand-drawn 2D animated psychology world.

When people appear, they all belong to the same stickman species:
- oversized round or softly oval light/white heads
- tiny black oval eyes and minimal expressive faces
- narrow clothed torsos
- very thin dark stick-like arms and legs
- small simple hands and shoes
- strong slightly organic dark outlines
- soft cel shading
- subtle illustrated texture
- natural clear colors

There is no permanent channel mascot and no mandatory recurring Character A/B cast.
People are designed to fit the script through clothing, hair, accessories, role, age cues, era, expression and posture while preserving the same species and illustrator language.

The visual world is NOT character-only. Object-focused frames, environments, schemas, comparisons and text-led illustrations are equally valid when they explain the beat better. All forms keep the same illustrator/render language.

Locations, palettes and light adapt to the current beat. Bright, neutral, historical and dark-psychology scenes may look very different in mood while remaining unmistakably the same illustrated universe.

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

Flow soll keine abstrakte Psychologie selbst visualisieren müssen. Effekt-Namen werden nicht automatisch wörtlich dargestellt.

Before character design, choose whether the beat is best shown as:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

People are optional. A full character scene is used only when visible human behavior/interaction is the clearest evidence.

Emotion and power are preferably shown through observable evidence: gaze, posture, distance, blocking, hands, group spacing, object relations, environmental context or exact planned wording.

## Google Flow

Pro Video genau eine Datei:

`02-google-flow/google-flow-prompt.txt`

## Cover + visual reference + batching

- BILD 01 zuerst
- genau 3 getrennte 16:9 Cover-Kandidaten
- STOP für Nutzerwahl
- gewähltes Cover → `03-bilder/01.png`
- `01.png` wird visuelle Episodenreferenz für Linien, Shading, Textur und Qualitätsniveau sowie für die Stickman-Spezies, wenn Menschen erscheinen
- spätere Szenen dürfen Representation, Personen, Kleidung, Ort, Kamera, Farbe, Licht und Stimmung scriptgerecht ändern
- exakte Cover-Person nur wiederverwenden, wenn die Story dieselbe Person verlangt
- Cover mit Menschen verpflichtet spätere Szenen NICHT zu Menschen
- danach 5er-Batches
- jede Bildnummer bleibt eine eigene 16:9-Datei
- akzeptierte Bilder sofort `NN.png`
- alles gemeinsam in `03-bilder/`
- kein Storyboard/Kontaktbogen/fertiges Video

## Sequence QA

Bei 10+ Szenen ist eine Planung mit ungefähr 75% oder mehr `CHARACTER_SCENE`s ohne explizite `characterHeavyJustification` ein QA-Fail. Das ist keine Zielquote, sondern ein Schutz gegen den alten Fehler „jede Szene = Figurenbild“.

Jede neue aktive Phase-1-Szene soll einen kurzen `representationReason` enthalten.

## Text

Nur explizit geplanter deutscher Text. Sonst `ZERO READABLE TEXT`.
Text darf Hauptmotiv sein, wenn die Formulierung selbst psychologisch relevant ist.

## Script

`HOOK_FIRST_EXPLAIN_EARLY_V1` bleibt aktiv.

## Export

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

## Bestehende Projekte

Bestehende Projekte werden nicht automatisch migriert. Sie bleiben historische Projektstände, bis der Nutzer ausdrücklich eine Migration verlangt.
