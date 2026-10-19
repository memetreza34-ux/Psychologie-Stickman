# CANONICAL RULES — PSYCHOLOGY VIDEO PRODUCTION

## PFLICHT: WOCHENORDNER vor jedem neuen YouTube-Video (YOUTUBE_ISO_WEEK_FOLDERS_V1)

Verbindlich: `rules/YOUTUBE_WEEK_FOLDERS.md`. ZUERST `npm run youtube:week -- TT.MM.JJJJ` ausführen bzw. ISO-Woche Montag–Sonntag errechnen, dann das Videoprojekt **nur** in `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/<TT.MM.JJJJ-thema>/` anlegen. Vorher Themenregister und Wochenprojektordner prüfen. Alle bestehenden Unterordner `01-script` / `02-google-flow` / `03-bilder` / `04-audio` / `05-export` / `99-intern` bleiben unverändert. Die beiden verpflichtenden Phase-1-Direktlinks und `TOPIC_REGISTRY.json` verwenden den *vollständigen* Wochenpfad. Niemals einen neuen flachen Videoordner direkt unter `youtube/` erstellen.

## PRIORITAET 1: kontinuierliche Kanalverbesserung — HARD PROCESS

Binding policy: `CONTINUOUS_IMPROVEMENT_P1_V1` aus `rules/GROWTH_LEARNING_LOOP.md`.

Vor jeder neuen Produktion: alte Erkenntnisse und offene Experimente ansehen, mindestens **eine konkrete Verbesserungshypothese** in `99-intern/learning-review.md` eintragen und bewusst im neuen Video testen. Nach jedem veroeffentlichten Video (48h / 7d / 28d, soweit Kennzahlen vorliegen) YouTube-Studio-Daten in `analytics/performance_snapshots.csv` festhalten, CTR / Retention / Impressionen / Abo-Gewinne mit Kontext diagnostizieren und Folgemassnahmen in `analytics/experiments.csv` und `analytics/channel-learnings.md` dokumentieren. Beim naechsten Review die Wirksamkeit pruefen. Ohne Daten `NO_DATA` statt Behauptungen; fehlende Messwerte blockieren kein neues Video.

Das gilt auch fuer allgemeine Prozessqualitaet (Flow, Script, Audio, Render, Export). Die bestehende Bildwelt und alle inhaltlichen/technischen Hard-Locks bleiben unveraendert; Wachstum ist ein Ziel, keine Garantie.

## Content-first illustrative quality — NEXT VIDEO HARD GATE

Aktualisierte YouTube-Vorlagen ergänzen `STORY_EXPLANATION_PROOF_V1` aus `rules/STORY_EXPLANATION_PROOF.md`: exakte Zitatverbindungen zwischen Erklärung und Anwendung im Skript, dokumentierter Textreview und sichtbare Erklärbeziehungen mit Übernahme in den zugehörigen englischen Flow-Prompt. Die bestehenden Longform-/Bildprüfungen und das Phase-1-Handoff kontrollieren diese Nachweise. Ein Struktur-PASS ist kein Verständlichkeits- oder Wachstumsbeweis.

Policy ID: `CONTENT_FIRST_VISUAL_QA_V2` — `rules/CONTENT_FIRST_VISUAL_QA.md`. Ab neuen Video-Projekten ist vor Google Flow/Phase-1-Fertigmeldung je Szene ein neuer `informationGain`, inhaltlicher `focalSubjectKey`, `settingKey`, `cameraScale`, `visualFunction` und bewusste `alternativeVisualType` inklusive Ablehnungsgrund Pflicht. `SCHEMA_EXPLAINER`, `COMPARE_VISUAL` oder `TEXT_ILLUSTRATION` bei passenden psychologischen Mechanismen und Studien nicht ignorieren. Wiederholungen werden ueber Bildfolgen geprueft, nicht nur ueber Wortanfang/`motifKey`. Bei Fehler neue Bildidee waehlen, nicht Metadaten schoenfaerben. Bestehende `PSYCHOLOGY_STICKMAN_WORLD_V1` unveraendert; genaue deutsche Labels weiterhin nur nach `flowText`. Plan-QA + echte Bildsichtung nach Flow bleiben verpflichtend, keine pauschale automatische Sehgarantie.

## Topic uniqueness — HARD LOCK

Policy ID: `TOPIC_UNIQUENESS_V1`.

Source of truth:
- `TOPIC_REGISTRY.json`
- `rules/TOPIC_UNIQUENESS_LOCK.md`

Before any new YouTube project is created, the proposed core psychological mechanism must be checked against the complete registry and existing YouTube project folders.

**One canonical topic / core mechanism = one YouTube video project.**

Different titles, hooks, examples, thumbnails, languages, versions or `Part 2` do not make an already-used topic new.

If a topic already exists, choose a different topic. A genuinely new topic must be added to `TOPIC_REGISTRY.json` in the same change as its new project.

Historical duplicates are grandfathered only as `LEGACY_DUPLICATE_LOCKED` and may never receive another project.

## VISUAL WORLD STATUS

`ACTIVE`

Binding visual world for new productions:
`rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Policy ID: `PSYCHOLOGY_STICKMAN_WORLD_V1`

## Visual-world core

The channel uses one coherent hand-drawn 2D animated psychology world.

When people appear, they all belong to the same exact stickman species:
- oversized round or softly oval light/white heads
- tiny black oval eyes and minimal expressive faces
- narrow clothed torsos
- very thin dark stick-like arms and legs
- small simple hands and shoes
- organic dark outlines
- soft cel shading
- subtle illustrated texture
- natural clear colors

**Normal cartoon-human anatomy drift is a hard fail.** Clothing, hair, age, role and era may vary; underlying species/anatomy may not.

When several people share one frame, they must visibly share the exact same base head construction, torso scale and limb thickness. Hair/clothing may vary, but mixed stickman + normal-cartoon-human anatomy in one frame is an immediate FAIL.

The world is NOT character-only. Object-focused frames, environments, schemas, comparisons and text-led illustrations are equally valid when they explain the beat better. All forms keep the same illustrator/render language.

## Active process sources

1. `rules/TOPIC_UNIQUENESS_LOCK.md`
2. `rules/YOUTUBE_THEMEN_SYSTEM.md`
3. `rules/PSYCHOLOGY_STICKMAN_WORLD.md`
4. `rules/VISUAL_SEQUENCE_HARDENING.md`
5. `rules/FLOW_OUTPUT_MODE.md`
6. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
7. `rules/FLOW_PROMPT_ARCHITECTURE.md`
8. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
9. `rules/REPRESENTATION_VARIETY_LOCK.md`
10. `rules/COVER_LOCK.md`
11. `rules/TEXT_OVERLAY_LOCK.md`
12. `rules/YOUTUBE_EXPORT_PACKAGE.md`
13. `rules/SCRIPT_HOOK_LOCK.md`
14. `rules/YOUTUBE_LONGFORM_SCRIPT_QUALITY.md`
15. Script-/Format-/Produktionsregeln

## Observable Scene First + Representation First

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → final prompt`

Allowed primary forms:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

People are optional. A full character scene is used only when visible human behavior/interaction is the clearest evidence.

## Visual sequence hardening

Policy ID: `VISUAL_SEQUENCE_HARDENING_V1`.

For new or revised active projects:
- recurring motifs must visibly progress instead of repeating the same object/composition several times
- Phase 1 carries `motifKey`, `visualChangeReason` and `panelCount`
- 3+ adjacent scenes with the same motif key require explicit `motifProgressionJustification`; otherwise redesign
- default maximum is 2 distinct states/panels in one BILD
- 3-/4-panel explainer boards are not accepted as a normal solution
- any unplanned readable text, including English headings or gibberish, is a hard fail
- simple frames should not be held longer than the idea supports; split visual beats when needed

## Sequence / staging QA

Representation variety alone is insufficient. New videos must also avoid repetitive staging.

Review/rewrite when:
- several adjacent frames repeat the same beige/neutral explainer-board look
- several adjacent frames repeat centered objects, circles/arrows or nearly identical camera setups
- several adjacent frames reuse the same story object in effectively the same visual role
- 3+ adjacent explainer-style frames become a flat presentation sequence without strong reason
- a schema depends on tiny figures, many arrows or dense labels
- a single image contains more than 2 explanatory states/panels without exceptional justification
- planned text is too small or dense for phone viewing

When content allows, vary camera distance, focal scale, depth, subject placement, local palette/light, object state and real-world context.

For 10+ scenes, roughly 75%+ `CHARACTER_SCENE` without `characterHeavyJustification` is a QA fail.

Every new active Phase-1 scene should include `representationReason`.

## Phase 1: Direktlinks fuer Google Flow und Sprechertext — HARD HANDOFF

Policy: `PHASE1_TABLET_HANDOFF_LINKS_V1` in `rules/PHASE1_HANDOFF_LINKS.md`.

Nach jeder fertigen Phase 1 muss die finale Antwort **beide getrennten, verifizierten und direkt anklickbaren GitHub-Dateilinks** enthalten: `youtube/<WOCHENORDNER>/<Projekt>/02-google-flow/google-flow-prompt.txt` (ALLE fertigen Bildprompts im einen Master-Prompt) und `youtube/<WOCHENORDNER>/<Projekt>/01-script/script.txt` (vollstaendiges Voice-over). Beide Dateien vor Meldung als `FERTIG` committen und per GitHub-Connector pruefen. Tablet-Zugriff und Kopieren ohne Navigationssuche; keine erfundenen oder uncommitteten Links. Lokale Vorpruefung: `npm run phase1:links -- youtube/<WOCHENORDNER>/<Projekt>`.

## Google Flow

Pro video exactly one:
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

## Separate thumbnail + actual scenes — `THUMBNAIL_SEPARATE_FROM_SCENE01_V1`

The thumbnail is an independent 16:9 file in `05-export/thumbnail.png`, NOT BILD 01.
Choose among 3 standalone candidates; ONLY approval pause; discard losers AFTER choice.
BILD 01 and later are exclusively actual normal illustrated video scenes matching their spoken sections. Start autonomous five-scene batches at 01–05 then 06–10; immediately QA, rename and continue through NN. One flat `03-bilder/` with exactly 01.png–NN.png, no missing/duplicates/extra covers.
Use chosen thumbnail only as visual style reference. New videos use this policy; historical unmarked projects remain unchanged.

## Text

Only explicitly planned German text. Otherwise `ZERO READABLE TEXT`.
Text may be the main subject when wording itself is psychologically relevant, but it must remain large, sparse and mobile-readable.
Any unplanned English/German/gibberish anywhere in a generated frame is a regeneration failure.

## Script

`HOOK_FIRST_EXPLAIN_EARLY_V1` remains active.

For `LONGFORM_STANDARD_V1` (normally 6–7 minutes), `LONGFORM_STORY_RETENTION_V1` is additionally binding.

Longform must be story-first, not citation-first:
- one concrete narrative anchor is introduced early and returns in spoken narration later
- Hook → simple explanation → deeper example/story → selected research → application → nuance → callback/payoff → concise ending
- research is translated into plain language; sources stay available in the description, but the spoken script does not read like a bibliography
- normally no more than 6 individual researcher names and 4 spoken four-digit year mentions
- no more than 2 named research blocks back-to-back
- no more than 3 short micro-examples back-to-back; then synthesize or deepen one example
- at least 2 substantial examples/experiments are developed enough to feel like mini-stories
- a midpoint re-engagement beat and final spoken callback are required
- practical takeaway + sharp final line are required

New longform projects require an approved `99-intern/script-plan.json` and must pass `scripts/check-longform-script-quality.mjs` before Phase 1.

## Export

```text
05-export/
├── final.mp4
├── thumbnail.png
├── captions.srt
├── subtitle-script.txt
└── youtube-upload.txt
```

`captions.srt` is the final German YouTube subtitle file generated from the final voice-over timings and is ready for direct YouTube upload.
`subtitle-script.txt` is the human-readable timestamped transcript using the same final timings.
`youtube-upload.txt` contains the final title, full description and the remaining copy-ready upload metadata.
No separate `captions/`, `subtitles/` or `untertitel/` folders in the normal YouTube workflow.
Internal timing data and `99-intern/youtube-upload.json` stay in `99-intern/`.

## Existing projects

Existing projects remain historical project states unless the user explicitly requests a migration/improvement.
