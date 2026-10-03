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

```text
05-export/
├── final.mp4
├── thumbnail.png
├── captions.srt
└── youtube-upload.txt
```

`captions.srt` ist die finale deutsche YouTube-Untertiteldatei und liegt direkt im flachen `05-export/`.
Keine zusätzlichen `captions/`, `subtitles/` oder `untertitel/`-Ordner im normalen YouTube-Workflow.
Interne Wort-/Timing-Daten bleiben in `99-intern/` und gehören nicht in den Export.

## VISUAL WORLD STATUS — ACTIVE

Active world: `rules/PSYCHOLOGY_STICKMAN_WORLD.md`
Policy ID: `PSYCHOLOGY_STICKMAN_WORLD_V1`

### Species lock — HARD

Every visible person must keep the exact approved stickman construction. Clothing, hair, role and era may vary, but normal cartoon-human anatomy is never accepted. Drifted frames must be regenerated.

### Representation First — HARD

Choose first:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

People are optional. A person may not be added merely because the channel uses Stickmen or the narration mentions a person.

At 10+ scenes, roughly 75%+ `CHARACTER_SCENE` without `characterHeavyJustification` is a QA fail.

### Staging diversity — HARD REVIEW

Do not accept a sequence that repeatedly falls back to flat beige/neutral explainer boards, centered objects, circles/arrows or near-identical camera setups.

Three or more adjacent explainer-style frames must be reviewed for richer environment/object/camera alternatives unless the content genuinely requires the sequence.

### Mobile readability — HARD REVIEW

Reject/rewrite when the idea depends on tiny figures, small text, dense arrow networks, many mini-panels or several competing focal points. Schemas should normally stay to one mechanism and preferably no more than 3 major labels/branches.

Existing video projects remain historical artifacts unless the user explicitly requests a concrete migration/improvement.

## Weiterhin aktive Prozessregeln

- `rules/FLOW_OUTPUT_MODE.md`
- `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
- `rules/FLOW_PROMPT_ARCHITECTURE.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/REPRESENTATION_VARIETY_LOCK.md`
- `rules/COVER_LOCK.md`
- Script-/Format-/Audio-/Exportregeln
