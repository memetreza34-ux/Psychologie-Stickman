# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Verbindlich:
- `rules/STICKMAN_DNA.md`
- `rules/FORMAT_LOCK.md`
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/YOUTUBE_STYLE_LOCK.md`
- `rules/PREMIUM_VISUAL_LOCK.md`
- `rules/SCRIPT_HOOK_LOCK.md`
- `rules/IMAGE_REFERENCE_LOCK.md`
- `rules/COVER_LOCK.md`
- `rules/TEXT_OVERLAY_LOCK.md`
- `rules/FLOW_TEXT_STYLE_LOCK.md`
- `rules/COMPOSITION_VARIATION_LOCK.md`
- `rules/SOCIAL_SCENE_LOCK.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/PRODUCTION_FORMAT_RULES.md`

`rules/STICKMAN_DNA.md` ist die zentrale Anatomie-Source-of-Truth. `rules/PREMIUM_VISUAL_LOCK.md` definiert Premium-Figurenführung, Farbe und Bildqualität. `rules/SCRIPT_HOOK_LOCK.md` definiert den Einstieg neuer YouTube-Skripte.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

Keine medizinischen Diagnosen, Therapieanweisungen oder pseudowissenschaftlichen Versprechen.

## Getrennte Formate

### YouTube
Pfad: `youtube/`
- 16:9 / 1920×1080 / 30 fps
- Remotion: `Phase3YouTube`
- sichtbare Struktur: `01-script/`, `02-google-flow/`, `03-bilder/`, `04-audio/`, `05-export/`, `99-intern/`

### Reels
Pfad: `reels/`
- 9:16 / 1080×1920 / 30 fps
- Remotion: `Phase3Reel`

YouTube und Reels werden nicht vermischt.

## Produktionsfolge

THEMA + QUELLEN + CLAIM-CHECK → HOOK-/EINSTIEGSPLAN → finales Skript → Phase 1 Visual Beats → Projektpalette + Premium-Visual-Plan → Phase 2 Google-Flow-Bilder → finales Audio/Timings → Phase 3 Schnitt/Render → Final-QA.

## Skript-Einstieg — HARD LOCK

Neue YouTube-Projekte verwenden `scriptHookPolicy: "HOOK_FIRST_EXPLAIN_EARLY_V1"`.

Die ersten Szenen folgen grundsätzlich:
1. klare Hook-Frage oder überraschende direkte Aussage
2. Kernbegriff früh nennen
3. einfach erklären
4. konkretes Alltagsbeispiel früh zeigen
5. erst danach Experiment, Mechanismus und Vertiefung

Richtwerte:
- Hook in Szene 01
- Kernbegriff spätestens Szene 03 / ungefähr erste 50 Wörter
- erstes konkretes Alltagsbeispiel spätestens Szene 05 / ungefähr erste 80 Wörter

Bevorzugte Hook-Typen:
- `WHAT_IS`
- `WHY_DOES`
- `HAVE_YOU_WONDERED`
- `DIRECT_SURPRISE`
- `DIRECT_PROBLEM`

Keine langsame abstrakte Vorrede als Standard.

Details: `rules/SCRIPT_HOOK_LOCK.md`.

## Visual-Beat-Prinzip

Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich ein eigenes Bild.

Verbindlich:
- konkrete Alltagsszene vor generischer Infografik
- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende Hinweise
- mehrere Teilbilder nur, wenn sie denselben Beat erklären
- keine unnötige Wiederholung derselben Pose oder Komposition
- Master sperrt Stil, nicht Kamera oder Aufbau

Dichte:
- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur als geprüfte Ausnahme
- absolute Obergrenze 28
- durchschnittlich höchstens 16 Wörter pro Szene

## Premium Visual Direction — HARD LOCK

Neue YouTube-Projekte verwenden:
- `premiumVisualPolicy: "PREMIUM_EDITORIAL_CINEMATIC_V1"`
- `colorStoryPolicy: "INTENTIONAL_COLOR_STORY_V1"`

Jedes neue Video definiert vor Flow eine `projectPalette` mit:
- `primary`
- `secondary`
- `accent`
- `neutral`
- `avoid`

Premium bedeutet **nicht realistischere Menschen**. STRICT STICKMAN ONLY bleibt bestehen.

Premium entsteht durch:
- ausdrucksstarke Pose/Körpersprache
- bewusstes minimalistisches Gesicht
- rollenbezogene Kleidung und Requisiten
- charakteristische Silhouette
- glaubwürdige Interaktion
- Vorder-/Mittel-/Hintergrund
- bewusstes Licht
- klare Fokuszone
- hochwertige detailreiche Umgebung
- kontrollierte, thematisch passende Farben

Nicht akzeptabel als Default:
- grauer/beiger Einheitswash
- sterile Office-Welt über viele Szenen
- neutrale Platzhalterfigur vor einem Symbol
- endlose Lehrgrafiken, Waagen, Karten, Skalen oder riesige schwebende Zahlen, wenn eine echte Alltagsszene möglich ist

Priorität:
**echte Alltagsszene > visuelle Metapher > abstrakte Lehrgrafik.**

Details: `rules/PREMIUM_VISUAL_LOCK.md`.

## Kompositionsvariation — HARD LOCK

Neue YouTube-Projekte verwenden `visualPlanningPolicy: "VARIED_COMPOSITION_V1"`.

Jede Szene trägt:
- `compositionType`: `standard`, `split`, `contrast` oder `montage`
- `socialDensity`: `solo`, `duo` oder `group`

Planungsziel für typische 2–3-Minuten-Videos:
- ungefähr 70 % normale konkrete Szenen
- ungefähr 20 % Split-/Kontrast-Kompositionen
- ungefähr 10 % Multi-Panel-/Montage-Kompositionen

Die Prozentwerte sind ein Anti-Monotonie-Ziel, kein Zwang. Inhaltliche Klarheit gewinnt immer.

Multi-Panel ist ausdrücklich erlaubt, wenn alle Teilmotive **denselben gesprochenen Beat** erklären.

Details:
- `rules/COMPOSITION_VARIATION_LOCK.md`
- `rules/SOCIAL_SCENE_LOCK.md`

## Soziale Bildlogik

Psychologie-Videos sollen nicht fast nur isolierte Einzelstickmen zeigen.

Bei Feedback, Gespräch, Zustimmung/Widerspruch, Publikum, Beobachtung, Gruppe, Familie, Freunden, Kollegen, Experimenten oder sozialem Vergleich werden `duo`/`group` aktiv bevorzugt.

Für typische Videos mit mindestens 20 Szenen sind mehrere Duo- und Gruppenszenen vorgesehen, sofern das Thema es zulässt.

## Bildwelt

**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**

Jede sichtbare menschliche oder menschenähnliche Figur bleibt ein echter Stickman, auch im Hintergrund, auf Screens, Fotos, Postern, Werbung und Spiegelungen.

Verbindliche Anatomie:
- einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- keine realistische Nase/Ohren
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- einfache Hände ohne Fingeranatomie
- stark vereinfachte Füße/Schuhe

Nicht erlaubt:
- normale Cartoon-Menschen
- semi-realistische oder realistische Menschen
- gemischte Human-/Stickman-Stile
- Photorealismus
- 3D/CGI
- Anime/Chibi

Die Umgebung muss glaubwürdig, farbig, detailreich und hochwertig illustriert sein. Vordergrundfiguren sollen trotz einfacher Anatomie **bewusst designt und premium inszeniert** wirken.

## Textsystem — GOOGLE FLOW ONLY

Für **YouTube** gilt:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die jeweiligen Bilder gerendert. Remotion erzeugt keinen sichtbaren Text.**

### Geplante Textmomente
- Szene 01: exakter deutscher Cover-Titel, 2–7 Wörter
- ausgewählte spätere Szenen: exakte deutsche Keywords/Merksätze, maximal 5 Wörter
- typische Textdichte 15–25 %
- harte Obergrenze 30 %

### Nicht geplante Textmomente
**ZERO READABLE TEXT.**

Screens, Karten und Dokumente nutzen abstrakte Linien, Formen und Icons, sofern die Szene kein ausdrücklich geplantes Textmoment ist.

### Typografie-Ästhetik — HARD LOCK
- professionelle integrierte Editorial-Typografie
- klare sichere Ränder
- keine generische Meme-/Sticker-Schrift
- keine extrem dicke Outline als Standard
- Text muss wie Teil der Bildkomposition wirken
- Titel/Keyword dürfen Hauptmotiv oder Handlung nicht verdecken

Jeder neue Flow-Prompt enthält `TYPOGRAPHY AESTHETIC — HARD LOCK`.

### Qualität
Jeder geplante Text wird im Flow-Prompt exakt vorgegeben. Falsche Schreibweise, abgeschnittene Buchstaben, Pseudo-Schrift, zusätzliche Wörter oder sichtbar schlechte typografische Integration führen zur Regeneration genau dieses Bildes.

### Remotion
Für neue YouTube-Projekte:
- `sceneLabels: []`
- keine YouTube-Auto-Captions
- `renderGermanLabelsInRemotion: false`
- Remotion übernimmt nur Schnitt, Audio, technische Bildbewegung und Export

Details:
- `rules/TEXT_OVERLAY_LOCK.md`
- `rules/FLOW_TEXT_STYLE_LOCK.md`

## Scene 01 — Cover + Master + erster Visual Beat

Für jedes YouTube-Projekt gilt:

**`03-bilder/01.png` = SCENE 01 + COVER/THUMBNAIL + STYLE-/ANATOMY-MASTER.**

Szene 01 muss:
- den ersten gesprochenen Hook-Beat korrekt darstellen
- bewusst stärker als eine normale Szene als Thumbnail komponiert sein
- ein dominantes Hauptmotiv und klare visuelle Spannung haben
- die Premium-/Farbqualität des Videos etablieren
- die Stickman-/Welt-DNA etablieren
- den exakten deutschen Cover-Titel direkt aus Google Flow enthalten
- außer diesem Titel keinen weiteren lesbaren Text enthalten

Ein separates Pflicht-`cover.png` wird nicht geführt.

## Master-Referenz + automatische 5er-Batches

- Bild 01 zuerst allein generieren
- Cover-Titel, Coverstärke, Premium-Figuren, Farbwelt und Typografie exakt prüfen
- STOP und Nutzerfreigabe
- Bild 01 bleibt Master
- ab Bild 02 Master bei jeder Generierung anhängen
- Titel aus Bild 01 nicht kopieren
- bei geplanten späteren Textmomenten nur deren eigenen exakten deutschen Text rendern
- nicht geplante Szenen bleiben textfrei
- danach höchstens 5 neue Bilder pro Batch
- interne QA nach jedem Batch
- nur fehlerhafte Bilder regenerieren
- nach vollständigem PASS automatisch weiter

**Regulär genau eine Nutzerfreigabe: nach Bild 01.**

## Neue Metadaten

Neue YouTube-Projekte verwenden:

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

## Einfache YouTube-Arbeitsfläche

Der Nutzer arbeitet regulär nur mit:
- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/`
- `05-export/`

Technische Hilfsdateien gehören nach `99-intern/`.

Die eine `google-flow-prompt.txt` enthält alle Szenenprompts, zentrale DNA, Projektpalette, Premium-Visual-Regeln, alle exakten geplanten deutschen Texte, ZERO READABLE TEXT für alle übrigen Szenen, Typografie-/Kompositions-/Social-Hard-Locks und den Batch-Ablauf.

## Audio

- finales Voice-over exakt 1,10×
- Tonhöhe erhalten
- führende Stille entfernen
- lange Pausen straffen
- Wörter niemals anschneiden
- Timings aus final verarbeitetem Audio

## Qualitätssicherung

Bei Pipeline-/Strukturänderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:visual-variety`
- `npm run qa:premium-content`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Format-/Produktionschecks

## Priorität

Bei Format-Widerspruch gewinnt `rules/FORMAT_LOCK.md`.

Bei visueller Anatomie gewinnt `rules/STICKMAN_DNA.md`.

Bei Premium-/Farb-Widerspruch gewinnt `rules/PREMIUM_VISUAL_LOCK.md`.

Bei Script-Einstieg gewinnt `rules/SCRIPT_HOOK_LOCK.md`.

Bei Cover-Widerspruch gewinnt `rules/COVER_LOCK.md`.

Bei Text-Widerspruch gewinnt `rules/TEXT_OVERLAY_LOCK.md`; für Typografie gewinnt zusätzlich `rules/FLOW_TEXT_STYLE_LOCK.md`.

Bei Kompositions-Widerspruch gewinnt `rules/COMPOSITION_VARIATION_LOCK.md`.

Bei Cast-/Sozialdichte gewinnt `rules/SOCIAL_SCENE_LOCK.md`.

Beim Batch-Widerspruch gilt: nur Bild 01 braucht Nutzerfreigabe; danach automatische 5er-Batches mit interner QA.
