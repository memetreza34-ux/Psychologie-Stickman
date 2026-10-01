# PRODUCTION FORMAT RULES

**STATUS: VERBINDLICH**

Zusätzlich gilt `rules/FORMAT_LOCK.md` mit höchster Format-Priorität.
Für YouTube-Text gilt `rules/TEXT_OVERLAY_LOCK.md`.
Für Visual-Director/Prompting gilt `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md` + `rules/FLOW_PROMPT_ARCHITECTURE.md`.
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

## 4. Visual Direction

Aktiv bleiben nur die bildweltunabhängigen Regeln:
- `OBSERVABLE_SCENE_FIRST_V1`
- `REPRESENTATION_VARIETY_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

Verbindlich:
- konkrete sichtbare Handlung/Relation vor abstrakter Symbolik
- Verhalten über beobachtbare Aktion, Blick, Abstand, Blocking und Objektbeziehung beschreiben
- nicht automatisch jeden Beat als Figurenbild planen
- keine Montage/Split/Group-Szene nur wegen Variety
- keine wörtliche Visualisierung eines Effekt-Namens nur wegen seines Namens

Kurzform:
**Erst festlegen, was sichtbar passieren muss; danach den Flow-Prompt schreiben.**

### Visual-World-Gate

Aktueller Status: **UNDEFINED**.

Nicht definiert sind Character-Design, 2D/3D, Rendering, Farben, Lichtstil, Shading, Textur und Referenzsystem.

Keine neue Flow-Bildproduktion starten, bevor die neue Bildwelt ausdrücklich freigegeben wurde.

## 5. YouTube-Textregel — GOOGLE FLOW ONLY

Sichtbarer Text wird direkt von Google Flow in die Bilder gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.

### Szene 01
- exakter deutscher Cover-Titel
- 2–7 Wörter

### Ausgewählte spätere Szenen
- exakter deutscher Keyword-/Schema-/Vergleichstext nur wenn nötig
- normalerweise maximal 5 Wörter pro Textblock

### Alle anderen Szenen
- ZERO READABLE TEXT

### Remotion
- `sceneLabels: []`
- `renderGermanLabelsInRemotion: false`

## 6. Jedes Bild individuell und konkret

Für jeden Beat:
1. Was soll der Zuschauer verstehen?
2. Was kann man konkret sehen, das dies beweist?
3. Was ist die eine dominante sichtbare Handlung/Relation?
4. Erst danach Kamera, Umgebung und – nach Freigabe der neuen Bildwelt – Licht/Farbe/Style festlegen.

## 7. Formatgerechte Komposition

### Reels 9:16
- Motive vertikal staffeln
- Hauptmotiv groß genug halten

### YouTube 16:9
- horizontale Breite nutzen
- räumliche Anordnung sinnvoll planen
- Szene 01 mit klarer Thumbnail-Hierarchie und Titelzone komponieren

## 8. Google Flow Workflow

- BILD 01 → genau 3 getrennte Cover-Kandidaten → STOP für Nutzerwahl
- Gewinner → `01.png` in `03-bilder/`
- danach 5 Bildnummern pro Batch, solange mindestens 5 übrig sind
- letzter Batch = 1–4 Restbilder
- jedes Bild separat
- akzeptierte Ergebnisse sofort `NN.png`
- alle gemeinsam in einem flachen `03-bilder/`
- kein Storyboard/Kontaktbogen/automatisches Video

## 9. Final-QA

Vor Export prüfen:
- Reel: 9:16 / 1080×1920 / 30 fps
- YouTube: 16:9 / 1920×1080 / 30 fps
- finales Audio 1,10×
- keine abgeschnittenen Wörter
- neue Bildwelt wurde ausdrücklich freigegeben und konsistent angewendet
- jede Szene zeigt konkrete sichtbare Evidenz
- keine Effekt-Namen unbewusst wörtlich visualisiert
- geplante deutsche Flow-Texte exakt
- ungeplante Textszenen textfrei
- Remotion enthält keine YouTube-Labels/Captions

**HARD FAIL:** Reel in 16:9 oder YouTube-Longform in 9:16.
