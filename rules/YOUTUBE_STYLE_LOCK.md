# YOUTUBE STYLE LOCK

**STATUS: LOCKED — CINEMATIC HUMAN BEHAVIOR WORLD v2**

Authoritative source: `rules/VISUAL_SYSTEM.md`.

Policy: `CINEMATIC_HUMAN_BEHAVIOR_V2`

## Core

- stylized stickman-inspired characters with clothing and strong readable body language
- polished cinematic 2D editorial/animated-film illustration
- believable environments ranging from bright everyday places to dark, tense, institutional, financial and night settings
- clean slightly organic outlines
- soft cel shading
- natural depth
- purposeful cinematic framing
- adaptive psychological lighting
- controlled color
- one primary behavioral/psychological beat per frame

## Adaptive mood

Every scene has:
- `moodMode`: `CLEAR`, `UNEASY`, `DARK`, `POWER`, `MONEY`, `ISOLATION`, or `HOPE`
- `moodIntensity`: `0–4`
- `powerDynamic`

Mood changes framing, light, posture, negative space, saturation and temperature. It never changes the channel's illustration family.

The channel is neither permanently bright nor permanently dark.

## Mixed visual storytelling

A frame may be:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

A stickman is not required in every image. Non-character frames must remain in the exact same rendering world.

## Dark-scene rule

Dark psychology does not mean empty black backgrounds or horror clichés.

Prefer motivated light, believable locations, graphic shadows, hierarchy, negative space, gaze, posture and camera angle.

## Prompt structure

Every Flow scene uses the fixed `FLOW_SCENE_PROMPT_CONTRACT_V1` from `rules/FLOW_PROMPT_CONTRACT.md`. The field order is immutable.

## Not allowed

- minimalist whiteboard / bare line-stickman world
- sparse off-white-paper world as channel default
- normal realistic/cartoon humans
- mixed character families
- 3D/Pixar/anime
- corporate vector infographic style
- photorealistic environments
- random style changes between scene families
- cheap villain clichés as the default dark-language
- permanently cheerful colorful look regardless of topic
- permanently dark noir look regardless of topic

## Reference

Permanent pack: `assets/cinematic-human-behavior-world/`.

Scene 01 is cover/first beat, not global style master.

## Priority

`rules/VISUAL_SYSTEM.md` wins every visual conflict.
