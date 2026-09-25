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
→ lokale Whisper-Wortzeiten
→ Phase 3 / Remotion
→ Final-QA
```

### Ein-Kommando-Produktion für ein fertiges YouTube-Projekt

Sobald `03-bilder/`, `04-audio/final-voice.mp3` und `99-intern/phase1-scenes.json` vorliegen:

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
```

Der Befehl:

1. erzeugt bei fehlenden Wortzeiten automatisch `99-intern/word-timings.json` aus `final-voice.mp3`,
2. richtet die Whisper-Zeitstempel wieder exakt am finalen deutschen `script.txt` aus,
3. mappt Phase 1 auf die finalen Wortzeiten,
4. staged Bilder und Audio automatisch nach `public/`,
5. führt die Produktionschecks aus,
6. baut die Remotion-Props,
7. rendert `05-export/final.mp4`,
8. prüft Auflösung, 30 fps, Audio und Dateidauer.

Vorhandene Exporte werden nicht überschrieben. Bereits vorhandene nicht-leere Wortzeiten werden wiederverwendet. Zum bewussten Neu-Erzeugen:

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema --force-timings
```

## Automatische Word Timings

Die Wortzeiten werden lokal mit **Whisper.cpp** über `@remotion/install-whisper-cpp` erzeugt. Standardmodell ist `small`, Sprache ist Deutsch. Es ist kein API-Key nötig.

Beim ersten Lauf werden Whisper.cpp und das Modell unter `.whisper/` installiert bzw. heruntergeladen. Das kann einmalig länger dauern; danach wird der lokale Cache wiederverwendet. `.whisper/` wird nicht committed.

Nur die Wortzeiten erzeugen oder prüfen:

```bash
npm run timings:youtube -- youtube/TT.MM.JJJJ-thema
```

Optional kann das Modell gesetzt werden:

```bash
WHISPER_MODEL=small npm run timings:youtube -- youtube/TT.MM.JJJJ-thema --force
```

Nach der Transkription wird nicht einfach der erkannte Whisper-Text übernommen. Die Pipeline gleicht die erkannten Wörter mit dem kanonischen `01-script/script.txt` ab. Kleine Erkennungsfehler oder ausgelassene Einzelwörter werden zeitlich interpoliert; wenn Audio und Skript zu stark voneinander abweichen, bricht die Produktion statt mit falschen Schnitten weiterzulaufen.

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
npm run qa:word-timings
npm run qa:render-smoke
```

Die GitHub-CI führt `npm run check` und den echten Remotion-Smoke-Render aus. Die Word-Timing-QA testet zusätzlich kanonische Skriptausrichtung, Interpolation bei einzelnen Erkennungsfehlern und den Abbruch bei deutlich falschem Audio/Skript. Der Smoke-Test rendert ein echtes kurzes Remotion-Video und erkennt dadurch Fehler, die ein reiner TypeScript-Check nicht sehen würde.
