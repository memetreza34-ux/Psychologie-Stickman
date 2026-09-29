# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/VISUAL_SYSTEM.md`
4. `rules/visual-system.json`
5. `rules/STICKMAN_DNA.md`
6. `rules/PREMIUM_VISUAL_LOCK.md`
7. `rules/FLOW_OUTPUT_MODE.md`
8. `rules/FLOW_PROMPT_ARCHITECTURE.md`
9. `rules/REPRESENTATION_VARIETY_LOCK.md`
10. `rules/FORMAT_LOCK.md`
11. `rules/YOUTUBE_THEMEN_SYSTEM.md`
12. `rules/YOUTUBE_STYLE_LOCK.md`
13. `rules/SCRIPT_HOOK_LOCK.md`
14. `rules/IMAGE_REFERENCE_LOCK.md`
15. `rules/COVER_LOCK.md`
16. `rules/TEXT_OVERLAY_LOCK.md`
17. `rules/FLOW_TEXT_STYLE_LOCK.md`
18. `rules/COMPOSITION_VARIATION_LOCK.md`
19. `rules/SOCIAL_SCENE_LOCK.md`
20. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
21. `rules/PRODUCTION_FORMAT_RULES.md`
22. `rules/YOUTUBE_EXPORT_PACKAGE.md`

## Themenwelt

Kanalnische: **Psychologie & menschliches Verhalten**.

Erlaubtes Spektrum umfasst unter anderem Denkfehler, Entscheidungen, Manipulation, Macht, Gruppendruck, Beziehungen, Geld-/Konsumverhalten, Betrugspsychologie und dunklere Seiten menschlichen Verhaltens. Grenzthemen bleiben psychologisch/verhaltensbezogen.

## Bildwelt — HARD LOCK

Aktive Bildwelt:
**Cinematic Human Behavior World v2 — `CINEMATIC_HUMAN_BEHAVIOR_V2`.**

Character system:
`STYLIZED_STICKMAN_CAST_V2`.

Mood system:
`ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`.

Jede sichtbare menschliche Figur benutzt dieselbe **mature/adult editorial Stickman-Familie**:
- großer einfacher runder/ovaler Kopf, aber nicht chibi/mascot-übertrieben
- minimale Gesichtszüge
- keine realistische Nase/Ohren/Neck-Anatomie
- kleiner schmaler bekleideter Torso
- schmale Schultern
- sehr dünne geformte Arme und Beine
- einfache Hände ohne realistische Finger
- einfache Schuhe/Füße

Individualität darf innerhalb derselben Anatomie über einfache Haare, Augenbrauen, kleine Augen-/Mundvarianten, Brille/Accessoire, Kleidung, Haltung, Blickrichtung und Rolle entstehen.

HARD FAIL:
- cute/chibi/mascot
- normale Cartoon-Menschen
- breite Schultern oder dicke Cartoon-Gliedmaßen
- halb-realistische/realistische Menschen
- Mischstile
- 3D/Pixar/Anime

Figuren dürfen je nach Inhalt freundlich, neutral, unsicher, erschöpft, verletzlich, kalt, dominant, manipulativ, arrogant, einschüchternd oder isoliert wirken. Kein Standard-Bösewicht mit roten Augen/Hörnern/Monsterzähnen.

## Rich World — HARD LOCK

**Simple Stickmen. Rich World. One clear idea per image.**

Normale Alltagsszenen benutzen glaubwürdige, beat-spezifische Umgebungen mit sinnvollen Props, räumlicher Tiefe und motiviertem Licht.

Nicht als Standard:
- leerer Creme-/Offwhite-Hintergrund
- schwebende Figur ohne Ort
- sterile generische Räume
- immer derselbe Klassenraum/Büro-Look
- flache Stock-Vector-Komposition

Sparse negative space ist nur erlaubt, wenn es inhaltlich bewusst Isolation, Klarheit oder Leere ausdrückt.

## Skript-Einstieg — HARD LOCK

Neue YouTube-Projekte verwenden `scriptHookPolicy: "HOOK_FIRST_EXPLAIN_EARLY_V1"`.

Die ersten Szenen müssen schnell Klarheit schaffen:
1. Szene 01 = klare Hook-Frage oder überraschende direkte Aussage
2. Kernbegriff spätestens Szene 03
3. einfache Erklärung direkt danach
4. erstes konkretes Alltagsbeispiel spätestens Szene 05
5. erst danach Mechanismus, Experiment und Vertiefung

## Bildlogik

Genau ein primärer visueller Gedanke pro Bild.

Mehrere Teilbilder in einem Frame sind erlaubt, wenn alle Teilmotive denselben gesprochenen Beat erklären.

Nicht jedes Bild braucht eine Figur. Erlaubte Hauptformen:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`
- environment/object-only illustration

## Repräsentations-Abwechslung — HARD LOCK FÜR NEUE VIDEOS

Verbindlich: `rules/REPRESENTATION_VARIETY_LOCK.md` / `REPRESENTATION_VARIETY_V1`.

Nicht automatisch jede Szene als Figurenbild planen. Pro gesprochenem Beat zuerst entscheiden, welche visuelle Form die Aussage am schnellsten erklärt.

Normale Longform-Richtwerte:
- Figuren-Szenen ca. 45–60 %
- Schemas ca. 10–20 %
- Objekt-/Umgebungsmetaphern ca. 10–20 %
- Vergleiche ca. 10–20 %
- Text-Illustrationen normalerweise 0–10 %

Das sind keine Quoten; Klarheit gewinnt.

Zusätzlich:
- keinen Stickman nur zum Füllen einsetzen
- sichtbaren Text nur, wenn er Verständnis wirklich verbessert
- keine gesprochene Aussage einfach als Volltext ins Bild schreiben
- Schema nur, wenn Mechanismus/Relation strukturell davon profitiert
- keine langen Serien gleicher Figuren-Mediumshots, Textkarten oder Schemas
- nicht das ganze Video automatisch rot/burgunder/dunkel oder teal/creme einfärben
- Farbe, Licht, Kamera, Ort und Darstellungsform passend zum Beat variieren
- trotz Abwechslung bleibt die einheitliche Kanal-/Filmwelt erhalten

## Google Flow — PRODUKTIONSSTRUKTUR BLEIBT HARD LOCK

**Pro Video gibt es genau eine zentrale Flow-Datei:**

`02-google-flow/google-flow-prompt.txt`

Diese eine Datei enthält gemeinsam:
- Aufgabe/Output
- einen kompakten gemeinsamen Channel-Style
- Character-/Reference-Regeln
- Video-World-/Continuity-Lock
- Cover-/5er-Batch-/Dateinamen-/Ordnerregeln
- Textregel
- **alle Bilder des gesamten Videos in derselben Datei**

**Nicht erlaubt:**
- mehrere Flow-Prompt-Dateien für ein Video
- `prompt-1.txt`, `prompt-2.txt`, `flow-3-image-prompts.txt` oder ähnliche Batch-Prompt-Dateien
- Aufteilung eines Videos in mehrere unabhängige Master-Prompts

Ein Batch bedeutet nur, dass Flow aus derselben Master-Datei schrittweise Bilder erzeugt. Die Master-Datei selbst wird nicht aufgeteilt.

## Google Flow — NATURAL PROMPT ARCHITECTURE HARD LOCK

Verbindlich: `rules/FLOW_PROMPT_ARCHITECTURE.md` / `NATURAL_FLOW_MASTER_V1`.

### Interne Planung

`99-intern/` darf ausführlich planen mit:
- Speech/Voice-over Beat
- Scene Type
- Visual Function
- Composition
- Social Density
- Mood / Power Dynamic
- Visual Idea / Task
- Camera
- Lighting / Color
- Character Direction
- Continuity
- Text Policy
- QA

### Finaler Flow-Prompt

Diese technischen Felder werden **nicht als Formular in jeden finalen Bildblock kopiert**.

Nach den globalen Blöcken besteht der finale Prompt aus:

```text
BILD 01
[natürliche direkte Bild-Regieanweisung]

BILD 02
[natürliche direkte Bild-Regieanweisung]
```

Ein guter Einzelprompt klingt wie eine Regieanweisung an einen Illustrator: Kamera/Framing + Hauptmotiv/Relation + sichtbare Handlung/Mechanismus + Umgebung + Licht/Mood + Continuity falls nötig + exakter deutscher Text nur falls geplant.

Globaler Stil, Anatomie und Verbote werden einmal am Anfang definiert und nicht in jedem Bild wiederholt.

## Google Flow — OUTPUT HARD LOCK FÜR NEUE VIDEOS

Verbindlich: `rules/FLOW_OUTPUT_MODE.md`.

Der Masterprompt erzeugt **finale Einzelbilder**, keinen Storyboard-Kontaktbogen und kein fertiges Video.

### Initial
1. Ganze Master-Datei lesen.
2. `BILD 01 ONLY` generieren.
3. Genau **3 getrennte Cover-Kandidaten** für Bild 01 erzeugen.
4. Jeder Kandidat = eigenes 16:9-Bild, niemals 3er-Panel.
5. STOP für Nutzerfreigabe.
6. Der Nutzer wählt einen Gewinner.
7. Gewinner sofort in `01.png` umbenennen und in `03-bilder/` ablegen.

### Danach
- erst nach Nutzerwahl des Covers weiterarbeiten
- immer 5 Bildnummern pro Batch, solange mindestens 5 Bilder übrig sind
- letzter Batch = verbleibende 1–4 Bilder
- kompletten 5er-Batch als einen Batch-Schritt erzeugen, nicht absichtlich Bild für Bild
- jede Bildnummer = eigene 16:9-Bilddatei
- akzeptierte Bilder sofort passend `NN.png` umbenennen
- alle akzeptierten Bilder direkt in denselben flachen Ordner `03-bilder/` legen
- keine Batch-Unterordner und kein separater Cover-Ordner
- nach Batch-QA automatisch mit dem nächsten 5er-Batch fortfahren
- nur fehlerhafte Bilder einzeln regenerieren
- mehrere Bildnummern niemals in Storyboard, Kontaktbogen, 3x3-Grid oder Collage zusammenfassen
- Flow niemals anbieten lassen, aus den Bildern direkt ein Video zu erstellen

Ein SPLIT/CONTRAST/MONTAGE innerhalb EINES Bildes bleibt erlaubt, wenn alle Teile denselben gesprochenen Beat erklären.

**Bestandsschutz:** `FINAL_SEPARATE_IMAGE_ASSETS_V2`, `REPRESENTATION_VARIETY_V1` und `NATURAL_FLOW_MASTER_V1` gelten für neue/zukünftige Projekte. Bestehende YouTube-Projekte nicht rückwirkend ändern, außer der Nutzer verlangt ausdrücklich die Migration dieses Projekts.

## Textsystem — GOOGLE FLOW ONLY

Für neue YouTube-Projekte gilt:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die jeweiligen Bilder gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.**

### Bild 01
- exakter deutscher Cover-Titel direkt in `01.png`
- normalerweise 2–7 Wörter
- außer ausdrücklich geplanten Mechanismus-/Preislabels kein zusätzlicher lesbarer Text

### Ausgewählte spätere Textbilder
- nur ausdrücklich geplanter exakter deutscher Text
- nur wenn Text das Verständnis wirklich verbessert

### Alle anderen Bilder
- `ZERO READABLE TEXT`
- keine zufälligen UI-, Poster-, Verpackungs-, Dokument- oder Bildschirmtexte

Voice-over-/Speech-Kontext darf niemals sichtbar gerendert werden.

## Bild 01 — COVER

`03-bilder/01.png = BILD 01 + COVER/THUMBNAIL`.

Bild 01:
- zeigt den Hook-Beat korrekt
- ist stärker komponiert als eine normale Szene
- besitzt ein dominantes Hauptmotiv
- hat schnelle Thumbnail-Lesbarkeit
- benutzt dieselbe permanente Kanalwelt

Die permanente Bildwelt kommt aus `rules/VISUAL_SYSTEM.md`, `rules/STICKMAN_DNA.md` und den freigegebenen Referenzen. Bild 01 darf diese Regeln nicht überschreiben.

## Referenz-Workflow

Permanente Referenzen:
`assets/cinematic-human-behavior-world/`

Eine generierte Referenz ist erst nutzbar, wenn sie `rules/IMAGE_REFERENCE_LOCK.md` und `rules/STICKMAN_DNA.md` besteht. Ein chibi-/cartoonartiges Character-Bild darf nie als Kanal-Master weiterverwendet werden.

Verwende Referenzen nach Rolle:
- style-only
- character-identity
- environment-continuity

Ein kleiner Satz sauberer Referenzen ist besser als ein großes widersprüchliches Pack. Nicht jede Produktion braucht jede Referenz.

## FORMAT HARD LOCK

### `reels/`
- 9:16
- 1080×1920
- 30 fps
- Remotion: `Phase3Reel`

### `youtube/`
- 16:9
- 1920×1080
- 30 fps
- Remotion: `Phase3YouTube`

## Audio

- finales Voice-over exakt 1,10×
- führende Stille entfernen
- lange Pausen straffen
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Einfache YouTube-Arbeitsfläche

- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/final-voice.mp3`
- `05-export/`
- `99-intern/`

**Es bleibt genau eine Google-Flow-Datei mit allen Bildern.**

## Metadaten neuer Projekte

```json
{
  "visualSystem": "CINEMATIC_HUMAN_BEHAVIOR_V2",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V2",
  "moodPolicy": "ADAPTIVE_PSYCHOLOGICAL_MOOD_V1",
  "environmentPolicy": "BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2",
  "renderingPolicy": "SOFT_CEL_SHADED_FILM_FRAME_V2",
  "representationPolicy": "REPRESENTATION_VARIETY_V1",
  "flowOutputPolicy": "FINAL_SEPARATE_IMAGE_ASSETS_V2",
  "flowPromptPolicy": "NATURAL_FLOW_MASTER_V1",
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY",
  "flowTextMoments": [],
  "sceneLabels": []
}
```

## Visual-Beat-Dichte

- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur geprüft
- durchschnittlich höchstens 16 Wörter pro Szene

## YouTube Export

`05-export/` ist erst vollständig mit:
- `final.mp4`
- `thumbnail.png`
- `youtube-upload.txt`

Alle kopierbaren Upload-Daten gehören gesammelt in `youtube-upload.txt`. Detailregel: `rules/YOUTUBE_EXPORT_PACKAGE.md`.

## QA

Bei strukturellen oder Pipeline-Änderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:visual-variety`
- `npm run qa:premium-content`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Produktionschecks
