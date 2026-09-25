YOUTUBE LONGFORM — EINFACHE ARBEITSSTRUKTUR

Jedes neue YouTube-Projekt verwendet nur diese sichtbaren Arbeitsordner:

01-script/
- script.txt

02-google-flow/
- google-flow-prompt.txt
- ALLE sichtbaren YouTube-Texte werden direkt von Google Flow in die Bilder gerendert
- Remotion erzeugt keinen sichtbaren Text

03-bilder/
- hier `01.png`, `02.png`, `03.png` usw. ablegen
- `01.png` ist IMMER Szene 01 + Cover/Thumbnail + Style-/Anatomie-Master
- kein separates Pflicht-`cover.png`
- Szene 01 enthält den exakten deutschen Cover-Titel direkt aus Google Flow
- geplante spätere Keyword-Szenen enthalten ihren exakten deutschen Kurztext ebenfalls direkt aus Google Flow
- alle übrigen Szenen bleiben ZERO READABLE TEXT
- Cover: 2–7 Wörter
- Keywords: maximal 5 Wörter
- falscher, zusätzlicher oder abgeschnittener Text => nur dieses Bild regenerieren

04-audio/
- hier `final-voice.mp3` ablegen

05-export/
- `final.mp4` wird hier erzeugt
- bestehende Exporte werden nicht überschrieben

99-intern/
- `phase1-scenes.json`
- `word-timings.json` (wird bei Bedarf automatisch lokal aus final-voice.mp3 erzeugt)
- `scene-plan.json`
- `render-props.json`
- optional `flow-text-policy.json`
- Quellen, QA, Style, Continuity und weitere Pipeline-Metadaten

Neue YouTube-Projekte:
- `visibleTextRenderer = GOOGLE_FLOW`
- `renderGermanLabelsInRemotion = false`
- `finalTextPolicy = FLOW_VISIBLE_TEXT_ONLY_V3`
- `sceneLabels = []`

Für die normale Arbeit braucht der Nutzer nur `script.txt`, `google-flow-prompt.txt`, Bilder und Audio zu öffnen.

Sobald Bilder und finales Audio fertig sind:
`npm run produce:youtube -- youtube/TT.MM.JJJJ-thema`

Fehlende Word Timings werden automatisch mit lokalem Whisper.cpp erzeugt und am finalen Skript ausgerichtet.
Remotion dient danach für Schnitt, Audio und Export — nicht für sichtbaren Text.
