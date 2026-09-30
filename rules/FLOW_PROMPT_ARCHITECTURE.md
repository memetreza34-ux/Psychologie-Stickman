# GOOGLE FLOW PROMPT ARCHITECTURE — NATURAL MASTER V2

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

Policy ID: `NATURAL_FLOW_MASTER_V2`

Creative translation from script to image follows `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md` / `OBSERVABLE_SCENE_FIRST_V1`. Output/batching remains controlled by `rules/FLOW_OUTPUT_MODE.md`.

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

Weak: `show self-consciousness`, `visualize social pressure`, `make attention feel huge`.

Strong: `A looks down at a small stain while the other guests keep talking, drinking or checking phones; nobody is staring at A.`

## 4. Do not literalize effect names — HARD LOCK

Do not turn a psychological term into its literal word-picture only because of the name:
- Spotlight-Effekt ≠ theatrical spotlight
- Ankereffekt ≠ ship anchor
- Halo-Effekt ≠ glowing halo
- Framing-Effekt ≠ picture frame
- Echo Chamber ≠ literal echo room
- Bandwagon Effect ≠ wagon

A literal metaphor is allowed only when deliberately chosen because it explains the current beat better than a concrete situation.

## 5. Final master order

1. `TASK / OUTPUT`
2. `CHANNEL VISUAL WORLD`
3. `CHARACTER + REFERENCE SYSTEM`
4. `VIDEO WORLD LOCK`
5. `GENERATION WORKFLOW`
6. `GLOBAL TEXT RULE`
7. short `PROMPTING RULE`
8. `BILD 01` through `BILD NN`
9. short final QA

Global style/anatomy/negative rules appear once near the top.

## 6. Final image-prompt formula

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

Use concrete nouns and visible verbs such as `looks down`, `steps back`, `points`, `turns away`, `keeps talking`, `checks a phone`, `holds`, `stands closer`, `sits apart`, `compares`.

Do not make abstract wording the main instruction: `symbolizes`, `represents`, `embodies`, `visualize the concept`, `communicate the psychology`, `make the viewer feel`.

## 7. One visible idea per image

One image normally has one main action/relation and one dominant focal subject. Use only a few supporting elements.

If a beat contains several independent examples or actions, split the visual planning instead of forcing a montage. Split/contrast/montage is allowed only when multiple parts are necessary to explain one inseparable comparison or mechanism.

Do not use montage, group scenes or split screens merely to satisfy variety quotas.

## 8. Emotion/power must be physically readable

When emotion or hierarchy matters, show it through gaze, head angle, posture, distance, foreground/background placement, who looks at whom, who ignores whom, standing/sitting position and concrete interaction.

An emotion adjective may support the prompt, but cannot replace visible behavior.

## 9. Unified world, varied staging

Keep constant across the full video:
- mature strict-stickman anatomy
- linework and 2D rendering language
- cel shading and texture quality
- environment-quality standard
- typography language
- adult psychology-documentary/editorial identity

Location, camera, day/night, light direction, local color, mood, people count and representation may change per beat.

## 10. References

Use approved references by role: style-only, character-identity and environment-continuity. Prefer a small clean reference set. Never let a weak/chibi/cartoon reference override the written rules.

## 11. Representation variety

Humans are optional. Choose character interaction, object/environment, comparison, schema, metaphor or text illustration only when it is the clearest form.

Representation percentages are guidance, never quotas. Content determines the form.

## 12. Prompt length

Normal target: roughly 45–110 English words per image. Longer only when continuity, a necessary comparison or exact typography genuinely requires it.

Every sentence should change something visible. Remove style repetition and abstract restatement.

## 13. Cover + production workflow

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

## 14. Text rule

Default: `No visible text.` / `ZERO READABLE TEXT`.

Only render exact German wording explicitly planned for that image. Never render voice-over as captions or invent readable signs/screens/documents.

## 15. Flow Agent role

The Flow Agent is the production executor, not the art director. It may generate, batch, rename, QA and organize assets, but the repo must decide the concrete visible scene first.

## 16. Example

Good:

```text
BILD 05
Medium-wide three-quarter view inside a modern café in daylight. Character A stands beside a table and looks down at a small stain on the teal overshirt, shoulders slightly drawn inward. Two guests talk to each other, one checks a phone and another drinks coffee; nobody is staring at A. Warm wood tables, large windows, muted green details and soft natural daylight with clear depth. Keep the stain physically small but clearly visible. No visible text.
```

Avoid:

```text
Create a cinematic visual representation of self-consciousness. Make the tiny mistake feel enormous through a dramatic spotlight and psychological symbolism.
```

## 17. Hard fail

Rewrite if:
- the key instruction is abstract rather than observable
- a psychological term is literalized only because of its name
- symbolic glow/rays/icons replace a clearer real-life action
- unrelated examples are crammed into one image
- Flow must invent the central behavior or relationship
- a montage/group/split exists only to satisfy a quota
- the environment is generic filler
- the prompt repeats global style instead of directing the scene
- several image numbers are combined into one asset
- cover approval or five-image batching is broken
- accepted images are not renamed or are split across folders
- later batches reset the art style

This rule complements `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`, `rules/FLOW_OUTPUT_MODE.md`, `rules/VISUAL_SYSTEM.md`, `rules/IMAGE_REFERENCE_LOCK.md` and `rules/REPRESENTATION_VARIETY_LOCK.md`.
