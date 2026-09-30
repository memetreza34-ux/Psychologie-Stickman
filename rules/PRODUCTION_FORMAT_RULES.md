# PRODUCTION FORMAT RULES

**STATUS: VERBINDLICH**

Zusätzlich gilt `rules/FORMAT_LOCK.md` mit höchster Format-Priorität.
Für YouTube-Text gilt `rules/TEXT_OVERLAY_LOCK.md`.
Für Bildwelt/Qualität gilt `rules/VISUAL_SYSTEM.md` + `rules/PREMIUM_VISUAL_LOCK.md`.
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

## 4. Aktive Visual Direction

Neue YouTube-Projekte verwenden:
- `CINEMATIC_HUMAN_BEHAVIOR_V2`
- `STYLIZED_STICKMAN_CAST_V2`
- `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`
- `REPRESENTATION_VARIETY_V1`
- `OBSERVABLE_SCENE_FIRST_V1`
- `NATURAL_FLOW_MASTER_V2`

Verbindlich:
- mature strict-stickman anatomy
- glaubwürdige reiche Umgebungen
- bewusstes Licht und Tiefe
- adaptive statt fest vorgegebene Farbwelt
- konkrete sichtbare Handlung/Relation vor abstrakter Symbolik
- Verhalten über Pose, Blick, Abstand, Blocking und Aktion lesbar machen
- nicht automatisch jeden Beat als Figurenbild planen
- keine Montage/Split/Group-Szene nur wegen Variety-Quote
- keine wörtliche Visualisierung eines Effekt-Namens nur wegen seines Namens

Kurzform:
**Erst festlegen, was sichtbar passieren muss; danach den Flow-Prompt schreiben.**

## 5. YouTube-Textregel — GOOGLE FLOW ONLY

Sämtlicher sichtbarer Text wird direkt von Google Flow in die Bilder gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.

### Szene 01
- exakter deutscher Cover-Titel direkt in `01.png`
- 2–7 Wörter
- kein unnötiger Zusatztext

### Ausgewählte spätere Szenen
- exakter deutscher Keyword-/Schema-/Vergleichstext nur wenn er Verständnis wirklich verbessert
- normalerweise maximal 5 Wörter pro Textblock

### Alle anderen Szenen
- ZERO READABLE TEXT
- keine zufälligen UI-Texte, Labels, Untertitel, Poster- oder Bildschirmtexte

### Remotion
- `sceneLabels: []`
- keine YouTube-Auto-Captions
- `renderGermanLabelsInRemotion: false`
- nur Schnitt, Audio, technische Bildbewegung und Export

## 6. Jedes Bild individuell und konkret

Für jeden Beat:
1. Was soll der Zuschauer verstehen?
2. Was kann man konkret sehen, das dies beweist?
3. Was ist die eine dominante sichtbare Handlung/Relation?
4. Erst dann Kamera, Umgebung, Licht, Farbe und Text festlegen.

Finaler Flow-Prompt bevorzugt konkrete sichtbare Verben und Details statt abstrakter Formulierungen.

Beispiel:
- schwach: `show social pressure`
- besser: `four people point to the same option while one person hesitates, keeps their hand lowered and glances at the group`

## 7. Formatgerechte Komposition

### Reels 9:16
- Motive vertikal staffeln
- Hauptmotiv groß genug halten

### YouTube 16:9
- horizontale Breite nutzen
- Vordergrund, Mittelgrund und Hintergrund sinnvoll verteilen
- Szene 01 mit klarer Thumbnail-Hierarchie und integrierter Titelzone komponieren

## 8. Google Flow Workflow

Neue YouTube-Videos:
- BILD 01 → genau 3 getrennte Cover-Kandidaten → STOP für Nutzerwahl
- Gewinner → `01.png` in `03-bilder/`
- danach immer 5 Bildnummern pro Batch, solange mindestens 5 übrig sind
- letzter Batch = 1–4 Restbilder
- jedes Bild separat als 16:9
- akzeptierte Ergebnisse sofort `NN.png`
- alle gemeinsam in einem flachen `03-bilder/`
- kein Storyboard/Kontaktbogen/automatisches Video

## 9. Final-QA

Vor Export prüfen:
- Reel: 9:16 / 1080×1920 / 30 fps
- YouTube: 16:9 / 1920×1080 / 30 fps
- finales Audio 1,10×
- keine abgeschnittenen Wörter
- mature Stickman-Anatomie und einheitliche Bildwelt
- jede Szene zeigt konkrete sichtbare Evidenz statt nur einen abstrakten Begriff
- keine Effekt-Namen wörtlich visualisiert ohne bewusste Begründung
- keine erzwungene Montage/Group/Split-Quote
- alle geplanten deutschen Flow-Texte exakt und lesbar
- alle nicht geplanten Textszenen textfrei
- Remotion enthält keine YouTube-Labels/Captions

**HARD FAIL:** Reel in 16:9 oder YouTube-Longform in 9:16.
