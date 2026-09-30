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
8. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
9. `rules/FLOW_PROMPT_ARCHITECTURE.md`
10. `rules/REPRESENTATION_VARIETY_LOCK.md`
11. `rules/FORMAT_LOCK.md`
12. `rules/YOUTUBE_THEMEN_SYSTEM.md`
13. `rules/YOUTUBE_STYLE_LOCK.md`
14. `rules/SCRIPT_HOOK_LOCK.md`
15. `rules/IMAGE_REFERENCE_LOCK.md`
16. `rules/COVER_LOCK.md`
17. `rules/TEXT_OVERLAY_LOCK.md`
18. `rules/FLOW_TEXT_STYLE_LOCK.md`
19. `rules/COMPOSITION_VARIATION_LOCK.md`
20. `rules/SOCIAL_SCENE_LOCK.md`
21. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
22. `rules/PRODUCTION_FORMAT_RULES.md`
23. `rules/YOUTUBE_EXPORT_PACKAGE.md`

## Themenwelt

Kanalnische: **Psychologie & menschliches Verhalten**.

Das Spektrum reicht von Denkfehlern und Entscheidungen bis zu Manipulation, Macht, Gruppendruck, Beziehungen, Geld-/Konsumverhalten, Betrugspsychologie und dunkleren Seiten menschlichen Verhaltens. Grenzthemen bleiben psychologisch/verhaltensbezogen.

## Bildwelt — HARD LOCK

Aktive Bildwelt: `CINEMATIC_HUMAN_BEHAVIOR_V2`.

Character system: `STYLIZED_STICKMAN_CAST_V2`.

Mood system: `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`.

Jede sichtbare menschliche Figur benutzt dieselbe mature/adult editorial Stickman-Familie:
- großer einfacher runder/ovaler Kopf, nicht chibi/mascot
- minimale Gesichtszüge
- keine realistische Nase/Ohren/Neck-Anatomie
- kleiner schmaler bekleideter Torso
- schmale Schultern
- sehr dünne geformte Arme und Beine
- einfache Hände ohne realistische Finger
- einfache Schuhe/Füße

Individualität über einfache Haare, Augenbrauen, kleine Augen-/Mundvarianten, Brille/Accessoire, Kleidung, Haltung, Blickrichtung und Rolle.

HARD FAIL: cute/chibi/mascot, normale Cartoon-Menschen, breite Schultern/dicke Gliedmaßen, realistische Menschen, Mischstile, 3D/Pixar/Anime.

## Rich World — HARD LOCK

**Simple Stickmen. Rich World. One clear idea per image.**

Normale Alltagsszenen benutzen glaubwürdige beat-spezifische Umgebungen mit sinnvollen Props, räumlicher Tiefe und motiviertem Licht. Leere Creme-/Offwhite-Flächen sind kein Standardlook.

## Skript-Einstieg — HARD LOCK

Neue YouTube-Projekte verwenden `HOOK_FIRST_EXPLAIN_EARLY_V1`:
1. Szene 01 = klare Hook-Frage oder überraschende direkte Aussage
2. Kernbegriff spätestens Szene 03
3. einfache Erklärung direkt danach
4. erstes konkretes Alltagsbeispiel spätestens Szene 05
5. erst danach Mechanismus, Experiment und Vertiefung

## Visual Director — HARD LOCK FÜR NEUE VIDEOS

Neue Projekte verwenden `OBSERVABLE_SCENE_FIRST_V1`.

**Do not prompt the psychology. Prompt the evidence of the psychology.**

Vor jedem Flow-Bildprompt:

```text
gesprochene Bedeutung
→ Viewer Takeaway
→ Observable Evidence
→ eine konkrete sichtbare Komposition
→ finaler Flow-Prompt
```

Nicht direkt an Flow delegieren:
- `zeige sozialen Druck`
- `visualisiere Unsicherheit`
- `mache Aufmerksamkeit riesig`
- `zeige den Effekt`

Stattdessen konkrete sichtbare Handlung, Blickrichtung, Körperhaltung, Abstand, Blocking, Objektbeziehung und Umgebungsaktivität definieren.

Psychologische Effekt-Namen werden nicht automatisch wörtlich visualisiert:
- Spotlight-Effekt ≠ echter Scheinwerfer
- Ankereffekt ≠ Schiffsanker
- Halo-Effekt ≠ Heiligenschein
- Framing ≠ Bilderrahmen

Metaphern nur bewusst verwenden, wenn sie klarer sind als eine reale Situation.

## Bildlogik und Variety

Genau ein primärer visueller Gedanke pro Bild.

Nicht jedes Bild braucht eine Figur. Erlaubt sind Character Scene, Schema, Objekt-/Umgebungsbild, Vergleich, sparsame Text-Illustration.

Die bekannten Prozentbereiche sind nur Review-Signale, **keine Quoten**.

Nicht erzwingen:
- Montage, nur weil bisher keine vorkam
- Gruppenszene für eine Mindestanzahl
- Split-Screen für künstliche Abwechslung
- Figur als Füller
- Schema wegen eines abstrakten Wortes

Enthält ein Beat mehrere unabhängige Beispiele/Aktionen, lieber in mehrere Visual Beats teilen statt alles in ein Bild zu pressen.

## Google Flow — PRODUKTIONSSTRUKTUR HARD LOCK

Pro Video gibt es genau eine zentrale Flow-Datei:

`02-google-flow/google-flow-prompt.txt`

Diese eine Datei enthält Aufgabe/Output, Channel-Style, Character-/Reference-Regeln, Video-World-Lock, Cover-/5er-Batch-/Dateinamen-/Ordnerregeln, Textregel und alle Bilder des gesamten Videos.

Keine `prompt-1.txt`, `batch-1.txt`, `flow-3-image-prompts.txt` oder mehrere Master-Prompts.

## Google Flow — NATURAL PROMPT ARCHITECTURE HARD LOCK

Neue Projekte verwenden `NATURAL_FLOW_MASTER_V2`.

Interne Planung in `99-intern/` darf ausführlich sein mit Speech Beat, Viewer Takeaway, Observable Evidence, Scene Type, Composition, Social Density, Mood/Power, Camera, Light/Color, Character Direction, Continuity, Text Policy und QA.

Der finale Flow-Prompt kopiert diese technischen Felder **nicht** als Formular.

Ein guter `BILD NN`-Prompt ist direkte englische Art Direction:
1. Kamera/Framing
2. konkrete Hauptmotive
3. exakte sichtbare Handlung/Relation
4. Verhalten anderer relevanter Personen/Objekte
5. konkrete Umgebung/Props
6. Licht/lokale Farben
7. Continuity falls nötig
8. exakter deutscher Text oder `No visible text.`
9. nur wenige lokale Negativregeln bei bekanntem Fehler

Normalziel: ungefähr 45–110 Wörter. Globaler Stil/Anatomie/Verbote werden einmal am Anfang definiert.

Flow ist Produktions-Agent, nicht Art Director. Er darf generieren, batchen, prüfen, umbenennen und organisieren, aber nicht den fehlenden visuellen Gedanken erfinden.

## Google Flow — OUTPUT HARD LOCK FÜR NEUE VIDEOS

Verbindlich: `rules/FLOW_OUTPUT_MODE.md` / `FINAL_SEPARATE_IMAGE_ASSETS_V2`.

### Initial
1. ganze Master-Datei lesen
2. `BILD 01 ONLY`
3. genau 3 getrennte Cover-Kandidaten als einzelne 16:9-Bilder
4. STOP für Nutzerfreigabe
5. Nutzer wählt Gewinner
6. Gewinner sofort `01.png` → `03-bilder/`

Die drei Cover dürfen unterschiedliche starke Kompositionen testen, aber behalten dieselbe visuelle These und denselben exakten Cover-Text.

### Danach
- erst nach Cover-Auswahl
- immer 5 Bildnummern pro Batch, solange mindestens 5 übrig sind
- letzter Batch = 1–4 Restbilder
- kompletten 5er-Batch als einen Batch-Schritt erzeugen, nicht absichtlich Bild für Bild
- jede Bildnummer = eigene 16:9-Datei
- akzeptierte Bilder sofort `NN.png`
- alle direkt in denselben flachen Ordner `03-bilder/`
- keine Batch-Unterordner / kein separater Cover-Ordner
- Batch-QA; nur Fehler einzeln regenerieren
- nach PASS automatisch nächster 5er-Batch
- niemals mehrere Bildnummern in Storyboard/Kontaktbogen/3x3/Collage
- Flow niemals ein fertiges Video daraus bauen lassen

Ein SPLIT/CONTRAST/MONTAGE innerhalb EINES Bildes bleibt erlaubt, wenn alle Teile einen untrennbaren Beat erklären.

**Bestandsschutz:** bestehende YouTube-Projekte nicht rückwirkend ändern, außer der Nutzer verlangt ausdrücklich ihre Migration.

## Textsystem — GOOGLE FLOW ONLY

Sämtlicher sichtbarer YouTube-Text wird direkt von Google Flow gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.

Bild 01: exakter deutscher Cover-Titel, normalerweise 2–7 Wörter.
Ausgewählte spätere Bilder: nur explizit geplanter kurzer Text.
Alle anderen Bilder: `ZERO READABLE TEXT`.

Voice-over-/Speech-Kontext nie sichtbar rendern.

## Referenz-Workflow

Permanente Referenzen: `assets/cinematic-human-behavior-world/`.

Nur freigegebene Referenzen verwenden. Rollen:
- style-only
- character-identity
- environment-continuity

Ein kleiner sauberer Satz ist besser als ein widersprüchliches Pack. Eine schwache/chibi Referenz darf nie autoritativ werden.

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

## Metadaten neuer Projekte

```json
{
  "visualSystem": "CINEMATIC_HUMAN_BEHAVIOR_V2",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V2",
  "humanCharacterPolicy": "UNIFIED_STICKMAN_HUMANS_V2",
  "characterPresencePolicy": "OPTIONAL_HUMANS_MIXED_VISUALS_V1",
  "moodPolicy": "ADAPTIVE_PSYCHOLOGICAL_MOOD_V1",
  "environmentPolicy": "BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2",
  "renderingPolicy": "SOFT_CEL_SHADED_FILM_FRAME_V2",
  "representationPolicy": "MIXED_HUMAN_BEHAVIOR_VISUALS_V2",
  "representationVarietyPolicy": "REPRESENTATION_VARIETY_V1",
  "visualPlanningPolicy": "SEMANTIC_OBSERVABLE_VISUALS_V1",
  "visualDirectorPolicy": "OBSERVABLE_SCENE_FIRST_V1",
  "socialScenePolicy": "SEMANTIC_SOCIAL_DENSITY_V1",
  "flowOutputPolicy": "FINAL_SEPARATE_IMAGE_ASSETS_V2",
  "flowPromptPolicy": "NATURAL_FLOW_MASTER_V2",
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
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

Alle kopierbaren Upload-Daten gehören in `youtube-upload.txt`.

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
