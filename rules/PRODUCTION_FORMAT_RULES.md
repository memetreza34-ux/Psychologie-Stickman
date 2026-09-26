# PRODUCTION FORMAT RULES

**STATUS: VERBINDLICH**

Zusätzlich gilt `rules/FORMAT_LOCK.md` mit höchster Format-Priorität.
Für YouTube-Text gilt `rules/TEXT_OVERLAY_LOCK.md`.
Für Premium/Farbe gilt `rules/PREMIUM_VISUAL_LOCK.md`.
Für Script-Einstieg gilt `rules/SCRIPT_HOOK_LOCK.md`.

## 1. Zwei getrennte Ausgabeformate

### Reels / Shorts
- 9:16
- 1080×1920
- 30 fps
- Remotion: `Phase3Reel`

### YouTube-Longform
- 16:9
- 1920×1080
- 30 fps
- Remotion: `Phase3YouTube`

## 2. YouTube-Scriptstart

Neue Projekte:
- Szene 01 = klare Hook-Frage oder überraschende direkte Aussage
- Kernbegriff spätestens Szene 03
- einfache Erklärung direkt danach
- erstes konkretes Alltagsbeispiel spätestens Szene 05
- keine langsame abstrakte Vorrede als Standard

## 3. Voice-over

- finales Voice-over exakt 1,10×
- Tonhöhe erhalten
- führende Stille entfernen
- Wörter niemals abschneiden
- lange Pausen deutlich straffen
- Timings erst aus final bearbeitetem Audio ableiten

## 4. Premium Visual Direction

Neue YouTube-Projekte:
- `PREMIUM_EDITORIAL_CINEMATIC_V1`
- `INTENTIONAL_COLOR_STORY_V1`
- ausgefüllte `projectPalette`

Verbindlich:
- Premium-Figuren durch Pose, Silhouette, Kleidung, Emotion und Interaktion
- Stickman-Anatomie bleibt simpel
- bewusstes Licht und Tiefe
- thematisch passende Farbe
- graue/beige Monotonie vermeiden
- konkrete Alltagsszene vor abstrakter Lehrgrafik

## 5. YouTube-Textregel — GOOGLE FLOW ONLY

Für neue YouTube-Projekte:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die Bilder gerendert. Remotion erzeugt keinen sichtbaren Text.**

### Szene 01
- exakter deutscher Cover-Titel direkt in `01.png`
- 2–7 Wörter
- kein weiterer lesbarer Text

### Ausgewählte spätere Szenen
- exakter deutscher Keyword-/Merksatz direkt im Google-Flow-Bild
- maximal 5 Wörter
- kein zusätzlicher lesbarer Text

### Alle anderen Szenen
- ZERO READABLE TEXT
- keine UI-Texte, Labels, Untertitel, Poster- oder Bildschirmtexte
- Karten, Screens und Dokumente abstrakt

### Dichte
- Ziel meist 15–25 % sichtbare Textmomente inklusive Cover
- harte Obergrenze 30 %

### Remotion
- `sceneLabels: []`
- keine YouTube-Auto-Captions
- `renderGermanLabelsInRemotion: false`
- nur Schnitt, Audio, technische Bildbewegung und Export

## 6. Jedes Bild individuell anpassen

- exakt den aktuell gesprochenen Gedanken zeigen
- konkrete Alltagshandlung bevorzugen
- abstrakte Infografik nur wenn klarer
- Kamera, Handlung, Umgebung, Requisiten, Licht, Farbe und Fokus pro Beat individuell wählen
- `COLOR DIRECTION` pro Premium-Szene
- `PREMIUM CHARACTER DIRECTION` pro Premium-Szene
- keine unnötige Wiederholung
- Master sperrt Anatomie/Qualitätsniveau, nicht Komposition oder Figurenidentität
- keine späteren Informationen vorwegnehmen
- bei Textszenen sichere Typografiezone direkt für Flow einplanen

Kurzform:
**Master bestimmt Qualitätsniveau und Anatomie. Visual Beat bestimmt WAS. Projektpalette bestimmt Farblogik. Google Flow erzeugt Bild UND alle sichtbaren YouTube-Texte. Remotion schneidet und rendert nur.**

## 7. Formatgerechte Komposition

### Reels 9:16
- Motive vertikal staffeln
- Hauptmotiv groß genug halten

### YouTube 16:9
- horizontale Breite nutzen
- Vordergrund, Mittelgrund und Hintergrund sinnvoll verteilen
- Szene 01 mit klarer Thumbnail-Hierarchie, Premium-Figur, Farbkontrast und integrierter Titelzone komponieren

## 8. Final-QA

Vor Export prüfen:
- Reel: 9:16 / 1080×1920 / 30 fps
- YouTube: 16:9 / 1920×1080 / 30 fps
- finales Audio 1,10×
- keine abgeschnittenen Wörter im Audio
- Premium-Figuren und Projekt-Farbwelt wirken konsistent
- keine graue/beige Monotonie ohne Grund
- keine unnötige Lehrgrafik-Serie
- alle geplanten deutschen Flow-Texte exakt, vollständig und lesbar
- keine zusätzlichen oder englischen Wörter
- alle nicht geplanten Textszenen textfrei
- Remotion enthält keine YouTube-Labels/Captions
- Textdichte maximal 30 %
- alle Menschen echte Stickmen
- Stil bleibt über Master konsistent

**HARD FAIL:** Reel in 16:9 oder YouTube-Longform in 9:16.
