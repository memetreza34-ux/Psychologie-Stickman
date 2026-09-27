# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Alltagspsychologie & menschlichem Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Aktiver visueller Standard

**Minimal Editorial Stickman World v2**

Policy: `MINIMAL_EDITORIAL_STICKMAN_V2`

Source of truth:
- `rules/VISUAL_SYSTEM.md`
- `rules/visual-system.json`
- `rules/STICKMAN_DNA.md`
- später zusätzlich der freigegebene Referenzsatz unter `assets/style-v2/`

Die alte `Universal Editorial Stickman World v1.3` / `PREMIUM_EDITORIAL_CINEMATIC_V1` ist für neue Produktionen **retired**.

### v2 in einem Satz

**Sehr einfache echte Stickmen + warmes Off-White + Charcoal-Linien + feste Kanalakzente + stark reduzierte Umgebungen + ein klarer visueller Gedanke pro Bild.**

### Feste Kanalpalette

- Background: `#F6F3EA`
- Ink: `#202124`
- Blue: `#3F6EDB`
- Coral / Problem: `#E7684A`
- Green / Lösung: `#4E9B78`
- optional Amber: `#D6A23D`

Normale Szenen nutzen meist nur **eine dominante Akzentfarbe**.

### Was v2 ausdrücklich nicht mehr will

- kein globaler Cinematic-Look
- keine rich detailed environments als Qualitätsmerkmal
- keine komplett neue Projektpalette pro Video
- kein Material-/Fashion-Rendering
- kein komplexes Cel-Shading
- kein 3D/Pixar/Anime
- keine normalen Cartoon-/semi-realistischen Menschen

## YouTube-Struktur

```text
youtube/TT.MM.JJJJ-thema/
├── 01-script/script.txt
├── 02-google-flow/google-flow-prompt.txt
├── 03-bilder/01.png, 02.png, ...
├── 04-audio/final-voice.mp3
├── 05-export/final.mp4
└── 99-intern/
```

Für Pipeline-Kompatibilität kann `01.png` weiterhin Szene 01 + Cover sein. **Es ist aber nicht mehr der globale Style-Master.** Die Kanal-DNA kommt aus v2 und künftig aus `assets/style-v2/`.

## Bildlogik

Bevorzugte Szenenfamilien:
- ca. 60% `EVERYDAY_MINIMAL`
- ca. 25% `CONCEPT_METAPHOR`
- ca. 10% `COMPARE_CHANGE`
- höchstens ca. 5% Diagramm/Chart

Umgebung wird **angedeutet statt ausgerendert**: meist 1–5 relevante Requisiten und viel saubere Negativfläche.

## Script-Start

Neue YouTube-Skripte verwenden weiterhin `HOOK_FIRST_EXPLAIN_EARLY_V1`:
1. Szene 01 = klare Hook
2. Kernbegriff spätestens Szene 03
3. einfache Erklärung
4. erstes konkretes Alltagsbeispiel spätestens Szene 05
5. danach Mechanismus/Vertiefung

## Sichtbarer Text

Die Textpipeline bleibt bei dieser Bildwelt-Migration zunächst unverändert:
- geplante sichtbare deutsche Texte direkt aus Google Flow
- unplanned scenes: `ZERO READABLE TEXT`
- Remotion bleibt für Schnitt, Audio, technische Bildbewegung und Export

## Produktionsfolge

```text
THEMA + QUELLEN + CLAIM-CHECK
→ Hook-/Einstiegsplan
→ finales Skript
→ Visual Beats
→ v2-Szenenfamilie + Akzentrolle + Minimal-Props
→ Google-Flow-Bilder
→ finales Voice-over
→ lokale Whisper-Wortzeiten
→ Remotion
→ Final-QA
```

## Ein-Kommando-Produktion

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
```

## Qualitätssicherung

```bash
npm run check
npm run qa:premium-content
npm run qa:visual-variety
npm run qa:flow-prompts
npm run qa:word-timings
npm run qa:render-smoke
```

`qa:premium-content` behält aus Kompatibilitätsgründen den alten Script-Namen, prüft für v2 aber Minimal-Editorial-Regeln statt Cinematic-Premium-Regeln.
