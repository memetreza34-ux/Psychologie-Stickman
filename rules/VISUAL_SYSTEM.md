# VISUAL SYSTEM — MINIMAL EDITORIAL STICKMAN WORLD v2

**STATUS: ACTIVE CHANNEL SOURCE OF TRUTH**

Policy ID: `MINIMAL_EDITORIAL_STICKMAN_V2`

This file replaces the former `Universal Editorial Stickman World v1.3` / `PREMIUM_EDITORIAL_CINEMATIC_V1` direction for all NEW productions.

## 1. Goal

A recognizable, reproducible 2D visual language for psychology and human-behavior explainers.

Core principle:

**Simple stickmen. Sparse editorial world. One visual idea. One dominant accent. Instant readability.**

The image must communicate the spoken beat in about one second. Quality comes from clarity, pose, spacing, visual metaphor and composition — not rendering complexity.

## 2. Non-negotiable character DNA

Every visible human or human-like figure uses the same anatomy system:
- simple round or slightly oval flat head
- warm off-white or white face fill
- two tiny dark dot/short-line eyes
- one tiny simple mouth line when emotion is needed
- no realistic nose
- no realistic ears
- no realistic neck
- compact flat torso shape
- very thin line-like arms and legs with near-constant thickness
- hands only as tiny nubs, dots or simple circles
- no fingers
- feet/shoes as tiny simple shapes
- no muscle or realistic limb volume

Clothing is graphic, not anatomical:
- one simple torso fill or jacket shape
- at most one small accessory when the role requires it
- no fabric texture, folds, fashion-detail rendering or realistic body construction

Hard fail:
- conventional cartoon humans
- semi-realistic or realistic people
- fleshy limbs
- realistic hands/fingers
- realistic facial anatomy
- 3D/Pixar/CGI
- anime/manga/chibi
- mixed human styles

## 3. Fixed channel palette

The channel uses a stable palette. New videos do NOT invent a completely new palette.

- Background / paper: `#F6F3EA` warm off-white
- Ink / outlines: `#202124` charcoal
- Primary / neutral focus: `#3F6EDB` editorial blue
- Problem / tension: `#E7684A` coral red
- Solution / positive direction: `#4E9B78` muted green
- Optional secondary signal: `#D6A23D` muted amber

Rules:
- normal scene: usually ONE dominant accent color plus charcoal/off-white
- a second accent is allowed only when comparison or cause/effect genuinely needs it
- do not tint the entire frame
- do not create a new project palette for every video
- local object colors may be simplified into the channel palette

## 4. Environment rule — SUGGEST, DO NOT RENDER

Environments are intentionally sparse.

Use only the minimum objects needed to identify the place and action:
- usually 1–5 environmental props
- simple floor or wall line only when useful
- large areas of clean negative space
- flat or near-flat shapes
- little or no texture
- little or no shading
- simple perspective only when necessary for comprehension

Examples:
- cinema = 2–4 seats + screen/door + ticket
- café = small table + two chairs + cup
- office = desk + laptop + chair
- train = seat row + window/door hint + handrail
- home = sofa/bed/table plus one relevant prop

Avoid as default:
- detailed architecture
- material rendering
- cinematic depth
- foreground/midground/background staging for its own sake
- dramatic light beams
- complex shadows
- rich decorative backgrounds
- photorealistic spatial logic

## 5. Rendering rule

Default rendering:
- clean 2D editorial illustration
- slightly organic but controlled charcoal outlines
- flat color fills
- optional very subtle single-value shadow only when separation requires it
- no glossy highlights
- no volumetric lighting
- no painterly texture
- no cinematic color grading
- no detailed cel-shading

Never use `cinematic`, `hyper-detailed`, `rich environment`, `volumetric`, `dramatic material`, `Pixar`, `3D render` or similar terms as global style instructions.

## 6. Three scene families

Choose the simplest family that explains the beat.

### A — Everyday Minimal
Default for concrete examples.
Stickman + minimal location cues + one clear action.

### B — Concept Metaphor
Use for internal psychology or invisible mechanisms.
Examples: weight, tether, spotlight, forked path, magnet, wall, loop, knot.
Metaphor must remain simple and immediately readable.

### C — Compare / Change
Use for A/B, before/after, stay/leave, belief/evidence, problem/solution.
Prefer clean left/right or near/far contrast rather than busy multi-panel layouts.

Charts/diagrams are a last resort.

## 7. Target mix

For a typical psychology video:
- about 60% Everyday Minimal
- about 25% Concept Metaphor
- about 10% Compare / Change
- at most about 5% diagram/chart-style frames

These are editorial targets, not mathematical requirements.

## 8. Composition

Every frame:
- one primary visual thought
- one dominant focal subject/action
- at most 1–2 supporting clues
- strong negative space
- readable silhouette
- avoid centered standing-stickman repetition
- vary close / medium / wide only when the beat benefits
- duo/group scenes only when human interaction matters

Do not add detail merely to make an image feel more expensive.

## 9. Character variation

Style stays constant; identity may vary.

Variation can come from:
- pose
- height
- simple torso color
- tiny hair/hat/glasses cue when useful
- one role prop
- minimal facial expression

Do not vary:
- basic anatomy
- line system
- hand/foot construction
- face complexity
- rendering complexity

Recurring characters remain identical only during genuine local continuity.

## 10. Reference architecture

Scene 01 is NOT the channel style master.

The permanent channel reference pack lives under:
`assets/style-v2/`

Target files:
- `style-master.png` — representative neutral scene
- `anatomy-sheet.png` — poses + face + hands/feet
- `environment-examples.png` — home/café/office/transit as sparse sets
- `metaphor-examples.png` — 4–6 approved psychology metaphors
- `thumbnail-reference.png` — cover composition example

Until the PNG pack is generated and approved, `rules/VISUAL_SYSTEM.md` + `rules/visual-system.json` are the textual source of truth.

Per-video `01.png` may still function as scene 01 / cover for pipeline compatibility, but it must never redefine the global channel anatomy or rendering style.

## 11. Flow prompt architecture

The global visual block should be short. Scene prompts should describe CONTENT, not re-specify the whole art direction.

Global core prompt:

`MINIMAL EDITORIAL STICKMAN WORLD v2. Warm off-white paper background (#F6F3EA), charcoal organic outlines (#202124), true minimal stickman anatomy, flat graphic torso shapes, very thin line limbs, tiny no-finger hands, simple feet, minimal dot/line face, no realistic anatomy. Sparse editorial environment using only the few props required to identify place and action. Large clean negative space. Flat colors with normally one dominant accent from channel blue #3F6EDB, problem coral #E7684A, solution green #4E9B78, optional muted amber #D6A23D. One clear visual idea per frame. Prefer simple action or a clean psychology metaphor. No photorealism, no 3D, no Pixar, no anime, no conventional cartoon humans, no cinematic lighting, no rich detailed environments, no material textures, no complex cel-shading.`

Per-scene prompt should normally specify only:
- subject/cast
- action
- minimal props/environment cues
- scene family
- framing
- accent role
- text rule

## 12. Text

Existing YouTube visible-text policy remains unchanged in this visual-system migration.

The image system must reserve clean negative space for planned text moments and generate zero unplanned readable text.

## 13. QA — regenerate on fail

Fail the image if any of these occur:
- normal cartoon/semi-realistic person
- thick or anatomical human limbs
- fingers or realistic hands
- realistic facial features
- 3D/CGI look
- background detail competes with the idea
- more than the necessary props without explanatory value
- cinematic or dramatic rendering dominates
- too many accent colors
- unclear focal action
- visual idea takes more than about one second to understand
- style differs materially from the approved v2 reference pack

## 14. Priority

When visual files conflict:
1. `rules/VISUAL_SYSTEM.md`
2. approved `assets/style-v2/` reference pack
3. `rules/STICKMAN_DNA.md`
4. scene-specific Visual Beat
5. compatibility lock files

The old v1.3 cinematic/editorial-rich-world philosophy is legacy only and must not be used for new production.
