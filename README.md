# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Psychologie & menschlichem Verhalten**.

## Aktive Bildwelt

**Cinematic Human Behavior World v2**

Policy: `CINEMATIC_HUMAN_BEHAVIOR_V2`

Source of truth:
- `rules/VISUAL_SYSTEM.md`
- `rules/visual-system.json`
- `rules/STICKMAN_DNA.md`
- `assets/cinematic-human-behavior-world/`

Retired für neue Produktionen:
- Universal Editorial Stickman World v1.3
- Minimal Editorial Stickman v2
- Cinematic Illustrated Psychology World v1

## Kurzdefinition

**Eine einheitliche filmische 2D-Stickman-Welt, die von heller Alltagspsychologie bis zu Manipulation, Macht, Geld, Isolation und dunkleren Verhaltensthemen wechseln kann, ohne den Illustrationsstil zu wechseln.**

Nicht jedes Bild braucht eine Figur. Erlaubt sind Charakter-Szenen, Schemas, Objektmetaphern, Vergleiche und Text-Illustrationen in derselben Welt.

## Charaktere

Alle Menschen gehören zu `STYLIZED_STICKMAN_CAST_V2`:
- großer einfacher Kopf
- minimale Mimik
- schmaler bekleideter Torso
- sehr dünne Arme und Beine
- einfache Hände und Schuhe
- Individualität über Kleidung, Haarhinweis, Accessoire, Pose und Ausdruck

Normale Cartoon-Menschen, realistische Menschen, 3D/Pixar und Anime sind nicht erlaubt.

## Google Flow — bestehende Struktur bleibt

Pro Video gibt es **eine einzige** Datei:

`02-google-flow/google-flow-prompt.txt`

Diese Datei enthält:
- globale Bildwelt-/Charakterregeln
- Text-/Cover-/Referenzregeln
- alle Szenen des gesamten Videos

Die Datei wird **nicht** in mehrere Master-Prompts oder Batch-Prompt-Dateien aufgeteilt. Batches betreffen nur die schrittweise Bildgenerierung aus derselben Datei.

## Text

Google Flow rendert geplanten sichtbaren Text direkt im Bild. Alle nicht geplanten Texte bleiben `ZERO READABLE TEXT`. Der Speech Context wird nie sichtbar gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.

## Referenzsystem

Globale Referenzen liegen unter `assets/cinematic-human-behavior-world/`.

`03-bilder/01.png` bleibt Szene 01 + Cover. Die permanente Bildwelt kommt aus den Kanalregeln und Referenzen.

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
→ Google Flow
→ Voice + Whisper Timings
→ Remotion
→ final.mp4 + thumbnail.png + youtube-upload.txt
→ Final-QA
```

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
npm run check
```
