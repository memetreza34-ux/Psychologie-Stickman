# Psychologie / Human-Behavior Produktionsrepo

Deutschsprachige YouTube-Produktion zu **Psychologie & menschlichem Verhalten**.

## Prioritaet 1: jedes Video macht den Kanal besser

Verbindlicher Prozess fuer kuenftige Uploads: `rules/GROWTH_LEARNING_LOOP.md` (`CONTINUOUS_IMPROVEMENT_P1_V1`).
Vor Produktion die letzten Erkenntnisse und Experimente pruefen und ein konkretes Verbesserungsexperiment planen. Nach Veroeffentlichung YouTube-Studio-Daten nach 48h / 7d / 28d dokumentieren, Unterschiede bewerten, Handlung ableiten und beim naechsten Video messen. Fuer jedes neue Projekt: `99-intern/learning-review.md`; kanalweit: `analytics/`.

Wachstum ist das Ziel, keine garantierte Kennzahl. Keine Daten erfinden; technische und visuelle Hard-Locks bleiben bestehen.

## Bildwelt

**Status: UNDEFINED**

Die bisherige Bildwelt wurde entfernt. Das Repository enthält aktuell bewusst **keine aktive Style-DNA, Character-DNA oder visuelle Referenzwelt**.

Die neue Bildwelt wird komplett neu definiert.

Bis dahin:
- keine neue Google-Flow-Bildproduktion starten
- keine alten Bildwelten wiederverwenden
- bestehende Videos nicht als automatische Stilvorlage behandeln

## Was weiterhin steht

Die Produktionspipeline bleibt erhalten:

```text
THEMA + QUELLEN
→ Script/Hook
→ Visual Beats
→ Observable Evidence
→ neue Bildwelt (muss erst definiert werden)
→ eine google-flow-prompt.txt
→ 3 Cover
→ Nutzerwahl
→ 5er-Batches
→ Voice + Timings
→ Remotion
→ Export
```

## Google Flow

Pro Video genau:

`02-google-flow/google-flow-prompt.txt`

Ausgabe:
- BILD 01 zuerst
- 3 getrennte Cover-Kandidaten
- STOP für Nutzerwahl
- danach 5er-Batches
- jede Bildnummer = eigene 16:9-Datei
- akzeptierte Bilder als `NN.png`
- alles gemeinsam in `03-bilder/`
- kein Storyboard/Kontaktbogen/fertiges Video

## YouTube-Struktur

```text
youtube/TT.MM.JJJJ-thema/
├── 01-script/script.txt
├── 02-google-flow/google-flow-prompt.txt
├── 03-bilder/
├── 04-audio/final-voice.mp3
├── 05-export/
│   ├── final.mp4
│   ├── thumbnail.png
│   ├── captions.srt
│   └── youtube-upload.txt
└── 99-intern/
```

`captions.srt` liegt direkt in `05-export/`; es gibt keinen separaten Caption-/Subtitle-Ordner im normalen YouTube-Workflow.

## Aktive bildweltunabhängige Kernregeln

- `CANONICAL_RULES.md`
- `PROJECT_BRAIN.md`
- `rules/FLOW_OUTPUT_MODE.md`
- `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
- `rules/FLOW_PROMPT_ARCHITECTURE.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/COVER_LOCK.md`

## Bestehende Projekte

Bestehende Video-Projekte bleiben erhalten, sind aber **historische Projektstände** und keine aktive visuelle Source of Truth.
