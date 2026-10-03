# YOUTUBE EXPORT PACKAGE — HARD LOCK

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

## Ziel

`05-export/` ist immer das vollständige Upload-Paket für YouTube, nicht nur der Video-Render.

## Pflichtstruktur

```text
05-export/
├── final.mp4
├── thumbnail.png
├── captions.srt
└── youtube-upload.txt
```

`thumbnail.png` ist das finale Cover aus Szene/Bild 01.

`captions.srt` ist die finale deutsche Untertitel-/Caption-Datei für den direkten YouTube-Upload.
Sie wird aus den finalen Voice-over-Timings erzeugt und liegt **direkt** in `05-export/`.

## Keine separaten Caption-Ordner — HARD LOCK

Im normalen YouTube-Workflow gibt es keine zusätzlichen Ordner wie:
- `captions/`
- `subtitles/`
- `untertitel/`

Auch keine Unterordner innerhalb von `05-export/`.

Interne Timing-Dateien wie `word-timings.json` bleiben in `99-intern/`.
Der Upload-Export enthält nur die fertige `captions.srt`.

## captions.srt — Pflicht

- Format: UTF-8 SRT
- Sprache: Deutsch
- Timing basiert auf dem final verarbeiteten Voice-over
- Untertitel müssen den finalen gesprochenen Text wiedergeben
- kurze, lesbare Caption-Blöcke statt wortweiser Einzelzeilen
- keine erfundenen Wörter
- keine Platzhalter
- keine separaten Caption-JSON/VTT-Dateien im Export, außer der Nutzer verlangt sie ausdrücklich
- `captions.srt` wird nicht in das Video eingebrannt; sie ist die separate YouTube-Untertiteldatei

## youtube-upload.txt — Pflicht

Alle kopierbaren Veröffentlichungsdaten stehen gesammelt in **einer einzigen Datei**:

```text
YOUTUBE UPLOAD

TITEL:
[finaler Titel]

BESCHREIBUNG / CAPTION:
[komplette fertige Beschreibung]

QUELLEN / LINKS:
[falls vorhanden]

KAPITEL:
[falls sinnvoll]

TAGS:
[kommagetrennt]

HASHTAGS:
[Hashtags]

ANGEHEFTETER KOMMENTAR:
[fertiger Kommentar oder NONE]

SPRECHERTEXT / BACKUP:
[bereinigter deutscher Sprechertext]

VIDEO-DATEN:
Thema: ...
Sprache: Deutsch
Format: YouTube 16:9
Video: final.mp4
Thumbnail: thumbnail.png
Untertitel: captions.srt
```

## Regeln

- Keine separaten `title.txt`, `description.txt`, `tags.txt`, `chapters.txt` usw. für den normalen Workflow.
- Alles, was der Nutzer beim Upload kopieren muss, steht in `youtube-upload.txt`.
- Die eigentliche YouTube-Untertiteldatei ist separat `05-export/captions.srt`.
- Keine Platzhalter dürfen im finalen Upload-Paket übrig bleiben.
- Beschreibung/Caption und Titel müssen zum fertigen Video passen und dürfen keine unbelegten Behauptungen ergänzen.
- Quellen/Links nur aufnehmen, wenn sie tatsächlich verwendet oder relevant sind.
- Kapitel nur verwenden, wenn das Video lang genug ist und echte Zeitmarken vorliegen; sonst `NONE`.
- Tags knapp und thematisch halten.
- Hashtags nicht überladen.
- `SPRECHERTEXT / BACKUP` enthält den bereinigten finalen deutschen Sprechertext zum direkten Kopieren oder Prüfen.
- `thumbnail.png` entspricht dem freigegebenen Cover/Bild 01.
- `final.mp4` bleibt der finale Render.

## Definition of Done

Ein neues YouTube-Projekt ist erst upload-bereit, wenn in `05-export/` mindestens vorhanden sind:

1. `final.mp4`
2. `thumbnail.png`
3. `captions.srt`
4. `youtube-upload.txt` vollständig ohne Platzhalter

Alle vier Dateien liegen direkt in `05-export/`; es gibt keinen zusätzlichen Caption-Ordner.

Das ist Teil der FINAL-QA.
