# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Alltagspsychologie & menschlichem Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Aktiver Standard

Bildwelt: **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Verbindliche Regeln beginnen in `CANONICAL_RULES.md`; die detaillierten Locks liegen unter `rules/`.

## YouTube-Struktur

Jedes moderne Longform-Projekt unter `youtube/` verwendet:

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
    ├── quellen/
    └── weitere QA-/Produktionsdateien
```

`01.png` ist immer **Szene 01 + Cover/Thumbnail-Basis + Style-/Anatomie-Master**. Google-Flow-Quellbilder bleiben textfrei; kontrollierter sichtbarer YouTube-Text wird auf Deutsch in Remotion gesetzt.

## Reels

Reels bleiben vollständig getrennt unter `reels/` und nutzen 9:16. YouTube und Reels werden weder in Ordnerstruktur noch Renderformat vermischt.

## Produktionsfolge

```text
THEMA + QUELLEN + CLAIM-CHECK
→ finales Skript
→ Phase 1 Visual Beats
→ Google-Flow-Bilder
→ finales Voice-over
→ Word Timings
→ Phase 3 / Remotion
→ Final-QA
```

### Ein-Kommando-Render für ein fertiges YouTube-Projekt

Sobald `03-bilder/`, `04-audio/final-voice.mp3`, `99-intern/phase1-scenes.json` und eine nicht-leere `99-intern/word-timings.json` vorliegen:

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
```

Der Befehl:

1. mappt Phase 1 auf die finalen Wortzeiten,
2. staged Bilder und Audio automatisch nach `public/`,
3. führt die Produktionschecks aus,
4. baut die Remotion-Props,
5. rendert `05-export/final.mp4`,
6. prüft Auflösung, 30 fps, Audio und Dateidauer.

Vorhandene Exporte werden nicht überschrieben.

## Warum `public/` existiert

`youtube/.../03-bilder/` und `youtube/.../04-audio/` sind die **kanonischen Nutzerordner**. Remotion lädt statische Medien jedoch über `public/`.

Darum wird `public/` nur als automatisch erzeugte Staging-Fläche verwendet. Der Nutzer kopiert Medien nicht manuell doppelt.

Manuell testen:

```bash
npm run stage:assets -- youtube/TT.MM.JJJJ-thema/99-intern/scene-plan.json
```

## Qualitätssicherung

```bash
npm run check
npm run qa:render-smoke
```

Die GitHub-CI führt beide Schritte aus. Der Smoke-Test rendert ein echtes kurzes Remotion-Video und erkennt dadurch Fehler, die ein reiner TypeScript-Check nicht sehen würde.

## Aktuelle technische Grenze

`word-timings.json` muss derzeit aus dem final bearbeiteten Voice-over erzeugt bzw. importiert werden, bevor `produce:youtube` laufen kann. Die Renderpipeline selbst ist danach durchgängig automatisiert.
