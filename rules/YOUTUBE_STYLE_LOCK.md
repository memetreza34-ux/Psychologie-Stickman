# YOUTUBE STYLE LOCK

**STATUS: LOCKED — CINEMATIC HUMAN BEHAVIOR WORLD v2**

Authoritative visual source: `rules/VISUAL_SYSTEM.md`.
Creative translation source: `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`.
Flow prompt source: `rules/FLOW_PROMPT_ARCHITECTURE.md`.

Policy: `CINEMATIC_HUMAN_BEHAVIOR_V2`

## Core

- polished hand-drawn 2D Stickman illustration
- simple round/oval heads
- slim simplified bodies
- thin clearly drawn arms and legs
- simple clothing and expressive minimal faces
- clean dark outlines
- flat controlled colors
- soft graphic/cel shading
- characters, objects and environments in the same illustrated language
- one clear behavioral idea per frame

## Topic world

The drawing DNA stays the same, but every video may build a different local world.

Bright topics may be bright and open. Uneasy topics may be cooler. Manipulation/power may be darker. Hopeful topics may be warmer. Everyday topics may use natural local color.

Do not force every video into the same red/dark or teal/cream palette.

## Observable behavior first

New videos use `OBSERVABLE_SCENE_FIRST_V1`.

Translate psychology into concrete visible action, posture, gaze, distance, object relation and environment activity before writing the image prompt.

Do not automatically turn effect names into literal props or special effects.

## Mixed visual storytelling

A frame may be a character scene, object/environment image, comparison, schema or text illustration. A Stickman is not required in every image.

## Google Flow

Each video keeps exactly one master file:

`02-google-flow/google-flow-prompt.txt`

The prompt stays concise. Global style is stated once, then every `BILD NN` repeats only one short style anchor plus the actual scene direction.

Output follows `FINAL_SEPARATE_IMAGE_ASSETS_V2`:
- BILD 01 first as exactly 3 separate cover candidates
- STOP for user selection
- chosen cover becomes `01.png`
- the chosen cover becomes the video-local visual reference for later batches
- then exact five-image batches whenever five remain
- every scene stays a separate 16:9 image
- accepted images are renamed `NN.png`
- all accepted images stay together in `03-bilder/`

## Minimal not allowed

- photorealistic/realistic humans
- 3D/Pixar/anime
- cute/chibi/mascot
- bare whiteboard Stickmen
- realistic environment mixed with doodle characters
- random text
- style reset between batches

## Priority

`rules/VISUAL_SYSTEM.md` defines the world.
`rules/VISUAL_DIRECTOR_PROMPT_WRITER.md` defines the scene idea.
`rules/FLOW_PROMPT_ARCHITECTURE.md` defines the final Flow prompt.
