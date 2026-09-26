# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Alltagspsychologie & menschlichem Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Aktiver Standard

Bildwelt: **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Neue YouTube-Projekte zusätzlich:
- `PREMIUM_EDITORIAL_CINEMATIC_V1`
- `INTENTIONAL_COLOR_STORY_V1`
- `HOOK_FIRST_EXPLAIN_EARLY_V1`
- `VARIED_COMPOSITION_V1`
- `SOCIAL_VARIETY_V1`
- `FLOW_VISIBLE_TEXT_ONLY_V3`

Verbindliche Regeln beginnen in `CANONICAL_RULES.md`; die detaillierten Locks liegen unter `rules/`.

## YouTube-Struktur

```text
youtube/TT.MM.JJJJ-thema/
├── 01-script/
│   └── script.txt
├── 02-google-flow/
│   └── google-flow-prompt.txt
├── 03-bilder/
│   ├── 01.png
│   ├── 02.png
│   └── ...
├── 04-audio/
│   └── final-voice.mp3
├── 05-export/
│   └── final.mp4
└── 99-intern/
    ├── phase1-scenes.json
    ├── word-timings.json
    ├── scene-plan.json
    ├── render-props.json
    └── weitere QA-/Produktionsdateien
```

`01.png` ist immer **Szene 01 + Cover/Thumbnail + Style-/Anatomie-Master**.

## Script-Start — Hook zuerst

Neue YouTube-Skripte starten nicht mehr mit einer langsamen abstrakten Vorrede.

Standard:
1. Szene 01 = klare Hook-Frage oder überraschende direkte Aussage
2. Kernbegriff spätestens Szene 03 / ungefähr erste 50 Wörter
3. einfache Erklärung direkt danach
4. erstes konkretes Alltagsbeispiel spätestens Szene 05 / ungefähr erste 80 Wörter
5. erst danach Mechanismus, Experiment und Vertiefung

Beispiele für Hook-Typen:
- `WHAT_IS`
- `WHY_DOES`
- `HAVE_YOU_WONDERED`
- `DIRECT_SURPRISE`
- `DIRECT_PROBLEM`

Details: `rules/SCRIPT_HOOK_LOCK.md`.

## Premium Visual Direction

Premium bedeutet **nicht** realistischere Menschen. Die Stickman-Anatomie bleibt sehr einfach.

Premium entsteht durch:
- starke Pose und Körperlinie
- klare minimalistische Emotion
- rollenbezogene Kleidung
- charakteristische Silhouette
- sinnvolle Requisiten
- echte Interaktion
- bewusstes Licht
- räumliche Tiefe
- hochwertige glaubwürdige Umgebungen
- bewusste Farbdramaturgie

Jedes neue Video definiert eine `projectPalette` mit `primary`, `secondary`, `accent`, `neutral` und `avoid`.

Nicht als Standard akzeptiert:
- grauer/beiger Einheitswash
- sterile Office-Monotonie
- neutrale Figur vor riesigem Symbol
- endlose Lehrgrafiken/Skalen/Karten, wenn eine echte Alltagsszene den Punkt besser zeigen kann

Priorität:
**konkrete Alltagsszene > visuelle Metapher > abstrakte Lehrgrafik.**

Details: `rules/PREMIUM_VISUAL_LOCK.md`.

## Sichtbarer Text — nur Google Flow

Für neue YouTube-Projekte gilt:

**Alle sichtbaren Texte werden direkt von Google Flow in die Bilder gerendert. Remotion erzeugt keinen sichtbaren Text.**

- Szene 01: exakter deutscher Cover-Titel, 2–7 Wörter
- ausgewählte spätere Szenen: kurze deutsche Keywords, maximal 5 Wörter
- alle übrigen Szenen: ZERO READABLE TEXT
- typische Textdichte 15–25 %, maximal 30 %
- falscher, zusätzlicher, unlesbarer oder abgeschnittener Text => nur dieses Bild regenerieren
- `sceneLabels: []`
- `renderGermanLabelsInRemotion: false`
- keine YouTube-Auto-Captions aus Remotion

## Produktionsfolge

```text
THEMA + QUELLEN + CLAIM-CHECK
→ Hook-/Einstiegsplan
→ finales Skript
→ Visual Beats
→ Projektpalette + Premium-Visual-Plan
→ Google-Flow-Bilder inklusive sichtbarer Texte
→ finales Voice-over
→ lokale Whisper-Wortzeiten
→ Remotion für Schnitt + Audio + Export
→ Final-QA
```

## Ein-Kommando-Produktion

Sobald Bilder, `04-audio/final-voice.mp3` und `99-intern/phase1-scenes.json` vorliegen:

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
```

Der Befehl erzeugt fehlende Wortzeiten, mappt Szenen, staged Assets, führt Produktionschecks aus, rendert das Video und validiert den Export.

## Qualitätssicherung

```bash
npm run check
npm run qa:premium-content
npm run qa:visual-variety
npm run qa:flow-prompts
npm run qa:word-timings
npm run qa:render-smoke
```

Die Premium-Content-QA sperrt bei neuen Projekten unter anderem fehlende Hook-Metadaten, zu späte Kernbegriffs-Einführung, fehlende Projektpalette und fehlende Premium-/Color-Hard-Locks in Flow.
