# GOOGLE FLOW PROMPT ARCHITECTURE — NATURAL MASTER V2

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

Policy ID: `NATURAL_FLOW_MASTER_V2`

Creative translation from script to image follows `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md` / `OBSERVABLE_SCENE_FIRST_V1`. Output/batching remains controlled by `rules/FLOW_OUTPUT_MODE.md`.

Human anatomy follows `rules/STICKMAN_DNA.md` / `GEOMETRIC_STICKMAN_ANATOMY_V1`.

## 1. One master file

Every video keeps exactly one:

`02-google-flow/google-flow-prompt.txt`

It contains the channel/world instruction, output workflow and all `BILD 01` through `BILD NN`. Never split one video into batch prompt files.

## 2. Internal planning != final Flow prompt

Detailed planning remains in `99-intern/`. It may contain speech beat, viewer takeaway, observable evidence, scene type, composition, social density, mood, camera, light/color, continuity, text policy and QA.

The final Flow prompt must not dump those fields as a repeated technical form. It should read like concise art direction to an illustrator.

## 3. Observable-scene gate — HARD LOCK

Never send an abstract psychology statement directly to Flow.

Before every image prompt:

```text
spoken meaning
→ what must the viewer understand?
→ what can literally be seen that proves it?
→ one concrete composition
→ final prompt
```

If the central idea cannot be described with visible people, posture, gaze, distance, action, objects, environment, or a clearly defined comparison/mechanism, the visual plan is not ready.

## 4. Do not literalize effect names — HARD LOCK

Do not turn a psychological term into its literal word-picture only because of the name. A literal metaphor is allowed only when deliberately chosen because it explains the current beat better than a concrete situation.

Examples:
- Spotlight-Effekt ≠ theatrical spotlight
- Ankereffekt ≠ ship anchor
- Halo-Effekt ≠ glowing halo
- Framing-Effekt ≠ picture frame

## 5. Final master order

1. `TASK / OUTPUT`
2. `CHANNEL VISUAL WORLD`
3. `GEOMETRIC STICKMAN ANATOMY`
4. `CHARACTER + REFERENCE SYSTEM`
5. `VIDEO WORLD LOCK`
6. `GENERATION WORKFLOW`
7. `GLOBAL TEXT RULE`
8. short `PROMPTING RULE`
9. `BILD 01` through `BILD NN`
10. short final QA

Global style/anatomy/negative rules appear once near the top.

## 6. Geometric stickman block — HARD LOCK

Every new master prompt with people must contain one concise global anatomy block equivalent to:

`Every human must unmistakably read as a true illustrated stick figure, never a thin cartoon human: one simple circle/oval head with tiny dot/mark face, no ears/nose/neck; one tiny narrow graphic torso clearly under half the head width; ultra-thin near-uniform line-like arms and legs with no upper-arm/forearm/thigh/calf volume; tiny no-finger hands; small flat shoes. Clothing is a flat graphic cue and may not create shoulders, chest, sleeves, waist, hips or trouser-leg volume. Hair is only a tiny flat head-edge cue. Main, supporting and background people all use this exact geometry.`

Also include the recognition test:

`If a figure could plausibly be described as a thin normal cartoon human, the anatomy is wrong.`

Background figures must not be allowed to drift into thick or conventional cartoon silhouettes.

## 7. Final image-prompt formula

A normal `BILD NN` prompt should use only what matters, usually in this order:
1. camera/framing
2. dominant subject(s)
3. exact visible action/relation
4. behavior of other relevant people/objects
5. concrete environment/props
6. light and local color
7. continuity if needed
8. exact German visible text OR `No visible text.`
9. only 1–3 scene-specific negatives when a known failure needs blocking

Use concrete nouns and visible verbs. Do not make abstract wording the main instruction.

## 8. One visible idea per image

One image normally has one main action/relation and one dominant focal subject. If a beat contains several independent examples or actions, split the visual planning instead of forcing a montage.

Do not use montage, group scenes or split screens merely to satisfy variety quotas.

## 9. Emotion/power must be physically readable

When emotion or hierarchy matters, show it through gaze, head angle, line-arm position, line-leg stance, torso lean, distance, foreground/background placement and concrete interaction.

Do not add realistic body mass to make emotion or dominance more readable.

## 10. Unified world, varied staging

Keep constant across the full video:
- `GEOMETRIC_STICKMAN_ANATOMY_V1`
- linework and 2D rendering language
- cel shading and texture quality
- environment-quality standard
- typography language
- adult psychology-documentary/editorial identity

Location, camera, day/night, light direction, local color, mood, people count and representation may change per beat.

## 11. References

Use approved references by role: style-only, character-identity and environment-continuity. Prefer a small clean reference set. Never let a weak/chibi/cartoon or thin-human reference override the written geometry lock.

## 12. Representation variety

Humans are optional. Choose character interaction, object/environment, comparison, schema, metaphor or text illustration only when it is the clearest form. Percentages are guidance, never quotas.

## 13. Prompt length

Normal target: roughly 45–110 English words per image. Longer only when continuity, a necessary comparison or exact typography genuinely requires it.

Every sentence should change something visible.

## 14. Cover + production workflow

Preserve `FINAL_SEPARATE_IMAGE_ASSETS_V2` exactly:
- `BILD 01` first
- exactly 3 separate 16:9 cover candidates
- STOP for user choice
- chosen winner becomes `01.png` in `03-bilder/`
- only then continue
- later images in batches of exactly 5 whenever at least 5 remain
- each image number remains a separate 16:9 asset
- accepted results immediately renamed to `NN.png`
- all accepted images remain in the same flat `03-bilder/`
- regenerate only failures
- after a passing batch continue automatically
- never create the final video in Flow

The three cover candidates keep the same approved visual thesis and exact cover text, but should test meaningfully different strong compositions rather than three near-duplicates.

## 15. Text rule

Default: `No visible text.` / `ZERO READABLE TEXT`.

Only render exact German wording explicitly planned for that image. Never render voice-over as captions or invent readable signs/screens/documents.

## 16. Flow Agent role

The Flow Agent is the production executor, not the art director. It may generate, batch, rename, QA and organize assets, but the repo must decide the concrete visible scene first.

## 17. Hard fail

Rewrite/regenerate if:
- a human looks like a thin normal cartoon person instead of a true stick figure
- limbs become tapered/cylindrical or clothing creates human sleeves/trouser legs
- background people drift into another anatomy
- the key instruction is abstract rather than observable
- a psychological term is literalized only because of its name
- symbolic glow/rays/icons replace clearer real-life action
- unrelated examples are crammed into one image
- Flow must invent the central behavior or relationship
- a montage/group/split exists only to satisfy a quota
- environment is generic filler
- several image numbers are combined into one asset
- cover approval or five-image batching is broken
- accepted images are not renamed or are split across folders
- later batches reset the art style

This rule complements `rules/STICKMAN_DNA.md`, `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`, `rules/FLOW_OUTPUT_MODE.md`, `rules/VISUAL_SYSTEM.md`, `rules/IMAGE_REFERENCE_LOCK.md` and `rules/REPRESENTATION_VARIETY_LOCK.md`.
