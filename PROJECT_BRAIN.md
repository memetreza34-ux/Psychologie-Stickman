# PROJECT BRAIN

## Current direction

German psychology / human-behavior explainers.

Active world: `CINEMATIC_HUMAN_BEHAVIOR_V2`.

Active prompt system:
- `OBSERVABLE_SCENE_FIRST_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

## Character target

Use `STYLIZED_STICKMAN_CAST_V2`:
- simple round/oval head
- minimal expressive face
- slim simplified torso
- thin clearly drawn arms and legs
- simple clothing, hands and shoes
- clear readable silhouette

The target is a polished hand-drawn editorial Stickman: not a bare line doodle and not a normal realistic/cartoon human.

Do not mathematically over-specify body proportions in Flow prompts.

## World target

Characters, props and environments use the same hand-drawn 2D illustration language:
- clean dark outlines
- simple shapes
- flat controlled colors
- soft graphic/cel shading
- light illustrated texture

Do not place simple Stickmen inside semi-realistic product-render or 3D-looking environments.

## Topic world

The same drawing DNA can create different worlds.

A calm topic may be bright and open. Anxiety may be cooler. Manipulation/power may be darker. Hope may be warmer. Everyday scenes may use natural local color.

Do not force every video into the same red/dark or teal/cream treatment.

## Observable-scene rule

**Do not prompt the psychology. Prompt the evidence of the psychology.**

`spoken meaning → viewer takeaway → observable evidence → concrete composition → final Flow prompt`

Use action, posture, gaze, distance, object relation and environment activity.

Effect names are not automatic literal props.

## Final Flow prompt

Each video keeps exactly one:

`02-google-flow/google-flow-prompt.txt`

Keep it concise. Global style appears once. Every `BILD NN` repeats only a short style anchor plus the actual scene.

Normal scene prompt target: about 35–80 English words.

Short anchor:

`Same polished hand-drawn 2D Stickman world as this video: simple round/oval heads, slim simplified bodies, thin drawn limbs, clean dark outlines, flat controlled colors and soft graphic shading.`

## Cover and generation workflow

1. BILD 01 only.
2. Generate exactly 3 separate cover candidates.
3. STOP for user choice.
4. Chosen winner → `01.png` in `03-bilder/`.
5. Chosen `01.png` becomes the video-local visual reference for all later batches.
6. Preserve from it: Stickman construction, linework, flat colors, shading, texture and overall illustration quality.
7. Do not copy its exact pose, room, composition or palette unless needed.
8. Then generate exact five-image batches whenever five remain: 02–06, 07–11, 12–16, etc.
9. Every BILD remains a separate 16:9 image.
10. Rename accepted images immediately to `NN.png`.
11. Keep all accepted images together in one flat `03-bilder/`.
12. Regenerate only failures and continue automatically after a passing batch.
13. Never create a storyboard/contact sheet/final video in Flow.

## Mixed representations

Not every image needs a person. Use objects, environments, comparisons, schemas or short planned text when clearer.

## Production priority

1. clear current beat
2. concrete observable scene
3. polished simple Stickman drawing DNA
4. same illustrated language for characters and environment
5. topic-appropriate local world and mood
6. concise Flow prompt
7. 3-cover gate
8. approved cover as local visual reference
9. efficient five-image batching
10. correct filenames and one final image folder

## Existing projects

Historical/existing projects stay unchanged unless the user explicitly asks to migrate that project.
