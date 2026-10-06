# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Schreiben nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

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
4. vorhandene `youtube/TT.MM.JJJJ-*` Ordner prüfen
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

## Google Flow — Struktur

Pro Video genau:
`02-google-flow/google-flow-prompt.txt`

Keine mehreren Master-Prompts.

## Cover + Referenz + Batches

- BILD 01 only
- genau 3 getrennte 16:9 Cover-Kandidaten
- STOP für Nutzerwahl
- Gewinner → `01.png`
- `01.png` ist visuelle Episodenreferenz für Linework/Shading/Textur/Finish und Stickman-Spezies
- spätere Representation, Personen, Kleidung, Orte, Farben und Stimmung dürfen sich scriptgerecht ändern
- danach 5er-Batches
- jede Bildnummer eigene Datei
- akzeptierte Bilder sofort `NN.png`
- alles in `03-bilder/`
- kein Storyboard/Kontaktbogen/Collage/fertiges Video

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
