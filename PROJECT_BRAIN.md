# PROJECT BRAIN

## Zweck

Eigenständiges Produktionsrepo für **Alltagspsychologie & menschliches Verhalten** mit getrennten Formaten: YouTube-Longform/Testvideos und Reels/Shorts.

## Aktueller Status

- Bildwelt: **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**
- aktueller YouTube-Praxistest: `youtube/26.09.2026-ankereffekt/`
- Szene 01 ist immer Cover + erster Beat + Master
- sämtlicher sichtbarer YouTube-Text kommt direkt aus Google Flow
- Remotion erzeugt keinen sichtbaren YouTube-Text
- Kompositionsplanung: `VARIED_COMPOSITION_V1`
- Typografie-Policy: `EDITORIAL_INTEGRATED_V1`
- Social-Scene-Policy: `SOCIAL_VARIETY_V1`
- neue Premium-Visual-Policy: `PREMIUM_EDITORIAL_CINEMATIC_V1`
- neue Farb-Policy: `INTENTIONAL_COLOR_STORY_V1`
- neue Script-Policy: `HOOK_FIRST_EXPLAIN_EARLY_V1`

Der Ankereffekt-Praxistest hat gezeigt: reine Kompositionsvariation reicht nicht. Zukünftige Videos brauchen zusätzlich stärkere Premium-Figurenführung, bewusste Farbe, mehr reale Alltagsszenen und einen direkteren Skript-Einstieg. Das bestehende Ankereffekt-Video wird nicht rückwirkend verändert.

## YouTube-Struktur

1. `01-script/` — `script.txt`
2. `02-google-flow/` — `google-flow-prompt.txt`
3. `03-bilder/` — `01.png`, `02.png`, ...
4. `04-audio/` — `final-voice.mp3`
5. `05-export/` — fertiger Export
6. `99-intern/` — technische Dateien, Quellen, QA und Metadaten

## Script-Einstieg

Neue YouTube-Projekte:
- Szene 01 = klare Hook-Frage oder überraschende direkte Aussage
- Kernbegriff spätestens Szene 03 / ungefähr erste 50 Wörter
- einfache Erklärung unmittelbar danach
- erstes konkretes Alltagsbeispiel spätestens Szene 05 / ungefähr erste 80 Wörter
- erst danach Mechanismus, Experiment und Vertiefung

Bevorzugte Hook-Typen:
- `WHAT_IS`
- `WHY_DOES`
- `HAVE_YOU_WONDERED`
- `DIRECT_SURPRISE`
- `DIRECT_PROBLEM`

Beispiel Ankereffekt künftig besser:
`Was ist der Ankereffekt? Die erste Zahl, die du siehst, kann dein späteres Urteil in ihre Richtung ziehen.`
Dann direkt ein reales Preisbeispiel.

## Scene 01 — Cover-Regel

**`03-bilder/01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER`.**

Szene 01:
- zeigt den ersten Hook-Beat korrekt
- ist bewusst stärker als eine normale Szene komponiert
- besitzt ein dominantes Hauptmotiv und klare visuelle Spannung
- etabliert Premium-Figuren, Farbwelt und Stickman-DNA
- funktioniert als starkes Thumbnail
- enthält den exakten deutschen Cover-Titel direkt aus Google Flow
- enthält außer diesem Titel keinen weiteren lesbaren Text

## Premium Visual Direction

Neue YouTube-Projekte verwenden:

```json
{
  "premiumVisualPolicy": "PREMIUM_EDITORIAL_CINEMATIC_V1",
  "colorStoryPolicy": "INTENTIONAL_COLOR_STORY_V1",
  "projectPalette": {
    "primary": "...",
    "secondary": "...",
    "accent": "...",
    "neutral": "...",
    "avoid": ["grey/beige wash", "sterile office monotony"]
  }
}
```

Premium-Figuren bleiben echte Stickmen. Premium entsteht durch:
- starke Pose/Körpersprache
- lesbare minimalistische Emotion
- rollenbezogene Kleidung
- charakteristische Silhouette
- passende Requisiten
- echte Interaktion
- bewusstes Framing

Farbe:
- thematische Projektpalette vor Flow festlegen
- Akzentfarben für Fokus nutzen
- natürliche Objektfarben erhalten
- Lichttemperatur variieren
- graue/beige Monotonie vermeiden
- nicht jede Szene identisch einfärben

Bildpriorität:
**konkrete Alltagsszene > visuelle Metapher > abstrakte Lehrgrafik.**

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
- Schrift sauber, modern und editorial integriert
- keine Meme-/Sticker-Standardtypografie
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
- saubere organische Outlines, dezentes 2D-/Cel-Shading
- kein Photorealismus, keine normalen Cartoon-Menschen, kein 3D/CGI

## Style-Konsistenz ohne Charakter-Klonen

Bild 01 ist Referenz für Anatomiesystem, Linienart, Rendering/Shading, Farbverhalten und Qualitätsniveau. Nicht global gesperrt sind Figurenidentität, Kleidung, Castgröße, Rolle, Pose, Kamera, Ort, Licht oder Komposition.

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

Mehrere Teilbilder sind erlaubt, wenn sie denselben gesprochenen Beat erklären.

## Social Scene Variety

Jede Szene bekommt zusätzlich `socialDensity`:
- `solo`
- `duo`
- `group`

Bei Feedback, Gesprächen, Publikum, Beobachtung, Kollegen/Familie/Freunden, Experimenten und sozialem Vergleich aktiv Duo-/Gruppenbilder bevorzugen.

## Referenz-Workflow

1. Bild 01 inklusive Cover-Titel allein erzeugen.
2. STOP und Nutzerfreigabe.
3. Titel, Typografie, Coverstärke, Premium-Figuren, Farbwelt und Stickman-DNA prüfen.
4. Bild 01 bleibt Master.
5. Danach höchstens 5 neue Bilder pro Batch.
6. Nach jedem Batch interne QA.
7. Nur fehlerhafte Bilder regenerieren.
8. Nach PASS automatisch fortfahren.

## Visual Beats

- konkrete Alltagsszene vor generischer Infografik
- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur als geprüfte Ausnahme
- genau ein primärer Gedanke pro Bild
- Cast, Ort, Handlung, Kamera, Komposition, Social Density, Farbe und Premium-Figurenwirkung pro Beat planen

## Qualitätssicherung

Mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:visual-variety`
- `npm run qa:premium-content`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Produktionschecks

Die neue Premium-Content-QA prüft bei neuen Projekten:
- Script-Hook-Metadaten
- frühe Kernbegriffs-Einführung
- frühes Alltagsbeispiel laut Plan
- ausgefüllte Projektpalette
- Premium-Visual-/Color-Policies
- Premium-/Color-/Real-Life-Hard-Locks im Flow-Prompt
- `COLOR DIRECTION` und `PREMIUM CHARACTER DIRECTION` pro Szene

## Aktueller Praxistest

**Ankereffekt / Anchoring Effect**

- bestehender Test bleibt unverändert
- zeigte Defizite bei Premium-Figuren, Farbdynamik, Lehrgrafik-Anteil und Hook-Direktheit
- diese Defizite werden durch die neuen Zukunftsregeln nicht rückwirkend am Video, sondern im Produktionssystem adressiert
