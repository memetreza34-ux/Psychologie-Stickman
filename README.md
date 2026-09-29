# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Psychologie & menschlichem Verhalten**.

## Aktive Bildwelt

**Cinematic Human Behavior World v2**

Policy: `CINEMATIC_HUMAN_BEHAVIOR_V2`

Source of truth:
- `rules/VISUAL_SYSTEM.md`
- `rules/visual-system.json`
- `rules/STICKMAN_DNA.md`
- `rules/PREMIUM_VISUAL_LOCK.md`
- `rules/FLOW_OUTPUT_MODE.md`
- `rules/IMAGE_REFERENCE_LOCK.md`
- `assets/cinematic-human-behavior-world/`

Retired für neue Produktionen:
- Universal Editorial Stickman World v1.3
- Minimal Editorial Stickman v2
- Cinematic Illustrated Psychology World v1

## Kurzdefinition

**Eine mature filmische 2D-Stickman-Welt für Psychologie und menschliches Verhalten: sehr einfache strikte Stickman-Figuren in reicheren glaubwürdigen Umgebungen, mit adaptiver Stimmung, Licht und Farbe.**

Nicht jedes Bild braucht eine Figur. Erlaubt sind Charakter-Szenen, Schemas, Objektmetaphern, Vergleiche und Text-Illustrationen in derselben Welt.

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

Normale Alltagsszenen sollen glaubwürdige Orte, sinnvolle Requisiten, Tiefe und motiviertes Licht haben. Ein leerer cremefarbener Hintergrund ist kein Standardlook und wird nur gezielt eingesetzt, wenn negative Leere selbst die Aussage trägt.

## Google Flow — bestehende Struktur bleibt

Pro Video gibt es **eine einzige** Datei:

`02-google-flow/google-flow-prompt.txt`

Diese Datei enthält:
- globale Bildwelt-/Charakterregeln
- Ausgabe-/Batchregeln
- Text-/Cover-/Referenzregeln
- alle Szenen des gesamten Videos

Die Datei wird **nicht** in mehrere Master-Prompts oder Batch-Prompt-Dateien aufgeteilt.

## Google Flow — Ausgabe

Verbindlich: `rules/FLOW_OUTPUT_MODE.md`.

Google Flow erzeugt **finale Einzelbilder**, kein Storyboard und kein fertiges Video.

- zuerst Scene 01
- 3 getrennte Scene-01-Cover-Kandidaten
- Nutzer wählt einen Gewinner → `03-bilder/01.png`
- danach standardmäßig 3 Szenen pro Batch, maximal 5
- jede Szenennummer = eine eigene 16:9-Bilddatei
- niemals mehrere Szenen in einen Kontaktbogen / ein 3x3-Storyboard / eine Collage packen

Ein Split/Contrast/Montage innerhalb **einer** Szene ist erlaubt, wenn alle Teile denselben gesprochenen Beat erklären.

## Text

Google Flow rendert geplanten sichtbaren Text direkt im Bild. Alle nicht geplanten Texte bleiben `ZERO READABLE TEXT`. Der Speech Context wird nie sichtbar gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.

## Referenzsystem

Globale Referenzen liegen unter `assets/cinematic-human-behavior-world/`.

Eine Referenz wird erst benutzt, wenn sie die mature Strict-Stickman-Anatomie und die Premium-Bildwelt wirklich erfüllt. Ein schwaches/chibi-artiges Character Sheet darf nicht die ganze Produktion steuern.

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

Eine einzige Copy/Paste-Datei für den Upload. Sie enthält immer:
- finalen YouTube-Titel
- Beschreibung / Caption
- Quellen / Links, falls vorhanden
- Kapitel, falls sinnvoll
- Tags
- Hashtags
- angehefteten Kommentar oder `NONE`
- bereinigten finalen Sprechertext / Captions
- Video-Daten

Keine separaten normalen Upload-Dateien wie `title.txt`, `description.txt`, `tags.txt` oder `chapters.txt`.

Verbindliche Regel: `rules/YOUTUBE_EXPORT_PACKAGE.md`.

## Produktion

```text
THEMA + QUELLEN + CLAIM-CHECK
→ Script/Hook
→ Visual Beats
→ Bildwelt-/Mood-/Szenenplanung
→ eine google-flow-prompt.txt mit allen Szenen
→ Flow: separate Einzelbilder
→ Voice + Whisper Timings
→ Remotion
→ final.mp4 + thumbnail.png + youtube-upload.txt
→ Final-QA
```

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
npm run check
```
