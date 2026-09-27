# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Alltagspsychologie & menschlichem Verhalten**.

## Aktive Bildwelt

**Cinematic Illustrated Psychology World v1**

Policy: `CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1`

Source of truth:
- `rules/VISUAL_SYSTEM.md`
- `rules/visual-system.json`
- `rules/STICKMAN_DNA.md`
- `assets/cinematic-psychology-world/`

Die alte Minimal-Editorial-v2-Bildwelt ist **nicht mehr aktiv**.

### Kurzdefinition

**Stilisierte stickman-inspirierte Figuren + Kleidung + farbige glaubwürdige Orte + filmische 2D-Komposition + soft cel shading + verschiedene Erklärformen in derselben Welt.**

Nicht jedes Bild braucht eine Figur. Erlaubt sind auch Schemas, Objektmetaphern, Vergleiche und Text-Illustrationen, solange sie exakt dieselbe visuelle Welt benutzen.

## Szenentypen

- `CHARACTER_SCENE` — normale Alltagsszene mit Figuren
- `SCHEMA_EXPLAINER` — illustriertes Schema mit kurzen exakten Labels
- `OBJECT_METAPHOR` — Objekt/Metapher ohne notwendige Figur
- `COMPARE_VISUAL` — A/B, vorher/nachher, Gedanke/Wirklichkeit
- `TEXT_ILLUSTRATION` — kurze integrierte Begriff-/Merksatz-Illustration

Richtmix: ungefähr 55 / 15 / 15 / 10 / 5 Prozent. Inhalt gewinnt immer vor Quote.

## Charaktere

Figuren bleiben klar vereinfacht und stickman-inspiriert, sind aber **keine nackten Strichmännchen**:
- großer einfacher Kopf
- minimale ausdrucksstarke Mimik
- sichtbarer vereinfachter Oberkörper/Kleidung
- sehr schlanke geformte Arme/Beine
- einfache Hände und Schuhe
- Individualität über Kleidung, Haarhinweis, Brille, Accessoire, Pose und Farbe

## Welt

Believable, colorful, film-like 2D locations with meaningful details, natural depth, clean outlines, soft cel shading and warm/cool lighting. No photorealism, no 3D/Pixar, no corporate vector look, no whiteboard world.

## Text

Google Flow rendert geplanten sichtbaren Text direkt im Bild. Erlaubt sind Cover, Keywords, Schema-Titel/Labels, Vergleichslabels und kurze Text-Illustrationen. Alle nicht geplanten Texte bleiben `ZERO READABLE TEXT`. Remotion erzeugt keinen sichtbaren YouTube-Text.

## Referenzsystem

Globale Referenzen liegen unter `assets/cinematic-psychology-world/`. `03-bilder/01.png` bleibt Szene 01 + Cover, ist aber **nicht** der globale Style-Master.

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

## Produktion

```text
THEMA + QUELLEN + CLAIM-CHECK
→ Script/Hook
→ Visual Beats
→ Szenentyp + Cast/Objekt + Ort + Kamera + Licht + Textmodus
→ Google Flow
→ Voice + Whisper Timings
→ Remotion
→ Final-QA
```

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
npm run check
```
