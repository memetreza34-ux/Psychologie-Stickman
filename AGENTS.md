# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/STICKMAN_DNA.md`
4. `rules/FORMAT_LOCK.md`
5. `rules/YOUTUBE_THEMEN_SYSTEM.md`
6. `rules/YOUTUBE_STYLE_LOCK.md`
7. `rules/IMAGE_REFERENCE_LOCK.md`
8. `rules/COVER_LOCK.md`
9. `rules/TEXT_OVERLAY_LOCK.md`
10. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
11. `rules/PRODUCTION_FORMAT_RULES.md`

## Themenwelt

Kanalnische: **Alltagspsychologie & menschliches Verhalten**.

## Bildwelt — HARD LOCK

**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Jede sichtbare menschliche oder menschenähnliche Figur benutzt echte Stickman-Grundanatomie:
- einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- keine realistische Nase/Ohren
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- einfache Hände ohne Fingeranatomie
- stark vereinfachte Füße/Schuhe

Normale Cartoon-Menschen, halb-realistische Menschen, Mischstile, 3D/Pixar/Anime sind HARD FAIL.

## Bildlogik

Priorität:
1. konkrete Handlung / Alltagsszene
2. einfache visuelle Metapher
3. Diagramm/Skala/Karte nur wenn wirklich klarer

Genau ein primärer visueller Gedanke pro Bild.

## Textsystem — GOOGLE FLOW ONLY

Für neue YouTube-Projekte gilt ohne Ausnahme:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die jeweiligen Bilder gerendert. Remotion erzeugt keinen sichtbaren Text.**

### Szene 01
- exakter deutscher Cover-Titel direkt in `01.png`
- 2–7 Wörter
- außer diesem Titel kein weiterer lesbarer Text

### Ausgewählte spätere Textszenen
- exakter deutscher Keyword-/Merksatz direkt im Google-Flow-Bild
- maximal 5 Wörter
- nur ein geplanter Textmoment pro Bild

### Alle anderen Szenen
- ZERO READABLE TEXT
- keine UI-Texte, Labels, Untertitel, Poster-/Werbe-/Bildschirmtexte
- Dokumente/Screens nur abstrakt

### Remotion
Für YouTube:
- `sceneLabels: []`
- `renderGermanLabelsInRemotion: false`
- keine YouTube-Auto-Captions
- Remotion nur für Schnitt, Audio, technische Effekte und Export

### Text-QA
Falsche Schreibweise, fehlende/zusätzliche Wörter, Pseudo-Schrift oder abgeschnittene Buchstaben => nur das betroffene Flow-Bild regenerieren.

## Scene 01 — COVER + MASTER HARD LOCK

**`03-bilder/01.png` = SCENE 01 + COVER/THUMBNAIL + STYLE-/ANATOMY-MASTER.**

Szene 01 muss:
- den ersten gesprochenen Visual Beat korrekt darstellen
- als starkes Cover funktionieren
- die Stickman-/Welt-DNA etablieren
- den exakten deutschen Cover-Titel direkt aus Google Flow enthalten

Kein separates Pflicht-`cover.png`.

## Textmetadaten neuer Projekte

```json
{
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY",
  "flowTextMoments": [],
  "sceneLabels": []
}
```

## Visual-Beat-Dichte

- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur geprüft
- durchschnittlich höchstens 16 Wörter pro Szene

## Referenz-Workflow

1. Bild 01 inklusive exaktem Cover-Titel allein generieren.
2. STOP und Nutzerfreigabe.
3. Cover, Titel, Stickman-DNA und Inhalt prüfen.
4. Danach höchstens 5 neue Bilder pro Batch.
5. Bild 01 ab Szene 02 nur als STYLE-/ANATOMY-Referenz verwenden, nicht als Charakter- oder Textvorlage.
6. Nur bei ausdrücklich geplanten späteren Textmomenten deren eigenen exakten deutschen Flow-Text rendern.
7. Nach jedem Batch interne QA.
8. Nur fehlerhafte Bilder regenerieren.
9. Nach PASS automatisch fortsetzen.

**Die einzige reguläre Nutzerfreigabe ist Bild 01.**

## FORMAT HARD LOCK

### `reels/`
- 9:16
- 1080×1920
- 30 fps
- Remotion: `Phase3Reel`

### `youtube/`
- 16:9
- 1920×1080
- 30 fps
- Remotion: `Phase3YouTube`

## Audio

- finales Voice-over exakt 1,10×
- führende Stille entfernen
- lange Pausen straffen
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Einfache YouTube-Arbeitsfläche

- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/final-voice.mp3`
- `05-export/`
- `99-intern/`

Die eine Google-Flow-Datei enthält:
- Stickman-DNA
- Format/Stil
- Scene-01-Cover-Regel
- alle geplanten exakten deutschen Textmomente
- ZERO READABLE TEXT für alle übrigen Szenen
- Master-Referenz-Regel
- 5er-Batch-Plan
- STOP nur nach Bild 01
- alle individuellen Szenenprompts

## QA

Bei strukturellen oder Pipeline-Änderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Produktionschecks

## Priorität

- Formatkonflikt: `rules/FORMAT_LOCK.md`
- visuelle Identität: `rules/STICKMAN_DNA.md`
- Cover: `rules/COVER_LOCK.md`
- sichtbarer YouTube-Text: `rules/TEXT_OVERLAY_LOCK.md` — **Google Flow only**
- Batch: Freigabe einmal nach Bild 01; danach automatische 5er-Batches
