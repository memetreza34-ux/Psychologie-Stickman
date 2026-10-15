## PFLICHT: WOCHENORDNER vor jedem neuen YouTube-Video (YOUTUBE_ISO_WEEK_FOLDERS_V1)

Verbindlich: `rules/YOUTUBE_WEEK_FOLDERS.md`. ZUERST `npm run youtube:week -- TT.MM.JJJJ` ausführen bzw. ISO-Woche Montag–Sonntag errechnen, dann das Videoprojekt **nur** in `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/<TT.MM.JJJJ-thema>/` anlegen. Vorher Themenregister und Wochenprojektordner prüfen. Alle bestehenden Unterordner `01-script` / `02-google-flow` / `03-bilder` / `04-audio` / `05-export` / `99-intern` bleiben unverändert. Die beiden verpflichtenden Phase-1-Direktlinks und `TOPIC_REGISTRY.json` verwenden den *vollständigen* Wochenpfad. Niemals einen neuen flachen Videoordner direkt unter `youtube/` erstellen.

# PROJECT BRAIN

## Oberste operative Prioritaet: systematische Verbesserung nach JEDEM Video

Policy: `CONTINUOUS_IMPROVEMENT_P1_V1` — `rules/GROWTH_LEARNING_LOOP.md`.

Kopfarium lernt aus jedem neuen Video und jeder Produktion: alte Erkenntnisse lesen -> eine messbare Hypothese planen -> im naechsten Video bewusst umsetzen -> nach 48h, 7d und 28d YouTube-Studio-Kennzahlen erfassen, sofern verfuegbar -> Ursachen mit Unsicherheit diagnostizieren -> Experiment und dauerhafte Lernpunkte dokumentieren -> beim Folgevideo Erfolg kontrollieren. Auch Themen, Titel, Thumbnail, Hook, Retention, Abos, Workflowfehler und Produktionszeit beobachten. Ohne echte Daten keine Erfolgsmeldung erfinden.

Referenzdateien: `analytics/channel-learnings.md`, `analytics/experiments.csv`, `analytics/performance_snapshots.csv`, `99-intern/learning-review.md` je neuem Video. Keine automatische Umgestaltung der freigegebenen Bildwelt; bestehende Hard-Locks weiterhin bindend.

## Kanal

Deutschsprachige YouTube-Videos zu Psychologie und menschlichem Verhalten.

## Topic memory — HARD LOCK

Policy: `TOPIC_UNIQUENESS_V1`.

Canonical used-topic memory: `TOPIC_REGISTRY.json`.

Before choosing any new YouTube topic:
1. read `TOPIC_REGISTRY.json`
2. compare German/English synonyms and the underlying psychological mechanism
3. inspect existing `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/TT.MM.JJJJ-*` projects
4. reject the idea if that core topic has already been used

**Never create a second YouTube video for the same canonical topic/mechanism.** A new title, example, hook, version or Part 2 does not reset topic usage.

A truly new topic is registered in the same change as the project. Existing historical duplicates are frozen as `LEGACY_DUPLICATE_LOCKED` and cannot receive another video.

## VISUAL WORLD STATUS

**ACTIVE**

Binding source:
`rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Policy ID: `PSYCHOLOGY_STICKMAN_WORLD_V1`

## Channel visual identity

One coherent hand-drawn 2D animated psychology universe.

When people appear, they share one exact stickman species:
- oversized round / softly oval light heads
- tiny black oval eyes and minimal expressive faces
- narrow clothed torsos
- very thin dark stick-like arms and legs
- small simple hands and shoes
- organic dark outlines
- soft cel shading
- subtle drawn texture
- natural clear colors

No permanent mascot. No forced recurring Character A/B cast.

**Species lock:** role, clothing, hair and era may change, but a person may never drift into a normal cartoon-human body. Any such frame is regenerated.

**Same-frame species lock:** all visible people in one frame share the same base head construction, torso scale and thin-limb anatomy. Hair/clothing sits on top of that species; it never replaces it with a normal human face/body.

## Representation First

Choose the clearest visual form before character design:

`CHARACTER_SCENE | OBJECT_FOCUS | ENVIRONMENT_SCENE | SCHEMA_EXPLAINER | COMPARE_VISUAL | TEXT_ILLUSTRATION`

People are optional. Use full characters when human behavior/interaction is the evidence; otherwise let the object, place, wording, comparison or mechanism carry the frame.

For 10+ scenes, roughly 75%+ full character scenes require explicit `characterHeavyJustification`.

## Visual sequence hardening

Binding source: `rules/VISUAL_SEQUENCE_HARDENING.md`.
Policy: `VISUAL_SEQUENCE_HARDENING_V1`.

New/revised active videos must also pass:
- motif progression: recurring objects must change role/state/context instead of repeating the same shot
- `motifKey`, `visualChangeReason` and `panelCount` in Phase 1
- 3+ adjacent identical motif keys only with explicit continuity justification
- max 2 distinct visual states/panels per image by default
- no 3-/4-panel mini-storyboards as explanatory shortcuts
- zero unplanned readable text, including English headings and pseudo-text
- static-hold review: simple visuals should be split into another concrete beat when the spoken segment is too long

## Staging First, not just representation labels

A video should not become a chain of flat beige explainer cards even when scene types differ.

Review adjacent scenes for:
- camera distance
- focal scale
- subject placement
- foreground/middle/background depth
- local palette/light
- real environment vs flat graphic board
- recurring object/motif state

Avoid repeated centered-object + arrows/circles layouts. Prefer real illustrated contexts when they explain the beat better.

## Mobile readability

Every image must work at phone size:
- one dominant focal idea
- large main subject
- sparse readable text
- at most 2 distinct states/panels by default
- schemas preferably max 3 major labels/branches
- no tiny crowds, dense arrows or many mini-panels

## Dark psychology

Dark scenes should feel tense through observable behavior, spatial relations, objects, environment and motivated light rather than horror clichés.

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

## Separate thumbnail + first real scene — `THUMBNAIL_SEPARATE_FROM_SCENE01_V1`

Thumbnail gets exactly 3 distinct alternatives; ONLY stop for user choice, selected `05-export/thumbnail.png`, both losers deleted. Reference anchors illustration finish and stickman anatomy only. The thumbnail never enters MP4 or the 01–NN series.

BILD 01 is a normal video opening that illustrates the first spoken hook, not the cover. Next images auto-run in groups of 5 beginning at 01–05 without any more approval pauses; QA/renaming into the flat `03-bilder/`; final scene count, 16:9, text, species, no missing/extra frames; separate thumbnail.

Manual/external MP4 renders must also run `npm run finalize:youtube -- <project>` so final `youtube-upload.txt`, `captions.srt`, `subtitle-script.txt` exist; only real timed word/cut information is accepted.

## Tablet-Handoff nach jeder fertigen Phase 1

Policy `PHASE1_TABLET_HANDOFF_LINKS_V1` aus `rules/PHASE1_HANDOFF_LINKS.md`. Nutzer arbeitet fuer Google Flow und Sprechertext auf dem Tablet. Deshalb in der **gleichen Antwort wie die Fertigmeldung** automatisch zwei GitHub-Direktlinks geben: `02-google-flow/google-flow-prompt.txt` (alle einzelnen BILD-Prompts im Master) und `01-script/script.txt` (finales Skript). Vorher beide konkreten Dateien in GitHub committen und Verfuegbarkeit pruefen, sonst nicht fertig behaupten. Kein allgemeiner Repository-Link als Ersatz.

## What remains fixed operationally

- Topic uniqueness preflight before project creation
- Psychologie-/Human-Behavior-Themen
- Script/Hook
- Visual Beats
- `OBSERVABLE_SCENE_FIRST_V1`
- `REPRESENTATION_VARIETY_V1`
- `VISUAL_SEQUENCE_HARDENING_V1`
- one central `02-google-flow/google-flow-prompt.txt`
- 3 covers first
- user chooses cover
- then finish all scenes in 5-image batches automatically, with no human approval pauses; on failures regenerate only affected images and continue
- separate 16:9 images
- `NN.png`
- one flat `03-bilder/`; final QA validates 01–NN completeness, correct filenames/16:9, no cover losers or subfolders before reporting DONE
- Audio/Remotion/Export

## YouTube export package

Final upload files stay together in one flat `05-export/`:
- `final.mp4`
- `thumbnail.png`
- `captions.srt`
- `subtitle-script.txt`
- `youtube-upload.txt`

`captions.srt` is the direct-upload German subtitle file synced to the final processed voice-over. `subtitle-script.txt` mirrors those timings in a readable copy format such as `00:00–00:05`. `youtube-upload.txt` carries the final title and full description. Do not create separate caption/subtitle folders; internal timing JSON and `youtube-upload.json` stay in `99-intern/`.

## Longform script identity

Binding source: `rules/YOUTUBE_LONGFORM_SCRIPT_QUALITY.md`.
Policy: `LONGFORM_STORY_RETENTION_V1`.

For regular 6–7 minute videos:
- research quality stays high, but the narration is built around viewer experience and story
- one opening situation/conflict acts as a narrative spine and returns in the spoken script in the final third
- do not stack researcher names, years and study summaries as if reading a school report
- prefer a few strong studies/examples over many shallow ones
- after at most 3 short examples, synthesize, deepen or return to the main story
- use a midpoint re-engagement beat so the middle does not flatten
- sources and extra citation detail belong in `youtube-upload.txt`/description, not all in the voice-over
- the ending pays off the opening and finishes quickly after the strongest conclusion

New `LONGFORM_STANDARD_V1` projects must carry an approved `99-intern/script-plan.json` and pass the longform script QA before visual planning.

## Observable Scene First

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → final prompt`

## Production rule

New videos automatically use the topic-uniqueness gate, active visual world, representation-first gate, strict same-frame species lock, motif progression, max-two-state panel rule, staging-diversity review, zero-accidental-text rule and mobile-readability review. New longforms additionally use `LONGFORM_STORY_RETENTION_V1`.
Historical projects are not retroactively migrated unless explicitly requested.
