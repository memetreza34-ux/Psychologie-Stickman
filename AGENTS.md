## PFLICHT: WOCHENORDNER vor jedem neuen YouTube-Video (YOUTUBE_ISO_WEEK_FOLDERS_V1)

Verbindlich: `rules/YOUTUBE_WEEK_FOLDERS.md`. ZUERST `npm run youtube:week -- TT.MM.JJJJ` ausführen bzw. ISO-Woche Montag–Sonntag errechnen, dann das Videoprojekt **nur** in `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/<TT.MM.JJJJ-thema>/` anlegen. Vorher Themenregister und Wochenprojektordner prüfen. Alle bestehenden Unterordner `01-script` / `02-google-flow` / `03-bilder` / `04-audio` / `05-export` / `99-intern` bleiben unverändert. Die beiden verpflichtenden Phase-1-Direktlinks und `TOPIC_REGISTRY.json` verwenden den *vollständigen* Wochenpfad. Niemals einen neuen flachen Videoordner direkt unter `youtube/` erstellen.

# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Schreiben nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## PRIORITAET 1 — nach jedem Video messbar besser werden (HARD PROCESS)

`CONTINUOUS_IMPROVEMENT_P1_V1` aus `rules/GROWTH_LEARNING_LOOP.md` ist die hoechste operative Optimierungsprioritaet fuer Kopfarium. Vor jedem neuen Video zuerst die letzten Erkenntnisse/Experimente pruefen, mindestens eine konkrete Verbesserungshypothese mit messbarem Signal in `99-intern/learning-review.md` dokumentieren und im Folgevideo anwenden. Nach jedem Upload (soweit Daten vorliegen) Messungen nach etwa 48h, 7d und 28d, Ursachenanalyse, naechste Massnahme und spaetere Erfolgskontrolle dokumentieren. Fehlende Analytics ehrlich als NO_DATA markieren und nicht zum Produktionsblocker machen. Auch jeden Flow-/Audio-/Renderfehler als Lernchance nachverfolgen.

Keine Erfolgsgarantien, keine erfundenen Metriken. Die aktive Bildwelt, Topic-Uniqueness und Change-Control bleiben unveraendert bindend.

## Danach lesen

1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `TOPIC_REGISTRY.json`
4. `rules/TOPIC_UNIQUENESS_LOCK.md`
5. `rules/YOUTUBE_THEMEN_SYSTEM.md`
6. `rules/PSYCHOLOGY_STICKMAN_WORLD.md`
7. `rules/VISUAL_SEQUENCE_HARDENING.md`
8. `rules/FLOW_OUTPUT_MODE.md`
9. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
10. `rules/FLOW_PROMPT_ARCHITECTURE.md`
11. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
12. `rules/REPRESENTATION_VARIETY_LOCK.md`
13. `rules/COVER_LOCK.md`
14. `rules/TEXT_OVERLAY_LOCK.md`
15. `rules/SCRIPT_HOOK_LOCK.md`
16. `rules/YOUTUBE_LONGFORM_SCRIPT_QUALITY.md`
17. relevante Script-/Format-/Audio-/Exportregeln

## Kanal

Nische: **Psychologie & menschliches Verhalten**.

## Themenwahl — HARD PRECHECK

Vor JEDEM neuen YouTube-Video muss `TOPIC_UNIQUENESS_V1` bestanden werden.

Ablauf:
1. vorgeschlagenen Kernmechanismus in einem Satz bestimmen
2. `TOPIC_REGISTRY.json` vollständig prüfen
3. deutsche/englische Synonyme und alternative Schreibweisen prüfen
4. vorhandene `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/TT.MM.JJJJ-*` Ordner prüfen
5. wenn derselbe Kernmechanismus bereits verwendet wurde: KEIN neues Projekt anlegen, anderes Thema wählen
6. bei wirklich neuem Thema Registry-Eintrag + Projekt im selben Change erstellen

Ein anderer Titel, Hook, Beispiel, Thumbnail, `v2`, `Part 2` oder eine andere Verpackung macht dasselbe Thema nicht neu.

Bestehende historische Duplikate sind `LEGACY_DUPLICATE_LOCKED` und dürfen niemals um ein weiteres Projekt ergänzt werden.

## Longform Script — HARD PRECHECK

Für jedes neue Projekt mit `productionMode: "LONGFORM_STANDARD_V1"` gilt zusätzlich `LONGFORM_STORY_RETENTION_V1`.

Vor Phase 1:
1. `99-intern/script-plan.json` aus der Vorlage anlegen/ausfüllen
2. Status auf `APPROVED` erst setzen, wenn Hook, Story-Spine, Research-Dichte, Beispiele, Midpoint und Schluss geprüft wurden
3. `node scripts/check-longform-script-quality.mjs` muss PASS liefern

HARD FAIL / neu schreiben, wenn:
- das Skript hauptsächlich wie Unterricht/Bibliografie klingt
- zu viele Forschernamen/Jahreszahlen gesprochen werden
- mehr als 2 benannte Forschungsblöcke direkt hintereinander stehen
- mehr als 3 kurze Alltagsbeispiele hintereinander kommen, ohne Synthese oder Vertiefung
- kein starkes Hauptbeispiel/keine Story durch das Video trägt
- der Einstieg später im gesprochenen Text nicht mehr aufgegriffen wird
- im Mittelteil kein Re-Engagement/Pattern-Interrupt vorhanden ist
- der Schluss nur zusammenfasst, aber den Einstieg nicht auszahlt
- nach der stärksten Schlussaussage unnötig weitergeredet wird

Research bleibt sauber und belegt; nur die gesprochene Verpackung wird story-first. Detailquellen gehören bevorzugt in die Beschreibung.

## VISUAL WORLD STATUS — ACTIVE

Binding visual world: `PSYCHOLOGY_STICKMAN_WORLD_V1`
Source: `rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Kern:
- hochwertige handgezeichnete 2D-Animationswelt
- exakt gleiche Stickman-Spezies für alle sichtbaren Menschen
- übergroße runde/soft-ovale helle Köpfe
- winzige schwarze ovale Augen
- schmale bekleidete Torsi
- sehr dünne dunkle Stickman-Arme/-Beine
- organische Outlines, weiches Cel-Shading, dezente Zeichentextur
- Kleidung, Haare, Rolle, Epoche, Ort, Licht und Farbe passen sich dem Script an

**Normaler Cartoon-Mensch = FAIL.** Historische, Büro-, Labor- oder Dark-Psychology-Szenen haben keine Ausnahme. Drifted frames regenerieren.

**Same-frame lock:** Wenn mehrere Menschen in einem Bild sind, müssen alle dieselbe helle/weiße Basiskopf-Form, dieselbe Torso-Skala und dieselbe dünne Stickman-Anatomie besitzen. Haare/Kleidung ändern nicht die Spezies. Gemischter Cartoon-Mensch + Stickman = sofort regenerieren.

## Visual Director

`OBSERVABLE_SCENE_FIRST_V1` + `REPRESENTATION_VARIETY_V1` + `VISUAL_SEQUENCE_HARDENING_V1`:

```text
gesprochene Bedeutung
→ Viewer Takeaway
→ Observable Evidence
→ beste Representation
→ konkrete Komposition
→ Motif-/Panel-QA
→ finaler Flow-Prompt
```

People are one tool, not the default.

Allowed:
`CHARACTER_SCENE | OBJECT_FOCUS | ENVIRONMENT_SCENE | SCHEMA_EXPLAINER | COMPARE_VISUAL | TEXT_ILLUSTRATION`

## Sequence QA — HARD

Nicht nur Representation-Typen zählen. Prüfe die tatsächliche Bildfolge.

Jede neue/revidierte aktive Phase-1-Szene trägt:
- `motifKey`
- `visualChangeReason`
- `panelCount`

Vermeiden / regenerieren:
- mehrere ähnliche beige/neutral Explainer-Flächen hintereinander
- wiederholt zentriertes Objekt + Kreise/Pfeile
- gleiche Kamera/Focal Scale in vielen Nachbarszenen
- 3+ angrenzende Szenen mit demselben `motifKey` ohne echte Progression/Justification
- 3-/4-Panel- oder 3-/4-Stufen-Erklärbilder als Standardlösung
- kleine Figuren/Labels, die nur am großen Bildschirm funktionieren
- überladene Schemata
- ungeplanter lesbarer Text, besonders englische Überschriften, UI-/Packaging-Text oder Gibberish

Default: maximal **2 klar getrennte States/Panels pro BILD**. Bei 3 Schritten lieber auf mehrere Bilder verteilen, eine echte Szene zeigen oder auf Before/After reduzieren.

Schemas: ein Mechanismus, vorzugsweise max. 3 große Labels/Branches und max. 2 sichtbare States/Panels.

Text: groß, kurz, phone-readable; keine Mini-Absätze.

Pacing: einfache Objekt-/Textbilder nicht künstlich sehr lange halten. Wenn der Voice-Beat zu lang ist, einen zweiten konkreten Visual Beat planen statt zufällige Bewegung hinzuzufügen.

## Phase-1-Abschluss — ZWEI GITHUB-DIREKTLINKS (HARD)

Bindend: `PHASE1_TABLET_HANDOFF_LINKS_V1` aus `rules/PHASE1_HANDOFF_LINKS.md`. Nach JEDER fertiggestellten Phase 1 die beiden finalen Dateien im konkreten YouTube-Projekt auf GitHub committen und deren Existenz auf der verlinkten Branch pruefen. **In derselben Chat-Abschlussantwort IMMER zwei separate klickbare Links anbieten:** (1) `02-google-flow/google-flow-prompt.txt` mit allen Google-Flow-Bildprompts und (2) `01-script/script.txt` mit dem gesamten finalen Sprechertext. Direkte GitHub-Datei-URLs statt Repo-Root oder Ordnerlinks, tabletfreundlich zum Oeffnen/Kopieren. Wenn eine Datei noch nicht vorhanden, unvollstaendig oder nicht gepusht ist, Phase 1 NICHT als fertig melden und keinen fiktiven Link ausgeben.

## Google Flow — Struktur

Pro Video genau:
`02-google-flow/google-flow-prompt.txt`

Keine mehreren Master-Prompts.

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

## Cover separat, erstes Bild normale Videoszene — `THUMBNAIL_SEPARATE_FROM_SCENE01_V1`

Drei unabhängige Cover-Kandidaten generieren; nur auf diese eine Auswahl warten. Gewinner als `05-export/thumbnail.png`, beide Verlierer löschen. Das Cover gehört NICHT ins MP4 und NICHT in `03-bilder/01.png`. Szene 01 ist eine normale separate Hook-Illustration ohne Cover-Schrift.

Nach Cover-Auswahl ohne weitere Fragen Bild 01–05, 06–10 usw. in 5er-Batches erzeugen; jede Datei prüfen, bei Fehler nur diese neu erzeugen, sofort als `NN.png` in `03-bilder/`. Zum Schluss exakte 01–NN-Vollständigkeit, 16:9, Figuren-/Stil-/Textkonstanz und separates Thumbnail prüfen.

Wenn ein fertiges MP4 außerhalb `npm run produce:youtube` gerendert wurde, **Pflicht:** `npm run finalize:youtube -- <Projektpfad>` ausführen, damit `youtube-upload.txt`, `captions.srt` und `subtitle-script.txt` wirklich entstehen; kein Video überschreiben. Für künftige Videos ausschließlich den neuen Ablauf verwenden.

## Text

Nur geplanter deutscher Text. Sonst `ZERO READABLE TEXT`.
Ungeplanter englischer/deutscher Text oder Pseudo-Text = FAIL und Regeneration.

## Format

### YouTube
- 16:9
- 1920×1080
- 30 fps

### Reels
- 9:16
- 1080×1920
- 30 fps

## Audio

- finales Voice-over 1,10×
- führende Stille entfernen
- lange Pausen straffen
- Wörter nicht abschneiden
- Timings erst aus final verarbeitetem Audio

## YouTube-Arbeitsfläche

- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/final-voice.mp3`
- `05-export/`
- `99-intern/`

## Export

`05-export/`:
- `final.mp4`
- `thumbnail.png`
- `captions.srt`
- `subtitle-script.txt`
- `youtube-upload.txt`

`captions.srt` liegt direkt in `05-export/` und wird aus den finalen Voice-over-Timings erzeugt.
`subtitle-script.txt` wird aus denselben Timings erzeugt und enthält lesbare Zeitbereiche plus den gesprochenen Text.
`youtube-upload.txt` muss finalen Titel + vollständige Beschreibung enthalten; redaktionelle Eingabe dafür liegt in `99-intern/youtube-upload.json`.
Keine separaten `captions/`, `subtitles/` oder `untertitel/`-Ordner im normalen Workflow.
Interne Word-Timings bleiben in `99-intern/`.

## QA

Bei strukturellen/Pipeline-Änderungen relevante Checks ausführen. Keine bestandenen Tests behaupten, wenn sie nicht tatsächlich gelaufen sind.
