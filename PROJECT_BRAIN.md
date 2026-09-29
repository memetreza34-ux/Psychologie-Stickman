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
- restrained eyebrow/eye/mouth variation
- strong readable posture, gaze and silhouette

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

There is **one Flow master file per video**. It contains the global visual/output rules plus all image prompts for the entire video.

Do not split one video into multiple Flow master prompts. Batches are only generation steps from the same master file.

### Natural Flow architecture

New videos use `NATURAL_FLOW_MASTER_V1` from `rules/FLOW_PROMPT_ARCHITECTURE.md`.

Detailed planning remains in `99-intern/` and may contain scene type, visual function, composition, social density, mood, power dynamic, camera, continuity, text policy and QA.

The final `google-flow-prompt.txt` does **not** repeat those technical fields for every image. It is written as direct art direction:
1. task/output
2. concise channel visual world
3. character/reference system
4. video world lock
5. generation workflow
6. global text rule
7. `BILD 01` through `BILD NN` as natural image prompts

Global style/anatomy rules appear once. Individual image prompts stay short, visual and practical.

## Google Flow output behavior — future projects

Binding rule: `rules/FLOW_OUTPUT_MODE.md`.

New projects use `FINAL_SEPARATE_IMAGE_ASSETS_V2`.

The master file generates final source images, not a storyboard/contact sheet and not the final video.

Workflow:
1. Read the full master prompt.
2. Bild 01 only → exactly 3 separate cover candidates.
3. STOP and wait for the user to choose one.
4. User-approved winner → rename immediately to `01.png` and place in `03-bilder/`.
5. Only after cover approval, continue from the same master file in batches of exactly 5 images whenever at least 5 remain.
6. Final remainder batch contains 1–4 images.
7. Generate each five-image batch as one batch operation, not deliberately one image at a time.
8. Every image number is still its own separate 16:9 image.
9. Immediately rename each accepted image to `NN.png`.
10. Keep every accepted image together in the same flat `03-bilder/` folder; no batch subfolders.
11. QA each batch, regenerate only failures, then continue automatically with the next batch.
12. Never combine different image numbers in one panel grid/collage and never ask Flow to build the final video.

Existing/historical projects keep their current prompt behavior unless the user explicitly requests migration of that specific project.

## Reference pack

Permanent path: `assets/cinematic-human-behavior-world/`.

Use a **small approved reference system by role**, not a huge unverified style collage.

Preferred minimal set when useful:
- `style-master.png` — overall style/render/anatomy-quality anchor
- one or two approved images for recurring Character A
- one or two approved images for recurring Character B when needed
- `character-group.png` when group consistency benefits from it
- one optional schema/environment reference when needed

Not every video needs every reference. Until an actual image is approved, the text rules remain authoritative.

A generated reference must pass mature anatomy + visual quality QA before it becomes authoritative. A weak chibi/cartoon reference must never propagate through the production.

Scene/Bild 01 remains cover + first beat. The permanent channel style is defined by the visual rules and approved references.

## Production priority

Optimize for:
1. current-beat clarity
2. strict mature Stickman anatomy
3. rich believable world / environment storytelling
4. world consistency
5. psychological mood accuracy
6. readable body language and power relation
7. representation variety
8. natural concise Flow art direction
9. separate final Flow image assets
10. efficient five-image Flow batching after cover approval
11. correct immediate image filenames and one final image folder
12. clean exact Flow text when planned

## Current migration rule

Historical produced videos may remain legacy artifacts.

New visual productions use:
- `CINEMATIC_HUMAN_BEHAVIOR_V2`
- `STYLIZED_STICKMAN_CAST_V2`
- `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`
- `REPRESENTATION_VARIETY_V1`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`
- `NATURAL_FLOW_MASTER_V1`

The production folder and single-Flow-file workflow remain unchanged.
