# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Schreiben nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Danach lesen

1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/PSYCHOLOGY_STICKMAN_WORLD.md`
4. `rules/FLOW_OUTPUT_MODE.md`
5. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
6. `rules/FLOW_PROMPT_ARCHITECTURE.md`
7. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
8. `rules/REPRESENTATION_VARIETY_LOCK.md`
9. `rules/COVER_LOCK.md`
10. relevante Script-/Format-/Audio-/Exportregeln

## Kanal

Nische: **Psychologie & menschliches Verhalten**.

## VISUAL WORLD STATUS — ACTIVE

Binding visual world: `PSYCHOLOGY_STICKMAN_WORLD_V1`
Source: `rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Kern:
- hochwertige handgezeichnete 2D-Animationswelt
- exakt gleiche Stickman-Spezies für alle sichtbaren Menschen
- übergroße runde/soft-ovale helle Köpfe
- winzige schwarze ovale Augen
- schmale bekleidete Torsi
- sehr dünne dunkle Stickman-Arme/-Beine
- organische Outlines, weiches Cel-Shading, dezente Zeichentextur
- Kleidung, Haare, Rolle, Epoche, Ort, Licht und Farbe passen sich dem Script an

**Normaler Cartoon-Mensch = FAIL.** Historische, Büro-, Labor- oder Dark-Psychology-Szenen haben keine Ausnahme. Drifted frames regenerieren.

## Visual Director

`OBSERVABLE_SCENE_FIRST_V1` + `REPRESENTATION_VARIETY_V1`:

```text
gesprochene Bedeutung
→ Viewer Takeaway
→ Observable Evidence
→ beste Representation
→ konkrete Komposition
→ finaler Flow-Prompt
```

People are one tool, not the default.

Allowed:
`CHARACTER_SCENE | OBJECT_FOCUS | ENVIRONMENT_SCENE | SCHEMA_EXPLAINER | COMPARE_VISUAL | TEXT_ILLUSTRATION`

## Sequence QA

Nicht nur Representation-Typen zählen. Prüfe auch die tatsächliche Bildfolge.

Vermeiden:
- mehrere ähnliche beige/neutral Explainer-Flächen hintereinander
- wiederholt zentriertes Objekt + Kreise/Pfeile
- gleiche Kamera/Focal Scale in vielen Nachbarszenen
- kleine Figuren/Labels, die nur am großen Bildschirm funktionieren
- überladene Schemata

Bei 3+ aufeinanderfolgenden explainer-artigen Frames: aktiv nach stärkerer Environment-/Object-/Camera-Lösung suchen.

Schemas: normalerweise ein Mechanismus, vorzugsweise max. 3 große Labels/Branches.

Text: groß, kurz, phone-readable; keine Mini-Absätze.

## Google Flow — Struktur

Pro Video genau:
`02-google-flow/google-flow-prompt.txt`

Keine mehreren Master-Prompts.

## Cover + Referenz + Batches

- BILD 01 only
- genau 3 getrennte 16:9 Cover-Kandidaten
- STOP für Nutzerwahl
- Gewinner → `01.png`
- `01.png` ist visuelle Episodenreferenz für Linework/Shading/Textur/Finish und Stickman-Spezies
- spätere Representation, Personen, Kleidung, Orte, Farben und Stimmung dürfen sich scriptgerecht ändern
- danach 5er-Batches
- jede Bildnummer eigene Datei
- akzeptierte Bilder sofort `NN.png`
- alles in `03-bilder/`
- kein Storyboard/Kontaktbogen/Collage/fertiges Video

## Text

Nur geplanter deutscher Text. Sonst `ZERO READABLE TEXT`.

## Format

### YouTube
- 16:9
- 1920×1080
- 30 fps

### Reels
- 9:16
- 1080×1920
- 30 fps

## Audio

- finales Voice-over 1,10×
- führende Stille entfernen
- lange Pausen straffen
- Wörter nicht abschneiden
- Timings erst aus final verarbeitetem Audio

## YouTube-Arbeitsfläche

- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/final-voice.mp3`
- `05-export/`
- `99-intern/`

## Export

`05-export/`:
- `final.mp4`
- `thumbnail.png`
- `captions.srt`
- `youtube-upload.txt`

`captions.srt` liegt direkt in `05-export/` und wird aus den finalen Voice-over-Timings erzeugt.
Keine separaten `captions/`, `subtitles/` oder `untertitel/`-Ordner im normalen Workflow.
Interne Word-Timings bleiben in `99-intern/`.

## QA

Bei strukturellen/Pipeline-Änderungen relevante Checks ausführen. Keine bestandenen Tests behaupten, wenn sie nicht tatsächlich gelaufen sind.
