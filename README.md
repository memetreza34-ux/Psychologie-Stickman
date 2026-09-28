# Stickman — Produktionsrepo

Deutschsprachiger Kanal zu **Psychologie & menschlichem Verhalten**.

## Aktive Bildwelt

**Cinematic Human Behavior World v2**

Policy: `CINEMATIC_HUMAN_BEHAVIOR_V2`

Source of truth:
- `rules/VISUAL_SYSTEM.md`
- `rules/visual-system.json`
- `rules/FLOW_PROMPT_CONTRACT.md`
- `rules/STICKMAN_DNA.md`
- `assets/cinematic-human-behavior-world/`

Retired für neue Produktionen:
- Universal Editorial Stickman World v1.3
- Minimal Editorial Stickman v2
- Cinematic Illustrated Psychology World v1

## Kurzdefinition

**Eine einheitliche filmische 2D-Stickman-Welt, die von heller Alltagspsychologie bis zu Manipulation, Macht, Geld, Isolation und dunkleren Verhaltensthemen wechseln kann, ohne den Illustrationsstil zu wechseln.**

Nicht jedes Bild braucht eine Figur. Erlaubt sind Charakter-Szenen, Schemas, Objektmetaphern, Vergleiche und Text-Illustrationen in derselben Welt.

## Mood Engine

Jede Szene plant:
- `moodMode`: `CLEAR`, `UNEASY`, `DARK`, `POWER`, `MONEY`, `ISOLATION`, `HOPE`
- `moodIntensity`: `0–4`
- `powerDynamic`

Der Kanal ist weder dauerhaft hell noch dauerhaft dunkel. Stimmung folgt dem aktuellen gesprochenen Beat.

## Szenentypen

- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

## Charaktere

Alle Menschen gehören zu `STYLIZED_STICKMAN_CAST_V2`:
- großer einfacher Kopf
- minimale ausdrucksstarke Mimik
- sichtbarer vereinfachter Oberkörper/Kleidung
- sehr schlanke geformte Arme/Beine
- einfache Hände und Schuhe
- Individualität über Kleidung, Haarhinweis, Accessoire, Pose, Ausdruck und Silhouette

Figuren dürfen freundlich, neutral, verletzlich, erschöpft, dominant, kalt, manipulativ, einschüchternd oder isoliert wirken. Die Anatomie bleibt gleich.

## Prompt-Struktur — HARD LOCK

Alle Google-Flow-Szenen verwenden `FLOW_SCENE_PROMPT_CONTRACT_V1`.

Jeder Szenenblock hat dieselbe feste Reihenfolge. Jeder `PROMPT:` enthält dieselben Unterblöcke:

1. `[GOAL]`
2. `[WORLD LOCK]`
3. `[CHARACTER LOCK]`
4. `[PSYCHOLOGICAL MOOD]`
5. `[SCENE CONTENT]`
6. `[CAMERA + COMPOSITION]`
7. `[LIGHT + COLOR]`
8. `[TEXT LOCK]`
9. `[NEGATIVE LOCK]`
10. `[FINAL CHECK]`

Nur die Szenenwerte ändern sich. Die Struktur bleibt identisch.

`npm run qa:flow-prompts` prüft diese Struktur bei v2-Prompts.

## Text

Google Flow rendert geplanten sichtbaren Text direkt im Bild. Alle nicht geplanten Texte bleiben `ZERO READABLE TEXT`. Der Speech Context wird nie sichtbar gerendert. Remotion erzeugt keinen sichtbaren YouTube-Text.

## Referenzsystem

Globale Referenzen liegen unter `assets/cinematic-human-behavior-world/` und decken unterschiedliche Charakter-, Licht-, Mood-, Umwelt-, Geld-/Status- und Manipulationssituationen ab.

`03-bilder/01.png` bleibt Szene 01 + Cover, ist aber **nicht** der globale Style-Master.

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
→ Szenentyp + Mood + Power Dynamic + Cast/Objekt + Ort + Kamera + Licht + Farbe + Textmodus
→ fester Flow-Prompt-Contract
→ Google Flow
→ Voice + Whisper Timings
→ Remotion
→ Final-QA
```

```bash
npm run produce:youtube -- youtube/TT.MM.JJJJ-thema
npm run check
```
