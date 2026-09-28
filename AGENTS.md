# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln — Lesereihenfolge

1. `CHANGE_CONTROL_LOCK.md`
2. `CANONICAL_RULES.md`
3. `PROJECT_BRAIN.md`
4. `rules/VISUAL_SYSTEM.md`
5. `rules/visual-system.json`
6. `rules/FLOW_PROMPT_CONTRACT.md`
7. `rules/STICKMAN_DNA.md`
8. `rules/FORMAT_LOCK.md`
9. `rules/YOUTUBE_THEMEN_SYSTEM.md`
10. `rules/YOUTUBE_STYLE_LOCK.md`
11. `rules/PREMIUM_VISUAL_LOCK.md`
12. `rules/SCRIPT_HOOK_LOCK.md`
13. `rules/IMAGE_REFERENCE_LOCK.md`
14. `rules/COVER_LOCK.md`
15. `rules/TEXT_OVERLAY_LOCK.md`
16. `rules/FLOW_TEXT_STYLE_LOCK.md`
17. `rules/COMPOSITION_VARIATION_LOCK.md`
18. `rules/SOCIAL_SCENE_LOCK.md`
19. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
20. `rules/PRODUCTION_FORMAT_RULES.md`

## Themenwelt

Kanalnische: **Psychologie & menschliches Verhalten**.

Erlaubtes Spektrum umfasst unter anderem:
- Denkfehler und Wahrnehmung
- Entscheidungen und Selbststeuerung
- Manipulation und Überzeugung
- Macht, Status und Hierarchien
- Gruppendruck und soziale Dynamik
- Beziehungen und Kommunikation
- Geld-, Konsum- und Anlegerverhalten
- Betrugspsychologie
- dunklere Seiten menschlichen Verhaltens
- digitale Psychologie

Grenzthemen wie Finanzen, Geschichte, Politik, Technik oder Kriminalität sind nur passend, wenn die zentrale Frage menschliches Verhalten erklärt.

## Aktive Bildwelt — HARD LOCK

`CINEMATIC_HUMAN_BEHAVIOR_V2`

Character system:
`STYLIZED_STICKMAN_CAST_V2`

Mood system:
`ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`

Prompt contract:
`FLOW_SCENE_PROMPT_CONTRACT_V1`

Retired und für neue Produktionen verboten:
- Universal Editorial Stickman World v1.3
- Minimal Editorial Stickman v2
- Cinematic Illustrated Psychology World v1
- Scene 01 as global style/anatomy master

## Stickman-DNA — HARD LOCK

Jede sichtbare menschliche Figur benutzt dieselbe Familie:
- großer einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- keine realistische Nase/Ohren
- kompakter bekleideter Torso
- sehr dünne, aber geformte illustrierte Arme/Beine
- vereinfachte Hände
- vereinfachte Schuhe/Füße

Normale Cartoon-Menschen, halb-realistische Menschen, realistische Menschen, Mischstile, 3D/Pixar/Anime sind HARD FAIL.

Figuren dürfen je nach Rolle freundlich, neutral, unsicher, erschöpft, verletzlich, kalt, dominant, manipulativ, arrogant, einschüchternd oder isoliert wirken.

Kein Standard-Bösewicht mit roten Augen/Hörnern/Monsterzähnen. Psychologische Bedrohung bevorzugt über Haltung, Blick, Nähe, Hierarchie, Schatten, Kamera und Raum erzählen.

## Mood Engine — HARD LOCK

Jede Szene plant zwingend:
- `moodMode`
- `moodIntensity` 0–4
- `powerDynamic`

Mood modes:
- `CLEAR`
- `UNEASY`
- `DARK`
- `POWER`
- `MONEY`
- `ISOLATION`
- `HOPE`

Power dynamics:
- `NEUTRAL`
- `SELF_VS_SELF`
- `PEER_TO_PEER`
- `DOMINANT_VS_TARGET`
- `AUTHORITY_VS_GROUP`
- `GROUP_VS_INDIVIDUAL`
- `SYSTEM_VS_INDIVIDUAL`
- `STATUS_CONTRAST`
- `NONE`

Nicht das ganze Video automatisch dunkel machen. Jeder Beat bekommt den semantisch passenden Mood-Modus.

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

Mehrere Teilbilder sind nur erlaubt, wenn alle Teilmotive denselben gesprochenen Beat erklären.

Keine spätere Information vorwegnehmen.

## Szenentypen

Jeder Beat wählt genau eine Hauptrepräsentation:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

Menschen sind nur nötig, wenn menschliche Handlung, Reaktion, Hierarchie oder Beziehung die beste Darstellung ist.

## Google-Flow-Promptstruktur — ABSOLUTE HARD LOCK

**Jeder Szenenprompt wird exakt gleich aufgebaut. Keine freie Reihenfolge. Keine ausgelassenen Blöcke.**

Jeder `SCENE NN`-Block enthält in dieser Reihenfolge:

1. `SPEECH CONTEXT — DO NOT RENDER AS TEXT:`
2. `SCENE TYPE:`
3. `COMPOSITION:`
4. `SOCIAL DENSITY:`
5. `MOOD MODE:`
6. `MOOD INTENSITY:`
7. `POWER DYNAMIC:`
8. `VISUAL IDEA:`
9. `VISUAL TASK:`
10. `CHARACTER / SUBJECT DIRECTION:`
11. `ACTION / RELATION:`
12. `ENVIRONMENT:`
13. `CAMERA:`
14. `LIGHTING:`
15. `COLOR:`
16. `CONTINUITY:`
17. `TEXT POLICY:`
18. `PLANNED GERMAN TEXT:`
19. `NEGATIVE LOCKS:`
20. `PROMPT:`

Wenn etwas nicht relevant ist: `NONE`. Der Block darf trotzdem nicht fehlen.

### Innerhalb jedes `PROMPT:` immer exakt diese Unterblöcke

1. `[GOAL]`
2. `[WORLD LOCK]`
3. `[CHARACTER LOCK]`
4. `[PSYCHOLOGICAL MOOD]`
5. `[SCENE CONTENT]`
6. `[CAMERA + COMPOSITION]`
7. `[LIGHT + COLOR]`
8. `[TEXT LOCK]`
9. `[NEGATIVE LOCK]`
10. `[FINAL CHECK]`

Nur die Werte ändern sich. Die Struktur bleibt für jede Szene gleich — egal ob Cover, Manipulation, Geld, Schema, heller Alltag oder dunkle Szene.

## Textsystem — GOOGLE FLOW ONLY

Für neue YouTube-Projekte gilt:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die jeweiligen Bilder gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.**

### Szene 01
- exakter deutscher Cover-Titel direkt in `01.png`
- 2–7 Wörter als Haupttitel
- weitere kurze Mechanismus-/Preislabels nur wenn Phase 1 sie ausdrücklich plant

### Spätere Textszenen
- nur ausdrücklich geplante exakte deutsche Texte
- kurze Keywords/Schema-/Vergleichslabels

### Alle anderen Szenen
- `ZERO READABLE TEXT`
- keine zufälligen UI-, Poster-, Verpackungs-, Dokument- oder Bildschirmtexte

Der `SPEECH CONTEXT` darf niemals als sichtbarer Text gerendert werden.

## Szene 01 — COVER HARD LOCK

`03-bilder/01.png = SCENE 01 + COVER/THUMBNAIL`.

Szene 01:
- zeigt den Hook-Beat korrekt
- ist stärker komponiert als eine normale Szene
- hat ein dominantes Hauptmotiv
- hat schnelle Thumbnail-Lesbarkeit
- nutzt dieselbe permanente Kanalwelt
- ist **NICHT** globaler Style-/Anatomy-Master

## Reference Workflow

Permanent references:
`assets/cinematic-human-behavior-world/`

1. Passende permanente Core-/Mood-Referenzen wählen.
2. Szene 01 inklusive Covertext generieren.
3. STOP für Nutzerfreigabe von Bild 01.
4. Danach höchstens 5 neue Bilder pro Batch.
5. Bild 01 darf nicht die permanente Reference Library ersetzen.
6. Nach jedem Batch interne QA.
7. Nur fehlerhafte Bilder regenerieren.
8. Nach PASS automatisch fortsetzen.

## Format

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

## Metadaten neuer Projekte

```json
{
  "visualSystem": "CINEMATIC_HUMAN_BEHAVIOR_V2",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V2",
  "moodPolicy": "ADAPTIVE_PSYCHOLOGICAL_MOOD_V1",
  "promptContract": "FLOW_SCENE_PROMPT_CONTRACT_V1",
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

`qa:flow-prompts` muss neue v2-Prompts ablehnen, wenn Pflichtfelder oder Prompt-Unterblöcke fehlen oder falsch sortiert sind.
