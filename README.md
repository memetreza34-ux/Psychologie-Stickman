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

`01.png` ist immer **Szene 01 + Cover/Thumbnail + Style-/Anatomie-Master**.

### Cover-Textregel

Google Flow rendert den **exakten deutschen Cover-Titel direkt in `01.png`**.

- 2–7 Wörter
- korrekte Schreibweise/Umlaute/Satzzeichen
- außer dem Cover-Titel kein weiterer lesbarer Text in Szene 01
- Remotion rendert den Cover-Titel nicht noch einmal
- ab Szene 02 bleiben Google-Flow-Bilder **ZERO READABLE TEXT**
- ausgewählte spätere deutsche Keywords werden kontrolliert in Remotion gesetzt

## Reels

Reels bleiben vollständig getrennt unter `reels/` und nutzen 9:16. YouTube und Reels werden weder in Ordnerstruktur noch Renderformat vermischt.

## Produktionsfolge

```text
THEMA + QUELLEN + CLAIM-CHECK
→ finales Skript
→ Phase 1 Visual Beats
→ Google-Flow-Bilder
→ finales Voice-over
→ lokale Whisper-Wortzeiten
→ Phase 3 / Remotion
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
6. baut Remotion-Props,
7. rendert `05-export/final.mp4`,
8. prüft Auflösung, 30 fps, Audio und Dateidauer.

Vorhandene Exporte werden nicht überschrieben. Wortzeiten bewusst neu erzeugen:

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema --force-timings
```

## Automatische Word Timings

Die Wortzeiten werden lokal mit **Whisper.cpp** über `@remotion/install-whisper-cpp` erzeugt. Standardmodell ist `small`, Sprache Deutsch, kein API-Key nötig.

Beim ersten Lauf werden Whisper.cpp und das Modell unter `.whisper/` installiert bzw. heruntergeladen. Danach wird der lokale Cache wiederverwendet.

Nur Wortzeiten erzeugen:

```bash
npm run timings:youtube -- youtube/TT.MM.JJJJ-thema
```

Die Pipeline gleicht Whisper mit dem kanonischen `01-script/script.txt` ab. Kleine Erkennungsfehler können interpoliert werden; bei deutlich falschem Audio/Skript wird abgebrochen.

## Warum `public/` existiert

`youtube/.../03-bilder/` und `youtube/.../04-audio/` sind die kanonischen Nutzerordner. `public/` ist nur die automatisch erzeugte Remotion-Staging-Fläche.

## Qualitätssicherung

```bash
npm run check
npm run qa:word-timings
npm run qa:render-smoke
```

Die CI prüft zusätzlich den echten Remotion-Smoke-Render. Für Szene 01 bleibt eine visuelle Freigabe nötig, insbesondere für **exakte Cover-Titel-Schreibweise und Thumbnail-Qualität**.
