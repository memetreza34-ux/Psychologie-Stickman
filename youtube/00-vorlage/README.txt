YOUTUBE LONGFORM — EINFACHE ARBEITSSTRUKTUR

Jedes neue YouTube-Projekt verwendet nur diese sichtbaren Arbeitsordner:

01-script/
- script.txt
- Szene 01 = klarer Hook
- Kernbegriff spätestens Szene 03 / ca. erste 50 Wörter
- einfache Erklärung direkt danach
- erstes konkretes Alltagsbeispiel spätestens Szene 05 / ca. erste 80 Wörter
- keine langsame abstrakte Vorrede als Standard

02-google-flow/
- google-flow-prompt.txt
- PREMIUM VISUAL POLICY = PREMIUM_EDITORIAL_CINEMATIC_V1
- COLOR STORY POLICY = INTENTIONAL_COLOR_STORY_V1
- Projektpalette vor Generation ausfüllen
- jede Szene erhält COLOR DIRECTION + PREMIUM CHARACTER DIRECTION
- konkrete Alltagsszene vor Lehrgrafik
- ALLE sichtbaren YouTube-Texte werden direkt von Google Flow in die Bilder gerendert
- Remotion erzeugt keinen sichtbaren Text

03-bilder/
- hier `01.png`, `02.png`, `03.png` usw. ablegen
- `01.png` ist IMMER Szene 01 + Cover/Thumbnail + Style-/Anatomie-Master
- Szene 01 muss Premium-Figurenqualität + Projekt-Farbwelt etablieren
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
- Pflicht für neue Projekte: Hook-Metadaten + Premium-/Color-Policies + projectPalette
- `word-timings.json` (wird bei Bedarf automatisch lokal aus final-voice.mp3 erzeugt)
- `scene-plan.json`
- `render-props.json`
- Quellen, QA, Style, Continuity und weitere Pipeline-Metadaten

Neue YouTube-Projekte:
- `scriptHookPolicy = HOOK_FIRST_EXPLAIN_EARLY_V1`
- `premiumVisualPolicy = PREMIUM_EDITORIAL_CINEMATIC_V1`
- `colorStoryPolicy = INTENTIONAL_COLOR_STORY_V1`
- `visualPlanningPolicy = VARIED_COMPOSITION_V1`
- `socialScenePolicy = SOCIAL_VARIETY_V1`
- `visibleTextRenderer = GOOGLE_FLOW`
- `renderGermanLabelsInRemotion = false`
- `finalTextPolicy = FLOW_VISIBLE_TEXT_ONLY_V3`
- `sceneLabels = []`

Premium bedeutet NICHT realistische Menschen. Stickman-Anatomie bleibt simpel. Premium entsteht durch Pose, Silhouette, Kleidung, Emotion, Licht, Farbe, Tiefe und Umgebung.

Nicht als Default akzeptieren:
- grauer/beiger Einheitswash
- sterile Büro-Monotonie
- neutrale Platzhalterfigur
- riesiges Symbol/Zahl statt echter Alltagsszene
- Lehrbuch-/Whiteboard-Serie

Für die normale Arbeit braucht der Nutzer nur `script.txt`, `google-flow-prompt.txt`, Bilder und Audio zu öffnen.

Sobald Bilder und finales Audio fertig sind:
`npm run produce:youtube -- youtube/TT.MM.JJJJ-thema`

Wichtige QA:
`npm run qa:premium-content`
`npm run qa:visual-variety`
`npm run qa:flow-prompts`

Fehlende Word Timings werden automatisch mit lokalem Whisper.cpp erzeugt und am finalen Skript ausgerichtet.
Remotion dient danach für Schnitt, Audio und Export — nicht für sichtbaren Text.
