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

## Topic uniqueness — HARD LOCK

Policy: `TOPIC_UNIQUENESS_V1`.

Vor JEDEM neuen YouTube-Video zuerst lesen und prüfen:
- `TOPIC_REGISTRY.json`
- `rules/TOPIC_UNIQUENESS_LOCK.md`
- vorhandene `youtube/TT.MM.JJJJ-*` Projektordner

**Ein kanonisches Thema / ein psychologischer Kernmechanismus darf nur einmal als YouTube-Video-Projekt existieren.**

Ein anderer Titel, Hook, Beispiel, Thumbnail, visueller Winkel, `v2`, `Part 2`, deutsche/englische Bezeichnung oder andere Verpackung macht dasselbe Kernthema NICHT neu.

Wenn derselbe Kernmechanismus bereits im Register steht: STOP und ein anderes Thema wählen.

Bei einem wirklich neuen Thema muss der neue Eintrag in `TOPIC_REGISTRY.json` im selben Change/Commit wie das neue Video-Projekt angelegt werden.

Historische Duplikate bleiben bestehen, sind aber als `LEGACY_DUPLICATE_LOCKED` eingefroren. Sie erlauben kein weiteres Video zu diesem Thema.

## Phasenschutz

YouTube:
THEMA + QUELLEN + CLAIM-CHECK → HOOK-/EINSTIEGSPLAN → FINALES SCRIPT → PHASE 1 VISUAL BEATS → PHASE 2 GOOGLE FLOW → PHASE 3 → FINAL-QA.

- Themenwahl: zuerst Topic-Uniqueness-Gate bestehen
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
├── subtitle-script.txt
└── youtube-upload.txt
```

`captions.srt` ist die finale deutsche YouTube-Untertiteldatei für den direkten Upload.
`subtitle-script.txt` enthält denselben finalen Sprechertext zusätzlich als gut lesbare Zeitbereiche (`00:00–00:05`) zum Kopieren/Prüfen.
`youtube-upload.txt` enthält mindestens den finalen YouTube-Titel und die komplette Beschreibung sowie die übrigen Upload-Daten.
Keine zusätzlichen `captions/`, `subtitles/` oder `untertitel/`-Ordner im normalen YouTube-Workflow.
Interne Wort-/Timing-Daten und die redaktionelle Quelle `99-intern/youtube-upload.json` bleiben intern.

## VISUAL WORLD STATUS — ACTIVE

Active world: `rules/PSYCHOLOGY_STICKMAN_WORLD.md`
Policy ID: `PSYCHOLOGY_STICKMAN_WORLD_V1`

### Species lock — HARD

Every visible person must keep the exact approved stickman construction. Clothing, hair, role and era may vary, but normal cartoon-human anatomy is never accepted. Drifted frames must be regenerated.

**Same-frame lock:** If several people appear together, they must all share the identical light/white base-head construction, torso scale and thin-limb anatomy. Hair and clothing may differ but may not turn one figure into a normal cartoon human while another remains a stickman. Mixed species in one frame = FAIL.

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

### Visual sequence hardening — HARD

Policy: `VISUAL_SEQUENCE_HARDENING_V1` from `rules/VISUAL_SEQUENCE_HARDENING.md`.

- a recurring object may return, but 3+ adjacent scenes may not repeat effectively the same motif/composition without explicit continuity justification
- every revised/new active plan using this policy carries `motifKey`, `visualChangeReason` and `panelCount`
- default maximum = 2 distinct visible states/panels in one BILD
- 3-part/4-part explainer boards are redesigned into separate beats, a single coherent physical scene or a two-state comparison
- unplanned readable English/German/gibberish is a hard fail
- simple static frames must not be stretched beyond what the visual idea can support; split the visual beat instead of relying on decorative motion

### Staging diversity — HARD REVIEW

Do not accept a sequence that repeatedly falls back to flat beige/neutral explainer boards, centered objects, circles/arrows or near-identical camera setups.

Three or more adjacent explainer-style frames must be reviewed for richer environment/object/camera alternatives unless the content genuinely requires the sequence.

### Mobile readability — HARD REVIEW

Reject/rewrite when the idea depends on tiny figures, small text, dense arrow networks, many mini-panels or several competing focal points. Schemas should normally stay to one mechanism and preferably no more than 3 major labels/branches.

Existing video projects remain historical artifacts unless the user explicitly requests a concrete migration/improvement.

## Weiterhin aktive Prozessregeln

- `rules/TOPIC_UNIQUENESS_LOCK.md`
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/PSYCHOLOGY_STICKMAN_WORLD.md`
- `rules/VISUAL_SEQUENCE_HARDENING.md`
- `rules/FLOW_OUTPUT_MODE.md`
- `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
- `rules/FLOW_PROMPT_ARCHITECTURE.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/REPRESENTATION_VARIETY_LOCK.md`
- `rules/COVER_LOCK.md`
- Script-/Format-/Audio-/Exportregeln
