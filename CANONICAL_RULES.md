# CANONICAL RULES — PSYCHOLOGY VIDEO PRODUCTION

## VISUAL WORLD STATUS

`UNDEFINED`

Die bisherige Bildwelt, Character-DNA, Style-Locks und Referenzpakete wurden entfernt.

Es existiert aktuell **kein** verbindlicher Zeichenstil, keine verbindliche Figurenform und keine verbindliche Farb-/Render-DNA.

### Hard Gate

Neue Bildproduktion mit Google Flow ist gesperrt, bis der Nutzer eine neue Bildwelt ausdrücklich definiert und freigegeben hat.

Nicht erlaubt:
- alte Bildwelten aus Git-Historie wieder als Default verwenden
- bestehende Videos als automatische Style-Quelle behandeln
- stillschweigend wieder Stickman-/Cartoon-/3D-/Editorial-Regeln einführen
- einen Stil selbst erfinden, bevor der Nutzer ihn freigibt

## Aktive Prozess-Quellen

1. `rules/FLOW_OUTPUT_MODE.md`
2. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
3. `rules/FLOW_PROMPT_ARCHITECTURE.md`
4. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
5. `rules/REPRESENTATION_VARIETY_LOCK.md`
6. `rules/COVER_LOCK.md`
7. `rules/TEXT_OVERLAY_LOCK.md`
8. `rules/YOUTUBE_EXPORT_PACKAGE.md`
9. Script-/Format-/Produktionsregeln

Diese Dateien dürfen den Produktionsablauf definieren, aber **keine neue Bildwelt vorwegnehmen**.

## Observable Scene First

Weiterhin aktiv:

`spoken meaning → viewer takeaway → observable evidence → concrete composition → final prompt`

Flow soll keine abstrakte Psychologie selbst visualisieren müssen. Effekt-Namen werden nicht automatisch wörtlich dargestellt.

## Google Flow

Pro Video genau eine Datei:

`02-google-flow/google-flow-prompt.txt`

## Cover + Batching

- BILD 01 zuerst
- genau 3 getrennte Cover-Kandidaten
- STOP für Nutzerwahl
- gewähltes Cover → `03-bilder/01.png`
- danach 5er-Batches
- jede Bildnummer bleibt eine eigene 16:9-Datei
- akzeptierte Bilder sofort `NN.png`
- alles gemeinsam in `03-bilder/`
- kein Storyboard/Kontaktbogen/fertiges Video

Wie das gewählte Cover später als visuelle Referenz genutzt wird, wird erst mit der **neuen Bildwelt** endgültig festgelegt.

## Text

Nur explizit geplanter deutscher Text. Sonst `ZERO READABLE TEXT`.

## Script

`HOOK_FIRST_EXPLAIN_EARLY_V1` bleibt aktiv.

## Export

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

## Bestehende Projekte

Bestehende Projekte werden nicht automatisch gelöscht oder migriert. Sie sind historische Projektstände und keine aktive Bildwelt.
