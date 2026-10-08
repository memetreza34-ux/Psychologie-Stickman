# YOUTUBE EXPORT PACKAGE — HARD LOCK

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

Policy ID: `YOUTUBE_EXPORT_PACKAGE_V2`

## Ziel

`05-export/` ist immer das vollständige Upload-Paket für YouTube, nicht nur der Video-Render.

## Pflichtstruktur

```text
05-export/
├── final.mp4
├── thumbnail.png
├── captions.srt
├── subtitle-script.txt
└── youtube-upload.txt
```

`thumbnail.png` ist das separat ausgewählte Thumbnail und gehört NICHT in die Videotimeline. BILD 01 ist eine normale eigenständige Szene.

`captions.srt` ist die finale deutsche Untertiteldatei für den direkten YouTube-Upload.

`subtitle-script.txt` ist dieselbe finale Untertitelspur zusätzlich als leicht lesbare Kopier-/Prüfversion mit Zeitbereichen wie:

```text
00:00–00:04
Warum ist der fremde Fahrer sofort rücksichtslos ...

00:04–00:09
Genau dieser Unterschied führt ...
```

`youtube-upload.txt` enthält den finalen YouTube-Titel, die vollständige Beschreibung und die restlichen kopierbaren Veröffentlichungsdaten.

## Interne Quelle für Upload-Metadaten

Neue Projekte führen:

`99-intern/youtube-upload.json`

Mindestens:
- `title`
- `description`

Optional:
- `sources`
- `chapters`
- `tags`
- `hashtags`
- `pinnedComment`
- `topic`

Die interne JSON-Datei wird nicht exportiert. Sie ist die redaktionelle Quelle für `youtube-upload.txt`.

## Keine separaten Caption-Ordner — HARD LOCK

Im normalen YouTube-Workflow gibt es keine zusätzlichen Ordner wie:
- `captions/`
- `subtitles/`
- `untertitel/`

Auch keine Unterordner innerhalb von `05-export/`.

Interne Timing-Dateien wie `word-timings.json` bleiben in `99-intern/`.

## captions.srt — Pflicht

- Format: UTF-8 SRT
- Sprache: Deutsch
- Timing basiert auf dem final verarbeiteten Voice-over
- Untertitel geben den finalen gesprochenen Text wieder
- kurze, lesbare Caption-Blöcke statt wortweiser Einzelzeilen
- keine erfundenen Wörter
- keine Platzhalter
- nicht in das Video einbrennen
- direkt bei YouTube als Untertiteldatei hochladbar

## subtitle-script.txt — Pflicht

- basiert auf exakt denselben Cue-Grenzen wie `captions.srt`
- Zeitstempel in kompakter lesbarer Form, z. B. `00:00–00:04`
- darunter der zugehörige deutsche Sprechertext
- keine SRT-Nummern und keine Millisekunden
- geeignet zum schnellen Kopieren, Gegenlesen und manuellen Übertragen
- kein Ersatz für die technisch direkt hochladbare `captions.srt`

## youtube-upload.txt — Pflicht

Alle kopierbaren Veröffentlichungsdaten stehen gesammelt in **einer einzigen Datei**:

```text
YOUTUBE UPLOAD

TITEL:
[finaler Titel]

BESCHREIBUNG:
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
Untertitel Upload: captions.srt
Untertitel Kopierversion: subtitle-script.txt
```

## Regeln

- Keine separaten `title.txt`, `description.txt`, `tags.txt`, `chapters.txt` usw.
- Titel und Beschreibung stehen verbindlich in `youtube-upload.txt`.
- Die direkte YouTube-Untertiteldatei ist `captions.srt`.
- Die lesbare Zeitstempel-Version ist `subtitle-script.txt`.
- Keine Platzhalter dürfen im finalen Upload-Paket übrig bleiben.
- Beschreibung und Titel müssen zum fertigen Video passen und dürfen keine unbelegten Behauptungen ergänzen.
- Quellen/Links nur aufnehmen, wenn sie tatsächlich verwendet oder relevant sind.
- Kapitel nur mit echten finalen Zeitmarken; sonst `NONE`.
- Tags knapp und thematisch halten.
- Hashtags nicht überladen.
- `SPRECHERTEXT / BACKUP` enthält den bereinigten finalen deutschen Sprechertext.
- `thumbnail.png` ist das freigegebene eigene Thumbnail (kein Video-Frame).
- `final.mp4` bleibt der finale Render.

## Automatische Erzeugung

`scripts/generate-youtube-captions.mjs` erzeugt:
- `captions.srt`
- `subtitle-script.txt`

`scripts/generate-youtube-upload.mjs` erzeugt:
- `youtube-upload.txt`

`produce:youtube` ruft beide Schritte nach dem finalen Render auf.

## Definition of Done

Ein neues YouTube-Projekt mit `YOUTUBE_EXPORT_PACKAGE_V2` ist erst upload-bereit, wenn direkt in `05-export/` vorhanden sind:

1. `final.mp4`
2. `thumbnail.png`
3. `captions.srt`
4. `subtitle-script.txt`
5. `youtube-upload.txt` vollständig ohne Platzhalter

Das ist Teil der FINAL-QA.

## MP4 bereits vorhanden: Exportdateien nachträglich erzeugen

Nach dem Rendern muss neben der MP4 auch das gewählte eigenständige `thumbnail.png` in `05-export/` liegen. Dann:

```bash
npm run finalize:youtube -- youtube/08.10.2026-planungsfehlschluss-v1
```

Für weitere Videos jeweils den Projektpfad austauschen.

Das erstellt automatisch die **fehlenden** Textdateien `youtube-upload.txt` (Titel, komplette Beschreibung, Quellen, Tags usw.), `captions.srt` (direkt uploadbare deutsche Untertitel mit echten Zeiten) sowie `subtitle-script.txt` (Sprechertext zeilenweise mit Zeitbereichen wie `00:00–00:04`). Wenn `99-intern/word-timings.json` noch nicht vorliegt, verwendet es die Audiospur der vorhandenen MP4 und Whisper.cpp zur zeitlichen Ausrichtung mit dem finalen Skript (ggf. Modell-Download beim ersten Lauf). So werden **keine Zeiten erfunden**.

Die MP4 und das Thumbnail werden niemals überschrieben. Bei neuer MP4 nach Änderungen im Sprechertext sind Timings mit `--force-timings` neu zu erzeugen; bereits erstellte Captions müssen zuvor bewusst entfernt/gesichert werden. Ein reiner MP4-Export ohne Titel/Beschreibung/Untertitel ist nicht fertig.
