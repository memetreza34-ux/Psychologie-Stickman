# Planungsfehlschluss — Longform v1

## Status
READY_FOR_SEPARATE_THUMBNAIL_AND_SCENE01_REGENERATION

## Neues kanonisches Thema
**Planungsfehlschluss / Planning Fallacy**
Mechanismus: Unterschätzung eigener Aufgabendauern durch stark planbasierte Zukunftsszenarien gegenüber empirischen Vergleichswerten.
Nicht dasselbe wie `Prokrastination` (Aufschieben von Aufgaben). Registry-Prüfung gegen alle bisherigen Topics und YouTube-Projektordner abgeschlossen.

## Titel
Warum du ständig unterschätzt, wie lange etwas dauert – Planungsfehlschluss

## Cover
NUR 2 STUNDEN?
Drei getrennte 16:9 Alternativen für das separat gespeicherte Thumbnail. Nach Auswahl STOP -> Sieger `05-export/thumbnail.png` (nie als erstes Video-Bild), zwei anderen löschen.

## Script
- Ziel: 6–7 Minuten
- Wortzahl: 966
- Visual Beats: 72
- Struktur: Hook und Begriff in 01–03; Samstag-Regal als Anfangsbeispiel; Studententhesen als Quellenevidenz; Innen-/Außenansicht; Umzugs-Midpoint; realistischer Referenzvergleich; Videoschnitt als zweites ausführliches Beispiel; nuancierter Schluss und gesprochener Rückbezug aufs Regal.
- Style: Story-first, gut überprüfte Forschung, keine Bibliografie im Sprechertext.
- Quellen: `99-intern/sources.md`
- `99-intern/script-plan.json` = APPROVED.

## Visuelle Welt
`PSYCHOLOGY_STICKMAN_WORLD_V1`, `REPRESENTATION_VARIETY_V1`, `VISUAL_SEQUENCE_HARDENING_V1`.
Szenen-Mix: CHARACTER_SCENE 14, TEXT_ILLUSTRATION 7, COMPARE_VISUAL 11, ENVIRONMENT_SCENE 21, OBJECT_FOCUS 19.
Exact German text only on BILDs 02, 16, 17, 24, 27, 64, 72; zero readable text elsewhere. Coherent real rooms, tools, university, moving boxes, editing desk. No beige-board default or species drift.

## Flow
Eine zentrale `02-google-flow/google-flow-prompt.txt`.
THUMBNAIL-Auswahl separat, dann 01–05, 06–10 ... 66–70, 71–72 als eigenständige Video-Bilder in `03-bilder/` (flach).

## Noch ausstehend
Cover-Auswahl, Google-Flow-Bilder, finales Voice-over, `final.mp4`, `thumbnail.png`, `captions.srt`, `subtitle-script.txt`, `youtube-upload.txt`.
Nicht als fertiger Render ausgeben.

## Finaler Export
```text
05-export/
├── final.mp4
├── thumbnail.png
├── captions.srt
├── subtitle-script.txt
└── youtube-upload.txt
```

Veröffentlichungsdaten liegen vorbereitet in `99-intern/youtube-upload.json`; Finale SRT-Zeiten erst aus final verarbeitetem Voice-over erzeugen.

## Neuer verbindlicher Ablauf
Policy: `THUMBNAIL_SEPARATE_FROM_SCENE01_V1`. Drei separate Cover zur Auswahl; Gewinner nach `05-export/thumbnail.png`. Danach eigenständige normale Szene 01 und alle BILDs 01–72 in 5er-Batches automatisch; Batchfolge 01–05, 06–10 ... 66–70, 71–72. Niemals Thumbnail in der Videotimeline. Vollständige Schluss-QA. Das bereits lokal erzeugte `planungsfehlschluss.mp4` wird nicht automatisch überschrieben; für neuen ersten Shot muss BILD 01 regeneriert und Video neu gerendert werden. Titel-/Beschreibungsdatei und zeitgenaue Untertitel werden aus den Produktionsmetadaten und finaler Audiospur erzeugt.

## Nach bestehendem MP4-Render: Export fertigstellen
Wenn `planungsfehlschluss.mp4` bereits in `05-export/` liegt, nicht erneut nur MP4 rendern. Erst separates `thumbnail.png` in `05-export/` ablegen und danach aus dem Repo-Hauptverzeichnis ausführen:

```bash
npm run finalize:youtube -- youtube/08.10.2026-planungsfehlschluss-v1
```

Das befüllt `05-export/youtube-upload.txt` mit YouTube-Titel/Beschreibung/Tags/Quellen, sowie `captions.srt` für den direkten YouTube-Untertitel-Upload und `subtitle-script.txt` zum 1:1-Kopieren des vollständigen Texts mit echten Zeitmarken. Nur `mp4` ist kein kompletter Export. Ohne `thumbnail.png` oder Audiozeitabgleich Status weiterhin unvollständig.

## Bereits aus hochgeladenem MP4 abgeleitete Untertitel

Die Dateien `05-export/captions.srt` und `05-export/subtitle-script.txt` sind für das **bereits hochgeladene 6:08-MP4** aus den tatsächlich erkannten 71 Bildwechseln auf die 72 Script-Szenen abgebildet worden. Jeder Szenenbeginn/-schluss ist video-synchron; Unterteilungen innerhalb einer Szene sind nach Textlänge interpoliert, **nicht wortgenau transkribiert**. Vor YouTube-Upload kurz gegenhören; die genaue Methode steht in `99-intern/subtitle-timing-provenance.json`. Bei einem veränderten oder neu gerenderten Video müssen diese Untertitel nach einem erneuten Audioabgleich aktualisiert werden; nicht blind übernehmen.
