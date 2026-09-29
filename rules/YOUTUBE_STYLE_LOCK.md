# YOUTUBE STYLE LOCK

**STATUS: LOCKED — CINEMATIC HUMAN BEHAVIOR WORLD v2**

Authoritative source: `rules/VISUAL_SYSTEM.md`.

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
- controlled color
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

## Adaptive mood

Scenes may use:
- `CLEAR`
- `UNEASY`
- `DARK`
- `POWER`
- `MONEY`
- `ISOLATION`
- `HOPE`

Mood changes framing, light, posture, negative space, saturation and temperature. It never changes the channel's illustration family.

The channel is neither permanently bright nor permanently dark.

## Mixed visual storytelling

A frame may be:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

A stickman is not required in every image. Non-character frames remain in the same rendering world.

## Environment

Normal real-life scenes should not default to blank cream/off-white space. Use believable scene-specific environments, depth and motivated lighting. Sparse space is deliberate, not a shortcut.

## Dark-scene rule

Dark psychology does not mean empty black backgrounds or horror clichés.

Prefer motivated light, believable locations, graphic shadows, hierarchy, negative space, gaze, posture and camera angle.

## Google Flow structure and output

Each video keeps exactly one master file:

`02-google-flow/google-flow-prompt.txt`

All scenes remain inside that one file.

Output behavior follows `rules/FLOW_OUTPUT_MODE.md`:
- final source images only
- one separate 16:9 asset per scene number
- never combine several scenes into a storyboard/contact sheet/collage
- Scene 01 approval gate first
- regular generation in small batches from the same master file

Scene-specific prompts stay concise because global style rules are written once at the top of the master prompt.

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
- permanently cheerful colorful look regardless of topic
- permanently dark noir look regardless of topic
- several scene numbers inside one storyboard/contact-sheet image

## Reference

Permanent pack: `assets/cinematic-human-behavior-world/`.

A reference is usable only after it passes the visual/anatomy quality locks. Scene 01 remains cover + first beat and does not replace the permanent channel reference pack.

## Priority

`rules/VISUAL_SYSTEM.md` wins every visual conflict.
