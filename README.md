# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Alltagspsychologie & menschlichem Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Aktiver Standard

Bildwelt: **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

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
    ├── flow-text-policy.json (optional/project override)
    └── weitere QA-/Produktionsdateien
```

`01.png` ist immer **Szene 01 + Cover/Thumbnail + Style-/Anatomie-Master**.

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

Neue Policy:

```json
{
  "visibleTextRenderer": "GOOGLE_FLOW",
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY"
}
```

## Reels

Reels bleiben vollständig getrennt unter `reels/` und nutzen 9:16.

## Produktionsfolge

```text
THEMA + QUELLEN + CLAIM-CHECK
→ finales Skript
→ Phase 1 Visual Beats
→ Google-Flow-Bilder inklusive aller sichtbaren Texte
→ finales Voice-over
→ lokale Whisper-Wortzeiten
→ Phase 3 / Remotion für Schnitt + Audio + Export
→ Final-QA
```

### Ein-Kommando-Produktion

Sobald Bilder, `04-audio/final-voice.mp3` und `99-intern/phase1-scenes.json` vorliegen:

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
```

Der Befehl:
1. erzeugt fehlende `word-timings.json` automatisch mit lokalem Whisper.cpp,
2. richtet die Wortzeiten am finalen deutschen `script.txt` aus,
3. mappt Phase 1 auf die Wortzeiten,
4. staged Bilder und Audio automatisch nach `public/`,
5. führt Produktionschecks aus,
6. baut Remotion-Props ohne sichtbare YouTube-Texte,
7. rendert `05-export/final.mp4`,
8. prüft Auflösung, 30 fps, Audio und Dateidauer.

Vorhandene Exporte werden nicht überschrieben. Wortzeiten bewusst neu erzeugen:

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema --force-timings
```

## Automatische Word Timings

Die Wortzeiten werden lokal mit **Whisper.cpp** über `@remotion/install-whisper-cpp` erzeugt. Standardmodell ist `small`, Sprache Deutsch, kein API-Key nötig.

Nur Wortzeiten erzeugen:

```bash
npm run timings:youtube -- youtube/TT.MM.JJJJ-thema
```

## `public/`

`youtube/.../03-bilder/` und `youtube/.../04-audio/` sind die kanonischen Nutzerordner. `public/` ist nur die automatisch erzeugte Remotion-Staging-Fläche.

## Qualitätssicherung

```bash
npm run check
npm run qa:word-timings
npm run qa:render-smoke
```

Für geplante Flow-Textmomente bleibt eine visuelle QA wichtig: exakte Schreibweise, vollständige Buchstaben, keine zusätzlichen Wörter und keine abgeschnittene Typografie.
