# CHANGE CONTROL LOCK

## Standardzustand: READ ONLY

Jeder neue Chat startet ohne Schreibfreigabe.

Nur lesen/analysieren bei Formulierungen wie:
- analysiere das Repo
- prüfe alles
- finde Bugs/Widersprüche
- ist die Struktur gut?

## Schreibfreigabe

Schreiben ist erlaubt, wenn der Nutzer im aktuellen Chat ausdrücklich eine Änderung verlangt. Die Freigabe gilt nur für den genannten Scope.

Beispiele:
- „erstelle das nächste YouTube-Video“ → nur dieses Projekt + notwendige Projektlisten
- „ändere die Bildwelt“ → Visual-World-/Promptregeln dürfen innerhalb dieses Auftrags geändert werden
- „übertrage das Repo“ → Migrationsarbeiten im genannten Zielrepo sind erlaubt

## Grenzen

- keine ungefragten Neben-Cleanups
- vor Update/Löschung bestehender Dateien aktuellen SHA lesen
- fremde Änderungen nicht überschreiben
- Exporte nicht überschreiben
- bei strukturellen Änderungen relevante Checks ausführen

## Phasenschutz

YouTube:
THEMA + QUELLEN + CLAIM-CHECK → HOOK-/EINSTIEGSPLAN → FINALES SCRIPT → PHASE 1 VISUAL BEATS → PHASE 2 GOOGLE FLOW → PHASE 3 → FINAL-QA.

- Skriptänderung: Hook-Policy + Phase 1 neu prüfen/erstellen
- Hook-/Einstiegsänderung: Kernbegriffs- und frühes Alltagsbeispiel-Timing neu prüfen
- Bildweltänderung: Phase 1 + Phase 2 auf die neue Bildwelt neu ausrichten
- reine Audioänderung: Timings/Phase 3 neu erzeugen

## Google-Flow-Struktur — NICHT ÄNDERN

Pro Video bleibt genau eine zentrale Datei:

`02-google-flow/google-flow-prompt.txt`

Keine Aufteilung in mehrere Master-/Batch-Prompt-Dateien.

## Google-Flow-Ausgabe — HARD LOCK

Verbindlich: `rules/FLOW_OUTPUT_MODE.md`.

- BILD 01 zuerst
- genau 3 getrennte Cover-Kandidaten
- STOP für Nutzerwahl
- Gewinner → `01.png`
- danach 5 Bildnummern pro Batch, solange mindestens 5 übrig sind
- letzter Batch = 1–4 Restbilder
- jede Bildnummer = eigene 16:9-Datei
- akzeptierte Bilder sofort `NN.png`
- alles in einem flachen `03-bilder/`
- keine Batch-Unterordner
- kein Storyboard/Kontaktbogen/Collage/automatisches Video

## YouTube Export — HARD LOCK

Fertiges Upload-Paket:

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

## VISUAL WORLD STATUS — UNDEFINED

Die bisherige Bildwelt wurde auf ausdrücklichen Nutzerwunsch entfernt.

Aktuell gibt es:
- **keine aktive Bildwelt**
- **keine aktive Character-DNA**
- **keine aktive Style-DNA**
- **kein aktives visuelles Referenzpaket**

Bis eine neue Bildwelt ausdrücklich definiert und freigegeben wurde:
- keine neue Google-Flow-Bildproduktion starten
- keinen alten Stil aus bestehenden Videos ableiten
- keine gelöschten Visual-World-Regeln wiederherstellen
- keine früheren Namen/IDs als Default verwenden

Bestehende Video-Projekte bleiben historische Projektartefakte und sind keine Quelle der neuen Bildwelt.

## Weiterhin aktive, bildweltunabhängige Regeln

- `rules/FLOW_OUTPUT_MODE.md`
- `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
- `rules/FLOW_PROMPT_ARCHITECTURE.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/COVER_LOCK.md`
- Script-/Format-/Audio-/Exportregeln
