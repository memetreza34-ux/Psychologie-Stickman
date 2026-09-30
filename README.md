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
- `assets/cinematic-human-behavior-world/`

Retired für neue Produktionen:
- Universal Editorial Stickman World v1.3
- Minimal Editorial Stickman v2
- Cinematic Illustrated Psychology World v1
- `FLOW_SCENE_PROMPT_CONTRACT_V1`
- `NATURAL_FLOW_MASTER_V1`

## Kurzdefinition

**Eine mature filmische 2D-Stickman-Welt für Psychologie und menschliches Verhalten: einfache strikte Stickman-Figuren in reichen glaubwürdigen Umgebungen, mit adaptiver Stimmung, Licht und Farbe.**

Nicht jedes Bild braucht eine Figur. Erlaubt sind Charakter-Szenen, Schemas, Objekt-/Umgebungsbilder, Vergleiche und sparsame Text-Illustrationen in derselben Welt.

## Wichtigste Prompt-Regel

Neue Videos verwenden `OBSERVABLE_SCENE_FIRST_V1` + `NATURAL_FLOW_MASTER_V2`.

**Do not prompt the psychology. Prompt the evidence of the psychology.**

Vor jedem Bildprompt:

```text
gesprochene Bedeutung
→ was soll der Zuschauer verstehen?
→ was kann man konkret sehen, das es beweist?
→ eine klare sichtbare Komposition
→ finaler Flow-Prompt
```

Google Flow soll nicht selbst erfinden müssen, wie ein abstrakter psychologischer Begriff aussieht.

Beispiel:
- Spotlight-Effekt ≠ automatisch echter Lichtkegel
- Ankereffekt ≠ automatisch Schiffsanker
- Halo-Effekt ≠ automatisch Heiligenschein

Emotionen und soziale Dynamiken werden über sichtbare Handlung, Haltung, Blickrichtung, Abstand, Blocking und Umgebung gezeigt.

## Charaktere

Alle Menschen gehören zu `STYLIZED_STICKMAN_CAST_V2`:
- großer einfacher Kopf, aber nicht chibi/mascot-übertrieben
- minimale Mimik
- kleiner schmaler bekleideter Torso
- schmale Schultern
- sehr dünne Arme und Beine
- einfache Hände ohne realistische Finger
- einfache Schuhe
- Individualität über Kleidung, Haarhinweis, Accessoire, Pose und Ausdruck

Nicht erlaubt: cute/chibi/mascot, normale Cartoon-Menschen, breite Schultern/dicke Gliedmaßen, realistische Menschen, 3D/Pixar und Anime.

## Bildwelt

**Simple Stickmen. Rich World. One clear idea per image.**

Normale Alltagsszenen benutzen glaubwürdige Orte, sinnvolle Requisiten, räumliche Tiefe und motiviertes Licht. Ein leerer cremefarbener Hintergrund ist kein Standardlook.

Darstellungsvielfalt ist **keine Quote**. Montage, Split, Gruppenszene, Schema oder Figur werden nur verwendet, wenn der aktuelle Beat sie wirklich braucht.

## Google Flow — eine Master-Datei

Pro Video gibt es genau:

`02-google-flow/google-flow-prompt.txt`

Diese Datei enthält:
- globale Bildwelt-/Charakterregeln
- Observable-Scene-Prompting-Regel
- Ausgabe-/Batchregeln
- Text-/Cover-/Referenzregeln
- alle Bilder des gesamten Videos

Die Datei wird nicht in Batch-Prompts aufgeteilt.

## Google Flow — Ausgabe

Verbindlich: `rules/FLOW_OUTPUT_MODE.md`.

Google Flow erzeugt **finale Einzelbilder**, kein Storyboard und kein fertiges Video.

- zuerst BILD 01
- genau 3 getrennte Cover-Kandidaten
- Nutzer wählt einen Gewinner → `03-bilder/01.png`
- erst danach weiter
- danach exakt 5 Bildnummern pro Batch, solange mindestens 5 übrig sind
- letzter Batch enthält 1–4 Restbilder
- jede Bildnummer = eigene 16:9-Bilddatei
- akzeptierte Bilder sofort `NN.png` benennen
- alles gemeinsam in einem flachen `03-bilder/`-Ordner
- niemals mehrere Szenen in Kontaktbogen / 3x3-Storyboard / Collage packen

Ein Split/Contrast/Montage innerhalb **eines** Bildes ist nur erlaubt, wenn alle Teile denselben untrennbaren Beat erklären.

## Text

Google Flow rendert geplanten sichtbaren Text direkt im Bild. Alle nicht geplanten Texte bleiben `ZERO READABLE TEXT`. Der Speech Context wird nie sichtbar gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.

## Referenzsystem

Globale Referenzen liegen unter `assets/cinematic-human-behavior-world/`.

Eine Referenz wird erst benutzt, wenn sie die mature Strict-Stickman-Anatomie und Premium-Bildwelt wirklich erfüllt. Ein schwaches/chibi-artiges Character Sheet darf nicht die Produktion steuern.

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

### `youtube-upload.txt`

Eine einzige Copy/Paste-Datei für den Upload. Sie enthält finalen Titel, Beschreibung/Caption, Quellen/Links falls relevant, Kapitel falls sinnvoll, Tags, Hashtags, angehefteten Kommentar oder `NONE`, bereinigten Sprechertext/Captions und Video-Daten.

Keine separaten normalen Upload-Dateien wie `title.txt`, `description.txt`, `tags.txt` oder `chapters.txt`.

## Produktion

```text
THEMA + QUELLEN + CLAIM-CHECK
→ Script/Hook
→ Visual Beats
→ Observable Evidence / konkrete Szenen
→ Bildwelt-/Mood-/Continuity-Plan
→ eine google-flow-prompt.txt mit allen Bildern
→ Flow: 3 Cover → Nutzerwahl → 5er-Batches
→ Voice + Whisper Timings
→ Remotion
→ final.mp4 + thumbnail.png + youtube-upload.txt
→ Final-QA
```

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
npm run check
```
