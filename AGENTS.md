# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/STICKMAN_DNA.md`
4. `rules/FORMAT_LOCK.md`
5. `rules/YOUTUBE_THEMEN_SYSTEM.md`
6. `rules/YOUTUBE_STYLE_LOCK.md`
7. `rules/PREMIUM_VISUAL_LOCK.md`
8. `rules/SCRIPT_HOOK_LOCK.md`
9. `rules/IMAGE_REFERENCE_LOCK.md`
10. `rules/COVER_LOCK.md`
11. `rules/TEXT_OVERLAY_LOCK.md`
12. `rules/FLOW_TEXT_STYLE_LOCK.md`
13. `rules/COMPOSITION_VARIATION_LOCK.md`
14. `rules/SOCIAL_SCENE_LOCK.md`
15. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
16. `rules/PRODUCTION_FORMAT_RULES.md`

## Themenwelt

Kanalnische: **Alltagspsychologie & menschliches Verhalten**.

## Skript-Einstieg — HARD LOCK

Neue YouTube-Projekte verwenden `scriptHookPolicy: "HOOK_FIRST_EXPLAIN_EARLY_V1"`.

Die ersten Szenen müssen schnell Klarheit schaffen:
1. Szene 01 = klare Hook-Frage oder überraschende direkte Aussage
2. Kernbegriff spätestens Szene 03
3. einfache Erklärung direkt danach
4. erstes konkretes Alltagsbeispiel spätestens Szene 05
5. erst danach Mechanismus, Experiment und Vertiefung

Bevorzugte Hook-Typen:
- `WHAT_IS`
- `WHY_DOES`
- `HAVE_YOU_WONDERED`
- `DIRECT_SURPRISE`
- `DIRECT_PROBLEM`

Nicht mit mehreren abstrakten Sätzen aufwärmen. Kein langsamer Einstieg, wenn das Thema direkt erklärt werden kann.

## Bildwelt — HARD LOCK

**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Jede sichtbare menschliche oder menschenähnliche Figur benutzt echte Stickman-Grundanatomie:
- einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- keine realistische Nase/Ohren
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- einfache Hände ohne Fingeranatomie
- stark vereinfachte Füße/Schuhe

Normale Cartoon-Menschen, halb-realistische Menschen, Mischstile, 3D/Pixar/Anime sind HARD FAIL.

## Premium Visual Direction — HARD LOCK

Neue Projekte verwenden:
- `premiumVisualPolicy: "PREMIUM_EDITORIAL_CINEMATIC_V1"`
- `colorStoryPolicy: "INTENTIONAL_COLOR_STORY_V1"`

Vor Google Flow eine konkrete `projectPalette` definieren:
- primary
- secondary
- accent
- neutral
- avoid

Premium bedeutet **nicht** realistischere Menschen. Stickman-Anatomie bleibt simpel.

Premium entsteht durch:
- stärkere Körperhaltung und lesbare Emotion
- bewusst gewählte Kleidung/Rollenwirkung
- charakteristische Silhouette
- passende Requisiten
- echte Interaktion statt Platzhalterfigur
- Vorder-/Mittel-/Hintergrund
- bewusstes Licht
- klare Fokuszone
- hochwertige Umgebung
- kontrollierte, thematisch passende Farben

Nicht akzeptabel als Default:
- grauer/beiger Einheitswash
- sterile Büros in langen Serien
- neutrale Figur + riesiges Symbol
- Lehrbuch-/Whiteboard-Optik
- endlose Skalen, Karten, Waagen, Pfeile oder schwebende Zahlen, wenn ein Alltagsbild möglich ist

Priorität:
**konkrete Alltagsszene > visuelle Metapher > abstrakte Lehrgrafik.**

## Bildlogik

Genau ein primärer visueller Gedanke pro Bild.

Mehrere Teilbilder in einem Frame sind erlaubt, wenn alle Teilmotive denselben gesprochenen Beat erklären.

## Kompositionsvariation — HARD LOCK

Neue YouTube-Projekte verwenden:
- `visualPlanningPolicy: "VARIED_COMPOSITION_V1"`
- `socialScenePolicy: "SOCIAL_VARIETY_V1"`

Jede Szene plant:
- `compositionType`: `standard`, `split`, `contrast` oder `montage`
- `socialDensity`: `solo`, `duo` oder `group`

Planungsziel für typische 2–3-Minuten-Videos:
- ungefähr 70 % normale konkrete Szenen
- ungefähr 20 % Split-/Kontrast-Szenen
- ungefähr 10 % Montage-/Multi-Panel-Szenen

Nicht stumpf Quoten erfüllen. Semantik gewinnt. Aber eine lange Serie aus fast identischen `eine Figur + Raum`-Kompositionen ist nicht akzeptabel.

Bei sozialen Beats aktiv Duo-/Gruppenszenen planen: Feedback, Gespräch, Zustimmung/Widerspruch, Publikum, Beobachtung, Familie, Freunde, Kollegen, soziale Vergleiche und Experimente.

## Textsystem — GOOGLE FLOW ONLY

Für neue YouTube-Projekte gilt ohne Ausnahme:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die jeweiligen Bilder gerendert. Remotion erzeugt keinen sichtbaren Text.**

### Szene 01
- exakter deutscher Cover-Titel direkt in `01.png`
- 2–7 Wörter
- außer diesem Titel kein weiterer lesbarer Text

### Ausgewählte spätere Textszenen
- exakter deutscher Keyword-/Merksatz direkt im Google-Flow-Bild
- maximal 5 Wörter
- nur ein geplanter Textmoment pro Bild

### Alle anderen Szenen
- ZERO READABLE TEXT
- keine UI-Texte, Labels, Untertitel, Poster-/Werbe-/Bildschirmtexte
- Dokumente/Screens nur abstrakt

### Typografie-Ästhetik
Jeder neue Flow-Prompt enthält `TYPOGRAPHY AESTHETIC — HARD LOCK`.

Geplanter Text:
- clean professional integrated editorial typography
- sichere Ränder
- keine Meme-/Sticker-Schrift
- keine extrem dicke Outline als Standard
- wirkt in die Szene hineindesignt
- verdeckt keine zentrale Handlung

### Remotion
Für YouTube:
- `sceneLabels: []`
- `renderGermanLabelsInRemotion: false`
- keine YouTube-Auto-Captions
- Remotion nur für Schnitt, Audio, technische Effekte und Export

## Scene 01 — COVER + MASTER HARD LOCK

**`03-bilder/01.png` = SCENE 01 + COVER/THUMBNAIL + STYLE-/ANATOMY-MASTER.**

Szene 01 muss:
- den Hook-Beat korrekt darstellen
- bewusst stärker als eine normale Szene funktionieren
- ein dominantes Hauptmotiv und klare visuelle Spannung besitzen
- Premium-Figuren- und Farbqualität etablieren
- die Stickman-/Welt-DNA etablieren
- den exakten deutschen Cover-Titel direkt aus Google Flow enthalten
- Titel und Hauptmotiv gemeinsam komponieren

Kein separates Pflicht-`cover.png`.

## Metadaten neuer Projekte

```json
{
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "hookType": "WHAT_IS",
  "coreConceptTerm": "",
  "coreConceptIntroducedByScene": 3,
  "realLifeExampleByScene": 5,
  "realLifeExampleSummary": "",
  "premiumVisualPolicy": "PREMIUM_EDITORIAL_CINEMATIC_V1",
  "colorStoryPolicy": "INTENTIONAL_COLOR_STORY_V1",
  "projectPalette": {
    "primary": "",
    "secondary": "",
    "accent": "",
    "neutral": "",
    "avoid": ["grey/beige wash"]
  },
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY",
  "flowTextStylePolicy": "EDITORIAL_INTEGRATED_V1",
  "visualPlanningPolicy": "VARIED_COMPOSITION_V1",
  "socialScenePolicy": "SOCIAL_VARIETY_V1",
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

## Referenz-Workflow

1. Bild 01 inklusive exaktem Cover-Titel allein generieren.
2. STOP und Nutzerfreigabe.
3. Coverstärke, Titel, Typografie, Premium-Figuren, Farbwelt, Stickman-DNA und Inhalt prüfen.
4. Danach höchstens 5 neue Bilder pro Batch.
5. Bild 01 ab Szene 02 nur als STYLE-/ANATOMY-Referenz verwenden, nicht als Charakter-, Kompositions- oder Textvorlage.
6. Nur bei ausdrücklich geplanten späteren Textmomenten deren eigenen exakten deutschen Flow-Text rendern.
7. Nach jedem Batch interne QA.
8. Nur fehlerhafte Bilder regenerieren.
9. Nach PASS automatisch fortsetzen.

**Die einzige reguläre Nutzerfreigabe ist Bild 01.**

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

Die eine Google-Flow-Datei enthält:
- Stickman-DNA
- Format/Stil
- Projektpalette
- `PREMIUM VISUAL QUALITY — HARD LOCK`
- `PREMIUM CHARACTER DESIGN — HARD LOCK`
- `COLOR STORY — HARD LOCK`
- `REAL-LIFE SCENE PRIORITY — HARD LOCK`
- `COVER STRENGTH — HARD LOCK`
- `TYPOGRAPHY AESTHETIC — HARD LOCK`
- `VISUAL VARIETY — HARD LOCK`
- `SOCIAL SCENE VARIETY — HARD LOCK`
- alle geplanten exakten deutschen Textmomente
- ZERO READABLE TEXT für alle übrigen Szenen
- Master-Referenz-Regel
- 5er-Batch-Plan
- STOP nur nach Bild 01
- alle individuellen Szenenprompts

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

## Priorität

- Formatkonflikt: `rules/FORMAT_LOCK.md`
- visuelle Anatomie: `rules/STICKMAN_DNA.md`
- Premium/Farbe: `rules/PREMIUM_VISUAL_LOCK.md`
- Script-Einstieg: `rules/SCRIPT_HOOK_LOCK.md`
- Cover: `rules/COVER_LOCK.md`
- sichtbarer YouTube-Text: `rules/TEXT_OVERLAY_LOCK.md` — **Google Flow only**
- Textästhetik: `rules/FLOW_TEXT_STYLE_LOCK.md`
- Komposition: `rules/COMPOSITION_VARIATION_LOCK.md`
- soziale Cast-Planung: `rules/SOCIAL_SCENE_LOCK.md`
- Batch: Freigabe einmal nach Bild 01; danach automatische 5er-Batches
