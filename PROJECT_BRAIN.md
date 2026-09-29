# PROJECT BRAIN

## Current direction

The production repo is for German psychology / human-behavior explainers.

Active world: **Cinematic Human Behavior World v2** (`CINEMATIC_HUMAN_BEHAVIOR_V2`).

The channel may range from ordinary cognitive effects to manipulation, power, status, money behavior, social pressure, deception, fear, trust, conflict and constructive solutions. The visual world is emotionally adaptive rather than permanently bright or dark.

## Character target

Not bare stick figures, not cute mascots and not normal cartoon humans.

Use `STYLIZED_STICKMAN_CAST_V2`:
- large simple round/oval head without chibi exaggeration
- expressive minimal face
- small narrow clothed torso
- narrow shoulders
- very slim shaped limbs
- simple no-finger hands/shoes
- individualized clothing/accessory/hair cue when useful
- strong readable posture and silhouette

Characters may look warm, neutral, vulnerable, anxious, exhausted, dominant, cold, manipulative, deceptive, intimidating, isolated or authoritative while keeping the same anatomy family.

## World target

Frames should feel like stills from the same polished **adult psychology-documentary / editorial graphic-novel** 2D world.

Simple Stickmen live in a richer environment. Normal real-life scenes should use recognizable scene-specific locations, useful foreground/midground/background, meaningful props and motivated light.

Empty cream/off-white space is not the default visual world. Use sparse space only when it deliberately communicates isolation, clarity or another beat-specific idea.

Locations may include homes, cafés, trains, shops, offices, schools, streets, parks, negotiation rooms, corridors, night streets, status environments and institutional spaces.

Dark scenes still need believable spatial logic and motivated light. Do not turn difficult topics into generic black horror backgrounds.

## Mood behavior

The image world may use clear, uneasy, dark, power, money, isolation or hopeful moods as needed. Mood is communicated through light, framing, posture, negative space, saturation, temperature and environment.

## Mixed representations

Do not force a character into every frame.

Typical guidance:
- 45–60% character scenes
- 10–20% schemas
- 10–20% object metaphors
- 10–20% comparisons
- up to 10% text illustrations

The clearest representation for the spoken beat wins.

## Google Flow production structure

The production structure stays unchanged:

`02-google-flow/google-flow-prompt.txt`

There is **one Flow master file per video**. It contains the global visual/output rules plus all scene prompts for the entire video.

Do not split one video into multiple Flow master prompts. Batches are only generation steps from the same master file.

Scene prompts stay concise and practical rather than repeating large technical lock blocks for every scene.

## Google Flow output behavior — future projects

Binding rule: `rules/FLOW_OUTPUT_MODE.md`.

New projects use `FINAL_SEPARATE_IMAGE_ASSETS_V2`.

The master file generates final source images, not a storyboard/contact sheet and not the final video.

Workflow:
1. Scene 01 only → exactly 3 separate cover candidates.
2. User approves one → rename immediately to `01.png` and place in `03-bilder/`.
3. Continue from the same master file in batches of exactly 5 scenes whenever at least 5 remain.
4. Final remainder batch contains 1–4 scenes.
5. Generate each five-scene batch as one batch operation, not deliberately one scene at a time.
6. Every scene number is still its own separate 16:9 image.
7. Immediately rename each accepted image to `NN.png`.
8. Keep every accepted image together in the same flat `03-bilder/` folder; no batch subfolders.
9. QA each batch, regenerate only failures, then continue automatically with the next batch.
10. Never combine different scene numbers in one panel grid/collage and never ask Flow to build the final video.

Existing/historical projects keep their current prompt behavior unless the user explicitly requests migration of that specific project.

## Reference pack

Permanent path: `assets/cinematic-human-behavior-world/`.

The pack may cover neutral characters, emotional/dark roles, groups, clear/uneasy/dark/power lighting, day/night environments, money/status, manipulation, schemas, metaphors and covers.

A generated reference must pass mature anatomy + visual quality QA before it becomes authoritative. A weak chibi/cartoon reference must never propagate through the production.

Scene 01 remains cover + first beat. The permanent channel style is defined by the visual rules and approved references.

## Production priority

Optimize for:
1. current-beat clarity
2. strict mature Stickman anatomy
3. rich believable world / environment storytelling
4. world consistency
5. psychological mood accuracy
6. readable body language and power relation
7. representation variety
8. separate final Flow image assets
9. efficient five-scene Flow batching
10. correct immediate scene filenames and one final image folder
11. concise Flow scene prompts
12. clean exact Flow text when planned

## Current migration rule

Historical produced videos may remain legacy artifacts.

New visual productions use:
- `CINEMATIC_HUMAN_BEHAVIOR_V2`
- `STYLIZED_STICKMAN_CAST_V2`
- `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

The production folder and single-Flow-file workflow remain unchanged.
