# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Schreiben nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Danach lesen

1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/FLOW_OUTPUT_MODE.md`
4. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
5. `rules/FLOW_PROMPT_ARCHITECTURE.md`
6. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
7. `rules/REPRESENTATION_VARIETY_LOCK.md`
8. `rules/COVER_LOCK.md`
9. relevante Script-/Format-/Audio-/Exportregeln

## Kanal

Nische: **Psychologie & menschliches Verhalten**.

## VISUAL WORLD STATUS — UNDEFINED

Es gibt aktuell **keine aktive Bildwelt**.

Nicht selbstständig festlegen oder aus alten Dateien ableiten:
- Character-DNA
- Stickman-/Menschenform
- 2D/3D-Stil
- Rendering
- Farben
- Shading
- feste Negativ-Prompts
- Referenzbilder

Alte Visual-World-IDs und gelöschte Style-Locks sind nicht mehr aktiv.

### Produktionssperre

Keine neue Google-Flow-Bildproduktion, bis der Nutzer eine neue Bildwelt ausdrücklich definiert/freigegeben hat.

## Visual Director

`OBSERVABLE_SCENE_FIRST_V1` bleibt aktiv:

```text
gesprochene Bedeutung
→ Viewer Takeaway
→ Observable Evidence
→ konkrete sichtbare Komposition
→ finaler Flow-Prompt
```

Psychologische Begriffe nicht automatisch wörtlich visualisieren.

## Google Flow — Struktur

Pro Video genau:

`02-google-flow/google-flow-prompt.txt`

Keine mehreren Master-Prompts.

## Cover + Batches

- BILD 01 only
- genau 3 getrennte 16:9 Cover-Kandidaten
- STOP für Nutzerwahl
- Gewinner → `01.png`
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
- `youtube-upload.txt`

## QA

Bei strukturellen/Pipeline-Änderungen relevante Checks ausführen. Keine bestandenen Tests behaupten, wenn sie nicht tatsächlich gelaufen sind.
