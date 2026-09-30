# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Psychologie & menschlichem Verhalten**.

## Aktive Bildwelt

**Cinematic Human Behavior World v2** — `CINEMATIC_HUMAN_BEHAVIOR_V2`

Source of truth:
- `rules/VISUAL_SYSTEM.md`
- `rules/visual-system.json`
- `rules/STICKMAN_DNA.md`
- `rules/PREMIUM_VISUAL_LOCK.md`
- `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
- `rules/FLOW_PROMPT_ARCHITECTURE.md`
- `rules/FLOW_OUTPUT_MODE.md`
- `rules/IMAGE_REFERENCE_LOCK.md`

## Kurzdefinition

**Polierte handgezeichnete 2D-Stickman-Illustrationen mit klaren dunklen Konturen, einfachen Formen, flachen kontrollierten Farben und weicher grafischer Schattierung. Figuren, Objekte und Umgebungen gehören sichtbar zur selben gezeichneten Welt.**

Nicht jedes Bild braucht eine Figur.

## Charaktere

`STYLIZED_STICKMAN_CAST_V2`:
- runder/ovaler einfacher Kopf
- minimale ausdrucksstarke Mimik
- schlanker vereinfachter Körper
- dünne, klar gezeichnete Arme und Beine
- einfache Kleidung, Hände und Schuhe

Ziel: **ordentliche illustrierte Stickmen** — weder nackte Strichmännchen noch normale Cartoon-/Real-Menschen.

Keine mathematische Überdefinition der Anatomie in Flow-Prompts.

## Jedes Thema bekommt seine eigene Welt

Der Zeichenstil bleibt gleich, Stimmung und lokale Welt dürfen stark wechseln:
- hell/offen
- kühl/unsicher
- dunkel/Macht
- warm/hoffnungsvoll
- Geld/Status
- Isolation

Nicht jedes Video automatisch rot/dunkel oder teal/creme machen.

## Wichtigste Prompt-Regel

**Do not prompt the psychology. Prompt the evidence of the psychology.**

```text
gesprochene Bedeutung
→ Viewer Takeaway
→ beobachtbare Handlung/Situation
→ klare Komposition
→ kurzer Flow-Prompt
```

## Google Flow — eine Master-Datei

Pro Video genau:

`02-google-flow/google-flow-prompt.txt`

Keine Batch-Prompt-Dateien.

Der finale Prompt bleibt kurz. Globaler Stil einmal am Anfang; pro Bild nur ein kurzer Style-Anchor plus die eigentliche Szene.

## Cover zuerst — HARD LOCK

1. Nur BILD 01.
2. Genau **3 getrennte Cover-Kandidaten**.
3. STOP.
4. Nutzer wählt einen.
5. Gewinner → `03-bilder/01.png`.
6. Dieses `01.png` wird danach die **visuelle Referenz für das restliche Video**.

Spätere Bilder übernehmen daraus Stickman-Konstruktion, Linework, Farb-/Shading-Sprache, Textur und Qualitätsniveau — aber nicht automatisch dieselbe Pose, denselben Raum oder dieselbe Palette.

## Danach 5er-Batches

Nach Cover-Auswahl:

```text
02–06
07–11
12–16
17–21
...
```

- kompletten 5er-Block zusammen erzeugen
- jedes Bild bleibt separat 16:9
- sofort `NN.png` benennen
- alles gemeinsam in `03-bilder/`
- keine Batch-Unterordner
- nur fehlerhafte Bilder einzeln neu erzeugen
- kein Storyboard / Kontaktbogen / fertiges Video in Flow

## Text

Nur ausdrücklich geplanter deutscher Text. Sonst `ZERO READABLE TEXT`.

## YouTube-Struktur

```text
youtube/TT.MM.JJJJ-thema/
├── 01-script/script.txt
├── 02-google-flow/google-flow-prompt.txt
├── 03-bilder/01.png, 02.png, ...
├── 04-audio/final-voice.mp3
├── 05-export/
│   ├── final.mp4
│   ├── thumbnail.png
│   └── youtube-upload.txt
└── 99-intern/
```

## Produktion

```text
THEMA + QUELLEN + CLAIM-CHECK
→ Script/Hook
→ Visual Beats
→ Observable Evidence
→ kurzer Video-World/Mood-Plan
→ eine google-flow-prompt.txt
→ 3 Cover
→ Nutzerwahl
→ gewähltes Cover als Referenz
→ 5er-Batches
→ Voice + Timings
→ Remotion
→ Export
```

Bestehende Projekte werden nur auf ausdrücklichen Wunsch migriert.
