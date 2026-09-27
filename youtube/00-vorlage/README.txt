YOUTUBE LONGFORM — EINFACHE ARBEITSSTRUKTUR

Jedes neue YouTube-Projekt verwendet diese sichtbaren Arbeitsordner:

01-script/
- script.txt
- Szene 01 = klarer Hook
- Kernbegriff spätestens Szene 03
- erstes konkretes Alltagsbeispiel spätestens Szene 05

02-google-flow/
- google-flow-prompt.txt
- VISUAL SYSTEM = MINIMAL_EDITORIAL_STICKMAN_V2
- ENVIRONMENT POLICY = SPARSE_SUGGESTED_ENVIRONMENT_V1
- ACCENT POLICY = ONE_DOMINANT_ACCENT_V1
- feste Kanalpalette statt eigener Projektpalette
- Umgebungen nur andeuten, nicht ausrendern
- jede Szene bekommt SCENE FAMILY + ACCENT ROLE + MINIMAL PROPS
- sichtbare YouTube-Texte weiterhin direkt aus Google Flow

03-bilder/
- `01.png`, `02.png`, `03.png` usw.
- `01.png` ist Szene 01 + Cover/Thumbnail für Pipeline-Kompatibilität
- `01.png` ist NICHT mehr der globale Style-Master
- globale Style-Source-of-Truth: rules/VISUAL_SYSTEM.md + assets/style-v2/
- nicht geplante Textszenen bleiben ZERO READABLE TEXT

04-audio/
- final-voice.mp3

05-export/
- final.mp4

99-intern/
- phase1-scenes.json
- Pflicht für neue Projekte: visualSystem + channelPalette + environmentPolicy + accentPolicy
- word-timings.json
- scene-plan.json
- render-props.json
- Quellen, QA, Style, Continuity und weitere Pipeline-Metadaten

Neue Projekte:
- `scriptHookPolicy = HOOK_FIRST_EXPLAIN_EARLY_V1`
- `visualSystem = MINIMAL_EDITORIAL_STICKMAN_V2`
- `environmentPolicy = SPARSE_SUGGESTED_ENVIRONMENT_V1`
- `accentPolicy = ONE_DOMINANT_ACCENT_V1`
- `visualPlanningPolicy = VARIED_COMPOSITION_V1`
- `socialScenePolicy = SOCIAL_VARIETY_V1`
- `visibleTextRenderer = GOOGLE_FLOW`
- `finalTextPolicy = FLOW_VISIBLE_TEXT_ONLY_V3`

KANALPALETTE
- Background #F6F3EA
- Ink #202124
- Blue #3F6EDB
- Coral #E7684A
- Green #4E9B78
- optional Amber #D6A23D

Nicht als Default akzeptieren:
- cinematic lighting
- rich detailed environments
- komplett neue Projektpalette pro Video
- Material-/Fashion-Rendering
- normale Cartoon-/semi-realistische Menschen
- 3D/CGI/Anime

Sobald Bilder und finales Audio fertig sind:
`npm run produce:youtube -- youtube/TT.MM.JJJJ-thema`

Wichtige QA:
`npm run qa:premium-content`
`npm run qa:visual-variety`
`npm run qa:flow-prompts`

Der QA-Scriptname `premium-content` bleibt aus Kompatibilitätsgründen; v2 bewertet Minimalität, Klarheit und Konsistenz statt Cinematic-Premium-Rendering.
