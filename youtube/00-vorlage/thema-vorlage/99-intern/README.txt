INTERN — NICHT DIE NORMALE ARBEITSFLÄCHE

Hier liegen technische Dateien, Quellen, QA und Pipeline-Metadaten.
Der Nutzer soll für die normale Produktion nur diese sichtbaren Arbeitsordner verwenden:
- 01-script/
- 02-google-flow/
- 03-bilder/
- 04-audio/
- 05-export/

Zentrale technische Dateien liegen direkt in 99-intern/:
- phase1-scenes.json
- word-timings.json
- scene-plan.json
- render-props.json

Neue YouTube-Projekte führen in Phase 1:
- `coverHeadline`
- `coverTextRenderer: "GOOGLE_FLOW"`
- `flowSourceImageTextPolicy: "SCENE_01_EXACT_GERMAN_COVER_TITLE_ONLY"`

Der Cover-Titel wird direkt von Google Flow in `03-bilder/01.png` gerendert. Remotion rendert nur spätere `keyword`-Overlays und darf den Cover-Titel nicht duplizieren.

`word-timings.json` darf als leere Vorlage starten. `produce:youtube` erzeugt fehlende/leere Wortzeiten automatisch aus `04-audio/final-voice.mp3` mit lokalem Whisper.cpp und richtet sie am finalen `01-script/script.txt` aus.

Keine zusätzliche `projektdateien/`-Zwischenebene mehr.

Bild 01 liegt direkt in 03-bilder/ und ist zugleich Szene 01, Cover und Master-Referenz.
`public/` ist nur Remotion-Staging und wird automatisch erzeugt.
