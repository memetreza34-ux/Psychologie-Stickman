# PROJECT BRAIN

## Current direction

The production repo is for German psychology / human-behavior explainers.

Active world: **Cinematic Human Behavior World v2** (`CINEMATIC_HUMAN_BEHAVIOR_V2`).

Active creative/prompt system for new videos:
- `OBSERVABLE_SCENE_FIRST_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

The channel may range from ordinary cognitive effects to manipulation, power, status, money behavior, social pressure, deception, fear, trust, conflict and constructive solutions.

## Character target

Use `STYLIZED_STICKMAN_CAST_V2`:
- large simple round/oval head without chibi exaggeration
- expressive minimal face
- small narrow clothed torso
- narrow shoulders
- very slim shaped limbs
- simple no-finger hands/shoes
- restrained individuality through clothing/accessory/hair cue, eyebrows, eyes/mouth, posture and gaze

Not bare doodles, cute mascots, normal cartoon humans, realistic humans, 3D/Pixar or anime.

## World target

Frames should feel like stills from the same polished **adult psychology-documentary / editorial graphic-novel** 2D world.

Simple Stickmen live in a richer environment. Normal real-life scenes use recognizable locations, useful foreground/midground/background, meaningful props and motivated light.

Empty cream/off-white space is not the default.

## Observable-scene creative rule — highest prompt priority

The main current lesson is:

**Do not prompt the psychology. Prompt the evidence of the psychology.**

Before a Flow image prompt is written:

```text
spoken meaning
→ viewer takeaway
→ observable evidence
→ one concrete visible composition
→ final Flow prompt
```

Google Flow must not be asked to invent how an abstract state such as pressure, attention, conformity, insecurity or dominance should look.

Use concrete behavior:
- gaze direction
- posture
- distance
- who looks at whom
- who ignores whom
- exact physical action
- object relation
- environment activity

Named effects are not literal visual instructions. Spotlight-Effekt does not automatically mean a spotlight; Ankereffekt does not automatically mean an anchor; Halo-Effekt does not automatically mean a halo.

## Mixed representations

Do not force a character into every frame.

Character scenes, schemas, object/environment images, comparisons and text illustrations remain available. Typical percentage ranges are **review guidance only**, never generation quotas.

Do not force montage, split screen, group scenes or schemas merely to create variety. Variation must come from the content.

## Google Flow production structure

The structure stays unchanged:

`02-google-flow/google-flow-prompt.txt`

There is exactly one Flow master file per video. It contains global visual/output rules plus all image prompts.

Do not split one video into multiple Flow masters. Batches are only generation steps from the same master file.

## Natural Flow architecture V2

New videos use `NATURAL_FLOW_MASTER_V2` from `rules/FLOW_PROMPT_ARCHITECTURE.md`.

Detailed planning remains in `99-intern/` and may contain viewer takeaway, observable evidence, scene type, composition, social density, mood, power dynamic, camera, continuity, text policy and QA.

The final `google-flow-prompt.txt` does not repeat those technical fields for every image.

A normal final `BILD NN` prompt is direct English art direction:
1. camera/framing
2. concrete subject(s)
3. exact visible action/relation
4. relevant other behavior/objects
5. concrete environment/props
6. light/local color
7. continuity when needed
8. exact German visible text or `No visible text.`
9. only a few local negatives when needed

Normal prompt target is roughly 45–110 words. Every sentence should change something visible.

## Google Flow Agent role

The Flow Agent is the **production executor**, not the autonomous art director.

It may:
- generate assets
- run the three-cover gate
- generate five-image batches
- QA/regenerate failures
- rename accepted files
- organize them in `03-bilder/`

But the repo should already provide the concrete visual idea. Do not delegate missing creative interpretation to Flow.

## Google Flow output behavior

Binding rule: `rules/FLOW_OUTPUT_MODE.md`.

1. Read full master prompt.
2. Bild 01 only → exactly 3 separate cover candidates.
3. STOP and wait for user choice.
4. User-approved winner → `01.png` in `03-bilder/`.
5. Only then continue in batches of exactly 5 images whenever at least 5 remain.
6. Final remainder contains 1–4 images.
7. Each five-image batch is one batch operation, not deliberate image-by-image work.
8. Every image number remains one separate 16:9 image.
9. Accepted images are immediately renamed `NN.png`.
10. All accepted images stay in the same flat `03-bilder/` folder.
11. QA each batch, regenerate only failures, then continue automatically.
12. Never create a storyboard/contact sheet or final video in Flow.

Existing/historical projects keep their current behavior unless explicitly migrated.

## Reference pack

Permanent path: `assets/cinematic-human-behavior-world/`.

Prefer a small approved system by role:
- `style-master.png`
- one or two approved Character A references when needed
- Character B references when needed
- `character-group.png` when useful
- optional schema/environment reference

Until actual images are approved, written rules remain authoritative.

## Production priority

Optimize for:
1. current-beat clarity
2. observable evidence instead of abstract prompt language
3. strict mature Stickman anatomy
4. rich believable environment storytelling
5. world consistency
6. readable body language/social relation
7. semantic representation choice without quotas
8. natural concise Flow art direction
9. separate final Flow image assets
10. efficient five-image batching after cover approval
11. correct filenames and one final image folder
12. exact Flow text when planned

## Current migration rule

Historical produced videos may remain legacy artifacts.

New productions use:
- `CINEMATIC_HUMAN_BEHAVIOR_V2`
- `STYLIZED_STICKMAN_CAST_V2`
- `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`
- `REPRESENTATION_VARIETY_V1`
- `SEMANTIC_OBSERVABLE_VISUALS_V1`
- `OBSERVABLE_SCENE_FIRST_V1`
- `SEMANTIC_SOCIAL_DENSITY_V1`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`
- `NATURAL_FLOW_MASTER_V2`

The production folder and single-Flow-file workflow remain unchanged.
