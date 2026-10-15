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

## PRIORITAET 1 — kontinuierliche Verbesserung innerhalb der Schreibfreigabe

Verbindlicher Verbesserungsprozess: `CONTINUOUS_IMPROVEMENT_P1_V1` aus `rules/GROWTH_LEARNING_LOOP.md`. Nach jedem Video Erkenntnisse, nachvollziehbare Metriken (soweit verfuegbar), Schwaechen, konkrete Folgemassnahmen und deren spaetere Ueberpruefung dokumentieren. Beim naechsten Video offene Erkenntnisse zuerst pruefen. Ohne Messwerte: `NO_DATA`, keine erdachten Zuschauerzahlen oder Wirkungsbehauptungen.

**Wichtig:** Diese Prioritaet ist keine allgemeine Schreibfreigabe. In einem neuen Chat weiter READ ONLY ohne ausdruecklichen Auftrag; bestehende Videos, Bilder, Audio und Exporte nicht stillschweigend bearbeiten. Die feste Bildwelt bleibt unangetastet, sofern kein ausdruecklicher Auftrag vorliegt.

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
THEMA + QUELLEN + CLAIM-CHECK → HOOK-/EINSTIEGSPLAN → bei LONGFORM: STORY-/RETENTION-PLAN → FINALES SCRIPT → SCRIPT-QA → PHASE 1 VISUAL BEATS → PHASE 2 GOOGLE FLOW → PHASE 3 → FINAL-QA.

- Themenwahl: zuerst Topic-Uniqueness-Gate bestehen
- Skriptänderung: Hook-Policy + bei Longform `LONGFORM_STORY_RETENTION_V1` + Phase 1 neu prüfen/erstellen
- Hook-/Einstiegsänderung: Kernbegriffs- und frühes Alltagsbeispiel-Timing neu prüfen
- Neue 6–7-Minuten-Longforms (`LONGFORM_STANDARD_V1`) brauchen vor Phase 1 ein freigegebenes `99-intern/script-plan.json` nach `rules/YOUTUBE_LONGFORM_SCRIPT_QUALITY.md`
- Longform-Skripte dürfen nicht zu einer Kette aus Forschernamen/Jahreszahlen oder vielen kurzen Beispielen werden; Story/Anker/Callback/Takeaway sind Pflicht
- Bildweltänderung: Phase 1 + Phase 2 auf die neue Bildwelt neu ausrichten
- reine Audioänderung: Timings/Phase 3 neu erzeugen

## Google-Flow-Struktur — NICHT ÄNDERN

Pro Video bleibt genau eine zentrale Datei:
`02-google-flow/google-flow-prompt.txt`

## Independent thumbnail and actual scene 01 — THUMBNAIL_SEPARATE_FROM_SCENE01_V1 (binding override)

For every NEW YouTube video, and the opted-in Planungsfehlschluss project:
- Make 3 separate 16:9 thumbnail candidates FIRST. This is the ONLY approval pause.
- Winner goes to `05-export/thumbnail.png` (NOT `01.png`). Delete the other two rejected candidates only AFTER selection.
- The thumbnail is never part of the rendered video or the video-scene numbering; use it only as an illustrator/style reference.
- BILD 01 is the FIRST NORMAL VIDEO SHOT aligned with the first spoken words: no cover text, no thumbnail framing, no forced title.
- Automatically generate BILD 01–05, 06–10 and subsequent FIVE image batches; last remainder 1–4. No further questions or pauses after thumbnail selection.
- After every batch, regenerate failed/missing scenes only, number `01.png` … `NN.png`, keep all scene assets flat in `03-bilder/`.
- Final QA requires a separate `05-export/thumbnail.png`, ALL scene images 01–NN, exact filenames/count, 16:9, no leftover candidates or subfolders, visual-world and planned-text conformity. Incomplete sets are never marked DONE.
- Historical projects not opting in remain unchanged. This new rule OVERRIDES old "01.png is the cover" language wherever it conflicts for opted-in/new projects.

## Google-Flow-Ausgabe — HARD LOCK

**Aktueller Standard: `THUMBNAIL_SEPARATE_FROM_SCENE01_V1`**

- 3 eigenständige Thumbnail-Kandidaten, **nur hier STOP** für Auswahl.
- Gewinner nach `05-export/thumbnail.png`, zwei abgelehnte Kandidaten danach löschen.
- BILD 01 ist **eine eigenständige normale erste Videoszene**, kein Thumbnail und ohne Cover-Text.
- Danach alle Szenen 01–05, 06–10 usw. autonom in 5er-Batches, keine weiteren Freigaben.
- Jeder Batch: pro Szene einzelne 16:9-PNGs prüfen, Fehler einzeln nacharbeiten, richtige `NN.png` sofort in `03-bilder/` legen.
- Finale Dateiprüfung: nur fortlaufende 01.png–NN.png im flachen Bildordner, unabhängig davon `05-export/thumbnail.png`.
- Historische Projekte ohne den neuen Policy-Schalter nicht ungefragt umstellen.

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
`youtube-upload.txt` enthält den kopierbereiten Titel, Beschreibung, Quellen/Tags/Hashtags und weitere Upload-Daten. Nach externem oder direktem MP4-Render ist `npm run finalize:youtube -- <Projektpfad>` Pflicht: Er ergänzt Metadaten und die beiden zeitbasierten Untertiteldateien aus der echten Audiospur, ohne MP4/Thumbnail zu überschreiben.
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
- `rules/SCRIPT_HOOK_LOCK.md`
- `rules/YOUTUBE_LONGFORM_SCRIPT_QUALITY.md`
- Script-/Format-/Audio-/Exportregeln
