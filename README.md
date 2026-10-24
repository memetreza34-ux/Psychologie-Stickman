# Psychologie / Human-Behavior Produktionsrepo

## PFLICHT: WOCHENORDNER vor jedem neuen YouTube-Video (YOUTUBE_ISO_WEEK_FOLDERS_V1)

Verbindlich: `rules/YOUTUBE_WEEK_FOLDERS.md`. ZUERST `npm run youtube:week -- TT.MM.JJJJ` ausführen bzw. ISO-Woche Montag–Sonntag errechnen, dann das Videoprojekt **nur** in `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/<TT.MM.JJJJ-thema>/` anlegen. Vorher Themenregister und Wochenprojektordner prüfen. Alle bestehenden Unterordner `01-script` / `02-google-flow` / `03-bilder` / `04-audio` / `05-export` / `99-intern` bleiben unverändert. Die beiden verpflichtenden Phase-1-Direktlinks und `TOPIC_REGISTRY.json` verwenden den *vollständigen* Wochenpfad. Niemals einen neuen flachen Videoordner direkt unter `youtube/` erstellen.

Deutschsprachige YouTube-Produktion zu **Psychologie & menschlichem Verhalten**.

## Prioritaet 1: jedes Video macht den Kanal besser

Verbindlicher Prozess fuer kuenftige Uploads: `rules/GROWTH_LEARNING_LOOP.md` (`CONTINUOUS_IMPROVEMENT_P1_V1`).
Vor Produktion die letzten Erkenntnisse und Experimente pruefen und ein konkretes Verbesserungsexperiment planen. Nach Veroeffentlichung YouTube-Studio-Daten nach 48h / 7d / 28d dokumentieren, Unterschiede bewerten, Handlung ableiten und beim naechsten Video messen. Fuer jedes neue Projekt: `99-intern/learning-review.md`; kanalweit: `analytics/`.

Wachstum ist das Ziel, keine garantierte Kennzahl. Keine Daten erfinden; technische und visuelle Hard-Locks bleiben bestehen.

## Bildwelt

**Status: ACTIVE** — `rules/PSYCHOLOGY_STICKMAN_WORLD.md` (`PSYCHOLOGY_STICKMAN_WORLD_V1`): großer heller Kopf, kleine Augen, strichdünne Glieder. Neue Videos nutzen zusätzlich `rules/BILD_METHODE_V2.md` (Figuren-Sheets, textfreie KI-Bilder, Text als Code-Infokarten).

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

## Nach jeder fertigen Phase 1: direkt auf dem Tablet kopieren

Verbindliche Regel: `rules/PHASE1_HANDOFF_LINKS.md`. Die fertige Phase-1-Antwort muss zwei GitHub-Dateilinks zum konkreten Video liefern:

- `youtube/<WOCHENORDNER>/<Projekt>/02-google-flow/google-flow-prompt.txt` — ein Master-Prompt mit ALLEN Bildprompts fuer Google Flow.
- `youtube/<WOCHENORDNER>/<Projekt>/01-script/script.txt` — finales Sprecher-Skript zum Kopieren und Einfuegen.

Lokale Pruefung und URL-Ausgabe: `npm run phase1:links -- youtube/<WOCHENORDNER>/<Projekt>`. Vor dem Teilen sicherstellen, dass beide Dateien tatsaechlich in GitHub auf der genannten Branch verfuegbar sind. Keine bloess gedachten oder unvollstaendigen Links melden. Auf dem Tablet bei privatem Repo mit dem berechtigten GitHub-Konto angemeldet sein.

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
youtube/<JJJJ-KWNN_TT.MM-TT.MM>/TT.MM.JJJJ-thema/
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

## Neue Methoden (ab 24.10.2026, zuerst lesen)

- **`WORKFLOW_V2.md` — Startdatei für jedes neue Video (8 Schritte, `npm run v2:build`)**
- `ANALYSE_2026-10-24.md` — Analyse: was bei Skript, Bild und Code bisher schiefgeht
- `rules/SKRIPT_METHODE_V2.md` — Skript-Bauplan, Hook-Typen, Satz-Handwerk; Prüfung: `npm run qa:script-style -- <script.txt>`
- `rules/BILD_METHODE_V2.md` — Figuren-Sheet, kurze Bildprompts, Text/Schemata als Code-`infoCards`
- `vorlagen/figuren/` — kopierfertige Prompts für Stil-Referenz, Figuren-Sheet, Metapher, Bildprompt

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
