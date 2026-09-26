# PROJECT BRAIN

## Zweck

Eigenständiges Produktionsrepo für **Alltagspsychologie & menschliches Verhalten** mit getrennten Formaten: YouTube-Longform/Testvideos und Reels/Shorts.

## Aktueller Status

- Bildwelt: **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**
- aktueller YouTube-Praxistest: `youtube/25.09.2026-bestaetigungsfehler/`
- Szene 01 ist immer Cover + erster Beat + Master
- **sämtlicher sichtbarer YouTube-Text kommt direkt aus Google Flow**
- **Remotion erzeugt keinen sichtbaren YouTube-Text**
- neue Zukunftsplanung: `VARIED_COMPOSITION_V1`
- neue Typografie-Policy: `EDITORIAL_INTEGRATED_V1`
- neue Social-Scene-Policy: `SOCIAL_VARIETY_V1`

## YouTube-Struktur

1. `01-script/` — `script.txt`
2. `02-google-flow/` — `google-flow-prompt.txt`
3. `03-bilder/` — `01.png`, `02.png`, ...
4. `04-audio/` — `final-voice.mp3`
5. `05-export/` — fertiger Export
6. `99-intern/` — technische Dateien, Quellen, QA und Metadaten

## Scene 01 — Cover-Regel

**`03-bilder/01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER`.**

Szene 01:
- zeigt den ersten gesprochenen Beat korrekt
- ist bewusst stärker als eine normale Szene komponiert
- besitzt ein dominantes Hauptmotiv und klare visuelle Spannung
- funktioniert als starkes Thumbnail
- etabliert Stickman-/Welt-DNA
- enthält den exakten deutschen Cover-Titel direkt aus Google Flow
- enthält außer diesem Titel keinen weiteren lesbaren Text

Cover-Headline:
- 2–7 Wörter
- exakter deutscher Wortlaut
- korrekte Umlaute/Satzzeichen
- professionelle integrierte Editorial-Typografie
- bei Fehlern oder sichtbar schlechter Typografie Szene 01 neu generieren

## Textsystem — GOOGLE FLOW ONLY

Neue YouTube-Projekte verwenden:

```json
{
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY",
  "flowTextStylePolicy": "EDITORIAL_INTEGRATED_V1",
  "visualPlanningPolicy": "VARIED_COMPOSITION_V1",
  "socialScenePolicy": "SOCIAL_VARIETY_V1",
  "flowTextMoments": [],
  "sceneLabels": []
}
```

Regel:
- geplante Textszene → exakter deutscher Text direkt im Google-Flow-Bild
- Cover: 2–7 Wörter
- spätere Keywords: maximal 5 Wörter
- alle anderen Szenen: ZERO READABLE TEXT
- Ziel ungefähr ein Textmoment alle 4–6 Bilder
- typische Dichte 15–25 %, maximal 30 %
- Schrift soll sauber, modern und editorial integriert wirken
- keine Meme-/Sticker-Standardtypografie
- falscher, abgeschnittener, zusätzlicher oder sichtbar schlecht integrierter Text → nur dieses Bild regenerieren
- Remotion: keine Cover-Titel, Keywords, Labels oder YouTube-Captions

## Bildwelt-Kern

- jede sichtbare menschliche Figur ist ein echter Stickman
- einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- keine realistischen Hände/Finger, Nasen oder Ohren
- Kleidung darf Rolle zeigen, aber keine normale Human-Anatomie erzeugen
- Umgebungen detailreich und hochwertig illustriert
- natürliche Farben, saubere organische Outlines, dezentes 2D-/Cel-Shading
- kein Photorealismus, keine normalen Cartoon-Menschen, kein 3D/CGI

## Style-Konsistenz ohne Charakter-Klonen

Bild 01 ist Referenz für Anatomiesystem, Linienart, Rendering/Shading, Farbverhalten und Weltqualität. Nicht global gesperrt sind Figurenidentität, Kleidung, Castgröße, Rolle, Pose, Kamera, Ort, Licht oder Komposition.

Der Cover-Titel in Bild 01 darf nicht automatisch in Folgeassets kopiert werden. Spätere Szenen rendern nur dann Text, wenn für genau diese Szene ein eigener exakter Flow-Text geplant ist.

## Kompositionsvariation

Für neue Videos wird jede Szene mit `compositionType` geplant:
- `standard`
- `split`
- `contrast`
- `montage`

Zielmix für typische 2–3-Minuten-Videos:
- ca. 70 % normale konkrete Szenen
- ca. 20 % Split-/Kontrast-Kompositionen
- ca. 10 % Montage-/Multi-Panel-Kompositionen

Mehrere Teilbilder sind ausdrücklich erlaubt, wenn sie denselben gesprochenen Beat erklären. Keine unabhängigen späteren Beats in ein Sammelbild pressen.

## Social Scene Variety

Jede Szene bekommt zusätzlich `socialDensity`:
- `solo`
- `duo`
- `group`

Bei Feedback, Gesprächen, Publikum, Beobachtung, Kollegen/Familie/Freunden, Experimenten und sozialem Vergleich aktiv Duo-/Gruppenbilder bevorzugen.

Ziel: Psychologie nicht als endlose Serie isolierter Einzelstickmen darstellen.

## Referenz-Workflow

1. Bild 01 inklusive Cover-Titel allein erzeugen.
2. STOP und Nutzerfreigabe.
3. Titel-Schreibweise, Typografie, Coverstärke und Stickman-DNA prüfen.
4. Bild 01 bleibt Master.
5. Danach höchstens 5 neue Bilder pro Batch.
6. Nach jedem Batch interne QA.
7. Nur fehlerhafte Bilder regenerieren.
8. Nach PASS automatisch fortfahren.

**Regulär genau eine Nutzerfreigabe: Bild 01.**

## Visual Beats

- konkrete Alltagsszene vor generischer Infografik
- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur als geprüfte Ausnahme
- genau ein primärer Gedanke pro Bild
- Cast, Ort, Handlung, Kamera, Komposition und Social Density pro Beat planen

## Qualitätssicherung

Mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:visual-variety`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Produktionschecks

Die QA prüft bei neuen Projekten zusätzlich:
- Kompositionsfelder und Social-Density-Felder
- genug Vergleichs-/Montage-Abwechslung
- Warnung bei zu langer Standardbild-Serie
- Warnung bei zu wenig Duo-/Gruppenszenen
- neue Flow-Hard-Locks für Typografie, Coverstärke, visuelle Variation und soziale Szenen

## Aktueller Praxistest

**Bestätigungsfehler / Confirmation Bias**

- 427 Wörter / 35 Visual Beats
- Szene 01 = Cover + erster Beat + Master
- Flow-Cover-Titel: **WARUM DU DICH SELBST BESTÄTIGST**
- weitere Flow-Texte: Szenen 04, 10, 12, 20, 25, 29, 34
- insgesamt 8 sichtbare Textmomente auf 35 Szenen
- sämtliche sichtbaren Texte direkt in Google Flow
- Remotion rendert keinen sichtbaren Text
- Quellenbasis: Nickerson (1998), Wason (1960), Klayman & Ha (1987)

Die neuen `VARIED_COMPOSITION_V1`-/Typografie-/Social-Regeln gelten für künftige Produktionen; das bestehende Bestätigungsfehler-Video wird dadurch nicht rückwirkend verändert.
