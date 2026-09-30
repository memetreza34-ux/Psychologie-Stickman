# YOUTUBE STYLE LOCK

**STATUS: LOCKED — CINEMATIC HUMAN BEHAVIOR WORLD v2**

Authoritative visual source: `rules/VISUAL_SYSTEM.md`.
Creative translation source: `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`.
Flow prompt source: `rules/FLOW_PROMPT_ARCHITECTURE.md`.

Policy: `CINEMATIC_HUMAN_BEHAVIOR_V2`

## Core

- mature stylized strict-stickman characters with clothing and strong readable body language
- polished cinematic 2D editorial / psychology-documentary illustration
- believable environments ranging from bright everyday places to dark, tense, institutional, financial and night settings
- clean slightly organic outlines
- soft cel shading
- natural depth
- purposeful cinematic framing
- adaptive psychological lighting
- controlled local color
- one primary behavioral/psychological beat per frame

## Character tone

All visible humans use `STYLIZED_STICKMAN_CAST_V2`.

The figures are adult editorial stickmen, not cute mascots:
- large simple head without chibi exaggeration
- small narrow clothed torso
- narrow shoulders
- very slim arms and legs
- simple hands and shoes
- minimal face

No normal cartoon-human body volume.

## Observable behavior first — HARD LOCK

New videos use `OBSERVABLE_SCENE_FIRST_V1`.

Do not ask the image model to invent a visual for an abstract psychological state. Translate the beat into concrete visible evidence first: action, posture, gaze, distance, blocking, object relation and environment activity.

Named psychology effects are not literal art directions. Do not automatically turn Spotlight Effect into a spotlight, Anchor Effect into an anchor, Halo Effect into a halo or Framing into a picture frame.

Lighting, color and symbolism support the concrete action; they never replace it.

## Adaptive mood

Scenes may use CLEAR, UNEASY, DARK, POWER, MONEY, ISOLATION or HOPE.

Mood changes framing, light, posture, negative space, saturation and temperature. It never changes the illustration family and never substitutes for visible behavior.

The channel is neither permanently bright nor permanently dark.

## Mixed visual storytelling

A frame may be:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`
- environment/object-only illustration

A stickman is not required in every image.

Representation mix is guidance, not quota. Do not force a montage, group, split screen, schema or character merely to create variety.

## Environment

Normal real-life scenes should not default to blank cream/off-white space. Use believable scene-specific environments, depth and motivated lighting.

Concrete environment activity is preferred over generic wording such as `rich cinematic environment`.

## Dark-scene rule

Dark psychology does not mean empty black backgrounds or horror clichés.

Prefer believable locations, actual interaction, posture, gaze, hierarchy, distance and motivated shadows.

## Google Flow structure and output

Each video keeps exactly one master file:

`02-google-flow/google-flow-prompt.txt`

New videos use `NATURAL_FLOW_MASTER_V2`.

Final BILD prompts are natural direct art direction using concrete visible evidence, not repeated technical forms.

Output follows `FINAL_SEPARATE_IMAGE_ASSETS_V2`:
- final source images only
- BILD 01 first as exactly 3 separate cover candidates
- STOP for user selection
- chosen cover → `01.png` in `03-bilder/`
- later generation in exact five-image batches whenever five remain
- one separate 16:9 asset per image number
- accepted images immediately `NN.png`
- all accepted images together in the same flat `03-bilder/`
- no storyboard/contact sheet/collage/video

## Not allowed

- minimalist whiteboard / bare line-stickman world
- sparse off-white-paper world as channel default
- cute/chibi/mascot character world
- normal realistic/cartoon humans
- broad shoulders or thick cartoon-human limbs
- mixed character families
- 3D/Pixar/anime
- corporate vector infographic style
- photorealistic environments
- random style changes between scene families
- cheap villain clichés as the default dark-language
- permanently cheerful or permanently dark treatment regardless of beat
- abstract psychology instruction without concrete observable evidence
- literal effect-name gimmicks used as automatic visual shorthand
- forced montage/group/split/schema to satisfy a quota
- several image numbers inside one storyboard/contact-sheet asset

## Reference

Permanent pack: `assets/cinematic-human-behavior-world/`.

A reference is usable only after it passes the visual/anatomy quality locks. Scene 01 remains cover + first beat and does not replace the permanent channel reference pack.

## Priority

`rules/VISUAL_SYSTEM.md` defines the world.
`rules/VISUAL_DIRECTOR_PROMPT_WRITER.md` defines how a spoken beat becomes a visible scene.
`rules/FLOW_PROMPT_ARCHITECTURE.md` defines how that scene becomes the final Flow prompt.
