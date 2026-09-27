INTERN — NICHT DIE NORMALE ARBEITSFLÄCHE

Hier liegen technische Dateien, Quellen, QA und Pipeline-Metadaten.
Der Nutzer arbeitet regulär mit:
- 01-script/
- 02-google-flow/
- 03-bilder/
- 04-audio/
- 05-export/

Zentrale technische Dateien in 99-intern/:
- phase1-scenes.json
- word-timings.json
- scene-plan.json
- render-props.json
- optional flow-text-policy.json

Neue YouTube-Projekte verwenden für die Bildwelt:
- `visualSystem: "MINIMAL_EDITORIAL_STICKMAN_V2"`
- `environmentPolicy: "SPARSE_SUGGESTED_ENVIRONMENT_V1"`
- `accentPolicy: "ONE_DOMINANT_ACCENT_V1"`
- feste `channelPalette`

Textsystem bleibt:
- `visibleTextRenderer: "GOOGLE_FLOW"`
- `renderGermanLabelsInRemotion: false`
- `finalTextPolicy: "FLOW_VISIBLE_TEXT_ONLY_V3"`
- `flowSourceImageTextPolicy: "PLANNED_EXACT_GERMAN_TEXT_ONLY"`
- `flowTextMoments: [...]`
- `sceneLabels: []`

`word-timings.json` darf als leere Vorlage starten. `produce:youtube` erzeugt fehlende/leere Wortzeiten automatisch aus `04-audio/final-voice.mp3` mit lokalem Whisper.cpp und richtet sie am finalen `01-script/script.txt` aus.

Keine zusätzliche `projektdateien/`-Zwischenebene.

`03-bilder/01.png` bleibt aus Pipeline-Kompatibilität Szene 01 + Cover/Thumbnail. Es ist NICHT mehr die globale Style-Master-Referenz.
Globale Style-Source-of-Truth: `rules/VISUAL_SYSTEM.md`, `rules/visual-system.json` und später freigegebene Referenzbilder unter `assets/style-v2/`.

`public/` ist nur Remotion-Staging und wird automatisch erzeugt.
