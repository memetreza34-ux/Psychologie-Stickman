# YOUTUBE EXPORT PACKAGE — HARD LOCK

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

## Ziel

`05-export/` ist immer das vollständige Upload-Paket für YouTube, nicht nur der Video-Render.

## Pflichtstruktur

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

`thumbnail.png` ist das finale Cover aus Szene/Bild 01.

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

CAPTIONS / SPRECHERTEXT:
[bereinigter deutscher Sprechertext]

VIDEO-DATEN:
Thema: ...
Sprache: Deutsch
Format: YouTube 16:9
Video: final.mp4
Thumbnail: thumbnail.png
```

## Regeln

- Keine separaten `title.txt`, `description.txt`, `tags.txt`, `chapters.txt` usw. für den normalen Workflow.
- Alles, was der Nutzer beim Upload kopieren muss, steht in `youtube-upload.txt`.
- Keine Platzhalter dürfen im finalen Upload-Paket übrig bleiben.
- Beschreibung/Caption und Titel müssen zum fertigen Video passen und dürfen keine unbelegten Behauptungen ergänzen.
- Quellen/Links nur aufnehmen, wenn sie tatsächlich verwendet oder relevant sind.
- Kapitel nur verwenden, wenn das Video lang genug ist und echte Zeitmarken vorliegen; sonst `NONE`.
- Tags knapp und thematisch halten.
- Hashtags nicht überladen.
- `CAPTIONS / SPRECHERTEXT` enthält den bereinigten finalen deutschen Sprechertext zum direkten Kopieren.
- `thumbnail.png` entspricht dem freigegebenen Cover/Bild 01.
- `final.mp4` bleibt der finale Render.

## Definition of Done

Ein neues YouTube-Projekt ist erst upload-bereit, wenn in `05-export/` mindestens vorhanden sind:

1. `final.mp4`
2. `thumbnail.png`
3. `youtube-upload.txt` vollständig ohne Platzhalter

Das ist Teil der FINAL-QA.