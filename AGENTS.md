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
6. `rules/FORMAT_LOCK.md`
7. `rules/YOUTUBE_THEMEN_SYSTEM.md`
8. `rules/YOUTUBE_STYLE_LOCK.md`
9. `rules/PREMIUM_VISUAL_LOCK.md`
10. `rules/SCRIPT_HOOK_LOCK.md`
11. `rules/IMAGE_REFERENCE_LOCK.md`
12. `rules/COVER_LOCK.md`
13. `rules/TEXT_OVERLAY_LOCK.md`
14. `rules/FLOW_TEXT_STYLE_LOCK.md`
15. `rules/COMPOSITION_VARIATION_LOCK.md`
16. `rules/SOCIAL_SCENE_LOCK.md`
17. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
18. `rules/PRODUCTION_FORMAT_RULES.md`

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

Jede sichtbare menschliche Figur benutzt dieselbe Stickman-Familie:
- großer einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- keine realistische Nase/Ohren
- kleiner/kompakter bekleideter Torso
- sehr dünne geformte Arme und Beine
- einfache Hände
- einfache Schuhe/Füße

Normale Cartoon-Menschen, halb-realistische Menschen, realistische Menschen, Mischstile, 3D/Pixar/Anime sind HARD FAIL.

Figuren dürfen je nach Inhalt freundlich, neutral, unsicher, erschöpft, verletzlich, kalt, dominant, manipulativ, arrogant, einschüchternd oder isoliert wirken. Kein Standard-Bösewicht mit roten Augen/Hörnern/Monsterzähnen.

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

## Google Flow — ALTE PRODUKTIONSSTRUKTUR BLEIBT HARD LOCK

**Pro Video gibt es genau eine zentrale Flow-Datei:**

`02-google-flow/google-flow-prompt.txt`

Diese eine Datei enthält gemeinsam:
- globale Bildwelt-/Stickman-Regeln
- Format und Stil
- Charakter-/Kontinuitätsregeln
- Mood-/Farbregeln, wenn nötig
- Textregeln
- Coverregeln
- Referenzregeln
- Batch-/Freigaberegeln
- **alle Szenen des gesamten Videos in derselben Datei**

**Nicht erlaubt:**
- mehrere Flow-Prompt-Dateien für ein Video
- `prompt-1.txt`, `prompt-2.txt`, `flow-3-image-prompts.txt` oder ähnliche Batch-Prompt-Dateien
- Aufteilung eines Videos in mehrere unabhängige Master-Prompts

Ein Batch bedeutet nur, dass Flow aus derselben Master-Datei schrittweise Bilder erzeugt. Die Master-Datei selbst wird nicht aufgeteilt.

### Szenenblöcke

Die Szenen dürfen kompakt bleiben. Übliche Felder sind:
- `SCENE NN`
- `SPEECH CONTEXT — DO NOT RENDER AS TEXT:`
- `SCENE TYPE:`
- `COMPOSITION:`
- `SOCIAL DENSITY:`
- `VISUAL IDEA:`
- `VISUAL TASK:`
- `CAMERA:`
- `LIGHTING MOOD:`
- `CHARACTER DIRECTION:`
- `PLANNED GERMAN TEXT:`
- `PROMPT:`

Nicht jede Szene braucht zusätzliche technische Unterblöcke. Der konkrete Bildprompt soll kurz, eindeutig und Flow-tauglich bleiben.

## Textsystem — GOOGLE FLOW ONLY

Für neue YouTube-Projekte gilt:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die jeweiligen Bilder gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.**

### Szene 01
- exakter deutscher Cover-Titel direkt in `01.png`
- normalerweise 2–7 Wörter
- außer ausdrücklich geplanten Mechanismus-/Preislabels kein zusätzlicher lesbarer Text

### Ausgewählte spätere Textszenen
- nur ausdrücklich geplanter exakter deutscher Text

### Alle anderen Szenen
- `ZERO READABLE TEXT`
- keine zufälligen UI-, Poster-, Verpackungs-, Dokument- oder Bildschirmtexte

Der `SPEECH CONTEXT` darf niemals sichtbar gerendert werden.

## Szene 01 — COVER

`03-bilder/01.png = SCENE 01 + COVER/THUMBNAIL`.

Szene 01:
- zeigt den Hook-Beat korrekt
- ist stärker komponiert als eine normale Szene
- besitzt ein dominantes Hauptmotiv
- hat schnelle Thumbnail-Lesbarkeit
- benutzt dieselbe permanente Kanalwelt

Die permanente Bildwelt kommt aus `rules/VISUAL_SYSTEM.md`, `rules/STICKMAN_DNA.md` und den freigegebenen Referenzen. Szene 01 darf diese Regeln nicht überschreiben.

## Referenz-Workflow

Permanente Referenzen:
`assets/cinematic-human-behavior-world/`

1. Passende Kanal-/Mood-Referenzen wählen.
2. Szene 01 aus der einen `google-flow-prompt.txt` generieren.
3. STOP und Nutzerfreigabe für Bild 01.
4. Danach höchstens 5 neue Bilder pro Batch aus derselben Master-Datei.
5. Nach jedem Batch interne QA.
6. Nur fehlerhafte Bilder regenerieren.
7. Nach PASS automatisch fortsetzen.

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

**Es bleibt genau eine Google-Flow-Datei mit allen Szenen.**

## Metadaten neuer Projekte

```json
{
  "visualSystem": "CINEMATIC_HUMAN_BEHAVIOR_V2",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V2",
  "moodPolicy": "ADAPTIVE_PSYCHOLOGICAL_MOOD_V1",
  "environmentPolicy": "BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2",
  "renderingPolicy": "SOFT_CEL_SHADED_FILM_FRAME_V2",
  "representationPolicy": "MIXED_HUMAN_BEHAVIOR_VISUALS_V2",
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
