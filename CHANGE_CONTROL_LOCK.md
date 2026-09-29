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
- „ändere die Bildwelt“ → Style-/Promptregeln dürfen innerhalb dieses Auftrags geändert werden
- „übertrage das Repo“ → Migrationsarbeiten im genannten Zielrepo sind erlaubt

## Grenzen

- keine ungefragten Neben-Cleanups
- vor Update bestehender Datei aktuellen SHA lesen
- fremde Änderungen nicht überschreiben
- Exporte nicht überschreiben
- bei struktureller Änderung relevante Checks ausführen

## Phasenschutz

YouTube:
THEMA + QUELLEN + CLAIM-CHECK → HOOK-/EINSTIEGSPLAN → FINALES SCRIPT → PHASE 1 VISUAL BEATS → MOOD-/FARBPLAN → PHASE 2 GOOGLE FLOW → PHASE 3 → FINAL-QA.

- Skriptänderung: Hook-Policy + Phase 1 neu prüfen/erstellen
- Hook-/Einstiegsänderung: Kernbegriffs- und frühes Alltagsbeispiel-Timing neu prüfen
- Bildweltänderung: Mood-/Farbplan + konkrete visuelle Phase-1-Aufgaben + Phase 2 neu erzeugen
- Mood-/Palette-Änderung: betroffene Flow-Bilder auf Konsistenz neu prüfen
- reine Audioänderung: Timings/Phase 3 neu erzeugen

## Google-Flow-Struktur — NICHT ÄNDERN

Pro Video bleibt die bestehende Struktur verbindlich:

`02-google-flow/google-flow-prompt.txt`

Diese **eine Datei enthält alle Szenen des Videos** zusammen mit den globalen Flow-/Bildwelt-Regeln.

Nicht in mehrere Master-Prompt-Dateien oder Batch-Prompt-Dateien aufteilen. Batches betreffen nur die Bildgenerierung, nicht die Dateistruktur.

## Google-Flow-Ausgabe — HARD LOCK FÜR NEUE VIDEOS

Verbindliche Detailregel: `rules/FLOW_OUTPUT_MODE.md`.

Der Masterprompt erzeugt finale **Einzelbilder**, kein Storyboard und kein automatisch gebautes Video.

Für NEUE YouTube-Projekte:
- Scene 01 zuerst
- genau 3 getrennte Scene-01-Cover-Kandidaten
- STOP für Nutzerfreigabe
- ein Gewinner wird sofort `01.png`
- danach immer 5 Szenennummern pro Batch, solange mindestens 5 Szenen übrig sind
- letzter Batch = verbleibende 1–4 Szenen
- der komplette 5er-Batch wird als ein Batch-Schritt erzeugt, nicht absichtlich Bild für Bild
- jede Szenennummer = eine eigene 16:9-Bilddatei
- jedes akzeptierte Bild sofort passend `NN.png` umbenennen
- alle akzeptierten Bilder zusammen in genau einem flachen Ordner `03-bilder/` sammeln
- keine Batch-Unterordner
- nach erfolgreicher interner QA automatisch mit dem nächsten 5er-Batch fortfahren
- nur fehlerhafte Bilder einzeln regenerieren
- niemals mehrere Szenennummern in einem Storyboard, Kontaktbogen, Panel-Grid oder einer Collage zusammenfassen
- Flow niemals auffordern, aus den Szenen direkt ein Video zu bauen

Ein `SPLIT`/`CONTRAST`/`MONTAGE` innerhalb EINER Szene bleibt erlaubt, wenn alle Teile denselben gesprochenen Beat erklären.

**Bestandsschutz:** Diese V2-Regel gilt nur für zukünftige/neue Videos. Bereits vorhandene `youtube/...` Projekte werden nicht automatisch angepasst. Migration nur auf ausdrücklichen Nutzerwunsch für das konkrete Projekt.

## YouTube Export — HARD LOCK

Für neue fertige YouTube-Projekte ist `05-export/` ein vollständiges Upload-Paket:

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

`youtube-upload.txt` enthält gesammelt alle kopierbaren Upload-Daten: Titel, Beschreibung/Caption, Quellen/Links, Kapitel falls sinnvoll, Tags, Hashtags, angehefteten Kommentar, bereinigten Sprechertext/Captions und Video-Daten.

Keine Aufteilung in separate `title.txt`, `description.txt`, `tags.txt` oder `chapters.txt` für den normalen Workflow.

Verbindliche Detailregel: `rules/YOUTUBE_EXPORT_PACKAGE.md`.

## Aktive Visual-World-Sperre

Verbindliche Quellen:
1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/YOUTUBE_STYLE_LOCK.md`
6. `rules/IMAGE_REFERENCE_LOCK.md`

Aktueller Standard:
**Cinematic Human Behavior World v2 — `CINEMATIC_HUMAN_BEHAVIOR_V2` + `STYLIZED_STICKMAN_CAST_V2` + `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`.**

Figuren sind mature/adult editorial Stickmen, nicht cute/chibi/mascot. Normale Szenen benutzen eine reiche glaubwürdige Bildwelt statt leerem Creme-Hintergrund als Standard.

Der verbindliche Script-Einstieg für neue YouTube-Projekte bleibt:
**`HOOK_FIRST_EXPLAIN_EARLY_V1`**.

## Retired

Folgende Standards dürfen neue Produktionen nicht stillschweigend überschreiben:
- Universal Editorial Stickman World v1.3
- Minimal Editorial Stickman v2
- Cinematic Illustrated Psychology World v1

Historische Projekte dürfen alte Metadaten behalten, aber neue Regeln/Prompts dürfen sie nicht kopieren.
