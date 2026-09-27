# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie tun — verständlich, evidenzorientiert und visuell erklärt.

Keine medizinischen Diagnosen, Therapieanweisungen oder pseudowissenschaftlichen Versprechen.

## Source of Truth

Für neue Produktionen gilt diese Priorität:
1. `rules/VISUAL_SYSTEM.md` — gesamte aktive Bildwelt
2. `rules/visual-system.json` — maschinenlesbare Bildwelt
3. `rules/STICKMAN_DNA.md` — Anatomie
4. `rules/FORMAT_LOCK.md` — Format
5. `rules/SCRIPT_HOOK_LOCK.md` — Einstieg
6. `rules/YOUTUBE_VISUAL_BEAT_RULES.md` — Beat-Aufteilung
7. `rules/COMPOSITION_VARIATION_LOCK.md` + `rules/SOCIAL_SCENE_LOCK.md`
8. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
9. `rules/IMAGE_REFERENCE_LOCK.md`

`rules/YOUTUBE_STYLE_LOCK.md` und `rules/PREMIUM_VISUAL_LOCK.md` bleiben als Kompatibilitätsdateien bestehen, dürfen aber `rules/VISUAL_SYSTEM.md` nicht überschreiben.

## Aktive Bildwelt

**Minimal Editorial Stickman World v2**

Policy: `MINIMAL_EDITORIAL_STICKMAN_V2`

Die alte `Universal Editorial Stickman World v1.3` / `PREMIUM_EDITORIAL_CINEMATIC_V1` ist Legacy und wird für neue Produktionen nicht mehr verwendet.

### Leitidee

**Simple stickmen. Sparse editorial world. One visual idea. One dominant accent. Instant readability.**

### Kanalpalette

- Background: `#F6F3EA`
- Ink: `#202124`
- Blue: `#3F6EDB`
- Coral / Problem: `#E7684A`
- Green / Lösung: `#4E9B78`
- Optional Amber: `#D6A23D`

Keine komplett neue Projektpalette pro Video.
Normale Szene: meistens eine dominante Akzentfarbe.

### Umgebung

**Suggest, do not render.**

- typischerweise 1–5 relevante Requisiten
- große Negativflächen
- einfache Boden-/Wandlinie nur wenn nötig
- flache Shapes
- kein unnötiges Dekor
- kein globaler Cinematic-Look
- keine reichen detailvollen Umgebungen als Default
- keine Materialtexturen oder komplexes Cel-Shading als Qualitätsmerkmal

### Figuren

Alle Personen folgen `rules/STICKMAN_DNA.md`:
- runder/leicht ovaler flacher Kopf
- minimale Punkt-/Strichmimik
- flacher kompakter Torso
- sehr dünne lineare Arme/Beine
- keine Finger
- keine realistische Anatomie
- Kleidung nur als einfache grafische Form

## Szenenfamilien

Für typische Psychologie-Videos:
- ca. 60% `EVERYDAY_MINIMAL`
- ca. 25% `CONCEPT_METAPHOR`
- ca. 10% `COMPARE_CHANGE`
- höchstens ca. 5% Diagramm/Chart

Das sind Richtwerte, kein mathematischer Zwang.

## Visual-Beat-Prinzip

Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich ein eigenes Bild.

Verbindlich:
- ein primärer Gedanke
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende Hinweise
- konkrete einfache Handlung oder klare Metapher
- keine Detailzugabe nur für Premium-Wirkung
- Zuschauer soll die Aussage ungefähr in einer Sekunde erfassen können

Dichte:
- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur als Ausnahme
- absolute Obergrenze 28

## Script-Einstieg

Neue YouTube-Projekte verwenden:
`scriptHookPolicy: "HOOK_FIRST_EXPLAIN_EARLY_V1"`

Richtwerte:
- Hook in Szene 01
- Kernbegriff spätestens Szene 03 / ungefähr erste 50–60 Wörter
- erstes konkretes Alltagsbeispiel spätestens Szene 05

## Referenzsystem

Die permanente Kanalreferenz liegt unter:
`assets/style-v2/`

Zielassets:
- `style-master.png`
- `anatomy-sheet.png`
- `environment-examples.png`
- `metaphor-examples.png`
- `thumbnail-reference.png`

Bis diese Bilder erzeugt/freigegeben sind, sind `rules/VISUAL_SYSTEM.md` + `rules/visual-system.json` maßgeblich.

`03-bilder/01.png` darf aus Pipeline-Gründen weiterhin Szene 01 + Cover sein, ist aber **nicht mehr der globale Style-Master**.

## Textsystem

Die Textpipeline wird durch die v2-Bildwelt-Migration nicht verändert.

Für YouTube:
- geplante Textmomente: exakter deutscher Text direkt im Google-Flow-Bild
- Cover: 2–7 Wörter
- spätere Keywords: maximal 5 Wörter
- alle übrigen Szenen: `ZERO READABLE TEXT`
- `sceneLabels: []`
- `renderGermanLabelsInRemotion: false`

## Neue v2-Metadaten

Neue Projekte verwenden mindestens:

```json
{
  "visualSystem": "MINIMAL_EDITORIAL_STICKMAN_V2",
  "channelPalette": {
    "background": "#F6F3EA",
    "ink": "#202124",
    "primary": "#3F6EDB",
    "problem": "#E7684A",
    "solution": "#4E9B78",
    "optionalSignal": "#D6A23D"
  },
  "environmentPolicy": "SPARSE_SUGGESTED_ENVIRONMENT_V1",
  "accentPolicy": "ONE_DOMINANT_ACCENT_V1",
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "visualPlanningPolicy": "VARIED_COMPOSITION_V1",
  "socialScenePolicy": "SOCIAL_VARIETY_V1",
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3"
}
```

Legacy keys such as `premiumVisualPolicy`, `colorStoryPolicy` and per-video `projectPalette` are not required for v2.

## Produktionsfolge

THEMA + QUELLEN + CLAIM-CHECK
→ HOOK-/EINSTIEGSPLAN
→ finales Skript
→ Visual Beats
→ v2-Szenenfamilie + Akzentrolle + Minimal-Props
→ Google-Flow-Bilder
→ finales Audio/Timings
→ Remotion
→ Final-QA

## Qualitätssicherung

Bei Änderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:visual-variety`
- `npm run qa:premium-content`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`

Der Dateiname `qa:premium-content` bleibt aus Kompatibilitätsgründen bestehen; für v2 bedeutet Qualität **Minimalität + Klarheit + Konsistenz**, nicht Cinematic-Premium-Rendering.

## Hard Fail v2

- normale Cartoon-/semi-realistische/realistische Menschen
- 3D/CGI/Pixar/Anime/Chibi
- dicke anatomische Gliedmaßen oder Finger
- reiche detaillierte Welt als Default
- cinematic lighting als Default
- unnötige Material-/Fashion-Details
- zu viele konkurrierende Akzentfarben
- unklarer primärer Gedanke
- Dekoration ohne Erklärfunktion

## Priorität

Bei visuellem Konflikt gewinnt immer `rules/VISUAL_SYSTEM.md`.
